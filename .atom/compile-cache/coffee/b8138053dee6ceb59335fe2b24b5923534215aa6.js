(function() {
  var ClojureView, URL;

  ClojureView = require('./clojure-view');

  URL = require('url');

  module.exports = {
    clojureView: null,
    activate: function(state) {
      var uri;
      atom.workspaceView.command('nrepl:eval-selection', (function(_this) {
        return function() {
          var ed, form;
          ed = atom.workspace.getActiveEditor();
          form = ed.getSelection().getText();
          return _this.clojureView["eval"](form);
        };
      })(this));
      atom.workspace.registerOpener((function(_this) {
        return function(uri) {
          var host, pathname, port, protocol, _ref;
          _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, port = _ref.port, pathname = _ref.pathname;
          if (protocol !== 'nrepl:') {
            return;
          }
          _this.clojureView = new ClojureView(uri);
          return _this.clojureView;
        };
      })(this));
      uri = 'nrepl://127.0.0.1:62144';
      return atom.workspace.open(uri);
    },
    deactivate: function() {
      console.log('deactivate');
      return this.clojureView.destroy();
    },
    serialize: function() {
      return {
        clojureViewState: this.clojureView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsV0FBQSxFQUFhLElBQWI7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUVSLFVBQUEsR0FBQTtBQUFBLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixzQkFBM0IsRUFBbUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNqRCxjQUFBLFFBQUE7QUFBQSxVQUFBLEVBQUEsR0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWYsQ0FBQSxDQUFMLENBQUE7QUFBQSxVQUNBLElBQUEsR0FBTyxFQUFFLENBQUMsWUFBSCxDQUFBLENBQWlCLENBQUMsT0FBbEIsQ0FBQSxDQURQLENBQUE7aUJBRUEsS0FBQyxDQUFBLFdBQVcsQ0FBQyxNQUFELENBQVosQ0FBa0IsSUFBbEIsRUFIaUQ7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuRCxDQUFBLENBQUE7QUFBQSxNQUtBLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBZixDQUE4QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxHQUFELEdBQUE7QUFFNUIsY0FBQSxvQ0FBQTtBQUFBLFVBQUEsT0FBbUMsR0FBRyxDQUFDLEtBQUosQ0FBVSxHQUFWLENBQW5DLEVBQUMsZ0JBQUEsUUFBRCxFQUFXLFlBQUEsSUFBWCxFQUFpQixZQUFBLElBQWpCLEVBQXVCLGdCQUFBLFFBQXZCLENBQUE7QUFFQSxVQUFBLElBQWMsUUFBQSxLQUFZLFFBQTFCO0FBQUEsa0JBQUEsQ0FBQTtXQUZBO0FBQUEsVUFJQSxLQUFDLENBQUEsV0FBRCxHQUFtQixJQUFBLFdBQUEsQ0FBWSxHQUFaLENBSm5CLENBQUE7aUJBTUEsS0FBQyxDQUFBLFlBUjJCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBOUIsQ0FMQSxDQUFBO0FBQUEsTUFlQSxHQUFBLEdBQU0seUJBZk4sQ0FBQTthQWlCQSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsR0FBcEIsRUFuQlE7SUFBQSxDQUZWO0FBQUEsSUF3QkEsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxZQUFaLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLEVBRlU7SUFBQSxDQXhCWjtBQUFBLElBNEJBLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFDVDtBQUFBLFFBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxTQUFiLENBQUEsQ0FBbEI7UUFEUztJQUFBLENBNUJYO0dBSkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee