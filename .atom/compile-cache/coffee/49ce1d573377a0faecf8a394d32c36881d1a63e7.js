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
        if (protocol !== 'nrepl:') {
          return;
        }
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLFVBSGIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFJQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFFUixVQUFBLEdBQUE7QUFBQSxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBZixDQUE4QixTQUFDLEdBQUQsR0FBQTtBQUU1QixZQUFBLDJDQUFBO0FBQUEsUUFBQSxPQUE2QixHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBN0IsRUFBQyxnQkFBQSxRQUFELEVBQVcsWUFBQSxJQUFYLEVBQWlCLGdCQUFBLFFBQWpCLENBQUE7QUFFQSxRQUFBLElBQWMsUUFBQSxLQUFZLFFBQTFCO0FBQUEsZ0JBQUEsQ0FBQTtTQUZBO0FBQUEsUUFJQSxFQUFBLEdBQUssT0FBQSxDQUFRLGNBQVIsQ0FKTCxDQUFBO0FBQUEsUUFLQSxDQUFBLEdBQUksRUFBRSxDQUFDLE9BQUgsQ0FBVztBQUFBLFVBQUMsSUFBQSxFQUFNLEtBQVA7U0FBWCxDQUxKLENBQUE7QUFBQSxRQU9BLElBQUEsR0FBTyxTQVBQLENBQUE7QUFBQSxRQVdBLENBQUMsQ0FBQyxJQUFGLENBQU8sU0FBUCxFQUFrQixTQUFBLEdBQUE7aUJBQ2hCLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBTyxJQUFQLEVBQWEsU0FBQyxHQUFELEVBQU0sTUFBTixHQUFBO0FBQ1gsWUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVosRUFBd0IsSUFBeEIsRUFBOEIsR0FBQSxJQUFPLE1BQXJDLENBQUEsQ0FBQTttQkFDQSxDQUFDLENBQUMsR0FBRixDQUFBLEVBRlc7VUFBQSxDQUFiLEVBRGdCO1FBQUEsQ0FBbEIsQ0FYQSxDQUFBO2VBZ0JJLElBQUEsV0FBQSxDQUFZLEdBQVosRUFsQndCO01BQUEsQ0FBOUIsQ0FBQSxDQUFBO0FBQUEsTUF3QkEsR0FBQSxHQUFNLHlCQXhCTixDQUFBO2FBMEJBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixHQUFwQixFQTVCUTtJQUFBLENBSlY7QUFBQSxJQTBDQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQUEsRUFEVTtJQUFBLENBMUNaO0FBQUEsSUE2Q0EsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxnQkFBQSxFQUFrQixJQUFDLENBQUEsV0FBVyxDQUFDLFNBQWIsQ0FBQSxDQUFsQjtRQURTO0lBQUEsQ0E3Q1g7R0FORixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee