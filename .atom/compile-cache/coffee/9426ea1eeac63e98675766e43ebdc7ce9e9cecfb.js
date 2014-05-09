(function() {
  var ClojureView, URL, connections, views, _;

  ClojureView = require('./clojure-view');

  URL = require('url');

  _ = require('underscore-plus');

  connections = {};

  views = {};

  module.exports = {
    clojureView: null,
    activate: function(state) {
      var uri;
      atom.workspaceView.command('nrepl:eval-selection', (function(_this) {
        return function() {
          var conn, ed, form, uri, view;
          ed = atom.workspace.getActiveEditor();
          form = ed.getSelection().getText();
          uri = _.chain(connections).keys().first();
          conn = connections[uri];
          view = views[uri];
          return conn["eval"](form, function(err, result) {
            return _.each(views, function(view) {
              view.output(err || result);
              return console.log(err || result);
            });
          });
        };
      })(this));
      atom.workspace.registerOpener((function(_this) {
        return function(uri) {
          var conn, expr, host, pathname, port, protocol, view, _ref;
          _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, port = _ref.port, pathname = _ref.pathname;
          if (protocol !== 'nrepl:') {
            return;
          }
          host = host.split(':')[0];
          conn = NC.connect({
            port: port,
            host: host
          });
          expr = '(+ 3 4)';
          conn.once('connect', function() {
            return connections[uri] = conn;
          });
          view = new ClojureView(uri);
          if (!editors[uri]) {
            views[uri] = [];
          }
          views[uri].push(view);
          return view;
        };
      })(this));
      uri = 'nrepl://127.0.0.1:62144';
      return atom.workspace.open(uri);
    },
    deactivate: function() {
      console.log('deactivate');
      return this.clojureView.destroy();
    },
    serialize: function() {
      return {
        clojureViewState: this.clojureView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVDQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUZKLENBQUE7O0FBQUEsRUFJQSxXQUFBLEdBQWMsRUFKZCxDQUFBOztBQUFBLEVBS0EsS0FBQSxHQUFRLEVBTFIsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixVQUFBLEdBQUE7QUFBQSxNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsc0JBQTNCLEVBQW1ELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFFakQsY0FBQSx5QkFBQTtBQUFBLFVBQUEsRUFBQSxHQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZixDQUFBLENBQUwsQ0FBQTtBQUFBLFVBQ0EsSUFBQSxHQUFPLEVBQUUsQ0FBQyxZQUFILENBQUEsQ0FBaUIsQ0FBQyxPQUFsQixDQUFBLENBRFAsQ0FBQTtBQUFBLFVBR0EsR0FBQSxHQUFNLENBQUMsQ0FBQyxLQUFGLENBQVEsV0FBUixDQUNKLENBQUMsSUFERyxDQUFBLENBRUosQ0FBQyxLQUZHLENBQUEsQ0FITixDQUFBO0FBQUEsVUFPQSxJQUFBLEdBQU8sV0FBWSxDQUFBLEdBQUEsQ0FQbkIsQ0FBQTtBQUFBLFVBUUEsSUFBQSxHQUFPLEtBQU0sQ0FBQSxHQUFBLENBUmIsQ0FBQTtpQkFVQSxJQUFJLENBQUMsTUFBRCxDQUFKLENBQVUsSUFBVixFQUFnQixTQUFDLEdBQUQsRUFBTSxNQUFOLEdBQUE7bUJBQ2QsQ0FBQyxDQUFDLElBQUYsQ0FBTyxLQUFQLEVBQWMsU0FBQyxJQUFELEdBQUE7QUFDWixjQUFBLElBQUksQ0FBQyxNQUFMLENBQVksR0FBQSxJQUFPLE1BQW5CLENBQUEsQ0FBQTtxQkFDQSxPQUFPLENBQUMsR0FBUixDQUFZLEdBQUEsSUFBTyxNQUFuQixFQUZZO1lBQUEsQ0FBZCxFQURjO1VBQUEsQ0FBaEIsRUFaaUQ7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuRCxDQUFBLENBQUE7QUFBQSxNQWlCQSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWYsQ0FBOEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsR0FBRCxHQUFBO0FBRTVCLGNBQUEsc0RBQUE7QUFBQSxVQUFBLE9BQW1DLEdBQUcsQ0FBQyxLQUFKLENBQVUsR0FBVixDQUFuQyxFQUFDLGdCQUFBLFFBQUQsRUFBVyxZQUFBLElBQVgsRUFBaUIsWUFBQSxJQUFqQixFQUF1QixnQkFBQSxRQUF2QixDQUFBO0FBRUEsVUFBQSxJQUFjLFFBQUEsS0FBWSxRQUExQjtBQUFBLGtCQUFBLENBQUE7V0FGQTtBQUFBLFVBSUEsSUFBQSxHQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBWCxDQUFnQixDQUFBLENBQUEsQ0FKdkIsQ0FBQTtBQUFBLFVBTUEsSUFBQSxHQUFPLEVBQUUsQ0FBQyxPQUFILENBQVc7QUFBQSxZQUFDLElBQUEsRUFBTSxJQUFQO0FBQUEsWUFBYSxJQUFBLEVBQU0sSUFBbkI7V0FBWCxDQU5QLENBQUE7QUFBQSxVQVFBLElBQUEsR0FBTyxTQVJQLENBQUE7QUFBQSxVQVVBLElBQUksQ0FBQyxJQUFMLENBQVUsU0FBVixFQUFxQixTQUFBLEdBQUE7bUJBQUcsV0FBWSxDQUFBLEdBQUEsQ0FBWixHQUFtQixLQUF0QjtVQUFBLENBQXJCLENBVkEsQ0FBQTtBQUFBLFVBWUEsSUFBQSxHQUFXLElBQUEsV0FBQSxDQUFZLEdBQVosQ0FaWCxDQUFBO0FBY0EsVUFBQSxJQUFBLENBQUEsT0FBK0IsQ0FBQSxHQUFBLENBQS9CO0FBQUEsWUFBQSxLQUFNLENBQUEsR0FBQSxDQUFOLEdBQWEsRUFBYixDQUFBO1dBZEE7QUFBQSxVQWVBLEtBQU0sQ0FBQSxHQUFBLENBQUksQ0FBQyxJQUFYLENBQWdCLElBQWhCLENBZkEsQ0FBQTtpQkFpQkEsS0FuQjRCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBOUIsQ0FqQkEsQ0FBQTtBQUFBLE1Bc0NBLEdBQUEsR0FBTSx5QkF0Q04sQ0FBQTthQXdDQSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsR0FBcEIsRUF6Q1E7SUFBQSxDQUZWO0FBQUEsSUE4Q0EsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxZQUFaLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLEVBRlU7SUFBQSxDQTlDWjtBQUFBLElBa0RBLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFDVDtBQUFBLFFBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxTQUFiLENBQUEsQ0FBbEI7UUFEUztJQUFBLENBbERYO0dBUkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee