(function() {
  var Delegator, Emitter, Grim, Marker, MarkerPatch, OptionKeys, Point, Range, Serializable, extend, isEqual, omit, pick, size, _ref,
    __slice = [].slice;

  _ref = require('underscore-plus'), extend = _ref.extend, isEqual = _ref.isEqual, omit = _ref.omit, pick = _ref.pick, size = _ref.size;

  Emitter = require('emissary').Emitter;

  Grim = require('grim');

  Delegator = require('delegato');

  Serializable = require('serializable');

  MarkerPatch = require('./marker-patch');

  Point = require('./point');

  Range = require('./range');

  OptionKeys = ['reversed', 'tailed', 'invalidate', 'persistent'];

  module.exports = Marker = (function() {
    Emitter.includeInto(Marker);

    Delegator.includeInto(Marker);

    Serializable.includeInto(Marker);

    Marker.extractParams = function(inputParams) {
      var outputParams, properties;
      outputParams = {};
      if (inputParams != null) {
        this.handleDeprecatedParams(inputParams);
        extend(outputParams, pick(inputParams, OptionKeys));
        properties = omit(inputParams, OptionKeys);
        if (size(properties) > 0) {
          outputParams.properties = properties;
        }
      }
      return outputParams;
    };

    Marker.handleDeprecatedParams = function(params) {
      if (params.isReversed != null) {
        Grim.deprecate("The option `isReversed` is deprecated, use `reversed` instead");
        params.reversed = params.isReversed;
        delete params.isReversed;
      }
      if (params.hasTail != null) {
        Grim.deprecate("The option `hasTail` is deprecated, use `tailed` instead");
        params.tailed = params.hasTail;
        delete params.hasTail;
      }
      if (params.persist != null) {
        Grim.deprecate("The option `persist` is deprecated, use `persistent` instead");
        params.persistent = params.persist;
        delete params.persist;
      }
      if (params.invalidation) {
        Grim.deprecate("The option `invalidation` is deprecated, use `invalidate` instead");
        params.invalidate = params.invalidation;
        return delete params.invalidation;
      }
    };

    Marker.delegatesMethods('containsPoint', 'containsRange', 'intersectsRow', {
      toProperty: 'range'
    });

    Marker.delegatesMethods('clipPosition', 'clipRange', {
      toProperty: 'manager'
    });

    function Marker(params) {
      this.manager = params.manager, this.id = params.id, this.range = params.range, this.tailed = params.tailed, this.reversed = params.reversed;
      this.valid = params.valid, this.invalidate = params.invalidate, this.persistent = params.persistent, this.properties = params.properties;
      if (this.tailed == null) {
        this.tailed = true;
      }
      if (this.reversed == null) {
        this.reversed = false;
      }
      if (this.valid == null) {
        this.valid = true;
      }
      if (this.invalidate == null) {
        this.invalidate = 'overlap';
      }
      if (this.persistent == null) {
        this.persistent = true;
      }
      if (this.properties == null) {
        this.properties = {};
      }
      this.destroyed = false;
      Object.freeze(this.properties);
      this.updateIntervals();
    }

    Marker.prototype.serializeParams = function() {
      var range;
      range = this.range.serialize();
      return {
        id: this.id,
        range: range,
        tailed: this.tailed,
        reversed: this.reversed,
        valid: this.valid,
        invalidate: this.invalidate,
        persistent: this.persistent,
        properties: this.properties
      };
    };

    Marker.prototype.deserializeParams = function(state) {
      state.range = Range.deserialize(state.range);
      return state;
    };

    Marker.prototype.getRange = function() {
      return this.range;
    };

    Marker.prototype.setRange = function(range, properties) {
      var params;
      params = this.extractParams(properties);
      params.tailed = true;
      params.range = this.clipRange(Range.fromObject(range, true));
      return this.update(params);
    };

    Marker.prototype.getHeadPosition = function() {
      if (this.reversed) {
        return this.range.start;
      } else {
        return this.range.end;
      }
    };

    Marker.prototype.setHeadPosition = function(position, properties) {
      var params;
      position = this.clipPosition(Point.fromObject(position, true));
      params = this.extractParams(properties);
      if (this.hasTail()) {
        if (this.isReversed()) {
          if (position.isLessThan(this.range.end)) {
            params.range = new Range(position, this.range.end);
          } else {
            params.reversed = false;
            params.range = new Range(this.range.end, position);
          }
        } else {
          if (position.isLessThan(this.range.start)) {
            params.reversed = true;
            params.range = new Range(position, this.range.start);
          } else {
            params.range = new Range(this.range.start, position);
          }
        }
      } else {
        params.range = new Range(position, position);
      }
      return this.update(params);
    };

    Marker.prototype.getTailPosition = function() {
      if (this.hasTail()) {
        if (this.reversed) {
          return this.range.end;
        } else {
          return this.range.start;
        }
      } else {
        return this.getHeadPosition();
      }
    };

    Marker.prototype.setTailPosition = function(position, properties) {
      var params;
      position = this.clipPosition(Point.fromObject(position, true));
      params = this.extractParams(properties);
      params.tailed = true;
      if (this.reversed) {
        if (position.isLessThan(this.range.start)) {
          params.reversed = false;
          params.range = new Range(position, this.range.start);
        } else {
          params.range = new Range(this.range.start, position);
        }
      } else {
        if (position.isLessThan(this.range.end)) {
          params.range = new Range(position, this.range.end);
        } else {
          params.reversed = true;
          params.range = new Range(this.range.end, position);
        }
      }
      return this.update(params);
    };

    Marker.prototype.getStartPosition = function() {
      if (this.reversed) {
        return this.getHeadPosition();
      } else {
        return this.getTailPosition();
      }
    };

    Marker.prototype.getEndPosition = function() {
      if (this.reversed) {
        return this.getTailPosition();
      } else {
        return this.getHeadPosition();
      }
    };

    Marker.prototype.clearTail = function(properties) {
      var headPosition, params;
      params = this.extractParams(properties);
      params.tailed = false;
      headPosition = this.getHeadPosition();
      params.range = new Range(headPosition, headPosition);
      return this.update(params);
    };

    Marker.prototype.plantTail = function(properties) {
      var params;
      params = this.extractParams(properties);
      if (!this.hasTail()) {
        params.tailed = true;
        params.range = new Range(this.getHeadPosition(), this.getHeadPosition());
      }
      return this.update(params);
    };

    Marker.prototype.isReversed = function() {
      return this.tailed && this.reversed;
    };

    Marker.prototype.hasTail = function() {
      return this.tailed;
    };

    Marker.prototype.isValid = function() {
      return !this.isDestroyed() && this.valid;
    };

    Marker.prototype.isDestroyed = function() {
      return this.destroyed;
    };

    Marker.prototype.isEqual = function(other) {
      return isEqual(this.toParams(true), other.toParams(true));
    };

    Marker.prototype.getInvalidationStrategy = function() {
      return this.invalidate;
    };

    Marker.prototype.getAttributes = function() {
      Grim.deprecate("Use Marker::getProperties instead.");
      return this.getProperties();
    };

    Marker.prototype.setAttributes = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      Grim.deprecate("Use Marker::setProperties instead.");
      return this.setProperties.apply(this, args);
    };

    Marker.prototype.getProperties = function() {
      return this.properties;
    };

    Marker.prototype.setProperties = function(properties) {
      return this.update({
        properties: extend({}, this.getProperties(), properties)
      });
    };

    Marker.prototype.copy = function(params) {
      return this.manager.createMarker(extend(this.toParams(), this.extractParams(params)));
    };

    Marker.prototype.destroy = function() {
      this.destroyed = true;
      this.manager.removeMarker(this.id);
      this.manager.intervals.remove(this.id);
      return this.emit('destroyed');
    };

    Marker.prototype.extractParams = function(params) {
      params = this.constructor.extractParams(params);
      if (params.properties != null) {
        params.properties = extend({}, this.properties, params.properties);
      }
      return params;
    };

    Marker.prototype.compare = function(other) {
      return this.range.compare(other.range);
    };

    Marker.prototype.matchesAttributes = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.matchesParams.apply(this, args);
    };

    Marker.prototype.matchesParams = function(params) {
      var key, value;
      for (key in params) {
        value = params[key];
        if (!this.matchesParam(key, value)) {
          return false;
        }
      }
      return true;
    };

    Marker.prototype.matchesParam = function(key, value) {
      switch (key) {
        case 'startPosition':
          return this.getStartPosition().isEqual(value);
        case 'endPosition':
          return this.getEndPosition().isEqual(value);
        case 'containsPoint':
        case 'containsPosition':
          return this.containsPoint(value);
        case 'containsRange':
          return this.containsRange(value);
        case 'startRow':
          return this.getStartPosition().row === value;
        case 'endRow':
          return this.getEndPosition().row === value;
        case 'intersectsRow':
          return this.intersectsRow(value);
        case 'invalidate':
        case 'reversed':
        case 'tailed':
        case 'persistent':
          return isEqual(this[key], value);
        default:
          return isEqual(this.properties[key], value);
      }
    };

    Marker.prototype.toParams = function(omitId) {
      var params;
      params = {
        range: this.range,
        reversed: this.reversed,
        tailed: this.tailed,
        invalidate: this.invalidate,
        persistent: this.persistent,
        properties: this.properties
      };
      if (!omitId) {
        params.id = this.id;
      }
      return params;
    };

    Marker.prototype.update = function(params) {
      var patch;
      if (patch = this.buildPatch(params)) {
        this.manager.recordMarkerPatch(patch);
        this.applyPatch(patch);
        return true;
      } else {
        return false;
      }
    };

    Marker.prototype.handleBufferChange = function(patch) {
      var changePrecedesMarkerEnd, changePrecedesMarkerStart, changeSurroundsMarkerEnd, changeSurroundsMarkerStart, columnDelta, exclusive, markerEnd, markerPatch, markerStart, newMarkerRange, newRange, oldRange, rowDelta, valid;
      oldRange = patch.oldRange, newRange = patch.newRange;
      rowDelta = newRange.end.row - oldRange.end.row;
      columnDelta = newRange.end.column - oldRange.end.column;
      markerStart = this.range.start;
      markerEnd = this.range.end;
      if (markerEnd.isLessThan(oldRange.start)) {
        return;
      }
      switch (this.getInvalidationStrategy()) {
        case 'never':
          valid = true;
          break;
        case 'surround':
          valid = markerStart.isLessThan(oldRange.start) || oldRange.end.isLessThanOrEqual(markerEnd);
          break;
        case 'overlap':
          valid = !oldRange.containsPoint(markerStart, true) && !oldRange.containsPoint(markerEnd, true);
          break;
        case 'inside':
          if (this.hasTail()) {
            valid = oldRange.end.isLessThanOrEqual(markerStart) || markerEnd.isLessThanOrEqual(oldRange.start);
          } else {
            valid = this.valid;
          }
          break;
        case 'touch':
          valid = oldRange.end.isLessThan(markerStart) || markerEnd.isLessThan(oldRange.start);
      }
      newMarkerRange = this.range.copy();
      exclusive = !this.hasTail() || this.getInvalidationStrategy() === 'inside';
      changePrecedesMarkerStart = oldRange.end.isLessThan(markerStart) || (exclusive && oldRange.end.isLessThanOrEqual(markerStart));
      changeSurroundsMarkerStart = !changePrecedesMarkerStart && oldRange.start.isLessThan(markerStart);
      changePrecedesMarkerEnd = changePrecedesMarkerStart || oldRange.end.isLessThan(markerEnd) || (!exclusive && oldRange.end.isLessThanOrEqual(markerEnd));
      changeSurroundsMarkerEnd = !changePrecedesMarkerEnd && oldRange.start.isLessThan(markerEnd);
      if (changePrecedesMarkerStart) {
        newMarkerRange.start.row += rowDelta;
        if (oldRange.end.row === markerStart.row) {
          newMarkerRange.start.column += columnDelta;
        }
      } else if (changeSurroundsMarkerStart) {
        newMarkerRange.start = newRange.end;
      }
      if (changePrecedesMarkerEnd) {
        newMarkerRange.end.row += rowDelta;
        if (oldRange.end.row === markerEnd.row) {
          newMarkerRange.end.column += columnDelta;
        }
      } else if (changeSurroundsMarkerEnd) {
        newMarkerRange.end = newRange.end;
      }
      if (markerPatch = this.buildPatch({
        valid: valid,
        range: newMarkerRange
      })) {
        return patch.addMarkerPatch(markerPatch);
      }
    };

    Marker.prototype.buildPatch = function(newParams) {
      var name, oldParams, value;
      oldParams = {};
      for (name in newParams) {
        value = newParams[name];
        if (isEqual(this[name], value)) {
          delete newParams[name];
        } else {
          oldParams[name] = this[name];
        }
      }
      if (size(newParams)) {
        return new MarkerPatch(this.id, oldParams, newParams);
      }
    };

    Marker.prototype.applyPatch = function(patch, textChanged) {
      var hadTail, hasTail, isValid, newHeadPosition, newProperties, newTailPosition, oldHeadPosition, oldProperties, oldTailPosition, properties, range, reversed, tailed, updated, valid, wasValid, _ref1;
      if (textChanged == null) {
        textChanged = false;
      }
      oldHeadPosition = this.getHeadPosition();
      oldTailPosition = this.getTailPosition();
      wasValid = this.isValid();
      hadTail = this.hasTail();
      oldProperties = this.getProperties();
      updated = false;
      _ref1 = patch.newParams, range = _ref1.range, reversed = _ref1.reversed, tailed = _ref1.tailed, valid = _ref1.valid, properties = _ref1.properties;
      if ((range != null) && !range.isEqual(this.range)) {
        this.range = range.freeze();
        this.updateIntervals();
        updated = true;
      }
      if ((reversed != null) && reversed !== this.reversed) {
        this.reversed = reversed;
        updated = true;
      }
      if ((tailed != null) && tailed !== this.tailed) {
        this.tailed = tailed;
        updated = true;
      }
      if ((valid != null) && valid !== this.valid) {
        this.valid = valid;
        updated = true;
      }
      if ((properties != null) && !isEqual(properties, this.properties)) {
        this.properties = Object.freeze(properties);
        updated = true;
      }
      if (!updated) {
        return false;
      }
      newHeadPosition = this.getHeadPosition();
      newTailPosition = this.getTailPosition();
      isValid = this.isValid();
      hasTail = this.hasTail();
      newProperties = this.getProperties();
      this.emit('changed', {
        oldHeadPosition: oldHeadPosition,
        newHeadPosition: newHeadPosition,
        oldTailPosition: oldTailPosition,
        newTailPosition: newTailPosition,
        wasValid: wasValid,
        isValid: isValid,
        hadTail: hadTail,
        hasTail: hasTail,
        oldProperties: oldProperties,
        newProperties: newProperties,
        textChanged: textChanged
      });
      return true;
    };

    Marker.prototype.updateIntervals = function() {
      return this.manager.intervals.update(this.id, this.range.start, this.range.end);
    };

    return Marker;

  })();

}).call(this);
