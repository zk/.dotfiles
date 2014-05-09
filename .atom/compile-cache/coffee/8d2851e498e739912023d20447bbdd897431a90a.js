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
        "class": '',
        tabindex: -1
      }, (function(_this) {
        return function() {
          return _this.div("The Clojure package is Alive! It's ALIVE!");
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

    ClojureView.prototype.getTitle = 'Hello World';

    return ClojureView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFdBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLEVBQVA7QUFBQSxRQUFXLFFBQUEsRUFBVSxDQUFBLENBQXJCO09BQUwsRUFBOEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDNUIsS0FBQyxDQUFBLEdBQUQsQ0FBSywyQ0FBTCxFQUQ0QjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTlCLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsMEJBSUEsVUFBQSxHQUFZLFNBQUMsY0FBRCxHQUFBO2FBQ1YsNkNBQUEsU0FBQSxFQURVO0lBQUEsQ0FKWixDQUFBOztBQUFBLDBCQVFBLFNBQUEsR0FBVyxTQUFBLEdBQUEsQ0FSWCxDQUFBOztBQUFBLDBCQVdBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsTUFBRCxDQUFBLEVBRE87SUFBQSxDQVhULENBQUE7O0FBQUEsMEJBY0EsUUFBQSxHQUFVLGFBZFYsQ0FBQTs7dUJBQUE7O0tBRHdCLFdBSDFCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure-view.coffee