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
      var expr, host, pathname, port, protocol, _ref;
      ClojureView.__super__.initialize.apply(this, arguments);
      this.uri = uri;
      _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, port = _ref.port, pathname = _ref.pathname;
      host = host.split(':')[0];
      this.conn = NC.connect({
        port: port,
        host: host
      });
      expr = '(+ 3 4)';
      return this.conn.once('connect', (function(_this) {
        return function() {
          return _this.conn["eval"](expr, function(err, result) {
            _this.output(err || result);
            return console.log('%s -> %s', expr, err || result);
          });
        };
      })(this));
    };

    ClojureView.prototype.serialize = function() {};

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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBRE4sQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQUZMLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osa0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsV0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sOEJBQVA7QUFBQSxRQUF1QyxRQUFBLEVBQVUsQ0FBQSxDQUFqRDtPQUFMLEVBQTBELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3hELEtBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxZQUFBLE1BQUEsRUFBUSxNQUFSO1dBQUosRUFEd0Q7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExRCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDBCQUlBLFVBQUEsR0FBWSxTQUFDLEdBQUQsR0FBQTtBQUNWLFVBQUEsMENBQUE7QUFBQSxNQUFBLDZDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsR0FBRCxHQUFPLEdBRlAsQ0FBQTtBQUFBLE1BSUEsT0FBbUMsR0FBRyxDQUFDLEtBQUosQ0FBVSxHQUFWLENBQW5DLEVBQUMsZ0JBQUEsUUFBRCxFQUFXLFlBQUEsSUFBWCxFQUFpQixZQUFBLElBQWpCLEVBQXVCLGdCQUFBLFFBSnZCLENBQUE7QUFBQSxNQU1BLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQVgsQ0FBZ0IsQ0FBQSxDQUFBLENBTnZCLENBQUE7QUFBQSxNQVFBLElBQUMsQ0FBQSxJQUFELEdBQVEsRUFBRSxDQUFDLE9BQUgsQ0FBVztBQUFBLFFBQUMsSUFBQSxFQUFNLElBQVA7QUFBQSxRQUFhLElBQUEsRUFBTSxJQUFuQjtPQUFYLENBUlIsQ0FBQTtBQUFBLE1BVUEsSUFBQSxHQUFPLFNBVlAsQ0FBQTthQVlBLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFXLFNBQVgsRUFBc0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDcEIsS0FBQyxDQUFBLElBQUksQ0FBQyxNQUFELENBQUwsQ0FBVyxJQUFYLEVBQWlCLFNBQUMsR0FBRCxFQUFNLE1BQU4sR0FBQTtBQUNmLFlBQUEsS0FBQyxDQUFBLE1BQUQsQ0FBUSxHQUFBLElBQU8sTUFBZixDQUFBLENBQUE7bUJBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLElBQXhCLEVBQThCLEdBQUEsSUFBTyxNQUFyQyxFQUZlO1VBQUEsQ0FBakIsRUFEb0I7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0QixFQWJVO0lBQUEsQ0FKWixDQUFBOztBQUFBLDBCQXdCQSxTQUFBLEdBQVcsU0FBQSxHQUFBLENBeEJYLENBQUE7O0FBQUEsMEJBMkJBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksU0FBWixDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsR0FBTixDQUFBLENBREEsQ0FBQTthQUVBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFITztJQUFBLENBM0JULENBQUE7O0FBQUEsMEJBZ0NBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsSUFBSjtJQUFBLENBaENWLENBQUE7O0FBQUEsMEJBa0NBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFBRyxLQUFIO0lBQUEsQ0FsQ1YsQ0FBQTs7QUFBQSwwQkFvQ0EsT0FBQSxHQUFNLFNBQUMsSUFBRCxHQUFBO0FBQ0osTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLE1BQVosRUFBb0IsSUFBcEIsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFELENBQUwsQ0FBVyxJQUFYLEVBQWlCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEdBQUQsRUFBTSxNQUFOLEdBQUE7QUFDZixVQUFBLEtBQUMsQ0FBQSxNQUFELENBQVEsR0FBQSxJQUFPLE1BQWYsQ0FBQSxDQUFBO2lCQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWixFQUF3QixJQUF4QixFQUE4QixHQUFBLElBQU8sTUFBckMsRUFGZTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpCLEVBRkk7SUFBQSxDQXBDTixDQUFBOztBQUFBLDBCQTBDQSxNQUFBLEdBQVEsU0FBQyxJQUFELEdBQUE7YUFDTixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sQ0FBYSxNQUFBLEdBQVMsSUFBVCxHQUFnQixPQUE3QixFQURNO0lBQUEsQ0ExQ1IsQ0FBQTs7dUJBQUE7O0tBRHdCLFdBTDFCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure-view.coffee