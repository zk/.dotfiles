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
        return this.clojureView["eval"](form);
      });
      atom.workspace.registerOpener(function(uri) {
        var host, pathname, port, protocol, _ref;
        _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, port = _ref.port, pathname = _ref.pathname;
        if (protocol !== 'nrepl:') {
          return;
        }
        this.clojureView = new ClojureView(uri);
        return this.clojureView;
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsV0FBQSxFQUFhLElBQWI7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUVSLFVBQUEsR0FBQTtBQUFBLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixzQkFBM0IsRUFBbUQsU0FBQSxHQUFBO0FBQ2pELFlBQUEsUUFBQTtBQUFBLFFBQUEsRUFBQSxHQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZixDQUFBLENBQUwsQ0FBQTtBQUFBLFFBQ0EsSUFBQSxHQUFPLEVBQUUsQ0FBQyxZQUFILENBQUEsQ0FEUCxDQUFBO2VBRUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxNQUFELENBQVosQ0FBa0IsSUFBbEIsRUFIaUQ7TUFBQSxDQUFuRCxDQUFBLENBQUE7QUFBQSxNQUtBLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBZixDQUE4QixTQUFDLEdBQUQsR0FBQTtBQUU1QixZQUFBLG9DQUFBO0FBQUEsUUFBQSxPQUFtQyxHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBbkMsRUFBQyxnQkFBQSxRQUFELEVBQVcsWUFBQSxJQUFYLEVBQWlCLFlBQUEsSUFBakIsRUFBdUIsZ0JBQUEsUUFBdkIsQ0FBQTtBQUVBLFFBQUEsSUFBYyxRQUFBLEtBQVksUUFBMUI7QUFBQSxnQkFBQSxDQUFBO1NBRkE7QUFBQSxRQUlBLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsV0FBQSxDQUFZLEdBQVosQ0FKbkIsQ0FBQTtlQU1BLElBQUMsQ0FBQSxZQVIyQjtNQUFBLENBQTlCLENBTEEsQ0FBQTtBQUFBLE1BZUEsR0FBQSxHQUFNLHlCQWZOLENBQUE7YUFpQkEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLEdBQXBCLEVBbkJRO0lBQUEsQ0FGVjtBQUFBLElBd0JBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksWUFBWixDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBQSxFQUZVO0lBQUEsQ0F4Qlo7QUFBQSxJQTRCQSxTQUFBLEVBQVcsU0FBQSxHQUFBO2FBQ1Q7QUFBQSxRQUFBLGdCQUFBLEVBQWtCLElBQUMsQ0FBQSxXQUFXLENBQUMsU0FBYixDQUFBLENBQWxCO1FBRFM7SUFBQSxDQTVCWDtHQUpGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee