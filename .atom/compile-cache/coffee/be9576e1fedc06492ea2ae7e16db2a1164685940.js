(function() {
  var TestPakView;

  TestPakView = require('./test-pak-view');

  module.exports = {
    testPakView: null,
    activate: function(state) {
      this.testPakView = new TestPakView(state.testPakViewState);
      return atom.workspaceView.command("test-pak:convert", (function(_this) {
        return function() {
          return _this.convert();
        };
      })(this));
    },
    deactivate: function() {
      return this.testPakView.destroy();
    },
    serialize: function() {
      return {
        testPakViewState: this.testPakView.serialize()
      };
    },
    convert: function() {
      var editor, figlet, selection;
      editor = atom.workspace.activePaneItem;
      selection = editor.getSelection();
      figlet = require('figlet');
      return figlet(selection.getText(), {
        font: "Larry 3D 2"
      }, function(error, aa) {
        if (error) {
          return console.error(error);
        } else {
          return selection.insertText("\n" + aa + "\n");
        }
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGlCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsV0FBQSxDQUFZLEtBQUssQ0FBQyxnQkFBbEIsQ0FBbkIsQ0FBQTthQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsa0JBQTNCLEVBQStDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0MsRUFGUTtJQUFBLENBRlY7QUFBQSxJQU1BLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBQSxFQURVO0lBQUEsQ0FOWjtBQUFBLElBU0EsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxnQkFBQSxFQUFrQixJQUFDLENBQUEsV0FBVyxDQUFDLFNBQWIsQ0FBQSxDQUFsQjtRQURTO0lBQUEsQ0FUWDtBQUFBLElBWUEsT0FBQSxFQUFTLFNBQUEsR0FBQTtBQUNQLFVBQUEseUJBQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQXhCLENBQUE7QUFBQSxNQUNBLFNBQUEsR0FBWSxNQUFNLENBQUMsWUFBUCxDQUFBLENBRFosQ0FBQTtBQUFBLE1BR0EsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBSFQsQ0FBQTthQUlBLE1BQUEsQ0FBTyxTQUFTLENBQUMsT0FBVixDQUFBLENBQVAsRUFBNEI7QUFBQSxRQUFDLElBQUEsRUFBTSxZQUFQO09BQTVCLEVBQWtELFNBQUMsS0FBRCxFQUFRLEVBQVIsR0FBQTtBQUNoRCxRQUFBLElBQUcsS0FBSDtpQkFDRSxPQUFPLENBQUMsS0FBUixDQUFjLEtBQWQsRUFERjtTQUFBLE1BQUE7aUJBR0UsU0FBUyxDQUFDLFVBQVYsQ0FBc0IsSUFBQSxHQUFHLEVBQUgsR0FBTyxJQUE3QixFQUhGO1NBRGdEO01BQUEsQ0FBbEQsRUFMTztJQUFBLENBWlQ7R0FIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/test-pak/lib/test-pak.coffee