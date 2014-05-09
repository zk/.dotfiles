(function() {
  var BC, ClojureView, NC, URL, connections, fs, views, _;

  ClojureView = require('./clojure-view');

  URL = require('url');

  _ = require('underscore-plus');

  NC = require('nrepl-client');

  BC = require('bencode');

  fs = require('fs-plus');

  require('./cljsout/goog/base.js');

  connections = {};

  views = {};

  module.exports = {
    clojureView: null,
    activate: function(state) {
      atom.workspaceView.command('nrepl:connect', (function(_this) {
        return function() {
          var nrepl_port, root;
          root = atom.project.getPath();
          nrepl_port = "" + root + "/.nrepl-port";
          return fs.readFile(nrepl_port, function(err, data) {
            var uri;
            if (err) {
              return console.log("Problem reading " + nrepl_port);
            } else {
              uri = 'nrepl://localhost:' + data.toString();
              return atom.workspace.open(uri);
            }
          });
        };
      })(this));
      atom.workspaceView.command('nrepl:eval-selection', (function(_this) {
        return function() {
          var conn, ed, form, uri, view;
          ed = atom.workspace.getActiveEditor();
          form = ed.getSelection().getText();
          uri = _.chain(connections).keys().first().value();
          conn = connections[uri];
          view = views[uri];
          return conn["eval"](form, function(err, result) {
            return _.each(views[uri], function(view) {
              view.output(err || result);
              return console.log(err || result);
            });
          });
        };
      })(this));
      return atom.workspace.registerOpener((function(_this) {
        return function(uri) {
          var conn, host, pathname, port, protocol, view, _ref;
          _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, port = _ref.port, pathname = _ref.pathname;
          if (protocol !== 'nrepl:') {
            return;
          }
          host = host.split(':')[0];
          conn = NC.connect({
            port: port,
            host: host
          });
          conn.once('connect', function() {
            conn.on('data', function(data) {
              return _.each(views[uri], function(view) {
                var decoded;
                decoded = BC.decode(data);
                console.log(decoded);
                if (decoded != null ? decoded.out : void 0) {
                  return view.output(decoded.out.toString());
                }
              });
            });
            return connections[uri] = conn;
          });
          view = new ClojureView(uri);
          if (!views[uri]) {
            views[uri] = [];
          }
          views[uri].push(view);
          return view;
        };
      })(this));
    },
    deactivate: function() {
      return this.clojureView.destroy();
    },
    serialize: function() {
      return {
        clojureViewState: this.clojureView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1EQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUZKLENBQUE7O0FBQUEsRUFHQSxFQUFBLEdBQUssT0FBQSxDQUFRLGNBQVIsQ0FITCxDQUFBOztBQUFBLEVBSUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBSkwsQ0FBQTs7QUFBQSxFQUtBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUxMLENBQUE7O0FBQUEsRUFPQSxPQUFBLENBQVEsd0JBQVIsQ0FQQSxDQUFBOztBQUFBLEVBV0EsV0FBQSxHQUFjLEVBWGQsQ0FBQTs7QUFBQSxFQVlBLEtBQUEsR0FBUSxFQVpSLENBQUE7O0FBQUEsRUFjQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxXQUFBLEVBQWEsSUFBYjtBQUFBLElBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBS1IsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGVBQTNCLEVBQTRDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDMUMsY0FBQSxnQkFBQTtBQUFBLFVBQUEsSUFBQSxHQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBYixDQUFBLENBQVAsQ0FBQTtBQUFBLFVBQ0EsVUFBQSxHQUFhLEVBQUEsR0FBRSxJQUFGLEdBQVEsY0FEckIsQ0FBQTtpQkFHQSxFQUFFLENBQUMsUUFBSCxDQUFZLFVBQVosRUFBd0IsU0FBQyxHQUFELEVBQU0sSUFBTixHQUFBO0FBQ3RCLGdCQUFBLEdBQUE7QUFBQSxZ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
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee