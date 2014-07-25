(function() {
  var NC, ReplView, ScrollView, URL, jQuery, spacepen, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ScrollView = require('atom').ScrollView;

  URL = require('url');

  NC = require('nrepl-client');

  _ = require('underscore-plus');

  spacepen = require('space-pen');

  jQuery = spacepen.jQuery;

  module.exports = ReplView = (function(_super) {
    __extends(ReplView, _super);

    function ReplView() {
      return ReplView.__super__.constructor.apply(this, arguments);
    }

    ReplView.content = function() {
      return this.div({
        "class": 'editor repl-view scroll-view',
        tabindex: -1
      }, (function(_this) {
        return function() {
          return _this.ul({
            outlet: 'list'
          });
        };
      })(this));
    };

    ReplView.prototype.initialize = function(uri) {
      ReplView.__super__.initialize.apply(this, arguments);
      this.uri = uri;
      return this.debouncedScrollToBottom = _.debounce(this.animatedScrollToBottom, 100);
    };

    ReplView.prototype.serialize = function() {
      console.log('serialize');
      return {
        deserializer: 'ReplView',
        version: 1,
        uri: this.uri
      };
    };

    ReplView.prototype.animatedScrollToBottom = function() {
      return this.animate({
        scrollTop: this.prop("scrollHeight")
      }, 150, 'swing');
    };

    ReplView.deserialize = function(data) {
      var rv;
      rv = new ReplView(data.uri);
      atom.clojure.addReplView(data.uri, rv);
      return rv;
    };

    ReplView.prototype.destroy = function() {
      return this.detach();
    };

    ReplView.prototype.getTitle = function() {
      return this.uri;
    };

    ReplView.prototype.getModel = function() {
      return null;
    };

    ReplView.prototype.error = function(err) {
      return console.log('nrepl error', error);
    };

    ReplView.prototype.initSend = function(id, code) {
      var c, subAt;
      subAt = 50;
      c = code.substring(0, subAt - 3);
      if (code.length > subAt) {
        c = c + '...';
      }
      return this.list.append('<li id=""><div class="evald-form"><code>' + c + '</code></div><div class="output" id="' + (id != null ? id : "") + '"></div></li>');
    };

    ReplView.prototype.output = function(_arg) {
      var err, existing, id, idStr, out, status, value;
      id = _arg.id, out = _arg.out, value = _arg.value, status = _arg.status, err = _arg.err;
      if (status && status[0] && status[0] === 'done') {
        return;
      }
      idStr = id ? '#' + id : "";
      existing = id && this.list.find(idStr);
      if (existing && existing.length > 0) {
        existing.append('<span>' + ((out != null ? out.toString() : void 0) || (value != null ? value.toString() : void 0) || (err != null ? err.toString() : void 0)) + '</span>');
        return this.debouncedScrollToBottom();
      } else {
        return this.list.append('<li id="' + (id != null ? id : "") + '">' + (out || value) + '</li>');
      }
    };

    return ReplView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBRE4sQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUixDQUZMLENBQUE7O0FBQUEsRUFHQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBSEosQ0FBQTs7QUFBQSxFQUlBLFFBQUEsR0FBVyxPQUFBLENBQVEsV0FBUixDQUpYLENBQUE7O0FBQUEsRUFNQSxNQUFBLEdBQVMsUUFBUSxDQUFDLE1BTmxCLENBQUE7O0FBQUEsRUFRQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osK0JBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsUUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sOEJBQVA7QUFBQSxRQUF1QyxRQUFBLEVBQVUsQ0FBQSxDQUFqRDtPQUFMLEVBQTBELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3hELEtBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxZQUFBLE1BQUEsRUFBUSxNQUFSO1dBQUosRUFEd0Q7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExRCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLHVCQUlBLFVBQUEsR0FBWSxTQUFDLEdBQUQsR0FBQTtBQUNWLE1BQUEsMENBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxHQUFELEdBQU8sR0FEUCxDQUFBO2FBRUEsSUFBQyxDQUFBLHVCQUFELEdBQTJCLENB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
//# sourceURL=/Users/zk/napplelabs/atom/atom-clojure/lib/repl-view.coffee