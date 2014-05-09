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
        "class": 'repl-view',
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
      var c, expr, host, pathname, port, protocol, _ref;
      ClojureView.__super__.initialize.apply(this, arguments);
      this.uri = uri;
      _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, port = _ref.port, pathname = _ref.pathname;
      host = host.split(':')[0];
      c = NC.connect({
        port: port,
        host: host
      });
      expr = '(+ 3 4)';
      return c.once('connect', function() {
        return c["eval"](expr, function(err, result) {
          this.output(err || result);
          console.log('%s -> %s', expr, err || result);
          return c.end();
        });
      });
    };

    ClojureView.prototype.serialize = function() {};

    ClojureView.prototype.destroy = function() {
      return this.detach();
    };

    ClojureView.prototype.getTitle = function() {
      return this.uri;
    };

    ClojureView.prototype.output = function(text) {
      return this.list.append('<li>' + text + '</li>');
    };

    return ClojureView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBRE4sQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQUZMLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osa0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsV0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sV0FBUDtBQUFBLFFBQW9CLFFBQUEsRUFBVSxDQUFBLENBQTlCO09BQUwsRUFBdUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDckMsS0FBQyxDQUFBLEVBQUQsQ0FBSTtBQUFBLFlBQUEsTUFBQSxFQUFRLE1BQVI7V0FBSixFQURxQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXZDLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsMEJBS0EsVUFBQSxHQUFZLFNBQUMsR0FBRCxHQUFBO0FBQ1YsVUFBQSw2Q0FBQTtBQUFBLE1BQUEsNkNBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxHQUFELEdBQU8sR0FGUCxDQUFBO0FBQUEsTUFJQSxPQUFtQyxHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBbkMsRUFBQyxnQkFBQSxRQUFELEVBQVcsWUFBQSxJQUFYLEVBQWlCLFlBQUEsSUFBakIsRUFBdUIsZ0JBQUEsUUFKdkIsQ0FBQTtBQUFBLE1BTUEsSUFBQSxHQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBWCxDQUFnQixDQUFBLENBQUEsQ0FOdkIsQ0FBQTtBQUFBLE1BUUEsQ0FBQSxHQUFJLEVBQUUsQ0FBQyxPQUFILENBQVc7QUFBQSxRQUFDLElBQUEsRUFBTSxJQUFQO0FBQUEsUUFBYSxJQUFBLEVBQU0sSUFBbkI7T0FBWCxDQVJKLENBQUE7QUFBQSxNQVVBLElBQUEsR0FBTyxTQVZQLENBQUE7YUFZQSxDQUFDLENBQUMsSUFBRixDQUFPLFNBQVAsRUFBa0IsU0FBQSxHQUFBO2VBQ2hCLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBTyxJQUFQLEVBQWEsU0FBQyxHQUFELEVBQU0sTUFBTixHQUFBO0FBQ1gsVUFBQSxJQUFDLENBQUEsTUFBRCxDQUFRLEdBQUEsSUFBTyxNQUFmLENBQUEsQ0FBQTtBQUFBLFVBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLElBQXhCLEVBQThCLEdBQUEsSUFBTyxNQUFyQyxDQURBLENBQUE7aUJBRUEsQ0FBQyxDQUFDLEdBQUYsQ0FBQSxFQUhXO1FBQUEsQ0FBYixFQURnQjtNQUFBLENBQWxCLEVBYlU7SUFBQSxDQUxaLENBQUE7O0FBQUEsMEJBMEJBLFNBQUEsR0FBVyxTQUFBLEdBQUEsQ0ExQlgsQ0FBQTs7QUFBQSwwQkE2QkEsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxNQUFELENBQUEsRUFETztJQUFBLENBN0JULENBQUE7O0FBQUEsMEJBZ0NBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsSUFBSjtJQUFBLENBaENWLENBQUE7O0FBQUEsMEJBa0NBLE1BQUEsR0FBUSxTQUFDLElBQUQsR0FBQTthQUNOLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixDQUFhLE1BQUEsR0FBUyxJQUFULEdBQWdCLE9BQTdCLEVBRE07SUFBQSxDQWxDUixDQUFBOzt1QkFBQTs7S0FEd0IsV0FMMUIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure-view.coffee