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
      var editor, figlet;
      editor = atom.workspace.activePaneItem;
      editor.insertText('hello world');
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGlCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsV0FBQSxDQUFZLEtBQUssQ0FBQyxnQkFBbEIsQ0FBbkIsQ0FBQTthQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsa0JBQTNCLEVBQStDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0MsRUFGUTtJQUFBLENBRlY7QUFBQSxJQU1BLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBQSxFQURVO0lBQUEsQ0FOWjtBQUFBLElBU0EsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxnQkFBQSxFQUFrQixJQUFDLENBQUEsV0FBVyxDQUFDLFNBQWIsQ0FBQSxDQUFsQjtRQURTO0lBQUEsQ0FUWDtBQUFBLElBWUEsT0FBQSxFQUFTLFNBQUEsR0FBQTtBQUNQLFVBQUEsY0FBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBeEIsQ0FBQTtBQUFBLE1BQ0EsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsYUFBbEIsQ0FEQSxDQUFBO0FBQUEsTUFHQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FIVCxDQUFBO2FBSUEsTUFBQSxDQUFPLFNBQVMsQ0FBQyxPQUFWLENBQUEsQ0FBUCxFQUE0QjtBQUFBLFFBQUMsSUFBQSxFQUFNLFlBQVA7T0FBNUIsRUFBa0QsU0FBQyxLQUFELEVBQVEsRUFBUixHQUFBO0FBQ2hELFFBQUEsSUFBRyxLQUFIO2lCQUNFLE9BQU8sQ0FBQyxLQUFSLENBQWMsS0FBZCxFQURGO1NBQUEsTUFBQTtpQkFHRSxTQUFTLENBQUMsVUFBVixDQUFzQixJQUFBLEdBQUcsRUFBSCxHQUFPLElBQTdCLEVBSEY7U0FEZ0Q7TUFBQSxDQUFsRCxFQUxPO0lBQUEsQ0FaVDtHQUhGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/test-pak/lib/test-pak.coffee