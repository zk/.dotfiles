(function() {
  var BC, ClojureView, NC, URL, connections, fs, views, _;

  ClojureView = require('./clojure-view');

  URL = require('url');

  _ = require('underscore-plus');

  NC = require('nrepl-client');

  BC = require('bencode');

  fs = require('fs-plus');

  require('./cljsout/goog/base.js');

  require('./cljsout/goog/deps.js');

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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1EQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUZKLENBQUE7O0FBQUEsRUFHQSxFQUFBLEdBQUssT0FBQSxDQUFRLGNBQVIsQ0FITCxDQUFBOztBQUFBLEVBSUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBSkwsQ0FBQTs7QUFBQSxFQUtBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUxMLENBQUE7O0FBQUEsRUFPQSxPQUFBLENBQVEsd0JBQVIsQ0FQQSxDQUFBOztBQUFBLEVBUUEsT0FBQSxDQUFRLHdCQUFSLENBUkEsQ0FBQTs7QUFBQSxFQVdBLFdBQUEsR0FBYyxFQVhkLENBQUE7O0FBQUEsRUFZQSxLQUFBLEdBQVEsRUFaUixDQUFBOztBQUFBLEVBY0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsV0FBQSxFQUFhLElBQWI7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUtSLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixlQUEzQixFQUE0QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQzFDLGNBQUEsZ0JBQUE7QUFBQSxVQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWIsQ0FBQSxDQUFQLENBQUE7QUFBQSxVQUNBLFVBQUEsR0FBYSxFQUFBLEdBQUUsSUFBRixHQUFRLGNBRHJCLENBQUE7aUJBR0EsRUFBRSxDQUFDLFFBQUgsQ0FBWSxVQUFaLEVBQXdCLFNBQUMsR0FBRCxF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
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee