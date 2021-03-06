(function() {
  var Delegator, IntervalSkipList, Marker, MarkerManager, Point, Range, Serializable, clone, compact, defaults, intersection, keys, max, omit, size, values, _ref;

  IntervalSkipList = require('interval-skip-list');

  Serializable = require('serializable');

  Delegator = require('delegato');

  _ref = require('underscore-plus'), omit = _ref.omit, defaults = _ref.defaults, values = _ref.values, clone = _ref.clone, compact = _ref.compact, intersection = _ref.intersection, keys = _ref.keys, max = _ref.max, size = _ref.size;

  Marker = require('./marker');

  Point = require('./point');

  Range = require('./range');

  module.exports = MarkerManager = (function() {
    Serializable.includeInto(MarkerManager);

    Delegator.includeInto(MarkerManager);

    MarkerManager.delegatesMethods('clipPosition', 'clipRange', {
      toProperty: 'buffer'
    });

    MarkerManager.prototype.nextMarkerId = 1;

    function MarkerManager(buffer, markers) {
      this.buffer = buffer;
      this.markers = markers;
      if (this.intervals == null) {
        this.intervals = this.buildIntervals();
      }
      if (this.markers != null) {
        this.nextMarkerId = max(keys(this.markers).map(function(id) {
          return parseInt(id);
        })) + 1;
      } else {
        this.markers = {};
      }
    }

    MarkerManager.prototype.buildIntervals = function() {
      return new IntervalSkipList({
        compare: function(a, b) {
          return a.compare(b);
        },
        minIndex: new Point(-Infinity, -Infinity),
        maxIndex: new Point(Infinity, Infinity)
      });
    };

    MarkerManager.prototype.serializeParams = function() {
      var id, marker, markers, _ref1;
      markers = {};
      _ref1 = this.markers;
      for (id in _ref1) {
        marker = _ref1[id];
        if (marker.persistent) {
          markers[id] = marker.serialize();
        }
      }
      return {
        markers: markers
      };
    };

    MarkerManager.prototype.deserializeParams = function(state) {
      var id, markerState, _ref1;
      this.intervals = this.buildIntervals();
      _ref1 = state.markers;
      for (id in _ref1) {
        markerState = _ref1[id];
        state.markers[id] = Marker.deserialize(markerState, {
          manager: this
        });
      }
      return state;
    };

    MarkerManager.prototype.markRange = function(range, properties) {
      var params;
      range = this.clipRange(Range.fromObject(range, true)).freeze();
      params = Marker.extractParams(properties);
      params.range = range;
      return this.createMarker(params);
    };

    MarkerManager.prototype.markPosition = function(position, properties) {
      return this.markRange(new Range(position, position), defaults({
        tailed: false
      }, properties));
    };

    MarkerManager.prototype.getMarker = function(id) {
      return this.markers[id];
    };

    MarkerManager.prototype.getMarkers = function() {
      return values(this.markers);
    };

    MarkerManager.prototype.getMarkerCount = function() {
      return size(this.markers);
    };

    MarkerManager.prototype.findMarkers = function(params) {
      var candidateIds, candidates, key, markers, range, value;
      params = clone(params);
      candidateIds = [];
      for (key in params) {
        value = params[key];
        switch (key) {
          case 'startPosition':
            candidateIds.push(this.intervals.findStartingAt(Point.fromObject(value)));
            delete params[key];
            break;
          case 'endPosition':
            candidateIds.push(this.intervals.findEndingAt(Point.fromObject(value)));
            delete params[key];
            break;
          case 'containsPoint':
            candidateIds.push(this.intervals.findContaining(Point.fromObject(value)));
            delete params[key];
            break;
          case 'containsRange':
            range = Range.fromObject(value);
            candidateIds.push(this.intervals.findContaining(range.start, range.end));
            delete params[key];
            break;
          case 'containedInRange':
            range = Range.fromObject(value);
            candidateIds.push(this.intervals.findContainedIn(range.start, range.end));
            delete params[key];
            break;
          case 'startRow':
            candidateIds.push(this.intervals.findStartingIn(new Point(value, 0), new Point(value, Infinity)));
            delete params[key];
            break;
          case 'endRow':
            candidateIds.push(this.intervals.findEndingIn(new Point(value, 0), new Point(value, Infinity)));
            delete params[key];
            break;
          case 'intersectsRow':
            candidateIds.push(this.intervals.findIntersecting(new Point(value, 0), new Point(value, Infinity)));
            delete params[key];
        }
      }
      if (candidateIds.length > 0) {
        candidates = compact(intersection.apply(null, candidateIds).map((function(_this) {
          return function(id) {
            return _this.getMarker(id);
          };
        })(this)));
      } else {
        candidates = this.getMarkers();
      }
      markers = candidates.filter(function(marker) {
        return marker.matchesParams(params);
      });
      return markers.sort(function(a, b) {
        return a.compare(b);
      });
    };

    MarkerManager.prototype.createMarker = function(params) {
      var marker;
      params.manager = this;
      params.id = this.nextMarkerId++;
      marker = new Marker(params);
      this.markers[marker.id] = marker;
      this.buffer.emit('marker-created', marker);
      return marker;
    };

    MarkerManager.prototype.removeMarker = function(id) {
      return delete this.markers[id];
    };

    MarkerManager.prototype.recordMarkerPatch = function(patch) {
      if (this.buffer.isTransacting()) {
        return this.buffer.history.recordNewPatch(patch);
      }
    };

    MarkerManager.prototype.handleBufferChange = function(patch) {
      var id, marker, _ref1, _results;
      _ref1 = this.markers;
      _results = [];
      for (id in _ref1) {
        marker = _ref1[id];
        _results.push(marker.handleBufferChange(patch));
      }
      return _results;
    };

    MarkerManager.prototype.applyPatches = function(markerPatches, textChanged) {
      var id, patch, _ref1, _results;
      _results = [];
      for (id in markerPatches) {
        patch = markerPatches[id];
        _results.push((_ref1 = this.getMarker(id)) != null ? _ref1.applyPatch(patch, textChanged) : void 0);
      }
      return _results;
    };

    MarkerManager.prototype.pauseChangeEvents = function() {
      var marker, _i, _len, _ref1, _results;
      _ref1 = this.getMarkers();
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        marker = _ref1[_i];
        _results.push(marker.pauseEvents('changed'));
      }
      return _results;
    };

    MarkerManager.prototype.resumeChangeEvents = function() {
      var marker, _i, _len, _ref1, _results;
      _ref1 = this.getMarkers();
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        marker = _ref1[_i];
        _results.push(marker.resumeEvents('changed'));
      }
      return _results;
    };

    return MarkerManager;

  })();

}).call(this);
