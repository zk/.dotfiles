(function() {
  var ClojureView, URL;

  ClojureView = require('./clojure-view');

  URL = require('url');

  module.exports = {
    clojureView: null,
    activate: function(state) {
      var uri;
      atom.workspaceView.command('nrepl:eval-selection', function() {
        var ed, form;
        ed = atom.workspace.getActiveEditor();
        form = ed.getSelection();
        return clojureView["eval"](form);
      });
      atom.workspace.registerOpener(function(uri) {
        var clojureView, host, pathname, port, protocol, _ref;
        _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, port = _ref.port, pathname = _ref.pathname;
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsV0FBQSxFQUFhLElBQWI7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUVSLFVBQUEsR0FBQTtBQUFBLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixzQkFBM0IsRUFBbUQsU0FBQSxHQUFBO0FBQ2pELFlBQUEsUUFBQTtBQUFBLFFBQUEsRUFBQSxHQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZixDQUFBLENBQUwsQ0FBQTtBQUFBLFFBQ0EsSUFBQSxHQUFPLEVBQUUsQ0FBQyxZQUFILENBQUEsQ0FEUCxDQUFBO2VBRUEsV0FBVyxDQUFDLE1BQUQsQ0FBWCxDQUFpQixJQUFqQixFQUhpRDtNQUFBLENBQW5ELENBQUEsQ0FBQTtBQUFBLE1BS0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFmLENBQThCLFNBQUMsR0FBRCxHQUFBO0FBRTVCLFlBQUEsaURBQUE7QUFBQSxRQUFBLE9BQW1DLEdBQUcsQ0FBQyxLQUFKLENBQVUsR0FBVixDQUFuQyxFQUFDLGdCQUFBLFFBQUQsRUFBVyxZQUFBLElBQVgsRUFBaUIsWUFBQSxJQUFqQixFQUF1QixnQkFBQSxRQUF2QixDQUFBO0FBRUEsUUFBQSxJQUFjLFFBQUEsS0FBWSxRQUExQjtBQUFBLGdCQUFBLENBQUE7U0FGQTtBQUFBLFFBSUEsV0FBQSxHQUFrQixJQUFBLFdBQUEsQ0FBWSxHQUFaLENBSmxCLENBQUE7ZUFNQSxZQVI0QjtNQUFBLENBQTlCLENBTEEsQ0FBQTtBQUFBLE1BZUEsR0FBQSxHQUFNLHlCQWZOLENBQUE7YUFpQkEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLEdBQXBCLEVBbkJRO0lBQUEsQ0FGVjtBQUFBLElBd0JBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksWUFBWixDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBQSxFQUZVO0lBQUEsQ0F4Qlo7QUFBQSxJQTRCQSxTQUFBLEVBQVcsU0FBQSxHQUFBO2FBQ1Q7QUFBQSxRQUFBLGdCQUFBLEVBQWtCLElBQUMsQ0FBQSxXQUFXLENBQUMsU0FBYixDQUFBLENBQWxCO1FBRFM7SUFBQSxDQTVCWDtHQUpGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee