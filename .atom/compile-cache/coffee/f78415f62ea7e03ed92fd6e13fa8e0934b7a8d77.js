(function() {
  var DiffChunk, DiffLine, File, ListItem, git, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DiffLine = require('./diff-line');

  ListItem = require('../list-item');

  git = require('../../git').git;

  File = require('pathwatcher').File;

  _ = require('underscore');

  module.exports = DiffChunk = (function(_super) {
    __extends(DiffChunk, _super);

    function DiffChunk() {
      return DiffChunk.__super__.constructor.apply(this, arguments);
    }

    DiffChunk.prototype.initialize = function(options) {
      var chunk;
      chunk = this.deleteFirstLine(options.chunk);
      chunk = this.deleteInitialWhitespace(chunk);
      chunk = this.deleteTrailingWhitespace(chunk);
      return this.lines = _.map(this.splitIntoLines(chunk), function(line) {
        return new DiffLine({
          line: line
        });
      });
    };

    DiffChunk.prototype.deleteTrailingWhitespace = function(chunk) {
      return chunk.replace(/\s*$/, "");
    };

    DiffChunk.prototype.deleteFirstLine = function(chunk) {
      return chunk.replace(/.*?\n/, "");
    };

    DiffChunk.prototype.deleteInitialWhitespace = function(chunk) {
      return chunk.replace(/^(\s*?\n)*/, "");
    };

    DiffChunk.prototype.splitIntoLines = function(chunk) {
      return chunk.split(/\n/g);
    };

    DiffChunk.prototype.patch = function() {
      return this.get("header") + this.get("chunk") + "\n";
    };

    DiffChunk.prototype.kill = function() {
      (new File(this.patchPath())).write(this.patch());
      return git.git("apply --reverse " + (this.patchPath()));
    };

    DiffChunk.prototype.stage = function() {
      (new File(this.patchPath())).write(this.patch());
      return git.git("apply --cached " + (this.patchPath()));
    };

    DiffChunk.prototype.unstage = function() {
      (new File(this.patchPath())).write(this.patch());
      return git.git("apply --cached --reverse " + (this.patchPath()));
    };

    DiffChunk.prototype.patchPath = function() {
      return atom.project.getRepo().getWorkingDirectory() + ".git/atomatigit_diff_patch";
    };

    return DiffChunk;

  })(ListItem);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FBWCxDQUFBOztBQUFBLEVBQ0EsUUFBQSxHQUFXLE9BQUEsQ0FBUSxjQUFSLENBRFgsQ0FBQTs7QUFBQSxFQUVDLE1BQU8sT0FBQSxDQUFRLFdBQVIsRUFBUCxHQUZELENBQUE7O0FBQUEsRUFHQyxPQUFRLE9BQUEsQ0FBUSxhQUFSLEVBQVIsSUFIRCxDQUFBOztBQUFBLEVBS0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxZQUFSLENBTEosQ0FBQTs7QUFBQSxFQVdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixnQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsd0JBQUEsVUFBQSxHQUFZLFNBQUMsT0FBRCxHQUFBO0FBQ1YsVUFBQSxLQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsT0FBTyxDQUFDLEtBQXpCLENBQVIsQ0FBQTtBQUFBLE1BQ0EsS0FBQSxHQUFRLElBQUMsQ0FBQSx1QkFBRCxDQUF5QixLQUF6QixDQURSLENBQUE7QUFBQSxNQUVBLEtBQUEsR0FBUSxJQUFDLENBQUEsd0JBQUQsQ0FBMEIsS0FBMUIsQ0FGUixDQUFBO2FBR0EsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFDLENBQUMsR0FBRixDQUFNLElBQUMsQ0FBQSxjQUFELENBQWdCLEtBQWhCLENBQU4sRUFBOEIsU0FBQyxJQUFELEdBQUE7ZUFDakMsSUFBQSxRQUFBLENBQVM7QUFBQSxVQUFBLElBQUEsRUFBTSxJQUFOO1NBQVQsRUFEaUM7TUFBQSxDQUE5QixFQUpDO0lBQUEsQ0FBWixDQUFBOztBQUFBLHdCQU9BLHdCQUFBLEdBQTBCLFNBQUMsS0FBRCxHQUFBO2FBQ3hCLEtBQUssQ0FBQyxPQUFOLENBQWMsTUFBZCxFQUFzQixFQUF0QixFQUR3QjtJQUFBLENBUDFCLENBQUE7O0FBQUEsd0JBVUEsZUFBQSxHQUFpQixTQUFDLEtBQUQsR0FBQTthQUNmLEtBQUssQ0FBQyxPQUFOLENBQWMsT0FBZCxFQUF1QixFQUF2QixFQURlO0lBQUEsQ0FWakIsQ0FBQTs7QUFBQSx3QkFhQSx1QkFBQSxHQUF5QixTQUFDLEtBQUQsR0FBQTthQUN2QixLQUFLLENBQUMsT0FBTixDQUFjLFlBQWQsRUFBNEIsRUFBNUIsRUFEdUI7SUFBQSxDQWJ6QixDQUFBOztBQUFBLHdCQWdCQSxjQUFBLEdBQWdCLFNBQUMsS0FBRCxHQUFBO2FBQ2QsS0FBSyxDQUFDLEtBQU4sQ0FBWSxLQUFaLEVBRGM7SUFBQSxDQWhCaEIsQ0FBQTs7QUFBQSx3QkFtQkEsS0FBQSxHQUFPLFNBQUEsR0FBQTthQUNMLElBQUMsQ0FBQSxHQUFELENBQUssUUFBTCxDQUFBLEdBQWlCLElBQUMsQ0FBQSxHQUFELENBQUssT0FBTCxDQUFqQixHQUFpQyxLQUQ1QjtJQUFBLENBbkJQLENBQUE7O0FBQUEsd0JBc0JBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDSixNQUFBLENBQUssSUFBQSxJQUFBLENBQUssSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFMLENBQUwsQ0FBdUIsQ0FBQyxLQUF4QixDQUE4QixJQUFDLENBQUEsS0FBRCxDQUFBLENBQTlCLENBQUEsQ0FBQTthQUNBLEdBQUcsQ0FBQyxHQUFKLENBQVMsa0JBQUEsR0FBaUIsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUFBLENBQUEsQ0FBMUIsRUFGSTtJQUFBLENBdEJOLENBQUE7O0FBQUEsd0JBMEJBLEtBQUEsR0FBTyxTQUFBLEdBQUE7QUFDTCxNQUFBLENBQUssSUFBQSxJQUFBLENBQUssSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFMLENBQUwsQ0FBdUIsQ0FBQyxLQUF4QixDQUE4QixJQUFDLENBQUEsS0FBRCxDQUFBLENBQTlCLENBQUEsQ0FBQTthQUNBLEdBQUcsQ0FBQyxHQUFKLENBQVMsaUJBQUEsR0FBZ0IsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUFBLENBQUEsQ0FBekIsRUFGSztJQUFBLENBMUJQLENBQUE7O0FBQUEsd0JBOEJBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxNQUFBLENBQUssSUFBQSxJQUFBLENBQUssSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFMLENBQUwsQ0FBdUIsQ0FBQyxLQUF4QixDQUE4QixJQUFDLENBQUEsS0FBRCxDQUFBLENBQTlCLENBQUEsQ0FBQTthQUNBLEdBQUcsQ0FBQyxHQUFKLENBQVMsMkJBQUEsR0FBMEIsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUFBLENBQUEsQ0FBbkMsRUFGTztJQUFBLENBOUJULENBQUE7O0FBQUEsd0JBa0NBLFNBQUEsR0FBVyxTQUFBLEdBQUE7YUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWIsQ0FBQSxDQUFzQixDQUFDLG1CQUF2QixDQUFBLENBQUEsR0FBK0MsNkJBRHRDO0lBQUEsQ0FsQ1gsQ0FBQTs7cUJBQUE7O0tBRHNCLFNBWnhCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.dotfiles/.atom/packages/atomatigit/lib/models/diffs/diff-chunk.coffee