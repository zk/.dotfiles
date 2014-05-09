(function() {
  var $, Config, Editor, EditorView, Grim, KeymapManager, Point, Project, TokenizedBuffer, Workspace, WorkspaceView, addCustomMatchers, clipboard, emitObject, ensureNoDeprecatedFunctionsCalled, ensureNoPathSubscriptions, fixturePackagesPath, fs, isCoreSpec, keyBindingsToRestore, path, pathwatcher, resourcePath, specDirectory, specPackageName, specPackagePath, specProjectPath, _, _ref, _ref1, _ref2,
    __slice = [].slice;

  require('../src/window');

  atom.initialize();

  atom.restoreWindowDimensions();

  require('../vendor/jasmine-jquery');

  path = require('path');

  _ = require('underscore-plus');

  fs = require('fs-plus');

  Grim = require('grim');

  KeymapManager = require('../src/keymap-extensions');

  _ref = require('atom'), $ = _ref.$, WorkspaceView = _ref.WorkspaceView, Workspace = _ref.Workspace;

  Config = require('../src/config');

  Point = require('text-buffer').Point;

  Project = require('../src/project');

  Editor = require('../src/editor');

  EditorView = require('../src/editor-view');

  TokenizedBuffer = require('../src/tokenized-buffer');

  pathwatcher = require('pathwatcher');

  clipboard = require('clipboard');

  atom.themes.loadBaseStylesheets();

  atom.themes.requireStylesheet('../static/jasmine');

  fixturePackagesPath = path.resolve(__dirname, './fixtures/packages');

  atom.packages.packageDirPaths.unshift(fixturePackagesPath);

  atom.keymaps.loadBundledKeymaps();

  keyBindingsToRestore = atom.keymaps.getKeyBindings();

  $(window).on('core:close', function() {
    return window.close();
  });

  $(window).on('unload', function() {
    atom.storeWindowDimensions();
    return atom.saveSync();
  });

  $('html,body').css('overflow', 'auto');

  jasmine.getEnv().addEqualityTester(_.isEqual);

  jasmine.getEnv().defaultTimeoutInterval = 5000;

  specPackageName = null;

  specPackagePath = null;

  specProjectPath = null;

  isCoreSpec = false;

  _ref1 = atom.getLoadSettings(), specDirectory = _ref1.specDirectory, resourcePath = _ref1.resourcePath;

  if (specDirectory) {
    specPackagePath = path.resolve(specDirectory, '..');
    try {
      specPackageName = (_ref2 = JSON.parse(fs.readFileSync(path.join(specPackagePath, 'package.json')))) != null ? _ref2.name : void 0;
    } catch (_error) {}
    specProjectPath = path.join(specDirectory, 'fixtures');
  }

  isCoreSpec = specDirectory === fs.realpathSync(__dirname);

  beforeEach(function() {
    var clipboardContent, config, projectPath, resolvePackagePath, serializedWindowState, spy;
    if (isCoreSpec) {
      Grim.clearDeprecations();
    }
    $.fx.off = true;
    projectPath = specProjectPath != null ? specProjectPath : path.join(this.specDirectory, 'fixtures');
    atom.project = new Project({
      path: projectPath
    });
    atom.workspace = new Workspace();
    atom.keymaps.keyBindings = _.clone(keyBindingsToRestore);
    window.resetTimeouts();
    atom.packages.packageStates = {};
    serializedWindowState = null;
    spyOn(atom, 'saveSync');
    atom.syntax.clearGrammarOverrides();
    atom.syntax.clearProperties();
    spy = spyOn(atom.packages, 'resolvePackagePath').andCallFake(function(packageName) {
      if (specPackageName && packageName === specPackageName) {
        return resolvePackagePath(specPackagePath);
      } else {
        return resolvePackagePath(packageName);
      }
    });
    resolvePackagePath = _.bind(spy.originalValue, atom.packages);
    spyOn(atom.menu, 'sendToBrowserProcess');
    config = new Config({
      resourcePath: resourcePath,
      configDirPath: atom.getConfigDirPath()
    });
    spyOn(config, 'load');
    spyOn(config, 'save');
    config.setDefaults('core', WorkspaceView.configDefaults);
    config.setDefaults('editor', EditorView.configDefaults);
    config.set("core.destroyEmptyPanes", false);
    config.set("editor.fontFamily", "Courier");
    config.set("editor.fontSize", 16);
    config.set("editor.autoIndent", false);
    config.set("core.disabledPackages", ["package-that-throws-an-exception", "package-with-broken-package-json", "package-with-broken-keymap"]);
    config.set("core.useReactEditor", false);
    config.save.reset();
    atom.config = config;
    spyOn(EditorView.prototype, 'requestDisplayUpdate').andCallFake(function() {
      return this.updateDisplay();
    });
    spyOn(WorkspaceView.prototype, 'setTitle').andCallFake(function(title) {
      this.title = title;
    });
    spyOn(window, "setTimeout").andCallFake(window.fakeSetTimeout);
    spyOn(window, "clearTimeout").andCallFake(window.fakeClearTimeout);
    spyOn(pathwatcher.File.prototype, "detectResurrectionAfterDelay").andCallFake(function() {
      return this.detectResurrection();
    });
    spyOn(Editor.prototype, "shouldPromptToSave").andReturn(false);
    TokenizedBuffer.prototype.chunkSize = Infinity;
    spyOn(TokenizedBuffer.prototype, "tokenizeInBackground").andCallFake(function() {
      return this.tokenizeNextChunk();
    });
    clipboardContent = 'initial clipboard content';
    spyOn(clipboard, 'writeText').andCallFake(function(text) {
      return clipboardContent = text;
    });
    spyOn(clipboard, 'readText').andCallFake(function() {
      return clipboardContent;
    });
    return addCustomMatchers(this);
  });

  afterEach(function() {
    var _ref3, _ref4;
    atom.packages.deactivatePackages();
    atom.menu.template = [];
    if ((_ref3 = atom.workspaceView) != null) {
      if (typeof _ref3.remove === "function") {
        _ref3.remove();
      }
    }
    atom.workspaceView = null;
    delete atom.state.workspace;
    if ((_ref4 = atom.project) != null) {
      _ref4.destroy();
    }
    atom.project = null;
    delete atom.state.packageStates;
    if (!window.debugContent) {
      $('#jasmine-content').empty();
    }
    jasmine.unspy(atom, 'saveSync');
    ensureNoPathSubscriptions();
    atom.syntax.off();
    if (isCoreSpec) {
      ensureNoDeprecatedFunctionsCalled();
    }
    return waits(0);
  });

  ensureNoPathSubscriptions = function() {
    var watchedPaths;
    watchedPaths = pathwatcher.getWatchedPaths();
    pathwatcher.closeAllWatchers();
    if (watchedPaths.length > 0) {
      throw new Error("Leaking subscriptions for paths: " + watchedPaths.join(", "));
    }
  };

  ensureNoDeprecatedFunctionsCalled = function() {
    var deprecations, error, originalPrepareStackTrace;
    deprecations = Grim.getDeprecations();
    if (deprecations.length > 0) {
      originalPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = function(error, stack) {
        var deprecation, functionName, location, output, _i, _j, _k, _len, _len1, _len2, _ref3, _ref4;
        output = [];
        for (_i = 0, _len = deprecations.length; _i < _len; _i++) {
          deprecation = deprecations[_i];
          output.push("" + deprecation.originName + " is deprecated. " + deprecation.message);
          output.push(_.multiplyString("-", output[output.length - 1].length));
          _ref3 = deprecation.getStacks();
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            stack = _ref3[_j];
            for (_k = 0, _len2 = stack.length; _k < _len2; _k++) {
              _ref4 = stack[_k], functionName = _ref4.functionName, location = _ref4.location;
              output.push("" + functionName + " -- " + location);
            }
          }
          output.push("");
        }
        return output.join("\n");
      };
      error = new Error("Deprecated function(s) " + (deprecations.map(function(_arg) {
        var originName;
        originName = _arg.originName;
        return originName;
      }).join(', ')) + ") were called.");
      error.stack;
      Error.prepareStackTrace = originalPrepareStackTrace;
      throw error;
    }
  };

  emitObject = jasmine.StringPrettyPrinter.prototype.emitObject;

  jasmine.StringPrettyPrinter.prototype.emitObject = function(obj) {
    if (obj.inspect) {
      return this.append(obj.inspect());
    } else {
      return emitObject.call(this, obj);
    }
  };

  jasmine.unspy = function(object, methodName) {
    if (!object[methodName].hasOwnProperty('originalValue')) {
      throw new Error("Not a spy");
    }
    return object[methodName] = object[methodName].originalValue;
  };

  addCustomMatchers = function(spec) {
    return spec.addMatchers({
      toBeInstanceOf: function(expected) {
        var notText;
        notText = this.isNot ? " not" : "";
        this.message = (function(_this) {
          return function() {
            return "Expected " + (jasmine.pp(_this.actual)) + " to" + notText + " be instance of " + expected.name + " class";
          };
        })(this);
        return this.actual instanceof expected;
      },
      toHaveLength: function(expected) {
        var notText;
        if (this.actual == null) {
          this.message = (function(_this) {
            return function() {
              return "Expected object " + _this.actual + " has no length method";
            };
          })(this);
          return false;
        } else {
          notText = this.isNot ? " not" : "";
          this.message = (function(_this) {
            return function() {
              return "Expected object with length " + _this.actual.length + " to" + notText + " have length " + expected;
            };
          })(this);
          return this.actual.length === expected;
        }
      },
      toExistOnDisk: function(expected) {
        var notText;
        notText = this.isNot && " not" || "";
        this.message = function() {
          return "Expected path '" + this.actual + "'" + notText + " to exist.";
        };
        return fs.existsSync(this.actual);
      },
      toHaveFocus: function() {
        var element, notText;
        notText = this.isNot && " not" || "";
        if (!document.hasFocus()) {
          console.error("Specs will fail because the Dev Tools have focus. To fix this close the Dev Tools or click the spec runner.");
        }
        this.message = function() {
          return "Expected element '" + this.actual + "' or its descendants" + notText + " to have focus.";
        };
        element = this.actual;
        if (element.jquery) {
          element = element.get(0);
        }
        return element.webkitMatchesSelector(":focus") || element.querySelector(":focus");
      }
    });
  };

  window.keyIdentifierForKey = function(key) {
    var charCode;
    if (key.length > 1) {
      return key;
    } else {
      charCode = key.toUpperCase().charCodeAt(0);
      return "U+00" + charCode.toString(16);
    }
  };

  window.keydownEvent = function(key, properties) {
    var originalEvent, originalEventProperties, _ref3, _ref4;
    if (properties == null) {
      properties = {};
    }
    originalEventProperties = {};
    originalEventProperties.ctrl = properties.ctrlKey;
    originalEventProperties.alt = properties.altKey;
    originalEventProperties.shift = properties.shiftKey;
    originalEventProperties.cmd = properties.metaKey;
    originalEventProperties.target = (_ref3 = (_ref4 = properties.target) != null ? _ref4[0] : void 0) != null ? _ref3 : properties.target;
    originalEventProperties.which = properties.which;
    originalEvent = KeymapManager.keydownEvent(key, originalEventProperties);
    properties = $.extend({
      originalEvent: originalEvent
    }, properties);
    return $.Event("keydown", properties);
  };

  window.mouseEvent = function(type, properties) {
    var editorView, left, point, top, _ref3;
    if (properties.point) {
      point = properties.point, editorView = properties.editorView;
      _ref3 = this.pagePixelPositionForPoint(editorView, point), top = _ref3.top, left = _ref3.left;
      properties.pageX = left + 1;
      properties.pageY = top + 1;
    }
    if (properties.originalEvent == null) {
      properties.originalEvent = {
        detail: 1
      };
    }
    return $.Event(type, properties);
  };

  window.clickEvent = function(properties) {
    if (properties == null) {
      properties = {};
    }
    return window.mouseEvent("click", properties);
  };

  window.mousedownEvent = function(properties) {
    if (properties == null) {
      properties = {};
    }
    return window.mouseEvent('mousedown', properties);
  };

  window.mousemoveEvent = function(properties) {
    if (properties == null) {
      properties = {};
    }
    return window.mouseEvent('mousemove', properties);
  };

  window.waitsForPromise = function() {
    var args, fn, shouldReject, timeout, _ref3;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (args.length > 1) {
      _ref3 = args[0], shouldReject = _ref3.shouldReject, timeout = _ref3.timeout;
    } else {
      shouldReject = false;
    }
    fn = _.last(args);
    return window.waitsFor(timeout, function(moveOn) {
      var promise;
      promise = fn();
      if (shouldReject) {
        promise.fail(moveOn);
        return promise.done(function() {
          jasmine.getEnv().currentSpec.fail("Expected promise to be rejected, but it was resolved");
          return moveOn();
        });
      } else {
        promise.done(moveOn);
        return promise.fail(function(error) {
          jasmine.getEnv().currentSpec.fail("Expected promise to be resolved, but it was rejected with " + (jasmine.pp(error)));
          return moveOn();
        });
      }
    });
  };

  window.resetTimeouts = function() {
    window.now = 0;
    window.timeoutCount = 0;
    return window.timeouts = [];
  };

  window.fakeSetTimeout = function(callback, ms) {
    var id;
    id = ++window.timeoutCount;
    window.timeouts.push([id, window.now + ms, callback]);
    return id;
  };

  window.fakeClearTimeout = function(idToClear) {
    return window.timeouts = window.timeouts.filter(function(_arg) {
      var id;
      id = _arg[0];
      return id !== idToClear;
    });
  };

  window.fakeSetInterval = function(callback, ms) {
    var action;
    action = function() {
      callback();
      return window.fakeSetTimeout(action, ms);
    };
    return window.fakeSetTimeout(action, ms);
  };

  window.fakeClearInterval = function(idToClear) {
    return window.fakeClearTimeout(idToClear);
  };

  window.advanceClock = function(delta) {
    var callback, callbacks, _i, _len, _results;
    if (delta == null) {
      delta = 1;
    }
    window.now += delta;
    callbacks = [];
    window.timeouts = window.timeouts.filter(function(_arg) {
      var callback, id, strikeTime;
      id = _arg[0], strikeTime = _arg[1], callback = _arg[2];
      if (strikeTime <= window.now) {
        callbacks.push(callback);
        return false;
      } else {
        return true;
      }
    });
    _results = [];
    for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
      callback = callbacks[_i];
      _results.push(callback());
    }
    return _results;
  };

  window.pagePixelPositionForPoint = function(editorView, point) {
    var left, top;
    point = Point.fromObject(point);
    top = editorView.renderedLines.offset().top + point.row * editorView.lineHeight;
    left = editorView.renderedLines.offset().left + point.column * editorView.charWidth - editorView.renderedLines.scrollLeft();
    return {
      top: top,
      left: left
    };
  };

  window.tokensText = function(tokens) {
    return _.pluck(tokens, 'value').join('');
  };

  window.setEditorWidthInChars = function(editorView, widthInChars, charWidth) {
    if (charWidth == null) {
      charWidth = editorView.charWidth;
    }
    editorView.width(charWidth * widthInChars + editorView.gutter.outerWidth());
    return $(window).trigger('resize');
  };

  window.setEditorHeightInLines = function(editorView, heightInChars, charHeight) {
    if (charHeight == null) {
      charHeight = editorView.lineHeight;
    }
    editorView.height(charHeight * heightInChars + editorView.renderedLines.position().top);
    return $(window).trigger('resize');
  };

  $.fn.resultOfTrigger = function(type) {
    var event;
    event = $.Event(type);
    this.trigger(event);
    return event.result;
  };

  $.fn.enableKeymap = function() {
    return this.on('keydown', function(e) {
      var originalEvent, _ref3;
      originalEvent = (_ref3 = e.originalEvent) != null ? _ref3 : e;
      if (originalEvent.target == null) {
        Object.defineProperty(originalEvent, 'target', {
          get: function() {
            return e.target;
          }
        });
      }
      atom.keymaps.handleKeyboardEvent(originalEvent);
      return !e.originalEvent.defaultPrevented;
    });
  };

  $.fn.attachToDom = function() {
    return this.appendTo($('#jasmine-content'));
  };

  $.fn.simulateDomAttachment = function() {
    return $('<html>').append(this);
  };

  $.fn.textInput = function(data) {
    return this.each(function() {
      var event;
      event = document.createEvent('TextEvent');
      event.initTextEvent('textInput', true, true, window, data);
      event = $.event.fix(event);
      return $(this).trigger(event);
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBZQUFBO0lBQUEsa0JBQUE7O0FBQUEsRUFBQSxPQUFBLENBQVEsZUFBUixDQUFBLENBQUE7O0FBQUEsRUFDQSxJQUFJLENBQUMsVUFBTCxDQUFBLENBREEsQ0FBQTs7QUFBQSxFQUVBLElBQUksQ0FBQyx1QkFBTCxDQUFBLENBRkEsQ0FBQTs7QUFBQSxFQUlBLE9BQUEsQ0FBUSwwQkFBUixDQUpBLENBQUE7O0FBQUEsRUFLQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FMUCxDQUFBOztBQUFBLEVBTUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQU5KLENBQUE7O0FBQUEsRUFPQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FQTCxDQUFBOztBQUFBLEVBUUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBUlAsQ0FBQTs7QUFBQSxFQVNBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLDBCQUFSLENBVGhCLENBQUE7O0FBQUEsRUFVQSxPQUFnQyxPQUFBLENBQVEsTUFBUixDQUFoQyxFQUFDLFNBQUEsQ0FBRCxFQUFJLHFCQUFBLGFBQUosRUFBbUIsaUJBQUEsU0FWbkIsQ0FBQTs7QUFBQSxFQVdBLE1BQUEsR0FBUyxPQUFBLENBQVEsZUFBUixDQVhULENBQUE7O0FBQUEsRUFZQyxRQUFTLE9BQUEsQ0FBUSxhQUFSLEVBQVQsS0FaRCxDQUFBOztBQUFBLEVBYUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxnQkFBUixDQWJWLENBQUE7O0FBQUEsRUFjQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGVBQVIsQ0FkVCxDQUFBOztBQUFBLEVBZUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxvQkFBUixDQWZiLENBQUE7O0FBQUEsRUFnQkEsZUFBQSxHQUFrQixPQUFBLENBQVEseUJBQVIsQ0FoQmxC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
//# sourceURL=/Applications/Atom.app/Contents/Resources/app/spec/spec-helper.coffee