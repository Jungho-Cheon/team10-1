self["webpackHotUpdate_N_E"]("main",{

/***/ "./node_modules/next/dist/client/dev/error-overlay/hot-dev-client.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/error-overlay/hot-dev-client.js ***!
  \***************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = connect;

var DevOverlay = _interopRequireWildcard(__webpack_require__(/*! @next/react-dev-overlay/lib/client */ "./node_modules/@next/react-dev-overlay/lib/client.js"));

var _stripAnsi = _interopRequireDefault(__webpack_require__(/*! next/dist/compiled/strip-ansi */ "./node_modules/next/dist/compiled/strip-ansi/index.js"));

var _eventsource = __webpack_require__(/*! ./eventsource */ "./node_modules/next/dist/client/dev/error-overlay/eventsource.js");

var _formatWebpackMessages = _interopRequireDefault(__webpack_require__(/*! ./format-webpack-messages */ "./node_modules/next/dist/client/dev/error-overlay/format-webpack-messages.js"));
/**
* MIT License
*
* Copyright (c) 2013-present, Facebook, Inc.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
// This file is a modified version of the Create React App HMR dev client that
// can be found here:
// https://github.com/facebook/create-react-app/blob/v3.4.1/packages/react-dev-utils/webpackHotDevClient.js
// This alternative WebpackDevServer combines the functionality of:
// https://github.com/webpack/webpack-dev-server/blob/webpack-1/client/index.js
// https://github.com/webpack/webpack/blob/webpack-1/hot/dev-server.js
// It only supports their simplest configuration (hot updates on same server).
// It makes some opinionated choices on top, like adding a syntax error overlay
// that looks similar to our console output. The error overlay is inspired by:
// https://github.com/glenjamin/webpack-hot-middleware


var hadRuntimeError = false;
var customHmrEventHandler;

function connect(options) {
  DevOverlay.register();
  (0, _eventsource.getEventSourceWrapper)(options).addMessageListener(function (event) {
    // This is the heartbeat event
    if (event.data === "\uD83D\uDC93") {
      return;
    }

    try {
      processMessage(event);
    } catch (ex) {
      console.warn('Invalid HMR message: ' + event.data + '\n' + ex);
    }
  });
  return {
    subscribeToHmrEvent: function subscribeToHmrEvent(handler) {
      customHmrEventHandler = handler;
    },
    onUnrecoverableError: function onUnrecoverableError() {
      hadRuntimeError = true;
    }
  };
} // Remember some state related to hot module replacement.


var isFirstCompilation = true;
var mostRecentCompilationHash = null;
var hasCompileErrors = false;

function clearOutdatedErrors() {
  // Clean up outdated compile errors, if any.
  if (typeof console !== 'undefined' && typeof console.clear === 'function') {
    if (hasCompileErrors) {
      console.clear();
    }
  }
} // Successful compilation.


function handleSuccess() {
  clearOutdatedErrors();
  var isHotUpdate = !isFirstCompilation;
  isFirstCompilation = false;
  hasCompileErrors = false; // Attempt to apply hot updates or reload.

  if (isHotUpdate) {
    tryApplyUpdates(function onSuccessfulHotUpdate(hasUpdates) {
      // Only dismiss it when we're sure it's a hot update.
      // Otherwise it would flicker right before the reload.
      onFastRefresh(hasUpdates);
    });
  }
} // Compilation with warnings (e.g. ESLint).


function handleWarnings(warnings) {
  clearOutdatedErrors();
  var isHotUpdate = !isFirstCompilation;
  isFirstCompilation = false;
  hasCompileErrors = false;

  function printWarnings() {
    // Print warnings to the console.
    var formatted = (0, _formatWebpackMessages["default"])({
      warnings: warnings,
      errors: []
    });

    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      for (var i = 0; i < formatted.warnings.length; i++) {
        if (i === 5) {
          console.warn('There were more warnings in other files.\n' + 'You can find a complete log in the terminal.');
          break;
        }

        console.warn((0, _stripAnsi["default"])(formatted.warnings[i]));
      }
    }
  }

  printWarnings(); // Attempt to apply hot updates or reload.

  if (isHotUpdate) {
    tryApplyUpdates(function onSuccessfulHotUpdate(hasUpdates) {
      // Only dismiss it when we're sure it's a hot update.
      // Otherwise it would flicker right before the reload.
      onFastRefresh(hasUpdates);
    });
  }
} // Compilation with errors (e.g. syntax error or missing modules).


function handleErrors(errors) {
  clearOutdatedErrors();
  isFirstCompilation = false;
  hasCompileErrors = true; // "Massage" webpack messages.

  var formatted = (0, _formatWebpackMessages["default"])({
    errors: errors,
    warnings: []
  }); // Only show the first error.

  DevOverlay.onBuildError(formatted.errors[0]); // Also log them to the console.

  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    for (var i = 0; i < formatted.errors.length; i++) {
      console.error((0, _stripAnsi["default"])(formatted.errors[i]));
    }
  } // Do not attempt to reload now.
  // We will reload on next success instead.


  if (undefined) {
    if (self.__NEXT_HMR_CB) {
      self.__NEXT_HMR_CB(formatted.errors[0]);

      self.__NEXT_HMR_CB = null;
    }
  }
}

function onFastRefresh(hasUpdates) {
  DevOverlay.onBuildOk();

  if (hasUpdates) {
    DevOverlay.onRefresh();
  }

  console.log('[Fast Refresh] done');
} // There is a newer version of the code available.


function handleAvailableHash(hash) {
  // Update last known compilation hash.
  mostRecentCompilationHash = hash;
} // Handle messages from the server.


function processMessage(e) {
  var obj = JSON.parse(e.data);

  switch (obj.action) {
    case 'building':
      {
        console.log('[Fast Refresh] rebuilding');
        break;
      }

    case 'built':
    case 'sync':
      {
        if (obj.hash) {
          handleAvailableHash(obj.hash);
        }

        var errors = obj.errors,
            warnings = obj.warnings;
        var hasErrors = Boolean(errors && errors.length);

        if (hasErrors) {
          return handleErrors(errors);
        }

        var hasWarnings = Boolean(warnings && warnings.length);

        if (hasWarnings) {
          return handleWarnings(warnings);
        }

        return handleSuccess();
      }

    default:
      {
        if (customHmrEventHandler) {
          customHmrEventHandler(obj);
          break;
        }

        break;
      }
  }
} // Is there a newer version of this code available?


function isUpdateAvailable() {
  /* globals __webpack_hash__ */
  // __webpack_hash__ is the hash of the current compilation.
  // It's a global variable injected by Webpack.
  return mostRecentCompilationHash !== __webpack_require__.h();
} // Webpack disallows updates in other states.


function canApplyUpdates() {
  return module.hot.status() === 'idle';
}

function afterApplyUpdates(fn) {
  if (canApplyUpdates()) {
    fn();
  } else {
    var handler = function handler(status) {
      if (status === 'idle') {
        module.hot.removeStatusHandler(handler);
        fn();
      }
    };

    module.hot.addStatusHandler(handler);
  }
} // Attempt to update code on the fly, fall back to a hard reload.


function tryApplyUpdates(onHotUpdateSuccess) {
  if (false) {}

  if (!isUpdateAvailable() || !canApplyUpdates()) {
    return;
  }

  function handleApplyUpdates(err, updatedModules) {
    if (err || hadRuntimeError || !updatedModules) {
      if (err) {
        console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
      } else if (hadRuntimeError) {
        console.warn('[Fast Refresh] performing full reload because your application had an unrecoverable error');
      }

      window.location.reload();
      return;
    }

    var hasUpdates = Boolean(updatedModules.length);

    if (typeof onHotUpdateSuccess === 'function') {
      // Maybe we want to do something.
      onHotUpdateSuccess(hasUpdates);
    }

    if (isUpdateAvailable()) {
      // While we were updating, there was a new update! Do it again.
      tryApplyUpdates(hasUpdates ? undefined : onHotUpdateSuccess);
    } else {
      if (undefined) {
        afterApplyUpdates(function () {
          if (self.__NEXT_HMR_CB) {
            self.__NEXT_HMR_CB();

            self.__NEXT_HMR_CB = null;
          }
        });
      }
    }
  } // https://webpack.js.org/api/hot-module-replacement/#check


  module.hot.check(
  /* autoApply */
  true).then(function (updatedModules) {
    handleApplyUpdates(null, updatedModules);
  }, function (err) {
    handleApplyUpdates(err, null);
  });
}

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/dev/on-demand-entries-client.js":
/*!***********************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/on-demand-entries-client.js ***!
  \***********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _regeneratorRuntime = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");

var _asyncToGenerator = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = void 0;

var _router = _interopRequireDefault(__webpack_require__(/*! next/router */ "./node_modules/next/router.js"));

var _onDemandEntriesUtils = __webpack_require__(/*! ./on-demand-entries-utils */ "./node_modules/next/dist/client/dev/on-demand-entries-utils.js");

var _default = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var assetPrefix;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            assetPrefix = _ref.assetPrefix;

            _router["default"].ready(function () {
              _router["default"].events.on('routeChangeComplete', _onDemandEntriesUtils.setupPing.bind(void 0, assetPrefix, function () {
                return _router["default"].pathname;
              }));
            });

            (0, _onDemandEntriesUtils.setupPing)(assetPrefix, function () {
              return _router["default"].pathname;
            }, _onDemandEntriesUtils.currentPage); // prevent HMR connection from being closed when running tests

            if (!undefined) {
              document.addEventListener('visibilitychange', function (_event) {
                var state = document.visibilityState;

                if (state === 'visible') {
                  (0, _onDemandEntriesUtils.setupPing)(assetPrefix, function () {
                    return _router["default"].pathname;
                  }, true);
                } else {
                  (0, _onDemandEntriesUtils.closePing)();
                }
              });
              window.addEventListener('beforeunload', function () {
                (0, _onDemandEntriesUtils.closePing)();
              });
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function _default(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/dev/webpack-hot-middleware-client.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/webpack-hot-middleware-client.js ***!
  \****************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _slicedToArray = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = void 0;

var _hotDevClient = _interopRequireDefault(__webpack_require__(/*! ./error-overlay/hot-dev-client */ "./node_modules/next/dist/client/dev/error-overlay/hot-dev-client.js"));

var _default = function _default(_ref) {
  var assetPrefix = _ref.assetPrefix;
  var options = {
    path: "".concat(assetPrefix, "/_next/webpack-hmr")
  };
  var devClient = (0, _hotDevClient["default"])(options);
  devClient.subscribeToHmrEvent(function (obj) {
    if (obj.action === 'reloadPage') {
      return window.location.reload();
    }

    if (obj.action === 'removedPage') {
      var _obj$data = _slicedToArray(obj.data, 1),
          page = _obj$data[0];

      if (page === window.next.router.pathname) {
        return window.location.reload();
      }

      return;
    }

    if (obj.action === 'addedPage') {
      var _obj$data2 = _slicedToArray(obj.data, 1),
          _page = _obj$data2[0];

      if (_page === window.next.router.pathname && typeof window.next.router.components[_page] === 'undefined') {
        return window.location.reload();
      }

      return;
    }

    throw new Error('Unexpected action ' + obj.action);
  });
  return devClient;
};

exports.default = _default;

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/index.js":
/*!************************************************!*\
  !*** ./node_modules/next/dist/client/index.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _regeneratorRuntime = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");

var _asyncToGenerator = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");

var _classCallCheck = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");

var _createClass = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");

var _inherits = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");

var _possibleConstructorReturn = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");

var _getPrototypeOf = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var _slicedToArray = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");

var _s = $RefreshSig$(),
    _s2 = $RefreshSig$();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var _interopRequireWildcard3 = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.render = render;
exports.renderError = renderError;
exports.default = exports.emitter = exports.router = exports.version = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/next/node_modules/@babel/runtime/helpers/extends.js"));

var _interopRequireWildcard2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js"));

__webpack_require__(/*! @next/polyfill-module */ "./node_modules/@next/polyfill-module/dist/polyfill-module.js");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _headManagerContext = __webpack_require__(/*! ../next-server/lib/head-manager-context */ "./node_modules/next/dist/next-server/lib/head-manager-context.js");

var _mitt = _interopRequireDefault(__webpack_require__(/*! ../next-server/lib/mitt */ "./node_modules/next/dist/next-server/lib/mitt.js"));

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "./node_modules/next/dist/next-server/lib/router-context.js");

var _router = __webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js");

var _isDynamic = __webpack_require__(/*! ../next-server/lib/router/utils/is-dynamic */ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

var querystring = _interopRequireWildcard3(__webpack_require__(/*! ../next-server/lib/router/utils/querystring */ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js"));

var envConfig = _interopRequireWildcard3(__webpack_require__(/*! ../next-server/lib/runtime-config */ "./node_modules/next/dist/next-server/lib/runtime-config.js"));

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "./node_modules/next/dist/next-server/lib/utils.js");

var _portal = __webpack_require__(/*! ./portal */ "./node_modules/next/dist/client/portal/index.js");

var _headManager = _interopRequireDefault(__webpack_require__(/*! ./head-manager */ "./node_modules/next/dist/client/head-manager.js"));

var _pageLoader = _interopRequireDefault(__webpack_require__(/*! ./page-loader */ "./node_modules/next/dist/client/page-loader.js"));

var _performanceRelayer = _interopRequireDefault(__webpack_require__(/*! ./performance-relayer */ "./node_modules/next/dist/client/performance-relayer.js"));

var _routeAnnouncer = __webpack_require__(/*! ./route-announcer */ "./node_modules/next/dist/client/route-announcer.js");

var _router2 = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");
/* global location */


var data = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
window.__NEXT_DATA__ = data;
var version = "10.1.3";
exports.version = version;

var looseToArray = function looseToArray(input) {
  return [].slice.call(input);
};

var hydrateProps = data.props,
    hydrateErr = data.err,
    page = data.page,
    query = data.query,
    buildId = data.buildId,
    assetPrefix = data.assetPrefix,
    runtimeConfig = data.runtimeConfig,
    dynamicIds = data.dynamicIds,
    isFallback = data.isFallback,
    locale = data.locale,
    locales = data.locales,
    domainLocales = data.domainLocales,
    isPreview = data.isPreview;
var defaultLocale = data.defaultLocale;
var prefix = assetPrefix || ''; // With dynamic assetPrefix it's no longer possible to set assetPrefix at the build time
// So, this is how we do it in the client side at runtime

__webpack_require__.p = "".concat(prefix, "/_next/"); //eslint-disable-line
// Initialize next/config with the environment configuration

envConfig.setConfig({
  serverRuntimeConfig: {},
  publicRuntimeConfig: runtimeConfig || {}
});
var asPath = (0, _utils.getURL)(); // make sure not to attempt stripping basePath for 404s

if ((0, _router.hasBasePath)(asPath)) {
  asPath = (0, _router.delBasePath)(asPath);
}

if (true) {
  var _require = __webpack_require__(/*! ../next-server/lib/i18n/normalize-locale-path */ "./node_modules/next/dist/next-server/lib/i18n/normalize-locale-path.js"),
      normalizeLocalePath = _require.normalizeLocalePath;

  var _require2 = __webpack_require__(/*! ../next-server/lib/i18n/detect-domain-locale */ "./node_modules/next/dist/next-server/lib/i18n/detect-domain-locale.js"),
      detectDomainLocale = _require2.detectDomainLocale;

  var _require3 = __webpack_require__(/*! ../next-server/lib/router/utils/parse-relative-url */ "./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js"),
      parseRelativeUrl = _require3.parseRelativeUrl;

  var _require4 = __webpack_require__(/*! ../next-server/lib/router/utils/format-url */ "./node_modules/next/dist/next-server/lib/router/utils/format-url.js"),
      formatUrl = _require4.formatUrl;

  if (locales) {
    var parsedAs = parseRelativeUrl(asPath);
    var localePathResult = normalizeLocalePath(parsedAs.pathname, locales);

    if (localePathResult.detectedLocale) {
      parsedAs.pathname = localePathResult.pathname;
      asPath = formatUrl(parsedAs);
    } else {
      // derive the default locale if it wasn't detected in the asPath
      // since we don't prerender static pages with all possible default
      // locales
      defaultLocale = locale;
    } // attempt detecting default locale based on hostname


    var detectedDomain = detectDomainLocale(undefined, window.location.hostname); // TODO: investigate if defaultLocale needs to be populated after
    // hydration to prevent mismatched renders

    if (detectedDomain) {
      defaultLocale = detectedDomain.defaultLocale;
    }
  }
}

if (false) { var _require5, initScriptLoader; }

var pageLoader = new _pageLoader["default"](buildId, prefix);

var register = function register(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      r = _ref2[0],
      f = _ref2[1];

  return pageLoader.routeLoader.onEntrypoint(r, f);
};

if (window.__NEXT_P) {
  // Defer page registration for another tick. This will increase the overall
  // latency in hydrating the page, but reduce the total blocking time.
  window.__NEXT_P.map(function (p) {
    return setTimeout(function () {
      return register(p);
    }, 0);
  });
}

window.__NEXT_P = [];
window.__NEXT_P.push = register;
var headManager = (0, _headManager["default"])();
var appElement = document.getElementById('__next');

var _lastRenderReject;

var webpackHMR;
var router;
exports.router = router;
var CachedApp, onPerfEntry;

var Container = /*#__PURE__*/function (_react$default$Compon) {
  _inherits(Container, _react$default$Compon);

  var _super = _createSuper(Container);

  function Container() {
    _classCallCheck(this, Container);

    return _super.apply(this, arguments);
  }

  _createClass(Container, [{
    key: "componentDidCatch",
    value: function componentDidCatch(componentErr, info) {
      this.props.fn(componentErr, info);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollToHash(); // We need to replace the router state if:
      // - the page was (auto) exported and has a query string or search (hash)
      // - it was auto exported and is a dynamic route (to provide params)
      // - if it is a client-side skeleton (fallback render)

      if (router.isSsr && (isFallback || data.nextExport && ((0, _isDynamic.isDynamicRoute)(router.pathname) || location.search) || hydrateProps && hydrateProps.__N_SSG && location.search)) {
        // update query on mount for exported pages
        router.replace(router.pathname + '?' + String(querystring.assign(querystring.urlQueryToSearchParams(router.query), new URLSearchParams(location.search))), asPath, {
          // @ts-ignore
          // WARNING: `_h` is an internal option for handing Next.js
          // client-side hydration. Your app should _never_ use this property.
          // It may change at any time without notice.
          _h: 1,
          // Fallback pages must trigger the data fetch, so the transition is
          // not shallow.
          // Other pages (strictly updating query) happens shallowly, as data
          // requirements would already be present.
          shallow: !isFallback
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.scrollToHash();
    }
  }, {
    key: "scrollToHash",
    value: function scrollToHash() {
      var _location = location,
          hash = _location.hash;
      hash = hash && hash.substring(1);
      if (!hash) return;
      var el = document.getElementById(hash);
      if (!el) return; // If we call scrollIntoView() in here without a setTimeout
      // it won't scroll properly.

      setTimeout(function () {
        return el.scrollIntoView();
      }, 0);
    }
  }, {
    key: "render",
    value: function render() {
      if (false) {} else {
        var _require6 = __webpack_require__(/*! @next/react-dev-overlay/lib/client */ "./node_modules/@next/react-dev-overlay/lib/client.js"),
            ReactDevOverlay = _require6.ReactDevOverlay;

        return /*#__PURE__*/_react["default"].createElement(ReactDevOverlay, null, this.props.children);
      }
    }
  }]);

  return Container;
}(_react["default"].Component);

var emitter = (0, _mitt["default"])();
exports.emitter = emitter;
var CachedComponent;

var _default = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var opts,
        appEntrypoint,
        app,
        mod,
        initialErr,
        pageEntrypoint,
        _require7,
        isValidElementType,
        _require8,
        getNodeError,
        renderCtx,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            opts = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

            // This makes sure this specific lines are removed in production
            if (true) {
              webpackHMR = opts.webpackHMR;
            }

            _context.next = 4;
            return pageLoader.routeLoader.whenEntrypoint('/_app');

          case 4:
            appEntrypoint = _context.sent;

            if (!('error' in appEntrypoint)) {
              _context.next = 7;
              break;
            }

            throw appEntrypoint.error;

          case 7:
            app = appEntrypoint.component, mod = appEntrypoint.exports;
            CachedApp = app;

            if (mod && mod.reportWebVitals) {
              onPerfEntry = function onPerfEntry(_ref4) {
                var id = _ref4.id,
                    name = _ref4.name,
                    startTime = _ref4.startTime,
                    value = _ref4.value,
                    duration = _ref4.duration,
                    entryType = _ref4.entryType,
                    entries = _ref4.entries;
                // Combines timestamp with random number for unique ID
                var uniqueID = "".concat(Date.now(), "-").concat(Math.floor(Math.random() * (9e12 - 1)) + 1e12);
                var perfStartEntry;

                if (entries && entries.length) {
                  perfStartEntry = entries[0].startTime;
                }

                mod.reportWebVitals({
                  id: id || uniqueID,
                  name: name,
                  startTime: startTime || perfStartEntry,
                  value: value == null ? duration : value,
                  label: entryType === 'mark' || entryType === 'measure' ? 'custom' : 'web-vital'
                });
              };
            }

            initialErr = hydrateErr;
            _context.prev = 11;

            if (!( true && hydrateErr)) {
              _context.next = 16;
              break;
            }

            _context.t0 = {
              error: hydrateErr
            };
            _context.next = 19;
            break;

          case 16:
            _context.next = 18;
            return pageLoader.routeLoader.whenEntrypoint(page);

          case 18:
            _context.t0 = _context.sent;

          case 19:
            pageEntrypoint = _context.t0;

            if (!('error' in pageEntrypoint)) {
              _context.next = 22;
              break;
            }

            throw pageEntrypoint.error;

          case 22:
            CachedComponent = pageEntrypoint.component;

            if (false) {}

            _require7 = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js"), isValidElementType = _require7.isValidElementType;

            if (isValidElementType(CachedComponent)) {
              _context.next = 27;
              break;
            }

            throw new Error("The default export is not a React Component in page: \"".concat(page, "\""));

          case 27:
            _context.next = 32;
            break;

          case 29:
            _context.prev = 29;
            _context.t1 = _context["catch"](11);
            // This catches errors like throwing in the top level of a module
            initialErr = _context.t1;

          case 32:
            if (true) {
              _require8 = __webpack_require__(/*! @next/react-dev-overlay/lib/client */ "./node_modules/@next/react-dev-overlay/lib/client.js"), getNodeError = _require8.getNodeError; // Server-side runtime errors need to be re-thrown on the client-side so
              // that the overlay is rendered.

              if (initialErr) {
                if (initialErr === hydrateErr) {
                  setTimeout(function () {
                    var error;

                    try {
                      // Generate a new error object. We `throw` it because some browsers
                      // will set the `stack` when thrown, and we want to ensure ours is
                      // not overridden when we re-throw it below.
                      throw new Error(initialErr.message);
                    } catch (e) {
                      error = e;
                    }

                    error.name = initialErr.name;
                    error.stack = initialErr.stack;
                    var node = getNodeError(error);
                    throw node;
                  });
                } // We replaced the server-side error with a client-side error, and should
                // no longer rewrite the stack trace to a Node error.
                else {
                    setTimeout(function () {
                      throw initialErr;
                    });
                  }
              }
            }

            if (!window.__NEXT_PRELOADREADY) {
              _context.next = 36;
              break;
            }

            _context.next = 36;
            return window.__NEXT_PRELOADREADY(dynamicIds);

          case 36:
            exports.router = router = (0, _router2.createRouter)(page, query, asPath, {
              initialProps: hydrateProps,
              pageLoader: pageLoader,
              App: CachedApp,
              Component: CachedComponent,
              wrapApp: wrapApp,
              err: initialErr,
              isFallback: Boolean(isFallback),
              subscription: function subscription(info, App, scroll) {
                return render(Object.assign({}, info, {
                  App: App,
                  scroll: scroll
                }));
              },
              locale: locale,
              locales: locales,
              defaultLocale: defaultLocale,
              domainLocales: domainLocales,
              isPreview: isPreview
            }); // call init-client middleware

            if (false) {}

            renderCtx = {
              App: CachedApp,
              initial: true,
              Component: CachedComponent,
              props: hydrateProps,
              err: initialErr
            };

            if (true) {
              _context.next = 44;
              break;
            }

            render(renderCtx);
            return _context.abrupt("return", emitter);

          case 44:
            return _context.abrupt("return", {
              emitter: emitter,
              render: render,
              renderCtx: renderCtx
            });

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 29]]);
  }));

  return function _default() {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = _default;

function render(_x) {
  return _render.apply(this, arguments);
} // This method handles all runtime and debug errors.
// 404 and 500 errors are special kind of errors
// and they are still handle via the main render method.


function _render() {
  _render = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(renderingProps) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!renderingProps.err) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return renderError(renderingProps);

          case 3:
            return _context2.abrupt("return");

          case 4:
            _context2.prev = 4;
            _context2.next = 7;
            return doRender(renderingProps);

          case 7:
            _context2.next = 16;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](4);

            if (!_context2.t0.cancelled) {
              _context2.next = 13;
              break;
            }

            throw _context2.t0;

          case 13:
            if (true) {
              // Ensure this error is displayed in the overlay in development
              setTimeout(function () {
                throw _context2.t0;
              });
            }

            _context2.next = 16;
            return renderError((0, _extends2["default"])({}, renderingProps, {
              err: _context2.t0
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 9]]);
  }));
  return _render.apply(this, arguments);
}

function renderError(renderErrorProps) {
  var App = renderErrorProps.App,
      err = renderErrorProps.err; // In development runtime errors are caught by our overlay
  // In production we catch runtime errors using componentDidCatch which will trigger renderError

  if (true) {
    // A Next.js rendering runtime error is always unrecoverable
    // FIXME: let's make this recoverable (error in GIP client-transition)
    webpackHMR.onUnrecoverableError(); // We need to render an empty <App> so that the `<ReactDevOverlay>` can
    // render itself.

    return doRender({
      App: function App() {
        return null;
      },
      props: {},
      Component: function Component() {
        return null;
      },
      styleSheets: []
    });
  }

  if (false) {} // Make sure we log the error to the console, otherwise users can't track down issues.


  console.error(err);
  return pageLoader.loadPage('/_error').then(function (_ref5) {
    var ErrorComponent = _ref5.page,
        styleSheets = _ref5.styleSheets;
    // In production we do a normal render with the `ErrorComponent` as component.
    // If we've gotten here upon initial render, we can use the props from the server.
    // Otherwise, we need to call `getInitialProps` on `App` before mounting.
    var AppTree = wrapApp(App);
    var appCtx = {
      Component: ErrorComponent,
      AppTree: AppTree,
      router: router,
      ctx: {
        err: err,
        pathname: page,
        query: query,
        asPath: asPath,
        AppTree: AppTree
      }
    };
    return Promise.resolve(renderErrorProps.props ? renderErrorProps.props : (0, _utils.loadGetInitialProps)(App, appCtx)).then(function (initProps) {
      return doRender((0, _extends2["default"])({}, renderErrorProps, {
        err: err,
        Component: ErrorComponent,
        styleSheets: styleSheets,
        props: initProps
      }));
    });
  });
}

var reactRoot = null;
var shouldUseHydrate = typeof _reactDom["default"].hydrate === 'function';

function renderReactElement(reactEl, domEl) {
  if (false) { var opts; } else {
    // mark start of hydrate/render
    if (_utils.ST) {
      performance.mark('beforeRender');
    } // The check for `.hydrate` is there to support React alternatives like preact


    if (shouldUseHydrate) {
      _reactDom["default"].hydrate(reactEl, domEl, markHydrateComplete);

      shouldUseHydrate = false;
    } else {
      _reactDom["default"].render(reactEl, domEl, markRenderComplete);
    }
  }
}

function markHydrateComplete() {
  if (!_utils.ST) return;
  performance.mark('afterHydrate'); // mark end of hydration

  performance.measure('Next.js-before-hydration', 'navigationStart', 'beforeRender');
  performance.measure('Next.js-hydration', 'beforeRender', 'afterHydrate');

  if (onPerfEntry) {
    performance.getEntriesByName('Next.js-hydration').forEach(onPerfEntry);
  }

  clearMarks();
}

