(function() {
  var BC, ClojureView, NC, URL, connections, fs, views, _;

  ClojureView = require('./clojure-view');

  URL = require('url');

  _ = require('underscore-plus');

  NC = require('nrepl-client');

  BC = require('bencode');

  fs = require('fs-plus');

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
                var _ref1;
                return view.output((_ref1 = BC.decode(data)) != null ? _ref1.out.toString() : void 0);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1EQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUZKLENBQUE7O0FBQUEsRUFHQSxFQUFBLEdBQUssT0FBQSxDQUFRLGNBQVIsQ0FITCxDQUFBOztBQUFBLEVBSUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBSkwsQ0FBQTs7QUFBQSxFQUtBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUxMLENBQUE7O0FBQUEsRUFPQSxXQUFBLEdBQWMsRUFQZCxDQUFBOztBQUFBLEVBUUEsS0FBQSxHQUFRLEVBUlIsQ0FBQTs7QUFBQSxFQVVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFLUixNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsZUFBM0IsRUFBNEMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUMxQyxjQUFBLGdCQUFBO0FBQUEsVUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLENBQUEsQ0FBUCxDQUFBO0FBQUEsVUFDQSxVQUFBLEdBQWEsRUFBQSxHQUFFLElBQUYsR0FBUSxjQURyQixDQUFBO2lCQUdBLEVBQUUsQ0FBQyxRQUFILENBQVksVUFBWixFQUF3QixTQUFDLEdBQUQsRUFBTSxJQUFOLEdBQUE7QUFDdEIsZ0JBQUEsR0FBQTtBQUFBLFlBQUEsSUFBRyxHQUFIO3FCQUNFLE9BQU8sQ0FBQyxHQUFSLENB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
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee