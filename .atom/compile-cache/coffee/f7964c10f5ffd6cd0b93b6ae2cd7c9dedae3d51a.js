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
        tabindex: -1
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFdBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLFdBQVA7QUFBQSxRQUFvQixRQUFBLEVBQVUsQ0FBQSxDQUE5QjtPQUFMLEVBQXVDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3JDLEtBQUMsQ0FBQSxFQUFELENBQUksU0FBQSxHQUFBO21CQUNGLEtBQUMsQ0FBQSxFQUFELENBQUksTUFBSixFQURFO1VBQUEsQ0FBSixFQURxQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXZDLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsMEJBS0EsVUFBQSxHQUFZLFNBQUMsY0FBRCxHQUFBO2FBQ1YsNkNBQUEsU0FBQSxFQURVO0lBQUEsQ0FMWixDQUFBOztBQUFBLDBCQVNBLFNBQUEsR0FBVyxTQUFBLEdBQUEsQ0FUWCxDQUFBOztBQUFBLDBCQVlBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsTUFBRCxDQUFBLEVBRE87SUFBQSxDQVpULENBQUE7O0FBQUEsMEJBZUEsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLGNBQUg7SUFBQSxDQWZWLENBQUE7O3VCQUFBOztLQUR3QixXQUgxQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure-view.coffee