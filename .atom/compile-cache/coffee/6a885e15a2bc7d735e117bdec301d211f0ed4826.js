(function() {
  var BC, DisplayBuffer, Editor, NC, ReplView, TextBuffer, TokenizedBuffer, URL, closeFormRegex, ed, fs, main, net, openFormRegex, plugin, _;

  ReplView = require('./repl-view');

  atom.deserializers.add(ReplView);

  openFormRegex = /[\(\[\{]/g;

  closeFormRegex = /[\)\]\}]/g;

  URL = require('url');

  _ = require('underscore-plus');

  NC = require('nrepl-client');

  BC = require('bencode');

  fs = require('fs-plus');

  net = require('net');

  TextBuffer = require('text-buffer');

  DisplayBuffer = require('src/display-buffer');

  TokenizedBuffer = require('src/tokenized-buffer');

  Editor = require('src/editor');

  ed = function() {
    return atom.workspace.getActiveEditor();
  };

  atom.clojure = global.React = require("react");

  console.log('activating clojure');

  require("../cljsloader.js");

  main = require("../cljsout/cla/main.js");

  plugin = require("../cljsout/cla/plugin.js");

  plugin.init();

  module.exports = {
    activate: function(state) {
      plugin.activate();
      _.each(_.pairs(main.commands), (function(_this) {
        return function(c) {
          return atom.workspaceView.command(c[0], c[1]);
        };
      })(this));
      return _.each(_.pairs(plugin.commands), (function(_this) {
        return function(c) {
          return atom.workspaceView.command(c[0], c[1]);
        };
      })(this));
    },
    deactivate: function() {},
    serialize: function() {}
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNJQUFBOztBQUFBLEVBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxhQUFSLENBQVgsQ0FBQTs7QUFBQSxFQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIsUUFBdkIsQ0FEQSxDQUFBOztBQUFBLEVBR0EsYUFBQSxHQUFnQixXQUhoQixDQUFBOztBQUFBLEVBSUEsY0FBQSxHQUFpQixXQUpqQixDQUFBOztBQUFBLEVBT0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBUE4sQ0FBQTs7QUFBQSxFQVFBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FSSixDQUFBOztBQUFBLEVBU0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxjQUFSLENBVEwsQ0FBQTs7QUFBQSxFQVVBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQVZMLENBQUE7O0FBQUEsRUFXQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FYTCxDQUFBOztBQUFBLEVBWUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBWk4sQ0FBQTs7QUFBQSxFQW1CQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGFBQVIsQ0FuQmIsQ0FBQTs7QUFBQSxFQW9CQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxvQkFBUixDQXBCaEIsQ0FBQTs7QUFBQSxFQXFCQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxzQkFBUixDQXJCbEIsQ0FBQTs7QUFBQSxFQXNCQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFlBQVIsQ0F0QlQsQ0FBQTs7QUFBQSxFQXdCQSxFQUFBLEdBQUssU0FBQSxHQUFBO1dBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFmLENBQUEsRUFBTjtFQUFBLENBeEJMLENBQUE7O0FBQUEsRUEwQkEsSUFBSSxDQUFDLE9BQUwsR0FPQSxNQUFNLENBQUMsS0FBUCxHQUFlLE9BQUEsQ0FBUSxPQUFSLENBakNmLENBQUE7O0FBQUEsRUFtQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxvQkFBWixDQW5DQSxDQUFBOztBQUFBLEVBb0NBLE9BQUEsQ0FBUSxrQkFBUixDQXBDQSxDQUFBOztBQUFBLEVBcUNBLElBQUEsR0FBTyxPQUFBLENBQVEsd0JBQVIsQ0FyQ1AsQ0FBQTs7QUFBQSxFQXNDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLDBCQUFSLENBdENULENBQUE7O0FBQUEsRUF3Q0EsTUFBTSxDQUFDLElBQVAsQ0FBQSxDQXhDQSxDQUFBOztBQUFBLEVBMENBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUVSLE1BQUEsTUFBTSxDQUFDLFFBQVAsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUVBLENBQUMsQ0FBQyxJQUFGLENBQU8sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxJQUFJLENBQUMsUUFBYixDQUFQLEVBQStCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLENBQUQsR0FBQTtpQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLENBQUUsQ0FBQSxDQUFBLENBQTdCLEVBQWlDLENBQUUsQ0FBQSxDQUFBLENBQW5DLEVBQVA7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEvQixDQUZBLENBQUE7YUFHQSxDQUFDLENBQUMsSUFBRixDQUFPLENBQUMsQ0FBQyxLQUFGLENBQVEsTUFBTSxDQUFDLFFBQWYsQ0FBUCxFQUFpQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxDQUFELEdBQUE7aUJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixDQUFFLENBQUEsQ0FBQSxDQUE3QixFQUFpQyxDQUFFLENBQUEsQ0FBQSxDQUFuQyxFQUFQO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakMsRUFMUTtJQUFBLENBQVY7QUFBQSxJQU9BLFVBQUEsRUFBWSxTQUFBLEdBQUEsQ0FQWjtBQUFBLElBU0EsU0FBQSxFQUFXLFNBQUEsR0FBQSxDQVRYO0dBM0NGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/zk/napplelabs/atom/atom-clojure/lib/clojure.coffee