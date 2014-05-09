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
        if (!(protocol = 'nrepl:')) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLFVBSGIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFJQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFFUixVQUFBLEdBQUE7QUFBQSxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBZixDQUE4QixTQUFDLEdBQUQsR0FBQTtBQUU1QixZQUFBLDJDQUFBO0FBQUEsUUFBQSxPQUE2QixHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBN0IsRUFBQyxnQkFBQSxRQUFELEVBQVcsWUFBQSxJQUFYLEVBQWlCLGdCQUFBLFFBQWpCLENBQUE7QUFFQSxRQUFBLElBQUEsQ0FBQSxDQUFjLFFBQUEsR0FBVyxRQUFYLENBQWQ7QUFBQSxnQkFBQSxDQUFBO1NBRkE7QUFBQSxRQUlBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQUpMLENBQUE7QUFBQSxRQUtBLENBQUEsR0FBSSxFQUFFLENBQUMsT0FBSCxDQUFXO0FBQUEsVUFBQyxJQUFBLEVBQU0sS0FBUDtTQUFYLENBTEosQ0FBQTtBQUFBLFFBT0EsSUFBQSxHQUFPLFNBUFAsQ0FBQTtBQUFBLFFBV0EsQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFQLEVBQWtCLFNBQUEsR0FBQTtpQkFDaEIsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFPLElBQVAsRUFBYSxTQUFDLEdBQUQsRUFBTSxNQUFOLEdBQUE7QUFDWCxZQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWixFQUF3QixJQUF4QixFQUE4QixHQUFBLElBQU8sTUFBckMsQ0FBQSxDQUFBO21CQUNBLENBQUMsQ0FBQyxHQUFGLENBQUEsRUFGVztVQUFBLENBQWIsRUFEZ0I7UUFBQSxDQUFsQixDQVhBLENBQUE7ZUFnQkksSUFBQSxXQUFBLENBQVksS0FBSyxDQUFDLGdCQUFsQixFQWxCd0I7TUFBQSxDQUE5QixDQUFBLENBQUE7QUFBQSxNQXdCQSxHQUFBLEdBQU0seUJBeEJOLENBQUE7YUEwQkEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLEdBQXBCLEVBNUJRO0lBQUEsQ0FKVjtBQUFBLElBMENBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBQSxFQURVO0lBQUEsQ0ExQ1o7QUFBQSxJQTZDQSxTQUFBLEVBQVcsU0FBQSxHQUFBO2FBQ1Q7QUFBQSxRQUFBLGdCQUFBLEVBQWtCLElBQUMsQ0FBQSxXQUFXLENBQUMsU0FBYixDQUFBLENBQWxCO1FBRFM7SUFBQSxDQTdDWDtHQU5GLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee