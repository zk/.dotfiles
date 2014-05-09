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
      var c, expr;
      ClojureView.__super__.initialize.apply(this, arguments);
      this.uri = uri;
      c = nc.connect({
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBRE4sQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQUZMLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osa0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsV0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sV0FBUDtBQUFBLFFBQW9CLFFBQUEsRUFBVSxDQUFBLENBQTlCO09BQUwsRUFBdUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDckMsS0FBQyxDQUFBLEVBQUQsQ0FBSTtBQUFBLFlBQUEsTUFBQSxFQUFRLE1BQVI7V0FBSixFQURxQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXZDLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsMEJBS0EsVUFBQSxHQUFZLFNBQUMsR0FBRCxHQUFBO0FBQ1YsVUFBQSxPQUFBO0FBQUEsTUFBQSw2Q0FBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLEdBQUQsR0FBTyxHQUZQLENBQUE7QUFBQSxNQUlBLENBQUEsR0FBSSxFQUFFLENBQUMsT0FBSCxDQUFXO0FBQUEsUUFBQyxJQUFBLEVBQU0sSUFBUDtBQUFBLFFBQWEsSUFBQSxFQUFNLElBQW5CO09BQVgsQ0FKSixDQUFBO0FBQUEsTUFNQSxJQUFBLEdBQU8sU0FOUCxDQUFBO2FBUUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFQLEVBQWtCLFNBQUEsR0FBQTtlQUNoQixDQUFDLENBQUMsTUFBRCxDQUFELENBQU8sSUFBUCxFQUFhLFNBQUMsR0FBRCxFQUFNLE1BQU4sR0FBQTtBQUNYLFVBQUEsSUFBQyxDQUFBLE1BQUQsQ0FBUSxHQUFBLElBQU8sTUFBZixDQUFBLENBQUE7QUFBQSxVQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWixFQUF3QixJQUF4QixFQUE4QixHQUFBLElBQU8sTUFBckMsQ0FEQSxDQUFBO2lCQUVBLENBQUMsQ0FBQyxHQUFGLENBQUEsRUFIVztRQUFBLENBQWIsRUFEZ0I7TUFBQSxDQUFsQixFQVRVO0lBQUEsQ0FMWixDQUFBOztBQUFBLDBCQXNCQSxTQUFBLEdBQVcsU0FBQSxHQUFBLENBdEJYLENBQUE7O0FBQUEsMEJBeUJBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsTUFBRCxDQUFBLEVBRE87SUFBQSxDQXpCVCxDQUFBOztBQUFBLDBCQTRCQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsSUFBQyxDQUFBLElBQUo7SUFBQSxDQTVCVixDQUFBOztBQUFBLDBCQThCQSxNQUFBLEdBQVEsU0FBQyxJQUFELEdBQUE7YUFDTixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sQ0FBYSxNQUFBLEdBQVMsSUFBVCxHQUFnQixPQUE3QixFQURNO0lBQUEsQ0E5QlIsQ0FBQTs7dUJBQUE7O0tBRHdCLFdBTDFCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure-view.coffee