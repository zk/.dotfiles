(function() {
  var BC, DisplayBuffer, Editor, NC, ReplView, TextBuffer, TokenizedBuffer, URL, closeFormRegex, ed, fs, main, net, openFormRegex, plugin, scratch, _;

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

  scratch = require("../cljsout/cla/scratch.js");

  plugin.init();

  module.exports = {
    activate: function(state) {
      plugin.activate();
      _.each(_.pairs(main.commands), (function(_this) {
        return function(c) {
          return atom.workspaceView.command(c[0], c[1]);
        };
      })(this));
      _.each(_.pairs(plugin.commands), (function(_this) {
        return function(c) {
          return atom.workspaceView.command(c[0], c[1]);
        };
      })(this));
      return scratch.init();
    },
    deactivate: function() {},
    serialize: function() {
      console.log("serialize atom-clojure");
      return {
        deserializer: "ClojurePlugin"
      };
    },
    deserialize: function() {
      return console.log("deserialize atom-clojure");
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtJQUFBOztBQUFBLEVBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxhQUFSLENBQVgsQ0FBQTs7QUFBQSxFQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIsUUFBdkIsQ0FEQSxDQUFBOztBQUFBLEVBR0EsYUFBQSxHQUFnQixXQUhoQixDQUFBOztBQUFBLEVBSUEsY0FBQSxHQUFpQixXQUpqQixDQUFBOztBQUFBLEVBT0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBUE4sQ0FBQTs7QUFBQSxFQVFBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FSSixDQUFBOztBQUFBLEVBU0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxjQUFSLENBVEwsQ0FBQTs7QUFBQSxFQVVBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQVZMLENBQUE7O0FBQUEsRUFXQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FYTCxDQUFBOztBQUFBLEVBWUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBWk4sQ0FBQTs7QUFBQSxFQWNBLFVBQUEsR0FBYSxPQUFBLENBQVEsYUFBUixDQWRiLENBQUE7O0FBQUEsRUFlQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxvQkFBUixDQWZoQixDQUFBOztBQUFBLEVBZ0JBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHNCQUFSLENBaEJsQixDQUFBOztBQUFBLEVBaUJBLE1BQUEsR0FBUyxPQUFBLENBQVEsWUFBUixDQWpCVCxDQUFBOztBQUFBLEVBbUJBLEVBQUEsR0FBSyxTQUFBLEdBQUE7V0FBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWYsQ0FBQSxFQUFOO0VBQUEsQ0FuQkwsQ0FBQTs7QUFBQSxFQXFCQSxJQUFJLENBQUMsT0FBTCxHQU9BLE1BQU0sQ0FBQyxLQUFQLEdBQWUsT0FBQSxDQUFRLE9BQVIsQ0E1QmYsQ0FBQTs7QUFBQSxFQThCQSxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLENBOUJBLENBQUE7O0FBQUEsRUErQkEsT0FBQSxDQUFRLGtCQUFSLENBL0JBLENBQUE7O0FBQUEsRUFnQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSx3QkFBUixDQWhDUCxDQUFBOztBQUFBLEVBaUNBLE1BQUEsR0FBUyxPQUFBLENBQVEsMEJBQVIsQ0FqQ1QsQ0FBQTs7QUFBQSxFQWtDQSxPQUFBLEdBQVUsT0FBQSxDQUFRLDJCQUFSLENBbENWLENBQUE7O0FBQUEsRUFvQ0EsTUFBTSxDQUFDLElBQVAsQ0FBQSxDQXBDQSxDQUFBOztBQUFBLEVBc0NBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUVSLE1BQUEsTUFBTSxDQUFDLFFBQVAsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUVBLENBQUMsQ0FBQyxJQUFGLENBQU8sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxJQUFJLENBQUMsUUFBYixDQUFQLEVBQStCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLENBQUQsR0FBQTtpQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLENBQUUsQ0FBQSxDQUFBLENBQTdCLEVBQWlDLENBQUUsQ0FBQSxDQUFBLENBQW5DLEVBQVA7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEvQixDQUZBLENBQUE7QUFBQSxNQUdBLENBQUMsQ0FBQyxJQUFGLENBQU8sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxNQUFNLENBQUMsUUFBZixDQUFQLEVBQWlDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLENBQUQsR0FBQTtpQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLENBQUUsQ0FBQSxDQUFBLENBQTdCLEVBQWlDLENBQUUsQ0FBQSxDQUFBLENBQW5DLEVBQVA7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqQyxDQUhBLENBQUE7YUFNQSxPQUFPLENBQUMsSUFBUixDQUFBLEVBUlE7SUFBQSxDQUFWO0FBQUEsSUFVQSxVQUFBLEVBQVksU0FBQSxHQUFBLENBVlo7QUFBQSxJQVlBLFNBQUEsRUFBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosQ0FBQSxDQUFBO2FBQ0E7QUFBQSxRQUFDLFlBQUEsRUFBYyxlQUFmO1FBRlM7SUFBQSxDQVpYO0FBQUEsSUFlQSxXQUFBLEVBQWEsU0FBQSxHQUFBO2FBQ1gsT0FBTyxDQUFDLEdBQVIsQ0FBWSwwQkFBWixFQURXO0lBQUEsQ0FmYjtHQXZDRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/zk/napplelabs/atom/atom-clojure/lib/clojure.coffee