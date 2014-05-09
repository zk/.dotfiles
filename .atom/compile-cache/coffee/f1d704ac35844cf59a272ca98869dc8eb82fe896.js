(function() {
  var $, Config, Editor, EditorView, KeymapManager, Point, Project, TokenizedBuffer, Workspace, WorkspaceView, addCustomMatchers, clipboard, emitObject, ensureNoPathSubscriptions, fixturePackagesPath, fs, keyBindingsToRestore, path, pathwatcher, resourcePath, specDirectory, specPackageName, specPackagePath, specProjectPath, _, _ref, _ref1, _ref2,
    __slice = [].slice;

  require('../src/window');

  atom.initialize();

  atom.restoreWindowDimensions();

  require('../vendor/jasmine-jquery');

  path = require('path');

  _ = require('underscore-plus');

  fs = require('fs-plus');

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

  _ref1 = atom.getLoadSettings(), specDirectory = _ref1.specDirectory, resourcePath = _ref1.resourcePath;

  if (specDirectory) {
    specPackagePath = path.resolve(specDirectory, '..');
    try {
      specPackageName = (_ref2 = JSON.parse(fs.readFileSync(path.join(specPackagePath, 'package.json')))) != null ? _ref2.name : void 0;
    } catch (_error) {}
    specProjectPath = path.join(specDirectory, 'fixtures');
  }

  beforeEach(function() {
    var clipboardContent, config, projectPath, resolvePackagePath, serializedWindowState, spy;
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
    return this.on('keydown', (function(_this) {
      return function(e) {
        return atom.keymaps.handleKeyEvent(e);
      };
    })(this));
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFWQUFBO0lBQUEsa0JBQUE7O0FBQUEsRUFBQSxPQUFBLENBQVEsZUFBUixDQUFBLENBQUE7O0FBQUEsRUFDQSxJQUFJLENBQUMsVUFBTCxDQUFBLENBREEsQ0FBQTs7QUFBQSxFQUVBLElBQUksQ0FBQyx1QkFBTCxDQUFBLENBRkEsQ0FBQTs7QUFBQSxFQUlBLE9BQUEsQ0FBUSwwQkFBUixDQUpBLENBQUE7O0FBQUEsRUFLQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FMUCxDQUFBOztBQUFBLEVBTUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQU5KLENBQUE7O0FBQUEsRUFPQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FQTCxDQUFBOztBQUFBLEVBUUEsYUFBQSxHQUFnQixPQUFBLENBQVEsMEJBQVIsQ0FSaEIsQ0FBQTs7QUFBQSxFQVNBLE9BQWdDLE9BQUEsQ0FBUSxNQUFSLENBQWhDLEVBQUMsU0FBQSxDQUFELEVBQUkscUJBQUEsYUFBSixFQUFtQixpQkFBQSxTQVRuQixDQUFBOztBQUFBLEVBVUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxlQUFSLENBVlQsQ0FBQTs7QUFBQSxFQVdDLFFBQVMsT0FBQSxDQUFRLGFBQVIsRUFBVCxLQVhELENBQUE7O0FBQUEsRUFZQSxPQUFBLEdBQVUsT0FBQSxDQUFRLGdCQUFSLENBWlYsQ0FBQTs7QUFBQSxFQWFBLE1BQUEsR0FBUyxPQUFBLENBQVEsZUFBUixDQWJULENBQUE7O0FBQUEsRUFjQSxVQUFBLEdBQWEsT0FBQSxDQUFRLG9CQUFSLENBZGIsQ0FBQTs7QUFBQSxFQWVBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHlCQUFSLENBZmxCLENBQUE7O0FBQUEsRUFnQkEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxhQUFSLENBaEJk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
//# sourceURL=/Applications/Atom.app/Contents/Resources/app/spec/spec-helper.coffee