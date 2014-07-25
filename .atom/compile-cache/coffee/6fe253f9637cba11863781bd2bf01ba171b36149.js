(function() {
  var Commit, ListItem, git,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ListItem = require('../list-item');

  git = require('../../git').git;

  module.exports = Commit = (function(_super) {
    __extends(Commit, _super);

    function Commit() {
      this.hardReset = __bind(this.hardReset, this);
      this.reset = __bind(this.reset, this);
      return Commit.__super__.constructor.apply(this, arguments);
    }

    Commit.prototype.unicodify = function(s) {
      return decodeURIComponent(escape(s));
    };

    Commit.prototype.commitID = function() {
      return this.get("id");
    };

    Commit.prototype.shortID = function() {
      var _ref;
      return (_ref = this.commitID()) != null ? _ref.substr(0, 6) : void 0;
    };

    Commit.prototype.authorName = function() {
      return this.unicodify(this.get("author").name);
    };

    Commit.prototype.message = function() {
      return this.unicodify(this.get("message") || "");
    };

    Commit.prototype.shortMessage = function() {
      return this.message().split("\n")[0];
    };

    Commit.prototype.open = function() {
      return this.confirmReset();
    };

    Commit.prototype.confirmReset = function() {
      return atom.confirm({
        message: "Soft-reset head to " + (this.shortID()) + "?",
        detailedMessage: this.message(),
        buttons: {
          "Reset": this.reset,
          "Cancel": null
        }
      });
    };

    Commit.prototype.reset = function() {
      return git.git("reset " + (this.commitID()));
    };

    Commit.prototype.confirmHardReset = function() {
      return atom.confirm({
        message: "Do you REALLY want to HARD-reset head to " + (this.shortID()) + "?",
        detailedMessage: this.message(),
        buttons: {
          "Cancel": null,
          "Reset": this.hardReset
        }
      });
    };

    Commit.prototype.hardReset = function() {
      return git.git("reset --hard " + (this.commitID()));
    };

    return Commit;

  })(ListItem);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFCQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxjQUFSLENBQVgsQ0FBQTs7QUFBQSxFQUNDLE1BQU8sT0FBQSxDQUFRLFdBQVIsRUFBUCxHQURELENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osNkJBQUEsQ0FBQTs7Ozs7O0tBQUE7O0FBQUEscUJBQUEsU0FBQSxHQUFXLFNBQUMsQ0FBRCxHQUFBO2FBQ1Qsa0JBQUEsQ0FBbUIsTUFBQSxDQUFPLENBQVAsQ0FBbkIsRUFEUztJQUFBLENBQVgsQ0FBQTs7QUFBQSxxQkFHQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSyxJQUFMLEVBRFE7SUFBQSxDQUhWLENBQUE7O0FBQUEscUJBTUEsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNQLFVBQUEsSUFBQTtvREFBVyxDQUFFLE1BQWIsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsV0FETztJQUFBLENBTlQsQ0FBQTs7QUFBQSxxQkFTQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFDLENBQUEsR0FBRCxDQUFLLFFBQUwsQ0FBYyxDQUFDLElBQTFCLEVBRFU7SUFBQSxDQVRaLENBQUE7O0FBQUEscUJBWUEsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxTQUFELENBQVksSUFBQyxDQUFBLEdBQUQsQ0FBSyxTQUFMLENBQUEsSUFBbUIsRUFBL0IsRUFETztJQUFBLENBWlQsQ0FBQTs7QUFBQSxxQkFlQSxZQUFBLEdBQWMsU0FBQSxHQUFBO2FBQ1osSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUFVLENBQUMsS0FBWCxDQUFpQixJQUFqQixDQUF1QixDQUFBLENBQUEsRUFEWDtJQUFBLENBZmQsQ0FBQTs7QUFBQSxxQkFrQkEsSUFBQSxHQUFNLFNBQUEsR0FBQTthQUNKLElBQUMsQ0FBQSxZQUFELENBQUEsRUFESTtJQUFBLENBbEJOLENBQUE7O0FBQUEscUJBcUJBLFlBQUEsR0FBYyxTQUFBLEdBQUE7YUFDWixJQUFJLENBQUMsT0FBTCxDQUNFO0FBQUEsUUFBQSxPQUFBLEVBQVUscUJBQUEsR0FBb0IsQ0FBQSxJQUFDLENBQUEsT0FBRCxDQUFBLENBQUEsQ0FBcEIsR0FBZ0MsR0FBMUM7QUFBQSxRQUNBLGVBQUEsRUFBaUIsSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQURqQjtBQUFBLFFBRUEsT0FBQSxFQUNFO0FBQUEsVUFBQSxPQUFBLEVBQVMsSUFBQyxDQUFBLEtBQVY7QUFBQSxVQUNBLFFBQUEsRUFBVSxJQURWO1NBSEY7T0FERixFQURZO0lBQUEsQ0FyQmQsQ0FBQTs7QUFBQSxxQkE2QkEsS0FBQSxHQUFPLFNBQUEsR0FBQTthQUNMLEdBQUcsQ0FBQyxHQUFKLENBQVMsUUFBQSxHQUFPLENBQUEsSUFBQyxDQUFBLFFBQUQsQ0FBQSxDQUFBLENBQWhCLEVBREs7SUFBQSxDQTdCUCxDQUFBOztBQUFBLHFCQWdDQSxnQkFBQSxHQUFrQixTQUFBLEdBQUE7YUFDaEIsSUFBSSxDQUFDLE9BQUwsQ0FDRTtBQUFBLFFBQUEsT0FBQSxFQUFVLDJDQUFBLEdBQTBDLENBQUEsSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUFBLENBQTFDLEdBQXNELEdBQWhFO0FBQUEsUUFDQSxlQUFBLEVBQWlCLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FEakI7QUFBQSxRQUVBLE9BQUEsRUFDRTtBQUFBLFVBQUEsUUFBQSxFQUFVLElBQVY7QUFBQSxVQUNBLE9BQUEsRUFBUyxJQUFDLENBQUEsU0FEVjtTQUhGO09BREYsRUFEZ0I7SUFBQSxDQWhDbEIsQ0FBQTs7QUFBQSxxQkF3Q0EsU0FBQSxHQUFXLFNBQUEsR0FBQTthQUNULEdBQUcsQ0FBQyxHQUFKLENBQVMsZUFBQSxHQUFjLENBQUEsSUFBQyxDQUFBLFFBQUQsQ0FBQSxDQUFBLENBQXZCLEVBRFM7SUFBQSxDQXhDWCxDQUFBOztrQkFBQTs7S0FEbUIsU0FKckIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/zk/.dotfiles/.atom/packages/atomatigit/lib/models/commits/commit.coffee