function markRenderComplete() {
  if (!_utils.ST) return;
  performance.mark('afterRender'); // mark end of render

  var navStartEntries = performance.getEntriesByName('routeChange', 'mark');
  if (!navStartEntries.length) return;
  performance.measure('Next.js-route-change-to-render', navStartEntries[0].name, 'beforeRender');
  performance.measure('Next.js-render', 'beforeRender', 'afterRender');

  if (onPerfEntry) {
    performance.getEntriesByName('Next.js-render').forEach(onPerfEntry);
    performance.getEntriesByName('Next.js-route-change-to-render').forEach(onPerfEntry);
  }

  clearMarks();
  ['Next.js-route-change-to-render', 'Next.js-render'].forEach(function (measure) {
    return performance.clearMeasures(measure);
  });
}

function clearMarks() {
  ;
  ['beforeRender', 'afterHydrate', 'afterRender', 'routeChange'].forEach(function (mark) {
    return performance.clearMarks(mark);
  });
}

function AppContainer(_ref6) {
  var children = _ref6.children;
  return /*#__PURE__*/_react["default"].createElement(Container, {
    fn: function fn(error) {
      return renderError({
        App: CachedApp,
        err: error
      })["catch"](function (err) {
        return console.error('Error rendering page: ', err);
      });
    }
  }, /*#__PURE__*/_react["default"].createElement(_routerContext.RouterContext.Provider, {
    value: (0, _router2.makePublicRouterInstance)(router)
  }, /*#__PURE__*/_react["default"].createElement(_headManagerContext.HeadManagerContext.Provider, {
    value: headManager
  }, children)));
}

_c = AppContainer;

var wrapApp = function wrapApp(App) {
  return function (wrappedAppProps) {
    var appProps = (0, _extends2["default"])({}, wrappedAppProps, {
      Component: CachedComponent,
      err: hydrateErr,
      router: router
    });
    return /*#__PURE__*/_react["default"].createElement(AppContainer, null, /*#__PURE__*/_react["default"].createElement(App, appProps));
  };
};

var lastAppProps;

function doRender(input) {
  var App = input.App,
      Component = input.Component,
      props = input.props,
      err = input.err;
  var styleSheets = 'initial' in input ? undefined : input.styleSheets;
  Component = Component || lastAppProps.Component;
  props = props || lastAppProps.props;
  var appProps = (0, _extends2["default"])({}, props, {
    Component: Component,
    err: err,
    router: router
  }); // lastAppProps has to be set before ReactDom.render to account for ReactDom throwing an error.

  lastAppProps = appProps;
  var canceled = false;
  var resolvePromise;
  var renderPromise = new Promise(function (resolve, reject) {
    if (_lastRenderReject) {
      _lastRenderReject();
    }

    resolvePromise = function resolvePromise() {
      _lastRenderReject = null;
      resolve();
    };

    _lastRenderReject = function lastRenderReject() {
      canceled = true;
      _lastRenderReject = null;
      var error = new Error('Cancel rendering route');
      error.cancelled = true;
      reject(error);
    };
  }); // This function has a return type to ensure it doesn't start returning a
  // Promise. It should remain synchronous.

  function onStart() {
    if (!styleSheets || // We use `style-loader` in development, so we don't need to do anything
    // unless we're in production:
    true) {
      return false;
    }

    var currentStyleTags = looseToArray(document.querySelectorAll('style[data-n-href]'));
    var currentHrefs = new Set(currentStyleTags.map(function (tag) {
      return tag.getAttribute('data-n-href');
    }));
    var noscript = document.querySelector('noscript[data-n-css]');
    var nonce = noscript == null ? void 0 : noscript.getAttribute('data-n-css');
    styleSheets.forEach(function (_ref7) {
      var href = _ref7.href,
          text = _ref7.text;

      if (!currentHrefs.has(href)) {
        var styleTag = document.createElement('style');
        styleTag.setAttribute('data-n-href', href);
        styleTag.setAttribute('media', 'x');

        if (nonce) {
          styleTag.setAttribute('nonce', nonce);
        }

        document.head.appendChild(styleTag);
        styleTag.appendChild(document.createTextNode(text));
      }
    });
    return true;
  }

  function onHeadCommit() {
    if ( // We use `style-loader` in development, so we don't need to do anything
    // unless we're in production:
    false) { var referenceNode, idx, currentHrefs, currentStyleTags, desiredHrefs; }

    if (input.scroll) {
      window.scrollTo(input.scroll.x, input.scroll.y);
    }
  }

  function onRootCommit() {
    resolvePromise();
  }

  var elem = /*#__PURE__*/_react["default"].createElement(Root, {
    callback: onRootCommit
  }, /*#__PURE__*/_react["default"].createElement(Head, {
    callback: onHeadCommit
  }), /*#__PURE__*/_react["default"].createElement(AppContainer, null, /*#__PURE__*/_react["default"].createElement(App, appProps), /*#__PURE__*/_react["default"].createElement(_portal.Portal, {
    type: "next-route-announcer"
  }, /*#__PURE__*/_react["default"].createElement(_routeAnnouncer.RouteAnnouncer, null))));

  onStart(); // We catch runtime errors using componentDidCatch which will trigger renderError

  renderReactElement( false ? /*#__PURE__*/0 : elem, appElement);
  return renderPromise;
}

function Root(_ref9) {
  _s();

  var callback = _ref9.callback,
      children = _ref9.children;

  // We use `useLayoutEffect` to guarantee the callback is executed
  // as soon as React flushes the update.
  _react["default"].useLayoutEffect(function () {
    return callback();
  }, [callback]);

  if (undefined) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    _react["default"].useEffect(function () {
      window.__NEXT_HYDRATED = true;

      if (window.__NEXT_HYDRATED_CB) {
        window.__NEXT_HYDRATED_CB();
      }
    }, []);
  } // We should ask to measure the Web Vitals after rendering completes so we
  // don't cause any hydration delay:


  _react["default"].useEffect(function () {
    (0, _performanceRelayer["default"])(onPerfEntry);
  }, []);

  return children;
} // Dummy component that we render as a child of Root so that we can
// toggle the correct styles before the page is rendered.


_s(Root, "KDoBXdlwSU+O+uFsByO25XxhKDU=");

_c2 = Root;

function Head(_ref10) {
  _s2();

  var callback = _ref10.callback;

  // We use `useLayoutEffect` to guarantee the callback is executed
  // as soon as React flushes the update.
  _react["default"].useLayoutEffect(function () {
    return callback();
  }, [callback]);

  return null;
}

_s2(Head, "n7/vCynhJvM+pLkyL2DMQUF0odM=");

_c3 = Head;

var _c, _c2, _c3;

$RefreshReg$(_c, "AppContainer");
$RefreshReg$(_c2, "Root");
$RefreshReg$(_c3, "Head");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/next-dev.js":
/*!***************************************************!*\
  !*** ./node_modules/next/dist/client/next-dev.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var next = _interopRequireWildcard(__webpack_require__(/*! ./ */ "./node_modules/next/dist/client/index.js"));

var _eventSourcePolyfill = _interopRequireDefault(__webpack_require__(/*! ./dev/event-source-polyfill */ "./node_modules/next/dist/client/dev/event-source-polyfill.js"));

var _onDemandEntriesClient = _interopRequireDefault(__webpack_require__(/*! ./dev/on-demand-entries-client */ "./node_modules/next/dist/client/dev/on-demand-entries-client.js"));

var _webpackHotMiddlewareClient = _interopRequireDefault(__webpack_require__(/*! ./dev/webpack-hot-middleware-client */ "./node_modules/next/dist/client/dev/webpack-hot-middleware-client.js"));

var _devBuildWatcher = _interopRequireDefault(__webpack_require__(/*! ./dev/dev-build-watcher */ "./node_modules/next/dist/client/dev/dev-build-watcher.js"));

var _fouc = __webpack_require__(/*! ./dev/fouc */ "./node_modules/next/dist/client/dev/fouc.js");

var _eventsource = __webpack_require__(/*! ./dev/error-overlay/eventsource */ "./node_modules/next/dist/client/dev/error-overlay/eventsource.js");

var querystring = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/utils/querystring */ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js"));
/* globals import('./dev/noop'); */
// Temporary workaround for the issue described here:
// https://github.com/vercel/next.js/issues/3775#issuecomment-407438123
// The runtimeChunk doesn't have dynamic import handling code when there hasn't been a dynamic import
// The runtimeChunk can't hot reload itself currently to correct it when adding pages using on-demand-entries
// eslint-disable-next-line no-unused-expressions


__webpack_require__.e(/*! import() */ "node_modules_next_dist_client_dev_noop_js").then(__webpack_require__.t.bind(__webpack_require__, /*! ./dev/noop */ "./node_modules/next/dist/client/dev/noop.js", 23));
; // Support EventSource on Internet Explorer 11

if (!window.EventSource) {
  window.EventSource = _eventSourcePolyfill["default"];
}

var _window = window,
    assetPrefix = _window.__NEXT_DATA__.assetPrefix;
var prefix = assetPrefix || '';
var webpackHMR = (0, _webpackHotMiddlewareClient["default"])({
  assetPrefix: prefix
});
window.next = next;
(0, next["default"])({
  webpackHMR: webpackHMR
}).then(function (_ref) {
  var renderCtx = _ref.renderCtx,
      render = _ref.render;
  (0, _onDemandEntriesClient["default"])({
    assetPrefix: prefix
  });

  var buildIndicatorHandler = function buildIndicatorHandler() {};

  function devPagesManifestListener(event) {
    if (event.data.indexOf('devPagesManifest') !== -1) {
      fetch("".concat(prefix, "/_next/static/development/_devPagesManifest.json")).then(function (res) {
        return res.json();
      }).then(function (manifest) {
        window.__DEV_PAGES_MANIFEST = manifest;
      })["catch"](function (err) {
        console.log("Failed to fetch devPagesManifest", err);
      });
    } else if (event.data.indexOf('serverOnlyChanges') !== -1) {
      var _JSON$parse = JSON.parse(event.data),
          pages = _JSON$parse.pages;

      var router = window.next.router;

      if (pages.includes(router.pathname)) {
        console.log('Refreshing page data due to server-side change');
        buildIndicatorHandler('building');

        var clearIndicator = function clearIndicator() {
          return buildIndicatorHandler('built');
        };

        router.replace(router.pathname + '?' + String(querystring.assign(querystring.urlQueryToSearchParams(router.query), new URLSearchParams(location.search))), router.asPath)["finally"](clearIndicator);
      }
    }
  }

  devPagesManifestListener.unfiltered = true;
  (0, _eventsource.getEventSourceWrapper)({}).addMessageListener(devPagesManifestListener);

  if (true) {
    (0, _devBuildWatcher["default"])(function (handler) {
      buildIndicatorHandler = handler;
    });
  } // delay rendering until after styles have been applied in development


  (0, _fouc.displayContent)(function () {
    render(renderCtx);
  });
})["catch"](function (err) {
  console.error('Error was not caught', err);
});

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/page-loader.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/page-loader.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _classCallCheck = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");

var _createClass = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = void 0;

var _router = __webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js");

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__(/*! ../next-server/lib/router/utils/get-asset-path-from-route */ "./node_modules/next/dist/next-server/lib/router/utils/get-asset-path-from-route.js"));

var _isDynamic = __webpack_require__(/*! ../next-server/lib/router/utils/is-dynamic */ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

var _parseRelativeUrl = __webpack_require__(/*! ../next-server/lib/router/utils/parse-relative-url */ "./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js");

var _normalizeTrailingSlash = __webpack_require__(/*! ./normalize-trailing-slash */ "./node_modules/next/dist/client/normalize-trailing-slash.js");

var _routeLoader = _interopRequireWildcard(__webpack_require__(/*! ./route-loader */ "./node_modules/next/dist/client/route-loader.js"));

function normalizeRoute(route) {
  if (route[0] !== '/') {
    throw new Error("Route name should start with a \"/\", got \"".concat(route, "\""));
  }

  if (route === '/') return route;
  return route.replace(/\/$/, '');
}

var PageLoader = /*#__PURE__*/function () {
  function PageLoader(buildId, assetPrefix) {
    _classCallCheck(this, PageLoader);

    this.buildId = void 0;
    this.assetPrefix = void 0;
    this.promisedSsgManifest = void 0;
    this.promisedDevPagesManifest = void 0;
    this.routeLoader = void 0;
    this.routeLoader = (0, _routeLoader["default"])(assetPrefix);
    this.buildId = buildId;
    this.assetPrefix = assetPrefix;
    /** @type {Promise<Set<string>>} */

    this.promisedSsgManifest = new Promise(function (resolve) {
      if (window.__SSG_MANIFEST) {
        resolve(window.__SSG_MANIFEST);
      } else {
        ;

        window.__SSG_MANIFEST_CB = function () {
          resolve(window.__SSG_MANIFEST);
        };
      }
    });
  }

  _createClass(PageLoader, [{
    key: "getPageList",
    value: function getPageList() {
      if (false) {} else {
        if (window.__DEV_PAGES_MANIFEST) {
          return window.__DEV_PAGES_MANIFEST.pages;
        } else {
          if (!this.promisedDevPagesManifest) {
            this.promisedDevPagesManifest = fetch("".concat(this.assetPrefix, "/_next/static/development/_devPagesManifest.json")).then(function (res) {
              return res.json();
            }).then(function (manifest) {
              ;
              window.__DEV_PAGES_MANIFEST = manifest;
              return manifest.pages;
            })["catch"](function (err) {
              console.log("Failed to fetch devPagesManifest", err);
            });
          }

          return this.promisedDevPagesManifest;
        }
      }
    }
    /**
    * @param {string} href the route href (file-system path)
    * @param {string} asPath the URL as shown in browser (virtual path); used for dynamic routes
    * @returns {string}
    */

  }, {
    key: "getDataHref",
    value: function getDataHref(href, asPath, ssg, locale) {
      var _this = this;

      var _ref = (0, _parseRelativeUrl.parseRelativeUrl)(href),
          hrefPathname = _ref.pathname,
          query = _ref.query,
          search = _ref.search;

      var _ref2 = (0, _parseRelativeUrl.parseRelativeUrl)(asPath),
          asPathname = _ref2.pathname;

      var route = normalizeRoute(hrefPathname);

      var getHrefForSlug = function getHrefForSlug(path) {
        var dataRoute = (0, _getAssetPathFromRoute["default"])((0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _router.addLocale)(path, locale)), '.json');
        return (0, _router.addBasePath)("/_next/data/".concat(_this.buildId).concat(dataRoute).concat(ssg ? '' : search));
      };

      var isDynamic = (0, _isDynamic.isDynamicRoute)(route);
      var interpolatedRoute = isDynamic ? (0, _router.interpolateAs)(hrefPathname, asPathname, query).result : '';
      return isDynamic ? interpolatedRoute && getHrefForSlug(interpolatedRoute) : getHrefForSlug(route);
    }
    /**
    * @param {string} route - the route (file-system path)
    */

  }, {
    key: "_isSsg",
    value: function _isSsg(route) {
      return this.promisedSsgManifest.then(function (s) {
        return s.has(route);
      });
    }
  }, {
    key: "loadPage",
    value: function loadPage(route) {
      return this.routeLoader.loadRoute(route).then(function (res) {
        if ('component' in res) {
          return {
            page: res.component,
            mod: res.exports,
            styleSheets: res.styles.map(function (o) {
              return {
                href: o.href,
                text: o.content
              };
            })
          };
        }

        throw res.error;
      });
    }
  }, {
    key: "prefetch",
    value: function prefetch(route) {
      return this.routeLoader.prefetch(route);
    }
  }]);

  return PageLoader;
}();

exports.default = PageLoader;

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/portal/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/portal/index.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _slicedToArray = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");

var _s = $RefreshSig$();

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.Portal = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var Portal = function Portal(_ref) {
  _s();

  var children = _ref.children,
      type = _ref.type;
  var portalNode = React.useRef(null);

  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      forceUpdate = _React$useState2[1];

  React.useEffect(function () {
    portalNode.current = document.createElement(type);
    document.body.appendChild(portalNode.current);
    forceUpdate({});
    return function () {
      if (portalNode.current) {
        document.body.removeChild(portalNode.current);
      }
    };
  }, [type]);
  return portalNode.current ? /*#__PURE__*/(0, _reactDom.createPortal)(children, portalNode.current) : null;
};

_s(Portal, "H9Jq/p5GRHpyHVgd55qLy9aYECA=");

_c = Portal;
exports.Portal = Portal;

var _c;

$RefreshReg$(_c, "Portal");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/route-announcer.js":
/*!**********************************************************!*\
  !*** ./node_modules/next/dist/client/route-announcer.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _slicedToArray = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.RouteAnnouncer = RouteAnnouncer;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function RouteAnnouncer() {
  var _ref = (0, _router.useRouter)(),
      asPath = _ref.asPath;

  var _ref2 = (0, _react.useState)(''),
      _ref3 = _slicedToArray(_ref2, 2),
      routeAnnouncement = _ref3[0],
      setRouteAnnouncement = _ref3[1]; // Only announce the path change, but not for the first load because screen reader will do that automatically.


  var initialPathLoaded = (0, _react.useRef)(false); // Every time the path changes, announce the route change. The announcement will be prioritized by h1, then title
  // (from metadata), and finally if those don't exist, then the pathName that is in the URL. This methodology is
  // inspired by Marcy Sutton's accessible client routing user testing. More information can be found here:
  // https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/

  (0, _react.useEffect)(function () {
    if (!initialPathLoaded.current) {
      initialPathLoaded.current = true;
      return;
    }

    var newRouteAnnouncement;
    var pageHeader = document.querySelector('h1');

    if (pageHeader) {
      newRouteAnnouncement = pageHeader.innerText || pageHeader.textContent;
    }

    if (!newRouteAnnouncement) {
      if (document.title) {
        newRouteAnnouncement = document.title;
      } else {
        newRouteAnnouncement = asPath;
      }
    }

    setRouteAnnouncement(newRouteAnnouncement);
  }, // TODO: switch to pathname + query object of dynamic route requirements
  [asPath]);
  return /*#__PURE__*/_react["default"].createElement("p", {
    "aria-live": "assertive" // Make the announcement immediately.
    ,
    id: "__next-route-announcer__",
    role: "alert",
    style: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      width: '1px',
      // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
      whiteSpace: 'nowrap',
      wordWrap: 'normal'
    }
  }, routeAnnouncement);
}

_c = RouteAnnouncer;
var _default = RouteAnnouncer;
exports.default = _default;

var _c;

$RefreshReg$(_c, "RouteAnnouncer");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/route-loader.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/route-loader.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _regeneratorRuntime = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");

var _slicedToArray = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");

var _asyncToGenerator = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.default = void 0;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__(/*! ../next-server/lib/router/utils/get-asset-path-from-route */ "./node_modules/next/dist/next-server/lib/router/utils/get-asset-path-from-route.js"));

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js"); // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


var MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  var entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  var resolver;
  var prom = new Promise(function (resolve) {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? // eslint-disable-next-line no-sequences
  generator().then(function (value) {
    return resolver(value), value;
  }) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (_unused) {
    return false;
  }
}

var canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise(function (res, rej) {
    if (document.querySelector("link[rel=\"prefetch\"][href^=\"".concat(href, "\"]"))) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = "prefetch";
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

var ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR'); // TODO: unexport

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise(function (resolve, reject) {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = function () {
      return reject(markAssetError(new Error("Failed to load script: ".concat(src))));
    }; // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
} // Resolve a promise that times out after given amount of milliseconds.


function resolvePromiseWithTimeout(p, ms, err) {
  return new Promise(function (resolve, reject) {
    var cancelled = false;
    p.then(function (r) {
      // Resolved, cancel the timeout
      cancelled = true;
      resolve(r);
    })["catch"](reject);
    (0, _requestIdleCallback.requestIdleCallback)(function () {
      return setTimeout(function () {
        if (!cancelled) {
          reject(err);
        }
      }, ms);
    });
  });
} // TODO: stop exporting or cache the failure
// It'd be best to stop exporting this. It's an implementation detail. We're
// only exporting it for backwards compatibilty with the `page-loader`.
// Only cache this response as a last resort if we cannot eliminate all other
// code branches that use the Build Manifest Callback and push them through
// the Route Loader interface.


function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  var onBuildManifest = new Promise(function (resolve) {
    // Mandatory because this is not concurrent safe:
    var cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = function () {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')));
}

function getFilesForRoute(assetPrefix, route) {
  if (true) {
    return Promise.resolve({
      scripts: [assetPrefix + '/_next/static/chunks/pages' + encodeURI((0, _getAssetPathFromRoute["default"])(route, '.js'))],
      // Styles are handled by `style-loader` in development:
      css: []
    });
  }

  return getClientBuildManifest().then(function (manifest) {
    if (!(route in manifest)) {
      throw markAssetError(new Error("Failed to lookup route: ".concat(route)));
    }

    var allFiles = manifest[route].map(function (entry) {
      return assetPrefix + '/_next/' + encodeURI(entry);
    });
    return {
      scripts: allFiles.filter(function (v) {
        return v.endsWith('.js');
      }),
      css: allFiles.filter(function (v) {
        return v.endsWith('.css');
      })
    };
  });
}

function createRouteLoader(assetPrefix) {
  var entrypoints = new Map();
  var loadedScripts = new Map();
  var styleSheets = new Map();
  var routes = new Map();

  function maybeExecuteScript(src) {
    var prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector("script[src^=\"".concat(src, "\"]"))) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    var prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(function (res) {
      if (!res.ok) {
        throw new Error("Failed to load stylesheet: ".concat(href));
      }

      return res.text().then(function (text) {
        return {
          href: href,
          content: text
        };
      });
    })["catch"](function (err) {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint: function whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },
    onEntrypoint: function onEntrypoint(route, execute) {
      Promise.resolve(execute).then(function (fn) {
        return fn();
      }).then(function (exports) {
        return {
          component: exports && exports["default"] || exports,
          exports: exports
        };
      }, function (err) {
        return {
          error: err
        };
      }).then(function (input) {
        var old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },
    loadRoute: function loadRoute(route) {
      var _this = this;

      return withFuture(route, routes, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _yield$getFilesForRou, scripts, css, _yield$Promise$all, _yield$Promise$all2, styles, entrypoint, res;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return getFilesForRoute(assetPrefix, route);

              case 3:
                _yield$getFilesForRou = _context.sent;
                scripts = _yield$getFilesForRou.scripts;
                css = _yield$getFilesForRou.css;
                _context.next = 8;
                return Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);

              case 8:
                _yield$Promise$all = _context.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                styles = _yield$Promise$all2[1];
                _context.next = 13;
                return resolvePromiseWithTimeout(_this.whenEntrypoint(route), MS_MAX_IDLE_DELAY, markAssetError(new Error("Route did not complete loading: ".concat(route))));

              case 13:
                entrypoint = _context.sent;
                res = Object.assign({
                  styles: styles
                }, entrypoint);
                return _context.abrupt("return", 'error' in entrypoint ? entrypoint : res);

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", {
                  error: _context.t0
                });

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 18]]);
      })));
    },
    prefetch: function prefetch(route) {
      var _this2 = this;

      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      var cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(function (output) {
        return Promise.all(canPrefetch ? output.scripts.map(function (script) {
          return prefetchViaDom(script, 'script');
        }) : []);
      }).then(function () {
        (0, _requestIdleCallback.requestIdleCallback)(function () {
          return _this2.loadRoute(route);
        });
      })["catch"]( // swallow prefetch errors
      function () {});
    }
  };
}

var _default = createRouteLoader;
exports.default = _default;

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _construct = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/construct */ "./node_modules/@babel/runtime/helpers/construct.js");

var _s = $RefreshSig$();

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _router2 = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js"));

exports.Router = _router2["default"];
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "./node_modules/next/dist/next-server/lib/router-context.js");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

exports.withRouter = _withRouter["default"];
/* global window */

var singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],
  ready: function ready(cb) {
    if (this.router) return cb();

    if (true) {
      this.readyCallbacks.push(cb);
    }
  }
}; // Create public properties and methods of the router in the singletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale', 'isReady', 'isPreview', 'isLocaleDomain'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get: function get() {
    return _router2["default"].events;
  }
});
urlPropertyFields.forEach(function (field) {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get: function get() {
      var router = getRouter();
      return router[field];
    }
  });
});
coreMethodFields.forEach(function (field) {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = function () {
    var router = getRouter();
    return router[field].apply(router, arguments);
  };
});
routerEvents.forEach(function (event) {
  singletonRouter.ready(function () {
    _router2["default"].events.on(event, function () {
      var eventField = "on".concat(event.charAt(0).toUpperCase()).concat(event.substring(1));
      var _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField].apply(_singletonRouter, arguments);
        } catch (err) {
          console.error("Error when running the Router event: ".concat(eventField));
          console.error("".concat(err.message, "\n").concat(err.stack));
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  _s();

  return _react["default"].useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


_s(useRouter, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");

var createRouter = function createRouter() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  singletonRouter.router = _construct(_router2["default"], args);
  singletonRouter.readyCallbacks.forEach(function (cb) {
    return cb();
  });
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  var _router = router;
  var instance = {};

  var _iterator = _createForOfIteratorHelper(urlPropertyFields),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var property = _step.value;

      if (typeof _router[property] === 'object') {
        instance[property] = Object.assign(Array.isArray(_router[property]) ? [] : {}, _router[property]); // makes sure query is not stateful

        continue;
      }

      instance[property] = _router[property];
    } // Events is a static property on the router, the router doesn't have to be initialized to use it

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  instance.events = _router2["default"].events;
  coreMethodFields.forEach(function (field) {
    instance[field] = function () {
      return _router[field].apply(_router, arguments);
    };
  });
  return instance;
}

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react["default"].createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    var name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = "withRouter(".concat(name, ")");
  }

  return WithRouterWrapper;
}

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/extends.js":
/*!**************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/extends.js ***!
  \**************************************************************************/
/***/ (function(module) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \*****************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js":
/*!*************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js ***!
  \*************************************************************************/
/***/ (function(module) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4uL2NsaWVudC9kZXYvZXJyb3Itb3ZlcmxheS9ob3QtZGV2LWNsaWVudC5qcyIsIndlYnBhY2s6Ly9fTl9FLy4uL2NsaWVudC9kZXYvb24tZGVtYW5kLWVudHJpZXMtY2xpZW50LmpzIiwid2VicGFjazovL19OX0UvLi4vY2xpZW50L2Rldi93ZWJwYWNrLWhvdC1taWRkbGV3YXJlLWNsaWVudC5qcyIsIndlYnBhY2s6Ly9fTl9FLy4uL2NsaWVudC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vX05fRS8uLi9jbGllbnQvbmV4dC1kZXYuanMiLCJ3ZWJwYWNrOi8vX05fRS8uLi9jbGllbnQvcGFnZS1sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vX05fRS8uLi9jbGllbnQvcG9ydGFsL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9fTl9FLy4uL2NsaWVudC9yb3V0ZS1hbm5vdW5jZXIudHN4Iiwid2VicGFjazovL19OX0UvLi4vY2xpZW50L3JvdXRlLWxvYWRlci50cyIsIndlYnBhY2s6Ly9fTl9FLy4uL2NsaWVudC9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vX05fRS8uLi9jbGllbnQvd2l0aC1yb3V0ZXIudHN4Iiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmQuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyJdLCJuYW1lcyI6WyJoYWRSdW50aW1lRXJyb3IiLCJEZXZPdmVybGF5IiwiZXZlbnQiLCJwcm9jZXNzTWVzc2FnZSIsImNvbnNvbGUiLCJzdWJzY3JpYmVUb0htckV2ZW50IiwiY3VzdG9tSG1yRXZlbnRIYW5kbGVyIiwib25VbnJlY292ZXJhYmxlRXJyb3IiLCJpc0ZpcnN0Q29tcGlsYXRpb24iLCJtb3N0UmVjZW50Q29tcGlsYXRpb25IYXNoIiwiaGFzQ29tcGlsZUVycm9ycyIsImNsZWFyT3V0ZGF0ZWRFcnJvcnMiLCJpc0hvdFVwZGF0ZSIsInRyeUFwcGx5VXBkYXRlcyIsIm9uRmFzdFJlZnJlc2giLCJmb3JtYXR0ZWQiLCJ3YXJuaW5ncyIsImVycm9ycyIsImkiLCJwcmludFdhcm5pbmdzIiwicHJvY2VzcyIsInNlbGYiLCJvYmoiLCJKU09OIiwiZSIsImhhbmRsZUF2YWlsYWJsZUhhc2giLCJoYXNFcnJvcnMiLCJCb29sZWFuIiwiaGFuZGxlRXJyb3JzIiwiaGFzV2FybmluZ3MiLCJoYW5kbGVXYXJuaW5ncyIsImhhbmRsZVN1Y2Nlc3MiLCJtb2R1bGUiLCJjYW5BcHBseVVwZGF0ZXMiLCJmbiIsInN0YXR1cyIsImlzVXBkYXRlQXZhaWxhYmxlIiwiZXJyIiwid2luZG93IiwiaGFzVXBkYXRlcyIsInVwZGF0ZWRNb2R1bGVzIiwib25Ib3RVcGRhdGVTdWNjZXNzIiwiYWZ0ZXJBcHBseVVwZGF0ZXMiLCJoYW5kbGVBcHBseVVwZGF0ZXMiLCJSb3V0ZXIiLCJzZXR1cFBpbmciLCJjdXJyZW50UGFnZSIsImRvY3VtZW50IiwiX2V2ZW50Iiwic3RhdGUiLCJvcHRpb25zIiwicGF0aCIsImRldkNsaWVudCIsInBhZ2UiLCJkYXRhIiwidmVyc2lvbiIsImxvb3NlVG9BcnJheSIsInByb3BzIiwiaXNGYWxsYmFjayIsImRlZmF1bHRMb2NhbGUiLCJwcmVmaXgiLCJfX3dlYnBhY2tfcHVibGljX3BhdGhfXyIsImVudkNvbmZpZyIsInNlcnZlclJ1bnRpbWVDb25maWciLCJwdWJsaWNSdW50aW1lQ29uZmlnIiwicnVudGltZUNvbmZpZyIsImFzUGF0aCIsInJlcXVpcmUiLCJwYXJzZWRBcyIsInBhcnNlUmVsYXRpdmVVcmwiLCJsb2NhbGVQYXRoUmVzdWx0Iiwibm9ybWFsaXplTG9jYWxlUGF0aCIsImZvcm1hdFVybCIsImRldGVjdGVkRG9tYWluIiwiZGV0ZWN0RG9tYWluTG9jYWxlIiwicGFnZUxvYWRlciIsIlBhZ2VMb2FkZXIiLCJyZWdpc3RlciIsInAiLCJzZXRUaW1lb3V0IiwiaGVhZE1hbmFnZXIiLCJhcHBFbGVtZW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJyb3V0ZXIiLCJsb2NhdGlvbiIsImh5ZHJhdGVQcm9wcyIsIlN0cmluZyIsInF1ZXJ5c3RyaW5nIiwiX2giLCJzaGFsbG93IiwiY29tcG9uZW50RGlkVXBkYXRlIiwic2Nyb2xsVG9IYXNoIiwiaGFzaCIsImVsIiwicmVuZGVyIiwiUmVhY3QiLCJDb21wb25lbnQiLCJlbWl0dGVyIiwib3B0cyIsIndlYnBhY2tITVIiLCJhcHBFbnRyeXBvaW50IiwiY29tcG9uZW50IiwiZXhwb3J0cyIsIkNhY2hlZEFwcCIsIm1vZCIsIm9uUGVyZkVudHJ5IiwidW5pcXVlSUQiLCJEYXRlIiwiTWF0aCIsImVudHJpZXMiLCJwZXJmU3RhcnRFbnRyeSIsImlkIiwibmFtZSIsInN0YXJ0VGltZSIsInZhbHVlIiwibGFiZWwiLCJlbnRyeVR5cGUiLCJpbml0aWFsRXJyIiwiZXJyb3IiLCJwYWdlRW50cnlwb2ludCIsIkNhY2hlZENvbXBvbmVudCIsImlzVmFsaWRFbGVtZW50VHlwZSIsIm5vZGUiLCJnZXROb2RlRXJyb3IiLCJpbml0aWFsUHJvcHMiLCJBcHAiLCJ3cmFwQXBwIiwic3Vic2NyaXB0aW9uIiwiT2JqZWN0Iiwic2Nyb2xsIiwibG9jYWxlIiwibG9jYWxlcyIsImRvbWFpbkxvY2FsZXMiLCJpc1ByZXZpZXciLCJyZW5kZXJDdHgiLCJpbml0aWFsIiwicmVuZGVyaW5nUHJvcHMiLCJyZW5kZXJFcnJvciIsImRvUmVuZGVyIiwicmVuZGVyRXJyIiwic3R5bGVTaGVldHMiLCJBcHBUcmVlIiwiYXBwQ3R4IiwiY3R4IiwicGF0aG5hbWUiLCJxdWVyeSIsIlByb21pc2UiLCJyZW5kZXJFcnJvclByb3BzIiwiaW5pdFByb3BzIiwicmVhY3RSb290Iiwic2hvdWxkVXNlSHlkcmF0ZSIsIlJlYWN0RE9NIiwiU1QiLCJwZXJmb3JtYW5jZSIsImNsZWFyTWFya3MiLCJuYXZTdGFydEVudHJpZXMiLCJtZWFzdXJlIiwibWFyayIsIndyYXBwZWRBcHBQcm9wcyIsImFwcFByb3BzIiwiaW5wdXQiLCJsYXN0QXBwUHJvcHMiLCJjYW5jZWxlZCIsInJlbmRlclByb21pc2UiLCJsYXN0UmVuZGVyUmVqZWN0IiwicmVzb2x2ZVByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY3VycmVudFN0eWxlVGFncyIsImN1cnJlbnRIcmVmcyIsInRhZyIsIm5vc2NyaXB0Iiwibm9uY2UiLCJzdHlsZVRhZyIsImVsZW0iLCJvblN0YXJ0IiwicmVuZGVyUmVhY3RFbGVtZW50IiwiY2FsbGJhY2siLCJfX1JFUExBQ0VfTk9PUF9JTVBPUlRfXyIsIkV2ZW50U291cmNlUG9seWZpbGwiLCJfX05FWFRfREFUQV9fIiwiYXNzZXRQcmVmaXgiLCJidWlsZEluZGljYXRvckhhbmRsZXIiLCJmZXRjaCIsInJlcyIsIm1hbmlmZXN0IiwicGFnZXMiLCJjbGVhckluZGljYXRvciIsImRldlBhZ2VzTWFuaWZlc3RMaXN0ZW5lciIsImhhbmRsZXIiLCJyb3V0ZSIsImNvbnN0cnVjdG9yIiwiYnVpbGRJZCIsInByb21pc2VkU3NnTWFuaWZlc3QiLCJwcm9taXNlZERldlBhZ2VzTWFuaWZlc3QiLCJyb3V0ZUxvYWRlciIsImdldFBhZ2VMaXN0Iiwibm9ybWFsaXplUm91dGUiLCJnZXRIcmVmRm9yU2x1ZyIsImRhdGFSb3V0ZSIsInNzZyIsImlzRHluYW1pYyIsImludGVycG9sYXRlZFJvdXRlIiwicyIsImxvYWRQYWdlIiwibyIsImhyZWYiLCJ0ZXh0IiwicHJlZmV0Y2giLCJQb3J0YWwiLCJwb3J0YWxOb2RlIiwiZm9yY2VVcGRhdGUiLCJpbml0aWFsUGF0aExvYWRlZCIsInBhZ2VIZWFkZXIiLCJuZXdSb3V0ZUFubm91bmNlbWVudCIsInNldFJvdXRlQW5ub3VuY2VtZW50IiwiYm9yZGVyIiwiY2xpcCIsImhlaWdodCIsIm1hcmdpbiIsIm92ZXJmbG93IiwicGFkZGluZyIsInBvc2l0aW9uIiwid2lkdGgiLCJ3aGl0ZVNwYWNlIiwid29yZFdyYXAiLCJSb3V0ZUFubm91bmNlciIsIk1TX01BWF9JRExFX0RFTEFZIiwiZW50cnkiLCJtYXAiLCJwcm9tIiwicmVzb2x2ZXIiLCJmdXR1cmUiLCJnZW5lcmF0b3IiLCJsaW5rIiwiY2FuUHJlZmV0Y2giLCJoYXNQcmVmZXRjaCIsIkFTU0VUX0xPQURfRVJST1IiLCJTeW1ib2wiLCJzY3JpcHQiLCJtYXJrQXNzZXRFcnJvciIsImNhbmNlbGxlZCIsInIiLCJvbkJ1aWxkTWFuaWZlc3QiLCJjYiIsInJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQiLCJzY3JpcHRzIiwiZW5jb2RlVVJJIiwiY3NzIiwiZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCIsImFsbEZpbGVzIiwidiIsImVudHJ5cG9pbnRzIiwibG9hZGVkU2NyaXB0cyIsInJvdXRlcyIsImFwcGVuZFNjcmlwdCIsImNvbnRlbnQiLCJ3aGVuRW50cnlwb2ludCIsIndpdGhGdXR1cmUiLCJvbkVudHJ5cG9pbnQiLCJvbGQiLCJsb2FkUm91dGUiLCJnZXRGaWxlc0ZvclJvdXRlIiwiZW50cnlwb2ludCIsInN0eWxlcyIsImNuIiwibmF2aWdhdG9yIiwib3V0cHV0IiwicHJlZmV0Y2hWaWFEb20iLCJjcmVhdGVSb3V0ZUxvYWRlciIsInNpbmdsZXRvblJvdXRlciIsInJlYWR5Q2FsbGJhY2tzIiwicmVhZHkiLCJ1cmxQcm9wZXJ0eUZpZWxkcyIsInJvdXRlckV2ZW50cyIsImNvcmVNZXRob2RGaWVsZHMiLCJnZXQiLCJmaWVsZCIsImdldFJvdXRlciIsImV2ZW50RmllbGQiLCJfc2luZ2xldG9uUm91dGVyIiwibWVzc2FnZSIsIlJvdXRlckNvbnRleHQiLCJjcmVhdGVSb3V0ZXIiLCJfcm91dGVyIiwiaW5zdGFuY2UiLCJBcnJheSIsIkNvbXBvc2VkQ29tcG9uZW50IiwiZ2V0SW5pdGlhbFByb3BzIiwiV2l0aFJvdXRlcldyYXBwZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7QUEvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxJQUFJQSxlQUFlLEdBQW5CO0FBQ0E7O0FBQ2UsMEJBQTBCO0FBQ3ZDQyxZQUFVLENBQVZBO0FBRUEsc0VBQW1EQyxlQUFELEVBQVc7QUFDM0Q7QUFDQSxRQUFJQSxLQUFLLENBQUxBLFNBQUosZ0JBQW1DO0FBQ2pDO0FBRUY7O0FBQUEsUUFBSTtBQUNGQyxvQkFBYyxDQUFkQSxLQUFjLENBQWRBO0FBQ0EsS0FGRixDQUVFLFdBQVc7QUFDWEMsYUFBTyxDQUFQQSxLQUFhLDBCQUEwQkYsS0FBSyxDQUEvQixjQUFiRTtBQUVIO0FBVkQ7QUFZQSxTQUFPO0FBQ0xDLHVCQURLLCtCQUNjLE9BRGQsRUFDd0I7QUFDM0JDLDJCQUFxQixHQUFyQkE7QUFGRztBQUlMQyx3QkFKSyxrQ0FJa0I7QUFDckJQLHFCQUFlLEdBQWZBO0FBTEo7QUFBTyxHQUFQO0FBVUYsQyxDQUFBOzs7QUFDQSxJQUFJUSxrQkFBa0IsR0FBdEI7QUFDQSxJQUFJQyx5QkFBeUIsR0FBN0I7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBcEI7O0FBRUEsK0JBQStCO0FBQzdCO0FBQ0EsTUFBSSxrQ0FBa0MsT0FBT04sT0FBTyxDQUFkLFVBQXRDLFlBQTJFO0FBQ3pFLDBCQUFzQjtBQUNwQkEsYUFBTyxD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QTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEseUIiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svbWFpbi41MDhjZjI5ODE0NWU0NWVlNzllOS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuLy8gVGhpcyBmaWxlIGlzIGEgbW9kaWZpZWQgdmVyc2lvbiBvZiB0aGUgQ3JlYXRlIFJlYWN0IEFwcCBITVIgZGV2IGNsaWVudCB0aGF0XG4vLyBjYW4gYmUgZm91bmQgaGVyZTpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9jcmVhdGUtcmVhY3QtYXBwL2Jsb2IvdjMuNC4xL3BhY2thZ2VzL3JlYWN0LWRldi11dGlscy93ZWJwYWNrSG90RGV2Q2xpZW50LmpzXG5cbmltcG9ydCAqIGFzIERldk92ZXJsYXkgZnJvbSAnQG5leHQvcmVhY3QtZGV2LW92ZXJsYXkvbGliL2NsaWVudCdcbmltcG9ydCBzdHJpcEFuc2kgZnJvbSAnbmV4dC9kaXN0L2NvbXBpbGVkL3N0cmlwLWFuc2knXG5pbXBvcnQgeyBnZXRFdmVudFNvdXJjZVdyYXBwZXIgfSBmcm9tICcuL2V2ZW50c291cmNlJ1xuaW1wb3J0IGZvcm1hdFdlYnBhY2tNZXNzYWdlcyBmcm9tICcuL2Zvcm1hdC13ZWJwYWNrLW1lc3NhZ2VzJ1xuXG4vLyBUaGlzIGFsdGVybmF0aXZlIFdlYnBhY2tEZXZTZXJ2ZXIgY29tYmluZXMgdGhlIGZ1bmN0aW9uYWxpdHkgb2Y6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrLWRldi1zZXJ2ZXIvYmxvYi93ZWJwYWNrLTEvY2xpZW50L2luZGV4LmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrL2Jsb2Ivd2VicGFjay0xL2hvdC9kZXYtc2VydmVyLmpzXG5cbi8vIEl0IG9ubHkgc3VwcG9ydHMgdGhlaXIgc2ltcGxlc3QgY29uZmlndXJhdGlvbiAoaG90IHVwZGF0ZXMgb24gc2FtZSBzZXJ2ZXIpLlxuLy8gSXQgbWFrZXMgc29tZSBvcGluaW9uYXRlZCBjaG9pY2VzIG9uIHRvcCwgbGlrZSBhZGRpbmcgYSBzeW50YXggZXJyb3Igb3ZlcmxheVxuLy8gdGhhdCBsb29rcyBzaW1pbGFyIHRvIG91ciBjb25zb2xlIG91dHB1dC4gVGhlIGVycm9yIG92ZXJsYXkgaXMgaW5zcGlyZWQgYnk6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZ2xlbmphbWluL3dlYnBhY2staG90LW1pZGRsZXdhcmVcblxubGV0IGhhZFJ1bnRpbWVFcnJvciA9IGZhbHNlXG5sZXQgY3VzdG9tSG1yRXZlbnRIYW5kbGVyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25uZWN0KG9wdGlvbnMpIHtcbiAgRGV2T3ZlcmxheS5yZWdpc3RlcigpXG5cbiAgZ2V0RXZlbnRTb3VyY2VXcmFwcGVyKG9wdGlvbnMpLmFkZE1lc3NhZ2VMaXN0ZW5lcigoZXZlbnQpID0+IHtcbiAgICAvLyBUaGlzIGlzIHRoZSBoZWFydGJlYXQgZXZlbnRcbiAgICBpZiAoZXZlbnQuZGF0YSA9PT0gJ1xcdUQ4M0RcXHVEQzkzJykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBwcm9jZXNzTWVzc2FnZShldmVudClcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgY29uc29sZS53YXJuKCdJbnZhbGlkIEhNUiBtZXNzYWdlOiAnICsgZXZlbnQuZGF0YSArICdcXG4nICsgZXgpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgc3Vic2NyaWJlVG9IbXJFdmVudChoYW5kbGVyKSB7XG4gICAgICBjdXN0b21IbXJFdmVudEhhbmRsZXIgPSBoYW5kbGVyXG4gICAgfSxcbiAgICBvblVucmVjb3ZlcmFibGVFcnJvcigpIHtcbiAgICAgIGhhZFJ1bnRpbWVFcnJvciA9IHRydWVcbiAgICB9LFxuICB9XG59XG5cbi8vIFJlbWVtYmVyIHNvbWUgc3RhdGUgcmVsYXRlZCB0byBob3QgbW9kdWxlIHJlcGxhY2VtZW50LlxudmFyIGlzRmlyc3RDb21waWxhdGlvbiA9IHRydWVcbnZhciBtb3N0UmVjZW50Q29tcGlsYXRpb25IYXNoID0gbnVsbFxudmFyIGhhc0NvbXBpbGVFcnJvcnMgPSBmYWxzZVxuXG5mdW5jdGlvbiBjbGVhck91dGRhdGVkRXJyb3JzKCkge1xuICAvLyBDbGVhbiB1cCBvdXRkYXRlZCBjb21waWxlIGVycm9ycywgaWYgYW55LlxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmNsZWFyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGhhc0NvbXBpbGVFcnJvcnMpIHtcbiAgICAgIGNvbnNvbGUuY2xlYXIoKVxuICAgIH1cbiAgfVxufVxuXG4vLyBTdWNjZXNzZnVsIGNvbXBpbGF0aW9uLlxuZnVuY3Rpb24gaGFuZGxlU3VjY2VzcygpIHtcbiAgY2xlYXJPdXRkYXRlZEVycm9ycygpXG5cbiAgY29uc3QgaXNIb3RVcGRhdGUgPSAhaXNGaXJzdENvbXBpbGF0aW9uXG4gIGlzRmlyc3RDb21waWxhdGlvbiA9IGZhbHNlXG4gIGhhc0NvbXBpbGVFcnJvcnMgPSBmYWxzZVxuXG4gIC8vIEF0dGVtcHQgdG8gYXBwbHkgaG90IHVwZGF0ZXMgb3IgcmVsb2FkLlxuICBpZiAoaXNIb3RVcGRhdGUpIHtcbiAgICB0cnlBcHBseVVwZGF0ZXMoZnVuY3Rpb24gb25TdWNjZXNzZnVsSG90VXBkYXRlKGhhc1VwZGF0ZXMpIHtcbiAgICAgIC8vIE9ubHkgZGlzbWlzcyBpdCB3aGVuIHdlJ3JlIHN1cmUgaXQncyBhIGhvdCB1cGRhdGUuXG4gICAgICAvLyBPdGhlcndpc2UgaXQgd291bGQgZmxpY2tlciByaWdodCBiZWZvcmUgdGhlIHJlbG9hZC5cbiAgICAgIG9uRmFzdFJlZnJlc2goaGFzVXBkYXRlcylcbiAgICB9KVxuICB9XG59XG5cbi8vIENvbXBpbGF0aW9uIHdpdGggd2FybmluZ3MgKGUuZy4gRVNMaW50KS5cbmZ1bmN0aW9uIGhhbmRsZVdhcm5pbmdzKHdhcm5pbmdzKSB7XG4gIGNsZWFyT3V0ZGF0ZWRFcnJvcnMoKVxuXG4gIGNvbnN0IGlzSG90VXBkYXRlID0gIWlzRmlyc3RDb21waWxhdGlvblxuICBpc0ZpcnN0Q29tcGlsYXRpb24gPSBmYWxzZVxuICBoYXNDb21waWxlRXJyb3JzID0gZmFsc2VcblxuICBmdW5jdGlvbiBwcmludFdhcm5pbmdzKCkge1xuICAgIC8vIFByaW50IHdhcm5pbmdzIHRvIHRoZSBjb25zb2xlLlxuICAgIGNvbnN0IGZvcm1hdHRlZCA9IGZvcm1hdFdlYnBhY2tNZXNzYWdlcyh7XG4gICAgICB3YXJuaW5nczogd2FybmluZ3MsXG4gICAgICBlcnJvcnM6IFtdLFxuICAgIH0pXG5cbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybWF0dGVkLndhcm5pbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpID09PSA1KSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgJ1RoZXJlIHdlcmUgbW9yZSB3YXJuaW5ncyBpbiBvdGhlciBmaWxlcy5cXG4nICtcbiAgICAgICAgICAgICAgJ1lvdSBjYW4gZmluZCBhIGNvbXBsZXRlIGxvZyBpbiB0aGUgdGVybWluYWwuJ1xuICAgICAgICAgIClcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihzdHJpcEFuc2koZm9ybWF0dGVkLndhcm5pbmdzW2ldKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcmludFdhcm5pbmdzKClcblxuICAvLyBBdHRlbXB0IHRvIGFwcGx5IGhvdCB1cGRhdGVzIG9yIHJlbG9hZC5cbiAgaWYgKGlzSG90VXBkYXRlKSB7XG4gICAgdHJ5QXBwbHlVcGRhdGVzKGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bEhvdFVwZGF0ZShoYXNVcGRhdGVzKSB7XG4gICAgICAvLyBPbmx5IGRpc21pc3MgaXQgd2hlbiB3ZSdyZSBzdXJlIGl0J3MgYSBob3QgdXBkYXRlLlxuICAgICAgLy8gT3RoZXJ3aXNlIGl0IHdvdWxkIGZsaWNrZXIgcmlnaHQgYmVmb3JlIHRoZSByZWxvYWQuXG4gICAgICBvbkZhc3RSZWZyZXNoKGhhc1VwZGF0ZXMpXG4gICAgfSlcbiAgfVxufVxuXG4vLyBDb21waWxhdGlvbiB3aXRoIGVycm9ycyAoZS5nLiBzeW50YXggZXJyb3Igb3IgbWlzc2luZyBtb2R1bGVzKS5cbmZ1bmN0aW9uIGhhbmRsZUVycm9ycyhlcnJvcnMpIHtcbiAgY2xlYXJPdXRkYXRlZEVycm9ycygpXG5cbiAgaXNGaXJzdENvbXBpbGF0aW9uID0gZmFsc2VcbiAgaGFzQ29tcGlsZUVycm9ycyA9IHRydWVcblxuICAvLyBcIk1hc3NhZ2VcIiB3ZWJwYWNrIG1lc3NhZ2VzLlxuICB2YXIgZm9ybWF0dGVkID0gZm9ybWF0V2VicGFja01lc3NhZ2VzKHtcbiAgICBlcnJvcnM6IGVycm9ycyxcbiAgICB3YXJuaW5nczogW10sXG4gIH0pXG5cbiAgLy8gT25seSBzaG93IHRoZSBmaXJzdCBlcnJvci5cbiAgRGV2T3ZlcmxheS5vbkJ1aWxkRXJyb3IoZm9ybWF0dGVkLmVycm9yc1swXSlcblxuICAvLyBBbHNvIGxvZyB0aGVtIHRvIHRoZSBjb25zb2xlLlxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmb3JtYXR0ZWQuZXJyb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zb2xlLmVycm9yKHN0cmlwQW5zaShmb3JtYXR0ZWQuZXJyb3JzW2ldKSlcbiAgICB9XG4gIH1cblxuICAvLyBEbyBub3QgYXR0ZW1wdCB0byByZWxvYWQgbm93LlxuICAvLyBXZSB3aWxsIHJlbG9hZCBvbiBuZXh0IHN1Y2Nlc3MgaW5zdGVhZC5cbiAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9URVNUX01PREUpIHtcbiAgICBpZiAoc2VsZi5fX05FWFRfSE1SX0NCKSB7XG4gICAgICBzZWxmLl9fTkVYVF9ITVJfQ0IoZm9ybWF0dGVkLmVycm9yc1swXSlcbiAgICAgIHNlbGYuX19ORVhUX0hNUl9DQiA9IG51bGxcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gb25GYXN0UmVmcmVzaChoYXNVcGRhdGVzKSB7XG4gIERldk92ZXJsYXkub25CdWlsZE9rKClcbiAgaWYgKGhhc1VwZGF0ZXMpIHtcbiAgICBEZXZPdmVybGF5Lm9uUmVmcmVzaCgpXG4gIH1cblxuICBjb25zb2xlLmxvZygnW0Zhc3QgUmVmcmVzaF0gZG9uZScpXG59XG5cbi8vIFRoZXJlIGlzIGEgbmV3ZXIgdmVyc2lvbiBvZiB0aGUgY29kZSBhdmFpbGFibGUuXG5mdW5jdGlvbiBoYW5kbGVBdmFpbGFibGVIYXNoKGhhc2gpIHtcbiAgLy8gVXBkYXRlIGxhc3Qga25vd24gY29tcGlsYXRpb24gaGFzaC5cbiAgbW9zdFJlY2VudENvbXBpbGF0aW9uSGFzaCA9IGhhc2hcbn1cblxuLy8gSGFuZGxlIG1lc3NhZ2VzIGZyb20gdGhlIHNlcnZlci5cbmZ1bmN0aW9uIHByb2Nlc3NNZXNzYWdlKGUpIHtcbiAgY29uc3Qgb2JqID0gSlNPTi5wYXJzZShlLmRhdGEpXG4gIHN3aXRjaCAob2JqLmFjdGlvbikge1xuICAgIGNhc2UgJ2J1aWxkaW5nJzoge1xuICAgICAgY29uc29sZS5sb2coJ1tGYXN0IFJlZnJlc2hdIHJlYnVpbGRpbmcnKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgY2FzZSAnYnVpbHQnOlxuICAgIGNhc2UgJ3N5bmMnOiB7XG4gICAgICBpZiAob2JqLmhhc2gpIHtcbiAgICAgICAgaGFuZGxlQXZhaWxhYmxlSGFzaChvYmouaGFzaClcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBlcnJvcnMsIHdhcm5pbmdzIH0gPSBvYmpcbiAgICAgIGNvbnN0IGhhc0Vycm9ycyA9IEJvb2xlYW4oZXJyb3JzICYmIGVycm9ycy5sZW5ndGgpXG4gICAgICBpZiAoaGFzRXJyb3JzKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVFcnJvcnMoZXJyb3JzKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoYXNXYXJuaW5ncyA9IEJvb2xlYW4od2FybmluZ3MgJiYgd2FybmluZ3MubGVuZ3RoKVxuICAgICAgaWYgKGhhc1dhcm5pbmdzKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVXYXJuaW5ncyh3YXJuaW5ncylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhhbmRsZVN1Y2Nlc3MoKVxuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICBpZiAoY3VzdG9tSG1yRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgIGN1c3RvbUhtckV2ZW50SGFuZGxlcihvYmopXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxufVxuXG4vLyBJcyB0aGVyZSBhIG5ld2VyIHZlcnNpb24gb2YgdGhpcyBjb2RlIGF2YWlsYWJsZT9cbmZ1bmN0aW9uIGlzVXBkYXRlQXZhaWxhYmxlKCkge1xuICAvKiBnbG9iYWxzIF9fd2VicGFja19oYXNoX18gKi9cbiAgLy8gX193ZWJwYWNrX2hhc2hfXyBpcyB0aGUgaGFzaCBvZiB0aGUgY3VycmVudCBjb21waWxhdGlvbi5cbiAgLy8gSXQncyBhIGdsb2JhbCB2YXJpYWJsZSBpbmplY3RlZCBieSBXZWJwYWNrLlxuICByZXR1cm4gbW9zdFJlY2VudENvbXBpbGF0aW9uSGFzaCAhPT0gX193ZWJwYWNrX2hhc2hfX1xufVxuXG4vLyBXZWJwYWNrIGRpc2FsbG93cyB1cGRhdGVzIGluIG90aGVyIHN0YXRlcy5cbmZ1bmN0aW9uIGNhbkFwcGx5VXBkYXRlcygpIHtcbiAgcmV0dXJuIG1vZHVsZS5ob3Quc3RhdHVzKCkgPT09ICdpZGxlJ1xufVxuZnVuY3Rpb24gYWZ0ZXJBcHBseVVwZGF0ZXMoZm4pIHtcbiAgaWYgKGNhbkFwcGx5VXBkYXRlcygpKSB7XG4gICAgZm4oKVxuICB9IGVsc2Uge1xuICAgIGZ1bmN0aW9uIGhhbmRsZXIoc3RhdHVzKSB7XG4gICAgICBpZiAoc3RhdHVzID09PSAnaWRsZScpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5yZW1vdmVTdGF0dXNIYW5kbGVyKGhhbmRsZXIpXG4gICAgICAgIGZuKClcbiAgICAgIH1cbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hZGRTdGF0dXNIYW5kbGVyKGhhbmRsZXIpXG4gIH1cbn1cblxuLy8gQXR0ZW1wdCB0byB1cGRhdGUgY29kZSBvbiB0aGUgZmx5LCBmYWxsIGJhY2sgdG8gYSBoYXJkIHJlbG9hZC5cbmZ1bmN0aW9uIHRyeUFwcGx5VXBkYXRlcyhvbkhvdFVwZGF0ZVN1Y2Nlc3MpIHtcbiAgaWYgKCFtb2R1bGUuaG90KSB7XG4gICAgLy8gSG90TW9kdWxlUmVwbGFjZW1lbnRQbHVnaW4gaXMgbm90IGluIFdlYnBhY2sgY29uZmlndXJhdGlvbi5cbiAgICBjb25zb2xlLmVycm9yKCdIb3RNb2R1bGVSZXBsYWNlbWVudFBsdWdpbiBpcyBub3QgaW4gV2VicGFjayBjb25maWd1cmF0aW9uLicpXG4gICAgLy8gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKCFpc1VwZGF0ZUF2YWlsYWJsZSgpIHx8ICFjYW5BcHBseVVwZGF0ZXMoKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQXBwbHlVcGRhdGVzKGVyciwgdXBkYXRlZE1vZHVsZXMpIHtcbiAgICBpZiAoZXJyIHx8IGhhZFJ1bnRpbWVFcnJvciB8fCAhdXBkYXRlZE1vZHVsZXMpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdbRmFzdCBSZWZyZXNoXSBwZXJmb3JtaW5nIGZ1bGwgcmVsb2FkXFxuXFxuJyArXG4gICAgICAgICAgICBcIkZhc3QgUmVmcmVzaCB3aWxsIHBlcmZvcm0gYSBmdWxsIHJlbG9hZCB3aGVuIHlvdSBlZGl0IGEgZmlsZSB0aGF0J3MgaW1wb3J0ZWQgYnkgbW9kdWxlcyBvdXRzaWRlIG9mIHRoZSBSZWFjdCByZW5kZXJpbmcgdHJlZS5cXG5cIiArXG4gICAgICAgICAgICAnWW91IG1pZ2h0IGhhdmUgYSBmaWxlIHdoaWNoIGV4cG9ydHMgYSBSZWFjdCBjb21wb25lbnQgYnV0IGFsc28gZXhwb3J0cyBhIHZhbHVlIHRoYXQgaXMgaW1wb3J0ZWQgYnkgYSBub24tUmVhY3QgY29tcG9uZW50IGZpbGUuXFxuJyArXG4gICAgICAgICAgICAnQ29uc2lkZXIgbWlncmF0aW5nIHRoZSBub24tUmVhY3QgY29tcG9uZW50IGV4cG9ydCB0byBhIHNlcGFyYXRlIGZpbGUgYW5kIGltcG9ydGluZyBpdCBpbnRvIGJvdGggZmlsZXMuXFxuXFxuJyArXG4gICAgICAgICAgICAnSXQgaXMgYWxzbyBwb3NzaWJsZSB0aGUgcGFyZW50IGNvbXBvbmVudCBvZiB0aGUgY29tcG9uZW50IHlvdSBlZGl0ZWQgaXMgYSBjbGFzcyBjb21wb25lbnQsIHdoaWNoIGRpc2FibGVzIEZhc3QgUmVmcmVzaC5cXG4nICtcbiAgICAgICAgICAgICdGYXN0IFJlZnJlc2ggcmVxdWlyZXMgYXQgbGVhc3Qgb25lIHBhcmVudCBmdW5jdGlvbiBjb21wb25lbnQgaW4geW91ciBSZWFjdCB0cmVlLidcbiAgICAgICAgKVxuICAgICAgfSBlbHNlIGlmIChoYWRSdW50aW1lRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdbRmFzdCBSZWZyZXNoXSBwZXJmb3JtaW5nIGZ1bGwgcmVsb2FkIGJlY2F1c2UgeW91ciBhcHBsaWNhdGlvbiBoYWQgYW4gdW5yZWNvdmVyYWJsZSBlcnJvcidcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBoYXNVcGRhdGVzID0gQm9vbGVhbih1cGRhdGVkTW9kdWxlcy5sZW5ndGgpXG4gICAgaWYgKHR5cGVvZiBvbkhvdFVwZGF0ZVN1Y2Nlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIE1heWJlIHdlIHdhbnQgdG8gZG8gc29tZXRoaW5nLlxuICAgICAgb25Ib3RVcGRhdGVTdWNjZXNzKGhhc1VwZGF0ZXMpXG4gICAgfVxuXG4gICAgaWYgKGlzVXBkYXRlQXZhaWxhYmxlKCkpIHtcbiAgICAgIC8vIFdoaWxlIHdlIHdlcmUgdXBkYXRpbmcsIHRoZXJlIHdhcyBhIG5ldyB1cGRhdGUhIERvIGl0IGFnYWluLlxuICAgICAgdHJ5QXBwbHlVcGRhdGVzKGhhc1VwZGF0ZXMgPyB1bmRlZmluZWQgOiBvbkhvdFVwZGF0ZVN1Y2Nlc3MpXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfVEVTVF9NT0RFKSB7XG4gICAgICAgIGFmdGVyQXBwbHlVcGRhdGVzKCgpID0+IHtcbiAgICAgICAgICBpZiAoc2VsZi5fX05FWFRfSE1SX0NCKSB7XG4gICAgICAgICAgICBzZWxmLl9fTkVYVF9ITVJfQ0IoKVxuICAgICAgICAgICAgc2VsZi5fX05FWFRfSE1SX0NCID0gbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBodHRwczovL3dlYnBhY2suanMub3JnL2FwaS9ob3QtbW9kdWxlLXJlcGxhY2VtZW50LyNjaGVja1xuICBtb2R1bGUuaG90LmNoZWNrKC8qIGF1dG9BcHBseSAqLyB0cnVlKS50aGVuKFxuICAgICh1cGRhdGVkTW9kdWxlcykgPT4ge1xuICAgICAgaGFuZGxlQXBwbHlVcGRhdGVzKG51bGwsIHVwZGF0ZWRNb2R1bGVzKVxuICAgIH0sXG4gICAgKGVycikgPT4ge1xuICAgICAgaGFuZGxlQXBwbHlVcGRhdGVzKGVyciwgbnVsbClcbiAgICB9XG4gIClcbn1cbiIsImltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInXG5pbXBvcnQgeyBzZXR1cFBpbmcsIGN1cnJlbnRQYWdlLCBjbG9zZVBpbmcgfSBmcm9tICcuL29uLWRlbWFuZC1lbnRyaWVzLXV0aWxzJ1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBhc3NldFByZWZpeCB9KSA9PiB7XG4gIFJvdXRlci5yZWFkeSgoKSA9PiB7XG4gICAgUm91dGVyLmV2ZW50cy5vbihcbiAgICAgICdyb3V0ZUNoYW5nZUNvbXBsZXRlJyxcbiAgICAgIHNldHVwUGluZy5iaW5kKHRoaXMsIGFzc2V0UHJlZml4LCAoKSA9PiBSb3V0ZXIucGF0aG5hbWUpXG4gICAgKVxuICB9KVxuXG4gIHNldHVwUGluZyhhc3NldFByZWZpeCwgKCkgPT4gUm91dGVyLnBhdGhuYW1lLCBjdXJyZW50UGFnZSlcblxuICAvLyBwcmV2ZW50IEhNUiBjb25uZWN0aW9uIGZyb20gYmVpbmcgY2xvc2VkIHdoZW4gcnVubmluZyB0ZXN0c1xuICBpZiAoIXByb2Nlc3MuZW52Ll9fTkVYVF9URVNUX01PREUpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgKF9ldmVudCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBkb2N1bWVudC52aXNpYmlsaXR5U3RhdGVcbiAgICAgIGlmIChzdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICAgIHNldHVwUGluZyhhc3NldFByZWZpeCwgKCkgPT4gUm91dGVyLnBhdGhuYW1lLCB0cnVlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xvc2VQaW5nKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICgpID0+IHtcbiAgICAgIGNsb3NlUGluZygpXG4gICAgfSlcbiAgfVxufVxuIiwiaW1wb3J0IGNvbm5lY3QgZnJvbSAnLi9lcnJvci1vdmVybGF5L2hvdC1kZXYtY2xpZW50J1xuXG5leHBvcnQgZGVmYXVsdCAoeyBhc3NldFByZWZpeCB9KSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgcGF0aDogYCR7YXNzZXRQcmVmaXh9L19uZXh0L3dlYnBhY2staG1yYCxcbiAgfVxuXG4gIGNvbnN0IGRldkNsaWVudCA9IGNvbm5lY3Qob3B0aW9ucylcblxuICBkZXZDbGllbnQuc3Vic2NyaWJlVG9IbXJFdmVudCgob2JqKSA9PiB7XG4gICAgaWYgKG9iai5hY3Rpb24gPT09ICdyZWxvYWRQYWdlJykge1xuICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH1cbiAgICBpZiAob2JqLmFjdGlvbiA9PT0gJ3JlbW92ZWRQYWdlJykge1xuICAgICAgY29uc3QgW3BhZ2VdID0gb2JqLmRhdGFcbiAgICAgIGlmIChwYWdlID09PSB3aW5kb3cubmV4dC5yb3V0ZXIucGF0aG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChvYmouYWN0aW9uID09PSAnYWRkZWRQYWdlJykge1xuICAgICAgY29uc3QgW3BhZ2VdID0gb2JqLmRhdGFcbiAgICAgIGlmIChcbiAgICAgICAgcGFnZSA9PT0gd2luZG93Lm5leHQucm91dGVyLnBhdGhuYW1lICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cubmV4dC5yb3V0ZXIuY29tcG9uZW50c1twYWdlXSA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGFjdGlvbiAnICsgb2JqLmFjdGlvbilcbiAgfSlcblxuICByZXR1cm4gZGV2Q2xpZW50XG59XG4iLCIvKiBnbG9iYWwgbG9jYXRpb24gKi9cbmltcG9ydCAnQG5leHQvcG9seWZpbGwtbW9kdWxlJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IEhlYWRNYW5hZ2VyQ29udGV4dCB9IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9oZWFkLW1hbmFnZXItY29udGV4dCdcbmltcG9ydCBtaXR0LCB7IE1pdHRFbWl0dGVyIH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL21pdHQnXG5pbXBvcnQgeyBSb3V0ZXJDb250ZXh0IH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci1jb250ZXh0J1xuaW1wb3J0IFJvdXRlciwge1xuICBBcHBDb21wb25lbnQsXG4gIEFwcFByb3BzLFxuICBkZWxCYXNlUGF0aCxcbiAgaGFzQmFzZVBhdGgsXG4gIFByaXZhdGVSb3V0ZUluZm8sXG59IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvcm91dGVyJ1xuaW1wb3J0IHsgaXNEeW5hbWljUm91dGUgfSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2lzLWR5bmFtaWMnXG5pbXBvcnQgKiBhcyBxdWVyeXN0cmluZyBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0ICogYXMgZW52Q29uZmlnIGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9ydW50aW1lLWNvbmZpZydcbmltcG9ydCB7XG4gIGdldFVSTCxcbiAgbG9hZEdldEluaXRpYWxQcm9wcyxcbiAgTkVYVF9EQVRBLFxuICBTVCxcbn0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3V0aWxzJ1xuaW1wb3J0IHsgUG9ydGFsIH0gZnJvbSAnLi9wb3J0YWwnXG5pbXBvcnQgaW5pdEhlYWRNYW5hZ2VyIGZyb20gJy4vaGVhZC1tYW5hZ2VyJ1xuaW1wb3J0IFBhZ2VMb2FkZXIsIHsgU3R5bGVTaGVldFR1cGxlIH0gZnJvbSAnLi9wYWdlLWxvYWRlcidcbmltcG9ydCBtZWFzdXJlV2ViVml0YWxzIGZyb20gJy4vcGVyZm9ybWFuY2UtcmVsYXllcidcbmltcG9ydCB7IFJvdXRlQW5ub3VuY2VyIH0gZnJvbSAnLi9yb3V0ZS1hbm5vdW5jZXInXG5pbXBvcnQgeyBjcmVhdGVSb3V0ZXIsIG1ha2VQdWJsaWNSb3V0ZXJJbnN0YW5jZSB9IGZyb20gJy4vcm91dGVyJ1xuXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInJlYWN0LWRvbS9leHBlcmltZW50YWxcIiAvPlxuXG5kZWNsYXJlIGxldCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXzogc3RyaW5nXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgLyogdGVzdCBmbnMgKi9cbiAgICBfX05FWFRfSFlEUkFURUQ/OiBib29sZWFuXG4gICAgX19ORVhUX0hZRFJBVEVEX0NCPzogKCkgPT4gdm9pZFxuXG4gICAgLyogcHJvZCAqL1xuICAgIF9fTkVYVF9QUkVMT0FEUkVBRFk/OiAoaWRzPzogc3RyaW5nW10pID0+IHZvaWRcbiAgICBfX05FWFRfREFUQV9fOiBORVhUX0RBVEFcbiAgICBfX05FWFRfUDogYW55W11cbiAgfVxufVxuXG50eXBlIFJlbmRlclJvdXRlSW5mbyA9IFByaXZhdGVSb3V0ZUluZm8gJiB7XG4gIEFwcDogQXBwQ29tcG9uZW50XG4gIHNjcm9sbD86IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IG51bGxcbn1cbnR5cGUgUmVuZGVyRXJyb3JQcm9wcyA9IE9taXQ8UmVuZGVyUm91dGVJbmZvLCAnQ29tcG9uZW50JyB8ICdzdHlsZVNoZWV0cyc+XG5cbmNvbnN0IGRhdGE6IHR5cGVvZiB3aW5kb3dbJ19fTkVYVF9EQVRBX18nXSA9IEpTT04ucGFyc2UoXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdfX05FWFRfREFUQV9fJykhLnRleHRDb250ZW50IVxuKVxud2luZG93Ll9fTkVYVF9EQVRBX18gPSBkYXRhXG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gcHJvY2Vzcy5lbnYuX19ORVhUX1ZFUlNJT05cblxuY29uc3QgbG9vc2VUb0FycmF5ID0gPFQgZXh0ZW5kcyB7fT4oaW5wdXQ6IGFueSk6IFRbXSA9PiBbXS5zbGljZS5jYWxsKGlucHV0KVxuXG5jb25zdCB7XG4gIHByb3BzOiBoeWRyYXRlUHJvcHMsXG4gIGVycjogaHlkcmF0ZUVycixcbiAgcGFnZSxcbiAgcXVlcnksXG4gIGJ1aWxkSWQsXG4gIGFzc2V0UHJlZml4LFxuICBydW50aW1lQ29uZmlnLFxuICBkeW5hbWljSWRzLFxuICBpc0ZhbGxiYWNrLFxuICBsb2NhbGUsXG4gIGxvY2FsZXMsXG4gIGRvbWFpbkxvY2FsZXMsXG4gIGlzUHJldmlldyxcbn0gPSBkYXRhXG5cbmxldCB7IGRlZmF1bHRMb2NhbGUgfSA9IGRhdGFcblxuY29uc3QgcHJlZml4OiBzdHJpbmcgPSBhc3NldFByZWZpeCB8fCAnJ1xuXG4vLyBXaXRoIGR5bmFtaWMgYXNzZXRQcmVmaXggaXQncyBubyBsb25nZXIgcG9zc2libGUgdG8gc2V0IGFzc2V0UHJlZml4IGF0IHRoZSBidWlsZCB0aW1lXG4vLyBTbywgdGhpcyBpcyBob3cgd2UgZG8gaXQgaW4gdGhlIGNsaWVudCBzaWRlIGF0IHJ1bnRpbWVcbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gYCR7cHJlZml4fS9fbmV4dC9gIC8vZXNsaW50LWRpc2FibGUtbGluZVxuLy8gSW5pdGlhbGl6ZSBuZXh0L2NvbmZpZyB3aXRoIHRoZSBlbnZpcm9ubWVudCBjb25maWd1cmF0aW9uXG5lbnZDb25maWcuc2V0Q29uZmlnKHtcbiAgc2VydmVyUnVudGltZUNvbmZpZzoge30sXG4gIHB1YmxpY1J1bnRpbWVDb25maWc6IHJ1bnRpbWVDb25maWcgfHwge30sXG59KVxuXG5sZXQgYXNQYXRoOiBzdHJpbmcgPSBnZXRVUkwoKVxuXG4vLyBtYWtlIHN1cmUgbm90IHRvIGF0dGVtcHQgc3RyaXBwaW5nIGJhc2VQYXRoIGZvciA0MDRzXG5pZiAoaGFzQmFzZVBhdGgoYXNQYXRoKSkge1xuICBhc1BhdGggPSBkZWxCYXNlUGF0aChhc1BhdGgpXG59XG5cbmlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gIGNvbnN0IHtcbiAgICBub3JtYWxpemVMb2NhbGVQYXRoLFxuICB9ID0gcmVxdWlyZSgnLi4vbmV4dC1zZXJ2ZXIvbGliL2kxOG4vbm9ybWFsaXplLWxvY2FsZS1wYXRoJykgYXMgdHlwZW9mIGltcG9ydCgnLi4vbmV4dC1zZXJ2ZXIvbGliL2kxOG4vbm9ybWFsaXplLWxvY2FsZS1wYXRoJylcblxuICBjb25zdCB7XG4gICAgZGV0ZWN0RG9tYWluTG9jYWxlLFxuICB9ID0gcmVxdWlyZSgnLi4vbmV4dC1zZXJ2ZXIvbGliL2kxOG4vZGV0ZWN0LWRvbWFpbi1sb2NhbGUnKSBhcyB0eXBlb2YgaW1wb3J0KCcuLi9uZXh0LXNlcnZlci9saWIvaTE4bi9kZXRlY3QtZG9tYWluLWxvY2FsZScpXG5cbiAgY29uc3Qge1xuICAgIHBhcnNlUmVsYXRpdmVVcmwsXG4gIH0gPSByZXF1aXJlKCcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3BhcnNlLXJlbGF0aXZlLXVybCcpIGFzIHR5cGVvZiBpbXBvcnQoJy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsJylcblxuICBjb25zdCB7XG4gICAgZm9ybWF0VXJsLFxuICB9ID0gcmVxdWlyZSgnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9mb3JtYXQtdXJsJykgYXMgdHlwZW9mIGltcG9ydCgnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9mb3JtYXQtdXJsJylcblxuICBpZiAobG9jYWxlcykge1xuICAgIGNvbnN0IHBhcnNlZEFzID0gcGFyc2VSZWxhdGl2ZVVybChhc1BhdGgpXG4gICAgY29uc3QgbG9jYWxlUGF0aFJlc3VsdCA9IG5vcm1hbGl6ZUxvY2FsZVBhdGgocGFyc2VkQXMucGF0aG5hbWUsIGxvY2FsZXMpXG5cbiAgICBpZiAobG9jYWxlUGF0aFJlc3VsdC5kZXRlY3RlZExvY2FsZSkge1xuICAgICAgcGFyc2VkQXMucGF0aG5hbWUgPSBsb2NhbGVQYXRoUmVzdWx0LnBhdGhuYW1lXG4gICAgICBhc1BhdGggPSBmb3JtYXRVcmwocGFyc2VkQXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRlcml2ZSB0aGUgZGVmYXVsdCBsb2NhbGUgaWYgaXQgd2Fzbid0IGRldGVjdGVkIGluIHRoZSBhc1BhdGhcbiAgICAgIC8vIHNpbmNlIHdlIGRvbid0IHByZXJlbmRlciBzdGF0aWMgcGFnZXMgd2l0aCBhbGwgcG9zc2libGUgZGVmYXVsdFxuICAgICAgLy8gbG9jYWxlc1xuICAgICAgZGVmYXVsdExvY2FsZSA9IGxvY2FsZVxuICAgIH1cblxuICAgIC8vIGF0dGVtcHQgZGV0ZWN0aW5nIGRlZmF1bHQgbG9jYWxlIGJhc2VkIG9uIGhvc3RuYW1lXG4gICAgY29uc3QgZGV0ZWN0ZWREb21haW4gPSBkZXRlY3REb21haW5Mb2NhbGUoXG4gICAgICBwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9ET01BSU5TIGFzIGFueSxcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZVxuICAgIClcblxuICAgIC8vIFRPRE86IGludmVzdGlnYXRlIGlmIGRlZmF1bHRMb2NhbGUgbmVlZHMgdG8gYmUgcG9wdWxhdGVkIGFmdGVyXG4gICAgLy8gaHlkcmF0aW9uIHRvIHByZXZlbnQgbWlzbWF0Y2hlZCByZW5kZXJzXG4gICAgaWYgKGRldGVjdGVkRG9tYWluKSB7XG4gICAgICBkZWZhdWx0TG9jYWxlID0gZGV0ZWN0ZWREb21haW4uZGVmYXVsdExvY2FsZVxuICAgIH1cbiAgfVxufVxuXG5pZiAocHJvY2Vzcy5lbnYuX19ORVhUX1NDUklQVF9MT0FERVIgJiYgZGF0YS5zY3JpcHRMb2FkZXIpIHtcbiAgY29uc3QgeyBpbml0U2NyaXB0TG9hZGVyIH0gPSByZXF1aXJlKCcuL2V4cGVyaW1lbnRhbC1zY3JpcHQnKVxuICBpbml0U2NyaXB0TG9hZGVyKGRhdGEuc2NyaXB0TG9hZGVyKVxufVxuXG50eXBlIFJlZ2lzdGVyRm4gPSAoaW5wdXQ6IFtzdHJpbmcsICgpID0+IHZvaWRdKSA9PiB2b2lkXG5cbmNvbnN0IHBhZ2VMb2FkZXI6IFBhZ2VMb2FkZXIgPSBuZXcgUGFnZUxvYWRlcihidWlsZElkLCBwcmVmaXgpXG5jb25zdCByZWdpc3RlcjogUmVnaXN0ZXJGbiA9IChbciwgZl0pID0+XG4gIHBhZ2VMb2FkZXIucm91dGVMb2FkZXIub25FbnRyeXBvaW50KHIsIGYpXG5pZiAod2luZG93Ll9fTkVYVF9QKSB7XG4gIC8vIERlZmVyIHBhZ2UgcmVnaXN0cmF0aW9uIGZvciBhbm90aGVyIHRpY2suIFRoaXMgd2lsbCBpbmNyZWFzZSB0aGUgb3ZlcmFsbFxuICAvLyBsYXRlbmN5IGluIGh5ZHJhdGluZyB0aGUgcGFnZSwgYnV0IHJlZHVjZSB0aGUgdG90YWwgYmxvY2tpbmcgdGltZS5cbiAgd2luZG93Ll9fTkVYVF9QLm1hcCgocCkgPT4gc2V0VGltZW91dCgoKSA9PiByZWdpc3RlcihwKSwgMCkpXG59XG53aW5kb3cuX19ORVhUX1AgPSBbXVxuOyh3aW5kb3cuX19ORVhUX1AgYXMgYW55KS5wdXNoID0gcmVnaXN0ZXJcblxuY29uc3QgaGVhZE1hbmFnZXI6IHtcbiAgbW91bnRlZEluc3RhbmNlczogU2V0PHVua25vd24+XG4gIHVwZGF0ZUhlYWQ6IChoZWFkOiBKU1guRWxlbWVudFtdKSA9PiB2b2lkXG59ID0gaW5pdEhlYWRNYW5hZ2VyKClcbmNvbnN0IGFwcEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdfX25leHQnKVxuXG5sZXQgbGFzdFJlbmRlclJlamVjdDogKCgpID0+IHZvaWQpIHwgbnVsbFxubGV0IHdlYnBhY2tITVI6IGFueVxuZXhwb3J0IGxldCByb3V0ZXI6IFJvdXRlclxubGV0IENhY2hlZEFwcDogQXBwQ29tcG9uZW50LCBvblBlcmZFbnRyeTogKG1ldHJpYzogYW55KSA9PiB2b2lkXG5cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7XG4gIGZuOiAoZXJyOiBFcnJvciwgaW5mbz86IGFueSkgPT4gdm9pZFxufT4ge1xuICBjb21wb25lbnREaWRDYXRjaChjb21wb25lbnRFcnI6IEVycm9yLCBpbmZvOiBhbnkpIHtcbiAgICB0aGlzLnByb3BzLmZuKGNvbXBvbmVudEVyciwgaW5mbylcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2Nyb2xsVG9IYXNoKClcblxuICAgIC8vIFdlIG5lZWQgdG8gcmVwbGFjZSB0aGUgcm91dGVyIHN0YXRlIGlmOlxuICAgIC8vIC0gdGhlIHBhZ2Ugd2FzIChhdXRvKSBleHBvcnRlZCBhbmQgaGFzIGEgcXVlcnkgc3RyaW5nIG9yIHNlYXJjaCAoaGFzaClcbiAgICAvLyAtIGl0IHdhcyBhdXRvIGV4cG9ydGVkIGFuZCBpcyBhIGR5bmFtaWMgcm91dGUgKHRvIHByb3ZpZGUgcGFyYW1zKVxuICAgIC8vIC0gaWYgaXQgaXMgYSBjbGllbnQtc2lkZSBza2VsZXRvbiAoZmFsbGJhY2sgcmVuZGVyKVxuICAgIGlmIChcbiAgICAgIHJvdXRlci5pc1NzciAmJlxuICAgICAgKGlzRmFsbGJhY2sgfHxcbiAgICAgICAgKGRhdGEubmV4dEV4cG9ydCAmJlxuICAgICAgICAgIChpc0R5bmFtaWNSb3V0ZShyb3V0ZXIucGF0aG5hbWUpIHx8IGxvY2F0aW9uLnNlYXJjaCkpIHx8XG4gICAgICAgIChoeWRyYXRlUHJvcHMgJiYgaHlkcmF0ZVByb3BzLl9fTl9TU0cgJiYgbG9jYXRpb24uc2VhcmNoKSlcbiAgICApIHtcbiAgICAgIC8vIHVwZGF0ZSBxdWVyeSBvbiBtb3VudCBmb3IgZXhwb3J0ZWQgcGFnZXNcbiAgICAgIHJvdXRlci5yZXBsYWNlKFxuICAgICAgICByb3V0ZXIucGF0aG5hbWUgK1xuICAgICAgICAgICc/JyArXG4gICAgICAgICAgU3RyaW5nKFxuICAgICAgICAgICAgcXVlcnlzdHJpbmcuYXNzaWduKFxuICAgICAgICAgICAgICBxdWVyeXN0cmluZy51cmxRdWVyeVRvU2VhcmNoUGFyYW1zKHJvdXRlci5xdWVyeSksXG4gICAgICAgICAgICAgIG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgIGFzUGF0aCxcbiAgICAgICAge1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAvLyBXQVJOSU5HOiBgX2hgIGlzIGFuIGludGVybmFsIG9wdGlvbiBmb3IgaGFuZGluZyBOZXh0LmpzXG4gICAgICAgICAgLy8gY2xpZW50LXNpZGUgaHlkcmF0aW9uLiBZb3VyIGFwcCBzaG91bGQgX25ldmVyXyB1c2UgdGhpcyBwcm9wZXJ0eS5cbiAgICAgICAgICAvLyBJdCBtYXkgY2hhbmdlIGF0IGFueSB0aW1lIHdpdGhvdXQgbm90aWNlLlxuICAgICAgICAgIF9oOiAxLFxuICAgICAgICAgIC8vIEZhbGxiYWNrIHBhZ2VzIG11c3QgdHJpZ2dlciB0aGUgZGF0YSBmZXRjaCwgc28gdGhlIHRyYW5zaXRpb24gaXNcbiAgICAgICAgICAvLyBub3Qgc2hhbGxvdy5cbiAgICAgICAgICAvLyBPdGhlciBwYWdlcyAoc3RyaWN0bHkgdXBkYXRpbmcgcXVlcnkpIGhhcHBlbnMgc2hhbGxvd2x5LCBhcyBkYXRhXG4gICAgICAgICAgLy8gcmVxdWlyZW1lbnRzIHdvdWxkIGFscmVhZHkgYmUgcHJlc2VudC5cbiAgICAgICAgICBzaGFsbG93OiAhaXNGYWxsYmFjayxcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLnNjcm9sbFRvSGFzaCgpXG4gIH1cblxuICBzY3JvbGxUb0hhc2goKSB7XG4gICAgbGV0IHsgaGFzaCB9ID0gbG9jYXRpb25cbiAgICBoYXNoID0gaGFzaCAmJiBoYXNoLnN1YnN0cmluZygxKVxuICAgIGlmICghaGFzaCkgcmV0dXJuXG5cbiAgICBjb25zdCBlbDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaClcbiAgICBpZiAoIWVsKSByZXR1cm5cblxuICAgIC8vIElmIHdlIGNhbGwgc2Nyb2xsSW50b1ZpZXcoKSBpbiBoZXJlIHdpdGhvdXQgYSBzZXRUaW1lb3V0XG4gICAgLy8gaXQgd29uJ3Qgc2Nyb2xsIHByb3Blcmx5LlxuICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuc2Nyb2xsSW50b1ZpZXcoKSwgMClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyBSZWFjdERldk92ZXJsYXkgfSA9IHJlcXVpcmUoJ0BuZXh0L3JlYWN0LWRldi1vdmVybGF5L2xpYi9jbGllbnQnKVxuICAgICAgcmV0dXJuIDxSZWFjdERldk92ZXJsYXk+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9SZWFjdERldk92ZXJsYXk+XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBlbWl0dGVyOiBNaXR0RW1pdHRlciA9IG1pdHQoKVxubGV0IENhY2hlZENvbXBvbmVudDogUmVhY3QuQ29tcG9uZW50VHlwZVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAob3B0czogeyB3ZWJwYWNrSE1SPzogYW55IH0gPSB7fSkgPT4ge1xuICAvLyBUaGlzIG1ha2VzIHN1cmUgdGhpcyBzcGVjaWZpYyBsaW5lcyBhcmUgcmVtb3ZlZCBpbiBwcm9kdWN0aW9uXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIHdlYnBhY2tITVIgPSBvcHRzLndlYnBhY2tITVJcbiAgfVxuXG4gIGNvbnN0IGFwcEVudHJ5cG9pbnQgPSBhd2FpdCBwYWdlTG9hZGVyLnJvdXRlTG9hZGVyLndoZW5FbnRyeXBvaW50KCcvX2FwcCcpXG4gIGlmICgnZXJyb3InIGluIGFwcEVudHJ5cG9pbnQpIHtcbiAgICB0aHJvdyBhcHBFbnRyeXBvaW50LmVycm9yXG4gIH1cblxuICBjb25zdCB7IGNvbXBvbmVudDogYXBwLCBleHBvcnRzOiBtb2QgfSA9IGFwcEVudHJ5cG9pbnRcbiAgQ2FjaGVkQXBwID0gYXBwIGFzIEFwcENvbXBvbmVudFxuXG4gIGlmIChtb2QgJiYgbW9kLnJlcG9ydFdlYlZpdGFscykge1xuICAgIG9uUGVyZkVudHJ5ID0gKHtcbiAgICAgIGlkLFxuICAgICAgbmFtZSxcbiAgICAgIHN0YXJ0VGltZSxcbiAgICAgIHZhbHVlLFxuICAgICAgZHVyYXRpb24sXG4gICAgICBlbnRyeVR5cGUsXG4gICAgICBlbnRyaWVzLFxuICAgIH0pOiB2b2lkID0+IHtcbiAgICAgIC8vIENvbWJpbmVzIHRpbWVzdGFtcCB3aXRoIHJhbmRvbSBudW1iZXIgZm9yIHVuaXF1ZSBJRFxuICAgICAgY29uc3QgdW5pcXVlSUQ6IHN0cmluZyA9IGAke0RhdGUubm93KCl9LSR7XG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg5ZTEyIC0gMSkpICsgMWUxMlxuICAgICAgfWBcbiAgICAgIGxldCBwZXJmU3RhcnRFbnRyeTogc3RyaW5nIHwgdW5kZWZpbmVkXG5cbiAgICAgIGlmIChlbnRyaWVzICYmIGVudHJpZXMubGVuZ3RoKSB7XG4gICAgICAgIHBlcmZTdGFydEVudHJ5ID0gZW50cmllc1swXS5zdGFydFRpbWVcbiAgICAgIH1cblxuICAgICAgbW9kLnJlcG9ydFdlYlZpdGFscyh7XG4gICAgICAgIGlkOiBpZCB8fCB1bmlxdWVJRCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc3RhcnRUaW1lOiBzdGFydFRpbWUgfHwgcGVyZlN0YXJ0RW50cnksXG4gICAgICAgIHZhbHVlOiB2YWx1ZSA9PSBudWxsID8gZHVyYXRpb24gOiB2YWx1ZSxcbiAgICAgICAgbGFiZWw6XG4gICAgICAgICAgZW50cnlUeXBlID09PSAnbWFyaycgfHwgZW50cnlUeXBlID09PSAnbWVhc3VyZSdcbiAgICAgICAgICAgID8gJ2N1c3RvbSdcbiAgICAgICAgICAgIDogJ3dlYi12aXRhbCcsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGxldCBpbml0aWFsRXJyID0gaHlkcmF0ZUVyclxuXG4gIHRyeSB7XG4gICAgY29uc3QgcGFnZUVudHJ5cG9pbnQgPVxuICAgICAgLy8gVGhlIGRldiBzZXJ2ZXIgZmFpbHMgdG8gc2VydmUgc2NyaXB0IGFzc2V0cyB3aGVuIHRoZXJlJ3MgYSBoeWRyYXRpb25cbiAgICAgIC8vIGVycm9yLCBzbyB3ZSBuZWVkIHRvIHNraXAgd2FpdGluZyBmb3IgdGhlIGVudHJ5cG9pbnQuXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyAmJiBoeWRyYXRlRXJyXG4gICAgICAgID8geyBlcnJvcjogaHlkcmF0ZUVyciB9XG4gICAgICAgIDogYXdhaXQgcGFnZUxvYWRlci5yb3V0ZUxvYWRlci53aGVuRW50cnlwb2ludChwYWdlKVxuICAgIGlmICgnZXJyb3InIGluIHBhZ2VFbnRyeXBvaW50KSB7XG4gICAgICB0aHJvdyBwYWdlRW50cnlwb2ludC5lcnJvclxuICAgIH1cbiAgICBDYWNoZWRDb21wb25lbnQgPSBwYWdlRW50cnlwb2ludC5jb21wb25lbnRcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBjb25zdCB7IGlzVmFsaWRFbGVtZW50VHlwZSB9ID0gcmVxdWlyZSgncmVhY3QtaXMnKVxuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudFR5cGUoQ2FjaGVkQ29tcG9uZW50KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFRoZSBkZWZhdWx0IGV4cG9ydCBpcyBub3QgYSBSZWFjdCBDb21wb25lbnQgaW4gcGFnZTogXCIke3BhZ2V9XCJgXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gVGhpcyBjYXRjaGVzIGVycm9ycyBsaWtlIHRocm93aW5nIGluIHRoZSB0b3AgbGV2ZWwgb2YgYSBtb2R1bGVcbiAgICBpbml0aWFsRXJyID0gZXJyb3JcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIGNvbnN0IHsgZ2V0Tm9kZUVycm9yIH0gPSByZXF1aXJlKCdAbmV4dC9yZWFjdC1kZXYtb3ZlcmxheS9saWIvY2xpZW50JylcbiAgICAvLyBTZXJ2ZXItc2lkZSBydW50aW1lIGVycm9ycyBuZWVkIHRvIGJlIHJlLXRocm93biBvbiB0aGUgY2xpZW50LXNpZGUgc29cbiAgICAvLyB0aGF0IHRoZSBvdmVybGF5IGlzIHJlbmRlcmVkLlxuICAgIGlmIChpbml0aWFsRXJyKSB7XG4gICAgICBpZiAoaW5pdGlhbEVyciA9PT0gaHlkcmF0ZUVycikge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBsZXQgZXJyb3JcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gR2VuZXJhdGUgYSBuZXcgZXJyb3Igb2JqZWN0LiBXZSBgdGhyb3dgIGl0IGJlY2F1c2Ugc29tZSBicm93c2Vyc1xuICAgICAgICAgICAgLy8gd2lsbCBzZXQgdGhlIGBzdGFja2Agd2hlbiB0aHJvd24sIGFuZCB3ZSB3YW50IHRvIGVuc3VyZSBvdXJzIGlzXG4gICAgICAgICAgICAvLyBub3Qgb3ZlcnJpZGRlbiB3aGVuIHdlIHJlLXRocm93IGl0IGJlbG93LlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluaXRpYWxFcnIhLm1lc3NhZ2UpXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZXJyb3IgPSBlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXJyb3IubmFtZSA9IGluaXRpYWxFcnIhLm5hbWVcbiAgICAgICAgICBlcnJvci5zdGFjayA9IGluaXRpYWxFcnIhLnN0YWNrXG5cbiAgICAgICAgICBjb25zdCBub2RlID0gZ2V0Tm9kZUVycm9yKGVycm9yKVxuICAgICAgICAgIHRocm93IG5vZGVcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIC8vIFdlIHJlcGxhY2VkIHRoZSBzZXJ2ZXItc2lkZSBlcnJvciB3aXRoIGEgY2xpZW50LXNpZGUgZXJyb3IsIGFuZCBzaG91bGRcbiAgICAgIC8vIG5vIGxvbmdlciByZXdyaXRlIHRoZSBzdGFjayB0cmFjZSB0byBhIE5vZGUgZXJyb3IuXG4gICAgICBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhyb3cgaW5pdGlhbEVyclxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICh3aW5kb3cuX19ORVhUX1BSRUxPQURSRUFEWSkge1xuICAgIGF3YWl0IHdpbmRvdy5fX05FWFRfUFJFTE9BRFJFQURZKGR5bmFtaWNJZHMpXG4gIH1cblxuICByb3V0ZXIgPSBjcmVhdGVSb3V0ZXIocGFnZSwgcXVlcnksIGFzUGF0aCwge1xuICAgIGluaXRpYWxQcm9wczogaHlkcmF0ZVByb3BzLFxuICAgIHBhZ2VMb2FkZXIsXG4gICAgQXBwOiBDYWNoZWRBcHAsXG4gICAgQ29tcG9uZW50OiBDYWNoZWRDb21wb25lbnQsXG4gICAgd3JhcEFwcCxcbiAgICBlcnI6IGluaXRpYWxFcnIsXG4gICAgaXNGYWxsYmFjazogQm9vbGVhbihpc0ZhbGxiYWNrKSxcbiAgICBzdWJzY3JpcHRpb246IChpbmZvLCBBcHAsIHNjcm9sbCkgPT5cbiAgICAgIHJlbmRlcihcbiAgICAgICAgT2JqZWN0LmFzc2lnbjxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBPbWl0PFJlbmRlclJvdXRlSW5mbywgJ0FwcCcgfCAnc2Nyb2xsJz4sXG4gICAgICAgICAgUGljazxSZW5kZXJSb3V0ZUluZm8sICdBcHAnIHwgJ3Njcm9sbCc+XG4gICAgICAgID4oe30sIGluZm8sIHtcbiAgICAgICAgICBBcHAsXG4gICAgICAgICAgc2Nyb2xsLFxuICAgICAgICB9KSBhcyBSZW5kZXJSb3V0ZUluZm9cbiAgICAgICksXG4gICAgbG9jYWxlLFxuICAgIGxvY2FsZXMsXG4gICAgZGVmYXVsdExvY2FsZSxcbiAgICBkb21haW5Mb2NhbGVzLFxuICAgIGlzUHJldmlldyxcbiAgfSlcblxuICAvLyBjYWxsIGluaXQtY2xpZW50IG1pZGRsZXdhcmVcbiAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9QTFVHSU5TKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIGltcG9ydCgnbmV4dC1wbHVnaW4tbG9hZGVyP21pZGRsZXdhcmU9b24taW5pdC1jbGllbnQhJylcbiAgICAgIC50aGVuKChpbml0Q2xpZW50TW9kdWxlKSA9PiB7XG4gICAgICAgIHJldHVybiBpbml0Q2xpZW50TW9kdWxlLmRlZmF1bHQoeyByb3V0ZXIgfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGluaXRDbGllbnRFcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2FsbGluZyBjbGllbnQtaW5pdCBmb3IgcGx1Z2lucycsIGluaXRDbGllbnRFcnIpXG4gICAgICB9KVxuICB9XG5cbiAgY29uc3QgcmVuZGVyQ3R4OiBSZW5kZXJSb3V0ZUluZm8gPSB7XG4gICAgQXBwOiBDYWNoZWRBcHAsXG4gICAgaW5pdGlhbDogdHJ1ZSxcbiAgICBDb21wb25lbnQ6IENhY2hlZENvbXBvbmVudCxcbiAgICBwcm9wczogaHlkcmF0ZVByb3BzLFxuICAgIGVycjogaW5pdGlhbEVycixcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcmVuZGVyKHJlbmRlckN0eClcbiAgICByZXR1cm4gZW1pdHRlclxuICB9IGVsc2Uge1xuICAgIHJldHVybiB7IGVtaXR0ZXIsIHJlbmRlciwgcmVuZGVyQ3R4IH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVuZGVyKHJlbmRlcmluZ1Byb3BzOiBSZW5kZXJSb3V0ZUluZm8pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKHJlbmRlcmluZ1Byb3BzLmVycikge1xuICAgIGF3YWl0IHJlbmRlckVycm9yKHJlbmRlcmluZ1Byb3BzKVxuICAgIHJldHVyblxuICB9XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBkb1JlbmRlcihyZW5kZXJpbmdQcm9wcylcbiAgfSBjYXRjaCAocmVuZGVyRXJyKSB7XG4gICAgLy8gYnViYmxlIHVwIGNhbmNlbGF0aW9uIGVycm9yc1xuICAgIGlmIChyZW5kZXJFcnIuY2FuY2VsbGVkKSB7XG4gICAgICB0aHJvdyByZW5kZXJFcnJcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIC8vIEVuc3VyZSB0aGlzIGVycm9yIGlzIGRpc3BsYXllZCBpbiB0aGUgb3ZlcmxheSBpbiBkZXZlbG9wbWVudFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRocm93IHJlbmRlckVyclxuICAgICAgfSlcbiAgICB9XG4gICAgYXdhaXQgcmVuZGVyRXJyb3IoeyAuLi5yZW5kZXJpbmdQcm9wcywgZXJyOiByZW5kZXJFcnIgfSlcbiAgfVxufVxuXG4vLyBUaGlzIG1ldGhvZCBoYW5kbGVzIGFsbCBydW50aW1lIGFuZCBkZWJ1ZyBlcnJvcnMuXG4vLyA0MDQgYW5kIDUwMCBlcnJvcnMgYXJlIHNwZWNpYWwga2luZCBvZiBlcnJvcnNcbi8vIGFuZCB0aGV5IGFyZSBzdGlsbCBoYW5kbGUgdmlhIHRoZSBtYWluIHJlbmRlciBtZXRob2QuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyRXJyb3IocmVuZGVyRXJyb3JQcm9wczogUmVuZGVyRXJyb3JQcm9wcyk6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHsgQXBwLCBlcnIgfSA9IHJlbmRlckVycm9yUHJvcHNcblxuICAvLyBJbiBkZXZlbG9wbWVudCBydW50aW1lIGVycm9ycyBhcmUgY2F1Z2h0IGJ5IG91ciBvdmVybGF5XG4gIC8vIEluIHByb2R1Y3Rpb24gd2UgY2F0Y2ggcnVudGltZSBlcnJvcnMgdXNpbmcgY29tcG9uZW50RGlkQ2F0Y2ggd2hpY2ggd2lsbCB0cmlnZ2VyIHJlbmRlckVycm9yXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gQSBOZXh0LmpzIHJlbmRlcmluZyBydW50aW1lIGVycm9yIGlzIGFsd2F5cyB1bnJlY292ZXJhYmxlXG4gICAgLy8gRklYTUU6IGxldCdzIG1ha2UgdGhpcyByZWNvdmVyYWJsZSAoZXJyb3IgaW4gR0lQIGNsaWVudC10cmFuc2l0aW9uKVxuICAgIHdlYnBhY2tITVIub25VbnJlY292ZXJhYmxlRXJyb3IoKVxuXG4gICAgLy8gV2UgbmVlZCB0byByZW5kZXIgYW4gZW1wdHkgPEFwcD4gc28gdGhhdCB0aGUgYDxSZWFjdERldk92ZXJsYXk+YCBjYW5cbiAgICAvLyByZW5kZXIgaXRzZWxmLlxuICAgIHJldHVybiBkb1JlbmRlcih7XG4gICAgICBBcHA6ICgpID0+IG51bGwsXG4gICAgICBwcm9wczoge30sXG4gICAgICBDb21wb25lbnQ6ICgpID0+IG51bGwsXG4gICAgICBzdHlsZVNoZWV0czogW10sXG4gICAgfSlcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX1BMVUdJTlMpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgaW1wb3J0KCduZXh0LXBsdWdpbi1sb2FkZXI/bWlkZGxld2FyZT1vbi1lcnJvci1jbGllbnQhJylcbiAgICAgIC50aGVuKChvbkNsaWVudEVycm9yTW9kdWxlKSA9PiB7XG4gICAgICAgIHJldHVybiBvbkNsaWVudEVycm9yTW9kdWxlLmRlZmF1bHQoeyBlcnIgfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKG9uQ2xpZW50RXJyb3JFcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAnZXJyb3IgY2FsbGluZyBvbi1lcnJvci1jbGllbnQgZm9yIHBsdWdpbnMnLFxuICAgICAgICAgIG9uQ2xpZW50RXJyb3JFcnJcbiAgICAgICAgKVxuICAgICAgfSlcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSB3ZSBsb2cgdGhlIGVycm9yIHRvIHRoZSBjb25zb2xlLCBvdGhlcndpc2UgdXNlcnMgY2FuJ3QgdHJhY2sgZG93biBpc3N1ZXMuXG4gIGNvbnNvbGUuZXJyb3IoZXJyKVxuICByZXR1cm4gcGFnZUxvYWRlclxuICAgIC5sb2FkUGFnZSgnL19lcnJvcicpXG4gICAgLnRoZW4oKHsgcGFnZTogRXJyb3JDb21wb25lbnQsIHN0eWxlU2hlZXRzIH0pID0+IHtcbiAgICAgIC8vIEluIHByb2R1Y3Rpb24gd2UgZG8gYSBub3JtYWwgcmVuZGVyIHdpdGggdGhlIGBFcnJvckNvbXBvbmVudGAgYXMgY29tcG9uZW50LlxuICAgICAgLy8gSWYgd2UndmUgZ290dGVuIGhlcmUgdXBvbiBpbml0aWFsIHJlbmRlciwgd2UgY2FuIHVzZSB0aGUgcHJvcHMgZnJvbSB0aGUgc2VydmVyLlxuICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBuZWVkIHRvIGNhbGwgYGdldEluaXRpYWxQcm9wc2Agb24gYEFwcGAgYmVmb3JlIG1vdW50aW5nLlxuICAgICAgY29uc3QgQXBwVHJlZSA9IHdyYXBBcHAoQXBwKVxuICAgICAgY29uc3QgYXBwQ3R4ID0ge1xuICAgICAgICBDb21wb25lbnQ6IEVycm9yQ29tcG9uZW50LFxuICAgICAgICBBcHBUcmVlLFxuICAgICAgICByb3V0ZXIsXG4gICAgICAgIGN0eDogeyBlcnIsIHBhdGhuYW1lOiBwYWdlLCBxdWVyeSwgYXNQYXRoLCBBcHBUcmVlIH0sXG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICByZW5kZXJFcnJvclByb3BzLnByb3BzXG4gICAgICAgICAgPyByZW5kZXJFcnJvclByb3BzLnByb3BzXG4gICAgICAgICAgOiBsb2FkR2V0SW5pdGlhbFByb3BzKEFwcCwgYXBwQ3R4KVxuICAgICAgKS50aGVuKChpbml0UHJvcHMpID0+XG4gICAgICAgIGRvUmVuZGVyKHtcbiAgICAgICAgICAuLi5yZW5kZXJFcnJvclByb3BzLFxuICAgICAgICAgIGVycixcbiAgICAgICAgICBDb21wb25lbnQ6IEVycm9yQ29tcG9uZW50LFxuICAgICAgICAgIHN0eWxlU2hlZXRzLFxuICAgICAgICAgIHByb3BzOiBpbml0UHJvcHMsXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfSlcbn1cblxubGV0IHJlYWN0Um9vdDogYW55ID0gbnVsbFxubGV0IHNob3VsZFVzZUh5ZHJhdGU6IGJvb2xlYW4gPSB0eXBlb2YgUmVhY3RET00uaHlkcmF0ZSA9PT0gJ2Z1bmN0aW9uJ1xuZnVuY3Rpb24gcmVuZGVyUmVhY3RFbGVtZW50KHJlYWN0RWw6IEpTWC5FbGVtZW50LCBkb21FbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9SRUFDVF9NT0RFICE9PSAnbGVnYWN5Jykge1xuICAgIGlmICghcmVhY3RSb290KSB7XG4gICAgICBjb25zdCBvcHRzID0geyBoeWRyYXRlOiB0cnVlIH1cbiAgICAgIHJlYWN0Um9vdCA9XG4gICAgICAgIHByb2Nlc3MuZW52Ll9fTkVYVF9SRUFDVF9NT0RFID09PSAnY29uY3VycmVudCdcbiAgICAgICAgICA/IChSZWFjdERPTSBhcyBhbnkpLnVuc3RhYmxlX2NyZWF0ZVJvb3QoZG9tRWwsIG9wdHMpXG4gICAgICAgICAgOiAoUmVhY3RET00gYXMgYW55KS51bnN0YWJsZV9jcmVhdGVCbG9ja2luZ1Jvb3QoZG9tRWwsIG9wdHMpXG4gICAgfVxuICAgIHJlYWN0Um9vdC5yZW5kZXIocmVhY3RFbClcbiAgfSBlbHNlIHtcbiAgICAvLyBtYXJrIHN0YXJ0IG9mIGh5ZHJhdGUvcmVuZGVyXG4gICAgaWYgKFNUKSB7XG4gICAgICBwZXJmb3JtYW5jZS5tYXJrKCdiZWZvcmVSZW5kZXInKVxuICAgIH1cblxuICAgIC8vIFRoZSBjaGVjayBmb3IgYC5oeWRyYXRlYCBpcyB0aGVyZSB0byBzdXBwb3J0IFJlYWN0IGFsdGVybmF0aXZlcyBsaWtlIHByZWFjdFxuICAgIGlmIChzaG91bGRVc2VIeWRyYXRlKSB7XG4gICAgICBSZWFjdERPTS5oeWRyYXRlKHJlYWN0RWwsIGRvbUVsLCBtYXJrSHlkcmF0ZUNvbXBsZXRlKVxuICAgICAgc2hvdWxkVXNlSHlkcmF0ZSA9IGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIFJlYWN0RE9NLnJlbmRlcihyZWFjdEVsLCBkb21FbCwgbWFya1JlbmRlckNvbXBsZXRlKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtYXJrSHlkcmF0ZUNvbXBsZXRlKCk6IHZvaWQge1xuICBpZiAoIVNUKSByZXR1cm5cblxuICBwZXJmb3JtYW5jZS5tYXJrKCdhZnRlckh5ZHJhdGUnKSAvLyBtYXJrIGVuZCBvZiBoeWRyYXRpb25cblxuICBwZXJmb3JtYW5jZS5tZWFzdXJlKFxuICAgICdOZXh0LmpzLWJlZm9yZS1oeWRyYXRpb24nLFxuICAgICduYXZpZ2F0aW9uU3RhcnQnLFxuICAgICdiZWZvcmVSZW5kZXInXG4gIClcbiAgcGVyZm9ybWFuY2UubWVhc3VyZSgnTmV4dC5qcy1oeWRyYXRpb24nLCAnYmVmb3JlUmVuZGVyJywgJ2FmdGVySHlkcmF0ZScpXG5cbiAgaWYgKG9uUGVyZkVudHJ5KSB7XG4gICAgcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5TmFtZSgnTmV4dC5qcy1oeWRyYXRpb24nKS5mb3JFYWNoKG9uUGVyZkVudHJ5KVxuICB9XG4gIGNsZWFyTWFya3MoKVxufVxuXG5mdW5jdGlvbiBtYXJrUmVuZGVyQ29tcGxldGUoKTogdm9pZCB7XG4gIGlmICghU1QpIHJldHVyblxuXG4gIHBlcmZvcm1hbmNlLm1hcmsoJ2FmdGVyUmVuZGVyJykgLy8gbWFyayBlbmQgb2YgcmVuZGVyXG4gIGNvbnN0IG5hdlN0YXJ0RW50cmllczogUGVyZm9ybWFuY2VFbnRyeUxpc3QgPSBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lKFxuICAgICdyb3V0ZUNoYW5nZScsXG4gICAgJ21hcmsnXG4gIClcblxuICBpZiAoIW5hdlN0YXJ0RW50cmllcy5sZW5ndGgpIHJldHVyblxuXG4gIHBlcmZvcm1hbmNlLm1lYXN1cmUoXG4gICAgJ05leHQuanMtcm91dGUtY2hhbmdlLXRvLXJlbmRlcicsXG4gICAgbmF2U3RhcnRFbnRyaWVzWzBdLm5hbWUsXG4gICAgJ2JlZm9yZVJlbmRlcidcbiAgKVxuICBwZXJmb3JtYW5jZS5tZWFzdXJlKCdOZXh0LmpzLXJlbmRlcicsICdiZWZvcmVSZW5kZXInLCAnYWZ0ZXJSZW5kZXInKVxuICBpZiAob25QZXJmRW50cnkpIHtcbiAgICBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lKCdOZXh0LmpzLXJlbmRlcicpLmZvckVhY2gob25QZXJmRW50cnkpXG4gICAgcGVyZm9ybWFuY2VcbiAgICAgIC5nZXRFbnRyaWVzQnlOYW1lKCdOZXh0LmpzLXJvdXRlLWNoYW5nZS10by1yZW5kZXInKVxuICAgICAgLmZvckVhY2gob25QZXJmRW50cnkpXG4gIH1cbiAgY2xlYXJNYXJrcygpXG4gIDtbJ05leHQuanMtcm91dGUtY2hhbmdlLXRvLXJlbmRlcicsICdOZXh0LmpzLXJlbmRlciddLmZvckVhY2goKG1lYXN1cmUpID0+XG4gICAgcGVyZm9ybWFuY2UuY2xlYXJNZWFzdXJlcyhtZWFzdXJlKVxuICApXG59XG5cbmZ1bmN0aW9uIGNsZWFyTWFya3MoKTogdm9pZCB7XG4gIDtbXG4gICAgJ2JlZm9yZVJlbmRlcicsXG4gICAgJ2FmdGVySHlkcmF0ZScsXG4gICAgJ2FmdGVyUmVuZGVyJyxcbiAgICAncm91dGVDaGFuZ2UnLFxuICBdLmZvckVhY2goKG1hcmspID0+IHBlcmZvcm1hbmNlLmNsZWFyTWFya3MobWFyaykpXG59XG5cbmZ1bmN0aW9uIEFwcENvbnRhaW5lcih7XG4gIGNoaWxkcmVuLFxufTogUmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48e30+KTogUmVhY3QuUmVhY3RFbGVtZW50IHtcbiAgcmV0dXJuIChcbiAgICA8Q29udGFpbmVyXG4gICAgICBmbj17KGVycm9yKSA9PlxuICAgICAgICByZW5kZXJFcnJvcih7IEFwcDogQ2FjaGVkQXBwLCBlcnI6IGVycm9yIH0pLmNhdGNoKChlcnIpID0+XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcmVuZGVyaW5nIHBhZ2U6ICcsIGVycilcbiAgICAgICAgKVxuICAgICAgfVxuICAgID5cbiAgICAgIDxSb3V0ZXJDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXttYWtlUHVibGljUm91dGVySW5zdGFuY2Uocm91dGVyKX0+XG4gICAgICAgIDxIZWFkTWFuYWdlckNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2hlYWRNYW5hZ2VyfT5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvSGVhZE1hbmFnZXJDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgPC9Sb3V0ZXJDb250ZXh0LlByb3ZpZGVyPlxuICAgIDwvQ29udGFpbmVyPlxuICApXG59XG5cbmNvbnN0IHdyYXBBcHAgPSAoQXBwOiBBcHBDb21wb25lbnQpID0+IChcbiAgd3JhcHBlZEFwcFByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4pOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGFwcFByb3BzOiBBcHBQcm9wcyA9IHtcbiAgICAuLi53cmFwcGVkQXBwUHJvcHMsXG4gICAgQ29tcG9uZW50OiBDYWNoZWRDb21wb25lbnQsXG4gICAgZXJyOiBoeWRyYXRlRXJyLFxuICAgIHJvdXRlcixcbiAgfVxuICByZXR1cm4gKFxuICAgIDxBcHBDb250YWluZXI+XG4gICAgICA8QXBwIHsuLi5hcHBQcm9wc30gLz5cbiAgICA8L0FwcENvbnRhaW5lcj5cbiAgKVxufVxuXG5sZXQgbGFzdEFwcFByb3BzOiBBcHBQcm9wc1xuZnVuY3Rpb24gZG9SZW5kZXIoaW5wdXQ6IFJlbmRlclJvdXRlSW5mbyk6IFByb21pc2U8YW55PiB7XG4gIGxldCB7IEFwcCwgQ29tcG9uZW50LCBwcm9wcywgZXJyIH06IFJlbmRlclJvdXRlSW5mbyA9IGlucHV0XG4gIGxldCBzdHlsZVNoZWV0czogU3R5bGVTaGVldFR1cGxlW10gfCB1bmRlZmluZWQgPVxuICAgICdpbml0aWFsJyBpbiBpbnB1dCA/IHVuZGVmaW5lZCA6IGlucHV0LnN0eWxlU2hlZXRzXG4gIENvbXBvbmVudCA9IENvbXBvbmVudCB8fCBsYXN0QXBwUHJvcHMuQ29tcG9uZW50XG4gIHByb3BzID0gcHJvcHMgfHwgbGFzdEFwcFByb3BzLnByb3BzXG5cbiAgY29uc3QgYXBwUHJvcHM6IEFwcFByb3BzID0ge1xuICAgIC4uLnByb3BzLFxuICAgIENvbXBvbmVudCxcbiAgICBlcnIsXG4gICAgcm91dGVyLFxuICB9XG4gIC8vIGxhc3RBcHBQcm9wcyBoYXMgdG8gYmUgc2V0IGJlZm9yZSBSZWFjdERvbS5yZW5kZXIgdG8gYWNjb3VudCBmb3IgUmVhY3REb20gdGhyb3dpbmcgYW4gZXJyb3IuXG4gIGxhc3RBcHBQcm9wcyA9IGFwcFByb3BzXG5cbiAgbGV0IGNhbmNlbGVkOiBib29sZWFuID0gZmFsc2VcbiAgbGV0IHJlc29sdmVQcm9taXNlOiAoKSA9PiB2b2lkXG4gIGNvbnN0IHJlbmRlclByb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGxhc3RSZW5kZXJSZWplY3QpIHtcbiAgICAgIGxhc3RSZW5kZXJSZWplY3QoKVxuICAgIH1cbiAgICByZXNvbHZlUHJvbWlzZSA9ICgpID0+IHtcbiAgICAgIGxhc3RSZW5kZXJSZWplY3QgPSBudWxsXG4gICAgICByZXNvbHZlKClcbiAgICB9XG4gICAgbGFzdFJlbmRlclJlamVjdCA9ICgpID0+IHtcbiAgICAgIGNhbmNlbGVkID0gdHJ1ZVxuICAgICAgbGFzdFJlbmRlclJlamVjdCA9IG51bGxcblxuICAgICAgY29uc3QgZXJyb3I6IGFueSA9IG5ldyBFcnJvcignQ2FuY2VsIHJlbmRlcmluZyByb3V0ZScpXG4gICAgICBlcnJvci5jYW5jZWxsZWQgPSB0cnVlXG4gICAgICByZWplY3QoZXJyb3IpXG4gICAgfVxuICB9KVxuXG4gIC8vIFRoaXMgZnVuY3Rpb24gaGFzIGEgcmV0dXJuIHR5cGUgdG8gZW5zdXJlIGl0IGRvZXNuJ3Qgc3RhcnQgcmV0dXJuaW5nIGFcbiAgLy8gUHJvbWlzZS4gSXQgc2hvdWxkIHJlbWFpbiBzeW5jaHJvbm91cy5cbiAgZnVuY3Rpb24gb25TdGFydCgpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICAhc3R5bGVTaGVldHMgfHxcbiAgICAgIC8vIFdlIHVzZSBgc3R5bGUtbG9hZGVyYCBpbiBkZXZlbG9wbWVudCwgc28gd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgICAgLy8gdW5sZXNzIHdlJ3JlIGluIHByb2R1Y3Rpb246XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50U3R5bGVUYWdzOiBIVE1MU3R5bGVFbGVtZW50W10gPSBsb29zZVRvQXJyYXk8SFRNTFN0eWxlRWxlbWVudD4oXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZVtkYXRhLW4taHJlZl0nKVxuICAgIClcbiAgICBjb25zdCBjdXJyZW50SHJlZnM6IFNldDxzdHJpbmcgfCBudWxsPiA9IG5ldyBTZXQoXG4gICAgICBjdXJyZW50U3R5bGVUYWdzLm1hcCgodGFnKSA9PiB0YWcuZ2V0QXR0cmlidXRlKCdkYXRhLW4taHJlZicpKVxuICAgIClcblxuICAgIGNvbnN0IG5vc2NyaXB0OiBFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnbm9zY3JpcHRbZGF0YS1uLWNzc10nXG4gICAgKVxuICAgIGNvbnN0IG5vbmNlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkID0gbm9zY3JpcHQ/LmdldEF0dHJpYnV0ZShcbiAgICAgICdkYXRhLW4tY3NzJ1xuICAgIClcblxuICAgIHN0eWxlU2hlZXRzLmZvckVhY2goKHsgaHJlZiwgdGV4dCB9OiB7IGhyZWY6IHN0cmluZzsgdGV4dDogYW55IH0pID0+IHtcbiAgICAgIGlmICghY3VycmVudEhyZWZzLmhhcyhocmVmKSkge1xuICAgICAgICBjb25zdCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgICAgICAgc3R5bGVUYWcuc2V0QXR0cmlidXRlKCdkYXRhLW4taHJlZicsIGhyZWYpXG4gICAgICAgIHN0eWxlVGFnLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCAneCcpXG5cbiAgICAgICAgaWYgKG5vbmNlKSB7XG4gICAgICAgICAgc3R5bGVUYWcuc2V0QXR0cmlidXRlKCdub25jZScsIG5vbmNlKVxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZylcbiAgICAgICAgc3R5bGVUYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gb25IZWFkQ29tbWl0KCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIC8vIFdlIHVzZSBgc3R5bGUtbG9hZGVyYCBpbiBkZXZlbG9wbWVudCwgc28gd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgICAgLy8gdW5sZXNzIHdlJ3JlIGluIHByb2R1Y3Rpb246XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICAvLyBXZSBjYW4gc2tpcCB0aGlzIGR1cmluZyBoeWRyYXRpb24uIFJ1bm5pbmcgaXQgd29udCBjYXVzZSBhbnkgaGFybSwgYnV0XG4gICAgICAvLyB3ZSBtYXkgYXMgd2VsbCBzYXZlIHRoZSBDUFUgY3ljbGVzOlxuICAgICAgc3R5bGVTaGVldHMgJiZcbiAgICAgIC8vIEVuc3VyZSB0aGlzIHJlbmRlciB3YXMgbm90IGNhbmNlbGVkXG4gICAgICAhY2FuY2VsZWRcbiAgICApIHtcbiAgICAgIGNvbnN0IGRlc2lyZWRIcmVmczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KHN0eWxlU2hlZXRzLm1hcCgocykgPT4gcy5ocmVmKSlcbiAgICAgIGNvbnN0IGN1cnJlbnRTdHlsZVRhZ3M6IEhUTUxTdHlsZUVsZW1lbnRbXSA9IGxvb3NlVG9BcnJheTxcbiAgICAgICAgSFRNTFN0eWxlRWxlbWVudFxuICAgICAgPihkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZVtkYXRhLW4taHJlZl0nKSlcbiAgICAgIGNvbnN0IGN1cnJlbnRIcmVmczogc3RyaW5nW10gPSBjdXJyZW50U3R5bGVUYWdzLm1hcChcbiAgICAgICAgKHRhZykgPT4gdGFnLmdldEF0dHJpYnV0ZSgnZGF0YS1uLWhyZWYnKSFcbiAgICAgIClcblxuICAgICAgLy8gVG9nZ2xlIGA8c3R5bGU+YCB0YWdzIG9uIG9yIG9mZiBkZXBlbmRpbmcgb24gaWYgdGhleSdyZSBuZWVkZWQ6XG4gICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBjdXJyZW50SHJlZnMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICBpZiAoZGVzaXJlZEhyZWZzLmhhcyhjdXJyZW50SHJlZnNbaWR4XSkpIHtcbiAgICAgICAgICBjdXJyZW50U3R5bGVUYWdzW2lkeF0ucmVtb3ZlQXR0cmlidXRlKCdtZWRpYScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VycmVudFN0eWxlVGFnc1tpZHhdLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCAneCcpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUmVvcmRlciBzdHlsZXMgaW50byBpbnRlbmRlZCBvcmRlcjpcbiAgICAgIGxldCByZWZlcmVuY2VOb2RlOiBFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICdub3NjcmlwdFtkYXRhLW4tY3NzXSdcbiAgICAgIClcbiAgICAgIGlmIChcbiAgICAgICAgLy8gVGhpcyBzaG91bGQgYmUgYW4gaW52YXJpYW50OlxuICAgICAgICByZWZlcmVuY2VOb2RlXG4gICAgICApIHtcbiAgICAgICAgc3R5bGVTaGVldHMuZm9yRWFjaCgoeyBocmVmIH06IHsgaHJlZjogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICBjb25zdCB0YXJnZXRUYWc6IEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBzdHlsZVtkYXRhLW4taHJlZj1cIiR7aHJlZn1cIl1gXG4gICAgICAgICAgKVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIC8vIFRoaXMgc2hvdWxkIGJlIGFuIGludmFyaWFudDpcbiAgICAgICAgICAgIHRhcmdldFRhZ1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmVmZXJlbmNlTm9kZSEucGFyZW50Tm9kZSEuaW5zZXJ0QmVmb3JlKFxuICAgICAgICAgICAgICB0YXJnZXRUYWcsXG4gICAgICAgICAgICAgIHJlZmVyZW5jZU5vZGUhLm5leHRTaWJsaW5nXG4gICAgICAgICAgICApXG4gICAgICAgICAgICByZWZlcmVuY2VOb2RlID0gdGFyZ2V0VGFnXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICAvLyBGaW5hbGx5LCBjbGVhbiB1cCBzZXJ2ZXIgcmVuZGVyZWQgc3R5bGVzaGVldHM6XG4gICAgICBsb29zZVRvQXJyYXk8SFRNTExpbmtFbGVtZW50PihcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGlua1tkYXRhLW4tcF0nKVxuICAgICAgKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBlbC5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZChlbClcbiAgICAgIH0pXG5cbiAgICAgIC8vIEZvcmNlIGJyb3dzZXIgdG8gcmVjb21wdXRlIGxheW91dCwgd2hpY2ggc2hvdWxkIHByZXZlbnQgYSBmbGFzaCBvZlxuICAgICAgLy8gdW5zdHlsZWQgY29udGVudDpcbiAgICAgIGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSwgJ2hlaWdodCcpXG4gICAgfVxuXG4gICAgaWYgKGlucHV0LnNjcm9sbCkge1xuICAgICAgd2luZG93LnNjcm9sbFRvKGlucHV0LnNjcm9sbC54LCBpbnB1dC5zY3JvbGwueSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblJvb3RDb21taXQoKTogdm9pZCB7XG4gICAgcmVzb2x2ZVByb21pc2UoKVxuICB9XG5cbiAgY29uc3QgZWxlbTogSlNYLkVsZW1lbnQgPSAoXG4gICAgPFJvb3QgY2FsbGJhY2s9e29uUm9vdENvbW1pdH0+XG4gICAgICA8SGVhZCBjYWxsYmFjaz17b25IZWFkQ29tbWl0fSAvPlxuICAgICAgPEFwcENvbnRhaW5lcj5cbiAgICAgICAgPEFwcCB7Li4uYXBwUHJvcHN9IC8+XG4gICAgICAgIDxQb3J0YWwgdHlwZT1cIm5leHQtcm91dGUtYW5ub3VuY2VyXCI+XG4gICAgICAgICAgPFJvdXRlQW5ub3VuY2VyIC8+XG4gICAgICAgIDwvUG9ydGFsPlxuICAgICAgPC9BcHBDb250YWluZXI+XG4gICAgPC9Sb290PlxuICApXG5cbiAgb25TdGFydCgpXG5cbiAgLy8gV2UgY2F0Y2ggcnVudGltZSBlcnJvcnMgdXNpbmcgY29tcG9uZW50RGlkQ2F0Y2ggd2hpY2ggd2lsbCB0cmlnZ2VyIHJlbmRlckVycm9yXG4gIHJlbmRlclJlYWN0RWxlbWVudChcbiAgICBwcm9jZXNzLmVudi5fX05FWFRfU1RSSUNUX01PREUgPyAoXG4gICAgICA8UmVhY3QuU3RyaWN0TW9kZT57ZWxlbX08L1JlYWN0LlN0cmljdE1vZGU+XG4gICAgKSA6IChcbiAgICAgIGVsZW1cbiAgICApLFxuICAgIGFwcEVsZW1lbnQhXG4gIClcblxuICByZXR1cm4gcmVuZGVyUHJvbWlzZVxufVxuXG5mdW5jdGlvbiBSb290KHtcbiAgY2FsbGJhY2ssXG4gIGNoaWxkcmVuLFxufTogUmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48e1xuICBjYWxsYmFjazogKCkgPT4gdm9pZFxufT4pOiBSZWFjdC5SZWFjdEVsZW1lbnQge1xuICAvLyBXZSB1c2UgYHVzZUxheW91dEVmZmVjdGAgdG8gZ3VhcmFudGVlIHRoZSBjYWxsYmFjayBpcyBleGVjdXRlZFxuICAvLyBhcyBzb29uIGFzIFJlYWN0IGZsdXNoZXMgdGhlIHVwZGF0ZS5cbiAgUmVhY3QudXNlTGF5b3V0RWZmZWN0KCgpID0+IGNhbGxiYWNrKCksIFtjYWxsYmFja10pXG4gIGlmIChwcm9jZXNzLmVudi5fX05FWFRfVEVTVF9NT0RFKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL3J1bGVzLW9mLWhvb2tzXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIHdpbmRvdy5fX05FWFRfSFlEUkFURUQgPSB0cnVlXG5cbiAgICAgIGlmICh3aW5kb3cuX19ORVhUX0hZRFJBVEVEX0NCKSB7XG4gICAgICAgIHdpbmRvdy5fX05FWFRfSFlEUkFURURfQ0IoKVxuICAgICAgfVxuICAgIH0sIFtdKVxuICB9XG4gIC8vIFdlIHNob3VsZCBhc2sgdG8gbWVhc3VyZSB0aGUgV2ViIFZpdGFscyBhZnRlciByZW5kZXJpbmcgY29tcGxldGVzIHNvIHdlXG4gIC8vIGRvbid0IGNhdXNlIGFueSBoeWRyYXRpb24gZGVsYXk6XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbWVhc3VyZVdlYlZpdGFscyhvblBlcmZFbnRyeSlcbiAgfSwgW10pXG4gIHJldHVybiBjaGlsZHJlbiBhcyBSZWFjdC5SZWFjdEVsZW1lbnRcbn1cblxuLy8gRHVtbXkgY29tcG9uZW50IHRoYXQgd2UgcmVuZGVyIGFzIGEgY2hpbGQgb2YgUm9vdCBzbyB0aGF0IHdlIGNhblxuLy8gdG9nZ2xlIHRoZSBjb3JyZWN0IHN0eWxlcyBiZWZvcmUgdGhlIHBhZ2UgaXMgcmVuZGVyZWQuXG5mdW5jdGlvbiBIZWFkKHsgY2FsbGJhY2sgfTogeyBjYWxsYmFjazogKCkgPT4gdm9pZCB9KTogbnVsbCB7XG4gIC8vIFdlIHVzZSBgdXNlTGF5b3V0RWZmZWN0YCB0byBndWFyYW50ZWUgdGhlIGNhbGxiYWNrIGlzIGV4ZWN1dGVkXG4gIC8vIGFzIHNvb24gYXMgUmVhY3QgZmx1c2hlcyB0aGUgdXBkYXRlLlxuICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4gY2FsbGJhY2soKSwgW2NhbGxiYWNrXSlcbiAgcmV0dXJuIG51bGxcbn1cbiIsIi8qIGdsb2JhbHMgX19SRVBMQUNFX05PT1BfSU1QT1JUX18gKi9cbmltcG9ydCBpbml0TmV4dCwgKiBhcyBuZXh0IGZyb20gJy4vJ1xuaW1wb3J0IEV2ZW50U291cmNlUG9seWZpbGwgZnJvbSAnLi9kZXYvZXZlbnQtc291cmNlLXBvbHlmaWxsJ1xuaW1wb3J0IGluaXRPbkRlbWFuZEVudHJpZXMgZnJvbSAnLi9kZXYvb24tZGVtYW5kLWVudHJpZXMtY2xpZW50J1xuaW1wb3J0IGluaXRXZWJwYWNrSE1SIGZyb20gJy4vZGV2L3dlYnBhY2staG90LW1pZGRsZXdhcmUtY2xpZW50J1xuaW1wb3J0IGluaXRpYWxpemVCdWlsZFdhdGNoZXIgZnJvbSAnLi9kZXYvZGV2LWJ1aWxkLXdhdGNoZXInXG5pbXBvcnQgeyBkaXNwbGF5Q29udGVudCB9IGZyb20gJy4vZGV2L2ZvdWMnXG5pbXBvcnQgeyBnZXRFdmVudFNvdXJjZVdyYXBwZXIgfSBmcm9tICcuL2Rldi9lcnJvci1vdmVybGF5L2V2ZW50c291cmNlJ1xuaW1wb3J0ICogYXMgcXVlcnlzdHJpbmcgZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9xdWVyeXN0cmluZydcblxuLy8gVGVtcG9yYXJ5IHdvcmthcm91bmQgZm9yIHRoZSBpc3N1ZSBkZXNjcmliZWQgaGVyZTpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS92ZXJjZWwvbmV4dC5qcy9pc3N1ZXMvMzc3NSNpc3N1ZWNvbW1lbnQtNDA3NDM4MTIzXG4vLyBUaGUgcnVudGltZUNodW5rIGRvZXNuJ3QgaGF2ZSBkeW5hbWljIGltcG9ydCBoYW5kbGluZyBjb2RlIHdoZW4gdGhlcmUgaGFzbid0IGJlZW4gYSBkeW5hbWljIGltcG9ydFxuLy8gVGhlIHJ1bnRpbWVDaHVuayBjYW4ndCBob3QgcmVsb2FkIGl0c2VsZiBjdXJyZW50bHkgdG8gY29ycmVjdCBpdCB3aGVuIGFkZGluZyBwYWdlcyB1c2luZyBvbi1kZW1hbmQtZW50cmllc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuX19SRVBMQUNFX05PT1BfSU1QT1JUX19cblxuLy8gU3VwcG9ydCBFdmVudFNvdXJjZSBvbiBJbnRlcm5ldCBFeHBsb3JlciAxMVxuaWYgKCF3aW5kb3cuRXZlbnRTb3VyY2UpIHtcbiAgd2luZG93LkV2ZW50U291cmNlID0gRXZlbnRTb3VyY2VQb2x5ZmlsbFxufVxuXG5jb25zdCB7XG4gIF9fTkVYVF9EQVRBX186IHsgYXNzZXRQcmVmaXggfSxcbn0gPSB3aW5kb3dcblxuY29uc3QgcHJlZml4ID0gYXNzZXRQcmVmaXggfHwgJydcbmNvbnN0IHdlYnBhY2tITVIgPSBpbml0V2VicGFja0hNUih7IGFzc2V0UHJlZml4OiBwcmVmaXggfSlcblxud2luZG93Lm5leHQgPSBuZXh0XG5pbml0TmV4dCh7IHdlYnBhY2tITVIgfSlcbiAgLnRoZW4oKHsgcmVuZGVyQ3R4LCByZW5kZXIgfSkgPT4ge1xuICAgIGluaXRPbkRlbWFuZEVudHJpZXMoeyBhc3NldFByZWZpeDogcHJlZml4IH0pXG5cbiAgICBsZXQgYnVpbGRJbmRpY2F0b3JIYW5kbGVyID0gKCkgPT4ge31cblxuICAgIGZ1bmN0aW9uIGRldlBhZ2VzTWFuaWZlc3RMaXN0ZW5lcihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmRhdGEuaW5kZXhPZignZGV2UGFnZXNNYW5pZmVzdCcpICE9PSAtMSkge1xuICAgICAgICBmZXRjaChgJHtwcmVmaXh9L19uZXh0L3N0YXRpYy9kZXZlbG9wbWVudC9fZGV2UGFnZXNNYW5pZmVzdC5qc29uYClcbiAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAgIC50aGVuKChtYW5pZmVzdCkgPT4ge1xuICAgICAgICAgICAgd2luZG93Ll9fREVWX1BBR0VTX01BTklGRVNUID0gbWFuaWZlc3RcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgRmFpbGVkIHRvIGZldGNoIGRldlBhZ2VzTWFuaWZlc3RgLCBlcnIpXG4gICAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZGF0YS5pbmRleE9mKCdzZXJ2ZXJPbmx5Q2hhbmdlcycpICE9PSAtMSkge1xuICAgICAgICBjb25zdCB7IHBhZ2VzIH0gPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpXG4gICAgICAgIGNvbnN0IHJvdXRlciA9IHdpbmRvdy5uZXh0LnJvdXRlclxuXG4gICAgICAgIGlmIChwYWdlcy5pbmNsdWRlcyhyb3V0ZXIucGF0aG5hbWUpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1JlZnJlc2hpbmcgcGFnZSBkYXRhIGR1ZSB0byBzZXJ2ZXItc2lkZSBjaGFuZ2UnKVxuXG4gICAgICAgICAgYnVpbGRJbmRpY2F0b3JIYW5kbGVyKCdidWlsZGluZycpXG5cbiAgICAgICAgICBjb25zdCBjbGVhckluZGljYXRvciA9ICgpID0+IGJ1aWxkSW5kaWNhdG9ySGFuZGxlcignYnVpbHQnKVxuXG4gICAgICAgICAgcm91dGVyXG4gICAgICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICAgICAgcm91dGVyLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnPycgK1xuICAgICAgICAgICAgICAgIFN0cmluZyhcbiAgICAgICAgICAgICAgICAgIHF1ZXJ5c3RyaW5nLmFzc2lnbihcbiAgICAgICAgICAgICAgICAgICAgcXVlcnlzdHJpbmcudXJsUXVlcnlUb1NlYXJjaFBhcmFtcyhyb3V0ZXIucXVlcnkpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICByb3V0ZXIuYXNQYXRoXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuZmluYWxseShjbGVhckluZGljYXRvcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkZXZQYWdlc01hbmlmZXN0TGlzdGVuZXIudW5maWx0ZXJlZCA9IHRydWVcbiAgICBnZXRFdmVudFNvdXJjZVdyYXBwZXIoe30pLmFkZE1lc3NhZ2VMaXN0ZW5lcihkZXZQYWdlc01hbmlmZXN0TGlzdGVuZXIpXG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0JVSUxEX0lORElDQVRPUikge1xuICAgICAgaW5pdGlhbGl6ZUJ1aWxkV2F0Y2hlcigoaGFuZGxlcikgPT4ge1xuICAgICAgICBidWlsZEluZGljYXRvckhhbmRsZXIgPSBoYW5kbGVyXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIGRlbGF5IHJlbmRlcmluZyB1bnRpbCBhZnRlciBzdHlsZXMgaGF2ZSBiZWVuIGFwcGxpZWQgaW4gZGV2ZWxvcG1lbnRcbiAgICBkaXNwbGF5Q29udGVudCgoKSA9PiB7XG4gICAgICByZW5kZXIocmVuZGVyQ3R4KVxuICAgIH0pXG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3Igd2FzIG5vdCBjYXVnaHQnLCBlcnIpXG4gIH0pXG4iLCJpbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDbGllbnRTc2dNYW5pZmVzdCB9IGZyb20gJy4uL2J1aWxkJ1xuaW1wb3J0IHtcbiAgYWRkQmFzZVBhdGgsXG4gIGFkZExvY2FsZSxcbiAgaW50ZXJwb2xhdGVBcyxcbn0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci9yb3V0ZXInXG5pbXBvcnQgZ2V0QXNzZXRQYXRoRnJvbVJvdXRlIGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZSdcbmltcG9ydCB7IGlzRHluYW1pY1JvdXRlIH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9pcy1keW5hbWljJ1xuaW1wb3J0IHsgcGFyc2VSZWxhdGl2ZVVybCB9IGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsJ1xuaW1wb3J0IHsgcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2ggfSBmcm9tICcuL25vcm1hbGl6ZS10cmFpbGluZy1zbGFzaCdcbmltcG9ydCBjcmVhdGVSb3V0ZUxvYWRlciwge1xuICBnZXRDbGllbnRCdWlsZE1hbmlmZXN0LFxuICBSb3V0ZUxvYWRlcixcbn0gZnJvbSAnLi9yb3V0ZS1sb2FkZXInXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVJvdXRlKHJvdXRlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAocm91dGVbMF0gIT09ICcvJykge1xuICAgIHRocm93IG5ldyBFcnJvcihgUm91dGUgbmFtZSBzaG91bGQgc3RhcnQgd2l0aCBhIFwiL1wiLCBnb3QgXCIke3JvdXRlfVwiYClcbiAgfVxuXG4gIGlmIChyb3V0ZSA9PT0gJy8nKSByZXR1cm4gcm91dGVcbiAgcmV0dXJuIHJvdXRlLnJlcGxhY2UoL1xcLyQvLCAnJylcbn1cblxuZXhwb3J0IHR5cGUgU3R5bGVTaGVldFR1cGxlID0geyBocmVmOiBzdHJpbmc7IHRleHQ6IHN0cmluZyB9XG5leHBvcnQgdHlwZSBHb29kUGFnZUNhY2hlID0ge1xuICBwYWdlOiBDb21wb25lbnRUeXBlXG4gIG1vZDogYW55XG4gIHN0eWxlU2hlZXRzOiBTdHlsZVNoZWV0VHVwbGVbXVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlTG9hZGVyIHtcbiAgcHJpdmF0ZSBidWlsZElkOiBzdHJpbmdcbiAgcHJpdmF0ZSBhc3NldFByZWZpeDogc3RyaW5nXG5cbiAgcHJpdmF0ZSBwcm9taXNlZFNzZ01hbmlmZXN0PzogUHJvbWlzZTxDbGllbnRTc2dNYW5pZmVzdD5cbiAgcHJpdmF0ZSBwcm9taXNlZERldlBhZ2VzTWFuaWZlc3Q/OiBQcm9taXNlPGFueT5cbiAgcHVibGljIHJvdXRlTG9hZGVyOiBSb3V0ZUxvYWRlclxuXG4gIGNvbnN0cnVjdG9yKGJ1aWxkSWQ6IHN0cmluZywgYXNzZXRQcmVmaXg6IHN0cmluZykge1xuICAgIHRoaXMucm91dGVMb2FkZXIgPSBjcmVhdGVSb3V0ZUxvYWRlcihhc3NldFByZWZpeClcblxuICAgIHRoaXMuYnVpbGRJZCA9IGJ1aWxkSWRcbiAgICB0aGlzLmFzc2V0UHJlZml4ID0gYXNzZXRQcmVmaXhcblxuICAgIC8qKiBAdHlwZSB7UHJvbWlzZTxTZXQ8c3RyaW5nPj59ICovXG4gICAgdGhpcy5wcm9taXNlZFNzZ01hbmlmZXN0ID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICgod2luZG93IGFzIGFueSkuX19TU0dfTUFOSUZFU1QpIHtcbiAgICAgICAgcmVzb2x2ZSgod2luZG93IGFzIGFueSkuX19TU0dfTUFOSUZFU1QpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICA7KHdpbmRvdyBhcyBhbnkpLl9fU1NHX01BTklGRVNUX0NCID0gKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoKHdpbmRvdyBhcyBhbnkpLl9fU1NHX01BTklGRVNUKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldFBhZ2VMaXN0KCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICByZXR1cm4gZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpLnRoZW4oKG1hbmlmZXN0KSA9PiBtYW5pZmVzdC5zb3J0ZWRQYWdlcylcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCh3aW5kb3cgYXMgYW55KS5fX0RFVl9QQUdFU19NQU5JRkVTVCkge1xuICAgICAgICByZXR1cm4gKHdpbmRvdyBhcyBhbnkpLl9fREVWX1BBR0VTX01BTklGRVNULnBhZ2VzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMucHJvbWlzZWREZXZQYWdlc01hbmlmZXN0KSB7XG4gICAgICAgICAgdGhpcy5wcm9taXNlZERldlBhZ2VzTWFuaWZlc3QgPSBmZXRjaChcbiAgICAgICAgICAgIGAke3RoaXMuYXNzZXRQcmVmaXh9L19uZXh0L3N0YXRpYy9kZXZlbG9wbWVudC9fZGV2UGFnZXNNYW5pZmVzdC5qc29uYFxuICAgICAgICAgIClcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbigobWFuaWZlc3QpID0+IHtcbiAgICAgICAgICAgICAgOyh3aW5kb3cgYXMgYW55KS5fX0RFVl9QQUdFU19NQU5JRkVTVCA9IG1hbmlmZXN0XG4gICAgICAgICAgICAgIHJldHVybiBtYW5pZmVzdC5wYWdlc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gZmV0Y2ggZGV2UGFnZXNNYW5pZmVzdGAsIGVycilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZWREZXZQYWdlc01hbmlmZXN0XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBocmVmIHRoZSByb3V0ZSBocmVmIChmaWxlLXN5c3RlbSBwYXRoKVxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXNQYXRoIHRoZSBVUkwgYXMgc2hvd24gaW4gYnJvd3NlciAodmlydHVhbCBwYXRoKTsgdXNlZCBmb3IgZHluYW1pYyByb3V0ZXNcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldERhdGFIcmVmKFxuICAgIGhyZWY6IHN0cmluZyxcbiAgICBhc1BhdGg6IHN0cmluZyxcbiAgICBzc2c6IGJvb2xlYW4sXG4gICAgbG9jYWxlPzogc3RyaW5nIHwgZmFsc2VcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IHBhdGhuYW1lOiBocmVmUGF0aG5hbWUsIHF1ZXJ5LCBzZWFyY2ggfSA9IHBhcnNlUmVsYXRpdmVVcmwoaHJlZilcbiAgICBjb25zdCB7IHBhdGhuYW1lOiBhc1BhdGhuYW1lIH0gPSBwYXJzZVJlbGF0aXZlVXJsKGFzUGF0aClcbiAgICBjb25zdCByb3V0ZSA9IG5vcm1hbGl6ZVJvdXRlKGhyZWZQYXRobmFtZSlcblxuICAgIGNvbnN0IGdldEhyZWZGb3JTbHVnID0gKHBhdGg6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZGF0YVJvdXRlID0gZ2V0QXNzZXRQYXRoRnJvbVJvdXRlKFxuICAgICAgICByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChhZGRMb2NhbGUocGF0aCwgbG9jYWxlKSksXG4gICAgICAgICcuanNvbidcbiAgICAgIClcbiAgICAgIHJldHVybiBhZGRCYXNlUGF0aChcbiAgICAgICAgYC9fbmV4dC9kYXRhLyR7dGhpcy5idWlsZElkfSR7ZGF0YVJvdXRlfSR7c3NnID8gJycgOiBzZWFyY2h9YFxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IGlzRHluYW1pYzogYm9vbGVhbiA9IGlzRHluYW1pY1JvdXRlKHJvdXRlKVxuICAgIGNvbnN0IGludGVycG9sYXRlZFJvdXRlID0gaXNEeW5hbWljXG4gICAgICA/IGludGVycG9sYXRlQXMoaHJlZlBhdGhuYW1lLCBhc1BhdGhuYW1lLCBxdWVyeSkucmVzdWx0XG4gICAgICA6ICcnXG5cbiAgICByZXR1cm4gaXNEeW5hbWljXG4gICAgICA/IGludGVycG9sYXRlZFJvdXRlICYmIGdldEhyZWZGb3JTbHVnKGludGVycG9sYXRlZFJvdXRlKVxuICAgICAgOiBnZXRIcmVmRm9yU2x1Zyhyb3V0ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcm91dGUgLSB0aGUgcm91dGUgKGZpbGUtc3lzdGVtIHBhdGgpXG4gICAqL1xuICBfaXNTc2cocm91dGU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnByb21pc2VkU3NnTWFuaWZlc3QhLnRoZW4oKHM6IENsaWVudFNzZ01hbmlmZXN0KSA9PlxuICAgICAgcy5oYXMocm91dGUpXG4gICAgKVxuICB9XG5cbiAgbG9hZFBhZ2Uocm91dGU6IHN0cmluZyk6IFByb21pc2U8R29vZFBhZ2VDYWNoZT4ge1xuICAgIHJldHVybiB0aGlzLnJvdXRlTG9hZGVyLmxvYWRSb3V0ZShyb3V0ZSkudGhlbigocmVzKSA9PiB7XG4gICAgICBpZiAoJ2NvbXBvbmVudCcgaW4gcmVzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcGFnZTogcmVzLmNvbXBvbmVudCxcbiAgICAgICAgICBtb2Q6IHJlcy5leHBvcnRzLFxuICAgICAgICAgIHN0eWxlU2hlZXRzOiByZXMuc3R5bGVzLm1hcCgobykgPT4gKHtcbiAgICAgICAgICAgIGhyZWY6IG8uaHJlZixcbiAgICAgICAgICAgIHRleHQ6IG8uY29udGVudCxcbiAgICAgICAgICB9KSksXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRocm93IHJlcy5lcnJvclxuICAgIH0pXG4gIH1cblxuICBwcmVmZXRjaChyb3V0ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVMb2FkZXIucHJlZmV0Y2gocm91dGUpXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSAncmVhY3QtZG9tJ1xuXG50eXBlIFBvcnRhbFByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlXG4gIHR5cGU6IHN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgUG9ydGFsOiBSZWFjdC5GQzxQb3J0YWxQcm9wcz4gPSAoeyBjaGlsZHJlbiwgdHlwZSB9KSA9PiB7XG4gIGxldCBwb3J0YWxOb2RlID0gUmVhY3QudXNlUmVmPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbClcbiAgbGV0IFssIGZvcmNlVXBkYXRlXSA9IFJlYWN0LnVzZVN0YXRlPHt9PigpXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcG9ydGFsTm9kZS5jdXJyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9ydGFsTm9kZS5jdXJyZW50KVxuICAgIGZvcmNlVXBkYXRlKHt9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocG9ydGFsTm9kZS5jdXJyZW50KSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocG9ydGFsTm9kZS5jdXJyZW50KVxuICAgICAgfVxuICAgIH1cbiAgfSwgW3R5cGVdKVxuXG4gIHJldHVybiBwb3J0YWxOb2RlLmN1cnJlbnQgPyBjcmVhdGVQb3J0YWwoY2hpbGRyZW4sIHBvcnRhbE5vZGUuY3VycmVudCkgOiBudWxsXG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlUmVmIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICcuL3JvdXRlcidcblxuZXhwb3J0IGZ1bmN0aW9uIFJvdXRlQW5ub3VuY2VyKCkge1xuICBjb25zdCB7IGFzUGF0aCB9ID0gdXNlUm91dGVyKClcbiAgY29uc3QgW3JvdXRlQW5ub3VuY2VtZW50LCBzZXRSb3V0ZUFubm91bmNlbWVudF0gPSB1c2VTdGF0ZSgnJylcblxuICAvLyBPbmx5IGFubm91bmNlIHRoZSBwYXRoIGNoYW5nZSwgYnV0IG5vdCBmb3IgdGhlIGZpcnN0IGxvYWQgYmVjYXVzZSBzY3JlZW4gcmVhZGVyIHdpbGwgZG8gdGhhdCBhdXRvbWF0aWNhbGx5LlxuICBjb25zdCBpbml0aWFsUGF0aExvYWRlZCA9IHVzZVJlZihmYWxzZSlcblxuICAvLyBFdmVyeSB0aW1lIHRoZSBwYXRoIGNoYW5nZXMsIGFubm91bmNlIHRoZSByb3V0ZSBjaGFuZ2UuIFRoZSBhbm5vdW5jZW1lbnQgd2lsbCBiZSBwcmlvcml0aXplZCBieSBoMSwgdGhlbiB0aXRsZVxuICAvLyAoZnJvbSBtZXRhZGF0YSksIGFuZCBmaW5hbGx5IGlmIHRob3NlIGRvbid0IGV4aXN0LCB0aGVuIHRoZSBwYXRoTmFtZSB0aGF0IGlzIGluIHRoZSBVUkwuIFRoaXMgbWV0aG9kb2xvZ3kgaXNcbiAgLy8gaW5zcGlyZWQgYnkgTWFyY3kgU3V0dG9uJ3MgYWNjZXNzaWJsZSBjbGllbnQgcm91dGluZyB1c2VyIHRlc3RpbmcuIE1vcmUgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGhlcmU6XG4gIC8vIGh0dHBzOi8vd3d3LmdhdHNieWpzLmNvbS9ibG9nLzIwMTktMDctMTEtdXNlci10ZXN0aW5nLWFjY2Vzc2libGUtY2xpZW50LXJvdXRpbmcvXG4gIHVzZUVmZmVjdChcbiAgICAoKSA9PiB7XG4gICAgICBpZiAoIWluaXRpYWxQYXRoTG9hZGVkLmN1cnJlbnQpIHtcbiAgICAgICAgaW5pdGlhbFBhdGhMb2FkZWQuY3VycmVudCA9IHRydWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdSb3V0ZUFubm91bmNlbWVudFxuICAgICAgY29uc3QgcGFnZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJylcblxuICAgICAgaWYgKHBhZ2VIZWFkZXIpIHtcbiAgICAgICAgbmV3Um91dGVBbm5vdW5jZW1lbnQgPSBwYWdlSGVhZGVyLmlubmVyVGV4dCB8fCBwYWdlSGVhZGVyLnRleHRDb250ZW50XG4gICAgICB9XG4gICAgICBpZiAoIW5ld1JvdXRlQW5ub3VuY2VtZW50KSB7XG4gICAgICAgIGlmIChkb2N1bWVudC50aXRsZSkge1xuICAgICAgICAgIG5ld1JvdXRlQW5ub3VuY2VtZW50ID0gZG9jdW1lbnQudGl0bGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdSb3V0ZUFubm91bmNlbWVudCA9IGFzUGF0aFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNldFJvdXRlQW5ub3VuY2VtZW50KG5ld1JvdXRlQW5ub3VuY2VtZW50KVxuICAgIH0sXG4gICAgLy8gVE9ETzogc3dpdGNoIHRvIHBhdGhuYW1lICsgcXVlcnkgb2JqZWN0IG9mIGR5bmFtaWMgcm91dGUgcmVxdWlyZW1lbnRzXG4gICAgW2FzUGF0aF1cbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPHBcbiAgICAgIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiIC8vIE1ha2UgdGhlIGFubm91bmNlbWVudCBpbW1lZGlhdGVseS5cbiAgICAgIGlkPVwiX19uZXh0LXJvdXRlLWFubm91bmNlcl9fXCJcbiAgICAgIHJvbGU9XCJhbGVydFwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICBib3JkZXI6IDAsXG4gICAgICAgIGNsaXA6ICdyZWN0KDAgMCAwIDApJyxcbiAgICAgICAgaGVpZ2h0OiAnMXB4JyxcbiAgICAgICAgbWFyZ2luOiAnLTFweCcsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIHdpZHRoOiAnMXB4JyxcblxuICAgICAgICAvLyBodHRwczovL21lZGl1bS5jb20vQGplc3NlYmVhY2gvYmV3YXJlLXNtdXNoZWQtb2ZmLXNjcmVlbi1hY2Nlc3NpYmxlLXRleHQtNTk1MmE0YzJjYmZlXG4gICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICB3b3JkV3JhcDogJ25vcm1hbCcsXG4gICAgICB9fVxuICAgID5cbiAgICAgIHtyb3V0ZUFubm91bmNlbWVudH1cbiAgICA8L3A+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgUm91dGVBbm5vdW5jZXJcbiIsImltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENsaWVudEJ1aWxkTWFuaWZlc3QgfSBmcm9tICcuLi9idWlsZC93ZWJwYWNrL3BsdWdpbnMvYnVpbGQtbWFuaWZlc3QtcGx1Z2luJ1xuaW1wb3J0IGdldEFzc2V0UGF0aEZyb21Sb3V0ZSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUnXG5pbXBvcnQgeyByZXF1ZXN0SWRsZUNhbGxiYWNrIH0gZnJvbSAnLi9yZXF1ZXN0LWlkbGUtY2FsbGJhY2snXG5cbi8vIDMuOHMgd2FzIGFyYml0cmFyaWx5IGNob3NlbiBhcyBpdCdzIHdoYXQgaHR0cHM6Ly93ZWIuZGV2L2ludGVyYWN0aXZlXG4vLyBjb25zaWRlcnMgYXMgXCJHb29kXCIgdGltZS10by1pbnRlcmFjdGl2ZS4gV2UgbXVzdCBhc3N1bWUgc29tZXRoaW5nIHdlbnRcbi8vIHdyb25nIGJleW9uZCB0aGlzIHBvaW50LCBhbmQgdGhlbiBmYWxsLWJhY2sgdG8gYSBmdWxsIHBhZ2UgdHJhbnNpdGlvbiB0b1xuLy8gc2hvdyB0aGUgdXNlciBzb21ldGhpbmcgb2YgdmFsdWUuXG5jb25zdCBNU19NQVhfSURMRV9ERUxBWSA9IDM4MDBcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBfX0JVSUxEX01BTklGRVNUPzogQ2xpZW50QnVpbGRNYW5pZmVzdFxuICAgIF9fQlVJTERfTUFOSUZFU1RfQ0I/OiBGdW5jdGlvblxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkRW50cnlwb2ludFN1Y2Nlc3Mge1xuICBjb21wb25lbnQ6IENvbXBvbmVudFR5cGVcbiAgZXhwb3J0czogYW55XG59XG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZEVudHJ5cG9pbnRGYWlsdXJlIHtcbiAgZXJyb3I6IHVua25vd25cbn1cbmV4cG9ydCB0eXBlIFJvdXRlRW50cnlwb2ludCA9IExvYWRlZEVudHJ5cG9pbnRTdWNjZXNzIHwgTG9hZGVkRW50cnlwb2ludEZhaWx1cmVcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZVN0eWxlU2hlZXQge1xuICBocmVmOiBzdHJpbmdcbiAgY29udGVudDogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkUm91dGVTdWNjZXNzIGV4dGVuZHMgTG9hZGVkRW50cnlwb2ludFN1Y2Nlc3Mge1xuICBzdHlsZXM6IFJvdXRlU3R5bGVTaGVldFtdXG59XG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZFJvdXRlRmFpbHVyZSB7XG4gIGVycm9yOiB1bmtub3duXG59XG5leHBvcnQgdHlwZSBSb3V0ZUxvYWRlckVudHJ5ID0gTG9hZGVkUm91dGVTdWNjZXNzIHwgTG9hZGVkUm91dGVGYWlsdXJlXG5cbmV4cG9ydCB0eXBlIEZ1dHVyZTxWPiA9IHtcbiAgcmVzb2x2ZTogKGVudHJ5cG9pbnQ6IFYpID0+IHZvaWRcbiAgZnV0dXJlOiBQcm9taXNlPFY+XG59XG5mdW5jdGlvbiB3aXRoRnV0dXJlPFQ+KFxuICBrZXk6IHN0cmluZyxcbiAgbWFwOiBNYXA8c3RyaW5nLCBGdXR1cmU8VD4gfCBUPixcbiAgZ2VuZXJhdG9yPzogKCkgPT4gUHJvbWlzZTxUPlxuKTogUHJvbWlzZTxUPiB7XG4gIGxldCBlbnRyeTogRnV0dXJlPFQ+IHwgVCB8IHVuZGVmaW5lZCA9IG1hcC5nZXQoa2V5KVxuICBpZiAoZW50cnkpIHtcbiAgICBpZiAoJ2Z1dHVyZScgaW4gZW50cnkpIHtcbiAgICAgIHJldHVybiBlbnRyeS5mdXR1cmVcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShlbnRyeSlcbiAgfVxuICBsZXQgcmVzb2x2ZXI6IChlbnRyeXBvaW50OiBUKSA9PiB2b2lkXG4gIGNvbnN0IHByb206IFByb21pc2U8VD4gPSBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSkgPT4ge1xuICAgIHJlc29sdmVyID0gcmVzb2x2ZVxuICB9KVxuICBtYXAuc2V0KGtleSwgKGVudHJ5ID0geyByZXNvbHZlOiByZXNvbHZlciEsIGZ1dHVyZTogcHJvbSB9KSlcbiAgcmV0dXJuIGdlbmVyYXRvclxuICAgID8gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlcXVlbmNlc1xuICAgICAgZ2VuZXJhdG9yKCkudGhlbigodmFsdWUpID0+IChyZXNvbHZlcih2YWx1ZSksIHZhbHVlKSlcbiAgICA6IHByb21cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZUxvYWRlciB7XG4gIHdoZW5FbnRyeXBvaW50KHJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlRW50cnlwb2ludD5cbiAgb25FbnRyeXBvaW50KHJvdXRlOiBzdHJpbmcsIGV4ZWN1dGU6ICgpID0+IHVua25vd24pOiB2b2lkXG4gIGxvYWRSb3V0ZShyb3V0ZTogc3RyaW5nKTogUHJvbWlzZTxSb3V0ZUxvYWRlckVudHJ5PlxuICBwcmVmZXRjaChyb3V0ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPlxufVxuXG5mdW5jdGlvbiBoYXNQcmVmZXRjaChsaW5rPzogSFRNTExpbmtFbGVtZW50KTogYm9vbGVhbiB7XG4gIHRyeSB7XG4gICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuICAgIHJldHVybiAoXG4gICAgICAvLyBkZXRlY3QgSUUxMSBzaW5jZSBpdCBzdXBwb3J0cyBwcmVmZXRjaCBidXQgaXNuJ3QgZGV0ZWN0ZWRcbiAgICAgIC8vIHdpdGggcmVsTGlzdC5zdXBwb3J0XG4gICAgICAoISF3aW5kb3cuTVNJbnB1dE1ldGhvZENvbnRleHQgJiYgISEoZG9jdW1lbnQgYXMgYW55KS5kb2N1bWVudE1vZGUpIHx8XG4gICAgICBsaW5rLnJlbExpc3Quc3VwcG9ydHMoJ3ByZWZldGNoJylcbiAgICApXG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IGNhblByZWZldGNoOiBib29sZWFuID0gaGFzUHJlZmV0Y2goKVxuXG5mdW5jdGlvbiBwcmVmZXRjaFZpYURvbShcbiAgaHJlZjogc3RyaW5nLFxuICBhczogc3RyaW5nLFxuICBsaW5rPzogSFRNTExpbmtFbGVtZW50XG4pOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpbmtbcmVsPVwicHJlZmV0Y2hcIl1baHJlZl49XCIke2hyZWZ9XCJdYCkpIHtcbiAgICAgIHJldHVybiByZXMoKVxuICAgIH1cblxuICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJylcblxuICAgIC8vIFRoZSBvcmRlciBvZiBwcm9wZXJ0eSBhc3NpZ25tZW50IGhlcmUgaXMgaW50ZW50aW9uYWw6XG4gICAgaWYgKGFzKSBsaW5rIS5hcyA9IGFzXG4gICAgbGluayEucmVsID0gYHByZWZldGNoYFxuICAgIGxpbmshLmNyb3NzT3JpZ2luID0gcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTiFcbiAgICBsaW5rIS5vbmxvYWQgPSByZXNcbiAgICBsaW5rIS5vbmVycm9yID0gcmVqXG5cbiAgICAvLyBgaHJlZmAgc2hvdWxkIGFsd2F5cyBiZSBsYXN0OlxuICAgIGxpbmshLmhyZWYgPSBocmVmXG5cbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspXG4gIH0pXG59XG5cbmNvbnN0IEFTU0VUX0xPQURfRVJST1IgPSBTeW1ib2woJ0FTU0VUX0xPQURfRVJST1InKVxuLy8gVE9ETzogdW5leHBvcnRcbmV4cG9ydCBmdW5jdGlvbiBtYXJrQXNzZXRFcnJvcihlcnI6IEVycm9yKTogRXJyb3Ige1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGVyciwgQVNTRVRfTE9BRF9FUlJPUiwge30pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Fzc2V0RXJyb3IoZXJyPzogRXJyb3IpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIGVyciAmJiBBU1NFVF9MT0FEX0VSUk9SIGluIGVyclxufVxuXG5mdW5jdGlvbiBhcHBlbmRTY3JpcHQoXG4gIHNyYzogc3RyaW5nLFxuICBzY3JpcHQ/OiBIVE1MU2NyaXB0RWxlbWVudFxuKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcblxuICAgIC8vIFRoZSBvcmRlciBvZiBwcm9wZXJ0eSBhc3NpZ25tZW50IGhlcmUgaXMgaW50ZW50aW9uYWwuXG4gICAgLy8gMS4gU2V0dXAgc3VjY2Vzcy9mYWlsdXJlIGhvb2tzIGluIGNhc2UgdGhlIGJyb3dzZXIgc3luY2hyb25vdXNseVxuICAgIC8vICAgIGV4ZWN1dGVzIHdoZW4gYHNyY2AgaXMgc2V0LlxuICAgIHNjcmlwdC5vbmxvYWQgPSByZXNvbHZlXG4gICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PlxuICAgICAgcmVqZWN0KG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc2NyaXB0OiAke3NyY31gKSkpXG5cbiAgICAvLyAyLiBDb25maWd1cmUgdGhlIGNyb3NzLW9yaWdpbiBhdHRyaWJ1dGUgYmVmb3JlIHNldHRpbmcgYHNyY2AgaW4gY2FzZSB0aGVcbiAgICAvLyAgICBicm93c2VyIGJlZ2lucyB0byBmZXRjaC5cbiAgICBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOIVxuXG4gICAgLy8gMy4gRmluYWxseSwgc2V0IHRoZSBzb3VyY2UgYW5kIGluamVjdCBpbnRvIHRoZSBET00gaW4gY2FzZSB0aGUgY2hpbGRcbiAgICAvLyAgICBtdXN0IGJlIGFwcGVuZGVkIGZvciBmZXRjaGluZyB0byBzdGFydC5cbiAgICBzY3JpcHQuc3JjID0gc3JjXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpXG4gIH0pXG59XG5cbi8vIFJlc29sdmUgYSBwcm9taXNlIHRoYXQgdGltZXMgb3V0IGFmdGVyIGdpdmVuIGFtb3VudCBvZiBtaWxsaXNlY29uZHMuXG5mdW5jdGlvbiByZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0PFQ+KFxuICBwOiBQcm9taXNlPFQ+LFxuICBtczogbnVtYmVyLFxuICBlcnI6IEVycm9yXG4pOiBQcm9taXNlPFQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2VcblxuICAgIHAudGhlbigocikgPT4ge1xuICAgICAgLy8gUmVzb2x2ZWQsIGNhbmNlbCB0aGUgdGltZW91dFxuICAgICAgY2FuY2VsbGVkID0gdHJ1ZVxuICAgICAgcmVzb2x2ZShyKVxuICAgIH0pLmNhdGNoKHJlamVjdClcblxuICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIWNhbmNlbGxlZCkge1xuICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgIH1cbiAgICAgIH0sIG1zKVxuICAgIClcbiAgfSlcbn1cblxuLy8gVE9ETzogc3RvcCBleHBvcnRpbmcgb3IgY2FjaGUgdGhlIGZhaWx1cmVcbi8vIEl0J2QgYmUgYmVzdCB0byBzdG9wIGV4cG9ydGluZyB0aGlzLiBJdCdzIGFuIGltcGxlbWVudGF0aW9uIGRldGFpbC4gV2UncmVcbi8vIG9ubHkgZXhwb3J0aW5nIGl0IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbHR5IHdpdGggdGhlIGBwYWdlLWxvYWRlcmAuXG4vLyBPbmx5IGNhY2hlIHRoaXMgcmVzcG9uc2UgYXMgYSBsYXN0IHJlc29ydCBpZiB3ZSBjYW5ub3QgZWxpbWluYXRlIGFsbCBvdGhlclxuLy8gY29kZSBicmFuY2hlcyB0aGF0IHVzZSB0aGUgQnVpbGQgTWFuaWZlc3QgQ2FsbGJhY2sgYW5kIHB1c2ggdGhlbSB0aHJvdWdoXG4vLyB0aGUgUm91dGUgTG9hZGVyIGludGVyZmFjZS5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGllbnRCdWlsZE1hbmlmZXN0KCk6IFByb21pc2U8Q2xpZW50QnVpbGRNYW5pZmVzdD4ge1xuICBpZiAoc2VsZi5fX0JVSUxEX01BTklGRVNUKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzZWxmLl9fQlVJTERfTUFOSUZFU1QpXG4gIH1cblxuICBjb25zdCBvbkJ1aWxkTWFuaWZlc3Q6IFByb21pc2U8Q2xpZW50QnVpbGRNYW5pZmVzdD4gPSBuZXcgUHJvbWlzZTxcbiAgICBDbGllbnRCdWlsZE1hbmlmZXN0XG4gID4oKHJlc29sdmUpID0+IHtcbiAgICAvLyBNYW5kYXRvcnkgYmVjYXVzZSB0aGlzIGlzIG5vdCBjb25jdXJyZW50IHNhZmU6XG4gICAgY29uc3QgY2IgPSBzZWxmLl9fQlVJTERfTUFOSUZFU1RfQ0JcbiAgICBzZWxmLl9fQlVJTERfTUFOSUZFU1RfQ0IgPSAoKSA9PiB7XG4gICAgICByZXNvbHZlKHNlbGYuX19CVUlMRF9NQU5JRkVTVCEpXG4gICAgICBjYiAmJiBjYigpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiByZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0PENsaWVudEJ1aWxkTWFuaWZlc3Q+KFxuICAgIG9uQnVpbGRNYW5pZmVzdCxcbiAgICBNU19NQVhfSURMRV9ERUxBWSxcbiAgICBtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGNsaWVudCBidWlsZCBtYW5pZmVzdCcpKVxuICApXG59XG5cbmludGVyZmFjZSBSb3V0ZUZpbGVzIHtcbiAgc2NyaXB0czogc3RyaW5nW11cbiAgY3NzOiBzdHJpbmdbXVxufVxuZnVuY3Rpb24gZ2V0RmlsZXNGb3JSb3V0ZShcbiAgYXNzZXRQcmVmaXg6IHN0cmluZyxcbiAgcm91dGU6IHN0cmluZ1xuKTogUHJvbWlzZTxSb3V0ZUZpbGVzPiB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgc2NyaXB0czogW1xuICAgICAgICBhc3NldFByZWZpeCArXG4gICAgICAgICAgJy9fbmV4dC9zdGF0aWMvY2h1bmtzL3BhZ2VzJyArXG4gICAgICAgICAgZW5jb2RlVVJJKGdldEFzc2V0UGF0aEZyb21Sb3V0ZShyb3V0ZSwgJy5qcycpKSxcbiAgICAgIF0sXG4gICAgICAvLyBTdHlsZXMgYXJlIGhhbmRsZWQgYnkgYHN0eWxlLWxvYWRlcmAgaW4gZGV2ZWxvcG1lbnQ6XG4gICAgICBjc3M6IFtdLFxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIGdldENsaWVudEJ1aWxkTWFuaWZlc3QoKS50aGVuKChtYW5pZmVzdCkgPT4ge1xuICAgIGlmICghKHJvdXRlIGluIG1hbmlmZXN0KSkge1xuICAgICAgdGhyb3cgbWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKGBGYWlsZWQgdG8gbG9va3VwIHJvdXRlOiAke3JvdXRlfWApKVxuICAgIH1cbiAgICBjb25zdCBhbGxGaWxlcyA9IG1hbmlmZXN0W3JvdXRlXS5tYXAoXG4gICAgICAoZW50cnkpID0+IGFzc2V0UHJlZml4ICsgJy9fbmV4dC8nICsgZW5jb2RlVVJJKGVudHJ5KVxuICAgIClcbiAgICByZXR1cm4ge1xuICAgICAgc2NyaXB0czogYWxsRmlsZXMuZmlsdGVyKCh2KSA9PiB2LmVuZHNXaXRoKCcuanMnKSksXG4gICAgICBjc3M6IGFsbEZpbGVzLmZpbHRlcigodikgPT4gdi5lbmRzV2l0aCgnLmNzcycpKSxcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlTG9hZGVyKGFzc2V0UHJlZml4OiBzdHJpbmcpOiBSb3V0ZUxvYWRlciB7XG4gIGNvbnN0IGVudHJ5cG9pbnRzOiBNYXA8XG4gICAgc3RyaW5nLFxuICAgIEZ1dHVyZTxSb3V0ZUVudHJ5cG9pbnQ+IHwgUm91dGVFbnRyeXBvaW50XG4gID4gPSBuZXcgTWFwKClcbiAgY29uc3QgbG9hZGVkU2NyaXB0czogTWFwPHN0cmluZywgUHJvbWlzZTx1bmtub3duPj4gPSBuZXcgTWFwKClcbiAgY29uc3Qgc3R5bGVTaGVldHM6IE1hcDxzdHJpbmcsIFByb21pc2U8Um91dGVTdHlsZVNoZWV0Pj4gPSBuZXcgTWFwKClcbiAgY29uc3Qgcm91dGVzOiBNYXA8XG4gICAgc3RyaW5nLFxuICAgIEZ1dHVyZTxSb3V0ZUxvYWRlckVudHJ5PiB8IFJvdXRlTG9hZGVyRW50cnlcbiAgPiA9IG5ldyBNYXAoKVxuXG4gIGZ1bmN0aW9uIG1heWJlRXhlY3V0ZVNjcmlwdChzcmM6IHN0cmluZyk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgIGxldCBwcm9tOiBQcm9taXNlPHVua25vd24+IHwgdW5kZWZpbmVkID0gbG9hZGVkU2NyaXB0cy5nZXQoc3JjKVxuICAgIGlmIChwcm9tKSB7XG4gICAgICByZXR1cm4gcHJvbVxuICAgIH1cblxuICAgIC8vIFNraXAgZXhlY3V0aW5nIHNjcmlwdCBpZiBpdCdzIGFscmVhZHkgaW4gdGhlIERPTTpcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyY149XCIke3NyY31cIl1gKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgfVxuXG4gICAgbG9hZGVkU2NyaXB0cy5zZXQoc3JjLCAocHJvbSA9IGFwcGVuZFNjcmlwdChzcmMpKSlcbiAgICByZXR1cm4gcHJvbVxuICB9XG5cbiAgZnVuY3Rpb24gZmV0Y2hTdHlsZVNoZWV0KGhyZWY6IHN0cmluZyk6IFByb21pc2U8Um91dGVTdHlsZVNoZWV0PiB7XG4gICAgbGV0IHByb206IFByb21pc2U8Um91dGVTdHlsZVNoZWV0PiB8IHVuZGVmaW5lZCA9IHN0eWxlU2hlZXRzLmdldChocmVmKVxuICAgIGlmIChwcm9tKSB7XG4gICAgICByZXR1cm4gcHJvbVxuICAgIH1cblxuICAgIHN0eWxlU2hlZXRzLnNldChcbiAgICAgIGhyZWYsXG4gICAgICAocHJvbSA9IGZldGNoKGhyZWYpXG4gICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBpZiAoIXJlcy5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzdHlsZXNoZWV0OiAke2hyZWZ9YClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcy50ZXh0KCkudGhlbigodGV4dCkgPT4gKHsgaHJlZjogaHJlZiwgY29udGVudDogdGV4dCB9KSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICB0aHJvdyBtYXJrQXNzZXRFcnJvcihlcnIpXG4gICAgICAgIH0pKVxuICAgIClcbiAgICByZXR1cm4gcHJvbVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aGVuRW50cnlwb2ludChyb3V0ZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gd2l0aEZ1dHVyZShyb3V0ZSwgZW50cnlwb2ludHMpXG4gICAgfSxcbiAgICBvbkVudHJ5cG9pbnQocm91dGU6IHN0cmluZywgZXhlY3V0ZTogKCkgPT4gdW5rbm93bikge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKGV4ZWN1dGUpXG4gICAgICAgIC50aGVuKChmbikgPT4gZm4oKSlcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgKGV4cG9ydHM6IGFueSkgPT4gKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogKGV4cG9ydHMgJiYgZXhwb3J0cy5kZWZhdWx0KSB8fCBleHBvcnRzLFxuICAgICAgICAgICAgZXhwb3J0czogZXhwb3J0cyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAoZXJyKSA9PiAoeyBlcnJvcjogZXJyIH0pXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oKGlucHV0OiBSb3V0ZUVudHJ5cG9pbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBvbGQgPSBlbnRyeXBvaW50cy5nZXQocm91dGUpXG4gICAgICAgICAgZW50cnlwb2ludHMuc2V0KHJvdXRlLCBpbnB1dClcbiAgICAgICAgICBpZiAob2xkICYmICdyZXNvbHZlJyBpbiBvbGQpIG9sZC5yZXNvbHZlKGlucHV0KVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgbG9hZFJvdXRlKHJvdXRlOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiB3aXRoRnV0dXJlPFJvdXRlTG9hZGVyRW50cnk+KHJvdXRlLCByb3V0ZXMsIGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB7IHNjcmlwdHMsIGNzcyB9ID0gYXdhaXQgZ2V0RmlsZXNGb3JSb3V0ZShhc3NldFByZWZpeCwgcm91dGUpXG4gICAgICAgICAgY29uc3QgWywgc3R5bGVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGVudHJ5cG9pbnRzLmhhcyhyb3V0ZSlcbiAgICAgICAgICAgICAgPyBbXVxuICAgICAgICAgICAgICA6IFByb21pc2UuYWxsKHNjcmlwdHMubWFwKG1heWJlRXhlY3V0ZVNjcmlwdCkpLFxuICAgICAgICAgICAgUHJvbWlzZS5hbGwoY3NzLm1hcChmZXRjaFN0eWxlU2hlZXQpKSxcbiAgICAgICAgICBdIGFzIGNvbnN0KVxuXG4gICAgICAgICAgY29uc3QgZW50cnlwb2ludDogUm91dGVFbnRyeXBvaW50ID0gYXdhaXQgcmVzb2x2ZVByb21pc2VXaXRoVGltZW91dChcbiAgICAgICAgICAgIHRoaXMud2hlbkVudHJ5cG9pbnQocm91dGUpLFxuICAgICAgICAgICAgTVNfTUFYX0lETEVfREVMQVksXG4gICAgICAgICAgICBtYXJrQXNzZXRFcnJvcihcbiAgICAgICAgICAgICAgbmV3IEVycm9yKGBSb3V0ZSBkaWQgbm90IGNvbXBsZXRlIGxvYWRpbmc6ICR7cm91dGV9YClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG5cbiAgICAgICAgICBjb25zdCByZXM6IFJvdXRlTG9hZGVyRW50cnkgPSBPYmplY3QuYXNzaWduPFxuICAgICAgICAgICAgeyBzdHlsZXM6IFJvdXRlU3R5bGVTaGVldFtdIH0sXG4gICAgICAgICAgICBSb3V0ZUVudHJ5cG9pbnRcbiAgICAgICAgICA+KHsgc3R5bGVzIH0sIGVudHJ5cG9pbnQpXG4gICAgICAgICAgcmV0dXJuICdlcnJvcicgaW4gZW50cnlwb2ludCA/IGVudHJ5cG9pbnQgOiByZXNcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IGVyciB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBwcmVmZXRjaChyb3V0ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lTGFicy9xdWlja2xpbmsvYmxvYi80NTNhNjYxZmExZmE5NDBlMmQyZTA0NDQ1MjM5OGUzOGM2N2E5OGZiL3NyYy9pbmRleC5tanMjTDExNS1MMTE4XG4gICAgICAvLyBMaWNlbnNlOiBBcGFjaGUgMi4wXG4gICAgICBsZXQgY25cbiAgICAgIGlmICgoY24gPSAobmF2aWdhdG9yIGFzIGFueSkuY29ubmVjdGlvbikpIHtcbiAgICAgICAgLy8gRG9uJ3QgcHJlZmV0Y2ggaWYgdXNpbmcgMkcgb3IgaWYgU2F2ZS1EYXRhIGlzIGVuYWJsZWQuXG4gICAgICAgIGlmIChjbi5zYXZlRGF0YSB8fCAvMmcvLnRlc3QoY24uZWZmZWN0aXZlVHlwZSkpIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGdldEZpbGVzRm9yUm91dGUoYXNzZXRQcmVmaXgsIHJvdXRlKVxuICAgICAgICAudGhlbigob3V0cHV0KSA9PlxuICAgICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgY2FuUHJlZmV0Y2hcbiAgICAgICAgICAgICAgPyBvdXRwdXQuc2NyaXB0cy5tYXAoKHNjcmlwdCkgPT4gcHJlZmV0Y2hWaWFEb20oc2NyaXB0LCAnc2NyaXB0JykpXG4gICAgICAgICAgICAgIDogW11cbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4gdGhpcy5sb2FkUm91dGUocm91dGUpKVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goXG4gICAgICAgICAgLy8gc3dhbGxvdyBwcmVmZXRjaCBlcnJvcnNcbiAgICAgICAgICAoKSA9PiB7fVxuICAgICAgICApXG4gICAgfSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSb3V0ZUxvYWRlclxuIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJvdXRlciwgeyBOZXh0Um91dGVyIH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci9yb3V0ZXInXG5pbXBvcnQgeyBSb3V0ZXJDb250ZXh0IH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci1jb250ZXh0J1xuXG50eXBlIENsYXNzQXJndW1lbnRzPFQ+ID0gVCBleHRlbmRzIG5ldyAoLi4uYXJnczogaW5mZXIgVSkgPT4gYW55ID8gVSA6IGFueVxuXG50eXBlIFJvdXRlckFyZ3MgPSBDbGFzc0FyZ3VtZW50czx0eXBlb2YgUm91dGVyPlxuXG50eXBlIFNpbmdsZXRvblJvdXRlckJhc2UgPSB7XG4gIHJvdXRlcjogUm91dGVyIHwgbnVsbFxuICByZWFkeUNhbGxiYWNrczogQXJyYXk8KCkgPT4gYW55PlxuICByZWFkeShjYjogKCkgPT4gYW55KTogdm9pZFxufVxuXG5leHBvcnQgeyBSb3V0ZXIsIE5leHRSb3V0ZXIgfVxuXG5leHBvcnQgdHlwZSBTaW5nbGV0b25Sb3V0ZXIgPSBTaW5nbGV0b25Sb3V0ZXJCYXNlICYgTmV4dFJvdXRlclxuXG5jb25zdCBzaW5nbGV0b25Sb3V0ZXI6IFNpbmdsZXRvblJvdXRlckJhc2UgPSB7XG4gIHJvdXRlcjogbnVsbCwgLy8gaG9sZHMgdGhlIGFjdHVhbCByb3V0ZXIgaW5zdGFuY2VcbiAgcmVhZHlDYWxsYmFja3M6IFtdLFxuICByZWFkeShjYjogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLnJvdXRlcikgcmV0dXJuIGNiKClcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMucmVhZHlDYWxsYmFja3MucHVzaChjYilcbiAgICB9XG4gIH0sXG59XG5cbi8vIENyZWF0ZSBwdWJsaWMgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBvZiB0aGUgcm91dGVyIGluIHRoZSBzaW5nbGV0b25Sb3V0ZXJcbmNvbnN0IHVybFByb3BlcnR5RmllbGRzID0gW1xuICAncGF0aG5hbWUnLFxuICAncm91dGUnLFxuICAncXVlcnknLFxuICAnYXNQYXRoJyxcbiAgJ2NvbXBvbmVudHMnLFxuICAnaXNGYWxsYmFjaycsXG4gICdiYXNlUGF0aCcsXG4gICdsb2NhbGUnLFxuICAnbG9jYWxlcycsXG4gICdkZWZhdWx0TG9jYWxlJyxcbiAgJ2lzUmVhZHknLFxuICAnaXNQcmV2aWV3JyxcbiAgJ2lzTG9jYWxlRG9tYWluJyxcbl1cbmNvbnN0IHJvdXRlckV2ZW50cyA9IFtcbiAgJ3JvdXRlQ2hhbmdlU3RhcnQnLFxuICAnYmVmb3JlSGlzdG9yeUNoYW5nZScsXG4gICdyb3V0ZUNoYW5nZUNvbXBsZXRlJyxcbiAgJ3JvdXRlQ2hhbmdlRXJyb3InLFxuICAnaGFzaENoYW5nZVN0YXJ0JyxcbiAgJ2hhc2hDaGFuZ2VDb21wbGV0ZScsXG5dXG5jb25zdCBjb3JlTWV0aG9kRmllbGRzID0gW1xuICAncHVzaCcsXG4gICdyZXBsYWNlJyxcbiAgJ3JlbG9hZCcsXG4gICdiYWNrJyxcbiAgJ3ByZWZldGNoJyxcbiAgJ2JlZm9yZVBvcFN0YXRlJyxcbl1cblxuLy8gRXZlbnRzIGlzIGEgc3RhdGljIHByb3BlcnR5IG9uIHRoZSByb3V0ZXIsIHRoZSByb3V0ZXIgZG9lc24ndCBoYXZlIHRvIGJlIGluaXRpYWxpemVkIHRvIHVzZSBpdFxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHNpbmdsZXRvblJvdXRlciwgJ2V2ZW50cycsIHtcbiAgZ2V0KCkge1xuICAgIHJldHVybiBSb3V0ZXIuZXZlbnRzXG4gIH0sXG59KVxuXG51cmxQcm9wZXJ0eUZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nKSA9PiB7XG4gIC8vIEhlcmUgd2UgbmVlZCB0byB1c2UgT2JqZWN0LmRlZmluZVByb3BlcnR5IGJlY2F1c2UsIHdlIG5lZWQgdG8gcmV0dXJuXG4gIC8vIHRoZSBwcm9wZXJ0eSBhc3NpZ25lZCB0byB0aGUgYWN0dWFsIHJvdXRlclxuICAvLyBUaGUgdmFsdWUgbWlnaHQgZ2V0IGNoYW5nZWQgYXMgd2UgY2hhbmdlIHJvdXRlcyBhbmQgdGhpcyBpcyB0aGVcbiAgLy8gcHJvcGVyIHdheSB0byBhY2Nlc3MgaXRcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNpbmdsZXRvblJvdXRlciwgZmllbGQsIHtcbiAgICBnZXQoKSB7XG4gICAgICBjb25zdCByb3V0ZXIgPSBnZXRSb3V0ZXIoKSBhcyBhbnlcbiAgICAgIHJldHVybiByb3V0ZXJbZmllbGRdIGFzIHN0cmluZ1xuICAgIH0sXG4gIH0pXG59KVxuXG5jb3JlTWV0aG9kRmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcpID0+IHtcbiAgLy8gV2UgZG9uJ3QgcmVhbGx5IGtub3cgdGhlIHR5cGVzIGhlcmUsIHNvIHdlIGFkZCB0aGVtIGxhdGVyIGluc3RlYWRcbiAgOyhzaW5nbGV0b25Sb3V0ZXIgYXMgYW55KVtmaWVsZF0gPSAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSBnZXRSb3V0ZXIoKSBhcyBhbnlcbiAgICByZXR1cm4gcm91dGVyW2ZpZWxkXSguLi5hcmdzKVxuICB9XG59KVxuXG5yb3V0ZXJFdmVudHMuZm9yRWFjaCgoZXZlbnQ6IHN0cmluZykgPT4ge1xuICBzaW5nbGV0b25Sb3V0ZXIucmVhZHkoKCkgPT4ge1xuICAgIFJvdXRlci5ldmVudHMub24oZXZlbnQsICguLi5hcmdzKSA9PiB7XG4gICAgICBjb25zdCBldmVudEZpZWxkID0gYG9uJHtldmVudC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke2V2ZW50LnN1YnN0cmluZyhcbiAgICAgICAgMVxuICAgICAgKX1gXG4gICAgICBjb25zdCBfc2luZ2xldG9uUm91dGVyID0gc2luZ2xldG9uUm91dGVyIGFzIGFueVxuICAgICAgaWYgKF9zaW5nbGV0b25Sb3V0ZXJbZXZlbnRGaWVsZF0pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBfc2luZ2xldG9uUm91dGVyW2V2ZW50RmllbGRdKC4uLmFyZ3MpXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoZW4gcnVubmluZyB0aGUgUm91dGVyIGV2ZW50OiAke2V2ZW50RmllbGR9YClcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGAke2Vyci5tZXNzYWdlfVxcbiR7ZXJyLnN0YWNrfWApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxufSlcblxuZnVuY3Rpb24gZ2V0Um91dGVyKCk6IFJvdXRlciB7XG4gIGlmICghc2luZ2xldG9uUm91dGVyLnJvdXRlcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgJ05vIHJvdXRlciBpbnN0YW5jZSBmb3VuZC5cXG4nICtcbiAgICAgICdZb3Ugc2hvdWxkIG9ubHkgdXNlIFwibmV4dC9yb3V0ZXJcIiBpbnNpZGUgdGhlIGNsaWVudCBzaWRlIG9mIHlvdXIgYXBwLlxcbidcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSlcbiAgfVxuICByZXR1cm4gc2luZ2xldG9uUm91dGVyLnJvdXRlclxufVxuXG4vLyBFeHBvcnQgdGhlIHNpbmdsZXRvblJvdXRlciBhbmQgdGhpcyBpcyB0aGUgcHVibGljIEFQSS5cbmV4cG9ydCBkZWZhdWx0IHNpbmdsZXRvblJvdXRlciBhcyBTaW5nbGV0b25Sb3V0ZXJcblxuLy8gUmVleHBvcnQgdGhlIHdpdGhSb3V0ZSBIT0NcbmV4cG9ydCB7IGRlZmF1bHQgYXMgd2l0aFJvdXRlciB9IGZyb20gJy4vd2l0aC1yb3V0ZXInXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSb3V0ZXIoKTogTmV4dFJvdXRlciB7XG4gIHJldHVybiBSZWFjdC51c2VDb250ZXh0KFJvdXRlckNvbnRleHQpXG59XG5cbi8vIElOVEVSTkFMIEFQSVNcbi8vIC0tLS0tLS0tLS0tLS1cbi8vIChkbyBub3QgdXNlIGZvbGxvd2luZyBleHBvcnRzIGluc2lkZSB0aGUgYXBwKVxuXG4vLyBDcmVhdGUgYSByb3V0ZXIgYW5kIGFzc2lnbiBpdCBhcyB0aGUgc2luZ2xldG9uIGluc3RhbmNlLlxuLy8gVGhpcyBpcyB1c2VkIGluIGNsaWVudCBzaWRlIHdoZW4gd2UgYXJlIGluaXRpbGl6aW5nIHRoZSBhcHAuXG4vLyBUaGlzIHNob3VsZCAqKm5vdCoqIHVzZSBpbnNpZGUgdGhlIHNlcnZlci5cbmV4cG9ydCBjb25zdCBjcmVhdGVSb3V0ZXIgPSAoLi4uYXJnczogUm91dGVyQXJncyk6IFJvdXRlciA9PiB7XG4gIHNpbmdsZXRvblJvdXRlci5yb3V0ZXIgPSBuZXcgUm91dGVyKC4uLmFyZ3MpXG4gIHNpbmdsZXRvblJvdXRlci5yZWFkeUNhbGxiYWNrcy5mb3JFYWNoKChjYikgPT4gY2IoKSlcbiAgc2luZ2xldG9uUm91dGVyLnJlYWR5Q2FsbGJhY2tzID0gW11cblxuICByZXR1cm4gc2luZ2xldG9uUm91dGVyLnJvdXRlclxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gY3JlYXRlIHRoZSBgd2l0aFJvdXRlcmAgcm91dGVyIGluc3RhbmNlXG5leHBvcnQgZnVuY3Rpb24gbWFrZVB1YmxpY1JvdXRlckluc3RhbmNlKHJvdXRlcjogUm91dGVyKTogTmV4dFJvdXRlciB7XG4gIGNvbnN0IF9yb3V0ZXIgPSByb3V0ZXIgYXMgYW55XG4gIGNvbnN0IGluc3RhbmNlID0ge30gYXMgYW55XG5cbiAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiB1cmxQcm9wZXJ0eUZpZWxkcykge1xuICAgIGlmICh0eXBlb2YgX3JvdXRlcltwcm9wZXJ0eV0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnN0YW5jZVtwcm9wZXJ0eV0gPSBPYmplY3QuYXNzaWduKFxuICAgICAgICBBcnJheS5pc0FycmF5KF9yb3V0ZXJbcHJvcGVydHldKSA/IFtdIDoge30sXG4gICAgICAgIF9yb3V0ZXJbcHJvcGVydHldXG4gICAgICApIC8vIG1ha2VzIHN1cmUgcXVlcnkgaXMgbm90IHN0YXRlZnVsXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGluc3RhbmNlW3Byb3BlcnR5XSA9IF9yb3V0ZXJbcHJvcGVydHldXG4gIH1cblxuICAvLyBFdmVudHMgaXMgYSBzdGF0aWMgcHJvcGVydHkgb24gdGhlIHJvdXRlciwgdGhlIHJvdXRlciBkb2Vzbid0IGhhdmUgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gdXNlIGl0XG4gIGluc3RhbmNlLmV2ZW50cyA9IFJvdXRlci5ldmVudHNcblxuICBjb3JlTWV0aG9kRmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgaW5zdGFuY2VbZmllbGRdID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICByZXR1cm4gX3JvdXRlcltmaWVsZF0oLi4uYXJncylcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGluc3RhbmNlXG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBOZXh0Q29tcG9uZW50VHlwZSwgTmV4dFBhZ2VDb250ZXh0IH0gZnJvbSAnLi4vbmV4dC1zZXJ2ZXIvbGliL3V0aWxzJ1xuaW1wb3J0IHsgTmV4dFJvdXRlciwgdXNlUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXInXG5cbmV4cG9ydCB0eXBlIFdpdGhSb3V0ZXJQcm9wcyA9IHtcbiAgcm91dGVyOiBOZXh0Um91dGVyXG59XG5cbmV4cG9ydCB0eXBlIEV4Y2x1ZGVSb3V0ZXJQcm9wczxQPiA9IFBpY2s8XG4gIFAsXG4gIEV4Y2x1ZGU8a2V5b2YgUCwga2V5b2YgV2l0aFJvdXRlclByb3BzPlxuPlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aXRoUm91dGVyPFxuICBQIGV4dGVuZHMgV2l0aFJvdXRlclByb3BzLFxuICBDID0gTmV4dFBhZ2VDb250ZXh0XG4+KFxuICBDb21wb3NlZENvbXBvbmVudDogTmV4dENvbXBvbmVudFR5cGU8QywgYW55LCBQPlxuKTogUmVhY3QuQ29tcG9uZW50VHlwZTxFeGNsdWRlUm91dGVyUHJvcHM8UD4+IHtcbiAgZnVuY3Rpb24gV2l0aFJvdXRlcldyYXBwZXIocHJvcHM6IGFueSk6IEpTWC5FbGVtZW50IHtcbiAgICByZXR1cm4gPENvbXBvc2VkQ29tcG9uZW50IHJvdXRlcj17dXNlUm91dGVyKCl9IHsuLi5wcm9wc30gLz5cbiAgfVxuXG4gIFdpdGhSb3V0ZXJXcmFwcGVyLmdldEluaXRpYWxQcm9wcyA9IENvbXBvc2VkQ29tcG9uZW50LmdldEluaXRpYWxQcm9wc1xuICAvLyBUaGlzIGlzIG5lZWRlZCB0byBhbGxvdyBjaGVja2luZyBmb3IgY3VzdG9tIGdldEluaXRpYWxQcm9wcyBpbiBfYXBwXG4gIDsoV2l0aFJvdXRlcldyYXBwZXIgYXMgYW55KS5vcmlnR2V0SW5pdGlhbFByb3BzID0gKENvbXBvc2VkQ29tcG9uZW50IGFzIGFueSkub3JpZ0dldEluaXRpYWxQcm9wc1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGNvbnN0IG5hbWUgPVxuICAgICAgQ29tcG9zZWRDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9zZWRDb21wb25lbnQubmFtZSB8fCAnVW5rbm93bidcbiAgICBXaXRoUm91dGVyV3JhcHBlci5kaXNwbGF5TmFtZSA9IGB3aXRoUm91dGVyKCR7bmFtZX0pYFxuICB9XG5cbiAgcmV0dXJuIFdpdGhSb3V0ZXJXcmFwcGVyXG59XG4iLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHM7IiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKTtcblxuZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkge1xuICBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gIHZhciBjYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbiAgX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkge1xuICAgIHJldHVybiBjYWNoZTtcbiAgfTtcblxuICByZXR1cm4gY2FjaGU7XG59XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikge1xuICBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmIChvYmogPT09IG51bGwgfHwgX3R5cGVvZihvYmopICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB7XG4gICAgICBcImRlZmF1bHRcIjogb2JqXG4gICAgfTtcbiAgfVxuXG4gIHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpO1xuXG4gIGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkge1xuICAgIHJldHVybiBjYWNoZS5nZXQob2JqKTtcbiAgfVxuXG4gIHZhciBuZXdPYmogPSB7fTtcbiAgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgdmFyIGRlc2MgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IG51bGw7XG5cbiAgICAgIGlmIChkZXNjICYmIChkZXNjLmdldCB8fCBkZXNjLnNldCkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld09ialtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmV3T2JqW1wiZGVmYXVsdFwiXSA9IG9iajtcblxuICBpZiAoY2FjaGUpIHtcbiAgICBjYWNoZS5zZXQob2JqLCBuZXdPYmopO1xuICB9XG5cbiAgcmV0dXJuIG5ld09iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZDsiLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7Il0sInNvdXJjZVJvb3QiOiIifQ==