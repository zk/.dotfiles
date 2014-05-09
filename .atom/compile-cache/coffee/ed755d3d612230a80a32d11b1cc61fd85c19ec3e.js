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
          form = ed.getSelection();
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdCQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsV0FBQSxFQUFhLElBQWI7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUVSLFVBQUEsR0FBQTtBQUFBLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixzQkFBM0IsRUFBbUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNqRCxjQUFBLFFBQUE7QUFBQSxVQUFBLEVBQUEsR0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWYsQ0FBQSxDQUFMLENBQUE7QUFBQSxVQUNBLElBQUEsR0FBTyxFQUFFLENBQUMsWUFBSCxDQUFBLENBRFAsQ0FBQTtpQkFFQSxLQUFDLENBQUEsV0FBVyxDQUFDLE1BQUQsQ0FBWixDQUFrQixJQUFsQixFQUhpRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5ELENBQUEsQ0FBQTtBQUFBLE1BS0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFmLENBQThCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEdBQUQsR0FBQTtBQUU1QixjQUFBLG9DQUFBO0FBQUEsVUFBQSxPQUFtQyxHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBbkMsRUFBQyxnQkFBQSxRQUFELEVBQVcsWUFBQSxJQUFYLEVBQWlCLFlBQUEsSUFBakIsRUFBdUIsZ0JBQUEsUUFBdkIsQ0FBQTtBQUVBLFVBQUEsSUFBYyxRQUFBLEtBQVksUUFBMUI7QUFBQSxrQkFBQSxDQUFBO1dBRkE7QUFBQSxVQUlBLEtBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsV0FBQSxDQUFZLEdBQVosQ0FKbkIsQ0FBQTtpQkFNQSxLQUFDLENBQUEsWUFSMkI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE5QixDQUxBLENBQUE7QUFBQSxNQWVBLEdBQUEsR0FBTSx5QkFmTixDQUFBO2FBaUJBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixHQUFwQixFQW5CUTtJQUFBLENBRlY7QUFBQSxJQXdCQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFlBQVosQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQUEsRUFGVTtJQUFBLENBeEJaO0FBQUEsSUE0QkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxnQkFBQSxFQUFrQixJQUFDLENBQUEsV0FBVyxDQUFDLFNBQWIsQ0FBQSxDQUFsQjtRQURTO0lBQUEsQ0E1Qlg7R0FKRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee