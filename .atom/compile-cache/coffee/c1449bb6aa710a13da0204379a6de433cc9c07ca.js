(function() {
  var ClojureView, ScrollView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ScrollView = require('atom').ScrollView;

  module.exports = ClojureView = (function(_super) {
    __extends(ClojureView, _super);

    function ClojureView() {
      return ClojureView.__super__.constructor.apply(this, arguments);
    }

    ClojureView.content = function() {
      return this.div({
        "class": 'repl-view',
        tabindex: 0
      }, (function(_this) {
        return function() {
          return _this.ul(function() {
            return _this.li('one!');
          });
        };
      })(this));
    };

    ClojureView.prototype.initialize = function(serializeState) {
      return ClojureView.__super__.initialize.apply(this, arguments);
    };

    ClojureView.prototype.serialize = function() {};

    ClojureView.prototype.destroy = function() {
      return this.detach();
    };

    ClojureView.prototype.getTitle = function() {
      return 'Hello World';
    };

    return ClojureView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFdBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLFdBQVA7QUFBQSxRQUFvQixRQUFBLEVBQVUsQ0FBOUI7T0FBTCxFQUFzQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNwQyxLQUFDLENBQUEsRUFBRCxDQUFJLFNBQUEsR0FBQTttQkFDRixLQUFDLENBQUEsRUFBRCxDQUFJLE1BQUosRUFERTtVQUFBLENBQUosRUFEb0M7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0QyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDBCQUtBLFVBQUEsR0FBWSxTQUFDLGNBQUQsR0FBQTthQUNWLDZDQUFBLFNBQUEsRUFEVTtJQUFBLENBTFosQ0FBQTs7QUFBQSwwQkFTQSxTQUFBLEdBQVcsU0FBQSxHQUFBLENBVFgsQ0FBQTs7QUFBQSwwQkFZQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURPO0lBQUEsQ0FaVCxDQUFBOztBQUFBLDBCQWVBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFBRyxjQUFIO0lBQUEsQ0FmVixDQUFBOzt1QkFBQTs7S0FEd0IsV0FIMUIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure-view.coffee