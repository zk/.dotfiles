(function() {
  var ClojureView, NC, ScrollView, URL,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ScrollView = require('atom').ScrollView;

  URL = require('url');

  NC = require('nrepl-client');

  module.exports = ClojureView = (function(_super) {
    __extends(ClojureView, _super);

    function ClojureView() {
      return ClojureView.__super__.constructor.apply(this, arguments);
    }

    ClojureView.content = function() {
      return this.div({
        "class": 'editor repl-view scroll-view',
        tabindex: -1
      }, (function(_this) {
        return function() {
          return _this.ul({
            outlet: 'list'
          });
        };
      })(this));
    };

    ClojureView.prototype.initialize = function(uri) {
      ClojureView.__super__.initialize.apply(this, arguments);
      return this.uri = uri;
    };

    ClojureView.prototype.serialize = function() {
      console.log('serialize');
      return {
        deserializer: 'ClojureView',
        version: 1,
        uri: this.uri
      };
    };

    ClojureView.prototype.destroy = function() {
      return this.detach();
    };

    ClojureView.prototype.getTitle = function() {
      return this.uri;
    };

    ClojureView.prototype.getModel = function() {
      return null;
    };

    ClojureView.prototype.output = function(text) {
      return this.list.append('<li>' + text + '</li>');
    };

    return ClojureView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBRE4sQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQUZMLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osa0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsV0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sOEJBQVA7QUFBQSxRQUF1QyxRQUFBLEVBQVUsQ0FBQSxDQUFqRDtPQUFMLEVBQTBELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3hELEtBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxZQUFBLE1BQUEsRUFBUSxNQUFSO1dBQUosRUFEd0Q7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExRCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDBCQUlBLFVBQUEsR0FBWSxTQUFDLEdBQUQsR0FBQTtBQUNWLE1BQUEsNkNBQUEsU0FBQSxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsR0FBRCxHQUFPLElBRkc7SUFBQSxDQUpaLENBQUE7O0FBQUEsMEJBU0EsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxXQUFaLENBQUEsQ0FBQTthQUNBO0FBQUEsUUFBQSxZQUFBLEVBQWMsYUFBZDtBQUFBLFFBQ0EsT0FBQSxFQUFTLENBRFQ7QUFBQSxRQUVBLEdBQUEsRUFBSyxJQUFDLENBQUEsR0FGTjtRQUZTO0lBQUEsQ0FUWCxDQUFBOztBQUFBLDBCQWdCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURPO0lBQUEsQ0FoQlQsQ0FBQTs7QUFBQSwwQkFtQkEsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxJQUFKO0lBQUEsQ0FuQlYsQ0FBQTs7QUFBQSwwQkFxQkEsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLEtBQUg7SUFBQSxDQXJCVixDQUFBOztBQUFBLDBCQXVCQSxNQUFBLEdBQVEsU0FBQyxJQUFELEdBQUE7YUFDTixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sQ0FBYSxNQUFBLEdBQVMsSUFBVCxHQUFnQixPQUE3QixFQURNO0lBQUEsQ0F2QlIsQ0FBQTs7dUJBQUE7O0tBRHdCLFdBTDFCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure-view.coffee