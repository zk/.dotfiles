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
        var c, expr, host, nc, pathname, port, protocol, _ref;
        _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, port = _ref.port, pathname = _ref.pathname;
        host = host.split(':')[0];
        if (protocol !== 'nrepl:') {
          return;
        }
        nc = require('nrepl-client');
        c = nc.connect({
          port: port,
          host: host
        });
        expr = '(+ 3 4)';
        c.once('connect', function() {
          return c["eval"](expr, function(err, result) {
            console.log('%s -> %s', expr, err || result);
            return c.end();
          });
        });
        return new ClojureView(uri);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLFVBSGIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFJQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFFUixVQUFBLEdBQUE7QUFBQSxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBZixDQUE4QixTQUFDLEdBQUQsR0FBQTtBQUU1QixZQUFBLGlEQUFBO0FBQUEsUUFBQSxPQUFtQyxHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBbkMsRUFBQyxnQkFBQSxRQUFELEVBQVcsWUFBQSxJQUFYLEVBQWlCLFlBQUEsSUFBakIsRUFBdUIsZ0JBQUEsUUFBdkIsQ0FBQTtBQUFBLFFBRUEsSUFBQSxHQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBWCxDQUFnQixDQUFBLENBQUEsQ0FGdkIsQ0FBQTtBQUlBLFFBQUEsSUFBYyxRQUFBLEtBQVksUUFBMUI7QUFBQSxnQkFBQSxDQUFBO1NBSkE7QUFBQSxRQU1BLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQU5MLENBQUE7QUFBQSxRQU9BLENBQUEsR0FBSSxFQUFFLENBQUMsT0FBSCxDQUFXO0FBQUEsVUFBQyxJQUFBLEVBQU0sSUFBUDtBQUFBLFVBQWEsSUFBQSxFQUFNLElBQW5CO1NBQVgsQ0FQSixDQUFBO0FBQUEsUUFTQSxJQUFBLEdBQU8sU0FUUCxDQUFBO0FBQUEsUUFhQSxDQUFDLENBQUMsSUFBRixDQUFPLFNBQVAsRUFBa0IsU0FBQSxHQUFBO2lCQUNoQixDQUFDLENBQUMsTUFBRCxDQUFELENBQU8sSUFBUCxFQUFhLFNBQUMsR0FBRCxFQUFNLE1BQU4sR0FBQTtBQUNYLFlBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLElBQXhCLEVBQThCLEdBQUEsSUFBTyxNQUFyQyxDQUFBLENBQUE7bUJBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBQSxFQUZXO1VBQUEsQ0FBYixFQURnQjtRQUFBLENBQWxCLENBYkEsQ0FBQTtlQWtCSSxJQUFBLFdBQUEsQ0FBWSxHQUFaLEVBcEJ3QjtNQUFBLENBQTlCLENBQUEsQ0FBQTtBQUFBLE1BMEJBLEdBQUEsR0FBTSx5QkExQk4sQ0FBQTthQTRCQSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsR0FBcEIsRUE5QlE7SUFBQSxDQUpWO0FBQUEsSUE0Q0EsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLEVBRFU7SUFBQSxDQTVDWjtBQUFBLElBK0NBLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFDVDtBQUFBLFFBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxTQUFiLENBQUEsQ0FBbEI7UUFEUztJQUFBLENBL0NYO0dBTkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee