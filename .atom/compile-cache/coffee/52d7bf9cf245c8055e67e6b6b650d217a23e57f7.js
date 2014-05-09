(function() {
  var $, $$, AtomReporter, SpecResultView, SuiteResultView, View, convertStackTrace, formatStackTrace, path, sourceMaps, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  path = require('path');

  _ = require('underscore-plus');

  convertStackTrace = require('coffeestack').convertStackTrace;

  _ref = require('../src/space-pen-extensions'), View = _ref.View, $ = _ref.$, $$ = _ref.$$;

  sourceMaps = {};

  formatStackTrace = function(spec, message, stackTrace) {
    var convertedLines, errorMatch, firstJasmineLinePattern, index, jasminePattern, line, lines, prefixMatch, _i, _j, _len, _len1, _ref1, _ref2, _ref3;
    if (message == null) {
      message = '';
    }
    if (!stackTrace) {
      return stackTrace;
    }
    jasminePattern = /^\s*at\s+.*\(?.*\/jasmine(-[^\/]*)?\.js:\d+:\d+\)?\s*$/;
    firstJasmineLinePattern = /^\s*at \/.*\/jasmine(-[^\/]*)?\.js:\d+:\d+\)?\s*$/;
    convertedLines = [];
    _ref1 = stackTrace.split('\n');
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      line = _ref1[_i];
      if (!jasminePattern.test(line)) {
        convertedLines.push(line);
      }
      if (firstJasmineLinePattern.test(line)) {
        break;
      }
    }
    stackTrace = convertStackTrace(convertedLines.join('\n'), sourceMaps);
    lines = stackTrace.split('\n');
    errorMatch = (_ref2 = lines[0]) != null ? _ref2.match(/^Error: (.*)/) : void 0;
    if (message.trim() === (errorMatch != null ? (_ref3 = errorMatch[1]) != null ? _ref3.trim() : void 0 : void 0)) {
      lines.shift();
    }
    for (index = _j = 0, _len1 = lines.length; _j < _len1; index = ++_j) {
      line = lines[index];
      prefixMatch = line.match(/at \[object Object\]\.<anonymous> \(([^\)]+)\)/);
      if (prefixMatch) {
        line = "at " + prefixMatch[1];
      }
      lines[index] = line.replace("at " + spec.specDirectory + path.sep, 'at ');
    }
    lines = lines.map(function(line) {
      return line.trim();
    });
    return lines.join('\n').trim();
  };

  module.exports = AtomReporter = (function(_super) {
    __extends(AtomReporter, _super);

    function AtomReporter() {
      return AtomReporter.__super__.constructor.apply(this, arguments);
    }

    AtomReporter.content = function() {
      return this.div({
        "class": 'spec-reporter'
      }, (function(_this) {
        return function() {
          _this.div({
            outlet: "suites"
          });
          _this.div({
            outlet: 'coreArea',
            "class": 'symbol-area'
          }, function() {
            _this.div({
              outlet: 'coreHeader',
              "class": 'symbol-header'
            });
            return _this.ul({
              outlet: 'coreSummary',
              "class": 'symbol-summary list-unstyled'
            });
          });
          _this.div({
            outlet: 'bundledArea',
            "class": 'symbol-area'
          }, function() {
            _this.div({
              outlet: 'bundledHeader',
              "class": 'symbol-header'
            });
            return _this.ul({
              outlet: 'bundledSummary',
              "class": 'symbol-summary list-unstyled'
            });
          });
          _this.div({
            outlet: 'userArea',
            "class": 'symbol-area'
          }, function() {
            _this.div({
              outlet: 'userHeader',
              "class": 'symbol-header'
            });
            return _this.ul({
              outlet: 'userSummary',
              "class": 'symbol-summary list-unstyled'
            });
          });
          _this.div({
            outlet: "status",
            "class": 'status alert alert-info'
          }, function() {
            _this.div({
              outlet: "time",
              "class": 'time'
            });
            _this.div({
              outlet: "specCount",
              "class": 'spec-count'
            });
            return _this.div({
              outlet: "message",
              "class": 'message'
            });
          });
          return _this.div({
            outlet: "results",
            "class": 'results'
          });
        };
      })(this));
    };

    AtomReporter.prototype.startedAt = null;

    AtomReporter.prototype.runningSpecCount = 0;

    AtomReporter.prototype.completeSpecCount = 0;

    AtomReporter.prototype.passedCount = 0;

    AtomReporter.prototype.failedCount = 0;

    AtomReporter.prototype.skippedCount = 0;

    AtomReporter.prototype.totalSpecCount = 0;

    AtomReporter.timeoutId = 0;

    AtomReporter.prototype.reportRunnerStarting = function(runner) {
      var specs;
      this.handleEvents();
      this.startedAt = Date.now();
      specs = runner.specs();
      this.totalSpecCount = specs.length;
      this.addSpecs(specs);
      return $(document.body).append(this);
    };

    AtomReporter.prototype.reportRunnerResults = function(runner) {
      this.updateSpecCounts();
      if (this.failedCount === 0) {
        this.status.addClass('alert-success').removeClass('alert-info');
      }
      if (this.failedCount === 1) {
        return this.message.text("" + this.failedCount + " failure");
      } else {
        return this.message.text("" + this.failedCount + " failures");
      }
    };

    AtomReporter.prototype.reportSuiteResults = function(suite) {};

    AtomReporter.prototype.reportSpecResults = function(spec) {
      this.completeSpecCount++;
      spec.endedAt = Date.now();
      this.specComplete(spec);
      return this.updateStatusView(spec);
    };

    AtomReporter.prototype.reportSpecStarting = function(spec) {
      return this.specStarted(spec);
    };

    AtomReporter.prototype.handleEvents = function() {
      return $(document).on("click", ".spec-toggle", (function(_this) {
        return function(_arg) {
          var currentTarget, element, specFailures;
          currentTarget = _arg.currentTarget;
          element = $(currentTarget);
          specFailures = element.parent().find('.spec-failures');
          specFailures.toggle();
          element.toggleClass('folded');
          return false;
        };
      })(this));
    };

    AtomReporter.prototype.updateSpecCounts = function() {
      var specCount;
      if (this.skippedCount) {
        specCount = "" + (this.completeSpecCount - this.skippedCount) + "/" + (this.totalSpecCount - this.skippedCount) + " (" + this.skippedCount + " skipped)";
      } else {
        specCount = "" + this.completeSpecCount + "/" + this.totalSpecCount;
      }
      return this.specCount[0].textContent = specCount;
    };

    AtomReporter.prototype.updateStatusView = function(spec) {
      var rootSuite, time;
      if (this.failedCount > 0) {
        this.status.addClass('alert-danger').removeClass('alert-info');
      }
      this.updateSpecCounts();
      rootSuite = spec.suite;
      while (rootSuite.parentSuite) {
        rootSuite = rootSuite.parentSuite;
      }
      this.message.text(rootSuite.description);
      time = "" + (Math.round((spec.endedAt - this.startedAt) / 10));
      if (time.length < 3) {
        time = "0" + time;
      }
      return this.time[0].textContent = "" + time.slice(0, -2) + "." + time.slice(-2) + "s";
    };

    AtomReporter.prototype.addSpecs = function(specs) {
      var bundledPackageSpecs, coreSpecs, packageFolderName, packageName, spec, specDirectory, symbol, userPackageSpecs, _i, _len;
      coreSpecs = 0;
      bundledPackageSpecs = 0;
      userPackageSpecs = 0;
      for (_i = 0, _len = specs.length; _i < _len; _i++) {
        spec = specs[_i];
        symbol = $$(function() {
          return this.li({
            id: "spec-summary-" + spec.id,
            "class": "spec-summary pending"
          });
        });
        switch (spec.specType) {
          case 'core':
            coreSpecs++;
            this.coreSummary.append(symbol);
            break;
          case 'bundled':
            bundledPackageSpecs++;
            this.bundledSummary.append(symbol);
            break;
          case 'user':
            userPackageSpecs++;
            this.userSummary.append(symbol);
        }
      }
      if (coreSpecs > 0) {
        this.coreHeader.text("Core Specs (" + coreSpecs + ")");
      } else {
        this.coreArea.hide();
      }
      if (bundledPackageSpecs > 0) {
        this.bundledHeader.text("Bundled Package Specs (" + bundledPackageSpecs + ")");
      } else {
        this.bundledArea.hide();
      }
      if (userPackageSpecs > 0) {
        if (coreSpecs === 0 && bundledPackageSpecs === 0) {
          specDirectory = specs[0].specDirectory;
          packageFolderName = path.basename(path.dirname(specDirectory));
          packageName = _.undasherize(_.uncamelcase(packageFolderName));
          return this.userHeader.text("" + packageName + " Specs");
        } else {
          return this.userHeader.text("User Package Specs (" + userPackageSpecs + ")");
        }
      } else {
        return this.userArea.hide();
      }
    };

    AtomReporter.prototype.specStarted = function(spec) {
      return this.runningSpecCount++;
    };

    AtomReporter.prototype.specComplete = function(spec) {
      var results, specSummaryElement, specView;
      specSummaryElement = $("#spec-summary-" + spec.id);
      specSummaryElement.removeClass('pending');
      specSummaryElement.setTooltip({
        title: spec.getFullName(),
        container: '.spec-reporter'
      });
      results = spec.results();
      if (results.skipped) {
        specSummaryElement.addClass("skipped");
        return this.skippedCount++;
      } else if (results.passed()) {
        specSummaryElement.addClass("passed");
        return this.passedCount++;
      } else {
        specSummaryElement.addClass("failed");
        specView = new SpecResultView(spec);
        specView.attach();
        return this.failedCount++;
      }
    };

    return AtomReporter;

  })(View);

  SuiteResultView = (function(_super) {
    __extends(SuiteResultView, _super);

    function SuiteResultView() {
      return SuiteResultView.__super__.constructor.apply(this, arguments);
    }

    SuiteResultView.content = function() {
      return this.div({
        "class": 'suite'
      }, (function(_this) {
        return function() {
          return _this.div({
            outlet: 'description',
            "class": 'description'
          });
        };
      })(this));
    };

    SuiteResultView.prototype.initialize = function(suite) {
      this.suite = suite;
      this.attr('id', "suite-view-" + this.suite.id);
      return this.description.text(this.suite.description);
    };

    SuiteResultView.prototype.attach = function() {
      return (this.parentSuiteView() || $('.results')).append(this);
    };

    SuiteResultView.prototype.parentSuiteView = function() {
      var suiteView;
      if (!this.suite.parentSuite) {
        return;
      }
      if (!(suiteView = $("#suite-view-" + this.suite.parentSuite.id).view())) {
        suiteView = new SuiteResultView(this.suite.parentSuite);
        suiteView.attach();
      }
      return suiteView;
    };

    return SuiteResultView;

  })(View);

  SpecResultView = (function(_super) {
    __extends(SpecResultView, _super);

    function SpecResultView() {
      return SpecResultView.__super__.constructor.apply(this, arguments);
    }

    SpecResultView.content = function() {
      return this.div({
        "class": 'spec'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'spec-toggle'
          });
          _this.div({
            outlet: 'description',
            "class": 'description'
          });
          return _this.div({
            outlet: 'specFailures',
            "class": 'spec-failures'
          });
        };
      })(this));
    };

    SpecResultView.prototype.initialize = function(spec) {
      var description, result, stackTrace, _i, _len, _ref1, _results;
      this.spec = spec;
      this.addClass("spec-view-" + this.spec.id);
      description = this.spec.description;
      if (description.indexOf('it ') !== 0) {
        description = "it " + description;
      }
      this.description.text(description);
      _ref1 = this.spec.results().getItems();
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        result = _ref1[_i];
        if (!(!result.passed())) {
          continue;
        }
        stackTrace = formatStackTrace(this.spec, result.message, result.trace.stack);
        _results.push(this.specFailures.append($$(function() {
          this.div(result.message, {
            "class": 'result-message fail'
          });
          if (stackTrace) {
            return this.pre(stackTrace, {
              "class": 'stack-trace padded'
            });
          }
        })));
      }
      return _results;
    };

    SpecResultView.prototype.attach = function() {
      return this.parentSuiteView().append(this);
    };

    SpecResultView.prototype.parentSuiteView = function() {
      var suiteView;
      if (!(suiteView = $("#suite-view-" + this.spec.suite.id).view())) {
        suiteView = new SuiteResultView(this.spec.suite);
        suiteView.attach();
      }
      return suiteView;
    };

    return SpecResultView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBIQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQURKLENBQUE7O0FBQUEsRUFFQyxvQkFBcUIsT0FBQSxDQUFRLGFBQVIsRUFBckIsaUJBRkQsQ0FBQTs7QUFBQSxFQUdBLE9BQWdCLE9BQUEsQ0FBUSw2QkFBUixDQUFoQixFQUFDLFlBQUEsSUFBRCxFQUFPLFNBQUEsQ0FBUCxFQUFVLFVBQUEsRUFIVixDQUFBOztBQUFBLEVBS0EsVUFBQSxHQUFhLEVBTGIsQ0FBQTs7QUFBQSxFQU1BLGdCQUFBLEdBQW1CLFNBQUMsSUFBRCxFQUFPLE9BQVAsRUFBbUIsVUFBbkIsR0FBQTtBQUNqQixRQUFBLDhJQUFBOztNQUR3QixVQUFRO0tBQ2hDO0FBQUEsSUFBQSxJQUFBLENBQUEsVUFBQTtBQUFBLGFBQU8sVUFBUCxDQUFBO0tBQUE7QUFBQSxJQUVBLGNBQUEsR0FBaUIsd0RBRmpCLENBQUE7QUFBQSxJQUdBLHVCQUFBLEdBQTBCLG1EQUgxQixDQUFBO0FBQUEsSUFJQSxjQUFBLEdBQWlCLEVBSmpCLENBQUE7QUFLQTtBQUFBLFNBQUEsNENBQUE7dUJBQUE7QUFDRSxNQUFBLElBQUEsQ0FBQSxjQUErQyxDQUFDLElBQWYsQ0FBb0IsSUFBcEIsQ0FBakM7QUFBQSxRQUFBLGNBQWMsQ0FBQyxJQUFmLENBQW9CLElBQXBCLENBQUEsQ0FBQTtPQUFBO0FBQ0EsTUFBQSxJQUFTLHVCQUF1QixDQUFDLElBQXhCLENBQTZCLElBQTdCLENBQVQ7QUFBQSxjQUFBO09BRkY7QUFBQSxLQUxBO0FBQUEsSUFTQSxVQUFBLEdBQWEsaUJBQUEsQ0FBa0IsY0FBYyxDQUFDLElB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
//# sourceURL=/Applications/Atom.app/Contents/Resources/app/spec/atom-reporter.coffee