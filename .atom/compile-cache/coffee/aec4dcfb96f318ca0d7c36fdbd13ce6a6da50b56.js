(function() {
  var ClojureView, URL, repl_proto;

  ClojureView = require('./clojure-view');

  URL = require('url');

  repl_proto = 'nrepl://';

  module.exports = {
    clojureView: null,
    activate: function(state) {
      var c, expr, nc, uri;
      atom.workspace.registerOpener(function(uri) {
        var host, pathname, protocol, _ref;
        _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, pathname = _ref.pathname;
        return null;
      });
      uri = 'nrepl://127.0.0.1:62144';
      atom.workspace.open(uri);
      nc = require('nrepl-client');
      c = nc.connect({
        port: 62144
      });
      expr = '(+ 3 4)';
      this.clojureView = new ClojureView(state.clojureViewState);
      return c.once('connect', function() {
        return c["eval"](expr, function(err, result) {
          console.log('%s -> %s', expr, err || result);
          return c.end();
        });
      });
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLFVBSGIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFJQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFFUixVQUFBLGdCQUFBO0FBQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWYsQ0FBOEIsU0FBQyxHQUFELEdBQUE7QUFFNUIsWUFBQSw4QkFBQTtBQUFBLFFBQUEsT0FBNkIsR0FBRyxDQUFDLEtBQUosQ0FBVSxHQUFWLENBQTdCLEVBQUMsZ0JBQUEsUUFBRCxFQUFXLFlBQUEsSUFBWCxFQUFpQixnQkFBQSxRQUFqQixDQUFBO2VBRUEsS0FKNEI7TUFBQSxDQUE5QixDQUFBLENBQUE7QUFBQSxNQVVBLEdBQUEsR0FBTSx5QkFWTixDQUFBO0FBQUEsTUFZQSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsR0FBcEIsQ0FaQSxDQUFBO0FBQUEsTUFjQSxFQUFBLEdBQUssT0FBQSxDQUFRLGNBQVIsQ0FkTCxDQUFBO0FBQUEsTUFlQSxDQUFBLEdBQUksRUFBRSxDQUFDLE9BQUgsQ0FBVztBQUFBLFFBQUMsSUFBQSxFQUFNLEtBQVA7T0FBWCxDQWZKLENBQUE7QUFBQSxNQWlCQSxJQUFBLEdBQU8sU0FqQlAsQ0FBQTtBQUFBLE1BbUJBLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsV0FBQSxDQUFZLEtBQUssQ0FBQyxnQkFBbEIsQ0FuQm5CLENBQUE7YUF1QkEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFQLEVBQWtCLFNBQUEsR0FBQTtlQUNoQixDQUFDLENBQUMsTUFBRCxDQUFELENBQU8sSUFBUCxFQUFhLFNBQUMsR0FBRCxFQUFNLE1BQU4sR0FBQTtBQUNYLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLElBQXhCLEVBQThCLEdBQUEsSUFBTyxNQUFyQyxDQUFBLENBQUE7aUJBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBQSxFQUZXO1FBQUEsQ0FBYixFQURnQjtNQUFBLENBQWxCLEVBekJRO0lBQUEsQ0FKVjtBQUFBLElBd0NBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBQSxFQURVO0lBQUEsQ0F4Q1o7QUFBQSxJQTJDQSxTQUFBLEVBQVcsU0FBQSxHQUFBO2FBQ1Q7QUFBQSxRQUFBLGdCQUFBLEVBQWtCLElBQUMsQ0FBQSxXQUFXLENBQUMsU0FBYixDQUFBLENBQWxCO1FBRFM7SUFBQSxDQTNDWDtHQU5GLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee