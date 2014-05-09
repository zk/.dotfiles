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
            if (err) {
              return console.log("Problem reading " + nrepl_port);
            } else {
              return console.log(data.toString());
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1EQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUZKLENBQUE7O0FBQUEsRUFHQSxFQUFBLEdBQUssT0FBQSxDQUFRLGNBQVIsQ0FITCxDQUFBOztBQUFBLEVBSUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBSkwsQ0FBQTs7QUFBQSxFQUtBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUxMLENBQUE7O0FBQUEsRUFPQSxXQUFBLEdBQWMsRUFQZCxDQUFBOztBQUFBLEVBUUEsS0FBQSxHQUFRLEVBUlIsQ0FBQTs7QUFBQSxFQVVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFiO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFLUixNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsZUFBM0IsRUFBNEMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUMxQyxjQUFBLGdCQUFBO0FBQUEsVUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLENBQUEsQ0FBUCxDQUFBO0FBQUEsVUFDQSxVQUFBLEdBQWEsRUFBQSxHQUFFLElBQUYsR0FBUSxjQURyQixDQUFBO2lCQUdBLEVBQUUsQ0FBQyxRQUFILENBQVksVUFBWixFQUF3QixTQUFDLEdBQUQsRUFBTSxJQUFOLEdBQUE7QUFDdEIsWUFBQSxJQUFHLEdBQUg7cUJBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBYSxrQkFBQSxHQUFpQixV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
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee