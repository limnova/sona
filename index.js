/**
 * @name Sona
 * @version 1.11.0
 * @description 基于 Pengu Loader 的国服英雄联盟排位分析插件
 * @author WJZ_P
 * @link https://github.com/limnova/sona
 */
import "./index.css";
var V1 = Object.defineProperty;
var X1 = (l, i, c) => i in l ? V1(l, i, { enumerable: !0, configurable: !0, writable: !0, value: c }) : l[i] = c;
var ct = (l, i, c) => X1(l, typeof i != "symbol" ? i + "" : i, c);
var Uf = { exports: {} }, us = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var r0;
function Z1() {
  if (r0) return us;
  r0 = 1;
  var l = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function c(o, r, m) {
    var g = null;
    if (m !== void 0 && (g = "" + m), r.key !== void 0 && (g = "" + r.key), "key" in r) {
      m = {};
      for (var p in r)
        p !== "key" && (m[p] = r[p]);
    } else m = r;
    return r = m.ref, {
      $$typeof: l,
      type: o,
      key: g,
      ref: r !== void 0 ? r : null,
      props: m
    };
  }
  return us.Fragment = i, us.jsx = c, us.jsxs = c, us;
}
var f0;
function J1() {
  return f0 || (f0 = 1, Uf.exports = Z1()), Uf.exports;
}
var f = J1(), zf = { exports: {} }, cs = {}, Of = { exports: {} }, Df = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var d0;
function Y1() {
  return d0 || (d0 = 1, (function(l) {
    function i(z, Y) {
      var ae = z.length;
      z.push(Y);
      e: for (; 0 < ae; ) {
        var Te = ae - 1 >>> 1, P = z[Te];
        if (0 < r(P, Y))
          z[Te] = Y, z[ae] = P, ae = Te;
        else break e;
      }
    }
    function c(z) {
      return z.length === 0 ? null : z[0];
    }
    function o(z) {
      if (z.length === 0) return null;
      var Y = z[0], ae = z.pop();
      if (ae !== Y) {
        z[0] = ae;
        e: for (var Te = 0, P = z.length, A = P >>> 1; Te < A; ) {
          var B = 2 * (Te + 1) - 1, W = z[B], $ = B + 1, fe = z[$];
          if (0 > r(W, ae))
            $ < P && 0 > r(fe, W) ? (z[Te] = fe, z[$] = ae, Te = $) : (z[Te] = W, z[B] = ae, Te = B);
          else if ($ < P && 0 > r(fe, ae))
            z[Te] = fe, z[$] = ae, Te = $;
          else break e;
        }
      }
      return Y;
    }
    function r(z, Y) {
      var ae = z.sortIndex - Y.sortIndex;
      return ae !== 0 ? ae : z.id - Y.id;
    }
    if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      l.unstable_now = function() {
        return m.now();
      };
    } else {
      var g = Date, p = g.now();
      l.unstable_now = function() {
        return g.now() - p;
      };
    }
    var y = [], v = [], S = 1, b = null, N = 3, X = !1, I = !1, w = !1, j = !1, F = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, J = typeof setImmediate < "u" ? setImmediate : null;
    function H(z) {
      for (var Y = c(v); Y !== null; ) {
        if (Y.callback === null) o(v);
        else if (Y.startTime <= z)
          o(v), Y.sortIndex = Y.expirationTime, i(y, Y);
        else break;
        Y = c(v);
      }
    }
    function Z(z) {
      if (w = !1, H(z), !I)
        if (c(y) !== null)
          I = !0, K || (K = !0, ge());
        else {
          var Y = c(v);
          Y !== null && Le(Z, Y.startTime - z);
        }
    }
    var K = !1, Q = -1, _ = 5, pe = -1;
    function re() {
      return j ? !0 : !(l.unstable_now() - pe < _);
    }
    function ue() {
      if (j = !1, K) {
        var z = l.unstable_now();
        pe = z;
        var Y = !0;
        try {
          e: {
            I = !1, w && (w = !1, V(Q), Q = -1), X = !0;
            var ae = N;
            try {
              t: {
                for (H(z), b = c(y); b !== null && !(b.expirationTime > z && re()); ) {
                  var Te = b.callback;
                  if (typeof Te == "function") {
                    b.callback = null, N = b.priorityLevel;
                    var P = Te(
                      b.expirationTime <= z
                    );
                    if (z = l.unstable_now(), typeof P == "function") {
                      b.callback = P, H(z), Y = !0;
                      break t;
                    }
                    b === c(y) && o(y), H(z);
                  } else o(y);
                  b = c(y);
                }
                if (b !== null) Y = !0;
                else {
                  var A = c(v);
                  A !== null && Le(
                    Z,
                    A.startTime - z
                  ), Y = !1;
                }
              }
              break e;
            } finally {
              b = null, N = ae, X = !1;
            }
            Y = void 0;
          }
        } finally {
          Y ? ge() : K = !1;
        }
      }
    }
    var ge;
    if (typeof J == "function")
      ge = function() {
        J(ue);
      };
    else if (typeof MessageChannel < "u") {
      var Oe = new MessageChannel(), we = Oe.port2;
      Oe.port1.onmessage = ue, ge = function() {
        we.postMessage(null);
      };
    } else
      ge = function() {
        F(ue, 0);
      };
    function Le(z, Y) {
      Q = F(function() {
        z(l.unstable_now());
      }, Y);
    }
    l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, l.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : _ = 0 < z ? Math.floor(1e3 / z) : 5;
    }, l.unstable_getCurrentPriorityLevel = function() {
      return N;
    }, l.unstable_next = function(z) {
      switch (N) {
        case 1:
        case 2:
        case 3:
          var Y = 3;
          break;
        default:
          Y = N;
      }
      var ae = N;
      N = Y;
      try {
        return z();
      } finally {
        N = ae;
      }
    }, l.unstable_requestPaint = function() {
      j = !0;
    }, l.unstable_runWithPriority = function(z, Y) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var ae = N;
      N = z;
      try {
        return Y();
      } finally {
        N = ae;
      }
    }, l.unstable_scheduleCallback = function(z, Y, ae) {
      var Te = l.unstable_now();
      switch (typeof ae == "object" && ae !== null ? (ae = ae.delay, ae = typeof ae == "number" && 0 < ae ? Te + ae : Te) : ae = Te, z) {
        case 1:
          var P = -1;
          break;
        case 2:
          P = 250;
          break;
        case 5:
          P = 1073741823;
          break;
        case 4:
          P = 1e4;
          break;
        default:
          P = 5e3;
      }
      return P = ae + P, z = {
        id: S++,
        callback: Y,
        priorityLevel: z,
        startTime: ae,
        expirationTime: P,
        sortIndex: -1
      }, ae > Te ? (z.sortIndex = ae, i(v, z), c(y) === null && z === c(v) && (w ? (V(Q), Q = -1) : w = !0, Le(Z, ae - Te))) : (z.sortIndex = P, i(y, z), I || X || (I = !0, K || (K = !0, ge()))), z;
    }, l.unstable_shouldYield = re, l.unstable_wrapCallback = function(z) {
      var Y = N;
      return function() {
        var ae = N;
        N = Y;
        try {
          return z.apply(this, arguments);
        } finally {
          N = ae;
        }
      };
    };
  })(Df)), Df;
}
var m0;
function P1() {
  return m0 || (m0 = 1, Of.exports = Y1()), Of.exports;
}
var wf = { exports: {} }, de = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h0;
function F1() {
  if (h0) return de;
  h0 = 1;
  var l = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), m = Symbol.for("react.consumer"), g = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), v = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), N = Symbol.iterator;
  function X(A) {
    return A === null || typeof A != "object" ? null : (A = N && A[N] || A["@@iterator"], typeof A == "function" ? A : null);
  }
  var I = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, w = Object.assign, j = {};
  function F(A, B, W) {
    this.props = A, this.context = B, this.refs = j, this.updater = W || I;
  }
  F.prototype.isReactComponent = {}, F.prototype.setState = function(A, B) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, B, "setState");
  }, F.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function V() {
  }
  V.prototype = F.prototype;
  function J(A, B, W) {
    this.props = A, this.context = B, this.refs = j, this.updater = W || I;
  }
  var H = J.prototype = new V();
  H.constructor = J, w(H, F.prototype), H.isPureReactComponent = !0;
  var Z = Array.isArray;
  function K() {
  }
  var Q = { H: null, A: null, T: null, S: null }, _ = Object.prototype.hasOwnProperty;
  function pe(A, B, W) {
    var $ = W.ref;
    return {
      $$typeof: l,
      type: A,
      key: B,
      ref: $ !== void 0 ? $ : null,
      props: W
    };
  }
  function re(A, B) {
    return pe(A.type, B, A.props);
  }
  function ue(A) {
    return typeof A == "object" && A !== null && A.$$typeof === l;
  }
  function ge(A) {
    var B = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(W) {
      return B[W];
    });
  }
  var Oe = /\/+/g;
  function we(A, B) {
    return typeof A == "object" && A !== null && A.key != null ? ge("" + A.key) : B.toString(36);
  }
  function Le(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(K, K) : (A.status = "pending", A.then(
          function(B) {
            A.status === "pending" && (A.status = "fulfilled", A.value = B);
          },
          function(B) {
            A.status === "pending" && (A.status = "rejected", A.reason = B);
          }
        )), A.status) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function z(A, B, W, $, fe) {
    var se = typeof A;
    (se === "undefined" || se === "boolean") && (A = null);
    var le = !1;
    if (A === null) le = !0;
    else
      switch (se) {
        case "bigint":
        case "string":
        case "number":
          le = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case l:
            case i:
              le = !0;
              break;
            case S:
              return le = A._init, z(
                le(A._payload),
                B,
                W,
                $,
                fe
              );
          }
      }
    if (le)
      return fe = fe(A), le = $ === "" ? "." + we(A, 0) : $, Z(fe) ? (W = "", le != null && (W = le.replace(Oe, "$&/") + "/"), z(fe, B, W, "", function(nn) {
        return nn;
      })) : fe != null && (ue(fe) && (fe = re(
        fe,
        W + (fe.key == null || A && A.key === fe.key ? "" : ("" + fe.key).replace(
          Oe,
          "$&/"
        ) + "/") + le
      )), B.push(fe)), 1;
    le = 0;
    var Be = $ === "" ? "." : $ + ":";
    if (Z(A))
      for (var Ie = 0; Ie < A.length; Ie++)
        $ = A[Ie], se = Be + we($, Ie), le += z(
          $,
          B,
          W,
          se,
          fe
        );
    else if (Ie = X(A), typeof Ie == "function")
      for (A = Ie.call(A), Ie = 0; !($ = A.next()).done; )
        $ = $.value, se = Be + we($, Ie++), le += z(
          $,
          B,
          W,
          se,
          fe
        );
    else if (se === "object") {
      if (typeof A.then == "function")
        return z(
          Le(A),
          B,
          W,
          $,
          fe
        );
      throw B = String(A), Error(
        "Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return le;
  }
  function Y(A, B, W) {
    if (A == null) return A;
    var $ = [], fe = 0;
    return z(A, $, "", "", function(se) {
      return B.call(W, se, fe++);
    }), $;
  }
  function ae(A) {
    if (A._status === -1) {
      var B = A._result;
      B = B(), B.then(
        function(W) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = W);
        },
        function(W) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = W);
        }
      ), A._status === -1 && (A._status = 0, A._result = B);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var Te = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var B = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(B)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  }, P = {
    map: Y,
    forEach: function(A, B, W) {
      Y(
        A,
        function() {
          B.apply(this, arguments);
        },
        W
      );
    },
    count: function(A) {
      var B = 0;
      return Y(A, function() {
        B++;
      }), B;
    },
    toArray: function(A) {
      return Y(A, function(B) {
        return B;
      }) || [];
    },
    only: function(A) {
      if (!ue(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return de.Activity = b, de.Children = P, de.Component = F, de.Fragment = c, de.Profiler = r, de.PureComponent = J, de.StrictMode = o, de.Suspense = y, de.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q, de.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return Q.H.useMemoCache(A);
    }
  }, de.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, de.cacheSignal = function() {
    return null;
  }, de.cloneElement = function(A, B, W) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var $ = w({}, A.props), fe = A.key;
    if (B != null)
      for (se in B.key !== void 0 && (fe = "" + B.key), B)
        !_.call(B, se) || se === "key" || se === "__self" || se === "__source" || se === "ref" && B.ref === void 0 || ($[se] = B[se]);
    var se = arguments.length - 2;
    if (se === 1) $.children = W;
    else if (1 < se) {
      for (var le = Array(se), Be = 0; Be < se; Be++)
        le[Be] = arguments[Be + 2];
      $.children = le;
    }
    return pe(A.type, fe, $);
  }, de.createContext = function(A) {
    return A = {
      $$typeof: g,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: m,
      _context: A
    }, A;
  }, de.createElement = function(A, B, W) {
    var $, fe = {}, se = null;
    if (B != null)
      for ($ in B.key !== void 0 && (se = "" + B.key), B)
        _.call(B, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (fe[$] = B[$]);
    var le = arguments.length - 2;
    if (le === 1) fe.children = W;
    else if (1 < le) {
      for (var Be = Array(le), Ie = 0; Ie < le; Ie++)
        Be[Ie] = arguments[Ie + 2];
      fe.children = Be;
    }
    if (A && A.defaultProps)
      for ($ in le = A.defaultProps, le)
        fe[$] === void 0 && (fe[$] = le[$]);
    return pe(A, se, fe);
  }, de.createRef = function() {
    return { current: null };
  }, de.forwardRef = function(A) {
    return { $$typeof: p, render: A };
  }, de.isValidElement = ue, de.lazy = function(A) {
    return {
      $$typeof: S,
      _payload: { _status: -1, _result: A },
      _init: ae
    };
  }, de.memo = function(A, B) {
    return {
      $$typeof: v,
      type: A,
      compare: B === void 0 ? null : B
    };
  }, de.startTransition = function(A) {
    var B = Q.T, W = {};
    Q.T = W;
    try {
      var $ = A(), fe = Q.S;
      fe !== null && fe(W, $), typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(K, Te);
    } catch (se) {
      Te(se);
    } finally {
      B !== null && W.types !== null && (B.types = W.types), Q.T = B;
    }
  }, de.unstable_useCacheRefresh = function() {
    return Q.H.useCacheRefresh();
  }, de.use = function(A) {
    return Q.H.use(A);
  }, de.useActionState = function(A, B, W) {
    return Q.H.useActionState(A, B, W);
  }, de.useCallback = function(A, B) {
    return Q.H.useCallback(A, B);
  }, de.useContext = function(A) {
    return Q.H.useContext(A);
  }, de.useDebugValue = function() {
  }, de.useDeferredValue = function(A, B) {
    return Q.H.useDeferredValue(A, B);
  }, de.useEffect = function(A, B) {
    return Q.H.useEffect(A, B);
  }, de.useEffectEvent = function(A) {
    return Q.H.useEffectEvent(A);
  }, de.useId = function() {
    return Q.H.useId();
  }, de.useImperativeHandle = function(A, B, W) {
    return Q.H.useImperativeHandle(A, B, W);
  }, de.useInsertionEffect = function(A, B) {
    return Q.H.useInsertionEffect(A, B);
  }, de.useLayoutEffect = function(A, B) {
    return Q.H.useLayoutEffect(A, B);
  }, de.useMemo = function(A, B) {
    return Q.H.useMemo(A, B);
  }, de.useOptimistic = function(A, B) {
    return Q.H.useOptimistic(A, B);
  }, de.useReducer = function(A, B, W) {
    return Q.H.useReducer(A, B, W);
  }, de.useRef = function(A) {
    return Q.H.useRef(A);
  }, de.useState = function(A) {
    return Q.H.useState(A);
  }, de.useSyncExternalStore = function(A, B, W) {
    return Q.H.useSyncExternalStore(
      A,
      B,
      W
    );
  }, de.useTransition = function() {
    return Q.H.useTransition();
  }, de.version = "19.2.4", de;
}
var p0;
function zd() {
  return p0 || (p0 = 1, wf.exports = F1()), wf.exports;
}
var jf = { exports: {} }, ot = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var g0;
function W1() {
  if (g0) return ot;
  g0 = 1;
  var l = zd();
  function i(y) {
    var v = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        v += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + y + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c() {
  }
  var o = {
    d: {
      f: c,
      r: function() {
        throw Error(i(522));
      },
      D: c,
      C: c,
      L: c,
      m: c,
      X: c,
      S: c,
      M: c
    },
    p: 0,
    findDOMNode: null
  }, r = Symbol.for("react.portal");
  function m(y, v, S) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: b == null ? null : "" + b,
      children: y,
      containerInfo: v,
      implementation: S
    };
  }
  var g = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(y, v) {
    if (y === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return ot.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, ot.createPortal = function(y, v) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(i(299));
    return m(y, v, null, S);
  }, ot.flushSync = function(y) {
    var v = g.T, S = o.p;
    try {
      if (g.T = null, o.p = 2, y) return y();
    } finally {
      g.T = v, o.p = S, o.d.f();
    }
  }, ot.preconnect = function(y, v) {
    typeof y == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, o.d.C(y, v));
  }, ot.prefetchDNS = function(y) {
    typeof y == "string" && o.d.D(y);
  }, ot.preinit = function(y, v) {
    if (typeof y == "string" && v && typeof v.as == "string") {
      var S = v.as, b = p(S, v.crossOrigin), N = typeof v.integrity == "string" ? v.integrity : void 0, X = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      S === "style" ? o.d.S(
        y,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: b,
          integrity: N,
          fetchPriority: X
        }
      ) : S === "script" && o.d.X(y, {
        crossOrigin: b,
        integrity: N,
        fetchPriority: X,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, ot.preinitModule = function(y, v) {
    if (typeof y == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var S = p(
            v.as,
            v.crossOrigin
          );
          o.d.M(y, {
            crossOrigin: S,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0
          });
        }
      } else v == null && o.d.M(y);
  }, ot.preload = function(y, v) {
    if (typeof y == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var S = v.as, b = p(S, v.crossOrigin);
      o.d.L(y, S, {
        crossOrigin: b,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, ot.preloadModule = function(y, v) {
    if (typeof y == "string")
      if (v) {
        var S = p(v.as, v.crossOrigin);
        o.d.m(y, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: S,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0
        });
      } else o.d.m(y);
  }, ot.requestFormReset = function(y) {
    o.d.r(y);
  }, ot.unstable_batchedUpdates = function(y, v) {
    return y(v);
  }, ot.useFormState = function(y, v, S) {
    return g.H.useFormState(y, v, S);
  }, ot.useFormStatus = function() {
    return g.H.useHostTransitionStatus();
  }, ot.version = "19.2.4", ot;
}
var y0;
function hy() {
  if (y0) return jf.exports;
  y0 = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return l(), jf.exports = W1(), jf.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var v0;
function _1() {
  if (v0) return cs;
  v0 = 1;
  var l = P1(), i = zd(), c = hy();
  function o(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function m(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function g(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (m(e) !== e)
      throw Error(o(188));
  }
  function v(e) {
    var t = e.alternate;
    if (!t) {
      if (t = m(e), t === null) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var n = e, a = t; ; ) {
      var s = n.return;
      if (s === null) break;
      var u = s.alternate;
      if (u === null) {
        if (a = s.return, a !== null) {
          n = a;
          continue;
        }
        break;
      }
      if (s.child === u.child) {
        for (u = s.child; u; ) {
          if (u === n) return y(s), e;
          if (u === a) return y(s), t;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== a.return) n = s, a = u;
      else {
        for (var d = !1, h = s.child; h; ) {
          if (h === n) {
            d = !0, n = s, a = u;
            break;
          }
          if (h === a) {
            d = !0, a = s, n = u;
            break;
          }
          h = h.sibling;
        }
        if (!d) {
          for (h = u.child; h; ) {
            if (h === n) {
              d = !0, n = u, a = s;
              break;
            }
            if (h === a) {
              d = !0, a = u, n = s;
              break;
            }
            h = h.sibling;
          }
          if (!d) throw Error(o(189));
        }
      }
      if (n.alternate !== a) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? e : t;
  }
  function S(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = S(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign, N = Symbol.for("react.element"), X = Symbol.for("react.transitional.element"), I = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), F = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), J = Symbol.for("react.context"), H = Symbol.for("react.forward_ref"), Z = Symbol.for("react.suspense"), K = Symbol.for("react.suspense_list"), Q = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), pe = Symbol.for("react.activity"), re = Symbol.for("react.memo_cache_sentinel"), ue = Symbol.iterator;
  function ge(e) {
    return e === null || typeof e != "object" ? null : (e = ue && e[ue] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Oe = Symbol.for("react.client.reference");
  function we(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Oe ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case w:
        return "Fragment";
      case F:
        return "Profiler";
      case j:
        return "StrictMode";
      case Z:
        return "Suspense";
      case K:
        return "SuspenseList";
      case pe:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case I:
          return "Portal";
        case J:
          return e.displayName || "Context";
        case V:
          return (e._context.displayName || "Context") + ".Consumer";
        case H:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Q:
          return t = e.displayName || null, t !== null ? t : we(e.type) || "Memo";
        case _:
          t = e._payload, e = e._init;
          try {
            return we(e(t));
          } catch {
          }
      }
    return null;
  }
  var Le = Array.isArray, z = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ae = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Te = [], P = -1;
  function A(e) {
    return { current: e };
  }
  function B(e) {
    0 > P || (e.current = Te[P], Te[P] = null, P--);
  }
  function W(e, t) {
    P++, Te[P] = e.current, e.current = t;
  }
  var $ = A(null), fe = A(null), se = A(null), le = A(null);
  function Be(e, t) {
    switch (W(se, t), W(fe, e), W($, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Dg(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Dg(t), e = wg(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    B($), W($, e);
  }
  function Ie() {
    B($), B(fe), B(se);
  }
  function nn(e) {
    e.memoizedState !== null && W(le, e);
    var t = $.current, n = wg(t, e.type);
    t !== n && (W(fe, e), W($, n));
  }
  function an(e) {
    fe.current === e && (B($), B(fe)), le.current === e && (B(le), as._currentValue = ae);
  }
  var Ea, el;
  function Yt(e) {
    if (Ea === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Ea = t && t[1] || "", el = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ea + e + el;
  }
  var Dn = !1;
  function wn(e, t) {
    if (!e || Dn) return "";
    Dn = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var L = function() {
                throw Error();
              };
              if (Object.defineProperty(L.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(L, []);
                } catch (U) {
                  var R = U;
                }
                Reflect.construct(e, [], L);
              } else {
                try {
                  L.call();
                } catch (U) {
                  R = U;
                }
                e.call(L.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (U) {
                R = U;
              }
              (L = e()) && typeof L.catch == "function" && L.catch(function() {
              });
            }
          } catch (U) {
            if (U && R && typeof U.stack == "string")
              return [U.stack, R.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), d = u[0], h = u[1];
      if (d && h) {
        var E = d.split(`
`), M = h.split(`
`);
        for (s = a = 0; a < E.length && !E[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; s < M.length && !M[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (a === E.length || s === M.length)
          for (a = E.length - 1, s = M.length - 1; 1 <= a && 0 <= s && E[a] !== M[s]; )
            s--;
        for (; 1 <= a && 0 <= s; a--, s--)
          if (E[a] !== M[s]) {
            if (a !== 1 || s !== 1)
              do
                if (a--, s--, 0 > s || E[a] !== M[s]) {
                  var D = `
` + E[a].replace(" at new ", " at ");
                  return e.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", e.displayName)), D;
                }
              while (1 <= a && 0 <= s);
            break;
          }
      }
    } finally {
      Dn = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? Yt(n) : "";
  }
  function Ws(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Yt(e.type);
      case 16:
        return Yt("Lazy");
      case 13:
        return e.child !== t && t !== null ? Yt("Suspense Fallback") : Yt("Suspense");
      case 19:
        return Yt("SuspenseList");
      case 0:
      case 15:
        return wn(e.type, !1);
      case 11:
        return wn(e.type.render, !1);
      case 1:
        return wn(e.type, !0);
      case 31:
        return Yt("Activity");
      default:
        return "";
    }
  }
  function fi(e) {
    try {
      var t = "", n = null;
      do
        t += Ws(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var di = Object.prototype.hasOwnProperty, dt = l.unstable_scheduleCallback, ba = l.unstable_cancelCallback, tl = l.unstable_shouldYield, nl = l.unstable_requestPaint, _e = l.unstable_now, mi = l.unstable_getCurrentPriorityLevel, hi = l.unstable_ImmediatePriority, pi = l.unstable_UserBlockingPriority, jn = l.unstable_NormalPriority, mt = l.unstable_LowPriority, fn = l.unstable_IdlePriority, Pt = l.log, al = l.unstable_setDisableYieldValue, jt = null, Ze = null;
  function Nt(e) {
    if (typeof Pt == "function" && al(e), Ze && typeof Ze.setStrictMode == "function")
      try {
        Ze.setStrictMode(jt, e);
      } catch {
      }
  }
  var xt = Math.clz32 ? Math.clz32 : Uv, Iv = Math.log, Rv = Math.LN2;
  function Uv(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Iv(e) / Rv | 0) | 0;
  }
  var _s = 256, $s = 262144, eu = 4194304;
  function Ta(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function tu(e, t, n) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var s = 0, u = e.suspendedLanes, d = e.pingedLanes;
    e = e.warmLanes;
    var h = a & 134217727;
    return h !== 0 ? (a = h & ~u, a !== 0 ? s = Ta(a) : (d &= h, d !== 0 ? s = Ta(d) : n || (n = h & ~e, n !== 0 && (s = Ta(n))))) : (h = a & ~u, h !== 0 ? s = Ta(h) : d !== 0 ? s = Ta(d) : n || (n = a & ~e, n !== 0 && (s = Ta(n)))), s === 0 ? 0 : t !== 0 && t !== s && (t & u) === 0 && (u = s & -s, n = t & -t, u >= n || u === 32 && (n & 4194048) !== 0) ? t : s;
  }
  function gi(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function zv(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function hm() {
    var e = eu;
    return eu <<= 1, (eu & 62914560) === 0 && (eu = 4194304), e;
  }
  function yo(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function yi(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Ov(e, t, n, a, s, u) {
    var d = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var h = e.entanglements, E = e.expirationTimes, M = e.hiddenUpdates;
    for (n = d & ~n; 0 < n; ) {
      var D = 31 - xt(n), L = 1 << D;
      h[D] = 0, E[D] = -1;
      var R = M[D];
      if (R !== null)
        for (M[D] = null, D = 0; D < R.length; D++) {
          var U = R[D];
          U !== null && (U.lane &= -536870913);
        }
      n &= ~L;
    }
    a !== 0 && pm(e, a, 0), u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(d & ~t));
  }
  function pm(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - xt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | n & 261930;
  }
  function gm(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var a = 31 - xt(n), s = 1 << a;
      s & t | e[a] & t && (e[a] |= t), n &= ~s;
    }
  }
  function ym(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : vo(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function vo(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function So(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function vm() {
    var e = Y.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : a0(e.type));
  }
  function Sm(e, t) {
    var n = Y.p;
    try {
      return Y.p = e, t();
    } finally {
      Y.p = n;
    }
  }
  var kn = Math.random().toString(36).slice(2), tt = "__reactFiber$" + kn, pt = "__reactProps$" + kn, ll = "__reactContainer$" + kn, Eo = "__reactEvents$" + kn, Dv = "__reactListeners$" + kn, wv = "__reactHandles$" + kn, Em = "__reactResources$" + kn, vi = "__reactMarker$" + kn;
  function bo(e) {
    delete e[tt], delete e[pt], delete e[Eo], delete e[Dv], delete e[wv];
  }
  function il(e) {
    var t = e[tt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[ll] || n[tt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = Kg(e); e !== null; ) {
            if (n = e[tt]) return n;
            e = Kg(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function sl(e) {
    if (e = e[tt] || e[ll]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Si(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function ul(e) {
    var t = e[Em];
    return t || (t = e[Em] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function $e(e) {
    e[vi] = !0;
  }
  var bm = /* @__PURE__ */ new Set(), Tm = {};
  function Aa(e, t) {
    cl(e, t), cl(e + "Capture", t);
  }
  function cl(e, t) {
    for (Tm[e] = t, e = 0; e < t.length; e++)
      bm.add(t[e]);
  }
  var jv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Am = {}, Cm = {};
  function kv(e) {
    return di.call(Cm, e) ? !0 : di.call(Am, e) ? !1 : jv.test(e) ? Cm[e] = !0 : (Am[e] = !0, !1);
  }
  function nu(e, t, n) {
    if (kv(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function au(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function dn(e, t, n, a) {
    if (a === null) e.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + a);
    }
  }
  function kt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Nm(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function qv(e, t, n) {
    var a = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var s = a.get, u = a.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(d) {
          n = "" + d, u.call(this, d);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(d) {
          n = "" + d;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function To(e) {
    if (!e._valueTracker) {
      var t = Nm(e) ? "checked" : "value";
      e._valueTracker = qv(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function xm(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), a = "";
    return e && (a = Nm(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== n ? (t.setValue(e), !0) : !1;
  }
  function lu(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Lv = /[\n"\\]/g;
  function qt(e) {
    return e.replace(
      Lv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ao(e, t, n, a, s, u, d, h) {
    e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + kt(t)) : e.value !== "" + kt(t) && (e.value = "" + kt(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? Co(e, d, kt(t)) : n != null ? Co(e, d, kt(n)) : a != null && e.removeAttribute("value"), s == null && u != null && (e.defaultChecked = !!u), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.name = "" + kt(h) : e.removeAttribute("name");
  }
  function Mm(e, t, n, a, s, u, d, h) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || n != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        To(e);
        return;
      }
      n = n != null ? "" + kt(n) : "", t = t != null ? "" + kt(t) : n, h || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? s, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = h ? e.checked : !!a, e.defaultChecked = !!a, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d), To(e);
  }
  function Co(e, t, n) {
    t === "number" && lu(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function ol(e, t, n, a) {
    if (e = e.options, t) {
      t = {};
      for (var s = 0; s < n.length; s++)
        t["$" + n[s]] = !0;
      for (n = 0; n < e.length; n++)
        s = t.hasOwnProperty("$" + e[n].value), e[n].selected !== s && (e[n].selected = s), s && a && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + kt(n), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === n) {
          e[s].selected = !0, a && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Im(e, t, n) {
    if (t != null && (t = "" + kt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + kt(n) : "";
  }
  function Rm(e, t, n, a) {
    if (t == null) {
      if (a != null) {
        if (n != null) throw Error(o(92));
        if (Le(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), t = n;
    }
    n = kt(t), e.defaultValue = n, a = e.textContent, a === n && a !== "" && a !== null && (e.value = a), To(e);
  }
  function rl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Bv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Um(e, t, n) {
    var a = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Bv.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function zm(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, n != null) {
      for (var a in n)
        !n.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var s in t)
        a = t[s], t.hasOwnProperty(s) && n[s] !== a && Um(e, s, a);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Um(e, u, t[u]);
  }
  function No(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Gv = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Kv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function iu(e) {
    return Kv.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function mn() {
  }
  var xo = null;
  function Mo(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var fl = null, dl = null;
  function Om(e) {
    var t = sl(e);
    if (t && (e = t.stateNode)) {
      var n = e[pt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ao(
            e,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + qt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var a = n[t];
              if (a !== e && a.form === e.form) {
                var s = a[pt] || null;
                if (!s) throw Error(o(90));
                Ao(
                  a,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              a = n[t], a.form === e.form && xm(a);
          }
          break e;
        case "textarea":
          Im(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && ol(e, !!n.multiple, t, !1);
      }
    }
  }
  var Io = !1;
  function Dm(e, t, n) {
    if (Io) return e(t, n);
    Io = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (Io = !1, (fl !== null || dl !== null) && (Zu(), fl && (t = fl, e = dl, dl = fl = null, Om(t), e)))
        for (t = 0; t < e.length; t++) Om(e[t]);
    }
  }
  function Ei(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var a = n[pt] || null;
    if (a === null) return null;
    n = a[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function")
      throw Error(
        o(231, t, typeof n)
      );
    return n;
  }
  var hn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ro = !1;
  if (hn)
    try {
      var bi = {};
      Object.defineProperty(bi, "passive", {
        get: function() {
          Ro = !0;
        }
      }), window.addEventListener("test", bi, bi), window.removeEventListener("test", bi, bi);
    } catch {
      Ro = !1;
    }
  var qn = null, Uo = null, su = null;
  function wm() {
    if (su) return su;
    var e, t = Uo, n = t.length, a, s = "value" in qn ? qn.value : qn.textContent, u = s.length;
    for (e = 0; e < n && t[e] === s[e]; e++) ;
    var d = n - e;
    for (a = 1; a <= d && t[n - a] === s[u - a]; a++) ;
    return su = s.slice(e, 1 < a ? 1 - a : void 0);
  }
  function uu(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function cu() {
    return !0;
  }
  function jm() {
    return !1;
  }
  function gt(e) {
    function t(n, a, s, u, d) {
      this._reactName = n, this._targetInst = s, this.type = a, this.nativeEvent = u, this.target = d, this.currentTarget = null;
      for (var h in e)
        e.hasOwnProperty(h) && (n = e[h], this[h] = n ? n(u) : u[h]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? cu : jm, this.isPropagationStopped = jm, this;
    }
    return b(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = cu);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = cu);
      },
      persist: function() {
      },
      isPersistent: cu
    }), t;
  }
  var Ca = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ou = gt(Ca), Ti = b({}, Ca, { view: 0, detail: 0 }), Hv = gt(Ti), zo, Oo, Ai, ru = b({}, Ti, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: wo,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Ai && (Ai && e.type === "mousemove" ? (zo = e.screenX - Ai.screenX, Oo = e.screenY - Ai.screenY) : Oo = zo = 0, Ai = e), zo);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Oo;
    }
  }), km = gt(ru), Qv = b({}, ru, { dataTransfer: 0 }), Vv = gt(Qv), Xv = b({}, Ti, { relatedTarget: 0 }), Do = gt(Xv), Zv = b({}, Ca, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Jv = gt(Zv), Yv = b({}, Ca, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Pv = gt(Yv), Fv = b({}, Ca, { data: 0 }), qm = gt(Fv), Wv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, _v = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, $v = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function eS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = $v[e]) ? !!t[e] : !1;
  }
  function wo() {
    return eS;
  }
  var tS = b({}, Ti, {
    key: function(e) {
      if (e.key) {
        var t = Wv[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = uu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? _v[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: wo,
    charCode: function(e) {
      return e.type === "keypress" ? uu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? uu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), nS = gt(tS), aS = b({}, ru, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Lm = gt(aS), lS = b({}, Ti, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: wo
  }), iS = gt(lS), sS = b({}, Ca, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), uS = gt(sS), cS = b({}, ru, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), oS = gt(cS), rS = b({}, Ca, {
    newState: 0,
    oldState: 0
  }), fS = gt(rS), dS = [9, 13, 27, 32], jo = hn && "CompositionEvent" in window, Ci = null;
  hn && "documentMode" in document && (Ci = document.documentMode);
  var mS = hn && "TextEvent" in window && !Ci, Bm = hn && (!jo || Ci && 8 < Ci && 11 >= Ci), Gm = " ", Km = !1;
  function Hm(e, t) {
    switch (e) {
      case "keyup":
        return dS.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Qm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ml = !1;
  function hS(e, t) {
    switch (e) {
      case "compositionend":
        return Qm(t);
      case "keypress":
        return t.which !== 32 ? null : (Km = !0, Gm);
      case "textInput":
        return e = t.data, e === Gm && Km ? null : e;
      default:
        return null;
    }
  }
  function pS(e, t) {
    if (ml)
      return e === "compositionend" || !jo && Hm(e, t) ? (e = wm(), su = Uo = qn = null, ml = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Bm && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var gS = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Vm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!gS[e.type] : t === "textarea";
  }
  function Xm(e, t, n, a) {
    fl ? dl ? dl.push(a) : dl = [a] : fl = a, t = $u(t, "onChange"), 0 < t.length && (n = new ou(
      "onChange",
      "change",
      null,
      n,
      a
    ), e.push({ event: n, listeners: t }));
  }
  var Ni = null, xi = null;
  function yS(e) {
    Mg(e, 0);
  }
  function fu(e) {
    var t = Si(e);
    if (xm(t)) return e;
  }
  function Zm(e, t) {
    if (e === "change") return t;
  }
  var Jm = !1;
  if (hn) {
    var ko;
    if (hn) {
      var qo = "oninput" in document;
      if (!qo) {
        var Ym = document.createElement("div");
        Ym.setAttribute("oninput", "return;"), qo = typeof Ym.oninput == "function";
      }
      ko = qo;
    } else ko = !1;
    Jm = ko && (!document.documentMode || 9 < document.documentMode);
  }
  function Pm() {
    Ni && (Ni.detachEvent("onpropertychange", Fm), xi = Ni = null);
  }
  function Fm(e) {
    if (e.propertyName === "value" && fu(xi)) {
      var t = [];
      Xm(
        t,
        xi,
        e,
        Mo(e)
      ), Dm(yS, t);
    }
  }
  function vS(e, t, n) {
    e === "focusin" ? (Pm(), Ni = t, xi = n, Ni.attachEvent("onpropertychange", Fm)) : e === "focusout" && Pm();
  }
  function SS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return fu(xi);
  }
  function ES(e, t) {
    if (e === "click") return fu(t);
  }
  function bS(e, t) {
    if (e === "input" || e === "change")
      return fu(t);
  }
  function TS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Mt = typeof Object.is == "function" ? Object.is : TS;
  function Mi(e, t) {
    if (Mt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var s = n[a];
      if (!di.call(t, s) || !Mt(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function Wm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function _m(e, t) {
    var n = Wm(e);
    e = 0;
    for (var a; n; ) {
      if (n.nodeType === 3) {
        if (a = e + n.textContent.length, e <= t && a >= t)
          return { node: n, offset: t - e };
        e = a;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Wm(n);
    }
  }
  function $m(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? $m(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function eh(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = lu(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = lu(e.document);
    }
    return t;
  }
  function Lo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var AS = hn && "documentMode" in document && 11 >= document.documentMode, hl = null, Bo = null, Ii = null, Go = !1;
  function th(e, t, n) {
    var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Go || hl == null || hl !== lu(a) || (a = hl, "selectionStart" in a && Lo(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Ii && Mi(Ii, a) || (Ii = a, a = $u(Bo, "onSelect"), 0 < a.length && (t = new ou(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: a }), t.target = hl)));
  }
  function Na(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var pl = {
    animationend: Na("Animation", "AnimationEnd"),
    animationiteration: Na("Animation", "AnimationIteration"),
    animationstart: Na("Animation", "AnimationStart"),
    transitionrun: Na("Transition", "TransitionRun"),
    transitionstart: Na("Transition", "TransitionStart"),
    transitioncancel: Na("Transition", "TransitionCancel"),
    transitionend: Na("Transition", "TransitionEnd")
  }, Ko = {}, nh = {};
  hn && (nh = document.createElement("div").style, "AnimationEvent" in window || (delete pl.animationend.animation, delete pl.animationiteration.animation, delete pl.animationstart.animation), "TransitionEvent" in window || delete pl.transitionend.transition);
  function xa(e) {
    if (Ko[e]) return Ko[e];
    if (!pl[e]) return e;
    var t = pl[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in nh)
        return Ko[e] = t[n];
    return e;
  }
  var ah = xa("animationend"), lh = xa("animationiteration"), ih = xa("animationstart"), CS = xa("transitionrun"), NS = xa("transitionstart"), xS = xa("transitioncancel"), sh = xa("transitionend"), uh = /* @__PURE__ */ new Map(), Ho = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ho.push("scrollEnd");
  function Ft(e, t) {
    uh.set(e, t), Aa(t, [e]);
  }
  var du = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Lt = [], gl = 0, Qo = 0;
  function mu() {
    for (var e = gl, t = Qo = gl = 0; t < e; ) {
      var n = Lt[t];
      Lt[t++] = null;
      var a = Lt[t];
      Lt[t++] = null;
      var s = Lt[t];
      Lt[t++] = null;
      var u = Lt[t];
      if (Lt[t++] = null, a !== null && s !== null) {
        var d = a.pending;
        d === null ? s.next = s : (s.next = d.next, d.next = s), a.pending = s;
      }
      u !== 0 && ch(n, s, u);
    }
  }
  function hu(e, t, n, a) {
    Lt[gl++] = e, Lt[gl++] = t, Lt[gl++] = n, Lt[gl++] = a, Qo |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function Vo(e, t, n, a) {
    return hu(e, t, n, a), pu(e);
  }
  function Ma(e, t) {
    return hu(e, null, null, t), pu(e);
  }
  function ch(e, t, n) {
    e.lanes |= n;
    var a = e.alternate;
    a !== null && (a.lanes |= n);
    for (var s = !1, u = e.return; u !== null; )
      u.childLanes |= n, a = u.alternate, a !== null && (a.childLanes |= n), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (s = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, s && t !== null && (s = 31 - xt(n), e = u.hiddenUpdates, a = e[s], a === null ? e[s] = [t] : a.push(t), t.lane = n | 536870912), u) : null;
  }
  function pu(e) {
    if (50 < Fi)
      throw Fi = 0, $r = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var yl = {};
  function MS(e, t, n, a) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function It(e, t, n, a) {
    return new MS(e, t, n, a);
  }
  function Xo(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function pn(e, t) {
    var n = e.alternate;
    return n === null ? (n = It(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function oh(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function gu(e, t, n, a, s, u) {
    var d = 0;
    if (a = e, typeof e == "function") Xo(e) && (d = 1);
    else if (typeof e == "string")
      d = O1(
        e,
        n,
        $.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case pe:
          return e = It(31, n, t, s), e.elementType = pe, e.lanes = u, e;
        case w:
          return Ia(n.children, s, u, t);
        case j:
          d = 8, s |= 24;
          break;
        case F:
          return e = It(12, n, t, s | 2), e.elementType = F, e.lanes = u, e;
        case Z:
          return e = It(13, n, t, s), e.elementType = Z, e.lanes = u, e;
        case K:
          return e = It(19, n, t, s), e.elementType = K, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case J:
                d = 10;
                break e;
              case V:
                d = 9;
                break e;
              case H:
                d = 11;
                break e;
              case Q:
                d = 14;
                break e;
              case _:
                d = 16, a = null;
                break e;
            }
          d = 29, n = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = It(d, n, t, s), t.elementType = e, t.type = a, t.lanes = u, t;
  }
  function Ia(e, t, n, a) {
    return e = It(7, e, a, t), e.lanes = n, e;
  }
  function Zo(e, t, n) {
    return e = It(6, e, null, t), e.lanes = n, e;
  }
  function rh(e) {
    var t = It(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Jo(e, t, n) {
    return t = It(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var fh = /* @__PURE__ */ new WeakMap();
  function Bt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = fh.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: fi(t)
      }, fh.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: fi(t)
    };
  }
  var vl = [], Sl = 0, yu = null, Ri = 0, Gt = [], Kt = 0, Ln = null, ln = 1, sn = "";
  function gn(e, t) {
    vl[Sl++] = Ri, vl[Sl++] = yu, yu = e, Ri = t;
  }
  function dh(e, t, n) {
    Gt[Kt++] = ln, Gt[Kt++] = sn, Gt[Kt++] = Ln, Ln = e;
    var a = ln;
    e = sn;
    var s = 32 - xt(a) - 1;
    a &= ~(1 << s), n += 1;
    var u = 32 - xt(t) + s;
    if (30 < u) {
      var d = s - s % 5;
      u = (a & (1 << d) - 1).toString(32), a >>= d, s -= d, ln = 1 << 32 - xt(t) + s | n << s | a, sn = u + e;
    } else
      ln = 1 << u | n << s | a, sn = e;
  }
  function Yo(e) {
    e.return !== null && (gn(e, 1), dh(e, 1, 0));
  }
  function Po(e) {
    for (; e === yu; )
      yu = vl[--Sl], vl[Sl] = null, Ri = vl[--Sl], vl[Sl] = null;
    for (; e === Ln; )
      Ln = Gt[--Kt], Gt[Kt] = null, sn = Gt[--Kt], Gt[Kt] = null, ln = Gt[--Kt], Gt[Kt] = null;
  }
  function mh(e, t) {
    Gt[Kt++] = ln, Gt[Kt++] = sn, Gt[Kt++] = Ln, ln = t.id, sn = t.overflow, Ln = e;
  }
  var nt = null, je = null, be = !1, Bn = null, Ht = !1, Fo = Error(o(519));
  function Gn(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ui(Bt(t, e)), Fo;
  }
  function hh(e) {
    var t = e.stateNode, n = e.type, a = e.memoizedProps;
    switch (t[tt] = e, t[pt] = a, n) {
      case "dialog":
        ve("cancel", t), ve("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ve("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < _i.length; n++)
          ve(_i[n], t);
        break;
      case "source":
        ve("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ve("error", t), ve("load", t);
        break;
      case "details":
        ve("toggle", t);
        break;
      case "input":
        ve("invalid", t), Mm(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        ve("invalid", t);
        break;
      case "textarea":
        ve("invalid", t), Rm(t, a.value, a.defaultValue, a.children);
    }
    n = a.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || a.suppressHydrationWarning === !0 || zg(t.textContent, n) ? (a.popover != null && (ve("beforetoggle", t), ve("toggle", t)), a.onScroll != null && ve("scroll", t), a.onScrollEnd != null && ve("scrollend", t), a.onClick != null && (t.onclick = mn), t = !0) : t = !1, t || Gn(e, !0);
  }
  function ph(e) {
    for (nt = e.return; nt; )
      switch (nt.tag) {
        case 5:
        case 31:
        case 13:
          Ht = !1;
          return;
        case 27:
        case 3:
          Ht = !0;
          return;
        default:
          nt = nt.return;
      }
  }
  function El(e) {
    if (e !== nt) return !1;
    if (!be) return ph(e), be = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || pf(e.type, e.memoizedProps)), n = !n), n && je && Gn(e), ph(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      je = Gg(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      je = Gg(e);
    } else
      t === 27 ? (t = je, ea(e.type) ? (e = Ef, Ef = null, je = e) : je = t) : je = nt ? Vt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ra() {
    je = nt = null, be = !1;
  }
  function Wo() {
    var e = Bn;
    return e !== null && (Et === null ? Et = e : Et.push.apply(
      Et,
      e
    ), Bn = null), e;
  }
  function Ui(e) {
    Bn === null ? Bn = [e] : Bn.push(e);
  }
  var _o = A(null), Ua = null, yn = null;
  function Kn(e, t, n) {
    W(_o, t._currentValue), t._currentValue = n;
  }
  function vn(e) {
    e._currentValue = _o.current, B(_o);
  }
  function $o(e, t, n) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function er(e, t, n, a) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var d = s.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var h = u;
          u = s;
          for (var E = 0; E < t.length; E++)
            if (h.context === t[E]) {
              u.lanes |= n, h = u.alternate, h !== null && (h.lanes |= n), $o(
                u.return,
                n,
                e
              ), a || (d = null);
              break e;
            }
          u = h.next;
        }
      } else if (s.tag === 18) {
        if (d = s.return, d === null) throw Error(o(341));
        d.lanes |= n, u = d.alternate, u !== null && (u.lanes |= n), $o(d, n, e), d = null;
      } else d = s.child;
      if (d !== null) d.return = s;
      else
        for (d = s; d !== null; ) {
          if (d === e) {
            d = null;
            break;
          }
          if (s = d.sibling, s !== null) {
            s.return = d.return, d = s;
            break;
          }
          d = d.return;
        }
      s = d;
    }
  }
  function bl(e, t, n, a) {
    e = null;
    for (var s = t, u = !1; s !== null; ) {
      if (!u) {
        if ((s.flags & 524288) !== 0) u = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var d = s.alternate;
        if (d === null) throw Error(o(387));
        if (d = d.memoizedProps, d !== null) {
          var h = s.type;
          Mt(s.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h]);
        }
      } else if (s === le.current) {
        if (d = s.alternate, d === null) throw Error(o(387));
        d.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(as) : e = [as]);
      }
      s = s.return;
    }
    e !== null && er(
      t,
      e,
      n,
      a
    ), t.flags |= 262144;
  }
  function vu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Mt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function za(e) {
    Ua = e, yn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function at(e) {
    return gh(Ua, e);
  }
  function Su(e, t) {
    return Ua === null && za(e), gh(e, t);
  }
  function gh(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, yn === null) {
      if (e === null) throw Error(o(308));
      yn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else yn = yn.next = t;
    return n;
  }
  var IS = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, a) {
        e.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, RS = l.unstable_scheduleCallback, US = l.unstable_NormalPriority, Je = {
    $$typeof: J,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function tr() {
    return {
      controller: new IS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function zi(e) {
    e.refCount--, e.refCount === 0 && RS(US, function() {
      e.controller.abort();
    });
  }
  var Oi = null, nr = 0, Tl = 0, Al = null;
  function zS(e, t) {
    if (Oi === null) {
      var n = Oi = [];
      nr = 0, Tl = sf(), Al = {
        status: "pending",
        value: void 0,
        then: function(a) {
          n.push(a);
        }
      };
    }
    return nr++, t.then(yh, yh), t;
  }
  function yh() {
    if (--nr === 0 && Oi !== null) {
      Al !== null && (Al.status = "fulfilled");
      var e = Oi;
      Oi = null, Tl = 0, Al = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function OS(e, t) {
    var n = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        n.push(s);
      }
    };
    return e.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var s = 0; s < n.length; s++) (0, n[s])(t);
      },
      function(s) {
        for (a.status = "rejected", a.reason = s, s = 0; s < n.length; s++)
          (0, n[s])(void 0);
      }
    ), a;
  }
  var vh = z.S;
  z.S = function(e, t) {
    tg = _e(), typeof t == "object" && t !== null && typeof t.then == "function" && zS(e, t), vh !== null && vh(e, t);
  };
  var Oa = A(null);
  function ar() {
    var e = Oa.current;
    return e !== null ? e : De.pooledCache;
  }
  function Eu(e, t) {
    t === null ? W(Oa, Oa.current) : W(Oa, t.pool);
  }
  function Sh() {
    var e = ar();
    return e === null ? null : { parent: Je._currentValue, pool: e };
  }
  var Cl = Error(o(460)), lr = Error(o(474)), bu = Error(o(542)), Tu = { then: function() {
  } };
  function Eh(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function bh(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(mn, mn), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Ah(e), e;
      default:
        if (typeof t.status == "string") t.then(mn, mn);
        else {
          if (e = De, e !== null && 100 < e.shellSuspendCounter)
            throw Error(o(482));
          e = t, e.status = "pending", e.then(
            function(a) {
              if (t.status === "pending") {
                var s = t;
                s.status = "fulfilled", s.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var s = t;
                s.status = "rejected", s.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Ah(e), e;
        }
        throw wa = t, Cl;
    }
  }
  function Da(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (wa = n, Cl) : n;
    }
  }
  var wa = null;
  function Th() {
    if (wa === null) throw Error(o(459));
    var e = wa;
    return wa = null, e;
  }
  function Ah(e) {
    if (e === Cl || e === bu)
      throw Error(o(483));
  }
  var Nl = null, Di = 0;
  function Au(e) {
    var t = Di;
    return Di += 1, Nl === null && (Nl = []), bh(Nl, e, t);
  }
  function wi(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Cu(e, t) {
    throw t.$$typeof === N ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Ch(e) {
    function t(C, T) {
      if (e) {
        var x = C.deletions;
        x === null ? (C.deletions = [T], C.flags |= 16) : x.push(T);
      }
    }
    function n(C, T) {
      if (!e) return null;
      for (; T !== null; )
        t(C, T), T = T.sibling;
      return null;
    }
    function a(C) {
      for (var T = /* @__PURE__ */ new Map(); C !== null; )
        C.key !== null ? T.set(C.key, C) : T.set(C.index, C), C = C.sibling;
      return T;
    }
    function s(C, T) {
      return C = pn(C, T), C.index = 0, C.sibling = null, C;
    }
    function u(C, T, x) {
      return C.index = x, e ? (x = C.alternate, x !== null ? (x = x.index, x < T ? (C.flags |= 67108866, T) : x) : (C.flags |= 67108866, T)) : (C.flags |= 1048576, T);
    }
    function d(C) {
      return e && C.alternate === null && (C.flags |= 67108866), C;
    }
    function h(C, T, x, q) {
      return T === null || T.tag !== 6 ? (T = Zo(x, C.mode, q), T.return = C, T) : (T = s(T, x), T.return = C, T);
    }
    function E(C, T, x, q) {
      var ie = x.type;
      return ie === w ? D(
        C,
        T,
        x.props.children,
        q,
        x.key
      ) : T !== null && (T.elementType === ie || typeof ie == "object" && ie !== null && ie.$$typeof === _ && Da(ie) === T.type) ? (T = s(T, x.props), wi(T, x), T.return = C, T) : (T = gu(
        x.type,
        x.key,
        x.props,
        null,
        C.mode,
        q
      ), wi(T, x), T.return = C, T);
    }
    function M(C, T, x, q) {
      return T === null || T.tag !== 4 || T.stateNode.containerInfo !== x.containerInfo || T.stateNode.implementation !== x.implementation ? (T = Jo(x, C.mode, q), T.return = C, T) : (T = s(T, x.children || []), T.return = C, T);
    }
    function D(C, T, x, q, ie) {
      return T === null || T.tag !== 7 ? (T = Ia(
        x,
        C.mode,
        q,
        ie
      ), T.return = C, T) : (T = s(T, x), T.return = C, T);
    }
    function L(C, T, x) {
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return T = Zo(
          "" + T,
          C.mode,
          x
        ), T.return = C, T;
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case X:
            return x = gu(
              T.type,
              T.key,
              T.props,
              null,
              C.mode,
              x
            ), wi(x, T), x.return = C, x;
          case I:
            return T = Jo(
              T,
              C.mode,
              x
            ), T.return = C, T;
          case _:
            return T = Da(T), L(C, T, x);
        }
        if (Le(T) || ge(T))
          return T = Ia(
            T,
            C.mode,
            x,
            null
          ), T.return = C, T;
        if (typeof T.then == "function")
          return L(C, Au(T), x);
        if (T.$$typeof === J)
          return L(
            C,
            Su(C, T),
            x
          );
        Cu(C, T);
      }
      return null;
    }
    function R(C, T, x, q) {
      var ie = T !== null ? T.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return ie !== null ? null : h(C, T, "" + x, q);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case X:
            return x.key === ie ? E(C, T, x, q) : null;
          case I:
            return x.key === ie ? M(C, T, x, q) : null;
          case _:
            return x = Da(x), R(C, T, x, q);
        }
        if (Le(x) || ge(x))
          return ie !== null ? null : D(C, T, x, q, null);
        if (typeof x.then == "function")
          return R(
            C,
            T,
            Au(x),
            q
          );
        if (x.$$typeof === J)
          return R(
            C,
            T,
            Su(C, x),
            q
          );
        Cu(C, x);
      }
      return null;
    }
    function U(C, T, x, q, ie) {
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return C = C.get(x) || null, h(T, C, "" + q, ie);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case X:
            return C = C.get(
              q.key === null ? x : q.key
            ) || null, E(T, C, q, ie);
          case I:
            return C = C.get(
              q.key === null ? x : q.key
            ) || null, M(T, C, q, ie);
          case _:
            return q = Da(q), U(
              C,
              T,
              x,
              q,
              ie
            );
        }
        if (Le(q) || ge(q))
          return C = C.get(x) || null, D(T, C, q, ie, null);
        if (typeof q.then == "function")
          return U(
            C,
            T,
            x,
            Au(q),
            ie
          );
        if (q.$$typeof === J)
          return U(
            C,
            T,
            x,
            Su(T, q),
            ie
          );
        Cu(T, q);
      }
      return null;
    }
    function ee(C, T, x, q) {
      for (var ie = null, Ae = null, te = T, he = T = 0, Ee = null; te !== null && he < x.length; he++) {
        te.index > he ? (Ee = te, te = null) : Ee = te.sibling;
        var Ce = R(
          C,
          te,
          x[he],
          q
        );
        if (Ce === null) {
          te === null && (te = Ee);
          break;
        }
        e && te && Ce.alternate === null && t(C, te), T = u(Ce, T, he), Ae === null ? ie = Ce : Ae.sibling = Ce, Ae = Ce, te = Ee;
      }
      if (he === x.length)
        return n(C, te), be && gn(C, he), ie;
      if (te === null) {
        for (; he < x.length; he++)
          te = L(C, x[he], q), te !== null && (T = u(
            te,
            T,
            he
          ), Ae === null ? ie = te : Ae.sibling = te, Ae = te);
        return be && gn(C, he), ie;
      }
      for (te = a(te); he < x.length; he++)
        Ee = U(
          te,
          C,
          he,
          x[he],
          q
        ), Ee !== null && (e && Ee.alternate !== null && te.delete(
          Ee.key === null ? he : Ee.key
        ), T = u(
          Ee,
          T,
          he
        ), Ae === null ? ie = Ee : Ae.sibling = Ee, Ae = Ee);
      return e && te.forEach(function(ia) {
        return t(C, ia);
      }), be && gn(C, he), ie;
    }
    function ce(C, T, x, q) {
      if (x == null) throw Error(o(151));
      for (var ie = null, Ae = null, te = T, he = T = 0, Ee = null, Ce = x.next(); te !== null && !Ce.done; he++, Ce = x.next()) {
        te.index > he ? (Ee = te, te = null) : Ee = te.sibling;
        var ia = R(C, te, Ce.value, q);
        if (ia === null) {
          te === null && (te = Ee);
          break;
        }
        e && te && ia.alternate === null && t(C, te), T = u(ia, T, he), Ae === null ? ie = ia : Ae.sibling = ia, Ae = ia, te = Ee;
      }
      if (Ce.done)
        return n(C, te), be && gn(C, he), ie;
      if (te === null) {
        for (; !Ce.done; he++, Ce = x.next())
          Ce = L(C, Ce.value, q), Ce !== null && (T = u(Ce, T, he), Ae === null ? ie = Ce : Ae.sibling = Ce, Ae = Ce);
        return be && gn(C, he), ie;
      }
      for (te = a(te); !Ce.done; he++, Ce = x.next())
        Ce = U(te, C, he, Ce.value, q), Ce !== null && (e && Ce.alternate !== null && te.delete(Ce.key === null ? he : Ce.key), T = u(Ce, T, he), Ae === null ? ie = Ce : Ae.sibling = Ce, Ae = Ce);
      return e && te.forEach(function(Q1) {
        return t(C, Q1);
      }), be && gn(C, he), ie;
    }
    function ze(C, T, x, q) {
      if (typeof x == "object" && x !== null && x.type === w && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case X:
            e: {
              for (var ie = x.key; T !== null; ) {
                if (T.key === ie) {
                  if (ie = x.type, ie === w) {
                    if (T.tag === 7) {
                      n(
                        C,
                        T.sibling
                      ), q = s(
                        T,
                        x.props.children
                      ), q.return = C, C = q;
                      break e;
                    }
                  } else if (T.elementType === ie || typeof ie == "object" && ie !== null && ie.$$typeof === _ && Da(ie) === T.type) {
                    n(
                      C,
                      T.sibling
                    ), q = s(T, x.props), wi(q, x), q.return = C, C = q;
                    break e;
                  }
                  n(C, T);
                  break;
                } else t(C, T);
                T = T.sibling;
              }
              x.type === w ? (q = Ia(
                x.props.children,
                C.mode,
                q,
                x.key
              ), q.return = C, C = q) : (q = gu(
                x.type,
                x.key,
                x.props,
                null,
                C.mode,
                q
              ), wi(q, x), q.return = C, C = q);
            }
            return d(C);
          case I:
            e: {
              for (ie = x.key; T !== null; ) {
                if (T.key === ie)
                  if (T.tag === 4 && T.stateNode.containerInfo === x.containerInfo && T.stateNode.implementation === x.implementation) {
                    n(
                      C,
                      T.sibling
                    ), q = s(T, x.children || []), q.return = C, C = q;
                    break e;
                  } else {
                    n(C, T);
                    break;
                  }
                else t(C, T);
                T = T.sibling;
              }
              q = Jo(x, C.mode, q), q.return = C, C = q;
            }
            return d(C);
          case _:
            return x = Da(x), ze(
              C,
              T,
              x,
              q
            );
        }
        if (Le(x))
          return ee(
            C,
            T,
            x,
            q
          );
        if (ge(x)) {
          if (ie = ge(x), typeof ie != "function") throw Error(o(150));
          return x = ie.call(x), ce(
            C,
            T,
            x,
            q
          );
        }
        if (typeof x.then == "function")
          return ze(
            C,
            T,
            Au(x),
            q
          );
        if (x.$$typeof === J)
          return ze(
            C,
            T,
            Su(C, x),
            q
          );
        Cu(C, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, T !== null && T.tag === 6 ? (n(C, T.sibling), q = s(T, x), q.return = C, C = q) : (n(C, T), q = Zo(x, C.mode, q), q.return = C, C = q), d(C)) : n(C, T);
    }
    return function(C, T, x, q) {
      try {
        Di = 0;
        var ie = ze(
          C,
          T,
          x,
          q
        );
        return Nl = null, ie;
      } catch (te) {
        if (te === Cl || te === bu) throw te;
        var Ae = It(29, te, null, C.mode);
        return Ae.lanes = q, Ae.return = C, Ae;
      } finally {
      }
    };
  }
  var ja = Ch(!0), Nh = Ch(!1), Hn = !1;
  function ir(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function sr(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Qn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Vn(e, t, n) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (Ne & 2) !== 0) {
      var s = a.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), a.pending = t, t = pu(e), ch(e, null, n), t;
    }
    return hu(e, a, t, n), pu(e);
  }
  function ji(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, gm(e, n);
    }
  }
  function ur(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, n === a)) {
      var s = null, u = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var d = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          u === null ? s = u = d : u = u.next = d, n = n.next;
        } while (n !== null);
        u === null ? s = u = t : u = u.next = t;
      } else s = u = t;
      n = {
        baseState: a.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var cr = !1;
  function ki() {
    if (cr) {
      var e = Al;
      if (e !== null) throw e;
    }
  }
  function qi(e, t, n, a) {
    cr = !1;
    var s = e.updateQueue;
    Hn = !1;
    var u = s.firstBaseUpdate, d = s.lastBaseUpdate, h = s.shared.pending;
    if (h !== null) {
      s.shared.pending = null;
      var E = h, M = E.next;
      E.next = null, d === null ? u = M : d.next = M, d = E;
      var D = e.alternate;
      D !== null && (D = D.updateQueue, h = D.lastBaseUpdate, h !== d && (h === null ? D.firstBaseUpdate = M : h.next = M, D.lastBaseUpdate = E));
    }
    if (u !== null) {
      var L = s.baseState;
      d = 0, D = M = E = null, h = u;
      do {
        var R = h.lane & -536870913, U = R !== h.lane;
        if (U ? (Se & R) === R : (a & R) === R) {
          R !== 0 && R === Tl && (cr = !0), D !== null && (D = D.next = {
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: null,
            next: null
          });
          e: {
            var ee = e, ce = h;
            R = t;
            var ze = n;
            switch (ce.tag) {
              case 1:
                if (ee = ce.payload, typeof ee == "function") {
                  L = ee.call(ze, L, R);
                  break e;
                }
                L = ee;
                break e;
              case 3:
                ee.flags = ee.flags & -65537 | 128;
              case 0:
                if (ee = ce.payload, R = typeof ee == "function" ? ee.call(ze, L, R) : ee, R == null) break e;
                L = b({}, L, R);
                break e;
              case 2:
                Hn = !0;
            }
          }
          R = h.callback, R !== null && (e.flags |= 64, U && (e.flags |= 8192), U = s.callbacks, U === null ? s.callbacks = [R] : U.push(R));
        } else
          U = {
            lane: R,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          }, D === null ? (M = D = U, E = L) : D = D.next = U, d |= R;
        if (h = h.next, h === null) {
          if (h = s.shared.pending, h === null)
            break;
          U = h, h = U.next, U.next = null, s.lastBaseUpdate = U, s.shared.pending = null;
        }
      } while (!0);
      D === null && (E = L), s.baseState = E, s.firstBaseUpdate = M, s.lastBaseUpdate = D, u === null && (s.shared.lanes = 0), Pn |= d, e.lanes = d, e.memoizedState = L;
    }
  }
  function xh(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function Mh(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        xh(n[e], t);
  }
  var xl = A(null), Nu = A(0);
  function Ih(e, t) {
    e = Mn, W(Nu, e), W(xl, t), Mn = e | t.baseLanes;
  }
  function or() {
    W(Nu, Mn), W(xl, xl.current);
  }
  function rr() {
    Mn = Nu.current, B(xl), B(Nu);
  }
  var Rt = A(null), Qt = null;
  function Xn(e) {
    var t = e.alternate;
    W(Ve, Ve.current & 1), W(Rt, e), Qt === null && (t === null || xl.current !== null || t.memoizedState !== null) && (Qt = e);
  }
  function fr(e) {
    W(Ve, Ve.current), W(Rt, e), Qt === null && (Qt = e);
  }
  function Rh(e) {
    e.tag === 22 ? (W(Ve, Ve.current), W(Rt, e), Qt === null && (Qt = e)) : Zn();
  }
  function Zn() {
    W(Ve, Ve.current), W(Rt, Rt.current);
  }
  function Ut(e) {
    B(Rt), Qt === e && (Qt = null), B(Ve);
  }
  var Ve = A(0);
  function xu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || vf(n) || Sf(n)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Sn = 0, me = null, Re = null, Ye = null, Mu = !1, Ml = !1, ka = !1, Iu = 0, Li = 0, Il = null, DS = 0;
  function Ge() {
    throw Error(o(321));
  }
  function dr(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Mt(e[n], t[n])) return !1;
    return !0;
  }
  function mr(e, t, n, a, s, u) {
    return Sn = u, me = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, z.H = e === null || e.memoizedState === null ? dp : Ir, ka = !1, u = n(a, s), ka = !1, Ml && (u = zh(
      t,
      n,
      a,
      s
    )), Uh(e), u;
  }
  function Uh(e) {
    z.H = Ki;
    var t = Re !== null && Re.next !== null;
    if (Sn = 0, Ye = Re = me = null, Mu = !1, Li = 0, Il = null, t) throw Error(o(300));
    e === null || Pe || (e = e.dependencies, e !== null && vu(e) && (Pe = !0));
  }
  function zh(e, t, n, a) {
    me = e;
    var s = 0;
    do {
      if (Ml && (Il = null), Li = 0, Ml = !1, 25 <= s) throw Error(o(301));
      if (s += 1, Ye = Re = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      z.H = mp, u = t(n, a);
    } while (Ml);
    return u;
  }
  function wS() {
    var e = z.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Bi(t) : t, e = e.useState()[0], (Re !== null ? Re.memoizedState : null) !== e && (me.flags |= 1024), t;
  }
  function hr() {
    var e = Iu !== 0;
    return Iu = 0, e;
  }
  function pr(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function gr(e) {
    if (Mu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Mu = !1;
    }
    Sn = 0, Ye = Re = me = null, Ml = !1, Li = Iu = 0, Il = null;
  }
  function ht() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ye === null ? me.memoizedState = Ye = e : Ye = Ye.next = e, Ye;
  }
  function Xe() {
    if (Re === null) {
      var e = me.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Re.next;
    var t = Ye === null ? me.memoizedState : Ye.next;
    if (t !== null)
      Ye = t, Re = e;
    else {
      if (e === null)
        throw me.alternate === null ? Error(o(467)) : Error(o(310));
      Re = e, e = {
        memoizedState: Re.memoizedState,
        baseState: Re.baseState,
        baseQueue: Re.baseQueue,
        queue: Re.queue,
        next: null
      }, Ye === null ? me.memoizedState = Ye = e : Ye = Ye.next = e;
    }
    return Ye;
  }
  function Ru() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Bi(e) {
    var t = Li;
    return Li += 1, Il === null && (Il = []), e = bh(Il, e, t), t = me, (Ye === null ? t.memoizedState : Ye.next) === null && (t = t.alternate, z.H = t === null || t.memoizedState === null ? dp : Ir), e;
  }
  function Uu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Bi(e);
      if (e.$$typeof === J) return at(e);
    }
    throw Error(o(438, String(e)));
  }
  function yr(e) {
    var t = null, n = me.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var a = me.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = Ru(), me.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), a = 0; a < e; a++)
        n[a] = re;
    return t.index++, n;
  }
  function En(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function zu(e) {
    var t = Xe();
    return vr(t, Re, e);
  }
  function vr(e, t, n) {
    var a = e.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = n;
    var s = e.baseQueue, u = a.pending;
    if (u !== null) {
      if (s !== null) {
        var d = s.next;
        s.next = u.next, u.next = d;
      }
      t.baseQueue = s = u, a.pending = null;
    }
    if (u = e.baseState, s === null) e.memoizedState = u;
    else {
      t = s.next;
      var h = d = null, E = null, M = t, D = !1;
      do {
        var L = M.lane & -536870913;
        if (L !== M.lane ? (Se & L) === L : (Sn & L) === L) {
          var R = M.revertLane;
          if (R === 0)
            E !== null && (E = E.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }), L === Tl && (D = !0);
          else if ((Sn & R) === R) {
            M = M.next, R === Tl && (D = !0);
            continue;
          } else
            L = {
              lane: 0,
              revertLane: M.revertLane,
              gesture: null,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }, E === null ? (h = E = L, d = u) : E = E.next = L, me.lanes |= R, Pn |= R;
          L = M.action, ka && n(u, L), u = M.hasEagerState ? M.eagerState : n(u, L);
        } else
          R = {
            lane: L,
            revertLane: M.revertLane,
            gesture: M.gesture,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null
          }, E === null ? (h = E = R, d = u) : E = E.next = R, me.lanes |= L, Pn |= L;
        M = M.next;
      } while (M !== null && M !== t);
      if (E === null ? d = u : E.next = h, !Mt(u, e.memoizedState) && (Pe = !0, D && (n = Al, n !== null)))
        throw n;
      e.memoizedState = u, e.baseState = d, e.baseQueue = E, a.lastRenderedState = u;
    }
    return s === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function Sr(e) {
    var t = Xe(), n = t.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = e;
    var a = n.dispatch, s = n.pending, u = t.memoizedState;
    if (s !== null) {
      n.pending = null;
      var d = s = s.next;
      do
        u = e(u, d.action), d = d.next;
      while (d !== s);
      Mt(u, t.memoizedState) || (Pe = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), n.lastRenderedState = u;
    }
    return [u, a];
  }
  function Oh(e, t, n) {
    var a = me, s = Xe(), u = be;
    if (u) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = t();
    var d = !Mt(
      (Re || s).memoizedState,
      n
    );
    if (d && (s.memoizedState = n, Pe = !0), s = s.queue, Tr(jh.bind(null, a, s, e), [
      e
    ]), s.getSnapshot !== t || d || Ye !== null && Ye.memoizedState.tag & 1) {
      if (a.flags |= 2048, Rl(
        9,
        { destroy: void 0 },
        wh.bind(
          null,
          a,
          s,
          n,
          t
        ),
        null
      ), De === null) throw Error(o(349));
      u || (Sn & 127) !== 0 || Dh(a, t, n);
    }
    return n;
  }
  function Dh(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = me.updateQueue, t === null ? (t = Ru(), me.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function wh(e, t, n, a) {
    t.value = n, t.getSnapshot = a, kh(t) && qh(e);
  }
  function jh(e, t, n) {
    return n(function() {
      kh(t) && qh(e);
    });
  }
  function kh(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Mt(e, n);
    } catch {
      return !0;
    }
  }
  function qh(e) {
    var t = Ma(e, 2);
    t !== null && bt(t, e, 2);
  }
  function Er(e) {
    var t = ht();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), ka) {
        Nt(!0);
        try {
          n();
        } finally {
          Nt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: En,
      lastRenderedState: e
    }, t;
  }
  function Lh(e, t, n, a) {
    return e.baseState = n, vr(
      e,
      Re,
      typeof a == "function" ? a : En
    );
  }
  function jS(e, t, n, a, s) {
    if (wu(e)) throw Error(o(485));
    if (e = t.action, e !== null) {
      var u = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(d) {
          u.listeners.push(d);
        }
      };
      z.T !== null ? n(!0) : u.isTransition = !1, a(u), n = t.pending, n === null ? (u.next = t.pending = u, Bh(t, u)) : (u.next = n.next, t.pending = n.next = u);
    }
  }
  function Bh(e, t) {
    var n = t.action, a = t.payload, s = e.state;
    if (t.isTransition) {
      var u = z.T, d = {};
      z.T = d;
      try {
        var h = n(s, a), E = z.S;
        E !== null && E(d, h), Gh(e, t, h);
      } catch (M) {
        br(e, t, M);
      } finally {
        u !== null && d.types !== null && (u.types = d.types), z.T = u;
      }
    } else
      try {
        u = n(s, a), Gh(e, t, u);
      } catch (M) {
        br(e, t, M);
      }
  }
  function Gh(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(a) {
        Kh(e, t, a);
      },
      function(a) {
        return br(e, t, a);
      }
    ) : Kh(e, t, n);
  }
  function Kh(e, t, n) {
    t.status = "fulfilled", t.value = n, Hh(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Bh(e, n)));
  }
  function br(e, t, n) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = n, Hh(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function Hh(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Qh(e, t) {
    return t;
  }
  function Vh(e, t) {
    if (be) {
      var n = De.formState;
      if (n !== null) {
        e: {
          var a = me;
          if (be) {
            if (je) {
              t: {
                for (var s = je, u = Ht; s.nodeType !== 8; ) {
                  if (!u) {
                    s = null;
                    break t;
                  }
                  if (s = Vt(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                u = s.data, s = u === "F!" || u === "F" ? s : null;
              }
              if (s) {
                je = Vt(
                  s.nextSibling
                ), a = s.data === "F!";
                break e;
              }
            }
            Gn(a);
          }
          a = !1;
        }
        a && (t = n[0]);
      }
    }
    return n = ht(), n.memoizedState = n.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Qh,
      lastRenderedState: t
    }, n.queue = a, n = op.bind(
      null,
      me,
      a
    ), a.dispatch = n, a = Er(!1), u = Mr.bind(
      null,
      me,
      !1,
      a.queue
    ), a = ht(), s = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = s, n = jS.bind(
      null,
      me,
      s,
      u,
      n
    ), s.dispatch = n, a.memoizedState = e, [t, n, !1];
  }
  function Xh(e) {
    var t = Xe();
    return Zh(t, Re, e);
  }
  function Zh(e, t, n) {
    if (t = vr(
      e,
      t,
      Qh
    )[0], e = zu(En)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Bi(t);
      } catch (d) {
        throw d === Cl ? bu : d;
      }
    else a = t;
    t = Xe();
    var s = t.queue, u = s.dispatch;
    return n !== t.memoizedState && (me.flags |= 2048, Rl(
      9,
      { destroy: void 0 },
      kS.bind(null, s, n),
      null
    )), [a, u, e];
  }
  function kS(e, t) {
    e.action = t;
  }
  function Jh(e) {
    var t = Xe(), n = Re;
    if (n !== null)
      return Zh(t, n, e);
    Xe(), t = t.memoizedState, n = Xe();
    var a = n.queue.dispatch;
    return n.memoizedState = e, [t, a, !1];
  }
  function Rl(e, t, n, a) {
    return e = { tag: e, create: n, deps: a, inst: t, next: null }, t = me.updateQueue, t === null && (t = Ru(), me.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (a = n.next, n.next = e, e.next = a, t.lastEffect = e), e;
  }
  function Yh() {
    return Xe().memoizedState;
  }
  function Ou(e, t, n, a) {
    var s = ht();
    me.flags |= e, s.memoizedState = Rl(
      1 | t,
      { destroy: void 0 },
      n,
      a === void 0 ? null : a
    );
  }
  function Du(e, t, n, a) {
    var s = Xe();
    a = a === void 0 ? null : a;
    var u = s.memoizedState.inst;
    Re !== null && a !== null && dr(a, Re.memoizedState.deps) ? s.memoizedState = Rl(t, u, n, a) : (me.flags |= e, s.memoizedState = Rl(
      1 | t,
      u,
      n,
      a
    ));
  }
  function Ph(e, t) {
    Ou(8390656, 8, e, t);
  }
  function Tr(e, t) {
    Du(2048, 8, e, t);
  }
  function qS(e) {
    me.flags |= 4;
    var t = me.updateQueue;
    if (t === null)
      t = Ru(), me.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Fh(e) {
    var t = Xe().memoizedState;
    return qS({ ref: t, nextImpl: e }), function() {
      if ((Ne & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Wh(e, t) {
    return Du(4, 2, e, t);
  }
  function _h(e, t) {
    return Du(4, 4, e, t);
  }
  function $h(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function() {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function ep(e, t, n) {
    n = n != null ? n.concat([e]) : null, Du(4, 4, $h.bind(null, t, e), n);
  }
  function Ar() {
  }
  function tp(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return t !== null && dr(t, a[1]) ? a[0] : (n.memoizedState = [e, t], e);
  }
  function np(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    if (t !== null && dr(t, a[1]))
      return a[0];
    if (a = e(), ka) {
      Nt(!0);
      try {
        e();
      } finally {
        Nt(!1);
      }
    }
    return n.memoizedState = [a, t], a;
  }
  function Cr(e, t, n) {
    return n === void 0 || (Sn & 1073741824) !== 0 && (Se & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = ag(), me.lanes |= e, Pn |= e, n);
  }
  function ap(e, t, n, a) {
    return Mt(n, t) ? n : xl.current !== null ? (e = Cr(e, n, a), Mt(e, t) || (Pe = !0), e) : (Sn & 42) === 0 || (Sn & 1073741824) !== 0 && (Se & 261930) === 0 ? (Pe = !0, e.memoizedState = n) : (e = ag(), me.lanes |= e, Pn |= e, t);
  }
  function lp(e, t, n, a, s) {
    var u = Y.p;
    Y.p = u !== 0 && 8 > u ? u : 8;
    var d = z.T, h = {};
    z.T = h, Mr(e, !1, t, n);
    try {
      var E = s(), M = z.S;
      if (M !== null && M(h, E), E !== null && typeof E == "object" && typeof E.then == "function") {
        var D = OS(
          E,
          a
        );
        Gi(
          e,
          t,
          D,
          Dt(e)
        );
      } else
        Gi(
          e,
          t,
          a,
          Dt(e)
        );
    } catch (L) {
      Gi(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: L },
        Dt()
      );
    } finally {
      Y.p = u, d !== null && h.types !== null && (d.types = h.types), z.T = d;
    }
  }
  function LS() {
  }
  function Nr(e, t, n, a) {
    if (e.tag !== 5) throw Error(o(476));
    var s = ip(e).queue;
    lp(
      e,
      s,
      t,
      ae,
      n === null ? LS : function() {
        return sp(e), n(a);
      }
    );
  }
  function ip(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ae,
      baseState: ae,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: En,
        lastRenderedState: ae
      },
      next: null
    };
    var n = {};
    return t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: En,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function sp(e) {
    var t = ip(e);
    t.next === null && (t = e.alternate.memoizedState), Gi(
      e,
      t.next.queue,
      {},
      Dt()
    );
  }
  function xr() {
    return at(as);
  }
  function up() {
    return Xe().memoizedState;
  }
  function cp() {
    return Xe().memoizedState;
  }
  function BS(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Dt();
          e = Qn(n);
          var a = Vn(t, e, n);
          a !== null && (bt(a, t, n), ji(a, t, n)), t = { cache: tr() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function GS(e, t, n) {
    var a = Dt();
    n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, wu(e) ? rp(t, n) : (n = Vo(e, t, n, a), n !== null && (bt(n, e, a), fp(n, t, a)));
  }
  function op(e, t, n) {
    var a = Dt();
    Gi(e, t, n, a);
  }
  function Gi(e, t, n, a) {
    var s = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (wu(e)) rp(t, s);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var d = t.lastRenderedState, h = u(d, n);
          if (s.hasEagerState = !0, s.eagerState = h, Mt(h, d))
            return hu(e, t, s, 0), De === null && mu(), !1;
        } catch {
        } finally {
        }
      if (n = Vo(e, t, s, a), n !== null)
        return bt(n, e, a), fp(n, t, a), !0;
    }
    return !1;
  }
  function Mr(e, t, n, a) {
    if (a = {
      lane: 2,
      revertLane: sf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, wu(e)) {
      if (t) throw Error(o(479));
    } else
      t = Vo(
        e,
        n,
        a,
        2
      ), t !== null && bt(t, e, 2);
  }
  function wu(e) {
    var t = e.alternate;
    return e === me || t !== null && t === me;
  }
  function rp(e, t) {
    Ml = Mu = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function fp(e, t, n) {
    if ((n & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, gm(e, n);
    }
  }
  var Ki = {
    readContext: at,
    use: Uu,
    useCallback: Ge,
    useContext: Ge,
    useEffect: Ge,
    useImperativeHandle: Ge,
    useLayoutEffect: Ge,
    useInsertionEffect: Ge,
    useMemo: Ge,
    useReducer: Ge,
    useRef: Ge,
    useState: Ge,
    useDebugValue: Ge,
    useDeferredValue: Ge,
    useTransition: Ge,
    useSyncExternalStore: Ge,
    useId: Ge,
    useHostTransitionStatus: Ge,
    useFormState: Ge,
    useActionState: Ge,
    useOptimistic: Ge,
    useMemoCache: Ge,
    useCacheRefresh: Ge
  };
  Ki.useEffectEvent = Ge;
  var dp = {
    readContext: at,
    use: Uu,
    useCallback: function(e, t) {
      return ht().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: at,
    useEffect: Ph,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Ou(
        4194308,
        4,
        $h.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return Ou(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Ou(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = ht();
      t = t === void 0 ? null : t;
      var a = e();
      if (ka) {
        Nt(!0);
        try {
          e();
        } finally {
          Nt(!1);
        }
      }
      return n.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, n) {
      var a = ht();
      if (n !== void 0) {
        var s = n(t);
        if (ka) {
          Nt(!0);
          try {
            n(t);
          } finally {
            Nt(!1);
          }
        }
      } else s = t;
      return a.memoizedState = a.baseState = s, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: s
      }, a.queue = e, e = e.dispatch = GS.bind(
        null,
        me,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = ht();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Er(e);
      var t = e.queue, n = op.bind(null, me, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: Ar,
    useDeferredValue: function(e, t) {
      var n = ht();
      return Cr(n, e, t);
    },
    useTransition: function() {
      var e = Er(!1);
      return e = lp.bind(
        null,
        me,
        e.queue,
        !0,
        !1
      ), ht().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var a = me, s = ht();
      if (be) {
        if (n === void 0)
          throw Error(o(407));
        n = n();
      } else {
        if (n = t(), De === null)
          throw Error(o(349));
        (Se & 127) !== 0 || Dh(a, t, n);
      }
      s.memoizedState = n;
      var u = { value: n, getSnapshot: t };
      return s.queue = u, Ph(jh.bind(null, a, u, e), [
        e
      ]), a.flags |= 2048, Rl(
        9,
        { destroy: void 0 },
        wh.bind(
          null,
          a,
          u,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = ht(), t = De.identifierPrefix;
      if (be) {
        var n = sn, a = ln;
        n = (a & ~(1 << 32 - xt(a) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Iu++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = DS++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: xr,
    useFormState: Vh,
    useActionState: Vh,
    useOptimistic: function(e) {
      var t = ht();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = Mr.bind(
        null,
        me,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: yr,
    useCacheRefresh: function() {
      return ht().memoizedState = BS.bind(
        null,
        me
      );
    },
    useEffectEvent: function(e) {
      var t = ht(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Ne & 2) !== 0)
          throw Error(o(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, Ir = {
    readContext: at,
    use: Uu,
    useCallback: tp,
    useContext: at,
    useEffect: Tr,
    useImperativeHandle: ep,
    useInsertionEffect: Wh,
    useLayoutEffect: _h,
    useMemo: np,
    useReducer: zu,
    useRef: Yh,
    useState: function() {
      return zu(En);
    },
    useDebugValue: Ar,
    useDeferredValue: function(e, t) {
      var n = Xe();
      return ap(
        n,
        Re.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = zu(En)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : Bi(e),
        t
      ];
    },
    useSyncExternalStore: Oh,
    useId: up,
    useHostTransitionStatus: xr,
    useFormState: Xh,
    useActionState: Xh,
    useOptimistic: function(e, t) {
      var n = Xe();
      return Lh(n, Re, e, t);
    },
    useMemoCache: yr,
    useCacheRefresh: cp
  };
  Ir.useEffectEvent = Fh;
  var mp = {
    readContext: at,
    use: Uu,
    useCallback: tp,
    useContext: at,
    useEffect: Tr,
    useImperativeHandle: ep,
    useInsertionEffect: Wh,
    useLayoutEffect: _h,
    useMemo: np,
    useReducer: Sr,
    useRef: Yh,
    useState: function() {
      return Sr(En);
    },
    useDebugValue: Ar,
    useDeferredValue: function(e, t) {
      var n = Xe();
      return Re === null ? Cr(n, e, t) : ap(
        n,
        Re.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Sr(En)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : Bi(e),
        t
      ];
    },
    useSyncExternalStore: Oh,
    useId: up,
    useHostTransitionStatus: xr,
    useFormState: Jh,
    useActionState: Jh,
    useOptimistic: function(e, t) {
      var n = Xe();
      return Re !== null ? Lh(n, Re, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: yr,
    useCacheRefresh: cp
  };
  mp.useEffectEvent = Fh;
  function Rr(e, t, n, a) {
    t = e.memoizedState, n = n(a, t), n = n == null ? t : b({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Ur = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var a = Dt(), s = Qn(a);
      s.payload = t, n != null && (s.callback = n), t = Vn(e, s, a), t !== null && (bt(t, e, a), ji(t, e, a));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var a = Dt(), s = Qn(a);
      s.tag = 1, s.payload = t, n != null && (s.callback = n), t = Vn(e, s, a), t !== null && (bt(t, e, a), ji(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = Dt(), a = Qn(n);
      a.tag = 2, t != null && (a.callback = t), t = Vn(e, a, n), t !== null && (bt(t, e, n), ji(t, e, n));
    }
  };
  function hp(e, t, n, a, s, u, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, d) : t.prototype && t.prototype.isPureReactComponent ? !Mi(n, a) || !Mi(s, u) : !0;
  }
  function pp(e, t, n, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== e && Ur.enqueueReplaceState(t, t.state, null);
  }
  function qa(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var a in t)
        a !== "ref" && (n[a] = t[a]);
    }
    if (e = e.defaultProps) {
      n === t && (n = b({}, n));
      for (var s in e)
        n[s] === void 0 && (n[s] = e[s]);
    }
    return n;
  }
  function gp(e) {
    du(e);
  }
  function yp(e) {
    console.error(e);
  }
  function vp(e) {
    du(e);
  }
  function ju(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Sp(e, t, n) {
    try {
      var a = e.onCaughtError;
      a(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function zr(e, t, n) {
    return n = Qn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      ju(e, t);
    }, n;
  }
  function Ep(e) {
    return e = Qn(e), e.tag = 3, e;
  }
  function bp(e, t, n, a) {
    var s = n.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = a.value;
      e.payload = function() {
        return s(u);
      }, e.callback = function() {
        Sp(t, n, a);
      };
    }
    var d = n.stateNode;
    d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
      Sp(t, n, a), typeof s != "function" && (Fn === null ? Fn = /* @__PURE__ */ new Set([this]) : Fn.add(this));
      var h = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: h !== null ? h : ""
      });
    });
  }
  function KS(e, t, n, a, s) {
    if (n.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = n.alternate, t !== null && bl(
        t,
        n,
        s,
        !0
      ), n = Rt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Qt === null ? Ju() : n.alternate === null && Ke === 0 && (Ke = 3), n.flags &= -257, n.flags |= 65536, n.lanes = s, a === Tu ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), nf(e, a, s)), !1;
          case 22:
            return n.flags |= 65536, a === Tu ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : n.add(a)), nf(e, a, s)), !1;
        }
        throw Error(o(435, n.tag));
      }
      return nf(e, a, s), Ju(), !1;
    }
    if (be)
      return t = Rt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, a !== Fo && (e = Error(o(422), { cause: a }), Ui(Bt(e, n)))) : (a !== Fo && (t = Error(o(423), {
        cause: a
      }), Ui(
        Bt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, a = Bt(a, n), s = zr(
        e.stateNode,
        a,
        s
      ), ur(e, s), Ke !== 4 && (Ke = 2)), !1;
    var u = Error(o(520), { cause: a });
    if (u = Bt(u, n), Pi === null ? Pi = [u] : Pi.push(u), Ke !== 4 && (Ke = 2), t === null) return !0;
    a = Bt(a, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = s & -s, n.lanes |= e, e = zr(n.stateNode, a, e), ur(n, e), !1;
        case 1:
          if (t = n.type, u = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Fn === null || !Fn.has(u))))
            return n.flags |= 65536, s &= -s, n.lanes |= s, s = Ep(s), bp(
              s,
              e,
              n,
              a
            ), ur(n, s), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Or = Error(o(461)), Pe = !1;
  function lt(e, t, n, a) {
    t.child = e === null ? Nh(t, null, n, a) : ja(
      t,
      e.child,
      n,
      a
    );
  }
  function Tp(e, t, n, a, s) {
    n = n.render;
    var u = t.ref;
    if ("ref" in a) {
      var d = {};
      for (var h in a)
        h !== "ref" && (d[h] = a[h]);
    } else d = a;
    return za(t), a = mr(
      e,
      t,
      n,
      d,
      u,
      s
    ), h = hr(), e !== null && !Pe ? (pr(e, t, s), bn(e, t, s)) : (be && h && Yo(t), t.flags |= 1, lt(e, t, a, s), t.child);
  }
  function Ap(e, t, n, a, s) {
    if (e === null) {
      var u = n.type;
      return typeof u == "function" && !Xo(u) && u.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = u, Cp(
        e,
        t,
        u,
        a,
        s
      )) : (e = gu(
        n.type,
        null,
        a,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !Gr(e, s)) {
      var d = u.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Mi, n(d, a) && e.ref === t.ref)
        return bn(e, t, s);
    }
    return t.flags |= 1, e = pn(u, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Cp(e, t, n, a, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Mi(u, a) && e.ref === t.ref)
        if (Pe = !1, t.pendingProps = a = u, Gr(e, s))
          (e.flags & 131072) !== 0 && (Pe = !0);
        else
          return t.lanes = e.lanes, bn(e, t, s);
    }
    return Dr(
      e,
      t,
      n,
      a,
      s
    );
  }
  function Np(e, t, n, a) {
    var s = a.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | n : n, e !== null) {
          for (a = t.child = e.child, s = 0; a !== null; )
            s = s | a.lanes | a.childLanes, a = a.sibling;
          a = s & ~u;
        } else a = 0, t.child = null;
        return xp(
          e,
          t,
          u,
          n,
          a
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Eu(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Ih(t, u) : or(), Rh(t);
      else
        return a = t.lanes = 536870912, xp(
          e,
          t,
          u !== null ? u.baseLanes | n : n,
          n,
          a
        );
    } else
      u !== null ? (Eu(t, u.cachePool), Ih(t, u), Zn(), t.memoizedState = null) : (e !== null && Eu(t, null), or(), Zn());
    return lt(e, t, s, n), t.child;
  }
  function Hi(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function xp(e, t, n, a, s) {
    var u = ar();
    return u = u === null ? null : { parent: Je._currentValue, pool: u }, t.memoizedState = {
      baseLanes: n,
      cachePool: u
    }, e !== null && Eu(t, null), or(), Rh(t), e !== null && bl(e, t, a, !0), t.childLanes = s, null;
  }
  function ku(e, t) {
    return t = Lu(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Mp(e, t, n) {
    return ja(t, e.child, null, n), e = ku(t, t.pendingProps), e.flags |= 2, Ut(t), t.memoizedState = null, e;
  }
  function HS(e, t, n) {
    var a = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (be) {
        if (a.mode === "hidden")
          return e = ku(t, a), t.lanes = 536870912, Hi(null, e);
        if (fr(t), (e = je) ? (e = Bg(
          e,
          Ht
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ln !== null ? { id: ln, overflow: sn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = rh(e), n.return = t, t.child = n, nt = t, je = null)) : e = null, e === null) throw Gn(t);
        return t.lanes = 536870912, null;
      }
      return ku(t, a);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var d = u.dehydrated;
      if (fr(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = Mp(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Pe || bl(e, t, n, !1), s = (n & e.childLanes) !== 0, Pe || s) {
        if (a = De, a !== null && (d = ym(a, n), d !== 0 && d !== u.retryLane))
          throw u.retryLane = d, Ma(e, d), bt(a, e, d), Or;
        Ju(), t = Mp(
          e,
          t,
          n
        );
      } else
        e = u.treeContext, je = Vt(d.nextSibling), nt = t, be = !0, Bn = null, Ht = !1, e !== null && mh(t, e), t = ku(t, a), t.flags |= 4096;
      return t;
    }
    return e = pn(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function qu(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(o(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Dr(e, t, n, a, s) {
    return za(t), n = mr(
      e,
      t,
      n,
      a,
      void 0,
      s
    ), a = hr(), e !== null && !Pe ? (pr(e, t, s), bn(e, t, s)) : (be && a && Yo(t), t.flags |= 1, lt(e, t, n, s), t.child);
  }
  function Ip(e, t, n, a, s, u) {
    return za(t), t.updateQueue = null, n = zh(
      t,
      a,
      n,
      s
    ), Uh(e), a = hr(), e !== null && !Pe ? (pr(e, t, u), bn(e, t, u)) : (be && a && Yo(t), t.flags |= 1, lt(e, t, n, u), t.child);
  }
  function Rp(e, t, n, a, s) {
    if (za(t), t.stateNode === null) {
      var u = yl, d = n.contextType;
      typeof d == "object" && d !== null && (u = at(d)), u = new n(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Ur, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, ir(t), d = n.contextType, u.context = typeof d == "object" && d !== null ? at(d) : yl, u.state = t.memoizedState, d = n.getDerivedStateFromProps, typeof d == "function" && (Rr(
        t,
        n,
        d,
        a
      ), u.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (d = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), d !== u.state && Ur.enqueueReplaceState(u, u.state, null), qi(t, a, u, s), ki(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      u = t.stateNode;
      var h = t.memoizedProps, E = qa(n, h);
      u.props = E;
      var M = u.context, D = n.contextType;
      d = yl, typeof D == "object" && D !== null && (d = at(D));
      var L = n.getDerivedStateFromProps;
      D = typeof L == "function" || typeof u.getSnapshotBeforeUpdate == "function", h = t.pendingProps !== h, D || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (h || M !== d) && pp(
        t,
        u,
        a,
        d
      ), Hn = !1;
      var R = t.memoizedState;
      u.state = R, qi(t, a, u, s), ki(), M = t.memoizedState, h || R !== M || Hn ? (typeof L == "function" && (Rr(
        t,
        n,
        L,
        a
      ), M = t.memoizedState), (E = Hn || hp(
        t,
        n,
        E,
        a,
        R,
        M,
        d
      )) ? (D || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = M), u.props = a, u.state = M, u.context = d, a = E) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, sr(e, t), d = t.memoizedProps, D = qa(n, d), u.props = D, L = t.pendingProps, R = u.context, M = n.contextType, E = yl, typeof M == "object" && M !== null && (E = at(M)), h = n.getDerivedStateFromProps, (M = typeof h == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (d !== L || R !== E) && pp(
        t,
        u,
        a,
        E
      ), Hn = !1, R = t.memoizedState, u.state = R, qi(t, a, u, s), ki();
      var U = t.memoizedState;
      d !== L || R !== U || Hn || e !== null && e.dependencies !== null && vu(e.dependencies) ? (typeof h == "function" && (Rr(
        t,
        n,
        h,
        a
      ), U = t.memoizedState), (D = Hn || hp(
        t,
        n,
        D,
        a,
        R,
        U,
        E
      ) || e !== null && e.dependencies !== null && vu(e.dependencies)) ? (M || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, U, E), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        U,
        E
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || d === e.memoizedProps && R === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && R === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = U), u.props = a, u.state = U, u.context = E, a = D) : (typeof u.componentDidUpdate != "function" || d === e.memoizedProps && R === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && R === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, qu(e, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, n = a && typeof n.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && a ? (t.child = ja(
      t,
      e.child,
      null,
      s
    ), t.child = ja(
      t,
      null,
      n,
      s
    )) : lt(e, t, n, s), t.memoizedState = u.state, e = t.child) : e = bn(
      e,
      t,
      s
    ), e;
  }
  function Up(e, t, n, a) {
    return Ra(), t.flags |= 256, lt(e, t, n, a), t.child;
  }
  var wr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function jr(e) {
    return { baseLanes: e, cachePool: Sh() };
  }
  function kr(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Ot), e;
  }
  function zp(e, t, n) {
    var a = t.pendingProps, s = !1, u = (t.flags & 128) !== 0, d;
    if ((d = u) || (d = e !== null && e.memoizedState === null ? !1 : (Ve.current & 2) !== 0), d && (s = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (be) {
        if (s ? Xn(t) : Zn(), (e = je) ? (e = Bg(
          e,
          Ht
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ln !== null ? { id: ln, overflow: sn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = rh(e), n.return = t, t.child = n, nt = t, je = null)) : e = null, e === null) throw Gn(t);
        return Sf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var h = a.children;
      return a = a.fallback, s ? (Zn(), s = t.mode, h = Lu(
        { mode: "hidden", children: h },
        s
      ), a = Ia(
        a,
        s,
        n,
        null
      ), h.return = t, a.return = t, h.sibling = a, t.child = h, a = t.child, a.memoizedState = jr(n), a.childLanes = kr(
        e,
        d,
        n
      ), t.memoizedState = wr, Hi(null, a)) : (Xn(t), qr(t, h));
    }
    var E = e.memoizedState;
    if (E !== null && (h = E.dehydrated, h !== null)) {
      if (u)
        t.flags & 256 ? (Xn(t), t.flags &= -257, t = Lr(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (Zn(), t.child = e.child, t.flags |= 128, t = null) : (Zn(), h = a.fallback, s = t.mode, a = Lu(
          { mode: "visible", children: a.children },
          s
        ), h = Ia(
          h,
          s,
          n,
          null
        ), h.flags |= 2, a.return = t, h.return = t, a.sibling = h, t.child = a, ja(
          t,
          e.child,
          null,
          n
        ), a = t.child, a.memoizedState = jr(n), a.childLanes = kr(
          e,
          d,
          n
        ), t.memoizedState = wr, t = Hi(null, a));
      else if (Xn(t), Sf(h)) {
        if (d = h.nextSibling && h.nextSibling.dataset, d) var M = d.dgst;
        d = M, a = Error(o(419)), a.stack = "", a.digest = d, Ui({ value: a, source: null, stack: null }), t = Lr(
          e,
          t,
          n
        );
      } else if (Pe || bl(e, t, n, !1), d = (n & e.childLanes) !== 0, Pe || d) {
        if (d = De, d !== null && (a = ym(d, n), a !== 0 && a !== E.retryLane))
          throw E.retryLane = a, Ma(e, a), bt(d, e, a), Or;
        vf(h) || Ju(), t = Lr(
          e,
          t,
          n
        );
      } else
        vf(h) ? (t.flags |= 192, t.child = e.child, t = null) : (e = E.treeContext, je = Vt(
          h.nextSibling
        ), nt = t, be = !0, Bn = null, Ht = !1, e !== null && mh(t, e), t = qr(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (Zn(), h = a.fallback, s = t.mode, E = e.child, M = E.sibling, a = pn(E, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = E.subtreeFlags & 65011712, M !== null ? h = pn(
      M,
      h
    ) : (h = Ia(
      h,
      s,
      n,
      null
    ), h.flags |= 2), h.return = t, a.return = t, a.sibling = h, t.child = a, Hi(null, a), a = t.child, h = e.child.memoizedState, h === null ? h = jr(n) : (s = h.cachePool, s !== null ? (E = Je._currentValue, s = s.parent !== E ? { parent: E, pool: E } : s) : s = Sh(), h = {
      baseLanes: h.baseLanes | n,
      cachePool: s
    }), a.memoizedState = h, a.childLanes = kr(
      e,
      d,
      n
    ), t.memoizedState = wr, Hi(e.child, a)) : (Xn(t), n = e.child, e = n.sibling, n = pn(n, {
      mode: "visible",
      children: a.children
    }), n.return = t, n.sibling = null, e !== null && (d = t.deletions, d === null ? (t.deletions = [e], t.flags |= 16) : d.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function qr(e, t) {
    return t = Lu(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Lu(e, t) {
    return e = It(22, e, null, t), e.lanes = 0, e;
  }
  function Lr(e, t, n) {
    return ja(t, e.child, null, n), e = qr(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Op(e, t, n) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), $o(e.return, t, n);
  }
  function Br(e, t, n, a, s, u) {
    var d = e.memoizedState;
    d === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: n,
      tailMode: s,
      treeForkCount: u
    } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = a, d.tail = n, d.tailMode = s, d.treeForkCount = u);
  }
  function Dp(e, t, n) {
    var a = t.pendingProps, s = a.revealOrder, u = a.tail;
    a = a.children;
    var d = Ve.current, h = (d & 2) !== 0;
    if (h ? (d = d & 1 | 2, t.flags |= 128) : d &= 1, W(Ve, d), lt(e, t, a, n), a = be ? Ri : 0, !h && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Op(e, n, t);
        else if (e.tag === 19)
          Op(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (s) {
      case "forwards":
        for (n = t.child, s = null; n !== null; )
          e = n.alternate, e !== null && xu(e) === null && (s = n), n = n.sibling;
        n = s, n === null ? (s = t.child, t.child = null) : (s = n.sibling, n.sibling = null), Br(
          t,
          !1,
          s,
          n,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, s = t.child, t.child = null; s !== null; ) {
          if (e = s.alternate, e !== null && xu(e) === null) {
            t.child = s;
            break;
          }
          e = s.sibling, s.sibling = n, n = s, s = e;
        }
        Br(
          t,
          !0,
          n,
          null,
          u,
          a
        );
        break;
      case "together":
        Br(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function bn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Pn |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (bl(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, n = pn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = pn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Gr(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && vu(e)));
  }
  function QS(e, t, n) {
    switch (t.tag) {
      case 3:
        Be(t, t.stateNode.containerInfo), Kn(t, Je, e.memoizedState.cache), Ra();
        break;
      case 27:
      case 5:
        nn(t);
        break;
      case 4:
        Be(t, t.stateNode.containerInfo);
        break;
      case 10:
        Kn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, fr(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Xn(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? zp(e, t, n) : (Xn(t), e = bn(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        Xn(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (a = (n & t.childLanes) !== 0, a || (bl(
          e,
          t,
          n,
          !1
        ), a = (n & t.childLanes) !== 0), s) {
          if (a)
            return Dp(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), W(Ve, Ve.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Np(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        Kn(t, Je, e.memoizedState.cache);
    }
    return bn(e, t, n);
  }
  function wp(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Pe = !0;
      else {
        if (!Gr(e, n) && (t.flags & 128) === 0)
          return Pe = !1, QS(
            e,
            t,
            n
          );
        Pe = (e.flags & 131072) !== 0;
      }
    else
      Pe = !1, be && (t.flags & 1048576) !== 0 && dh(t, Ri, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = Da(t.elementType), t.type = e, typeof e == "function")
            Xo(e) ? (a = qa(e, a), t.tag = 1, t = Rp(
              null,
              t,
              e,
              a,
              n
            )) : (t.tag = 0, t = Dr(
              null,
              t,
              e,
              a,
              n
            ));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === H) {
                t.tag = 11, t = Tp(
                  null,
                  t,
                  e,
                  a,
                  n
                );
                break e;
              } else if (s === Q) {
                t.tag = 14, t = Ap(
                  null,
                  t,
                  e,
                  a,
                  n
                );
                break e;
              }
            }
            throw t = we(e) || e, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return Dr(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return a = t.type, s = qa(
          a,
          t.pendingProps
        ), Rp(
          e,
          t,
          a,
          s,
          n
        );
      case 3:
        e: {
          if (Be(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          s = u.element, sr(e, t), qi(t, a, null, n);
          var d = t.memoizedState;
          if (a = d.cache, Kn(t, Je, a), a !== u.cache && er(
            t,
            [Je],
            n,
            !0
          ), ki(), a = d.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: d.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Up(
                e,
                t,
                a,
                n
              );
              break e;
            } else if (a !== s) {
              s = Bt(
                Error(o(424)),
                t
              ), Ui(s), t = Up(
                e,
                t,
                a,
                n
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (je = Vt(e.firstChild), nt = t, be = !0, Bn = null, Ht = !0, n = Nh(
                t,
                null,
                a,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (Ra(), a === s) {
              t = bn(
                e,
                t,
                n
              );
              break e;
            }
            lt(e, t, a, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return qu(e, t), e === null ? (n = Xg(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : be || (n = t.type, e = t.pendingProps, a = ec(
          se.current
        ).createElement(n), a[tt] = t, a[pt] = e, it(a, n, e), $e(a), t.stateNode = a) : t.memoizedState = Xg(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return nn(t), e === null && be && (a = t.stateNode = Hg(
          t.type,
          t.pendingProps,
          se.current
        ), nt = t, Ht = !0, s = je, ea(t.type) ? (Ef = s, je = Vt(a.firstChild)) : je = s), lt(
          e,
          t,
          t.pendingProps.children,
          n
        ), qu(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && be && ((s = a = je) && (a = S1(
          a,
          t.type,
          t.pendingProps,
          Ht
        ), a !== null ? (t.stateNode = a, nt = t, je = Vt(a.firstChild), Ht = !1, s = !0) : s = !1), s || Gn(t)), nn(t), s = t.type, u = t.pendingProps, d = e !== null ? e.memoizedProps : null, a = u.children, pf(s, u) ? a = null : d !== null && pf(s, d) && (t.flags |= 32), t.memoizedState !== null && (s = mr(
          e,
          t,
          wS,
          null,
          null,
          n
        ), as._currentValue = s), qu(e, t), lt(e, t, a, n), t.child;
      case 6:
        return e === null && be && ((e = n = je) && (n = E1(
          n,
          t.pendingProps,
          Ht
        ), n !== null ? (t.stateNode = n, nt = t, je = null, e = !0) : e = !1), e || Gn(t)), null;
      case 13:
        return zp(e, t, n);
      case 4:
        return Be(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = ja(
          t,
          null,
          a,
          n
        ) : lt(e, t, a, n), t.child;
      case 11:
        return Tp(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return lt(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return lt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return lt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return a = t.pendingProps, Kn(t, t.type, a.value), lt(e, t, a.children, n), t.child;
      case 9:
        return s = t.type._context, a = t.pendingProps.children, za(t), s = at(s), a = a(s), t.flags |= 1, lt(e, t, a, n), t.child;
      case 14:
        return Ap(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return Cp(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return Dp(e, t, n);
      case 31:
        return HS(e, t, n);
      case 22:
        return Np(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return za(t), a = at(Je), e === null ? (s = ar(), s === null && (s = De, u = tr(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= n), s = u), t.memoizedState = { parent: a, cache: s }, ir(t), Kn(t, Je, s)) : ((e.lanes & n) !== 0 && (sr(e, t), qi(t, null, null, n), ki()), s = e.memoizedState, u = t.memoizedState, s.parent !== a ? (s = { parent: a, cache: a }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), Kn(t, Je, a)) : (a = u.cache, Kn(t, Je, a), a !== s.cache && er(
          t,
          [Je],
          n,
          !0
        ))), lt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Tn(e) {
    e.flags |= 4;
  }
  function Kr(e, t, n, a, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (ug()) e.flags |= 8192;
        else
          throw wa = Tu, lr;
    } else e.flags &= -16777217;
  }
  function jp(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Fg(t))
      if (ug()) e.flags |= 8192;
      else
        throw wa = Tu, lr;
  }
  function Bu(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? hm() : 536870912, e.lanes |= t, Dl |= t);
  }
  function Qi(e, t) {
    if (!be)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
      }
  }
  function ke(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, a = 0;
    if (t)
      for (var s = e.child; s !== null; )
        n |= s.lanes | s.childLanes, a |= s.subtreeFlags & 65011712, a |= s.flags & 65011712, s.return = e, s = s.sibling;
    else
      for (s = e.child; s !== null; )
        n |= s.lanes | s.childLanes, a |= s.subtreeFlags, a |= s.flags, s.return = e, s = s.sibling;
    return e.subtreeFlags |= a, e.childLanes = n, t;
  }
  function VS(e, t, n) {
    var a = t.pendingProps;
    switch (Po(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ke(t), null;
      case 1:
        return ke(t), null;
      case 3:
        return n = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), vn(Je), Ie(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (El(t) ? Tn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Wo())), ke(t), null;
      case 26:
        var s = t.type, u = t.memoizedState;
        return e === null ? (Tn(t), u !== null ? (ke(t), jp(t, u)) : (ke(t), Kr(
          t,
          s,
          null,
          a,
          n
        ))) : u ? u !== e.memoizedState ? (Tn(t), ke(t), jp(t, u)) : (ke(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && Tn(t), ke(t), Kr(
          t,
          s,
          e,
          a,
          n
        )), null;
      case 27:
        if (an(t), n = se.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Tn(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return ke(t), null;
          }
          e = $.current, El(t) ? hh(t) : (e = Hg(s, a, n), t.stateNode = e, Tn(t));
        }
        return ke(t), null;
      case 5:
        if (an(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Tn(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return ke(t), null;
          }
          if (u = $.current, El(t))
            hh(t);
          else {
            var d = ec(
              se.current
            );
            switch (u) {
              case 1:
                u = d.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                u = d.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    u = d.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    u = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    u = d.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? d.createElement("select", {
                      is: a.is
                    }) : d.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? d.createElement(s, { is: a.is }) : d.createElement(s);
                }
            }
            u[tt] = t, u[pt] = a;
            e: for (d = t.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6)
                u.appendChild(d.stateNode);
              else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                d.child.return = d, d = d.child;
                continue;
              }
              if (d === t) break e;
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === t)
                  break e;
                d = d.return;
              }
              d.sibling.return = d.return, d = d.sibling;
            }
            t.stateNode = u;
            e: switch (it(u, s, a), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break e;
              case "img":
                a = !0;
                break e;
              default:
                a = !1;
            }
            a && Tn(t);
          }
        }
        return ke(t), Kr(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== a && Tn(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(o(166));
          if (e = se.current, El(t)) {
            if (e = t.stateNode, n = t.memoizedProps, a = null, s = nt, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  a = s.memoizedProps;
              }
            e[tt] = t, e = !!(e.nodeValue === n || a !== null && a.suppressHydrationWarning === !0 || zg(e.nodeValue, n)), e || Gn(t, !0);
          } else
            e = ec(e).createTextNode(
              a
            ), e[tt] = t, t.stateNode = e;
        }
        return ke(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = El(t), n !== null) {
            if (e === null) {
              if (!a) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[tt] = t;
            } else
              Ra(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ke(t), e = !1;
          } else
            n = Wo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (Ut(t), t) : (Ut(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return ke(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = El(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(o(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(o(317));
              s[tt] = t;
            } else
              Ra(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ke(t), s = !1;
          } else
            s = Wo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (Ut(t), t) : (Ut(t), null);
        }
        return Ut(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = a !== null, e = e !== null && e.memoizedState !== null, n && (a = t.child, s = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (s = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== s && (a.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Bu(t, t.updateQueue), ke(t), null);
      case 4:
        return Ie(), e === null && rf(t.stateNode.containerInfo), ke(t), null;
      case 10:
        return vn(t.type), ke(t), null;
      case 19:
        if (B(Ve), a = t.memoizedState, a === null) return ke(t), null;
        if (s = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (s) Qi(a, !1);
          else {
            if (Ke !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = xu(e), u !== null) {
                  for (t.flags |= 128, Qi(a, !1), e = u.updateQueue, t.updateQueue = e, Bu(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    oh(n, e), n = n.sibling;
                  return W(
                    Ve,
                    Ve.current & 1 | 2
                  ), be && gn(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && _e() > Vu && (t.flags |= 128, s = !0, Qi(a, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = xu(u), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, Bu(t, e), Qi(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !be)
                return ke(t), null;
            } else
              2 * _e() - a.renderingStartTime > Vu && n !== 536870912 && (t.flags |= 128, s = !0, Qi(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (e = a.last, e !== null ? e.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = _e(), e.sibling = null, n = Ve.current, W(
          Ve,
          s ? n & 1 | 2 : n & 1
        ), be && gn(t, a.treeForkCount), e) : (ke(t), null);
      case 22:
      case 23:
        return Ut(t), rr(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (ke(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ke(t), n = t.updateQueue, n !== null && Bu(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== n && (t.flags |= 2048), e !== null && B(Oa), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), vn(Je), ke(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function XS(e, t) {
    switch (Po(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return vn(Je), Ie(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return an(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ut(t), t.alternate === null)
            throw Error(o(340));
          Ra();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Ut(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          Ra();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return B(Ve), null;
      case 4:
        return Ie(), null;
      case 10:
        return vn(t.type), null;
      case 22:
      case 23:
        return Ut(t), rr(), e !== null && B(Oa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return vn(Je), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function kp(e, t) {
    switch (Po(t), t.tag) {
      case 3:
        vn(Je), Ie();
        break;
      case 26:
      case 27:
      case 5:
        an(t);
        break;
      case 4:
        Ie();
        break;
      case 31:
        t.memoizedState !== null && Ut(t);
        break;
      case 13:
        Ut(t);
        break;
      case 19:
        B(Ve);
        break;
      case 10:
        vn(t.type);
        break;
      case 22:
      case 23:
        Ut(t), rr(), e !== null && B(Oa);
        break;
      case 24:
        vn(Je);
    }
  }
  function Vi(e, t) {
    try {
      var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var s = a.next;
        n = s;
        do {
          if ((n.tag & e) === e) {
            a = void 0;
            var u = n.create, d = n.inst;
            a = u(), d.destroy = a;
          }
          n = n.next;
        } while (n !== s);
      }
    } catch (h) {
      Me(t, t.return, h);
    }
  }
  function Jn(e, t, n) {
    try {
      var a = t.updateQueue, s = a !== null ? a.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var d = a.inst, h = d.destroy;
            if (h !== void 0) {
              d.destroy = void 0, s = t;
              var E = n, M = h;
              try {
                M();
              } catch (D) {
                Me(
                  s,
                  E,
                  D
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (D) {
      Me(t, t.return, D);
    }
  }
  function qp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Mh(t, n);
      } catch (a) {
        Me(e, e.return, a);
      }
    }
  }
  function Lp(e, t, n) {
    n.props = qa(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (a) {
      Me(e, t, a);
    }
  }
  function Xi(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(a) : n.current = a;
      }
    } catch (s) {
      Me(e, t, s);
    }
  }
  function un(e, t) {
    var n = e.ref, a = e.refCleanup;
    if (n !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (s) {
          Me(e, t, s);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (s) {
          Me(e, t, s);
        }
      else n.current = null;
  }
  function Bp(e) {
    var t = e.type, n = e.memoizedProps, a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && a.focus();
          break e;
        case "img":
          n.src ? a.src = n.src : n.srcSet && (a.srcset = n.srcSet);
      }
    } catch (s) {
      Me(e, e.return, s);
    }
  }
  function Hr(e, t, n) {
    try {
      var a = e.stateNode;
      m1(a, e.type, n, t), a[pt] = t;
    } catch (s) {
      Me(e, e.return, s);
    }
  }
  function Gp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ea(e.type) || e.tag === 4;
  }
  function Qr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Gp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ea(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Vr(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = mn));
    else if (a !== 4 && (a === 27 && ea(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (Vr(e, t, n), e = e.sibling; e !== null; )
        Vr(e, t, n), e = e.sibling;
  }
  function Gu(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (a !== 4 && (a === 27 && ea(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (Gu(e, t, n), e = e.sibling; e !== null; )
        Gu(e, t, n), e = e.sibling;
  }
  function Kp(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var a = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      it(t, a, n), t[tt] = e, t[pt] = n;
    } catch (u) {
      Me(e, e.return, u);
    }
  }
  var An = !1, Fe = !1, Xr = !1, Hp = typeof WeakSet == "function" ? WeakSet : Set, et = null;
  function ZS(e, t) {
    if (e = e.containerInfo, mf = uc, e = eh(e), Lo(e)) {
      if ("selectionStart" in e)
        var n = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var a = n.getSelection && n.getSelection();
          if (a && a.rangeCount !== 0) {
            n = a.anchorNode;
            var s = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              n.nodeType, u.nodeType;
            } catch {
              n = null;
              break e;
            }
            var d = 0, h = -1, E = -1, M = 0, D = 0, L = e, R = null;
            t: for (; ; ) {
              for (var U; L !== n || s !== 0 && L.nodeType !== 3 || (h = d + s), L !== u || a !== 0 && L.nodeType !== 3 || (E = d + a), L.nodeType === 3 && (d += L.nodeValue.length), (U = L.firstChild) !== null; )
                R = L, L = U;
              for (; ; ) {
                if (L === e) break t;
                if (R === n && ++M === s && (h = d), R === u && ++D === a && (E = d), (U = L.nextSibling) !== null) break;
                L = R, R = L.parentNode;
              }
              L = U;
            }
            n = h === -1 || E === -1 ? null : { start: h, end: E };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (hf = { focusedElem: e, selectionRange: n }, uc = !1, et = t; et !== null; )
      if (t = et, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, et = e;
      else
        for (; et !== null; ) {
          switch (t = et, u = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (n = 0; n < e.length; n++)
                  s = e[n], s.ref.impl = s.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                e = void 0, n = t, s = u.memoizedProps, u = u.memoizedState, a = n.stateNode;
                try {
                  var ee = qa(
                    n.type,
                    s
                  );
                  e = a.getSnapshotBeforeUpdate(
                    ee,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
                } catch (ce) {
                  Me(
                    n,
                    n.return,
                    ce
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  yf(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      yf(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, et = e;
            break;
          }
          et = t.return;
        }
  }
  function Qp(e, t, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Nn(e, n), a & 4 && Vi(5, n);
        break;
      case 1:
        if (Nn(e, n), a & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (d) {
              Me(n, n.return, d);
            }
          else {
            var s = qa(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                s,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (d) {
              Me(
                n,
                n.return,
                d
              );
            }
          }
        a & 64 && qp(n), a & 512 && Xi(n, n.return);
        break;
      case 3:
        if (Nn(e, n), a & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            Mh(e, t);
          } catch (d) {
            Me(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Kp(n);
      case 26:
      case 5:
        Nn(e, n), t === null && a & 4 && Bp(n), a & 512 && Xi(n, n.return);
        break;
      case 12:
        Nn(e, n);
        break;
      case 31:
        Nn(e, n), a & 4 && Zp(e, n);
        break;
      case 13:
        Nn(e, n), a & 4 && Jp(e, n), a & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = t1.bind(
          null,
          n
        ), b1(e, n))));
        break;
      case 22:
        if (a = n.memoizedState !== null || An, !a) {
          t = t !== null && t.memoizedState !== null || Fe, s = An;
          var u = Fe;
          An = a, (Fe = t) && !u ? xn(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : Nn(e, n), An = s, Fe = u;
        }
        break;
      case 30:
        break;
      default:
        Nn(e, n);
    }
  }
  function Vp(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Vp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && bo(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var qe = null, yt = !1;
  function Cn(e, t, n) {
    for (n = n.child; n !== null; )
      Xp(e, t, n), n = n.sibling;
  }
  function Xp(e, t, n) {
    if (Ze && typeof Ze.onCommitFiberUnmount == "function")
      try {
        Ze.onCommitFiberUnmount(jt, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Fe || un(n, t), Cn(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Fe || un(n, t);
        var a = qe, s = yt;
        ea(n.type) && (qe = n.stateNode, yt = !1), Cn(
          e,
          t,
          n
        ), es(n.stateNode), qe = a, yt = s;
        break;
      case 5:
        Fe || un(n, t);
      case 6:
        if (a = qe, s = yt, qe = null, Cn(
          e,
          t,
          n
        ), qe = a, yt = s, qe !== null)
          if (yt)
            try {
              (qe.nodeType === 9 ? qe.body : qe.nodeName === "HTML" ? qe.ownerDocument.body : qe).removeChild(n.stateNode);
            } catch (u) {
              Me(
                n,
                t,
                u
              );
            }
          else
            try {
              qe.removeChild(n.stateNode);
            } catch (u) {
              Me(
                n,
                t,
                u
              );
            }
        break;
      case 18:
        qe !== null && (yt ? (e = qe, qg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), Kl(e)) : qg(qe, n.stateNode));
        break;
      case 4:
        a = qe, s = yt, qe = n.stateNode.containerInfo, yt = !0, Cn(
          e,
          t,
          n
        ), qe = a, yt = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Jn(2, n, t), Fe || Jn(4, n, t), Cn(
          e,
          t,
          n
        );
        break;
      case 1:
        Fe || (un(n, t), a = n.stateNode, typeof a.componentWillUnmount == "function" && Lp(
          n,
          t,
          a
        )), Cn(
          e,
          t,
          n
        );
        break;
      case 21:
        Cn(
          e,
          t,
          n
        );
        break;
      case 22:
        Fe = (a = Fe) || n.memoizedState !== null, Cn(
          e,
          t,
          n
        ), Fe = a;
        break;
      default:
        Cn(
          e,
          t,
          n
        );
    }
  }
  function Zp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Kl(e);
      } catch (n) {
        Me(t, t.return, n);
      }
    }
  }
  function Jp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Kl(e);
      } catch (n) {
        Me(t, t.return, n);
      }
  }
  function JS(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Hp()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Hp()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Ku(e, t) {
    var n = JS(e);
    t.forEach(function(a) {
      if (!n.has(a)) {
        n.add(a);
        var s = n1.bind(null, e, a);
        a.then(s, s);
      }
    });
  }
  function vt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var s = n[a], u = e, d = t, h = d;
        e: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (ea(h.type)) {
                qe = h.stateNode, yt = !1;
                break e;
              }
              break;
            case 5:
              qe = h.stateNode, yt = !1;
              break e;
            case 3:
            case 4:
              qe = h.stateNode.containerInfo, yt = !0;
              break e;
          }
          h = h.return;
        }
        if (qe === null) throw Error(o(160));
        Xp(u, d, s), qe = null, yt = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Yp(t, e), t = t.sibling;
  }
  var Wt = null;
  function Yp(e, t) {
    var n = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        vt(t, e), St(e), a & 4 && (Jn(3, e, e.return), Vi(3, e), Jn(5, e, e.return));
        break;
      case 1:
        vt(t, e), St(e), a & 512 && (Fe || n === null || un(n, n.return)), a & 64 && An && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? a : n.concat(a))));
        break;
      case 26:
        var s = Wt;
        if (vt(t, e), St(e), a & 512 && (Fe || n === null || un(n, n.return)), a & 4) {
          var u = n !== null ? n.memoizedState : null;
          if (a = e.memoizedState, n === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, n = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (a) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[vi] || u[tt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(a), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), it(u, a, n), u[tt] = e, $e(u), a = u;
                      break e;
                    case "link":
                      var d = Yg(
                        "link",
                        "href",
                        s
                      ).get(a + (n.href || ""));
                      if (d) {
                        for (var h = 0; h < d.length; h++)
                          if (u = d[h], u.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && u.getAttribute("rel") === (n.rel == null ? null : n.rel) && u.getAttribute("title") === (n.title == null ? null : n.title) && u.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            d.splice(h, 1);
                            break t;
                          }
                      }
                      u = s.createElement(a), it(u, a, n), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (d = Yg(
                        "meta",
                        "content",
                        s
                      ).get(a + (n.content || ""))) {
                        for (h = 0; h < d.length; h++)
                          if (u = d[h], u.getAttribute("content") === (n.content == null ? null : "" + n.content) && u.getAttribute("name") === (n.name == null ? null : n.name) && u.getAttribute("property") === (n.property == null ? null : n.property) && u.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && u.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            d.splice(h, 1);
                            break t;
                          }
                      }
                      u = s.createElement(a), it(u, a, n), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  u[tt] = e, $e(u), a = u;
                }
                e.stateNode = a;
              } else
                Pg(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Jg(
                s,
                a,
                e.memoizedProps
              );
          else
            u !== a ? (u === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : u.count--, a === null ? Pg(
              s,
              e.type,
              e.stateNode
            ) : Jg(
              s,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && Hr(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        vt(t, e), St(e), a & 512 && (Fe || n === null || un(n, n.return)), n !== null && a & 4 && Hr(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (vt(t, e), St(e), a & 512 && (Fe || n === null || un(n, n.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            rl(s, "");
          } catch (ee) {
            Me(e, e.return, ee);
          }
        }
        a & 4 && e.stateNode != null && (s = e.memoizedProps, Hr(
          e,
          s,
          n !== null ? n.memoizedProps : s
        )), a & 1024 && (Xr = !0);
        break;
      case 6:
        if (vt(t, e), St(e), a & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          a = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = a;
          } catch (ee) {
            Me(e, e.return, ee);
          }
        }
        break;
      case 3:
        if (ac = null, s = Wt, Wt = tc(t.containerInfo), vt(t, e), Wt = s, St(e), a & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            Kl(t.containerInfo);
          } catch (ee) {
            Me(e, e.return, ee);
          }
        Xr && (Xr = !1, Pp(e));
        break;
      case 4:
        a = Wt, Wt = tc(
          e.stateNode.containerInfo
        ), vt(t, e), St(e), Wt = a;
        break;
      case 12:
        vt(t, e), St(e);
        break;
      case 31:
        vt(t, e), St(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Ku(e, a)));
        break;
      case 13:
        vt(t, e), St(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Qu = _e()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Ku(e, a)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var E = n !== null && n.memoizedState !== null, M = An, D = Fe;
        if (An = M || s, Fe = D || E, vt(t, e), Fe = D, An = M, St(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (n === null || E || An || Fe || La(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                E = n = t;
                try {
                  if (u = E.stateNode, s)
                    d = u.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none";
                  else {
                    h = E.stateNode;
                    var L = E.memoizedProps.style, R = L != null && L.hasOwnProperty("display") ? L.display : null;
                    h.style.display = R == null || typeof R == "boolean" ? "" : ("" + R).trim();
                  }
                } catch (ee) {
                  Me(E, E.return, ee);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = s ? "" : E.memoizedProps;
                } catch (ee) {
                  Me(E, E.return, ee);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                E = t;
                try {
                  var U = E.stateNode;
                  s ? Lg(U, !0) : Lg(E.stateNode, !1);
                } catch (ee) {
                  Me(E, E.return, ee);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              n === t && (n = null), t = t.return;
            }
            n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
          }
        a & 4 && (a = e.updateQueue, a !== null && (n = a.retryQueue, n !== null && (a.retryQueue = null, Ku(e, n))));
        break;
      case 19:
        vt(t, e), St(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Ku(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        vt(t, e), St(e);
    }
  }
  function St(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, a = e.return; a !== null; ) {
          if (Gp(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var s = n.stateNode, u = Qr(e);
            Gu(e, u, s);
            break;
          case 5:
            var d = n.stateNode;
            n.flags & 32 && (rl(d, ""), n.flags &= -33);
            var h = Qr(e);
            Gu(e, h, d);
            break;
          case 3:
          case 4:
            var E = n.stateNode.containerInfo, M = Qr(e);
            Vr(
              e,
              M,
              E
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (D) {
        Me(e, e.return, D);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Pp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Pp(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Nn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Qp(e, t.alternate, t), t = t.sibling;
  }
  function La(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Jn(4, t, t.return), La(t);
          break;
        case 1:
          un(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && Lp(
            t,
            t.return,
            n
          ), La(t);
          break;
        case 27:
          es(t.stateNode);
        case 26:
        case 5:
          un(t, t.return), La(t);
          break;
        case 22:
          t.memoizedState === null && La(t);
          break;
        case 30:
          La(t);
          break;
        default:
          La(t);
      }
      e = e.sibling;
    }
  }
  function xn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, s = e, u = t, d = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          xn(
            s,
            u,
            n
          ), Vi(4, u);
          break;
        case 1:
          if (xn(
            s,
            u,
            n
          ), a = u, s = a.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (M) {
              Me(a, a.return, M);
            }
          if (a = u, s = a.updateQueue, s !== null) {
            var h = a.stateNode;
            try {
              var E = s.shared.hiddenCallbacks;
              if (E !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < E.length; s++)
                  xh(E[s], h);
            } catch (M) {
              Me(a, a.return, M);
            }
          }
          n && d & 64 && qp(u), Xi(u, u.return);
          break;
        case 27:
          Kp(u);
        case 26:
        case 5:
          xn(
            s,
            u,
            n
          ), n && a === null && d & 4 && Bp(u), Xi(u, u.return);
          break;
        case 12:
          xn(
            s,
            u,
            n
          );
          break;
        case 31:
          xn(
            s,
            u,
            n
          ), n && d & 4 && Zp(s, u);
          break;
        case 13:
          xn(
            s,
            u,
            n
          ), n && d & 4 && Jp(s, u);
          break;
        case 22:
          u.memoizedState === null && xn(
            s,
            u,
            n
          ), Xi(u, u.return);
          break;
        case 30:
          break;
        default:
          xn(
            s,
            u,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Zr(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && zi(n));
  }
  function Jr(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && zi(e));
  }
  function _t(e, t, n, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Fp(
          e,
          t,
          n,
          a
        ), t = t.sibling;
  }
  function Fp(e, t, n, a) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        _t(
          e,
          t,
          n,
          a
        ), s & 2048 && Vi(9, t);
        break;
      case 1:
        _t(
          e,
          t,
          n,
          a
        );
        break;
      case 3:
        _t(
          e,
          t,
          n,
          a
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && zi(e)));
        break;
      case 12:
        if (s & 2048) {
          _t(
            e,
            t,
            n,
            a
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, d = u.id, h = u.onPostCommit;
            typeof h == "function" && h(
              d,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (E) {
            Me(t, t.return, E);
          }
        } else
          _t(
            e,
            t,
            n,
            a
          );
        break;
      case 31:
        _t(
          e,
          t,
          n,
          a
        );
        break;
      case 13:
        _t(
          e,
          t,
          n,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, d = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? _t(
          e,
          t,
          n,
          a
        ) : Zi(e, t) : u._visibility & 2 ? _t(
          e,
          t,
          n,
          a
        ) : (u._visibility |= 2, Ul(
          e,
          t,
          n,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Zr(d, t);
        break;
      case 24:
        _t(
          e,
          t,
          n,
          a
        ), s & 2048 && Jr(t.alternate, t);
        break;
      default:
        _t(
          e,
          t,
          n,
          a
        );
    }
  }
  function Ul(e, t, n, a, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, d = t, h = n, E = a, M = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Ul(
            u,
            d,
            h,
            E,
            s
          ), Vi(8, d);
          break;
        case 23:
          break;
        case 22:
          var D = d.stateNode;
          d.memoizedState !== null ? D._visibility & 2 ? Ul(
            u,
            d,
            h,
            E,
            s
          ) : Zi(
            u,
            d
          ) : (D._visibility |= 2, Ul(
            u,
            d,
            h,
            E,
            s
          )), s && M & 2048 && Zr(
            d.alternate,
            d
          );
          break;
        case 24:
          Ul(
            u,
            d,
            h,
            E,
            s
          ), s && M & 2048 && Jr(d.alternate, d);
          break;
        default:
          Ul(
            u,
            d,
            h,
            E,
            s
          );
      }
      t = t.sibling;
    }
  }
  function Zi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, a = t, s = a.flags;
        switch (a.tag) {
          case 22:
            Zi(n, a), s & 2048 && Zr(
              a.alternate,
              a
            );
            break;
          case 24:
            Zi(n, a), s & 2048 && Jr(a.alternate, a);
            break;
          default:
            Zi(n, a);
        }
        t = t.sibling;
      }
  }
  var Ji = 8192;
  function zl(e, t, n) {
    if (e.subtreeFlags & Ji)
      for (e = e.child; e !== null; )
        Wp(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function Wp(e, t, n) {
    switch (e.tag) {
      case 26:
        zl(
          e,
          t,
          n
        ), e.flags & Ji && e.memoizedState !== null && D1(
          n,
          Wt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        zl(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var a = Wt;
        Wt = tc(e.stateNode.containerInfo), zl(
          e,
          t,
          n
        ), Wt = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = Ji, Ji = 16777216, zl(
          e,
          t,
          n
        ), Ji = a) : zl(
          e,
          t,
          n
        ));
        break;
      default:
        zl(
          e,
          t,
          n
        );
    }
  }
  function _p(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Yi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          et = a, eg(
            a,
            e
          );
        }
      _p(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        $p(e), e = e.sibling;
  }
  function $p(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Yi(e), e.flags & 2048 && Jn(9, e, e.return);
        break;
      case 3:
        Yi(e);
        break;
      case 12:
        Yi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Hu(e)) : Yi(e);
        break;
      default:
        Yi(e);
    }
  }
  function Hu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          et = a, eg(
            a,
            e
          );
        }
      _p(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Jn(8, t, t.return), Hu(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Hu(t));
          break;
        default:
          Hu(t);
      }
      e = e.sibling;
    }
  }
  function eg(e, t) {
    for (; et !== null; ) {
      var n = et;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Jn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var a = n.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          zi(n.memoizedState.cache);
      }
      if (a = n.child, a !== null) a.return = n, et = a;
      else
        e: for (n = e; et !== null; ) {
          a = et;
          var s = a.sibling, u = a.return;
          if (Vp(a), a === n) {
            et = null;
            break e;
          }
          if (s !== null) {
            s.return = u, et = s;
            break e;
          }
          et = u;
        }
    }
  }
  var YS = {
    getCacheForType: function(e) {
      var t = at(Je), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return at(Je).controller.signal;
    }
  }, PS = typeof WeakMap == "function" ? WeakMap : Map, Ne = 0, De = null, ye = null, Se = 0, xe = 0, zt = null, Yn = !1, Ol = !1, Yr = !1, Mn = 0, Ke = 0, Pn = 0, Ba = 0, Pr = 0, Ot = 0, Dl = 0, Pi = null, Et = null, Fr = !1, Qu = 0, tg = 0, Vu = 1 / 0, Xu = null, Fn = null, We = 0, Wn = null, wl = null, In = 0, Wr = 0, _r = null, ng = null, Fi = 0, $r = null;
  function Dt() {
    return (Ne & 2) !== 0 && Se !== 0 ? Se & -Se : z.T !== null ? sf() : vm();
  }
  function ag() {
    if (Ot === 0)
      if ((Se & 536870912) === 0 || be) {
        var e = $s;
        $s <<= 1, ($s & 3932160) === 0 && ($s = 262144), Ot = e;
      } else Ot = 536870912;
    return e = Rt.current, e !== null && (e.flags |= 32), Ot;
  }
  function bt(e, t, n) {
    (e === De && (xe === 2 || xe === 9) || e.cancelPendingCommit !== null) && (jl(e, 0), _n(
      e,
      Se,
      Ot,
      !1
    )), yi(e, n), ((Ne & 2) === 0 || e !== De) && (e === De && ((Ne & 2) === 0 && (Ba |= n), Ke === 4 && _n(
      e,
      Se,
      Ot,
      !1
    )), cn(e));
  }
  function lg(e, t, n) {
    if ((Ne & 6) !== 0) throw Error(o(327));
    var a = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || gi(e, t), s = a ? _S(e, t) : tf(e, t, !0), u = a;
    do {
      if (s === 0) {
        Ol && !a && _n(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, u && !FS(n)) {
          s = tf(e, t, !1), u = !1;
          continue;
        }
        if (s === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var d = 0;
          else
            d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
          if (d !== 0) {
            t = d;
            e: {
              var h = e;
              s = Pi;
              var E = h.current.memoizedState.isDehydrated;
              if (E && (jl(h, d).flags |= 256), d = tf(
                h,
                d,
                !1
              ), d !== 2) {
                if (Yr && !E) {
                  h.errorRecoveryDisabledLanes |= u, Ba |= u, s = 4;
                  break e;
                }
                u = Et, Et = s, u !== null && (Et === null ? Et = u : Et.push.apply(
                  Et,
                  u
                ));
              }
              s = d;
            }
            if (u = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          jl(e, 0), _n(e, t, 0, !0);
          break;
        }
        e: {
          switch (a = e, u = s, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              _n(
                a,
                t,
                Ot,
                !Yn
              );
              break e;
            case 2:
              Et = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (s = Qu + 300 - _e(), 10 < s)) {
            if (_n(
              a,
              t,
              Ot,
              !Yn
            ), tu(a, 0, !0) !== 0) break e;
            In = t, a.timeoutHandle = jg(
              ig.bind(
                null,
                a,
                n,
                Et,
                Xu,
                Fr,
                t,
                Ot,
                Ba,
                Dl,
                Yn,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          ig(
            a,
            n,
            Et,
            Xu,
            Fr,
            t,
            Ot,
            Ba,
            Dl,
            Yn,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    cn(e);
  }
  function ig(e, t, n, a, s, u, d, h, E, M, D, L, R, U) {
    if (e.timeoutHandle = -1, L = t.subtreeFlags, L & 8192 || (L & 16785408) === 16785408) {
      L = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: mn
      }, Wp(
        t,
        u,
        L
      );
      var ee = (u & 62914560) === u ? Qu - _e() : (u & 4194048) === u ? tg - _e() : 0;
      if (ee = w1(
        L,
        ee
      ), ee !== null) {
        In = u, e.cancelPendingCommit = ee(
          mg.bind(
            null,
            e,
            t,
            u,
            n,
            a,
            s,
            d,
            h,
            E,
            D,
            L,
            null,
            R,
            U
          )
        ), _n(e, u, d, !M);
        return;
      }
    }
    mg(
      e,
      t,
      u,
      n,
      a,
      s,
      d,
      h,
      E
    );
  }
  function FS(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var a = 0; a < n.length; a++) {
          var s = n[a], u = s.getSnapshot;
          s = s.value;
          try {
            if (!Mt(u(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null)
        n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function _n(e, t, n, a) {
    t &= ~Pr, t &= ~Ba, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var u = 31 - xt(s), d = 1 << u;
      a[u] = -1, s &= ~d;
    }
    n !== 0 && pm(e, n, t);
  }
  function Zu() {
    return (Ne & 6) === 0 ? (Wi(0), !1) : !0;
  }
  function ef() {
    if (ye !== null) {
      if (xe === 0)
        var e = ye.return;
      else
        e = ye, yn = Ua = null, gr(e), Nl = null, Di = 0, e = ye;
      for (; e !== null; )
        kp(e.alternate, e), e = e.return;
      ye = null;
    }
  }
  function jl(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, g1(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), In = 0, ef(), De = e, ye = n = pn(e.current, null), Se = t, xe = 0, zt = null, Yn = !1, Ol = gi(e, t), Yr = !1, Dl = Ot = Pr = Ba = Pn = Ke = 0, Et = Pi = null, Fr = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var s = 31 - xt(a), u = 1 << s;
        t |= e[s], a &= ~u;
      }
    return Mn = t, mu(), n;
  }
  function sg(e, t) {
    me = null, z.H = Ki, t === Cl || t === bu ? (t = Th(), xe = 3) : t === lr ? (t = Th(), xe = 4) : xe = t === Or ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, zt = t, ye === null && (Ke = 1, ju(
      e,
      Bt(t, e.current)
    ));
  }
  function ug() {
    var e = Rt.current;
    return e === null ? !0 : (Se & 4194048) === Se ? Qt === null : (Se & 62914560) === Se || (Se & 536870912) !== 0 ? e === Qt : !1;
  }
  function cg() {
    var e = z.H;
    return z.H = Ki, e === null ? Ki : e;
  }
  function og() {
    var e = z.A;
    return z.A = YS, e;
  }
  function Ju() {
    Ke = 4, Yn || (Se & 4194048) !== Se && Rt.current !== null || (Ol = !0), (Pn & 134217727) === 0 && (Ba & 134217727) === 0 || De === null || _n(
      De,
      Se,
      Ot,
      !1
    );
  }
  function tf(e, t, n) {
    var a = Ne;
    Ne |= 2;
    var s = cg(), u = og();
    (De !== e || Se !== t) && (Xu = null, jl(e, t)), t = !1;
    var d = Ke;
    e: do
      try {
        if (xe !== 0 && ye !== null) {
          var h = ye, E = zt;
          switch (xe) {
            case 8:
              ef(), d = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Rt.current === null && (t = !0);
              var M = xe;
              if (xe = 0, zt = null, kl(e, h, E, M), n && Ol) {
                d = 0;
                break e;
              }
              break;
            default:
              M = xe, xe = 0, zt = null, kl(e, h, E, M);
          }
        }
        WS(), d = Ke;
        break;
      } catch (D) {
        sg(e, D);
      }
    while (!0);
    return t && e.shellSuspendCounter++, yn = Ua = null, Ne = a, z.H = s, z.A = u, ye === null && (De = null, Se = 0, mu()), d;
  }
  function WS() {
    for (; ye !== null; ) rg(ye);
  }
  function _S(e, t) {
    var n = Ne;
    Ne |= 2;
    var a = cg(), s = og();
    De !== e || Se !== t ? (Xu = null, Vu = _e() + 500, jl(e, t)) : Ol = gi(
      e,
      t
    );
    e: do
      try {
        if (xe !== 0 && ye !== null) {
          t = ye;
          var u = zt;
          t: switch (xe) {
            case 1:
              xe = 0, zt = null, kl(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Eh(u)) {
                xe = 0, zt = null, fg(t);
                break;
              }
              t = function() {
                xe !== 2 && xe !== 9 || De !== e || (xe = 7), cn(e);
              }, u.then(t, t);
              break e;
            case 3:
              xe = 7;
              break e;
            case 4:
              xe = 5;
              break e;
            case 7:
              Eh(u) ? (xe = 0, zt = null, fg(t)) : (xe = 0, zt = null, kl(e, t, u, 7));
              break;
            case 5:
              var d = null;
              switch (ye.tag) {
                case 26:
                  d = ye.memoizedState;
                case 5:
                case 27:
                  var h = ye;
                  if (d ? Fg(d) : h.stateNode.complete) {
                    xe = 0, zt = null;
                    var E = h.sibling;
                    if (E !== null) ye = E;
                    else {
                      var M = h.return;
                      M !== null ? (ye = M, Yu(M)) : ye = null;
                    }
                    break t;
                  }
              }
              xe = 0, zt = null, kl(e, t, u, 5);
              break;
            case 6:
              xe = 0, zt = null, kl(e, t, u, 6);
              break;
            case 8:
              ef(), Ke = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        $S();
        break;
      } catch (D) {
        sg(e, D);
      }
    while (!0);
    return yn = Ua = null, z.H = a, z.A = s, Ne = n, ye !== null ? 0 : (De = null, Se = 0, mu(), Ke);
  }
  function $S() {
    for (; ye !== null && !tl(); )
      rg(ye);
  }
  function rg(e) {
    var t = wp(e.alternate, e, Mn);
    e.memoizedProps = e.pendingProps, t === null ? Yu(e) : ye = t;
  }
  function fg(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ip(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Se
        );
        break;
      case 11:
        t = Ip(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Se
        );
        break;
      case 5:
        gr(t);
      default:
        kp(n, t), t = ye = oh(t, Mn), t = wp(n, t, Mn);
    }
    e.memoizedProps = e.pendingProps, t === null ? Yu(e) : ye = t;
  }
  function kl(e, t, n, a) {
    yn = Ua = null, gr(t), Nl = null, Di = 0;
    var s = t.return;
    try {
      if (KS(
        e,
        s,
        t,
        n,
        Se
      )) {
        Ke = 1, ju(
          e,
          Bt(n, e.current)
        ), ye = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw ye = s, u;
      Ke = 1, ju(
        e,
        Bt(n, e.current)
      ), ye = null;
      return;
    }
    t.flags & 32768 ? (be || a === 1 ? e = !0 : Ol || (Se & 536870912) !== 0 ? e = !1 : (Yn = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Rt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), dg(t, e)) : Yu(t);
  }
  function Yu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        dg(
          t,
          Yn
        );
        return;
      }
      e = t.return;
      var n = VS(
        t.alternate,
        t,
        Mn
      );
      if (n !== null) {
        ye = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        ye = t;
        return;
      }
      ye = t = e;
    } while (t !== null);
    Ke === 0 && (Ke = 5);
  }
  function dg(e, t) {
    do {
      var n = XS(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, ye = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        ye = e;
        return;
      }
      ye = e = n;
    } while (e !== null);
    Ke = 6, ye = null;
  }
  function mg(e, t, n, a, s, u, d, h, E) {
    e.cancelPendingCommit = null;
    do
      Pu();
    while (We !== 0);
    if ((Ne & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (u = t.lanes | t.childLanes, u |= Qo, Ov(
        e,
        n,
        u,
        d,
        h,
        E
      ), e === De && (ye = De = null, Se = 0), wl = t, Wn = e, In = n, Wr = u, _r = s, ng = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, a1(jn, function() {
        return vg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = z.T, z.T = null, s = Y.p, Y.p = 2, d = Ne, Ne |= 4;
        try {
          ZS(e, t, n);
        } finally {
          Ne = d, Y.p = s, z.T = a;
        }
      }
      We = 1, hg(), pg(), gg();
    }
  }
  function hg() {
    if (We === 1) {
      We = 0;
      var e = Wn, t = wl, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = z.T, z.T = null;
        var a = Y.p;
        Y.p = 2;
        var s = Ne;
        Ne |= 4;
        try {
          Yp(t, e);
          var u = hf, d = eh(e.containerInfo), h = u.focusedElem, E = u.selectionRange;
          if (d !== h && h && h.ownerDocument && $m(
            h.ownerDocument.documentElement,
            h
          )) {
            if (E !== null && Lo(h)) {
              var M = E.start, D = E.end;
              if (D === void 0 && (D = M), "selectionStart" in h)
                h.selectionStart = M, h.selectionEnd = Math.min(
                  D,
                  h.value.length
                );
              else {
                var L = h.ownerDocument || document, R = L && L.defaultView || window;
                if (R.getSelection) {
                  var U = R.getSelection(), ee = h.textContent.length, ce = Math.min(E.start, ee), ze = E.end === void 0 ? ce : Math.min(E.end, ee);
                  !U.extend && ce > ze && (d = ze, ze = ce, ce = d);
                  var C = _m(
                    h,
                    ce
                  ), T = _m(
                    h,
                    ze
                  );
                  if (C && T && (U.rangeCount !== 1 || U.anchorNode !== C.node || U.anchorOffset !== C.offset || U.focusNode !== T.node || U.focusOffset !== T.offset)) {
                    var x = L.createRange();
                    x.setStart(C.node, C.offset), U.removeAllRanges(), ce > ze ? (U.addRange(x), U.extend(T.node, T.offset)) : (x.setEnd(T.node, T.offset), U.addRange(x));
                  }
                }
              }
            }
            for (L = [], U = h; U = U.parentNode; )
              U.nodeType === 1 && L.push({
                element: U,
                left: U.scrollLeft,
                top: U.scrollTop
              });
            for (typeof h.focus == "function" && h.focus(), h = 0; h < L.length; h++) {
              var q = L[h];
              q.element.scrollLeft = q.left, q.element.scrollTop = q.top;
            }
          }
          uc = !!mf, hf = mf = null;
        } finally {
          Ne = s, Y.p = a, z.T = n;
        }
      }
      e.current = t, We = 2;
    }
  }
  function pg() {
    if (We === 2) {
      We = 0;
      var e = Wn, t = wl, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = z.T, z.T = null;
        var a = Y.p;
        Y.p = 2;
        var s = Ne;
        Ne |= 4;
        try {
          Qp(e, t.alternate, t);
        } finally {
          Ne = s, Y.p = a, z.T = n;
        }
      }
      We = 3;
    }
  }
  function gg() {
    if (We === 4 || We === 3) {
      We = 0, nl();
      var e = Wn, t = wl, n = In, a = ng;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? We = 5 : (We = 0, wl = Wn = null, yg(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (Fn = null), So(n), t = t.stateNode, Ze && typeof Ze.onCommitFiberRoot == "function")
        try {
          Ze.onCommitFiberRoot(
            jt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = z.T, s = Y.p, Y.p = 2, z.T = null;
        try {
          for (var u = e.onRecoverableError, d = 0; d < a.length; d++) {
            var h = a[d];
            u(h.value, {
              componentStack: h.stack
            });
          }
        } finally {
          z.T = t, Y.p = s;
        }
      }
      (In & 3) !== 0 && Pu(), cn(e), s = e.pendingLanes, (n & 261930) !== 0 && (s & 42) !== 0 ? e === $r ? Fi++ : (Fi = 0, $r = e) : Fi = 0, Wi(0);
    }
  }
  function yg(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, zi(t)));
  }
  function Pu() {
    return hg(), pg(), gg(), vg();
  }
  function vg() {
    if (We !== 5) return !1;
    var e = Wn, t = Wr;
    Wr = 0;
    var n = So(In), a = z.T, s = Y.p;
    try {
      Y.p = 32 > n ? 32 : n, z.T = null, n = _r, _r = null;
      var u = Wn, d = In;
      if (We = 0, wl = Wn = null, In = 0, (Ne & 6) !== 0) throw Error(o(331));
      var h = Ne;
      if (Ne |= 4, $p(u.current), Fp(
        u,
        u.current,
        d,
        n
      ), Ne = h, Wi(0, !1), Ze && typeof Ze.onPostCommitFiberRoot == "function")
        try {
          Ze.onPostCommitFiberRoot(jt, u);
        } catch {
        }
      return !0;
    } finally {
      Y.p = s, z.T = a, yg(e, t);
    }
  }
  function Sg(e, t, n) {
    t = Bt(n, t), t = zr(e.stateNode, t, 2), e = Vn(e, t, 2), e !== null && (yi(e, 2), cn(e));
  }
  function Me(e, t, n) {
    if (e.tag === 3)
      Sg(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Sg(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Fn === null || !Fn.has(a))) {
            e = Bt(n, e), n = Ep(2), a = Vn(t, n, 2), a !== null && (bp(
              n,
              a,
              t,
              e
            ), yi(a, 2), cn(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function nf(e, t, n) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new PS();
      var s = /* @__PURE__ */ new Set();
      a.set(t, s);
    } else
      s = a.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), a.set(t, s));
    s.has(n) || (Yr = !0, s.add(n), e = e1.bind(null, e, t, n), t.then(e, e));
  }
  function e1(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, De === e && (Se & n) === n && (Ke === 4 || Ke === 3 && (Se & 62914560) === Se && 300 > _e() - Qu ? (Ne & 2) === 0 && jl(e, 0) : Pr |= n, Dl === Se && (Dl = 0)), cn(e);
  }
  function Eg(e, t) {
    t === 0 && (t = hm()), e = Ma(e, t), e !== null && (yi(e, t), cn(e));
  }
  function t1(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Eg(e, n);
  }
  function n1(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode, s = e.memoizedState;
        s !== null && (n = s.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    a !== null && a.delete(t), Eg(e, n);
  }
  function a1(e, t) {
    return dt(e, t);
  }
  var Fu = null, ql = null, af = !1, Wu = !1, lf = !1, $n = 0;
  function cn(e) {
    e !== ql && e.next === null && (ql === null ? Fu = ql = e : ql = ql.next = e), Wu = !0, af || (af = !0, i1());
  }
  function Wi(e, t) {
    if (!lf && Wu) {
      lf = !0;
      do
        for (var n = !1, a = Fu; a !== null; ) {
          if (e !== 0) {
            var s = a.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var d = a.suspendedLanes, h = a.pingedLanes;
              u = (1 << 31 - xt(42 | e) + 1) - 1, u &= s & ~(d & ~h), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (n = !0, Cg(a, u));
          } else
            u = Se, u = tu(
              a,
              a === De ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || gi(a, u) || (n = !0, Cg(a, u));
          a = a.next;
        }
      while (n);
      lf = !1;
    }
  }
  function l1() {
    bg();
  }
  function bg() {
    Wu = af = !1;
    var e = 0;
    $n !== 0 && p1() && (e = $n);
    for (var t = _e(), n = null, a = Fu; a !== null; ) {
      var s = a.next, u = Tg(a, t);
      u === 0 ? (a.next = null, n === null ? Fu = s : n.next = s, s === null && (ql = n)) : (n = a, (e !== 0 || (u & 3) !== 0) && (Wu = !0)), a = s;
    }
    We !== 0 && We !== 5 || Wi(e), $n !== 0 && ($n = 0);
  }
  function Tg(e, t) {
    for (var n = e.suspendedLanes, a = e.pingedLanes, s = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var d = 31 - xt(u), h = 1 << d, E = s[d];
      E === -1 ? ((h & n) === 0 || (h & a) !== 0) && (s[d] = zv(h, t)) : E <= t && (e.expiredLanes |= h), u &= ~h;
    }
    if (t = De, n = Se, n = tu(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, n === 0 || e === t && (xe === 2 || xe === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && ba(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || gi(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (a !== null && ba(a), So(n)) {
        case 2:
        case 8:
          n = pi;
          break;
        case 32:
          n = jn;
          break;
        case 268435456:
          n = fn;
          break;
        default:
          n = jn;
      }
      return a = Ag.bind(null, e), n = dt(n, a), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return a !== null && a !== null && ba(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ag(e, t) {
    if (We !== 0 && We !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Pu() && e.callbackNode !== n)
      return null;
    var a = Se;
    return a = tu(
      e,
      e === De ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (lg(e, a, t), Tg(e, _e()), e.callbackNode != null && e.callbackNode === n ? Ag.bind(null, e) : null);
  }
  function Cg(e, t) {
    if (Pu()) return null;
    lg(e, t, !0);
  }
  function i1() {
    y1(function() {
      (Ne & 6) !== 0 ? dt(
        hi,
        l1
      ) : bg();
    });
  }
  function sf() {
    if ($n === 0) {
      var e = Tl;
      e === 0 && (e = _s, _s <<= 1, (_s & 261888) === 0 && (_s = 256)), $n = e;
    }
    return $n;
  }
  function Ng(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : iu("" + e);
  }
  function xg(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function s1(e, t, n, a, s) {
    if (t === "submit" && n && n.stateNode === s) {
      var u = Ng(
        (s[pt] || null).action
      ), d = a.submitter;
      d && (t = (t = d[pt] || null) ? Ng(t.formAction) : d.getAttribute("formAction"), t !== null && (u = t, d = null));
      var h = new ou(
        "action",
        "action",
        null,
        a,
        s
      );
      e.push({
        event: h,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if ($n !== 0) {
                  var E = d ? xg(s, d) : new FormData(s);
                  Nr(
                    n,
                    {
                      pending: !0,
                      data: E,
                      method: s.method,
                      action: u
                    },
                    null,
                    E
                  );
                }
              } else
                typeof u == "function" && (h.preventDefault(), E = d ? xg(s, d) : new FormData(s), Nr(
                  n,
                  {
                    pending: !0,
                    data: E,
                    method: s.method,
                    action: u
                  },
                  u,
                  E
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var uf = 0; uf < Ho.length; uf++) {
    var cf = Ho[uf], u1 = cf.toLowerCase(), c1 = cf[0].toUpperCase() + cf.slice(1);
    Ft(
      u1,
      "on" + c1
    );
  }
  Ft(ah, "onAnimationEnd"), Ft(lh, "onAnimationIteration"), Ft(ih, "onAnimationStart"), Ft("dblclick", "onDoubleClick"), Ft("focusin", "onFocus"), Ft("focusout", "onBlur"), Ft(CS, "onTransitionRun"), Ft(NS, "onTransitionStart"), Ft(xS, "onTransitionCancel"), Ft(sh, "onTransitionEnd"), cl("onMouseEnter", ["mouseout", "mouseover"]), cl("onMouseLeave", ["mouseout", "mouseover"]), cl("onPointerEnter", ["pointerout", "pointerover"]), cl("onPointerLeave", ["pointerout", "pointerover"]), Aa(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Aa(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Aa("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Aa(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Aa(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Aa(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var _i = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), o1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_i)
  );
  function Mg(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var a = e[n], s = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var d = a.length - 1; 0 <= d; d--) {
            var h = a[d], E = h.instance, M = h.currentTarget;
            if (h = h.listener, E !== u && s.isPropagationStopped())
              break e;
            u = h, s.currentTarget = M;
            try {
              u(s);
            } catch (D) {
              du(D);
            }
            s.currentTarget = null, u = E;
          }
        else
          for (d = 0; d < a.length; d++) {
            if (h = a[d], E = h.instance, M = h.currentTarget, h = h.listener, E !== u && s.isPropagationStopped())
              break e;
            u = h, s.currentTarget = M;
            try {
              u(s);
            } catch (D) {
              du(D);
            }
            s.currentTarget = null, u = E;
          }
      }
    }
  }
  function ve(e, t) {
    var n = t[Eo];
    n === void 0 && (n = t[Eo] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    n.has(a) || (Ig(t, e, 2, !1), n.add(a));
  }
  function of(e, t, n) {
    var a = 0;
    t && (a |= 4), Ig(
      n,
      e,
      a,
      t
    );
  }
  var _u = "_reactListening" + Math.random().toString(36).slice(2);
  function rf(e) {
    if (!e[_u]) {
      e[_u] = !0, bm.forEach(function(n) {
        n !== "selectionchange" && (o1.has(n) || of(n, !1, e), of(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[_u] || (t[_u] = !0, of("selectionchange", !1, t));
    }
  }
  function Ig(e, t, n, a) {
    switch (a0(t)) {
      case 2:
        var s = q1;
        break;
      case 8:
        s = L1;
        break;
      default:
        s = Nf;
    }
    n = s.bind(
      null,
      t,
      n,
      e
    ), s = void 0, !Ro || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), a ? s !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: s
    }) : e.addEventListener(t, n, !0) : s !== void 0 ? e.addEventListener(t, n, {
      passive: s
    }) : e.addEventListener(t, n, !1);
  }
  function ff(e, t, n, a, s) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var d = a.tag;
        if (d === 3 || d === 4) {
          var h = a.stateNode.containerInfo;
          if (h === s) break;
          if (d === 4)
            for (d = a.return; d !== null; ) {
              var E = d.tag;
              if ((E === 3 || E === 4) && d.stateNode.containerInfo === s)
                return;
              d = d.return;
            }
          for (; h !== null; ) {
            if (d = il(h), d === null) return;
            if (E = d.tag, E === 5 || E === 6 || E === 26 || E === 27) {
              a = u = d;
              continue e;
            }
            h = h.parentNode;
          }
        }
        a = a.return;
      }
    Dm(function() {
      var M = u, D = Mo(n), L = [];
      e: {
        var R = uh.get(e);
        if (R !== void 0) {
          var U = ou, ee = e;
          switch (e) {
            case "keypress":
              if (uu(n) === 0) break e;
            case "keydown":
            case "keyup":
              U = nS;
              break;
            case "focusin":
              ee = "focus", U = Do;
              break;
            case "focusout":
              ee = "blur", U = Do;
              break;
            case "beforeblur":
            case "afterblur":
              U = Do;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              U = km;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              U = Vv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              U = iS;
              break;
            case ah:
            case lh:
            case ih:
              U = Jv;
              break;
            case sh:
              U = uS;
              break;
            case "scroll":
            case "scrollend":
              U = Hv;
              break;
            case "wheel":
              U = oS;
              break;
            case "copy":
            case "cut":
            case "paste":
              U = Pv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              U = Lm;
              break;
            case "toggle":
            case "beforetoggle":
              U = fS;
          }
          var ce = (t & 4) !== 0, ze = !ce && (e === "scroll" || e === "scrollend"), C = ce ? R !== null ? R + "Capture" : null : R;
          ce = [];
          for (var T = M, x; T !== null; ) {
            var q = T;
            if (x = q.stateNode, q = q.tag, q !== 5 && q !== 26 && q !== 27 || x === null || C === null || (q = Ei(T, C), q != null && ce.push(
              $i(T, q, x)
            )), ze) break;
            T = T.return;
          }
          0 < ce.length && (R = new U(
            R,
            ee,
            null,
            n,
            D
          ), L.push({ event: R, listeners: ce }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (R = e === "mouseover" || e === "pointerover", U = e === "mouseout" || e === "pointerout", R && n !== xo && (ee = n.relatedTarget || n.fromElement) && (il(ee) || ee[ll]))
            break e;
          if ((U || R) && (R = D.window === D ? D : (R = D.ownerDocument) ? R.defaultView || R.parentWindow : window, U ? (ee = n.relatedTarget || n.toElement, U = M, ee = ee ? il(ee) : null, ee !== null && (ze = m(ee), ce = ee.tag, ee !== ze || ce !== 5 && ce !== 27 && ce !== 6) && (ee = null)) : (U = null, ee = M), U !== ee)) {
            if (ce = km, q = "onMouseLeave", C = "onMouseEnter", T = "mouse", (e === "pointerout" || e === "pointerover") && (ce = Lm, q = "onPointerLeave", C = "onPointerEnter", T = "pointer"), ze = U == null ? R : Si(U), x = ee == null ? R : Si(ee), R = new ce(
              q,
              T + "leave",
              U,
              n,
              D
            ), R.target = ze, R.relatedTarget = x, q = null, il(D) === M && (ce = new ce(
              C,
              T + "enter",
              ee,
              n,
              D
            ), ce.target = x, ce.relatedTarget = ze, q = ce), ze = q, U && ee)
              t: {
                for (ce = r1, C = U, T = ee, x = 0, q = C; q; q = ce(q))
                  x++;
                q = 0;
                for (var ie = T; ie; ie = ce(ie))
                  q++;
                for (; 0 < x - q; )
                  C = ce(C), x--;
                for (; 0 < q - x; )
                  T = ce(T), q--;
                for (; x--; ) {
                  if (C === T || T !== null && C === T.alternate) {
                    ce = C;
                    break t;
                  }
                  C = ce(C), T = ce(T);
                }
                ce = null;
              }
            else ce = null;
            U !== null && Rg(
              L,
              R,
              U,
              ce,
              !1
            ), ee !== null && ze !== null && Rg(
              L,
              ze,
              ee,
              ce,
              !0
            );
          }
        }
        e: {
          if (R = M ? Si(M) : window, U = R.nodeName && R.nodeName.toLowerCase(), U === "select" || U === "input" && R.type === "file")
            var Ae = Zm;
          else if (Vm(R))
            if (Jm)
              Ae = bS;
            else {
              Ae = SS;
              var te = vS;
            }
          else
            U = R.nodeName, !U || U.toLowerCase() !== "input" || R.type !== "checkbox" && R.type !== "radio" ? M && No(M.elementType) && (Ae = Zm) : Ae = ES;
          if (Ae && (Ae = Ae(e, M))) {
            Xm(
              L,
              Ae,
              n,
              D
            );
            break e;
          }
          te && te(e, R, M), e === "focusout" && M && R.type === "number" && M.memoizedProps.value != null && Co(R, "number", R.value);
        }
        switch (te = M ? Si(M) : window, e) {
          case "focusin":
            (Vm(te) || te.contentEditable === "true") && (hl = te, Bo = M, Ii = null);
            break;
          case "focusout":
            Ii = Bo = hl = null;
            break;
          case "mousedown":
            Go = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Go = !1, th(L, n, D);
            break;
          case "selectionchange":
            if (AS) break;
          case "keydown":
          case "keyup":
            th(L, n, D);
        }
        var he;
        if (jo)
          e: {
            switch (e) {
              case "compositionstart":
                var Ee = "onCompositionStart";
                break e;
              case "compositionend":
                Ee = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ee = "onCompositionUpdate";
                break e;
            }
            Ee = void 0;
          }
        else
          ml ? Hm(e, n) && (Ee = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (Ee = "onCompositionStart");
        Ee && (Bm && n.locale !== "ko" && (ml || Ee !== "onCompositionStart" ? Ee === "onCompositionEnd" && ml && (he = wm()) : (qn = D, Uo = "value" in qn ? qn.value : qn.textContent, ml = !0)), te = $u(M, Ee), 0 < te.length && (Ee = new qm(
          Ee,
          e,
          null,
          n,
          D
        ), L.push({ event: Ee, listeners: te }), he ? Ee.data = he : (he = Qm(n), he !== null && (Ee.data = he)))), (he = mS ? hS(e, n) : pS(e, n)) && (Ee = $u(M, "onBeforeInput"), 0 < Ee.length && (te = new qm(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          D
        ), L.push({
          event: te,
          listeners: Ee
        }), te.data = he)), s1(
          L,
          e,
          M,
          n,
          D
        );
      }
      Mg(L, t);
    });
  }
  function $i(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function $u(e, t) {
    for (var n = t + "Capture", a = []; e !== null; ) {
      var s = e, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = Ei(e, n), s != null && a.unshift(
        $i(e, s, u)
      ), s = Ei(e, t), s != null && a.push(
        $i(e, s, u)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function r1(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Rg(e, t, n, a, s) {
    for (var u = t._reactName, d = []; n !== null && n !== a; ) {
      var h = n, E = h.alternate, M = h.stateNode;
      if (h = h.tag, E !== null && E === a) break;
      h !== 5 && h !== 26 && h !== 27 || M === null || (E = M, s ? (M = Ei(n, u), M != null && d.unshift(
        $i(n, M, E)
      )) : s || (M = Ei(n, u), M != null && d.push(
        $i(n, M, E)
      ))), n = n.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var f1 = /\r\n?/g, d1 = /\u0000|\uFFFD/g;
  function Ug(e) {
    return (typeof e == "string" ? e : "" + e).replace(f1, `
`).replace(d1, "");
  }
  function zg(e, t) {
    return t = Ug(t), Ug(e) === t;
  }
  function Ue(e, t, n, a, s, u) {
    switch (n) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || rl(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && rl(e, "" + a);
        break;
      case "className":
        au(e, "class", a);
        break;
      case "tabIndex":
        au(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        au(e, n, a);
        break;
      case "style":
        zm(e, a, u);
        break;
      case "data":
        if (t !== "object") {
          au(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        a = iu("" + a), e.setAttribute(n, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (n === "formAction" ? (t !== "input" && Ue(e, t, "name", s.name, s, null), Ue(
            e,
            t,
            "formEncType",
            s.formEncType,
            s,
            null
          ), Ue(
            e,
            t,
            "formMethod",
            s.formMethod,
            s,
            null
          ), Ue(
            e,
            t,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (Ue(e, t, "encType", s.encType, s, null), Ue(e, t, "method", s.method, s, null), Ue(e, t, "target", s.target, s, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        a = iu("" + a), e.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (e.onclick = mn);
        break;
      case "onScroll":
        a != null && ve("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ve("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (n = a.__html, n != null) {
            if (s.children != null) throw Error(o(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = iu("" + a), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, "" + a) : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        a === !0 ? e.setAttribute(n, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, a) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(n, a) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(n) : e.setAttribute(n, a);
        break;
      case "popover":
        ve("beforetoggle", e), ve("toggle", e), nu(e, "popover", a);
        break;
      case "xlinkActuate":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        dn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        dn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        dn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        nu(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Gv.get(n) || n, nu(e, n, a));
    }
  }
  function df(e, t, n, a, s, u) {
    switch (n) {
      case "style":
        zm(e, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (n = a.__html, n != null) {
            if (s.children != null) throw Error(o(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string" ? rl(e, a) : (typeof a == "number" || typeof a == "bigint") && rl(e, "" + a);
        break;
      case "onScroll":
        a != null && ve("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ve("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = mn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Tm.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (s = n.endsWith("Capture"), t = n.slice(2, s ? n.length - 7 : void 0), u = e[pt] || null, u = u != null ? u[n] : null, typeof u == "function" && e.removeEventListener(t, u, s), typeof a == "function")) {
              typeof u != "function" && u !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, a, s);
              break e;
            }
            n in e ? e[n] = a : a === !0 ? e.setAttribute(n, "") : nu(e, n, a);
          }
    }
  }
  function it(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ve("error", e), ve("load", e);
        var a = !1, s = !1, u;
        for (u in n)
          if (n.hasOwnProperty(u)) {
            var d = n[u];
            if (d != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  Ue(e, t, u, d, n, null);
              }
          }
        s && Ue(e, t, "srcSet", n.srcSet, n, null), a && Ue(e, t, "src", n.src, n, null);
        return;
      case "input":
        ve("invalid", e);
        var h = u = d = s = null, E = null, M = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var D = n[a];
            if (D != null)
              switch (a) {
                case "name":
                  s = D;
                  break;
                case "type":
                  d = D;
                  break;
                case "checked":
                  E = D;
                  break;
                case "defaultChecked":
                  M = D;
                  break;
                case "value":
                  u = D;
                  break;
                case "defaultValue":
                  h = D;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (D != null)
                    throw Error(o(137, t));
                  break;
                default:
                  Ue(e, t, a, D, n, null);
              }
          }
        Mm(
          e,
          u,
          h,
          E,
          M,
          d,
          s,
          !1
        );
        return;
      case "select":
        ve("invalid", e), a = d = u = null;
        for (s in n)
          if (n.hasOwnProperty(s) && (h = n[s], h != null))
            switch (s) {
              case "value":
                u = h;
                break;
              case "defaultValue":
                d = h;
                break;
              case "multiple":
                a = h;
              default:
                Ue(e, t, s, h, n, null);
            }
        t = u, n = d, e.multiple = !!a, t != null ? ol(e, !!a, t, !1) : n != null && ol(e, !!a, n, !0);
        return;
      case "textarea":
        ve("invalid", e), u = s = a = null;
        for (d in n)
          if (n.hasOwnProperty(d) && (h = n[d], h != null))
            switch (d) {
              case "value":
                a = h;
                break;
              case "defaultValue":
                s = h;
                break;
              case "children":
                u = h;
                break;
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(o(91));
                break;
              default:
                Ue(e, t, d, h, n, null);
            }
        Rm(e, a, s, u);
        return;
      case "option":
        for (E in n)
          if (n.hasOwnProperty(E) && (a = n[E], a != null))
            switch (E) {
              case "selected":
                e.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Ue(e, t, E, a, n, null);
            }
        return;
      case "dialog":
        ve("beforetoggle", e), ve("toggle", e), ve("cancel", e), ve("close", e);
        break;
      case "iframe":
      case "object":
        ve("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < _i.length; a++)
          ve(_i[a], e);
        break;
      case "image":
        ve("error", e), ve("load", e);
        break;
      case "details":
        ve("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ve("error", e), ve("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (M in n)
          if (n.hasOwnProperty(M) && (a = n[M], a != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                Ue(e, t, M, a, n, null);
            }
        return;
      default:
        if (No(t)) {
          for (D in n)
            n.hasOwnProperty(D) && (a = n[D], a !== void 0 && df(
              e,
              t,
              D,
              a,
              n,
              void 0
            ));
          return;
        }
    }
    for (h in n)
      n.hasOwnProperty(h) && (a = n[h], a != null && Ue(e, t, h, a, n, null));
  }
  function m1(e, t, n, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null, u = null, d = null, h = null, E = null, M = null, D = null;
        for (U in n) {
          var L = n[U];
          if (n.hasOwnProperty(U) && L != null)
            switch (U) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = L;
              default:
                a.hasOwnProperty(U) || Ue(e, t, U, null, a, L);
            }
        }
        for (var R in a) {
          var U = a[R];
          if (L = n[R], a.hasOwnProperty(R) && (U != null || L != null))
            switch (R) {
              case "type":
                u = U;
                break;
              case "name":
                s = U;
                break;
              case "checked":
                M = U;
                break;
              case "defaultChecked":
                D = U;
                break;
              case "value":
                d = U;
                break;
              case "defaultValue":
                h = U;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null)
                  throw Error(o(137, t));
                break;
              default:
                U !== L && Ue(
                  e,
                  t,
                  R,
                  U,
                  a,
                  L
                );
            }
        }
        Ao(
          e,
          d,
          h,
          E,
          M,
          D,
          u,
          s
        );
        return;
      case "select":
        U = d = h = R = null;
        for (u in n)
          if (E = n[u], n.hasOwnProperty(u) && E != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                U = E;
              default:
                a.hasOwnProperty(u) || Ue(
                  e,
                  t,
                  u,
                  null,
                  a,
                  E
                );
            }
        for (s in a)
          if (u = a[s], E = n[s], a.hasOwnProperty(s) && (u != null || E != null))
            switch (s) {
              case "value":
                R = u;
                break;
              case "defaultValue":
                h = u;
                break;
              case "multiple":
                d = u;
              default:
                u !== E && Ue(
                  e,
                  t,
                  s,
                  u,
                  a,
                  E
                );
            }
        t = h, n = d, a = U, R != null ? ol(e, !!n, R, !1) : !!a != !!n && (t != null ? ol(e, !!n, t, !0) : ol(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        U = R = null;
        for (h in n)
          if (s = n[h], n.hasOwnProperty(h) && s != null && !a.hasOwnProperty(h))
            switch (h) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ue(e, t, h, null, a, s);
            }
        for (d in a)
          if (s = a[d], u = n[d], a.hasOwnProperty(d) && (s != null || u != null))
            switch (d) {
              case "value":
                R = s;
                break;
              case "defaultValue":
                U = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(o(91));
                break;
              default:
                s !== u && Ue(e, t, d, s, a, u);
            }
        Im(e, R, U);
        return;
      case "option":
        for (var ee in n)
          if (R = n[ee], n.hasOwnProperty(ee) && R != null && !a.hasOwnProperty(ee))
            switch (ee) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ue(
                  e,
                  t,
                  ee,
                  null,
                  a,
                  R
                );
            }
        for (E in a)
          if (R = a[E], U = n[E], a.hasOwnProperty(E) && R !== U && (R != null || U != null))
            switch (E) {
              case "selected":
                e.selected = R && typeof R != "function" && typeof R != "symbol";
                break;
              default:
                Ue(
                  e,
                  t,
                  E,
                  R,
                  a,
                  U
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ce in n)
          R = n[ce], n.hasOwnProperty(ce) && R != null && !a.hasOwnProperty(ce) && Ue(e, t, ce, null, a, R);
        for (M in a)
          if (R = a[M], U = n[M], a.hasOwnProperty(M) && R !== U && (R != null || U != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (R != null)
                  throw Error(o(137, t));
                break;
              default:
                Ue(
                  e,
                  t,
                  M,
                  R,
                  a,
                  U
                );
            }
        return;
      default:
        if (No(t)) {
          for (var ze in n)
            R = n[ze], n.hasOwnProperty(ze) && R !== void 0 && !a.hasOwnProperty(ze) && df(
              e,
              t,
              ze,
              void 0,
              a,
              R
            );
          for (D in a)
            R = a[D], U = n[D], !a.hasOwnProperty(D) || R === U || R === void 0 && U === void 0 || df(
              e,
              t,
              D,
              R,
              a,
              U
            );
          return;
        }
    }
    for (var C in n)
      R = n[C], n.hasOwnProperty(C) && R != null && !a.hasOwnProperty(C) && Ue(e, t, C, null, a, R);
    for (L in a)
      R = a[L], U = n[L], !a.hasOwnProperty(L) || R === U || R == null && U == null || Ue(e, t, L, R, a, U);
  }
  function Og(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function h1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), a = 0; a < n.length; a++) {
        var s = n[a], u = s.transferSize, d = s.initiatorType, h = s.duration;
        if (u && h && Og(d)) {
          for (d = 0, h = s.responseEnd, a += 1; a < n.length; a++) {
            var E = n[a], M = E.startTime;
            if (M > h) break;
            var D = E.transferSize, L = E.initiatorType;
            D && Og(L) && (E = E.responseEnd, d += D * (E < h ? 1 : (h - M) / (E - M)));
          }
          if (--a, t += 8 * (u + d) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var mf = null, hf = null;
  function ec(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Dg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function wg(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function pf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var gf = null;
  function p1() {
    var e = window.event;
    return e && e.type === "popstate" ? e === gf ? !1 : (gf = e, !0) : (gf = null, !1);
  }
  var jg = typeof setTimeout == "function" ? setTimeout : void 0, g1 = typeof clearTimeout == "function" ? clearTimeout : void 0, kg = typeof Promise == "function" ? Promise : void 0, y1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof kg < "u" ? function(e) {
    return kg.resolve(null).then(e).catch(v1);
  } : jg;
  function v1(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ea(e) {
    return e === "head";
  }
  function qg(e, t) {
    var n = t, a = 0;
    do {
      var s = n.nextSibling;
      if (e.removeChild(n), s && s.nodeType === 8)
        if (n = s.data, n === "/$" || n === "/&") {
          if (a === 0) {
            e.removeChild(s), Kl(t);
            return;
          }
          a--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          a++;
        else if (n === "html")
          es(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, es(n);
          for (var u = n.firstChild; u; ) {
            var d = u.nextSibling, h = u.nodeName;
            u[vi] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && u.rel.toLowerCase() === "stylesheet" || n.removeChild(u), u = d;
          }
        } else
          n === "body" && es(e.ownerDocument.body);
      n = s;
    } while (n);
    Kl(t);
  }
  function Lg(e, t) {
    var n = e;
    e = 0;
    do {
      var a = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), a && a.nodeType === 8)
        if (n = a.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = a;
    } while (n);
  }
  function yf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          yf(n), bo(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function S1(e, t, n, a) {
    for (; e.nodeType === 1; ) {
      var s = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
        if (!e[vi])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (u !== s.rel || e.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || e.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (u = e.getAttribute("src"), (u !== (s.src == null ? null : s.src) || e.getAttribute("type") !== (s.type == null ? null : s.type) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && e.getAttribute("name") === u)
          return e;
      } else return e;
      if (e = Vt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function E1(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Vt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Bg(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Vt(e.nextSibling), e === null)) return null;
    return e;
  }
  function vf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Sf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function b1(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), n.removeEventListener("DOMContentLoaded", a);
      };
      n.addEventListener("DOMContentLoaded", a), e._reactRetry = a;
    }
  }
  function Vt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Ef = null;
  function Gg(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Vt(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Kg(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else n !== "/$" && n !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Hg(e, t, n) {
    switch (t = ec(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(o(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(o(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function es(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    bo(e);
  }
  var Xt = /* @__PURE__ */ new Map(), Qg = /* @__PURE__ */ new Set();
  function tc(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Rn = Y.d;
  Y.d = {
    f: T1,
    r: A1,
    D: C1,
    C: N1,
    L: x1,
    m: M1,
    X: R1,
    S: I1,
    M: U1
  };
  function T1() {
    var e = Rn.f(), t = Zu();
    return e || t;
  }
  function A1(e) {
    var t = sl(e);
    t !== null && t.tag === 5 && t.type === "form" ? sp(t) : Rn.r(e);
  }
  var Ll = typeof document > "u" ? null : document;
  function Vg(e, t, n) {
    var a = Ll;
    if (a && typeof t == "string" && t) {
      var s = qt(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof n == "string" && (s += '[crossorigin="' + n + '"]'), Qg.has(s) || (Qg.add(s), e = { rel: e, crossOrigin: n, href: t }, a.querySelector(s) === null && (t = a.createElement("link"), it(t, "link", e), $e(t), a.head.appendChild(t)));
    }
  }
  function C1(e) {
    Rn.D(e), Vg("dns-prefetch", e, null);
  }
  function N1(e, t) {
    Rn.C(e, t), Vg("preconnect", e, t);
  }
  function x1(e, t, n) {
    Rn.L(e, t, n);
    var a = Ll;
    if (a && e && t) {
      var s = 'link[rel="preload"][as="' + qt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (s += '[imagesrcset="' + qt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (s += '[imagesizes="' + qt(
        n.imageSizes
      ) + '"]')) : s += '[href="' + qt(e) + '"]';
      var u = s;
      switch (t) {
        case "style":
          u = Bl(e);
          break;
        case "script":
          u = Gl(e);
      }
      Xt.has(u) || (e = b(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Xt.set(u, e), a.querySelector(s) !== null || t === "style" && a.querySelector(ts(u)) || t === "script" && a.querySelector(ns(u)) || (t = a.createElement("link"), it(t, "link", e), $e(t), a.head.appendChild(t)));
    }
  }
  function M1(e, t) {
    Rn.m(e, t);
    var n = Ll;
    if (n && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + qt(a) + '"][href="' + qt(e) + '"]', u = s;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Gl(e);
      }
      if (!Xt.has(u) && (e = b({ rel: "modulepreload", href: e }, t), Xt.set(u, e), n.querySelector(s) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(ns(u)))
              return;
        }
        a = n.createElement("link"), it(a, "link", e), $e(a), n.head.appendChild(a);
      }
    }
  }
  function I1(e, t, n) {
    Rn.S(e, t, n);
    var a = Ll;
    if (a && e) {
      var s = ul(a).hoistableStyles, u = Bl(e);
      t = t || "default";
      var d = s.get(u);
      if (!d) {
        var h = { loading: 0, preload: null };
        if (d = a.querySelector(
          ts(u)
        ))
          h.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Xt.get(u)) && bf(e, n);
          var E = d = a.createElement("link");
          $e(E), it(E, "link", e), E._p = new Promise(function(M, D) {
            E.onload = M, E.onerror = D;
          }), E.addEventListener("load", function() {
            h.loading |= 1;
          }), E.addEventListener("error", function() {
            h.loading |= 2;
          }), h.loading |= 4, nc(d, t, a);
        }
        d = {
          type: "stylesheet",
          instance: d,
          count: 1,
          state: h
        }, s.set(u, d);
      }
    }
  }
  function R1(e, t) {
    Rn.X(e, t);
    var n = Ll;
    if (n && e) {
      var a = ul(n).hoistableScripts, s = Gl(e), u = a.get(s);
      u || (u = n.querySelector(ns(s)), u || (e = b({ src: e, async: !0 }, t), (t = Xt.get(s)) && Tf(e, t), u = n.createElement("script"), $e(u), it(u, "link", e), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(s, u));
    }
  }
  function U1(e, t) {
    Rn.M(e, t);
    var n = Ll;
    if (n && e) {
      var a = ul(n).hoistableScripts, s = Gl(e), u = a.get(s);
      u || (u = n.querySelector(ns(s)), u || (e = b({ src: e, async: !0, type: "module" }, t), (t = Xt.get(s)) && Tf(e, t), u = n.createElement("script"), $e(u), it(u, "link", e), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(s, u));
    }
  }
  function Xg(e, t, n, a) {
    var s = (s = se.current) ? tc(s) : null;
    if (!s) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Bl(n.href), n = ul(
          s
        ).hoistableStyles, a = n.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Bl(n.href);
          var u = ul(
            s
          ).hoistableStyles, d = u.get(e);
          if (d || (s = s.ownerDocument || s, d = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, d), (u = s.querySelector(
            ts(e)
          )) && !u._p && (d.instance = u, d.state.loading = 5), Xt.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Xt.set(e, n), u || z1(
            s,
            e,
            n,
            d.state
          ))), t && a === null)
            throw Error(o(528, ""));
          return d;
        }
        if (t && a !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Gl(n), n = ul(
          s
        ).hoistableScripts, a = n.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, e));
    }
  }
  function Bl(e) {
    return 'href="' + qt(e) + '"';
  }
  function ts(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Zg(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function z1(e, t, n, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), it(t, "link", n), $e(t), e.head.appendChild(t));
  }
  function Gl(e) {
    return '[src="' + qt(e) + '"]';
  }
  function ns(e) {
    return "script[async]" + e;
  }
  function Jg(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + qt(n.href) + '"]'
          );
          if (a)
            return t.instance = a, $e(a), a;
          var s = b({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), $e(a), it(a, "style", s), nc(a, n.precedence, e), t.instance = a;
        case "stylesheet":
          s = Bl(n.href);
          var u = e.querySelector(
            ts(s)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, $e(u), u;
          a = Zg(n), (s = Xt.get(s)) && bf(a, s), u = (e.ownerDocument || e).createElement("link"), $e(u);
          var d = u;
          return d._p = new Promise(function(h, E) {
            d.onload = h, d.onerror = E;
          }), it(u, "link", a), t.state.loading |= 4, nc(u, n.precedence, e), t.instance = u;
        case "script":
          return u = Gl(n.src), (s = e.querySelector(
            ns(u)
          )) ? (t.instance = s, $e(s), s) : (a = n, (s = Xt.get(u)) && (a = b({}, n), Tf(a, s)), e = e.ownerDocument || e, s = e.createElement("script"), $e(s), it(s, "link", a), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, nc(a, n.precedence, e));
    return t.instance;
  }
  function nc(e, t, n) {
    for (var a = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = a.length ? a[a.length - 1] : null, u = s, d = 0; d < a.length; d++) {
      var h = a[d];
      if (h.dataset.precedence === t) u = h;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function bf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Tf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var ac = null;
  function Yg(e, t, n) {
    if (ac === null) {
      var a = /* @__PURE__ */ new Map(), s = ac = /* @__PURE__ */ new Map();
      s.set(n, a);
    } else
      s = ac, a = s.get(n), a || (a = /* @__PURE__ */ new Map(), s.set(n, a));
    if (a.has(e)) return a;
    for (a.set(e, null), n = n.getElementsByTagName(e), s = 0; s < n.length; s++) {
      var u = n[s];
      if (!(u[vi] || u[tt] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var d = u.getAttribute(t) || "";
        d = e + d;
        var h = a.get(d);
        h ? h.push(u) : a.set(d, [u]);
      }
    }
    return a;
  }
  function Pg(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function O1(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Fg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function D1(e, t, n, a) {
    if (n.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var s = Bl(a.href), u = t.querySelector(
          ts(s)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = lc.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = u, $e(u);
          return;
        }
        u = t.ownerDocument || t, a = Zg(a), (s = Xt.get(s)) && bf(a, s), u = u.createElement("link"), $e(u);
        var d = u;
        d._p = new Promise(function(h, E) {
          d.onload = h, d.onerror = E;
        }), it(u, "link", a), n.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = lc.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Af = 0;
  function w1(e, t) {
    return e.stylesheets && e.count === 0 && sc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var a = setTimeout(function() {
        if (e.stylesheets && sc(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Af === 0 && (Af = 62500 * h1());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && sc(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Af ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(s);
      };
    } : null;
  }
  function lc() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) sc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var ic = null;
  function sc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, ic = /* @__PURE__ */ new Map(), t.forEach(j1, e), ic = null, lc.call(e));
  }
  function j1(e, t) {
    if (!(t.state.loading & 4)) {
      var n = ic.get(e);
      if (n) var a = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), ic.set(e, n);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var d = s[u];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (n.set(d.dataset.precedence, d), a = d);
        }
        a && n.set(null, a);
      }
      s = t.instance, d = s.getAttribute("data-precedence"), u = n.get(d) || a, u === a && n.set(null, s), n.set(d, s), this.count++, a = lc.bind(this), s.addEventListener("load", a), s.addEventListener("error", a), u ? u.parentNode.insertBefore(s, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var as = {
    $$typeof: J,
    Provider: null,
    Consumer: null,
    _currentValue: ae,
    _currentValue2: ae,
    _threadCount: 0
  };
  function k1(e, t, n, a, s, u, d, h, E) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = yo(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = yo(0), this.hiddenUpdates = yo(null), this.identifierPrefix = a, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = E, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Wg(e, t, n, a, s, u, d, h, E, M, D, L) {
    return e = new k1(
      e,
      t,
      n,
      d,
      E,
      M,
      D,
      L,
      h
    ), t = 1, u === !0 && (t |= 24), u = It(3, null, null, t), e.current = u, u.stateNode = e, t = tr(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: n,
      cache: t
    }, ir(u), e;
  }
  function _g(e) {
    return e ? (e = yl, e) : yl;
  }
  function $g(e, t, n, a, s, u) {
    s = _g(s), a.context === null ? a.context = s : a.pendingContext = s, a = Qn(t), a.payload = { element: n }, u = u === void 0 ? null : u, u !== null && (a.callback = u), n = Vn(e, a, t), n !== null && (bt(n, e, t), ji(n, e, t));
  }
  function e0(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Cf(e, t) {
    e0(e, t), (e = e.alternate) && e0(e, t);
  }
  function t0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ma(e, 67108864);
      t !== null && bt(t, e, 67108864), Cf(e, 67108864);
    }
  }
  function n0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Dt();
      t = vo(t);
      var n = Ma(e, t);
      n !== null && bt(n, e, t), Cf(e, t);
    }
  }
  var uc = !0;
  function q1(e, t, n, a) {
    var s = z.T;
    z.T = null;
    var u = Y.p;
    try {
      Y.p = 2, Nf(e, t, n, a);
    } finally {
      Y.p = u, z.T = s;
    }
  }
  function L1(e, t, n, a) {
    var s = z.T;
    z.T = null;
    var u = Y.p;
    try {
      Y.p = 8, Nf(e, t, n, a);
    } finally {
      Y.p = u, z.T = s;
    }
  }
  function Nf(e, t, n, a) {
    if (uc) {
      var s = xf(a);
      if (s === null)
        ff(
          e,
          t,
          a,
          cc,
          n
        ), l0(e, a);
      else if (G1(
        s,
        e,
        t,
        n,
        a
      ))
        a.stopPropagation();
      else if (l0(e, a), t & 4 && -1 < B1.indexOf(e)) {
        for (; s !== null; ) {
          var u = sl(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var d = Ta(u.pendingLanes);
                  if (d !== 0) {
                    var h = u;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; d; ) {
                      var E = 1 << 31 - xt(d);
                      h.entanglements[1] |= E, d &= ~E;
                    }
                    cn(u), (Ne & 6) === 0 && (Vu = _e() + 500, Wi(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = Ma(u, 2), h !== null && bt(h, u, 2), Zu(), Cf(u, 2);
            }
          if (u = xf(a), u === null && ff(
            e,
            t,
            a,
            cc,
            n
          ), u === s) break;
          s = u;
        }
        s !== null && a.stopPropagation();
      } else
        ff(
          e,
          t,
          a,
          null,
          n
        );
    }
  }
  function xf(e) {
    return e = Mo(e), Mf(e);
  }
  var cc = null;
  function Mf(e) {
    if (cc = null, e = il(e), e !== null) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = g(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return cc = e, null;
  }
  function a0(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (mi()) {
          case hi:
            return 2;
          case pi:
            return 8;
          case jn:
          case mt:
            return 32;
          case fn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var If = !1, ta = null, na = null, aa = null, ls = /* @__PURE__ */ new Map(), is = /* @__PURE__ */ new Map(), la = [], B1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function l0(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ta = null;
        break;
      case "dragenter":
      case "dragleave":
        na = null;
        break;
      case "mouseover":
      case "mouseout":
        aa = null;
        break;
      case "pointerover":
      case "pointerout":
        ls.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        is.delete(t.pointerId);
    }
  }
  function ss(e, t, n, a, s, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [s]
    }, t !== null && (t = sl(t), t !== null && t0(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function G1(e, t, n, a, s) {
    switch (t) {
      case "focusin":
        return ta = ss(
          ta,
          e,
          t,
          n,
          a,
          s
        ), !0;
      case "dragenter":
        return na = ss(
          na,
          e,
          t,
          n,
          a,
          s
        ), !0;
      case "mouseover":
        return aa = ss(
          aa,
          e,
          t,
          n,
          a,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return ls.set(
          u,
          ss(
            ls.get(u) || null,
            e,
            t,
            n,
            a,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, is.set(
          u,
          ss(
            is.get(u) || null,
            e,
            t,
            n,
            a,
            s
          )
        ), !0;
    }
    return !1;
  }
  function i0(e) {
    var t = il(e.target);
    if (t !== null) {
      var n = m(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = g(n), t !== null) {
            e.blockedOn = t, Sm(e.priority, function() {
              n0(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = p(n), t !== null) {
            e.blockedOn = t, Sm(e.priority, function() {
              n0(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function oc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = xf(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var a = new n.constructor(
          n.type,
          n
        );
        xo = a, n.target.dispatchEvent(a), xo = null;
      } else
        return t = sl(n), t !== null && t0(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function s0(e, t, n) {
    oc(e) && n.delete(t);
  }
  function K1() {
    If = !1, ta !== null && oc(ta) && (ta = null), na !== null && oc(na) && (na = null), aa !== null && oc(aa) && (aa = null), ls.forEach(s0), is.forEach(s0);
  }
  function rc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, If || (If = !0, l.unstable_scheduleCallback(
      l.unstable_NormalPriority,
      K1
    )));
  }
  var fc = null;
  function u0(e) {
    fc !== e && (fc = e, l.unstable_scheduleCallback(
      l.unstable_NormalPriority,
      function() {
        fc === e && (fc = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], a = e[t + 1], s = e[t + 2];
          if (typeof a != "function") {
            if (Mf(a || n) === null)
              continue;
            break;
          }
          var u = sl(n);
          u !== null && (e.splice(t, 3), t -= 3, Nr(
            u,
            {
              pending: !0,
              data: s,
              method: n.method,
              action: a
            },
            a,
            s
          ));
        }
      }
    ));
  }
  function Kl(e) {
    function t(E) {
      return rc(E, e);
    }
    ta !== null && rc(ta, e), na !== null && rc(na, e), aa !== null && rc(aa, e), ls.forEach(t), is.forEach(t);
    for (var n = 0; n < la.length; n++) {
      var a = la[n];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < la.length && (n = la[0], n.blockedOn === null); )
      i0(n), n.blockedOn === null && la.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (a = 0; a < n.length; a += 3) {
        var s = n[a], u = n[a + 1], d = s[pt] || null;
        if (typeof u == "function")
          d || u0(n);
        else if (d) {
          var h = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, d = u[pt] || null)
              h = d.formAction;
            else if (Mf(s) !== null) continue;
          } else h = d.action;
          typeof h == "function" ? n[a + 1] = h : (n.splice(a, 3), a -= 3), u0(n);
        }
      }
  }
  function c0() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(d) {
            return s = d;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      s !== null && (s(), s = null), a || setTimeout(n, 20);
    }
    function n() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, s = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        a = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), s !== null && (s(), s = null);
      };
    }
  }
  function Rf(e) {
    this._internalRoot = e;
  }
  dc.prototype.render = Rf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var n = t.current, a = Dt();
    $g(n, a, e, t, null, null);
  }, dc.prototype.unmount = Rf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      $g(e.current, 2, null, e, null, null), Zu(), t[ll] = null;
    }
  };
  function dc(e) {
    this._internalRoot = e;
  }
  dc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = vm();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < la.length && t !== 0 && t < la[n].priority; n++) ;
      la.splice(n, 0, e), n === 0 && i0(e);
    }
  };
  var o0 = i.version;
  if (o0 !== "19.2.4")
    throw Error(
      o(
        527,
        o0,
        "19.2.4"
      )
    );
  Y.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = v(t), e = e !== null ? S(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var H1 = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var mc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!mc.isDisabled && mc.supportsFiber)
      try {
        jt = mc.inject(
          H1
        ), Ze = mc;
      } catch {
      }
  }
  return cs.createRoot = function(e, t) {
    if (!r(e)) throw Error(o(299));
    var n = !1, a = "", s = gp, u = yp, d = vp;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError)), t = Wg(
      e,
      1,
      !1,
      null,
      null,
      n,
      a,
      null,
      s,
      u,
      d,
      c0
    ), e[ll] = t.current, rf(e), new Rf(t);
  }, cs.hydrateRoot = function(e, t, n) {
    if (!r(e)) throw Error(o(299));
    var a = !1, s = "", u = gp, d = yp, h = vp, E = null;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.formState !== void 0 && (E = n.formState)), t = Wg(
      e,
      1,
      !0,
      t,
      n ?? null,
      a,
      s,
      E,
      u,
      d,
      h,
      c0
    ), t.context = _g(null), n = t.current, a = Dt(), a = vo(a), s = Qn(a), s.callback = null, Vn(n, s, a), n = a, t.current.lanes = n, yi(t, n), cn(t), e[ll] = t.current, rf(e), new dc(t);
  }, cs.version = "19.2.4", cs;
}
var S0;
function $1() {
  if (S0) return zf.exports;
  S0 = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return l(), zf.exports = _1(), zf.exports;
}
var Sa = $1(), k = zd(), Od = hy();
const eE = 400;
function oi({
  open: l,
  onClose: i,
  children: c,
  width: o = 680,
  height: r = 520,
  maskClosable: m = !0,
  closable: g = !0
}) {
  const p = k.useRef(null), y = k.useRef(null), v = k.useRef(null), S = k.useRef(!1), b = k.useRef(0), [N, X] = k.useState(!1), [I, w] = k.useState(!1);
  k.useEffect(() => {
    l ? (X(!0), w(!1)) : N && w(!0);
  }, [l]), k.useEffect(() => {
    if (!I) return;
    const K = y.current, Q = () => {
      X(!1), w(!1);
    };
    if (!K) {
      Q();
      return;
    }
    const _ = (re) => {
      re.target === K && Q();
    };
    K.addEventListener("animationend", _);
    const pe = window.setTimeout(Q, eE);
    return () => {
      K.removeEventListener("animationend", _), window.clearTimeout(pe);
    };
  }, [I]);
  const j = k.useCallback(() => {
    const K = Date.now();
    K - b.current < 300 || (b.current = K, i());
  }, [i]);
  if (k.useEffect(() => {
    const K = v.current;
    if (!K) return;
    const Q = (_) => {
      _.stopPropagation(), j();
    };
    return K.addEventListener("pointerdown", Q, !0), K.addEventListener("click", Q, !0), () => {
      K.removeEventListener("pointerdown", Q, !0), K.removeEventListener("click", Q, !0);
    };
  }, [j, N, g]), k.useEffect(() => {
    if (!l) return;
    const K = (Q) => {
      Q.key === "Escape" && j();
    };
    return document.addEventListener("keydown", K), () => document.removeEventListener("keydown", K);
  }, [l, j]), k.useEffect(() => (N && !I && (document.body.style.overflow = "hidden"), N || (document.body.style.overflow = ""), () => {
    document.body.style.overflow = "";
  }), [N, I]), !N) return null;
  const F = {
    width: typeof o == "number" ? `${o}px` : o,
    height: typeof r == "number" ? `${r}px` : r
  }, V = `sona-modal-overlay${I ? " sona-modal-closing" : ""}`, J = `sona-modal-dialog${I ? " sona-modal-closing" : ""}`, H = (K) => {
    S.current = K.target === K.currentTarget, K.stopPropagation();
  }, Z = (K) => {
    const Q = m && S.current && K.target === K.currentTarget;
    S.current = !1, K.stopPropagation(), Q && j();
  };
  return Od.createPortal(
    /* @__PURE__ */ f.jsx(
      "div",
      {
        ref: y,
        className: V,
        onClick: (K) => K.stopPropagation(),
        onMouseDown: H,
        onMouseUp: Z,
        children: /* @__PURE__ */ f.jsxs(
          "div",
          {
            ref: p,
            className: J,
            style: F,
            onClick: (K) => K.stopPropagation(),
            children: [
              g && /* @__PURE__ */ f.jsx("button", { ref: v, className: "sona-modal-close", onClick: j, title: "Close", children: /* @__PURE__ */ f.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ f.jsx("path", { d: "M1 1L13 13M13 1L1 13", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) }) }),
              /* @__PURE__ */ f.jsx("div", { className: "sona-modal-body", children: c })
            ]
          }
        )
      }
    ),
    // 挂到 body，避免 #sona-root 的低层级 stacking context 被客户端透明层盖住，
    // 出现弹窗可见但关闭按钮无法接收点击的情况。
    document.body
  );
}
function py() {
  return /* @__PURE__ */ f.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ f.jsx("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) });
}
function tE() {
  return /* @__PURE__ */ f.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ f.jsx("polyline", { points: "16 18 22 12 16 6" }),
    /* @__PURE__ */ f.jsx("polyline", { points: "8 6 2 12 8 18" })
  ] });
}
function nE() {
  return /* @__PURE__ */ f.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ f.jsx("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
    /* @__PURE__ */ f.jsx("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
    /* @__PURE__ */ f.jsx("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
  ] });
}
function aE() {
  return /* @__PURE__ */ f.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ f.jsx("path", { d: "M9 18V5l12-2v13" }),
    /* @__PURE__ */ f.jsx("circle", { cx: "6", cy: "18", r: "3" }),
    /* @__PURE__ */ f.jsx("circle", { cx: "18", cy: "16", r: "3" })
  ] });
}
function lE() {
  return /* @__PURE__ */ f.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ f.jsx("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
    /* @__PURE__ */ f.jsx("polyline", { points: "9 22 9 12 15 12 15 22" })
  ] });
}
function iE() {
  return /* @__PURE__ */ f.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ f.jsx("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ f.jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })
  ] });
}
function sE() {
  return /* @__PURE__ */ f.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ f.jsx("line", { x1: "6", y1: "12", x2: "10", y2: "12" }),
    /* @__PURE__ */ f.jsx("line", { x1: "8", y1: "10", x2: "8", y2: "14" }),
    /* @__PURE__ */ f.jsx("line", { x1: "15", y1: "13", x2: "15.01", y2: "13" }),
    /* @__PURE__ */ f.jsx("line", { x1: "18", y1: "11", x2: "18.01", y2: "11" }),
    /* @__PURE__ */ f.jsx("path", { d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" })
  ] });
}
function uE() {
  return /* @__PURE__ */ f.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ f.jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ f.jsx("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
    /* @__PURE__ */ f.jsx("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
  ] });
}
function cE() {
  return /* @__PURE__ */ f.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ f.jsx("polyline", { points: "15 18 9 12 15 6" }) });
}
function oE() {
  return /* @__PURE__ */ f.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ f.jsx("polyline", { points: "9 18 15 12 9 6" }) });
}
function rE() {
  return /* @__PURE__ */ f.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ f.jsx("path", { d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.338c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" }) });
}
function fE({ items: l, activeId: i, onSelect: c, collapsed: o, onToggle: r }) {
  return /* @__PURE__ */ f.jsxs("div", { className: `sona-sidebar${o ? " sona-sidebar--collapsed" : ""}`, children: [
    /* @__PURE__ */ f.jsxs("div", { className: "sona-sidebar-logo", children: [
      /* @__PURE__ */ f.jsx("span", { className: "sona-sidebar-logo-icon", children: /* @__PURE__ */ f.jsx(aE, {}) }),
      !o && /* @__PURE__ */ f.jsxs("span", { className: "sona-sidebar-logo-title", children: [
        /* @__PURE__ */ f.jsx("span", { className: "sona-sidebar-logo-text", children: "Sona" }),
        /* @__PURE__ */ f.jsxs("span", { className: "sona-sidebar-logo-version", children: [
          "v",
          "1.11.0"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("nav", { className: "sona-sidebar-nav", children: l.map((m) => /* @__PURE__ */ f.jsxs(
      "button",
      {
        className: `sona-sidebar-item${i === m.id ? " sona-sidebar-item--active" : ""}`,
        onClick: () => c(m.id),
        title: o ? m.label : void 0,
        children: [
          /* @__PURE__ */ f.jsx("span", { className: "sona-sidebar-item-icon", children: m.icon }),
          !o && /* @__PURE__ */ f.jsx("span", { className: "sona-sidebar-item-label", children: m.label })
        ]
      },
      m.id
    )) }),
    /* @__PURE__ */ f.jsx("div", { className: "sona-sidebar-footer", children: /* @__PURE__ */ f.jsx("button", { className: "sona-sidebar-toggle", onClick: r, title: o ? "展开侧边栏" : "收起侧边栏", children: o ? /* @__PURE__ */ f.jsx(oE, {}) : /* @__PURE__ */ f.jsx(cE, {}) }) })
  ] });
}
const gy = "data:image/png;base64,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";
function E0() {
  return /* @__PURE__ */ f.jsxs("div", { className: "sona-home", children: [
    /* @__PURE__ */ f.jsx("h1", { className: "sona-home-brand", children: /* @__PURE__ */ f.jsx("span", { className: "sona-home-brand-text", children: "SONA" }) }),
    /* @__PURE__ */ f.jsx("div", { className: "sona-home-avatar-wrap", children: /* @__PURE__ */ f.jsx(
      "img",
      {
        className: "sona-home-avatar",
        src: gy,
        alt: "Sona",
        draggable: !1
      }
    ) }),
    /* @__PURE__ */ f.jsxs("div", { className: "sona-home-welcome", children: [
      /* @__PURE__ */ f.jsx("h2", { className: "sona-home-heading", children: "欢迎使用 Sona" }),
      /* @__PURE__ */ f.jsx("p", { className: "sona-home-subtitle", children: "你的英雄联盟客户端增强工具" })
    ] }),
    /* @__PURE__ */ f.jsxs("p", { className: "sona-home-quote", children: [
      '"本项目完全开源免费，如果你通过收费渠道使用，那你被骗啦!"',
      /* @__PURE__ */ f.jsx("br", {}),
      " ",
      "—— 神奇的WJZ_P"
    ] })
  ] });
}
function $t({ title: l, description: i, children: c, layout: o = "row" }) {
  return /* @__PURE__ */ f.jsxs("div", { className: `sona-setting-card${o === "stacked" ? " sona-setting-card--stacked" : ""}`, children: [
    /* @__PURE__ */ f.jsxs("div", { className: "sona-setting-card-info", children: [
      /* @__PURE__ */ f.jsx("h4", { className: "sona-setting-card-title", children: l }),
      i && /* @__PURE__ */ f.jsx("p", { className: "sona-setting-card-desc", children: i })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: "sona-setting-card-action", children: c })
  ] });
}
function _f({ title: l, children: i }) {
  return /* @__PURE__ */ f.jsxs("div", { className: "sona-setting-group", children: [
    /* @__PURE__ */ f.jsx("h3", { className: "sona-setting-group-title", children: l }),
    /* @__PURE__ */ f.jsx("div", { className: "sona-setting-group-list", children: i })
  ] });
}
function Ss({ children: l, variant: i = "primary", onClick: c, disabled: o = !1, style: r }) {
  return /* @__PURE__ */ f.jsxs(
    "button",
    {
      className: `sona-btn sona-btn--${i}${o ? " sona-btn--disabled" : ""}`,
      onClick: c,
      disabled: o,
      style: r,
      type: "button",
      children: [
        /* @__PURE__ */ f.jsx("span", { className: "sona-btn-shine" }),
        l
      ]
    }
  );
}
function dE({ value: l, onChange: i, placeholder: c, icon: o, type: r = "text", onKeyDown: m }) {
  const [g, p] = k.useState(!1);
  return /* @__PURE__ */ f.jsxs("div", { className: `sona-input${g ? " sona-input--focused" : ""}`, children: [
    o && /* @__PURE__ */ f.jsx("span", { className: "sona-input-icon", children: o }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        type: r,
        value: l,
        onChange: (y) => i(y.target.value),
        onKeyDown: m,
        placeholder: c,
        onFocus: () => p(!0),
        onBlur: () => p(!1),
        className: "sona-input-field"
      }
    )
  ] });
}
function Un({ checked: l, onChange: i, disabled: c = !1 }) {
  return /* @__PURE__ */ f.jsx(
    "button",
    {
      className: `sona-switch${l ? " sona-switch--on" : ""}${c ? " sona-switch--disabled" : ""}`,
      onClick: () => !c && i(!l),
      type: "button",
      role: "switch",
      "aria-checked": l,
      children: /* @__PURE__ */ f.jsx("span", { className: "sona-switch-thumb" })
    }
  );
}
function Ga({ options: l, value: i, onChange: c, placeholder: o = "请选择..." }) {
  const [r, m] = k.useState(!1), g = k.useRef(null), p = l.find((y) => y.value === i);
  return k.useEffect(() => {
    function y(v) {
      g.current && !g.current.contains(v.target) && m(!1);
    }
    return document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, []), /* @__PURE__ */ f.jsxs("div", { className: "sona-select", ref: g, children: [
    /* @__PURE__ */ f.jsxs(
      "button",
      {
        className: `sona-select-trigger${r ? " sona-select-trigger--open" : ""}`,
        onClick: () => m(!r),
        type: "button",
        children: [
          /* @__PURE__ */ f.jsxs("span", { className: "sona-select-value", children: [
            (p == null ? void 0 : p.icon) && /* @__PURE__ */ f.jsx("img", { className: "sona-select-icon", src: p.icon, alt: "" }),
            p ? p.label : o
          ] }),
          /* @__PURE__ */ f.jsx("svg", { className: `sona-select-arrow${r ? " sona-select-arrow--open" : ""}`, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ f.jsx("polyline", { points: "6 9 12 15 18 9" }) })
        ]
      }
    ),
    r && /* @__PURE__ */ f.jsx("div", { className: "sona-select-dropdown", children: l.map((y) => /* @__PURE__ */ f.jsxs(
      "button",
      {
        className: `sona-select-option${i === y.value ? " sona-select-option--active" : ""}`,
        onClick: () => {
          c(y.value), m(!1);
        },
        type: "button",
        children: [
          /* @__PURE__ */ f.jsxs("span", { className: "sona-select-option-label", children: [
            y.icon && /* @__PURE__ */ f.jsx("img", { className: "sona-select-icon", src: y.icon, alt: "" }),
            y.label
          ] }),
          i === y.value && /* @__PURE__ */ f.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ f.jsx("polyline", { points: "20 6 9 17 4 12" }) })
        ]
      },
      y.value
    )) })
  ] });
}
function Qe(l) {
  var i;
  return ((i = l.gameMode) == null ? void 0 : i.toUpperCase()) === "CLASSIC" && l.mapId === 11;
}
function co(l) {
  var i, c, o, r, m, g;
  return Qe({
    gameMode: ((c = (i = l.gameData) == null ? void 0 : i.queue) == null ? void 0 : c.gameMode) || ((o = l.map) == null ? void 0 : o.gameMode),
    mapId: ((r = l.map) == null ? void 0 : r.id) ?? ((g = (m = l.gameData) == null ? void 0 : m.queue) == null ? void 0 : g.mapId)
  });
}
const mE = {
  CHALLENGER: "最强王者",
  GRANDMASTER: "傲世宗师",
  MASTER: "超凡大师",
  DIAMOND: "璀璨钻石",
  EMERALD: "流光翡翠",
  PLATINUM: "华贵铂金",
  GOLD: "荣耀黄金",
  SILVER: "不屈白银",
  BRONZE: "英勇青铜",
  IRON: "坚韧黑铁",
  UNRANKED: "未定级"
};
function Dd(l) {
  return mE[l] ?? "未定级";
}
const $f = {
  // ===== 国服 (Tencent) =====
  TENCENT_HN1: { matchHistory: "https://hn1-k8s-sgp.lol.qq.com:21019", common: "https://hn1-k8s-sgp.lol.qq.com:21019" },
  TENCENT_HN10: { matchHistory: "https://hn10-k8s-sgp.lol.qq.com:21019", common: "https://hn10-k8s-sgp.lol.qq.com:21019" },
  TENCENT_TJ100: { matchHistory: "https://tj100-sgp.lol.qq.com:21019", common: "https://tj100-sgp.lol.qq.com:21019" },
  TENCENT_TJ101: { matchHistory: "https://tj101-sgp.lol.qq.com:21019", common: "https://tj101-sgp.lol.qq.com:21019" },
  TENCENT_NJ100: { matchHistory: "https://nj100-sgp.lol.qq.com:21019", common: "https://nj100-sgp.lol.qq.com:21019" },
  TENCENT_GZ100: { matchHistory: "https://gz100-sgp.lol.qq.com:21019", common: "https://gz100-sgp.lol.qq.com:21019" },
  TENCENT_CQ100: { matchHistory: "https://cq100-sgp.lol.qq.com:21019", common: "https://cq100-sgp.lol.qq.com:21019" },
  TENCENT_BGP2: { matchHistory: "https://bgp2-k8s-sgp.lol.qq.com:21019", common: "https://bgp2-k8s-sgp.lol.qq.com:21019" },
  TENCENT_PBE: { matchHistory: "https://pbe-sgp.lol.qq.com:21019", common: "https://pbe-sgp.lol.qq.com:21019" },
  TENCENT_PREPBE: { matchHistory: "https://prepbe-sgp.lol.qq.com:21019", common: "https://prepbe-sgp.lol.qq.com:21019" }
}, kf = [
  "TENCENT_HN1",
  "TENCENT_HN10",
  "TENCENT_NJ100",
  "TENCENT_GZ100",
  "TENCENT_CQ100",
  "TENCENT_TJ100",
  "TENCENT_TJ101",
  "TENCENT_BGP2",
  "TENCENT_PBE",
  "TENCENT_PREPBE"
];
function oo(l) {
  return l > 0 ? `q_${l}` : "";
}
var On = /* @__PURE__ */ ((l) => (l.GAMEFLOW_PHASE = "/lol-gameflow/v1/session", l.CHAMP_SELECT = "/lol-champ-select/v1/session", l.GAMEFLOW_PHASE_CHANGE = "/lol-gameflow/v1/gameflow-phase", l.LOBBY = "/lol-lobby/v2/lobby", l))(On || {});
async function Zs(l, i = {}) {
  const c = l.startsWith("/") ? l : `/${l}`, o = await fetch(c, {
    ...i,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...i.headers
    }
  });
  if (!o.ok)
    throw new Error(`[LCU] 请求失败: ${i.method ?? "GET"} ${c} → ${o.status} ${o.statusText}`);
  const r = await o.text();
  return r ? JSON.parse(r) : void 0;
}
function He(l, i) {
  return Zs(l, { method: "GET", signal: i });
}
function b0(l, i, c) {
  return Zs(l, {
    method: "POST",
    body: i != null ? JSON.stringify(i) : void 0,
    signal: c
  });
}
function T0(l, i, c) {
  return Zs(l, {
    method: "PUT",
    body: i != null ? JSON.stringify(i) : void 0,
    signal: c
  });
}
function hE(l, i) {
  return Zs(l, { method: "DELETE", signal: i });
}
function pE(l, i, c) {
  return Zs(l, {
    method: "PATCH",
    body: i != null ? JSON.stringify(i) : void 0,
    signal: c
  });
}
function A0(l) {
  const i = l.toUpperCase(), c = i.startsWith("TENCENT_") ? i : `TENCENT_${i}`;
  return $f[c] ? c : "";
}
class gE {
  constructor() {
    ct(this, "eventListeners", /* @__PURE__ */ new Map());
    /** 当前 socket 上已经实际调用过 observe 的 URI 集合 */
    ct(this, "observedUris", /* @__PURE__ */ new Set());
    ct(this, "penguContext", null);
    // -------------------- SGP Token 缓存 --------------------
    /**
     * Entitlements Token 缓存
     *
     * 通过 WS 事件 `/entitlements/v1/token` 自动保活：
     * LCU 会在 token 即将过期时主动推送新 token，无需自己算过期时间。
     * 初始值通过主动拉取填充，后续由 WS 事件驱动更新。
     */
    ct(this, "_entitlementsToken", null);
  }
  // -------------------- 初始化 --------------------
  /**
   * 绑定 PenguContext，用于 WebSocket 事件监听
   * 应在 init(context) 生命周期中调用
   */
  bindContext(i) {
    this.penguContext = i;
    const c = Array.from(this.eventListeners.keys());
    this.observedUris.clear(), console.log("[LCUManager] bindContext() → replay %d observed uri(s)", c.length), c.forEach((o) => this.observeUriOnSocket(o)), this._initSgpTokenKeepAlive();
  }
  /** 仅维护战绩和国服跨区查询实际使用的 Entitlements Token。 */
  _initSgpTokenKeepAlive() {
    this.getEntitlementsToken().then((i) => {
      this._entitlementsToken = i;
    }).catch((i) => {
      console.warn("[LCUManager] 初始拉取 Entitlements Token 失败:", i);
    }), this.observe("/entitlements/v1/token", (i) => {
      this._entitlementsToken = i.data;
    });
  }
  // ==================== 召唤师 ====================
  /** 获取当前登录的召唤师信息 */
  getSummonerInfo() {
    return He("/lol-summoner/v1/current-summoner");
  }
  /** 通过 puuid 获取召唤师信息 */
  getSummonerByPuuid(i) {
    return He(`/lol-summoner/v2/summoners/puuid/${i}`);
  }
  /** 通过 gameName + tagLine (Riot ID) 获取召唤师信息 */
  getSummonerByRiotId(i, c) {
    return He(`/lol-summoner/v1/alias/lookup?gameName=${encodeURIComponent(i)}&tagLine=${encodeURIComponent(c)}`);
  }
  /**
   * 按 Riot ID 解析召唤师 puuid（支持国服跨大区）
   *
   * 解析顺序：
   * 1. 先用 LCU `alias/lookup` 查本区，命中即返回
   * 2. 本区查不到时，借助"所有腾讯大区共享同一 JWT"特性，并发查询
   *    所有互通大区的 SGP `summoner-ledge` 按名接口，再用返回的 tagLine 精确匹配
   *
   * 拿到 puuid 后即可走 `getSgpMatchHistory`（国服互通，可跨区出战绩）。
   *
   * @returns 命中的 puuid；查不到返回空字符串
   */
  async resolveSummonerPuuidByRiotId(i, c) {
    const o = i.trim(), r = c.trim();
    if (!o || !r) return "";
    const m = await this.getSummonerByRiotId(o, r).catch((N) => (console.warn("[CrossRegion] 本区 alias/lookup 失败:", N), null));
    if (console.log("[CrossRegion] 本区 alias/lookup 结果:", m != null && m.puuid ? `puuid=${m.puuid}` : "无"), m != null && m.puuid) return m.puuid;
    const g = (await this.getSgpServerId().catch(() => "")).toUpperCase();
    if (console.log("[CrossRegion] 当前 SGP 服务器:", g || "(未解析到)"), !g.startsWith("TENCENT_"))
      return console.log("[CrossRegion] 未识别到国服大区，跳过跨大区搜集"), "";
    const p = this._entitlementsToken ?? await this.getEntitlementsToken().catch((N) => (console.warn("[CrossRegion] 获取 Entitlements Token 失败:", N), null));
    if (!(p != null && p.accessToken))
      return console.warn("[CrossRegion] 无可用 accessToken，无法跨大区查询"), "";
    this._entitlementsToken = p;
    const y = r.toLowerCase(), v = o.toLowerCase();
    console.log("[CrossRegion] 开始跨大区搜集 → 目标 %s#%s，大区数 %d", o, r, kf.length);
    const S = await Promise.allSettled(
      kf.map(
        (N) => this._getSgpSummonerByName(N, o, p.accessToken)
      )
    );
    let b = "";
    return S.forEach((N, X) => {
      const I = kf[X];
      if (N.status !== "fulfilled") {
        console.warn("[CrossRegion] [%s] 查询异常:", I, N.reason);
        return;
      }
      if (!N.value) {
        console.log("[CrossRegion] [%s] 无返回 / 非 200", I);
        return;
      }
      const w = (N.value.tagLine ?? "").trim().toLowerCase(), j = (N.value.gameName ?? N.value.name ?? "").trim().toLowerCase();
      console.log("[CrossRegion] [%s] 命中召唤师: name=%s tag=%s puuid=%s", I, j || "(空)", w || "(空)", N.value.puuid || "(空)"), !b && N.value.puuid && (w && w === y || !w && j === v) && (b = N.value.puuid, console.log("[CrossRegion] ✓ 匹配成功 → 大区 %s，puuid=%s", I, b));
    }), b || console.log("[CrossRegion] ✗ 全大区均未匹配到 %s#%s", o, r), b;
  }
  /** 调用指定腾讯大区的 SGP `summoner-ledge` 按召唤师名查询 */
  async _getSgpSummonerByName(i, c, o) {
    const r = $f[i], m = (r == null ? void 0 : r.common) ?? (r == null ? void 0 : r.matchHistory);
    if (!m) return null;
    const g = i.replace(/^TENCENT_/, ""), p = `${m}/summoner-ledge/v1/regions/${g}/summoners/name/${encodeURIComponent(c)}`, y = await fetch(p, {
      headers: {
        Authorization: `Bearer ${o}`,
        "User-Agent": "LeagueOfLegendsClient/14.13.596.7996 (rcp-be-lol-summoner)"
      }
    }), v = await y.text().catch(() => "");
    if (console.log("[CrossRegion] [%s] %s → %d %s | body: %s", i, p, y.status, y.statusText, v.slice(0, 800) || "(空)"), !y.ok || !v) return null;
    try {
      return JSON.parse(v);
    } catch (S) {
      return console.warn("[CrossRegion] [%s] JSON 解析失败:", i, S), null;
    }
  }
  /** 获取指定召唤师的客户端装备集 wrapper */
  getItemSets(i, c) {
    return He(`/lol-item-sets/v1/item-sets/${i}/sets`, c);
  }
  /** 覆盖写入指定召唤师的客户端装备集 wrapper */
  putItemSets(i, c, o) {
    return T0(`/lol-item-sets/v1/item-sets/${i}/sets`, c, o);
  }
  /** 通过 puuid 获取排位数据 */
  getRankedStats(i) {
    return He(`/lol-ranked/v1/ranked-stats/${i}`);
  }
  // ==================== 房间/大厅 ====================
  /** 获取当前房间信息 */
  getLobby() {
    return He("/lol-lobby/v2/lobby");
  }
  // ==================== 游戏流程 ====================
  /** 获取当前游戏流程阶段 */
  getGameflowPhase() {
    return He("/lol-gameflow/v1/gameflow-phase");
  }
  /** 获取游戏流程会话详情 */
  getGameflowSession() {
    return He("/lol-gameflow/v1/session");
  }
  // ==================== 英雄选择 ====================
  /** 获取英雄选择会话 */
  getChampSelectSession() {
    return He("/lol-champ-select/v1/session");
  }
  /**
   * 应用推荐的召唤师技能
   * @param selection 选择参数
   */
  updateMySelection(i, c) {
    return pE("/lol-champ-select/v1/session/my-selection", i, c);
  }
  // ==================== 队列信息 ====================
  /** 获取所有可用队列（含中文名、游戏模式、地图等） */
  getQueues() {
    return He("/lol-game-queues/v1/queues");
  }
  // ==================== 战绩 ====================
  /**
   * 获取战绩列表
   * @param puuid 不传则查当前玩家，传入则查指定玩家
   * @param begIndex 起始索引，默认 0
   * @param endIndex 结束索引，默认 19（共 20 条）
   */
  getMatchHistory(i, c = 0, o = 19) {
    const r = i ? `/lol-match-history/v1/products/lol/${i}/matches` : "/lol-match-history/v1/products/lol/current-summoner/matches";
    return He(`${r}?begIndex=${c}&endIndex=${o}`);
  }
  /**
   * 获取单局对局详情
   * @param gameId 对局 ID
   */
  getMatchDetail(i) {
    return He(`/lol-match-history/v1/games/${i}`);
  }
  // ==================== SGP Token ====================
  /**
   * 获取 Entitlements Token（SGP 战绩查询所需）
   *
   * 返回值说明：
   * - `accessToken`: JWT，用于 `Authorization: Bearer {accessToken}` 请求 SGP 战绩/对局详情接口
   * - `token`: Entitlements JWT（格式不同，部分 SGP 接口可能需要）
   * - `issuer`: 签发者 URL，如 `http://hn1-k8s-bcs-internal.lol.qq.com:28088`
   *   可从中解析当前区服（hn1 = 艾欧尼亚、hn10 = 黑色玫瑰 等）
   * - `subject`: 玩家 PUUID
   * - `entitlements`: 权限列表（通常为空数组）
   *
   * Akari 通过 WS 事件 `/entitlements/v1/token` 自动刷新，我们这里按需拉取。
   */
  getEntitlementsToken() {
    return He("/entitlements/v1/token");
  }
  /** 优先读取客户端 platformId，失败时从国服 Token issuer 解析大区。 */
  async getSgpServerId() {
    const i = await this._parseSgpServerIdFromPlatformId();
    if (i) return i;
    const c = this._parseSgpServerIdFromIssuer();
    return c || "";
  }
  /** 从 issuer URL 解析 SGP 服务器 ID */
  _parseSgpServerIdFromIssuer() {
    const i = this._entitlementsToken;
    if (!i) return "";
    const o = (i.issuer ?? "").match(/https?:\/\/([a-z0-9]+)(?:-[a-z0-9]+)*\.lol\.qq\.com/);
    if (o) {
      const r = o[1].toUpperCase();
      return A0(`TENCENT_${r}`);
    }
    return "";
  }
  /** 从 /lol-chat/v1/me 的 platformId 解析国服 SGP 大区 */
  async _parseSgpServerIdFromPlatformId() {
    var i;
    try {
      const o = ((i = (await He("/lol-chat/v1/me")).platformId) == null ? void 0 : i.toUpperCase()) ?? "";
      return o ? A0(o) : "";
    } catch {
      return "";
    }
  }
  /**
   * 通过 SGP 查询战绩列表
   *
   * 相比 LCU 接口的优势：
   * - 支持 `tag` 参数按队列模式过滤（如 `q_420` 只查单双排）
   * - 无浏览器缓存问题
   * - 国服跨区查询
   * - 突破 LCU 100 场上限
   *
   * @param puuid 玩家 PUUID
   * @param options 查询参数
   * @param options.startIndex 起始索引（默认 0，注意：SGP 用 startIndex 而非 LCU 的 begIndex）
   * @param options.count 获取数量（默认 100，注意：SGP 用 count 而非 LCU 的 endIndex）
   * @param options.tag 按队列模式过滤，如 `q_420`（单双排），不传则获取原始战绩，由调用方过滤峡谷对局。使用 `queueIdToTag()` 生成。
   */
  async getSgpMatchHistory(i, c) {
    var r;
    const o = {
      platformId: "",
      sgpServerId: "",
      matchHistoryBaseUrl: "",
      requestUrl: "",
      issuer: ((r = this._entitlementsToken) == null ? void 0 : r.issuer) ?? ""
    };
    try {
      const m = await He("/lol-chat/v1/me").catch(() => null);
      o.platformId = (m == null ? void 0 : m.platformId) ?? "";
      const g = this._entitlementsToken ?? await this.getEntitlementsToken();
      this._entitlementsToken || (this._entitlementsToken = g), o.issuer = g.issuer ?? o.issuer;
      const p = await this.getSgpServerId();
      o.sgpServerId = p;
      const y = $f[p.toUpperCase()];
      if (o.matchHistoryBaseUrl = (y == null ? void 0 : y.matchHistory) ?? "", !(y != null && y.matchHistory))
        throw new Error(`[SGP] 找不到服务器配置: ${p}`);
      const v = new URLSearchParams();
      v.set("startIndex", String((c == null ? void 0 : c.startIndex) ?? 0)), v.set("count", String((c == null ? void 0 : c.count) ?? 100)), c != null && c.tag && v.set("tag", c.tag);
      const S = `${y.matchHistory}/match-history-query/v1/products/lol/player/${i}/SUMMARY?${v}`;
      o.requestUrl = S;
      const b = await fetch(S, {
        headers: {
          Authorization: `Bearer ${g.accessToken}`,
          "User-Agent": "LeagueOfLegendsClient/14.13.596.7996 (rcp-be-lol-match-history)"
        }
      });
      if (!b.ok) {
        const N = await b.text().catch(() => "");
        throw new Error(`[SGP] 请求失败: ${b.status} ${b.statusText} ${N.slice(0, 1e3)}`);
      }
      return b.json();
    } catch (m) {
      return console.error("[SGP] 战绩查询失败，回退到客户端原生战绩接口", {
        platformId: o.platformId || "unknown",
        sgpServerId: o.sgpServerId || "unknown",
        matchHistoryBaseUrl: o.matchHistoryBaseUrl || "unknown",
        issuer: o.issuer || "unknown",
        puuid: i,
        startIndex: (c == null ? void 0 : c.startIndex) ?? 0,
        count: (c == null ? void 0 : c.count) ?? 100,
        tag: (c == null ? void 0 : c.tag) ?? "",
        requestUrl: o.requestUrl || "not-built",
        errorName: m instanceof Error ? m.name : typeof m,
        errorMessage: m instanceof Error ? m.message : String(m),
        error: m
      }), this.getNativeMatchHistoryAsSgp(i, c);
    }
  }
  async getNativeMatchHistoryAsSgp(i, c) {
    var b;
    const o = Math.max(0, (c == null ? void 0 : c.startIndex) ?? 0), r = Math.max(1, (c == null ? void 0 : c.count) ?? 100), m = this.parseQueueIdFromSgpTag(c == null ? void 0 : c.tag), g = m ? 0 : o, p = m ? 99 : o + r - 1, v = ((b = (await this.getMatchHistory(i, g, p)).games) == null ? void 0 : b.games) ?? [];
    return {
      games: (m ? v.filter((N) => N.queueId === m).slice(o, o + r) : v).map((N) => this.mapNativeMatchGameToSgpGame(N))
    };
  }
  parseQueueIdFromSgpTag(i) {
    const c = i == null ? void 0 : i.match(/^q_(\d+)$/);
    if (!c) return null;
    const o = Number.parseInt(c[1], 10);
    return Number.isFinite(o) && o > 0 ? o : null;
  }
  mapNativeMatchGameToSgpGame(i) {
    const c = /* @__PURE__ */ new Map();
    i.participantIdentities.forEach((r) => {
      c.set(r.participantId, r);
    });
    const o = i.participants.map((r) => this.mapNativeParticipantToSgpParticipant(r, c.get(r.participantId), i.gameDuration));
    return {
      metadata: {
        product: "lol",
        tags: [`q_${i.queueId}`],
        participants: o.map((r) => r.puuid).filter(Boolean),
        timestamp: new Date(i.gameCreation).toISOString(),
        data_version: "",
        info_type: "SUMMARY",
        match_id: `${i.platformId}_${i.gameId}`,
        private: !1
      },
      json: {
        endOfGameResult: i.endOfGameResult,
        gameCreation: i.gameCreation,
        gameDuration: i.gameDuration,
        gameEndTimestamp: i.gameCreation + i.gameDuration * 1e3,
        gameId: i.gameId,
        gameMode: i.gameMode,
        gameName: "",
        gameStartTimestamp: i.gameCreation,
        gameType: i.gameType,
        gameVersion: i.gameVersion,
        mapId: i.mapId,
        participants: o,
        platformId: i.platformId,
        queueId: i.queueId,
        seasonId: i.seasonId,
        teams: i.teams.map((r) => this.mapNativeTeamToSgpTeam(r)),
        tournamentCode: ""
      }
    };
  }
  mapNativeTeamToSgpTeam(i) {
    return {
      bans: [],
      objectives: {
        baron: { first: i.firstBaron, kills: i.baronKills },
        champion: { first: i.firstBlood, kills: 0 },
        dragon: { first: i.firstDargon, kills: i.dragonKills },
        horde: { first: !1, kills: i.hordeKills },
        inhibitor: { first: i.firstInhibitor, kills: i.inhibitorKills },
        riftHerald: { first: !1, kills: i.riftHeraldKills },
        tower: { first: i.firstTower, kills: i.towerKills }
      },
      teamId: i.teamId,
      win: i.win === "Win"
    };
  }
  mapNativeParticipantToSgpParticipant(i, c, o) {
    var v, S, b, N;
    const r = i.stats, m = c == null ? void 0 : c.player, g = o || 0, p = {
      statPerks: {
        defense: 0,
        flex: 0,
        offense: 0
      },
      styles: [
        {
          description: "primaryStyle",
          style: r.perkPrimaryStyle || 0,
          selections: [
            { perk: r.perk0 || 0, var1: r.perk0Var1 || 0, var2: r.perk0Var2 || 0, var3: r.perk0Var3 || 0 },
            { perk: r.perk1 || 0, var1: r.perk1Var1 || 0, var2: r.perk1Var2 || 0, var3: r.perk1Var3 || 0 },
            { perk: r.perk2 || 0, var1: r.perk2Var1 || 0, var2: r.perk2Var2 || 0, var3: r.perk2Var3 || 0 },
            { perk: r.perk3 || 0, var1: r.perk3Var1 || 0, var2: r.perk3Var2 || 0, var3: r.perk3Var3 || 0 }
          ]
        },
        {
          description: "subStyle",
          style: r.perkSubStyle || 0,
          selections: [
            { perk: r.perk4 || 0, var1: r.perk4Var1 || 0, var2: r.perk4Var2 || 0, var3: r.perk4Var3 || 0 },
            { perk: r.perk5 || 0, var1: r.perk5Var1 || 0, var2: r.perk5Var2 || 0, var3: r.perk5Var3 || 0 }
          ]
        }
      ]
    }, y = {
      damagePerMinute: g > 0 ? r.totalDamageDealtToChampions / g * 60 : 0,
      goldPerMinute: g > 0 ? r.goldEarned / g * 60 : 0,
      kda: r.deaths > 0 ? (r.kills + r.assists) / r.deaths : r.kills + r.assists,
      visionScorePerMinute: g > 0 ? r.visionScore / g * 60 : 0
    };
    return {
      PlayerBehavior: { PlayerBehavior_IsHeroInCombat: 0 },
      PlayerScore0: r.playerScore0 || 0,
      PlayerScore1: r.playerScore1 || 0,
      PlayerScore2: r.playerScore2 || 0,
      PlayerScore3: r.playerScore3 || 0,
      PlayerScore4: r.playerScore4 || 0,
      PlayerScore5: r.playerScore5 || 0,
      PlayerScore6: r.playerScore6 || 0,
      PlayerScore7: r.playerScore7 || 0,
      PlayerScore8: r.playerScore8 || 0,
      PlayerScore9: r.playerScore9 || 0,
      PlayerScore10: 0,
      PlayerScore11: 0,
      assists: r.assists,
      challenges: y,
      champExperience: 0,
      champLevel: r.champLevel,
      championId: i.championId,
      championName: "",
      championTransform: 0,
      damageDealtToBuildings: r.damageDealtToTurrets,
      damageDealtToEpicMonsters: 0,
      damageDealtToObjectives: r.damageDealtToObjectives,
      damageDealtToTurrets: r.damageDealtToTurrets,
      damageSelfMitigated: r.damageSelfMitigated,
      deaths: r.deaths,
      detectorWardsPlaced: r.visionWardsBoughtInGame,
      doubleKills: r.doubleKills,
      dragonKills: 0,
      eligibleForProgression: !0,
      firstBloodAssist: r.firstBloodAssist,
      firstBloodKill: r.firstBloodKill,
      firstTowerAssist: r.firstTowerAssist,
      firstTowerKill: r.firstTowerKill,
      gameEndedInEarlySurrender: r.gameEndedInEarlySurrender,
      gameEndedInSurrender: r.gameEndedInSurrender,
      goldEarned: r.goldEarned,
      goldSpent: r.goldSpent,
      individualPosition: ((v = i.timeline) == null ? void 0 : v.lane) || "",
      inhibitorKills: r.inhibitorKills,
      item0: r.item0,
      item1: r.item1,
      item2: r.item2,
      item3: r.item3,
      item4: r.item4,
      item5: r.item5,
      item6: r.item6,
      killingSprees: r.killingSprees,
      kills: r.kills,
      lane: ((S = i.timeline) == null ? void 0 : S.lane) || "",
      largestCriticalStrike: r.largestCriticalStrike,
      largestKillingSpree: r.largestKillingSpree,
      largestMultiKill: r.largestMultiKill,
      longestTimeSpentLiving: r.longestTimeSpentLiving,
      magicDamageDealt: r.magicDamageDealt,
      magicDamageDealtToChampions: r.magicDamageDealtToChampions,
      magicDamageTaken: r.magicalDamageTaken,
      missions: {},
      neutralMinionsKilled: r.neutralMinionsKilled,
      participantId: i.participantId,
      pentaKills: r.pentaKills,
      perks: p,
      physicalDamageDealt: r.physicalDamageDealt,
      physicalDamageDealtToChampions: r.physicalDamageDealtToChampions,
      physicalDamageTaken: r.physicalDamageTaken,
      profileIcon: (m == null ? void 0 : m.profileIcon) ?? 0,
      puuid: (m == null ? void 0 : m.puuid) ?? "",
      quadraKills: r.quadraKills,
      riotIdGameName: (m == null ? void 0 : m.gameName) ?? (m == null ? void 0 : m.summonerName) ?? "",
      riotIdTagline: (m == null ? void 0 : m.tagLine) ?? "",
      role: ((b = i.timeline) == null ? void 0 : b.role) || "",
      roleBoundItem: r.roleBoundItem,
      sightWardsBoughtInGame: r.sightWardsBoughtInGame,
      spell1Id: i.spell1Id,
      spell2Id: i.spell2Id,
      summonerId: (m == null ? void 0 : m.summonerId) ?? 0,
      summonerLevel: 0,
      summonerName: (m == null ? void 0 : m.summonerName) ?? (m == null ? void 0 : m.gameName) ?? "",
      teamEarlySurrendered: r.teamEarlySurrendered,
      teamId: i.teamId,
      teamPosition: ((N = i.timeline) == null ? void 0 : N.lane) || "",
      timeCCingOthers: r.timeCCingOthers,
      timePlayed: g,
      totalDamageDealt: r.totalDamageDealt,
      totalDamageDealtToChampions: r.totalDamageDealtToChampions,
      totalDamageShieldedOnTeammates: 0,
      totalDamageTaken: r.totalDamageTaken,
      totalHeal: r.totalHeal,
      totalHealsOnTeammates: 0,
      totalMinionsKilled: r.totalMinionsKilled,
      totalTimeCCDealt: r.totalTimeCrowdControlDealt,
      totalTimeSpentDead: 0,
      totalUnitsHealed: r.totalUnitsHealed,
      tripleKills: r.tripleKills,
      trueDamageDealt: r.trueDamageDealt,
      trueDamageDealtToChampions: r.trueDamageDealtToChampions,
      trueDamageTaken: r.trueDamageTaken,
      turretKills: r.turretKills,
      turretTakedowns: r.turretKills,
      turretsLost: 0,
      unrealKills: r.unrealKills,
      visionScore: r.visionScore,
      visionWardsBoughtInGame: r.visionWardsBoughtInGame,
      wardsKilled: r.wardsKilled,
      wardsPlaced: r.wardsPlaced,
      win: r.win,
      allInPings: 0,
      assistMePings: 0,
      baronKills: 0,
      basicPings: 0,
      commandPings: 0,
      consumablesPurchased: 0,
      dangerPings: 0,
      enemyMissingPings: 0,
      enemyVisionPings: 0,
      getBackPings: 0,
      holdPings: 0,
      inhibitorTakedowns: r.inhibitorKills,
      inhibitorsLost: 0,
      itemsPurchased: 0,
      needVisionPings: 0,
      nexusKills: 0,
      nexusLost: 0,
      nexusTakedowns: 0,
      objectivesStolen: 0,
      objectivesStolenAssists: 0,
      onMyWayPings: 0,
      pushPings: 0,
      retreatPings: 0,
      spell1Casts: 0,
      spell2Casts: 0,
      spell3Casts: 0,
      spell4Casts: 0,
      summoner1Casts: 0,
      summoner2Casts: 0,
      totalAllyJungleMinionsKilled: r.neutralMinionsKilledTeamJungle,
      totalEnemyJungleMinionsKilled: r.neutralMinionsKilledEnemyJungle,
      visionClearedPings: 0
    };
  }
  // ==================== 游戏资源 ====================
  /** 获取当前客户端的游戏版本号（如 "14.7.580.1234"） */
  getGameVersion() {
    return He("/lol-patch/v1/game-version");
  }
  /** 获取所有物品数据（含 iconPath / description） */
  getItems() {
    return He("/lol-game-data/assets/v1/items.json");
  }
  /** 获取所有召唤师技能数据（含 iconPath） */
  getSummonerSpells() {
    return He("/lol-game-data/assets/v1/summoner-spells.json");
  }
  /** 获取所有英雄摘要数据（含 squarePortraitPath） */
  getChampionSummary() {
    return He("/lol-game-data/assets/v1/champion-summary.json");
  }
  /** 获取所有符文数据（含 iconPath / description，对应单个符文 ID） */
  getPerks() {
    return He("/lol-game-data/assets/v1/perks.json");
  }
  /** 获取所有符文系样式（对应 perkPrimaryStyle / perkSubStyle） */
  getPerkStyles() {
    return He("/lol-game-data/assets/v1/perkstyles.json");
  }
  /** 获取玩家符文页 */
  getRunePages(i) {
    return He("/lol-perks/v1/pages", i);
  }
  /** 创建符文页 */
  createRunePage(i, c) {
    return b0("/lol-perks/v1/pages", i, c);
  }
  /** 更新指定符文页 */
  updateRunePage(i, c, o) {
    return T0(`/lol-perks/v1/pages/${i}`, c, o);
  }
  /** 删除指定符文页 */
  deleteRunePage(i, c) {
    return hE(`/lol-perks/v1/pages/${i}`, c);
  }
  /** 创建或更新 Sona 管理的符文页，并设为当前使用页 */
  async applyRunePage(i, c) {
    const o = () => {
      if (c != null && c.aborted) throw new DOMException("符文应用已取消", "AbortError");
    };
    o();
    const r = {
      ...i,
      current: !0
    }, m = await this.getRunePages(c);
    o();
    const g = (b) => b.isEditable !== !1, p = (b) => /\s-\s*Sona$/i.test(b.name), y = async (b) => {
      o(), await Promise.allSettled(
        m.filter((N) => N.id !== b && p(N) && N.isDeletable !== !1).map((N) => this.deleteRunePage(N.id, c))
      );
    }, v = m.find((b) => b.name === i.name && b.isEditable !== !1);
    if (v) {
      const b = await this.updateRunePage(v.id, r, c);
      return await y(v.id), b;
    }
    const S = m.find((b) => p(b) && g(b));
    if (S) {
      const b = await this.updateRunePage(S.id, r, c);
      return await y(S.id), b;
    }
    try {
      return await this.createRunePage(r, c);
    } catch (b) {
      o();
      const N = m.find((X) => X.current && X.isEditable !== !1) ?? m.find((X) => X.isEditable !== !1);
      if (N)
        return this.updateRunePage(N.id, r, c);
      throw b;
    }
  }
  // ==================== 通知 ====================
  /**
   * 发送客户端原生通知（右下角弹窗）
   * @param title 通知标题
   * @param details 通知内容
   */
  sendNotification(i, c) {
    return b0("/player-notifications/v1/notifications", {
      detailKey: "pre_translated_details",
      titleKey: "pre_translated_title",
      backgroundUrl: "",
      data: { title: i, details: c },
      iconUrl: "/lol-game-data/assets/v1/profile-icons/3867.jpg",
      // https://heimerdinger.lol/index.php/icon/sona-champie-icon-5s8jq
      source: "sona",
      state: "toast",
      type: "string"
    });
  }
  // ==================== WebSocket 事件 ====================
  observeUriOnSocket(i) {
    if (!this.penguContext) {
      console.warn("[LCUManager] PenguContext 未绑定，无法监听事件。请先调用 lcu.bindContext(context)");
      return;
    }
    if (this.observedUris.has(i)) {
      console.log("[LCUManager] URI 已订阅到底层 socket，跳过重复 observe: %s", i);
      return;
    }
    this.observedUris.add(i), console.log("[LCUManager] 向当前 socket 订阅 URI: %s", i), this.penguContext.socket.observe(i, (c) => {
      console.log("[LCUManager] WS 收到事件 → uri=%s, data=%o", i, c);
      const o = c, r = this.eventListeners.get(i);
      r == null || r.forEach((m) => m(o));
    });
  }
  /**
   * 监听 LCU WebSocket 事件
   *
   * 基于 Pengu Loader 的 context.socket.observe 实现。
   * 支持同一 URI 注册多个回调。
   *
   * @param uri 事件 URI (e.g. '/lol-gameflow/v1/gameflow-phase')
   * @param callback 事件回调
   * @returns 取消监听的函数
   *
   * @example
   * ```ts
   * const unsubscribe = lcu.observe('/lol-gameflow/v1/gameflow-phase', (event) => {
   *   console.log('Phase changed:', event.data)
   * })
   *
   * // 稍后取消监听
   * unsubscribe()
   * ```
   */
  observe(i, c) {
    var r;
    console.log("[LCUManager] observe() called → uri=%s, hasContext=%s", i, String(!!this.penguContext)), console.log("[LCUManager] eventListeners has uri? %s, listeners count: %d", this.eventListeners.has(i), ((r = this.eventListeners.get(i)) == null ? void 0 : r.size) ?? 0);
    let o = this.eventListeners.get(i);
    return o || (o = /* @__PURE__ */ new Set(), this.eventListeners.set(i, o)), o.add(c), this.observeUriOnSocket(i), () => {
      const m = this.eventListeners.get(i);
      m == null || m.delete(c), m && m.size === 0 && this.eventListeners.delete(i);
    };
  }
}
const ne = new gE();
function hc(l) {
  return l.toLowerCase();
}
function yE(l) {
  return typeof l != "string" ? "" : l.replace(/<br\s*\/?>/gi, `
`).replace(/<\/(li|p|div)>/gi, `
`).replace(/<li>/gi, "• ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\n{3,}/g, `

`).trim();
}
function qf(l, i) {
  for (const c of i) {
    const o = yE(l[c]);
    if (o) return o;
  }
  return "";
}
const Mc = /* @__PURE__ */ new Map(), yy = /* @__PURE__ */ new Map(), vy = /* @__PURE__ */ new Map(), wd = /* @__PURE__ */ new Map(), Es = /* @__PURE__ */ new Map(), jd = /* @__PURE__ */ new Map(), Sy = /* @__PURE__ */ new Map(), Bc = /* @__PURE__ */ new Map(), kd = /* @__PURE__ */ new Map(), Ey = /* @__PURE__ */ new Map(), ed = /* @__PURE__ */ new Map(), by = /* @__PURE__ */ new Map(), Fl = /* @__PURE__ */ new Map(), bs = /* @__PURE__ */ new Map();
let Ty = !1, C0 = "";
async function vE() {
  if (!Ty) {
    try {
      C0 = (await ne.getSummonerInfo()).puuid || "", G.info("[Assets] 当前账号 puuid=%s", C0);
    } catch (l) {
      G.warn("[Assets] 获取 puuid 失败:", l);
    }
    await Ay(0);
  }
}
async function Ay(l) {
  const [o, r, m, g, p, y] = await Promise.all([
    ne.getItems().catch((S) => (G.warn("[Assets] getItems 失败:", S), [])),
    ne.getSummonerSpells().catch((S) => (G.warn("[Assets] getSummonerSpells 失败:", S), [])),
    ne.getQueues().catch((S) => (G.warn("[Assets] getQueues 失败:", S), [])),
    ne.getPerks().catch((S) => (G.warn("[Assets] getPerks 失败:", S), [])),
    ne.getPerkStyles().catch((S) => (G.warn("[Assets] getPerkStyles 失败:", S), { styles: [] })),
    ne.getChampionSummary().catch((S) => (G.warn("[Assets] getChampionSummary 失败:", S), []))
  ]);
  for (const S of o)
    if (S.id > 0 && S.iconPath && Mc.set(S.id, hc(S.iconPath)), S.id > 0 && S.name && yy.set(S.id, S.name), S.id > 0) {
      const b = qf(S, [
        "description",
        "shortDescription",
        "longDescription",
        "tooltip",
        "tooltipText"
      ]);
      b && vy.set(S.id, b);
      const N = S.priceTotal ?? S.price ?? 0;
      Number.isFinite(N) && N > 0 && wd.set(S.id, N);
    }
  for (const S of r)
    if (S.id > 0 && S.iconPath && Es.set(S.id, hc(S.iconPath)), S.id > 0 && S.name && jd.set(S.id, S.name), S.id > 0) {
      const b = qf(S, [
        "description",
        "shortDescription",
        "longDescription",
        "tooltip",
        "tooltipText"
      ]);
      b && Sy.set(S.id, b);
    }
  for (const S of m)
    Fl.set(S.id, S);
  for (const S of g)
    if (S.id > 0 && S.iconPath && Bc.set(S.id, hc(S.iconPath)), S.id > 0 && S.name && kd.set(S.id, S.name), S.id > 0) {
      const b = qf(S, [
        "shortDesc",
        "longDesc",
        "description",
        "tooltip",
        "tooltipText"
      ]);
      b && Ey.set(S.id, b);
    }
  for (const S of p.styles)
    S.id > 0 && S.iconPath && ed.set(S.id, hc(S.iconPath)), S.id > 0 && S.name && by.set(S.id, S.name);
  for (const S of y)
    S.id > 0 && bs.set(S.id, {
      id: S.id,
      name: S.description || "",
      title: S.name || "",
      alias: S.alias
    });
  G.info(
    "[Assets] 资源映射初始化 (attempt %d) → 装备 %d, 技能 %d, 符文 %d, 符文系 %d, 队列 %d, 英雄 %d",
    l + 1,
    Mc.size,
    Es.size,
    Bc.size,
    ed.size,
    Fl.size,
    bs.size
  );
  const v = [
    Mc.size === 0 && "items",
    Es.size === 0 && "spells",
    Fl.size === 0 && "queues",
    bs.size === 0 && "champions"
  ].filter(Boolean);
  if (v.length > 0 && l < 3) {
    G.warn("[Assets] 关键资源缺失: %s，%d 秒后重试 (%d/%d)", v.join(","), 2e3 / 1e3, l + 1, 3), setTimeout(() => Ay(l + 1), 2e3);
    return;
  }
  Ty = !0, v.length > 0 ? G.error("[Assets] 重试 %d 次后仍有资源缺失: %s", 3, v.join(",")) : G.info("[Assets] 资源映射初始化完成 ✓");
}
function Gc(l) {
  return `/lol-game-data/assets/v1/champion-icons/${l}.png`;
}
function qd(l) {
  return Mc.get(l) ?? (l > 0 ? `/lol-game-data/assets/v1/item-icons/${l}.png` : "");
}
function SE(l) {
  return wd.get(l) ?? 0;
}
function Cy(l) {
  return {
    name: yy.get(l) ?? String(l),
    iconPath: qd(l),
    description: vy.get(l) ?? "",
    price: wd.get(l) ?? 0
  };
}
function Ds(l) {
  return Es.get(l) ?? "";
}
function EE(l) {
  return jd.get(l) ?? String(l);
}
function bE(l) {
  return {
    name: jd.get(l) ?? String(l),
    iconPath: Es.get(l) ?? "",
    description: Sy.get(l) ?? ""
  };
}
function Wl(l) {
  return Bc.get(l) ?? "";
}
function Lf(l) {
  return kd.get(l) ?? String(l);
}
function Bf(l) {
  return {
    name: kd.get(l) ?? String(l),
    iconPath: Bc.get(l) ?? "",
    description: Ey.get(l) ?? ""
  };
}
function Kc(l) {
  return ed.get(l) ?? "";
}
function TE(l) {
  return by.get(l) ?? String(l);
}
function Wa(l) {
  var i;
  return l <= 0 ? "召唤师峡谷" : ((i = Fl.get(l)) == null ? void 0 : i.name) ?? `队列${l}`;
}
function ro(l) {
  return Fl.get(l);
}
function AE(l) {
  const i = ro(l);
  return !!(i && Qe(i));
}
function CE() {
  return Array.from(bs.values()).filter((l) => l.id > 0);
}
function Ld(l) {
  return bs.get(l);
}
function NE() {
  const l = [];
  return Fl.forEach((i) => {
    i.id <= 0 || i.isCustom || !i.isEnabled || i.queueAvailability !== "Available" || Qe(i) && l.push({ id: i.id, name: i.name || i.shortName || `队列${i.id}` });
  }), l.sort((i, c) => i.name.localeCompare(c.name, "zh")), l;
}
const xE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAC6UlEQVR42u3YXUhTcRjH8a4fCILeMHpDGExXlrmbQlNbaJT5VqZk+LaZpUmgkY2i4Y0QaUG2iAJ7pZVXQSAIQRYJvpVUYBEldaGBEVkIXUQ8/fDh8RyHYxfbmRc6+ICeM/x/OefxnLMtWXwtuBetsNuhBAohfr5jGmEQPsIH6If6+Yrxwitgk38wAI2xjvHB8EzIvnKmrMNGmIR6YxVzAd4AT8tzM/kfib1l5qjX4ItFzFvgaQdqmK51KonKrTJHDYPPqpi0WTHFdUaIu4np2Dnj98KjwVFOK4Lq4SswlZwwFi9vZFqZwLQqkclzRrfL0ZOgUfBEMyQLuuE9jANTSjbT5XtMpSclRhaWnytOMbXdYdq6W7ePwwh0gSvyIImZBJ6xIUWOUnapbjPsr2QqOs60Ljl430/oijTGAYPA5EiXU9Lsnz3EORXGogXV5n3y3qrTTAlp+p4BsEcStBSeA9NqB1PteVksWL5Hjspc+2rOynxJUA9QpEfpJoyD/GF3ky4WXlmDecbG4Hq0bp73YUwHF8McPqa4TkM0pgNs0fpPs8Ez+B3yomienTy3OWYSujUmWkHJMARMW1zGkGKgEWDEXH3ItOeI7NuUwZS40zzMjmgGxUMfMNm2M128ZSzmKpaQ9gBTxkHZtjmTqfU200anBvXC2mgGEfTMDPaVBxLlSJcF0wqYduRqjFwYL93VmL/w1IpbRwCmgMnXLqcIUTg1xrwk7WLEyD5vm27/BR1W3eknwHw9klODKMyWHBXdXu3VoG/gsyKoFr4A06FaXVijNMZQUK1Bn6HSiqAcGAGmzCJdOLTUfA16By4rgpJgSAc3bJA9VYP6wWZF0DJ4AUxrkvT6M7f2QPD9a6lVT41P4A8wtdwIHdTs15gp6LTymdoPP4CpoSV0UH2zBn2HViuDPDCqD2m4as9t/TYN+gSlVgYth8d6PQpjAgJAVn8UckIAeqEvhJcQAGcsP73GQXwIcYtfwyyY1390/qDYpdusgQAAAABJRU5ErkJggg==", ME = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAC40lEQVR42u3YTUgUYRjA8c6rRpS6X9phwVj3w1Vb6xQRQhEIkURJkmEsRZGHEjIjWjp0CLwWQSAFwUaHsgxJUbNI8KukAosoqYMGRmQhdIh4/LO8rzMDLntwZj3owg/WmZH97/jMO7tuWH+suYerMBhEA+oRWO2YVozjEz5iFC2rFdOO1xCT/xhDa65jkpjUIYc9FXIARhihBOcq5jreQiCN3pgMbN2Zdsga9QbJXMS8g0CaiRkkRBvAUU/MHDWJpFMxu8wxp7yVSyFtviq54qte+vm41xqFuBNBLfgGOW2KOU9MHtvy0c5zvb3ZiJpGws6QvejFB8xCaooj8rR0h5wljBhxKXloJeoJ+yqLw3r7LKbQg1o7gnoxD9G8ReXps3RQDbFZAzOU4Oy4Oca8Hb/Qs9KYMMYhId7xRd793ZIayxAfMUU1EWLed4djL/A7weKQPmYMwZUEFeAFZCOu+vXgWh0jJGHMlcVlhj1fBWMIrpWepdt6dvLRZgxuVufUwLuAGdyy6+Z5DzN6cFuMs5ERywIRlphOlNl1pZXhOf5AICeMebEYQKN1HZpHr46xK6gKE5AYw62HlIEmwIjpR70a8gjHlcM0zGE7gwIYgQSKQvKQdSaoXqzOE02H9GGfO5reFmXfY47xG5f+MErsDHJhSA/2M178ES8YUlG1hOx2Rywx3VAx/9DvxK0jhQVIZ0lcBlVUWEVBKnjOKp3ed5Nj1Pbf6HTqTj8Hy3rURUCEkBi6VQzkkq9KB31H0omgM/gKOWm97PWfyLKtybjSvqDZiaA6TEH2u6NZ16E9asDxHrVOBFVgQg1u1qBtxv1rFGVOBG3CS8jmwnK1/iyvDwXW+1eBU58au/EXcr+0JmMQd3kds4AHTn6mvoGfkA7/9oxB1/zVOugHOpwMSmAa4mMVZtVelsdYoT+j0cmgLejCHCSLOaTgcvqrUBwpDGMkg1dIIZ7Lb69eBDLwrv8bZs08FgGAGn+XDk4mcQAAAABJRU5ErkJggg==", ws = {
  CHALLENGER: "#f1c40f",
  GRANDMASTER: "#e74c3c",
  MASTER: "#9b59b6",
  DIAMOND: "#3498db",
  EMERALD: "#00d084",
  PLATINUM: "#b8c4cc",
  GOLD: "#c8aa6e",
  SILVER: "#a09b8c",
  BRONZE: "#cd7f32",
  IRON: "#7e7e7e",
  UNRANKED: "#5c5b57"
};
function td(l) {
  return l >= 1e3 ? `${(l / 1e3).toFixed(1)}k` : String(l);
}
function IE(l) {
  return l.toLocaleString("zh-CN");
}
function RE(l) {
  const i = Math.floor(l / 60), c = l % 60;
  return `${i}:${String(c).padStart(2, "0")}`;
}
function UE(l) {
  return new Date(l).toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  });
}
function zE(l) {
  return new Date(l).toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  });
}
function Gf(l, i) {
  return /* @__PURE__ */ f.jsx("span", { className: i ? "smd-kda-max" : void 0, children: l });
}
function pc(l, i) {
  return i > 0 ? l.get(i) ?? "" : "";
}
function OE(l, i) {
  var c;
  return (c = l.get(i)) == null ? void 0 : c.player;
}
function DE() {
  return { rankText: "未定级", rankColor: ws.UNRANKED };
}
function Ny(l) {
  return !l || l === "UNRANKED" ? DE() : {
    rankText: Dd(l),
    rankColor: ws[l] ?? ws.UNRANKED
  };
}
function wE(l, i = "") {
  const c = Ny(i);
  if (!l || typeof l != "object") return c;
  const o = l.queueMap;
  if (!o) return c;
  const r = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "EMERALD", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLENGER"], m = { IV: 1, III: 2, II: 3, I: 4 }, g = [];
  for (const [y, v] of [["RANKED_SOLO_5x5", "单排/双排"], ["RANKED_FLEX_SR", "灵活组排"]]) {
    const S = o[y];
    if (!S) continue;
    const b = S.tier ?? "", N = S.division ?? "";
    b && b !== "UNRANKED" && g.push({ key: y, label: v, tier: b, division: N });
  }
  if (g.length === 0) return c;
  g.sort((y, v) => {
    const S = r.indexOf(v.tier) - r.indexOf(y.tier);
    return S !== 0 ? S : (m[v.division] ?? 0) - (m[y.division] ?? 0);
  });
  const p = g[0];
  return {
    rankText: `${Dd(p.tier)}${p.division && p.division !== "NA" ? ` ${p.division}` : ""} ${p.label}`,
    rankColor: ws[p.tier] ?? ws.UNRANKED
  };
}
function jE({ team: l, participants: i, isRed: c }) {
  const o = i.reduce((g, p) => g + p.stats.kills, 0), r = i.reduce((g, p) => g + p.stats.goldEarned, 0), m = i.reduce((g, p) => g + p.stats.totalDamageDealtToChampions, 0);
  return /* @__PURE__ */ f.jsxs("div", { className: "smd-team-summary", children: [
    /* @__PURE__ */ f.jsxs("span", { title: "击杀", children: [
      /* @__PURE__ */ f.jsx("span", { className: "smd-sprite-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icons.png)", WebkitMaskPositionY: "0%" } }),
      o
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: "smd-stat-gold", title: "金币", children: [
      /* @__PURE__ */ f.jsx("span", { className: "smd-stat-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icon_gold.png)" } }),
      td(r)
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: "smd-team-damage", title: "伤害", children: [
      /* @__PURE__ */ f.jsx("span", { className: "smd-damage-icon" }),
      td(m)
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: "smd-team-turret", title: "防御塔", children: [
      /* @__PURE__ */ f.jsx("img", { src: c ? ME : xE, alt: "" }),
      (l == null ? void 0 : l.towerKills) ?? 0
    ] })
  ] });
}
function kE({
  participant: l,
  identity: i,
  maxDamage: c,
  highlighted: o,
  isRed: r,
  rankInfo: m,
  iconMaps: g
}) {
  const p = l.stats, y = [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5], v = [
    { icon: Wl(p.perk0) || pc(g.perks, p.perk0), type: "rune" },
    { icon: Kc(p.perkSubStyle) || pc(g.perkStyles, p.perkSubStyle), type: "rune" },
    { icon: Ds(l.spell1Id) || pc(g.spells, l.spell1Id), type: "spell" },
    { icon: Ds(l.spell2Id) || pc(g.spells, l.spell2Id), type: "spell" }
  ].filter((F) => F.icon), S = Math.max(p.kills, p.deaths, p.assists), b = c > 0 ? Math.max(6, Math.round(p.totalDamageDealtToChampions / c * 100)) : 0, N = c > 0 && p.totalDamageDealtToChampions === c, X = i ? `${i.gameName}#${i.tagLine}` : `玩家 ${l.participantId}`, I = p.totalMinionsKilled + p.neutralMinionsKilled, w = m ?? Ny(l.highestAchievedSeasonTier), j = () => {
    i && navigator.clipboard.writeText(X).then(() => {
      Toast.success("已复制ID");
    });
  };
  return /* @__PURE__ */ f.jsxs("div", { className: `smd-player-row${r ? " smd-player-row--red" : ""}${o ? " smd-player-row--focus" : ""}${N ? " smd-player-row--top-damage" : ""}`, children: [
    /* @__PURE__ */ f.jsxs("div", { className: "smd-champ-block", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "smd-champ", children: [
        /* @__PURE__ */ f.jsx("img", { src: Gc(l.championId), alt: "" }),
        /* @__PURE__ */ f.jsx("span", { className: "smd-champ-level", children: p.champLevel })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: "smd-loadout", children: v.map(({ icon: F, type: V }, J) => /* @__PURE__ */ f.jsx("div", { className: `smd-loadout-slot smd-loadout-${V}`, children: /* @__PURE__ */ f.jsx("img", { src: F, alt: "" }) }, `${V}-${J}`)) })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "smd-player-identity", title: X, children: [
      /* @__PURE__ */ f.jsx("button", { className: "smd-player-name", onClick: j, type: "button", children: /* @__PURE__ */ f.jsx("span", { children: (i == null ? void 0 : i.gameName) ?? `玩家 ${l.participantId}` }) }),
      /* @__PURE__ */ f.jsxs("strong", { className: "smd-kda", children: [
        Gf(p.kills, p.kills === S),
        " / ",
        Gf(p.deaths, p.deaths === S),
        " / ",
        Gf(p.assists, p.assists === S)
      ] }),
      /* @__PURE__ */ f.jsx("span", { className: "smd-player-rank", style: { color: w.rankColor }, children: w.rankText })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: "smd-metrics", children: /* @__PURE__ */ f.jsxs("div", { className: "smd-damage", children: [
      /* @__PURE__ */ f.jsxs("span", { className: "smd-damage-value", children: [
        /* @__PURE__ */ f.jsx("span", { className: "smd-damage-icon" }),
        /* @__PURE__ */ f.jsx("strong", { children: IE(p.totalDamageDealtToChampions) })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: "smd-damage-bar", children: /* @__PURE__ */ f.jsx("i", { style: { width: `${b}%` } }) })
    ] }) }),
    /* @__PURE__ */ f.jsxs("div", { className: "smd-items-block", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "smd-stat-strip", children: [
        /* @__PURE__ */ f.jsxs("span", { className: "smd-stat-pill", title: "补刀", children: [
          /* @__PURE__ */ f.jsx("span", { className: "smd-stat-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icon_minions.png)" } }),
          I
        ] }),
        /* @__PURE__ */ f.jsxs("span", { className: "smd-stat-pill smd-stat-gold", title: "金币", children: [
          /* @__PURE__ */ f.jsx("span", { className: "smd-stat-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icon_gold.png)" } }),
          td(p.goldEarned)
        ] })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: "smd-items", children: y.map((F, V) => /* @__PURE__ */ f.jsx("div", { className: "smd-item", children: F > 0 && /* @__PURE__ */ f.jsx("img", { src: qd(F), alt: "" }) }, V)) })
    ] })
  ] });
}
function qE({ open: l, onClose: i, gameId: c, focusPuuid: o }) {
  const [r, m] = k.useState(null), [g, p] = k.useState(/* @__PURE__ */ new Map()), [y, v] = k.useState({
    spells: /* @__PURE__ */ new Map(),
    perks: /* @__PURE__ */ new Map(),
    perkStyles: /* @__PURE__ */ new Map()
  }), [S, b] = k.useState(!1), [N, X] = k.useState("");
  k.useEffect(() => {
    if (!l || !c) return;
    let V = !1;
    return b(!0), X(""), m(null), p(/* @__PURE__ */ new Map()), ne.getMatchDetail(c).then(async (J) => {
      if (!Qe(J)) throw new Error("仅支持召唤师峡谷对局");
      const H = await Promise.all(J.participantIdentities.map(async (Z) => {
        const K = await ne.getRankedStats(Z.player.puuid).catch(() => null), Q = J.participants.find((_) => _.participantId === Z.participantId);
        return [Z.player.puuid, wE(K, (Q == null ? void 0 : Q.highestAchievedSeasonTier) ?? "")];
      }));
      V || m(J), V || p(new Map(H));
    }).catch(() => {
      V || X("加载单局详情失败");
    }).finally(() => {
      V || b(!1);
    }), () => {
      V = !0;
    };
  }, [l, c]), k.useEffect(() => {
    if (!l) return;
    let V = !1;
    return Promise.all([
      ne.getSummonerSpells().catch(() => []),
      ne.getPerks().catch(() => []),
      ne.getPerkStyles().catch(() => ({ styles: [] }))
    ]).then(([J, H, Z]) => {
      V || v({
        spells: new Map(J.map((K) => [K.id, K.iconPath.toLowerCase()])),
        perks: new Map(H.map((K) => [K.id, K.iconPath.toLowerCase()])),
        perkStyles: new Map(Z.styles.map((K) => [K.id, K.iconPath.toLowerCase()]))
      });
    }), () => {
      V = !0;
    };
  }, [l]);
  const I = k.useMemo(() => {
    const V = /* @__PURE__ */ new Map();
    return r == null || r.participantIdentities.forEach((J) => V.set(J.participantId, J)), V;
  }, [r]), w = k.useMemo(() => {
    const V = (r == null ? void 0 : r.participants.filter((H) => H.teamId === 100)) ?? [], J = (r == null ? void 0 : r.participants.filter((H) => H.teamId === 200)) ?? [];
    return { team100: V, team200: J };
  }, [r]), j = k.useMemo(() => Math.max(0, ...(r == null ? void 0 : r.participants.map((V) => V.stats.totalDamageDealtToChampions)) ?? [0]), [r]), F = (V, J, H) => {
    const Z = r == null ? void 0 : r.teams.find((Q) => Q.teamId === V), K = (Z == null ? void 0 : Z.win) === "Win" || J.some((Q) => Q.stats.win);
    return /* @__PURE__ */ f.jsxs("section", { className: `smd-team ${H ? "smd-team--red" : "smd-team--blue"} ${K ? "smd-win" : "smd-loss"}`, children: [
      /* @__PURE__ */ f.jsxs("div", { className: `smd-team-header ${H ? "smd-team-header--red" : "smd-team-header--blue"}`, children: [
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("strong", { children: V === 100 ? "蓝色方" : "红色方" }),
          /* @__PURE__ */ f.jsx("span", { children: K ? "胜利" : "失败" })
        ] }),
        /* @__PURE__ */ f.jsx(jE, { team: Z, participants: J, isRed: H })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: "smd-team-list", children: J.map((Q) => {
        const _ = OE(I, Q.participantId);
        return /* @__PURE__ */ f.jsx(
          kE,
          {
            participant: Q,
            identity: _,
            maxDamage: j,
            highlighted: !!(o && (_ == null ? void 0 : _.puuid) === o),
            isRed: H,
            rankInfo: _ ? g.get(_.puuid) : void 0,
            iconMaps: y
          },
          Q.participantId
        );
      }) })
    ] });
  };
  return /* @__PURE__ */ f.jsx(oi, { open: l, onClose: i, width: 1240, height: 640, children: /* @__PURE__ */ f.jsxs("div", { className: "smd-container", children: [
    /* @__PURE__ */ f.jsx("div", { className: "smd-header", children: /* @__PURE__ */ f.jsxs("div", { className: "smd-title-line", children: [
      /* @__PURE__ */ f.jsx("span", { className: "smd-title", children: "❖ 单局战报详情" }),
      r && /* @__PURE__ */ f.jsxs("div", { className: "smd-meta", children: [
        /* @__PURE__ */ f.jsx("span", { children: Wa(r.queueId) }),
        /* @__PURE__ */ f.jsx("span", { children: "召唤师峡谷" }),
        /* @__PURE__ */ f.jsx("span", { children: `时长 ${RE(r.gameDuration)}` }),
        /* @__PURE__ */ f.jsx("span", { children: `开始 ${zE(r.gameCreation)}` }),
        /* @__PURE__ */ f.jsx("span", { children: UE(r.gameCreation) }),
        /* @__PURE__ */ f.jsxs("span", { children: [
          "ID:",
          r.gameId
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ f.jsxs("div", { className: "smd-body", children: [
      S && /* @__PURE__ */ f.jsx("div", { className: "smd-empty", children: "加载中..." }),
      N && /* @__PURE__ */ f.jsx("div", { className: "smd-empty smd-error", children: N }),
      !S && !N && r && /* @__PURE__ */ f.jsxs("div", { className: "smd-teams", children: [
        /* @__PURE__ */ f.jsx("div", { className: "smd-team-divider", "aria-hidden": "true" }),
        F(100, w.team100, !1),
        F(200, w.team200, !0)
      ] })
    ] })
  ] }) });
}
function N0(l) {
  return l >= 1e3 ? `${(l / 1e3).toFixed(1)}k` : String(l);
}
function LE(l) {
  const i = new Date(l), c = /* @__PURE__ */ new Date(), o = new Date(c.getFullYear(), c.getMonth(), c.getDate()), r = new Date(i.getFullYear(), i.getMonth(), i.getDate()), m = Math.round((o.getTime() - r.getTime()) / (1e3 * 60 * 60 * 24)), g = i.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 });
  return m === 0 ? `今天 ${g}` : m === 1 ? `昨天 ${g}` : m === 2 ? `前天 ${g}` : i.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) + " " + g;
}
function BE(l, i) {
  var y, v, S, b, N, X;
  const c = l.json;
  if (!Qe(c)) return null;
  const o = c.participants.find((I) => I.puuid === i);
  if (!o) return null;
  const r = (v = (y = o.perks) == null ? void 0 : y.styles) == null ? void 0 : v[0], m = (b = (S = o.perks) == null ? void 0 : S.styles) == null ? void 0 : b[1], g = ((X = (N = r == null ? void 0 : r.selections) == null ? void 0 : N[0]) == null ? void 0 : X.perk) ?? 0, p = (m == null ? void 0 : m.style) ?? 0;
  return {
    gameId: c.gameId,
    queueId: c.queueId,
    win: o.win,
    championId: o.championId,
    level: o.champLevel,
    kills: o.kills,
    deaths: o.deaths,
    assists: o.assists,
    cs: o.totalMinionsKilled + o.neutralMinionsKilled,
    gold: o.goldEarned,
    damage: o.totalDamageDealtToChampions,
    queueName: Wa(c.queueId),
    mapName: "召唤师峡谷",
    spell1Id: o.spell1Id,
    spell2Id: o.spell2Id,
    perk0: g,
    perkSubStyle: p,
    items: [o.item0, o.item1, o.item2, o.item3, o.item4, o.item5, o.item6],
    gameCreation: c.gameCreation
  };
}
function GE({ match: l, onOpenDetail: i }) {
  const c = l.win ? "smh-win" : "smh-loss", o = l.win ? "胜利" : "失败", [r, m] = k.useState(!1), g = (p) => {
    p.stopPropagation(), navigator.clipboard.writeText(String(l.gameId)).then(() => {
      m(!0), setTimeout(() => m(!1), 1500);
    });
  };
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: `smh-row ${c}`,
      role: "button",
      tabIndex: 0,
      onClick: () => i(l.gameId),
      onKeyDown: (p) => {
        (p.key === "Enter" || p.key === " ") && (p.preventDefault(), i(l.gameId));
      },
      title: "点击查看单局详情",
      children: [
        /* @__PURE__ */ f.jsxs("div", { className: "smh-row-left", children: [
          /* @__PURE__ */ f.jsxs("div", { className: "smh-champion", children: [
            /* @__PURE__ */ f.jsx("div", { className: "smh-champion-mask", children: /* @__PURE__ */ f.jsx("img", { className: "smh-champion-icon", src: Gc(l.championId), alt: "" }) }),
            /* @__PURE__ */ f.jsx("span", { className: "smh-champion-level", children: l.level })
          ] }),
          /* @__PURE__ */ f.jsxs("div", { className: "smh-row-info", children: [
            /* @__PURE__ */ f.jsx("span", { className: `smh-status ${c}`, children: o }),
            /* @__PURE__ */ f.jsx("span", { className: "smh-gamemode", children: l.queueName }),
            /* @__PURE__ */ f.jsxs("div", { className: "smh-spells", children: [
              /* @__PURE__ */ f.jsx("img", { className: "smh-spell", src: Ds(l.spell1Id), alt: "" }),
              /* @__PURE__ */ f.jsx("img", { className: "smh-spell", src: Ds(l.spell2Id), alt: "" }),
              l.perk0 > 0 && Wl(l.perk0) && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("img", { className: "smh-perk smh-perk-primary", src: Wl(l.perk0), alt: "" }),
                l.perkSubStyle > 0 && Kc(l.perkSubStyle) && /* @__PURE__ */ f.jsx("img", { className: "smh-perk smh-perk-sub", src: Kc(l.perkSubStyle), alt: "" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: "smh-row-center", children: [
          /* @__PURE__ */ f.jsx("div", { className: "smh-items", children: l.items.map((p, y) => /* @__PURE__ */ f.jsx("div", { className: "smh-item-slot", children: p > 0 && /* @__PURE__ */ f.jsx("img", { className: "smh-item-icon", src: qd(p), alt: "" }) }, y)) }),
          /* @__PURE__ */ f.jsxs("div", { className: "smh-stats-line", children: [
            /* @__PURE__ */ f.jsxs("span", { className: "smh-kda", children: [
              /* @__PURE__ */ f.jsx("span", { className: "smh-sprite-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icons.png)", WebkitMaskPositionY: "0%", width: "22px", height: "22px" } }),
              /* @__PURE__ */ f.jsx("span", { className: `smh-kda-num${l.kills >= l.deaths && l.kills >= l.assists ? " smh-kda-highlight" : ""}`, children: l.kills }),
              " / ",
              /* @__PURE__ */ f.jsx("span", { className: `smh-kda-num${l.deaths > l.kills && l.deaths > l.assists ? " smh-kda-highlight" : ""}`, children: l.deaths }),
              " / ",
              /* @__PURE__ */ f.jsx("span", { className: `smh-kda-num${l.assists > l.kills && l.assists > l.deaths ? " smh-kda-highlight" : ""}`, children: l.assists })
            ] }),
            /* @__PURE__ */ f.jsxs("span", { className: "smh-cs", children: [
              /* @__PURE__ */ f.jsx("span", { className: "smh-stat-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icon_minions.png)" } }),
              l.cs
            ] }),
            /* @__PURE__ */ f.jsxs("span", { className: "smh-gold", children: [
              /* @__PURE__ */ f.jsx("span", { className: "smh-stat-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icon_gold.png)" } }),
              N0(l.gold)
            ] }),
            /* @__PURE__ */ f.jsxs("span", { className: "smh-damage", children: [
              "🗡️ ",
              N0(l.damage)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: "smh-row-right", children: [
          /* @__PURE__ */ f.jsx("span", { className: "smh-mapname", children: l.mapName }),
          /* @__PURE__ */ f.jsx("span", { className: "smh-date", children: LE(l.gameCreation) }),
          /* @__PURE__ */ f.jsxs("span", { className: "smh-gameid", onClick: g, children: [
            "ID:",
            l.gameId,
            /* @__PURE__ */ f.jsx("span", { className: `smh-copy-icon ${r ? "smh-copied" : ""}`, style: { WebkitMaskImage: "url(/fe/lol-static-assets/images/game-id-clipboard-copy.svg)" } })
          ] })
        ] })
      ]
    }
  );
}
const x0 = 20;
function KE(l, i, c = 0) {
  const [o, r] = k.useState([]), [m, g] = k.useState(!1), [p, y] = k.useState(!1), [v, S] = k.useState(""), [b, N] = k.useState(!0), [X, I] = k.useState(c), w = k.useRef(null), j = k.useCallback(async (H, Z) => {
    if (!(H.busy || !H.hasMore)) {
      H.busy = !0, Z ? g(!0) : y(!0);
      try {
        let K = [];
        do {
          const Q = await ne.getSgpMatchHistory(H.puuid, {
            startIndex: H.nextIndex,
            count: x0,
            tag: oo(H.queueId) || void 0
          });
          if (w.current !== H) return;
          const _ = Q.games ?? [];
          K = _.filter((pe) => Qe(pe.json) && (H.queueId === 0 || pe.json.queueId === H.queueId)), H.nextIndex += _.length, H.hasMore = _.length >= x0;
        } while (K.length === 0 && H.hasMore);
        r((Q) => Z ? K : [...Q, ...K]), N(H.hasMore);
      } catch {
        if (w.current !== H) return;
        Z && (S("战绩加载失败"), H.hasMore = !1, N(!1));
      } finally {
        H.busy = !1, w.current === H && (g(!1), y(!1));
      }
    }
  }, []), F = k.useCallback((H) => {
    const Z = AE(H) ? H : 0, K = { puuid: i, queueId: Z, nextIndex: 0, busy: !1, hasMore: !0 };
    w.current = K, I(Z), r([]), S(""), N(!0), y(!1), j(K, !0);
  }, [i, j]);
  k.useEffect(() => (l && i ? F(c) : (r([]), g(!1), y(!1)), () => {
    w.current = null;
  }), [l, i, c, F]);
  const V = k.useCallback((H) => {
    l && i && F(H);
  }, [l, i, F]), J = k.useCallback(() => {
    const H = w.current;
    H && j(H, !1);
  }, [j]);
  return { games: o, loading: m, loadingMore: p, error: v, hasMore: b, filterQueueId: X, changeFilter: V, loadMore: J };
}
function Za({ open: l, onClose: i, puuid: c, playerName: o, queueId: r }) {
  var re;
  const [m, g] = k.useState(o), { games: p, loading: y, loadingMore: v, error: S, hasMore: b, filterQueueId: N, changeFilter: X, loadMore: I } = KE(l, c, r), w = k.useMemo(() => p.map((ue) => BE(ue, c)).filter((ue) => ue !== null), [p, c]), [j, F] = k.useState(!1), [V, J] = k.useState(null), H = k.useRef(null), Z = k.useRef(null);
  k.useEffect(() => {
    const ue = o.trim(), ge = !!ue.replace(/#/g, "").trim();
    if (g(ge ? ue : "未知"), !l || !c || ge) return;
    let Oe = !1;
    return ne.getSummonerByPuuid(c).then((we) => {
      if (Oe) return;
      const Le = we.gameName ? `${we.gameName}${we.tagLine ? `#${we.tagLine}` : ""}` : we.displayName;
      Le && g(Le);
    }).catch(() => {
    }), () => {
      Oe = !0;
    };
  }, [l, o, c]);
  const [K, Q] = k.useState([]);
  k.useEffect(() => {
    const ue = NE();
    Q(ue);
  }, []), k.useEffect(() => {
    const ue = (ge) => {
      Z.current && !Z.current.contains(ge.target) && F(!1);
    };
    return document.addEventListener("mousedown", ue), () => document.removeEventListener("mousedown", ue);
  }, []), k.useEffect(() => {
    if (!l) return;
    let ue;
    const ge = requestAnimationFrame(() => {
      const Oe = H.current;
      if (!Oe) return;
      const we = () => {
        const { scrollTop: Le, scrollHeight: z, clientHeight: Y } = Oe;
        z - Le - Y < 60 && I();
      };
      Oe.addEventListener("scroll", we, { passive: !0 }), ue = () => Oe.removeEventListener("scroll", we);
    });
    return () => {
      cancelAnimationFrame(ge), ue == null || ue();
    };
  }, [l, I]);
  const _ = (ue) => {
    F(!1), X(ue);
  }, pe = N > 0 ? ((re = K.find((ue) => ue.id === N)) == null ? void 0 : re.name) ?? Wa(N) : "全部峡谷队列";
  return /* @__PURE__ */ f.jsx(oi, { open: l, onClose: i, width: 860, height: 620, children: /* @__PURE__ */ f.jsxs("div", { className: "smh-container", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "smh-header", children: [
      /* @__PURE__ */ f.jsx("span", { className: "smh-title", children: `❖ ${m} 的近期战报` }),
      /* @__PURE__ */ f.jsxs("div", { className: "smh-filter", ref: Z, children: [
        /* @__PURE__ */ f.jsxs(
          "button",
          {
            className: `smh-filter-trigger${j ? " smh-filter-trigger--open" : ""}`,
            onClick: () => F(!j),
            type: "button",
            children: [
              /* @__PURE__ */ f.jsx("span", { children: pe }),
              /* @__PURE__ */ f.jsx("svg", { className: `smh-filter-arrow${j ? " smh-filter-arrow--open" : ""}`, width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ f.jsx("polyline", { points: "6 9 12 15 18 9" }) })
            ]
          }
        ),
        j && /* @__PURE__ */ f.jsxs("div", { className: "smh-filter-dropdown", children: [
          /* @__PURE__ */ f.jsx(
            "button",
            {
              className: `smh-filter-option${N === 0 ? " smh-filter-option--active" : ""}`,
              onClick: () => _(0),
              type: "button",
              children: "全部峡谷队列"
            }
          ),
          K.map((ue) => /* @__PURE__ */ f.jsx(
            "button",
            {
              className: `smh-filter-option${N === ue.id ? " smh-filter-option--active" : ""}`,
              onClick: () => _(ue.id),
              type: "button",
              children: ue.name
            },
            ue.id
          ))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "smh-list", ref: H, children: [
      y && /* @__PURE__ */ f.jsx("div", { className: "smh-empty", children: "正在拉取战绩..." }),
      S && /* @__PURE__ */ f.jsx("div", { className: "smh-empty smh-error", children: S }),
      !y && !S && w.length === 0 && /* @__PURE__ */ f.jsx("div", { className: "smh-empty", children: "暂无对局数据" }),
      w.map((ue) => /* @__PURE__ */ f.jsx(GE, { match: ue, onOpenDetail: J }, ue.gameId)),
      v && /* @__PURE__ */ f.jsx("div", { className: "smh-empty", children: "正在加载更多..." }),
      !y && !S && w.length > 0 && /* @__PURE__ */ f.jsx("div", { className: "smh-empty smh-no-more", children: b ? "↓ 下滑加载更多" : `— 共 ${w.length} 条战绩 —` })
    ] }),
    /* @__PURE__ */ f.jsx(
      qE,
      {
        open: V != null,
        onClose: () => J(null),
        gameId: V,
        focusPuuid: c
      }
    )
  ] }) });
}
const sa = {
  sidebarCollapsed: !1,
  hotkey: "F1",
  hideSonaIcon: !1,
  skippedUpdateVersion: null,
  champSelectAssist: !1,
  champSelectTierBadge: !1,
  opggBuildRecommendation: !1,
  smartBuildRecommendation: !1,
  smartItemSetBuild: !1,
  smartRunePages: {},
  smartSummonerSpells: {},
  opggBuildRecommendationTier: "emerald_plus",
  analyzeTeamPower: !1,
  analyzeTeamPowerFetchCount: 50,
  champSelectAssistFetchCount: 50,
  gameAnalysisFetchCount: 50,
  lobbyEnhancement: !0,
  lobbyEnhancementFetchCount: 50,
  gameAnalysisPopup: !1
}, M0 = "sona:";
class HE {
  constructor() {
    ct(this, "listeners", /* @__PURE__ */ new Map());
    ct(this, "cache");
    const i = { ...sa };
    for (const c of Object.keys(sa))
      i[c] = this.readFromDisk(c);
    this.cache = i;
  }
  /**
   * 获取配置值
   */
  get(i) {
    return this.cache[i];
  }
  /**
   * 设置配置值（自动持久化 + 触发监听）
   */
  set(i, c) {
    if (this.cache[i] === c) return;
    this.cache[i] = c, DataStore.set(`${M0}${i}`, c);
    const r = this.listeners.get(i);
    r && r.forEach((m) => {
      try {
        m(c, i);
      } catch {
      }
    });
  }
  /**
   * 切换布尔值配置
   */
  toggle(i) {
    const c = this.get(i);
    if (typeof c != "boolean") return c;
    const o = !c;
    return this.set(i, o), o;
  }
  /**
   * 监听配置变化
   * @returns 取消监听的函数
   */
  onChange(i, c) {
    let o = this.listeners.get(i);
    return o || (o = /* @__PURE__ */ new Set(), this.listeners.set(i, o)), o.add(c), () => {
      o.delete(c);
    };
  }
  /**
   * 重置所有配置为默认值
   */
  resetAll() {
    for (const i of Object.keys(sa))
      this.set(i, sa[i]);
  }
  /**
   * 重置单个配置为默认值
   */
  reset(i) {
    this.set(i, sa[i]);
  }
  /**
   * 获取所有配置的快照
   */
  getAll() {
    const i = { ...sa };
    for (const c of Object.keys(sa))
      i[c] = this.get(c);
    return i;
  }
  // ---- 内部方法 ----
  readFromDisk(i) {
    const c = DataStore.get(`${M0}${i}`);
    return c !== void 0 ? c : sa[i];
  }
}
const O = new HE();
function QE() {
  const [l, i] = k.useState(O.get("champSelectAssist")), [c, o] = k.useState(O.get("champSelectTierBadge")), [r, m] = k.useState(O.get("opggBuildRecommendation")), [g, p] = k.useState(O.get("smartBuildRecommendation")), [y, v] = k.useState(O.get("smartItemSetBuild")), [S, b] = k.useState(O.get("gameAnalysisPopup")), [N, X] = k.useState(O.get("analyzeTeamPower")), [I, w] = k.useState(O.get("analyzeTeamPowerFetchCount")), [j, F] = k.useState(O.get("champSelectAssistFetchCount")), [V, J] = k.useState(O.get("gameAnalysisFetchCount")), [H, Z] = k.useState(O.get("lobbyEnhancement")), [K, Q] = k.useState(O.get("lobbyEnhancementFetchCount")), [_, pe] = k.useState(""), [re, ue] = k.useState(""), [ge, Oe] = k.useState(!1), [we, Le] = k.useState(""), [z, Y] = k.useState(""), ae = [
    { value: "20", label: "近20局" },
    { value: "50", label: "近50局" },
    { value: "100", label: "近100局" }
  ];
  k.useEffect(() => {
    const P = [
      O.onChange("champSelectAssist", i),
      O.onChange("champSelectTierBadge", o),
      O.onChange("opggBuildRecommendation", m),
      O.onChange("smartBuildRecommendation", p),
      O.onChange("smartItemSetBuild", v),
      O.onChange("gameAnalysisPopup", b),
      O.onChange("analyzeTeamPower", X),
      O.onChange("analyzeTeamPowerFetchCount", w),
      O.onChange("champSelectAssistFetchCount", F),
      O.onChange("gameAnalysisFetchCount", J),
      O.onChange("lobbyEnhancement", Z),
      O.onChange("lobbyEnhancementFetchCount", Q)
    ];
    return () => P.forEach((A) => A());
  }, []);
  const Te = async () => {
    const P = _.trim().split("#");
    if (P.length !== 2 || !P[0] || !P[1]) {
      ue("格式错误，请输入: 名字#Tag");
      return;
    }
    ue("");
    try {
      const A = await ne.resolveSummonerPuuidByRiotId(P[0], P[1]);
      if (!A) {
        ue("未找到该召唤师");
        return;
      }
      Le(A), Y(`${P[0]}#${P[1]}`), Oe(!0);
    } catch {
      ue("查询失败，请检查名字和Tag是否正确");
    }
  };
  return /* @__PURE__ */ f.jsxs("div", { className: "sona-settings", children: [
    /* @__PURE__ */ f.jsx("h2", { className: "sona-settings-title", children: "排位分析" }),
    /* @__PURE__ */ f.jsxs(_f, { title: "战绩查询", children: [
      /* @__PURE__ */ f.jsx("p", { className: "sona-subtitle", style: { marginBottom: 10 }, children: "仅支持召唤师峡谷。输入召唤师名#Tag 查询国服玩家的近期战绩，支持国服大区互通查询。" }),
      /* @__PURE__ */ f.jsxs("div", { className: "sona-match-search-actions", style: { alignItems: "flex-end", gap: 8 }, children: [
        /* @__PURE__ */ f.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ f.jsx(
          dE,
          {
            value: _,
            onChange: (P) => {
              pe(P), ue("");
            },
            onKeyDown: (P) => {
              P.key === "Enter" && Te();
            },
            placeholder: "名字#Tag (例:丨一疾风剑豪一丨#77772)"
          }
        ) }),
        /* @__PURE__ */ f.jsx(Ss, { variant: "primary", onClick: Te, children: "查询战绩" })
      ] }),
      re && /* @__PURE__ */ f.jsx("p", { className: "sona-subtitle", style: { color: "#e74c3c", marginTop: 6 }, children: re })
    ] }),
    /* @__PURE__ */ f.jsx(
      Za,
      {
        open: ge,
        onClose: () => Oe(!1),
        puuid: we,
        playerName: z
      }
    ),
    /* @__PURE__ */ f.jsxs(_f, { title: "对局相关", children: [
      /* @__PURE__ */ f.jsxs(
        $t,
        {
          title: "英雄选择阶段增强",
          description: "英雄选择时显示粒子特效和队友近期胜率/KDA；点击队友头像可查询近期战绩。",
          children: [
            /* @__PURE__ */ f.jsx(
              Ga,
              {
                value: String(j),
                onChange: (P) => {
                  F(Number(P)), O.set("champSelectAssistFetchCount", Number(P));
                },
                options: ae
              }
            ),
            /* @__PURE__ */ f.jsx(
              Un,
              {
                checked: l,
                onChange: (P) => {
                  i(P), O.set("champSelectAssist", P);
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ f.jsxs(
        $t,
        {
          title: "牛马检测器",
          description: "在队友头像旁显示千里马、上等马、下等马等队内评级与综合评分，仅自己可见。",
          children: [
            /* @__PURE__ */ f.jsx(
              Ga,
              {
                value: String(I),
                onChange: (P) => {
                  w(Number(P)), O.set("analyzeTeamPowerFetchCount", Number(P));
                },
                options: ae
              }
            ),
            /* @__PURE__ */ f.jsx(
              Un,
              {
                checked: N,
                onChange: (P) => {
                  X(P), O.set("analyzeTeamPower", P);
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ f.jsx(
        $t,
        {
          title: "英雄 T 级角标",
          description: "英雄选择时在英雄列表和左侧队友头像上显示 T 级角标。",
          children: /* @__PURE__ */ f.jsx(
            Un,
            {
              checked: c,
              onChange: (P) => {
                o(P), O.set("champSelectTierBadge", P);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ f.jsx(
        $t,
        {
          title: "配装推荐面板",
          description: "锁定英雄后，点击皮肤选择下方的按钮以打开当前英雄的 OP.GG 配装和符文推荐。",
          children: /* @__PURE__ */ f.jsx(
            Un,
            {
              checked: r,
              onChange: (P) => {
                m(P), O.set("opggBuildRecommendation", P);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ f.jsx(
        $t,
        {
          title: "自动配置符文 & 召唤师技能",
          description: "按英雄保存并恢复符文与召唤师技能；首次使用会在进入游戏前记录最终配置。",
          children: /* @__PURE__ */ f.jsx(
            Un,
            {
              checked: g,
              onChange: (P) => {
                p(P), O.set("smartBuildRecommendation", P);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ f.jsx(
        $t,
        {
          title: "自动配装",
          description: "锁定英雄后按分路自动写入 OP.GG 推荐装备集。（暂不推荐使用，可能导致配装错乱）",
          children: /* @__PURE__ */ f.jsx(
            Un,
            {
              checked: y,
              onChange: (P) => {
                v(P), O.set("smartItemSetBuild", P);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ f.jsxs(
        $t,
        {
          title: "全局战力分析弹窗",
          description: "进入游戏后，自动弹窗展示双方队伍战力分析，包括胜率、KDA、段位、开黑分组。(注，不是直接在游戏内展示，需要切回客户端查看)",
          children: [
            /* @__PURE__ */ f.jsx(
              Ga,
              {
                value: String(V),
                onChange: (P) => {
                  J(Number(P)), O.set("gameAnalysisFetchCount", Number(P));
                },
                options: ae
              }
            ),
            /* @__PURE__ */ f.jsx(
              Un,
              {
                checked: S,
                onChange: (P) => {
                  b(P), O.set("gameAnalysisPopup", P);
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ f.jsxs(
        $t,
        {
          title: "组队界面增强",
          description: "开启后，组队界面点击头像即可查看召唤师战绩，且旗帜上方显示近期表现。",
          children: [
            /* @__PURE__ */ f.jsx(
              Ga,
              {
                value: String(K),
                onChange: (P) => {
                  Q(Number(P)), O.set("lobbyEnhancementFetchCount", Number(P));
                },
                options: ae
              }
            ),
            /* @__PURE__ */ f.jsx(
              Un,
              {
                checked: H,
                onChange: (P) => {
                  Z(P), O.set("lobbyEnhancement", P);
                }
              }
            )
          ]
        }
      )
    ] })
  ] });
}
const xy = "https://github.com/limnova/sona/releases", VE = "https://api.github.com/repos/limnova/sona/releases/latest", XE = "https://api.github.com/repos/limnova/sona/releases";
function I0(l) {
  return `https://corsproxy.io/?${encodeURIComponent(l)}`;
}
let Ts = {
  status: "idle",
  info: null,
  error: ""
}, os = null, As = "";
const nd = /* @__PURE__ */ new Set();
function My() {
  const l = zn();
  nd.forEach((i) => i(l));
}
function Vl(l) {
  Ts = l, My();
}
function zn() {
  return {
    ...Ts,
    info: Ts.info ? { ...Ts.info } : null
  };
}
function Bd(l) {
  return nd.add(l), l(zn()), () => nd.delete(l);
}
function ni(l) {
  return l.trim().replace(/^v/i, "");
}
function R0(l, i) {
  const c = ni(l).split(/[.-]/), o = ni(i).split(/[.-]/), r = Math.max(c.length, o.length);
  for (let m = 0; m < r; m += 1) {
    const g = Number.parseInt(c[m] ?? "0", 10), p = Number.parseInt(o[m] ?? "0", 10), y = Number.isFinite(g) ? g : 0, v = Number.isFinite(p) ? p : 0;
    if (y !== v) return y - v;
  }
  return 0;
}
function ZE() {
  return ni(O.get("skippedUpdateVersion") ?? "");
}
async function JE() {
  const l = [], i = [
    { url: I0(VE), kind: "single" },
    { url: I0(XE), kind: "array" }
  ];
  for (const { url: c, kind: o } of i)
    try {
      const r = await fetch(c, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/vnd.github+json"
        }
      }), m = await r.text();
      if (!r.ok) {
        l.push(`${c} -> ${r.status} ${r.statusText}`);
        continue;
      }
      const g = JSON.parse(m);
      let p = null;
      if (o === "single" ? p = g : Array.isArray(g) && g[0] && (p = g[0]), !(p != null && p.tag_name)) {
        l.push(`${c} -> missing tag_name`);
        continue;
      }
      return p;
    } catch (r) {
      l.push(`${c} -> ${r instanceof Error ? r.message : String(r)}`);
    }
  throw new Error(l.join(" | ") || "no release api response");
}
function YE() {
  return xy;
}
function Gd() {
  return os || (Vl({ status: "checking", info: null, error: "" }), os = JE().then((l) => {
    const i = ni("1.11.0"), c = ni(l.tag_name ?? ""), o = ZE();
    if (o && R0(i, o) >= 0 && O.set("skippedUpdateVersion", null), !c || R0(c, i) <= 0) {
      const m = { status: "latest", info: null, error: "" };
      return Vl(m), m;
    }
    if (c === o) {
      const m = { status: "latest", info: null, error: "" };
      return Vl(m), G.info("[Update] 已跳过版本 %s，本次不再提示。", c), m;
    }
    const r = {
      status: "available",
      error: "",
      info: {
        currentVersion: i,
        latestVersion: c,
        releaseName: l.name || `Sona v${c}`,
        releaseUrl: l.html_url || xy,
        releaseBody: l.body || "该版本没有填写更新说明。",
        publishedAt: l.published_at || ""
      }
    };
    return Vl(r), G.info("[Update] 检测到新版本: %s -> %s", i, c), WE(i, c), r;
  }).catch((l) => {
    const c = { status: "error", info: null, error: l instanceof Error ? l.message : String(l) };
    return Vl(c), G.warn("[Update] 检查更新失败:", l), c;
  }).finally(() => {
    os = null;
  }), os);
}
function PE(l) {
  var c;
  const i = ni(l);
  return i && (O.set("skippedUpdateVersion", i), As = i, ((c = Ts.info) == null ? void 0 : c.latestVersion) === i ? Vl({ status: "latest", info: null, error: "" }) : My(), G.info("[Update] 跳过版本更新提醒: %s", i)), zn();
}
function FE() {
  O.set("skippedUpdateVersion", null), As = "";
}
function WE(l, i) {
  As !== i && (As = i, ne.sendNotification(
    "检测到 Sona 新版本",
    `${l} → ${i}，打开 Sona 面板查看更新内容。`
  ).catch((c) => {
    As = "", G.warn("[Update] 发送更新通知失败:", c);
  }));
}
const _E = [
  { value: "F1", label: "F1" },
  { value: "F2", label: "F2" },
  { value: "F3", label: "F3" },
  { value: "F4", label: "F4" },
  { value: "F5", label: "F5" }
];
function $E() {
  const [l, i] = k.useState(O.get("hotkey")), [c, o] = k.useState(O.get("hideSonaIcon")), [r, m] = k.useState(O.get("skippedUpdateVersion"));
  return k.useEffect(() => {
    const g = [
      O.onChange("hotkey", i),
      O.onChange("hideSonaIcon", o),
      O.onChange("skippedUpdateVersion", m)
    ];
    return () => g.forEach((p) => p());
  }, []), /* @__PURE__ */ f.jsxs("div", { className: "sona-settings", children: [
    /* @__PURE__ */ f.jsx("h2", { className: "sona-settings-title", children: "设置" }),
    /* @__PURE__ */ f.jsxs(_f, { title: "通用", children: [
      /* @__PURE__ */ f.jsx(
        $t,
        {
          title: "面板快捷键",
          description: "随时按下快捷键打开/关闭 Sona 面板。",
          children: /* @__PURE__ */ f.jsx(
            Ga,
            {
              options: _E,
              value: l,
              onChange: (g) => {
                i(g), O.set("hotkey", g);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ f.jsx(
        $t,
        {
          title: "隐藏琴女 Icon",
          description: `隐藏 Play 按钮旁的 Sona 入口图标；隐藏后仍可按 ${l} 打开面板。`,
          children: /* @__PURE__ */ f.jsx(
            Un,
            {
              checked: c,
              onChange: (g) => {
                o(g), O.set("hideSonaIcon", g);
              }
            }
          )
        }
      ),
      r && /* @__PURE__ */ f.jsx(
        $t,
        {
          title: `已跳过 v${r} 版本更新`,
          description: "Sona 不会再提示这个版本；恢复提醒后会重新检查更新。",
          children: /* @__PURE__ */ f.jsx(Ss, { onClick: () => {
            FE(), Gd();
          }, children: "恢复更新提醒" })
        }
      )
    ] })
  ] });
}
function Kf({ icon: l, label: i, value: c }) {
  return /* @__PURE__ */ f.jsxs("div", { className: "sona-hex-card", children: [
    /* @__PURE__ */ f.jsx("span", { className: "sona-hex-card-icon", children: l }),
    /* @__PURE__ */ f.jsxs("div", { className: "sona-hex-card-text", children: [
      /* @__PURE__ */ f.jsx("span", { className: "sona-hex-card-label", children: i }),
      /* @__PURE__ */ f.jsx("span", { className: "sona-hex-card-value", children: c })
    ] })
  ] });
}
function eb() {
  return /* @__PURE__ */ f.jsxs("div", { className: "sona-about", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "sona-about-header", children: [
      /* @__PURE__ */ f.jsx("h2", { className: "sona-about-title", children: "Sona" }),
      /* @__PURE__ */ f.jsxs("span", { className: "sona-about-version", children: [
        "v",
        "1.11.0"
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("p", { className: "sona-about-desc", children: "Sona 是基于 Pengu Loader 的英雄联盟排位分析插件，提供战绩、队友评级及符文装备推荐。" }),
    /* @__PURE__ */ f.jsxs("div", { className: "sona-about-row", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "sona-about-cards", children: [
        /* @__PURE__ */ f.jsx(Kf, { icon: /* @__PURE__ */ f.jsx(py, {}), label: "插件", value: "Sona v1.11.0" }),
        /* @__PURE__ */ f.jsx(Kf, { icon: /* @__PURE__ */ f.jsx(tE, {}), label: "框架", value: "React + Vite" }),
        /* @__PURE__ */ f.jsx(
          Kf,
          {
            icon: /* @__PURE__ */ f.jsx(nE, {}),
            label: "加载器",
            value: `Pengu Loader ${typeof Pengu < "u" ? Pengu.version : "1.1.6"}`
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: "sona-about-section sona-about-tech", children: [
        /* @__PURE__ */ f.jsx("h3", { className: "sona-about-section-title", children: "技术栈" }),
        /* @__PURE__ */ f.jsxs("ul", { className: "sona-about-list", children: [
          /* @__PURE__ */ f.jsx("li", { children: "React 19 + TypeScript" }),
          /* @__PURE__ */ f.jsx("li", { children: "Vite 6" }),
          /* @__PURE__ */ f.jsx("li", { children: "Pengu Loader v1.1.0+" }),
          /* @__PURE__ */ f.jsx("li", { children: "LCU REST API + WebSocket" })
        ] }),
        /* @__PURE__ */ f.jsxs(
          "a",
          {
            className: "sona-hex-card sona-hex-card-link",
            href: "https://github.com/limnova/sona",
            target: "_blank",
            rel: "noopener noreferrer",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: "sona-hex-card-icon", children: /* @__PURE__ */ f.jsx(rE, {}) }),
              /* @__PURE__ */ f.jsxs("div", { className: "sona-hex-card-text", children: [
                /* @__PURE__ */ f.jsx("span", { className: "sona-hex-card-label", children: "GitHub" }),
                /* @__PURE__ */ f.jsx("span", { className: "sona-hex-card-value", children: "limnova/sona" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "sona-about-section", children: [
      /* @__PURE__ */ f.jsx("h3", { className: "sona-about-section-title", children: "开源协议" }),
      /* @__PURE__ */ f.jsx("p", { className: "sona-about-text", children: "AGPL-3.0" })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: "sona-about-quote", children: "由 WJZ_P 用心制作 ❤。" })
  ] });
}
function tb(l) {
  const i = new Date(l);
  if (Number.isNaN(i.getTime())) return l;
  const c = i.getFullYear(), o = String(i.getMonth() + 1).padStart(2, "0"), r = String(i.getDate()).padStart(2, "0");
  return `${c}年${o}月${r}日`;
}
function nb(l) {
  return l.status === "checking" ? "正在检查更新..." : l.status === "error" ? `检查更新失败：${l.error ?? ""}` : "当前没有检测到新版本。";
}
function ab() {
  const [l, i] = k.useState(() => zn()), c = l.info;
  k.useEffect(() => Bd(i), []);
  const o = (r) => {
    window.open(r, "_blank");
  };
  return /* @__PURE__ */ f.jsxs("div", { className: "sona-update-page", children: [
    /* @__PURE__ */ f.jsx("h2", { className: "sona-update-title", children: c ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      "检测到Sona新版本：",
      /* @__PURE__ */ f.jsx("span", { className: "sona-update-title-version", children: c.currentVersion }),
      /* @__PURE__ */ f.jsx("span", { className: "sona-update-title-arrow", children: "→" }),
      /* @__PURE__ */ f.jsx("span", { className: "sona-update-title-version sona-update-title-version--latest", children: c.latestVersion })
    ] }) : "检测到Sona新版本" }),
    c ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsxs("div", { className: "sona-update-release", children: [
        /* @__PURE__ */ f.jsxs("div", { className: "sona-update-release-head", children: [
          /* @__PURE__ */ f.jsx("span", { children: c.releaseName }),
          c.publishedAt && /* @__PURE__ */ f.jsx("time", { dateTime: c.publishedAt, children: tb(c.publishedAt) })
        ] }),
        /* @__PURE__ */ f.jsx("pre", { className: "sona-update-notes", children: c.releaseBody })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: "sona-update-download", children: [
        /* @__PURE__ */ f.jsx("h3", { children: "下载方式" }),
        /* @__PURE__ */ f.jsx("p", { children: "请到 limnova/sona 的 Releases 页面下载此精简版。" }),
        /* @__PURE__ */ f.jsxs("div", { className: "sona-update-actions", children: [
          /* @__PURE__ */ f.jsx(Ss, { variant: "primary", onClick: () => o(c.releaseUrl || YE()), children: "打开 Release" }),
          /* @__PURE__ */ f.jsx(Ss, { onClick: () => PE(c.latestVersion), children: `跳过 v${c.latestVersion}` })
        ] })
      ] })
    ] }) : /* @__PURE__ */ f.jsxs("div", { className: "sona-update-empty", children: [
      /* @__PURE__ */ f.jsx("p", { children: nb(l) }),
      /* @__PURE__ */ f.jsx(Ss, { onClick: () => {
        Gd();
      }, children: "重新检查" })
    ] })
  ] });
}
const Hc = /* @__PURE__ */ new Set();
let ai = !1;
function lb() {
  return ai;
}
function Iy() {
  ai = !0, Hc.forEach((l) => l(ai));
}
function Ry() {
  ai = !1, Hc.forEach((l) => l(ai));
}
function ib() {
  ai ? Ry() : Iy();
}
function Uy(l) {
  return Hc.add(l), () => {
    Hc.delete(l);
  };
}
let ad = "";
function sb(l) {
  l.key === ad && (l.preventDefault(), l.stopPropagation(), ib());
}
function ub() {
  ad = O.get("hotkey"), document.addEventListener("keydown", sb, !0), O.onChange("hotkey", (l) => {
    ad = l;
  });
}
const U0 = [
  { id: "home", icon: /* @__PURE__ */ f.jsx(lE, {}), label: "主页" },
  { id: "tools", icon: /* @__PURE__ */ f.jsx(sE, {}), label: "排位分析" },
  { id: "settings", icon: /* @__PURE__ */ f.jsx(iE, {}), label: "设置" },
  { id: "about", icon: /* @__PURE__ */ f.jsx(uE, {}), label: "关于" }
], cb = {
  id: "update",
  icon: /* @__PURE__ */ f.jsx(py, {}),
  label: "检测到新版本"
};
function ob({ pageId: l }) {
  switch (l) {
    case "update":
      return /* @__PURE__ */ f.jsx(ab, {});
    case "home":
      return /* @__PURE__ */ f.jsx(E0, {});
    case "tools":
      return /* @__PURE__ */ f.jsx(QE, {});
    case "settings":
      return /* @__PURE__ */ f.jsx($E, {});
    case "about":
      return /* @__PURE__ */ f.jsx(eb, {});
    default:
      return /* @__PURE__ */ f.jsx(E0, {});
  }
}
function rb() {
  const [l, i] = k.useState(lb()), [c, o] = k.useState(() => zn().status === "available" ? "update" : "home"), [r, m] = k.useState(O.get("sidebarCollapsed")), [g, p] = k.useState(() => zn());
  k.useEffect(() => Uy((b) => {
    var X;
    const N = !!((X = document.getElementById("sona-root")) != null && X.isConnected);
    G.debug("Modal visibility changed: %s (root in DOM: %s)", String(b), String(N)), i(b), b && zn().status === "available" && o("update");
  }), []), k.useEffect(() => Bd((b) => {
    p(b), b.status !== "available" && c === "update" && o("home");
  }), [c]);
  const y = k.useMemo(() => g.status === "available" ? [cb, ...U0] : U0, [g.status]), v = () => {
    Ry(), G.info("Modal closed");
  }, S = () => {
    m((b) => {
      const N = !b;
      return O.set("sidebarCollapsed", N), N;
    });
  };
  return /* @__PURE__ */ f.jsx(
    oi,
    {
      open: l,
      onClose: v,
      width: 900,
      height: 560,
      children: /* @__PURE__ */ f.jsxs("div", { className: "sona-layout", children: [
        /* @__PURE__ */ f.jsx(
          fE,
          {
            items: y,
            activeId: c,
            onSelect: o,
            collapsed: r,
            onToggle: S
          }
        ),
        /* @__PURE__ */ f.jsx("div", { className: "sona-content", children: /* @__PURE__ */ f.jsx(ob, { pageId: c }) })
      ] })
    }
  );
}
const fb = {
  info: { badge: "INFO", color: "#43b581", method: "log" },
  warn: { badge: "WARN", color: "#faa61a", method: "warn" },
  error: { badge: "ERROR", color: "#f04747", method: "error" },
  debug: { badge: "DEBUG", color: "#7289da", method: "debug" }
};
function db(l) {
  const {
    name: i,
    version: c,
    primaryColor: o = "#66ccff",
    accentColor: r = "#43b581"
  } = l, m = `${i}`;
  function g() {
    const y = [
      "color: #fff",
      `background: ${o}`,
      "padding: 4px 8px",
      "border-radius: 4px 0 0 4px",
      "font-weight: bold",
      "font-size: 14px"
    ].join(";"), v = [
      "color: #fff",
      `background: ${r}`,
      "padding: 4px 8px",
      "border-radius: 0 4px 4px 0",
      "font-weight: bold",
      "font-size: 14px"
    ].join(";");
    console.log(
      `%c ${i} ଘ(੭ˊᵕˋ)੭* ੈ✩‧₊˚♫ %c v${c} `,
      y,
      v
    );
  }
  function p(y, v, ...S) {
    const { badge: b, color: N, method: X } = fb[y], I = [
      "color: #fff",
      `background: ${o}`,
      "padding: 2px 6px",
      "border-radius: 3px 0 0 3px",
      "font-weight: bold",
      "font-size: 13px"
    ].join(";"), w = [
      "color: #fff",
      `background: ${N}`,
      "padding: 2px 6px",
      "border-radius: 0 3px 3px 0",
      "font-weight: bold",
      "font-size: 13px"
    ].join(";");
    console[X](
      `%c${m}%c${b}%c ${v}`,
      I,
      w,
      "color: inherit; background: inherit;",
      ...S
    );
  }
  return {
    printBanner: g,
    info: (y, ...v) => p("info", y, ...v),
    warn: (y, ...v) => p("warn", y, ...v),
    error: (y, ...v) => p("error", y, ...v),
    debug: (y, ...v) => p("debug", y, ...v)
  };
}
class mb {
  constructor() {
    ct(this, "tasks", /* @__PURE__ */ new Set());
    ct(this, "observer", null);
    ct(this, "isThrottled", !1);
  }
  /**
   * 注册一个新的注入任务
   * 注册后立即尝试执行一次
   */
  register(i) {
    this.tasks.add(i);
    try {
      i();
    } catch (c) {
      G.error("[Injector] Task failed on register:", c);
    }
  }
  /**
   * 取消注册一个注入任务
   */
  unregister(i) {
    this.tasks.delete(i);
  }
  /**
   * 启动全局 DOM 守护者
   * 只会启动一次，重复调用无效
   */
  start() {
    this.observer || (G.info("[Injector] Starting global DOM observer..."), this.observer = new MutationObserver(() => {
      this.isThrottled || (this.isThrottled = !0, requestAnimationFrame(() => {
        for (const i of this.tasks)
          try {
            i();
          } catch (c) {
            G.error("[Injector] Task failed:", c);
          }
        this.isThrottled = !1;
      }));
    }), this.observer.observe(document.body, {
      childList: !0,
      subtree: !0
    }));
  }
  /**
   * 停止全局守护（一般不需要调用）
   */
  stop() {
    this.observer && (this.observer.disconnect(), this.observer = null, G.info("[Injector] Global DOM observer stopped"));
  }
}
const st = new mb(), Kd = "sona-entry-btn", hb = "sona-entry-btn--hidden";
let z0 = null;
function Hd(l, i = O.get("hideSonaIcon")) {
  l.classList.toggle(hb, i), l.setAttribute("aria-hidden", String(i));
}
function pb(l = O.get("hideSonaIcon")) {
  const i = document.getElementById(Kd);
  i && Hd(i, l);
}
function gb() {
  const l = document.createElement("div");
  l.id = Kd, l.className = "sona-entry-btn", Hd(l), l.innerHTML = `
    <img class="sona-entry-icon" src="${gy}" alt="Sona" />
    <span class="sona-entry-update-badge" aria-hidden="true">!</span>
  `, l.addEventListener("mousedown", (c) => c.stopPropagation()), l.addEventListener("mouseup", (c) => c.stopPropagation()), l.addEventListener("click", (c) => {
    c.stopPropagation(), Iy(), G.info("Modal opened");
  }), Uy((c) => {
    l.classList.toggle("sona-entry-btn--active", c);
  });
  const i = () => {
    l.classList.toggle("sona-entry-btn--has-update", zn().status === "available");
  };
  return i(), Bd(i), l;
}
function yb() {
  const l = document.getElementById(Kd);
  if (l != null && l.isConnected)
    return Hd(l), !0;
  const i = document.querySelector(".play-button-container");
  return i != null && i.parentElement ? (i.parentElement.insertBefore(gb(), i), G.info("Entry button injected ✓ (beside play button)"), !0) : !1;
}
function vb() {
  st.register(yb), z0 || (z0 = O.onChange("hideSonaIcon", pb)), st.start();
}
async function fo(l) {
  var o, r;
  const i = ro(l.queueId);
  if (i) return Qe(i);
  const c = await ne.getGameflowSession().catch(() => null);
  return !!(c && ((r = (o = c.gameData) == null ? void 0 : o.queue) == null ? void 0 : r.id) === l.queueId && co(c));
}
const mo = 0, js = 100, Qc = 50, ld = 3, zy = 16, Sb = 1.22, O0 = ky(Qc), Qd = {
  recencyHalfLife: 18,
  minConfidenceGames: 3,
  fullConfidenceGames: 16,
  trimOutliers: !0,
  skipEarlySurrender: !0,
  skipAfkTeammate: !0
}, Vd = {
  combat: 0.26,
  win: 0.12,
  damage: 0.18,
  economy: 0.11,
  objectives: 0.1,
  vision: 0.08,
  durability: 0.09,
  farming: 0.06
}, Eb = {
  legendary: "天籁主宰",
  carry: "核心大腿",
  strong: "稳定强点",
  reliable: "可靠队友",
  balanced: "均衡发挥",
  unstable: "状态摇摆",
  risky: "高风险点",
  critical: "需要照顾"
};
function Oy(l) {
  return Eb[l];
}
function Dy(l, i, c = {}) {
  const o = { ...Qd, ...c }, r = l.map((j) => bb(j, i, o)).filter((j) => j !== null);
  if (r.length === 0)
    return null;
  const m = o.trimOutliers ? Lb(r.map((j) => j.score)) : r.map((j) => j.score), g = r.map((j, F) => Bb(F, o.recencyHalfLife)), p = Xl(m, g), y = kb(m), v = qb(m), S = jb(r.length, o), b = rt((y - 50) * 0.012, -0.6, 0.6), N = rt((v - 50) * 0.01, -0.5, 0.5), X = 0.57 + S * 0.43, I = rt(
    O0 + (p - O0) * X + b + N,
    ld,
    zy
  ), w = wy(I);
  return {
    puuid: i,
    score: I,
    rawScore: p,
    confidence: S,
    validGames: r.length,
    winRate: Xl(r.map((j) => j.win ? 1 : 0), g),
    averageKda: Xl(r.map((j) => j.metrics.kda), g),
    averageKillParticipation: Xl(
      r.map((j) => j.metrics.killParticipation),
      g
    ),
    averageDamageShare: Xl(r.map((j) => j.metrics.damageShare), g),
    consistencyScore: y,
    trendScore: v,
    grade: w,
    gradeLabel: Oy(w),
    verdict: Tb(I, S),
    breakdown: Db(r, g),
    games: r
  };
}
function bb(l, i, c = {}) {
  const o = { ...Qd, ...c }, r = l.json.participants.find((re) => re.puuid === i);
  if (!r || jy(l, r, o))
    return null;
  const m = l.json.participants.filter((re) => re.teamId === r.teamId);
  if (m.length === 0)
    return null;
  const g = Ab(r), p = wb(Vd), y = Math.max((r.timePlayed || l.json.gameDuration || 1) / 60, 1), v = oa(m, (re) => re.kills), S = oa(m, (re) => re.totalDamageDealtToChampions), b = oa(m, (re) => re.goldEarned), N = oa(m, (re) => re.damageDealtToObjectives), X = oa(m, (re) => re.totalDamageTaken), I = Ic(r.kills), w = Ic(r.deaths), j = Ic(r.assists), F = I + j, V = Zt(r, "kda") || (I + j) / Math.max(w, 1), J = rt(
    Zt(r, "killParticipation") || Tt(F, v),
    0,
    1
  ), H = rt(
    Zt(r, "teamDamagePercentage") || Tt(r.totalDamageDealtToChampions, S),
    0,
    1
  ), Z = rt(Tt(r.goldEarned, b), 0, 1), K = rt(
    Zt(r, "damageTakenOnTeamPercentage") || Tt(r.totalDamageTaken, X),
    0,
    1
  ), Q = Tt(r.totalMinionsKilled + r.neutralMinionsKilled, y), _ = Zt(r, "visionScorePerMinute") || Tt(r.visionScore, y), pe = {
    combat: Cb({ kda: V, killParticipation: J, deaths: w, minutes: y }),
    win: Nb(r),
    damage: xb(g, r, y, H),
    economy: Mb(g, r, y, H, Z),
    objectives: Ib(g, r, y, N),
    vision: Rb(g, r, y, _),
    durability: Ub(g, r, y, K),
    farming: zb(g, Q)
  };
  return {
    gameId: l.json.gameId,
    championId: r.championId,
    role: g,
    win: r.win,
    score: ky(Ob(pe, p)),
    breakdown: pe,
    metrics: {
      kills: I,
      deaths: w,
      assists: j,
      kda: V,
      killParticipation: J,
      damageShare: H,
      goldShare: Z,
      csPerMinute: Q,
      visionPerMinute: _
    }
  };
}
function Xd(l, i, c = {}) {
  const o = l.json.participants.find((r) => r.puuid === i);
  return o ? jy(l, o, { ...Qd, ...c }) : !0;
}
function Zd(l, i) {
  const c = l.filter((r) => Qe(r.json));
  if (!Number.isFinite(i) || i <= 0) return c;
  const o = `q_${i}`;
  return c.filter((r) => {
    var m;
    return r.json.queueId === i || ((m = r.metadata.tags) == null ? void 0 : m.includes(o));
  });
}
function wy(l) {
  return l >= 15 ? "legendary" : l >= 13.5 ? "carry" : l >= 12 ? "strong" : l >= 10.8 ? "reliable" : l >= 9.5 ? "balanced" : l >= 8 ? "unstable" : l >= 6.3 ? "risky" : "critical";
}
function Tb(l, i = 1) {
  const c = i < 0.55 ? "样本偏少，暂评" : "", o = Oy(wy(l));
  return `${c}${o}`;
}
function Ab(l) {
  const i = (l.teamPosition || l.individualPosition || l.lane || "").toUpperCase();
  return i === "TOP" ? "TOP" : i === "JUNGLE" ? "JUNGLE" : i === "MIDDLE" || i === "MID" ? "MIDDLE" : i === "BOTTOM" || i === "BOT" ? "BOTTOM" : i === "UTILITY" || i === "SUPPORT" ? "UTILITY" : "UNKNOWN";
}
function Cb(l) {
  const i = ft(Math.log1p(l.kda), Math.log1p(1.1), Math.log1p(6.2)), c = ft(l.killParticipation, 0.32, 0.72), o = 1 - ft(Tt(l.deaths, l.minutes), 0.18, 0.72);
  return _a(i * 0.38 + c * 0.42 + o * 0.2);
}
function Nb(l) {
  return l.win ? 100 : 18;
}
function xb(l, i, c, o) {
  let r = 0.29;
  l === "UTILITY" && (r = 0.2);
  const m = ft(o, l === "UTILITY" ? 0.06 : 0.1, r), g = Zt(i, "damagePerMinute") || Tt(i.totalDamageDealtToChampions, c), p = ho(l, {
    TOP: 650,
    JUNGLE: 560,
    MIDDLE: 730,
    BOTTOM: 760,
    UTILITY: 360,
    UNKNOWN: 620
  }), y = ft(g, p * 0.42, p);
  return _a(m * 0.68 + y * 0.32);
}
function Mb(l, i, c, o, r) {
  const m = Zt(i, "goldPerMinute") || Tt(i.goldEarned, c), g = ho(l, {
    TOP: 420,
    JUNGLE: 390,
    MIDDLE: 430,
    BOTTOM: 455,
    UTILITY: 285,
    UNKNOWN: 395
  }), p = ft(m, g * 0.58, g), y = r > 0 ? o / r : 0, v = ft(y, 0.55, l === "UTILITY" ? 1.05 : 1.28);
  return _a(v * 0.56 + p * 0.44);
}
function Ib(l, i, c, o) {
  const r = Tt(i.damageDealtToObjectives, o), m = Tt(i.damageDealtToObjectives, c), g = Zt(i, "dragonTakedowns") + Zt(i, "baronTakedowns"), p = Zt(i, "turretTakedowns") || i.turretTakedowns;
  let y = 230;
  l === "JUNGLE" ? y = 360 : l === "BOTTOM" && (y = 290);
  const v = ft(m, 20, y), S = ft(r, 0.08, l === "JUNGLE" ? 0.45 : 0.32), b = ft(g * 0.9 + p * 0.45, 0, 2.2);
  return _a(v * 0.38 + S * 0.32 + b * 0.3);
}
function Rb(l, i, c, o) {
  const r = ho(l, {
    TOP: 0.75,
    JUNGLE: 0.95,
    MIDDLE: 0.75,
    BOTTOM: 0.65,
    UTILITY: 1.65,
    UNKNOWN: 0.75
  }), m = ft(o, r * 0.28, r), g = Tt(
    i.wardsPlaced + i.wardsKilled + i.detectorWardsPlaced * 1.5 + Zt(i, "wardTakedowns") * 0.6 + Zt(i, "wardsGuarded") * 0.4,
    c
  ), p = ft(g, 0.05, l === "UTILITY" ? 0.75 : 0.35);
  return _a(m * 0.72 + p * 0.28);
}
function Ub(l, i, c, o) {
  const r = Tt(i.deaths, c), m = 1 - ft(r, 0.16, 0.7), p = ft(o, 0.08, l === "TOP" || l === "UTILITY" ? 0.32 : 0.24), y = Tt(
    i.damageSelfMitigated + i.totalHeal * 0.35 + i.totalHealsOnTeammates * 0.8 + i.totalDamageShieldedOnTeammates,
    c
  ), v = l === "UTILITY" || l === "TOP" ? 820 : 560, S = ft(y, v * 0.18, v);
  return _a(m * 0.46 + p * 0.32 + S * 0.22);
}
function zb(l, i) {
  const c = ho(l, {
    TOP: 7.2,
    JUNGLE: 5.8,
    MIDDLE: 7.4,
    BOTTOM: 7.8,
    UTILITY: 1.3,
    UNKNOWN: 6.2
  });
  return _a(ft(i, c * 0.35, c));
}
function Ob(l, i) {
  return rt(
    Object.entries(i).reduce((c, [o, r]) => c + l[o] * r, 0),
    0,
    100
  );
}
function Db(l, i) {
  return Object.keys(Vd).reduce((o, r) => (o[r] = Xl(l.map((m) => m.breakdown[r]), i), o), {});
}
function wb(l) {
  const i = oa(Object.values(l), (c) => c);
  return i <= 0 ? Vd : Object.entries(l).reduce((c, [o, r]) => (c[o] = r / i, c), {});
}
function ho(l, i) {
  return i[l] ?? i.UNKNOWN;
}
function jb(l, i) {
  const c = Math.max(i.fullConfidenceGames - i.minConfidenceGames, 1);
  return 0.35 + rt((l - i.minConfidenceGames) / c, 0, 1) * 0.65;
}
function kb(l) {
  if (l.length <= 1) return Qc;
  const i = Gb(l);
  return rt(100 - i * 14, mo, js);
}
function qb(l) {
  if (l.length < 8) return Qc;
  const i = Vc(l.slice(0, 5)), c = Vc(l.slice(5));
  return rt(Qc + (i - c) * 6.5, mo, js);
}
function Lb(l) {
  if (l.length < 8) return l;
  const i = [...l].sort((r, m) => r - m), c = D0(i, 0.05), o = D0(i, 0.95);
  return l.map((r) => rt(r, c, o));
}
function Bb(l, i) {
  return Math.pow(0.5, l / Math.max(i, 1));
}
function D0(l, i) {
  if (l.length === 0) return 0;
  const c = i * (l.length - 1), o = Math.floor(c), r = Math.ceil(c);
  if (o === r) return l[o];
  const m = c - o;
  return l[o] + (l[r] - l[o]) * m;
}
function Gb(l) {
  if (l.length === 0) return 0;
  const i = Vc(l), c = Vc(l.map((o) => Math.pow(o - i, 2)));
  return Math.sqrt(c);
}
function Xl(l, i) {
  const c = oa(i, (o) => o);
  return l.length === 0 || c <= 0 ? 0 : l.reduce((o, r, m) => o + r * (i[m] ?? 1), 0) / c;
}
function Vc(l) {
  return l.length === 0 ? 0 : oa(l, (i) => i) / l.length;
}
function oa(l, i) {
  return l.reduce((c, o) => c + Ic(i(o)), 0);
}
function Zt(l, i) {
  var o;
  const c = (o = l.challenges) == null ? void 0 : o[i];
  return typeof c == "number" && Number.isFinite(c) ? c : 0;
}
function w0(l, i) {
  var o;
  const c = (o = l.challenges) == null ? void 0 : o[i];
  return c === !0 || typeof c == "number" && c > 0;
}
function jy(l, i, c) {
  return !Qe(l.json) || c.skipEarlySurrender && (i.gameEndedInEarlySurrender || i.teamEarlySurrendered) ? !0 : c.skipAfkTeammate && Kb(l, i);
}
function Kb(l, i) {
  return w0(i, "hadAfkTeammate") ? !0 : l.json.participants.some((c) => c.teamId === i.teamId && c.puuid !== i.puuid && w0(c, "hadAfkTeammate"));
}
function ft(l, i, c) {
  return c === i ? l >= c ? 1 : 0 : rt((l - i) / (c - i), 0, 1);
}
function Tt(l, i) {
  return i > 0 ? l / i : 0;
}
function Ic(l) {
  return Number.isFinite(l) ? l : 0;
}
function _a(l) {
  return rt(l * 100, mo, js);
}
function ky(l) {
  const i = rt(l, mo, js) / js, c = rt(0.5 + (i - 0.5) * Sb, 0, 1);
  return ld + c * (zy - ld);
}
function rt(l, i, c) {
  return Math.min(c, Math.max(i, l));
}
const id = "data-sona-lobby-history", sd = "data-sona-lobby-stats", j0 = "data-sona-lobby-stats-text", Hb = [
  "button",
  "a",
  "input",
  "textarea",
  "select",
  '[role="button"]',
  "lol-uikit-flat-button",
  "lol-uikit-icon-button"
].join(","), Qb = 120;
let ra = !1, Hf = !1, gc = null, li = /* @__PURE__ */ new Map(), Jd = 0, Ja = /* @__PURE__ */ new Map(), rs = null, Ya = 0, Cs = 0, k0 = 0, ud = /* @__PURE__ */ new Map(), cd = [], fa = null, da = null;
function Vb(l, i, c) {
  da || (da = document.createElement("div"), da.id = "sona-lobby-member-match-history-root", document.body.appendChild(da), fa = Sa.createRoot(da));
  const o = () => {
    fa == null || fa.render(
      k.createElement(Za, { open: !1, onClose: o, puuid: "", playerName: "" })
    );
  };
  fa.render(
    k.createElement(Za, { open: !0, onClose: o, puuid: l, playerName: i, queueId: c })
  );
}
function qy() {
  fa && (fa.unmount(), fa = null), da && (da.remove(), da = null);
}
async function Xb(l, i) {
  const c = ud.get(l);
  if (c) return c;
  try {
    const o = await ne.getSummonerByPuuid(l), r = o.gameName && o.tagLine ? `${o.gameName}#${o.tagLine}` : i;
    return ud.set(l, r), r;
  } catch {
    return i;
  }
}
function Xc(l) {
  Ya += 1, od(), Ja.clear();
  const i = /* @__PURE__ */ new Map(), c = l && Qe(l.gameConfig);
  if (Jd = c ? l.gameConfig.queueId : 0, !c) {
    li = i, qy();
    return;
  }
  for (const o of (l == null ? void 0 : l.members) ?? []) {
    const r = {
      puuid: o.puuid,
      summonerId: o.summonerId,
      name: o.summonerName || `召唤师 ${o.summonerId}`
    };
    o.puuid && i.set(`puuid:${o.puuid}`, r), o.summonerId && i.set(`summoner:${o.summonerId}`, r);
  }
  li = i;
}
async function Zb() {
  if (li.size === 0) return;
  if (rs && k0 === Ya) return rs;
  k0 = Ya;
  const l = Jb().finally(() => {
    rs === l && (rs = null);
  });
  return rs = l, l;
}
async function Jb() {
  const l = Ya, i = Jd, c = [...new Map(
    [...li.values()].filter((m) => m.puuid).map((m) => [m.puuid, m])
  ).values()], o = oo(i), r = /* @__PURE__ */ new Map();
  await Promise.all(c.map(async (m) => {
    try {
      const p = (await ne.getSgpMatchHistory(m.puuid, {
        startIndex: 0,
        count: O.get("lobbyEnhancementFetchCount") || 50,
        tag: o || void 0
      })).games ?? [], y = Zd(p, i);
      let v = 0, S = 0, b = 0, N = 0, X = 0;
      for (const w of y) {
        const j = w.json.participants.find((F) => F.puuid === m.puuid);
        j && (Xd(w, m.puuid) || (v++, j.win && S++, b += j.kills, N += j.assists, X += j.deaths));
      }
      if (v === 0) return;
      const I = Dy(y, m.puuid);
      r.set(m.puuid, {
        winRate: S / v,
        kda: X === 0 ? b + N : (b + N) / X,
        score: (I == null ? void 0 : I.score) ?? null,
        total: v
      }), G.debug(
        "[LobbyHistory] %s 当前模式有效 %d 场 / 返回 %d 场 (queueId=%d)",
        m.name,
        v,
        p.length,
        i
      );
    } catch (g) {
      G.debug("[LobbyHistory] 拉取成员战绩失败: %s", m.name, g);
    }
  })), !(!ra || l !== Ya) && (Ja = r, Zc());
}
async function q0() {
  const l = ++Cs;
  try {
    const i = await ne.getLobby();
    if (!ra || l !== Cs) return;
    Xc(i), Zc(), Zb();
  } catch {
    if (!ra || l !== Cs) return;
    Xc(null), Ja.clear();
  }
}
function Yb(l) {
  const i = l.getAttribute("puuid") || "", c = Number(l.getAttribute("summoner-id") || 0);
  return li.get(`puuid:${i}`) ?? li.get(`summoner:${c}`) ?? null;
}
function L0(l, i) {
  const c = l.getBoundingClientRect();
  return i.clientY >= c.bottom - Qb;
}
function B0(l) {
  return l instanceof Element && !!l.closest(Hb);
}
function Pb(l) {
  return l >= 0.6 ? "#5bbd72" : l >= 0.5 ? "#c8aa6e" : "#e74c3c";
}
function Fb(l) {
  return l >= 4 ? "#5bbd72" : l >= 2.5 ? "#c8aa6e" : "#e74c3c";
}
function Wb(l) {
  return l >= 14.5 ? "#5bbd72" : l >= 11.2 ? "#c8aa6e" : "#e74c3c";
}
function _b(l) {
  let i = l.querySelector(`[${sd}]`);
  return i || (i = document.createElement("div"), i.setAttribute(sd, "true"), i.style.cssText = [
    "position:absolute",
    "top:12px",
    "left:50%",
    "transform:translateX(-50%)",
    "display:flex",
    "align-items:center",
    "gap:4px",
    "padding:3px 7px",
    "background:rgba(1,10,19,0.72)",
    "border:1px solid rgba(200,170,110,0.28)",
    "border-radius:3px",
    "font-size:10.5px",
    "line-height:1",
    "font-weight:700",
    "white-space:nowrap",
    "pointer-events:none",
    "box-shadow:0 2px 8px rgba(0,0,0,0.28)"
  ].join(";"), l.appendChild(i), i);
}
function G0(l, i) {
  const c = _b(l), o = i ? [
    `胜率 ${Math.round(i.winRate * 100)}%`,
    `KDA ${i.kda >= 99 ? "完美" : i.kda.toFixed(2)}`,
    `评分 ${i.score != null ? i.score.toFixed(1) : "--"}`
  ].join("|") : "战绩加载中...";
  if (c.getAttribute(j0) !== o) {
    if (c.setAttribute(j0, o), !i) {
      c.innerHTML = '<span style="color:#a09b8c">战绩加载中...</span>';
      return;
    }
    c.innerHTML = [
      `<span style="color:${Pb(i.winRate)}">胜率 ${Math.round(i.winRate * 100)}%</span>`,
      '<span style="color:#5c5b57">|</span>',
      `<span style="color:${Fb(i.kda)}">KDA ${i.kda >= 99 ? "完美" : i.kda.toFixed(2)}</span>`,
      '<span style="color:#5c5b57">|</span>',
      `<span style="color:${i.score != null ? Wb(i.score) : "#a09b8c"}">评分 ${i.score != null ? i.score.toFixed(1) : "--"}</span>`
    ].join("");
  }
}
function $b(l, i) {
  const c = Ya;
  if (l.hasAttribute(id)) {
    G0(l, Ja.get(i.puuid));
    return;
  }
  const o = l.style.position;
  l.setAttribute(id, "true"), l.style.position || (l.style.position = "relative"), G0(l, Ja.get(i.puuid));
  const r = (p) => {
    B0(p.target) || L0(l, p) && i.puuid && (p.preventDefault(), p.stopPropagation(), Xb(i.puuid, i.name).then((y) => {
      c === Ya && Vb(i.puuid, y, Jd || void 0);
    }));
  }, m = (p) => {
    l.style.cursor = L0(l, p) && !B0(p.target) ? "pointer" : "";
  }, g = () => {
    l.style.cursor = "";
  };
  l.addEventListener("click", r), l.addEventListener("mousemove", m), l.addEventListener("mouseleave", g), cd.push({ element: l, previousPosition: o, clickHandler: r, moveHandler: m, leaveHandler: g });
}
function Zc() {
  const l = document.querySelectorAll("lol-regalia-parties-v2-element[puuid], lol-regalia-parties-v2-element[summoner-id]");
  return l.length === 0 || l.forEach((i) => {
    const c = i, o = Yb(c);
    if (!(o != null && o.puuid)) return;
    const r = c.querySelector(".player-identity-container");
    r && $b(r, o);
  }), !0;
}
function od() {
  cd.forEach(({ element: l, previousPosition: i, clickHandler: c, moveHandler: o, leaveHandler: r }) => {
    l.removeEventListener("click", c), l.removeEventListener("mousemove", o), l.removeEventListener("mouseleave", r), l.removeAttribute(id), l.style.cursor = "", l.style.position = i, l.querySelectorAll(`[${sd}]`).forEach((m) => m.remove());
  }), cd = [];
}
function K0(l) {
  l && !ra ? (ra = !0, st.register(Zc), Hf = !0, gc = ne.observe(On.LOBBY, (i) => {
    if (i.eventType === "Delete") {
      Cs += 1, Xc(null), Ja.clear(), od();
      return;
    }
    q0();
  }), q0().then(() => {
    ra && G.info("Lobby member match history enabled ✓");
  })) : !l && ra && (Cs += 1, Hf && (st.unregister(Zc), Hf = !1), gc && (gc(), gc = null), ra = !1, Xc(null), Ja.clear(), ud.clear(), od(), qy(), G.info("Lobby member match history disabled"));
}
function Hl(l, i, c) {
  return new Promise((o, r) => {
    const m = setTimeout(() => {
      r(new Error(`[Timeout] ${c} 超过 ${i}ms 未返回`));
    }, i);
    l.then(
      (g) => {
        clearTimeout(m), o(g);
      },
      (g) => {
        clearTimeout(m), r(g);
      }
    );
  });
}
const H0 = {
  top: 1,
  jungle: 2,
  mid: 3,
  bot: 4,
  utility: 5
}, yc = (l) => [...l].sort((i, c) => {
  const o = H0[i.selectedPosition] ?? 99, r = H0[c.selectedPosition] ?? 99;
  return o - r;
}), vc = {
  CHALLENGER: "#f1c40f",
  GRANDMASTER: "#e74c3c",
  MASTER: "#9b59b6",
  DIAMOND: "#3498db",
  EMERALD: "#00d084",
  PLATINUM: "#b8c4cc",
  GOLD: "#c8aa6e",
  SILVER: "#a09b8c",
  BRONZE: "#cd7f32",
  IRON: "#7e7e7e",
  UNRANKED: "#5c5b57"
}, rd = ["#e8a424", "#4a9eff", "#5bbd72", "#e74c3c", "#c084fc"], eT = [
  "rgba(232, 164, 36, 0.15)",
  "rgba(74, 158, 255, 0.15)",
  "rgba(91, 189, 114, 0.15)",
  "rgba(231, 76, 60, 0.15)",
  "rgba(192, 132, 252, 0.15)"
], Q0 = 1e4, Qf = 15e3, tT = 45e3;
function V0({ open: l, onClose: i, mockData: c }) {
  const [o, r] = k.useState([]), [m, g] = k.useState([]), [p, y] = k.useState(null), [v, S] = k.useState(!1), [b, N] = k.useState(""), [X, I] = k.useState(/* @__PURE__ */ new Map()), w = k.useRef(0), j = k.useCallback(async () => {
    const H = ++w.current;
    if (S(!0), N(""), r([]), g([]), y(null), I(/* @__PURE__ */ new Map()), c) {
      if (H !== w.current) return;
      r(yc(c.blueTeam)), g(yc(c.redTeam)), y(c.gameInfo), S(!1);
      return;
    }
    try {
      const Z = await Hl(ne.getGameflowSession(), Q0, "getGameflowSession");
      if (H !== w.current) return;
      if (!co(Z)) throw new Error("仅支持召唤师峡谷对局");
      const K = Z.gameData.teamOne ?? [], Q = Z.gameData.teamTwo ?? [], _ = Z.gameData.playerChampionSelections ?? [], pe = 5, re = _.slice(0, pe), ue = _.slice(pe), ge = /* @__PURE__ */ new Map();
      for (const se of [...K, ...Q])
        ge.set(se.puuid, se);
      const Oe = (await Hl(ne.getSummonerInfo(), Q0, "getSummonerInfo")).puuid;
      if (H !== w.current) return;
      const we = K.some((se) => se.puuid === Oe) || re.some((se) => se.puuid === Oe);
      y({
        queueName: Z.gameData.queue.name,
        mapName: Z.map.name,
        isBlueTeam: we,
        queueId: Z.gameData.queue.id
      });
      const Le = /* @__PURE__ */ new Map(), z = /* @__PURE__ */ new Map();
      for (const se of [...K, ...Q]) {
        const le = se.teamParticipantId;
        le && le > 0 && (z.has(le) || z.set(le, []), z.get(le).push(se.puuid));
      }
      let Y = 0;
      z.forEach((se, le) => {
        if (se.length >= 2) {
          const Be = rd[Y % rd.length];
          Y++;
          const Ie = String.fromCharCode(65 + (Y - 1) % 26);
          for (const nn of se)
            Le.set(nn, Ie);
        }
      }), I(new Map(Le));
      const ae = Z.gameData.queue.id, Te = oo(ae), P = (se) => se.map((le) => {
        var Be;
        return {
          puuid: le.puuid,
          championId: le.championId,
          teamParticipantId: ((Be = ge.get(le.puuid)) == null ? void 0 : Be.teamParticipantId) ?? 0,
          isBroadcaster: !ge.has(le.puuid)
        };
      }), A = P(re), B = P(ue), W = async (se) => Promise.all(se.map(async (le) => {
        var nn;
        const Be = le.isBroadcaster, Ie = {
          puuid: le.puuid,
          summonerId: 0,
          summonerName: Be ? "未知" : "",
          championId: le.championId,
          teamParticipantId: le.teamParticipantId,
          selectedPosition: "",
          winRate: null,
          wins: 0,
          total: 0,
          kdaNum: 0,
          avgK: 0,
          avgD: 0,
          avgA: 0,
          rankText: "未定级",
          rankColor: vc.UNRANKED,
          rating: "",
          premadeGroup: Le.get(le.puuid) ?? null,
          recentGames: [],
          isBroadcaster: Be
        };
        try {
          const [an, Ea, el] = await Promise.all([
            Hl(ne.getSummonerByPuuid(le.puuid), Qf, `getSummonerByPuuid(${le.puuid})`).catch(() => null),
            Hl(ne.getRankedStats(le.puuid), Qf, `getRankedStats(${le.puuid})`).catch(() => null),
            Hl(ne.getSgpMatchHistory(le.puuid, {
              startIndex: 0,
              count: O.get("gameAnalysisFetchCount") || 50,
              tag: Te || void 0
            }), Qf, `getSgpMatchHistory(${le.puuid})`).catch(() => null)
          ]), Yt = an != null && an.gameName ? `${an.gameName} #${an.tagLine}` : "未知";
          let Dn = "未定级", wn = vc.UNRANKED;
          const Ws = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "EMERALD", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLENGER"], fi = { IV: 1, III: 2, II: 3, I: 4 };
          if (Ea && typeof Ea == "object") {
            const mt = Ea.queueMap;
            if (mt) {
              const fn = [];
              for (const [Pt, al] of [["RANKED_SOLO_5x5", "单排/双排"], ["RANKED_FLEX_SR", "灵活组排"]]) {
                const jt = mt[Pt];
                if (!jt) continue;
                const Ze = jt.tier ?? "", Nt = jt.division ?? "";
                Ze && Ze !== "UNRANKED" && fn.push({ key: Pt, label: al, tier: Ze, division: Nt });
              }
              if (fn.length > 0) {
                fn.sort((al, jt) => {
                  const Ze = Ws.indexOf(al.tier), Nt = Ws.indexOf(jt.tier);
                  return Ze !== Nt ? Nt - Ze : (fi[al.division] ?? 0) - (fi[jt.division] ?? 0);
                });
                const Pt = fn[0];
                Dn = Dd(Pt.tier) + (Pt.division && Pt.division !== "NA" ? ` ${Pt.division}` : "") + ` ${Pt.label}`, wn = vc[Pt.tier] ?? vc.UNRANKED;
              }
            }
          }
          if (!el || !((nn = el.games) != null && nn.length))
            return { ...Ie, summonerName: Yt, rankText: Dn, rankColor: wn, rating: "" };
          const di = Zd(el.games, ae);
          let dt = 0, ba = 0, tl = 0, nl = 0, _e = 0;
          const mi = [];
          for (const jn of di) {
            const mt = jn.json.participants.find((fn) => fn.puuid === le.puuid);
            mt && (Xd(jn, le.puuid) || (dt++, mt.win && ba++, tl += mt.kills, nl += mt.deaths, _e += mt.assists, mi.length < 5 && mi.push({
              championId: mt.championId,
              win: mt.win,
              kills: mt.kills,
              deaths: mt.deaths,
              assists: mt.assists
            })));
          }
          if (dt === 0)
            return { ...Ie, summonerName: Yt, rankText: Dn, rankColor: wn, rating: "" };
          const hi = dt > 0 ? ba / dt * 100 : 0, pi = nl === 0 ? tl + _e : (tl + _e) / nl;
          return {
            ...Ie,
            summonerName: Yt,
            winRate: hi,
            wins: ba,
            total: dt,
            kdaNum: pi,
            avgK: dt > 0 ? tl / dt : 0,
            avgD: dt > 0 ? nl / dt : 0,
            avgA: dt > 0 ? _e / dt : 0,
            rankText: Dn,
            rankColor: wn,
            rating: e2(hi, pi),
            recentGames: mi
          };
        } catch {
          return { ...Ie, summonerName: "未知" };
        }
      })), [$, fe] = await Hl(
        Promise.all([W(A), W(B)]),
        tT,
        "analyzeTeams"
      );
      if (H !== w.current) return;
      r(yc(we ? $ : fe)), g(yc(we ? fe : $));
    } catch (Z) {
      if (H !== w.current) return;
      const K = Z instanceof Error && Z.message.startsWith("[Timeout]");
      N(K ? "加载超时，客户端或网络可能正忙" : "暂无对局数据"), console.error("[GameAnalysis] 加载失败:", Z);
    } finally {
      H === w.current && S(!1);
    }
  }, [c]);
  k.useEffect(() => (l && j(), () => {
    w.current += 1;
  }), [l, j]);
  const F = (H) => {
    const Z = H.filter((K) => K.winRate != null);
    return Z.length === 0 ? null : Math.round(Z.reduce((K, Q) => K + Q.winRate, 0) / Z.length);
  }, V = F(o), J = F(m);
  return /* @__PURE__ */ f.jsx(oi, { open: l, onClose: i, width: 1160, height: 645, closable: !0, children: /* @__PURE__ */ f.jsxs("div", { className: "sga-container", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "sga-header", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "sga-header-left", children: [
        /* @__PURE__ */ f.jsx("span", { className: "sga-header-icon", children: "❖" }),
        /* @__PURE__ */ f.jsxs("span", { className: "sga-header-title", children: [
          "对局分析",
          /* @__PURE__ */ f.jsxs("span", { className: "sga-header-subtitle", children: [
            "(",
            `本模式近${O.get("gameAnalysisFetchCount") || 50}局`,
            ")"
          ] })
        ] })
      ] }),
      p && /* @__PURE__ */ f.jsxs("span", { className: "sga-header-info", children: [
        p.mapName,
        " · ",
        p.queueName
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: "sga-body", children: [
      v && /* @__PURE__ */ f.jsxs("div", { className: "sga-loading", children: [
        /* @__PURE__ */ f.jsx("div", { className: "sga-loading-spinner" }),
        /* @__PURE__ */ f.jsx("span", { children: "正在分析对局数据..." })
      ] }),
      b && /* @__PURE__ */ f.jsxs("div", { className: "sga-error", children: [
        /* @__PURE__ */ f.jsx("span", { children: b }),
        /* @__PURE__ */ f.jsx("button", { type: "button", className: "sga-retry", onClick: () => void j(), children: "重试" })
      ] }),
      !v && !b && (o.length > 0 || m.length > 0) && /* @__PURE__ */ f.jsxs("div", { className: "sga-teams", children: [
        /* @__PURE__ */ f.jsxs("div", { className: "sga-team", children: [
          /* @__PURE__ */ f.jsxs("div", { className: "sga-team-header sga-team-header--blue", children: [
            /* @__PURE__ */ f.jsx("span", { className: "sga-team-name", children: "蓝色方" }),
            V != null && /* @__PURE__ */ f.jsxs("span", { className: "sga-team-avg", children: [
              "平均胜率",
              " ",
              /* @__PURE__ */ f.jsxs("span", { className: `sga-team-avg-num ${V > 50 ? "sga-avg-green" : "sga-avg-red"}`, children: [
                V,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ f.jsx("div", { className: "sga-team-players", children: o.map((H, Z) => /* @__PURE__ */ f.jsx(X0, { player: H, isRed: !1, queueId: p == null ? void 0 : p.queueId }, H.puuid || Z)) })
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: "sga-team", children: [
          /* @__PURE__ */ f.jsxs("div", { className: "sga-team-header sga-team-header--red", children: [
            /* @__PURE__ */ f.jsx("span", { className: "sga-team-name", children: "红色方" }),
            J != null && /* @__PURE__ */ f.jsxs("span", { className: "sga-team-avg", children: [
              "平均胜率",
              " ",
              /* @__PURE__ */ f.jsxs("span", { className: `sga-team-avg-num ${J > 50 ? "sga-avg-green" : "sga-avg-red"}`, children: [
                J,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ f.jsx("div", { className: "sga-team-players", children: m.map((H, Z) => /* @__PURE__ */ f.jsx(X0, { player: H, isRed: !0, queueId: p == null ? void 0 : p.queueId }, H.puuid || Z)) })
        ] })
      ] }),
      !v && !b && o.length === 0 && m.length === 0 && /* @__PURE__ */ f.jsx("div", { className: "sga-empty", children: "暂无对局数据" })
    ] })
  ] }) });
}
function Vf(l, i) {
  const c = String(l);
  return i ? /* @__PURE__ */ f.jsx("span", { style: { color: "#ff4444" }, children: c }) : c;
}
function nT(l) {
  return l == null ? null : l >= 70 ? "#e8a424" : l >= 50 ? "#5bbd72" : l >= 30 ? "#e84057" : "#9b59b6";
}
function X0({ player: l, isRed: i, queueId: c }) {
  const o = l.winRate, r = nT(o), m = r ?? "#5c5b57", g = r ?? "#3c2e16", p = l.kdaNum >= 99 ? "完美" : l.kdaNum.toFixed(1), y = l.kdaNum >= 3 ? "#5bbd72" : "#e74c3c", v = l.premadeGroup, S = v ? v.charCodeAt(0) - 65 : -1, b = S >= 0 ? rd[S] ?? "#c8aa6e" : void 0, N = S >= 0 ? eT[S] ?? void 0 : void 0, X = () => {
    l.puuid && aT(l.puuid, l.summonerName || "???", c);
  };
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: `sga-player-wrapper ${i ? "sga-player-wrapper--red" : ""} ${l.isBroadcaster ? "sga-player-wrapper--broadcaster" : ""}`,
      style: {
        ...N ? { background: N } : {}
      },
      onClick: X,
      children: [
        /* @__PURE__ */ f.jsxs(
          "div",
          {
            className: `sga-player ${i ? "sga-player--red" : "sga-player--blue"}`,
            children: [
              /* @__PURE__ */ f.jsx("div", { className: "sga-player-champ", children: l.championId > 0 ? /* @__PURE__ */ f.jsx("img", { className: "sga-player-champ-img", src: Gc(l.championId), alt: "" }) : /* @__PURE__ */ f.jsx("div", { className: "sga-player-champ-placeholder" }) }),
              /* @__PURE__ */ f.jsxs("div", { className: "sga-player-info", children: [
                /* @__PURE__ */ f.jsxs("div", { className: "sga-player-name-row", children: [
                  /* @__PURE__ */ f.jsx("span", { className: "sga-player-name", children: l.summonerName || "???" }),
                  l.isBroadcaster && /* @__PURE__ */ f.jsx("span", { className: "sga-broadcaster-badge", children: "主播模式" }),
                  v && /* @__PURE__ */ f.jsx("span", { className: "sga-premade-badge", style: { background: b }, children: `${v}队` })
                ] }),
                /* @__PURE__ */ f.jsxs("span", { className: "sga-player-rank", style: { color: l.rankColor || "#5c5b57" }, children: [
                  i && l.rating ? /* @__PURE__ */ f.jsxs("span", { className: "sga-player-rating", children: [
                    l.rating,
                    " · "
                  ] }) : null,
                  l.rankText || "未定级",
                  !i && l.rating ? /* @__PURE__ */ f.jsxs("span", { className: "sga-player-rating", children: [
                    " · ",
                    l.rating
                  ] }) : null
                ] })
              ] }),
              /* @__PURE__ */ f.jsx("div", { className: "sga-player-winrate", children: o != null ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsxs("div", { className: "sga-winrate-text", children: [
                  /* @__PURE__ */ f.jsxs("span", { style: { color: m, fontWeight: "bold" }, children: [
                    o.toFixed(0),
                    "%"
                  ] }),
                  /* @__PURE__ */ f.jsx("span", { className: "sga-winrate-wl", children: /* @__PURE__ */ f.jsx("span", { className: "sga-wl-win", children: `${l.wins} 胜 / ${l.total - l.wins} 负` }) })
                ] }),
                /* @__PURE__ */ f.jsx("div", { className: "sga-winrate-bar", children: /* @__PURE__ */ f.jsx("div", { className: "sga-winrate-bar-fill", style: { width: `${o}%`, background: g } }) })
              ] }) : /* @__PURE__ */ f.jsx("span", { className: "sga-no-data", children: "无数据" }) }),
              /* @__PURE__ */ f.jsx("div", { className: "sga-player-kda", children: o != null ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { style: { color: y, fontWeight: "bold" }, children: p }),
                /* @__PURE__ */ f.jsx("span", { className: "sga-kda-label", children: " KDA" })
              ] }) : /* @__PURE__ */ f.jsx("span", { className: "sga-no-data", children: "—" }) })
            ]
          }
        ),
        l.recentGames.length > 0 ? /* @__PURE__ */ f.jsx("div", { className: "sga-recent", children: l.recentGames.map((I, w) => /* @__PURE__ */ f.jsxs("div", { className: `sga-recent-game ${I.win ? "sga-recent-win" : "sga-recent-loss"}`, children: [
          /* @__PURE__ */ f.jsx("img", { className: "sga-recent-champ", src: Gc(I.championId), alt: "" }),
          /* @__PURE__ */ f.jsxs("span", { className: "sga-recent-kda", children: [
            Vf(I.kills, I.kills >= I.deaths && I.kills >= I.assists),
            /* @__PURE__ */ f.jsx("span", { className: "sga-kda-slash", children: "/" }),
            Vf(I.deaths, I.deaths >= I.kills && I.deaths >= I.assists),
            /* @__PURE__ */ f.jsx("span", { className: "sga-kda-slash", children: "/" }),
            Vf(I.assists, I.assists >= I.kills && I.assists >= I.deaths)
          ] })
        ] }, w)) }) : null
      ]
    }
  );
}
let fs = null, ds = null;
function aT(l, i, c) {
  ds || (ds = document.createElement("div"), ds.id = "sona-game-analysis-match-modal-root", document.body.appendChild(ds), fs = Sa.createRoot(ds));
  const o = () => {
    fs == null || fs.render(
      k.createElement(Za, { open: !1, onClose: o, puuid: "", playerName: "" })
    );
  };
  fs.render(
    k.createElement(Za, { open: !0, onClose: o, puuid: l, playerName: i, queueId: c })
  );
}
let Ka = null, ma = null, on = null, Sc = 0, Ec = !1;
const lT = 240;
function Ly() {
  on != null && (window.clearTimeout(on), on = null), ma || (ma = document.createElement("div"), ma.id = "sona-game-analysis-root", document.body.appendChild(ma), Ka = Sa.createRoot(ma));
  const l = () => {
    dd = gs;
    const i = Ka;
    i == null || i.render(
      k.createElement(V0, { open: !1, onClose: l })
    ), G.info("[GameAnalysis] 战力分析弹窗已关闭 → dismissedGameId=%d", dd), on != null && window.clearTimeout(on), on = window.setTimeout(() => {
      on = null, Ka === i && Rc();
    }, lT);
  };
  Ka.render(
    k.createElement(V0, { open: !0, onClose: l })
  ), G.info("[GameAnalysis] 战力分析弹窗已显示");
}
function Rc() {
  on != null && (window.clearTimeout(on), on = null), Ka && (Ka.unmount(), Ka = null), ma && (ma.remove(), ma = null);
}
const fd = "data-sona-game-analysis";
function bc() {
  const l = document.querySelector(".game-in-progress-container");
  if (!l) return !1;
  if (l.querySelector(`[${fd}]`)) return !0;
  const i = document.createElement("lol-uikit-flat-button");
  return i.setAttribute(fd, "true"), i.textContent = "对局分析", i.addEventListener("click", (c) => {
    c.stopPropagation(), c.preventDefault(), Ly(), G.info("[GameAnalysis] 打开分析弹窗");
  }), l.appendChild(i), G.info("[GameAnalysis] 客户端内嵌按钮已注入 ✓"), !0;
}
function Xf() {
  document.querySelectorAll(`[${fd}]`).forEach((l) => l.remove());
}
let ua = !1, gs = 0, dd = 0, Ql = null;
function Z0(l) {
  l && !Ql ? (Ql = ne.observe(On.GAMEFLOW_PHASE_CHANGE, (i) => {
    if (i.data === "InProgress") {
      const o = ++Sc;
      ne.getGameflowSession().then((r) => {
        var g;
        if (o !== Sc || !Ql) return;
        if (!co(r)) {
          ua && (st.unregister(bc), ua = !1), Xf(), Rc();
          return;
        }
        ua || (st.register(bc), ua = !0);
        const m = ((g = r.gameData) == null ? void 0 : g.gameId) ?? 0;
        if (m > 0 && m === dd) {
          G.info("[GameAnalysis] 本局已被用户手动关闭，跳过自动弹窗 → gameId=%d", m);
          return;
        }
        !Ec && m > 0 && m !== gs && (Ec = !0, gs = m, Ly());
      }).catch(() => {
      });
    } else
      Sc += 1, gs = 0, Ec = !1, ua && (st.unregister(bc), ua = !1), Xf(), Rc();
  }), G.info("Game analysis popup enabled ✓")) : !l && Ql && (Sc += 1, Ql(), Ql = null, gs = 0, Ec = !1, ua && (st.unregister(bc), ua = !1), Xf(), Rc(), G.info("Game analysis popup disabled"));
}
const By = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%230093FF'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M10.148%2015v-1.554h1.484V6.894h-1.484V5.34h3.416v8.106h1.456V15z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", Gy = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%2300BBA3'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M9.165%2015v-4.298l1.064-1.064h2.478l.308-.308V7.188l-.322-.308h-1.246l-.322.308v1.05H9.193V6.572l1.218-1.232h3.304l1.246%201.246v3.64l-1.064%201.064h-2.478l-.308.308v1.778h3.836V15z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", Ky = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%23FFB900'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='m10.124%2015-1.232-1.232v-1.722h1.946v1.064l.406.406h1.4l.406-.406v-1.792l-.462-.476h-2.52V9.288h2.52l.462-.462V7.258l-.406-.406h-1.4l-.406.406V8.28H8.892V6.572l1.232-1.232h3.64l1.232%201.218v2.478l-1.008%201.008%201.008%201.022v2.716L13.778%2015z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", Hy = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%239AA4AF'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M12.672%2015v-2.548H8.64v-1.26L9.998%205.34h1.722l-1.092%205.502h2.044V5.34h1.932v5.502h.714v1.61h-.714V15z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", Qy = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%23A88A67'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='m10.327%2015-1.232-1.232V12.06h1.946v1.022l.392.392h1.218l.406-.406v-2.646l-.308-.322h-1.232l-.616.616H9.095V5.34h5.782v1.61h-3.836v2.31l.686-.686h2.128l1.148%201.148v4.032L13.757%2015z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", Yd = 5, iT = "/fe/lol-static-assets/images/ranked-mini-crests", sT = [
  { value: "all", label: "全部段位" },
  { value: "challenger", label: "最强王者" },
  { value: "grandmaster", label: "傲世宗师" },
  { value: "master_plus", label: "超凡大师+" },
  { value: "master", label: "超凡大师" },
  { value: "diamond_plus", label: "璀璨钻石+" },
  { value: "diamond", label: "璀璨钻石" },
  { value: "emerald_plus", label: "流光翡翠+" },
  { value: "emerald", label: "流光翡翠" },
  { value: "platinum_plus", label: "华贵铂金+" },
  { value: "platinum", label: "华贵铂金" },
  { value: "gold_plus", label: "荣耀黄金+" },
  { value: "gold", label: "荣耀黄金" },
  { value: "silver", label: "不屈白银" },
  { value: "bronze", label: "英勇黄铜" },
  { value: "iron", label: "坚韧黑铁" }
], uT = sT.map((l) => ({
  ...l,
  icon: cT(l.value)
})), J0 = ["top", "jungle", "mid", "adc", "support"];
function cT(l) {
  return l === "all" || l === "ibsg" ? "" : `${iT}/${l.replace("_plus", "")}.svg`;
}
const oT = 18, rT = 12;
function fT(l, i, c) {
  k.useLayoutEffect(() => {
    const o = l.current, r = i.current;
    if (!o || !r) return;
    const m = () => {
      let p = oT;
      for (r.style.fontSize = `${p}px`; p > rT && r.scrollWidth > r.clientWidth; )
        p -= 1, r.style.fontSize = `${p}px`;
    };
    m();
    const g = new ResizeObserver(m);
    return g.observe(o), () => g.disconnect();
  }, [l, i, c]);
}
function Vy({
  signal: l,
  context: i,
  recommendation: c,
  loadError: o,
  isLoading: r,
  selectedTier: m,
  onTierChange: g,
  onPositionChange: p,
  onClose: y
}) {
  const v = Ld(i.championId), S = v ? `${v.title} ${v.name}` : "未识别英雄", b = Wa(i.queueId), N = (c == null ? void 0 : c.position) ?? i.position, X = [b, Xy(N)].filter(Boolean).join(" · "), I = k.useRef(null), w = k.useRef(null);
  return fT(I, w, S), /* @__PURE__ */ f.jsxs("div", { className: "sobp", children: [
    /* @__PURE__ */ f.jsx("div", { className: "sobp-ambient" }),
    /* @__PURE__ */ f.jsxs("header", { className: "sobp-titlebar", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "sobp-title-main", children: [
        /* @__PURE__ */ f.jsx("div", { className: "sobp-champion-ring", children: /* @__PURE__ */ f.jsx("img", { src: `/lol-game-data/assets/v1/champion-icons/${i.championId}.png`, alt: "" }) }),
        /* @__PURE__ */ f.jsxs("div", { className: "sobp-title-text", ref: I, children: [
          /* @__PURE__ */ f.jsxs("div", { className: "sobp-title", children: [
            /* @__PURE__ */ f.jsx("span", { className: "sobp-title-mark", children: "❖" }),
            /* @__PURE__ */ f.jsx("span", { className: "sobp-title-name", ref: w, title: S, children: S })
          ] }),
          X && /* @__PURE__ */ f.jsx("div", { className: "sobp-mode-tag", children: X })
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: "sobp-title-actions", children: [
        /* @__PURE__ */ f.jsx(dT, { value: i.position, onChange: p }),
        /* @__PURE__ */ f.jsx(mT, { value: m, onChange: g }),
        /* @__PURE__ */ f.jsx(pT, { meta: c == null ? void 0 : c.meta }),
        /* @__PURE__ */ f.jsx(hT, { values: (c == null ? void 0 : c.summary) ?? [] })
      ] }),
      /* @__PURE__ */ f.jsx("button", { type: "button", className: "sobp-close", onClick: y, "aria-label": "关闭配装推荐", children: "×" })
    ] }),
    /* @__PURE__ */ f.jsxs("main", { className: "sobp-body", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "sobp-grid", children: [
        /* @__PURE__ */ f.jsx(bT, { title: "核心装备", builds: c == null ? void 0 : c.coreItems, itemLimit: 3 }),
        /* @__PURE__ */ f.jsx(NT, { title: "符文搭配", runes: c == null ? void 0 : c.runePages, championName: S, queueName: b, signal: l }),
        /* @__PURE__ */ f.jsx(AT, { title: "召唤师技能", builds: c == null ? void 0 : c.summonerSpells, limit: Yd })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: "sobp-trend-wrap", children: /* @__PURE__ */ f.jsx(TT, { title: "出装趋势", builds: c == null ? void 0 : c.lastItems }) }),
      /* @__PURE__ */ f.jsx(CT, { title: "优势 / 劣势对局", matchups: c == null ? void 0 : c.matchups }),
      r && /* @__PURE__ */ f.jsx(Tc, { children: "正在后台加载 OP.GG 推荐数据，完成后会自动刷新。" }),
      o && /* @__PURE__ */ f.jsx(Tc, { warning: !0, children: `OP.GG 请求失败：${o}` }),
      (c == null ? void 0 : c.warning) && /* @__PURE__ */ f.jsx(Tc, { warning: !0, children: c.warning }),
      !r && !o && !c && /* @__PURE__ */ f.jsx(Tc, { children: "暂无可用 OP.GG 推荐数据。" })
    ] })
  ] });
}
function dT({ value: l, onChange: i }) {
  const c = J0.includes(l) ? l : "mid";
  return /* @__PURE__ */ f.jsx("div", { className: "sobp-position-filter", title: "选择推荐分路", children: /* @__PURE__ */ f.jsx(
    Ga,
    {
      value: c,
      onChange: (o) => i(o),
      options: J0.map((o) => ({
        value: o,
        label: Xy(o)
      }))
    }
  ) });
}
function mT({ value: l, onChange: i }) {
  return /* @__PURE__ */ f.jsx("div", { className: "sobp-tier-filter", children: /* @__PURE__ */ f.jsx(
    Ga,
    {
      value: l,
      onChange: (c) => i(c),
      options: uT
    }
  ) });
}
function Xy(l) {
  switch (l) {
    case "top":
      return "上路";
    case "jungle":
      return "打野";
    case "mid":
      return "中路";
    case "adc":
      return "下路";
    case "support":
      return "辅助";
    default:
      return "";
  }
}
function hT({ values: l }) {
  return l.length === 0 ? null : /* @__PURE__ */ f.jsx("div", { className: "sobp-summary", children: l.map((i) => {
    const c = ST(i);
    return /* @__PURE__ */ f.jsx("div", { className: `sobp-summary-card sobp-summary-card--${c.kind}`, children: c.kind === "tier" ? /* @__PURE__ */ f.jsx(yT, { value: c.metric }) : /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      c.label && /* @__PURE__ */ f.jsx("span", { className: "sobp-summary-label", children: c.label }),
      /* @__PURE__ */ f.jsx("span", { className: "sobp-summary-value", children: c.metric })
    ] }) }, i);
  }) });
}
function pT({ meta: l }) {
  if (!l) return null;
  const i = gT(l.rankDelta);
  let c = "";
  return l.rank && (c = l.totalRank ? `${l.rank}/${l.totalRank}` : `#${l.rank}`), i.kind === "unknown" && c ? /* @__PURE__ */ f.jsx("div", { className: "sobp-meta", children: /* @__PURE__ */ f.jsx("div", { className: "sobp-meta-trend sobp-meta-trend--flat", children: /* @__PURE__ */ f.jsx("span", { className: "sobp-meta-rank", children: c }) }) }) : /* @__PURE__ */ f.jsx("div", { className: "sobp-meta", children: /* @__PURE__ */ f.jsxs("div", { className: `sobp-meta-trend sobp-meta-trend--${i.kind}`, children: [
    /* @__PURE__ */ f.jsx("span", { className: "sobp-meta-label", children: "趋势：" }),
    /* @__PURE__ */ f.jsx("span", { className: "sobp-meta-value", children: i.text }),
    c && /* @__PURE__ */ f.jsx("span", { className: "sobp-meta-rank", children: c })
  ] }) });
}
function gT(l) {
  return l == null ? { kind: "unknown", text: "暂无" } : l > 0 ? { kind: "up", text: `↑ ${l}` } : l < 0 ? { kind: "down", text: `↓ ${Math.abs(l)}` } : { kind: "flat", text: "持平" };
}
function yT({ value: l }) {
  const i = Number.parseInt(l.replace(/\D/g, ""), 10), c = vT(i);
  return c ? /* @__PURE__ */ f.jsx("img", { className: "sobp-tier-icon", src: c, alt: l, title: l }) : /* @__PURE__ */ f.jsx("span", { className: "sobp-summary-value", children: l });
}
function vT(l) {
  switch (l) {
    case 1:
      return By;
    case 2:
      return Gy;
    case 3:
      return Ky;
    case 4:
      return Hy;
    case 5:
      return Qy;
    default:
      return "";
  }
}
function ST(l) {
  const i = l.trim().split(/\s+/);
  if (i.length < 2) return { label: "", metric: l, kind: Y0(l) };
  const c = i.slice(0, -1).join(" "), o = i[i.length - 1];
  return c.toLowerCase() === "tier" ? { label: "", metric: ET(o), kind: "tier" } : {
    label: c,
    metric: o,
    kind: Y0(l)
  };
}
function ET(l) {
  const i = l.trim().replace(/^tier\s*/i, "");
  return i ? `T${i}` : "T-";
}
function Y0(l) {
  const i = l.toLowerCase();
  if (l.includes("胜率")) {
    const c = Number.parseFloat(l.replace(/[^\d.]/g, ""));
    return Number.isFinite(c) && c > 50 ? "win-high" : "win-low";
  }
  return l.includes("登场") ? "pick" : i.includes("tier") ? "tier" : l.includes("排名") ? "rank" : "default";
}
function Js({ title: l, children: i, empty: c = !1, emptyText: o }) {
  return /* @__PURE__ */ f.jsxs("section", { className: "sobp-section", children: [
    /* @__PURE__ */ f.jsxs("h3", { className: "sobp-section-title", children: [
      /* @__PURE__ */ f.jsx("span", {}),
      l
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: "sobp-section-card", children: c ? /* @__PURE__ */ f.jsx("div", { className: "sobp-empty", children: o ?? "暂无数据" }) : i })
  ] });
}
function bT({ title: l, builds: i, itemLimit: c }) {
  const o = (i == null ? void 0 : i.slice(0, Yd)) ?? [], r = Zy(o, 0.15);
  return /* @__PURE__ */ f.jsx(Js, { title: l, empty: o.length === 0, children: o.map((m, g) => /* @__PURE__ */ f.jsxs("div", { className: "sobp-row", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "sobp-row-main", children: [
      /* @__PURE__ */ f.jsx(Pd, { rank: g + 1 }),
      /* @__PURE__ */ f.jsx("div", { className: "sobp-icons sobp-icons--items", children: m.ids.slice(0, c).map((p, y, v) => {
        const S = Cy(p);
        return /* @__PURE__ */ f.jsxs("span", { className: "sobp-icon-step", children: [
          /* @__PURE__ */ f.jsx(Ha, { src: S.iconPath, title: S.name, description: S.description, price: S.price, size: 32 }),
          y < v.length - 1 && /* @__PURE__ */ f.jsx("span", { className: "sobp-arrow", children: "▶" })
        ] }, `${p}-${y}`);
      }) })
    ] }),
    /* @__PURE__ */ f.jsx(Fd, { value: m.pick_rate, maxRate: r })
  ] }, `${g}-${m.ids.join("-")}`)) });
}
function TT({ title: l, builds: i }) {
  const c = (i ?? []).flatMap((o, r) => o.ids.map((m, g) => ({
    id: m,
    key: `${r}-${g}-${m}`,
    pickRate: o.pick_rate
  }))).slice(0, 18);
  return /* @__PURE__ */ f.jsx(Js, { title: l, empty: c.length === 0, children: /* @__PURE__ */ f.jsx("div", { className: "sobp-last-items", children: c.map((o) => {
    const r = Cy(o.id);
    return /* @__PURE__ */ f.jsxs("div", { className: "sobp-last-item", children: [
      /* @__PURE__ */ f.jsx("div", { className: "sobp-last-item-rate", children: Wd(o.pickRate) }),
      /* @__PURE__ */ f.jsx(Ha, { src: r.iconPath, title: r.name, description: r.description, price: r.price, size: 34 })
    ] }, o.key);
  }) }) });
}
function AT({ title: l, builds: i, limit: c }) {
  const o = (i == null ? void 0 : i.slice(0, c)) ?? [], r = Zy(o, 1);
  return /* @__PURE__ */ f.jsx(Js, { title: l, empty: o.length === 0, children: o.map((m, g) => /* @__PURE__ */ f.jsxs("div", { className: "sobp-row", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "sobp-row-main", children: [
      /* @__PURE__ */ f.jsx(Pd, { rank: g + 1 }),
      /* @__PURE__ */ f.jsx("div", { className: "sobp-icons", children: [...m.ids].reverse().map((p) => {
        const y = bE(p);
        return /* @__PURE__ */ f.jsx(Ha, { src: y.iconPath || Ds(p), title: y.name || EE(p), description: y.description, size: 32 }, p);
      }) })
    ] }),
    /* @__PURE__ */ f.jsx(Fd, { value: m.pick_rate, maxRate: r })
  ] }, `${g}-${m.ids.join("-")}`)) });
}
function CT({ title: l, matchups: i }) {
  const c = i ?? [], o = [...c].sort((g, p) => p.winRate - g.winRate || p.play - g.play).slice(0, 9), r = [...c].sort((g, p) => g.winRate - p.winRate || p.play - g.play).slice(0, 9), m = o.length > 0 || r.length > 0;
  return /* @__PURE__ */ f.jsx("div", { className: "sobp-matchup-wrap", children: /* @__PURE__ */ f.jsx(Js, { title: l, empty: !m, emptyText: "暂无对局克制数据", children: /* @__PURE__ */ f.jsxs("div", { className: "sobp-matchup-columns", children: [
    /* @__PURE__ */ f.jsx(P0, { title: "优势对局", items: o, tone: "good" }),
    /* @__PURE__ */ f.jsx(P0, { title: "劣势对局", items: r, tone: "bad" })
  ] }) }) });
}
function P0({ title: l, items: i, tone: c }) {
  return /* @__PURE__ */ f.jsxs("div", { className: "sobp-matchup-group", children: [
    /* @__PURE__ */ f.jsx("div", { className: `sobp-matchup-heading sobp-matchup-heading--${c}`, children: l }),
    /* @__PURE__ */ f.jsx("div", { className: "sobp-matchup-list", children: i.map((o) => {
      const r = Ld(o.championId), m = r ? `${r.title} ${r.name}` : `英雄 ${o.championId}`;
      return /* @__PURE__ */ f.jsxs("div", { className: "sobp-matchup", children: [
        /* @__PURE__ */ f.jsx("img", { className: "sobp-matchup-icon", src: `/lol-game-data/assets/v1/champion-icons/${o.championId}.png`, alt: "" }),
        /* @__PURE__ */ f.jsxs("div", { className: "sobp-matchup-info", children: [
          /* @__PURE__ */ f.jsx("span", { className: "sobp-matchup-name", title: m, children: m }),
          /* @__PURE__ */ f.jsxs("span", { className: "sobp-matchup-detail", children: [
            /* @__PURE__ */ f.jsx("span", { className: `sobp-matchup-rate sobp-matchup-rate--${c}`, children: Wd(o.winRate) }),
            /* @__PURE__ */ f.jsxs("span", { className: "sobp-matchup-play", children: [
              o.play.toLocaleString("zh-CN"),
              "场"
            ] })
          ] })
        ] })
      ] }, `${c}-${o.championId}`);
    }) })
  ] });
}
function NT({ title: l, runes: i, championName: c, queueName: o, signal: r }) {
  const m = (i == null ? void 0 : i.slice(0, Yd)) ?? [], g = IT(m, 0.15), [p, y] = k.useState(""), [v, S] = k.useState(""), [b, N] = k.useState(""), X = async (I, w) => {
    const j = `${w}-${I.id}`;
    y(j), S(""), N("");
    try {
      const F = `${c} ${o} - Sona`;
      if (await ne.applyRunePage({
        name: F,
        primaryStyleId: I.primary_page_id,
        subStyleId: I.secondary_page_id,
        selectedPerkIds: [
          ...I.primary_rune_ids,
          ...I.secondary_rune_ids,
          ...I.stat_mod_ids
        ]
      }, r), r != null && r.aborted) return;
      S(j), Toast.success(`${c} ${o} 符文已应用 - Sona`);
    } catch {
      r != null && r.aborted || N(j);
    } finally {
      y("");
    }
  };
  return /* @__PURE__ */ f.jsx(Js, { title: l, empty: m.length === 0, emptyText: "不支持自定义符文", children: m.map((I, w) => {
    const j = `${w}-${I.id}`, F = I.primary_rune_ids[0] ?? 0, V = Bf(F);
    let J = "应用";
    return p === j ? J = "应用中" : v === j ? J = "已应用" : b === j && (J = "失败"), /* @__PURE__ */ f.jsxs("div", { className: "sobp-row", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "sobp-row-main", children: [
        /* @__PURE__ */ f.jsx(Pd, { rank: w + 1 }),
        /* @__PURE__ */ f.jsxs("div", { className: "sobp-runes", children: [
          /* @__PURE__ */ f.jsxs("div", { className: "sobp-rune-group", children: [
            /* @__PURE__ */ f.jsx(Ha, { src: V.iconPath || Wl(F), title: V.name || Lf(F), description: V.description, size: 32, border: "#c8aa6e", round: !0 }),
            /* @__PURE__ */ f.jsx("div", { className: "sobp-small-runes", children: I.primary_rune_ids.slice(1, 4).map((H) => {
              const Z = Bf(H);
              return /* @__PURE__ */ f.jsx(Ha, { src: Z.iconPath || Wl(H), title: Z.name || Lf(H), description: Z.description, size: 24, round: !0 }, H);
            }) })
          ] }),
          /* @__PURE__ */ f.jsx("span", { className: "sobp-rune-divider" }),
          /* @__PURE__ */ f.jsxs("div", { className: "sobp-rune-group", children: [
            /* @__PURE__ */ f.jsx(Ha, { src: Kc(I.secondary_page_id), title: TE(I.secondary_page_id), size: 24, round: !0 }),
            I.secondary_rune_ids.slice(0, 2).map((H) => {
              const Z = Bf(H);
              return /* @__PURE__ */ f.jsx(Ha, { src: Z.iconPath || Wl(H), title: Z.name || Lf(H), description: Z.description, size: 24, round: !0 }, H);
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: "sobp-rune-actions", children: [
        /* @__PURE__ */ f.jsx(Fd, { value: I.pick_rate, maxRate: g }),
        /* @__PURE__ */ f.jsx(
          "button",
          {
            type: "button",
            className: `sobp-apply-rune${v === j ? " sobp-apply-rune--done" : ""}${b === j ? " sobp-apply-rune--error" : ""}`,
            disabled: p === j,
            onClick: (H) => {
              H.stopPropagation(), X(I, w);
            },
            children: J
          }
        )
      ] })
    ] }, `${w}-${I.primary_rune_ids.join("-")}-${I.secondary_rune_ids.join("-")}`);
  }) });
}
function Pd({ rank: l }) {
  return /* @__PURE__ */ f.jsxs("div", { className: `sobp-rank${l === 1 ? " sobp-rank--first" : ""}`, children: [
    "#",
    l
  ] });
}
function Fd({ value: l, maxRate: i }) {
  const c = Number.isFinite(l) ? l ?? 0 : 0, o = i > 0 ? i : 1, r = Math.max(0, Math.min(100, c / o * 100));
  return /* @__PURE__ */ f.jsxs("div", { className: "sobp-stat", children: [
    /* @__PURE__ */ f.jsx("span", { children: Wd(l) }),
    /* @__PURE__ */ f.jsx("div", { className: "sobp-stat-track", children: /* @__PURE__ */ f.jsx("div", { className: "sobp-stat-fill", style: { width: `${r.toFixed(1)}%` } }) })
  ] });
}
function Ha({
  src: l,
  title: i,
  description: c = "",
  subtitle: o = "",
  price: r = 0,
  size: m,
  border: g = "#3c2e16",
  round: p = !1
}) {
  const y = {
    width: m,
    height: m,
    borderColor: g,
    borderRadius: p ? "50%" : 3
  };
  return l ? /* @__PURE__ */ f.jsx(F0, { title: i, description: c, subtitle: o, price: r, iconSrc: l, border: g, children: /* @__PURE__ */ f.jsx("img", { className: "sobp-icon", src: l, alt: "", style: y }) }) : /* @__PURE__ */ f.jsx(F0, { title: i, description: c, subtitle: o, price: r, iconSrc: l, border: g, children: /* @__PURE__ */ f.jsx("span", { className: "sobp-icon sobp-icon--missing", style: y, children: "?" }) });
}
function F0({
  title: l,
  description: i,
  subtitle: c,
  price: o = 0,
  iconSrc: r,
  border: m,
  children: g
}) {
  const p = k.useRef(null), y = k.useRef(null), v = k.useRef(null), [S, b] = k.useState(!1), [N, X] = k.useState(!1), [I, w] = k.useState({ left: 0, top: 0, arrowLeft: 0, placement: "top", ready: !1 }), j = xT(i);
  k.useLayoutEffect(() => {
    if (!S || !p.current || !y.current) return;
    const J = 8, H = 10, Z = p.current.getBoundingClientRect(), K = y.current.getBoundingClientRect(), Q = Z.left + Z.width / 2;
    let _ = Q - K.width / 2;
    _ = Math.max(J, Math.min(_, window.innerWidth - K.width - J));
    let pe = "top", re = Z.top - K.height - H;
    re < J && (pe = "bottom", re = Z.bottom + H), re + K.height > window.innerHeight - J && (re = Math.max(J, window.innerHeight - K.height - J));
    const ue = Math.max(14, Math.min(Q - _, K.width - 14));
    w({ left: _, top: re, arrowLeft: ue, placement: pe, ready: !0 });
    const ge = requestAnimationFrame(() => X(!0));
    return () => cancelAnimationFrame(ge);
  }, [S, l, i, c, o]);
  const F = () => {
    v.current != null && (window.clearTimeout(v.current), v.current = null), b(!0);
  }, V = () => {
    X(!1), v.current = window.setTimeout(() => {
      b(!1), v.current = null;
    }, 140);
  };
  return /* @__PURE__ */ f.jsxs(
    "span",
    {
      ref: p,
      className: "sobp-icon-tooltip-wrap",
      onMouseEnter: F,
      onMouseLeave: V,
      children: [
        g,
        S && Od.createPortal(
          /* @__PURE__ */ f.jsxs(
            "div",
            {
              ref: y,
              className: `sobp-official-tooltip sobp-official-tooltip--${I.placement}${I.ready && N ? " sobp-official-tooltip--ready" : ""}`,
              style: {
                left: I.left,
                top: I.top,
                "--sobp-tooltip-arrow-left": `${I.arrowLeft}px`
              },
              children: [
                /* @__PURE__ */ f.jsxs("div", { className: "sobp-official-tooltip-head", children: [
                  /* @__PURE__ */ f.jsx("span", { className: "sobp-official-tooltip-icon", style: { borderColor: m }, children: r ? /* @__PURE__ */ f.jsx("img", { src: r, alt: "" }) : "?" }),
                  /* @__PURE__ */ f.jsxs("div", { className: "sobp-official-tooltip-titlebox", children: [
                    /* @__PURE__ */ f.jsx("div", { className: "sobp-official-tooltip-title", children: l }),
                    o > 0 ? /* @__PURE__ */ f.jsxs("div", { className: "sobp-official-tooltip-price", children: [
                      /* @__PURE__ */ f.jsx("span", { className: "sobp-gold-icon", "aria-hidden": "true" }),
                      /* @__PURE__ */ f.jsx("span", { children: o })
                    ] }) : c && /* @__PURE__ */ f.jsx("div", { className: "sobp-official-tooltip-subtitle", children: c })
                  ] })
                ] }),
                (j.stats.length > 0 || j.effectTitle || j.effectBody) && /* @__PURE__ */ f.jsxs("div", { className: "sobp-official-tooltip-desc", children: [
                  j.stats.length > 0 && /* @__PURE__ */ f.jsx("div", { className: "sobp-official-tooltip-stats", children: j.stats.map((J) => /* @__PURE__ */ f.jsx("div", { children: J }, J)) }),
                  j.stats.length > 0 && (j.effectTitle || j.effectBody) && /* @__PURE__ */ f.jsx("div", { className: "sobp-official-tooltip-separator" }),
                  j.effectTitle && /* @__PURE__ */ f.jsx("div", { className: "sobp-official-tooltip-effect-title", children: j.effectTitle }),
                  j.effectBody && /* @__PURE__ */ f.jsx("div", { className: "sobp-official-tooltip-effect-body", children: j.effectBody })
                ] })
              ]
            }
          ),
          document.body
        )
      ]
    }
  );
}
function xT(l = "") {
  const i = l.trim();
  if (!i) return { stats: [], effectTitle: "", effectBody: "" };
  const c = i.split(/\n\s*\n/).map((r) => r.trim()).filter(Boolean);
  if (c.length >= 2) {
    const r = c[0].split(`
`).map((g) => g.trim()).filter(Boolean), m = c.slice(1).join(`

`).split(`
`).map((g) => g.trim()).filter(Boolean);
    return {
      stats: r,
      effectTitle: m[0] ?? "",
      effectBody: m.slice(1).join(`
`)
    };
  }
  const o = i.split(`
`).map((r) => r.trim()).filter(Boolean);
  return o.length >= 2 && o.slice(0, -1).every(MT) ? { stats: o, effectTitle: "", effectBody: "" } : {
    stats: [],
    effectTitle: o.length > 1 ? o[0] : "",
    effectBody: o.length > 1 ? o.slice(1).join(`
`) : o[0] ?? ""
  };
}
function MT(l) {
  return /^[+\d]/.test(l);
}
function Tc({ children: l, warning: i = !1 }) {
  return /* @__PURE__ */ f.jsx("div", { className: `sobp-message${i ? " sobp-message--warning" : ""}`, children: l });
}
function Zy(l, i) {
  return Math.max(i, ...l.map((c) => Number.isFinite(c.pick_rate) ? c.pick_rate : 0));
}
function IT(l, i) {
  return Math.max(i, ...l.map((c) => Number.isFinite(c.pick_rate) ? c.pick_rate : 0));
}
function Wd(l) {
  return Number.isFinite(l) ? `${((l ?? 0) * 100).toFixed(1)}%` : "-";
}
class Zf extends Error {
  constructor(c, o) {
    super(c);
    ct(this, "url");
    ct(this, "status");
    ct(this, "statusText");
    ct(this, "body");
    this.name = "OpggApiError", this.url = o.url, this.status = o.status, this.statusText = o.statusText, this.body = o.body;
  }
}
const Pl = class Pl {
  async getVersions(i = {}) {
    const { signal: c, timeoutMs: o } = i;
    return this.request("/api/global/champions/ranked/versions", { signal: c, timeoutMs: o });
  }
  async getChampionsTier(i) {
    const { tier: c, version: o, signal: r, timeoutMs: m } = i;
    return this.request("/api/global/champions/ranked", {
      params: { tier: c, version: o },
      signal: r,
      timeoutMs: m
    });
  }
  async getChampion(i) {
    const { id: c, tier: o, version: r, signal: m, timeoutMs: g } = i, p = i.position, y = `/api/global/champions/ranked/${c}/${p ?? "none"}`;
    return this.request(y, {
      params: { tier: o, version: r },
      signal: m,
      timeoutMs: g
    });
  }
  async request(i, c = {}) {
    var p, y;
    const o = new URL(i, Pl.BASE_URL);
    Object.entries(c.params ?? {}).forEach(([v, S]) => {
      S != null && S !== "" && o.searchParams.set(v, String(S));
    });
    const r = new AbortController(), m = window.setTimeout(() => r.abort(), c.timeoutMs ?? Pl.DEFAULT_TIMEOUT_MS), g = () => r.abort();
    (p = c.signal) == null || p.addEventListener("abort", g, { once: !0 });
    try {
      const v = await fetch(o.toString(), {
        method: "GET",
        mode: "cors",
        headers: { Accept: "application/json" },
        signal: r.signal
      }), S = await v.text(), b = RT(S);
      if (!v.ok)
        throw new Zf(`OP.GG 请求失败： ${v.status} ${v.statusText}`, {
          url: o.toString(),
          status: v.status,
          statusText: v.statusText,
          body: b
        });
      return b;
    } catch (v) {
      if (v instanceof Zf) throw v;
      const S = v instanceof Error ? v.message : String(v);
      throw new Zf(`OP.GG 请求失败： ${S}`, { url: o.toString() });
    } finally {
      window.clearTimeout(m), (y = c.signal) == null || y.removeEventListener("abort", g);
    }
  }
};
ct(Pl, "BASE_URL", "https://lol-api-champion.op.gg"), ct(Pl, "DEFAULT_TIMEOUT_MS", 1e4);
let md = Pl;
function RT(l) {
  if (!l) return null;
  try {
    return JSON.parse(l);
  } catch {
    return l;
  }
}
const Jc = new md(), Jy = "mid";
function Yy(l) {
  return l === "none" ? Jy : l;
}
function Ys(l) {
  const i = Ld(l);
  return i ? [i.title, i.name].filter(Boolean).join(" ") : `英雄 ${l}`;
}
function Py(l) {
  switch (l) {
    case "top":
      return "上路";
    case "jungle":
      return "打野";
    case "mid":
      return "中路";
    case "adc":
      return "下路";
    case "support":
      return "辅助";
    default:
      return "";
  }
}
async function UT(l, i) {
  if (l.championId <= 0 || !Qe(l)) return null;
  const c = Yy(l.position), o = await DT({
    id: l.championId,
    tier: i,
    position: c
  }), r = o.data;
  return {
    version: o.meta.version,
    position: c,
    summary: wT(o),
    summonerSpells: r.summoner_spells ?? [],
    starterItems: r.starter_items ?? [],
    boots: r.boots ?? [],
    coreItems: r.core_items ?? [],
    lastItems: r.last_items ?? [],
    runePages: r.runes ?? [],
    matchups: zT(r.counters),
    meta: OT(o)
  };
}
function zT(l) {
  return l.map((i) => ({
    championId: i.champion_id,
    play: i.play,
    win: i.win,
    winRate: i.play > 0 ? i.win / i.play : 0
  })).filter((i) => i.championId > 0 && i.play > 0);
}
function OT(l) {
  const i = l.data.summary.average_stats, c = "tier_data" in i ? i.tier_data : void 0;
  let o = i.rank > 0 ? i.rank : null;
  c && c.rank > 0 && (o = c.rank);
  const r = c != null && c.rank_prev && c.rank_prev > 0 ? c.rank_prev : null, m = CE().length || null;
  return {
    rank: o,
    previousRank: r,
    // 排名数字越小越强：从 #80 到 #60 记为上升 20。
    rankDelta: o != null && r != null ? r - o : null,
    totalRank: m,
    matchCount: l.meta.match_count ?? null,
    version: l.meta.version,
    updatedAt: l.meta.analyzed_at ?? l.meta.cached_at ?? ""
  };
}
async function DT(l) {
  try {
    return await Jc.getChampion(l);
  } catch (i) {
    if (!l.version) throw i;
    return G.warn(
      "[OPGG] 版本 %s 请求失败，回退到 OP.GG 最新版本:",
      l.version,
      i
    ), Jc.getChampion({ ...l, version: void 0 });
  }
}
function wT(l) {
  const i = l.data.summary.average_stats;
  return [
    `总体胜率 ${(i.win_rate * 100).toFixed(1)}%`,
    `登场 ${(i.pick_rate * 100).toFixed(1)}%`,
    `Tier ${i.tier || "-"}`
  ];
}
const jT = "[Sona]", kT = 2003, qT = [11];
function LT(l) {
  return {
    id: String(l),
    count: l === kT ? 2 : 1
  };
}
function Fy(l) {
  const i = /* @__PURE__ */ new Set(), c = [];
  for (const o of l) {
    const r = Number(o);
    !Number.isFinite(r) || r <= 0 || i.has(r) || (i.add(r), c.push(r));
  }
  return c;
}
function W0(l) {
  return Fy(l.flatMap((i) => i.ids));
}
function BT(l) {
  return l.map((i, c) => ({ id: i, index: c, price: SE(i) })).sort((i, c) => c.price - i.price || i.index - c.index).map((i) => i.id);
}
function _0(l) {
  return l.play > 0 ? l.win / l.play : 0;
}
function Ac(l) {
  return [...l].sort((i, c) => _0(c) - _0(i) || c.pick_rate - i.pick_rate || c.play - i.play);
}
function GT(l, i) {
  const c = Fy(i);
  return c.length === 0 ? null : {
    type: l,
    items: c.map(LT)
  };
}
function Cc(l, i, c) {
  const o = GT(i, c);
  o && l.push(o);
}
function KT(l) {
  const i = [], c = Ac(l.starterItems), o = Ac(l.boots), r = Ac(l.coreItems), m = Ac(l.lastItems);
  return c.slice(0, 3).forEach((g, p) => {
    Cc(i, `${p + 1}. 出门装`, g.ids);
  }), Cc(i, `${i.length + 1}. 鞋子`, W0(o)), r.slice(0, 5).forEach((g, p) => {
    Cc(i, `${i.length + 1}. 核心装 ${p + 1}`, g.ids);
  }), Cc(i, `${i.length + 1}. 后续装备`, BT(W0(m))), i;
}
function Wy(l) {
  return `sona-${l.championId}-ranked-${l.position}`;
}
function HT(l) {
  const i = Ys(l.championId), c = Py(l.position), o = Wa(l.queueId), r = c ? `${o}/${c}` : o;
  return `${jT} ${i} - ${r}`;
}
function QT(l, i) {
  if (!Qe(l)) return null;
  const c = KT(i);
  return c.length === 0 ? null : {
    uid: Wy(l),
    title: HT(l),
    type: "custom",
    mode: "any",
    map: "any",
    associatedChampions: [l.championId],
    associatedMaps: qT,
    blocks: c,
    preferredItemSlots: [],
    sortrank: 0,
    startedFrom: "blank"
  };
}
function VT(l, i) {
  return l.uid === i.uid || l.title === i.title;
}
function $0(l, i) {
  if (l.length !== i.length) return !1;
  const c = [...l].sort((r, m) => r - m), o = [...i].sort((r, m) => r - m);
  return c.every((r, m) => r === o[m]);
}
function XT(l, i) {
  return l.length !== i.length ? !1 : l.every((c, o) => {
    const r = i[o];
    return !r || c.type !== r.type || c.items.length !== r.items.length ? !1 : c.items.every((m, g) => {
      const p = r.items[g];
      return !!p && String(m.id) === String(p.id) && Number(m.count) === Number(p.count);
    });
  });
}
function ZT(l, i) {
  return l.uid === i.uid && l.title === i.title && l.type === i.type && l.mode === i.mode && $0(l.associatedChampions ?? [], i.associatedChampions) && $0(l.associatedMaps ?? [], i.associatedMaps) && XT(l.blocks ?? [], i.blocks);
}
function JT(l, i) {
  const c = [], o = /* @__PURE__ */ new Set();
  let r = !1, m = 0;
  for (const g of l) {
    const p = i.findIndex(
      (v) => VT(g, v)
    );
    if (p < 0) {
      c.push(g);
      continue;
    }
    if (o.has(p)) {
      r = !0, m += 1;
      continue;
    }
    o.add(p);
    const y = i[p];
    ZT(g, y) ? c.push(g) : (c.push(y), r = !0);
  }
  return i.forEach((g, p) => {
    o.has(p) || (c.push(g), r = !0);
  }), {
    itemSets: c,
    changed: r,
    removedDuplicates: m
  };
}
const YT = ".toggle-ability-previews-button", hd = "data-sona-opgg-build-hijacked", Yc = "sona-opgg-build-panel", pd = "data-sona-opgg-ingame-build", PT = "master_plus", ey = 1e3, FT = 1500, WT = 1500, _T = 500, $T = 2e3, eA = [
  "all",
  "challenger",
  "grandmaster",
  "master_plus",
  "master",
  "diamond_plus",
  "diamond",
  "emerald_plus",
  "emerald",
  "platinum_plus",
  "platinum",
  "gold_plus",
  "gold",
  "silver",
  "bronze",
  "iron"
], tA = ["top", "mid", "jungle", "adc", "support"], ty = 8;
let wt = null, Uc = null, Ns = null, Pc = "", xs = "", rn = null, Zl = 0, _l = null, gd = 0, Fc = !1, Ms = !1, yd = 0, oe = {
  championId: 0,
  queueId: 0,
  gameVersion: "",
  gameMode: "",
  position: "none"
}, ut = !1;
const vd = [], ya = /* @__PURE__ */ new Map(), Jf = /* @__PURE__ */ new Map();
let $l = null, Sd = "", Is = null, Jt = null, en = null, Pa = 0, Va = "", Wc = "", _c = "", _d = 0, $d = 0, $c = "", Qa = null, zc = null, eo = "", ei = "", Jl = null, Ed = "", bd = 0, Ct = new AbortController();
const Xa = /* @__PURE__ */ new Set(), Oc = /* @__PURE__ */ new Set(), Dc = /* @__PURE__ */ new Set(), wc = /* @__PURE__ */ new Set(), ks = /* @__PURE__ */ new Set(), qs = /* @__PURE__ */ new Set();
function _y(l) {
  const i = l.myTeam.find((c) => c.cellId === l.localPlayerCellId);
  return (i == null ? void 0 : i.championId) ?? 0;
}
function em(l) {
  return l.myTeam.find((i) => i.cellId === l.localPlayerCellId);
}
function po(l) {
  const i = em(l);
  if (!i || i.championId <= 0) return !1;
  const c = l.actions.flat(2).filter((o) => o.actorCellId === l.localPlayerCellId && o.type === "pick");
  return c.length === 0 ? !0 : c.some((o) => o.completed);
}
function Ps(l) {
  switch (l == null ? void 0 : l.trim().toLowerCase()) {
    case "top":
      return "top";
    case "jungle":
      return "jungle";
    case "middle":
    case "mid":
      return "mid";
    case "bottom":
    case "bot":
    case "adc":
      return "adc";
    case "utility":
    case "support":
      return "support";
    default:
      return "none";
  }
}
function nA(l) {
  const i = ro(l);
  return typeof (i == null ? void 0 : i.isRanked) == "boolean" ? i.isRanked : l === 420 || l === 440;
}
function aA(l) {
  var o, r;
  const i = Number((o = l.stats) == null ? void 0 : o.role_rate);
  if (Number.isFinite(i)) return i;
  const c = Number((r = l.stats) == null ? void 0 : r.pick_rate);
  return Number.isFinite(c) ? c : 0;
}
function lA(l) {
  const i = Jf.get(l);
  if (i) return i;
  const c = Jc.getChampionsTier({
    tier: l
  }).then((o) => {
    const r = /* @__PURE__ */ new Map();
    for (const m of o.data) {
      const g = m.positions;
      if (!Array.isArray(g)) continue;
      const p = g.map((y) => ({
        position: Ps(y.name),
        popularity: aA(y)
      })).filter((y) => y.position !== "none").sort((y, v) => v.popularity - y.popularity)[0];
      p && r.set(m.id, p.position);
    }
    return G.info("[OPGG] 英雄常见分路表已缓存 → tier=%s, champions=%d", l, r.size), r;
  }).catch((o) => {
    throw Jf.delete(l), o;
  });
  return Jf.set(l, c), c;
}
async function iA(l, i = ii()) {
  if (l <= 0) return null;
  try {
    return (await lA(i)).get(l) ?? null;
  } catch (c) {
    return G.warn("[OPGG] 获取英雄常见分路失败:", c), null;
  }
}
async function $y(l) {
  const i = {
    championId: l.championId,
    queueId: l.queueId,
    gameMode: l.gameMode,
    mapId: l.mapId,
    position: l.assignedPosition
  };
  if (!Qe(i)) return "none";
  if (nA(l.queueId) && l.assignedPosition !== "none")
    return G.info("[OPGG] 推荐分路使用排位分配位置 → %s", l.assignedPosition), l.assignedPosition;
  const c = await iA(l.championId);
  return c ? (G.info(
    "[OPGG] 推荐分路使用英雄最常见位置 → championId=%d, position=%s, queueId=%d",
    l.championId,
    c,
    l.queueId
  ), c) : l.assignedPosition !== "none" ? l.assignedPosition : (G.warn("[OPGG] 无法识别推荐分路，回退到中路 → championId=%d", l.championId), Jy);
}
async function sA(l) {
  var o, r, m, g, p, y, v, S;
  const i = ro(l);
  if (i) return { gameMode: i.gameMode, mapId: i.mapId };
  const c = await ne.getGameflowSession().catch(() => null);
  return ((r = (o = c == null ? void 0 : c.gameData) == null ? void 0 : o.queue) == null ? void 0 : r.id) !== l ? { gameMode: "" } : {
    gameMode: ((g = (m = c == null ? void 0 : c.gameData) == null ? void 0 : m.queue) == null ? void 0 : g.gameMode) || ((p = c == null ? void 0 : c.map) == null ? void 0 : p.gameMode) || "",
    mapId: ((y = c == null ? void 0 : c.map) == null ? void 0 : y.id) ?? ((S = (v = c == null ? void 0 : c.gameData) == null ? void 0 : v.queue) == null ? void 0 : S.mapId)
  };
}
function uA(l) {
  return Qe(l) && l.position === "none";
}
function tm(l) {
  const i = Yy(l.position), c = ii();
  return [
    l.championId,
    l.queueId,
    i,
    c,
    "latest"
  ].join("|");
}
function nm(l) {
  return eA.includes(l) ? l : PT;
}
function ii() {
  return nm(O.get("opggBuildRecommendationTier"));
}
function ri(l) {
  return !Qe(l) || l.championId <= 0 ? null : `${l.championId}:ranked`;
}
function Fs(l) {
  return !Qe(l) || l.championId <= 0 ? null : `${l.championId}:ranked`;
}
function Fa(l) {
  return l.primaryStyleId > 0 && l.subStyleId > 0 && Array.isArray(l.selectedPerkIds) && l.selectedPerkIds.length >= 6;
}
function si(l) {
  return l.spell1Id > 0 && l.spell2Id > 0 && l.spell1Id !== l.spell2Id;
}
function to(l) {
  return `${l.spell1Id}:${l.spell2Id}`;
}
function ui(l) {
  return `${l.primaryStyleId}:${l.subStyleId}:${l.selectedPerkIds.join(",")}`;
}
function ev(l, i, c) {
  const o = `${i}|${c}`, r = Date.now();
  if (o === Ed && r - bd < $T)
    return;
  Ed = o, bd = r;
  const m = Ys(l.championId), g = iv(l);
  Toast.success(`${m} ${g} 符文更改已保存 - Sona`);
}
function tv(l, i) {
  rn = {
    key: l,
    page: {
      primaryStyleId: i.primaryStyleId,
      subStyleId: i.subStyleId,
      selectedPerkIds: [...i.selectedPerkIds]
    }
  };
}
function nv(l, i) {
  Jl = {
    key: l,
    spells: { ...i }
  };
}
function av(l, i, c) {
  if (!O.get("smartBuildRecommendation") || !Fa(i)) return !1;
  const o = ri(l);
  if (!o) return !1;
  const r = { ...O.get("smartRunePages") }, m = r[o], g = !!(m && Fa(m));
  if (g && !ks.has(o)) return !1;
  const p = g ? ui(m) : "", y = ui(i);
  return p === y ? !1 : (r[o] = {
    primaryStyleId: i.primaryStyleId,
    subStyleId: i.subStyleId,
    selectedPerkIds: [...i.selectedPerkIds],
    updatedAt: Date.now()
  }, O.set("smartRunePages", r), ks.add(o), Wc = o, G.info("[OPGG] 已保存首次智能符文最终快照 → key=%s, reason=%s, signature=%s", o, c, y), ev(l, o, y), !0);
}
function lv(l, i, c) {
  if (!O.get("smartBuildRecommendation") || !si(i)) return !1;
  const o = Fs(l);
  if (!o) return !1;
  const r = { ...O.get("smartSummonerSpells") }, m = r[o], g = !!(m && si(m));
  if (g && !qs.has(o)) return !1;
  const p = g ? to(m) : "", y = to(i);
  return p === y ? !1 : (r[o] = {
    ...i,
    updatedAt: Date.now()
  }, O.set("smartSummonerSpells", r), qs.add(o), _c = o, G.info("[OPGG] 已保存首次召唤师技能最终快照 → key=%s, reason=%s, spells=%s", o, c, y), !0);
}
function cA(l, i) {
  const c = ri(l), o = Fs(l);
  let r = !1, m = !1;
  c && (rn == null ? void 0 : rn.key) === c && (r = av(l, rn.page, i)), o && (Jl == null ? void 0 : Jl.key) === o && (m = lv(l, Jl.spells, i)), (r || m) && G.info("[OPGG] 智能配置最终快照已落盘 → reason=%s, rune=%s, spells=%s", i, r, m);
}
async function oA(l, i, c) {
  if (!O.get("smartBuildRecommendation") || i.championId <= 0 || !po(l)) return;
  const o = Ct.signal, r = ri(i), m = Fs(i), g = `${r ?? "-"}|${m ?? "-"}`;
  if (wc.has(g)) return;
  const p = O.get("smartRunePages"), y = O.get("smartSummonerSpells"), v = !!(r && (ks.has(r) || !p[r] || !Fa(p[r]))), S = !!(m && (qs.has(m) || !y[m] || !si(y[m])));
  if (!(!v && !S)) {
    wc.add(g);
    try {
      let b = !1, N = !1;
      const X = em(l);
      if (S && m && X) {
        const I = { spell1Id: X.spell1Id, spell2Id: X.spell2Id };
        si(I) && (nv(m, I), N = lv(i, I, c));
      }
      if (v && r) {
        let I = (rn == null ? void 0 : rn.key) === r ? rn.page : null;
        if (!I) {
          const w = await ne.getRunePages(o);
          if (!O.get("smartBuildRecommendation") || !$a(i, o)) return;
          const j = uv(w);
          j && Fa(j) && (I = {
            primaryStyleId: j.primaryStyleId,
            subStyleId: j.subStyleId,
            selectedPerkIds: [...j.selectedPerkIds]
          }, tv(r, I));
        }
        I && (b = av(i, I, c));
      }
      (b || N) && G.info("[OPGG] 智能配置首次最终快照已保存 → reason=%s, rune=%s, spells=%s", c, b, N);
    } catch (b) {
      o.aborted || G.warn("[OPGG] 智能配置最终快照保存失败 → reason=%s:", c, b);
    } finally {
      o.aborted || wc.delete(g);
    }
  }
}
function va(l) {
  if (l.championId <= 0 || !Qe(l)) return null;
  const i = { ...l }, c = tm(i), o = ya.get(c);
  if (o) return o;
  const r = {
    key: c,
    context: i,
    updatedAt: Date.now(),
    promise: Promise.resolve(null)
  };
  return r.promise = UT(i, ii()).then((m) => (r.data = m, r.updatedAt = Date.now(), G.info("[OPGG] 配装推荐缓存完成 → %s", c), m)).catch((m) => (r.error = m instanceof Error ? m.message : String(m), r.data = null, r.updatedAt = Date.now(), G.warn("[OPGG] 配装推荐预拉取失败:", m), null)), ya.set(c, r), rA(), G.info("[OPGG] 开始后台预拉取配装推荐 → %s", c), r;
}
function rA() {
  if (ya.size <= ty) return;
  const l = Array.from(ya.values()).sort((i, c) => i.updatedAt - c.updatedAt);
  for (const i of l.slice(0, ya.size - ty))
    ya.delete(i.key);
}
function iv(l) {
  const i = Wa(l.queueId), c = Py(l.position);
  return c ? `${i}/${c}` : i;
}
function sv(l) {
  return `${Ys(l.championId)} ${Wa(l.queueId)} - Sona`;
}
function am(l) {
  return oe.championId === l.championId && oe.queueId === l.queueId && oe.gameMode === l.gameMode && oe.mapId === l.mapId && oe.position === l.position;
}
function lm() {
  Ct.abort(), Ct = new AbortController(), Xa.clear(), Oc.clear(), Dc.clear(), wc.clear(), Qa != null && window.clearTimeout(Qa), Qa = null, zc = null;
}
function $a(l, i) {
  return !i.aborted && ut && Qe(oe) && am(l);
}
function Yf() {
  return O.get("opggBuildRecommendation") || O.get("smartItemSetBuild");
}
function fA(l) {
  var g;
  if (!O.get("smartBuildRecommendation")) {
    G.info("[OPGG] 跳过符文保存：符文/召唤师技能自动配置未开启");
    return;
  }
  if (oe.championId <= 0 || !ut) {
    G.info("[OPGG] 跳过符文保存：英雄未锁定 → championId=%d, locked=%s", oe.championId, ut);
    return;
  }
  if (l.current === !1 && l.isActive === !1) {
    G.info("[OPGG] 跳过符文保存：非当前生效符文页 → name=%s, current=%s, isActive=%s", l.name, l.current, l.isActive);
    return;
  }
  if (!Fa(l)) {
    G.info("[OPGG] 跳过符文保存：符文页无效 → primaryStyleId=%d, subStyleId=%d, perks=%d", l.primaryStyleId, l.subStyleId, ((g = l.selectedPerkIds) == null ? void 0 : g.length) ?? 0);
    return;
  }
  const i = ri(oe);
  if (!i) {
    G.info("[OPGG] 跳过符文保存：无法生成 runeKey → championId=%d, gameMode=%s", oe.championId, oe.gameMode || "unknown");
    return;
  }
  const c = ui(l);
  if (c === $c && Date.now() < _d) {
    G.info("[OPGG] 跳过符文保存：与 Sona 自动恢复的符文相同 → key=%s, signature=%s", i, c);
    return;
  }
  const o = { ...O.get("smartRunePages") }, r = o[i], m = r ? ui(r) : "";
  o[i] = {
    primaryStyleId: l.primaryStyleId,
    subStyleId: l.subStyleId,
    selectedPerkIds: [...l.selectedPerkIds],
    updatedAt: Date.now()
  }, O.set("smartRunePages", o), ks.delete(i), G.info("[OPGG] 已保存智能符文 → key=%s, page=%s, signature=%s", i, sv(oe), c), m !== c && ev(oe, i, c);
}
function dA(l, i) {
  if (!O.get("smartBuildRecommendation") || Date.now() < $d || !ut || i.championId <= 0) return;
  const c = Fs(i);
  if (!c) return;
  const o = {
    spell1Id: l.spell1Id,
    spell2Id: l.spell2Id
  };
  if (!si(o)) return;
  const r = to(o);
  if (nv(c, o), eo !== c) {
    eo = c, ei = r;
    return;
  }
  if (ei === r) return;
  ei = r;
  const m = { ...O.get("smartSummonerSpells") };
  m[c] = {
    ...o,
    updatedAt: Date.now()
  }, O.set("smartSummonerSpells", m), qs.delete(c), G.info("[OPGG] 已保存智能召唤师技能 → key=%s, spells=%s", c, r);
}
function uv(l) {
  return l.find((i) => i.current) ?? l.find((i) => i.isActive) ?? null;
}
async function mA() {
  if (!O.get("smartBuildRecommendation") || oe.championId <= 0 || !ut) return;
  const l = ri(oe);
  if (!l) return;
  const i = { ...oe }, c = Ct.signal;
  try {
    const o = await ne.getRunePages(c);
    if (!O.get("smartBuildRecommendation") || !$a(i, c)) return;
    const r = uv(o);
    if (!r || !Fa(r)) return;
    const m = ui(r);
    if (tv(l, r), l !== Pc) {
      Pc = l, xs = m;
      return;
    }
    if (m === xs) return;
    G.info(
      "[OPGG] 轮询检测到符文页变化 → name=%s, id=%s, current=%s, isActive=%s, signature=%s",
      r.name,
      r.id,
      r.current,
      r.isActive,
      m
    ), xs = m, fA(r);
  } catch (o) {
    G.debug("[OPGG] 轮询符文页失败:", o);
  }
}
function hA() {
  O.get("smartBuildRecommendation") && Ns == null && (Pc = "", xs = "", Ns = window.setInterval(() => {
    mA();
  }, ey), G.info("[OPGG] 已启动符文页轮询（每 %dms 读取一次）", ey));
}
function cv() {
  Ns != null && (window.clearInterval(Ns), Ns = null), Pc = "", xs = "";
}
async function ov(l, i, c) {
  const o = () => O.get("smartItemSetBuild") && $a(i, c);
  if (!o()) return !1;
  const r = l.map(({ context: S, recommendation: b }) => QT(S, b)).filter((S) => S != null);
  if (r.length === 0)
    return G.warn("[OPGG] 装备集生成失败：没有可写入的装备 block"), !1;
  const m = await ne.getSummonerInfo();
  if (!o()) return !1;
  const g = await ne.getItemSets(m.summonerId, c);
  if (!o()) return !1;
  const p = Array.isArray(g == null ? void 0 : g.itemSets) ? g.itemSets : [], y = JT(p, r);
  if (!y.changed)
    return G.info("[OPGG] 自动装备集内容未变化，跳过写入：%s", r.map((S) => S.title).join(" | ")), !0;
  if (await ne.putItemSets(m.summonerId, {
    accountId: (g == null ? void 0 : g.accountId) ?? m.accountId ?? 0,
    itemSets: y.itemSets,
    timestamp: Date.now()
  }, c), !o()) return !1;
  G.info(
    "[OPGG] 自动装备集已同步：%d 个，清理重复项=%d → %s",
    r.length,
    y.removedDuplicates,
    r.map((S) => S.title).join(" | ")
  );
  const v = Ys(l[0].context.championId);
  return Toast.success(`${v} 出装已配备 - Sona`), !0;
}
function pA(l) {
  const i = `sona-${l.championId}-ranked-all`;
  if (Va === i || Xa.has(i)) return;
  Xa.add(i);
  const c = Ct.signal, o = tA.map((r) => {
    const m = { ...l, position: r };
    return { context: m, entry: va(m) };
  });
  Promise.all(o.map(({ entry: r }) => (r == null ? void 0 : r.promise) ?? Promise.resolve(null))).then(async (r) => {
    if (!O.get("smartItemSetBuild") || !$a(l, c) || Va === i) return;
    const m = o.map(({ context: g }, p) => ({ context: g, recommendation: r[p] })).filter(
      (g) => !!g.recommendation
    );
    m.length !== 0 && await ov(m, l, c) && (Va = i);
  }).catch((r) => {
    c.aborted || G.warn("[OPGG] 自动装备集同步失败:", r);
  }).finally(() => {
    c.aborted || Xa.delete(i);
  });
}
function no(l) {
  if (!O.get("smartItemSetBuild") || !ut) return;
  if (uA(l.context)) {
    pA(l.context);
    return;
  }
  const i = Wy(l.context);
  if (Va === i || Xa.has(i)) return;
  Xa.add(i);
  const c = Ct.signal;
  l.promise.then(async (o) => {
    !o || !O.get("smartItemSetBuild") || $a(l.context, c) && Va !== i && await ov([{ context: l.context, recommendation: o }], l.context, c) && (Va = i);
  }).catch((o) => {
    c.aborted || G.warn("[OPGG] 自动装备集同步失败:", o);
  }).finally(() => {
    c.aborted || Xa.delete(i);
  });
}
async function gA(l) {
  if (!O.get("smartBuildRecommendation") || !ut || !am(l)) return !1;
  const i = ri(l);
  if (!i || Wc === i || Oc.has(i)) return !1;
  const c = O.get("smartRunePages")[i];
  if (!c || !Fa(c)) return !1;
  Oc.add(i);
  const o = Ct.signal;
  try {
    $c = ui(c), _d = Date.now() + FT;
    const r = sv(l);
    return await ne.applyRunePage({
      name: r,
      primaryStyleId: c.primaryStyleId,
      subStyleId: c.subStyleId,
      selectedPerkIds: [...c.selectedPerkIds]
    }, o), !O.get("smartBuildRecommendation") || !$a(l, o) ? !1 : (Wc = i, G.info("[OPGG] 已自动应用智能符文 → key=%s, page=%s, signature=%s", i, r, $c), !0);
  } catch (r) {
    if (o.aborted) return !1;
    throw r;
  } finally {
    o.aborted || Oc.delete(i);
  }
}
async function yA(l) {
  if (!O.get("smartBuildRecommendation") || !ut || !am(l)) return !1;
  const i = Fs(l);
  if (!i || _c === i || Dc.has(i)) return !1;
  const c = O.get("smartSummonerSpells")[i];
  if (!c || !si(c)) return !1;
  Dc.add(i);
  const o = Ct.signal;
  try {
    return $d = Date.now() + WT, await ne.updateMySelection({
      spell1Id: c.spell1Id,
      spell2Id: c.spell2Id
    }, o), !O.get("smartBuildRecommendation") || !$a(l, o) ? !1 : (_c = i, eo = i, ei = to(c), G.info("[OPGG] 已自动恢复召唤师技能 → key=%s, spells=%s", i, ei), !0);
  } catch (r) {
    if (o.aborted) return !1;
    throw r;
  } finally {
    o.aborted || Dc.delete(i);
  }
}
async function vA(l) {
  const i = Ct.signal, [c, o] = await Promise.all([
    gA(l).catch((p) => (G.warn("[OPGG] 智能符文自动恢复失败:", p), !1)),
    yA(l).catch((p) => (G.warn("[OPGG] 智能召唤师技能自动恢复失败:", p), !1))
  ]);
  if (i.aborted || !c && !o) return;
  const r = Ys(l.championId), m = iv(l);
  let g = c ? "符文" : "召唤师技能";
  c && o && (g = "符文 & 召唤师技能"), Toast.success(`${r} ${m} ${g}已恢复 - Sona`);
}
function SA(l) {
  O.get("smartBuildRecommendation") && ut && (zc = { ...l }, Qa != null && window.clearTimeout(Qa), Qa = window.setTimeout(() => {
    const i = zc;
    zc = null, Qa = null, i && vA(i).catch((c) => {
      G.warn("[OPGG] 智能配置自动恢复失败:", c);
    });
  }, _T));
}
function Rs() {
  _l != null && (window.clearTimeout(_l), _l = null), gd = 0;
}
function Us(l = 250) {
  if (!wt || _l != null) return;
  const i = Ct.signal;
  _l = window.setTimeout(async () => {
    _l = null, gd++;
    try {
      const c = await ne.getGameflowPhase().catch(() => null);
      if (i.aborted || !wt) return;
      if (c !== "ChampSelect") {
        Rs();
        return;
      }
      const o = await ne.getChampSelectSession(), r = await fo(o);
      if (i.aborted || !wt) return;
      if (!r) {
        ci();
        return;
      }
      if (po(o)) {
        Rs(), await ao(o);
        return;
      }
    } catch {
    }
    i.aborted || !wt || (gd < 600 ? Us(500) : (Rs(), G.warn("[OPGG] 等待本地英雄锁定超时，未触发智能配置")));
  }, l);
}
async function ao(l) {
  var c;
  const i = ++Zl;
  try {
    const o = l ?? await ne.getChampSelectSession();
    if (i !== Zl) return;
    const r = em(o), m = o.queueId ?? 0, g = (r == null ? void 0 : r.championId) ?? _y(o), { gameMode: p, mapId: y } = await sA(m);
    if (i !== Zl) return;
    const v = Ps(r == null ? void 0 : r.assignedPosition);
    let S = v;
    if (Yf() && (S = await $y({ championId: g, queueId: m, gameMode: p, mapId: y, assignedPosition: v })), i !== Zl) return;
    if (ut = po(o), oe = {
      championId: g,
      queueId: m,
      gameVersion: oe.gameVersion,
      gameMode: p,
      mapId: y,
      position: S
    }, !Qe(oe)) {
      ci(!1);
      return;
    }
    if (hA(), r && dA(r, oe), Yf() && !oe.gameVersion && (oe.gameVersion = await ne.getGameVersion().catch(() => ""), i !== Zl))
      return;
    if (G.info(
      "[OPGG] ChampSelect context refreshed → championId=%d, queueId=%d, gameMode=%s, position=%s, version=%s",
      oe.championId,
      oe.queueId,
      oe.gameMode || "unknown",
      oe.position,
      oe.gameVersion || "unknown"
    ), oe.championId > 0) {
      O.get("opggBuildRecommendation") ? AA() : im();
      const b = Yf() ? va(oe) : null;
      if (b && ut && no(b), ut) {
        SA(oe);
        const N = (c = o.timer) == null ? void 0 : c.phase;
        (N === "FINALIZATION" || N === "GAME_STARTING") && oA(o, { ...oe }, `champ-select:${N}`);
      }
    } else
      ci(!1);
  } catch (o) {
    G.warn("[OPGG] 刷新选人上下文失败:", o);
  }
}
function Ls() {
  var l;
  Is && (Is.unmount(), Is = null), (l = document.getElementById(Yc)) == null || l.remove(), Sd = "", $l && (document.removeEventListener("mousedown", $l, !0), $l = null);
}
function rv() {
  if (!Jt) return;
  const l = () => rv();
  Jt.render(
    k.createElement(oi, {
      open: !1,
      onClose: l,
      width: 1120,
      height: 700,
      closable: !1,
      children: k.createElement("div")
    })
  ), window.setTimeout(() => {
    Jt && (Jt.unmount(), Jt = null), en && (en.remove(), en = null);
  }, 240);
}
function EA() {
  Pa += 1, Jt && (Jt.unmount(), Jt = null), en && (en.remove(), en = null);
}
function Bs(l, i, c) {
  en || (en = document.createElement("div"), en.id = "sona-opgg-ingame-modal-root", document.body.appendChild(en), Jt = Sa.createRoot(en));
  const o = (i == null ? void 0 : i.data) ?? null, r = (i == null ? void 0 : i.error) ?? "", m = !!(i && i.data === void 0 && !i.error), g = () => rv(), p = (v) => {
    const S = nm(v);
    O.set("opggBuildRecommendationTier", S), ya.delete(tm(l));
    const b = va(l), N = ++Pa;
    Bs(l, b, N), Pf(l, b, N);
  }, y = (v) => {
    const S = Ps(v);
    if (S === "none" || S === l.position) return;
    const b = { ...l, position: S };
    oe = { ...b };
    const N = va(b);
    N && ut && no(N);
    const X = ++Pa;
    Bs(b, N, X), Pf(b, N, X);
  };
  Jt.render(
    k.createElement(oi, {
      open: !0,
      onClose: g,
      width: 1120,
      height: 700,
      closable: !1,
      children: k.createElement(
        "div",
        { className: "sona-opgg-modal-content" },
        k.createElement(Vy, {
          signal: Ct.signal,
          context: l,
          recommendation: o,
          loadError: r,
          isLoading: m,
          selectedTier: ii(),
          onTierChange: p,
          onPositionChange: y,
          onClose: g
        })
      )
    })
  ), Pf(l, i, c);
}
function Pf(l, i, c) {
  !i || i.data !== void 0 || i.error || i.promise.then(() => {
    c !== Pa || !Jt || Bs(l, i, c);
  }).catch(() => {
    c !== Pa || !Jt || Bs(l, i, c);
  });
}
async function bA() {
  var b, N, X, I, w, j, F, V, J, H, Z, K;
  const [l, i] = await Promise.all([
    ne.getGameflowSession(),
    ne.getSummonerInfo()
  ]), c = (N = (b = l.gameData) == null ? void 0 : b.playerChampionSelections) == null ? void 0 : N.find((Q) => Q.puuid === i.puuid), r = [
    ...((X = l.gameData) == null ? void 0 : X.teamOne) ?? [],
    ...((I = l.gameData) == null ? void 0 : I.teamTwo) ?? []
  ].find((Q) => Q.puuid === i.puuid || Q.obfuscatedPuuid === i.puuid), m = (c == null ? void 0 : c.championId) || (r == null ? void 0 : r.championId) || oe.championId;
  if (!m)
    throw new Error("无法识别当前英雄");
  const g = ((j = (w = l.gameData) == null ? void 0 : w.queue) == null ? void 0 : j.id) ?? oe.queueId, p = ((V = (F = l.gameData) == null ? void 0 : F.queue) == null ? void 0 : V.gameMode) || ((J = l.map) == null ? void 0 : J.gameMode) || oe.gameMode, y = ((H = l.map) == null ? void 0 : H.id) ?? ((K = (Z = l.gameData) == null ? void 0 : Z.queue) == null ? void 0 : K.mapId), v = Ps((r == null ? void 0 : r.selectedPosition) || (r == null ? void 0 : r.selectedRole) || oe.position), S = await $y({
    championId: m,
    queueId: g,
    gameMode: p,
    mapId: y,
    assignedPosition: v
  });
  return {
    championId: m,
    queueId: g,
    gameVersion: oe.gameVersion || await ne.getGameVersion().catch(() => ""),
    gameMode: p,
    mapId: y,
    position: S
  };
}
async function TA() {
  if (!O.get("opggBuildRecommendation")) return;
  const l = ++Pa, i = Ct.signal, c = await bA();
  if (i.aborted || l !== Pa || !O.get("opggBuildRecommendation") || !Qe(c)) return;
  oe = { ...c };
  const o = va(c);
  Bs(c, o, l);
}
async function Td(l, i) {
  if (!O.get("opggBuildRecommendation")) return;
  const c = Ct.signal;
  i ? oe = { ...i } : oe.championId <= 0 ? await ao() : ao();
  const o = i ? { ...i } : { ...oe };
  if (c.aborted || !O.get("opggBuildRecommendation") || !Qe(o)) return;
  const r = va(o), m = (r == null ? void 0 : r.data) ?? null, g = (r == null ? void 0 : r.error) ?? "", p = !!(r && r.data === void 0 && !r.error);
  Ls(), Sd = (r == null ? void 0 : r.key) ?? "";
  const y = document.getElementById("lol-uikit-layer-manager-wrapper") ?? document.body, v = document.createElement("div");
  v.id = Yc, v.style.cssText = [
    "position:fixed",
    "inset:0",
    "z-index:19002",
    "width:0",
    "height:0",
    "overflow:visible",
    "pointer-events:none"
  ].join(";");
  const S = document.createElement("div");
  S.style.cssText = [
    "position:absolute",
    "opacity:0",
    "visibility:hidden",
    "pointer-events:auto",
    "transition:opacity 0.16s ease-out"
  ].join(";"), v.appendChild(S);
  const b = document.createElement("lol-uikit-tooltip");
  b.setAttribute("data-tooltip-position", "top"), S.appendChild(b);
  const N = document.createElement("div");
  N.style.cssText = [
    "width:1060px",
    "max-width:calc(100vw - 56px)",
    "background:#010a13",
    "direction:ltr",
    "color:#a09b8c",
    "font-family:var(--font-body), -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    "-webkit-font-smoothing:subpixel-antialiased",
    "font-size:12px",
    "font-weight:400",
    "letter-spacing:.025em",
    "line-height:16px"
  ].join(";"), b.appendChild(N);
  const X = Sa.createRoot(N);
  Is = X;
  const I = (K) => {
    const Q = nm(K);
    O.set("opggBuildRecommendationTier", Q), ya.delete(tm(o));
    const _ = va(o);
    _ && no(_), Td(l, o);
  }, w = (K) => {
    const Q = Ps(K);
    if (Q === "none" || Q === o.position) return;
    const _ = { ...o, position: Q };
    oe = { ..._ };
    const pe = va(_);
    pe && ut && no(pe), Td(l, _);
  };
  ny(
    X,
    o,
    m,
    g,
    p,
    ii(),
    I,
    w
  ), y.appendChild(v);
  const j = l.getBoundingClientRect(), F = S.offsetWidth, V = S.offsetHeight, J = 8, H = Math.max(20, Math.min(j.left + j.width / 2 - F / 2, window.innerWidth - F - 20)), Z = Math.max(20, j.top - V - J);
  S.style.left = `${H}px`, S.style.top = `${Z}px`, S.style.visibility = "visible", S.style.opacity = "1", $l = (K) => {
    const Q = K.target;
    !v.contains(Q) && !l.contains(Q) && Ls();
  }, requestAnimationFrame(() => {
    $l && document.addEventListener("mousedown", $l, !0);
  }), r && p && r.promise.then(() => {
    if (document.getElementById(Yc) !== v || Sd !== r.key || Is !== X) return;
    ny(
      X,
      r.context,
      r.data ?? null,
      r.error ?? "",
      !1,
      ii(),
      I,
      w
    );
    const K = l.getBoundingClientRect(), Q = S.offsetWidth, _ = S.offsetHeight, pe = Math.max(20, Math.min(K.left + K.width / 2 - Q / 2, window.innerWidth - Q - 20)), re = Math.max(20, K.top - _ - J);
    S.style.left = `${pe}px`, S.style.top = `${re}px`;
  });
}
function ny(l, i, c, o, r, m, g, p) {
  Od.flushSync(() => {
    l.render(k.createElement(Vy, {
      signal: Ct.signal,
      context: i,
      recommendation: c,
      loadError: o,
      isLoading: r,
      selectedTier: m,
      onTierChange: g,
      onPositionChange: p,
      onClose: Ls
    }));
  });
}
function fv() {
  if (!Qe(oe)) return !1;
  const l = document.querySelectorAll(`${YT}:not([${hd}])`);
  return l.length === 0 ? (G.info("[OPGG] 未找到技能预览面板元素"), !1) : (l.forEach((i) => {
    if (!(i instanceof HTMLElement)) return;
    const c = i.innerText, o = (r) => {
      if (r.stopPropagation(), r.stopImmediatePropagation(), r.preventDefault(), document.getElementById(Yc)) {
        Ls();
        return;
      }
      Td(i);
    };
    i.setAttribute(hd, "true"), i.innerText = "配装推荐", i.style.cursor = "pointer", i.addEventListener("click", o, !0), vd.push({ el: i, handler: o, originalText: c });
  }), G.info("[OPGG] 已接管技能预览面板点击 → %d 个元素", l.length), !0);
}
function dv() {
  const l = document.querySelector(".game-in-progress-container");
  if (!l) return !1;
  if (l.querySelector(`[${pd}]`)) return !0;
  const i = document.createElement("lol-uikit-flat-button");
  i.setAttribute(pd, "true"), i.textContent = "配装推荐", i.addEventListener("click", (o) => {
    o.stopPropagation(), o.preventDefault(), TA().catch((r) => {
      G.warn("[OPGG] 游戏内配装推荐弹窗打开失败:", r), typeof Toast < "u" && Toast.error("配装推荐打开失败，请稍后再试");
    });
  });
  const c = l.querySelector("[data-sona-game-analysis]");
  return (c == null ? void 0 : c.parentElement) === l ? c.insertAdjacentElement("afterend", i) : l.appendChild(i), G.info("[OPGG] 游戏内配装推荐按钮已注入 ✓"), !0;
}
function Ad() {
  if (!O.get("opggBuildRecommendation") || Ms) return;
  const l = ++yd;
  ne.getGameflowSession().then((i) => {
    l === yd && O.get("opggBuildRecommendation") && (!co(i) || Ms || (st.register(dv), Ms = !0));
  }).catch(() => {
  });
}
function lo() {
  yd += 1, Ms && (st.unregister(dv), Ms = !1), document.querySelectorAll(`[${pd}]`).forEach((l) => l.remove()), EA();
}
function AA() {
  Fc || (st.register(fv), Fc = !0, G.info("[OPGG] 已检测到本地英雄，开始接管技能预览入口"));
}
function im() {
  Fc && (st.unregister(fv), Fc = !1);
  for (const { el: l, handler: i, originalText: c } of vd)
    l.removeEventListener("click", i, !0), l.removeAttribute(hd), l.innerText = c, l.style.cursor = "";
  vd.length = 0, Ls();
}
function ci(l = !0) {
  Zl += 1, lm(), Rs(), cv(), im(), l && (oe = {
    championId: 0,
    queueId: 0,
    gameVersion: oe.gameVersion,
    gameMode: "",
    position: "none"
  }), ut = !1, Va = "", Wc = "", _c = "", $c = "", _d = 0, $d = 0, eo = "", ei = "", rn = null, Jl = null, Ed = "", bd = 0, ks.clear(), qs.clear();
}
function CA() {
  wt || (wt = ne.observe(On.GAMEFLOW_PHASE_CHANGE, (l) => {
    const i = l.data;
    (i === "GameStart" || i === "InProgress") && ut && oe.championId > 0 && cA({ ...oe }, `gameflow:${i}`), i === "ChampSelect" ? (lo(), G.info("[OPGG] 进入 ChampSelect，等待本地英雄锁定"), Us()) : i === "InProgress" ? (ci(), Ad()) : (lo(), ci());
  }), Uc = ne.observe(On.CHAMP_SELECT, (l) => {
    if (l.eventType !== "Create" && l.eventType !== "Update") return;
    const i = l.data;
    (i.queueId !== oe.queueId || _y(i) !== oe.championId) && (lm(), ut = !1), po(i) ? (Rs(), ao(i)) : Us(500);
  }), ne.getGameflowPhase().then((l) => {
    wt && (l === "ChampSelect" ? Us() : l === "InProgress" && Ad());
  }).catch(() => {
  }), G.info("[OPGG] 配装推荐接管已启用 ✓"));
}
function NA(l) {
  if (l && !wt)
    CA();
  else if (l && wt)
    lm(), O.get("smartBuildRecommendation") || cv(), O.get("opggBuildRecommendation") || (im(), lo()), ne.getGameflowPhase().then((i) => {
      wt && (i === "ChampSelect" ? Us() : i === "InProgress" && Ad());
    }).catch(() => {
    });
  else if (!l) {
    if (!wt) return;
    wt(), wt = null, lo(), Uc && (Uc(), Uc = null), ci(), G.info("[OPGG] 配装推荐接管已禁用");
  }
}
const xA = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%23E84057'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='m6.666%2015-1.274-1.274V6.614L6.666%205.34h3.598l1.274%201.274v7.112L10.264%2015zm1.12-1.54H9.13l.462-.462V7.342L9.13%206.88H7.786l-.462.462v5.656zM12.854%2015V5.34h4.802l1.26%201.274v3.654l-1.26%201.274H14.8V15zm1.946-4.914h1.75l.42-.434V7.23l-.42-.434H14.8z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", mv = [
  { selector: ".champion-grid-champion-thumbnail", size: 22, left: -2, top: 0 },
  { selector: ".champion-card-component-click-target", size: 22, left: -2, top: 0 }
], MA = { size: 20, left: -2, top: "auto", bottom: -2 }, IA = mv.map((l) => l.selector).join(","), sm = "data-sona-champ-tier-badge", jc = "data-sona-original-position", RA = "emerald_plus", UA = [
  "all",
  "challenger",
  "grandmaster",
  "master_plus",
  "master",
  "diamond_plus",
  "diamond",
  "emerald_plus",
  "emerald",
  "platinum_plus",
  "platinum",
  "gold_plus",
  "gold",
  "silver",
  "bronze",
  "iron"
], zA = /* @__PURE__ */ new Map([
  [0, xA],
  [1, By],
  [2, Gy],
  [3, Ky],
  [4, Hy],
  [5, Qy]
]), um = /* @__PURE__ */ new Map([
  [0, "OP"],
  [1, "T1"],
  [2, "T2"],
  [3, "T3"],
  [4, "T4"],
  [5, "T5"]
]);
let ms = null, Nc = null, io = !1, tn = /* @__PURE__ */ new Map(), At = null, ti = "", ys = 0;
const Ff = /* @__PURE__ */ new Map();
function OA(l) {
  return UA.includes(l) ? l : RA;
}
function hv() {
  return OA(O.get("opggBuildRecommendationTier"));
}
function DA(l) {
  var c, o;
  const i = l.positions.filter((r) => {
    var m, g;
    return Number.isFinite((g = (m = r.stats) == null ? void 0 : m.tier_data) == null ? void 0 : g.tier);
  }).sort((r, m) => r.stats.tier_data.tier - m.stats.tier_data.tier)[0];
  return i ? {
    tier: i.stats.tier_data.tier,
    winRate: ay(i.stats.win_rate)
  } : {
    tier: wA((c = l.average_stats) == null ? void 0 : c.tier),
    winRate: ay((o = l.average_stats) == null ? void 0 : o.win_rate)
  };
}
function wA(l) {
  return typeof l == "number" && Number.isFinite(l) && l >= 0 && l <= 5 ? l : null;
}
function ay(l) {
  return typeof l == "number" && Number.isFinite(l) && l >= 0 ? l : null;
}
function jA(l) {
  const i = /* @__PURE__ */ new Map();
  for (const c of l.data) {
    const o = DA(c);
    (o.tier != null || o.winRate != null) && i.set(c.id, o);
  }
  return i;
}
function kA(l = hv()) {
  const i = l, c = Ff.get(i);
  if (c != null && c.data) return Promise.resolve(c.data);
  if (c != null && c.promise) return c.promise;
  const o = {};
  return o.promise = Jc.getChampionsTier({ tier: l }).then(jA).then((r) => (o.data = r, o.promise = void 0, G.info("[ChampTier] 已缓存 OP.GG 英雄 T 级 → tier=%s, count=%d", l, r.size), r)).catch((r) => {
    throw o.promise = void 0, Ff.delete(i), G.warn("[ChampTier] OP.GG 英雄 T 级预加载失败 → tier=%s:", l, r), r;
  }), Ff.set(i, o), o.promise;
}
async function pv(l) {
  const i = ++ys, c = l ?? await ne.getChampSelectSession().catch(() => null);
  At = c;
  const o = c && await fo(c);
  if (i !== ys) return;
  if (!o) {
    ti = "", tn = /* @__PURE__ */ new Map(), go();
    return;
  }
  const r = hv(), m = r;
  if (m === ti && tn.size > 0) {
    Gs();
    return;
  }
  ti = m, G.info("[ChampTier] 读取英雄 T 级缓存 → tier=%s, queueId=%d", r, c.queueId);
  try {
    const g = await kA(r);
    if (i !== ys) return;
    tn = g, Gs();
  } catch {
    if (i !== ys) return;
    tn = /* @__PURE__ */ new Map();
  }
}
function qA(l) {
  var c, o, r;
  const i = [
    l,
    l.parentElement,
    l.closest(".champion-card-component"),
    l.closest(".champion-grid-champion"),
    l.closest("[data-champion-id]"),
    l.closest("[data-champion-id-value]"),
    l.closest("[data-champion-id-string]")
  ].filter(Boolean);
  for (const m of i)
    for (const g of ["data-champion-id", "data-champion-id-value", "data-champion-id-string", "champion-id"]) {
      const p = m.getAttribute(g);
      if (p && /^\d+$/.test(p)) return Number(p);
    }
  for (const m of i) {
    const g = m.querySelector('img[src*="champion-icons"]'), p = (c = g == null ? void 0 : g.getAttribute("src")) == null ? void 0 : c.match(/champion-icons\/(\d+)\.png/);
    if (p) return Number(p[1]);
    const y = m.outerHTML.match(/champion-icons\/(\d+)\.png/);
    if (y) return Number(y[1]);
    const v = m.querySelector('[style*="champion-icons"]'), b = [
      ((o = m.style) == null ? void 0 : o.backgroundImage) ?? "",
      ((r = v == null ? void 0 : v.style) == null ? void 0 : r.backgroundImage) ?? ""
    ].join(" ").match(/champion-icons\/(\d+)\.png/);
    if (b) return Number(b[1]);
  }
  return null;
}
function gv(l, i) {
  const c = zA.get(l), o = um.get(l);
  if (!c || !o) return null;
  const r = document.createElement("img");
  return r.setAttribute(sm, "true"), r.src = c, r.alt = o, r.title = o, r.style.cssText = [
    "position:absolute",
    `left:${i.left}px`,
    i.top != null && i.top !== "auto" ? `top:${i.top}px` : "",
    i.bottom != null ? `bottom:${i.bottom}px` : "",
    `width:${i.size}px`,
    `height:${i.size}px`,
    "z-index:8",
    "pointer-events:none",
    "filter:drop-shadow(0 1px 2px rgba(0,0,0,.95))"
  ].join(";"), r;
}
function yv(l) {
  window.getComputedStyle(l).position === "static" && (l.setAttribute(jc, l.style.position), l.style.position = "relative");
}
function vv(l) {
  return Array.from(l.children).find((i) => i instanceof HTMLImageElement && i.hasAttribute(sm)) ?? null;
}
function Gs() {
  return tn.size === 0 || (document.querySelectorAll(IA).forEach((i) => {
    if (!(i instanceof HTMLElement)) return;
    const c = mv.find((p) => i.matches(p.selector));
    if (!c) return;
    const o = qA(i), r = o != null ? tn.get(o) : void 0, m = r == null ? void 0 : r.tier, g = vv(i);
    if (!r) {
      g == null || g.remove();
      return;
    }
    if (m == null)
      g == null || g.remove();
    else {
      const p = um.get(m);
      if (!(g instanceof HTMLImageElement && g.alt === p)) {
        g == null || g.remove();
        const y = gv(m, c);
        y && (yv(i), i.appendChild(y));
      }
    }
  }), LA()), !0;
}
function LA() {
  if (!(At != null && At.myTeam)) return;
  document.querySelectorAll(".party.visible .summoner-wrapper.visible.left").forEach((i, c) => {
    var S;
    const o = i.querySelector(".champion-icon-container");
    if (!o) return;
    const r = At == null ? void 0 : At.myTeam[c], m = r ? BA(r) : 0, g = vv(o);
    if (!m) {
      g == null || g.remove();
      return;
    }
    const p = (S = tn.get(m)) == null ? void 0 : S.tier;
    if (p == null) {
      g == null || g.remove();
      return;
    }
    const y = um.get(p);
    if (g instanceof HTMLImageElement && g.alt === y) return;
    g == null || g.remove();
    const v = gv(p, MA);
    v && (yv(o), o.appendChild(v));
  });
}
function BA(l) {
  return l.championId > 0 ? l.championId : l.championPickIntent > 0 ? l.championPickIntent : 0;
}
function go() {
  document.querySelectorAll(`[${sm}]`).forEach((l) => l.remove()), document.querySelectorAll(`[${jc}]`).forEach((l) => {
    l instanceof HTMLElement && (l.style.position = l.getAttribute(jc) ?? "", l.removeAttribute(jc));
  });
}
function ly(l) {
  go(), tn = /* @__PURE__ */ new Map(), At = null, ti = "", io || (st.register(Gs), io = !0), pv(l);
}
function iy() {
  ys++, ti = "", tn = /* @__PURE__ */ new Map(), At = null, io && (st.unregister(Gs), io = !1), go();
}
function sy(l) {
  l && !ms ? (ms = ne.observe(On.GAMEFLOW_PHASE_CHANGE, (i) => {
    i.data === "ChampSelect" ? ly() : iy();
  }), Nc = ne.observe(On.CHAMP_SELECT, (i) => {
    if (i.eventType !== "Create" && i.eventType !== "Update") return;
    const c = At == null ? void 0 : At.queueId;
    At = i.data, c !== At.queueId && (ti = "", tn = /* @__PURE__ */ new Map(), go()), tn.size === 0 ? pv(i.data) : Gs();
  }), ne.getGameflowPhase().then((i) => {
    i === "ChampSelect" && ly();
  }).catch(() => {
  }), G.info("[ChampTier] 英雄选择 T 级角标已启用 ✓")) : !l && ms && (ms(), ms = null, Nc && (Nc(), Nc = null), iy(), G.info("[ChampTier] 英雄选择 T 级角标已禁用"));
}
const uy = [
  129,
  112,
  118,
  169,
  244,
  81,
  80,
  155,
  149,
  152,
  104,
  19,
  206,
  145,
  23,
  231
], GA = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function KA(l) {
  const i = l.trim().toLowerCase();
  if (!GA.test(i)) return "";
  const c = i.replace(/-/g, "");
  let o = "";
  for (let r = 0; r < uy.length; r++) {
    const m = Number.parseInt(c.slice(r * 2, r * 2 + 2), 16);
    o += (m ^ uy[r]).toString(16).padStart(2, "0");
  }
  return [
    o.slice(0, 8),
    o.slice(8, 12),
    o.slice(12, 16),
    o.slice(16, 20),
    o.slice(20)
  ].join("-");
}
function Sv(l) {
  return l >= 70 ? {
    id: "blazing",
    borderColor: "#ff3300",
    particleColors: ["#ff3300", "#ffaa00", "#ff003c"],
    particleStyle: "fire",
    boxShadow: "0 0 15px rgba(255,51,0,0.5)"
  } : l >= 60 ? {
    id: "strong",
    borderColor: "#c8aa6e",
    particleColors: ["#4a9eff", "#7ec8ff", "#2060c0"],
    particleStyle: "magic",
    boxShadow: "0 0 8px rgba(74,158,255,0.35)"
  } : l >= 50 ? {
    id: "normal",
    borderColor: "#3c2e16",
    particleColors: ["#a09b8c", "#5c6b73", "#d1d8e0"],
    particleStyle: "ambient",
    boxShadow: "0 0 6px rgba(160,155,140,0.25)"
  } : l >= 40 ? {
    id: "shaky",
    borderColor: "#555555",
    particleColors: ["#8b6914", "#a07828", "#6b4e0a"],
    particleStyle: "ash",
    filter: "saturate(0.5)",
    boxShadow: "0 0 6px rgba(139,105,20,0.3)"
  } : {
    id: "dizzy",
    borderColor: "#8b00ff",
    particleColors: ["#8b00ff", "#4a0080", "#000000"],
    particleStyle: "void",
    filter: "grayscale(1) contrast(1.2)",
    boxShadow: "0 0 10px rgba(139,0,255,0.4)"
  };
}
function HA({ winRate: l, width: i = 160, height: c = 160 }) {
  const o = k.useRef(null), r = Sv(l);
  return k.useEffect(() => {
    const m = o.current;
    if (!m) return;
    const g = m.getContext("2d");
    if (!g) return;
    const p = g, y = i / 2, v = c / 2, S = Math.min(i, c) / 4;
    let b = 0;
    const N = [];
    function X() {
      const w = Math.random() * Math.PI * 2, j = S + Math.random() * 5, F = r.particleColors, V = {
        x: y + Math.cos(w) * j,
        y: v + Math.sin(w) * j,
        vx: 0,
        vy: 0,
        size: Math.random() * 2.5 + 0.5,
        color: F[Math.floor(Math.random() * F.length)],
        life: 1,
        decay: Math.random() * 0.01 + 5e-3
      };
      switch (r.particleStyle) {
        case "fire":
          V.vx = Math.cos(w) * (Math.random() * 0.3 + 0.1), V.vy = Math.sin(w) * (Math.random() * 0.3 + 0.1) - 0.2, V.decay = Math.random() * 8e-3 + 3e-3;
          break;
        case "magic":
          V.vx = (Math.random() - 0.5) * 0.3, V.vy = -Math.random() * 0.5 - 0.2;
          break;
        case "ambient":
          V.vx = (Math.random() - 0.5) * 0.2, V.vy = (Math.random() - 0.5) * 0.2 - 0.1, V.decay = Math.random() * 8e-3 + 4e-3;
          break;
        case "ash":
          V.vx = (Math.random() - 0.5) * 0.3, V.vy = Math.random() * 0.1 + 0.2;
          break;
        case "void": {
          const J = S + 15;
          V.x = y + Math.cos(w) * J, V.y = v + Math.sin(w) * J, V.vx = -Math.cos(w) * (Math.random() * 0.4 + 0.1), V.vy = -Math.sin(w) * (Math.random() * 0.4 + 0.1), V.decay = Math.random() * 0.015 + 0.01;
          break;
        }
      }
      return V;
    }
    function I() {
      p.clearRect(0, 0, i, c);
      const w = r.particleStyle === "fire" ? 3 : 2, j = r.particleStyle === "ambient" ? 0.7 : 0.3;
      for (let F = 0; F < w; F++)
        Math.random() > j && N.push(X());
      for (let F = N.length - 1; F >= 0; F--) {
        const V = N[F];
        if (V.x += V.vx, V.y += V.vy, V.life -= V.decay, V.life <= 0) {
          N.splice(F, 1);
          continue;
        }
        p.beginPath(), p.arc(V.x, V.y, V.size, 0, Math.PI * 2);
        const J = V.x - y, H = V.y - v, Z = Math.sqrt(J * J + H * H), K = Math.min(i, c) / 2, Q = Math.max(0, 1 - Z / K);
        p.globalAlpha = V.life * Q, p.fillStyle = V.color;
        const _ = r.particleStyle;
        _ === "fire" || _ === "magic" ? (p.shadowBlur = 8, p.shadowColor = V.color) : _ === "ambient" ? (p.shadowBlur = 3, p.shadowColor = V.color) : p.shadowBlur = 0, p.fill(), p.globalAlpha = 1;
      }
      b = requestAnimationFrame(I);
    }
    return I(), () => {
      cancelAnimationFrame(b), p.clearRect(0, 0, i, c);
    };
  }, [r, i, c]), /* @__PURE__ */ f.jsx(
    "canvas",
    {
      ref: o,
      width: i,
      height: c,
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 0,
        borderRadius: "50%",
        mixBlendMode: r.particleStyle === "void" ? "normal" : "screen"
      }
    }
  );
}
function QA(l) {
  return l.puuid ? `puuid:${l.puuid}` : l.summonerId ? `summoner:${l.summonerId}` : l.obfuscatedPuuid ? `obfuscated-puuid:${l.obfuscatedPuuid}` : l.obfuscatedSummonerId ? `obfuscated-summoner:${l.obfuscatedSummonerId}` : `cell:${l.cellId}`;
}
function kc(l) {
  return l.obfuscatedPuuid ? `obfuscated-puuid:${l.obfuscatedPuuid}` : l.obfuscatedSummonerId ? `obfuscated-summoner:${l.obfuscatedSummonerId}` : l.puuid ? `puuid:${l.puuid}` : l.summonerId ? `summoner:${l.summonerId}` : `floor:${l.floor}`;
}
function qc(l) {
  return l.puuid ? l.puuid : l.nameVisibilityType !== "HIDDEN" || !l.obfuscatedPuuid ? "" : KA(l.obfuscatedPuuid);
}
async function VA() {
  const l = await ne.getChampSelectSession();
  if (!await fo(l)) return { queueId: l.queueId, stats: [] };
  const i = l.queueId;
  G.info("[TeamStats] 当前队列 ID: %d", i);
  const c = oo(i), o = Math.max(
    O.get("champSelectAssist") ? O.get("champSelectAssistFetchCount") || 50 : 0,
    O.get("analyzeTeamPower") ? O.get("analyzeTeamPowerFetchCount") || 50 : 0,
    20
  ), r = (y, v, S = qc(y), b) => ({
    floor: v + 1,
    summonerId: (b == null ? void 0 : b.summonerId) || y.summonerId,
    puuid: S,
    obfuscatedSummonerId: y.obfuscatedSummonerId,
    obfuscatedPuuid: y.obfuscatedPuuid,
    gameName: (b == null ? void 0 : b.gameName) || y.gameName,
    tagLine: (b == null ? void 0 : b.tagLine) || y.tagLine,
    winRate: null,
    wins: 0,
    total: 0,
    avgK: 0,
    avgD: 0,
    avgA: 0,
    kdaNum: 0,
    strengthScore: null
  }), m = rm(l), g = m.filter((y) => y.nameVisibilityType === "HIDDEN" && !y.puuid);
  if (g.length > 0) {
    const y = g.filter((v) => !!qc(v)).length;
    G.info("[TeamStats] 匿名模式身份还原: %d/%d", y, g.length);
  }
  const p = await Promise.all(m.map(async (y, v) => {
    const S = qc(y);
    if (!S)
      return G.warn("[TeamStats] %d楼缺少可查询的 PUUID（visibility=%s）", v + 1, y.nameVisibilityType || "unknown"), r(y, v, "");
    const b = !y.gameName || !y.tagLine || !y.summonerId, N = b ? ne.getSummonerByPuuid(S).catch((X) => (G.warn("[TeamStats] %d楼 Riot ID 回填失败:", v + 1, X), null)) : Promise.resolve(null);
    try {
      const [X, I] = await Promise.all([
        ne.getSgpMatchHistory(S, {
          startIndex: 0,
          count: o,
          tag: c || void 0
        }),
        N
      ]), w = y.gameName || (I == null ? void 0 : I.gameName) || (I == null ? void 0 : I.displayName) || "", j = y.tagLine || (I == null ? void 0 : I.tagLine) || "", F = y.summonerId || (I == null ? void 0 : I.summonerId) || 0, V = { summonerId: F, gameName: w, tagLine: j };
      b && w && G.info("[TeamStats] %d楼匿名 Riot ID 回填成功 → %s%s", v + 1, w, j ? `#${j}` : "");
      const J = X.games ?? [], H = Zd(J, i), Z = [];
      for (const ge of H) {
        const Oe = ge.json.participants.find((we) => we.puuid === S);
        Oe && (Xd(ge, S) || Z.push({
          kills: Oe.kills,
          deaths: Oe.deaths,
          assists: Oe.assists,
          win: Oe.win
        }));
      }
      if (Z.length === 0)
        return r(y, v, S, V);
      let K = 0, Q = 0, _ = 0, pe = 0;
      for (const ge of Z)
        ge.win && K++, Q += ge.kills, _ += ge.deaths, pe += ge.assists;
      const re = Z.length, ue = Dy(H, S);
      return G.info(
        "[TeamStats] %s → 当前模式有效 %d 场 / 返回 %d 场 (queueId=%d, tag=%s)",
        w,
        re,
        J.length,
        i,
        c || "全部"
      ), {
        floor: v + 1,
        summonerId: F,
        puuid: S,
        obfuscatedSummonerId: y.obfuscatedSummonerId,
        obfuscatedPuuid: y.obfuscatedPuuid,
        gameName: w,
        tagLine: j,
        winRate: K / re * 100,
        wins: K,
        total: re,
        avgK: Q / re,
        avgD: _ / re,
        avgA: pe / re,
        kdaNum: _ === 0 ? Q + pe : (Q + pe) / _,
        strengthScore: ue
      };
    } catch (X) {
      G.warn("[TeamStats] %d楼战绩查询失败（visibility=%s）:", v + 1, y.nameVisibilityType || "unknown", X);
      const I = await N;
      return r(y, v, S, {
        summonerId: y.summonerId || (I == null ? void 0 : I.summonerId) || 0,
        gameName: y.gameName || (I == null ? void 0 : I.gameName) || (I == null ? void 0 : I.displayName) || "",
        tagLine: y.tagLine || (I == null ? void 0 : I.tagLine) || ""
      });
    }
  }));
  return { queueId: i, stats: p };
}
const Ev = "data-sona-tier", Cd = "data-sona-stats", Nd = "data-sona-click", xd = "data-sona-player-key", zs = "data-sona-hidden-player-name", cm = "data-sona-hidden-player-key", om = "data-sona-hidden-real-name", Md = "data-sona-hidden-name-suffix", Id = "sona-hidden-player-name-style";
let ha = [], Ks = /* @__PURE__ */ new Map(), Hs = /* @__PURE__ */ new Map(), Qs = /* @__PURE__ */ new Map(), Vs = /* @__PURE__ */ new Map(), so = "", Xs = 0, Rd = [], Yl = [], pa = null, ga = null;
function XA(l, i, c) {
  ga || (ga = document.createElement("div"), ga.id = "sona-match-history-modal-root", document.body.appendChild(ga), pa = Sa.createRoot(ga));
  const o = () => {
    pa == null || pa.render(
      k.createElement(Za, { open: !1, onClose: o, puuid: "", playerName: "" })
    );
  };
  pa.render(
    k.createElement(Za, { open: !0, onClose: o, puuid: l, playerName: i, queueId: c })
  );
}
function ZA() {
  pa && (pa.unmount(), pa = null), ga && (ga.remove(), ga = null);
}
function JA() {
  if (document.getElementById(Id)) return;
  const l = document.createElement("style");
  l.id = Id, l.textContent = `
    .player-name-wrapper[${zs}]::before {
      content: attr(${om}) "(";
    }

    .player-name-wrapper[${zs}] > [${Md}] {
      display: inline-flex !important;
      align-items: center;
      gap: 3px;
      vertical-align: -1px;
      white-space: nowrap;
      pointer-events: none;
    }

    .player-name-wrapper[${zs}] > [${Md}] > svg {
      width: 11px;
      height: 11px;
      flex: 0 0 11px;
      color: #e6c76a !important;
      -webkit-text-fill-color: #e6c76a !important;
      filter: drop-shadow(0 0 3px rgba(200, 170, 110, 0.55));
    }
  `, document.head.appendChild(l);
}
function YA() {
  const l = document.createElement("span");
  l.setAttribute(Md, "true"), l.setAttribute("aria-hidden", "true"), l.appendChild(document.createTextNode(")"));
  const i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.setAttribute("viewBox", "0 0 16 16"), i.setAttribute("fill", "none"), i.setAttribute("focusable", "false");
  const c = document.createElementNS("http://www.w3.org/2000/svg", "path");
  c.setAttribute("d", "M5 7V5a3 3 0 0 1 6 0v2"), c.setAttribute("stroke", "currentColor"), c.setAttribute("stroke-width", "1.6"), c.setAttribute("stroke-linecap", "round");
  const o = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  o.setAttribute("x", "3"), o.setAttribute("y", "7"), o.setAttribute("width", "10"), o.setAttribute("height", "7"), o.setAttribute("rx", "2"), o.setAttribute("fill", "rgba(230, 199, 106, 0.18)"), o.setAttribute("stroke", "currentColor"), o.setAttribute("stroke-width", "1.4");
  const r = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  return r.setAttribute("cx", "8"), r.setAttribute("cy", "10.5"), r.setAttribute("r", "0.9"), r.setAttribute("fill", "currentColor"), i.append(c, o, r), l.appendChild(i), l;
}
function cy(l, i) {
  return Array.from(l.childNodes).filter((c) => c !== i).map((c) => c.textContent ?? "").join("").trim();
}
function bv(l) {
  l.suffixElement.remove(), l.nameElement.removeAttribute(zs), l.nameElement.removeAttribute(cm), l.nameElement.removeAttribute(om), l.previousTitle == null ? l.nameElement.removeAttribute("title") : l.nameElement.setAttribute("title", l.previousTitle), l.previousAriaLabel == null ? l.nameElement.removeAttribute("aria-label") : l.nameElement.setAttribute("aria-label", l.previousAriaLabel);
}
function PA(l, i, c) {
  if (!i.obfuscatedPuuid || !i.gameName) return;
  const o = l.querySelector(".player-name-wrapper");
  if (!o) return;
  let r = Yl.find((p) => p.nameElement === o), m = !1;
  if (r && r.playerKey !== c && (bv(r), Yl = Yl.filter((p) => p !== r), r = void 0), r) {
    const p = cy(o, r.suffixElement);
    p && (r.originalAlias = p);
  } else {
    const p = cy(o);
    if (!p) return;
    const y = YA();
    r = {
      nameElement: o,
      suffixElement: y,
      playerKey: c,
      originalAlias: p,
      previousTitle: o.getAttribute("title"),
      previousAriaLabel: o.getAttribute("aria-label")
    }, Yl.push(r), m = !0;
  }
  (r.suffixElement.parentElement !== o || o.lastChild !== r.suffixElement) && o.appendChild(r.suffixElement), JA();
  const g = `${i.gameName}(${r.originalAlias})`;
  o.setAttribute(zs, "true"), o.setAttribute(cm, c), o.setAttribute(om, i.gameName), o.setAttribute("title", `${g} · 匿名模式`), o.setAttribute("aria-label", `${g}，匿名模式`), m && G.info("[ChampSelect] %d楼匿名名字增强 → %s", i.floor, g);
}
function rm(l) {
  return l.myTeam.filter((i) => !!i.puuid || !!i.obfuscatedPuuid);
}
function Tv(l) {
  return rm(l).map((i) => `${QA(i)}:${i.cellId}`).join("|");
}
function FA(l, i) {
  const c = (l.puuid ? Ks.get(l.puuid) : void 0) ?? (l.summonerId ? Hs.get(l.summonerId) : void 0) ?? (l.obfuscatedPuuid ? Qs.get(l.obfuscatedPuuid) : void 0) ?? (l.obfuscatedSummonerId ? Vs.get(l.obfuscatedSummonerId) : void 0);
  return c ? {
    ...c,
    floor: i,
    gameName: l.gameName || c.gameName,
    tagLine: l.tagLine || c.tagLine,
    puuid: l.puuid || c.puuid,
    summonerId: l.summonerId || c.summonerId,
    obfuscatedPuuid: l.obfuscatedPuuid || c.obfuscatedPuuid,
    obfuscatedSummonerId: l.obfuscatedSummonerId || c.obfuscatedSummonerId
  } : {
    floor: i,
    summonerId: l.summonerId,
    puuid: qc(l),
    obfuscatedSummonerId: l.obfuscatedSummonerId,
    obfuscatedPuuid: l.obfuscatedPuuid,
    gameName: l.gameName,
    tagLine: l.tagLine,
    winRate: null,
    wins: 0,
    total: 0,
    avgK: 0,
    avgD: 0,
    avgA: 0,
    kdaNum: 0,
    strengthScore: null
  };
}
function Av(l) {
  return rm(l).map((i, c) => FA(i, c + 1));
}
const Ud = [];
function fm() {
  const l = document.querySelectorAll(".party.visible .summoner-wrapper.visible.left");
  if (l.length === 0 || ha.length === 0) return !0;
  Array.from(l).some((o, r) => {
    const m = o.querySelector(".champion-icon-container"), g = o.querySelector(".player-name-wrapper"), p = ha[r];
    if (!p) return !1;
    const y = kc(p), v = m == null ? void 0 : m.getAttribute(xd), S = g == null ? void 0 : g.getAttribute(cm);
    return !!(v && v !== y || S && S !== y);
  }) && mm();
  const c = t2(ha);
  return l.forEach((o, r) => {
    var b;
    const m = ha[r];
    if (!m) return;
    const g = kc(m);
    PA(o, m, g);
    const p = o.querySelector(".champion-icon-container");
    if (!p || m.winRate == null) return;
    const y = m.winRate;
    if (p.setAttribute(xd, g), !p.querySelector("[data-sona-particle]")) {
      p.setAttribute(Ev, "true"), p.style.position = "relative", p.style.overflow = "visible", p.style.borderRadius = "50%";
      const N = Sv(y);
      N.boxShadow && (p.style.boxShadow = N.boxShadow);
      const X = document.createElement("div");
      X.setAttribute("data-sona-particle", "true"), p.prepend(X);
      const I = p.getBoundingClientRect(), w = Math.max(I.width, I.height) + 40, j = Sa.createRoot(X);
      j.render(k.createElement(HA, { winRate: y, width: w, height: w })), Ud.push({ root: j, container: X }), G.info("头像粒子特效 → %d楼 胜率%s%% → %s", r + 1, y.toFixed(1), N.id);
    }
    let v = null;
    if (!p.hasAttribute(Nd) && m.puuid) {
      p.setAttribute(Nd, "true"), p.style.cursor = "pointer";
      const N = g;
      v = (X) => {
        if (X.target.closest(".swap-button-component, .swap-button-btn")) return;
        X.stopPropagation(), X.preventDefault();
        const w = ha.find((j) => kc(j) === N);
        if (w != null && w.puuid) {
          const j = w.gameName ? `${w.gameName}${w.tagLine ? `#${w.tagLine}` : ""}` : "";
          XA(w.puuid, j, Xs || void 0);
        }
      }, p.addEventListener("click", v, !0);
    }
    const S = o.querySelector(".player-details");
    if (S && !S.querySelector(`[${Cd}]`)) {
      S.style.position = "relative", S.style.overflow = "visible";
      const N = S.closest(".summoner-container");
      N && (N.style.overflow = "visible");
      const X = m.kdaNum >= 99 ? "完美" : m.kdaNum.toFixed(1);
      let I = "#e74c3c";
      y >= 55 ? I = "#5bbd72" : y >= 45 && (I = "#c8aa6e");
      const w = document.createElement("div");
      w.setAttribute(Cd, "true"), w.style.cssText = "position:absolute;left:0;top:100%;display:flex;flex-wrap:wrap;align-items:center;gap:3px 0;font-size:11px;line-height:1.2;white-space:nowrap;margin-top:2px;";
      const j = document.createElement("span");
      j.style.cssText = `color:${I};font-weight:bold;display:inline-block;min-width:90px;`, j.textContent = `${y.toFixed(0)}% (${m.wins}胜/${m.total - m.wins}负)`;
      let F = "#e74c3c";
      m.kdaNum >= 5 ? F = "#5bbd72" : m.kdaNum >= 3 && (F = "#c8aa6e");
      const V = document.createElement("span");
      if (V.style.cssText = `color:${F};margin-left:8px;font-weight:bold;text-shadow:0 0 4px rgba(200,170,110,0.6);`, V.textContent = `KDA ${X}`, w.appendChild(j), w.appendChild(V), O.get("analyzeTeamPower")) {
        const J = document.createElement("span");
        J.setAttribute("data-sona-team-power", "true"), J.style.cssText = "flex-basis:100%;color:#c8aa6e;font-weight:bold;";
        const H = c.get(g) ?? "🆕 萌新上线", Z = ((b = m.strengthScore) == null ? void 0 : b.score.toFixed(1)) ?? "--";
        J.textContent = `${H} · ${Z}`, J.title = `本模式有效样本：近${m.total}场`, w.appendChild(J);
      }
      S.appendChild(w), Rd.push({ statsDiv: w, iconContainer: p, summonerContainer: N, playerDetails: S, clickHandler: v }), G.info(
        "[ChampSelect] %d楼战绩更新成功 → %s#%s 胜率%s%% (%d胜/%d负) KDA %s",
        r + 1,
        m.gameName ?? "?",
        m.tagLine ?? "?",
        y.toFixed(0),
        m.wins,
        m.total - m.wins,
        X
      );
    }
  }), !0;
}
let uo = !1, vs = 0;
function WA() {
  uo || (st.register(fm), uo = !0);
}
function Os() {
  var l;
  vs++, uo && (st.unregister(fm), uo = !1), ha = [], Ks.clear(), Hs.clear(), Qs.clear(), Vs.clear(), so = "", Xs = 0, mm(), (l = document.getElementById(Id)) == null || l.remove(), ZA();
}
async function dm() {
  if (!(!O.get("champSelectAssist") && !O.get("analyzeTeamPower")))
    try {
      Os();
      const l = vs, { stats: i, queueId: c } = await VA();
      if (l !== vs || i.length === 0) return;
      const o = await ne.getChampSelectSession();
      if (l !== vs || o.queueId !== c || !await fo(o) || l !== vs) return;
      Xs = c, Ks.clear(), Hs.clear(), Qs.clear(), Vs.clear();
      for (const r of i)
        r.puuid && Ks.set(r.puuid, r), r.summonerId && Hs.set(r.summonerId, r), r.obfuscatedPuuid && Qs.set(r.obfuscatedPuuid, r), r.obfuscatedSummonerId && Vs.set(r.obfuscatedSummonerId, r);
      ha = Av(o), so = Tv(o), WA(), G.info("头像特效数据就绪，%d 位队友，队列 ID: %d", i.length, Xs);
    } catch (l) {
      G.error("头像特效查询失败:", l);
    }
}
let hs = null, xc = null;
function _A(l) {
  if (l.eventType !== "Update" || Ks.size === 0 && Hs.size === 0 && Qs.size === 0 && Vs.size === 0) return;
  const i = l.data;
  if (!(i != null && i.myTeam)) return;
  if (i.queueId !== Xs) {
    Os(), dm();
    return;
  }
  const c = Tv(i);
  c !== so && (G.info("[ChampSelect] 检测到队友展示顺序或分路变化，重建头像战绩绑定"), mm(), ha = Av(i), so = c, fm());
}
function mm() {
  Ud.forEach(({ root: l, container: i }) => {
    l.unmount(), i.remove();
  }), Ud.length = 0;
  for (const l of Yl)
    bv(l);
  Yl = [];
  for (const l of Rd)
    l.statsDiv.remove(), l.clickHandler && l.iconContainer.removeEventListener("click", l.clickHandler, !0), l.iconContainer.style.filter = "", l.iconContainer.style.boxShadow = "", l.iconContainer.removeAttribute(Ev), l.iconContainer.removeAttribute(Nd), l.iconContainer.removeAttribute(xd), l.iconContainer.style.cursor = "", l.playerDetails.removeAttribute(Cd), l.playerDetails.style.cursor = "", l.summonerContainer && (l.summonerContainer.style.overflow = "");
  Rd = [];
}
function $A(l) {
  l && !hs ? (hs = ne.observe(On.GAMEFLOW_PHASE_CHANGE, (i) => {
    i.data === "ChampSelect" ? (Os(), dm()) : Os();
  }), xc = ne.observe(On.CHAMP_SELECT, _A), G.info("Champ select assist enabled ✓")) : !l && hs && (hs(), hs = null, Os(), xc && (xc(), xc = null), G.info("Champ select assist disabled"));
}
function e2(l, i) {
  return l >= 75 && i >= 4.5 ? "👑 峡谷通天代" : l >= 70 ? "🚀 降维来炸鱼" : l >= 65 ? "🔥 绝对真大腿" : l >= 60 ? "⚔️ 绝活哥出列" : l >= 56 ? "✨ 稳健老司机" : l >= 52 ? "🛡️ 上分好帮手" : l >= 48 ? "🎲 峡谷摇摆人" : l >= 45 ? "🫠 默默抗压中" : l >= 41 ? "🍂 随缘在补位" : l >= 37 ? "💀 连败渡劫中" : l >= 33 ? "🤡 敌方突破口" : l >= 28 ? "💸 峡谷提款机" : l >= 20 ? "🏳️ 投降发起人" : "☠️ 演员已就位";
}
const oy = [
  "🦄 千里马",
  "🏇 上等马",
  "🐎 中等马",
  "🐴 下等马",
  "🐂 纯牛马"
];
function t2(l) {
  const i = [...l].filter((o) => !!o.strengthScore).sort((o, r) => r.strengthScore.score - o.strengthScore.score), c = /* @__PURE__ */ new Map();
  return i.forEach((o, r) => {
    c.set(kc(o), oy[Math.min(r, oy.length - 1)]);
  }), c;
}
function ps() {
  const l = O.get("champSelectAssist") || O.get("analyzeTeamPower");
  $A(l), l && ne.getGameflowPhase().then((i) => {
    i === "ChampSelect" && dm();
  }).catch((i) => G.warn("[ChampSelect] 无法刷新队友战绩:", i));
}
function n2() {
  ps(), O.onChange("champSelectAssist", ps), O.onChange("analyzeTeamPower", ps), O.onChange("champSelectAssistFetchCount", ps), O.onChange("analyzeTeamPowerFetchCount", ps), sy(O.get("champSelectTierBadge")), O.onChange("champSelectTierBadge", sy);
  const l = () => {
    NA(
      O.get("opggBuildRecommendation") || O.get("smartBuildRecommendation") || O.get("smartItemSetBuild")
    );
  };
  l(), O.onChange("opggBuildRecommendation", l), O.onChange("smartBuildRecommendation", l), O.onChange("smartItemSetBuild", l), K0(O.get("lobbyEnhancement")), O.onChange("lobbyEnhancement", K0), Z0(O.get("gameAnalysisPopup")), O.onChange("gameAnalysisPopup", Z0), G.info("Ranked analysis features initialized ✓");
}
const Cv = "sona";
let Lc = `//plugins/${Cv}/`, ca = Cv;
function Wf(l, i = {}) {
  console.info("[Sona][PluginResolver] %s", l, {
    ...i,
    pluginBaseUrl: Lc,
    pluginFolderName: ca
  });
}
function Nv(l) {
  return l.replace(/\\/g, "/");
}
function a2(l) {
  return l.split(/[?#]/, 1)[0] ?? l;
}
function ry(l) {
  const i = a2(Nv(l)), c = i.match(/(?:^|\/)plugins\/([^/]+)\//i);
  if (!c) return null;
  const o = c.index + c[0].length;
  return i.substring(0, o);
}
function fy(l) {
  const c = Nv(l).replace(/\/+$/, "").split("/"), o = c[c.length - 1];
  return o ? decodeURIComponent(o) : null;
}
function dy(l) {
  var c;
  const i = (c = l == null ? void 0 : l.meta) == null ? void 0 : c.name;
  return typeof i == "string" && i ? i : null;
}
function l2(l, i) {
  const c = typeof window.getScriptPath == "function" ? window.getScriptPath() : "", o = c ? ry(c) : null, r = o ? fy(o) : null;
  if (r) {
    ca = r, Lc = `//plugins/${encodeURIComponent(ca)}/`, Wf("initialized from window.getScriptPath() plugin folder", {
      metaUrl: l,
      scriptPath: c,
      scriptBaseUrl: o
    });
    return;
  }
  const m = l ? ry(l) : null, g = m ? fy(m) : null;
  if (g) {
    ca = g, Lc = `//plugins/${encodeURIComponent(ca)}/`, Wf("initialized from import.meta.url plugin folder", {
      metaUrl: l,
      scriptPath: c,
      baseUrl: m
    });
    return;
  }
  ca = dy(i) ?? ca, Lc = `//plugins/${encodeURIComponent(ca)}/`, Wf("initialized from context fallback", {
    metaUrl: l,
    contextPluginName: dy(i),
    scriptPath: c
  });
}
const i2 = "Sona", s2 = "1.11.0", my = "sona-root", G = db({
  name: i2,
  version: s2
});
function xv() {
  return window.__SONA_RUNTIME__ || (window.__SONA_RUNTIME__ = {
    container: null,
    root: null,
    hasShownStartupToast: !1
  }), window.__SONA_RUNTIME__;
}
function Mv(l) {
  (document.body ?? document.documentElement).appendChild(l);
}
function u2(l) {
  const i = document.getElementById(my);
  return i instanceof HTMLDivElement && (l.container = i), l.container || (l.container = document.createElement("div"), l.container.id = my, G.info("Created app container")), l.container.isConnected || (Mv(l.container), G.warn("App container was missing from DOM and has been reattached")), l.container;
}
function f2(l) {
  l2(import.meta.url, l), ne.bindContext(l), G.printBanner();
}
function d2() {
  G.info("Plugin loading..."), vb(), n2(), ub(), vE(), o2(), Gd();
}
function c2() {
  var i, c;
  const l = xv();
  return (i = l.container) != null && i.isConnected ? !0 : (l.container && (Mv(l.container), G.warn("Detected host DOM refresh; restored app container")), !!((c = l.container) != null && c.isConnected));
}
function o2() {
  const l = xv(), i = u2(l);
  st.register(c2), l.root ? G.info("Reusing existing React root") : (l.root = Sa.createRoot(i), G.info("Created React root")), l.root.render(/* @__PURE__ */ f.jsx(rb, {})), G.info("Mounted ✓ (container connected: %s)", String(i.isConnected)), l.hasShownStartupToast || (Toast.success("Sona 已启动 ♫"), l.hasShownStartupToast = !0);
}
export {
  f2 as init,
  d2 as load,
  G as logger
};
