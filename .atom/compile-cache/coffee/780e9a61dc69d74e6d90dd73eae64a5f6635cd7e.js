(function() {
  var ClojureView;

  ClojureView = require('./clojure-view');

  module.exports = {
    clojureView: null,
    activate: function(state) {
      var c, nc;
      console.log('activate clojure stuff');
      nc = require('nrepl-client');
      c = nc.connect({
        port: 62144
      });
      c.once('connect', function() {
        return c["eval"]('(+ 3 4)', function(err, result) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixVQUFBLEtBQUE7QUFBQSxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosQ0FBQSxDQUFBO0FBQUEsTUFFQSxFQUFBLEdBQUssT0FBQSxDQUFRLGNBQVIsQ0FGTCxDQUFBO0FBQUEsTUFHQSxDQUFBLEdBQUksRUFBRSxDQUFDLE9BQUgsQ0FBVztBQUFBLFFBQUMsSUFBQSxFQUFNLEtBQVA7T0FBWCxDQUhKLENBQUE7QUFBQSxNQUtBLENBQUMsQ0FBQyxJQUFGLENBQU8sU0FBUCxFQUFrQixTQUFBLEdBQUE7ZUFDaEIsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFPLFNBQVAsRUFBa0IsU0FBQyxHQUFELEVBQU0sTUFBTixHQUFBO0FBQ2hCLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLElBQXhCLEVBQThCLEdBQUEsSUFBTyxNQUFyQyxDQUFBLENBQUE7aUJBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBQSxFQUZnQjtRQUFBLENBQWxCLEVBRGdCO01BQUEsQ0FBbEIsQ0FMQSxDQUFBO2FBVUEsSUFBQyxDQUFBLFdBQUQsR0FBbUIsSUFBQSxXQUFBLENBQVksS0FBSyxDQUFDLGdCQUFsQixFQVhYO0lBQUEsQ0FGVjtBQUFBLElBZUEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLEVBRFU7SUFBQSxDQWZaO0FBQUEsSUFrQkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxnQkFBQSxFQUFrQixJQUFDLENBQUEsV0FBVyxDQUFDLFNBQWIsQ0FBQSxDQUFsQjtRQURTO0lBQUEsQ0FsQlg7R0FIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee