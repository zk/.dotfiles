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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixVQUFBLFdBQUE7QUFBQSxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosQ0FBQSxDQUFBO0FBQUEsTUFFQSxFQUFBLEdBQUssT0FBQSxDQUFRLGNBQVIsQ0FGTCxDQUFBO0FBQUEsTUFHQSxDQUFBLEdBQUksRUFBRSxDQUFDLE9BQUgsQ0FBVztBQUFBLFFBQUMsSUFBQSxFQUFNLEtBQVA7T0FBWCxDQUhKLENBQUE7QUFBQSxNQUtBLElBQUEsR0FBTyxTQUxQLENBQUE7QUFBQSxNQU9BLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsV0FBQSxDQUFZLEtBQUssQ0FBQyxnQkFBbEIsQ0FQbkIsQ0FBQTtBQUFBLE1BV0EsQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFQLEVBQWtCLFNBQUEsR0FBQTtlQUNoQixDQUFDLENBQUMsTUFBRCxDQUFELENBQU8sSUFBUCxFQUFhLFNBQUMsR0FBRCxFQUFNLE1BQU4sR0FBQTtBQUNYLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLElBQXhCLEVBQThCLEdBQUEsSUFBTyxNQUFyQyxDQUFBLENBQUE7aUJBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBQSxFQUZXO1FBQUEsQ0FBYixFQURnQjtNQUFBLENBQWxCLENBWEEsQ0FBQTthQWdCQSxFQWpCUTtJQUFBLENBRlY7QUFBQSxJQXFCQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQUEsRUFEVTtJQUFBLENBckJaO0FBQUEsSUF3QkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxnQkFBQSxFQUFrQixJQUFDLENBQUEsV0FBVyxDQUFDLFNBQWIsQ0FBQSxDQUFsQjtRQURTO0lBQUEsQ0F4Qlg7R0FIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee