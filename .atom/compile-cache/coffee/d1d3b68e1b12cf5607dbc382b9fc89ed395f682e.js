(function() {
  var ClojureView;

  ClojureView = require('./clojure-view');

  module.exports = {
    clojureView: null,
    activate: function(state) {
      var c, expr, nc;
      console.log('activate clojure stuff');
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
      return this.clojureView = new ClojureView(state.clojureViewState);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixVQUFBLFdBQUE7QUFBQSxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosQ0FBQSxDQUFBO0FBQUEsTUFFQSxFQUFBLEdBQUssT0FBQSxDQUFRLGNBQVIsQ0FGTCxDQUFBO0FBQUEsTUFHQSxDQUFBLEdBQUksRUFBRSxDQUFDLE9BQUgsQ0FBVztBQUFBLFFBQUMsSUFBQSxFQUFNLEtBQVA7T0FBWCxDQUhKLENBQUE7QUFBQSxNQUtBLElBQUEsR0FBTyxTQUxQLENBQUE7QUFBQSxNQU9BLENBQUMsQ0FBQyxJQUFGLENBQU8sU0FBUCxFQUFrQixTQUFBLEdBQUE7ZUFDaEIsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFPLElBQVAsRUFBYSxTQUFDLEdBQUQsRUFBTSxNQUFOLEdBQUE7QUFDWCxVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWixFQUF3QixJQUF4QixFQUE4QixHQUFBLElBQU8sTUFBckMsQ0FBQSxDQUFBO2lCQUNBLENBQUMsQ0FBQyxHQUFGLENBQUEsRUFGVztRQUFBLENBQWIsRUFEZ0I7TUFBQSxDQUFsQixDQVBBLENBQUE7YUFZQSxJQUFDLENBQUEsV0FBRCxHQUFtQixJQUFBLFdBQUEsQ0FBWSxLQUFLLENBQUMsZ0JBQWxCLEVBYlg7SUFBQSxDQUZWO0FBQUEsSUFpQkEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLEVBRFU7SUFBQSxDQWpCWjtBQUFBLElBb0JBLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFDVDtBQUFBLFFBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxTQUFiLENBQUEsQ0FBbEI7UUFEUztJQUFBLENBcEJYO0dBSEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee