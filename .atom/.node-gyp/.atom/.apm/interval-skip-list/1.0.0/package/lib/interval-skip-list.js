(function() {
  var DefaultComparator, IntervalSkipList, Node, clone, first, include, intersection, last, remove, union, _ref,
    __slice = [].slice;

  _ref = require('underscore'), clone = _ref.clone, include = _ref.include, first = _ref.first, last = _ref.last, union = _ref.union, intersection = _ref.intersection;

  remove = function(array, element) {
    var index;
    index = array.indexOf(element);
    if (index !== -1) {
      return array.splice(index, 1);
    }
  };

  DefaultComparator = function(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  };

  module.exports = IntervalSkipList = (function() {
    IntervalSkipList.prototype.maxHeight = 8;

    IntervalSkipList.prototype.probability = .25;

    function IntervalSkipList(params) {
      var i, _i, _ref1;
      if (params != null) {
        this.compare = params.compare, this.minIndex = params.minIndex, this.maxIndex = params.maxIndex;
      }
      if (this.compare == null) {
        this.compare = DefaultComparator;
      }
      if (this.minIndex == null) {
        this.minIndex = -Infinity;
      }
      if (this.maxIndex == null) {
        this.maxIndex = Infinity;
      }
      this.head = new Node(this.maxHeight, this.minIndex);
      this.tail = new Node(this.maxHeight, this.maxIndex);
      for (i = _i = 0, _ref1 = this.maxHeight; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        this.head.next[i] = this.tail;
      }
      this.intervalsByMarker = {};
    }

    IntervalSkipList.prototype.findContaining = function() {
      var i, markers, node, searchIndex, searchIndices, _i, _ref1;
      searchIndices = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (searchIndices.length > 1) {
        searchIndices = this.sortIndices(searchIndices);
        return intersection(this.findContaining(first(searchIndices)), this.findContaining(last(searchIndices)));
      }
      searchIndex = searchIndices[0];
      markers = [];
      node = this.head;
      for (i = _i = _ref1 = this.maxHeight - 1; _ref1 <= 1 ? _i <= 1 : _i >= 1; i = _ref1 <= 1 ? ++_i : --_i) {
        while (this.compare(node.next[i].index, searchIndex) < 0) {
          node = node.next[i];
        }
        markers.push.apply(markers, node.markers[i]);
      }
      while (this.compare(node.next[0].index, searchIndex) < 0) {
        node = node.next[0];
      }
      markers.push.apply(markers, node.markers[0]);
      node = node.next[0];
      if (this.compare(node.index, searchIndex) === 0) {
        return markers.concat(node.startingMarkers);
      } else {
        return markers;
      }
    };

    IntervalSkipList.prototype.findIntersecting = function() {
      var searchIndices,
        _this = this;
      searchIndices = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return union.apply(null, searchIndices.map(function(searchIndex) {
        return _this.findContaining(searchIndex);
      }));
    };

    IntervalSkipList.prototype.findStartingAt = function(searchIndex) {
      var node;
      node = this.findClosestNode(searchIndex);
      if (this.compare(node.index, searchIndex) === 0) {
        return node.startingMarkers;
      } else {
        return [];
      }
    };

    IntervalSkipList.prototype.findEndingAt = function(searchIndex) {
      var node;
      node = this.findClosestNode(searchIndex);
      if (this.compare(node.index, searchIndex) === 0) {
        return node.endingMarkers;
      } else {
        return [];
      }
    };

    IntervalSkipList.prototype.findStartingIn = function(searchStartIndex, searchEndIndex) {
      var markers, node;
      markers = [];
      node = this.findClosestNode(searchStartIndex);
      while (this.compare(node.index, searchEndIndex) <= 0) {
        markers.push.apply(markers, node.startingMarkers);
        node = node.next[0];
      }
      return markers;
    };

    IntervalSkipList.prototype.findEndingIn = function(searchStartIndex, searchEndIndex) {
      var markers, node;
      markers = [];
      node = this.findClosestNode(searchStartIndex);
      while (this.compare(node.index, searchEndIndex) <= 0) {
        markers.push.apply(markers, node.endingMarkers);
        node = node.next[0];
      }
      return markers;
    };

    IntervalSkipList.prototype.findContainedIn = function(searchStartIndex, searchEndIndex) {
      var marker, markers, node, startedMarkers, _i, _j, _len, _len1, _ref1, _ref2;
      startedMarkers = {};
      markers = [];
      node = this.findClosestNode(searchStartIndex);
      while (this.compare(node.index, searchEndIndex) <= 0) {
        _ref1 = node.startingMarkers;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          marker = _ref1[_i];
          startedMarkers[marker] = true;
        }
        _ref2 = node.endingMarkers;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          marker = _ref2[_j];
          if (startedMarkers[marker]) {
            markers.push(marker);
          }
        }
        node = node.next[0];
      }
      return markers;
    };

    IntervalSkipList.prototype.insert = function(marker, startIndex, endIndex) {
      var endNode, startNode;
      if (this.intervalsByMarker[marker] != null) {
        throw new Error("Interval for " + marker + " already exists.");
      }
      if (this.compare(startIndex, endIndex) > 0) {
        throw new Error("Start index " + startIndex + " must be <= end index " + endIndex);
      }
      if (this.compare(startIndex, this.minIndex) < 0) {
        throw new Error("Start index " + startIndex + " must be > min index " + this.minIndex);
      }
      if (this.compare(endIndex, this.maxIndex) >= 0) {
        throw new Error("Start index " + endIndex + " must be < max index " + this.maxIndex);
      }
      startNode = this.insertNode(startIndex);
      endNode = this.insertNode(endIndex);
      this.placeMarker(marker, startNode, endNode);
      return this.intervalsByMarker[marker] = [startIndex, endIndex];
    };

    IntervalSkipList.prototype.remove = function(marker) {
      var endIndex, endNode, interval, startIndex, startNode;
      if (!(interval = this.intervalsByMarker[marker])) {
        return;
      }
      startIndex = interval[0], endIndex = interval[1];
      delete this.intervalsByMarker[marker];
      startNode = this.findClosestNode(startIndex);
      endNode = this.findClosestNode(endIndex);
      this.removeMarker(marker, startNode, endNode);
      if (startNode.endpointMarkers.length === 0) {
        this.removeNode(startIndex);
      }
      if (endNode.endpointMarkers.length === 0) {
        return this.removeNode(endIndex);
      }
    };

    IntervalSkipList.prototype.update = function(marker, startIndex, endIndex) {
      this.remove(marker);
      return this.insert(marker, startIndex, endIndex);
    };

    IntervalSkipList.prototype.insertNode = function(index) {
      var closestNode, i, newNode, prevNode, update, _i, _ref1;
      update = this.buildUpdateArray();
      closestNode = this.findClosestNode(index, update);
      if (this.compare(closestNode.index, index) > 0) {
        newNode = new Node(this.getRandomNodeHeight(), index);
        for (i = _i = 0, _ref1 = newNode.height; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
          prevNode = update[i];
          newNode.next[i] = prevNode.next[i];
          prevNode.next[i] = newNode;
        }
        this.adjustMarkersOnInsert(newNode, update);
        return newNode;
      } else {
        return closestNode;
      }
    };

    IntervalSkipList.prototype.adjustMarkersOnInsert = function(node, updated) {
      var endIndex, i, marker, newPromoted, promoted, startIndex, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _n, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      promoted = [];
      newPromoted = [];
      for (i = _i = 0, _ref1 = node.height - 1; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        _ref2 = clone(updated[i].markers[i]);
        for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
          marker = _ref2[_j];
          _ref3 = this.intervalsByMarker[marker], startIndex = _ref3[0], endIndex = _ref3[1];
          if (this.compare(node.next[i + 1].index, endIndex) <= 0) {
            this.removeMarkerOnPath(marker, node.next[i], node.next[i + 1], i);
            newPromoted.push(marker);
          } else {
            node.addMarkerAtLevel(marker, i);
          }
        }
        _ref4 = clone(promoted);
        for (_k = 0, _len1 = _ref4.length; _k < _len1; _k++) {
          marker = _ref4[_k];
          _ref5 = this.intervalsByMarker[marker], startIndex = _ref5[0], endIndex = _ref5[1];
          if (this.compare(node.next[i + 1].index, endIndex) <= 0) {
            this.removeMarkerOnPath(marker, node.next[i], node.next[i + 1], i);
          } else {
            node.addMarkerAtLevel(marker, i);
            remove(promoted, marker);
          }
        }
        promoted = promoted.concat(newPromoted);
        newPromoted.length = 0;
      }
      node.addMarkersAtLevel(updated[i].markers[i].concat(promoted), i);
      promoted.length = 0;
      newPromoted.length = 0;
      for (i = _l = 0, _ref6 = node.height - 1; 0 <= _ref6 ? _l < _ref6 : _l > _ref6; i = 0 <= _ref6 ? ++_l : --_l) {
        _ref7 = clone(updated[i].markers[i]);
        for (_m = 0, _len2 = _ref7.length; _m < _len2; _m++) {
          marker = _ref7[_m];
          _ref8 = this.intervalsByMarker[marker], startIndex = _ref8[0], endIndex = _ref8[1];
          if (this.compare(startIndex, updated[i + 1].index) <= 0) {
            newPromoted.push(marker);
            this.removeMarkerOnPath(marker, updated[i + 1], node, i);
          }
        }
        _ref9 = clone(promoted);
        for (_n = 0, _len3 = _ref9.length; _n < _len3; _n++) {
          marker = _ref9[_n];
          _ref10 = this.intervalsByMarker[marker], startIndex = _ref10[0], endIndex = _ref10[1];
          if (this.compare(startIndex, updated[i + 1].index) <= 0) {
            this.removeMarkerOnPath(marker, updated[i + 1], node, i);
          } else {
            updated[i].addMarkerAtLevel(marker, i);
            remove(promoted, marker);
          }
        }
        promoted = promoted.concat(newPromoted);
        newPromoted.length = 0;
      }
      return updated[i].addMarkersAtLevel(promoted, i);
    };

    IntervalSkipList.prototype.removeNode = function(index) {
      var i, node, update, _i, _ref1, _results;
      update = this.buildUpdateArray();
      node = this.findClosestNode(index, update);
      if (this.compare(node.index, index) === 0) {
        this.adjustMarkersOnRemove(node, update);
        _results = [];
        for (i = _i = 0, _ref1 = node.height; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
          _results.push(update[i].next[i] = node.next[i]);
        }
        return _results;
      }
    };

    IntervalSkipList.prototype.adjustMarkersOnRemove = function(node, updated) {
      var demoted, endIndex, i, marker, newDemoted, startIndex, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _n, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _results;
      demoted = [];
      newDemoted = [];
      for (i = _i = _ref1 = node.height - 1; _ref1 <= 0 ? _i <= 0 : _i >= 0; i = _ref1 <= 0 ? ++_i : --_i) {
        _ref2 = clone(updated[i].markers[i]);
        for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
          marker = _ref2[_j];
          _ref3 = this.intervalsByMarker[marker], startIndex = _ref3[0], endIndex = _ref3[1];
          if (this.compare(node.next[i].index, endIndex) > 0) {
            newDemoted.push(marker);
            updated[i].removeMarkerAtLevel(marker, i);
          }
        }
        _ref4 = clone(demoted);
        for (_k = 0, _len1 = _ref4.length; _k < _len1; _k++) {
          marker = _ref4[_k];
          this.placeMarkerOnPath(marker, updated[i + 1], updated[i], i);
          _ref5 = this.intervalsByMarker[marker], startIndex = _ref5[0], endIndex = _ref5[1];
          if (this.compare(node.next[i].index, endIndex) <= 0) {
            updated[i].addMarkerAtLevel(marker, i);
            remove(demoted, marker);
          }
        }
        demoted.push.apply(demoted, newDemoted);
        newDemoted.length = 0;
      }
      demoted.length = 0;
      newDemoted.length = 0;
      _results = [];
      for (i = _l = _ref6 = node.height - 1; _ref6 <= 0 ? _l <= 0 : _l >= 0; i = _ref6 <= 0 ? ++_l : --_l) {
        _ref7 = node.markers[i];
        for (_m = 0, _len2 = _ref7.length; _m < _len2; _m++) {
          marker = _ref7[_m];
          _ref8 = this.intervalsByMarker[marker], startIndex = _ref8[0], endIndex = _ref8[1];
          if (this.compare(updated[i].index, startIndex) < 0) {
            newDemoted.push(marker);
          }
        }
        _ref9 = clone(demoted);
        for (_n = 0, _len3 = _ref9.length; _n < _len3; _n++) {
          marker = _ref9[_n];
          this.placeMarkerOnPath(marker, node.next[i], node.next[i + 1], i);
          _ref10 = this.intervalsByMarker[marker], startIndex = _ref10[0], endIndex = _ref10[1];
          if (this.compare(updated[i].index, startIndex) >= 0) {
            remove(demoted, marker);
          }
        }
        demoted.push.apply(demoted, newDemoted);
        _results.push(newDemoted.length = 0);
      }
      return _results;
    };

    IntervalSkipList.prototype.placeMarker = function(marker, startNode, endNode) {
      var endIndex, i, node, startIndex, _results;
      startNode.addStartingMarker(marker);
      endNode.addEndingMarker(marker);
      startIndex = startNode.index;
      endIndex = endNode.index;
      node = startNode;
      i = 0;
      while (this.compare(node.next[i].index, endIndex) <= 0) {
        while (i < node.height - 1 && this.compare(node.next[i + 1].index, endIndex) <= 0) {
          i++;
        }
        node.addMarkerAtLevel(marker, i);
        node = node.next[i];
      }
      _results = [];
      while (node !== endNode) {
        while (i > 0 && this.compare(node.next[i].index, endIndex) > 0) {
          i--;
        }
        if (node == null) {
          debugger;
        }
        node.addMarkerAtLevel(marker, i);
        _results.push(node = node.next[i]);
      }
      return _results;
    };

    IntervalSkipList.prototype.removeMarker = function(marker, startNode, endNode) {
      var endIndex, i, node, startIndex, _results;
      startNode.removeStartingMarker(marker);
      endNode.removeEndingMarker(marker);
      startIndex = startNode.index;
      endIndex = endNode.index;
      node = startNode;
      i = 0;
      while (this.compare(node.next[i].index, endIndex) <= 0) {
        while (i < node.height - 1 && this.compare(node.next[i + 1].index, endIndex) <= 0) {
          i++;
        }
        node.removeMarkerAtLevel(marker, i);
        node = node.next[i];
      }
      _results = [];
      while (node !== endNode) {
        while (i > 0 && this.compare(node.next[i].index, endIndex) > 0) {
          i--;
        }
        node.removeMarkerAtLevel(marker, i);
        _results.push(node = node.next[i]);
      }
      return _results;
    };

    IntervalSkipList.prototype.removeMarkerOnPath = function(marker, startNode, endNode, level) {
      var node, _results;
      node = startNode;
      _results = [];
      while (node !== endNode) {
        node.removeMarkerAtLevel(marker, level);
        _results.push(node = node.next[level]);
      }
      return _results;
    };

    IntervalSkipList.prototype.placeMarkerOnPath = function(marker, startNode, endNode, level) {
      var node, _results;
      node = startNode;
      _results = [];
      while (node !== endNode) {
        node.addMarkerAtLevel(marker, level);
        _results.push(node = node.next[level]);
      }
      return _results;
    };

    IntervalSkipList.prototype.buildUpdateArray = function() {
      var i, path, _i, _ref1;
      path = new Array(this.maxHeight);
      for (i = _i = 0, _ref1 = this.maxHeight; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        path[i] = this.head;
      }
      return path;
    };

    IntervalSkipList.prototype.findClosestNode = function(index, update) {
      var currentNode, i, _i, _ref1;
      currentNode = this.head;
      for (i = _i = _ref1 = this.maxHeight - 1; _ref1 <= 0 ? _i <= 0 : _i >= 0; i = _ref1 <= 0 ? ++_i : --_i) {
        while (this.compare(currentNode.next[i].index, index) < 0) {
          currentNode = currentNode.next[i];
        }
        if (update != null) {
          update[i] = currentNode;
        }
      }
      return currentNode.next[0];
    };

    IntervalSkipList.prototype.sortIndices = function(indices) {
      var _this = this;
      return clone(indices).sort(function(a, b) {
        return _this.compare(a, b);
      });
    };

    IntervalSkipList.prototype.getRandomNodeHeight = function() {
      var height;
      height = 1;
      while (height < this.maxHeight && Math.random() < this.probability) {
        height++;
      }
      return height;
    };

    IntervalSkipList.prototype.verifyMarkerInvariant = function() {
      var endIndex, marker, node, startIndex, _ref1, _ref2, _results;
      _ref1 = this.intervalsByMarker;
      _results = [];
      for (marker in _ref1) {
        _ref2 = _ref1[marker], startIndex = _ref2[0], endIndex = _ref2[1];
        node = this.findClosestNode(startIndex);
        if (this.compare(node.index, startIndex) !== 0) {
          throw new Error("Could not find node for marker " + marker + " with start index " + startIndex);
        }
        _results.push(node.verifyMarkerInvariant(marker, endIndex, this.compare));
      }
      return _results;
    };

    return IntervalSkipList;

  })();

  Node = (function() {
    function Node(height, index) {
      var i, _i, _ref1;
      this.height = height;
      this.index = index;
      this.next = new Array(this.height);
      this.markers = new Array(this.height);
      for (i = _i = 0, _ref1 = this.height; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        this.markers[i] = [];
      }
      this.endpointMarkers = [];
      this.startingMarkers = [];
      this.endingMarkers = [];
    }

    Node.prototype.addStartingMarker = function(marker) {
      this.startingMarkers.push(marker);
      return this.endpointMarkers.push(marker);
    };

    Node.prototype.removeStartingMarker = function(marker) {
      remove(this.startingMarkers, marker);
      return remove(this.endpointMarkers, marker);
    };

    Node.prototype.addEndingMarker = function(marker) {
      this.endingMarkers.push(marker);
      return this.endpointMarkers.push(marker);
    };

    Node.prototype.removeEndingMarker = function(marker) {
      remove(this.endingMarkers, marker);
      return remove(this.endpointMarkers, marker);
    };

    Node.prototype.removeMarkerAtLevel = function(marker, level) {
      return remove(this.markers[level], marker);
    };

    Node.prototype.addMarkerAtLevel = function(marker, level) {
      return this.markers[level].push(marker);
    };

    Node.prototype.addMarkersAtLevel = function(markers, level) {
      var marker, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = markers.length; _i < _len; _i++) {
        marker = markers[_i];
        _results.push(this.addMarkerAtLevel(marker, level));
      }
      return _results;
    };

    Node.prototype.markersAboveLevel = function(level) {
      return flatten(this.markers.slice(level, this.height));
    };

    Node.prototype.verifyMarkerInvariant = function(marker, endIndex, compare) {
      var i, nextIndex, _i, _ref1;
      if (compare(this.index, endIndex) === 0) {
        return;
      }
      for (i = _i = _ref1 = this.height - 1; _ref1 <= 0 ? _i <= 0 : _i >= 0; i = _ref1 <= 0 ? ++_i : --_i) {
        nextIndex = this.next[i].index;
        if (compare(nextIndex, endIndex) <= 0) {
          if (!include(this.markers[i], marker)) {
            throw new Error("Node at " + this.index + " should have marker " + marker + " at level " + i + " pointer to node at " + nextIndex + " <= " + endIndex);
          }
          if (i > 0) {
            this.verifyNotMarkedBelowLevel(marker, i, nextIndex, compare);
          }
          this.next[i].verifyMarkerInvariant(marker, endIndex, compare);
          return;
        }
      }
      throw new Error("Node at " + this.index + " should have marker " + marker + " on some forward pointer to an index <= " + endIndex + ", but it doesn't");
    };

    Node.prototype.verifyNotMarkedBelowLevel = function(marker, level, untilIndex, compare) {
      var i, _i, _ref1;
      for (i = _i = _ref1 = level - 1; _ref1 <= 0 ? _i <= 0 : _i >= 0; i = _ref1 <= 0 ? ++_i : --_i) {
        if (include(this.markers[i], marker)) {
          throw new Error("Node at " + this.index + " should not have marker " + marker + " at level " + i + " pointer to node at " + this.next[i].index);
        }
      }
      if (compare(this.next[0].index, untilIndex) < 0) {
        return this.next[0].verifyNotMarkedBelowLevel(marker, level, untilIndex, compare);
      }
    };

    return Node;

  })();

}).call(this);
