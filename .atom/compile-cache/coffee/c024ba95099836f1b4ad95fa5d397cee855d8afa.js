(function() {
  var $, BranchListView, CommitListView, CurrentBranchView, EditorView, ErrorView, FileListView, RepoView, View, git, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = require('jquery');

  _ref = require('atom'), View = _ref.View, EditorView = _ref.EditorView;

  FileListView = require('./files').FileListView;

  _ref1 = require('./branches'), CurrentBranchView = _ref1.CurrentBranchView, BranchListView = _ref1.BranchListView;

  CommitListView = require('./commits').CommitListView;

  ErrorView = require('./error-view');

  git = require('../git').git;

  module.exports = RepoView = (function(_super) {
    __extends(RepoView, _super);

    function RepoView() {
      this.cancel_input = __bind(this.cancel_input, this);
      this.get_input = __bind(this.get_input, this);
      this.resize = __bind(this.resize, this);
      this.resize_stopped = __bind(this.resize_stopped, this);
      this.resize_started = __bind(this.resize_started, this);
      return RepoView.__super__.constructor.apply(this, arguments);
    }

    RepoView.content = function(model) {
      return this.div({
        "class": 'atomatigit'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": "resize-handle",
            outlet: "resize_handle"
          });
          _this.subview("current_branch_view", new CurrentBranchView(model.current_branch));
          _this.subview("error", new ErrorView(git));
          _this.div({
            "class": "input",
            outlet: "input"
          }, function() {
            return _this.subview("input_editor", new EditorView({
              mini: true
            }));
          });
          _this.ul({
            "class": "list-inline tab-bar inset-panel"
          }, function() {
            _this.li({
              outlet: "file_tab",
              "class": "tab active",
              click: "showFiles"
            }, function() {
              return _this.div({
                "class": 'title'
              }, "Staging");
            });
            _this.li({
              outlet: "branch_tab",
              "class": "tab",
              click: "showBranches"
            }, function() {
              return _this.div({
                "class": 'title'
              }, "Branches");
            });
            return _this.li({
              outlet: "commit_tab",
              "class": "tab",
              click: "showCommits"
            }, function() {
              return _this.div({
                "class": 'title'
              }, "Log");
            });
          });
          return _this.div({
            "class": "lists"
          }, function() {
            _this.subview("file_list_view", new FileListView(model.file_list));
            _this.subview("branch_list_view", new BranchListView(model.branch_list));
            return _this.subview("commit_list_view", new CommitListView(model.commit_list));
          });
        };
      })(this));
    };

    RepoView.prototype.initialize = function(repo) {
      var atom_git;
      this.model = repo;
      this.insert_commands();
      this.model.on("need_input", this.get_input);
      this.on('core:confirm', (function(_this) {
        return function() {
          return _this.complete_input();
        };
      })(this));
      this.on('core:cancel', (function(_this) {
        return function() {
          return _this.cancel_input();
        };
      })(this));
      this.on('click', (function(_this) {
        return function() {
          return _this.focus();
        };
      })(this));
      this.on('focusout', (function(_this) {
        return function() {
          return _this.unfocus();
        };
      })(this));
      this.input_editor.on("click", function() {
        return false;
      });
      this.resize_handle.on("mousedown", this.resize_started);
      atom_git = atom.project.getRepo();
      this.subscribe(atom_git, 'status-changed', this.model.reload);
      return this.showFiles();
    };

    RepoView.prototype.insert_commands = function() {
      atom.workspaceView.command("atomatigit:next", (function(_this) {
        return function() {
          return _this.model.active_list.next();
        };
      })(this));
      atom.workspaceView.command("atomatigit:previous", (function(_this) {
        return function() {
          return _this.model.active_list.previous();
        };
      })(this));
      atom.workspaceView.command("atomatigit:stage", (function(_this) {
        return function() {
          return _this.model.leaf().stage();
        };
      })(this));
      atom.workspaceView.command("atomatigit:unstage", (function(_this) {
        return function() {
          return _this.model.leaf().unstage();
        };
      })(this));
      atom.workspaceView.command("atomatigit:kill", (function(_this) {
        return function() {
          return _this.model.leaf().kill();
        };
      })(this));
      atom.workspaceView.command("atomatigit:open", (function(_this) {
        return function() {
          return _this.model.selection().open();
        };
      })(this));
      atom.workspaceView.command("atomatigit:toggle-diff", (function(_this) {
        return function() {
          return _this.model.selection().toggleDiff();
        };
      })(this));
      atom.workspaceView.command("atomatigit:commit", (function(_this) {
        return function() {
          return _this.model.initiateCommit();
        };
      })(this));
      atom.workspaceView.command("atomatigit:complete-commit", (function(_this) {
        return function() {
          return _this.commitAndClose();
        };
      })(this));
      atom.workspaceView.command("atomatigit:push", (function(_this) {
        return function() {
          return _this.model.push();
        };
      })(this));
      atom.workspaceView.command("atomatigit:fetch", (function(_this) {
        return function() {
          return _this.model.fetch();
        };
      })(this));
      atom.workspaceView.command("atomatigit:stash", (function(_this) {
        return function() {
          return _this.model.stash();
        };
      })(this));
      atom.workspaceView.command("atomatigit:stash-pop", (function(_this) {
        return function() {
          return _this.model.stashPop();
        };
      })(this));
      atom.workspaceView.command("atomatigit:hard-reset-to-commit", (function(_this) {
        return function() {
          return _this.model.selection().confirmHardReset();
        };
      })(this));
      atom.workspaceView.command("atomatigit:create-branch", (function(_this) {
        return function() {
          return _this.model.initiateCreateBranch();
        };
      })(this));
      atom.workspaceView.command("atomatigit:git-command", (function(_this) {
        return function() {
          return _this.model.initiateGitCommand();
        };
      })(this));
      atom.workspaceView.command("atomatigit:input:newline", (function(_this) {
        return function() {
          return _this.input_newline();
        };
      })(this));
      atom.workspaceView.command("atomatigit:input:up", (function(_this) {
        return function() {
          return _this.input_up();
        };
      })(this));
      atom.workspaceView.command("atomatigit:input:down", (function(_this) {
        return function() {
          return _this.input_down();
        };
      })(this));
      atom.workspaceView.command("atomatigit:branches", (function(_this) {
        return function() {
          return _this.showBranches();
        };
      })(this));
      atom.workspaceView.command("atomatigit:files", (function(_this) {
        return function() {
          return _this.showFiles();
        };
      })(this));
      atom.workspaceView.command("atomatigit:commit-log", (function(_this) {
        return function() {
          return _this.showCommits();
        };
      })(this));
      return atom.workspaceView.command("atomatigit:refresh", (function(_this) {
        return function() {
          return _this.refresh();
        };
      })(this));
    };

    RepoView.prototype.commitAndClose = function() {
      atom.workspaceView.trigger("core:save");
      atom.workspaceView.trigger("core:close");
      this.model.completeCommit();
      return this.focus();
    };

    RepoView.prototype.refresh = function() {
      this.model.reload();
      return git.clearTaskCounter();
    };

    RepoView.prototype.showBranches = function() {
      this.model.active_list = this.model.branch_list;
      this.active_view = this.branch_list_view;
      return this.showViews();
    };

    RepoView.prototype.showFiles = function() {
      this.model.active_list = this.model.file_list;
      this.active_view = this.file_list_view;
      return this.showViews();
    };

    RepoView.prototype.showCommits = function() {
      this.model.active_list = this.model.commit_list;
      this.active_view = this.commit_list_view;
      return this.showViews();
    };

    RepoView.prototype.showViews = function() {
      this.mode_switch_flag = true;
      this.file_list_view.toggleClass("hidden", this.active_view !== this.file_list_view);
      this.file_tab.toggleClass("active", this.active_view === this.file_list_view);
      this.branch_list_view.toggleClass("hidden", this.active_view !== this.branch_list_view);
      this.branch_tab.toggleClass("active", this.active_view === this.branch_list_view);
      this.commit_list_view.toggleClass("hidden", this.active_view !== this.commit_list_view);
      return this.commit_tab.toggleClass("active", this.active_view === this.commit_list_view);
    };

    RepoView.prototype.resize_started = function() {
      $(document.body).on('mousemove', this.resize);
      return $(document.body).on('mouseup', this.resize_stopped);
    };

    RepoView.prototype.resize_stopped = function() {
      $(document.body).off('mousemove', this.resize);
      return $(document.body).off('mouseup', this.resize_stopped);
    };

    RepoView.prototype.resize = function(_arg) {
      var pageX, width;
      pageX = _arg.pageX;
      width = $(document.body).width() - pageX;
      return this.width(width);
    };

    RepoView.prototype.get_input = function(options) {
      var extra_query;
      this.input.removeClass("block");
      extra_query = "";
      if (options.block) {
        this.input.addClass("block");
        extra_query = " (shift+enter to finish)";
      }
      this.input_callback = options.callback;
      this.input_editor.setPlaceholderText(options.query + extra_query);
      this.input_editor.setText("");
      return this.input.show(100, (function(_this) {
        return function() {
          _this.input_editor.redraw();
          return _this.input_editor.focus();
        };
      })(this));
    };

    RepoView.prototype.complete_input = function() {
      this.input.hide();
      this.input_callback(this.input_editor.getText());
      this.mode_switch_flag = true;
      return this.focus();
    };

    RepoView.prototype.cancel_input = function() {
      this.input.hide();
      this.input_callback = null;
      this.mode_switch_flag = true;
      this.input_editor.off('focusout', this.cancel_input);
      return this.focus();
    };

    RepoView.prototype.focus = function() {
      this.addClass("focused");
      return this.active_view.focus();
    };

    RepoView.prototype.unfocus = function() {
      if (!this.mode_switch_flag) {
        return this.removeClass("focused");
      } else {
        this.focus();
        return this.mode_switch_flag = false;
      }
    };

    RepoView.prototype.serialize = function() {};

    RepoView.prototype.destroy = function() {
      return this.detach();
    };

    return RepoView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJIQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSLENBQUosQ0FBQTs7QUFBQSxFQUVBLE9BQXFCLE9BQUEsQ0FBUSxNQUFSLENBQXJCLEVBQUMsWUFBQSxJQUFELEVBQU8sa0JBQUEsVUFGUCxDQUFBOztBQUFBLEVBR0MsZUFBZ0IsT0FBQSxDQUFRLFNBQVIsRUFBaEIsWUFIRCxDQUFBOztBQUFBLEVBSUEsUUFBdUMsT0FBQSxDQUFRLFlBQVIsQ0FBdkMsRUFBQywwQkFBQSxpQkFBRCxFQUFvQix1QkFBQSxjQUpwQixDQUFBOztBQUFBLEVBS0MsaUJBQWtCLE9BQUEsQ0FBUSxXQUFSLEVBQWxCLGNBTEQsQ0FBQTs7QUFBQSxFQU1BLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQU5aLENBQUE7O0FBQUEsRUFPQyxNQUFPLE9BQUEsQ0FBUSxRQUFSLEVBQVAsR0FQRCxDQUFBOztBQUFBLEVBU0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLCtCQUFBLENBQUE7Ozs7Ozs7OztLQUFBOztBQUFBLElBQUEsUUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLEtBQUQsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxZQUFQO09BQUwsRUFBMEIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN4QixVQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxlQUFQO0FBQUEsWUFBd0IsTUFBQSxFQUFRLGVBQWhDO1dBQUwsQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsT0FBRCxDQUFTLHFCQUFULEVBQW9DLElBQUEsaUJBQUEsQ0FBa0IsS0FBSyxDQUFDLGNB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
//# sourceURL=/Users/zk/.dotfiles/.atom/packages/atomatigit/lib/views/repo-view.coffee