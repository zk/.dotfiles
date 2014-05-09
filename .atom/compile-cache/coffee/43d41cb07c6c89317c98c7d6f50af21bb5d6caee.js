(function() {
  var ClojureView, URL;

  ClojureView = require('./clojure-view');

  URL = require('url');

  module.exports = {
    clojureView: null,
    activate: function(state) {
      var uri;
      atom.workspace.registerOpener(function(uri) {
        var clojureView, host, pathname, port, protocol, _ref;
        _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, port = _ref.port, pathname = _ref.pathname;
        host = host.split(':')[0];
        if (protocol !== 'nrepl:') {
          return;
        }
        clojureView = new ClojureView(uri);
        return clojureView;
      });
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsV0FBQSxFQUFhLElBQWI7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUVSLFVBQUEsR0FBQTtBQUFBLE1BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFmLENBQThCLFNBQUMsR0FBRCxHQUFBO0FBRTVCLFlBQUEsaURBQUE7QUFBQSxRQUFBLE9BQW1DLEdBQUcsQ0FBQyxLQUFKLENBQVUsR0FBVixDQUFuQyxFQUFDLGdCQUFBLFFBQUQsRUFBVyxZQUFBLElBQVgsRUFBaUIsWUFBQSxJQUFqQixFQUF1QixnQkFBQSxRQUF2QixDQUFBO0FBQUEsUUFFQSxJQUFBLEdBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYLENBQWdCLENBQUEsQ0FBQSxDQUZ2QixDQUFBO0FBSUEsUUFBQSxJQUFjLFFBQUEsS0FBWSxRQUExQjtBQUFBLGdCQUFBLENBQUE7U0FKQTtBQUFBLFFBTUEsV0FBQSxHQUFrQixJQUFBLFdBQUEsQ0FBWSxHQUFaLENBTmxCLENBQUE7ZUFRQSxZQVY0QjtNQUFBLENBQTlCLENBQUEsQ0FBQTtBQUFBLE1BWUEsR0FBQSxHQUFNLHlCQVpOLENBQUE7YUFjQSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsR0FBcEIsRUFoQlE7SUFBQSxDQUZWO0FBQUEsSUFxQkEsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxZQUFaLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLEVBRlU7SUFBQSxDQXJCWjtBQUFBLElBeUJBLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFDVDtBQUFBLFFBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxTQUFiLENBQUEsQ0FBbEI7UUFEUztJQUFBLENBekJYO0dBSkYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee