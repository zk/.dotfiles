// Generated by CoffeeScript 1.6.3
(function() {
  var C, Config;

  module.exports = C = function(repo, callback) {
    return repo.git("config", {
      list: true
    }, function(err, stdout, stderr) {
      var config;
      config = new Config(repo);
      config.parse(stdout);
      return callback(err, config);
    });
  };

  C.Config = Config = (function() {
    function Config(repo) {
      this.repo = repo;
    }

    Config.prototype.parse = function(text) {
      var key, line, value, _i, _len, _ref, _ref1, _results;
      this.items = {};
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        if (line.length === 0) {
          continue;
        }
        _ref1 = line.split('='), key = _ref1[0], value = _ref1[1];
        _results.push(this.items[key] = value);
      }
      return _results;
    };

    return Config;

  })();

}).call(this);
