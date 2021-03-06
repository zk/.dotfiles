(function() {
  var CSON, Emitter, Grammar, GrammarRegistry, NullGrammar, _;

  _ = require('underscore-plus');

  CSON = require('season');

  Emitter = require('emissary').Emitter;

  Grammar = require('./grammar');

  NullGrammar = require('./null-grammar');

  module.exports = GrammarRegistry = (function() {
    Emitter.includeInto(GrammarRegistry);

    function GrammarRegistry(options) {
      var _ref;
      if (options == null) {
        options = {};
      }
      this.maxTokensPerLine = (_ref = options.maxTokensPerLine) != null ? _ref : Infinity;
      this.grammars = [];
      this.grammarsByScopeName = {};
      this.injectionGrammars = [];
      this.grammarOverridesByPath = {};
      this.nullGrammar = new NullGrammar(this);
      this.addGrammar(this.nullGrammar);
    }

    GrammarRegistry.prototype.getGrammars = function() {
      return _.clone(this.grammars);
    };

    GrammarRegistry.prototype.grammarForScopeName = function(scopeName) {
      return this.grammarsByScopeName[scopeName];
    };

    GrammarRegistry.prototype.removeGrammar = function(grammar) {
      _.remove(this.grammars, grammar);
      delete this.grammarsByScopeName[grammar.scopeName];
      _.remove(this.injectionGrammars, grammar);
      return this.grammarUpdated(grammar.scopeName);
    };

    GrammarRegistry.prototype.removeGrammarForScopeName = function(scopeName) {
      var grammar;
      grammar = this.grammarForScopeName(scopeName);
      if (grammar != null) {
        return this.removeGrammar(grammar);
      }
    };

    GrammarRegistry.prototype.addGrammar = function(grammar) {
      this.grammars.push(grammar);
      this.grammarsByScopeName[grammar.scopeName] = grammar;
      if (grammar.injectionSelector != null) {
        this.injectionGrammars.push(grammar);
      }
      this.grammarUpdated(grammar.scopeName);
      return this.emit('grammar-added', grammar);
    };

    GrammarRegistry.prototype.readGrammarSync = function(grammarPath) {
      var grammar, _ref;
      grammar = (_ref = CSON.readFileSync(grammarPath)) != null ? _ref : {};
      if (typeof grammar.scopeName === 'string' && grammar.scopeName.length > 0) {
        return this.createGrammar(grammarPath, grammar);
      } else {
        throw new Error("Grammar missing required scopeName property: " + grammarPath);
      }
    };

    GrammarRegistry.prototype.readGrammar = function(grammarPath, callback) {
      return CSON.readFile(grammarPath, (function(_this) {
        return function(error, grammar) {
          if (grammar == null) {
            grammar = {};
          }
          if (error != null) {
            return typeof callback === "function" ? callback(error) : void 0;
          } else {
            if (typeof grammar.scopeName === 'string' && grammar.scopeName.length > 0) {
              return typeof callback === "function" ? callback(null, _this.createGrammar(grammarPath, grammar)) : void 0;
            } else {
              return typeof callback === "function" ? callback(new Error("Grammar missing required scopeName property: " + grammarPath)) : void 0;
            }
          }
        };
      })(this));
    };

    GrammarRegistry.prototype.loadGrammarSync = function(grammarPath) {
      var grammar;
      grammar = this.readGrammarSync(grammarPath);
      this.addGrammar(grammar);
      return grammar;
    };

    GrammarRegistry.prototype.loadGrammar = function(grammarPath, callback) {
      return this.readGrammar(grammarPath, (function(_this) {
        return function(error, grammar) {
          if (error != null) {
            return typeof callback === "function" ? callback(error) : void 0;
          } else {
            _this.addGrammar(grammar);
            return typeof callback === "function" ? callback(null, grammar) : void 0;
          }
        };
      })(this));
    };

    GrammarRegistry.prototype.grammarOverrideForPath = function(filePath) {
      return this.grammarOverridesByPath[filePath];
    };

    GrammarRegistry.prototype.setGrammarOverrideForPath = function(filePath, scopeName) {
      if (filePath) {
        return this.grammarOverridesByPath[filePath] = scopeName;
      }
    };

    GrammarRegistry.prototype.clearGrammarOverrideForPath = function(filePath) {
      return delete this.grammarOverridesByPath[filePath];
    };

    GrammarRegistry.prototype.clearGrammarOverrides = function() {
      return this.grammarOverridesByPath = {};
    };

    GrammarRegistry.prototype.selectGrammar = function(filePath, fileContents) {
      return _.max(this.grammars, function(grammar) {
        return grammar.getScore(filePath, fileContents);
      });
    };

    GrammarRegistry.prototype.createToken = function(value, scopes) {
      return {
        value: value,
        scopes: scopes
      };
    };

    GrammarRegistry.prototype.grammarUpdated = function(scopeName) {
      var grammar, _i, _len, _ref, _results;
      _ref = this.grammars;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        grammar = _ref[_i];
        if (grammar.scopeName !== scopeName) {
          if (grammar.grammarUpdated(scopeName)) {
            _results.push(this.emit('grammar-updated', grammar));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    };

    GrammarRegistry.prototype.createGrammar = function(grammarPath, object) {
      var grammar;
      if (object.maxTokensPerLine == null) {
        object.maxTokensPerLine = this.maxTokensPerLine;
      }
      grammar = new Grammar(this, object);
      grammar.path = grammarPath;
      return grammar;
    };

    return GrammarRegistry;

  })();

}).call(this);
