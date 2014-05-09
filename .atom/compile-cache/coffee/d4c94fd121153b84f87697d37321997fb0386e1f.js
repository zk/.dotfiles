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

    ClojureView.prototype["eval"] = function(expr) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBRE4sQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQUZMLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osa0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsV0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sV0FBUDtBQUFBLFFBQW9CLFFBQUEsRUFBVSxDQUFBLENBQTlCO09BQUwsRUFBdUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDckMsS0FBQyxDQUFBLEVBQUQsQ0FBSTtBQUFBLFlBQUEsTUFBQSxFQUFRLE1BQVI7V0FBSixFQURxQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXZDLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsMEJBS0EsVUFBQSxHQUFZLFNBQUMsR0FBRCxHQUFBO0FBQ1YsVUFBQSwwQ0FBQTtBQUFBLE1BQUEsNkNBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxHQUFELEdBQU8sR0FGUCxDQUFBO0FBQUEsTUFJQSxPQUFtQyxHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBbkMsRUFBQyxnQkFBQSxRQUFELEVBQVcsWUFBQSxJQUFYLEVBQWlCLFlBQUEsSUFBakIsRUFBdUIsZ0JBQUEsUUFKdkIsQ0FBQTtBQUFBLE1BTUEsSUFBQSxHQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBWCxDQUFnQixDQUFBLENBQUEsQ0FOdkIsQ0FBQTtBQUFBLE1BUUEsSUFBQyxDQUFBLElBQUQsR0FBUSxFQUFFLENBQUMsT0FBSCxDQUFXO0FBQUEsUUFBQyxJQUFBLEVBQU0sSUFBUDtBQUFBLFFBQWEsSUFBQSxFQUFNLElBQW5CO09BQVgsQ0FSUixDQUFBO0FBQUEsTUFVQSxJQUFBLEdBQU8sU0FWUCxDQUFBO2FBWUEsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLENBQVcsU0FBWCxFQUFzQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNwQixLQUFDLENBQUEsSUFBSSxDQUFDLE1BQUQsQ0FBTCxDQUFXLElBQVgsRUFBaUIsU0FBQyxHQUFELEVBQU0sTUFBTixHQUFBO0FBQ2YsWUFBQSxLQUFDLENBQUEsTUFBRCxDQUFRLEdBQUEsSUFBTyxNQUFmLENBQUEsQ0FBQTttQkFDQSxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVosRUFBd0IsSUFBeEIsRUFBOEIsR0FBQSxJQUFPLE1BQXJDLEVBRmU7VUFBQSxDQUFqQixFQURvQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXRCLEVBYlU7SUFBQSxDQUxaLENBQUE7O0FBQUEsMEJBeUJBLFNBQUEsR0FBVyxTQUFBLEdBQUEsQ0F6QlgsQ0FBQTs7QUFBQSwwQkE0QkEsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNQLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxHQUFOLENBQUEsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUhPO0lBQUEsQ0E1QlQsQ0FBQTs7QUFBQSwwQkFpQ0EsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxJQUFKO0lBQUEsQ0FqQ1YsQ0FBQTs7QUFBQSwwQkFtQ0EsT0FBQSxHQUFNLFNBQUMsSUFBRCxHQUFBO2FBQ0osSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFELENBQUwsQ0FBVyxJQUFYLEVBQWlCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEdBQUQsRUFBTSxNQUFOLEdBQUE7QUFDZixVQUFBLEtBQUMsQ0FBQSxNQUFELENBQVEsR0FBQSxJQUFPLE1BQWYsQ0FBQSxDQUFBO2lCQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWixFQUF3QixJQUF4QixFQUE4QixHQUFBLElBQU8sTUFBckMsRUFGZTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpCLEVBREk7SUFBQSxDQW5DTixDQUFBOztBQUFBLDBCQXdDQSxNQUFBLEdBQVEsU0FBQyxJQUFELEdBQUE7YUFDTixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sQ0FBYSxNQUFBLEdBQVMsSUFBVCxHQUFnQixPQUE3QixFQURNO0lBQUEsQ0F4Q1IsQ0FBQTs7dUJBQUE7O0tBRHdCLFdBTDFCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure-view.coffee