(function() {
  var ProjectQuickOpenView;

  ProjectQuickOpenView = require('./project-quick-open-view');

  module.exports = {
    configDefaults: {
      openProjectsInSameWindow: false
    },
    activate: function(state) {
      return this.ProjectQuickOpenView = new ProjectQuickOpenView();
    },
    deactivate: function() {
      return this.ProjectQuickOpenView.destroy();
    },
    serialize: function() {
      return {
        ProjectQuickOpenViewState: this.ProjectQuickOpenView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9CQUFBOztBQUFBLEVBQUEsb0JBQUEsR0FBdUIsT0FBQSxDQUFRLDJCQUFSLENBQXZCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxjQUFBLEVBQ0U7QUFBQSxNQUFBLHdCQUFBLEVBQTBCLEtBQTFCO0tBREY7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTthQUNSLElBQUMsQ0FBQSxvQkFBRCxHQUE0QixJQUFBLG9CQUFBLENBQUEsRUFEcEI7SUFBQSxDQUZWO0FBQUEsSUFJQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLG9CQUFvQixDQUFDLE9BQXRCLENBQUEsRUFEVTtJQUFBLENBSlo7QUFBQSxJQU9BLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFDVDtBQUFBLFFBQUEseUJBQUEsRUFBMkIsSUFBQyxDQUFBLG9CQUFvQixDQUFDLFNBQXRCLENBQUEsQ0FBM0I7UUFEUztJQUFBLENBUFg7R0FIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/.atom/packages/project-quick-open/lib/project-quick-open.coffee