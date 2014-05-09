(function() {
  var BC, ClojureView, NC, URL, connections, views, _;

  ClojureView = require('./clojure-view');

  URL = require('url');

  _ = require('underscore-plus');

  NC = require('nrepl-client');

  BC = require('bencode');

  connections = {};

  views = {};

  module.exports = {
    clojureView: null,
    activate: function(state) {
      var uri;
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
      atom.workspace.registerOpener((function(_this) {
        return function(uri) {
          var conn, expr, host, pathname, port, protocol, view, _ref;
          _ref = URL.parse(uri), protocol = _ref.protocol, host = _ref.host, port = _ref.port, pathname = _ref.pathname;
          if (protocol !== 'nrepl:') {
            return;
          }
          host = host.split(':')[0];
          conn = NC.connect({
            port: port,
            host: host
          });
          expr = '(+ 3 4)';
          conn.once('connect', function() {
            conn.on('data', function(data) {
              return console.log('got data', BC.decode(data));
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
      uri = 'nrepl://127.0.0.1:62144';
      return atom.workspace.open(uri);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtDQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUZKLENBQUE7O0FBQUEsRUFHQSxFQUFBLEdBQUssT0FBQSxDQUFRLGNBQVIsQ0FITCxDQUFBOztBQUFBLEVBSUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBSkwsQ0FBQTs7QUFBQSxFQU1BLFdBQUEsR0FBYyxFQU5kLENBQUE7O0FBQUEsRUFPQSxLQUFBLEdBQVEsRUFQUixDQUFBOztBQUFBLEVBU0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsV0FBQSxFQUFhLElBQWI7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLFVBQUEsR0FBQTtBQUFBLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixzQkFBM0IsRUFBbUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUVqRCxjQUFBLHlCQUFBO0FBQUEsVUFBQSxFQUFBLEdBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFmLENBQUEsQ0FBTCxDQUFBO0FBQUEsVUFDQSxJQUFBLEdBQU8sRUFBRSxDQUFDLFlBQUgsQ0FBQSxDQUFpQixDQUFDLE9BQWxCLENBQUEsQ0FEUCxDQUFBO0FBQUEsVUFHQSxHQUFBLEdBQU0sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxXQUFSLENBQ0osQ0FBQyxJQURHLENBQUEsQ0FFSixDQUFDLEtBRkcsQ0FBQSxDQUdKLENBQUMsS0FIRyxDQUFBLENBSE4sQ0FBQTtBQUFBLFVBUUEsSUFBQSxH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
//# sourceURL=/Users/zk/.atom/packages/clojure/lib/clojure.coffee