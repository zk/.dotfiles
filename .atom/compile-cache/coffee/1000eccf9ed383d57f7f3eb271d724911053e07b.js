(function() {
  var ClojureView, URL, repl_proto;

  ClojureView = require('./clojure-view');

  URL = require('url');

  repl_proto = 'nrepl://';

  module.exports = {
    clojureView: null,
    activate: function(state) {
      var uri;
      atom.workspace.registerOpener(function(uri) {
        var c, expr, host, nc, pathname, protocol, _ref;
        _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, pathname = _ref.pathname;
        nc = require('nrepl-client');
        c = nc.connect({
          port: 62144
        });
        expr = '(+ 3 4)';
        c.once('connect', function() {
          return c["eval"](expr, function(err, result) {
            console.log('%s -> %s', expr, err || result);
            return c.end();
          });
        });
        return new ClojureView(state.clojureViewState);
      });
      uri = 'nrepl://127.0.0.1:62144';
      return atom.workspace.open(uri);
    },
    deactivate: function() {
      return this.clojureView.destroy();
    },
    serialize: function() {
      return {
        clojureViewState: this.clojureView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLFVBSGIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFJQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFFUixVQUFBLEdBQUE7QUFBQSxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBZixDQUE4QixTQUFDLEdBQUQsR0FBQTtBQUU1QixZQUFBLDJDQUFBO0FBQUEsUUFBQSxPQUE2QixHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBN0IsRUFBQyxnQkFBQSxRQUFELEVBQVcsWUFBQSxJQUFYLEVBQWlCLGdCQUFBLFFBQWpCLENBQUE7QUFBQSxRQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQUZMLENBQUE7QUFBQSxRQUdBLENBQUEsR0FBSSxFQUFFLENBQUMsT0FBSCxDQUFXO0FBQUEsVUFBQyxJQUFBLEVBQU0sS0FBUDtTQUFYLENBSEosQ0FBQTtBQUFBLFFBS0EsSUFBQSxHQUFPLFNBTFAsQ0FBQTtBQUFBLFFBU0EsQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFQLEVBQWtCLFNBQUEsR0FBQTtpQkFDaEIsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFPLElBQVAsRUFBYSxTQUFDLEdBQUQsRUFBTSxNQUFOLEdBQUE7QUFDWCxZQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWixFQUF3QixJQUF4QixFQUE4QixHQUFBLElBQU8sTUFBckMsQ0FBQSxDQUFBO21CQUNBLENBQUMsQ0FBQyxHQUFGLENBQUEsRUFGVztVQUFBLENBQWIsRUFEZ0I7UUFBQSxDQUFsQixDQVRBLENBQUE7ZUFjSSxJQUFBLFdBQUEsQ0FBWSxLQUFLLENBQUMsZ0JBQWxCLEVBaEJ3QjtNQUFBLENBQTlCLENBQUEsQ0FBQTtBQUFBLE1Bc0JBLEdBQUEsR0FBTSx5QkF0Qk4sQ0FBQTthQXdCQSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsR0FBcEIsRUExQlE7SUFBQSxDQUpWO0FBQUEsSUF3Q0EsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLEVBRFU7SUFBQSxDQXhDWjtBQUFBLElBMkNBLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFDVDtBQUFBLFFBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxTQUFiLENBQUEsQ0FBbEI7UUFEUztJQUFBLENBM0NYO0dBTkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee