(function() {
  var Deprecation, Emitter, grim, _;

  _ = require('underscore-plus');

  Emitter = require('emissary').Emitter;

  Deprecation = require('./deprecation');

  global.__grimDeprecations__ = [];

  grim = {
    getDeprecations: function() {
      return _.clone(global.__grimDeprecations__);
    },
    clearDeprecations: function() {
      return global.__grimDeprecations__ = [];
    },
    logDeprecations: function() {
      var deprecation, deprecations, _i, _len, _results;
      deprecations = grim.getDeprecations();
      deprecations.sort(function(a, b) {
        return b.getCallCount() - a.getCallCount();
      });
      console.warn("\nCalls to deprecated functions\n-----------------------------");
      _results = [];
      for (_i = 0, _len = deprecations.length; _i < _len; _i++) {
        deprecation = deprecations[_i];
        _results.push(console.warn("(" + (deprecation.getCallCount()) + ") " + (deprecation.getOriginName()) + " : " + (deprecation.getMessage()), deprecation));
      }
      return _results;
    },
    deprecate: function(message) {
      var deprecation, deprecations, methodName, stack;
      stack = Deprecation.generateStack().slice(1);
      methodName = Deprecation.getFunctionNameFromCallsite(stack[0]);
      deprecations = global.__grimDeprecations__;
      if (!(deprecation = _.find(deprecations, function(d) {
        return d.getOriginName() === methodName;
      }))) {
        deprecation = new Deprecation(message);
        global.__grimDeprecations__.push(deprecation);
      }
      deprecation.addStack(stack);
      return grim.emit("updated");
    }
  };

  Emitter.extend(grim);

  module.exports = grim;

}).call(this);
