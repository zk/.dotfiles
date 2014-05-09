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
        return new ClojureView(state.clojureViewState);
      });
      uri = 'nrepl://127.0.0.1:62144';
      atom.workspace.open(uri);
      nc = require('nrepl-client');
      c = nc.connect({
        port: 62144
      });
      expr = '(+ 3 4)';
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLFVBSGIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFJQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFFUixVQUFBLGdCQUFBO0FBQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWYsQ0FBOEIsU0FBQyxHQUFELEdBQUE7QUFFNUIsWUFBQSw4QkFBQTtBQUFBLFFBQUEsT0FBNkIsR0FBRyxDQUFDLEtBQUosQ0FBVSxHQUFWLENBQTdCLEVBQUMsZ0JBQUEsUUFBRCxFQUFXLFlBQUEsSUFBWCxFQUFpQixnQkFBQSxRQUFqQixDQUFBO2VBRUksSUFBQSxXQUFBLENBQVksS0FBSyxDQUFDLGdCQUFsQixFQUp3QjtNQUFBLENBQTlCLENBQUEsQ0FBQTtBQUFBLE1BVUEsR0FBQSxHQUFNLHlCQVZOLENBQUE7QUFBQSxNQVlBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixHQUFwQixDQVpBLENBQUE7QUFBQSxNQWNBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQWRMLENBQUE7QUFBQSxNQWVBLENBQUEsR0FBSSxFQUFFLENBQUMsT0FBSCxDQUFXO0FBQUEsUUFBQyxJQUFBLEVBQU0sS0FBUDtPQUFYLENBZkosQ0FBQTtBQUFBLE1BaUJBLElBQUEsR0FBTyxTQWpCUCxDQUFBO2FBcUJBLENBQUMsQ0FBQyxJQUFGLENBQU8sU0FBUCxFQUFrQixTQUFBLEdBQUE7ZUFDaEIsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFPLElBQVAsRUFBYSxTQUFDLEdBQUQsRUFBTSxNQUFOLEdBQUE7QUFDWCxVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWixFQUF3QixJQUF4QixFQUE4QixHQUFBLElBQU8sTUFBckMsQ0FBQSxDQUFBO2lCQUNBLENBQUMsQ0FBQyxHQUFGLENBQUEsRUFGVztRQUFBLENBQWIsRUFEZ0I7TUFBQSxDQUFsQixFQXZCUTtJQUFBLENBSlY7QUFBQSxJQXNDQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQUEsRUFEVTtJQUFBLENBdENaO0FBQUEsSUF5Q0EsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxnQkFBQSxFQUFrQixJQUFDLENBQUEsV0FBVyxDQUFDLFNBQWIsQ0FBQSxDQUFsQjtRQURTO0lBQUEsQ0F6Q1g7R0FORixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee