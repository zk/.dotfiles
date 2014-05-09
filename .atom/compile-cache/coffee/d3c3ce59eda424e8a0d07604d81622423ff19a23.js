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
        return _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, pathname = _ref.pathname, _ref;
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLFVBSGIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFJQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFFUixVQUFBLGdCQUFBO0FBQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWYsQ0FBOEIsU0FBQyxHQUFELEdBQUE7QUFFNUIsWUFBQSw4QkFBQTtlQUFBLE9BQTZCLEdBQUcsQ0FBQyxLQUFKLENBQVUsR0FBVixDQUE3QixFQUFDLGdCQUFBLFFBQUQsRUFBVyxZQUFBLElBQVgsRUFBaUIsZ0JBQUEsUUFBakIsRUFBQSxLQUY0QjtNQUFBLENBQTlCLENBQUEsQ0FBQTtBQUFBLE1BUUEsR0FBQSxHQUFNLHlCQVJOLENBQUE7QUFBQSxNQVVBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixHQUFwQixDQVZBLENBQUE7QUFBQSxNQVlBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQVpMLENBQUE7QUFBQSxNQWFBLENBQUEsR0FBSSxFQUFFLENBQUMsT0FBSCxDQUFXO0FBQUEsUUFBQyxJQUFBLEVBQU0sS0FBUDtPQUFYLENBYkosQ0FBQTtBQUFBLE1BZUEsSUFBQSxHQUFPLFNBZlAsQ0FBQTtBQUFBLE1BaUJBLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsV0FBQSxDQUFZLEtBQUssQ0FBQyxnQkFBbEIsQ0FqQm5CLENBQUE7YUFxQkEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFQLEVBQWtCLFNBQUEsR0FBQTtlQUNoQixDQUFDLENBQUMsTUFBRCxDQUFELENBQU8sSUFBUCxFQUFhLFNBQUMsR0FBRCxFQUFNLE1BQU4sR0FBQTtBQUNYLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLElBQXhCLEVBQThCLEdBQUEsSUFBTyxNQUFyQyxDQUFBLENBQUE7aUJBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBQSxFQUZXO1FBQUEsQ0FBYixFQURnQjtNQUFBLENBQWxCLEVBdkJRO0lBQUEsQ0FKVjtBQUFBLElBc0NBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBQSxFQURVO0lBQUEsQ0F0Q1o7QUFBQSxJQXlDQSxTQUFBLEVBQVcsU0FBQSxHQUFBO2FBQ1Q7QUFBQSxRQUFBLGdCQUFBLEVBQWtCLElBQUMsQ0FBQSxXQUFXLENBQUMsU0FBYixDQUFBLENBQWxCO1FBRFM7SUFBQSxDQXpDWDtHQU5GLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee