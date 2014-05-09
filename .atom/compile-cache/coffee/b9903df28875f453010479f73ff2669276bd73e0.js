(function() {
  var TestPakView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = TestPakView = (function(_super) {
    __extends(TestPakView, _super);

    function TestPakView() {
      return TestPakView.__super__.constructor.apply(this, arguments);
    }

    TestPakView.content = function() {
      return this.div({
        "class": 'test-pak overlay from-top'
      }, (function(_this) {
        return function() {
          return _this.div("The TestPak package is Alive! It's ALIVE!", {
            "class": "message"
          });
        };
      })(this));
    };

    TestPakView.prototype.initialize = function(serializeState) {
      return atom.workspaceView.command("test-pak:toggle", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
    };

    TestPakView.prototype.serialize = function() {};

    TestPakView.prototype.destroy = function() {
      return this.detach();
    };

    TestPakView.prototype.toggle = function() {
      console.log("TestPakView was toggled!");
      if (this.hasParent()) {
        return this.detach();
      } else {
        return atom.workspaceView.append(this);
      }
    };

    return TestPakView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFdBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDJCQUFQO09BQUwsRUFBeUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDdkMsS0FBQyxDQUFBLEdBQUQsQ0FBSywyQ0FBTCxFQUFrRDtBQUFBLFlBQUEsT0FBQSxFQUFPLFNBQVA7V0FBbEQsRUFEdUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDBCQUlBLFVBQUEsR0FBWSxTQUFDLGNBQUQsR0FBQTthQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsaUJBQTNCLEVBQThDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBOUMsRUFEVTtJQUFBLENBSlosQ0FBQTs7QUFBQSwwQkFRQSxTQUFBLEdBQVcsU0FBQSxHQUFBLENBUlgsQ0FBQTs7QUFBQSwwQkFXQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURPO0lBQUEsQ0FYVCxDQUFBOztBQUFBLDBCQWNBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksMEJBQVosQ0FBQSxDQUFBO0FBQ0EsTUFBQSxJQUFHLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBSDtlQUNFLElBQUMsQ0FBQSxNQUFELENBQUEsRUFERjtPQUFBLE1BQUE7ZUFHRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQW5CLENBQTBCLElBQTFCLEVBSEY7T0FGTTtJQUFBLENBZFIsQ0FBQTs7dUJBQUE7O0tBRHdCLEtBSDFCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/.atom/packages/test-pak/lib/test-pak-view.coffee