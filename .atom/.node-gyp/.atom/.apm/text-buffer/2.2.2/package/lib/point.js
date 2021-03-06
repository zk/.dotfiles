(function() {
  var Point;

  module.exports = Point = (function() {
    Point.fromObject = function(object, copy) {
      var column, row;
      if (object instanceof Point) {
        if (copy) {
          return object.copy();
        } else {
          return object;
        }
      } else {
        if (Array.isArray(object)) {
          row = object[0], column = object[1];
        } else {
          row = object.row, column = object.column;
        }
        return new Point(row, column);
      }
    };

    Point.min = function(point1, point2) {
      point1 = this.fromObject(point1);
      point2 = this.fromObject(point2);
      if (point1.isLessThanOrEqual(point2)) {
        return point1;
      } else {
        return point2;
      }
    };

    function Point(row, column) {
      this.row = row != null ? row : 0;
      this.column = column != null ? column : 0;
    }

    Point.prototype.copy = function() {
      return new Point(this.row, this.column);
    };

    Point.prototype.freeze = function() {
      return Object.freeze(this);
    };

    Point.prototype.translate = function(delta) {
      var column, row, _ref;
      _ref = Point.fromObject(delta), row = _ref.row, column = _ref.column;
      return new Point(this.row + row, this.column + column);
    };

    Point.prototype.add = function(other) {
      var column, row;
      other = Point.fromObject(other);
      row = this.row + other.row;
      if (other.row === 0) {
        column = this.column + other.column;
      } else {
        column = other.column;
      }
      return new Point(row, column);
    };

    Point.prototype.splitAt = function(column) {
      var rightColumn;
      if (this.row === 0) {
        rightColumn = this.column - column;
      } else {
        rightColumn = this.column;
      }
      return [new Point(0, column), new Point(this.row, rightColumn)];
    };

    Point.prototype.compare = function(other) {
      if (this.row > other.row) {
        return 1;
      } else if (this.row < other.row) {
        return -1;
      } else {
        if (this.column > other.column) {
          return 1;
        } else if (this.column < other.column) {
          return -1;
        } else {
          return 0;
        }
      }
    };

    Point.prototype.isEqual = function(other) {
      if (!other) {
        return false;
      }
      other = Point.fromObject(other);
      return this.row === other.row && this.column === other.column;
    };

    Point.prototype.isLessThan = function(other) {
      return this.compare(other) < 0;
    };

    Point.prototype.isLessThanOrEqual = function(other) {
      return this.compare(other) <= 0;
    };

    Point.prototype.isGreaterThan = function(other) {
      return this.compare(other) > 0;
    };

    Point.prototype.isGreaterThanOrEqual = function(other) {
      return this.compare(other) >= 0;
    };

    Point.prototype.toArray = function() {
      return [this.row, this.column];
    };

    Point.prototype.serialize = function() {
      return this.toArray();
    };

    Point.prototype.toString = function() {
      return "(" + this.row + ", " + this.column + ")";
    };

    return Point;

  })();

}).call(this);
