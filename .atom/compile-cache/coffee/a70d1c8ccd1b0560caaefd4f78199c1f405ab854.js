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
          return _this.ul(function() {});
        };
      })(this));
    };

    ClojureView.prototype.initialize = function(uri) {
      ClojureView.__super__.initialize.apply(this, arguments);
      return this.uri = uri;
    };

    ClojureView.prototype.serialize = function() {};

    ClojureView.prototype.destroy = function() {
      return this.detach();
    };

    ClojureView.prototype.getTitle = function() {
      return this.uri;
    };

    ClojureView.prototype.output = function(text) {
      return this.list.append(this.li(text));
    };

    return ClojureView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFdBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLFdBQVA7QUFBQSxRQUFvQixRQUFBLEVBQVUsQ0FBQSxDQUE5QjtPQUFMLEVBQXVDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3JDLEtBQUMsQ0FBQSxFQUFELENBQUksU0FBQSxHQUFBLENBQUosRUFEcUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDBCQUtBLFVBQUEsR0FBWSxTQUFDLEdBQUQsR0FBQTtBQUNWLE1BQUEsNkNBQUEsU0FBQSxDQUFBLENBQUE7YUFFQSxJQUFDLENBQUEsR0FBRCxHQUFPLElBSEc7SUFBQSxDQUxaLENBQUE7O0FBQUEsMEJBV0EsU0FBQSxHQUFXLFNBQUEsR0FBQSxDQVhYLENBQUE7O0FBQUEsMEJBY0EsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxNQUFELENBQUEsRUFETztJQUFBLENBZFQsQ0FBQTs7QUFBQSwwQkFpQkEsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxJQUFKO0lBQUEsQ0FqQlYsQ0FBQTs7QUFBQSwwQkFtQkEsTUFBQSxHQUFRLFNBQUMsSUFBRCxHQUFBO2FBQ04sSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLENBQWEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxJQUFKLENBQWIsRUFETTtJQUFBLENBbkJSLENBQUE7O3VCQUFBOztLQUR3QixXQUgxQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure-view.coffee