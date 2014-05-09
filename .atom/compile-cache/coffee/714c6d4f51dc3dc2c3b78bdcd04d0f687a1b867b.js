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
        return console.log(protocol, host, pathname);
      });
      uri = 'nrepl://localhost:62144';
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLFVBSGIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFJQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFFUixVQUFBLGdCQUFBO0FBQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWYsQ0FBOEIsU0FBQyxHQUFELEdBQUE7QUFFNUIsWUFBQSw4QkFBQTtBQUFBLFFBQUEsT0FBNkIsR0FBRyxDQUFDLEtBQUosQ0FBVSxHQUFWLENBQTdCLEVBQUMsZ0JBQUEsUUFBRCxFQUFXLFlBQUEsSUFBWCxFQUFpQixnQkFBQSxRQUFqQixDQUFBO2VBRUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCLElBQXRCLEVBQTRCLFFBQTVCLEVBSjRCO01BQUEsQ0FBOUIsQ0FBQSxDQUFBO0FBQUEsTUFPQSxHQUFBLEdBQU0seUJBUE4sQ0FBQTtBQUFBLE1BU0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLEdBQXBCLENBVEEsQ0FBQTtBQUFBLE1BV0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxjQUFSLENBWEwsQ0FBQTtBQUFBLE1BWUEsQ0FBQSxHQUFJLEVBQUUsQ0FBQyxPQUFILENBQVc7QUFBQSxRQUFDLElBQUEsRUFBTSxLQUFQO09BQVgsQ0FaSixDQUFBO0FBQUEsTUFjQSxJQUFBLEdBQU8sU0FkUCxDQUFBO0FBQUEsTUFnQkEsSUFBQyxDQUFBLFdBQUQsR0FBbUIsSUFBQSxXQUFBLENBQVksS0FBSyxDQUFDLGdCQUFsQixDQWhCbkIsQ0FBQTthQW9CQSxDQUFDLENBQUMsSUFBRixDQUFPLFNBQVAsRUFBa0IsU0FBQSxHQUFBO2VBQ2hCLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBTyxJQUFQLEVBQWEsU0FBQyxHQUFELEVBQU0sTUFBTixHQUFBO0FBQ1gsVUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVosRUFBd0IsSUFBeEIsRUFBOEIsR0FBQSxJQUFPLE1BQXJDLENBQUEsQ0FBQTtpQkFDQSxDQUFDLENBQUMsR0FBRixDQUFBLEVBRlc7UUFBQSxDQUFiLEVBRGdCO01BQUEsQ0FBbEIsRUF0QlE7SUFBQSxDQUpWO0FBQUEsSUFvQ0EsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLEVBRFU7SUFBQSxDQXBDWjtBQUFBLElBdUNBLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFDVDtBQUFBLFFBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxTQUFiLENBQUEsQ0FBbEI7UUFEUztJQUFBLENBdkNYO0dBTkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee