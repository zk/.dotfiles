(function() {
  var ClojureView;

  ClojureView = require('./clojure-view');

  console.log('loaded clojure');

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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUVBLE9BQU8sQ0FBQyxHQUFSLENBQVksZ0JBQVosQ0FGQSxDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsV0FBQSxFQUFhLElBQWI7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLFVBQUEsV0FBQTtBQUFBLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx3QkFBWixDQUFBLENBQUE7QUFBQSxNQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQUZMLENBQUE7QUFBQSxNQUdBLENBQUEsR0FBSSxFQUFFLENBQUMsT0FBSCxDQUFXO0FBQUEsUUFBQyxJQUFBLEVBQU0sS0FBUDtPQUFYLENBSEosQ0FBQTtBQUFBLE1BS0EsSUFBQSxHQUFPLFNBTFAsQ0FBQTtBQUFBLE1BT0EsQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFQLEVBQWtCLFNBQUEsR0FBQTtlQUNoQixDQUFDLENBQUMsTUFBRCxDQUFELENBQU8sSUFBUCxFQUFhLFNBQUMsR0FBRCxFQUFNLE1BQU4sR0FBQTtBQUNYLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLElBQXhCLEVBQThCLEdBQUEsSUFBTyxNQUFyQyxDQUFBLENBQUE7aUJBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBQSxFQUZXO1FBQUEsQ0FBYixFQURnQjtNQUFBLENBQWxCLENBUEEsQ0FBQTthQVlBLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsV0FBQSxDQUFZLEtBQUssQ0FBQyxnQkFBbEIsRUFiWDtJQUFBLENBRlY7QUFBQSxJQWlCQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQUEsRUFEVTtJQUFBLENBakJaO0FBQUEsSUFvQkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxnQkFBQSxFQUFrQixJQUFDLENBQUEsV0FBVyxDQUFDLFNBQWIsQ0FBQSxDQUFsQjtRQURTO0lBQUEsQ0FwQlg7R0FMRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee