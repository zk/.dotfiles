(function() {
  var BufferPatch, MarkerPatch, Serializable, Transaction, find,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  find = require('underscore-plus').find;

  Serializable = require('serializable');

  BufferPatch = require('./buffer-patch');

  MarkerPatch = require('./marker-patch');

  module.exports = Transaction = (function(_super) {
    __extends(Transaction, _super);

    Transaction.registerDeserializers(BufferPatch, MarkerPatch);

    function Transaction(patches) {
      this.patches = patches != null ? patches : [];
    }

    Transaction.prototype.serializeParams = function() {
      return {
        patches: this.patches.map(function(patch) {
          return patch.serialize();
        })
      };
    };

    Transaction.prototype.deserializeParams = function(params) {
      params.patches = params.patches.map((function(_this) {
        return function(patchState) {
          return _this.constructor.deserialize(patchState);
        };
      })(this));
      return params;
    };

    Transaction.prototype.push = function(patch) {
      return this.patches.push(patch);
    };

    Transaction.prototype.invert = function(buffer) {
      return new this.constructor(this.patches.map(function(patch) {
        return patch.invert(buffer);
      }).reverse());
    };

    Transaction.prototype.applyTo = function(buffer) {
      var patch, _i, _len, _ref, _results;
      _ref = this.patches;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        patch = _ref[_i];
        _results.push(patch.applyTo(buffer));
      }
      return _results;
    };

    Transaction.prototype.hasBufferPatches = function() {
      return find(this.patches, function(patch) {
        return patch instanceof BufferPatch;
      });
    };

    return Transaction;

  })(Serializable);

}).call(this);
