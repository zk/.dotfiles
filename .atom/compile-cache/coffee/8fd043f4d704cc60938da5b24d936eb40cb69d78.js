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
      console.log('init');
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
      console.log('destroy');
      this.conn.end();
      return this.detach();
    };

    ClojureView.prototype.getTitle = function() {
      return this.uri;
    };

    ClojureView.prototype.getModel = function() {
      return null;
    };

    ClojureView.prototype["eval"] = function(expr) {
      console.log("EXPR", expr);
      return this.conn["eval"](expr, (function(_this) {
        return function(err, result) {
          _this.output(err || result);
          return console.log('%s -> %s', expr, err || result);
        };
      })(this));
    };

    ClojureView.prototype.output = function(text) {
      return this.list.append('<li>' + text + '</li>');
    };

    return ClojureView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBRE4sQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQUZMLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osa0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsV0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sOEJBQVA7QUFBQSxRQUF1QyxRQUFBLEVBQVUsQ0FBQSxDQUFqRDtPQUFMLEVBQTBELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3hELEtBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxZQUFBLE1BQUEsRUFBUSxNQUFSO1dBQUosRUFEd0Q7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExRCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDBCQUlBLFVBQUEsR0FBWSxTQUFDLEdBQUQsR0FBQTtBQUNWLE1BQUEsNkNBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUVBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWixDQUZBLENBQUE7YUFJQSxJQUFDLENBQUEsR0FBRCxHQUFPLElBTEc7SUFBQSxDQUpaLENBQUE7O0FBQUEsMEJBYUEsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxXQUFaLENBQUEsQ0FBQTthQUNBO0FBQUEsUUFBQSxZQUFBLEVBQWMsYUFBZDtBQUFBLFFBQ0EsT0FBQSxFQUFTLENBRFQ7QUFBQSxRQUVBLEdBQUEsRUFBSyxJQUFDLENBQUEsR0FGTjtRQUZTO0lBQUEsQ0FiWCxDQUFBOztBQUFBLDBCQW9CQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFNBQVosQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsSUFBSSxDQUFDLEdBQU4sQ0FBQSxDQURBLENBQUE7YUFFQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBSE87SUFBQSxDQXBCVCxDQUFBOztBQUFBLDBCQXlCQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsSUFBQyxDQUFBLElBQUo7SUFBQSxDQXpCVixDQUFBOztBQUFBLDBCQTJCQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsS0FBSDtJQUFBLENBM0JWLENBQUE7O0FBQUEsMEJBNkJBLE9BQUEsR0FBTSxTQUFDLElBQUQsR0FBQTtBQUNKLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLElBQXBCLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBRCxDQUFMLENBQVcsSUFBWCxFQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxHQUFELEVBQU0sTUFBTixHQUFBO0FBQ2YsVUFBQSxLQUFDLENBQUEsTUFBRCxDQUFRLEdBQUEsSUFBTyxNQUFmLENBQUEsQ0FBQTtpQkFDQSxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVosRUFBd0IsSUFBeEIsRUFBOEIsR0FBQSxJQUFPLE1BQXJDLEVBRmU7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqQixFQUZJO0lBQUEsQ0E3Qk4sQ0FBQTs7QUFBQSwwQkFtQ0EsTUFBQSxHQUFRLFNBQUMsSUFBRCxHQUFBO2FBQ04sSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLENBQWEsTUFBQSxHQUFTLElBQVQsR0FBZ0IsT0FBN0IsRUFETTtJQUFBLENBbkNSLENBQUE7O3VCQUFBOztLQUR3QixXQUwxQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure-view.coffee