(function() {
  var BufferPatch, Delegator, Emitter, File, Grim, History, MarkerManager, Point, Q, Range, Serializable, SpanSkipList, Subscriber, TextBuffer, diff, newlineRegex, spliceArray, _, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore-plus');

  Delegator = require('delegato');

  Grim = require('grim');

  Serializable = require('serializable');

  _ref = require('emissary'), Emitter = _ref.Emitter, Subscriber = _ref.Subscriber;

  File = require('pathwatcher').File;

  SpanSkipList = require('span-skip-list');

  diff = require('diff');

  Q = require('q');

  Point = require('./point');

  Range = require('./range');

  History = require('./history');

  MarkerManager = require('./marker-manager');

  BufferPatch = require('./buffer-patch');

  _ref1 = require('./helpers'), spliceArray = _ref1.spliceArray, newlineRegex = _ref1.newlineRegex;

  module.exports = TextBuffer = (function() {
    TextBuffer.Point = Point;

    TextBuffer.Range = Range;

    TextBuffer.newlineRegex = newlineRegex;

    Delegator.includeInto(TextBuffer);

    Emitter.includeInto(TextBuffer);

    Serializable.includeInto(TextBuffer);

    Subscriber.includeInto(TextBuffer);

    TextBuffer.prototype.cachedText = null;

    TextBuffer.prototype.stoppedChangingDelay = 300;

    TextBuffer.prototype.stoppedChangingTimeout = null;

    TextBuffer.prototype.cachedDiskContents = null;

    TextBuffer.prototype.conflict = false;

    TextBuffer.prototype.file = null;

    TextBuffer.prototype.refcount = 0;

    function TextBuffer(params) {
      this.handleTextChange = __bind(this.handleTextChange, this);
      var text, _ref2, _ref3, _ref4, _ref5, _ref6;
      if (typeof params === 'string') {
        text = params;
      }
      this.lines = [''];
      this.lineEndings = [''];
      this.offsetIndex = new SpanSkipList('rows', 'characters');
      this.setTextInRange([[0, 0], [0, 0]], (_ref2 = text != null ? text : params != null ? params.text : void 0) != null ? _ref2 : '', false);
      this.history = (_ref3 = params != null ? params.history : void 0) != null ? _ref3 : new History(this);
      this.markers = (_ref4 = params != null ? params.markers : void 0) != null ? _ref4 : new MarkerManager(this);
      this.loaded = false;
      this.digestWhenLastPersisted = (_ref5 = params != null ? params.digestWhenLastPersisted : void 0) != null ? _ref5 : false;
      this.modifiedWhenLastPersisted = (_ref6 = params != null ? params.modifiedWhenLastPersisted : void 0) != null ? _ref6 : false;
      this.useSerializedText = this.modifiedWhenLastPersisted !== false;
      this.subscribe(this, 'changed', this.handleTextChange);
      if (params != null ? params.filePath : void 0) {
        this.setPath(params.filePath);
      }
      if (params != null ? params.load : void 0) {
        this.load();
      }
    }

    TextBuffer.prototype.deserializeParams = function(params) {
      params.markers = MarkerManager.deserialize(params.markers, {
        buffer: this
      });
      params.history = History.deserialize(params.history, {
        buffer: this
      });
      params.load = true;
      return params;
    };

    TextBuffer.prototype.serializeParams = function() {
      var _ref2;
      return {
        text: this.getText(),
        markers: this.markers.serialize(),
        history: this.history.serialize(),
        filePath: this.getPath(),
        modifiedWhenLastPersisted: this.isModified(),
        digestWhenLastPersisted: (_ref2 = this.file) != null ? _ref2.getDigest() : void 0
      };
    };

    TextBuffer.prototype.getText = function() {
      var row, text, _i, _ref2;
      if (this.cachedText != null) {
        return this.cachedText;
      } else {
        text = '';
        for (row = _i = 0, _ref2 = this.getLastRow(); 0 <= _ref2 ? _i <= _ref2 : _i >= _ref2; row = 0 <= _ref2 ? ++_i : --_i) {
          text += this.lineForRow(row) + this.lineEndingForRow(row);
        }
        return this.cachedText = text;
      }
    };

    TextBuffer.prototype.getLines = function() {
      return this.lines.slice();
    };

    TextBuffer.prototype.isEmpty = function() {
      return this.getLastRow() === 0 && this.lineLengthForRow(0) === 0;
    };

    TextBuffer.prototype.getLineCount = function() {
      return this.lines.length;
    };

    TextBuffer.prototype.getLastRow = function() {
      return this.getLineCount() - 1;
    };

    TextBuffer.prototype.lineForRow = function(row) {
      return this.lines[row];
    };

    TextBuffer.prototype.getLastLine = function() {
      return this.lineForRow(this.getLastRow());
    };

    TextBuffer.prototype.lineEndingForRow = function(row) {
      return this.lineEndings[row];
    };

    TextBuffer.prototype.lineLengthForRow = function(row) {
      return this.lines[row].length;
    };

    TextBuffer.prototype.setText = function(text) {
      return this.setTextInRange(this.getRange(), text, false);
    };

    TextBuffer.prototype.setTextViaDiff = function(text) {
      var computeBufferColumn, currentText, endsWithNewline;
      currentText = this.getText();
      if (currentText === text) {
        return;
      }
      endsWithNewline = function(str) {
        return /[\r\n]+$/g.test(str);
      };
      computeBufferColumn = function(str) {
        var newlineIndex;
        newlineIndex = Math.max(str.lastIndexOf('\n'), str.lastIndexOf('\r'));
        if (endsWithNewline(str)) {
          return 0;
        } else if (newlineIndex === -1) {
          return str.length;
        } else {
          return str.length - newlineIndex - 1;
        }
      };
      return this.transact((function(_this) {
        return function() {
          var change, changeOptions, column, currentPosition, endColumn, endRow, lineCount, lineDiff, row, _i, _len, _ref2, _ref3, _results;
          row = 0;
          column = 0;
          currentPosition = [0, 0];
          lineDiff = diff.diffLines(currentText, text);
          changeOptions = {
            normalizeLineEndings: false
          };
          _results = [];
          for (_i = 0, _len = lineDiff.length; _i < _len; _i++) {
            change = lineDiff[_i];
            lineCount = (_ref2 = (_ref3 = change.value.match(newlineRegex)) != null ? _ref3.length : void 0) != null ? _ref2 : 0;
            currentPosition[0] = row;
            currentPosition[1] = column;
            if (change.added) {
              _this.setTextInRange([currentPosition, currentPosition], change.value, changeOptions);
              row += lineCount;
              _results.push(column = computeBufferColumn(change.value));
            } else if (change.removed) {
              endRow = row + lineCount;
              endColumn = column + computeBufferColumn(change.value);
              _results.push(_this.setTextInRange([currentPosition, [endRow, endColumn]], '', changeOptions));
            } else {
              row += lineCount;
              _results.push(column = computeBufferColumn(change.value));
            }
          }
          return _results;
        };
      })(this));
    };

    TextBuffer.prototype.setTextInRange = function(range, text, normalizeLineEndings) {
      var patch, _ref2;
      if (normalizeLineEndings == null) {
        normalizeLineEndings = true;
      }
      patch = this.buildPatch(range, text, normalizeLineEndings);
      if ((_ref2 = this.history) != null) {
        _ref2.recordNewPatch(patch);
      }
      this.applyPatch(patch);
      return patch.newRange;
    };

    TextBuffer.prototype.insert = function(position, text, normalizeLineEndings) {
      return this.setTextInRange(new Range(position, position), text, normalizeLineEndings);
    };

    TextBuffer.prototype.append = function(text, normalizeLineEndings) {
      return this.insert(this.getEndPosition(), text, normalizeLineEndings);
    };

    TextBuffer.prototype["delete"] = function(range) {
      return this.setTextInRange(range, '');
    };

    TextBuffer.prototype.deleteRow = function(row) {
      return this.deleteRows(row, row);
    };

    TextBuffer.prototype.deleteRows = function(startRow, endRow) {
      var endPoint, lastRow, startPoint, _ref2;
      lastRow = this.getLastRow();
      if (startRow > endRow) {
        _ref2 = [endRow, startRow], startRow = _ref2[0], endRow = _ref2[1];
      }
      if (endRow < 0) {
        return new Range(this.getFirstPosition(), this.getFirstPosition());
      }
      if (startRow > lastRow) {
        return new Range(this.getEndPosition(), this.getEndPosition());
      }
      startRow = Math.max(0, startRow);
      endRow = Math.min(lastRow, endRow);
      if (endRow < lastRow) {
        startPoint = new Point(startRow, 0);
        endPoint = new Point(endRow + 1, 0);
      } else {
        if (startRow === 0) {
          startPoint = new Point(startRow, 0);
        } else {
          startPoint = new Point(startRow - 1, this.lineLengthForRow(startRow - 1));
        }
        endPoint = new Point(endRow, this.lineLengthForRow(endRow));
      }
      return this["delete"](new Range(startPoint, endPoint));
    };

    TextBuffer.prototype.buildPatch = function(oldRange, newText, normalizeLineEndings) {
      var newRange, oldText, patch, _ref2;
      oldRange = this.clipRange(oldRange);
      oldText = this.getTextInRange(oldRange);
      newRange = Range.fromText(oldRange.start, newText);
      patch = new BufferPatch(oldRange, newRange, oldText, newText, normalizeLineEndings);
      if ((_ref2 = this.markers) != null) {
        _ref2.handleBufferChange(patch);
      }
      return patch;
    };

    TextBuffer.prototype.applyPatch = function(_arg) {
      var endRow, lastIndex, lastLine, lastLineEnding, lineEndings, lineStartIndex, lines, markerPatches, newRange, newText, normalizeLineEndings, normalizedEnding, offsets, oldRange, oldText, prefix, result, rowCount, startRow, suffix, _ref2, _ref3, _ref4;
      oldRange = _arg.oldRange, newRange = _arg.newRange, oldText = _arg.oldText, newText = _arg.newText, normalizeLineEndings = _arg.normalizeLineEndings, markerPatches = _arg.markerPatches;
      this.cachedText = null;
      startRow = oldRange.start.row;
      endRow = oldRange.end.row;
      rowCount = endRow - startRow + 1;
      if (normalizeLineEndings) {
        normalizedEnding = this.lineEndingForRow(startRow);
        if (normalizedEnding === '') {
          if (startRow > 0) {
            normalizedEnding = this.lineEndingForRow(startRow - 1);
          } else {
            normalizedEnding = null;
          }
        }
      }
      lines = [];
      lineEndings = [];
      lineStartIndex = 0;
      while (result = newlineRegex.exec(newText)) {
        lines.push(newText.slice(lineStartIndex, result.index));
        lineEndings.push(normalizedEnding != null ? normalizedEnding : result[0]);
        lineStartIndex = newlineRegex.lastIndex;
      }
      lastLine = newText.slice(lineStartIndex);
      lines.push(lastLine);
      lineEndings.push('');
      prefix = this.lineForRow(startRow).slice(0, oldRange.start.column);
      lines[0] = prefix + lines[0];
      suffix = this.lineForRow(endRow).slice(oldRange.end.column);
      lastIndex = lines.length - 1;
      lines[lastIndex] += suffix;
      lastLineEnding = this.lineEndingForRow(endRow);
      if (lastLineEnding !== '' && (normalizedEnding != null)) {
        lastLineEnding = normalizedEnding;
      }
      lineEndings[lastIndex] = lastLineEnding;
      spliceArray(this.lines, startRow, rowCount, lines);
      spliceArray(this.lineEndings, startRow, rowCount, lineEndings);
      offsets = lines.map(function(line, index) {
        return {
          rows: 1,
          characters: line.length + lineEndings[index].length
        };
      });
      this.offsetIndex.spliceArray('rows', startRow, rowCount, offsets);
      if ((_ref2 = this.markers) != null) {
        _ref2.pauseChangeEvents();
      }
      if ((_ref3 = this.markers) != null) {
        _ref3.applyPatches(markerPatches, true);
      }
      this.emit('changed', {
        oldRange: oldRange,
        newRange: newRange,
        oldText: oldText,
        newText: newText
      });
      if ((_ref4 = this.markers) != null) {
        _ref4.resumeChangeEvents();
      }
      return this.emit('markers-updated');
    };

    TextBuffer.prototype.getTextInRange = function(range) {
      var endRow, line, row, startRow, text, _i;
      range = this.clipRange(Range.fromObject(range));
      startRow = range.start.row;
      endRow = range.end.row;
      if (startRow === endRow) {
        return this.lineForRow(startRow).slice(range.start.column, range.end.column);
      } else {
        text = '';
        for (row = _i = startRow; startRow <= endRow ? _i <= endRow : _i >= endRow; row = startRow <= endRow ? ++_i : --_i) {
          line = this.lineForRow(row);
          if (row === startRow) {
            text += line.slice(range.start.column);
          } else if (row === endRow) {
            text += line.slice(0, range.end.column);
            continue;
          } else {
            text += line;
          }
          text += this.lineEndingForRow(row);
        }
        return text;
      }
    };

    TextBuffer.prototype.clipRange = function(range) {
      var end, start;
      range = Range.fromObject(range);
      start = this.clipPosition(range.start);
      end = this.clipPosition(range.end);
      if (range.start.isEqual(start) && range.end.isEqual(end)) {
        return range;
      } else {
        return new Range(start, end);
      }
    };

    TextBuffer.prototype.clipPosition = function(position) {
      var column, row;
      position = Point.fromObject(position);
      row = position.row, column = position.column;
      if (row < 0) {
        return this.getFirstPosition();
      } else if (row > this.getLastRow()) {
        return this.getEndPosition();
      } else {
        column = Math.min(Math.max(column, 0), this.lineLengthForRow(row));
        if (column === position.column) {
          return position;
        } else {
          return new Point(row, column);
        }
      }
    };

    TextBuffer.prototype.getFirstPosition = function() {
      return new Point(0, 0);
    };

    TextBuffer.prototype.getEndPosition = function() {
      var lastRow;
      lastRow = this.getLastRow();
      return new Point(lastRow, this.lineLengthForRow(lastRow));
    };

    TextBuffer.prototype.getRange = function() {
      return new Range(this.getFirstPosition(), this.getEndPosition());
    };

    TextBuffer.prototype.rangeForRow = function(row, includeNewline) {
      if (typeof includeNewline === 'object') {
        Grim.deprecate("The second param is not longer an object, it's a boolean argument named `includeNewline`.");
        includeNewline = includeNewline.includeNewline;
      }
      if (includeNewline && row < this.getLastRow()) {
        return new Range(new Point(row, 0), new Point(row + 1, 0));
      } else {
        return new Range(new Point(row, 0), new Point(row, this.lineLengthForRow(row)));
      }
    };

    TextBuffer.prototype.characterIndexForPosition = function(position) {
      var characters, column, row, _ref2;
      _ref2 = this.clipPosition(Point.fromObject(position)), row = _ref2.row, column = _ref2.column;
      if (row < 0 || row > this.getLastRow() || column < 0 || column > this.lineLengthForRow(row)) {
        throw new Error("Position " + position + " is invalid");
      }
      characters = this.offsetIndex.totalTo(row, 'rows').characters;
      return characters + column;
    };

    TextBuffer.prototype.positionForCharacterIndex = function(offset) {
      var characters, rows, _ref2;
      offset = Math.max(0, offset);
      offset = Math.min(this.getMaxCharacterIndex(), offset);
      _ref2 = this.offsetIndex.totalTo(offset, 'characters'), rows = _ref2.rows, characters = _ref2.characters;
      if (rows > this.getLastRow()) {
        return this.getEndPosition();
      } else {
        return new Point(rows, offset - characters);
      }
    };

    TextBuffer.prototype.getMaxCharacterIndex = function() {
      return this.offsetIndex.totalTo(Infinity, 'rows').characters;
    };

    TextBuffer.prototype.loadSync = function() {
      this.updateCachedDiskContentsSync();
      return this.finishLoading();
    };

    TextBuffer.prototype.load = function() {
      return this.updateCachedDiskContents().then((function(_this) {
        return function() {
          return _this.finishLoading();
        };
      })(this));
    };

    TextBuffer.prototype.finishLoading = function() {
      var _ref2;
      if (this.isAlive()) {
        this.loaded = true;
        if (this.useSerializedText && this.digestWhenLastPersisted === ((_ref2 = this.file) != null ? _ref2.getDigest() : void 0)) {
          this.emitModifiedStatusChanged(true);
        } else {
          this.reload();
        }
        this.clearUndoStack();
      }
      return this;
    };

    TextBuffer.prototype.handleTextChange = function(event) {
      if (this.conflict && !this.isModified()) {
        this.conflict = false;
      }
      return this.scheduleModifiedEvents();
    };

    TextBuffer.prototype.destroy = function() {
      var _ref2;
      if (!this.destroyed) {
        this.cancelStoppedChangingTimeout();
        if ((_ref2 = this.file) != null) {
          _ref2.off();
        }
        this.unsubscribe();
        this.destroyed = true;
        return this.emit('destroyed');
      }
    };

    TextBuffer.prototype.isAlive = function() {
      return !this.destroyed;
    };

    TextBuffer.prototype.isDestroyed = function() {
      return this.destroyed;
    };

    TextBuffer.prototype.isRetained = function() {
      return this.refcount > 0;
    };

    TextBuffer.prototype.retain = function() {
      this.refcount++;
      return this;
    };

    TextBuffer.prototype.release = function() {
      this.refcount--;
      if (!this.isRetained()) {
        this.destroy();
      }
      return this;
    };

    TextBuffer.prototype.subscribeToFile = function() {
      this.file.on("contents-changed", (function(_this) {
        return function() {
          var previousContents;
          if (_this.isModified()) {
            _this.conflict = true;
          }
          previousContents = _this.cachedDiskContents;
          _this.updateCachedDiskContentsSync();
          if (previousContents === _this.cachedDiskContents) {
            return;
          }
          if (_this.conflict) {
            return _this.emit("contents-conflicted");
          } else {
            return _this.reload();
          }
        };
      })(this));
      this.file.on("removed", (function(_this) {
        return function() {
          var modified;
          modified = _this.getText() !== _this.cachedDiskContents;
          _this.wasModifiedBeforeRemove = modified;
          if (modified) {
            return _this.updateCachedDiskContents();
          } else {
            return _this.destroy();
          }
        };
      })(this));
      return this.file.on("moved", (function(_this) {
        return function() {
          return _this.emit("path-changed", _this);
        };
      })(this));
    };

    TextBuffer.prototype.hasMultipleEditors = function() {
      return this.refcount > 1;
    };

    TextBuffer.prototype.reload = function() {
      this.emit('will-reload');
      this.setTextViaDiff(this.cachedDiskContents);
      this.emitModifiedStatusChanged(false);
      return this.emit('reloaded');
    };

    TextBuffer.prototype.updateCachedDiskContentsSync = function() {
      var _ref2, _ref3;
      return this.cachedDiskContents = (_ref2 = (_ref3 = this.file) != null ? _ref3.readSync() : void 0) != null ? _ref2 : "";
    };

    TextBuffer.prototype.updateCachedDiskContents = function() {
      var _ref2, _ref3;
      return Q((_ref2 = (_ref3 = this.file) != null ? _ref3.read() : void 0) != null ? _ref2 : "").then((function(_this) {
        return function(contents) {
          return _this.cachedDiskContents = contents;
        };
      })(this));
    };

    TextBuffer.prototype.getBaseName = function() {
      var _ref2;
      return (_ref2 = this.file) != null ? _ref2.getBaseName() : void 0;
    };

    TextBuffer.prototype.getPath = function() {
      var _ref2;
      return (_ref2 = this.file) != null ? _ref2.getPath() : void 0;
    };

    TextBuffer.prototype.getUri = function() {
      return this.getPath();
    };

    TextBuffer.prototype.setPath = function(filePath) {
      var _ref2;
      if (filePath === this.getPath()) {
        return;
      }
      if ((_ref2 = this.file) != null) {
        _ref2.off();
      }
      if (filePath) {
        this.file = new File(filePath);
        this.subscribeToFile();
      } else {
        this.file = null;
      }
      return this.emit("path-changed", this);
    };

    TextBuffer.prototype.getEofPosition = function() {
      Grim.deprecate("Use TextBuffer::getEndPosition instead.");
      return this.getEndPosition();
    };

    TextBuffer.prototype.save = function() {
      return this.saveAs(this.getPath());
    };

    TextBuffer.prototype.saveAs = function(filePath) {
      if (!filePath) {
        throw new Error("Can't save buffer with no file path");
      }
      this.emit('will-be-saved', this);
      this.setPath(filePath);
      this.file.write(this.getText());
      this.cachedDiskContents = this.getText();
      this.conflict = false;
      this.emitModifiedStatusChanged(false);
      return this.emit('saved', this);
    };

    TextBuffer.prototype.isModified = function() {
      var _ref2;
      if (!this.loaded) {
        return false;
      }
      if (this.file) {
        if (this.file.exists()) {
          return this.getText() !== this.cachedDiskContents;
        } else {
          return (_ref2 = this.wasModifiedBeforeRemove) != null ? _ref2 : !this.isEmpty();
        }
      } else {
        return !this.isEmpty();
      }
    };

    TextBuffer.prototype.isInConflict = function() {
      return this.conflict;
    };

    TextBuffer.prototype.destroyMarker = function(id) {
      var _ref2;
      return (_ref2 = this.getMarker(id)) != null ? _ref2.destroy() : void 0;
    };

    TextBuffer.prototype.matchesInCharacterRange = function(regex, startIndex, endIndex) {
      var match, matchEndIndex, matchLength, matchStartIndex, matches, submatch, text;
      text = this.getText();
      matches = [];
      regex.lastIndex = startIndex;
      while (match = regex.exec(text)) {
        matchLength = match[0].length;
        matchStartIndex = match.index;
        matchEndIndex = matchStartIndex + matchLength;
        if (matchEndIndex > endIndex) {
          regex.lastIndex = 0;
          if (matchStartIndex < endIndex && (submatch = regex.exec(text.slice(matchStartIndex, endIndex)))) {
            submatch.index = matchStartIndex;
            matches.push(submatch);
          }
          break;
        }
        if (matchLength === 0) {
          matchEndIndex++;
        }
        regex.lastIndex = matchEndIndex;
        matches.push(match);
      }
      return matches;
    };

    TextBuffer.prototype.scan = function(regex, iterator) {
      return this.scanInRange(regex, this.getRange(), (function(_this) {
        return function(result) {
          result.lineText = _this.lineForRow(result.range.start.row);
          result.lineTextOffset = 0;
          return iterator(result);
        };
      })(this));
    };

    TextBuffer.prototype.backwardsScan = function(regex, iterator) {
      return this.backwardsScanInRange(regex, this.getRange(), (function(_this) {
        return function(result) {
          result.lineText = _this.lineForRow(result.range.start.row);
          result.lineTextOffset = 0;
          return iterator(result);
        };
      })(this));
    };

    TextBuffer.prototype.replace = function(regex, replacementText) {
      var doSave, replacements;
      doSave = !this.isModified();
      replacements = 0;
      this.transact((function(_this) {
        return function() {
          return _this.scan(regex, function(_arg) {
            var matchText, replace;
            matchText = _arg.matchText, replace = _arg.replace;
            replace(matchText.replace(regex, replacementText));
            return replacements++;
          });
        };
      })(this));
      if (doSave) {
        this.save();
      }
      return replacements;
    };

    TextBuffer.prototype.scanInRange = function(regex, range, iterator, reverse) {
      var endIndex, endPosition, flags, global, keepLooping, lengthDelta, match, matchEndIndex, matchLength, matchStartIndex, matchText, matches, replace, replacementText, startIndex, startPosition, stop, _i, _len, _results;
      if (reverse == null) {
        reverse = false;
      }
      range = this.clipRange(range);
      global = regex.global;
      flags = "gm";
      if (regex.ignoreCase) {
        flags += "i";
      }
      regex = new RegExp(regex.source, flags);
      startIndex = this.characterIndexForPosition(range.start);
      endIndex = this.characterIndexForPosition(range.end);
      matches = this.matchesInCharacterRange(regex, startIndex, endIndex);
      lengthDelta = 0;
      keepLooping = null;
      replacementText = null;
      stop = function() {
        return keepLooping = false;
      };
      replace = function(text) {
        return replacementText = text;
      };
      if (reverse) {
        matches.reverse();
      }
      _results = [];
      for (_i = 0, _len = matches.length; _i < _len; _i++) {
        match = matches[_i];
        matchLength = match[0].length;
        matchStartIndex = match.index;
        matchEndIndex = matchStartIndex + matchLength;
        startPosition = this.positionForCharacterIndex(matchStartIndex + lengthDelta);
        endPosition = this.positionForCharacterIndex(matchEndIndex + lengthDelta);
        range = new Range(startPosition, endPosition);
        keepLooping = true;
        replacementText = null;
        matchText = match[0];
        iterator({
          match: match,
          matchText: matchText,
          range: range,
          stop: stop,
          replace: replace
        });
        if (replacementText != null) {
          this.setTextInRange(range, replacementText);
          if (!reverse) {
            lengthDelta += replacementText.length - matchLength;
          }
        }
        if (!(global && keepLooping)) {
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    TextBuffer.prototype.backwardsScanInRange = function(regex, range, iterator) {
      return this.scanInRange(regex, range, iterator, true);
    };

    TextBuffer.prototype.isRowBlank = function(row) {
      return !/\S/.test(this.lineForRow(row));
    };

    TextBuffer.prototype.previousNonBlankRow = function(startRow) {
      var row, _i, _ref2;
      if (startRow === 0) {
        return null;
      }
      startRow = Math.min(startRow, this.getLastRow());
      for (row = _i = _ref2 = startRow - 1; _ref2 <= 0 ? _i <= 0 : _i >= 0; row = _ref2 <= 0 ? ++_i : --_i) {
        if (!this.isRowBlank(row)) {
          return row;
        }
      }
      return null;
    };

    TextBuffer.prototype.nextNonBlankRow = function(startRow) {
      var lastRow, row, _i, _ref2;
      lastRow = this.getLastRow();
      if (startRow < lastRow) {
        for (row = _i = _ref2 = startRow + 1; _ref2 <= lastRow ? _i <= lastRow : _i >= lastRow; row = _ref2 <= lastRow ? ++_i : --_i) {
          if (!this.isRowBlank(row)) {
            return row;
          }
        }
      }
      return null;
    };

    TextBuffer.prototype.usesSoftTabs = function() {
      var match, row, _i, _ref2;
      for (row = _i = 0, _ref2 = this.getLastRow(); 0 <= _ref2 ? _i <= _ref2 : _i >= _ref2; row = 0 <= _ref2 ? ++_i : --_i) {
        if (match = this.lineForRow(row).match(/^\s/)) {
          return match[0][0] !== '\t';
        }
      }
      return void 0;
    };

    TextBuffer.prototype.change = function(oldRange, newText, options) {
      if (options == null) {
        options = {};
      }
      Grim.deprecate("Use TextBuffer::setTextInRange instead.");
      return this.setTextInRange(oldRange, newText, options.normalizeLineEndings);
    };

    TextBuffer.prototype.cancelStoppedChangingTimeout = function() {
      if (this.stoppedChangingTimeout) {
        return clearTimeout(this.stoppedChangingTimeout);
      }
    };

    TextBuffer.prototype.scheduleModifiedEvents = function() {
      var stoppedChangingCallback;
      this.cancelStoppedChangingTimeout();
      stoppedChangingCallback = (function(_this) {
        return function() {
          var modifiedStatus;
          _this.stoppedChangingTimeout = null;
          modifiedStatus = _this.isModified();
          _this.emit('contents-modified', modifiedStatus);
          return _this.emitModifiedStatusChanged(modifiedStatus);
        };
      })(this);
      return this.stoppedChangingTimeout = setTimeout(stoppedChangingCallback, this.stoppedChangingDelay);
    };

    TextBuffer.prototype.emitModifiedStatusChanged = function(modifiedStatus) {
      if (modifiedStatus === this.previousModifiedStatus) {
        return;
      }
      this.previousModifiedStatus = modifiedStatus;
      return this.emit('modified-status-changed', modifiedStatus);
    };

    TextBuffer.prototype.logLines = function(start, end) {
      var line, row, _i, _results;
      if (start == null) {
        start = 0;
      }
      if (end == null) {
        end = this.getLastRow();
      }
      _results = [];
      for (row = _i = start; start <= end ? _i <= end : _i >= end; row = start <= end ? ++_i : --_i) {
        line = this.lineForRow(row);
        _results.push(console.log(row, line, line.length));
      }
      return _results;
    };

    TextBuffer.delegatesMethods('undo', 'redo', 'transact', 'beginTransaction', 'commitTransaction', 'abortTransaction', 'isTransacting', 'clearUndoStack', {
      toProperty: 'history'
    });

    TextBuffer.prototype.undo = function() {
      return this.history.undo();
    };

    TextBuffer.prototype.redo = function() {
      return this.history.redo();
    };

    TextBuffer.prototype.transact = function(fn) {
      return this.history.transact(fn);
    };

    TextBuffer.prototype.beginTransaction = function() {
      return this.history.beginTransaction();
    };

    TextBuffer.prototype.commitTransaction = function() {
      return this.history.commitTransaction();
    };

    TextBuffer.prototype.abortTransaction = function() {
      return this.history.abortTransaction();
    };

    TextBuffer.prototype.clearUndoStack = function() {
      return this.history.clearUndoStack();
    };

    TextBuffer.prototype.markRange = function(range, properties) {
      return this.markers.markRange(range, properties);
    };

    TextBuffer.prototype.markPosition = function(position, properties) {
      return this.markers.markPosition(position, properties);
    };

    TextBuffer.prototype.getMarker = function(id) {
      return this.markers.getMarker(id);
    };

    TextBuffer.prototype.getMarkers = function() {
      return this.markers.getMarkers();
    };

    TextBuffer.prototype.findMarkers = function(params) {
      return this.markers.findMarkers(params);
    };

    TextBuffer.prototype.getMarkerCount = function() {
      return this.markers.getMarkerCount();
    };

    return TextBuffer;

  })();

}).call(this);
