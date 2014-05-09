(function() {
  var ClojureView;

  ClojureView = require('./clojure-view');

  module.exports = {
    clojureView: null,
    activate: function(state) {
      var c, expr, nc;
      nc = require('nrepl-client');
      c = nc.connect({
        port: 62144
      });
      expr = '(+ 3 4)';
      this.clojureView = new ClojureView(state.clojureViewState);
      c.once('connect', function() {
        return c["eval"](expr, function(err, result) {
          console.log('%s -> %s', expr, err || result);
          return c.end();
        });
      });
      return ;
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFFUixVQUFBLFdBQUE7QUFBQSxNQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQUFMLENBQUE7QUFBQSxNQUNBLENBQUEsR0FBSSxFQUFFLENBQUMsT0FBSCxDQUFXO0FBQUEsUUFBQyxJQUFBLEVBQU0sS0FBUDtPQUFYLENBREosQ0FBQTtBQUFBLE1BR0EsSUFBQSxHQUFPLFNBSFAsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLFdBQUQsR0FBbUIsSUFBQSxXQUFBLENBQVksS0FBSyxDQUFDLGdCQUFsQixDQUxuQixDQUFBO0FBQUEsTUFPQSxDQUFDLENBQUMsSUFBRixDQUFPLFNBQVAsRUFBa0IsU0FBQSxHQUFBO2VBQ2hCLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBTyxJQUFQLEVBQWEsU0FBQyxHQUFELEVBQU0sTUFBTixHQUFBO0FBQ1gsVUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVosRUFBd0IsSUFBeEIsRUFBOEIsR0FBQSxJQUFPLE1BQXJDLENBQUEsQ0FBQTtpQkFDQSxDQUFDLENBQUMsR0FBRixDQUFBLEVBRlc7UUFBQSxDQUFiLEVBRGdCO01BQUEsQ0FBbEIsQ0FQQSxDQUFBO2FBWUEsRUFkUTtJQUFBLENBRlY7QUFBQSxJQWtCQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQUEsRUFEVTtJQUFBLENBbEJaO0FBQUEsSUFxQkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxnQkFBQSxFQUFrQixJQUFDLENBQUEsV0FBVyxDQUFDLFNBQWIsQ0FBQSxDQUFsQjtRQURTO0lBQUEsQ0FyQlg7R0FIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee