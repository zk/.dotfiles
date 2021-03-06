(function() {
  var Grim, Point, Range, newlineRegex,
    __slice = [].slice;

  Grim = require('grim');

  Point = require('./point');

  newlineRegex = require('./helpers').newlineRegex;

  module.exports = Range = (function() {
    Range.deserialize = function(array) {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(this, array, function(){});
    };

    Range.fromObject = function(object, copy) {
      if (Array.isArray(object)) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(this, object, function(){});
      } else if (object instanceof this) {
        if (copy) {
          return object.copy();
        } else {
          return object;
        }
      } else {
        return new this(object.start, object.end);
      }
    };

    Range.fromText = function() {
      var args, endPoint, lastIndex, lines, startPoint, text;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (args.length > 1) {
        startPoint = Point.fromObject(args.shift());
      } else {
        startPoint = new Point(0, 0);
      }
      text = args.shift();
      endPoint = startPoint.copy();
      lines = text.split(newlineRegex);
      if (lines.length > 1) {
        lastIndex = lines.length - 1;
        endPoint.row += lastIndex;
        endPoint.column = lines[lastIndex].length;
      } else {
        endPoint.column += lines[0].length;
      }
      return new this(startPoint, endPoint);
    };

    Range.fromPointWithDelta = function(startPoint, rowDelta, columnDelta) {
      var endPoint;
      startPoint = Point.fromObject(startPoint);
      endPoint = new Point(startPoint.row + rowDelta, startPoint.column + columnDelta);
      return new this(startPoint, endPoint);
    };

    function Range(pointA, pointB) {
      if (pointA == null) {
        pointA = new Point(0, 0);
      }
      if (pointB == null) {
        pointB = new Point(0, 0);
      }
      pointA = Point.fromObject(pointA);
      pointB = Point.fromObject(pointB);
      if (pointA.isLessThanOrEqual(pointB)) {
        this.start = pointA;
        this.end = pointB;
      } else {
        this.start = pointB;
        this.end = pointA;
      }
    }

    Range.prototype.serialize = function() {
      return [this.start.serialize(), this.end.serialize()];
    };

    Range.prototype.copy = function() {
      return new this.constructor(this.start.copy(), this.end.copy());
    };

    Range.prototype.freeze = function() {
      this.start.freeze();
      this.end.freeze();
      return Object.freeze(this);
    };

    Range.prototype.isEqual = function(other) {
      if (other == null) {
        return false;
      }
      if (Array.isArray(other) && other.length === 2) {
        other = (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(this.constructor, other, function(){});
      }
      return other.start.isEqual(this.start) && other.end.isEqual(this.end);
    };

    Range.prototype.compare = function(other) {
      var value;
      other = this.constructor.fromObject(other);
      if (value = this.start.compare(other.start)) {
        return value;
      } else {
        return other.end.compare(this.end);
      }
    };

    Range.prototype.isSingleLine = function() {
      return this.start.row === this.end.row;
    };

    Range.prototype.coversSameRows = function(other) {
      return this.start.row === other.start.row && this.end.row === other.end.row;
    };

    Range.prototype.add = function(delta) {
      return new this.constructor(this.start.add(delta), this.end.add(delta));
    };

    Range.prototype.translate = function(startPoint, endPoint) {
      if (endPoint == null) {
        endPoint = startPoint;
      }
      return new this.constructor(this.start.translate(startPoint), this.end.translate(endPoint));
    };

    Range.prototype.intersectsWith = function(otherRange) {
      if (this.start.isLessThanOrEqual(otherRange.start)) {
        return this.end.isGreaterThanOrEqual(otherRange.start);
      } else {
        return otherRange.intersectsWith(this);
      }
    };

    Range.prototype.containsRange = function(otherRange, exclusive) {
      var end, start, _ref;
      _ref = this.constructor.fromObject(otherRange), start = _ref.start, end = _ref.end;
      return this.containsPoint(start, exclusive) && this.containsPoint(end, exclusive);
    };

    Range.prototype.containsPoint = function(point, exclusive) {
      if ((exclusive != null) && typeof exclusive === 'object') {
        Grim.deprecate("The second param is not longer an object, it's a boolean argument named `exclusive`.");
        exclusive = exclusive.exclusive;
      }
      point = Point.fromObject(point);
      if (exclusive) {
        return point.isGreaterThan(this.start) && point.isLessThan(this.end);
      } else {
        return point.isGreaterThanOrEqual(this.start) && point.isLessThanOrEqual(this.end);
      }
    };

    Range.prototype.intersectsRow = function(row) {
      return (this.start.row <= row && row <= this.end.row);
    };

    Range.prototype.intersectsRowRange = function(startRow, endRow) {
      var _ref;
      if (startRow > endRow) {
        _ref = [endRow, startRow], startRow = _ref[0], endRow = _ref[1];
      }
      return this.end.row >= startRow && endRow >= this.start.row;
    };

    Range.prototype.union = function(otherRange) {
      var end, start;
      start = this.start.isLessThan(otherRange.start) ? this.start : otherRange.start;
      end = this.end.isGreaterThan(otherRange.end) ? this.end : otherRange.end;
      return new this.constructor(start, end);
    };

    Range.prototype.isEmpty = function() {
      return this.start.isEqual(this.end);
    };

    Range.prototype.toDelta = function() {
      var columns, rows;
      rows = this.end.row - this.start.row;
      if (rows === 0) {
        columns = this.end.column - this.start.column;
      } else {
        columns = this.end.column;
      }
      return new Point(rows, columns);
    };

    Range.prototype.getRowCount = function() {
      return this.end.row - this.start.row + 1;
    };

    Range.prototype.getRows = function() {
      var _i, _ref, _ref1, _results;
      return (function() {
        _results = [];
        for (var _i = _ref = this.start.row, _ref1 = this.end.row; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
    };

    Range.prototype.toString = function() {
      return "[" + this.start + " - " + this.end + "]";
    };

    return Range;

  })();

}).call(this);
