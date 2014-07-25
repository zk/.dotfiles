(function() {
  var ProjectQuickOpenView, SelectListView, fs,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SelectListView = require('atom').SelectListView;

  fs = require('fs');

  module.exports = ProjectQuickOpenView = (function(_super) {
    __extends(ProjectQuickOpenView, _super);

    function ProjectQuickOpenView() {
      return ProjectQuickOpenView.__super__.constructor.apply(this, arguments);
    }

    ProjectQuickOpenView.prototype.initialize = function() {
      ProjectQuickOpenView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      return atom.workspaceView.command('project-quick-open:toggle', (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
    };

    ProjectQuickOpenView.prototype.viewForItem = function(item) {
      return "<li>" + item + "</li>";
    };

    ProjectQuickOpenView.prototype.confirmed = function(item) {
      var newPath, pane, panes, _fn, _i, _len;
      newPath = atom.config.settings.core.projectHome + '/' + item;
      if (atom.config.get('project-quick-open.openProjectsInSameWindow')) {
        panes = atom.workspace.getPanes();
        _fn = function(pane) {
          return pane.destroyItems();
        };
        for (_i = 0, _len = panes.length; _i < _len; _i++) {
          pane = panes[_i];
          _fn(pane);
        }
        atom.project.setPath(newPath);
      } else {
        atom.open({
          pathsToOpen: [newPath]
        });
      }
      return this.cancel();
    };

    ProjectQuickOpenView.prototype.getFiles = function() {
      var projectPath;
      projectPath = atom.config.settings.core.projectHome + "/";
      return fs.readdir(projectPath, (function(_this) {
        return function(err, files) {
          var file, folders;
          folders = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = files.length; _i < _len; _i++) {
              file = files[_i];
              if (file[0] !== '.' && fs.statSync(projectPath + file).isDirectory()) {
                _results.push(file);
              }
            }
            return _results;
          })();
          _this.setItems(folders);
          return _this.populateList();
        };
      })(this));
    };

    ProjectQuickOpenView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.cancel();
      } else {
        this.getFiles();
        atom.workspaceView.append(this);
        return this.focusFilterEditor();
      }
    };

    return ProjectQuickOpenView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxpQkFBa0IsT0FBQSxDQUFRLE1BQVIsRUFBbEIsY0FBRCxDQUFBOztBQUFBLEVBRUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBRkwsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSiwyQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsbUNBQUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsc0RBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsa0JBQVYsQ0FEQSxDQUFBO2FBRUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQiwyQkFBM0IsRUFBd0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsTUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4RCxFQUhVO0lBQUEsQ0FBWixDQUFBOztBQUFBLG1DQUtBLFdBQUEsR0FBYSxTQUFDLElBQUQsR0FBQTthQUNWLE1BQUEsR0FBSyxJQUFMLEdBQVcsUUFERDtJQUFBLENBTGIsQ0FBQTs7QUFBQSxtQ0FRQSxTQUFBLEdBQVcsU0FBQyxJQUFELEdBQUE7QUFDVCxVQUFBLG1DQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQTFCLEdBQXdDLEdBQXhDLEdBQThDLElBQXhELENBQUE7QUFDQSxNQUFBLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDZDQUFoQixDQUFIO0FBSUUsUUFBQSxLQUFBLEdBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFmLENBQUEsQ0FBUixDQUFBO0FBQ0EsY0FDSyxTQUFDLElBQUQsR0FBQTtpQkFDRCxJQUFJLENBQUMsWUFBTCxDQUFBLEVBREM7UUFBQSxDQURMO0FBQUEsYUFBQSw0Q0FBQTsyQkFBQTtBQUNFLGNBQUksS0FBSixDQURGO0FBQUEsU0FEQTtBQUFBLFFBTUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLENBQXFCLE9BQXJCLENBTkEsQ0FKRjtPQUFBLE1BQUE7QUFhRSxRQUFBLElBQUksQ0FBQyxJQUFMLENBQVU7QUFBQSxVQUFFLFdBQUEsRUFBYSxDQUFDLE9BQUQsQ0FBZjtTQUFWLENBQUEsQ0FiRjtPQURBO2FBZUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQWhCUztJQUFBLENBUlgsQ0FBQTs7QUFBQSxtQ0EwQkEsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNSLFVBQUEsV0FBQTtBQUFBLE1BQUEsV0FBQSxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUExQixHQUF3QyxHQUF0RCxDQUFBO2FBQ0EsRUFBRSxDQUFDLE9BQUgsQ0FBVyxXQUFYLEVBQXdCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEdBQUQsRUFBTSxLQUFOLEdBQUE7QUFDdEIsY0FBQSxhQUFBO0FBQUEsVUFBQSxPQUFBOztBQUFXO2lCQUFBLDRDQUFBOytCQUFBO2tCQUE0QixJQUFLLENBQUEsQ0FBQSxDQUFMLEtBQVcsR0FBWCxJQUFrQixFQUFFLENBQUMsUUFBSCxDQUFZLFdBQUEsR0FBYyxJQUExQixDQUErQixDQUFDLFdBQWhDLENBQUE7QUFBOUMsOEJBQUEsS0FBQTtlQUFBO0FBQUE7O2NBQVgsQ0FBQTtBQUFBLFVBQ0EsS0FBQyxDQUFBLFFBQUQsQ0FBVSxPQUFWLENBREEsQ0FBQTtpQkFFQSxLQUFDLENBQUEsWUFBRCxDQUFBLEVBSHNCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBeEIsRUFGUTtJQUFBLENBMUJWLENBQUE7O0FBQUEsbUNBaUNBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLElBQUcsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFIO2VBQ0UsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsSUFBQyxDQUFBLFFBQUQsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBbkIsQ0FBMEIsSUFBMUIsQ0FEQSxDQUFBO2VBRUEsSUFBQyxDQUFBLGlCQUFELENBQUEsRUFMRjtPQURNO0lBQUEsQ0FqQ1IsQ0FBQTs7Z0NBQUE7O0tBRGlDLGVBTG5DLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.dotfiles/.atom/packages/project-quick-open/lib/project-quick-open-view.coffee