/**
 * @name Sona
 * @version 1.11.0
 * @description 基于 Pengu Loader 的国服英雄联盟排位分析插件
 * @author WJZ_P
 * @link https://github.com/limnova/sona
 */
import "./index.css";
var RS = Object.defineProperty;
var wS = (n, i, u) => i in n ? RS(n, i, { enumerable: !0, configurable: !0, writable: !0, value: u }) : n[i] = u;
var Ae = (n, i, u) => wS(n, typeof i != "symbol" ? i + "" : i, u);
var Bd = { exports: {} }, rs = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kp;
function US() {
  if (kp) return rs;
  kp = 1;
  var n = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function u(c, r, m) {
    var g = null;
    if (m !== void 0 && (g = "" + m), r.key !== void 0 && (g = "" + r.key), "key" in r) {
      m = {};
      for (var h in r)
        h !== "key" && (m[h] = r[h]);
    } else m = r;
    return r = m.ref, {
      $$typeof: n,
      type: c,
      key: g,
      ref: r !== void 0 ? r : null,
      props: m
    };
  }
  return rs.Fragment = i, rs.jsx = u, rs.jsxs = u, rs;
}
var Rp;
function DS() {
  return Rp || (Rp = 1, Bd.exports = US()), Bd.exports;
}
var d = DS(), jd = { exports: {} }, ds = {}, Ld = { exports: {} }, Gd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wp;
function OS() {
  return wp || (wp = 1, (function(n) {
    function i(O, J) {
      var ie = O.length;
      O.push(J);
      e: for (; 0 < ie; ) {
        var Me = ie - 1 >>> 1, Ee = O[Me];
        if (0 < r(Ee, J))
          O[Me] = J, O[ie] = Ee, ie = Me;
        else break e;
      }
    }
    function u(O) {
      return O.length === 0 ? null : O[0];
    }
    function c(O) {
      if (O.length === 0) return null;
      var J = O[0], ie = O.pop();
      if (ie !== J) {
        O[0] = ie;
        e: for (var Me = 0, Ee = O.length, T = Ee >>> 1; Me < T; ) {
          var M = 2 * (Me + 1) - 1, P = O[M], $ = M + 1, re = O[$];
          if (0 > r(P, ie))
            $ < Ee && 0 > r(re, P) ? (O[Me] = re, O[$] = ie, Me = $) : (O[Me] = P, O[M] = ie, Me = M);
          else if ($ < Ee && 0 > r(re, ie))
            O[Me] = re, O[$] = ie, Me = $;
          else break e;
        }
      }
      return J;
    }
    function r(O, J) {
      var ie = O.sortIndex - J.sortIndex;
      return ie !== 0 ? ie : O.id - J.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      n.unstable_now = function() {
        return m.now();
      };
    } else {
      var g = Date, h = g.now();
      n.unstable_now = function() {
        return g.now() - h;
      };
    }
    var v = [], y = [], b = 1, C = null, A = 3, w = !1, L = !1, D = !1, H = !1, F = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, X = typeof setImmediate < "u" ? setImmediate : null;
    function Q(O) {
      for (var J = u(y); J !== null; ) {
        if (J.callback === null) c(y);
        else if (J.startTime <= O)
          c(y), J.sortIndex = J.expirationTime, i(v, J);
        else break;
        J = u(y);
      }
    }
    function Z(O) {
      if (D = !1, Q(O), !L)
        if (u(v) !== null)
          L = !0, W || (W = !0, fe());
        else {
          var J = u(y);
          J !== null && ue(Z, J.startTime - O);
        }
    }
    var W = !1, z = -1, Y = 5, pe = -1;
    function oe() {
      return H ? !0 : !(n.unstable_now() - pe < Y);
    }
    function se() {
      if (H = !1, W) {
        var O = n.unstable_now();
        pe = O;
        var J = !0;
        try {
          e: {
            L = !1, D && (D = !1, V(z), z = -1), w = !0;
            var ie = A;
            try {
              t: {
                for (Q(O), C = u(v); C !== null && !(C.expirationTime > O && oe()); ) {
                  var Me = C.callback;
                  if (typeof Me == "function") {
                    C.callback = null, A = C.priorityLevel;
                    var Ee = Me(
                      C.expirationTime <= O
                    );
                    if (O = n.unstable_now(), typeof Ee == "function") {
                      C.callback = Ee, Q(O), J = !0;
                      break t;
                    }
                    C === u(v) && c(v), Q(O);
                  } else c(v);
                  C = u(v);
                }
                if (C !== null) J = !0;
                else {
                  var T = u(y);
                  T !== null && ue(
                    Z,
                    T.startTime - O
                  ), J = !1;
                }
              }
              break e;
            } finally {
              C = null, A = ie, w = !1;
            }
            J = void 0;
          }
        } finally {
          J ? fe() : W = !1;
        }
      }
    }
    var fe;
    if (typeof X == "function")
      fe = function() {
        X(se);
      };
    else if (typeof MessageChannel < "u") {
      var Ne = new MessageChannel(), Re = Ne.port2;
      Ne.port1.onmessage = se, fe = function() {
        Re.postMessage(null);
      };
    } else
      fe = function() {
        F(se, 0);
      };
    function ue(O, J) {
      z = F(function() {
        O(n.unstable_now());
      }, J);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, n.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Y = 0 < O ? Math.floor(1e3 / O) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return A;
    }, n.unstable_next = function(O) {
      switch (A) {
        case 1:
        case 2:
        case 3:
          var J = 3;
          break;
        default:
          J = A;
      }
      var ie = A;
      A = J;
      try {
        return O();
      } finally {
        A = ie;
      }
    }, n.unstable_requestPaint = function() {
      H = !0;
    }, n.unstable_runWithPriority = function(O, J) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var ie = A;
      A = O;
      try {
        return J();
      } finally {
        A = ie;
      }
    }, n.unstable_scheduleCallback = function(O, J, ie) {
      var Me = n.unstable_now();
      switch (typeof ie == "object" && ie !== null ? (ie = ie.delay, ie = typeof ie == "number" && 0 < ie ? Me + ie : Me) : ie = Me, O) {
        case 1:
          var Ee = -1;
          break;
        case 2:
          Ee = 250;
          break;
        case 5:
          Ee = 1073741823;
          break;
        case 4:
          Ee = 1e4;
          break;
        default:
          Ee = 5e3;
      }
      return Ee = ie + Ee, O = {
        id: b++,
        callback: J,
        priorityLevel: O,
        startTime: ie,
        expirationTime: Ee,
        sortIndex: -1
      }, ie > Me ? (O.sortIndex = ie, i(y, O), u(v) === null && O === u(y) && (D ? (V(z), z = -1) : D = !0, ue(Z, ie - Me))) : (O.sortIndex = Ee, i(v, O), L || w || (L = !0, W || (W = !0, fe()))), O;
    }, n.unstable_shouldYield = oe, n.unstable_wrapCallback = function(O) {
      var J = A;
      return function() {
        var ie = A;
        A = J;
        try {
          return O.apply(this, arguments);
        } finally {
          A = ie;
        }
      };
    };
  })(Gd)), Gd;
}
var Up;
function zS() {
  return Up || (Up = 1, Ld.exports = OS()), Ld.exports;
}
var qd = { exports: {} }, de = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dp;
function BS() {
  if (Dp) return de;
  Dp = 1;
  var n = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), m = Symbol.for("react.consumer"), g = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), C = Symbol.for("react.activity"), A = Symbol.iterator;
  function w(T) {
    return T === null || typeof T != "object" ? null : (T = A && T[A] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var L = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, D = Object.assign, H = {};
  function F(T, M, P) {
    this.props = T, this.context = M, this.refs = H, this.updater = P || L;
  }
  F.prototype.isReactComponent = {}, F.prototype.setState = function(T, M) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, M, "setState");
  }, F.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function V() {
  }
  V.prototype = F.prototype;
  function X(T, M, P) {
    this.props = T, this.context = M, this.refs = H, this.updater = P || L;
  }
  var Q = X.prototype = new V();
  Q.constructor = X, D(Q, F.prototype), Q.isPureReactComponent = !0;
  var Z = Array.isArray;
  function W() {
  }
  var z = { H: null, A: null, T: null, S: null }, Y = Object.prototype.hasOwnProperty;
  function pe(T, M, P) {
    var $ = P.ref;
    return {
      $$typeof: n,
      type: T,
      key: M,
      ref: $ !== void 0 ? $ : null,
      props: P
    };
  }
  function oe(T, M) {
    return pe(T.type, M, T.props);
  }
  function se(T) {
    return typeof T == "object" && T !== null && T.$$typeof === n;
  }
  function fe(T) {
    var M = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(P) {
      return M[P];
    });
  }
  var Ne = /\/+/g;
  function Re(T, M) {
    return typeof T == "object" && T !== null && T.key != null ? fe("" + T.key) : M.toString(36);
  }
  function ue(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(W, W) : (T.status = "pending", T.then(
          function(M) {
            T.status === "pending" && (T.status = "fulfilled", T.value = M);
          },
          function(M) {
            T.status === "pending" && (T.status = "rejected", T.reason = M);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function O(T, M, P, $, re) {
    var le = typeof T;
    (le === "undefined" || le === "boolean") && (T = null);
    var ae = !1;
    if (T === null) ae = !0;
    else
      switch (le) {
        case "bigint":
        case "string":
        case "number":
          ae = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case n:
            case i:
              ae = !0;
              break;
            case b:
              return ae = T._init, O(
                ae(T._payload),
                M,
                P,
                $,
                re
              );
          }
      }
    if (ae)
      return re = re(T), ae = $ === "" ? "." + Re(T, 0) : $, Z(re) ? (P = "", ae != null && (P = ae.replace(Ne, "$&/") + "/"), O(re, M, P, "", function($t) {
        return $t;
      })) : re != null && (se(re) && (re = oe(
        re,
        P + (re.key == null || T && T.key === re.key ? "" : ("" + re.key).replace(
          Ne,
          "$&/"
        ) + "/") + ae
      )), M.push(re)), 1;
    ae = 0;
    var Ke = $ === "" ? "." : $ + ":";
    if (Z(T))
      for (var De = 0; De < T.length; De++)
        $ = T[De], le = Ke + Re($, De), ae += O(
          $,
          M,
          P,
          le,
          re
        );
    else if (De = w(T), typeof De == "function")
      for (T = De.call(T), De = 0; !($ = T.next()).done; )
        $ = $.value, le = Ke + Re($, De++), ae += O(
          $,
          M,
          P,
          le,
          re
        );
    else if (le === "object") {
      if (typeof T.then == "function")
        return O(
          ue(T),
          M,
          P,
          $,
          re
        );
      throw M = String(T), Error(
        "Objects are not valid as a React child (found: " + (M === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : M) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ae;
  }
  function J(T, M, P) {
    if (T == null) return T;
    var $ = [], re = 0;
    return O(T, $, "", "", function(le) {
      return M.call(P, le, re++);
    }), $;
  }
  function ie(T) {
    if (T._status === -1) {
      var M = T._result;
      M = M(), M.then(
        function(P) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = P);
        },
        function(P) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = P);
        }
      ), T._status === -1 && (T._status = 0, T._result = M);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var Me = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var M = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(M)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  }, Ee = {
    map: J,
    forEach: function(T, M, P) {
      J(
        T,
        function() {
          M.apply(this, arguments);
        },
        P
      );
    },
    count: function(T) {
      var M = 0;
      return J(T, function() {
        M++;
      }), M;
    },
    toArray: function(T) {
      return J(T, function(M) {
        return M;
      }) || [];
    },
    only: function(T) {
      if (!se(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  };
  return de.Activity = C, de.Children = Ee, de.Component = F, de.Fragment = u, de.Profiler = r, de.PureComponent = X, de.StrictMode = c, de.Suspense = v, de.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = z, de.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return z.H.useMemoCache(T);
    }
  }, de.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, de.cacheSignal = function() {
    return null;
  }, de.cloneElement = function(T, M, P) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var $ = D({}, T.props), re = T.key;
    if (M != null)
      for (le in M.key !== void 0 && (re = "" + M.key), M)
        !Y.call(M, le) || le === "key" || le === "__self" || le === "__source" || le === "ref" && M.ref === void 0 || ($[le] = M[le]);
    var le = arguments.length - 2;
    if (le === 1) $.children = P;
    else if (1 < le) {
      for (var ae = Array(le), Ke = 0; Ke < le; Ke++)
        ae[Ke] = arguments[Ke + 2];
      $.children = ae;
    }
    return pe(T.type, re, $);
  }, de.createContext = function(T) {
    return T = {
      $$typeof: g,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: m,
      _context: T
    }, T;
  }, de.createElement = function(T, M, P) {
    var $, re = {}, le = null;
    if (M != null)
      for ($ in M.key !== void 0 && (le = "" + M.key), M)
        Y.call(M, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (re[$] = M[$]);
    var ae = arguments.length - 2;
    if (ae === 1) re.children = P;
    else if (1 < ae) {
      for (var Ke = Array(ae), De = 0; De < ae; De++)
        Ke[De] = arguments[De + 2];
      re.children = Ke;
    }
    if (T && T.defaultProps)
      for ($ in ae = T.defaultProps, ae)
        re[$] === void 0 && (re[$] = ae[$]);
    return pe(T, le, re);
  }, de.createRef = function() {
    return { current: null };
  }, de.forwardRef = function(T) {
    return { $$typeof: h, render: T };
  }, de.isValidElement = se, de.lazy = function(T) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: T },
      _init: ie
    };
  }, de.memo = function(T, M) {
    return {
      $$typeof: y,
      type: T,
      compare: M === void 0 ? null : M
    };
  }, de.startTransition = function(T) {
    var M = z.T, P = {};
    z.T = P;
    try {
      var $ = T(), re = z.S;
      re !== null && re(P, $), typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(W, Me);
    } catch (le) {
      Me(le);
    } finally {
      M !== null && P.types !== null && (M.types = P.types), z.T = M;
    }
  }, de.unstable_useCacheRefresh = function() {
    return z.H.useCacheRefresh();
  }, de.use = function(T) {
    return z.H.use(T);
  }, de.useActionState = function(T, M, P) {
    return z.H.useActionState(T, M, P);
  }, de.useCallback = function(T, M) {
    return z.H.useCallback(T, M);
  }, de.useContext = function(T) {
    return z.H.useContext(T);
  }, de.useDebugValue = function() {
  }, de.useDeferredValue = function(T, M) {
    return z.H.useDeferredValue(T, M);
  }, de.useEffect = function(T, M) {
    return z.H.useEffect(T, M);
  }, de.useEffectEvent = function(T) {
    return z.H.useEffectEvent(T);
  }, de.useId = function() {
    return z.H.useId();
  }, de.useImperativeHandle = function(T, M, P) {
    return z.H.useImperativeHandle(T, M, P);
  }, de.useInsertionEffect = function(T, M) {
    return z.H.useInsertionEffect(T, M);
  }, de.useLayoutEffect = function(T, M) {
    return z.H.useLayoutEffect(T, M);
  }, de.useMemo = function(T, M) {
    return z.H.useMemo(T, M);
  }, de.useOptimistic = function(T, M) {
    return z.H.useOptimistic(T, M);
  }, de.useReducer = function(T, M, P) {
    return z.H.useReducer(T, M, P);
  }, de.useRef = function(T) {
    return z.H.useRef(T);
  }, de.useState = function(T) {
    return z.H.useState(T);
  }, de.useSyncExternalStore = function(T, M, P) {
    return z.H.useSyncExternalStore(
      T,
      M,
      P
    );
  }, de.useTransition = function() {
    return z.H.useTransition();
  }, de.version = "19.2.4", de;
}
var Op;
function $f() {
  return Op || (Op = 1, qd.exports = BS()), qd.exports;
}
var Kd = { exports: {} }, ot = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zp;
function jS() {
  if (zp) return ot;
  zp = 1;
  var n = $f();
  function i(v) {
    var y = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        y += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + v + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function u() {
  }
  var c = {
    d: {
      f: u,
      r: function() {
        throw Error(i(522));
      },
      D: u,
      C: u,
      L: u,
      m: u,
      X: u,
      S: u,
      M: u
    },
    p: 0,
    findDOMNode: null
  }, r = Symbol.for("react.portal");
  function m(v, y, b) {
    var C = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: C == null ? null : "" + C,
      children: v,
      containerInfo: y,
      implementation: b
    };
  }
  var g = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(v, y) {
    if (v === "font") return "";
    if (typeof y == "string")
      return y === "use-credentials" ? y : "";
  }
  return ot.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, ot.createPortal = function(v, y) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(i(299));
    return m(v, y, null, b);
  }, ot.flushSync = function(v) {
    var y = g.T, b = c.p;
    try {
      if (g.T = null, c.p = 2, v) return v();
    } finally {
      g.T = y, c.p = b, c.d.f();
    }
  }, ot.preconnect = function(v, y) {
    typeof v == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, c.d.C(v, y));
  }, ot.prefetchDNS = function(v) {
    typeof v == "string" && c.d.D(v);
  }, ot.preinit = function(v, y) {
    if (typeof v == "string" && y && typeof y.as == "string") {
      var b = y.as, C = h(b, y.crossOrigin), A = typeof y.integrity == "string" ? y.integrity : void 0, w = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      b === "style" ? c.d.S(
        v,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: C,
          integrity: A,
          fetchPriority: w
        }
      ) : b === "script" && c.d.X(v, {
        crossOrigin: C,
        integrity: A,
        fetchPriority: w,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0
      });
    }
  }, ot.preinitModule = function(v, y) {
    if (typeof v == "string")
      if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var b = h(
            y.as,
            y.crossOrigin
          );
          c.d.M(v, {
            crossOrigin: b,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0
          });
        }
      } else y == null && c.d.M(v);
  }, ot.preload = function(v, y) {
    if (typeof v == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var b = y.as, C = h(b, y.crossOrigin);
      c.d.L(v, b, {
        crossOrigin: C,
        integrity: typeof y.integrity == "string" ? y.integrity : void 0,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0,
        type: typeof y.type == "string" ? y.type : void 0,
        fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
        referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
        imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
        imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
        media: typeof y.media == "string" ? y.media : void 0
      });
    }
  }, ot.preloadModule = function(v, y) {
    if (typeof v == "string")
      if (y) {
        var b = h(y.as, y.crossOrigin);
        c.d.m(v, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: b,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0
        });
      } else c.d.m(v);
  }, ot.requestFormReset = function(v) {
    c.d.r(v);
  }, ot.unstable_batchedUpdates = function(v, y) {
    return v(y);
  }, ot.useFormState = function(v, y, b) {
    return g.H.useFormState(v, y, b);
  }, ot.useFormStatus = function() {
    return g.H.useHostTransitionStatus();
  }, ot.version = "19.2.4", ot;
}
var Bp;
function K1() {
  if (Bp) return Kd.exports;
  Bp = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), Kd.exports = jS(), Kd.exports;
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
var jp;
function LS() {
  if (jp) return ds;
  jp = 1;
  var n = zS(), i = $f(), u = K1();
  function c(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function m(e) {
    var t = e, a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function g(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function v(e) {
    if (m(e) !== e)
      throw Error(c(188));
  }
  function y(e) {
    var t = e.alternate;
    if (!t) {
      if (t = m(e), t === null) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var a = e, l = t; ; ) {
      var s = a.return;
      if (s === null) break;
      var o = s.alternate;
      if (o === null) {
        if (l = s.return, l !== null) {
          a = l;
          continue;
        }
        break;
      }
      if (s.child === o.child) {
        for (o = s.child; o; ) {
          if (o === a) return v(s), e;
          if (o === l) return v(s), t;
          o = o.sibling;
        }
        throw Error(c(188));
      }
      if (a.return !== l.return) a = s, l = o;
      else {
        for (var f = !1, p = s.child; p; ) {
          if (p === a) {
            f = !0, a = s, l = o;
            break;
          }
          if (p === l) {
            f = !0, l = s, a = o;
            break;
          }
          p = p.sibling;
        }
        if (!f) {
          for (p = o.child; p; ) {
            if (p === a) {
              f = !0, a = o, l = s;
              break;
            }
            if (p === l) {
              f = !0, l = o, a = s;
              break;
            }
            p = p.sibling;
          }
          if (!f) throw Error(c(189));
        }
      }
      if (a.alternate !== l) throw Error(c(190));
    }
    if (a.tag !== 3) throw Error(c(188));
    return a.stateNode.current === a ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = b(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var C = Object.assign, A = Symbol.for("react.element"), w = Symbol.for("react.transitional.element"), L = Symbol.for("react.portal"), D = Symbol.for("react.fragment"), H = Symbol.for("react.strict_mode"), F = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), X = Symbol.for("react.context"), Q = Symbol.for("react.forward_ref"), Z = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), z = Symbol.for("react.memo"), Y = Symbol.for("react.lazy"), pe = Symbol.for("react.activity"), oe = Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
  function fe(e) {
    return e === null || typeof e != "object" ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ne = Symbol.for("react.client.reference");
  function Re(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ne ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case D:
        return "Fragment";
      case F:
        return "Profiler";
      case H:
        return "StrictMode";
      case Z:
        return "Suspense";
      case W:
        return "SuspenseList";
      case pe:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case L:
          return "Portal";
        case X:
          return e.displayName || "Context";
        case V:
          return (e._context.displayName || "Context") + ".Consumer";
        case Q:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case z:
          return t = e.displayName || null, t !== null ? t : Re(e.type) || "Memo";
        case Y:
          t = e._payload, e = e._init;
          try {
            return Re(e(t));
          } catch {
          }
      }
    return null;
  }
  var ue = Array.isArray, O = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ie = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Me = [], Ee = -1;
  function T(e) {
    return { current: e };
  }
  function M(e) {
    0 > Ee || (e.current = Me[Ee], Me[Ee] = null, Ee--);
  }
  function P(e, t) {
    Ee++, Me[Ee] = e.current, e.current = t;
  }
  var $ = T(null), re = T(null), le = T(null), ae = T(null);
  function Ke(e, t) {
    switch (P(le, t), P(re, e), P($, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? _0(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = _0(t), e = $0(t, e);
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
    M($), P($, e);
  }
  function De() {
    M($), M(re), M(le);
  }
  function $t(e) {
    e.memoizedState !== null && P(ae, e);
    var t = $.current, a = $0(t, e.type);
    t !== a && (P(re, e), P($, a));
  }
  function ea(e) {
    re.current === e && (M($), M(re)), ae.current === e && (M(ae), ss._currentValue = ie);
  }
  var En, el;
  function Jt(e) {
    if (En === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        En = t && t[1] || "", el = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + En + e + el;
  }
  var Ua = !1;
  function Da(e, t) {
    if (!e || Ua) return "";
    Ua = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var K = function() {
                throw Error();
              };
              if (Object.defineProperty(K.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(K, []);
                } catch (U) {
                  var k = U;
                }
                Reflect.construct(e, [], K);
              } else {
                try {
                  K.call();
                } catch (U) {
                  k = U;
                }
                e.call(K.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (U) {
                k = U;
              }
              (K = e()) && typeof K.catch == "function" && K.catch(function() {
              });
            }
          } catch (U) {
            if (U && k && typeof U.stack == "string")
              return [U.stack, k.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var o = l.DetermineComponentFrameRoot(), f = o[0], p = o[1];
      if (f && p) {
        var S = f.split(`
`), I = p.split(`
`);
        for (s = l = 0; l < S.length && !S[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; s < I.length && !I[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (l === S.length || s === I.length)
          for (l = S.length - 1, s = I.length - 1; 1 <= l && 0 <= s && S[l] !== I[s]; )
            s--;
        for (; 1 <= l && 0 <= s; l--, s--)
          if (S[l] !== I[s]) {
            if (l !== 1 || s !== 1)
              do
                if (l--, s--, 0 > s || S[l] !== I[s]) {
                  var B = `
` + S[l].replace(" at new ", " at ");
                  return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), B;
                }
              while (1 <= l && 0 <= s);
            break;
          }
      }
    } finally {
      Ua = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? Jt(a) : "";
  }
  function tu(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Jt(e.type);
      case 16:
        return Jt("Lazy");
      case 13:
        return e.child !== t && t !== null ? Jt("Suspense Fallback") : Jt("Suspense");
      case 19:
        return Jt("SuspenseList");
      case 0:
      case 15:
        return Da(e.type, !1);
      case 11:
        return Da(e.type.render, !1);
      case 1:
        return Da(e.type, !0);
      case 31:
        return Jt("Activity");
      default:
        return "";
    }
  }
  function gi(e) {
    try {
      var t = "", a = null;
      do
        t += tu(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var hi = Object.prototype.hasOwnProperty, ft = n.unstable_scheduleCallback, Tn = n.unstable_cancelCallback, tl = n.unstable_shouldYield, al = n.unstable_requestPaint, _e = n.unstable_now, pi = n.unstable_getCurrentPriorityLevel, yi = n.unstable_ImmediatePriority, vi = n.unstable_UserBlockingPriority, Oa = n.unstable_NormalPriority, mt = n.unstable_LowPriority, da = n.unstable_IdlePriority, Yt = n.log, nl = n.unstable_setDisableYieldValue, Ut = null, Ze = null;
  function Tt(e) {
    if (typeof Yt == "function" && nl(e), Ze && typeof Ze.setStrictMode == "function")
      try {
        Ze.setStrictMode(Ut, e);
      } catch {
      }
  }
  var Ct = Math.clz32 ? Math.clz32 : pv, gv = Math.log, hv = Math.LN2;
  function pv(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (gv(e) / hv | 0) | 0;
  }
  var au = 256, nu = 262144, lu = 4194304;
  function Cn(e) {
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
  function iu(e, t, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var s = 0, o = e.suspendedLanes, f = e.pingedLanes;
    e = e.warmLanes;
    var p = l & 134217727;
    return p !== 0 ? (l = p & ~o, l !== 0 ? s = Cn(l) : (f &= p, f !== 0 ? s = Cn(f) : a || (a = p & ~e, a !== 0 && (s = Cn(a))))) : (p = l & ~o, p !== 0 ? s = Cn(p) : f !== 0 ? s = Cn(f) : a || (a = l & ~e, a !== 0 && (s = Cn(a)))), s === 0 ? 0 : t !== 0 && t !== s && (t & o) === 0 && (o = s & -s, a = t & -t, o >= a || o === 32 && (a & 4194048) !== 0) ? t : s;
  }
  function Ai(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function yv(e, t) {
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
  function Dm() {
    var e = lu;
    return lu <<= 1, (lu & 62914560) === 0 && (lu = 4194304), e;
  }
  function Co(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Si(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function vv(e, t, a, l, s, o) {
    var f = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var p = e.entanglements, S = e.expirationTimes, I = e.hiddenUpdates;
    for (a = f & ~a; 0 < a; ) {
      var B = 31 - Ct(a), K = 1 << B;
      p[B] = 0, S[B] = -1;
      var k = I[B];
      if (k !== null)
        for (I[B] = null, B = 0; B < k.length; B++) {
          var U = k[B];
          U !== null && (U.lane &= -536870913);
        }
      a &= ~K;
    }
    l !== 0 && Om(e, l, 0), o !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= o & ~(f & ~t));
  }
  function Om(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - Ct(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 261930;
  }
  function zm(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var l = 31 - Ct(a), s = 1 << l;
      s & t | e[l] & t && (e[l] |= t), a &= ~s;
    }
  }
  function Bm(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : No(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function No(e) {
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
  function Mo(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function jm() {
    var e = J.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Ep(e.type));
  }
  function Lm(e, t) {
    var a = J.p;
    try {
      return J.p = e, t();
    } finally {
      J.p = a;
    }
  }
  var za = Math.random().toString(36).slice(2), at = "__reactFiber$" + za, ht = "__reactProps$" + za, ll = "__reactContainer$" + za, xo = "__reactEvents$" + za, Av = "__reactListeners$" + za, Sv = "__reactHandles$" + za, Gm = "__reactResources$" + za, bi = "__reactMarker$" + za;
  function Io(e) {
    delete e[at], delete e[ht], delete e[xo], delete e[Av], delete e[Sv];
  }
  function il(e) {
    var t = e[at];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[ll] || a[at]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = sp(e); e !== null; ) {
            if (a = e[at]) return a;
            e = sp(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function sl(e) {
    if (e = e[at] || e[ll]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ei(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function ul(e) {
    var t = e[Gm];
    return t || (t = e[Gm] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function $e(e) {
    e[bi] = !0;
  }
  var qm = /* @__PURE__ */ new Set(), Km = {};
  function Nn(e, t) {
    cl(e, t), cl(e + "Capture", t);
  }
  function cl(e, t) {
    for (Km[e] = t, e = 0; e < t.length; e++)
      qm.add(t[e]);
  }
  var bv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Hm = {}, Vm = {};
  function Ev(e) {
    return hi.call(Vm, e) ? !0 : hi.call(Hm, e) ? !1 : bv.test(e) ? Vm[e] = !0 : (Hm[e] = !0, !1);
  }
  function su(e, t, a) {
    if (Ev(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
  }
  function uu(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function fa(e, t, a, l) {
    if (l === null) e.removeAttribute(a);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + l);
    }
  }
  function Dt(e) {
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
  function Xm(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Tv(e, t, a) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var s = l.get, o = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(f) {
          a = "" + f, o.call(this, f);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(f) {
          a = "" + f;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function ko(e) {
    if (!e._valueTracker) {
      var t = Xm(e) ? "checked" : "value";
      e._valueTracker = Tv(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Qm(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), l = "";
    return e && (l = Xm(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (t.setValue(e), !0) : !1;
  }
  function cu(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Cv = /[\n"\\]/g;
  function Ot(e) {
    return e.replace(
      Cv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ro(e, t, a, l, s, o, f, p) {
    e.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.type = f : e.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Dt(t)) : e.value !== "" + Dt(t) && (e.value = "" + Dt(t)) : f !== "submit" && f !== "reset" || e.removeAttribute("value"), t != null ? wo(e, f, Dt(t)) : a != null ? wo(e, f, Dt(a)) : l != null && e.removeAttribute("value"), s == null && o != null && (e.defaultChecked = !!o), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" ? e.name = "" + Dt(p) : e.removeAttribute("name");
  }
  function Zm(e, t, a, l, s, o, f, p) {
    if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.type = o), t != null || a != null) {
      if (!(o !== "submit" && o !== "reset" || t != null)) {
        ko(e);
        return;
      }
      a = a != null ? "" + Dt(a) : "", t = t != null ? "" + Dt(t) : a, p || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? s, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = p ? e.checked : !!l, e.defaultChecked = !!l, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.name = f), ko(e);
  }
  function wo(e, t, a) {
    t === "number" && cu(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
  }
  function ol(e, t, a, l) {
    if (e = e.options, t) {
      t = {};
      for (var s = 0; s < a.length; s++)
        t["$" + a[s]] = !0;
      for (a = 0; a < e.length; a++)
        s = t.hasOwnProperty("$" + e[a].value), e[a].selected !== s && (e[a].selected = s), s && l && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + Dt(a), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === a) {
          e[s].selected = !0, l && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Jm(e, t, a) {
    if (t != null && (t = "" + Dt(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + Dt(a) : "";
  }
  function Ym(e, t, a, l) {
    if (t == null) {
      if (l != null) {
        if (a != null) throw Error(c(92));
        if (ue(l)) {
          if (1 < l.length) throw Error(c(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), t = a;
    }
    a = Dt(t), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l), ko(e);
  }
  function rl(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Nv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Pm(e, t, a) {
    var l = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Nv.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function Fm(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(c(62));
    if (e = e.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var s in t)
        l = t[s], t.hasOwnProperty(s) && a[s] !== l && Pm(e, s, l);
    } else
      for (var o in t)
        t.hasOwnProperty(o) && Pm(e, o, t[o]);
  }
  function Uo(e) {
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
  var Mv = /* @__PURE__ */ new Map([
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
  ]), xv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ou(e) {
    return xv.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ma() {
  }
  var Do = null;
  function Oo(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var dl = null, fl = null;
  function Wm(e) {
    var t = sl(e);
    if (t && (e = t.stateNode)) {
      var a = e[ht] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ro(
            e,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), t = a.name, a.type === "radio" && t != null) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + Ot(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var l = a[t];
              if (l !== e && l.form === e.form) {
                var s = l[ht] || null;
                if (!s) throw Error(c(90));
                Ro(
                  l,
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
            for (t = 0; t < a.length; t++)
              l = a[t], l.form === e.form && Qm(l);
          }
          break e;
        case "textarea":
          Jm(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && ol(e, !!a.multiple, t, !1);
      }
    }
  }
  var zo = !1;
  function _m(e, t, a) {
    if (zo) return e(t, a);
    zo = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (zo = !1, (dl !== null || fl !== null) && (Fu(), dl && (t = dl, e = fl, fl = dl = null, Wm(t), e)))
        for (t = 0; t < e.length; t++) Wm(e[t]);
    }
  }
  function Ti(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var l = a[ht] || null;
    if (l === null) return null;
    a = l[t];
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
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function")
      throw Error(
        c(231, t, typeof a)
      );
    return a;
  }
  var ga = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bo = !1;
  if (ga)
    try {
      var Ci = {};
      Object.defineProperty(Ci, "passive", {
        get: function() {
          Bo = !0;
        }
      }), window.addEventListener("test", Ci, Ci), window.removeEventListener("test", Ci, Ci);
    } catch {
      Bo = !1;
    }
  var Ba = null, jo = null, ru = null;
  function $m() {
    if (ru) return ru;
    var e, t = jo, a = t.length, l, s = "value" in Ba ? Ba.value : Ba.textContent, o = s.length;
    for (e = 0; e < a && t[e] === s[e]; e++) ;
    var f = a - e;
    for (l = 1; l <= f && t[a - l] === s[o - l]; l++) ;
    return ru = s.slice(e, 1 < l ? 1 - l : void 0);
  }
  function du(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function fu() {
    return !0;
  }
  function eg() {
    return !1;
  }
  function pt(e) {
    function t(a, l, s, o, f) {
      this._reactName = a, this._targetInst = s, this.type = l, this.nativeEvent = o, this.target = f, this.currentTarget = null;
      for (var p in e)
        e.hasOwnProperty(p) && (a = e[p], this[p] = a ? a(o) : o[p]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? fu : eg, this.isPropagationStopped = eg, this;
    }
    return C(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = fu);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = fu);
      },
      persist: function() {
      },
      isPersistent: fu
    }), t;
  }
  var Mn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, mu = pt(Mn), Ni = C({}, Mn, { view: 0, detail: 0 }), Iv = pt(Ni), Lo, Go, Mi, gu = C({}, Ni, {
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
    getModifierState: Ko,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Mi && (Mi && e.type === "mousemove" ? (Lo = e.screenX - Mi.screenX, Go = e.screenY - Mi.screenY) : Go = Lo = 0, Mi = e), Lo);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Go;
    }
  }), tg = pt(gu), kv = C({}, gu, { dataTransfer: 0 }), Rv = pt(kv), wv = C({}, Ni, { relatedTarget: 0 }), qo = pt(wv), Uv = C({}, Mn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Dv = pt(Uv), Ov = C({}, Mn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), zv = pt(Ov), Bv = C({}, Mn, { data: 0 }), ag = pt(Bv), jv = {
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
  }, Lv = {
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
  }, Gv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function qv(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Gv[e]) ? !!t[e] : !1;
  }
  function Ko() {
    return qv;
  }
  var Kv = C({}, Ni, {
    key: function(e) {
      if (e.key) {
        var t = jv[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = du(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Lv[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ko,
    charCode: function(e) {
      return e.type === "keypress" ? du(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? du(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Hv = pt(Kv), Vv = C({}, gu, {
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
  }), ng = pt(Vv), Xv = C({}, Ni, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ko
  }), Qv = pt(Xv), Zv = C({}, Mn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Jv = pt(Zv), Yv = C({}, gu, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Pv = pt(Yv), Fv = C({}, Mn, {
    newState: 0,
    oldState: 0
  }), Wv = pt(Fv), _v = [9, 13, 27, 32], Ho = ga && "CompositionEvent" in window, xi = null;
  ga && "documentMode" in document && (xi = document.documentMode);
  var $v = ga && "TextEvent" in window && !xi, lg = ga && (!Ho || xi && 8 < xi && 11 >= xi), ig = " ", sg = !1;
  function ug(e, t) {
    switch (e) {
      case "keyup":
        return _v.indexOf(t.keyCode) !== -1;
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
  function cg(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ml = !1;
  function eA(e, t) {
    switch (e) {
      case "compositionend":
        return cg(t);
      case "keypress":
        return t.which !== 32 ? null : (sg = !0, ig);
      case "textInput":
        return e = t.data, e === ig && sg ? null : e;
      default:
        return null;
    }
  }
  function tA(e, t) {
    if (ml)
      return e === "compositionend" || !Ho && ug(e, t) ? (e = $m(), ru = jo = Ba = null, ml = !1, e) : null;
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
        return lg && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var aA = {
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
  function og(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!aA[e.type] : t === "textarea";
  }
  function rg(e, t, a, l) {
    dl ? fl ? fl.push(l) : fl = [l] : dl = l, t = nc(t, "onChange"), 0 < t.length && (a = new mu(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: t }));
  }
  var Ii = null, ki = null;
  function nA(e) {
    Z0(e, 0);
  }
  function hu(e) {
    var t = Ei(e);
    if (Qm(t)) return e;
  }
  function dg(e, t) {
    if (e === "change") return t;
  }
  var fg = !1;
  if (ga) {
    var Vo;
    if (ga) {
      var Xo = "oninput" in document;
      if (!Xo) {
        var mg = document.createElement("div");
        mg.setAttribute("oninput", "return;"), Xo = typeof mg.oninput == "function";
      }
      Vo = Xo;
    } else Vo = !1;
    fg = Vo && (!document.documentMode || 9 < document.documentMode);
  }
  function gg() {
    Ii && (Ii.detachEvent("onpropertychange", hg), ki = Ii = null);
  }
  function hg(e) {
    if (e.propertyName === "value" && hu(ki)) {
      var t = [];
      rg(
        t,
        ki,
        e,
        Oo(e)
      ), _m(nA, t);
    }
  }
  function lA(e, t, a) {
    e === "focusin" ? (gg(), Ii = t, ki = a, Ii.attachEvent("onpropertychange", hg)) : e === "focusout" && gg();
  }
  function iA(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return hu(ki);
  }
  function sA(e, t) {
    if (e === "click") return hu(t);
  }
  function uA(e, t) {
    if (e === "input" || e === "change")
      return hu(t);
  }
  function cA(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Nt = typeof Object.is == "function" ? Object.is : cA;
  function Ri(e, t) {
    if (Nt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var s = a[l];
      if (!hi.call(t, s) || !Nt(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function pg(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function yg(e, t) {
    var a = pg(e);
    e = 0;
    for (var l; a; ) {
      if (a.nodeType === 3) {
        if (l = e + a.textContent.length, e <= t && l >= t)
          return { node: a, offset: t - e };
        e = l;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = pg(a);
    }
  }
  function vg(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? vg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Ag(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = cu(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = cu(e.document);
    }
    return t;
  }
  function Qo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var oA = ga && "documentMode" in document && 11 >= document.documentMode, gl = null, Zo = null, wi = null, Jo = !1;
  function Sg(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Jo || gl == null || gl !== cu(l) || (l = gl, "selectionStart" in l && Qo(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), wi && Ri(wi, l) || (wi = l, l = nc(Zo, "onSelect"), 0 < l.length && (t = new mu(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: l }), t.target = gl)));
  }
  function xn(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var hl = {
    animationend: xn("Animation", "AnimationEnd"),
    animationiteration: xn("Animation", "AnimationIteration"),
    animationstart: xn("Animation", "AnimationStart"),
    transitionrun: xn("Transition", "TransitionRun"),
    transitionstart: xn("Transition", "TransitionStart"),
    transitioncancel: xn("Transition", "TransitionCancel"),
    transitionend: xn("Transition", "TransitionEnd")
  }, Yo = {}, bg = {};
  ga && (bg = document.createElement("div").style, "AnimationEvent" in window || (delete hl.animationend.animation, delete hl.animationiteration.animation, delete hl.animationstart.animation), "TransitionEvent" in window || delete hl.transitionend.transition);
  function In(e) {
    if (Yo[e]) return Yo[e];
    if (!hl[e]) return e;
    var t = hl[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in bg)
        return Yo[e] = t[a];
    return e;
  }
  var Eg = In("animationend"), Tg = In("animationiteration"), Cg = In("animationstart"), rA = In("transitionrun"), dA = In("transitionstart"), fA = In("transitioncancel"), Ng = In("transitionend"), Mg = /* @__PURE__ */ new Map(), Po = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Po.push("scrollEnd");
  function Pt(e, t) {
    Mg.set(e, t), Nn(t, [e]);
  }
  var pu = typeof reportError == "function" ? reportError : function(e) {
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
  }, zt = [], pl = 0, Fo = 0;
  function yu() {
    for (var e = pl, t = Fo = pl = 0; t < e; ) {
      var a = zt[t];
      zt[t++] = null;
      var l = zt[t];
      zt[t++] = null;
      var s = zt[t];
      zt[t++] = null;
      var o = zt[t];
      if (zt[t++] = null, l !== null && s !== null) {
        var f = l.pending;
        f === null ? s.next = s : (s.next = f.next, f.next = s), l.pending = s;
      }
      o !== 0 && xg(a, s, o);
    }
  }
  function vu(e, t, a, l) {
    zt[pl++] = e, zt[pl++] = t, zt[pl++] = a, zt[pl++] = l, Fo |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Wo(e, t, a, l) {
    return vu(e, t, a, l), Au(e);
  }
  function kn(e, t) {
    return vu(e, null, null, t), Au(e);
  }
  function xg(e, t, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var s = !1, o = e.return; o !== null; )
      o.childLanes |= a, l = o.alternate, l !== null && (l.childLanes |= a), o.tag === 22 && (e = o.stateNode, e === null || e._visibility & 1 || (s = !0)), e = o, o = o.return;
    return e.tag === 3 ? (o = e.stateNode, s && t !== null && (s = 31 - Ct(a), e = o.hiddenUpdates, l = e[s], l === null ? e[s] = [t] : l.push(t), t.lane = a | 536870912), o) : null;
  }
  function Au(e) {
    if (50 < $i)
      throw $i = 0, sd = null, Error(c(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var yl = {};
  function mA(e, t, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Mt(e, t, a, l) {
    return new mA(e, t, a, l);
  }
  function _o(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ha(e, t) {
    var a = e.alternate;
    return a === null ? (a = Mt(
      e.tag,
      t,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function Ig(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Su(e, t, a, l, s, o) {
    var f = 0;
    if (l = e, typeof e == "function") _o(e) && (f = 1);
    else if (typeof e == "string")
      f = vS(
        e,
        a,
        $.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case pe:
          return e = Mt(31, a, t, s), e.elementType = pe, e.lanes = o, e;
        case D:
          return Rn(a.children, s, o, t);
        case H:
          f = 8, s |= 24;
          break;
        case F:
          return e = Mt(12, a, t, s | 2), e.elementType = F, e.lanes = o, e;
        case Z:
          return e = Mt(13, a, t, s), e.elementType = Z, e.lanes = o, e;
        case W:
          return e = Mt(19, a, t, s), e.elementType = W, e.lanes = o, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case X:
                f = 10;
                break e;
              case V:
                f = 9;
                break e;
              case Q:
                f = 11;
                break e;
              case z:
                f = 14;
                break e;
              case Y:
                f = 16, l = null;
                break e;
            }
          f = 29, a = Error(
            c(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = Mt(f, a, t, s), t.elementType = e, t.type = l, t.lanes = o, t;
  }
  function Rn(e, t, a, l) {
    return e = Mt(7, e, l, t), e.lanes = a, e;
  }
  function $o(e, t, a) {
    return e = Mt(6, e, null, t), e.lanes = a, e;
  }
  function kg(e) {
    var t = Mt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function er(e, t, a) {
    return t = Mt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = a, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Rg = /* @__PURE__ */ new WeakMap();
  function Bt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Rg.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: gi(t)
      }, Rg.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: gi(t)
    };
  }
  var vl = [], Al = 0, bu = null, Ui = 0, jt = [], Lt = 0, ja = null, ta = 1, aa = "";
  function pa(e, t) {
    vl[Al++] = Ui, vl[Al++] = bu, bu = e, Ui = t;
  }
  function wg(e, t, a) {
    jt[Lt++] = ta, jt[Lt++] = aa, jt[Lt++] = ja, ja = e;
    var l = ta;
    e = aa;
    var s = 32 - Ct(l) - 1;
    l &= ~(1 << s), a += 1;
    var o = 32 - Ct(t) + s;
    if (30 < o) {
      var f = s - s % 5;
      o = (l & (1 << f) - 1).toString(32), l >>= f, s -= f, ta = 1 << 32 - Ct(t) + s | a << s | l, aa = o + e;
    } else
      ta = 1 << o | a << s | l, aa = e;
  }
  function tr(e) {
    e.return !== null && (pa(e, 1), wg(e, 1, 0));
  }
  function ar(e) {
    for (; e === bu; )
      bu = vl[--Al], vl[Al] = null, Ui = vl[--Al], vl[Al] = null;
    for (; e === ja; )
      ja = jt[--Lt], jt[Lt] = null, aa = jt[--Lt], jt[Lt] = null, ta = jt[--Lt], jt[Lt] = null;
  }
  function Ug(e, t) {
    jt[Lt++] = ta, jt[Lt++] = aa, jt[Lt++] = ja, ta = t.id, aa = t.overflow, ja = e;
  }
  var nt = null, Le = null, Te = !1, La = null, Gt = !1, nr = Error(c(519));
  function Ga(e) {
    var t = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Di(Bt(t, e)), nr;
  }
  function Dg(e) {
    var t = e.stateNode, a = e.type, l = e.memoizedProps;
    switch (t[at] = e, t[ht] = l, a) {
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
        for (a = 0; a < ts.length; a++)
          ve(ts[a], t);
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
        ve("invalid", t), Zm(
          t,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        ve("invalid", t);
        break;
      case "textarea":
        ve("invalid", t), Ym(t, l.value, l.defaultValue, l.children);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || l.suppressHydrationWarning === !0 || F0(t.textContent, a) ? (l.popover != null && (ve("beforetoggle", t), ve("toggle", t)), l.onScroll != null && ve("scroll", t), l.onScrollEnd != null && ve("scrollend", t), l.onClick != null && (t.onclick = ma), t = !0) : t = !1, t || Ga(e, !0);
  }
  function Og(e) {
    for (nt = e.return; nt; )
      switch (nt.tag) {
        case 5:
        case 31:
        case 13:
          Gt = !1;
          return;
        case 27:
        case 3:
          Gt = !0;
          return;
        default:
          nt = nt.return;
      }
  }
  function Sl(e) {
    if (e !== nt) return !1;
    if (!Te) return Og(e), Te = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || bd(e.type, e.memoizedProps)), a = !a), a && Le && Ga(e), Og(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Le = ip(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Le = ip(e);
    } else
      t === 27 ? (t = Le, $a(e.type) ? (e = Md, Md = null, Le = e) : Le = t) : Le = nt ? Kt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function wn() {
    Le = nt = null, Te = !1;
  }
  function lr() {
    var e = La;
    return e !== null && (St === null ? St = e : St.push.apply(
      St,
      e
    ), La = null), e;
  }
  function Di(e) {
    La === null ? La = [e] : La.push(e);
  }
  var ir = T(null), Un = null, ya = null;
  function qa(e, t, a) {
    P(ir, t._currentValue), t._currentValue = a;
  }
  function va(e) {
    e._currentValue = ir.current, M(ir);
  }
  function sr(e, t, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function ur(e, t, a, l) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var o = s.dependencies;
      if (o !== null) {
        var f = s.child;
        o = o.firstContext;
        e: for (; o !== null; ) {
          var p = o;
          o = s;
          for (var S = 0; S < t.length; S++)
            if (p.context === t[S]) {
              o.lanes |= a, p = o.alternate, p !== null && (p.lanes |= a), sr(
                o.return,
                a,
                e
              ), l || (f = null);
              break e;
            }
          o = p.next;
        }
      } else if (s.tag === 18) {
        if (f = s.return, f === null) throw Error(c(341));
        f.lanes |= a, o = f.alternate, o !== null && (o.lanes |= a), sr(f, a, e), f = null;
      } else f = s.child;
      if (f !== null) f.return = s;
      else
        for (f = s; f !== null; ) {
          if (f === e) {
            f = null;
            break;
          }
          if (s = f.sibling, s !== null) {
            s.return = f.return, f = s;
            break;
          }
          f = f.return;
        }
      s = f;
    }
  }
  function bl(e, t, a, l) {
    e = null;
    for (var s = t, o = !1; s !== null; ) {
      if (!o) {
        if ((s.flags & 524288) !== 0) o = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var f = s.alternate;
        if (f === null) throw Error(c(387));
        if (f = f.memoizedProps, f !== null) {
          var p = s.type;
          Nt(s.pendingProps.value, f.value) || (e !== null ? e.push(p) : e = [p]);
        }
      } else if (s === ae.current) {
        if (f = s.alternate, f === null) throw Error(c(387));
        f.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(ss) : e = [ss]);
      }
      s = s.return;
    }
    e !== null && ur(
      t,
      e,
      a,
      l
    ), t.flags |= 262144;
  }
  function Eu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Nt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Dn(e) {
    Un = e, ya = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function lt(e) {
    return zg(Un, e);
  }
  function Tu(e, t) {
    return Un === null && Dn(e), zg(e, t);
  }
  function zg(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, ya === null) {
      if (e === null) throw Error(c(308));
      ya = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else ya = ya.next = t;
    return a;
  }
  var gA = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(a, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(a) {
        return a();
      });
    };
  }, hA = n.unstable_scheduleCallback, pA = n.unstable_NormalPriority, Je = {
    $$typeof: X,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function cr() {
    return {
      controller: new gA(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Oi(e) {
    e.refCount--, e.refCount === 0 && hA(pA, function() {
      e.controller.abort();
    });
  }
  var zi = null, or = 0, El = 0, Tl = null;
  function yA(e, t) {
    if (zi === null) {
      var a = zi = [];
      or = 0, El = fd(), Tl = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return or++, t.then(Bg, Bg), t;
  }
  function Bg() {
    if (--or === 0 && zi !== null) {
      Tl !== null && (Tl.status = "fulfilled");
      var e = zi;
      zi = null, El = 0, Tl = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function vA(e, t) {
    var a = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        a.push(s);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var s = 0; s < a.length; s++) (0, a[s])(t);
      },
      function(s) {
        for (l.status = "rejected", l.reason = s, s = 0; s < a.length; s++)
          (0, a[s])(void 0);
      }
    ), l;
  }
  var jg = O.S;
  O.S = function(e, t) {
    S0 = _e(), typeof t == "object" && t !== null && typeof t.then == "function" && yA(e, t), jg !== null && jg(e, t);
  };
  var On = T(null);
  function rr() {
    var e = On.current;
    return e !== null ? e : je.pooledCache;
  }
  function Cu(e, t) {
    t === null ? P(On, On.current) : P(On, t.pool);
  }
  function Lg() {
    var e = rr();
    return e === null ? null : { parent: Je._currentValue, pool: e };
  }
  var Cl = Error(c(460)), dr = Error(c(474)), Nu = Error(c(542)), Mu = { then: function() {
  } };
  function Gg(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function qg(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(ma, ma), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Hg(e), e;
      default:
        if (typeof t.status == "string") t.then(ma, ma);
        else {
          if (e = je, e !== null && 100 < e.shellSuspendCounter)
            throw Error(c(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var s = t;
                s.status = "fulfilled", s.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var s = t;
                s.status = "rejected", s.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Hg(e), e;
        }
        throw Bn = t, Cl;
    }
  }
  function zn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Bn = a, Cl) : a;
    }
  }
  var Bn = null;
  function Kg() {
    if (Bn === null) throw Error(c(459));
    var e = Bn;
    return Bn = null, e;
  }
  function Hg(e) {
    if (e === Cl || e === Nu)
      throw Error(c(483));
  }
  var Nl = null, Bi = 0;
  function xu(e) {
    var t = Bi;
    return Bi += 1, Nl === null && (Nl = []), qg(Nl, e, t);
  }
  function ji(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Iu(e, t) {
    throw t.$$typeof === A ? Error(c(525)) : (e = Object.prototype.toString.call(t), Error(
      c(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Vg(e) {
    function t(N, E) {
      if (e) {
        var x = N.deletions;
        x === null ? (N.deletions = [E], N.flags |= 16) : x.push(E);
      }
    }
    function a(N, E) {
      if (!e) return null;
      for (; E !== null; )
        t(N, E), E = E.sibling;
      return null;
    }
    function l(N) {
      for (var E = /* @__PURE__ */ new Map(); N !== null; )
        N.key !== null ? E.set(N.key, N) : E.set(N.index, N), N = N.sibling;
      return E;
    }
    function s(N, E) {
      return N = ha(N, E), N.index = 0, N.sibling = null, N;
    }
    function o(N, E, x) {
      return N.index = x, e ? (x = N.alternate, x !== null ? (x = x.index, x < E ? (N.flags |= 67108866, E) : x) : (N.flags |= 67108866, E)) : (N.flags |= 1048576, E);
    }
    function f(N) {
      return e && N.alternate === null && (N.flags |= 67108866), N;
    }
    function p(N, E, x, G) {
      return E === null || E.tag !== 6 ? (E = $o(x, N.mode, G), E.return = N, E) : (E = s(E, x), E.return = N, E);
    }
    function S(N, E, x, G) {
      var ne = x.type;
      return ne === D ? B(
        N,
        E,
        x.props.children,
        G,
        x.key
      ) : E !== null && (E.elementType === ne || typeof ne == "object" && ne !== null && ne.$$typeof === Y && zn(ne) === E.type) ? (E = s(E, x.props), ji(E, x), E.return = N, E) : (E = Su(
        x.type,
        x.key,
        x.props,
        null,
        N.mode,
        G
      ), ji(E, x), E.return = N, E);
    }
    function I(N, E, x, G) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== x.containerInfo || E.stateNode.implementation !== x.implementation ? (E = er(x, N.mode, G), E.return = N, E) : (E = s(E, x.children || []), E.return = N, E);
    }
    function B(N, E, x, G, ne) {
      return E === null || E.tag !== 7 ? (E = Rn(
        x,
        N.mode,
        G,
        ne
      ), E.return = N, E) : (E = s(E, x), E.return = N, E);
    }
    function K(N, E, x) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = $o(
          "" + E,
          N.mode,
          x
        ), E.return = N, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case w:
            return x = Su(
              E.type,
              E.key,
              E.props,
              null,
              N.mode,
              x
            ), ji(x, E), x.return = N, x;
          case L:
            return E = er(
              E,
              N.mode,
              x
            ), E.return = N, E;
          case Y:
            return E = zn(E), K(N, E, x);
        }
        if (ue(E) || fe(E))
          return E = Rn(
            E,
            N.mode,
            x,
            null
          ), E.return = N, E;
        if (typeof E.then == "function")
          return K(N, xu(E), x);
        if (E.$$typeof === X)
          return K(
            N,
            Tu(N, E),
            x
          );
        Iu(N, E);
      }
      return null;
    }
    function k(N, E, x, G) {
      var ne = E !== null ? E.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return ne !== null ? null : p(N, E, "" + x, G);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case w:
            return x.key === ne ? S(N, E, x, G) : null;
          case L:
            return x.key === ne ? I(N, E, x, G) : null;
          case Y:
            return x = zn(x), k(N, E, x, G);
        }
        if (ue(x) || fe(x))
          return ne !== null ? null : B(N, E, x, G, null);
        if (typeof x.then == "function")
          return k(
            N,
            E,
            xu(x),
            G
          );
        if (x.$$typeof === X)
          return k(
            N,
            E,
            Tu(N, x),
            G
          );
        Iu(N, x);
      }
      return null;
    }
    function U(N, E, x, G, ne) {
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return N = N.get(x) || null, p(E, N, "" + G, ne);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case w:
            return N = N.get(
              G.key === null ? x : G.key
            ) || null, S(E, N, G, ne);
          case L:
            return N = N.get(
              G.key === null ? x : G.key
            ) || null, I(E, N, G, ne);
          case Y:
            return G = zn(G), U(
              N,
              E,
              x,
              G,
              ne
            );
        }
        if (ue(G) || fe(G))
          return N = N.get(x) || null, B(E, N, G, ne, null);
        if (typeof G.then == "function")
          return U(
            N,
            E,
            x,
            xu(G),
            ne
          );
        if (G.$$typeof === X)
          return U(
            N,
            E,
            x,
            Tu(E, G),
            ne
          );
        Iu(E, G);
      }
      return null;
    }
    function ee(N, E, x, G) {
      for (var ne = null, xe = null, te = E, he = E = 0, be = null; te !== null && he < x.length; he++) {
        te.index > he ? (be = te, te = null) : be = te.sibling;
        var Ie = k(
          N,
          te,
          x[he],
          G
        );
        if (Ie === null) {
          te === null && (te = be);
          break;
        }
        e && te && Ie.alternate === null && t(N, te), E = o(Ie, E, he), xe === null ? ne = Ie : xe.sibling = Ie, xe = Ie, te = be;
      }
      if (he === x.length)
        return a(N, te), Te && pa(N, he), ne;
      if (te === null) {
        for (; he < x.length; he++)
          te = K(N, x[he], G), te !== null && (E = o(
            te,
            E,
            he
          ), xe === null ? ne = te : xe.sibling = te, xe = te);
        return Te && pa(N, he), ne;
      }
      for (te = l(te); he < x.length; he++)
        be = U(
          te,
          N,
          he,
          x[he],
          G
        ), be !== null && (e && be.alternate !== null && te.delete(
          be.key === null ? he : be.key
        ), E = o(
          be,
          E,
          he
        ), xe === null ? ne = be : xe.sibling = be, xe = be);
      return e && te.forEach(function(ln) {
        return t(N, ln);
      }), Te && pa(N, he), ne;
    }
    function ce(N, E, x, G) {
      if (x == null) throw Error(c(151));
      for (var ne = null, xe = null, te = E, he = E = 0, be = null, Ie = x.next(); te !== null && !Ie.done; he++, Ie = x.next()) {
        te.index > he ? (be = te, te = null) : be = te.sibling;
        var ln = k(N, te, Ie.value, G);
        if (ln === null) {
          te === null && (te = be);
          break;
        }
        e && te && ln.alternate === null && t(N, te), E = o(ln, E, he), xe === null ? ne = ln : xe.sibling = ln, xe = ln, te = be;
      }
      if (Ie.done)
        return a(N, te), Te && pa(N, he), ne;
      if (te === null) {
        for (; !Ie.done; he++, Ie = x.next())
          Ie = K(N, Ie.value, G), Ie !== null && (E = o(Ie, E, he), xe === null ? ne = Ie : xe.sibling = Ie, xe = Ie);
        return Te && pa(N, he), ne;
      }
      for (te = l(te); !Ie.done; he++, Ie = x.next())
        Ie = U(te, N, he, Ie.value, G), Ie !== null && (e && Ie.alternate !== null && te.delete(Ie.key === null ? he : Ie.key), E = o(Ie, E, he), xe === null ? ne = Ie : xe.sibling = Ie, xe = Ie);
      return e && te.forEach(function(kS) {
        return t(N, kS);
      }), Te && pa(N, he), ne;
    }
    function Be(N, E, x, G) {
      if (typeof x == "object" && x !== null && x.type === D && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case w:
            e: {
              for (var ne = x.key; E !== null; ) {
                if (E.key === ne) {
                  if (ne = x.type, ne === D) {
                    if (E.tag === 7) {
                      a(
                        N,
                        E.sibling
                      ), G = s(
                        E,
                        x.props.children
                      ), G.return = N, N = G;
                      break e;
                    }
                  } else if (E.elementType === ne || typeof ne == "object" && ne !== null && ne.$$typeof === Y && zn(ne) === E.type) {
                    a(
                      N,
                      E.sibling
                    ), G = s(E, x.props), ji(G, x), G.return = N, N = G;
                    break e;
                  }
                  a(N, E);
                  break;
                } else t(N, E);
                E = E.sibling;
              }
              x.type === D ? (G = Rn(
                x.props.children,
                N.mode,
                G,
                x.key
              ), G.return = N, N = G) : (G = Su(
                x.type,
                x.key,
                x.props,
                null,
                N.mode,
                G
              ), ji(G, x), G.return = N, N = G);
            }
            return f(N);
          case L:
            e: {
              for (ne = x.key; E !== null; ) {
                if (E.key === ne)
                  if (E.tag === 4 && E.stateNode.containerInfo === x.containerInfo && E.stateNode.implementation === x.implementation) {
                    a(
                      N,
                      E.sibling
                    ), G = s(E, x.children || []), G.return = N, N = G;
                    break e;
                  } else {
                    a(N, E);
                    break;
                  }
                else t(N, E);
                E = E.sibling;
              }
              G = er(x, N.mode, G), G.return = N, N = G;
            }
            return f(N);
          case Y:
            return x = zn(x), Be(
              N,
              E,
              x,
              G
            );
        }
        if (ue(x))
          return ee(
            N,
            E,
            x,
            G
          );
        if (fe(x)) {
          if (ne = fe(x), typeof ne != "function") throw Error(c(150));
          return x = ne.call(x), ce(
            N,
            E,
            x,
            G
          );
        }
        if (typeof x.then == "function")
          return Be(
            N,
            E,
            xu(x),
            G
          );
        if (x.$$typeof === X)
          return Be(
            N,
            E,
            Tu(N, x),
            G
          );
        Iu(N, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, E !== null && E.tag === 6 ? (a(N, E.sibling), G = s(E, x), G.return = N, N = G) : (a(N, E), G = $o(x, N.mode, G), G.return = N, N = G), f(N)) : a(N, E);
    }
    return function(N, E, x, G) {
      try {
        Bi = 0;
        var ne = Be(
          N,
          E,
          x,
          G
        );
        return Nl = null, ne;
      } catch (te) {
        if (te === Cl || te === Nu) throw te;
        var xe = Mt(29, te, null, N.mode);
        return xe.lanes = G, xe.return = N, xe;
      } finally {
      }
    };
  }
  var jn = Vg(!0), Xg = Vg(!1), Ka = !1;
  function fr(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function mr(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Ha(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Va(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (ke & 2) !== 0) {
      var s = l.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), l.pending = t, t = Au(e), xg(e, null, a), t;
    }
    return vu(e, l, t, a), Au(e);
  }
  function Li(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, zm(e, a);
    }
  }
  function gr(e, t) {
    var a = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, a === l)) {
      var s = null, o = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var f = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          o === null ? s = o = f : o = o.next = f, a = a.next;
        } while (a !== null);
        o === null ? s = o = t : o = o.next = t;
      } else s = o = t;
      a = {
        baseState: l.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: o,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = a;
      return;
    }
    e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
  }
  var hr = !1;
  function Gi() {
    if (hr) {
      var e = Tl;
      if (e !== null) throw e;
    }
  }
  function qi(e, t, a, l) {
    hr = !1;
    var s = e.updateQueue;
    Ka = !1;
    var o = s.firstBaseUpdate, f = s.lastBaseUpdate, p = s.shared.pending;
    if (p !== null) {
      s.shared.pending = null;
      var S = p, I = S.next;
      S.next = null, f === null ? o = I : f.next = I, f = S;
      var B = e.alternate;
      B !== null && (B = B.updateQueue, p = B.lastBaseUpdate, p !== f && (p === null ? B.firstBaseUpdate = I : p.next = I, B.lastBaseUpdate = S));
    }
    if (o !== null) {
      var K = s.baseState;
      f = 0, B = I = S = null, p = o;
      do {
        var k = p.lane & -536870913, U = k !== p.lane;
        if (U ? (Se & k) === k : (l & k) === k) {
          k !== 0 && k === El && (hr = !0), B !== null && (B = B.next = {
            lane: 0,
            tag: p.tag,
            payload: p.payload,
            callback: null,
            next: null
          });
          e: {
            var ee = e, ce = p;
            k = t;
            var Be = a;
            switch (ce.tag) {
              case 1:
                if (ee = ce.payload, typeof ee == "function") {
                  K = ee.call(Be, K, k);
                  break e;
                }
                K = ee;
                break e;
              case 3:
                ee.flags = ee.flags & -65537 | 128;
              case 0:
                if (ee = ce.payload, k = typeof ee == "function" ? ee.call(Be, K, k) : ee, k == null) break e;
                K = C({}, K, k);
                break e;
              case 2:
                Ka = !0;
            }
          }
          k = p.callback, k !== null && (e.flags |= 64, U && (e.flags |= 8192), U = s.callbacks, U === null ? s.callbacks = [k] : U.push(k));
        } else
          U = {
            lane: k,
            tag: p.tag,
            payload: p.payload,
            callback: p.callback,
            next: null
          }, B === null ? (I = B = U, S = K) : B = B.next = U, f |= k;
        if (p = p.next, p === null) {
          if (p = s.shared.pending, p === null)
            break;
          U = p, p = U.next, U.next = null, s.lastBaseUpdate = U, s.shared.pending = null;
        }
      } while (!0);
      B === null && (S = K), s.baseState = S, s.firstBaseUpdate = I, s.lastBaseUpdate = B, o === null && (s.shared.lanes = 0), Ya |= f, e.lanes = f, e.memoizedState = K;
    }
  }
  function Qg(e, t) {
    if (typeof e != "function")
      throw Error(c(191, e));
    e.call(t);
  }
  function Zg(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        Qg(a[e], t);
  }
  var Ml = T(null), ku = T(0);
  function Jg(e, t) {
    e = xa, P(ku, e), P(Ml, t), xa = e | t.baseLanes;
  }
  function pr() {
    P(ku, xa), P(Ml, Ml.current);
  }
  function yr() {
    xa = ku.current, M(Ml), M(ku);
  }
  var xt = T(null), qt = null;
  function Xa(e) {
    var t = e.alternate;
    P(Xe, Xe.current & 1), P(xt, e), qt === null && (t === null || Ml.current !== null || t.memoizedState !== null) && (qt = e);
  }
  function vr(e) {
    P(Xe, Xe.current), P(xt, e), qt === null && (qt = e);
  }
  function Yg(e) {
    e.tag === 22 ? (P(Xe, Xe.current), P(xt, e), qt === null && (qt = e)) : Qa();
  }
  function Qa() {
    P(Xe, Xe.current), P(xt, xt.current);
  }
  function It(e) {
    M(xt), qt === e && (qt = null), M(Xe);
  }
  var Xe = T(0);
  function Ru(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Cd(a) || Nd(a)))
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
  var Aa = 0, me = null, Oe = null, Ye = null, wu = !1, xl = !1, Ln = !1, Uu = 0, Ki = 0, Il = null, AA = 0;
  function He() {
    throw Error(c(321));
  }
  function Ar(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!Nt(e[a], t[a])) return !1;
    return !0;
  }
  function Sr(e, t, a, l, s, o) {
    return Aa = o, me = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? wh : zr, Ln = !1, o = a(l, s), Ln = !1, xl && (o = Fg(
      t,
      a,
      l,
      s
    )), Pg(e), o;
  }
  function Pg(e) {
    O.H = Xi;
    var t = Oe !== null && Oe.next !== null;
    if (Aa = 0, Ye = Oe = me = null, wu = !1, Ki = 0, Il = null, t) throw Error(c(300));
    e === null || Pe || (e = e.dependencies, e !== null && Eu(e) && (Pe = !0));
  }
  function Fg(e, t, a, l) {
    me = e;
    var s = 0;
    do {
      if (xl && (Il = null), Ki = 0, xl = !1, 25 <= s) throw Error(c(301));
      if (s += 1, Ye = Oe = null, e.updateQueue != null) {
        var o = e.updateQueue;
        o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
      }
      O.H = Uh, o = t(a, l);
    } while (xl);
    return o;
  }
  function SA() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Hi(t) : t, e = e.useState()[0], (Oe !== null ? Oe.memoizedState : null) !== e && (me.flags |= 1024), t;
  }
  function br() {
    var e = Uu !== 0;
    return Uu = 0, e;
  }
  function Er(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function Tr(e) {
    if (wu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      wu = !1;
    }
    Aa = 0, Ye = Oe = me = null, xl = !1, Ki = Uu = 0, Il = null;
  }
  function gt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ye === null ? me.memoizedState = Ye = e : Ye = Ye.next = e, Ye;
  }
  function Qe() {
    if (Oe === null) {
      var e = me.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Oe.next;
    var t = Ye === null ? me.memoizedState : Ye.next;
    if (t !== null)
      Ye = t, Oe = e;
    else {
      if (e === null)
        throw me.alternate === null ? Error(c(467)) : Error(c(310));
      Oe = e, e = {
        memoizedState: Oe.memoizedState,
        baseState: Oe.baseState,
        baseQueue: Oe.baseQueue,
        queue: Oe.queue,
        next: null
      }, Ye === null ? me.memoizedState = Ye = e : Ye = Ye.next = e;
    }
    return Ye;
  }
  function Du() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Hi(e) {
    var t = Ki;
    return Ki += 1, Il === null && (Il = []), e = qg(Il, e, t), t = me, (Ye === null ? t.memoizedState : Ye.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? wh : zr), e;
  }
  function Ou(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Hi(e);
      if (e.$$typeof === X) return lt(e);
    }
    throw Error(c(438, String(e)));
  }
  function Cr(e) {
    var t = null, a = me.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var l = me.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Du(), me.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++)
        a[l] = oe;
    return t.index++, a;
  }
  function Sa(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function zu(e) {
    var t = Qe();
    return Nr(t, Oe, e);
  }
  function Nr(e, t, a) {
    var l = e.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = a;
    var s = e.baseQueue, o = l.pending;
    if (o !== null) {
      if (s !== null) {
        var f = s.next;
        s.next = o.next, o.next = f;
      }
      t.baseQueue = s = o, l.pending = null;
    }
    if (o = e.baseState, s === null) e.memoizedState = o;
    else {
      t = s.next;
      var p = f = null, S = null, I = t, B = !1;
      do {
        var K = I.lane & -536870913;
        if (K !== I.lane ? (Se & K) === K : (Aa & K) === K) {
          var k = I.revertLane;
          if (k === 0)
            S !== null && (S = S.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: I.action,
              hasEagerState: I.hasEagerState,
              eagerState: I.eagerState,
              next: null
            }), K === El && (B = !0);
          else if ((Aa & k) === k) {
            I = I.next, k === El && (B = !0);
            continue;
          } else
            K = {
              lane: 0,
              revertLane: I.revertLane,
              gesture: null,
              action: I.action,
              hasEagerState: I.hasEagerState,
              eagerState: I.eagerState,
              next: null
            }, S === null ? (p = S = K, f = o) : S = S.next = K, me.lanes |= k, Ya |= k;
          K = I.action, Ln && a(o, K), o = I.hasEagerState ? I.eagerState : a(o, K);
        } else
          k = {
            lane: K,
            revertLane: I.revertLane,
            gesture: I.gesture,
            action: I.action,
            hasEagerState: I.hasEagerState,
            eagerState: I.eagerState,
            next: null
          }, S === null ? (p = S = k, f = o) : S = S.next = k, me.lanes |= K, Ya |= K;
        I = I.next;
      } while (I !== null && I !== t);
      if (S === null ? f = o : S.next = p, !Nt(o, e.memoizedState) && (Pe = !0, B && (a = Tl, a !== null)))
        throw a;
      e.memoizedState = o, e.baseState = f, e.baseQueue = S, l.lastRenderedState = o;
    }
    return s === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Mr(e) {
    var t = Qe(), a = t.queue;
    if (a === null) throw Error(c(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch, s = a.pending, o = t.memoizedState;
    if (s !== null) {
      a.pending = null;
      var f = s = s.next;
      do
        o = e(o, f.action), f = f.next;
      while (f !== s);
      Nt(o, t.memoizedState) || (Pe = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), a.lastRenderedState = o;
    }
    return [o, l];
  }
  function Wg(e, t, a) {
    var l = me, s = Qe(), o = Te;
    if (o) {
      if (a === void 0) throw Error(c(407));
      a = a();
    } else a = t();
    var f = !Nt(
      (Oe || s).memoizedState,
      a
    );
    if (f && (s.memoizedState = a, Pe = !0), s = s.queue, kr(eh.bind(null, l, s, e), [
      e
    ]), s.getSnapshot !== t || f || Ye !== null && Ye.memoizedState.tag & 1) {
      if (l.flags |= 2048, kl(
        9,
        { destroy: void 0 },
        $g.bind(
          null,
          l,
          s,
          a,
          t
        ),
        null
      ), je === null) throw Error(c(349));
      o || (Aa & 127) !== 0 || _g(l, t, a);
    }
    return a;
  }
  function _g(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = me.updateQueue, t === null ? (t = Du(), me.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function $g(e, t, a, l) {
    t.value = a, t.getSnapshot = l, th(t) && ah(e);
  }
  function eh(e, t, a) {
    return a(function() {
      th(t) && ah(e);
    });
  }
  function th(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Nt(e, a);
    } catch {
      return !0;
    }
  }
  function ah(e) {
    var t = kn(e, 2);
    t !== null && bt(t, e, 2);
  }
  function xr(e) {
    var t = gt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), Ln) {
        Tt(!0);
        try {
          a();
        } finally {
          Tt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Sa,
      lastRenderedState: e
    }, t;
  }
  function nh(e, t, a, l) {
    return e.baseState = a, Nr(
      e,
      Oe,
      typeof l == "function" ? l : Sa
    );
  }
  function bA(e, t, a, l, s) {
    if (Lu(e)) throw Error(c(485));
    if (e = t.action, e !== null) {
      var o = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(f) {
          o.listeners.push(f);
        }
      };
      O.T !== null ? a(!0) : o.isTransition = !1, l(o), a = t.pending, a === null ? (o.next = t.pending = o, lh(t, o)) : (o.next = a.next, t.pending = a.next = o);
    }
  }
  function lh(e, t) {
    var a = t.action, l = t.payload, s = e.state;
    if (t.isTransition) {
      var o = O.T, f = {};
      O.T = f;
      try {
        var p = a(s, l), S = O.S;
        S !== null && S(f, p), ih(e, t, p);
      } catch (I) {
        Ir(e, t, I);
      } finally {
        o !== null && f.types !== null && (o.types = f.types), O.T = o;
      }
    } else
      try {
        o = a(s, l), ih(e, t, o);
      } catch (I) {
        Ir(e, t, I);
      }
  }
  function ih(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        sh(e, t, l);
      },
      function(l) {
        return Ir(e, t, l);
      }
    ) : sh(e, t, a);
  }
  function sh(e, t, a) {
    t.status = "fulfilled", t.value = a, uh(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, lh(e, a)));
  }
  function Ir(e, t, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = a, uh(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function uh(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function ch(e, t) {
    return t;
  }
  function oh(e, t) {
    if (Te) {
      var a = je.formState;
      if (a !== null) {
        e: {
          var l = me;
          if (Te) {
            if (Le) {
              t: {
                for (var s = Le, o = Gt; s.nodeType !== 8; ) {
                  if (!o) {
                    s = null;
                    break t;
                  }
                  if (s = Kt(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                o = s.data, s = o === "F!" || o === "F" ? s : null;
              }
              if (s) {
                Le = Kt(
                  s.nextSibling
                ), l = s.data === "F!";
                break e;
              }
            }
            Ga(l);
          }
          l = !1;
        }
        l && (t = a[0]);
      }
    }
    return a = gt(), a.memoizedState = a.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ch,
      lastRenderedState: t
    }, a.queue = l, a = Ih.bind(
      null,
      me,
      l
    ), l.dispatch = a, l = xr(!1), o = Or.bind(
      null,
      me,
      !1,
      l.queue
    ), l = gt(), s = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = s, a = bA.bind(
      null,
      me,
      s,
      o,
      a
    ), s.dispatch = a, l.memoizedState = e, [t, a, !1];
  }
  function rh(e) {
    var t = Qe();
    return dh(t, Oe, e);
  }
  function dh(e, t, a) {
    if (t = Nr(
      e,
      t,
      ch
    )[0], e = zu(Sa)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Hi(t);
      } catch (f) {
        throw f === Cl ? Nu : f;
      }
    else l = t;
    t = Qe();
    var s = t.queue, o = s.dispatch;
    return a !== t.memoizedState && (me.flags |= 2048, kl(
      9,
      { destroy: void 0 },
      EA.bind(null, s, a),
      null
    )), [l, o, e];
  }
  function EA(e, t) {
    e.action = t;
  }
  function fh(e) {
    var t = Qe(), a = Oe;
    if (a !== null)
      return dh(t, a, e);
    Qe(), t = t.memoizedState, a = Qe();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [t, l, !1];
  }
  function kl(e, t, a, l) {
    return e = { tag: e, create: a, deps: l, inst: t, next: null }, t = me.updateQueue, t === null && (t = Du(), me.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, t.lastEffect = e), e;
  }
  function mh() {
    return Qe().memoizedState;
  }
  function Bu(e, t, a, l) {
    var s = gt();
    me.flags |= e, s.memoizedState = kl(
      1 | t,
      { destroy: void 0 },
      a,
      l === void 0 ? null : l
    );
  }
  function ju(e, t, a, l) {
    var s = Qe();
    l = l === void 0 ? null : l;
    var o = s.memoizedState.inst;
    Oe !== null && l !== null && Ar(l, Oe.memoizedState.deps) ? s.memoizedState = kl(t, o, a, l) : (me.flags |= e, s.memoizedState = kl(
      1 | t,
      o,
      a,
      l
    ));
  }
  function gh(e, t) {
    Bu(8390656, 8, e, t);
  }
  function kr(e, t) {
    ju(2048, 8, e, t);
  }
  function TA(e) {
    me.flags |= 4;
    var t = me.updateQueue;
    if (t === null)
      t = Du(), me.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function hh(e) {
    var t = Qe().memoizedState;
    return TA({ ref: t, nextImpl: e }), function() {
      if ((ke & 2) !== 0) throw Error(c(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ph(e, t) {
    return ju(4, 2, e, t);
  }
  function yh(e, t) {
    return ju(4, 4, e, t);
  }
  function vh(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Ah(e, t, a) {
    a = a != null ? a.concat([e]) : null, ju(4, 4, vh.bind(null, t, e), a);
  }
  function Rr() {
  }
  function Sh(e, t) {
    var a = Qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Ar(t, l[1]) ? l[0] : (a.memoizedState = [e, t], e);
  }
  function bh(e, t) {
    var a = Qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Ar(t, l[1]))
      return l[0];
    if (l = e(), Ln) {
      Tt(!0);
      try {
        e();
      } finally {
        Tt(!1);
      }
    }
    return a.memoizedState = [l, t], l;
  }
  function wr(e, t, a) {
    return a === void 0 || (Aa & 1073741824) !== 0 && (Se & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = E0(), me.lanes |= e, Ya |= e, a);
  }
  function Eh(e, t, a, l) {
    return Nt(a, t) ? a : Ml.current !== null ? (e = wr(e, a, l), Nt(e, t) || (Pe = !0), e) : (Aa & 42) === 0 || (Aa & 1073741824) !== 0 && (Se & 261930) === 0 ? (Pe = !0, e.memoizedState = a) : (e = E0(), me.lanes |= e, Ya |= e, t);
  }
  function Th(e, t, a, l, s) {
    var o = J.p;
    J.p = o !== 0 && 8 > o ? o : 8;
    var f = O.T, p = {};
    O.T = p, Or(e, !1, t, a);
    try {
      var S = s(), I = O.S;
      if (I !== null && I(p, S), S !== null && typeof S == "object" && typeof S.then == "function") {
        var B = vA(
          S,
          l
        );
        Vi(
          e,
          t,
          B,
          wt(e)
        );
      } else
        Vi(
          e,
          t,
          l,
          wt(e)
        );
    } catch (K) {
      Vi(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: K },
        wt()
      );
    } finally {
      J.p = o, f !== null && p.types !== null && (f.types = p.types), O.T = f;
    }
  }
  function CA() {
  }
  function Ur(e, t, a, l) {
    if (e.tag !== 5) throw Error(c(476));
    var s = Ch(e).queue;
    Th(
      e,
      s,
      t,
      ie,
      a === null ? CA : function() {
        return Nh(e), a(l);
      }
    );
  }
  function Ch(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ie,
      baseState: ie,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Sa,
        lastRenderedState: ie
      },
      next: null
    };
    var a = {};
    return t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Sa,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Nh(e) {
    var t = Ch(e);
    t.next === null && (t = e.alternate.memoizedState), Vi(
      e,
      t.next.queue,
      {},
      wt()
    );
  }
  function Dr() {
    return lt(ss);
  }
  function Mh() {
    return Qe().memoizedState;
  }
  function xh() {
    return Qe().memoizedState;
  }
  function NA(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = wt();
          e = Ha(a);
          var l = Va(t, e, a);
          l !== null && (bt(l, t, a), Li(l, t, a)), t = { cache: cr() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function MA(e, t, a) {
    var l = wt();
    a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Lu(e) ? kh(t, a) : (a = Wo(e, t, a, l), a !== null && (bt(a, e, l), Rh(a, t, l)));
  }
  function Ih(e, t, a) {
    var l = wt();
    Vi(e, t, a, l);
  }
  function Vi(e, t, a, l) {
    var s = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Lu(e)) kh(t, s);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null))
        try {
          var f = t.lastRenderedState, p = o(f, a);
          if (s.hasEagerState = !0, s.eagerState = p, Nt(p, f))
            return vu(e, t, s, 0), je === null && yu(), !1;
        } catch {
        } finally {
        }
      if (a = Wo(e, t, s, l), a !== null)
        return bt(a, e, l), Rh(a, t, l), !0;
    }
    return !1;
  }
  function Or(e, t, a, l) {
    if (l = {
      lane: 2,
      revertLane: fd(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Lu(e)) {
      if (t) throw Error(c(479));
    } else
      t = Wo(
        e,
        a,
        l,
        2
      ), t !== null && bt(t, e, 2);
  }
  function Lu(e) {
    var t = e.alternate;
    return e === me || t !== null && t === me;
  }
  function kh(e, t) {
    xl = wu = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Rh(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, zm(e, a);
    }
  }
  var Xi = {
    readContext: lt,
    use: Ou,
    useCallback: He,
    useContext: He,
    useEffect: He,
    useImperativeHandle: He,
    useLayoutEffect: He,
    useInsertionEffect: He,
    useMemo: He,
    useReducer: He,
    useRef: He,
    useState: He,
    useDebugValue: He,
    useDeferredValue: He,
    useTransition: He,
    useSyncExternalStore: He,
    useId: He,
    useHostTransitionStatus: He,
    useFormState: He,
    useActionState: He,
    useOptimistic: He,
    useMemoCache: He,
    useCacheRefresh: He
  };
  Xi.useEffectEvent = He;
  var wh = {
    readContext: lt,
    use: Ou,
    useCallback: function(e, t) {
      return gt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: lt,
    useEffect: gh,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Bu(
        4194308,
        4,
        vh.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return Bu(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Bu(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = gt();
      t = t === void 0 ? null : t;
      var l = e();
      if (Ln) {
        Tt(!0);
        try {
          e();
        } finally {
          Tt(!1);
        }
      }
      return a.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, a) {
      var l = gt();
      if (a !== void 0) {
        var s = a(t);
        if (Ln) {
          Tt(!0);
          try {
            a(t);
          } finally {
            Tt(!1);
          }
        }
      } else s = t;
      return l.memoizedState = l.baseState = s, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: s
      }, l.queue = e, e = e.dispatch = MA.bind(
        null,
        me,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = gt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = xr(e);
      var t = e.queue, a = Ih.bind(null, me, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: Rr,
    useDeferredValue: function(e, t) {
      var a = gt();
      return wr(a, e, t);
    },
    useTransition: function() {
      var e = xr(!1);
      return e = Th.bind(
        null,
        me,
        e.queue,
        !0,
        !1
      ), gt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var l = me, s = gt();
      if (Te) {
        if (a === void 0)
          throw Error(c(407));
        a = a();
      } else {
        if (a = t(), je === null)
          throw Error(c(349));
        (Se & 127) !== 0 || _g(l, t, a);
      }
      s.memoizedState = a;
      var o = { value: a, getSnapshot: t };
      return s.queue = o, gh(eh.bind(null, l, o, e), [
        e
      ]), l.flags |= 2048, kl(
        9,
        { destroy: void 0 },
        $g.bind(
          null,
          l,
          o,
          a,
          t
        ),
        null
      ), a;
    },
    useId: function() {
      var e = gt(), t = je.identifierPrefix;
      if (Te) {
        var a = aa, l = ta;
        a = (l & ~(1 << 32 - Ct(l) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Uu++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = AA++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Dr,
    useFormState: oh,
    useActionState: oh,
    useOptimistic: function(e) {
      var t = gt();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = Or.bind(
        null,
        me,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: Cr,
    useCacheRefresh: function() {
      return gt().memoizedState = NA.bind(
        null,
        me
      );
    },
    useEffectEvent: function(e) {
      var t = gt(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((ke & 2) !== 0)
          throw Error(c(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, zr = {
    readContext: lt,
    use: Ou,
    useCallback: Sh,
    useContext: lt,
    useEffect: kr,
    useImperativeHandle: Ah,
    useInsertionEffect: ph,
    useLayoutEffect: yh,
    useMemo: bh,
    useReducer: zu,
    useRef: mh,
    useState: function() {
      return zu(Sa);
    },
    useDebugValue: Rr,
    useDeferredValue: function(e, t) {
      var a = Qe();
      return Eh(
        a,
        Oe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = zu(Sa)[0], t = Qe().memoizedState;
      return [
        typeof e == "boolean" ? e : Hi(e),
        t
      ];
    },
    useSyncExternalStore: Wg,
    useId: Mh,
    useHostTransitionStatus: Dr,
    useFormState: rh,
    useActionState: rh,
    useOptimistic: function(e, t) {
      var a = Qe();
      return nh(a, Oe, e, t);
    },
    useMemoCache: Cr,
    useCacheRefresh: xh
  };
  zr.useEffectEvent = hh;
  var Uh = {
    readContext: lt,
    use: Ou,
    useCallback: Sh,
    useContext: lt,
    useEffect: kr,
    useImperativeHandle: Ah,
    useInsertionEffect: ph,
    useLayoutEffect: yh,
    useMemo: bh,
    useReducer: Mr,
    useRef: mh,
    useState: function() {
      return Mr(Sa);
    },
    useDebugValue: Rr,
    useDeferredValue: function(e, t) {
      var a = Qe();
      return Oe === null ? wr(a, e, t) : Eh(
        a,
        Oe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Mr(Sa)[0], t = Qe().memoizedState;
      return [
        typeof e == "boolean" ? e : Hi(e),
        t
      ];
    },
    useSyncExternalStore: Wg,
    useId: Mh,
    useHostTransitionStatus: Dr,
    useFormState: fh,
    useActionState: fh,
    useOptimistic: function(e, t) {
      var a = Qe();
      return Oe !== null ? nh(a, Oe, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Cr,
    useCacheRefresh: xh
  };
  Uh.useEffectEvent = hh;
  function Br(e, t, a, l) {
    t = e.memoizedState, a = a(l, t), a = a == null ? t : C({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var jr = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var l = wt(), s = Ha(l);
      s.payload = t, a != null && (s.callback = a), t = Va(e, s, l), t !== null && (bt(t, e, l), Li(t, e, l));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var l = wt(), s = Ha(l);
      s.tag = 1, s.payload = t, a != null && (s.callback = a), t = Va(e, s, l), t !== null && (bt(t, e, l), Li(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = wt(), l = Ha(a);
      l.tag = 2, t != null && (l.callback = t), t = Va(e, l, a), t !== null && (bt(t, e, a), Li(t, e, a));
    }
  };
  function Dh(e, t, a, l, s, o, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, o, f) : t.prototype && t.prototype.isPureReactComponent ? !Ri(a, l) || !Ri(s, o) : !0;
  }
  function Oh(e, t, a, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, l), t.state !== e && jr.enqueueReplaceState(t, t.state, null);
  }
  function Gn(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var l in t)
        l !== "ref" && (a[l] = t[l]);
    }
    if (e = e.defaultProps) {
      a === t && (a = C({}, a));
      for (var s in e)
        a[s] === void 0 && (a[s] = e[s]);
    }
    return a;
  }
  function zh(e) {
    pu(e);
  }
  function Bh(e) {
    console.error(e);
  }
  function jh(e) {
    pu(e);
  }
  function Gu(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Lh(e, t, a) {
    try {
      var l = e.onCaughtError;
      l(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function Lr(e, t, a) {
    return a = Ha(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Gu(e, t);
    }, a;
  }
  function Gh(e) {
    return e = Ha(e), e.tag = 3, e;
  }
  function qh(e, t, a, l) {
    var s = a.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var o = l.value;
      e.payload = function() {
        return s(o);
      }, e.callback = function() {
        Lh(t, a, l);
      };
    }
    var f = a.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (e.callback = function() {
      Lh(t, a, l), typeof s != "function" && (Pa === null ? Pa = /* @__PURE__ */ new Set([this]) : Pa.add(this));
      var p = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: p !== null ? p : ""
      });
    });
  }
  function xA(e, t, a, l, s) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = a.alternate, t !== null && bl(
        t,
        a,
        s,
        !0
      ), a = xt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return qt === null ? Wu() : a.alternate === null && Ve === 0 && (Ve = 3), a.flags &= -257, a.flags |= 65536, a.lanes = s, l === Mu ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), od(e, l, s)), !1;
          case 22:
            return a.flags |= 65536, l === Mu ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), od(e, l, s)), !1;
        }
        throw Error(c(435, a.tag));
      }
      return od(e, l, s), Wu(), !1;
    }
    if (Te)
      return t = xt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, l !== nr && (e = Error(c(422), { cause: l }), Di(Bt(e, a)))) : (l !== nr && (t = Error(c(423), {
        cause: l
      }), Di(
        Bt(t, a)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, l = Bt(l, a), s = Lr(
        e.stateNode,
        l,
        s
      ), gr(e, s), Ve !== 4 && (Ve = 2)), !1;
    var o = Error(c(520), { cause: l });
    if (o = Bt(o, a), _i === null ? _i = [o] : _i.push(o), Ve !== 4 && (Ve = 2), t === null) return !0;
    l = Bt(l, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = s & -s, a.lanes |= e, e = Lr(a.stateNode, l, e), gr(a, e), !1;
        case 1:
          if (t = a.type, o = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (Pa === null || !Pa.has(o))))
            return a.flags |= 65536, s &= -s, a.lanes |= s, s = Gh(s), qh(
              s,
              e,
              a,
              l
            ), gr(a, s), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Gr = Error(c(461)), Pe = !1;
  function it(e, t, a, l) {
    t.child = e === null ? Xg(t, null, a, l) : jn(
      t,
      e.child,
      a,
      l
    );
  }
  function Kh(e, t, a, l, s) {
    a = a.render;
    var o = t.ref;
    if ("ref" in l) {
      var f = {};
      for (var p in l)
        p !== "ref" && (f[p] = l[p]);
    } else f = l;
    return Dn(t), l = Sr(
      e,
      t,
      a,
      f,
      o,
      s
    ), p = br(), e !== null && !Pe ? (Er(e, t, s), ba(e, t, s)) : (Te && p && tr(t), t.flags |= 1, it(e, t, l, s), t.child);
  }
  function Hh(e, t, a, l, s) {
    if (e === null) {
      var o = a.type;
      return typeof o == "function" && !_o(o) && o.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = o, Vh(
        e,
        t,
        o,
        l,
        s
      )) : (e = Su(
        a.type,
        null,
        l,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, !Jr(e, s)) {
      var f = o.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Ri, a(f, l) && e.ref === t.ref)
        return ba(e, t, s);
    }
    return t.flags |= 1, e = ha(o, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Vh(e, t, a, l, s) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (Ri(o, l) && e.ref === t.ref)
        if (Pe = !1, t.pendingProps = l = o, Jr(e, s))
          (e.flags & 131072) !== 0 && (Pe = !0);
        else
          return t.lanes = e.lanes, ba(e, t, s);
    }
    return qr(
      e,
      t,
      a,
      l,
      s
    );
  }
  function Xh(e, t, a, l) {
    var s = l.children, o = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (o = o !== null ? o.baseLanes | a : a, e !== null) {
          for (l = t.child = e.child, s = 0; l !== null; )
            s = s | l.lanes | l.childLanes, l = l.sibling;
          l = s & ~o;
        } else l = 0, t.child = null;
        return Qh(
          e,
          t,
          o,
          a,
          l
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Cu(
          t,
          o !== null ? o.cachePool : null
        ), o !== null ? Jg(t, o) : pr(), Yg(t);
      else
        return l = t.lanes = 536870912, Qh(
          e,
          t,
          o !== null ? o.baseLanes | a : a,
          a,
          l
        );
    } else
      o !== null ? (Cu(t, o.cachePool), Jg(t, o), Qa(), t.memoizedState = null) : (e !== null && Cu(t, null), pr(), Qa());
    return it(e, t, s, a), t.child;
  }
  function Qi(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Qh(e, t, a, l, s) {
    var o = rr();
    return o = o === null ? null : { parent: Je._currentValue, pool: o }, t.memoizedState = {
      baseLanes: a,
      cachePool: o
    }, e !== null && Cu(t, null), pr(), Yg(t), e !== null && bl(e, t, l, !0), t.childLanes = s, null;
  }
  function qu(e, t) {
    return t = Hu(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Zh(e, t, a) {
    return jn(t, e.child, null, a), e = qu(t, t.pendingProps), e.flags |= 2, It(t), t.memoizedState = null, e;
  }
  function IA(e, t, a) {
    var l = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Te) {
        if (l.mode === "hidden")
          return e = qu(t, l), t.lanes = 536870912, Qi(null, e);
        if (vr(t), (e = Le) ? (e = lp(
          e,
          Gt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ja !== null ? { id: ta, overflow: aa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = kg(e), a.return = t, t.child = a, nt = t, Le = null)) : e = null, e === null) throw Ga(t);
        return t.lanes = 536870912, null;
      }
      return qu(t, l);
    }
    var o = e.memoizedState;
    if (o !== null) {
      var f = o.dehydrated;
      if (vr(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = Zh(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(c(558));
      else if (Pe || bl(e, t, a, !1), s = (a & e.childLanes) !== 0, Pe || s) {
        if (l = je, l !== null && (f = Bm(l, a), f !== 0 && f !== o.retryLane))
          throw o.retryLane = f, kn(e, f), bt(l, e, f), Gr;
        Wu(), t = Zh(
          e,
          t,
          a
        );
      } else
        e = o.treeContext, Le = Kt(f.nextSibling), nt = t, Te = !0, La = null, Gt = !1, e !== null && Ug(t, e), t = qu(t, l), t.flags |= 4096;
      return t;
    }
    return e = ha(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Ku(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(c(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function qr(e, t, a, l, s) {
    return Dn(t), a = Sr(
      e,
      t,
      a,
      l,
      void 0,
      s
    ), l = br(), e !== null && !Pe ? (Er(e, t, s), ba(e, t, s)) : (Te && l && tr(t), t.flags |= 1, it(e, t, a, s), t.child);
  }
  function Jh(e, t, a, l, s, o) {
    return Dn(t), t.updateQueue = null, a = Fg(
      t,
      l,
      a,
      s
    ), Pg(e), l = br(), e !== null && !Pe ? (Er(e, t, o), ba(e, t, o)) : (Te && l && tr(t), t.flags |= 1, it(e, t, a, o), t.child);
  }
  function Yh(e, t, a, l, s) {
    if (Dn(t), t.stateNode === null) {
      var o = yl, f = a.contextType;
      typeof f == "object" && f !== null && (o = lt(f)), o = new a(l, o), t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, o.updater = jr, t.stateNode = o, o._reactInternals = t, o = t.stateNode, o.props = l, o.state = t.memoizedState, o.refs = {}, fr(t), f = a.contextType, o.context = typeof f == "object" && f !== null ? lt(f) : yl, o.state = t.memoizedState, f = a.getDerivedStateFromProps, typeof f == "function" && (Br(
        t,
        a,
        f,
        l
      ), o.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (f = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), f !== o.state && jr.enqueueReplaceState(o, o.state, null), qi(t, l, o, s), Gi(), o.state = t.memoizedState), typeof o.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      o = t.stateNode;
      var p = t.memoizedProps, S = Gn(a, p);
      o.props = S;
      var I = o.context, B = a.contextType;
      f = yl, typeof B == "object" && B !== null && (f = lt(B));
      var K = a.getDerivedStateFromProps;
      B = typeof K == "function" || typeof o.getSnapshotBeforeUpdate == "function", p = t.pendingProps !== p, B || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (p || I !== f) && Oh(
        t,
        o,
        l,
        f
      ), Ka = !1;
      var k = t.memoizedState;
      o.state = k, qi(t, l, o, s), Gi(), I = t.memoizedState, p || k !== I || Ka ? (typeof K == "function" && (Br(
        t,
        a,
        K,
        l
      ), I = t.memoizedState), (S = Ka || Dh(
        t,
        a,
        S,
        l,
        k,
        I,
        f
      )) ? (B || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = I), o.props = l, o.state = I, o.context = f, l = S) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      o = t.stateNode, mr(e, t), f = t.memoizedProps, B = Gn(a, f), o.props = B, K = t.pendingProps, k = o.context, I = a.contextType, S = yl, typeof I == "object" && I !== null && (S = lt(I)), p = a.getDerivedStateFromProps, (I = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (f !== K || k !== S) && Oh(
        t,
        o,
        l,
        S
      ), Ka = !1, k = t.memoizedState, o.state = k, qi(t, l, o, s), Gi();
      var U = t.memoizedState;
      f !== K || k !== U || Ka || e !== null && e.dependencies !== null && Eu(e.dependencies) ? (typeof p == "function" && (Br(
        t,
        a,
        p,
        l
      ), U = t.memoizedState), (B = Ka || Dh(
        t,
        a,
        B,
        l,
        k,
        U,
        S
      ) || e !== null && e.dependencies !== null && Eu(e.dependencies)) ? (I || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(l, U, S), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(
        l,
        U,
        S
      )), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || f === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = U), o.props = l, o.state = U, o.context = S, l = B) : (typeof o.componentDidUpdate != "function" || f === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return o = l, Ku(e, t), l = (t.flags & 128) !== 0, o || l ? (o = t.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : o.render(), t.flags |= 1, e !== null && l ? (t.child = jn(
      t,
      e.child,
      null,
      s
    ), t.child = jn(
      t,
      null,
      a,
      s
    )) : it(e, t, a, s), t.memoizedState = o.state, e = t.child) : e = ba(
      e,
      t,
      s
    ), e;
  }
  function Ph(e, t, a, l) {
    return wn(), t.flags |= 256, it(e, t, a, l), t.child;
  }
  var Kr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Hr(e) {
    return { baseLanes: e, cachePool: Lg() };
  }
  function Vr(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Rt), e;
  }
  function Fh(e, t, a) {
    var l = t.pendingProps, s = !1, o = (t.flags & 128) !== 0, f;
    if ((f = o) || (f = e !== null && e.memoizedState === null ? !1 : (Xe.current & 2) !== 0), f && (s = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Te) {
        if (s ? Xa(t) : Qa(), (e = Le) ? (e = lp(
          e,
          Gt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ja !== null ? { id: ta, overflow: aa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = kg(e), a.return = t, t.child = a, nt = t, Le = null)) : e = null, e === null) throw Ga(t);
        return Nd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var p = l.children;
      return l = l.fallback, s ? (Qa(), s = t.mode, p = Hu(
        { mode: "hidden", children: p },
        s
      ), l = Rn(
        l,
        s,
        a,
        null
      ), p.return = t, l.return = t, p.sibling = l, t.child = p, l = t.child, l.memoizedState = Hr(a), l.childLanes = Vr(
        e,
        f,
        a
      ), t.memoizedState = Kr, Qi(null, l)) : (Xa(t), Xr(t, p));
    }
    var S = e.memoizedState;
    if (S !== null && (p = S.dehydrated, p !== null)) {
      if (o)
        t.flags & 256 ? (Xa(t), t.flags &= -257, t = Qr(
          e,
          t,
          a
        )) : t.memoizedState !== null ? (Qa(), t.child = e.child, t.flags |= 128, t = null) : (Qa(), p = l.fallback, s = t.mode, l = Hu(
          { mode: "visible", children: l.children },
          s
        ), p = Rn(
          p,
          s,
          a,
          null
        ), p.flags |= 2, l.return = t, p.return = t, l.sibling = p, t.child = l, jn(
          t,
          e.child,
          null,
          a
        ), l = t.child, l.memoizedState = Hr(a), l.childLanes = Vr(
          e,
          f,
          a
        ), t.memoizedState = Kr, t = Qi(null, l));
      else if (Xa(t), Nd(p)) {
        if (f = p.nextSibling && p.nextSibling.dataset, f) var I = f.dgst;
        f = I, l = Error(c(419)), l.stack = "", l.digest = f, Di({ value: l, source: null, stack: null }), t = Qr(
          e,
          t,
          a
        );
      } else if (Pe || bl(e, t, a, !1), f = (a & e.childLanes) !== 0, Pe || f) {
        if (f = je, f !== null && (l = Bm(f, a), l !== 0 && l !== S.retryLane))
          throw S.retryLane = l, kn(e, l), bt(f, e, l), Gr;
        Cd(p) || Wu(), t = Qr(
          e,
          t,
          a
        );
      } else
        Cd(p) ? (t.flags |= 192, t.child = e.child, t = null) : (e = S.treeContext, Le = Kt(
          p.nextSibling
        ), nt = t, Te = !0, La = null, Gt = !1, e !== null && Ug(t, e), t = Xr(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (Qa(), p = l.fallback, s = t.mode, S = e.child, I = S.sibling, l = ha(S, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = S.subtreeFlags & 65011712, I !== null ? p = ha(
      I,
      p
    ) : (p = Rn(
      p,
      s,
      a,
      null
    ), p.flags |= 2), p.return = t, l.return = t, l.sibling = p, t.child = l, Qi(null, l), l = t.child, p = e.child.memoizedState, p === null ? p = Hr(a) : (s = p.cachePool, s !== null ? (S = Je._currentValue, s = s.parent !== S ? { parent: S, pool: S } : s) : s = Lg(), p = {
      baseLanes: p.baseLanes | a,
      cachePool: s
    }), l.memoizedState = p, l.childLanes = Vr(
      e,
      f,
      a
    ), t.memoizedState = Kr, Qi(e.child, l)) : (Xa(t), a = e.child, e = a.sibling, a = ha(a, {
      mode: "visible",
      children: l.children
    }), a.return = t, a.sibling = null, e !== null && (f = t.deletions, f === null ? (t.deletions = [e], t.flags |= 16) : f.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function Xr(e, t) {
    return t = Hu(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Hu(e, t) {
    return e = Mt(22, e, null, t), e.lanes = 0, e;
  }
  function Qr(e, t, a) {
    return jn(t, e.child, null, a), e = Xr(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Wh(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), sr(e.return, t, a);
  }
  function Zr(e, t, a, l, s, o) {
    var f = e.memoizedState;
    f === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: a,
      tailMode: s,
      treeForkCount: o
    } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = l, f.tail = a, f.tailMode = s, f.treeForkCount = o);
  }
  function _h(e, t, a) {
    var l = t.pendingProps, s = l.revealOrder, o = l.tail;
    l = l.children;
    var f = Xe.current, p = (f & 2) !== 0;
    if (p ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, P(Xe, f), it(e, t, l, a), l = Te ? Ui : 0, !p && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Wh(e, a, t);
        else if (e.tag === 19)
          Wh(e, a, t);
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
        for (a = t.child, s = null; a !== null; )
          e = a.alternate, e !== null && Ru(e) === null && (s = a), a = a.sibling;
        a = s, a === null ? (s = t.child, t.child = null) : (s = a.sibling, a.sibling = null), Zr(
          t,
          !1,
          s,
          a,
          o,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, s = t.child, t.child = null; s !== null; ) {
          if (e = s.alternate, e !== null && Ru(e) === null) {
            t.child = s;
            break;
          }
          e = s.sibling, s.sibling = a, a = s, s = e;
        }
        Zr(
          t,
          !0,
          a,
          null,
          o,
          l
        );
        break;
      case "together":
        Zr(
          t,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function ba(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), Ya |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (bl(
          e,
          t,
          a,
          !1
        ), (a & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, a = ha(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        e = e.sibling, a = a.sibling = ha(e, e.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function Jr(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Eu(e)));
  }
  function kA(e, t, a) {
    switch (t.tag) {
      case 3:
        Ke(t, t.stateNode.containerInfo), qa(t, Je, e.memoizedState.cache), wn();
        break;
      case 27:
      case 5:
        $t(t);
        break;
      case 4:
        Ke(t, t.stateNode.containerInfo);
        break;
      case 10:
        qa(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, vr(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Xa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Fh(e, t, a) : (Xa(t), e = ba(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        Xa(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (l = (a & t.childLanes) !== 0, l || (bl(
          e,
          t,
          a,
          !1
        ), l = (a & t.childLanes) !== 0), s) {
          if (l)
            return _h(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), P(Xe, Xe.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Xh(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        qa(t, Je, e.memoizedState.cache);
    }
    return ba(e, t, a);
  }
  function $h(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Pe = !0;
      else {
        if (!Jr(e, a) && (t.flags & 128) === 0)
          return Pe = !1, kA(
            e,
            t,
            a
          );
        Pe = (e.flags & 131072) !== 0;
      }
    else
      Pe = !1, Te && (t.flags & 1048576) !== 0 && wg(t, Ui, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = zn(t.elementType), t.type = e, typeof e == "function")
            _o(e) ? (l = Gn(e, l), t.tag = 1, t = Yh(
              null,
              t,
              e,
              l,
              a
            )) : (t.tag = 0, t = qr(
              null,
              t,
              e,
              l,
              a
            ));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === Q) {
                t.tag = 11, t = Kh(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (s === z) {
                t.tag = 14, t = Hh(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              }
            }
            throw t = Re(e) || e, Error(c(306, t, ""));
          }
        }
        return t;
      case 0:
        return qr(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return l = t.type, s = Gn(
          l,
          t.pendingProps
        ), Yh(
          e,
          t,
          l,
          s,
          a
        );
      case 3:
        e: {
          if (Ke(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(c(387));
          l = t.pendingProps;
          var o = t.memoizedState;
          s = o.element, mr(e, t), qi(t, l, null, a);
          var f = t.memoizedState;
          if (l = f.cache, qa(t, Je, l), l !== o.cache && ur(
            t,
            [Je],
            a,
            !0
          ), Gi(), l = f.element, o.isDehydrated)
            if (o = {
              element: l,
              isDehydrated: !1,
              cache: f.cache
            }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
              t = Ph(
                e,
                t,
                l,
                a
              );
              break e;
            } else if (l !== s) {
              s = Bt(
                Error(c(424)),
                t
              ), Di(s), t = Ph(
                e,
                t,
                l,
                a
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
              for (Le = Kt(e.firstChild), nt = t, Te = !0, La = null, Gt = !0, a = Xg(
                t,
                null,
                l,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
          else {
            if (wn(), l === s) {
              t = ba(
                e,
                t,
                a
              );
              break e;
            }
            it(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Ku(e, t), e === null ? (a = rp(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : Te || (a = t.type, e = t.pendingProps, l = lc(
          le.current
        ).createElement(a), l[at] = t, l[ht] = e, st(l, a, e), $e(l), t.stateNode = l) : t.memoizedState = rp(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return $t(t), e === null && Te && (l = t.stateNode = up(
          t.type,
          t.pendingProps,
          le.current
        ), nt = t, Gt = !0, s = Le, $a(t.type) ? (Md = s, Le = Kt(l.firstChild)) : Le = s), it(
          e,
          t,
          t.pendingProps.children,
          a
        ), Ku(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Te && ((s = l = Le) && (l = iS(
          l,
          t.type,
          t.pendingProps,
          Gt
        ), l !== null ? (t.stateNode = l, nt = t, Le = Kt(l.firstChild), Gt = !1, s = !0) : s = !1), s || Ga(t)), $t(t), s = t.type, o = t.pendingProps, f = e !== null ? e.memoizedProps : null, l = o.children, bd(s, o) ? l = null : f !== null && bd(s, f) && (t.flags |= 32), t.memoizedState !== null && (s = Sr(
          e,
          t,
          SA,
          null,
          null,
          a
        ), ss._currentValue = s), Ku(e, t), it(e, t, l, a), t.child;
      case 6:
        return e === null && Te && ((e = a = Le) && (a = sS(
          a,
          t.pendingProps,
          Gt
        ), a !== null ? (t.stateNode = a, nt = t, Le = null, e = !0) : e = !1), e || Ga(t)), null;
      case 13:
        return Fh(e, t, a);
      case 4:
        return Ke(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = jn(
          t,
          null,
          l,
          a
        ) : it(e, t, l, a), t.child;
      case 11:
        return Kh(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return it(
          e,
          t,
          t.pendingProps,
          a
        ), t.child;
      case 8:
        return it(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return it(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return l = t.pendingProps, qa(t, t.type, l.value), it(e, t, l.children, a), t.child;
      case 9:
        return s = t.type._context, l = t.pendingProps.children, Dn(t), s = lt(s), l = l(s), t.flags |= 1, it(e, t, l, a), t.child;
      case 14:
        return Hh(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return Vh(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return _h(e, t, a);
      case 31:
        return IA(e, t, a);
      case 22:
        return Xh(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return Dn(t), l = lt(Je), e === null ? (s = rr(), s === null && (s = je, o = cr(), s.pooledCache = o, o.refCount++, o !== null && (s.pooledCacheLanes |= a), s = o), t.memoizedState = { parent: l, cache: s }, fr(t), qa(t, Je, s)) : ((e.lanes & a) !== 0 && (mr(e, t), qi(t, null, null, a), Gi()), s = e.memoizedState, o = t.memoizedState, s.parent !== l ? (s = { parent: l, cache: l }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), qa(t, Je, l)) : (l = o.cache, qa(t, Je, l), l !== s.cache && ur(
          t,
          [Je],
          a,
          !0
        ))), it(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function Ea(e) {
    e.flags |= 4;
  }
  function Yr(e, t, a, l, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (M0()) e.flags |= 8192;
        else
          throw Bn = Mu, dr;
    } else e.flags &= -16777217;
  }
  function e0(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !hp(t))
      if (M0()) e.flags |= 8192;
      else
        throw Bn = Mu, dr;
  }
  function Vu(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Dm() : 536870912, e.lanes |= t, Dl |= t);
  }
  function Zi(e, t) {
    if (!Te)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = e.tail;
          for (var l = null; a !== null; )
            a.alternate !== null && (l = a), a = a.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function Ge(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, a = 0, l = 0;
    if (t)
      for (var s = e.child; s !== null; )
        a |= s.lanes | s.childLanes, l |= s.subtreeFlags & 65011712, l |= s.flags & 65011712, s.return = e, s = s.sibling;
    else
      for (s = e.child; s !== null; )
        a |= s.lanes | s.childLanes, l |= s.subtreeFlags, l |= s.flags, s.return = e, s = s.sibling;
    return e.subtreeFlags |= l, e.childLanes = a, t;
  }
  function RA(e, t, a) {
    var l = t.pendingProps;
    switch (ar(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ge(t), null;
      case 1:
        return Ge(t), null;
      case 3:
        return a = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), va(Je), De(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Sl(t) ? Ea(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, lr())), Ge(t), null;
      case 26:
        var s = t.type, o = t.memoizedState;
        return e === null ? (Ea(t), o !== null ? (Ge(t), e0(t, o)) : (Ge(t), Yr(
          t,
          s,
          null,
          l,
          a
        ))) : o ? o !== e.memoizedState ? (Ea(t), Ge(t), e0(t, o)) : (Ge(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Ea(t), Ge(t), Yr(
          t,
          s,
          e,
          l,
          a
        )), null;
      case 27:
        if (ea(t), a = le.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ea(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(c(166));
            return Ge(t), null;
          }
          e = $.current, Sl(t) ? Dg(t) : (e = up(s, l, a), t.stateNode = e, Ea(t));
        }
        return Ge(t), null;
      case 5:
        if (ea(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ea(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(c(166));
            return Ge(t), null;
          }
          if (o = $.current, Sl(t))
            Dg(t);
          else {
            var f = lc(
              le.current
            );
            switch (o) {
              case 1:
                o = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                o = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    o = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    o = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    o = f.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(
                      o.firstChild
                    );
                    break;
                  case "select":
                    o = typeof l.is == "string" ? f.createElement("select", {
                      is: l.is
                    }) : f.createElement("select"), l.multiple ? o.multiple = !0 : l.size && (o.size = l.size);
                    break;
                  default:
                    o = typeof l.is == "string" ? f.createElement(s, { is: l.is }) : f.createElement(s);
                }
            }
            o[at] = t, o[ht] = l;
            e: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                o.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === t) break e;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t)
                  break e;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            t.stateNode = o;
            e: switch (st(o, s, l), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && Ea(t);
          }
        }
        return Ge(t), Yr(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && Ea(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(c(166));
          if (e = le.current, Sl(t)) {
            if (e = t.stateNode, a = t.memoizedProps, l = null, s = nt, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  l = s.memoizedProps;
              }
            e[at] = t, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || F0(e.nodeValue, a)), e || Ga(t, !0);
          } else
            e = lc(e).createTextNode(
              l
            ), e[at] = t, t.stateNode = e;
        }
        return Ge(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Sl(t), a !== null) {
            if (e === null) {
              if (!l) throw Error(c(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
              e[at] = t;
            } else
              wn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ge(t), e = !1;
          } else
            a = lr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (It(t), t) : (It(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(c(558));
        }
        return Ge(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = Sl(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(c(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(c(317));
              s[at] = t;
            } else
              wn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ge(t), s = !1;
          } else
            s = lr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (It(t), t) : (It(t), null);
        }
        return It(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = l !== null, e = e !== null && e.memoizedState !== null, a && (l = t.child, s = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (s = l.alternate.memoizedState.cachePool.pool), o = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (o = l.memoizedState.cachePool.pool), o !== s && (l.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Vu(t, t.updateQueue), Ge(t), null);
      case 4:
        return De(), e === null && pd(t.stateNode.containerInfo), Ge(t), null;
      case 10:
        return va(t.type), Ge(t), null;
      case 19:
        if (M(Xe), l = t.memoizedState, l === null) return Ge(t), null;
        if (s = (t.flags & 128) !== 0, o = l.rendering, o === null)
          if (s) Zi(l, !1);
          else {
            if (Ve !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (o = Ru(e), o !== null) {
                  for (t.flags |= 128, Zi(l, !1), e = o.updateQueue, t.updateQueue = e, Vu(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    Ig(a, e), a = a.sibling;
                  return P(
                    Xe,
                    Xe.current & 1 | 2
                  ), Te && pa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && _e() > Yu && (t.flags |= 128, s = !0, Zi(l, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = Ru(o), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, Vu(t, e), Zi(l, !0), l.tail === null && l.tailMode === "hidden" && !o.alternate && !Te)
                return Ge(t), null;
            } else
              2 * _e() - l.renderingStartTime > Yu && a !== 536870912 && (t.flags |= 128, s = !0, Zi(l, !1), t.lanes = 4194304);
          l.isBackwards ? (o.sibling = t.child, t.child = o) : (e = l.last, e !== null ? e.sibling = o : t.child = o, l.last = o);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = _e(), e.sibling = null, a = Xe.current, P(
          Xe,
          s ? a & 1 | 2 : a & 1
        ), Te && pa(t, l.treeForkCount), e) : (Ge(t), null);
      case 22:
      case 23:
        return It(t), yr(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Ge(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ge(t), a = t.updateQueue, a !== null && Vu(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (t.flags |= 2048), e !== null && M(On), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), va(Je), Ge(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function wA(e, t) {
    switch (ar(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return va(Je), De(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return ea(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (It(t), t.alternate === null)
            throw Error(c(340));
          wn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (It(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(c(340));
          wn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return M(Xe), null;
      case 4:
        return De(), null;
      case 10:
        return va(t.type), null;
      case 22:
      case 23:
        return It(t), yr(), e !== null && M(On), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return va(Je), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function t0(e, t) {
    switch (ar(t), t.tag) {
      case 3:
        va(Je), De();
        break;
      case 26:
      case 27:
      case 5:
        ea(t);
        break;
      case 4:
        De();
        break;
      case 31:
        t.memoizedState !== null && It(t);
        break;
      case 13:
        It(t);
        break;
      case 19:
        M(Xe);
        break;
      case 10:
        va(t.type);
        break;
      case 22:
      case 23:
        It(t), yr(), e !== null && M(On);
        break;
      case 24:
        va(Je);
    }
  }
  function Ji(e, t) {
    try {
      var a = t.updateQueue, l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var s = l.next;
        a = s;
        do {
          if ((a.tag & e) === e) {
            l = void 0;
            var o = a.create, f = a.inst;
            l = o(), f.destroy = l;
          }
          a = a.next;
        } while (a !== s);
      }
    } catch (p) {
      Ue(t, t.return, p);
    }
  }
  function Za(e, t, a) {
    try {
      var l = t.updateQueue, s = l !== null ? l.lastEffect : null;
      if (s !== null) {
        var o = s.next;
        l = o;
        do {
          if ((l.tag & e) === e) {
            var f = l.inst, p = f.destroy;
            if (p !== void 0) {
              f.destroy = void 0, s = t;
              var S = a, I = p;
              try {
                I();
              } catch (B) {
                Ue(
                  s,
                  S,
                  B
                );
              }
            }
          }
          l = l.next;
        } while (l !== o);
      }
    } catch (B) {
      Ue(t, t.return, B);
    }
  }
  function a0(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Zg(t, a);
      } catch (l) {
        Ue(e, e.return, l);
      }
    }
  }
  function n0(e, t, a) {
    a.props = Gn(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      Ue(e, t, l);
    }
  }
  function Yi(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof a == "function" ? e.refCleanup = a(l) : a.current = l;
      }
    } catch (s) {
      Ue(e, t, s);
    }
  }
  function na(e, t) {
    var a = e.ref, l = e.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (s) {
          Ue(e, t, s);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (s) {
          Ue(e, t, s);
        }
      else a.current = null;
  }
  function l0(e) {
    var t = e.type, a = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && l.focus();
          break e;
        case "img":
          a.src ? l.src = a.src : a.srcSet && (l.srcset = a.srcSet);
      }
    } catch (s) {
      Ue(e, e.return, s);
    }
  }
  function Pr(e, t, a) {
    try {
      var l = e.stateNode;
      $A(l, e.type, a, t), l[ht] = t;
    } catch (s) {
      Ue(e, e.return, s);
    }
  }
  function i0(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && $a(e.type) || e.tag === 4;
  }
  function Fr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || i0(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && $a(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Wr(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = ma));
    else if (l !== 4 && (l === 27 && $a(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
      for (Wr(e, t, a), e = e.sibling; e !== null; )
        Wr(e, t, a), e = e.sibling;
  }
  function Xu(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (l !== 4 && (l === 27 && $a(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (Xu(e, t, a), e = e.sibling; e !== null; )
        Xu(e, t, a), e = e.sibling;
  }
  function s0(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      st(t, l, a), t[at] = e, t[ht] = a;
    } catch (o) {
      Ue(e, e.return, o);
    }
  }
  var Ta = !1, Fe = !1, _r = !1, u0 = typeof WeakSet == "function" ? WeakSet : Set, et = null;
  function UA(e, t) {
    if (e = e.containerInfo, Ad = dc, e = Ag(e), Qo(e)) {
      if ("selectionStart" in e)
        var a = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          a = (a = e.ownerDocument) && a.defaultView || window;
          var l = a.getSelection && a.getSelection();
          if (l && l.rangeCount !== 0) {
            a = l.anchorNode;
            var s = l.anchorOffset, o = l.focusNode;
            l = l.focusOffset;
            try {
              a.nodeType, o.nodeType;
            } catch {
              a = null;
              break e;
            }
            var f = 0, p = -1, S = -1, I = 0, B = 0, K = e, k = null;
            t: for (; ; ) {
              for (var U; K !== a || s !== 0 && K.nodeType !== 3 || (p = f + s), K !== o || l !== 0 && K.nodeType !== 3 || (S = f + l), K.nodeType === 3 && (f += K.nodeValue.length), (U = K.firstChild) !== null; )
                k = K, K = U;
              for (; ; ) {
                if (K === e) break t;
                if (k === a && ++I === s && (p = f), k === o && ++B === l && (S = f), (U = K.nextSibling) !== null) break;
                K = k, k = K.parentNode;
              }
              K = U;
            }
            a = p === -1 || S === -1 ? null : { start: p, end: S };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Sd = { focusedElem: e, selectionRange: a }, dc = !1, et = t; et !== null; )
      if (t = et, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, et = e;
      else
        for (; et !== null; ) {
          switch (t = et, o = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (a = 0; a < e.length; a++)
                  s = e[a], s.ref.impl = s.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && o !== null) {
                e = void 0, a = t, s = o.memoizedProps, o = o.memoizedState, l = a.stateNode;
                try {
                  var ee = Gn(
                    a.type,
                    s
                  );
                  e = l.getSnapshotBeforeUpdate(
                    ee,
                    o
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (ce) {
                  Ue(
                    a,
                    a.return,
                    ce
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9)
                  Td(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Td(e);
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
              if ((e & 1024) !== 0) throw Error(c(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, et = e;
            break;
          }
          et = t.return;
        }
  }
  function c0(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Na(e, a), l & 4 && Ji(5, a);
        break;
      case 1:
        if (Na(e, a), l & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (f) {
              Ue(a, a.return, f);
            }
          else {
            var s = Gn(
              a.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                s,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (f) {
              Ue(
                a,
                a.return,
                f
              );
            }
          }
        l & 64 && a0(a), l & 512 && Yi(a, a.return);
        break;
      case 3:
        if (Na(e, a), l & 64 && (e = a.updateQueue, e !== null)) {
          if (t = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            Zg(e, t);
          } catch (f) {
            Ue(a, a.return, f);
          }
        }
        break;
      case 27:
        t === null && l & 4 && s0(a);
      case 26:
      case 5:
        Na(e, a), t === null && l & 4 && l0(a), l & 512 && Yi(a, a.return);
        break;
      case 12:
        Na(e, a);
        break;
      case 31:
        Na(e, a), l & 4 && d0(e, a);
        break;
      case 13:
        Na(e, a), l & 4 && f0(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = KA.bind(
          null,
          a
        ), uS(e, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || Ta, !l) {
          t = t !== null && t.memoizedState !== null || Fe, s = Ta;
          var o = Fe;
          Ta = l, (Fe = t) && !o ? Ma(
            e,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Na(e, a), Ta = s, Fe = o;
        }
        break;
      case 30:
        break;
      default:
        Na(e, a);
    }
  }
  function o0(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, o0(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Io(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var qe = null, yt = !1;
  function Ca(e, t, a) {
    for (a = a.child; a !== null; )
      r0(e, t, a), a = a.sibling;
  }
  function r0(e, t, a) {
    if (Ze && typeof Ze.onCommitFiberUnmount == "function")
      try {
        Ze.onCommitFiberUnmount(Ut, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Fe || na(a, t), Ca(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Fe || na(a, t);
        var l = qe, s = yt;
        $a(a.type) && (qe = a.stateNode, yt = !1), Ca(
          e,
          t,
          a
        ), ns(a.stateNode), qe = l, yt = s;
        break;
      case 5:
        Fe || na(a, t);
      case 6:
        if (l = qe, s = yt, qe = null, Ca(
          e,
          t,
          a
        ), qe = l, yt = s, qe !== null)
          if (yt)
            try {
              (qe.nodeType === 9 ? qe.body : qe.nodeName === "HTML" ? qe.ownerDocument.body : qe).removeChild(a.stateNode);
            } catch (o) {
              Ue(
                a,
                t,
                o
              );
            }
          else
            try {
              qe.removeChild(a.stateNode);
            } catch (o) {
              Ue(
                a,
                t,
                o
              );
            }
        break;
      case 18:
        qe !== null && (yt ? (e = qe, ap(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), Kl(e)) : ap(qe, a.stateNode));
        break;
      case 4:
        l = qe, s = yt, qe = a.stateNode.containerInfo, yt = !0, Ca(
          e,
          t,
          a
        ), qe = l, yt = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Za(2, a, t), Fe || Za(4, a, t), Ca(
          e,
          t,
          a
        );
        break;
      case 1:
        Fe || (na(a, t), l = a.stateNode, typeof l.componentWillUnmount == "function" && n0(
          a,
          t,
          l
        )), Ca(
          e,
          t,
          a
        );
        break;
      case 21:
        Ca(
          e,
          t,
          a
        );
        break;
      case 22:
        Fe = (l = Fe) || a.memoizedState !== null, Ca(
          e,
          t,
          a
        ), Fe = l;
        break;
      default:
        Ca(
          e,
          t,
          a
        );
    }
  }
  function d0(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Kl(e);
      } catch (a) {
        Ue(t, t.return, a);
      }
    }
  }
  function f0(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Kl(e);
      } catch (a) {
        Ue(t, t.return, a);
      }
  }
  function DA(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new u0()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new u0()), t;
      default:
        throw Error(c(435, e.tag));
    }
  }
  function Qu(e, t) {
    var a = DA(e);
    t.forEach(function(l) {
      if (!a.has(l)) {
        a.add(l);
        var s = HA.bind(null, e, l);
        l.then(s, s);
      }
    });
  }
  function vt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var s = a[l], o = e, f = t, p = f;
        e: for (; p !== null; ) {
          switch (p.tag) {
            case 27:
              if ($a(p.type)) {
                qe = p.stateNode, yt = !1;
                break e;
              }
              break;
            case 5:
              qe = p.stateNode, yt = !1;
              break e;
            case 3:
            case 4:
              qe = p.stateNode.containerInfo, yt = !0;
              break e;
          }
          p = p.return;
        }
        if (qe === null) throw Error(c(160));
        r0(o, f, s), qe = null, yt = !1, o = s.alternate, o !== null && (o.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        m0(t, e), t = t.sibling;
  }
  var Ft = null;
  function m0(e, t) {
    var a = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        vt(t, e), At(e), l & 4 && (Za(3, e, e.return), Ji(3, e), Za(5, e, e.return));
        break;
      case 1:
        vt(t, e), At(e), l & 512 && (Fe || a === null || na(a, a.return)), l & 64 && Ta && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? l : a.concat(l))));
        break;
      case 26:
        var s = Ft;
        if (vt(t, e), At(e), l & 512 && (Fe || a === null || na(a, a.return)), l & 4) {
          var o = a !== null ? a.memoizedState : null;
          if (l = e.memoizedState, a === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, a = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (l) {
                    case "title":
                      o = s.getElementsByTagName("title")[0], (!o || o[bi] || o[at] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = s.createElement(l), s.head.insertBefore(
                        o,
                        s.querySelector("head > title")
                      )), st(o, l, a), o[at] = e, $e(o), l = o;
                      break e;
                    case "link":
                      var f = mp(
                        "link",
                        "href",
                        s
                      ).get(l + (a.href || ""));
                      if (f) {
                        for (var p = 0; p < f.length; p++)
                          if (o = f[p], o.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && o.getAttribute("rel") === (a.rel == null ? null : a.rel) && o.getAttribute("title") === (a.title == null ? null : a.title) && o.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            f.splice(p, 1);
                            break t;
                          }
                      }
                      o = s.createElement(l), st(o, l, a), s.head.appendChild(o);
                      break;
                    case "meta":
                      if (f = mp(
                        "meta",
                        "content",
                        s
                      ).get(l + (a.content || ""))) {
                        for (p = 0; p < f.length; p++)
                          if (o = f[p], o.getAttribute("content") === (a.content == null ? null : "" + a.content) && o.getAttribute("name") === (a.name == null ? null : a.name) && o.getAttribute("property") === (a.property == null ? null : a.property) && o.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && o.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            f.splice(p, 1);
                            break t;
                          }
                      }
                      o = s.createElement(l), st(o, l, a), s.head.appendChild(o);
                      break;
                    default:
                      throw Error(c(468, l));
                  }
                  o[at] = e, $e(o), l = o;
                }
                e.stateNode = l;
              } else
                gp(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = fp(
                s,
                l,
                e.memoizedProps
              );
          else
            o !== l ? (o === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : o.count--, l === null ? gp(
              s,
              e.type,
              e.stateNode
            ) : fp(
              s,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Pr(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        vt(t, e), At(e), l & 512 && (Fe || a === null || na(a, a.return)), a !== null && l & 4 && Pr(
          e,
          e.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (vt(t, e), At(e), l & 512 && (Fe || a === null || na(a, a.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            rl(s, "");
          } catch (ee) {
            Ue(e, e.return, ee);
          }
        }
        l & 4 && e.stateNode != null && (s = e.memoizedProps, Pr(
          e,
          s,
          a !== null ? a.memoizedProps : s
        )), l & 1024 && (_r = !0);
        break;
      case 6:
        if (vt(t, e), At(e), l & 4) {
          if (e.stateNode === null)
            throw Error(c(162));
          l = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = l;
          } catch (ee) {
            Ue(e, e.return, ee);
          }
        }
        break;
      case 3:
        if (uc = null, s = Ft, Ft = ic(t.containerInfo), vt(t, e), Ft = s, At(e), l & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Kl(t.containerInfo);
          } catch (ee) {
            Ue(e, e.return, ee);
          }
        _r && (_r = !1, g0(e));
        break;
      case 4:
        l = Ft, Ft = ic(
          e.stateNode.containerInfo
        ), vt(t, e), At(e), Ft = l;
        break;
      case 12:
        vt(t, e), At(e);
        break;
      case 31:
        vt(t, e), At(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Qu(e, l)));
        break;
      case 13:
        vt(t, e), At(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Ju = _e()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Qu(e, l)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var S = a !== null && a.memoizedState !== null, I = Ta, B = Fe;
        if (Ta = I || s, Fe = B || S, vt(t, e), Fe = B, Ta = I, At(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (a === null || S || Ta || Fe || qn(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                S = a = t;
                try {
                  if (o = S.stateNode, s)
                    f = o.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                  else {
                    p = S.stateNode;
                    var K = S.memoizedProps.style, k = K != null && K.hasOwnProperty("display") ? K.display : null;
                    p.style.display = k == null || typeof k == "boolean" ? "" : ("" + k).trim();
                  }
                } catch (ee) {
                  Ue(S, S.return, ee);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                S = t;
                try {
                  S.stateNode.nodeValue = s ? "" : S.memoizedProps;
                } catch (ee) {
                  Ue(S, S.return, ee);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                S = t;
                try {
                  var U = S.stateNode;
                  s ? np(U, !0) : np(S.stateNode, !1);
                } catch (ee) {
                  Ue(S, S.return, ee);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), t = t.return;
            }
            a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (a = l.retryQueue, a !== null && (l.retryQueue = null, Qu(e, a))));
        break;
      case 19:
        vt(t, e), At(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Qu(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        vt(t, e), At(e);
    }
  }
  function At(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
          if (i0(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(c(160));
        switch (a.tag) {
          case 27:
            var s = a.stateNode, o = Fr(e);
            Xu(e, o, s);
            break;
          case 5:
            var f = a.stateNode;
            a.flags & 32 && (rl(f, ""), a.flags &= -33);
            var p = Fr(e);
            Xu(e, p, f);
            break;
          case 3:
          case 4:
            var S = a.stateNode.containerInfo, I = Fr(e);
            Wr(
              e,
              I,
              S
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (B) {
        Ue(e, e.return, B);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function g0(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        g0(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Na(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        c0(e, t.alternate, t), t = t.sibling;
  }
  function qn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Za(4, t, t.return), qn(t);
          break;
        case 1:
          na(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && n0(
            t,
            t.return,
            a
          ), qn(t);
          break;
        case 27:
          ns(t.stateNode);
        case 26:
        case 5:
          na(t, t.return), qn(t);
          break;
        case 22:
          t.memoizedState === null && qn(t);
          break;
        case 30:
          qn(t);
          break;
        default:
          qn(t);
      }
      e = e.sibling;
    }
  }
  function Ma(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, s = e, o = t, f = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          Ma(
            s,
            o,
            a
          ), Ji(4, o);
          break;
        case 1:
          if (Ma(
            s,
            o,
            a
          ), l = o, s = l.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (I) {
              Ue(l, l.return, I);
            }
          if (l = o, s = l.updateQueue, s !== null) {
            var p = l.stateNode;
            try {
              var S = s.shared.hiddenCallbacks;
              if (S !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < S.length; s++)
                  Qg(S[s], p);
            } catch (I) {
              Ue(l, l.return, I);
            }
          }
          a && f & 64 && a0(o), Yi(o, o.return);
          break;
        case 27:
          s0(o);
        case 26:
        case 5:
          Ma(
            s,
            o,
            a
          ), a && l === null && f & 4 && l0(o), Yi(o, o.return);
          break;
        case 12:
          Ma(
            s,
            o,
            a
          );
          break;
        case 31:
          Ma(
            s,
            o,
            a
          ), a && f & 4 && d0(s, o);
          break;
        case 13:
          Ma(
            s,
            o,
            a
          ), a && f & 4 && f0(s, o);
          break;
        case 22:
          o.memoizedState === null && Ma(
            s,
            o,
            a
          ), Yi(o, o.return);
          break;
        case 30:
          break;
        default:
          Ma(
            s,
            o,
            a
          );
      }
      t = t.sibling;
    }
  }
  function $r(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && Oi(a));
  }
  function ed(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Oi(e));
  }
  function Wt(e, t, a, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        h0(
          e,
          t,
          a,
          l
        ), t = t.sibling;
  }
  function h0(e, t, a, l) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Wt(
          e,
          t,
          a,
          l
        ), s & 2048 && Ji(9, t);
        break;
      case 1:
        Wt(
          e,
          t,
          a,
          l
        );
        break;
      case 3:
        Wt(
          e,
          t,
          a,
          l
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Oi(e)));
        break;
      case 12:
        if (s & 2048) {
          Wt(
            e,
            t,
            a,
            l
          ), e = t.stateNode;
          try {
            var o = t.memoizedProps, f = o.id, p = o.onPostCommit;
            typeof p == "function" && p(
              f,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (S) {
            Ue(t, t.return, S);
          }
        } else
          Wt(
            e,
            t,
            a,
            l
          );
        break;
      case 31:
        Wt(
          e,
          t,
          a,
          l
        );
        break;
      case 13:
        Wt(
          e,
          t,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        o = t.stateNode, f = t.alternate, t.memoizedState !== null ? o._visibility & 2 ? Wt(
          e,
          t,
          a,
          l
        ) : Pi(e, t) : o._visibility & 2 ? Wt(
          e,
          t,
          a,
          l
        ) : (o._visibility |= 2, Rl(
          e,
          t,
          a,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && $r(f, t);
        break;
      case 24:
        Wt(
          e,
          t,
          a,
          l
        ), s & 2048 && ed(t.alternate, t);
        break;
      default:
        Wt(
          e,
          t,
          a,
          l
        );
    }
  }
  function Rl(e, t, a, l, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var o = e, f = t, p = a, S = l, I = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Rl(
            o,
            f,
            p,
            S,
            s
          ), Ji(8, f);
          break;
        case 23:
          break;
        case 22:
          var B = f.stateNode;
          f.memoizedState !== null ? B._visibility & 2 ? Rl(
            o,
            f,
            p,
            S,
            s
          ) : Pi(
            o,
            f
          ) : (B._visibility |= 2, Rl(
            o,
            f,
            p,
            S,
            s
          )), s && I & 2048 && $r(
            f.alternate,
            f
          );
          break;
        case 24:
          Rl(
            o,
            f,
            p,
            S,
            s
          ), s && I & 2048 && ed(f.alternate, f);
          break;
        default:
          Rl(
            o,
            f,
            p,
            S,
            s
          );
      }
      t = t.sibling;
    }
  }
  function Pi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, l = t, s = l.flags;
        switch (l.tag) {
          case 22:
            Pi(a, l), s & 2048 && $r(
              l.alternate,
              l
            );
            break;
          case 24:
            Pi(a, l), s & 2048 && ed(l.alternate, l);
            break;
          default:
            Pi(a, l);
        }
        t = t.sibling;
      }
  }
  var Fi = 8192;
  function wl(e, t, a) {
    if (e.subtreeFlags & Fi)
      for (e = e.child; e !== null; )
        p0(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function p0(e, t, a) {
    switch (e.tag) {
      case 26:
        wl(
          e,
          t,
          a
        ), e.flags & Fi && e.memoizedState !== null && AS(
          a,
          Ft,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        wl(
          e,
          t,
          a
        );
        break;
      case 3:
      case 4:
        var l = Ft;
        Ft = ic(e.stateNode.containerInfo), wl(
          e,
          t,
          a
        ), Ft = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Fi, Fi = 16777216, wl(
          e,
          t,
          a
        ), Fi = l) : wl(
          e,
          t,
          a
        ));
        break;
      default:
        wl(
          e,
          t,
          a
        );
    }
  }
  function y0(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Wi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          et = l, A0(
            l,
            e
          );
        }
      y0(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        v0(e), e = e.sibling;
  }
  function v0(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Wi(e), e.flags & 2048 && Za(9, e, e.return);
        break;
      case 3:
        Wi(e);
        break;
      case 12:
        Wi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Zu(e)) : Wi(e);
        break;
      default:
        Wi(e);
    }
  }
  function Zu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          et = l, A0(
            l,
            e
          );
        }
      y0(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Za(8, t, t.return), Zu(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, Zu(t));
          break;
        default:
          Zu(t);
      }
      e = e.sibling;
    }
  }
  function A0(e, t) {
    for (; et !== null; ) {
      var a = et;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Za(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Oi(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, et = l;
      else
        e: for (a = e; et !== null; ) {
          l = et;
          var s = l.sibling, o = l.return;
          if (o0(l), l === a) {
            et = null;
            break e;
          }
          if (s !== null) {
            s.return = o, et = s;
            break e;
          }
          et = o;
        }
    }
  }
  var OA = {
    getCacheForType: function(e) {
      var t = lt(Je), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return lt(Je).controller.signal;
    }
  }, zA = typeof WeakMap == "function" ? WeakMap : Map, ke = 0, je = null, ye = null, Se = 0, we = 0, kt = null, Ja = !1, Ul = !1, td = !1, xa = 0, Ve = 0, Ya = 0, Kn = 0, ad = 0, Rt = 0, Dl = 0, _i = null, St = null, nd = !1, Ju = 0, S0 = 0, Yu = 1 / 0, Pu = null, Pa = null, We = 0, Fa = null, Ol = null, Ia = 0, ld = 0, id = null, b0 = null, $i = 0, sd = null;
  function wt() {
    return (ke & 2) !== 0 && Se !== 0 ? Se & -Se : O.T !== null ? fd() : jm();
  }
  function E0() {
    if (Rt === 0)
      if ((Se & 536870912) === 0 || Te) {
        var e = nu;
        nu <<= 1, (nu & 3932160) === 0 && (nu = 262144), Rt = e;
      } else Rt = 536870912;
    return e = xt.current, e !== null && (e.flags |= 32), Rt;
  }
  function bt(e, t, a) {
    (e === je && (we === 2 || we === 9) || e.cancelPendingCommit !== null) && (zl(e, 0), Wa(
      e,
      Se,
      Rt,
      !1
    )), Si(e, a), ((ke & 2) === 0 || e !== je) && (e === je && ((ke & 2) === 0 && (Kn |= a), Ve === 4 && Wa(
      e,
      Se,
      Rt,
      !1
    )), la(e));
  }
  function T0(e, t, a) {
    if ((ke & 6) !== 0) throw Error(c(327));
    var l = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ai(e, t), s = l ? LA(e, t) : cd(e, t, !0), o = l;
    do {
      if (s === 0) {
        Ul && !l && Wa(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, o && !BA(a)) {
          s = cd(e, t, !1), o = !1;
          continue;
        }
        if (s === 2) {
          if (o = t, e.errorRecoveryDisabledLanes & o)
            var f = 0;
          else
            f = e.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            t = f;
            e: {
              var p = e;
              s = _i;
              var S = p.current.memoizedState.isDehydrated;
              if (S && (zl(p, f).flags |= 256), f = cd(
                p,
                f,
                !1
              ), f !== 2) {
                if (td && !S) {
                  p.errorRecoveryDisabledLanes |= o, Kn |= o, s = 4;
                  break e;
                }
                o = St, St = s, o !== null && (St === null ? St = o : St.push.apply(
                  St,
                  o
                ));
              }
              s = f;
            }
            if (o = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          zl(e, 0), Wa(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, o = s, o) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Wa(
                l,
                t,
                Rt,
                !Ja
              );
              break e;
            case 2:
              St = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && (s = Ju + 300 - _e(), 10 < s)) {
            if (Wa(
              l,
              t,
              Rt,
              !Ja
            ), iu(l, 0, !0) !== 0) break e;
            Ia = t, l.timeoutHandle = ep(
              C0.bind(
                null,
                l,
                a,
                St,
                Pu,
                nd,
                t,
                Rt,
                Kn,
                Dl,
                Ja,
                o,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          C0(
            l,
            a,
            St,
            Pu,
            nd,
            t,
            Rt,
            Kn,
            Dl,
            Ja,
            o,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    la(e);
  }
  function C0(e, t, a, l, s, o, f, p, S, I, B, K, k, U) {
    if (e.timeoutHandle = -1, K = t.subtreeFlags, K & 8192 || (K & 16785408) === 16785408) {
      K = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ma
      }, p0(
        t,
        o,
        K
      );
      var ee = (o & 62914560) === o ? Ju - _e() : (o & 4194048) === o ? S0 - _e() : 0;
      if (ee = SS(
        K,
        ee
      ), ee !== null) {
        Ia = o, e.cancelPendingCommit = ee(
          U0.bind(
            null,
            e,
            t,
            o,
            a,
            l,
            s,
            f,
            p,
            S,
            B,
            K,
            null,
            k,
            U
          )
        ), Wa(e, o, f, !I);
        return;
      }
    }
    U0(
      e,
      t,
      o,
      a,
      l,
      s,
      f,
      p,
      S
    );
  }
  function BA(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var s = a[l], o = s.getSnapshot;
          s = s.value;
          try {
            if (!Nt(o(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
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
  function Wa(e, t, a, l) {
    t &= ~ad, t &= ~Kn, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var o = 31 - Ct(s), f = 1 << o;
      l[o] = -1, s &= ~f;
    }
    a !== 0 && Om(e, a, t);
  }
  function Fu() {
    return (ke & 6) === 0 ? (es(0), !1) : !0;
  }
  function ud() {
    if (ye !== null) {
      if (we === 0)
        var e = ye.return;
      else
        e = ye, ya = Un = null, Tr(e), Nl = null, Bi = 0, e = ye;
      for (; e !== null; )
        t0(e.alternate, e), e = e.return;
      ye = null;
    }
  }
  function zl(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, aS(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Ia = 0, ud(), je = e, ye = a = ha(e.current, null), Se = t, we = 0, kt = null, Ja = !1, Ul = Ai(e, t), td = !1, Dl = Rt = ad = Kn = Ya = Ve = 0, St = _i = null, nd = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var s = 31 - Ct(l), o = 1 << s;
        t |= e[s], l &= ~o;
      }
    return xa = t, yu(), a;
  }
  function N0(e, t) {
    me = null, O.H = Xi, t === Cl || t === Nu ? (t = Kg(), we = 3) : t === dr ? (t = Kg(), we = 4) : we = t === Gr ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, kt = t, ye === null && (Ve = 1, Gu(
      e,
      Bt(t, e.current)
    ));
  }
  function M0() {
    var e = xt.current;
    return e === null ? !0 : (Se & 4194048) === Se ? qt === null : (Se & 62914560) === Se || (Se & 536870912) !== 0 ? e === qt : !1;
  }
  function x0() {
    var e = O.H;
    return O.H = Xi, e === null ? Xi : e;
  }
  function I0() {
    var e = O.A;
    return O.A = OA, e;
  }
  function Wu() {
    Ve = 4, Ja || (Se & 4194048) !== Se && xt.current !== null || (Ul = !0), (Ya & 134217727) === 0 && (Kn & 134217727) === 0 || je === null || Wa(
      je,
      Se,
      Rt,
      !1
    );
  }
  function cd(e, t, a) {
    var l = ke;
    ke |= 2;
    var s = x0(), o = I0();
    (je !== e || Se !== t) && (Pu = null, zl(e, t)), t = !1;
    var f = Ve;
    e: do
      try {
        if (we !== 0 && ye !== null) {
          var p = ye, S = kt;
          switch (we) {
            case 8:
              ud(), f = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              xt.current === null && (t = !0);
              var I = we;
              if (we = 0, kt = null, Bl(e, p, S, I), a && Ul) {
                f = 0;
                break e;
              }
              break;
            default:
              I = we, we = 0, kt = null, Bl(e, p, S, I);
          }
        }
        jA(), f = Ve;
        break;
      } catch (B) {
        N0(e, B);
      }
    while (!0);
    return t && e.shellSuspendCounter++, ya = Un = null, ke = l, O.H = s, O.A = o, ye === null && (je = null, Se = 0, yu()), f;
  }
  function jA() {
    for (; ye !== null; ) k0(ye);
  }
  function LA(e, t) {
    var a = ke;
    ke |= 2;
    var l = x0(), s = I0();
    je !== e || Se !== t ? (Pu = null, Yu = _e() + 500, zl(e, t)) : Ul = Ai(
      e,
      t
    );
    e: do
      try {
        if (we !== 0 && ye !== null) {
          t = ye;
          var o = kt;
          t: switch (we) {
            case 1:
              we = 0, kt = null, Bl(e, t, o, 1);
              break;
            case 2:
            case 9:
              if (Gg(o)) {
                we = 0, kt = null, R0(t);
                break;
              }
              t = function() {
                we !== 2 && we !== 9 || je !== e || (we = 7), la(e);
              }, o.then(t, t);
              break e;
            case 3:
              we = 7;
              break e;
            case 4:
              we = 5;
              break e;
            case 7:
              Gg(o) ? (we = 0, kt = null, R0(t)) : (we = 0, kt = null, Bl(e, t, o, 7));
              break;
            case 5:
              var f = null;
              switch (ye.tag) {
                case 26:
                  f = ye.memoizedState;
                case 5:
                case 27:
                  var p = ye;
                  if (f ? hp(f) : p.stateNode.complete) {
                    we = 0, kt = null;
                    var S = p.sibling;
                    if (S !== null) ye = S;
                    else {
                      var I = p.return;
                      I !== null ? (ye = I, _u(I)) : ye = null;
                    }
                    break t;
                  }
              }
              we = 0, kt = null, Bl(e, t, o, 5);
              break;
            case 6:
              we = 0, kt = null, Bl(e, t, o, 6);
              break;
            case 8:
              ud(), Ve = 6;
              break e;
            default:
              throw Error(c(462));
          }
        }
        GA();
        break;
      } catch (B) {
        N0(e, B);
      }
    while (!0);
    return ya = Un = null, O.H = l, O.A = s, ke = a, ye !== null ? 0 : (je = null, Se = 0, yu(), Ve);
  }
  function GA() {
    for (; ye !== null && !tl(); )
      k0(ye);
  }
  function k0(e) {
    var t = $h(e.alternate, e, xa);
    e.memoizedProps = e.pendingProps, t === null ? _u(e) : ye = t;
  }
  function R0(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Jh(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Se
        );
        break;
      case 11:
        t = Jh(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Se
        );
        break;
      case 5:
        Tr(t);
      default:
        t0(a, t), t = ye = Ig(t, xa), t = $h(a, t, xa);
    }
    e.memoizedProps = e.pendingProps, t === null ? _u(e) : ye = t;
  }
  function Bl(e, t, a, l) {
    ya = Un = null, Tr(t), Nl = null, Bi = 0;
    var s = t.return;
    try {
      if (xA(
        e,
        s,
        t,
        a,
        Se
      )) {
        Ve = 1, Gu(
          e,
          Bt(a, e.current)
        ), ye = null;
        return;
      }
    } catch (o) {
      if (s !== null) throw ye = s, o;
      Ve = 1, Gu(
        e,
        Bt(a, e.current)
      ), ye = null;
      return;
    }
    t.flags & 32768 ? (Te || l === 1 ? e = !0 : Ul || (Se & 536870912) !== 0 ? e = !1 : (Ja = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = xt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), w0(t, e)) : _u(t);
  }
  function _u(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        w0(
          t,
          Ja
        );
        return;
      }
      e = t.return;
      var a = RA(
        t.alternate,
        t,
        xa
      );
      if (a !== null) {
        ye = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        ye = t;
        return;
      }
      ye = t = e;
    } while (t !== null);
    Ve === 0 && (Ve = 5);
  }
  function w0(e, t) {
    do {
      var a = wA(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, ye = a;
        return;
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        ye = e;
        return;
      }
      ye = e = a;
    } while (e !== null);
    Ve = 6, ye = null;
  }
  function U0(e, t, a, l, s, o, f, p, S) {
    e.cancelPendingCommit = null;
    do
      $u();
    while (We !== 0);
    if ((ke & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (o = t.lanes | t.childLanes, o |= Fo, vv(
        e,
        a,
        o,
        f,
        p,
        S
      ), e === je && (ye = je = null, Se = 0), Ol = t, Fa = e, Ia = a, ld = o, id = s, b0 = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, VA(Oa, function() {
        return j0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null, s = J.p, J.p = 2, f = ke, ke |= 4;
        try {
          UA(e, t, a);
        } finally {
          ke = f, J.p = s, O.T = l;
        }
      }
      We = 1, D0(), O0(), z0();
    }
  }
  function D0() {
    if (We === 1) {
      We = 0;
      var e = Fa, t = Ol, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = O.T, O.T = null;
        var l = J.p;
        J.p = 2;
        var s = ke;
        ke |= 4;
        try {
          m0(t, e);
          var o = Sd, f = Ag(e.containerInfo), p = o.focusedElem, S = o.selectionRange;
          if (f !== p && p && p.ownerDocument && vg(
            p.ownerDocument.documentElement,
            p
          )) {
            if (S !== null && Qo(p)) {
              var I = S.start, B = S.end;
              if (B === void 0 && (B = I), "selectionStart" in p)
                p.selectionStart = I, p.selectionEnd = Math.min(
                  B,
                  p.value.length
                );
              else {
                var K = p.ownerDocument || document, k = K && K.defaultView || window;
                if (k.getSelection) {
                  var U = k.getSelection(), ee = p.textContent.length, ce = Math.min(S.start, ee), Be = S.end === void 0 ? ce : Math.min(S.end, ee);
                  !U.extend && ce > Be && (f = Be, Be = ce, ce = f);
                  var N = yg(
                    p,
                    ce
                  ), E = yg(
                    p,
                    Be
                  );
                  if (N && E && (U.rangeCount !== 1 || U.anchorNode !== N.node || U.anchorOffset !== N.offset || U.focusNode !== E.node || U.focusOffset !== E.offset)) {
                    var x = K.createRange();
                    x.setStart(N.node, N.offset), U.removeAllRanges(), ce > Be ? (U.addRange(x), U.extend(E.node, E.offset)) : (x.setEnd(E.node, E.offset), U.addRange(x));
                  }
                }
              }
            }
            for (K = [], U = p; U = U.parentNode; )
              U.nodeType === 1 && K.push({
                element: U,
                left: U.scrollLeft,
                top: U.scrollTop
              });
            for (typeof p.focus == "function" && p.focus(), p = 0; p < K.length; p++) {
              var G = K[p];
              G.element.scrollLeft = G.left, G.element.scrollTop = G.top;
            }
          }
          dc = !!Ad, Sd = Ad = null;
        } finally {
          ke = s, J.p = l, O.T = a;
        }
      }
      e.current = t, We = 2;
    }
  }
  function O0() {
    if (We === 2) {
      We = 0;
      var e = Fa, t = Ol, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = O.T, O.T = null;
        var l = J.p;
        J.p = 2;
        var s = ke;
        ke |= 4;
        try {
          c0(e, t.alternate, t);
        } finally {
          ke = s, J.p = l, O.T = a;
        }
      }
      We = 3;
    }
  }
  function z0() {
    if (We === 4 || We === 3) {
      We = 0, al();
      var e = Fa, t = Ol, a = Ia, l = b0;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? We = 5 : (We = 0, Ol = Fa = null, B0(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (Pa = null), Mo(a), t = t.stateNode, Ze && typeof Ze.onCommitFiberRoot == "function")
        try {
          Ze.onCommitFiberRoot(
            Ut,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = O.T, s = J.p, J.p = 2, O.T = null;
        try {
          for (var o = e.onRecoverableError, f = 0; f < l.length; f++) {
            var p = l[f];
            o(p.value, {
              componentStack: p.stack
            });
          }
        } finally {
          O.T = t, J.p = s;
        }
      }
      (Ia & 3) !== 0 && $u(), la(e), s = e.pendingLanes, (a & 261930) !== 0 && (s & 42) !== 0 ? e === sd ? $i++ : ($i = 0, sd = e) : $i = 0, es(0);
    }
  }
  function B0(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Oi(t)));
  }
  function $u() {
    return D0(), O0(), z0(), j0();
  }
  function j0() {
    if (We !== 5) return !1;
    var e = Fa, t = ld;
    ld = 0;
    var a = Mo(Ia), l = O.T, s = J.p;
    try {
      J.p = 32 > a ? 32 : a, O.T = null, a = id, id = null;
      var o = Fa, f = Ia;
      if (We = 0, Ol = Fa = null, Ia = 0, (ke & 6) !== 0) throw Error(c(331));
      var p = ke;
      if (ke |= 4, v0(o.current), h0(
        o,
        o.current,
        f,
        a
      ), ke = p, es(0, !1), Ze && typeof Ze.onPostCommitFiberRoot == "function")
        try {
          Ze.onPostCommitFiberRoot(Ut, o);
        } catch {
        }
      return !0;
    } finally {
      J.p = s, O.T = l, B0(e, t);
    }
  }
  function L0(e, t, a) {
    t = Bt(a, t), t = Lr(e.stateNode, t, 2), e = Va(e, t, 2), e !== null && (Si(e, 2), la(e));
  }
  function Ue(e, t, a) {
    if (e.tag === 3)
      L0(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          L0(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Pa === null || !Pa.has(l))) {
            e = Bt(a, e), a = Gh(2), l = Va(t, a, 2), l !== null && (qh(
              a,
              l,
              t,
              e
            ), Si(l, 2), la(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function od(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new zA();
      var s = /* @__PURE__ */ new Set();
      l.set(t, s);
    } else
      s = l.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), l.set(t, s));
    s.has(a) || (td = !0, s.add(a), e = qA.bind(null, e, t, a), t.then(e, e));
  }
  function qA(e, t, a) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, je === e && (Se & a) === a && (Ve === 4 || Ve === 3 && (Se & 62914560) === Se && 300 > _e() - Ju ? (ke & 2) === 0 && zl(e, 0) : ad |= a, Dl === Se && (Dl = 0)), la(e);
  }
  function G0(e, t) {
    t === 0 && (t = Dm()), e = kn(e, t), e !== null && (Si(e, t), la(e));
  }
  function KA(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), G0(e, a);
  }
  function HA(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, s = e.memoizedState;
        s !== null && (a = s.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    l !== null && l.delete(t), G0(e, a);
  }
  function VA(e, t) {
    return ft(e, t);
  }
  var ec = null, jl = null, rd = !1, tc = !1, dd = !1, _a = 0;
  function la(e) {
    e !== jl && e.next === null && (jl === null ? ec = jl = e : jl = jl.next = e), tc = !0, rd || (rd = !0, QA());
  }
  function es(e, t) {
    if (!dd && tc) {
      dd = !0;
      do
        for (var a = !1, l = ec; l !== null; ) {
          if (e !== 0) {
            var s = l.pendingLanes;
            if (s === 0) var o = 0;
            else {
              var f = l.suspendedLanes, p = l.pingedLanes;
              o = (1 << 31 - Ct(42 | e) + 1) - 1, o &= s & ~(f & ~p), o = o & 201326741 ? o & 201326741 | 1 : o ? o | 2 : 0;
            }
            o !== 0 && (a = !0, V0(l, o));
          } else
            o = Se, o = iu(
              l,
              l === je ? o : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (o & 3) === 0 || Ai(l, o) || (a = !0, V0(l, o));
          l = l.next;
        }
      while (a);
      dd = !1;
    }
  }
  function XA() {
    q0();
  }
  function q0() {
    tc = rd = !1;
    var e = 0;
    _a !== 0 && tS() && (e = _a);
    for (var t = _e(), a = null, l = ec; l !== null; ) {
      var s = l.next, o = K0(l, t);
      o === 0 ? (l.next = null, a === null ? ec = s : a.next = s, s === null && (jl = a)) : (a = l, (e !== 0 || (o & 3) !== 0) && (tc = !0)), l = s;
    }
    We !== 0 && We !== 5 || es(e), _a !== 0 && (_a = 0);
  }
  function K0(e, t) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, s = e.expirationTimes, o = e.pendingLanes & -62914561; 0 < o; ) {
      var f = 31 - Ct(o), p = 1 << f, S = s[f];
      S === -1 ? ((p & a) === 0 || (p & l) !== 0) && (s[f] = yv(p, t)) : S <= t && (e.expiredLanes |= p), o &= ~p;
    }
    if (t = je, a = Se, a = iu(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === t && (we === 2 || we === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Tn(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Ai(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (l !== null && Tn(l), Mo(a)) {
        case 2:
        case 8:
          a = vi;
          break;
        case 32:
          a = Oa;
          break;
        case 268435456:
          a = da;
          break;
        default:
          a = Oa;
      }
      return l = H0.bind(null, e), a = ft(a, l), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return l !== null && l !== null && Tn(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function H0(e, t) {
    if (We !== 0 && We !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if ($u() && e.callbackNode !== a)
      return null;
    var l = Se;
    return l = iu(
      e,
      e === je ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (T0(e, l, t), K0(e, _e()), e.callbackNode != null && e.callbackNode === a ? H0.bind(null, e) : null);
  }
  function V0(e, t) {
    if ($u()) return null;
    T0(e, t, !0);
  }
  function QA() {
    nS(function() {
      (ke & 6) !== 0 ? ft(
        yi,
        XA
      ) : q0();
    });
  }
  function fd() {
    if (_a === 0) {
      var e = El;
      e === 0 && (e = au, au <<= 1, (au & 261888) === 0 && (au = 256)), _a = e;
    }
    return _a;
  }
  function X0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ou("" + e);
  }
  function Q0(e, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
  }
  function ZA(e, t, a, l, s) {
    if (t === "submit" && a && a.stateNode === s) {
      var o = X0(
        (s[ht] || null).action
      ), f = l.submitter;
      f && (t = (t = f[ht] || null) ? X0(t.formAction) : f.getAttribute("formAction"), t !== null && (o = t, f = null));
      var p = new mu(
        "action",
        "action",
        null,
        l,
        s
      );
      e.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (_a !== 0) {
                  var S = f ? Q0(s, f) : new FormData(s);
                  Ur(
                    a,
                    {
                      pending: !0,
                      data: S,
                      method: s.method,
                      action: o
                    },
                    null,
                    S
                  );
                }
              } else
                typeof o == "function" && (p.preventDefault(), S = f ? Q0(s, f) : new FormData(s), Ur(
                  a,
                  {
                    pending: !0,
                    data: S,
                    method: s.method,
                    action: o
                  },
                  o,
                  S
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var md = 0; md < Po.length; md++) {
    var gd = Po[md], JA = gd.toLowerCase(), YA = gd[0].toUpperCase() + gd.slice(1);
    Pt(
      JA,
      "on" + YA
    );
  }
  Pt(Eg, "onAnimationEnd"), Pt(Tg, "onAnimationIteration"), Pt(Cg, "onAnimationStart"), Pt("dblclick", "onDoubleClick"), Pt("focusin", "onFocus"), Pt("focusout", "onBlur"), Pt(rA, "onTransitionRun"), Pt(dA, "onTransitionStart"), Pt(fA, "onTransitionCancel"), Pt(Ng, "onTransitionEnd"), cl("onMouseEnter", ["mouseout", "mouseover"]), cl("onMouseLeave", ["mouseout", "mouseover"]), cl("onPointerEnter", ["pointerout", "pointerover"]), cl("onPointerLeave", ["pointerout", "pointerover"]), Nn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Nn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Nn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Nn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Nn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Nn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ts = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), PA = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ts)
  );
  function Z0(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a], s = l.event;
      l = l.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var f = l.length - 1; 0 <= f; f--) {
            var p = l[f], S = p.instance, I = p.currentTarget;
            if (p = p.listener, S !== o && s.isPropagationStopped())
              break e;
            o = p, s.currentTarget = I;
            try {
              o(s);
            } catch (B) {
              pu(B);
            }
            s.currentTarget = null, o = S;
          }
        else
          for (f = 0; f < l.length; f++) {
            if (p = l[f], S = p.instance, I = p.currentTarget, p = p.listener, S !== o && s.isPropagationStopped())
              break e;
            o = p, s.currentTarget = I;
            try {
              o(s);
            } catch (B) {
              pu(B);
            }
            s.currentTarget = null, o = S;
          }
      }
    }
  }
  function ve(e, t) {
    var a = t[xo];
    a === void 0 && (a = t[xo] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    a.has(l) || (J0(t, e, 2, !1), a.add(l));
  }
  function hd(e, t, a) {
    var l = 0;
    t && (l |= 4), J0(
      a,
      e,
      l,
      t
    );
  }
  var ac = "_reactListening" + Math.random().toString(36).slice(2);
  function pd(e) {
    if (!e[ac]) {
      e[ac] = !0, qm.forEach(function(a) {
        a !== "selectionchange" && (PA.has(a) || hd(a, !1, e), hd(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ac] || (t[ac] = !0, hd("selectionchange", !1, t));
    }
  }
  function J0(e, t, a, l) {
    switch (Ep(t)) {
      case 2:
        var s = TS;
        break;
      case 8:
        s = CS;
        break;
      default:
        s = wd;
    }
    a = s.bind(
      null,
      t,
      a,
      e
    ), s = void 0, !Bo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), l ? s !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: s
    }) : e.addEventListener(t, a, !0) : s !== void 0 ? e.addEventListener(t, a, {
      passive: s
    }) : e.addEventListener(t, a, !1);
  }
  function yd(e, t, a, l, s) {
    var o = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var f = l.tag;
        if (f === 3 || f === 4) {
          var p = l.stateNode.containerInfo;
          if (p === s) break;
          if (f === 4)
            for (f = l.return; f !== null; ) {
              var S = f.tag;
              if ((S === 3 || S === 4) && f.stateNode.containerInfo === s)
                return;
              f = f.return;
            }
          for (; p !== null; ) {
            if (f = il(p), f === null) return;
            if (S = f.tag, S === 5 || S === 6 || S === 26 || S === 27) {
              l = o = f;
              continue e;
            }
            p = p.parentNode;
          }
        }
        l = l.return;
      }
    _m(function() {
      var I = o, B = Oo(a), K = [];
      e: {
        var k = Mg.get(e);
        if (k !== void 0) {
          var U = mu, ee = e;
          switch (e) {
            case "keypress":
              if (du(a) === 0) break e;
            case "keydown":
            case "keyup":
              U = Hv;
              break;
            case "focusin":
              ee = "focus", U = qo;
              break;
            case "focusout":
              ee = "blur", U = qo;
              break;
            case "beforeblur":
            case "afterblur":
              U = qo;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              U = tg;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              U = Rv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              U = Qv;
              break;
            case Eg:
            case Tg:
            case Cg:
              U = Dv;
              break;
            case Ng:
              U = Jv;
              break;
            case "scroll":
            case "scrollend":
              U = Iv;
              break;
            case "wheel":
              U = Pv;
              break;
            case "copy":
            case "cut":
            case "paste":
              U = zv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              U = ng;
              break;
            case "toggle":
            case "beforetoggle":
              U = Wv;
          }
          var ce = (t & 4) !== 0, Be = !ce && (e === "scroll" || e === "scrollend"), N = ce ? k !== null ? k + "Capture" : null : k;
          ce = [];
          for (var E = I, x; E !== null; ) {
            var G = E;
            if (x = G.stateNode, G = G.tag, G !== 5 && G !== 26 && G !== 27 || x === null || N === null || (G = Ti(E, N), G != null && ce.push(
              as(E, G, x)
            )), Be) break;
            E = E.return;
          }
          0 < ce.length && (k = new U(
            k,
            ee,
            null,
            a,
            B
          ), K.push({ event: k, listeners: ce }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (k = e === "mouseover" || e === "pointerover", U = e === "mouseout" || e === "pointerout", k && a !== Do && (ee = a.relatedTarget || a.fromElement) && (il(ee) || ee[ll]))
            break e;
          if ((U || k) && (k = B.window === B ? B : (k = B.ownerDocument) ? k.defaultView || k.parentWindow : window, U ? (ee = a.relatedTarget || a.toElement, U = I, ee = ee ? il(ee) : null, ee !== null && (Be = m(ee), ce = ee.tag, ee !== Be || ce !== 5 && ce !== 27 && ce !== 6) && (ee = null)) : (U = null, ee = I), U !== ee)) {
            if (ce = tg, G = "onMouseLeave", N = "onMouseEnter", E = "mouse", (e === "pointerout" || e === "pointerover") && (ce = ng, G = "onPointerLeave", N = "onPointerEnter", E = "pointer"), Be = U == null ? k : Ei(U), x = ee == null ? k : Ei(ee), k = new ce(
              G,
              E + "leave",
              U,
              a,
              B
            ), k.target = Be, k.relatedTarget = x, G = null, il(B) === I && (ce = new ce(
              N,
              E + "enter",
              ee,
              a,
              B
            ), ce.target = x, ce.relatedTarget = Be, G = ce), Be = G, U && ee)
              t: {
                for (ce = FA, N = U, E = ee, x = 0, G = N; G; G = ce(G))
                  x++;
                G = 0;
                for (var ne = E; ne; ne = ce(ne))
                  G++;
                for (; 0 < x - G; )
                  N = ce(N), x--;
                for (; 0 < G - x; )
                  E = ce(E), G--;
                for (; x--; ) {
                  if (N === E || E !== null && N === E.alternate) {
                    ce = N;
                    break t;
                  }
                  N = ce(N), E = ce(E);
                }
                ce = null;
              }
            else ce = null;
            U !== null && Y0(
              K,
              k,
              U,
              ce,
              !1
            ), ee !== null && Be !== null && Y0(
              K,
              Be,
              ee,
              ce,
              !0
            );
          }
        }
        e: {
          if (k = I ? Ei(I) : window, U = k.nodeName && k.nodeName.toLowerCase(), U === "select" || U === "input" && k.type === "file")
            var xe = dg;
          else if (og(k))
            if (fg)
              xe = uA;
            else {
              xe = iA;
              var te = lA;
            }
          else
            U = k.nodeName, !U || U.toLowerCase() !== "input" || k.type !== "checkbox" && k.type !== "radio" ? I && Uo(I.elementType) && (xe = dg) : xe = sA;
          if (xe && (xe = xe(e, I))) {
            rg(
              K,
              xe,
              a,
              B
            );
            break e;
          }
          te && te(e, k, I), e === "focusout" && I && k.type === "number" && I.memoizedProps.value != null && wo(k, "number", k.value);
        }
        switch (te = I ? Ei(I) : window, e) {
          case "focusin":
            (og(te) || te.contentEditable === "true") && (gl = te, Zo = I, wi = null);
            break;
          case "focusout":
            wi = Zo = gl = null;
            break;
          case "mousedown":
            Jo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Jo = !1, Sg(K, a, B);
            break;
          case "selectionchange":
            if (oA) break;
          case "keydown":
          case "keyup":
            Sg(K, a, B);
        }
        var he;
        if (Ho)
          e: {
            switch (e) {
              case "compositionstart":
                var be = "onCompositionStart";
                break e;
              case "compositionend":
                be = "onCompositionEnd";
                break e;
              case "compositionupdate":
                be = "onCompositionUpdate";
                break e;
            }
            be = void 0;
          }
        else
          ml ? ug(e, a) && (be = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (be = "onCompositionStart");
        be && (lg && a.locale !== "ko" && (ml || be !== "onCompositionStart" ? be === "onCompositionEnd" && ml && (he = $m()) : (Ba = B, jo = "value" in Ba ? Ba.value : Ba.textContent, ml = !0)), te = nc(I, be), 0 < te.length && (be = new ag(
          be,
          e,
          null,
          a,
          B
        ), K.push({ event: be, listeners: te }), he ? be.data = he : (he = cg(a), he !== null && (be.data = he)))), (he = $v ? eA(e, a) : tA(e, a)) && (be = nc(I, "onBeforeInput"), 0 < be.length && (te = new ag(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          B
        ), K.push({
          event: te,
          listeners: be
        }), te.data = he)), ZA(
          K,
          e,
          I,
          a,
          B
        );
      }
      Z0(K, t);
    });
  }
  function as(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function nc(e, t) {
    for (var a = t + "Capture", l = []; e !== null; ) {
      var s = e, o = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || o === null || (s = Ti(e, a), s != null && l.unshift(
        as(e, s, o)
      ), s = Ti(e, t), s != null && l.push(
        as(e, s, o)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function FA(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Y0(e, t, a, l, s) {
    for (var o = t._reactName, f = []; a !== null && a !== l; ) {
      var p = a, S = p.alternate, I = p.stateNode;
      if (p = p.tag, S !== null && S === l) break;
      p !== 5 && p !== 26 && p !== 27 || I === null || (S = I, s ? (I = Ti(a, o), I != null && f.unshift(
        as(a, I, S)
      )) : s || (I = Ti(a, o), I != null && f.push(
        as(a, I, S)
      ))), a = a.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var WA = /\r\n?/g, _A = /\u0000|\uFFFD/g;
  function P0(e) {
    return (typeof e == "string" ? e : "" + e).replace(WA, `
`).replace(_A, "");
  }
  function F0(e, t) {
    return t = P0(t), P0(e) === t;
  }
  function ze(e, t, a, l, s, o) {
    switch (a) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || rl(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && rl(e, "" + l);
        break;
      case "className":
        uu(e, "class", l);
        break;
      case "tabIndex":
        uu(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        uu(e, a, l);
        break;
      case "style":
        Fm(e, l, o);
        break;
      case "data":
        if (t !== "object") {
          uu(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = ou("" + l), e.setAttribute(a, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == "function" && (a === "formAction" ? (t !== "input" && ze(e, t, "name", s.name, s, null), ze(
            e,
            t,
            "formEncType",
            s.formEncType,
            s,
            null
          ), ze(
            e,
            t,
            "formMethod",
            s.formMethod,
            s,
            null
          ), ze(
            e,
            t,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (ze(e, t, "encType", s.encType, s, null), ze(e, t, "method", s.method, s, null), ze(e, t, "target", s.target, s, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = ou("" + l), e.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (e.onclick = ma);
        break;
      case "onScroll":
        l != null && ve("scroll", e);
        break;
      case "onScrollEnd":
        l != null && ve("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(c(61));
          if (a = l.__html, a != null) {
            if (s.children != null) throw Error(c(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
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
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        a = ou("" + l), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
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
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "" + l) : e.removeAttribute(a);
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
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(a, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(a) : e.setAttribute(a, l);
        break;
      case "popover":
        ve("beforetoggle", e), ve("toggle", e), su(e, "popover", l);
        break;
      case "xlinkActuate":
        fa(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        fa(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        fa(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        fa(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        fa(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        fa(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        fa(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        fa(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        fa(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        su(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Mv.get(a) || a, su(e, a, l));
    }
  }
  function vd(e, t, a, l, s, o) {
    switch (a) {
      case "style":
        Fm(e, l, o);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(c(61));
          if (a = l.__html, a != null) {
            if (s.children != null) throw Error(c(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof l == "string" ? rl(e, l) : (typeof l == "number" || typeof l == "bigint") && rl(e, "" + l);
        break;
      case "onScroll":
        l != null && ve("scroll", e);
        break;
      case "onScrollEnd":
        l != null && ve("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = ma);
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
        if (!Km.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (s = a.endsWith("Capture"), t = a.slice(2, s ? a.length - 7 : void 0), o = e[ht] || null, o = o != null ? o[a] : null, typeof o == "function" && e.removeEventListener(t, o, s), typeof l == "function")) {
              typeof o != "function" && o !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, l, s);
              break e;
            }
            a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : su(e, a, l);
          }
    }
  }
  function st(e, t, a) {
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
        var l = !1, s = !1, o;
        for (o in a)
          if (a.hasOwnProperty(o)) {
            var f = a[o];
            if (f != null)
              switch (o) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, t));
                default:
                  ze(e, t, o, f, a, null);
              }
          }
        s && ze(e, t, "srcSet", a.srcSet, a, null), l && ze(e, t, "src", a.src, a, null);
        return;
      case "input":
        ve("invalid", e);
        var p = o = f = s = null, S = null, I = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var B = a[l];
            if (B != null)
              switch (l) {
                case "name":
                  s = B;
                  break;
                case "type":
                  f = B;
                  break;
                case "checked":
                  S = B;
                  break;
                case "defaultChecked":
                  I = B;
                  break;
                case "value":
                  o = B;
                  break;
                case "defaultValue":
                  p = B;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (B != null)
                    throw Error(c(137, t));
                  break;
                default:
                  ze(e, t, l, B, a, null);
              }
          }
        Zm(
          e,
          o,
          p,
          S,
          I,
          f,
          s,
          !1
        );
        return;
      case "select":
        ve("invalid", e), l = f = o = null;
        for (s in a)
          if (a.hasOwnProperty(s) && (p = a[s], p != null))
            switch (s) {
              case "value":
                o = p;
                break;
              case "defaultValue":
                f = p;
                break;
              case "multiple":
                l = p;
              default:
                ze(e, t, s, p, a, null);
            }
        t = o, a = f, e.multiple = !!l, t != null ? ol(e, !!l, t, !1) : a != null && ol(e, !!l, a, !0);
        return;
      case "textarea":
        ve("invalid", e), o = s = l = null;
        for (f in a)
          if (a.hasOwnProperty(f) && (p = a[f], p != null))
            switch (f) {
              case "value":
                l = p;
                break;
              case "defaultValue":
                s = p;
                break;
              case "children":
                o = p;
                break;
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(c(91));
                break;
              default:
                ze(e, t, f, p, a, null);
            }
        Ym(e, l, s, o);
        return;
      case "option":
        for (S in a)
          if (a.hasOwnProperty(S) && (l = a[S], l != null))
            switch (S) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                ze(e, t, S, l, a, null);
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
        for (l = 0; l < ts.length; l++)
          ve(ts[l], e);
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
        for (I in a)
          if (a.hasOwnProperty(I) && (l = a[I], l != null))
            switch (I) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                ze(e, t, I, l, a, null);
            }
        return;
      default:
        if (Uo(t)) {
          for (B in a)
            a.hasOwnProperty(B) && (l = a[B], l !== void 0 && vd(
              e,
              t,
              B,
              l,
              a,
              void 0
            ));
          return;
        }
    }
    for (p in a)
      a.hasOwnProperty(p) && (l = a[p], l != null && ze(e, t, p, l, a, null));
  }
  function $A(e, t, a, l) {
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
        var s = null, o = null, f = null, p = null, S = null, I = null, B = null;
        for (U in a) {
          var K = a[U];
          if (a.hasOwnProperty(U) && K != null)
            switch (U) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                S = K;
              default:
                l.hasOwnProperty(U) || ze(e, t, U, null, l, K);
            }
        }
        for (var k in l) {
          var U = l[k];
          if (K = a[k], l.hasOwnProperty(k) && (U != null || K != null))
            switch (k) {
              case "type":
                o = U;
                break;
              case "name":
                s = U;
                break;
              case "checked":
                I = U;
                break;
              case "defaultChecked":
                B = U;
                break;
              case "value":
                f = U;
                break;
              case "defaultValue":
                p = U;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null)
                  throw Error(c(137, t));
                break;
              default:
                U !== K && ze(
                  e,
                  t,
                  k,
                  U,
                  l,
                  K
                );
            }
        }
        Ro(
          e,
          f,
          p,
          S,
          I,
          B,
          o,
          s
        );
        return;
      case "select":
        U = f = p = k = null;
        for (o in a)
          if (S = a[o], a.hasOwnProperty(o) && S != null)
            switch (o) {
              case "value":
                break;
              case "multiple":
                U = S;
              default:
                l.hasOwnProperty(o) || ze(
                  e,
                  t,
                  o,
                  null,
                  l,
                  S
                );
            }
        for (s in l)
          if (o = l[s], S = a[s], l.hasOwnProperty(s) && (o != null || S != null))
            switch (s) {
              case "value":
                k = o;
                break;
              case "defaultValue":
                p = o;
                break;
              case "multiple":
                f = o;
              default:
                o !== S && ze(
                  e,
                  t,
                  s,
                  o,
                  l,
                  S
                );
            }
        t = p, a = f, l = U, k != null ? ol(e, !!a, k, !1) : !!l != !!a && (t != null ? ol(e, !!a, t, !0) : ol(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        U = k = null;
        for (p in a)
          if (s = a[p], a.hasOwnProperty(p) && s != null && !l.hasOwnProperty(p))
            switch (p) {
              case "value":
                break;
              case "children":
                break;
              default:
                ze(e, t, p, null, l, s);
            }
        for (f in l)
          if (s = l[f], o = a[f], l.hasOwnProperty(f) && (s != null || o != null))
            switch (f) {
              case "value":
                k = s;
                break;
              case "defaultValue":
                U = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(c(91));
                break;
              default:
                s !== o && ze(e, t, f, s, l, o);
            }
        Jm(e, k, U);
        return;
      case "option":
        for (var ee in a)
          if (k = a[ee], a.hasOwnProperty(ee) && k != null && !l.hasOwnProperty(ee))
            switch (ee) {
              case "selected":
                e.selected = !1;
                break;
              default:
                ze(
                  e,
                  t,
                  ee,
                  null,
                  l,
                  k
                );
            }
        for (S in l)
          if (k = l[S], U = a[S], l.hasOwnProperty(S) && k !== U && (k != null || U != null))
            switch (S) {
              case "selected":
                e.selected = k && typeof k != "function" && typeof k != "symbol";
                break;
              default:
                ze(
                  e,
                  t,
                  S,
                  k,
                  l,
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
        for (var ce in a)
          k = a[ce], a.hasOwnProperty(ce) && k != null && !l.hasOwnProperty(ce) && ze(e, t, ce, null, l, k);
        for (I in l)
          if (k = l[I], U = a[I], l.hasOwnProperty(I) && k !== U && (k != null || U != null))
            switch (I) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (k != null)
                  throw Error(c(137, t));
                break;
              default:
                ze(
                  e,
                  t,
                  I,
                  k,
                  l,
                  U
                );
            }
        return;
      default:
        if (Uo(t)) {
          for (var Be in a)
            k = a[Be], a.hasOwnProperty(Be) && k !== void 0 && !l.hasOwnProperty(Be) && vd(
              e,
              t,
              Be,
              void 0,
              l,
              k
            );
          for (B in l)
            k = l[B], U = a[B], !l.hasOwnProperty(B) || k === U || k === void 0 && U === void 0 || vd(
              e,
              t,
              B,
              k,
              l,
              U
            );
          return;
        }
    }
    for (var N in a)
      k = a[N], a.hasOwnProperty(N) && k != null && !l.hasOwnProperty(N) && ze(e, t, N, null, l, k);
    for (K in l)
      k = l[K], U = a[K], !l.hasOwnProperty(K) || k === U || k == null && U == null || ze(e, t, K, k, l, U);
  }
  function W0(e) {
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
  function eS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
        var s = a[l], o = s.transferSize, f = s.initiatorType, p = s.duration;
        if (o && p && W0(f)) {
          for (f = 0, p = s.responseEnd, l += 1; l < a.length; l++) {
            var S = a[l], I = S.startTime;
            if (I > p) break;
            var B = S.transferSize, K = S.initiatorType;
            B && W0(K) && (S = S.responseEnd, f += B * (S < p ? 1 : (p - I) / (S - I)));
          }
          if (--l, t += 8 * (o + f) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Ad = null, Sd = null;
  function lc(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function _0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function $0(e, t) {
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
  function bd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Ed = null;
  function tS() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ed ? !1 : (Ed = e, !0) : (Ed = null, !1);
  }
  var ep = typeof setTimeout == "function" ? setTimeout : void 0, aS = typeof clearTimeout == "function" ? clearTimeout : void 0, tp = typeof Promise == "function" ? Promise : void 0, nS = typeof queueMicrotask == "function" ? queueMicrotask : typeof tp < "u" ? function(e) {
    return tp.resolve(null).then(e).catch(lS);
  } : ep;
  function lS(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function $a(e) {
    return e === "head";
  }
  function ap(e, t) {
    var a = t, l = 0;
    do {
      var s = a.nextSibling;
      if (e.removeChild(a), s && s.nodeType === 8)
        if (a = s.data, a === "/$" || a === "/&") {
          if (l === 0) {
            e.removeChild(s), Kl(t);
            return;
          }
          l--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          l++;
        else if (a === "html")
          ns(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, ns(a);
          for (var o = a.firstChild; o; ) {
            var f = o.nextSibling, p = o.nodeName;
            o[bi] || p === "SCRIPT" || p === "STYLE" || p === "LINK" && o.rel.toLowerCase() === "stylesheet" || a.removeChild(o), o = f;
          }
        } else
          a === "body" && ns(e.ownerDocument.body);
      a = s;
    } while (a);
    Kl(t);
  }
  function np(e, t) {
    var a = e;
    e = 0;
    do {
      var l = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), l && l.nodeType === 8)
        if (a = l.data, a === "/$") {
          if (e === 0) break;
          e--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || e++;
      a = l;
    } while (a);
  }
  function Td(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Td(a), Io(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function iS(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var s = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[bi])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (o = e.getAttribute("rel"), o === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (o !== s.rel || e.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || e.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (o = e.getAttribute("src"), (o !== (s.src == null ? null : s.src) || e.getAttribute("type") !== (s.type == null ? null : s.type) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && o && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var o = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && e.getAttribute("name") === o)
          return e;
      } else return e;
      if (e = Kt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function sS(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Kt(e.nextSibling), e === null)) return null;
    return e;
  }
  function lp(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Kt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Cd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Nd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function uS(e, t) {
    var a = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || a.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), a.removeEventListener("DOMContentLoaded", l);
      };
      a.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function Kt(e) {
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
  var Md = null;
  function ip(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return Kt(e.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function sp(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return e;
          t--;
        } else a !== "/$" && a !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function up(e, t, a) {
    switch (t = lc(a), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(c(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(c(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(c(454));
        return e;
      default:
        throw Error(c(451));
    }
  }
  function ns(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Io(e);
  }
  var Ht = /* @__PURE__ */ new Map(), cp = /* @__PURE__ */ new Set();
  function ic(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ka = J.d;
  J.d = {
    f: cS,
    r: oS,
    D: rS,
    C: dS,
    L: fS,
    m: mS,
    X: hS,
    S: gS,
    M: pS
  };
  function cS() {
    var e = ka.f(), t = Fu();
    return e || t;
  }
  function oS(e) {
    var t = sl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Nh(t) : ka.r(e);
  }
  var Ll = typeof document > "u" ? null : document;
  function op(e, t, a) {
    var l = Ll;
    if (l && typeof t == "string" && t) {
      var s = Ot(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof a == "string" && (s += '[crossorigin="' + a + '"]'), cp.has(s) || (cp.add(s), e = { rel: e, crossOrigin: a, href: t }, l.querySelector(s) === null && (t = l.createElement("link"), st(t, "link", e), $e(t), l.head.appendChild(t)));
    }
  }
  function rS(e) {
    ka.D(e), op("dns-prefetch", e, null);
  }
  function dS(e, t) {
    ka.C(e, t), op("preconnect", e, t);
  }
  function fS(e, t, a) {
    ka.L(e, t, a);
    var l = Ll;
    if (l && e && t) {
      var s = 'link[rel="preload"][as="' + Ot(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (s += '[imagesrcset="' + Ot(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (s += '[imagesizes="' + Ot(
        a.imageSizes
      ) + '"]')) : s += '[href="' + Ot(e) + '"]';
      var o = s;
      switch (t) {
        case "style":
          o = Gl(e);
          break;
        case "script":
          o = ql(e);
      }
      Ht.has(o) || (e = C(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Ht.set(o, e), l.querySelector(s) !== null || t === "style" && l.querySelector(ls(o)) || t === "script" && l.querySelector(is(o)) || (t = l.createElement("link"), st(t, "link", e), $e(t), l.head.appendChild(t)));
    }
  }
  function mS(e, t) {
    ka.m(e, t);
    var a = Ll;
    if (a && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + Ot(l) + '"][href="' + Ot(e) + '"]', o = s;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          o = ql(e);
      }
      if (!Ht.has(o) && (e = C({ rel: "modulepreload", href: e }, t), Ht.set(o, e), a.querySelector(s) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(is(o)))
              return;
        }
        l = a.createElement("link"), st(l, "link", e), $e(l), a.head.appendChild(l);
      }
    }
  }
  function gS(e, t, a) {
    ka.S(e, t, a);
    var l = Ll;
    if (l && e) {
      var s = ul(l).hoistableStyles, o = Gl(e);
      t = t || "default";
      var f = s.get(o);
      if (!f) {
        var p = { loading: 0, preload: null };
        if (f = l.querySelector(
          ls(o)
        ))
          p.loading = 5;
        else {
          e = C(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = Ht.get(o)) && xd(e, a);
          var S = f = l.createElement("link");
          $e(S), st(S, "link", e), S._p = new Promise(function(I, B) {
            S.onload = I, S.onerror = B;
          }), S.addEventListener("load", function() {
            p.loading |= 1;
          }), S.addEventListener("error", function() {
            p.loading |= 2;
          }), p.loading |= 4, sc(f, t, l);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: p
        }, s.set(o, f);
      }
    }
  }
  function hS(e, t) {
    ka.X(e, t);
    var a = Ll;
    if (a && e) {
      var l = ul(a).hoistableScripts, s = ql(e), o = l.get(s);
      o || (o = a.querySelector(is(s)), o || (e = C({ src: e, async: !0 }, t), (t = Ht.get(s)) && Id(e, t), o = a.createElement("script"), $e(o), st(o, "link", e), a.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, l.set(s, o));
    }
  }
  function pS(e, t) {
    ka.M(e, t);
    var a = Ll;
    if (a && e) {
      var l = ul(a).hoistableScripts, s = ql(e), o = l.get(s);
      o || (o = a.querySelector(is(s)), o || (e = C({ src: e, async: !0, type: "module" }, t), (t = Ht.get(s)) && Id(e, t), o = a.createElement("script"), $e(o), st(o, "link", e), a.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, l.set(s, o));
    }
  }
  function rp(e, t, a, l) {
    var s = (s = le.current) ? ic(s) : null;
    if (!s) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Gl(a.href), a = ul(
          s
        ).hoistableStyles, l = a.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = Gl(a.href);
          var o = ul(
            s
          ).hoistableStyles, f = o.get(e);
          if (f || (s = s.ownerDocument || s, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, o.set(e, f), (o = s.querySelector(
            ls(e)
          )) && !o._p && (f.instance = o, f.state.loading = 5), Ht.has(e) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Ht.set(e, a), o || yS(
            s,
            e,
            a,
            f.state
          ))), t && l === null)
            throw Error(c(528, ""));
          return f;
        }
        if (t && l !== null)
          throw Error(c(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ql(a), a = ul(
          s
        ).hoistableScripts, l = a.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(c(444, e));
    }
  }
  function Gl(e) {
    return 'href="' + Ot(e) + '"';
  }
  function ls(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function dp(e) {
    return C({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function yS(e, t, a, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), st(t, "link", a), $e(t), e.head.appendChild(t));
  }
  function ql(e) {
    return '[src="' + Ot(e) + '"]';
  }
  function is(e) {
    return "script[async]" + e;
  }
  function fp(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Ot(a.href) + '"]'
          );
          if (l)
            return t.instance = l, $e(l), l;
          var s = C({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), $e(l), st(l, "style", s), sc(l, a.precedence, e), t.instance = l;
        case "stylesheet":
          s = Gl(a.href);
          var o = e.querySelector(
            ls(s)
          );
          if (o)
            return t.state.loading |= 4, t.instance = o, $e(o), o;
          l = dp(a), (s = Ht.get(s)) && xd(l, s), o = (e.ownerDocument || e).createElement("link"), $e(o);
          var f = o;
          return f._p = new Promise(function(p, S) {
            f.onload = p, f.onerror = S;
          }), st(o, "link", l), t.state.loading |= 4, sc(o, a.precedence, e), t.instance = o;
        case "script":
          return o = ql(a.src), (s = e.querySelector(
            is(o)
          )) ? (t.instance = s, $e(s), s) : (l = a, (s = Ht.get(o)) && (l = C({}, a), Id(l, s)), e = e.ownerDocument || e, s = e.createElement("script"), $e(s), st(s, "link", l), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, sc(l, a.precedence, e));
    return t.instance;
  }
  function sc(e, t, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = l.length ? l[l.length - 1] : null, o = s, f = 0; f < l.length; f++) {
      var p = l[f];
      if (p.dataset.precedence === t) o = p;
      else if (o !== s) break;
    }
    o ? o.parentNode.insertBefore(e, o.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function xd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Id(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var uc = null;
  function mp(e, t, a) {
    if (uc === null) {
      var l = /* @__PURE__ */ new Map(), s = uc = /* @__PURE__ */ new Map();
      s.set(a, l);
    } else
      s = uc, l = s.get(a), l || (l = /* @__PURE__ */ new Map(), s.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), s = 0; s < a.length; s++) {
      var o = a[s];
      if (!(o[bi] || o[at] || e === "link" && o.getAttribute("rel") === "stylesheet") && o.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = o.getAttribute(t) || "";
        f = e + f;
        var p = l.get(f);
        p ? p.push(o) : l.set(f, [o]);
      }
    }
    return l;
  }
  function gp(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function vS(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
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
  function hp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function AS(e, t, a, l) {
    if (a.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var s = Gl(l.href), o = t.querySelector(
          ls(s)
        );
        if (o) {
          t = o._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = cc.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = o, $e(o);
          return;
        }
        o = t.ownerDocument || t, l = dp(l), (s = Ht.get(s)) && xd(l, s), o = o.createElement("link"), $e(o);
        var f = o;
        f._p = new Promise(function(p, S) {
          f.onload = p, f.onerror = S;
        }), st(o, "link", l), a.instance = o;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = cc.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var kd = 0;
  function SS(e, t) {
    return e.stylesheets && e.count === 0 && rc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var l = setTimeout(function() {
        if (e.stylesheets && rc(e, e.stylesheets), e.unsuspend) {
          var o = e.unsuspend;
          e.unsuspend = null, o();
        }
      }, 6e4 + t);
      0 < e.imgBytes && kd === 0 && (kd = 62500 * eS());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && rc(e, e.stylesheets), e.unsuspend)) {
            var o = e.unsuspend;
            e.unsuspend = null, o();
          }
        },
        (e.imgBytes > kd ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(s);
      };
    } : null;
  }
  function cc() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) rc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var oc = null;
  function rc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, oc = /* @__PURE__ */ new Map(), t.forEach(bS, e), oc = null, cc.call(e));
  }
  function bS(e, t) {
    if (!(t.state.loading & 4)) {
      var a = oc.get(e);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), oc.set(e, a);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), o = 0; o < s.length; o++) {
          var f = s[o];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (a.set(f.dataset.precedence, f), l = f);
        }
        l && a.set(null, l);
      }
      s = t.instance, f = s.getAttribute("data-precedence"), o = a.get(f) || l, o === l && a.set(null, s), a.set(f, s), this.count++, l = cc.bind(this), s.addEventListener("load", l), s.addEventListener("error", l), o ? o.parentNode.insertBefore(s, o.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var ss = {
    $$typeof: X,
    Provider: null,
    Consumer: null,
    _currentValue: ie,
    _currentValue2: ie,
    _threadCount: 0
  };
  function ES(e, t, a, l, s, o, f, p, S) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Co(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Co(0), this.hiddenUpdates = Co(null), this.identifierPrefix = l, this.onUncaughtError = s, this.onCaughtError = o, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = S, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function pp(e, t, a, l, s, o, f, p, S, I, B, K) {
    return e = new ES(
      e,
      t,
      a,
      f,
      S,
      I,
      B,
      K,
      p
    ), t = 1, o === !0 && (t |= 24), o = Mt(3, null, null, t), e.current = o, o.stateNode = e, t = cr(), t.refCount++, e.pooledCache = t, t.refCount++, o.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: t
    }, fr(o), e;
  }
  function yp(e) {
    return e ? (e = yl, e) : yl;
  }
  function vp(e, t, a, l, s, o) {
    s = yp(s), l.context === null ? l.context = s : l.pendingContext = s, l = Ha(t), l.payload = { element: a }, o = o === void 0 ? null : o, o !== null && (l.callback = o), a = Va(e, l, t), a !== null && (bt(a, e, t), Li(a, e, t));
  }
  function Ap(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Rd(e, t) {
    Ap(e, t), (e = e.alternate) && Ap(e, t);
  }
  function Sp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = kn(e, 67108864);
      t !== null && bt(t, e, 67108864), Rd(e, 67108864);
    }
  }
  function bp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = wt();
      t = No(t);
      var a = kn(e, t);
      a !== null && bt(a, e, t), Rd(e, t);
    }
  }
  var dc = !0;
  function TS(e, t, a, l) {
    var s = O.T;
    O.T = null;
    var o = J.p;
    try {
      J.p = 2, wd(e, t, a, l);
    } finally {
      J.p = o, O.T = s;
    }
  }
  function CS(e, t, a, l) {
    var s = O.T;
    O.T = null;
    var o = J.p;
    try {
      J.p = 8, wd(e, t, a, l);
    } finally {
      J.p = o, O.T = s;
    }
  }
  function wd(e, t, a, l) {
    if (dc) {
      var s = Ud(l);
      if (s === null)
        yd(
          e,
          t,
          l,
          fc,
          a
        ), Tp(e, l);
      else if (MS(
        s,
        e,
        t,
        a,
        l
      ))
        l.stopPropagation();
      else if (Tp(e, l), t & 4 && -1 < NS.indexOf(e)) {
        for (; s !== null; ) {
          var o = sl(s);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (o = o.stateNode, o.current.memoizedState.isDehydrated) {
                  var f = Cn(o.pendingLanes);
                  if (f !== 0) {
                    var p = o;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; f; ) {
                      var S = 1 << 31 - Ct(f);
                      p.entanglements[1] |= S, f &= ~S;
                    }
                    la(o), (ke & 6) === 0 && (Yu = _e() + 500, es(0));
                  }
                }
                break;
              case 31:
              case 13:
                p = kn(o, 2), p !== null && bt(p, o, 2), Fu(), Rd(o, 2);
            }
          if (o = Ud(l), o === null && yd(
            e,
            t,
            l,
            fc,
            a
          ), o === s) break;
          s = o;
        }
        s !== null && l.stopPropagation();
      } else
        yd(
          e,
          t,
          l,
          null,
          a
        );
    }
  }
  function Ud(e) {
    return e = Oo(e), Dd(e);
  }
  var fc = null;
  function Dd(e) {
    if (fc = null, e = il(e), e !== null) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = g(t), e !== null) return e;
          e = null;
        } else if (a === 31) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return fc = e, null;
  }
  function Ep(e) {
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
        switch (pi()) {
          case yi:
            return 2;
          case vi:
            return 8;
          case Oa:
          case mt:
            return 32;
          case da:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Od = !1, en = null, tn = null, an = null, us = /* @__PURE__ */ new Map(), cs = /* @__PURE__ */ new Map(), nn = [], NS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Tp(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        en = null;
        break;
      case "dragenter":
      case "dragleave":
        tn = null;
        break;
      case "mouseover":
      case "mouseout":
        an = null;
        break;
      case "pointerover":
      case "pointerout":
        us.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        cs.delete(t.pointerId);
    }
  }
  function os(e, t, a, l, s, o) {
    return e === null || e.nativeEvent !== o ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: o,
      targetContainers: [s]
    }, t !== null && (t = sl(t), t !== null && Sp(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function MS(e, t, a, l, s) {
    switch (t) {
      case "focusin":
        return en = os(
          en,
          e,
          t,
          a,
          l,
          s
        ), !0;
      case "dragenter":
        return tn = os(
          tn,
          e,
          t,
          a,
          l,
          s
        ), !0;
      case "mouseover":
        return an = os(
          an,
          e,
          t,
          a,
          l,
          s
        ), !0;
      case "pointerover":
        var o = s.pointerId;
        return us.set(
          o,
          os(
            us.get(o) || null,
            e,
            t,
            a,
            l,
            s
          )
        ), !0;
      case "gotpointercapture":
        return o = s.pointerId, cs.set(
          o,
          os(
            cs.get(o) || null,
            e,
            t,
            a,
            l,
            s
          )
        ), !0;
    }
    return !1;
  }
  function Cp(e) {
    var t = il(e.target);
    if (t !== null) {
      var a = m(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = g(a), t !== null) {
            e.blockedOn = t, Lm(e.priority, function() {
              bp(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = h(a), t !== null) {
            e.blockedOn = t, Lm(e.priority, function() {
              bp(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function mc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Ud(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        Do = l, a.target.dispatchEvent(l), Do = null;
      } else
        return t = sl(a), t !== null && Sp(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function Np(e, t, a) {
    mc(e) && a.delete(t);
  }
  function xS() {
    Od = !1, en !== null && mc(en) && (en = null), tn !== null && mc(tn) && (tn = null), an !== null && mc(an) && (an = null), us.forEach(Np), cs.forEach(Np);
  }
  function gc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Od || (Od = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      xS
    )));
  }
  var hc = null;
  function Mp(e) {
    hc !== e && (hc = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        hc === e && (hc = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], l = e[t + 1], s = e[t + 2];
          if (typeof l != "function") {
            if (Dd(l || a) === null)
              continue;
            break;
          }
          var o = sl(a);
          o !== null && (e.splice(t, 3), t -= 3, Ur(
            o,
            {
              pending: !0,
              data: s,
              method: a.method,
              action: l
            },
            l,
            s
          ));
        }
      }
    ));
  }
  function Kl(e) {
    function t(S) {
      return gc(S, e);
    }
    en !== null && gc(en, e), tn !== null && gc(tn, e), an !== null && gc(an, e), us.forEach(t), cs.forEach(t);
    for (var a = 0; a < nn.length; a++) {
      var l = nn[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < nn.length && (a = nn[0], a.blockedOn === null); )
      Cp(a), a.blockedOn === null && nn.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var s = a[l], o = a[l + 1], f = s[ht] || null;
        if (typeof o == "function")
          f || Mp(a);
        else if (f) {
          var p = null;
          if (o && o.hasAttribute("formAction")) {
            if (s = o, f = o[ht] || null)
              p = f.formAction;
            else if (Dd(s) !== null) continue;
          } else p = f.action;
          typeof p == "function" ? a[l + 1] = p : (a.splice(l, 3), l -= 3), Mp(a);
        }
      }
  }
  function xp() {
    function e(o) {
      o.canIntercept && o.info === "react-transition" && o.intercept({
        handler: function() {
          return new Promise(function(f) {
            return s = f;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      s !== null && (s(), s = null), l || setTimeout(a, 20);
    }
    function a() {
      if (!l && !navigation.transition) {
        var o = navigation.currentEntry;
        o && o.url != null && navigation.navigate(o.url, {
          state: o.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, s = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), s !== null && (s(), s = null);
      };
    }
  }
  function zd(e) {
    this._internalRoot = e;
  }
  pc.prototype.render = zd.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(c(409));
    var a = t.current, l = wt();
    vp(a, l, e, t, null, null);
  }, pc.prototype.unmount = zd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      vp(e.current, 2, null, e, null, null), Fu(), t[ll] = null;
    }
  };
  function pc(e) {
    this._internalRoot = e;
  }
  pc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = jm();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < nn.length && t !== 0 && t < nn[a].priority; a++) ;
      nn.splice(a, 0, e), a === 0 && Cp(e);
    }
  };
  var Ip = i.version;
  if (Ip !== "19.2.4")
    throw Error(
      c(
        527,
        Ip,
        "19.2.4"
      )
    );
  J.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = y(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var IS = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var yc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!yc.isDisabled && yc.supportsFiber)
      try {
        Ut = yc.inject(
          IS
        ), Ze = yc;
      } catch {
      }
  }
  return ds.createRoot = function(e, t) {
    if (!r(e)) throw Error(c(299));
    var a = !1, l = "", s = zh, o = Bh, f = jh;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (o = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = pp(
      e,
      1,
      !1,
      null,
      null,
      a,
      l,
      null,
      s,
      o,
      f,
      xp
    ), e[ll] = t.current, pd(e), new zd(t);
  }, ds.hydrateRoot = function(e, t, a) {
    if (!r(e)) throw Error(c(299));
    var l = !1, s = "", o = zh, f = Bh, p = jh, S = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (s = a.identifierPrefix), a.onUncaughtError !== void 0 && (o = a.onUncaughtError), a.onCaughtError !== void 0 && (f = a.onCaughtError), a.onRecoverableError !== void 0 && (p = a.onRecoverableError), a.formState !== void 0 && (S = a.formState)), t = pp(
      e,
      1,
      !0,
      t,
      a ?? null,
      l,
      s,
      S,
      o,
      f,
      p,
      xp
    ), t.context = yp(null), a = t.current, l = wt(), l = No(l), s = Ha(l), s.callback = null, Va(a, s, l), a = l, t.current.lanes = a, Si(t, a), la(t), e[ll] = t.current, pd(e), new pc(t);
  }, ds.version = "19.2.4", ds;
}
var Lp;
function GS() {
  if (Lp) return jd.exports;
  Lp = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), jd.exports = LS(), jd.exports;
}
var bn = GS(), j = $f(), em = K1();
const qS = 400;
function oi({
  open: n,
  onClose: i,
  children: u,
  width: c = 680,
  height: r = 520,
  maskClosable: m = !0,
  closable: g = !0
}) {
  const h = j.useRef(null), v = j.useRef(null), y = j.useRef(null), b = j.useRef(null), C = j.useRef(!1), A = j.useRef(0), [w, L] = j.useState(!1), [D, H] = j.useState(!1);
  j.useEffect(() => {
    n ? (L(!0), H(!1)) : w && H(!0);
  }, [n]), j.useEffect(() => {
    if (!D) return;
    const z = v.current, Y = () => {
      L(!1), H(!1);
    };
    if (!z) {
      Y();
      return;
    }
    const pe = (se) => {
      se.target === z && Y();
    };
    z.addEventListener("animationend", pe);
    const oe = window.setTimeout(Y, qS);
    return () => {
      z.removeEventListener("animationend", pe), window.clearTimeout(oe);
    };
  }, [D]);
  const F = j.useCallback(() => {
    const z = Date.now();
    z - A.current < 300 || (A.current = z, i());
  }, [i]);
  if (j.useEffect(() => {
    const z = b.current;
    if (!z) return;
    const Y = (pe) => {
      pe.stopPropagation(), F();
    };
    return z.addEventListener("pointerdown", Y, !0), z.addEventListener("click", Y, !0), () => {
      z.removeEventListener("pointerdown", Y, !0), z.removeEventListener("click", Y, !0);
    };
  }, [F, w, g]), j.useEffect(() => {
    if (!n) return;
    const z = (Y) => {
      Y.key === "Escape" && F();
    };
    return document.addEventListener("keydown", z), () => document.removeEventListener("keydown", z);
  }, [n, F]), j.useEffect(() => {
    if (!w || D) return;
    const z = y.current;
    if (!z) return;
    const Y = z.getContext("2d");
    if (!Y) return;
    let pe, oe = !1;
    const se = [], fe = () => {
      const ue = z.parentElement;
      if (ue) {
        const O = ue.offsetWidth, J = ue.offsetHeight;
        O > 0 && J > 0 && (z.width = O, z.height = J);
      }
    }, Ne = () => {
      if (!(oe || z.width === 0 || z.height === 0)) {
        oe = !0;
        for (let ue = 0; ue < 80; ue++)
          se.push({
            x: Math.random() * z.width,
            y: Math.random() * z.height,
            size: Math.random() * 1.5 + 0.5,
            speedY: Math.random() * 0.4 + 0.1,
            speedX: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.3 + 0.1,
            isGold: Math.random() > 0.7
          });
      }
    }, Re = () => {
      oe || (fe(), Ne()), Y.clearRect(0, 0, z.width, z.height), se.forEach((ue) => {
        ue.y -= ue.speedY, ue.x += ue.speedX, ue.opacity += (Math.random() - 0.5) * 0.02, ue.opacity < 0.1 && (ue.opacity = 0.1), ue.opacity > 0.5 && (ue.opacity = 0.5), ue.y < 0 && (ue.y = z.height, ue.x = Math.random() * z.width), ue.isGold ? (Y.shadowBlur = 4, Y.shadowColor = `rgba(200, 170, 110, ${ue.opacity})`) : (Y.shadowBlur = 3, Y.shadowColor = `rgba(0, 180, 255, ${ue.opacity * 0.8})`), Y.beginPath(), Y.arc(ue.x, ue.y, ue.size, 0, Math.PI * 2), Y.fillStyle = ue.isGold ? `rgba(220, 190, 130, ${ue.opacity})` : `rgba(80, 200, 255, ${ue.opacity * 0.85})`, Y.fill();
      }), Y.shadowBlur = 0, Y.shadowColor = "transparent", pe = requestAnimationFrame(Re);
    };
    return pe = requestAnimationFrame(Re), window.addEventListener("resize", fe), () => {
      window.removeEventListener("resize", fe), cancelAnimationFrame(pe);
    };
  }, [w, D]), j.useEffect(() => (w && !D && (document.body.style.overflow = "hidden"), w || (document.body.style.overflow = ""), () => {
    document.body.style.overflow = "";
  }), [w, D]), !w) return null;
  const V = {
    width: typeof c == "number" ? `${c}px` : c,
    height: typeof r == "number" ? `${r}px` : r
  }, X = `sona-modal-overlay${D ? " sona-modal-closing" : ""}`, Q = `sona-modal-dialog${D ? " sona-modal-closing" : ""}`, Z = (z) => {
    C.current = z.target === z.currentTarget, z.stopPropagation();
  }, W = (z) => {
    const Y = m && C.current && z.target === z.currentTarget;
    C.current = !1, z.stopPropagation(), Y && F();
  };
  return em.createPortal(
    /* @__PURE__ */ d.jsx(
      "div",
      {
        ref: v,
        className: X,
        onClick: (z) => z.stopPropagation(),
        onMouseDown: Z,
        onMouseUp: W,
        children: /* @__PURE__ */ d.jsxs(
          "div",
          {
            ref: h,
            className: Q,
            style: V,
            onClick: (z) => z.stopPropagation(),
            children: [
              /* @__PURE__ */ d.jsx(
                "canvas",
                {
                  ref: y,
                  className: "sona-modal-particle-canvas"
                }
              ),
              g && /* @__PURE__ */ d.jsx("button", { ref: b, className: "sona-modal-close", onClick: F, title: "Close", children: /* @__PURE__ */ d.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ d.jsx("path", { d: "M1 1L13 13M13 1L1 13", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) }) }),
              /* @__PURE__ */ d.jsx("div", { className: "sona-modal-body", children: u })
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
function H1() {
  return /* @__PURE__ */ d.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ d.jsx("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) });
}
function KS() {
  return /* @__PURE__ */ d.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ d.jsx("polyline", { points: "16 18 22 12 16 6" }),
    /* @__PURE__ */ d.jsx("polyline", { points: "8 6 2 12 8 18" })
  ] });
}
function HS() {
  return /* @__PURE__ */ d.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ d.jsx("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
    /* @__PURE__ */ d.jsx("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
    /* @__PURE__ */ d.jsx("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
  ] });
}
function VS() {
  return /* @__PURE__ */ d.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ d.jsx("path", { d: "M9 18V5l12-2v13" }),
    /* @__PURE__ */ d.jsx("circle", { cx: "6", cy: "18", r: "3" }),
    /* @__PURE__ */ d.jsx("circle", { cx: "18", cy: "16", r: "3" })
  ] });
}
function XS() {
  return /* @__PURE__ */ d.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ d.jsx("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
    /* @__PURE__ */ d.jsx("polyline", { points: "9 22 9 12 15 12 15 22" })
  ] });
}
function QS() {
  return /* @__PURE__ */ d.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ d.jsx("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ d.jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })
  ] });
}
function ZS() {
  return /* @__PURE__ */ d.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ d.jsx("line", { x1: "6", y1: "12", x2: "10", y2: "12" }),
    /* @__PURE__ */ d.jsx("line", { x1: "8", y1: "10", x2: "8", y2: "14" }),
    /* @__PURE__ */ d.jsx("line", { x1: "15", y1: "13", x2: "15.01", y2: "13" }),
    /* @__PURE__ */ d.jsx("line", { x1: "18", y1: "11", x2: "18.01", y2: "11" }),
    /* @__PURE__ */ d.jsx("path", { d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" })
  ] });
}
function JS() {
  return /* @__PURE__ */ d.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ d.jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ d.jsx("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
    /* @__PURE__ */ d.jsx("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
  ] });
}
function YS() {
  return /* @__PURE__ */ d.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ d.jsx("polyline", { points: "15 18 9 12 15 6" }) });
}
function PS() {
  return /* @__PURE__ */ d.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ d.jsx("polyline", { points: "9 18 15 12 9 6" }) });
}
function FS() {
  return /* @__PURE__ */ d.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ d.jsx("path", { d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.338c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" }) });
}
function WS({ items: n, activeId: i, onSelect: u, collapsed: c, onToggle: r }) {
  return /* @__PURE__ */ d.jsxs("div", { className: `sona-sidebar${c ? " sona-sidebar--collapsed" : ""}`, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "sona-sidebar-logo", children: [
      /* @__PURE__ */ d.jsx("span", { className: "sona-sidebar-logo-icon", children: /* @__PURE__ */ d.jsx(VS, {}) }),
      !c && /* @__PURE__ */ d.jsxs("span", { className: "sona-sidebar-logo-title", children: [
        /* @__PURE__ */ d.jsx("span", { className: "sona-sidebar-logo-text", children: "Sona" }),
        /* @__PURE__ */ d.jsxs("span", { className: "sona-sidebar-logo-version", children: [
          "v",
          "1.11.0"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("nav", { className: "sona-sidebar-nav", children: n.map((m) => /* @__PURE__ */ d.jsxs(
      "button",
      {
        className: `sona-sidebar-item${i === m.id ? " sona-sidebar-item--active" : ""}`,
        onClick: () => u(m.id),
        title: c ? m.label : void 0,
        children: [
          /* @__PURE__ */ d.jsx("span", { className: "sona-sidebar-item-icon", children: m.icon }),
          !c && /* @__PURE__ */ d.jsx("span", { className: "sona-sidebar-item-label", children: m.label })
        ]
      },
      m.id
    )) }),
    /* @__PURE__ */ d.jsx("div", { className: "sona-sidebar-footer", children: /* @__PURE__ */ d.jsx("button", { className: "sona-sidebar-toggle", onClick: r, title: c ? "展开侧边栏" : "收起侧边栏", children: c ? /* @__PURE__ */ d.jsx(PS, {}) : /* @__PURE__ */ d.jsx(YS, {}) }) })
  ] });
}
const V1 = "data:image/png;base64,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";
function _S() {
  const n = j.useRef(null);
  return j.useEffect(() => {
    const i = n.current;
    if (!i) return;
    const u = i.getContext("2d");
    if (!u) return;
    let c = 0;
    const r = [], m = () => {
      const v = i.parentElement;
      v && (i.width = v.offsetWidth, i.height = v.offsetHeight);
    }, g = () => {
      const v = i.width / 2, y = i.height / 2, b = Math.random() > 0.35, C = Math.random() * Math.PI * 2, A = 30 + Math.random() * 20;
      r.push({
        x: v + Math.cos(C) * A,
        y: y + Math.sin(C) * A,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.12 + 0.05),
        size: Math.random() * 1.8 + 0.5,
        opacity: 0,
        life: 0,
        maxLife: 50 + Math.random() * 50,
        isGold: b
      });
    }, h = () => {
      u.clearRect(0, 0, i.width, i.height), r.length < 80 && g();
      for (let v = r.length - 1; v >= 0; v--) {
        const y = r[v];
        y.life++, y.x += y.vx, y.y += y.vy, y.vx += (Math.random() - 0.5) * 0.01, y.vy -= 1e-3;
        const b = y.life / y.maxLife;
        if (b < 0.2 ? y.opacity = b / 0.2 * 0.8 : b > 0.7 && (y.opacity = (1 - b) / 0.3 * 0.8), y.life >= y.maxLife) {
          r.splice(v, 1);
          continue;
        }
        y.isGold ? (u.shadowBlur = 6, u.shadowColor = `rgba(200, 170, 110, ${y.opacity})`, u.fillStyle = `rgba(220, 190, 130, ${y.opacity})`) : (u.shadowBlur = 5, u.shadowColor = `rgba(0, 180, 255, ${y.opacity * 0.8})`, u.fillStyle = `rgba(100, 200, 255, ${y.opacity * 0.85})`), u.beginPath(), u.arc(y.x, y.y, y.size, 0, Math.PI * 2), u.fill();
      }
      u.shadowBlur = 0, u.shadowColor = "transparent", c = requestAnimationFrame(h);
    };
    return m(), window.addEventListener("resize", m), c = requestAnimationFrame(h), () => {
      cancelAnimationFrame(c), window.removeEventListener("resize", m);
    };
  }, []), /* @__PURE__ */ d.jsx("canvas", { ref: n, className: "sona-home-particle-canvas" });
}
function Gp() {
  return /* @__PURE__ */ d.jsxs("div", { className: "sona-home", children: [
    /* @__PURE__ */ d.jsx("h1", { className: "sona-home-brand", children: /* @__PURE__ */ d.jsx("span", { className: "sona-home-brand-text", children: "SONA" }) }),
    /* @__PURE__ */ d.jsxs("div", { className: "sona-home-avatar-wrap", children: [
      /* @__PURE__ */ d.jsx(_S, {}),
      /* @__PURE__ */ d.jsx("div", { className: "sona-home-avatar-glow" }),
      /* @__PURE__ */ d.jsx(
        "img",
        {
          className: "sona-home-avatar",
          src: V1,
          alt: "Sona",
          draggable: !1
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "sona-home-welcome", children: [
      /* @__PURE__ */ d.jsx("h2", { className: "sona-home-heading", children: "欢迎使用 Sona" }),
      /* @__PURE__ */ d.jsx("p", { className: "sona-home-subtitle", children: "你的英雄联盟客户端增强工具" })
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "sona-home-quote", children: [
      '"本项目完全开源免费，如果你通过收费渠道使用，那你被骗啦!"',
      /* @__PURE__ */ d.jsx("br", {}),
      " ",
      "—— 神奇的WJZ_P"
    ] })
  ] });
}
function Vt({ title: n, description: i, children: u, layout: c = "row" }) {
  return /* @__PURE__ */ d.jsxs("div", { className: `sona-setting-card${c === "stacked" ? " sona-setting-card--stacked" : ""}`, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "sona-setting-card-info", children: [
      /* @__PURE__ */ d.jsx("h4", { className: "sona-setting-card-title", children: n }),
      i && /* @__PURE__ */ d.jsx("p", { className: "sona-setting-card-desc", children: i })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: "sona-setting-card-action", children: u })
  ] });
}
function rf({ title: n, children: i }) {
  return /* @__PURE__ */ d.jsxs("div", { className: "sona-setting-group", children: [
    /* @__PURE__ */ d.jsx("h3", { className: "sona-setting-group-title", children: n }),
    /* @__PURE__ */ d.jsx("div", { className: "sona-setting-group-list", children: i })
  ] });
}
function Ns({ children: n, variant: i = "primary", onClick: u, disabled: c = !1, style: r }) {
  return /* @__PURE__ */ d.jsxs(
    "button",
    {
      className: `sona-btn sona-btn--${i}${c ? " sona-btn--disabled" : ""}`,
      onClick: u,
      disabled: c,
      style: r,
      type: "button",
      children: [
        /* @__PURE__ */ d.jsx("span", { className: "sona-btn-shine" }),
        n
      ]
    }
  );
}
function $S({ value: n, onChange: i, placeholder: u, icon: c, type: r = "text", onKeyDown: m }) {
  const [g, h] = j.useState(!1);
  return /* @__PURE__ */ d.jsxs("div", { className: `sona-input${g ? " sona-input--focused" : ""}`, children: [
    c && /* @__PURE__ */ d.jsx("span", { className: "sona-input-icon", children: c }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        type: r,
        value: n,
        onChange: (v) => i(v.target.value),
        onKeyDown: m,
        placeholder: u,
        onFocus: () => h(!0),
        onBlur: () => h(!1),
        className: "sona-input-field"
      }
    )
  ] });
}
function ia({ checked: n, onChange: i, disabled: u = !1 }) {
  return /* @__PURE__ */ d.jsx(
    "button",
    {
      className: `sona-switch${n ? " sona-switch--on" : ""}${u ? " sona-switch--disabled" : ""}`,
      onClick: () => !u && i(!n),
      type: "button",
      role: "switch",
      "aria-checked": n,
      children: /* @__PURE__ */ d.jsx("span", { className: "sona-switch-thumb" })
    }
  );
}
function Zn({ options: n, value: i, onChange: u, placeholder: c = "请选择..." }) {
  const [r, m] = j.useState(!1), g = j.useRef(null), h = n.find((v) => v.value === i);
  return j.useEffect(() => {
    function v(y) {
      g.current && !g.current.contains(y.target) && m(!1);
    }
    return document.addEventListener("mousedown", v), () => document.removeEventListener("mousedown", v);
  }, []), /* @__PURE__ */ d.jsxs("div", { className: "sona-select", ref: g, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        className: `sona-select-trigger${r ? " sona-select-trigger--open" : ""}`,
        onClick: () => m(!r),
        type: "button",
        children: [
          /* @__PURE__ */ d.jsxs("span", { className: "sona-select-value", children: [
            (h == null ? void 0 : h.icon) && /* @__PURE__ */ d.jsx("img", { className: "sona-select-icon", src: h.icon, alt: "" }),
            h ? h.label : c
          ] }),
          /* @__PURE__ */ d.jsx("svg", { className: `sona-select-arrow${r ? " sona-select-arrow--open" : ""}`, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ d.jsx("polyline", { points: "6 9 12 15 18 9" }) })
        ]
      }
    ),
    r && /* @__PURE__ */ d.jsx("div", { className: "sona-select-dropdown", children: n.map((v) => /* @__PURE__ */ d.jsxs(
      "button",
      {
        className: `sona-select-option${i === v.value ? " sona-select-option--active" : ""}`,
        onClick: () => {
          u(v.value), m(!1);
        },
        type: "button",
        children: [
          /* @__PURE__ */ d.jsxs("span", { className: "sona-select-option-label", children: [
            v.icon && /* @__PURE__ */ d.jsx("img", { className: "sona-select-icon", src: v.icon, alt: "" }),
            v.label
          ] }),
          i === v.value && /* @__PURE__ */ d.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ d.jsx("polyline", { points: "20 6 9 17 4 12" }) })
        ]
      },
      v.value
    )) })
  ] });
}
const eb = {
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
function tm(n) {
  return eb[n] ?? "未定级";
}
const df = {
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
}, Hd = [
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
function yo(n) {
  return n > 0 ? `q_${n}` : "";
}
const qp = [
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
], tb = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function X1(n) {
  const i = n.trim().toLowerCase();
  if (!tb.test(i)) return "";
  const u = i.replace(/-/g, "");
  let c = "";
  for (let r = 0; r < qp.length; r++) {
    const m = Number.parseInt(u.slice(r * 2, r * 2 + 2), 16);
    c += (m ^ qp[r]).toString(16).padStart(2, "0");
  }
  return [
    c.slice(0, 8),
    c.slice(8, 12),
    c.slice(12, 16),
    c.slice(16, 20),
    c.slice(20)
  ].join("-");
}
var oa = /* @__PURE__ */ ((n) => (n.GAMEFLOW_PHASE = "/lol-gameflow/v1/session", n.CHAMP_SELECT = "/lol-champ-select/v1/session", n.GAMEFLOW_PHASE_CHANGE = "/lol-gameflow/v1/gameflow-phase", n.LOBBY = "/lol-lobby/v2/lobby", n))(oa || {});
async function ri(n, i = {}) {
  const u = n.startsWith("/") ? n : `/${n}`, c = await fetch(u, {
    ...i,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...i.headers
    }
  });
  if (!c.ok)
    throw new Error(`[LCU] 请求失败: ${i.method ?? "GET"} ${u} → ${c.status} ${c.statusText}`);
  const r = await c.text();
  return r ? JSON.parse(r) : void 0;
}
function Ce(n) {
  return ri(n, { method: "GET" });
}
function Vd(n, i) {
  return ri(n, {
    method: "POST",
    body: i != null ? JSON.stringify(i) : void 0
  });
}
function Xd(n, i) {
  return ri(n, {
    method: "PUT",
    body: i != null ? JSON.stringify(i) : void 0
  });
}
function Kp(n) {
  return ri(n, { method: "DELETE" });
}
function Hp(n, i) {
  return ri(n, {
    method: "PATCH",
    body: i != null ? JSON.stringify(i) : void 0
  });
}
function Vp(n) {
  const i = n.toUpperCase(), u = i.startsWith("TENCENT_") ? i : `TENCENT_${i}`;
  return df[u] ? u : "";
}
class ab {
  constructor() {
    Ae(this, "eventListeners", /* @__PURE__ */ new Map());
    /** 当前 socket 上已经实际调用过 observe 的 URI 集合 */
    Ae(this, "observedUris", /* @__PURE__ */ new Set());
    Ae(this, "penguContext", null);
    // -------------------- SGP Token 缓存 --------------------
    /**
     * Entitlements Token 缓存
     *
     * 通过 WS 事件 `/entitlements/v1/token` 自动保活：
     * LCU 会在 token 即将过期时主动推送新 token，无需自己算过期时间。
     * 初始值通过主动拉取填充，后续由 WS 事件驱动更新。
     */
    Ae(this, "_entitlementsToken", null);
    /**
     * League Session Token 缓存
     *
     * 通过 WS 事件 `/lol-league-session/v1/league-session-token` 自动保活。
     */
    Ae(this, "_leagueSessionToken", null);
    // -------------------- 底层请求 (公开) --------------------
    /** 通用 REST 请求 */
    Ae(this, "request", ri);
    Ae(this, "get", Ce);
    Ae(this, "post", Vd);
    Ae(this, "put", Xd);
    Ae(this, "patch", Hp);
    Ae(this, "delete", Kp);
  }
  /** SGP Token 是否已就绪（两个 token 都已拿到） */
  get isSgpTokenReady() {
    return this._entitlementsToken !== null && this._leagueSessionToken !== null;
  }
  /** 获取缓存的 Entitlements Token（不会发起网络请求） */
  get cachedEntitlementsToken() {
    return this._entitlementsToken;
  }
  /** 获取缓存的 League Session Token（不会发起网络请求） */
  get cachedLeagueSessionToken() {
    return this._leagueSessionToken;
  }
  // -------------------- 初始化 --------------------
  /**
   * 绑定 PenguContext，用于 WebSocket 事件监听
   * 应在 init(context) 生命周期中调用
   */
  bindContext(i) {
    this.penguContext = i;
    const u = Array.from(this.eventListeners.keys());
    this.observedUris.clear(), console.log("[LCUManager] bindContext() → replay %d observed uri(s)", u.length), u.forEach((c) => this.observeUriOnSocket(c)), this._initSgpTokenKeepAlive();
  }
  /**
   * SGP Token 保活机制
   *
   * 参考 LeagueAkari 的 _maintainEntitlementsToken / _maintainLeagueSessionToken 实现。
   *
   * 策略：
   * 1. 启动时主动拉取一次 token 填充缓存
   * 2. 监听 LCU WebSocket 事件，token 变化时自动更新缓存
   *    - `/entitlements/v1/token` → Entitlements Token
   *    - `/lol-league-session/v1/league-session-token` → League Session Token
   * 3. LCU 会在 token 即将过期时主动推送新 token，无需自己算过期时间
   */
  _initSgpTokenKeepAlive() {
    this._fetchInitialTokens(), this.observe("/entitlements/v1/token", (i) => {
      const u = i.data;
      u ? (this._entitlementsToken = u, console.log("[LCUManager] Entitlements Token 已通过 WS 事件更新")) : (this._entitlementsToken = null, console.log("[LCUManager] Entitlements Token 已清空（WS 事件）"));
    }), this.observe("/lol-league-session/v1/league-session-token", (i) => {
      const u = i.data;
      u ? (this._leagueSessionToken = u, console.log("[LCUManager] League Session Token 已通过 WS 事件更新")) : (this._leagueSessionToken = null, console.log("[LCUManager] League Session Token 已清空（WS 事件）"));
    });
  }
  /** 主动拉取初始 token 填充缓存 */
  async _fetchInitialTokens() {
    try {
      const [i, u] = await Promise.all([
        this.getEntitlementsToken().catch((c) => (console.warn("[LCUManager] 初始拉取 Entitlements Token 失败:", c), null)),
        this.getLeagueSessionToken().catch((c) => (console.warn("[LCUManager] 初始拉取 League Session Token 失败:", c), null))
      ]);
      i && (this._entitlementsToken = i, console.log("[LCUManager] 初始 Entitlements Token 已获取")), u && (this._leagueSessionToken = u, console.log("[LCUManager] 初始 League Session Token 已获取"));
    } catch (i) {
      console.warn("[LCUManager] 初始拉取 SGP Token 异常:", i);
    }
  }
  // ==================== 召唤师 ====================
  /** 获取当前登录的召唤师信息 */
  getSummonerInfo() {
    return Ce("/lol-summoner/v1/current-summoner");
  }
  /** 通过 summoner ID 获取召唤师信息 */
  getSummonerById(i) {
    return Ce(`/lol-summoner/v1/summoners/${i}`);
  }
  /** 通过 puuid 获取召唤师信息 */
  getSummonerByPuuid(i) {
    return Ce(`/lol-summoner/v2/summoners/puuid/${i}`);
  }
  /** 通过 gameName + tagLine (Riot ID) 获取召唤师信息 */
  getSummonerByRiotId(i, u) {
    return Ce(`/lol-summoner/v1/alias/lookup?gameName=${encodeURIComponent(i)}&tagLine=${encodeURIComponent(u)}`);
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
  async resolveSummonerPuuidByRiotId(i, u) {
    const c = i.trim(), r = u.trim();
    if (!c || !r) return "";
    const m = await this.getSummonerByRiotId(c, r).catch((A) => (console.warn("[CrossRegion] 本区 alias/lookup 失败:", A), null));
    if (console.log("[CrossRegion] 本区 alias/lookup 结果:", m != null && m.puuid ? `puuid=${m.puuid}` : "无"), m != null && m.puuid) return m.puuid;
    const g = (await this.getSgpServerId().catch(() => "")).toUpperCase();
    if (console.log("[CrossRegion] 当前 SGP 服务器:", g || "(未解析到)"), !g.startsWith("TENCENT_"))
      return console.log("[CrossRegion] 未识别到国服大区，跳过跨大区搜集"), "";
    const h = this._entitlementsToken ?? await this.getEntitlementsToken().catch((A) => (console.warn("[CrossRegion] 获取 Entitlements Token 失败:", A), null));
    if (!(h != null && h.accessToken))
      return console.warn("[CrossRegion] 无可用 accessToken，无法跨大区查询"), "";
    this._entitlementsToken = h;
    const v = r.toLowerCase(), y = c.toLowerCase();
    console.log("[CrossRegion] 开始跨大区搜集 → 目标 %s#%s，大区数 %d", c, r, Hd.length);
    const b = await Promise.allSettled(
      Hd.map(
        (A) => this._getSgpSummonerByName(A, c, h.accessToken)
      )
    );
    let C = "";
    return b.forEach((A, w) => {
      const L = Hd[w];
      if (A.status !== "fulfilled") {
        console.warn("[CrossRegion] [%s] 查询异常:", L, A.reason);
        return;
      }
      if (!A.value) {
        console.log("[CrossRegion] [%s] 无返回 / 非 200", L);
        return;
      }
      const D = (A.value.tagLine ?? "").trim().toLowerCase(), H = (A.value.gameName ?? A.value.name ?? "").trim().toLowerCase();
      console.log("[CrossRegion] [%s] 命中召唤师: name=%s tag=%s puuid=%s", L, H || "(空)", D || "(空)", A.value.puuid || "(空)"), !C && A.value.puuid && (D && D === v || !D && H === y) && (C = A.value.puuid, console.log("[CrossRegion] ✓ 匹配成功 → 大区 %s，puuid=%s", L, C));
    }), C || console.log("[CrossRegion] ✗ 全大区均未匹配到 %s#%s", c, r), C;
  }
  /** 调用指定腾讯大区的 SGP `summoner-ledge` 按召唤师名查询 */
  async _getSgpSummonerByName(i, u, c) {
    const r = df[i], m = (r == null ? void 0 : r.common) ?? (r == null ? void 0 : r.matchHistory);
    if (!m) return null;
    const g = i.replace(/^TENCENT_/, ""), h = `${m}/summoner-ledge/v1/regions/${g}/summoners/name/${encodeURIComponent(u)}`, v = await fetch(h, {
      headers: {
        Authorization: `Bearer ${c}`,
        "User-Agent": "LeagueOfLegendsClient/14.13.596.7996 (rcp-be-lol-summoner)"
      }
    }), y = await v.text().catch(() => "");
    if (console.log("[CrossRegion] [%s] %s → %d %s | body: %s", i, h, v.status, v.statusText, y.slice(0, 800) || "(空)"), !v.ok || !y) return null;
    try {
      return JSON.parse(y);
    } catch (b) {
      return console.warn("[CrossRegion] [%s] JSON 解析失败:", i, b), null;
    }
  }
  /** 获取指定召唤师的客户端装备集 wrapper */
  getItemSets(i) {
    return Ce(`/lol-item-sets/v1/item-sets/${i}/sets`);
  }
  /** 覆盖写入指定召唤师的客户端装备集 wrapper */
  putItemSets(i, u) {
    return Xd(`/lol-item-sets/v1/item-sets/${i}/sets`, u);
  }
  /** 获取当前玩家的排位数据 */
  getCurrentRankedStats() {
    return Ce("/lol-ranked/v1/current-ranked-stats");
  }
  /** 通过 puuid 获取排位数据 */
  getRankedStats(i) {
    return Ce(`/lol-ranked/v1/ranked-stats/${i}`);
  }
  // ==================== 房间/大厅 ====================
  /** 获取当前房间信息 */
  getLobby() {
    return Ce("/lol-lobby/v2/lobby");
  }
  // ==================== 游戏流程 ====================
  /** 获取当前游戏流程阶段 */
  getGameflowPhase() {
    return Ce("/lol-gameflow/v1/gameflow-phase");
  }
  /** 获取游戏流程会话详情 */
  getGameflowSession() {
    return Ce("/lol-gameflow/v1/session");
  }
  // ==================== 英雄选择 ====================
  /** 获取英雄选择会话 */
  getChampSelectSession() {
    return Ce("/lol-champ-select/v1/session");
  }
  /** 获取英雄选择阶段指定格子的召唤师状态 */
  getChampSelectSummoner(i) {
    return Ce(`/lol-champ-select/v1/summoners/${i}`);
  }
  /**
   * 应用推荐的召唤师技能
   * @param selection 选择参数
   */
  updateMySelection(i) {
    return Hp("/lol-champ-select/v1/session/my-selection", i);
  }
  /**
   * 获取本局选人阶段所有玩家的详细信息
   * 包含召唤师信息、排位数据、近期战绩
   * @returns 我方和敌方玩家信息数组
   */
  async getChampSelectPlayers() {
    const i = await this.getChampSelectSession(), u = async (m) => {
      const g = m.puuid || (m.nameVisibilityType === "HIDDEN" ? X1(m.obfuscatedPuuid) : "");
      try {
        const h = g ? await this.getSummonerByPuuid(g) : await this.getSummonerById(m.summonerId), [v, y] = await Promise.all([
          this.getRankedStats(h.puuid).catch(() => null),
          this.getMatchHistory(h.puuid, 0, 19).catch(() => null)
        ]);
        return {
          summonerId: m.summonerId || h.summonerId,
          championId: m.championId,
          assignedPosition: m.assignedPosition,
          gameName: h.gameName,
          tagLine: h.tagLine,
          summonerLevel: h.summonerLevel,
          puuid: h.puuid,
          profileIconId: h.profileIconId,
          ranked: v,
          recentMatches: y
        };
      } catch {
        return {
          summonerId: m.summonerId,
          championId: m.championId,
          assignedPosition: m.assignedPosition,
          gameName: m.gameName || "Unknown",
          tagLine: m.tagLine,
          summonerLevel: 0,
          puuid: g,
          profileIconId: 0,
          ranked: null,
          recentMatches: null
        };
      }
    }, [c, r] = await Promise.all([
      Promise.all(i.myTeam.map(u)),
      Promise.all(i.theirTeam.map(u))
    ]);
    return { myTeam: c, theirTeam: r };
  }
  // ==================== 队列信息 ====================
  /** 获取所有可用队列（含中文名、游戏模式、地图等） */
  getQueues() {
    return Ce("/lol-game-queues/v1/queues");
  }
  /** 获取当前游戏模式信息 */
  getCurrentGamemode() {
    return Ce("/lol-lobby/v1/parties/gamemode");
  }
  /** 获取所有游戏模式 */
  getGameModes() {
    return Ce("/lol-game-queues/v1/game-type-config");
  }
  /** 获取所有地图信息 */
  getMaps() {
    return Ce("/lol-maps/v1/maps");
  }
  /** 获取地图资源数据（含地图皮肤/突变模式本地化名称） */
  getMapAssets() {
    return Ce("/lol-game-data/assets/v1/maps.json");
  }
  // ==================== 战绩 ====================
  /**
   * 获取战绩列表
   * @param puuid 不传则查当前玩家，传入则查指定玩家
   * @param begIndex 起始索引，默认 0
   * @param endIndex 结束索引，默认 19（共 20 条）
   */
  getMatchHistory(i, u = 0, c = 19) {
    const r = i ? `/lol-match-history/v1/products/lol/${i}/matches` : "/lol-match-history/v1/products/lol/current-summoner/matches";
    return Ce(`${r}?begIndex=${u}&endIndex=${c}`);
  }
  /**
   * 获取单局对局详情
   * @param gameId 对局 ID
   */
  getMatchDetail(i) {
    return Ce(`/lol-match-history/v1/games/${i}`);
  }
  /**
   * 获取单局时间线数据
   * @param gameId 对局 ID
   */
  getMatchTimeline(i) {
    return Ce(`/lol-match-history/v1/game-timelines/${i}`);
  }
  /** 获取最近一起玩过的召唤师 */
  getRecentlyPlayedSummoners() {
    return Ce("/lol-match-history/v1/recently-played-summoners");
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
    return Ce("/entitlements/v1/token");
  }
  /**
   * 获取 League Session Token（SGP 通用查询所需）
   *
   * 返回纯 JWT 字符串，用于 `Authorization: Bearer {token}` 请求 SGP 通用接口（召唤师/排位等）。
   */
  getLeagueSessionToken() {
    return Ce("/lol-league-session/v1/league-session-token");
  }
  /** 优先读取客户端 platformId，失败时从国服 Token issuer 解析大区。 */
  async getSgpServerId() {
    const i = await this._parseSgpServerIdFromPlatformId();
    if (i) return i;
    const u = this._parseSgpServerIdFromIssuer();
    return u || "";
  }
  /** 从 issuer URL 解析 SGP 服务器 ID */
  _parseSgpServerIdFromIssuer() {
    const i = this._entitlementsToken;
    if (!i) return "";
    const c = (i.issuer ?? "").match(/https?:\/\/([a-z0-9]+)(?:-[a-z0-9]+)*\.lol\.qq\.com/);
    if (c) {
      const r = c[1].toUpperCase();
      return Vp(`TENCENT_${r}`);
    }
    return "";
  }
  /** 从 /lol-chat/v1/me 的 platformId 解析国服 SGP 大区 */
  async _parseSgpServerIdFromPlatformId() {
    var i;
    try {
      const c = ((i = (await Ce("/lol-chat/v1/me")).platformId) == null ? void 0 : i.toUpperCase()) ?? "";
      return c ? Vp(c) : "";
    } catch {
      return "";
    }
  }
  /**
   * 通过 SGP 查询战绩列表
   *
   * 相比 LCU 接口的优势：
   * - 支持 `tag` 参数按队列模式过滤（如 `q_450` 只查大乱斗）
   * - 无浏览器缓存问题
   * - 国服跨区查询
   * - 突破 LCU 100 场上限
   *
   * @param puuid 玩家 PUUID
   * @param options 查询参数
   * @param options.startIndex 起始索引（默认 0，注意：SGP 用 startIndex 而非 LCU 的 begIndex）
   * @param options.count 获取数量（默认 100，注意：SGP 用 count 而非 LCU 的 endIndex）
   * @param options.tag 按队列模式过滤，如 `q_450`（大乱斗），不传则查全部模式。使用 `queueIdToTag()` 生成。
   */
  async getSgpMatchHistory(i, u) {
    var r;
    const c = {
      platformId: "",
      sgpServerId: "",
      matchHistoryBaseUrl: "",
      requestUrl: "",
      issuer: ((r = this._entitlementsToken) == null ? void 0 : r.issuer) ?? ""
    };
    try {
      const m = await Ce("/lol-chat/v1/me").catch(() => null);
      c.platformId = (m == null ? void 0 : m.platformId) ?? "";
      const g = this._entitlementsToken ?? await this.getEntitlementsToken();
      this._entitlementsToken || (this._entitlementsToken = g), c.issuer = g.issuer ?? c.issuer;
      const h = await this.getSgpServerId();
      c.sgpServerId = h;
      const v = df[h.toUpperCase()];
      if (c.matchHistoryBaseUrl = (v == null ? void 0 : v.matchHistory) ?? "", !(v != null && v.matchHistory))
        throw new Error(`[SGP] 找不到服务器配置: ${h}`);
      const y = new URLSearchParams();
      y.set("startIndex", String((u == null ? void 0 : u.startIndex) ?? 0)), y.set("count", String((u == null ? void 0 : u.count) ?? 100)), u != null && u.tag && y.set("tag", u.tag);
      const b = `${v.matchHistory}/match-history-query/v1/products/lol/player/${i}/SUMMARY?${y}`;
      c.requestUrl = b;
      const C = await fetch(b, {
        headers: {
          Authorization: `Bearer ${g.accessToken}`,
          "User-Agent": "LeagueOfLegendsClient/14.13.596.7996 (rcp-be-lol-match-history)"
        }
      });
      if (!C.ok) {
        const A = await C.text().catch(() => "");
        throw new Error(`[SGP] 请求失败: ${C.status} ${C.statusText} ${A.slice(0, 1e3)}`);
      }
      return C.json();
    } catch (m) {
      return console.error("[SGP] 战绩查询失败，回退到客户端原生战绩接口", {
        platformId: c.platformId || "unknown",
        sgpServerId: c.sgpServerId || "unknown",
        matchHistoryBaseUrl: c.matchHistoryBaseUrl || "unknown",
        issuer: c.issuer || "unknown",
        puuid: i,
        startIndex: (u == null ? void 0 : u.startIndex) ?? 0,
        count: (u == null ? void 0 : u.count) ?? 100,
        tag: (u == null ? void 0 : u.tag) ?? "",
        requestUrl: c.requestUrl || "not-built",
        errorName: m instanceof Error ? m.name : typeof m,
        errorMessage: m instanceof Error ? m.message : String(m),
        error: m
      }), this.getNativeMatchHistoryAsSgp(i, u);
    }
  }
  async getNativeMatchHistoryAsSgp(i, u) {
    var C;
    const c = Math.max(0, (u == null ? void 0 : u.startIndex) ?? 0), r = Math.max(1, (u == null ? void 0 : u.count) ?? 100), m = this.parseQueueIdFromSgpTag(u == null ? void 0 : u.tag), g = m ? 0 : c, h = m ? 99 : c + r - 1, y = ((C = (await this.getMatchHistory(i, g, h)).games) == null ? void 0 : C.games) ?? [];
    return {
      games: (m ? y.filter((A) => A.queueId === m).slice(c, c + r) : y).map((A) => this.mapNativeMatchGameToSgpGame(A))
    };
  }
  parseQueueIdFromSgpTag(i) {
    const u = i == null ? void 0 : i.match(/^q_(\d+)$/);
    if (!u) return null;
    const c = Number.parseInt(u[1], 10);
    return Number.isFinite(c) && c > 0 ? c : null;
  }
  mapNativeMatchGameToSgpGame(i) {
    const u = /* @__PURE__ */ new Map();
    i.participantIdentities.forEach((r) => {
      u.set(r.participantId, r);
    });
    const c = i.participants.map((r) => this.mapNativeParticipantToSgpParticipant(r, u.get(r.participantId), i.gameDuration));
    return {
      metadata: {
        product: "lol",
        tags: [`q_${i.queueId}`],
        participants: c.map((r) => r.puuid).filter(Boolean),
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
        gameModeMutators: i.gameModeMutators ?? [],
        gameName: "",
        gameStartTimestamp: i.gameCreation,
        gameType: i.gameType,
        gameVersion: i.gameVersion,
        mapId: i.mapId,
        participants: c,
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
  mapNativeParticipantToSgpParticipant(i, u, c) {
    var y, b, C, A;
    const r = i.stats, m = u == null ? void 0 : u.player, g = c || 0, h = {
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
    }, v = {
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
      challenges: v,
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
      individualPosition: ((y = i.timeline) == null ? void 0 : y.lane) || "",
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
      lane: ((b = i.timeline) == null ? void 0 : b.lane) || "",
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
      perks: h,
      physicalDamageDealt: r.physicalDamageDealt,
      physicalDamageDealtToChampions: r.physicalDamageDealtToChampions,
      physicalDamageTaken: r.physicalDamageTaken,
      placement: r.subteamPlacement,
      playerAugment1: r.playerAugment1,
      playerAugment2: r.playerAugment2,
      playerAugment3: r.playerAugment3,
      playerAugment4: r.playerAugment4,
      playerAugment5: r.playerAugment5,
      playerAugment6: r.playerAugment6,
      playerSubteamId: r.playerSubteamId,
      profileIcon: (m == null ? void 0 : m.profileIcon) ?? 0,
      puuid: (m == null ? void 0 : m.puuid) ?? "",
      quadraKills: r.quadraKills,
      riotIdGameName: (m == null ? void 0 : m.gameName) ?? (m == null ? void 0 : m.summonerName) ?? "",
      riotIdTagline: (m == null ? void 0 : m.tagLine) ?? "",
      role: ((C = i.timeline) == null ? void 0 : C.role) || "",
      roleBoundItem: r.roleBoundItem,
      sightWardsBoughtInGame: r.sightWardsBoughtInGame,
      spell1Id: i.spell1Id,
      spell2Id: i.spell2Id,
      subteamPlacement: r.subteamPlacement,
      summonerId: (m == null ? void 0 : m.summonerId) ?? 0,
      summonerLevel: 0,
      summonerName: (m == null ? void 0 : m.summonerName) ?? (m == null ? void 0 : m.gameName) ?? "",
      teamEarlySurrendered: r.teamEarlySurrendered,
      teamId: i.teamId,
      teamPosition: ((A = i.timeline) == null ? void 0 : A.lane) || "",
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
    return Ce("/lol-patch/v1/game-version");
  }
  /** 获取所有物品数据（含 iconPath / description） */
  getItems() {
    return Ce("/lol-game-data/assets/v1/items.json");
  }
  /** 获取所有召唤师技能数据（含 iconPath） */
  getSummonerSpells() {
    return Ce("/lol-game-data/assets/v1/summoner-spells.json");
  }
  /** 获取所有英雄摘要数据（含 squarePortraitPath） */
  getChampionSummary() {
    return Ce("/lol-game-data/assets/v1/champion-summary.json");
  }
  /** 获取所有符文数据（含 iconPath / description，对应单个符文 ID） */
  getPerks() {
    return Ce("/lol-game-data/assets/v1/perks.json");
  }
  /** 获取所有符文系样式（对应 perkPrimaryStyle / perkSubStyle） */
  getPerkStyles() {
    return Ce("/lol-game-data/assets/v1/perkstyles.json");
  }
  /** 获取斗魂竞技场 / 海克斯模式强化符文数据 */
  getAugments() {
    return Ce("/lol-game-data/assets/v1/cherry-augments.json");
  }
  /** 获取玩家符文页 */
  getRunePages() {
    return Ce("/lol-perks/v1/pages");
  }
  /** 创建符文页 */
  createRunePage(i) {
    return Vd("/lol-perks/v1/pages", i);
  }
  /** 更新指定符文页 */
  updateRunePage(i, u) {
    return Xd(`/lol-perks/v1/pages/${i}`, u);
  }
  /** 删除指定符文页 */
  deleteRunePage(i) {
    return Kp(`/lol-perks/v1/pages/${i}`);
  }
  /** 创建或更新 Sona 管理的符文页，并设为当前使用页 */
  async applyRunePage(i) {
    const u = {
      ...i,
      current: !0
    }, c = await this.getRunePages(), r = (y) => y.isEditable !== !1, m = (y) => /\s-\s*Sona$/i.test(y.name), g = async (y) => {
      await Promise.allSettled(
        c.filter((b) => b.id !== y && m(b) && b.isDeletable !== !1).map((b) => this.deleteRunePage(b.id))
      );
    }, h = c.find((y) => y.name === i.name && y.isEditable !== !1);
    if (h) {
      const y = await this.updateRunePage(h.id, u);
      return await g(h.id), y;
    }
    const v = c.find((y) => m(y) && r(y));
    if (v) {
      const y = await this.updateRunePage(v.id, u);
      return await g(v.id), y;
    }
    try {
      return await this.createRunePage(u);
    } catch (y) {
      const b = c.find((C) => C.current && C.isEditable !== !1) ?? c.find((C) => C.isEditable !== !1);
      if (b)
        return this.updateRunePage(b.id, u);
      throw y;
    }
  }
  // ==================== 通知 ====================
  /**
   * 发送客户端原生通知（右下角弹窗）
   * @param title 通知标题
   * @param details 通知内容
   */
  sendNotification(i, u) {
    return Vd("/player-notifications/v1/notifications", {
      detailKey: "pre_translated_details",
      titleKey: "pre_translated_title",
      backgroundUrl: "",
      data: { title: i, details: u },
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
    this.observedUris.add(i), console.log("[LCUManager] 向当前 socket 订阅 URI: %s", i), this.penguContext.socket.observe(i, (u) => {
      console.log("[LCUManager] WS 收到事件 → uri=%s, data=%o", i, u);
      const c = u, r = this.eventListeners.get(i);
      r == null || r.forEach((m) => m(c));
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
  observe(i, u) {
    var r;
    console.log("[LCUManager] observe() called → uri=%s, hasContext=%s", i, String(!!this.penguContext)), console.log("[LCUManager] eventListeners has uri? %s, listeners count: %d", this.eventListeners.has(i), ((r = this.eventListeners.get(i)) == null ? void 0 : r.size) ?? 0);
    let c = this.eventListeners.get(i);
    return c || (c = /* @__PURE__ */ new Set(), this.eventListeners.set(i, c)), c.add(u), this.observeUriOnSocket(i), () => {
      const m = this.eventListeners.get(i);
      m == null || m.delete(u), m && m.size === 0 && this.eventListeners.delete(i);
    };
  }
  /**
   * 断开所有 WebSocket 事件监听
   * 应在插件卸载时调用
   */
  disconnect() {
    this.penguContext && this.penguContext.socket.disconnect(), this.eventListeners.clear(), this.observedUris.clear();
  }
}
const _ = new ab(), nb = { source: "lol-wiki", sourceUrl: "https://wiki.leagueoflegends.com/en-us/Module:ChampionData/data", updatedAt: "2026-10-07T16:13:48.156Z", sha1: "00af491f3036d8ee03ff23258bf358ded828a28a", championCount: 175 }, lb = /* @__PURE__ */ JSON.parse('{"1":{"id":1,"alias":"Annie","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05,"shielding":0.9},"urf":{"dmg_dealt":0.9,"dmg_taken":1.1,"shielding":0.9}}},"2":{"id":2,"alias":"Olaf","stats":{"aram":{"dmg_dealt":1.05}}},"3":{"id":3,"alias":"Galio","stats":{"aram":{"dmg_dealt":0.9,"dmg_taken":1.05}}},"4":{"id":4,"alias":"TwistedFate","stats":{"urf":{"dmg_dealt":0.95}}},"5":{"id":5,"alias":"XinZhao","stats":{"aram":{"dmg_dealt":0.95},"urf":{"dmg_taken":1.1},"ofa":{"dmg_dealt":0.97,"dmg_taken":1.02,"healing":1.2},"usb":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"6":{"id":6,"alias":"Urgot","stats":{"aram":{"dmg_taken":1.05},"urf":{"dmg_dealt":1.15,"dmg_taken":0.85},"ofa":{"dmg_dealt":0.95,"dmg_taken":1.02}}},"7":{"id":7,"alias":"Leblanc","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.9,"ability_haste":20},"ofa":{"dmg_taken":0.95},"nb":{"dmg_taken":0.9,"ability_haste":20}}},"8":{"id":8,"alias":"Vladimir","stats":{"urf":{"dmg_dealt":0.92,"dmg_taken":1.05,"healing":1.2}}},"9":{"id":9,"alias":"Fiddlesticks","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05},"urf":{"dmg_dealt":1.1,"dmg_taken":0.85},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.93,"healing":1.2},"usb":{"dmg_dealt":1.05,"dmg_taken":0.95}}},"10":{"id":10,"alias":"Kayle","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.1},"urf":{"dmg_dealt":0.85,"dmg_taken":1.1},"ofa":{"dmg_dealt":0.95,"dmg_taken":1.05},"nb":{"dmg_dealt":0.9,"dmg_taken":1.05}}},"11":{"id":11,"alias":"MasterYi","stats":{"urf":{"dmg_dealt":0.9,"healing":0.8},"usb":{"dmg_taken":1.05}}},"12":{"id":12,"alias":"Alistar","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05,"healing":0.8},"urf":{"dmg_taken":0.95},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.97},"usb":{"dmg_dealt":0.95}}},"13":{"id":13,"alias":"Ryze","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95},"ofa":{"dmg_dealt":1.03}}},"14":{"id":14,"alias":"Sion","stats":{"aram":{"dmg_dealt":0.9,"dmg_taken":1.1,"ability_haste":-10},"urf":{"dmg_dealt":1.1,"dmg_taken":0.92,"shielding":1.2},"nb":{"dmg_taken":1.05}}},"15":{"id":15,"alias":"Sivir","stats":{"aram":{"dmg_dealt":0.93,"dmg_taken":1.05},"urf":{"dmg_dealt":0.85,"dmg_taken":1.05},"nb":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"16":{"id":16,"alias":"Soraka","stats":{"aram":{"ability_haste":10},"urf":{"dmg_dealt":1.05,"dmg_taken":0.92},"ofa":{"dmg_dealt":1.03,"dmg_taken":0.97,"healing":1.1}}},"17":{"id":17,"alias":"Teemo","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.1,"ability_haste":-15},"urf":{"dmg_dealt":0.9},"nb":{"dmg_dealt":0.9,"dmg_taken":1.05}}},"18":{"id":18,"alias":"Tristana","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95},"urf":{"dmg_dealt":0.9,"dmg_taken":1.05}}},"19":{"id":19,"alias":"Warwick","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95},"usb":{"dmg_dealt":0.95}}},"20":{"id":20,"alias":"Nunu","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.9,"healing":1.1,"shielding":1.2,"tenacity":1.2},"urf":{"dmg_dealt":1.08,"dmg_taken":0.95},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.92,"healing":1.05,"shielding":1.2},"nb":{"dmg_dealt":1.1,"dmg_taken":0.9,"ability_haste":20},"usb":{"dmg_dealt":1.05,"dmg_taken":0.95,"healing":1.2}}},"21":{"id":21,"alias":"MissFortune","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05},"usb":{"dmg_dealt":1.05,"dmg_taken":0.95}}},"22":{"id":22,"alias":"Ashe","stats":{"aram":{"dmg_dealt":1.05},"usb":{"dmg_taken":0.95}}},"23":{"id":23,"alias":"Tryndamere","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.9,"healing":1.2}}},"24":{"id":24,"alias":"Jax","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.97},"urf":{"dmg_dealt":0.9,"dmg_taken":1.15},"ofa":{"dmg_dealt":0.95,"dmg_taken":1.05},"usb":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"25":{"id":25,"alias":"Morgana","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.1},"urf":{"dmg_dealt":0.9,"dmg_taken":1.05},"nb":{"dmg_dealt":0.95}}},"26":{"id":26,"alias":"Zilean","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95},"urf":{"dmg_dealt":1.05,"dmg_taken":0.9},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.95}}},"27":{"id":27,"alias":"Singed","stats":{"aram":{"dmg_taken":1.08},"urf":{"dmg_dealt":0.9},"nb":{"dmg_dealt":0.95},"usb":{"dmg_taken":1.05}}},"28":{"id":28,"alias":"Evelynn","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.9,"tenacity":1.2},"urf":{"dmg_dealt":1.05,"dmg_taken":0.95},"ofa":{"dmg_dealt":1.07,"dmg_taken":0.93},"nb":{"dmg_taken":0.9,"ability_haste":20},"usb":{"dmg_dealt":1.1}}},"29":{"id":29,"alias":"Twitch","stats":{"aram":{"dmg_taken":0.95},"urf":{"dmg_dealt":0.85,"dmg_taken":1.1},"ofa":{"dmg_dealt":0.98}}},"30":{"id":30,"alias":"Karthus","stats":{"aram":{"dmg_dealt":0.93,"dmg_taken":1.05},"urf":{"dmg_dealt":0.9}}},"31":{"id":31,"alias":"Chogath","stats":{"aram":{"dmg_taken":1.1},"ofa":{"dmg_dealt":0.98,"dmg_taken":1.05}}},"32":{"id":32,"alias":"Amumu","stats":{"urf":{"dmg_dealt":1.1,"dmg_taken":0.9},"ofa":{"dmg_taken":1.05}}},"33":{"id":33,"alias":"Rammus","stats":{"urf":{"dmg_dealt":1.1,"dmg_taken":0.85},"ofa":{"dmg_dealt":1.05},"usb":{"dmg_dealt":1.05,"dmg_taken":0.95}}},"34":{"id":34,"alias":"Anivia","stats":{"aram":{"dmg_dealt":1.05},"urf":{"dmg_dealt":1.15,"dmg_taken":0.92},"usb":{"dmg_dealt":1.1,"dmg_taken":0.9}}},"35":{"id":35,"alias":"Shaco","stats":{"aram":{"dmg_dealt":1.05},"urf":{"dmg_dealt":0.9,"dmg_taken":1.1}}},"36":{"id":36,"alias":"DrMundo","stats":{"aram":{"dmg_dealt":0.9,"dmg_taken":1.05,"healing":0.9},"ofa":{"dmg_dealt":0.95,"dmg_taken":1.05,"healing":0.9}}},"37":{"id":37,"alias":"Sona","stats":{"urf":{"dmg_dealt":0.9,"healing":0.7},"nb":{"dmg_dealt":0.95,"healing":0.9,"shielding":0.9}}},"38":{"id":38,"alias":"Kassadin","stats":{"aram":{"dmg_taken":0.95}}},"39":{"id":39,"alias":"Irelia","stats":{"aram":{"dmg_dealt":1.05,"ability_haste":20},"ofa":{"dmg_dealt":0.97}}},"40":{"id":40,"alias":"Janna","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05,"healing":0.9},"ofa":{"dmg_dealt":1.03}}},"41":{"id":41,"alias":"Gangplank","stats":{"aram":{"dmg_dealt":1.05},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.9}}},"42":{"id":42,"alias":"Corki","stats":{"aram":{"dmg_taken":0.9,"ability_haste":-20},"nb":{"dmg_dealt":1.05}}},"43":{"id":43,"alias":"Karma","stats":{}},"44":{"id":44,"alias":"Taric","stats":{"aram":{"dmg_taken":1.1},"urf":{"healing":0.85},"ofa":{"dmg_taken":0.92}}},"45":{"id":45,"alias":"Veigar","stats":{"aram":{"dmg_dealt":0.93,"dmg_taken":1.1},"urf":{"dmg_dealt":0.9}}},"48":{"id":48,"alias":"Trundle","stats":{"aram":{"dmg_taken":1.05},"urf":{"dmg_dealt":0.95,"dmg_taken":0.95,"healing":0.8},"ofa":{"dmg_dealt":0.95,"dmg_taken":1.07},"usb":{"dmg_taken":1.05}}},"50":{"id":50,"alias":"Swain","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.15,"healing":0.8},"nb":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"51":{"id":51,"alias":"Caitlyn","stats":{}},"53":{"id":53,"alias":"Blitzcrank","stats":{"ofa":{"dmg_dealt":1.06,"dmg_taken":0.97},"nb":{"dmg_dealt":1.05},"usb":{"dmg_dealt":1.05,"dmg_taken":0.95}}},"54":{"id":54,"alias":"Malphite","stats":{"urf":{"dmg_dealt":0.95},"ofa":{"dmg_dealt":0.95}}},"55":{"id":55,"alias":"Katarina","stats":{"aram":{"ability_haste":10,"tenacity":1.2},"urf":{"dmg_dealt":1.1,"dmg_taken":0.95},"ofa":{"dmg_taken":0.95}}},"56":{"id":56,"alias":"Nocturne","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.9,"healing":1.2},"urf":{"dmg_dealt":0.95},"ofa":{"dmg_dealt":0.95}}},"57":{"id":57,"alias":"Maokai","stats":{"aram":{"dmg_dealt":0.85,"dmg_taken":1.1},"urf":{"dmg_taken":1.05,"healing":0.7},"ofa":{"dmg_taken":1.05},"nb":{"dmg_dealt":0.95,"dmg_taken":1.05,"healing":0.95,"shielding":0.95}}},"58":{"id":58,"alias":"Renekton","stats":{"aram":{"healing":1.1},"urf":{"dmg_dealt":0.95,"dmg_taken":0.95}}},"59":{"id":59,"alias":"JarvanIV","stats":{"ofa":{"dmg_dealt":0.95},"usb":{"dmg_dealt":0.95}}},"60":{"id":60,"alias":"Elise","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.9,"tenacity":1.1},"urf":{"dmg_taken":0.95},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.92},"usb":{"dmg_dealt":1.05,"dmg_taken":0.95}}},"61":{"id":61,"alias":"Orianna","stats":{"urf":{"dmg_dealt":0.9,"dmg_taken":1.1,"shielding":0.8}}},"62":{"id":62,"alias":"MonkeyKing","stats":{"urf":{"dmg_dealt":0.9,"dmg_taken":1.1},"ofa":{"dmg_dealt":0.95,"dmg_taken":1.05},"usb":{"dmg_dealt":0.95}}},"63":{"id":63,"alias":"Brand","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.1,"ability_haste":-10},"ofa":{"dmg_taken":1.03},"nb":{"dmg_dealt":0.9,"dmg_taken":1.08},"usb":{"dmg_dealt":0.95}}},"64":{"id":64,"alias":"LeeSin","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95,"healing":1.1,"shielding":1.2},"urf":{"dmg_dealt":1.05},"ofa":{"dmg_taken":0.95}}},"67":{"id":67,"alias":"Vayne","stats":{"aram":{"dmg_taken":0.95},"urf":{"dmg_dealt":0.95,"dmg_taken":1.05},"ofa":{"dmg_dealt":0.97}}},"68":{"id":68,"alias":"Rumble","stats":{}},"69":{"id":69,"alias":"Cassiopeia","stats":{"urf":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"72":{"id":72,"alias":"Skarner","stats":{"urf":{"dmg_dealt":1.1,"shielding":0.9},"ofa":{"dmg_taken":0.97}}},"74":{"id":74,"alias":"Heimerdinger","stats":{"aram":{"dmg_dealt":0.9,"dmg_taken":1.1},"ofa":{"dmg_dealt":0.97}}},"75":{"id":75,"alias":"Nasus","stats":{"aram":{"dmg_dealt":0.9,"dmg_taken":1.05},"nb":{"dmg_dealt":0.95},"usb":{"dmg_taken":0.95}}},"76":{"id":76,"alias":"Nidalee","stats":{"aram":{"dmg_dealt":1.1},"urf":{"dmg_dealt":1.1,"dmg_taken":0.95},"ofa":{"dmg_dealt":1.07,"dmg_taken":0.95},"nb":{"dmg_dealt":1.05,"dmg_taken":0.9,"healing":1.1,"shielding":1.1},"usb":{"dmg_dealt":1.05,"dmg_taken":0.95,"healing":1.2}}},"77":{"id":77,"alias":"Udyr","stats":{"urf":{"dmg_dealt":1.1,"dmg_taken":0.92}}},"78":{"id":78,"alias":"Poppy","stats":{}},"79":{"id":79,"alias":"Gragas","stats":{"aram":{"dmg_taken":0.95}}},"80":{"id":80,"alias":"Pantheon","stats":{"ofa":{"dmg_dealt":0.98,"dmg_taken":1.02}}},"81":{"id":81,"alias":"Ezreal","stats":{"urf":{"dmg_dealt":0.95}}},"82":{"id":82,"alias":"Mordekaiser","stats":{"urf":{"dmg_taken":0.85},"ofa":{"dmg_dealt":0.95,"dmg_taken":1.05},"usb":{"dmg_taken":1.05}}},"83":{"id":83,"alias":"Yorick","stats":{"ofa":{"dmg_dealt":0.9,"dmg_taken":1.05}}},"84":{"id":84,"alias":"Akali","stats":{"aram":{"dmg_taken":0.95,"tenacity":1.2},"urf":{"dmg_taken":0.9},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.97},"nb":{"dmg_taken":0.9,"ability_haste":20}}},"85":{"id":85,"alias":"Kennen","stats":{"urf":{"dmg_taken":0.95},"ofa":{"dmg_dealt":0.98,"dmg_taken":1.02}}},"86":{"id":86,"alias":"Garen","stats":{"aram":{"dmg_taken":0.95},"urf":{"dmg_dealt":1.1,"dmg_taken":0.95},"ofa":{"dmg_dealt":0.95}}},"89":{"id":89,"alias":"Leona","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"90":{"id":90,"alias":"Malzahar","stats":{"aram":{"dmg_dealt":0.9,"dmg_taken":1.1},"urf":{"dmg_dealt":0.92,"dmg_taken":1.08}}},"91":{"id":91,"alias":"Talon","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95,"tenacity":1.2}}},"92":{"id":92,"alias":"Riven","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.92},"urf":{"dmg_taken":0.95},"nb":{"dmg_dealt":1.05}}},"96":{"id":96,"alias":"KogMaw","stats":{"aram":{"dmg_dealt":0.92,"dmg_taken":1.1},"urf":{"dmg_dealt":0.85,"dmg_taken":1.05},"ofa":{"dmg_dealt":0.97,"dmg_taken":1.03},"nb":{"dmg_dealt":0.9,"dmg_taken":1.05}}},"98":{"id":98,"alias":"Shen","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05},"urf":{"dmg_taken":1.05},"ofa":{"dmg_dealt":0.95}}},"99":{"id":99,"alias":"Lux","stats":{"aram":{"dmg_dealt":0.9,"dmg_taken":1.1,"shielding":0.9},"urf":{"dmg_dealt":0.95}}},"101":{"id":101,"alias":"Xerath","stats":{"aram":{"dmg_dealt":0.93,"dmg_taken":1.05},"ofa":{"dmg_dealt":1.03}}},"102":{"id":102,"alias":"Shyvana","stats":{"aram":{"dmg_taken":0.95},"urf":{"dmg_dealt":0.85},"ofa":{"dmg_taken":1.02}}},"103":{"id":103,"alias":"Ahri","stats":{"aram":{"healing":0.9},"urf":{"dmg_dealt":0.9,"dmg_taken":1.05},"usb":{"dmg_taken":0.95}}},"104":{"id":104,"alias":"Graves","stats":{"ofa":{"dmg_dealt":0.98,"dmg_taken":1.05},"usb":{"dmg_dealt":0.95}}},"105":{"id":105,"alias":"Fizz","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95,"tenacity":1.1},"urf":{"dmg_dealt":0.9,"dmg_taken":1.1}}},"106":{"id":106,"alias":"Volibear","stats":{"urf":{"dmg_dealt":0.95,"dmg_taken":1.1,"healing":0.8},"ofa":{"dmg_dealt":0.9,"dmg_taken":1.1,"shielding":0.8}}},"107":{"id":107,"alias":"Rengar","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.92,"tenacity":1.2},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.95}}},"110":{"id":110,"alias":"Varus","stats":{}},"111":{"id":111,"alias":"Nautilus","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.1}}},"112":{"id":112,"alias":"Viktor","stats":{"urf":{"dmg_dealt":0.95}}},"113":{"id":113,"alias":"Sejuani","stats":{}},"114":{"id":114,"alias":"Fiora","stats":{"aram":{"dmg_taken":0.95},"urf":{"dmg_dealt":0.9,"dmg_taken":1.1,"healing":0.65},"usb":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"115":{"id":115,"alias":"Ziggs","stats":{"aram":{"dmg_dealt":0.92,"dmg_taken":1.2,"ability_haste":-20},"ofa":{"dmg_taken":0.95},"nb":{"dmg_dealt":0.95,"ability_haste":-10}}},"117":{"id":117,"alias":"Lulu","stats":{}},"119":{"id":119,"alias":"Draven","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95},"urf":{"dmg_dealt":0.95,"dmg_taken":1.05},"ofa":{"dmg_taken":0.95}}},"120":{"id":120,"alias":"Hecarim","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.9,"healing":1.2,"ability_haste":10},"nb":{"dmg_taken":0.95}}},"121":{"id":121,"alias":"Khazix","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.9,"healing":1.2,"tenacity":1.2}}},"122":{"id":122,"alias":"Darius","stats":{"aram":{"dmg_dealt":1.05},"urf":{"dmg_dealt":1.05,"dmg_taken":0.85},"ofa":{"dmg_dealt":0.9,"dmg_taken":1.05}}},"126":{"id":126,"alias":"Jayce","stats":{"aram":{"dmg_dealt":1.05},"urf":{"dmg_dealt":0.92,"dmg_taken":1.05}}},"127":{"id":127,"alias":"Lissandra","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"131":{"id":131,"alias":"Diana","stats":{"ofa":{"dmg_dealt":0.95}}},"133":{"id":133,"alias":"Quinn","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.9,"tenacity":1.2},"urf":{"dmg_taken":0.95}}},"134":{"id":134,"alias":"Syndra","stats":{"aram":{"dmg_dealt":1.05,"ability_haste":5},"urf":{"dmg_dealt":0.9,"dmg_taken":1.1}}},"136":{"id":136,"alias":"AurelionSol","stats":{"urf":{"dmg_dealt":1.1,"dmg_taken":0.9},"ofa":{"dmg_dealt":1.02,"dmg_taken":0.92,"ability_haste":-20},"usb":{"dmg_dealt":1.05}}},"141":{"id":141,"alias":"Kayn","stats":{"aram":{"healing":0.8,"tenacity":1.2}}},"142":{"id":142,"alias":"Zoe","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.95},"ofa":{"dmg_dealt":1.1,"dmg_taken":0.9}}},"143":{"id":143,"alias":"Zyra","stats":{"aram":{"dmg_dealt":0.9,"dmg_taken":1.05,"ability_haste":-10},"nb":{"dmg_dealt":0.95,"dmg_taken":1.08}}},"145":{"id":145,"alias":"Kaisa","stats":{"aram":{"dmg_taken":0.9},"urf":{"dmg_dealt":0.9,"dmg_taken":1.1},"ofa":{"dmg_dealt":1.03}}},"147":{"id":147,"alias":"Seraphine","stats":{"aram":{"dmg_taken":1.2,"healing":0.8,"shielding":0.8,"ability_haste":-20},"urf":{"dmg_dealt":0.92,"healing":0.8},"nb":{"dmg_dealt":0.95,"healing":0.9,"shielding":0.9}}},"150":{"id":150,"alias":"Gnar","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95},"urf":{"dmg_dealt":1.1,"dmg_taken":0.9}}},"154":{"id":154,"alias":"Zac","stats":{"aram":{"dmg_taken":0.96,"healing":1.1}}},"157":{"id":157,"alias":"Yasuo","stats":{"urf":{"dmg_taken":0.9}}},"161":{"id":161,"alias":"Velkoz","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05},"urf":{"dmg_dealt":0.95}}},"163":{"id":163,"alias":"Taliyah","stats":{"ofa":{"dmg_dealt":1.05,"dmg_taken":0.9},"nb":{"dmg_dealt":0.95,"ability_haste":-10}}},"164":{"id":164,"alias":"Camille","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95,"healing":1.2,"shielding":1.1,"ability_haste":10},"nb":{"dmg_taken":0.95}}},"166":{"id":166,"alias":"Akshan","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95},"urf":{"dmg_dealt":1.05}}},"200":{"id":200,"alias":"Belveth","stats":{"usb":{"dmg_dealt":0.9}}},"201":{"id":201,"alias":"Braum","stats":{"urf":{"dmg_dealt":1.05,"dmg_taken":0.82},"ofa":{"dmg_dealt":1.1,"dmg_taken":0.9}}},"202":{"id":202,"alias":"Jhin","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05},"urf":{"dmg_dealt":1.01}}},"203":{"id":203,"alias":"Kindred","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.9},"ofa":{"dmg_taken":0.95},"usb":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"221":{"id":221,"alias":"Zeri","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.95}}},"222":{"id":222,"alias":"Jinx","stats":{"aram":{"dmg_dealt":0.9,"dmg_taken":1.05},"nb":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"223":{"id":223,"alias":"TahmKench","stats":{"aram":{"dmg_taken":1.05},"urf":{"dmg_dealt":1.2,"dmg_taken":0.85}}},"233":{"id":233,"alias":"Briar","stats":{"aram":{"dmg_dealt":1.05,"healing":1.1}}},"234":{"id":234,"alias":"Viego","stats":{"aram":{"dmg_dealt":1.05},"urf":{"dmg_dealt":1.05,"dmg_taken":0.9},"usb":{"dmg_dealt":0.95,"healing":0.8}}},"235":{"id":235,"alias":"Senna","stats":{"aram":{"dmg_dealt":0.92,"dmg_taken":1.05},"urf":{"dmg_dealt":1.1},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.9},"usb":{"dmg_dealt":1.1,"healing":1.2}}},"236":{"id":236,"alias":"Lucian","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95,"ability_haste":10,"tenacity":1.2},"urf":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"238":{"id":238,"alias":"Zed","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95,"tenacity":1.2},"urf":{"dmg_dealt":0.85,"dmg_taken":1.1}}},"240":{"id":240,"alias":"Kled","stats":{"aram":{"dmg_dealt":1.05},"urf":{"dmg_taken":0.9}}},"245":{"id":245,"alias":"Ekko","stats":{"aram":{"dmg_dealt":1.1,"tenacity":1.2},"ofa":{"dmg_dealt":0.95}}},"246":{"id":246,"alias":"Qiyana","stats":{"aram":{"dmg_dealt":1.15,"dmg_taken":0.9,"ability_haste":20,"tenacity":1.2},"urf":{"dmg_taken":0.9},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.92}}},"254":{"id":254,"alias":"Vi","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.95},"urf":{"dmg_dealt":0.95,"dmg_taken":1.05},"ofa":{"dmg_dealt":0.95,"dmg_taken":1.05},"usb":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"266":{"id":266,"alias":"Aatrox","stats":{"aram":{"dmg_dealt":1.05},"urf":{"dmg_dealt":1.15,"dmg_taken":0.7}}},"267":{"id":267,"alias":"Nami","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.93,"healing":1.2}}},"268":{"id":268,"alias":"Azir","stats":{"aram":{"dmg_taken":0.95,"ability_haste":20},"ofa":{"dmg_dealt":1.08,"dmg_taken":0.9}}},"350":{"id":350,"alias":"Yuumi","stats":{"urf":{"dmg_dealt":0.75,"dmg_taken":0.9,"healing":0.7},"ofa":{"dmg_dealt":1.15,"dmg_taken":0.8,"healing":1.2,"shielding":1.2},"usb":{"dmg_dealt":0.95,"healing":0.75,"shielding":0.75}}},"360":{"id":360,"alias":"Samira","stats":{"urf":{"dmg_dealt":0.95},"usb":{"dmg_dealt":0.9,"shielding":0.99}}},"412":{"id":412,"alias":"Thresh","stats":{"aram":{"dmg_taken":1.05},"urf":{"dmg_taken":0.87,"shielding":1.2},"nb":{"ability_haste":20}}},"420":{"id":420,"alias":"Illaoi","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05,"healing":0.8},"urf":{"dmg_taken":0.9},"ofa":{"dmg_dealt":0.92,"dmg_taken":1.05}}},"421":{"id":421,"alias":"RekSai","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.9},"urf":{"dmg_dealt":1.07,"dmg_taken":0.93,"healing":1.2},"ofa":{"dmg_dealt":1.05,"dmg_taken":0.93,"healing":1.2},"nb":{"dmg_dealt":1.05,"dmg_taken":0.9}}},"427":{"id":427,"alias":"Ivern","stats":{"aram":{"dmg_dealt":0.95,"shielding":0.9},"ofa":{"dmg_dealt":1.1,"dmg_taken":0.93,"shielding":1.2},"usb":{"dmg_taken":0.95}}},"429":{"id":429,"alias":"Kalista","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.9},"urf":{"dmg_dealt":1.1,"dmg_taken":0.9}}},"432":{"id":432,"alias":"Bard","stats":{"aram":{"dmg_dealt":1.15,"dmg_taken":0.85,"healing":1.2},"urf":{"dmg_dealt":1.15,"dmg_taken":0.85,"healing":1.2},"ofa":{"dmg_dealt":1.15,"dmg_taken":0.85,"healing":1.2},"nb":{"dmg_taken":0.9,"ability_haste":20},"usb":{"dmg_dealt":1.08,"dmg_taken":0.92}}},"497":{"id":497,"alias":"Rakan","stats":{"aram":{"dmg_taken":0.95,"ability_haste":10}}},"498":{"id":498,"alias":"Xayah","stats":{"aram":{"dmg_dealt":1.05},"urf":{"dmg_dealt":0.85,"dmg_taken":1.1},"usb":{"dmg_taken":0.95}}},"516":{"id":516,"alias":"Ornn","stats":{"aram":{"dmg_dealt":0.9,"dmg_taken":1.05},"urf":{"dmg_dealt":1.05,"dmg_taken":0.95}}},"517":{"id":517,"alias":"Sylas","stats":{"aram":{"dmg_dealt":1.05},"urf":{"dmg_dealt":0.95}}},"518":{"id":518,"alias":"Neeko","stats":{"ofa":{"dmg_dealt":0.98},"usb":{"dmg_taken":0.95}}},"523":{"id":523,"alias":"Aphelios","stats":{"urf":{"dmg_dealt":1.05},"ofa":{"dmg_dealt":1.08},"usb":{"dmg_dealt":0.95}}},"526":{"id":526,"alias":"Rell","stats":{"aram":{"dmg_dealt":0.95,"shielding":0.9},"ofa":{"dmg_dealt":1.05},"usb":{"dmg_dealt":0.9,"dmg_taken":1.05}}},"555":{"id":555,"alias":"Pyke","stats":{"aram":{"dmg_dealt":1.1,"dmg_taken":0.9,"tenacity":1.2},"urf":{"dmg_taken":0.95},"ofa":{"dmg_taken":0.95},"nb":{"dmg_dealt":1.05}}},"711":{"id":711,"alias":"Vex","stats":{"aram":{"dmg_dealt":0.95},"urf":{"dmg_dealt":0.9}}},"777":{"id":777,"alias":"Yone","stats":{"aram":{"dmg_dealt":1.05,"dmg_taken":0.97},"urf":{"dmg_dealt":1.1,"dmg_taken":0.9,"shielding":1.2},"ofa":{"dmg_dealt":0.98}}},"799":{"id":799,"alias":"Ambessa","stats":{"aram":{"dmg_taken":1.05}}},"800":{"id":800,"alias":"Mel","stats":{"aram":{"ability_haste":-10},"urf":{"dmg_dealt":0.9}}},"804":{"id":804,"alias":"Yunara","stats":{}},"805":{"id":805,"alias":"Locke","stats":{"aram":{"dmg_dealt":1.15}}},"875":{"id":875,"alias":"Sett","stats":{"aram":{"dmg_taken":1.1},"urf":{"dmg_dealt":1.05,"dmg_taken":0.92},"ofa":{"dmg_dealt":0.95,"dmg_taken":1.05},"nb":{"dmg_dealt":0.95},"usb":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"876":{"id":876,"alias":"Lillia","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05},"ofa":{"dmg_dealt":0.98},"usb":{"dmg_dealt":0.95}}},"887":{"id":887,"alias":"Gwen","stats":{"aram":{"dmg_dealt":1.02},"usb":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"888":{"id":888,"alias":"Renata","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05},"ofa":{"dmg_dealt":1.1,"dmg_taken":0.95,"shielding":1.2}}},"893":{"id":893,"alias":"Aurora","stats":{"aram":{"ability_haste":10}}},"895":{"id":895,"alias":"Nilah","stats":{}},"897":{"id":897,"alias":"KSante","stats":{"aram":{"dmg_dealt":1.05},"urf":{"dmg_dealt":1.05}}},"901":{"id":901,"alias":"Smolder","stats":{"aram":{"dmg_taken":1.02,"ability_haste":-10}}},"902":{"id":902,"alias":"Milio","stats":{"aram":{"healing":0.95,"shielding":0.9,"ability_haste":-10}}},"904":{"id":904,"alias":"Zaahen","stats":{"aram":{"dmg_dealt":0.95,"dmg_taken":1.05}}},"910":{"id":910,"alias":"Hwei","stats":{"aram":{"dmg_dealt":0.95}}},"950":{"id":950,"alias":"Naafiri","stats":{"aram":{"dmg_dealt":1.1,"ability_haste":10}}},"150.2":{"id":150.2,"alias":"GnarBig","stats":{}},"240.1":{"id":240.1,"alias":"Kled","stats":{}}}'), Xp = {
  _meta: nb,
  champions: lb
};
function fs(n) {
  return n.toLowerCase();
}
function ib(n) {
  return typeof n != "string" ? "" : n.replace(/<br\s*\/?>/gi, `
`).replace(/<\/(li|p|div)>/gi, `
`).replace(/<li>/gi, "• ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\n{3,}/g, `

`).trim();
}
function Qd(n, i) {
  for (const u of i) {
    const c = ib(n[u]);
    if (c) return c;
  }
  return "";
}
const xc = /* @__PURE__ */ new Map(), Q1 = /* @__PURE__ */ new Map(), Z1 = /* @__PURE__ */ new Map(), am = /* @__PURE__ */ new Map(), Ms = /* @__PURE__ */ new Map(), nm = /* @__PURE__ */ new Map(), J1 = /* @__PURE__ */ new Map(), Kc = /* @__PURE__ */ new Map(), lm = /* @__PURE__ */ new Map(), Y1 = /* @__PURE__ */ new Map(), ff = /* @__PURE__ */ new Map(), P1 = /* @__PURE__ */ new Map(), mf = /* @__PURE__ */ new Map(), _l = /* @__PURE__ */ new Map(), gf = /* @__PURE__ */ new Map(), xs = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Map();
let F1 = !1, Qp = "";
async function sb() {
  if (!F1) {
    try {
      Qp = (await _.getSummonerInfo()).puuid || "", R.info("[Assets] 当前账号 puuid=%s", Qp);
    } catch (n) {
      R.warn("[Assets] 获取 puuid 失败:", n);
    }
    ub(), await W1(0);
  }
}
function ub() {
  var n;
  try {
    const i = Xp.champions;
    for (const [u, c] of Object.entries(i))
      hf.set(Number(u), c);
    R.info(
      "[Assets] 英雄平衡数据加载完成 → %d 个英雄 (数据更新于 %s)",
      hf.size,
      ((n = Xp._meta) == null ? void 0 : n.updatedAt) ?? "未知"
    );
  } catch (i) {
    R.error("[Assets] 英雄平衡数据加载失败:", i);
  }
}
async function W1(n) {
  const [c, r, m, g, h, v, y, b] = await Promise.all([
    _.getItems().catch((A) => (R.warn("[Assets] getItems 失败:", A), [])),
    _.getSummonerSpells().catch((A) => (R.warn("[Assets] getSummonerSpells 失败:", A), [])),
    _.getQueues().catch((A) => (R.warn("[Assets] getQueues 失败:", A), [])),
    _.getMapAssets().catch((A) => (R.warn("[Assets] getMapAssets 失败:", A), [])),
    _.getPerks().catch((A) => (R.warn("[Assets] getPerks 失败:", A), [])),
    _.getPerkStyles().catch((A) => (R.warn("[Assets] getPerkStyles 失败:", A), { styles: [] })),
    _.getChampionSummary().catch((A) => (R.warn("[Assets] getChampionSummary 失败:", A), [])),
    _.getAugments().catch((A) => (R.warn("[Assets] getAugments 失败:", A), []))
  ]);
  for (const A of c)
    if (A.id > 0 && A.iconPath && xc.set(A.id, fs(A.iconPath)), A.id > 0 && A.name && Q1.set(A.id, A.name), A.id > 0) {
      const w = Qd(A, [
        "description",
        "shortDescription",
        "longDescription",
        "tooltip",
        "tooltipText"
      ]);
      w && Z1.set(A.id, w);
      const L = A.priceTotal ?? A.price ?? 0;
      Number.isFinite(L) && L > 0 && am.set(A.id, L);
    }
  for (const A of r)
    if (A.id > 0 && A.iconPath && Ms.set(A.id, fs(A.iconPath)), A.id > 0 && A.name && nm.set(A.id, A.name), A.id > 0) {
      const w = Qd(A, [
        "description",
        "shortDescription",
        "longDescription",
        "tooltip",
        "tooltipText"
      ]);
      w && J1.set(A.id, w);
    }
  for (const A of m)
    _l.set(A.id, A);
  for (const A of g)
    A.id != null && gf.set(A.id, A);
  for (const A of h)
    if (A.id > 0 && A.iconPath && Kc.set(A.id, fs(A.iconPath)), A.id > 0 && A.name && lm.set(A.id, A.name), A.id > 0) {
      const w = Qd(A, [
        "shortDesc",
        "longDesc",
        "description",
        "tooltip",
        "tooltipText"
      ]);
      w && Y1.set(A.id, w);
    }
  for (const A of v.styles)
    A.id > 0 && A.iconPath && ff.set(A.id, fs(A.iconPath)), A.id > 0 && A.name && P1.set(A.id, A.name);
  for (const A of y)
    A.id > 0 && xs.set(A.id, {
      id: A.id,
      name: A.description || "",
      title: A.name || "",
      alias: A.alias
    });
  for (const A of b)
    A.id > 0 && mf.set(A.id, {
      name: A.nameTRA || String(A.id),
      iconPath: A.augmentSmallIconPath ? fs(A.augmentSmallIconPath) : "",
      rarity: A.rarity || "",
      // cherry-augments.json 目前只暴露名称、图标和稀有度，没有效果描述字段。
      description: ""
    });
  R.info(
    "[Assets] 资源映射初始化 (attempt %d) → 装备 %d, 技能 %d, 符文 %d, 符文系 %d, 强化符文 %d, 队列 %d, 地图 %d, 英雄 %d",
    n + 1,
    xc.size,
    Ms.size,
    Kc.size,
    ff.size,
    mf.size,
    _l.size,
    gf.size,
    xs.size
  );
  const C = [
    xc.size === 0 && "items",
    Ms.size === 0 && "spells",
    _l.size === 0 && "queues",
    xs.size === 0 && "champions"
  ].filter(Boolean);
  if (C.length > 0 && n < 3) {
    R.warn("[Assets] 关键资源缺失: %s，%d 秒后重试 (%d/%d)", C.join(","), 2e3 / 1e3, n + 1, 3), setTimeout(() => W1(n + 1), 2e3);
    return;
  }
  F1 = !0, C.length > 0 ? R.error("[Assets] 重试 %d 次后仍有资源缺失: %s", 3, C.join(",")) : R.info("[Assets] 资源映射初始化完成 ✓");
}
function Hc(n) {
  return `/lol-game-data/assets/v1/champion-icons/${n}.png`;
}
function im(n) {
  return xc.get(n) ?? (n > 0 ? `/lol-game-data/assets/v1/item-icons/${n}.png` : "");
}
function cb(n) {
  return am.get(n) ?? 0;
}
function _1(n) {
  return {
    name: Q1.get(n) ?? String(n),
    iconPath: im(n),
    description: Z1.get(n) ?? "",
    price: am.get(n) ?? 0
  };
}
function js(n) {
  return Ms.get(n) ?? "";
}
function ob(n) {
  return nm.get(n) ?? String(n);
}
function rb(n) {
  return {
    name: nm.get(n) ?? String(n),
    iconPath: Ms.get(n) ?? "",
    description: J1.get(n) ?? ""
  };
}
function $l(n) {
  return Kc.get(n) ?? "";
}
function Zd(n) {
  return lm.get(n) ?? String(n);
}
function Jd(n) {
  return {
    name: lm.get(n) ?? String(n),
    iconPath: Kc.get(n) ?? "",
    description: Y1.get(n) ?? ""
  };
}
function Vc(n) {
  return ff.get(n) ?? "";
}
function db(n) {
  return P1.get(n) ?? String(n);
}
function $1(n) {
  return mf.get(n);
}
function di(n) {
  var i;
  return ((i = _l.get(n)) == null ? void 0 : i.name) ?? `队列${n}`;
}
function sm(n) {
  return _l.get(n);
}
function ey(n) {
  var i;
  return ((i = gf.get(n)) == null ? void 0 : i.name) ?? `地图${n}`;
}
function ty() {
  return Array.from(xs.values()).filter((n) => n.id > 0);
}
function um(n) {
  return xs.get(n);
}
function fb(n) {
  return hf.get(n);
}
function mb() {
  const n = /* @__PURE__ */ new Set([
    "TUTORIAL",
    "TUTORIAL_MODULE_1",
    "TUTORIAL_MODULE_2",
    "TUTORIAL_MODULE_3",
    "PRACTICETOOL",
    "SWIFTPLAY",
    "TFT"
  ]), i = /* @__PURE__ */ new Set([
    "CHERRY_UNRANKED"
  ]), u = [];
  return _l.forEach((c) => {
    c.id <= 0 || c.isCustom || !c.isEnabled || c.queueAvailability !== "Available" || n.has(c.gameMode) || i.has(c.type) || u.push({ id: c.id, name: c.name || c.shortName || `队列${c.id}` });
  }), u.sort((c, r) => c.name.localeCompare(r.name, "zh")), u;
}
const gb = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAC6UlEQVR42u3YXUhTcRjH8a4fCILeMHpDGExXlrmbQlNbaJT5VqZk+LaZpUmgkY2i4Y0QaUG2iAJ7pZVXQSAIQRYJvpVUYBEldaGBEVkIXUQ8/fDh8RyHYxfbmRc6+ICeM/x/OefxnLMtWXwtuBetsNuhBAohfr5jGmEQPsIH6If6+Yrxwitgk38wAI2xjvHB8EzIvnKmrMNGmIR6YxVzAd4AT8tzM/kfib1l5qjX4ItFzFvgaQdqmK51KonKrTJHDYPPqpi0WTHFdUaIu4np2Dnj98KjwVFOK4Lq4SswlZwwFi9vZFqZwLQqkclzRrfL0ZOgUfBEMyQLuuE9jANTSjbT5XtMpSclRhaWnytOMbXdYdq6W7ePwwh0gSvyIImZBJ6xIUWOUnapbjPsr2QqOs60Ljl430/oijTGAYPA5EiXU9Lsnz3EORXGogXV5n3y3qrTTAlp+p4BsEcStBSeA9NqB1PteVksWL5Hjspc+2rOynxJUA9QpEfpJoyD/GF3ky4WXlmDecbG4Hq0bp73YUwHF8McPqa4TkM0pgNs0fpPs8Ez+B3yomienTy3OWYSujUmWkHJMARMW1zGkGKgEWDEXH3ItOeI7NuUwZS40zzMjmgGxUMfMNm2M128ZSzmKpaQ9gBTxkHZtjmTqfU200anBvXC2mgGEfTMDPaVBxLlSJcF0wqYduRqjFwYL93VmL/w1IpbRwCmgMnXLqcIUTg1xrwk7WLEyD5vm27/BR1W3eknwHw9klODKMyWHBXdXu3VoG/gsyKoFr4A06FaXVijNMZQUK1Bn6HSiqAcGAGmzCJdOLTUfA16By4rgpJgSAc3bJA9VYP6wWZF0DJ4AUxrkvT6M7f2QPD9a6lVT41P4A8wtdwIHdTs15gp6LTymdoPP4CpoSV0UH2zBn2HViuDPDCqD2m4as9t/TYN+gSlVgYth8d6PQpjAgJAVn8UckIAeqEvhJcQAGcsP73GQXwIcYtfwyyY1390/qDYpdusgQAAAABJRU5ErkJggg==", hb = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAC40lEQVR42u3YTUgUYRjA8c6rRpS6X9phwVj3w1Vb6xQRQhEIkURJkmEsRZGHEjIjWjp0CLwWQSAFwUaHsgxJUbNI8KukAosoqYMGRmQhdIh4/LO8rzMDLntwZj3owg/WmZH97/jMO7tuWH+suYerMBhEA+oRWO2YVozjEz5iFC2rFdOO1xCT/xhDa65jkpjUIYc9FXIARhihBOcq5jreQiCN3pgMbN2Zdsga9QbJXMS8g0CaiRkkRBvAUU/MHDWJpFMxu8wxp7yVSyFtviq54qte+vm41xqFuBNBLfgGOW2KOU9MHtvy0c5zvb3ZiJpGws6QvejFB8xCaooj8rR0h5wljBhxKXloJeoJ+yqLw3r7LKbQg1o7gnoxD9G8ReXps3RQDbFZAzOU4Oy4Oca8Hb/Qs9KYMMYhId7xRd793ZIayxAfMUU1EWLed4djL/A7weKQPmYMwZUEFeAFZCOu+vXgWh0jJGHMlcVlhj1fBWMIrpWepdt6dvLRZgxuVufUwLuAGdyy6+Z5DzN6cFuMs5ERywIRlphOlNl1pZXhOf5AICeMebEYQKN1HZpHr46xK6gKE5AYw62HlIEmwIjpR70a8gjHlcM0zGE7gwIYgQSKQvKQdSaoXqzOE02H9GGfO5reFmXfY47xG5f+MErsDHJhSA/2M178ES8YUlG1hOx2Rywx3VAx/9DvxK0jhQVIZ0lcBlVUWEVBKnjOKp3ed5Nj1Pbf6HTqTj8Hy3rURUCEkBi6VQzkkq9KB31H0omgM/gKOWm97PWfyLKtybjSvqDZiaA6TEH2u6NZ16E9asDxHrVOBFVgQg1u1qBtxv1rFGVOBG3CS8jmwnK1/iyvDwXW+1eBU58au/EXcr+0JmMQd3kds4AHTn6mvoGfkA7/9oxB1/zVOugHOpwMSmAa4mMVZtVelsdYoT+j0cmgLejCHCSLOaTgcvqrUBwpDGMkg1dIIZ7Lb69eBDLwrv8bZs08FgGAGn+XDk4mcQAAAABJRU5ErkJggg==", Ls = {
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
function pf(n) {
  return n >= 1e3 ? `${(n / 1e3).toFixed(1)}k` : String(n);
}
function pb(n) {
  return n.toLocaleString("zh-CN");
}
function yb(n) {
  const i = Math.floor(n / 60), u = n % 60;
  return `${i}:${String(u).padStart(2, "0")}`;
}
function vb(n) {
  return new Date(n).toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  });
}
function Ab(n) {
  return new Date(n).toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  });
}
function Yd(n, i) {
  return /* @__PURE__ */ d.jsx("span", { className: i ? "smd-kda-max" : void 0, children: n });
}
function vc(n, i) {
  return i > 0 ? n.get(i) ?? "" : "";
}
function Sb(n, i) {
  var u;
  return (u = n.get(i)) == null ? void 0 : u.player;
}
function bb() {
  return { rankText: "未定级", rankColor: Ls.UNRANKED };
}
function ay(n) {
  return !n || n === "UNRANKED" ? bb() : {
    rankText: tm(n),
    rankColor: Ls[n] ?? Ls.UNRANKED
  };
}
function Eb(n, i = "") {
  const u = ay(i);
  if (!n || typeof n != "object") return u;
  const c = n.queueMap;
  if (!c) return u;
  const r = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "EMERALD", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLENGER"], m = { IV: 1, III: 2, II: 3, I: 4 }, g = [];
  for (const [v, y] of [["RANKED_SOLO_5x5", "单排/双排"], ["RANKED_FLEX_SR", "灵活组排"]]) {
    const b = c[v];
    if (!b) continue;
    const C = b.tier ?? "", A = b.division ?? "";
    C && C !== "UNRANKED" && g.push({ key: v, label: y, tier: C, division: A });
  }
  if (g.length === 0) return u;
  g.sort((v, y) => {
    const b = r.indexOf(y.tier) - r.indexOf(v.tier);
    return b !== 0 ? b : (m[y.division] ?? 0) - (m[v.division] ?? 0);
  });
  const h = g[0];
  return {
    rankText: `${tm(h.tier)}${h.division && h.division !== "NA" ? ` ${h.division}` : ""} ${h.label}`,
    rankColor: Ls[h.tier] ?? Ls.UNRANKED
  };
}
function Tb({ team: n, participants: i, isRed: u }) {
  const c = i.reduce((g, h) => g + h.stats.kills, 0), r = i.reduce((g, h) => g + h.stats.goldEarned, 0), m = i.reduce((g, h) => g + h.stats.totalDamageDealtToChampions, 0);
  return /* @__PURE__ */ d.jsxs("div", { className: "smd-team-summary", children: [
    /* @__PURE__ */ d.jsxs("span", { title: "击杀", children: [
      /* @__PURE__ */ d.jsx("span", { className: "smd-sprite-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icons.png)", WebkitMaskPositionY: "0%" } }),
      c
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: "smd-stat-gold", title: "金币", children: [
      /* @__PURE__ */ d.jsx("span", { className: "smd-stat-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icon_gold.png)" } }),
      pf(r)
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: "smd-team-damage", title: "伤害", children: [
      /* @__PURE__ */ d.jsx("span", { className: "smd-damage-icon" }),
      pf(m)
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: "smd-team-turret", title: "防御塔", children: [
      /* @__PURE__ */ d.jsx("img", { src: u ? hb : gb, alt: "" }),
      (n == null ? void 0 : n.towerKills) ?? 0
    ] })
  ] });
}
function Cb({
  participant: n,
  identity: i,
  maxDamage: u,
  highlighted: c,
  isRed: r,
  rankInfo: m,
  iconMaps: g
}) {
  const h = n.stats, v = [h.item0, h.item1, h.item2, h.item3, h.item4, h.item5], y = [
    { icon: $l(h.perk0) || vc(g.perks, h.perk0), type: "rune" },
    { icon: Vc(h.perkSubStyle) || vc(g.perkStyles, h.perkSubStyle), type: "rune" },
    { icon: js(n.spell1Id) || vc(g.spells, n.spell1Id), type: "spell" },
    { icon: js(n.spell2Id) || vc(g.spells, n.spell2Id), type: "spell" }
  ].filter((F) => F.icon), b = Math.max(h.kills, h.deaths, h.assists), C = u > 0 ? Math.max(6, Math.round(h.totalDamageDealtToChampions / u * 100)) : 0, A = u > 0 && h.totalDamageDealtToChampions === u, w = i ? `${i.gameName}#${i.tagLine}` : `玩家 ${n.participantId}`, L = h.totalMinionsKilled + h.neutralMinionsKilled, D = m ?? ay(n.highestAchievedSeasonTier), H = () => {
    i && navigator.clipboard.writeText(w).then(() => {
      Toast.success("已复制ID");
    });
  };
  return /* @__PURE__ */ d.jsxs("div", { className: `smd-player-row${r ? " smd-player-row--red" : ""}${c ? " smd-player-row--focus" : ""}${A ? " smd-player-row--top-damage" : ""}`, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "smd-champ-block", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "smd-champ", children: [
        /* @__PURE__ */ d.jsx("img", { src: Hc(n.championId), alt: "" }),
        /* @__PURE__ */ d.jsx("span", { className: "smd-champ-level", children: h.champLevel })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: "smd-loadout", children: y.map(({ icon: F, type: V }, X) => /* @__PURE__ */ d.jsx("div", { className: `smd-loadout-slot smd-loadout-${V}`, children: /* @__PURE__ */ d.jsx("img", { src: F, alt: "" }) }, `${V}-${X}`)) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "smd-player-identity", title: w, children: [
      /* @__PURE__ */ d.jsx("button", { className: "smd-player-name", onClick: H, type: "button", children: /* @__PURE__ */ d.jsx("span", { children: (i == null ? void 0 : i.gameName) ?? `玩家 ${n.participantId}` }) }),
      /* @__PURE__ */ d.jsxs("strong", { className: "smd-kda", children: [
        Yd(h.kills, h.kills === b),
        " / ",
        Yd(h.deaths, h.deaths === b),
        " / ",
        Yd(h.assists, h.assists === b)
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: "smd-player-rank", style: { color: D.rankColor }, children: D.rankText })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: "smd-metrics", children: /* @__PURE__ */ d.jsxs("div", { className: "smd-damage", children: [
      /* @__PURE__ */ d.jsxs("span", { className: "smd-damage-value", children: [
        /* @__PURE__ */ d.jsx("span", { className: "smd-damage-icon" }),
        /* @__PURE__ */ d.jsx("strong", { children: pb(h.totalDamageDealtToChampions) })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: "smd-damage-bar", children: /* @__PURE__ */ d.jsx("i", { style: { width: `${C}%` } }) })
    ] }) }),
    /* @__PURE__ */ d.jsxs("div", { className: "smd-items-block", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "smd-stat-strip", children: [
        /* @__PURE__ */ d.jsxs("span", { className: "smd-stat-pill", title: "补刀", children: [
          /* @__PURE__ */ d.jsx("span", { className: "smd-stat-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icon_minions.png)" } }),
          L
        ] }),
        /* @__PURE__ */ d.jsxs("span", { className: "smd-stat-pill smd-stat-gold", title: "金币", children: [
          /* @__PURE__ */ d.jsx("span", { className: "smd-stat-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icon_gold.png)" } }),
          pf(h.goldEarned)
        ] })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: "smd-items", children: v.map((F, V) => /* @__PURE__ */ d.jsx("div", { className: "smd-item", children: F > 0 && /* @__PURE__ */ d.jsx("img", { src: im(F), alt: "" }) }, V)) })
    ] })
  ] });
}
function Nb({ open: n, onClose: i, gameId: u, focusPuuid: c }) {
  const [r, m] = j.useState(null), [g, h] = j.useState(/* @__PURE__ */ new Map()), [v, y] = j.useState({
    spells: /* @__PURE__ */ new Map(),
    perks: /* @__PURE__ */ new Map(),
    perkStyles: /* @__PURE__ */ new Map()
  }), [b, C] = j.useState(!1), [A, w] = j.useState("");
  j.useEffect(() => {
    if (!n || !u) return;
    let V = !1;
    return C(!0), w(""), m(null), h(/* @__PURE__ */ new Map()), _.getMatchDetail(u).then(async (X) => {
      const Q = await Promise.all(X.participantIdentities.map(async (Z) => {
        const W = await _.getRankedStats(Z.player.puuid).catch(() => null), z = X.participants.find((Y) => Y.participantId === Z.participantId);
        return [Z.player.puuid, Eb(W, (z == null ? void 0 : z.highestAchievedSeasonTier) ?? "")];
      }));
      V || m(X), V || h(new Map(Q));
    }).catch(() => {
      V || w("加载单局详情失败");
    }).finally(() => {
      V || C(!1);
    }), () => {
      V = !0;
    };
  }, [n, u]), j.useEffect(() => {
    if (!n) return;
    let V = !1;
    return Promise.all([
      _.getSummonerSpells().catch(() => []),
      _.getPerks().catch(() => []),
      _.getPerkStyles().catch(() => ({ styles: [] }))
    ]).then(([X, Q, Z]) => {
      V || y({
        spells: new Map(X.map((W) => [W.id, W.iconPath.toLowerCase()])),
        perks: new Map(Q.map((W) => [W.id, W.iconPath.toLowerCase()])),
        perkStyles: new Map(Z.styles.map((W) => [W.id, W.iconPath.toLowerCase()]))
      });
    }), () => {
      V = !0;
    };
  }, [n]);
  const L = j.useMemo(() => {
    const V = /* @__PURE__ */ new Map();
    return r == null || r.participantIdentities.forEach((X) => V.set(X.participantId, X)), V;
  }, [r]), D = j.useMemo(() => {
    const V = (r == null ? void 0 : r.participants.filter((Q) => Q.teamId === 100)) ?? [], X = (r == null ? void 0 : r.participants.filter((Q) => Q.teamId === 200)) ?? [];
    return { team100: V, team200: X };
  }, [r]), H = j.useMemo(() => Math.max(0, ...(r == null ? void 0 : r.participants.map((V) => V.stats.totalDamageDealtToChampions)) ?? [0]), [r]), F = (V, X, Q) => {
    const Z = r == null ? void 0 : r.teams.find((z) => z.teamId === V), W = (Z == null ? void 0 : Z.win) === "Win" || X.some((z) => z.stats.win);
    return /* @__PURE__ */ d.jsxs("section", { className: `smd-team ${Q ? "smd-team--red" : "smd-team--blue"} ${W ? "smd-win" : "smd-loss"}`, children: [
      /* @__PURE__ */ d.jsxs("div", { className: `smd-team-header ${Q ? "smd-team-header--red" : "smd-team-header--blue"}`, children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("strong", { children: V === 100 ? "蓝色方" : "红色方" }),
          /* @__PURE__ */ d.jsx("span", { children: W ? "胜利" : "失败" })
        ] }),
        /* @__PURE__ */ d.jsx(Tb, { team: Z, participants: X, isRed: Q })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: "smd-team-list", children: X.map((z) => {
        const Y = Sb(L, z.participantId);
        return /* @__PURE__ */ d.jsx(
          Cb,
          {
            participant: z,
            identity: Y,
            maxDamage: H,
            highlighted: !!(c && (Y == null ? void 0 : Y.puuid) === c),
            isRed: Q,
            rankInfo: Y ? g.get(Y.puuid) : void 0,
            iconMaps: v
          },
          z.participantId
        );
      }) })
    ] });
  };
  return /* @__PURE__ */ d.jsx(oi, { open: n, onClose: i, width: 1240, height: 640, children: /* @__PURE__ */ d.jsxs("div", { className: "smd-container", children: [
    /* @__PURE__ */ d.jsx("div", { className: "smd-header", children: /* @__PURE__ */ d.jsxs("div", { className: "smd-title-line", children: [
      /* @__PURE__ */ d.jsx("span", { className: "smd-title", children: "❖ 单局战报详情" }),
      r && /* @__PURE__ */ d.jsxs("div", { className: "smd-meta", children: [
        /* @__PURE__ */ d.jsx("span", { children: di(r.queueId) }),
        /* @__PURE__ */ d.jsx("span", { children: ey(r.mapId) }),
        /* @__PURE__ */ d.jsx("span", { children: `时长 ${yb(r.gameDuration)}` }),
        /* @__PURE__ */ d.jsx("span", { children: `开始 ${Ab(r.gameCreation)}` }),
        /* @__PURE__ */ d.jsx("span", { children: vb(r.gameCreation) }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          "ID:",
          r.gameId
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ d.jsxs("div", { className: "smd-body", children: [
      b && /* @__PURE__ */ d.jsx("div", { className: "smd-empty", children: "加载中..." }),
      A && /* @__PURE__ */ d.jsx("div", { className: "smd-empty smd-error", children: A }),
      !b && !A && r && /* @__PURE__ */ d.jsxs("div", { className: "smd-teams", children: [
        /* @__PURE__ */ d.jsx("div", { className: "smd-team-divider", "aria-hidden": "true" }),
        F(100, D.team100, !1),
        F(200, D.team200, !0)
      ] })
    ] })
  ] }) });
}
function Zp(n) {
  return n >= 1e3 ? `${(n / 1e3).toFixed(1)}k` : String(n);
}
function Mb(n) {
  const i = new Date(n), u = /* @__PURE__ */ new Date(), c = new Date(u.getFullYear(), u.getMonth(), u.getDate()), r = new Date(i.getFullYear(), i.getMonth(), i.getDate()), m = Math.round((c.getTime() - r.getTime()) / (1e3 * 60 * 60 * 24)), g = i.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: !1 });
  return m === 0 ? `今天 ${g}` : m === 1 ? `昨天 ${g}` : m === 2 ? `前天 ${g}` : i.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) + " " + g;
}
function xb(n, i) {
  var y, b, C, A, w, L, D;
  const u = n.json, c = u.participants.find((H) => H.puuid === i);
  if (!c) return null;
  let r = ey(u.mapId);
  if (u.mapId === 12) {
    const H = (y = u.gameModeMutators) == null ? void 0 : y[0];
    H === "mapskin_ha_bilgewater" ? r = "屠夫之桥" : H === "mapskin_map12_bloom" ? r = "莲华栈桥" : r = "嚎哭深渊";
  }
  const m = (C = (b = c.perks) == null ? void 0 : b.styles) == null ? void 0 : C[0], g = (w = (A = c.perks) == null ? void 0 : A.styles) == null ? void 0 : w[1], h = ((D = (L = m == null ? void 0 : m.selections) == null ? void 0 : L[0]) == null ? void 0 : D.perk) ?? 0, v = (g == null ? void 0 : g.style) ?? 0;
  return {
    gameId: u.gameId,
    queueId: u.queueId,
    win: c.win,
    championId: c.championId,
    level: c.champLevel,
    kills: c.kills,
    deaths: c.deaths,
    assists: c.assists,
    cs: c.totalMinionsKilled + c.neutralMinionsKilled,
    gold: c.goldEarned,
    damage: c.totalDamageDealtToChampions,
    queueName: di(u.queueId),
    mapName: r,
    spell1Id: c.spell1Id,
    spell2Id: c.spell2Id,
    perk0: h,
    perkSubStyle: v,
    items: [c.item0, c.item1, c.item2, c.item3, c.item4, c.item5, c.item6],
    gameCreation: u.gameCreation
  };
}
function Ib({ match: n, onOpenDetail: i }) {
  const u = n.win ? "smh-win" : "smh-loss", c = n.win ? "胜利" : "失败", [r, m] = j.useState(!1), g = (h) => {
    h.stopPropagation(), navigator.clipboard.writeText(String(n.gameId)).then(() => {
      m(!0), setTimeout(() => m(!1), 1500);
    });
  };
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: `smh-row ${u}`,
      role: "button",
      tabIndex: 0,
      onClick: () => i(n.gameId),
      onKeyDown: (h) => {
        (h.key === "Enter" || h.key === " ") && (h.preventDefault(), i(n.gameId));
      },
      title: "点击查看单局详情",
      children: [
        /* @__PURE__ */ d.jsxs("div", { className: "smh-row-left", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "smh-champion", children: [
            /* @__PURE__ */ d.jsx("div", { className: "smh-champion-mask", children: /* @__PURE__ */ d.jsx("img", { className: "smh-champion-icon", src: Hc(n.championId), alt: "" }) }),
            /* @__PURE__ */ d.jsx("span", { className: "smh-champion-level", children: n.level })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "smh-row-info", children: [
            /* @__PURE__ */ d.jsx("span", { className: `smh-status ${u}`, children: c }),
            /* @__PURE__ */ d.jsx("span", { className: "smh-gamemode", children: n.queueName }),
            /* @__PURE__ */ d.jsxs("div", { className: "smh-spells", children: [
              /* @__PURE__ */ d.jsx("img", { className: "smh-spell", src: js(n.spell1Id), alt: "" }),
              /* @__PURE__ */ d.jsx("img", { className: "smh-spell", src: js(n.spell2Id), alt: "" }),
              n.perk0 > 0 && $l(n.perk0) && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("img", { className: "smh-perk smh-perk-primary", src: $l(n.perk0), alt: "" }),
                n.perkSubStyle > 0 && Vc(n.perkSubStyle) && /* @__PURE__ */ d.jsx("img", { className: "smh-perk smh-perk-sub", src: Vc(n.perkSubStyle), alt: "" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "smh-row-center", children: [
          /* @__PURE__ */ d.jsx("div", { className: "smh-items", children: n.items.map((h, v) => /* @__PURE__ */ d.jsx("div", { className: "smh-item-slot", children: h > 0 && /* @__PURE__ */ d.jsx("img", { className: "smh-item-icon", src: im(h), alt: "" }) }, v)) }),
          /* @__PURE__ */ d.jsxs("div", { className: "smh-stats-line", children: [
            /* @__PURE__ */ d.jsxs("span", { className: "smh-kda", children: [
              /* @__PURE__ */ d.jsx("span", { className: "smh-sprite-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icons.png)", WebkitMaskPositionY: "0%", width: "22px", height: "22px" } }),
              /* @__PURE__ */ d.jsx("span", { className: `smh-kda-num${n.kills >= n.deaths && n.kills >= n.assists ? " smh-kda-highlight" : ""}`, children: n.kills }),
              " / ",
              /* @__PURE__ */ d.jsx("span", { className: `smh-kda-num${n.deaths > n.kills && n.deaths > n.assists ? " smh-kda-highlight" : ""}`, children: n.deaths }),
              " / ",
              /* @__PURE__ */ d.jsx("span", { className: `smh-kda-num${n.assists > n.kills && n.assists > n.deaths ? " smh-kda-highlight" : ""}`, children: n.assists })
            ] }),
            /* @__PURE__ */ d.jsxs("span", { className: "smh-cs", children: [
              /* @__PURE__ */ d.jsx("span", { className: "smh-stat-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icon_minions.png)" } }),
              n.cs
            ] }),
            /* @__PURE__ */ d.jsxs("span", { className: "smh-gold", children: [
              /* @__PURE__ */ d.jsx("span", { className: "smh-stat-icon", style: { WebkitMaskImage: "url(/fe/lol-match-history/icon_gold.png)" } }),
              Zp(n.gold)
            ] }),
            /* @__PURE__ */ d.jsxs("span", { className: "smh-damage", children: [
              "🗡️ ",
              Zp(n.damage)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "smh-row-right", children: [
          /* @__PURE__ */ d.jsx("span", { className: "smh-mapname", children: n.mapName }),
          /* @__PURE__ */ d.jsx("span", { className: "smh-date", children: Mb(n.gameCreation) }),
          /* @__PURE__ */ d.jsxs("span", { className: "smh-gameid", onClick: g, children: [
            "ID:",
            n.gameId,
            /* @__PURE__ */ d.jsx("span", { className: `smh-copy-icon ${r ? "smh-copied" : ""}`, style: { WebkitMaskImage: "url(/fe/lol-static-assets/images/game-id-clipboard-copy.svg)" } })
          ] })
        ] })
      ]
    }
  );
}
const Jp = 20;
function kb(n, i, u = 0) {
  const [c, r] = j.useState([]), [m, g] = j.useState(!1), [h, v] = j.useState(!1), [y, b] = j.useState(""), [C, A] = j.useState(!0), [w, L] = j.useState(u), D = j.useRef(null), H = j.useCallback(async (Q, Z) => {
    if (!(Q.busy || !Q.hasMore)) {
      Q.busy = !0, Z ? g(!0) : v(!0);
      try {
        const W = await _.getSgpMatchHistory(Q.puuid, {
          startIndex: Q.nextIndex,
          count: Jp,
          tag: yo(Q.queueId) || void 0
        });
        if (D.current !== Q) return;
        const z = W.games ?? [];
        r((Y) => Z ? z : [...Y, ...z]), Q.nextIndex += z.length, Q.hasMore = z.length >= Jp, A(Q.hasMore);
      } catch {
        if (D.current !== Q) return;
        Z && (b("战绩加载失败"), Q.hasMore = !1, A(!1));
      } finally {
        Q.busy = !1, D.current === Q && (g(!1), v(!1));
      }
    }
  }, []), F = j.useCallback((Q) => {
    const Z = { puuid: i, queueId: Q, nextIndex: 0, busy: !1, hasMore: !0 };
    D.current = Z, L(Q), r([]), b(""), A(!0), v(!1), H(Z, !0);
  }, [i, H]);
  j.useEffect(() => (n && i ? F(u) : (r([]), g(!1), v(!1)), () => {
    D.current = null;
  }), [n, i, u, F]);
  const V = j.useCallback((Q) => {
    n && i && F(Q);
  }, [n, i, F]), X = j.useCallback(() => {
    const Q = D.current;
    Q && H(Q, !1);
  }, [H]);
  return { games: c, loading: m, loadingMore: h, error: y, hasMore: C, filterQueueId: w, changeFilter: V, loadMore: X };
}
function Wn({ open: n, onClose: i, puuid: u, playerName: c, queueId: r }) {
  var oe;
  const [m, g] = j.useState(c), { games: h, loading: v, loadingMore: y, error: b, hasMore: C, filterQueueId: A, changeFilter: w, loadMore: L } = kb(n, u, r), D = j.useMemo(() => h.map((se) => xb(se, u)).filter((se) => se !== null), [h, u]), [H, F] = j.useState(!1), [V, X] = j.useState(null), Q = j.useRef(null), Z = j.useRef(null);
  j.useEffect(() => {
    const se = c.trim(), fe = !!se.replace(/#/g, "").trim();
    if (g(fe ? se : "未知"), !n || !u || fe) return;
    let Ne = !1;
    return _.getSummonerByPuuid(u).then((Re) => {
      if (Ne) return;
      const ue = Re.gameName ? `${Re.gameName}${Re.tagLine ? `#${Re.tagLine}` : ""}` : Re.displayName;
      ue && g(ue);
    }).catch(() => {
    }), () => {
      Ne = !0;
    };
  }, [n, c, u]);
  const [W, z] = j.useState([]);
  j.useEffect(() => {
    const se = mb();
    z(se);
  }, []), j.useEffect(() => {
    const se = (fe) => {
      Z.current && !Z.current.contains(fe.target) && F(!1);
    };
    return document.addEventListener("mousedown", se), () => document.removeEventListener("mousedown", se);
  }, []), j.useEffect(() => {
    if (!n) return;
    let se;
    const fe = requestAnimationFrame(() => {
      const Ne = Q.current;
      if (!Ne) return;
      const Re = () => {
        const { scrollTop: ue, scrollHeight: O, clientHeight: J } = Ne;
        O - ue - J < 60 && L();
      };
      Ne.addEventListener("scroll", Re, { passive: !0 }), se = () => Ne.removeEventListener("scroll", Re);
    });
    return () => {
      cancelAnimationFrame(fe), se == null || se();
    };
  }, [n, L]);
  const Y = (se) => {
    F(!1), w(se);
  }, pe = A > 0 ? ((oe = W.find((se) => se.id === A)) == null ? void 0 : oe.name) ?? di(A) : "全部模式";
  return /* @__PURE__ */ d.jsx(oi, { open: n, onClose: i, width: 860, height: 620, children: /* @__PURE__ */ d.jsxs("div", { className: "smh-container", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "smh-header", children: [
      /* @__PURE__ */ d.jsx("span", { className: "smh-title", children: `❖ ${m} 的近期战报` }),
      /* @__PURE__ */ d.jsxs("div", { className: "smh-filter", ref: Z, children: [
        /* @__PURE__ */ d.jsxs(
          "button",
          {
            className: `smh-filter-trigger${H ? " smh-filter-trigger--open" : ""}`,
            onClick: () => F(!H),
            type: "button",
            children: [
              /* @__PURE__ */ d.jsx("span", { children: pe }),
              /* @__PURE__ */ d.jsx("svg", { className: `smh-filter-arrow${H ? " smh-filter-arrow--open" : ""}`, width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ d.jsx("polyline", { points: "6 9 12 15 18 9" }) })
            ]
          }
        ),
        H && /* @__PURE__ */ d.jsxs("div", { className: "smh-filter-dropdown", children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              className: `smh-filter-option${A === 0 ? " smh-filter-option--active" : ""}`,
              onClick: () => Y(0),
              type: "button",
              children: "全部模式"
            }
          ),
          W.map((se) => /* @__PURE__ */ d.jsx(
            "button",
            {
              className: `smh-filter-option${A === se.id ? " smh-filter-option--active" : ""}`,
              onClick: () => Y(se.id),
              type: "button",
              children: se.name
            },
            se.id
          ))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "smh-list", ref: Q, children: [
      v && /* @__PURE__ */ d.jsx("div", { className: "smh-empty", children: "正在拉取战绩..." }),
      b && /* @__PURE__ */ d.jsx("div", { className: "smh-empty smh-error", children: b }),
      !v && !b && D.length === 0 && /* @__PURE__ */ d.jsx("div", { className: "smh-empty", children: "暂无对局数据" }),
      D.map((se) => /* @__PURE__ */ d.jsx(Ib, { match: se, onOpenDetail: X }, se.gameId)),
      y && /* @__PURE__ */ d.jsx("div", { className: "smh-empty", children: "正在加载更多..." }),
      !v && !b && D.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "smh-empty smh-no-more", children: C ? "↓ 下滑加载更多" : `— 共 ${D.length} 条战绩 —` })
    ] }),
    /* @__PURE__ */ d.jsx(
      Nb,
      {
        open: V != null,
        onClose: () => X(null),
        gameId: V,
        focusPuuid: u
      }
    )
  ] }) });
}
const sn = {
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
  balanceBuffTooltip: !1,
  gameAnalysisPopup: !1
}, Yp = "sona:";
class Rb {
  constructor() {
    Ae(this, "listeners", /* @__PURE__ */ new Map());
    Ae(this, "cache");
    const i = { ...sn };
    for (const u of Object.keys(sn))
      i[u] = this.readFromDisk(u);
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
  set(i, u) {
    if (this.cache[i] === u) return;
    this.cache[i] = u, DataStore.set(`${Yp}${i}`, u);
    const r = this.listeners.get(i);
    r && r.forEach((m) => {
      try {
        m(u, i);
      } catch {
      }
    });
  }
  /**
   * 切换布尔值配置
   */
  toggle(i) {
    const u = this.get(i);
    if (typeof u != "boolean") return u;
    const c = !u;
    return this.set(i, c), c;
  }
  /**
   * 监听配置变化
   * @returns 取消监听的函数
   */
  onChange(i, u) {
    let c = this.listeners.get(i);
    return c || (c = /* @__PURE__ */ new Set(), this.listeners.set(i, c)), c.add(u), () => {
      c.delete(u);
    };
  }
  /**
   * 重置所有配置为默认值
   */
  resetAll() {
    for (const i of Object.keys(sn))
      this.set(i, sn[i]);
  }
  /**
   * 重置单个配置为默认值
   */
  reset(i) {
    this.set(i, sn[i]);
  }
  /**
   * 获取所有配置的快照
   */
  getAll() {
    const i = { ...sn };
    for (const u of Object.keys(sn))
      i[u] = this.get(u);
    return i;
  }
  // ---- 内部方法 ----
  readFromDisk(i) {
    const u = DataStore.get(`${Yp}${i}`);
    return u !== void 0 ? u : sn[i];
  }
}
const q = new Rb();
function wb() {
  const [n, i] = j.useState(q.get("champSelectAssist")), [u, c] = j.useState(q.get("champSelectTierBadge")), [r, m] = j.useState(q.get("opggBuildRecommendation")), [g, h] = j.useState(q.get("smartBuildRecommendation")), [v, y] = j.useState(q.get("smartItemSetBuild")), [b, C] = j.useState(q.get("balanceBuffTooltip")), [A, w] = j.useState(q.get("gameAnalysisPopup")), [L, D] = j.useState(q.get("analyzeTeamPower")), [H, F] = j.useState(q.get("analyzeTeamPowerFetchCount")), [V, X] = j.useState(q.get("champSelectAssistFetchCount")), [Q, Z] = j.useState(q.get("gameAnalysisFetchCount")), [W, z] = j.useState(q.get("lobbyEnhancement")), [Y, pe] = j.useState(q.get("lobbyEnhancementFetchCount")), [oe, se] = j.useState(""), [fe, Ne] = j.useState(""), [Re, ue] = j.useState(!1), [O, J] = j.useState(""), [ie, Me] = j.useState(""), Ee = [
    { value: "20", label: "近20局" },
    { value: "50", label: "近50局" },
    { value: "100", label: "近100局" }
  ];
  j.useEffect(() => {
    const M = [
      q.onChange("champSelectAssist", i),
      q.onChange("champSelectTierBadge", c),
      q.onChange("opggBuildRecommendation", m),
      q.onChange("smartBuildRecommendation", h),
      q.onChange("smartItemSetBuild", y),
      q.onChange("balanceBuffTooltip", C),
      q.onChange("gameAnalysisPopup", w),
      q.onChange("analyzeTeamPower", D),
      q.onChange("analyzeTeamPowerFetchCount", F),
      q.onChange("champSelectAssistFetchCount", X),
      q.onChange("gameAnalysisFetchCount", Z),
      q.onChange("lobbyEnhancement", z),
      q.onChange("lobbyEnhancementFetchCount", pe)
    ];
    return () => M.forEach((P) => P());
  }, []);
  const T = async () => {
    const M = oe.trim().split("#");
    if (M.length !== 2 || !M[0] || !M[1]) {
      Ne("格式错误，请输入: 名字#Tag");
      return;
    }
    Ne("");
    try {
      const P = await _.resolveSummonerPuuidByRiotId(M[0], M[1]);
      if (!P) {
        Ne("未找到该召唤师");
        return;
      }
      J(P), Me(`${M[0]}#${M[1]}`), ue(!0);
    } catch {
      Ne("查询失败，请检查名字和Tag是否正确");
    }
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "sona-settings", children: [
    /* @__PURE__ */ d.jsx("h2", { className: "sona-settings-title", children: "排位分析" }),
    /* @__PURE__ */ d.jsxs(rf, { title: "战绩查询", children: [
      /* @__PURE__ */ d.jsx("p", { className: "sona-subtitle", style: { marginBottom: 10 }, children: "输入召唤师名#Tag 查询国服玩家的近期战绩，支持国服大区互通查询。" }),
      /* @__PURE__ */ d.jsxs("div", { className: "sona-match-search-actions", style: { alignItems: "flex-end", gap: 8 }, children: [
        /* @__PURE__ */ d.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ d.jsx(
          $S,
          {
            value: oe,
            onChange: (M) => {
              se(M), Ne("");
            },
            onKeyDown: (M) => {
              M.key === "Enter" && T();
            },
            placeholder: "名字#Tag (例:丨一疾风剑豪一丨#77772)"
          }
        ) }),
        /* @__PURE__ */ d.jsx(Ns, { variant: "primary", onClick: T, children: "查询战绩" })
      ] }),
      fe && /* @__PURE__ */ d.jsx("p", { className: "sona-subtitle", style: { color: "#e74c3c", marginTop: 6 }, children: fe })
    ] }),
    /* @__PURE__ */ d.jsx(
      Wn,
      {
        open: Re,
        onClose: () => ue(!1),
        puuid: O,
        playerName: ie
      }
    ),
    /* @__PURE__ */ d.jsxs(rf, { title: "对局相关", children: [
      /* @__PURE__ */ d.jsxs(
        Vt,
        {
          title: "英雄选择阶段增强",
          description: "英雄选择时显示粒子特效和队友近期胜率/KDA；点击队友头像可查询近期战绩。",
          children: [
            /* @__PURE__ */ d.jsx(
              Zn,
              {
                value: String(V),
                onChange: (M) => {
                  X(Number(M)), q.set("champSelectAssistFetchCount", Number(M));
                },
                options: Ee
              }
            ),
            /* @__PURE__ */ d.jsx(
              ia,
              {
                checked: n,
                onChange: (M) => {
                  i(M), q.set("champSelectAssist", M);
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ d.jsxs(
        Vt,
        {
          title: "牛马检测器",
          description: "在队友头像旁显示千里马、上等马、下等马等队内评级与综合评分，仅自己可见。",
          children: [
            /* @__PURE__ */ d.jsx(
              Zn,
              {
                value: String(H),
                onChange: (M) => {
                  F(Number(M)), q.set("analyzeTeamPowerFetchCount", Number(M));
                },
                options: Ee
              }
            ),
            /* @__PURE__ */ d.jsx(
              ia,
              {
                checked: L,
                onChange: (M) => {
                  D(M), q.set("analyzeTeamPower", M);
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ d.jsx(
        Vt,
        {
          title: "英雄 T 级角标",
          description: "英雄选择时在英雄列表、备选席和左侧队友头像上显示 T 级角标。",
          children: /* @__PURE__ */ d.jsx(
            ia,
            {
              checked: u,
              onChange: (M) => {
                c(M), q.set("champSelectTierBadge", M);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ d.jsx(
        Vt,
        {
          title: "配装推荐面板",
          description: "锁定英雄后，点击皮肤选择下方的按钮以打开当前英雄的 OP.GG 配装、符文和海克斯推荐。",
          children: /* @__PURE__ */ d.jsx(
            ia,
            {
              checked: r,
              onChange: (M) => {
                m(M), q.set("opggBuildRecommendation", M);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ d.jsx(
        Vt,
        {
          title: "自动配置符文 & 召唤师技能",
          description: '按"英雄 + 模式"保存并恢复符文与召唤师技能；首次使用会在进入游戏前记录最终配置。',
          children: /* @__PURE__ */ d.jsx(
            ia,
            {
              checked: g,
              onChange: (M) => {
                h(M), q.set("smartBuildRecommendation", M);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ d.jsx(
        Vt,
        {
          title: "自动配装",
          description: "锁定英雄后按模式和分路自动写入 OP.GG 推荐装备集。（暂不推荐使用，可能导致配装错乱）",
          children: /* @__PURE__ */ d.jsx(
            ia,
            {
              checked: v,
              onChange: (M) => {
                y(M), q.set("smartItemSetBuild", M);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ d.jsx(
        Vt,
        {
          title: "平衡性调整buff提示",
          description: "游玩特定模式（大乱斗、无限火力）时，鼠标悬停在英雄头像上，显示对应的平衡性数值调整。",
          children: /* @__PURE__ */ d.jsx(
            ia,
            {
              checked: b,
              onChange: (M) => {
                C(M), q.set("balanceBuffTooltip", M);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ d.jsxs(
        Vt,
        {
          title: "全局战力分析弹窗",
          description: "进入游戏后，自动弹窗展示双方队伍战力分析，包括胜率、KDA、段位、开黑分组。(注，不是直接在游戏内展示，需要切回客户端查看)",
          children: [
            /* @__PURE__ */ d.jsx(
              Zn,
              {
                value: String(Q),
                onChange: (M) => {
                  Z(Number(M)), q.set("gameAnalysisFetchCount", Number(M));
                },
                options: Ee
              }
            ),
            /* @__PURE__ */ d.jsx(
              ia,
              {
                checked: A,
                onChange: (M) => {
                  w(M), q.set("gameAnalysisPopup", M);
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ d.jsxs(
        Vt,
        {
          title: "组队界面增强",
          description: "开启后，组队界面点击头像即可查看召唤师战绩，且旗帜上方显示近期表现。",
          children: [
            /* @__PURE__ */ d.jsx(
              Zn,
              {
                value: String(Y),
                onChange: (M) => {
                  pe(Number(M)), q.set("lobbyEnhancementFetchCount", Number(M));
                },
                options: Ee
              }
            ),
            /* @__PURE__ */ d.jsx(
              ia,
              {
                checked: W,
                onChange: (M) => {
                  z(M), q.set("lobbyEnhancement", M);
                }
              }
            )
          ]
        }
      )
    ] })
  ] });
}
const ny = "https://github.com/limnova/sona/releases", Ub = "https://api.github.com/repos/limnova/sona/releases/latest", Db = "https://api.github.com/repos/limnova/sona/releases";
function Pp(n) {
  return `https://corsproxy.io/?${encodeURIComponent(n)}`;
}
let Is = {
  status: "idle",
  info: null,
  error: ""
}, ms = null, ks = "";
const yf = /* @__PURE__ */ new Set();
function ly() {
  const n = Ra();
  yf.forEach((i) => i(n));
}
function Jl(n) {
  Is = n, ly();
}
function Ra() {
  return {
    ...Is,
    info: Is.info ? { ...Is.info } : null
  };
}
function cm(n) {
  return yf.add(n), n(Ra()), () => yf.delete(n);
}
function ni(n) {
  return n.trim().replace(/^v/i, "");
}
function Fp(n, i) {
  const u = ni(n).split(/[.-]/), c = ni(i).split(/[.-]/), r = Math.max(u.length, c.length);
  for (let m = 0; m < r; m += 1) {
    const g = Number.parseInt(u[m] ?? "0", 10), h = Number.parseInt(c[m] ?? "0", 10), v = Number.isFinite(g) ? g : 0, y = Number.isFinite(h) ? h : 0;
    if (v !== y) return v - y;
  }
  return 0;
}
function Ob() {
  return ni(q.get("skippedUpdateVersion") ?? "");
}
async function zb() {
  const n = [], i = [
    { url: Pp(Ub), kind: "single" },
    { url: Pp(Db), kind: "array" }
  ];
  for (const { url: u, kind: c } of i)
    try {
      const r = await fetch(u, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/vnd.github+json"
        }
      }), m = await r.text();
      if (!r.ok) {
        n.push(`${u} -> ${r.status} ${r.statusText}`);
        continue;
      }
      const g = JSON.parse(m), h = c === "single" ? g : Array.isArray(g) && g[0] ? g[0] : null;
      if (!(h != null && h.tag_name)) {
        n.push(`${u} -> missing tag_name`);
        continue;
      }
      return h;
    } catch (r) {
      n.push(`${u} -> ${r instanceof Error ? r.message : String(r)}`);
    }
  throw new Error(n.join(" | ") || "no release api response");
}
function Bb() {
  return ny;
}
function om() {
  return ms || (Jl({ status: "checking", info: null, error: "" }), ms = zb().then((n) => {
    const i = ni("1.11.0"), u = ni(n.tag_name ?? ""), c = Ob();
    if (c && Fp(i, c) >= 0 && q.set("skippedUpdateVersion", null), !u || Fp(u, i) <= 0) {
      const m = { status: "latest", info: null, error: "" };
      return Jl(m), m;
    }
    if (u === c) {
      const m = { status: "latest", info: null, error: "" };
      return Jl(m), R.info("[Update] 已跳过版本 %s，本次不再提示。", u), m;
    }
    const r = {
      status: "available",
      error: "",
      info: {
        currentVersion: i,
        latestVersion: u,
        releaseName: n.name || `Sona v${u}`,
        releaseUrl: n.html_url || ny,
        releaseBody: n.body || "该版本没有填写更新说明。",
        publishedAt: n.published_at || ""
      }
    };
    return Jl(r), R.info("[Update] 检测到新版本: %s -> %s", i, u), Gb(i, u), r;
  }).catch((n) => {
    const u = { status: "error", info: null, error: n instanceof Error ? n.message : String(n) };
    return Jl(u), R.warn("[Update] 检查更新失败:", n), u;
  }).finally(() => {
    ms = null;
  }), ms);
}
function jb(n) {
  var u;
  const i = ni(n);
  return i && (q.set("skippedUpdateVersion", i), ks = i, ((u = Is.info) == null ? void 0 : u.latestVersion) === i ? Jl({ status: "latest", info: null, error: "" }) : ly(), R.info("[Update] 跳过版本更新提醒: %s", i)), Ra();
}
function Lb() {
  q.set("skippedUpdateVersion", null), ks = "";
}
function Gb(n, i) {
  ks !== i && (ks = i, _.sendNotification(
    "检测到 Sona 新版本",
    `${n} → ${i}，打开 Sona 面板查看更新内容。`
  ).catch((u) => {
    ks = "", R.warn("[Update] 发送更新通知失败:", u);
  }));
}
const qb = [
  { value: "F1", label: "F1" },
  { value: "F2", label: "F2" },
  { value: "F3", label: "F3" },
  { value: "F4", label: "F4" },
  { value: "F5", label: "F5" }
];
function Kb() {
  const [n, i] = j.useState(q.get("hotkey")), [u, c] = j.useState(q.get("hideSonaIcon")), [r, m] = j.useState(q.get("skippedUpdateVersion"));
  return j.useEffect(() => {
    const g = [
      q.onChange("hotkey", i),
      q.onChange("hideSonaIcon", c),
      q.onChange("skippedUpdateVersion", m)
    ];
    return () => g.forEach((h) => h());
  }, []), /* @__PURE__ */ d.jsxs("div", { className: "sona-settings", children: [
    /* @__PURE__ */ d.jsx("h2", { className: "sona-settings-title", children: "设置" }),
    /* @__PURE__ */ d.jsxs(rf, { title: "通用", children: [
      /* @__PURE__ */ d.jsx(
        Vt,
        {
          title: "面板快捷键",
          description: "随时按下快捷键打开/关闭 Sona 面板。",
          children: /* @__PURE__ */ d.jsx(
            Zn,
            {
              options: qb,
              value: n,
              onChange: (g) => {
                i(g), q.set("hotkey", g);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ d.jsx(
        Vt,
        {
          title: "隐藏琴女 Icon",
          description: `隐藏 Play 按钮旁的 Sona 入口图标；隐藏后仍可按 ${n} 打开面板。`,
          children: /* @__PURE__ */ d.jsx(
            ia,
            {
              checked: u,
              onChange: (g) => {
                c(g), q.set("hideSonaIcon", g);
              }
            }
          )
        }
      ),
      r && /* @__PURE__ */ d.jsx(
        Vt,
        {
          title: `已跳过 v${r} 版本更新`,
          description: "Sona 不会再提示这个版本；恢复提醒后会重新检查更新。",
          children: /* @__PURE__ */ d.jsx(Ns, { onClick: () => {
            Lb(), om();
          }, children: "恢复更新提醒" })
        }
      )
    ] })
  ] });
}
function Pd({ icon: n, label: i, value: u }) {
  return /* @__PURE__ */ d.jsxs("div", { className: "sona-hex-card", children: [
    /* @__PURE__ */ d.jsx("span", { className: "sona-hex-card-icon", children: n }),
    /* @__PURE__ */ d.jsxs("div", { className: "sona-hex-card-text", children: [
      /* @__PURE__ */ d.jsx("span", { className: "sona-hex-card-label", children: i }),
      /* @__PURE__ */ d.jsx("span", { className: "sona-hex-card-value", children: u })
    ] })
  ] });
}
function Hb() {
  return /* @__PURE__ */ d.jsxs("div", { className: "sona-about", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "sona-about-header", children: [
      /* @__PURE__ */ d.jsx("h2", { className: "sona-about-title", children: "Sona" }),
      /* @__PURE__ */ d.jsxs("span", { className: "sona-about-version", children: [
        "v",
        "1.11.0"
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("p", { className: "sona-about-desc", children: "Sona 是基于 Pengu Loader 的英雄联盟排位分析插件，提供战绩、队友评级及符文装备推荐。" }),
    /* @__PURE__ */ d.jsxs("div", { className: "sona-about-row", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "sona-about-cards", children: [
        /* @__PURE__ */ d.jsx(Pd, { icon: /* @__PURE__ */ d.jsx(H1, {}), label: "插件", value: "Sona v1.11.0" }),
        /* @__PURE__ */ d.jsx(Pd, { icon: /* @__PURE__ */ d.jsx(KS, {}), label: "框架", value: "React + Vite" }),
        /* @__PURE__ */ d.jsx(
          Pd,
          {
            icon: /* @__PURE__ */ d.jsx(HS, {}),
            label: "加载器",
            value: `Pengu Loader ${typeof Pengu < "u" ? Pengu.version : "1.1.6"}`
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "sona-about-section sona-about-tech", children: [
        /* @__PURE__ */ d.jsx("h3", { className: "sona-about-section-title", children: "技术栈" }),
        /* @__PURE__ */ d.jsxs("ul", { className: "sona-about-list", children: [
          /* @__PURE__ */ d.jsx("li", { children: "React 19 + TypeScript" }),
          /* @__PURE__ */ d.jsx("li", { children: "Vite 6" }),
          /* @__PURE__ */ d.jsx("li", { children: "Pengu Loader v1.1.0+" }),
          /* @__PURE__ */ d.jsx("li", { children: "LCU REST API + WebSocket" })
        ] }),
        /* @__PURE__ */ d.jsxs(
          "a",
          {
            className: "sona-hex-card sona-hex-card-link",
            href: "https://github.com/limnova/sona",
            target: "_blank",
            rel: "noopener noreferrer",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: "sona-hex-card-icon", children: /* @__PURE__ */ d.jsx(FS, {}) }),
              /* @__PURE__ */ d.jsxs("div", { className: "sona-hex-card-text", children: [
                /* @__PURE__ */ d.jsx("span", { className: "sona-hex-card-label", children: "GitHub" }),
                /* @__PURE__ */ d.jsx("span", { className: "sona-hex-card-value", children: "limnova/sona" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "sona-about-section", children: [
      /* @__PURE__ */ d.jsx("h3", { className: "sona-about-section-title", children: "开源协议" }),
      /* @__PURE__ */ d.jsx("p", { className: "sona-about-text", children: "AGPL-3.0" })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: "sona-about-quote", children: "由 WJZ_P 用心制作 ❤。" })
  ] });
}
function Vb(n) {
  const i = new Date(n);
  if (Number.isNaN(i.getTime())) return n;
  const u = i.getFullYear(), c = String(i.getMonth() + 1).padStart(2, "0"), r = String(i.getDate()).padStart(2, "0");
  return `${u}年${c}月${r}日`;
}
function Xb() {
  const [n, i] = j.useState(() => Ra()), u = n.info;
  j.useEffect(() => cm(i), []);
  const c = (r) => {
    window.open(r, "_blank");
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "sona-update-page", children: [
    /* @__PURE__ */ d.jsx("h2", { className: "sona-update-title", children: u ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      "检测到Sona新版本：",
      /* @__PURE__ */ d.jsx("span", { className: "sona-update-title-version", children: u.currentVersion }),
      /* @__PURE__ */ d.jsx("span", { className: "sona-update-title-arrow", children: "→" }),
      /* @__PURE__ */ d.jsx("span", { className: "sona-update-title-version sona-update-title-version--latest", children: u.latestVersion })
    ] }) : "检测到Sona新版本" }),
    u ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsxs("div", { className: "sona-update-release", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "sona-update-release-head", children: [
          /* @__PURE__ */ d.jsx("span", { children: u.releaseName }),
          u.publishedAt && /* @__PURE__ */ d.jsx("time", { dateTime: u.publishedAt, children: Vb(u.publishedAt) })
        ] }),
        /* @__PURE__ */ d.jsx("pre", { className: "sona-update-notes", children: u.releaseBody })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "sona-update-download", children: [
        /* @__PURE__ */ d.jsx("h3", { children: "下载方式" }),
        /* @__PURE__ */ d.jsx("p", { children: "请到 limnova/sona 的 Releases 页面下载此精简版。" }),
        /* @__PURE__ */ d.jsxs("div", { className: "sona-update-actions", children: [
          /* @__PURE__ */ d.jsx(Ns, { variant: "primary", onClick: () => c(u.releaseUrl || Bb()), children: "打开 Release" }),
          /* @__PURE__ */ d.jsx(Ns, { onClick: () => jb(u.latestVersion), children: `跳过 v${u.latestVersion}` })
        ] })
      ] })
    ] }) : /* @__PURE__ */ d.jsxs("div", { className: "sona-update-empty", children: [
      /* @__PURE__ */ d.jsx("p", { children: n.status === "checking" ? "正在检查更新..." : n.status === "error" ? `检查更新失败：${n.error ?? ""}` : "当前没有检测到新版本。" }),
      /* @__PURE__ */ d.jsx(Ns, { onClick: () => {
        om();
      }, children: "重新检查" })
    ] })
  ] });
}
const Xc = /* @__PURE__ */ new Set();
let li = !1;
function Qb() {
  return li;
}
function iy() {
  li = !0, Xc.forEach((n) => n(li));
}
function sy() {
  li = !1, Xc.forEach((n) => n(li));
}
function Zb() {
  li ? sy() : iy();
}
function uy(n) {
  return Xc.add(n), () => {
    Xc.delete(n);
  };
}
let vf = "";
function Jb(n) {
  n.key === vf && (n.preventDefault(), n.stopPropagation(), Zb());
}
function Yb() {
  vf = q.get("hotkey"), document.addEventListener("keydown", Jb, !0), q.onChange("hotkey", (n) => {
    vf = n;
  });
}
const Wp = [
  { id: "home", icon: /* @__PURE__ */ d.jsx(XS, {}), label: "主页" },
  { id: "tools", icon: /* @__PURE__ */ d.jsx(ZS, {}), label: "排位分析" },
  { id: "settings", icon: /* @__PURE__ */ d.jsx(QS, {}), label: "设置" },
  { id: "about", icon: /* @__PURE__ */ d.jsx(JS, {}), label: "关于" }
], Pb = {
  id: "update",
  icon: /* @__PURE__ */ d.jsx(H1, {}),
  label: "检测到新版本"
};
function Fb({ pageId: n }) {
  switch (n) {
    case "update":
      return /* @__PURE__ */ d.jsx(Xb, {});
    case "home":
      return /* @__PURE__ */ d.jsx(Gp, {});
    case "tools":
      return /* @__PURE__ */ d.jsx(wb, {});
    case "settings":
      return /* @__PURE__ */ d.jsx(Kb, {});
    case "about":
      return /* @__PURE__ */ d.jsx(Hb, {});
    default:
      return /* @__PURE__ */ d.jsx(Gp, {});
  }
}
function Wb() {
  const [n, i] = j.useState(Qb()), [u, c] = j.useState(() => Ra().status === "available" ? "update" : "home"), [r, m] = j.useState(q.get("sidebarCollapsed")), [g, h] = j.useState(() => Ra());
  j.useEffect(() => uy((C) => {
    var w;
    const A = !!((w = document.getElementById("sona-root")) != null && w.isConnected);
    R.debug("Modal visibility changed: %s (root in DOM: %s)", String(C), String(A)), i(C), C && Ra().status === "available" && c("update");
  }), []), j.useEffect(() => cm((C) => {
    h(C), C.status !== "available" && u === "update" && c("home");
  }), [u]);
  const v = j.useMemo(() => g.status === "available" ? [Pb, ...Wp] : Wp, [g.status]), y = () => {
    sy(), R.info("Modal closed");
  }, b = () => {
    m((C) => {
      const A = !C;
      return q.set("sidebarCollapsed", A), A;
    });
  };
  return /* @__PURE__ */ d.jsx(
    oi,
    {
      open: n,
      onClose: y,
      width: 900,
      height: 560,
      children: /* @__PURE__ */ d.jsxs("div", { className: "sona-layout", children: [
        /* @__PURE__ */ d.jsx(
          WS,
          {
            items: v,
            activeId: u,
            onSelect: c,
            collapsed: r,
            onToggle: b
          }
        ),
        /* @__PURE__ */ d.jsx("div", { className: "sona-content", children: /* @__PURE__ */ d.jsx(Fb, { pageId: u }) })
      ] })
    }
  );
}
const _b = {
  info: { badge: "INFO", color: "#43b581", method: "log" },
  warn: { badge: "WARN", color: "#faa61a", method: "warn" },
  error: { badge: "ERROR", color: "#f04747", method: "error" },
  debug: { badge: "DEBUG", color: "#7289da", method: "debug" }
};
function $b(n) {
  const {
    name: i,
    version: u,
    primaryColor: c = "#66ccff",
    accentColor: r = "#43b581"
  } = n, m = `${i}`;
  function g() {
    const v = [
      "color: #fff",
      `background: ${c}`,
      "padding: 4px 8px",
      "border-radius: 4px 0 0 4px",
      "font-weight: bold",
      "font-size: 14px"
    ].join(";"), y = [
      "color: #fff",
      `background: ${r}`,
      "padding: 4px 8px",
      "border-radius: 0 4px 4px 0",
      "font-weight: bold",
      "font-size: 14px"
    ].join(";");
    console.log(
      `%c ${i} ଘ(੭ˊᵕˋ)੭* ੈ✩‧₊˚♫ %c v${u} `,
      v,
      y
    );
  }
  function h(v, y, ...b) {
    const { badge: C, color: A, method: w } = _b[v], L = [
      "color: #fff",
      `background: ${c}`,
      "padding: 2px 6px",
      "border-radius: 3px 0 0 3px",
      "font-weight: bold",
      "font-size: 13px"
    ].join(";"), D = [
      "color: #fff",
      `background: ${A}`,
      "padding: 2px 6px",
      "border-radius: 0 3px 3px 0",
      "font-weight: bold",
      "font-size: 13px"
    ].join(";");
    console[w](
      `%c${m}%c${C}%c ${y}`,
      L,
      D,
      "color: inherit; background: inherit;",
      ...b
    );
  }
  return {
    printBanner: g,
    info: (v, ...y) => h("info", v, ...y),
    warn: (v, ...y) => h("warn", v, ...y),
    error: (v, ...y) => h("error", v, ...y),
    debug: (v, ...y) => h("debug", v, ...y)
  };
}
class eE {
  constructor() {
    Ae(this, "tasks", /* @__PURE__ */ new Set());
    Ae(this, "observer", null);
    Ae(this, "isThrottled", !1);
  }
  /**
   * 注册一个新的注入任务
   * 注册后立即尝试执行一次
   */
  register(i) {
    this.tasks.add(i);
    try {
      i();
    } catch (u) {
      R.error("[Injector] Task failed on register:", u);
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
    this.observer || (R.info("[Injector] Starting global DOM observer..."), this.observer = new MutationObserver(() => {
      this.isThrottled || (this.isThrottled = !0, requestAnimationFrame(() => {
        for (const i of this.tasks)
          try {
            i();
          } catch (u) {
            R.error("[Injector] Task failed:", u);
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
    this.observer && (this.observer.disconnect(), this.observer = null, R.info("[Injector] Global DOM observer stopped"));
  }
}
const tt = new eE(), rm = "sona-entry-btn", tE = "sona-entry-btn--hidden";
let _p = null;
function dm(n, i = q.get("hideSonaIcon")) {
  n.classList.toggle(tE, i), n.setAttribute("aria-hidden", String(i));
}
function aE(n = q.get("hideSonaIcon")) {
  const i = document.getElementById(rm);
  i && dm(i, n);
}
function nE() {
  const n = document.createElement("div");
  n.id = rm, n.className = "sona-entry-btn", dm(n), n.innerHTML = `
    <img class="sona-entry-icon" src="${V1}" alt="Sona" />
    <span class="sona-entry-update-badge" aria-hidden="true">!</span>
  `, n.addEventListener("mousedown", (u) => u.stopPropagation()), n.addEventListener("mouseup", (u) => u.stopPropagation()), n.addEventListener("click", (u) => {
    u.stopPropagation(), iy(), R.info("Modal opened");
  }), uy((u) => {
    n.classList.toggle("sona-entry-btn--active", u);
  });
  const i = () => {
    n.classList.toggle("sona-entry-btn--has-update", Ra().status === "available");
  };
  return i(), cm(i), n;
}
function lE() {
  const n = document.getElementById(rm);
  if (n != null && n.isConnected)
    return dm(n), !0;
  const i = document.querySelector(".play-button-container");
  return i != null && i.parentElement ? (i.parentElement.insertBefore(nE(), i), R.info("Entry button injected ✓ (beside play button)"), !0) : !1;
}
function iE() {
  tt.register(lE), _p || (_p = q.onChange("hideSonaIcon", aE)), tt.start();
}
const sE = "data:image/png;base64,UklGRlIBAABXRUJQVlA4TEUBAAAvDUADENW4qbZtWWhJDUZm+ujoTO7u9sn7Sw6swr38MwVI8Bd4V4Zt20YO3X8WHbdtJEmTf6yUZ2bv/UEVANB0NdtsN85b9RaNvGr8gh2VnWxvzQ0P0e8LGH0mgK9Hm2W3yK9q/4jzsgDdTW30aTUufRduthxX6Xub/lDBwvXAbqvh+TLYodGFvCsXAO56cvmxnE7aB/xf8yiAIB0TPJB/P8hLHUNAwEsAr7eJDB+J8HweEsB4s7uAXwC/+p2cfXUE4PnQR7xP65JZ1jGCzj/JVbca0N+X2DJz0j1Bb3Nc9ZoItwKUvf7IwU4uz7nrgVqunOUvEd4EeeY4YNvWcro7FQQUv5Oxr06aBACPk21rpuq4HAXBusIeoOpVpPidGMNGVYUSbCr+V6G/LxQshmQYqwp12JXWkw2IWNgA61CEUEBGsPMtAA==", uE = "data:image/png;base64,UklGRiIBAABXRUJQVlA4TBYBAAAvDUADEPVArW3rWdR/l6S3KeSHHi4ZCkCPyzJPJfGzoz/5W7Np2+bmKG2pgraNHP5Mf7g3GEARAIBgNNtrtm32Nb7Bi7a93QdsxqvqRrLdbKdYwinO13CJzcIUnOAL29hauX7DmUpI7bqYQi6mQBkWU5DvQIip9j75BYKLFCJIIg1PbaBZDDCWcdDeM+Ifc9jBB9xJ9cOxj72GjbygL1CMeYZsfgeE3csNLqqBKQpBJIEFx8K2LChunzCPv2p4ARldaKHBFS6rQUDVMYseDFeDzuEHpw0PsAeFjiLo1eAVFrp8Yhy9oAQOvOFacBJMdlQKVAIMGvjpCCVB+L+P8CKAm447BDNAgCm89I5nTICXtcPXbTXKDA==", cE = "data:image/png;base64,UklGRu4AAABXRUJQVlA4TOEAAAAvDUADEBq4sW27avovlNUIpoYd40KX3RmQl0KvRCCQ+NPeBo+WhhsAAMEmtm2NWY3JNk5wstms7QPs7r3ANl6w3U5ARQfH2EdBRS8zBFc98p8/1LQoME7wmkiCKrYNv6iIGu7whh+8YurE/neuD385yQaXucZjPnCGAQ7OWprZw3NCexx+8XeG37cbLcITw0ff1FDyOTeGKKWRVUb/W2b78IuKyOAjXxy/gl1zoyZyeX8h+eOjopjBKwvc5+6Nv9zmAZOtZGtWsmcVhdTSz2e+036kaFWRuX0htg1J5DxXiS4A", oE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB4UExURUdwTPDn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0/Dn0zE5cgoAAAAndFJOUwBjAgGA7/sDBGKic502DjGcctR1BlfNMDpUD9cLyF39blZgCMteycoVKjcAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABjSURBVAjXXY9HEsIwFEMfabYpqfSWAkT3vyELZwFfO400KgB4uhrHAsdKeUYamSfoclaDj1rQ8349aUsSnROPmz8UGxwEfXhLx32lDAaNr1l9obbc5WtLjdlG/RfZGXbk74UvTVAKbSM7BuAAAAAASUVORK5CYII=", rE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFWSURBVHjanNGxahRRFAbgm13T2Kyk1NZWBMFOlFRCwMrSyhdInsBX8E32CcTOVsh/iG8w/1EiO/+fIhCSzYzFvZmdWObCuTBwPs7575RxHMtDql7tmJjX0onixAcRazEOxChiLO7BvosJiVg6o5g4dMZGGaMyvomxEmM3se+iiFGcUUQsVfFLE+fOGE1cTzhjNcHWOEcvTPxpaKuM0RkVE+sJtkmLvovSd/FMxC/Xpq0r2tbvOFfi/XziXt+h9B2eztBNQ7eua0oZb52zjCJWSjwR8aM13aFhQsQ7E8WJ5QQ3PN038dyJSzGGBoa23sWEiEcboswznpnx2cSJE6MzbrSDVyLe1EeLhTL2dqsm1kp8dXdWnPgu1gfRXT7iVMRrJR73v3/ey3gk4qOIIxOvnHDDgzMGMW5FDE5ciPiyW5UxmLE1YzTxycTx/Df8l/nvBB9S/wYAuI1dHfraI7kAAAAASUVORK5CYII=", dE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAHPSURBVHjanJJNa1NhEIUnt5SC4FJc6qYbK0V3pX9AFNGtKxXRjX/Chf+hCCouRFprEKlfIW7SLBSU5t7zhuJXNr29522a3N4ZJbqxzeuiaUzc6eIwcxge5gyMhBDkfyQhBFFiV4kwqAfaG2jUByV2h2CRJceVeKZEvciSaSVOKzGjxEklThVMppV4q0S5yJJjfzZ6iHpcUOLT4psXYt7dNu9em3cVI27l2ftIiS9KnFNiLGopbLdFPZpKXDLirHoXjAhKd0aJy0qsfdtqihLREDSPyDzEPC4akRkxZcRdJRaUmFI6Gt15oxOjGwEJMe8i807M46F5rNhmMrGTJZERL5Xuwf7MRWNRjRD1rmTeiRJlJWrqndiWEyXq6vF4AJbUuzEwMjpR4oYSbaU7ovtelDiqREeJq+qdqB+JGkKQnSw+rIQvsuR6r7MurebqZKu5OtnrrEtB3FQiy9PGob8fQJS4Zt59DiHI3k/K9+2P0stb8utHW0IIE+bdVyWujN34dPHOTDdtVLsbjXcrT+7N1qvL87XK0lytsjRXry7PPy/fn83Txofuxtqr8qOFE0MwT+OgRL/I0M/TuJ9vxiFP436exuGgH5mHsRv/Vb8HALH3T81RJ032AAAAAElFTkSuQmCC", fE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGSSURBVHjanJExa9RREMQ3F0QLISpIakUhpLAXQSHYWCgoaKGFhHRWfhALxUrwE1imURsbS+X4zyZCCgNKbjaHXDJ7l0LRO5/FvZj/tXkwvLfFj5l5a6UUO46slGIZ/q3qe723RfQUWBVhIuYUsMPzHxSx0tJNEfcz/KoCixl+RdGYorGD3bAMzIDvRbwT8VbEuohl9fyUiK0kfJ+NjfvbJmJun5iJ+iLDn2f4GwWeKHBOBJIoSX9Q485nwBRYaIMrGX5ttPvFMnwhwz+LKCLu7O00J9XD6QovKfzVEUjviv5UxBkRGxW6JeKSiB9JdDN8XcRQ9M1WRzfRz4ro5hS6LeKyiEGGlwyfiJjU98f25yxOIS9Jv5uBiwoMRC8KjJM+yfBfIkoGnrU6TuNl+MPa5XpO50mG/1X4uLr1k7jQdvydxCPR7Sc3bEicT/qBwovC/9SoRcRjcXaP9xQwhZ+ojjcyDh1RRIxErGW4ZaDTBk1ER4Mty80PJuKl6F9FfMrAaxHLo77bMLyzt9McOR5H/wYABmNXd0d0o0wAAAAASUVORK5CYII=", mE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAG6SURBVHjaVJKxapRREIVn/4hgIRs1gohgo4WgL2AlCCKo+Ai+gL2dINjZWGkjFna+gLVWQWGXnImIRYS42TNEjf8ZQxRcw16L/+5PcmG4F+bOPd+cuWZmlgHLgIkYiDAR50XcEXGzxu2f07WBiNMiroow6wrdWsLiy8i+b46XRKyKKCJmdX+T4SbikegbmvrQWrrtTNZNxFJVuyeiZPh+hs8VKBm4LOKi6H8zvIh4ZkmYoo8jIj7V5KzuLzLckn4p6Xcz/EbSr9v25KMl0WSndj+Jok6tiPgl4kIlGdjBlXQT3UScVPh2dmgz0YuI58l1E3056ccy/IyI43v8bJbhTW38cVX5k+H/OlN8L8N3M7ytubcizoowqxhXRPzO8JL0ueglw+cZKEnfr85+EHGqx66HayKeZPhDBR5k+Ov6yMLF9yKWtbVmIpp+jmZmbcCS3nQ942nSiwJFxGqGn8twU6BR91F61EbE0XYysuri7qKnlhj+mIxNRJOBbnz0Tm1nc9yblOG3atE7ESvtFkzsc3YIU8RBd1+J2FBg5QBNd2eKQ6Nc4JqIEyJetsTw29dRLermnAu8uv4PALICHRChyaA4AAAAAElFTkSuQmCC", gE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADkUExURUdwTPDm0u/m0+/m0u/m0u/m0u/m0u/m0u/m0u/m0u/m0u/m0+/m0u/m0u/m0u/m0+/m0u/m0u/m0+/m0u/m0u/m0u/m0u/m0vDm0u/m0u/m0+/m0u/m0u/m0u/m0u/n0+/m0u/m0u/m0+/m0/Dm0u/n0u/m0u/m0u/m0u/n0+/m0u/m0u/m0u/m0u/m0+/m0+/m0u/m0u/m0u/m0u/m0u/m0u/m0u/m0u/m0u7j0+/m0u3j0+/m0vDm0u/m0u/m0u/l0+/m0u/m0u/m0u/m0vDn0/Dm0vDm0+/m0+/n0vDn0u/m0uooK2UAAABFdFJOUwCEBNEFHvIEpTZN/KjbeeE74GAcokoboSAlrNl3/d7pHySrEC78ON3iKezSngM4xvvf8cMzXIAMMgEQAZ+zCIgDXqY+hSBjQloAAAAJcEhZcwAADsIAAA7CARUoSoAAAACCSURBVAgdLcEFAoJQEAXAp4KA3d3d3V2Ldf/7uC5/Bo6RBeB+PkFkxnMdu6P3ir964PM115vD7QHmdvmJJittu7+AxbzEZksIK0xiugAz0jYJezAEoLdJyacANHqklLsAKiVSgnEAmvkmR8IAi3RIRFsQvn7x+Wp6klCyoVytUAX7AXh1Gh7Rr6e3AAAAAElFTkSuQmCC", hE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFiSURBVHjanJI9SmxREISPM0YG/iVvCQaCgiAYiAYKL3iYvlBwFSa6EHeggbgAUQNjxWpE3gKmWnmDUy0iis7cY3Cvd+4YGhSH0/RHVfc5KeecfqKUc05Byw0VQcsi+iI2w21TxIlos6Il0Vo1KOJPQ1sidkRbCGIlaI9yy3I7FW1KtKGjHEdyHMpxJOJAjukg5kR0wy0H8V7DblPNqGfhdhG0u3DbDmIuhlBfbjncSpg4bjpuiFgULfU69kvEbZRNH1FC/fJu/+X43ZyxEPG318GMiH8V1K+gQZQxJbe1cBvZ6qIckyIuq6Yvp6KGiPUgUjjaDRApiPlwvIhWVEBRxXuqIWL8kRhxHA9aCmI3HDncPjQE30SsikiiteQ2NuLYfbhLz53rVjjOxXIh+pqPuBGxLMdE7/4qfY/aqs6lcDxVcBFuhWgDEUVZx/4I+MqbFLR2+a2w13yGbzN3a/An+hwAFPptmYU9Y5wAAAAASUVORK5CYII=", pE = {
  dmg_dealt: sE,
  dmg_taken: uE,
  healing: cE,
  shielding: oE,
  tenacity: rE,
  ability_haste: dE,
  attack_speed: fE,
  energy_regen: mE,
  mana_regen: gE,
  movement_speed: hE
}, yE = {
  dmg_dealt: "造成伤害",
  dmg_taken: "承受伤害",
  healing: "治疗效果",
  shielding: "护盾效果",
  tenacity: "韧性",
  ability_haste: "技能急速",
  attack_speed: "成长攻速",
  energy_regen: "能量回复",
  mana_regen: "法力回复",
  movement_speed: "移动速度"
}, vE = [
  "dmg_dealt",
  "dmg_taken",
  "healing",
  "shielding",
  "attack_speed",
  "ability_haste",
  "movement_speed",
  "tenacity",
  "mana_regen",
  "energy_regen"
];
function AE(n) {
  const i = n.toLowerCase();
  return i === "aram" || i === "kiwi" ? "aram" : i === "urf" || i === "arurf" ? "urf" : i === "oneforall" || i === "ofa" ? "ofa" : i === "nexusblitz" || i === "nb" ? "nb" : i === "cherry" || i === "arena" ? "ar" : i === "ultbook" || i === "usb" ? "usb" : null;
}
class SE {
  constructor(i) {
    Ae(this, "manager");
    Ae(this, "root");
    Ae(this, "container");
    Ae(this, "tooltip");
    Ae(this, "caption");
    Ae(this, "content");
    this.manager = i;
    const u = document.createElement("div");
    u.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;overflow:visible;z-index:19001;"), this.root = u;
    const c = document.createElement("div");
    c.setAttribute("style", "position:absolute;opacity:0;pointer-events:none;transition:opacity 0.2s;"), u.appendChild(c), this.container = c;
    const r = document.createElement("lol-uikit-tooltip");
    r.setAttribute("data-tooltip-position", "right"), c.appendChild(r), this.tooltip = r;
    const m = document.createElement("div");
    m.setAttribute("style", "background:#1a1c21;direction:ltr;width:240px;font-family:var(--font-body);-webkit-font-smoothing:subpixel-antialiased;color:#a09b8c;font-size:12px;font-weight:400;letter-spacing:.025em;line-height:16px;"), r.appendChild(m);
    const g = document.createElement("div");
    g.setAttribute("style", "min-width:200px;padding:14px 18px;"), m.appendChild(g);
    const h = document.createElement("div");
    h.setAttribute("style", "margin-bottom:10px;color:#f0e6d2;font-size:13px;font-weight:700;letter-spacing:.075em;line-height:18px;text-transform:uppercase;border-bottom:1px solid #3c3c41;padding-bottom:6px;"), g.appendChild(h), this.caption = h;
    const v = document.createElement("div");
    g.appendChild(v), this.content = v;
  }
  show(i, u, c, r) {
    this.caption.textContent = c, this.content.innerHTML = r, this.root.isConnected || this.manager.appendChild(this.root), this.tooltip.setAttribute("data-tooltip-position", u);
    const m = i.getBoundingClientRect();
    let g = 0, h = 0;
    u === "right" ? (g = m.right + 5, h = m.bottom - (m.height + this.container.offsetHeight) / 2) : (h = m.bottom, g = m.right - (m.width + this.container.offsetWidth) / 2), this.container.style.left = `${g}px`, this.container.style.top = `${h}px`, this.container.style.opacity = "1";
  }
  hide() {
    this.container.style.opacity = "0";
  }
  destroy() {
    this.container.style.opacity = "0", this.root.remove();
  }
}
function bE(n) {
  const i = (n - 1) * 100, u = parseFloat(i.toFixed(2)) + "%";
  return n >= 1 ? "+" + u : u;
}
function cy(n) {
  return n === "ability_haste";
}
function EE(n, i) {
  return n === "dmg_taken" ? i < 1 : cy(n) ? i >= 0 : i >= 1;
}
function TE(n) {
  const i = [];
  for (const c of vE) {
    const r = n[c];
    typeof r == "number" && i.push([c, r]);
  }
  return i.length === 0 ? '<div style="color:#746e64;font-style:italic;">无平衡调整（原版数值）</div>' : i.map(([c, r]) => {
    const m = yE[c] ?? c, g = pE[c], h = EE(c, r) ? "#5bbd72" : "#e84749", v = cy(c) ? r >= 0 ? `+${r}` : `${r}` : bE(r);
    return `
      <div style="display:flex;align-items:center;margin-bottom:4px;line-height:18px;">
        <span style="display:flex;align-items:center;flex:1;">
          ${g ? `<img src="${g}" width="14" height="14" alt="" style="margin-right:6px;vertical-align:middle;" />` : ""}<span>${m}</span>
        </span>
        <span style="color:${h};font-weight:bold;">${v}</span>
      </div>
    `;
  }).join("");
}
let ut = null, Xt = null, Hl = null, Af = !1, cn = null, Sf = "", Ts = -2, Fd = null;
function Qc(n) {
  var c;
  if (n <= 0 || !Xt) return null;
  const i = fb(n);
  if (!i) return null;
  const u = ((c = i.stats) == null ? void 0 : c[Xt.dataKey]) ?? {};
  return {
    caption: `${Xt.displayName} · 平衡调整`,
    content: TE(u)
  };
}
const pn = "data-sona-balance-hover";
function CE(n) {
  const i = n.querySelector('img[src*="champion-icons"]');
  if (i) {
    const r = i.getAttribute("src") || "", m = r.match(/champion-icons\/(\d+)\.png/);
    if (m)
      return R.debug("[BalanceBuff] extractFromWrapper: 从<img>提取 championId=%s (src=%s)", m[1], r), Number(m[1]);
    R.debug("[BalanceBuff] extractFromWrapper: 找到<img>但src不匹配 (src=%s)", r);
  } else
    R.debug("[BalanceBuff] extractFromWrapper: 未找到 img[src*=champion-icons]");
  const u = n.querySelector(".champion-icon-container") ?? n.querySelector(".champion-icon");
  if (u) {
    let r = u.style.backgroundImage || "";
    if (!r || !r.includes("champion-icons")) {
      const g = u.querySelector('[style*="champion-icons"]');
      r = (g == null ? void 0 : g.style.backgroundImage) || "";
    }
    R.debug("[BalanceBuff] extractFromWrapper: 找到iconContainer (class=%s, bg=%s)", u.className, r);
    const m = r.match(/champion-icons\/(\d+)\.png/);
    if (m)
      return R.debug("[BalanceBuff] extractFromWrapper: 从background-image提取 championId=%s", m[1]), Number(m[1]);
    R.debug("[BalanceBuff] extractFromWrapper: iconContainer内background-image不匹配");
  } else
    R.debug("[BalanceBuff] extractFromWrapper: 未找到 .champion-icon-container 或 .champion-icon");
  const c = n.querySelectorAll("img");
  return c.length > 0 && R.debug("[BalanceBuff] extractFromWrapper: wrapper内所有img: %o", Array.from(c).map((r) => ({ src: r.getAttribute("src"), alt: r.getAttribute("alt") }))), R.debug("[BalanceBuff] extractFromWrapper: 无法提取championId，wrapper.innerHTML片段=%s", n.innerHTML.substring(0, 300)), null;
}
function NE(n) {
  var c;
  const i = n.querySelector('img[src*="champion-icons"]');
  if (i) {
    const r = (c = i.getAttribute("src")) == null ? void 0 : c.match(/champion-icons\/(\d+)\.png/);
    if (r) return Number(r[1]);
  }
  const u = n.querySelector(".bench-champion-background");
  if (u) {
    const m = (u.style.backgroundImage || "").match(/champion-icons\/(\d+)\.png/);
    if (m) return Number(m[1]);
  }
  return null;
}
function fm() {
  if (Fd) return Fd;
  const n = /* @__PURE__ */ new Map();
  for (const i of ty())
    i.name && n.set(i.name.trim(), i.id), i.title && n.set(i.title.trim(), i.id), i.alias && n.set(i.alias.trim(), i.id);
  return Fd = n, n;
}
function ME(n) {
  var c, r, m;
  const i = n, u = (c = i.textContent) == null ? void 0 : c.trim();
  if (u && u.length > 1 && u.length < 25) return u;
  for (const g of ['[class*="name"]', '[class*="label"]', "span", "p"]) {
    const h = (m = (r = i.querySelector(g)) == null ? void 0 : r.textContent) == null ? void 0 : m.trim();
    if (h && h.length > 1 && h.length < 25) return h;
  }
  return null;
}
function xE(n) {
  const i = ME(n);
  return i ? { championId: fm().get(i) ?? null, name: i } : { championId: null, name: null };
}
function oy() {
  if (!ut || !Xt) return !0;
  R.debug("[BalanceBuff] tryBindHover: tooltip=%s, mode=%s", !!ut, Xt.dataKey);
  const n = document.querySelector(".summoner-array.your-party");
  if (n) {
    const u = n.querySelectorAll(".summoner-container-wrapper");
    R.debug("[BalanceBuff] tryBindHover: 找到party, wrappers=%d个", u.length), u.forEach((c) => {
      c.hasAttribute(pn) || (c.setAttribute(pn, "team"), c.addEventListener("mouseenter", () => {
        const r = CE(c);
        if (R.debug("[BalanceBuff] mouseenter: champId=%d", r ?? -1), !r || r <= 0) return;
        const m = Qc(r);
        m && ut.show(c, "right", m.caption, m.content);
      }), c.addEventListener("mouseleave", () => ut.hide()));
    });
  } else
    R.debug("[BalanceBuff] tryBindHover: 未找到 .summoner-array.your-party");
  const i = document.querySelectorAll(".bench-container .champion-bench-item");
  return R.debug("[BalanceBuff] tryBindHover: bench元素=%d个", i.length), i.forEach((u) => {
    u.hasAttribute(pn) || (u.setAttribute(pn, "bench"), u.addEventListener("mouseenter", () => {
      const c = NE(u);
      if (R.debug("[BalanceBuff] mouseenter bench: champId=%d", c ?? -1), !c || c <= 0) return;
      const r = Qc(c);
      r && ut.show(u, "bottom", r.caption, r.content);
    }), u.addEventListener("mouseleave", () => ut.hide()));
  }), IE(), !0;
}
function Wd(n) {
  n !== Sf && (Sf = n, R.info("[BalanceBuff] %s", n));
}
function IE() {
  if (!ut || !Xt) {
    Wd(`网格观察者未就绪 → tooltip=${!!ut}, currentMode=${Xt ? Xt.dataKey : "null"}`);
    return;
  }
  const n = document.querySelector(".champion-cards-component-wrapper");
  if (!n) {
    const u = document.querySelectorAll(".champion-card-component").length;
    u > 0 ? Wd(`有 ${u} 张 .champion-card-component 卡片，但未找到 .champion-cards-component-wrapper（请检查选择器）`) : Wd("英雄网格尚未渲染（卡片数=0），等待 DOM 出现");
    return;
  }
  if (n.hasAttribute(pn)) return;
  n.setAttribute(pn, "cards-wrapper"), fm();
  const i = n.querySelectorAll(".champion-card-component").length;
  R.info(
    "[BalanceBuff] ✓ 已绑定英雄网格 card-hovered 观察者（wrapper 命中，初始卡片数=%d，模式=%s）",
    i,
    Xt.displayName
  ), cn == null || cn.disconnect(), cn = new MutationObserver(() => {
    if (!ut || !Xt) return;
    const u = n.querySelector(".champion-card-component.card-hovered");
    if (!u) {
      Ts !== -2 && (R.info("[BalanceBuff] 网格 hover 离开 → 隐藏"), Ts = -2), ut.hide();
      return;
    }
    const { championId: c, name: r } = xE(u);
    if ((c ?? -1) !== Ts && (Ts = c ?? -1, R.info(
      "[BalanceBuff] 网格 hover → %s (championId=%d, hasData=%s)",
      r ?? "?",
      c ?? -1,
      c ? !!Qc(c) : !1
    )), !c || c <= 0) {
      ut.hide();
      return;
    }
    const m = Qc(c);
    m ? ut.show(u, "right", m.caption, m.content) : ut.hide();
  }), cn.observe(n, { subtree: !0, attributes: !0, attributeFilter: ["class"] });
}
async function $p() {
  var m, g, h, v;
  R.debug("[BalanceBuff] mountForChampSelect 开始");
  let n = "", i = 0;
  try {
    const y = await _.getGameflowSession();
    n = ((g = (m = y.gameData) == null ? void 0 : m.queue) == null ? void 0 : g.gameMode) || "", i = ((v = (h = y.gameData) == null ? void 0 : h.queue) == null ? void 0 : v.id) || 0, R.debug("[BalanceBuff] getGameflowSession: gameMode=%s, queueId=%d", n, i);
  } catch (y) {
    R.debug("[BalanceBuff] getGameflowSession 失败: %o", y);
  }
  const u = AE(n);
  if (!u) {
    R.info("[BalanceBuff] 当前模式 %s 不支持，跳过", n);
    return;
  }
  const c = i > 0 ? di(i) : n;
  Xt = { dataKey: u, displayName: c }, R.info("[BalanceBuff] 进入选人阶段 → %s (gameMode=%s, queueId=%d, dataKey=%s)", c, n, i, u);
  const r = document.getElementById("lol-uikit-layer-manager-wrapper");
  if (!r) {
    R.warn("[BalanceBuff] 未找到 layer-manager-wrapper，延迟挂载");
    return;
  }
  ut = new SE(r), fm(), tt.register(oy), Af = !0;
}
function Ac() {
  R.debug("[BalanceBuff] unmountForChampSelect 执行"), Af && (tt.unregister(oy), Af = !1), cn && (cn.disconnect(), cn = null), Sf = "", Ts = -2, ut && (ut.destroy(), ut = null), document.querySelectorAll(`[${pn}]`).forEach((n) => n.removeAttribute(pn)), Xt = null;
}
function e1(n) {
  R.debug("[BalanceBuff] updateBalanceBuffTooltip: enabled=%s, phaseUnsub=%s", n, !!Hl), n && !Hl ? (Hl = _.observe(oa.GAMEFLOW_PHASE_CHANGE, (i) => {
    i.data === "ChampSelect" ? (Ac(), $p()) : Ac();
  }), _.getGameflowPhase().then((i) => {
    R.debug("[BalanceBuff] 启动时当前阶段=%s", i), i === "ChampSelect" && (Ac(), $p());
  }).catch(() => {
  }), R.info("[BalanceBuff] 平衡性调整 buff 提示已启用 ✓")) : !n && Hl && (Hl(), Hl = null, Ac(), R.info("[BalanceBuff] 平衡性调整 buff 提示已禁用"));
}
const vo = 0, Gs = 100, Zc = 50, bf = 3, ry = 16, kE = 1.22, t1 = hy(Zc), mm = {
  recencyHalfLife: 18,
  minConfidenceGames: 3,
  fullConfidenceGames: 16,
  trimOutliers: !0,
  skipEarlySurrender: !0,
  skipAfkTeammate: !0
}, gm = {
  combat: 0.26,
  win: 0.12,
  damage: 0.18,
  economy: 0.11,
  objectives: 0.1,
  vision: 0.08,
  durability: 0.09,
  farming: 0.06
}, RE = {
  legendary: "天籁主宰",
  carry: "核心大腿",
  strong: "稳定强点",
  reliable: "可靠队友",
  balanced: "均衡发挥",
  unstable: "状态摇摆",
  risky: "高风险点",
  critical: "需要照顾"
};
function dy(n) {
  return RE[n];
}
function fy(n, i, u = {}) {
  const c = { ...mm, ...u }, r = n.map((H) => wE(H, i, c)).filter((H) => H !== null);
  if (r.length === 0)
    return null;
  const m = c.trimOutliers ? YE(r.map((H) => H.score)) : r.map((H) => H.score), g = r.map((H, F) => PE(F, c.recencyHalfLife)), h = Yl(m, g), v = ZE(m), y = JE(m), b = QE(r.length, c), C = rt((v - 50) * 0.012, -0.6, 0.6), A = rt((y - 50) * 0.01, -0.5, 0.5), w = 0.57 + b * 0.43, L = rt(
    t1 + (h - t1) * w + C + A,
    bf,
    ry
  ), D = my(L);
  return {
    puuid: i,
    score: L,
    rawScore: h,
    confidence: b,
    validGames: r.length,
    winRate: Yl(r.map((H) => H.win ? 1 : 0), g),
    averageKda: Yl(r.map((H) => H.metrics.kda), g),
    averageKillParticipation: Yl(
      r.map((H) => H.metrics.killParticipation),
      g
    ),
    averageDamageShare: Yl(r.map((H) => H.metrics.damageShare), g),
    consistencyScore: v,
    trendScore: y,
    grade: D,
    gradeLabel: dy(D),
    verdict: UE(L, b),
    breakdown: VE(r, g),
    games: r
  };
}
function wE(n, i, u = {}) {
  const c = { ...mm, ...u }, r = n.json.participants.find((oe) => oe.puuid === i);
  if (!r || gy(n, r, c))
    return null;
  const m = n.json.participants.filter((oe) => oe.teamId === r.teamId);
  if (m.length === 0)
    return null;
  const g = DE(n, r), h = XE(gm), v = Math.max((r.timePlayed || n.json.gameDuration || 1) / 60, 1), y = on(m, (oe) => oe.kills), b = on(m, (oe) => oe.totalDamageDealtToChampions), C = on(m, (oe) => oe.goldEarned), A = on(m, (oe) => oe.damageDealtToObjectives), w = on(m, (oe) => oe.totalDamageTaken), L = Ic(r.kills), D = Ic(r.deaths), H = Ic(r.assists), F = L + H, V = Qt(r, "kda") || (L + H) / Math.max(D, 1), X = rt(
    Qt(r, "killParticipation") || Et(F, y),
    0,
    1
  ), Q = rt(
    Qt(r, "teamDamagePercentage") || Et(r.totalDamageDealtToChampions, b),
    0,
    1
  ), Z = rt(Et(r.goldEarned, C), 0, 1), W = rt(
    Qt(r, "damageTakenOnTeamPercentage") || Et(r.totalDamageTaken, w),
    0,
    1
  ), z = Et(r.totalMinionsKilled + r.neutralMinionsKilled, v), Y = Qt(r, "visionScorePerMinute") || Et(r.visionScore, v), pe = {
    combat: OE({ kda: V, killParticipation: X, deaths: D, minutes: v }),
    win: zE(n, r),
    damage: BE(g, r, v, Q),
    economy: jE(g, r, v, Q, Z),
    objectives: LE(g, r, v, A),
    vision: GE(g, r, v, Y),
    durability: qE(g, r, v, W),
    farming: KE(g, z)
  };
  return {
    gameId: n.json.gameId,
    championId: r.championId,
    role: g,
    win: r.win,
    placement: r.placement || r.subteamPlacement || 0,
    score: hy(HE(pe, h)),
    breakdown: pe,
    metrics: {
      kills: L,
      deaths: D,
      assists: H,
      kda: V,
      killParticipation: X,
      damageShare: Q,
      goldShare: Z,
      csPerMinute: z,
      visionPerMinute: Y
    }
  };
}
function hm(n, i, u = {}) {
  const c = n.json.participants.find((r) => r.puuid === i);
  return c ? gy(n, c, { ...mm, ...u }) : !0;
}
function pm(n, i) {
  if (!Number.isFinite(i) || i <= 0) return n;
  const u = `q_${i}`;
  return n.filter((c) => {
    var r;
    return c.json.queueId === i || ((r = c.metadata.tags) == null ? void 0 : r.includes(u));
  });
}
function my(n) {
  return n >= 15 ? "legendary" : n >= 13.5 ? "carry" : n >= 12 ? "strong" : n >= 10.8 ? "reliable" : n >= 9.5 ? "balanced" : n >= 8 ? "unstable" : n >= 6.3 ? "risky" : "critical";
}
function UE(n, i = 1) {
  const u = i < 0.55 ? "样本偏少，暂评" : "", c = dy(my(n));
  return `${u}${c}`;
}
function DE(n, i) {
  const u = n.json.gameMode;
  if (u === "ARAM") return "ARAM";
  if (u === "CHERRY" || u === "STRAWBERRY") return "SPECIAL";
  const c = (i.teamPosition || i.individualPosition || i.lane || "").toUpperCase();
  return c === "TOP" ? "TOP" : c === "JUNGLE" ? "JUNGLE" : c === "MIDDLE" || c === "MID" ? "MIDDLE" : c === "BOTTOM" || c === "BOT" ? "BOTTOM" : c === "UTILITY" || c === "SUPPORT" ? "UTILITY" : "UNKNOWN";
}
function OE(n) {
  const i = dt(Math.log1p(n.kda), Math.log1p(1.1), Math.log1p(6.2)), u = dt(n.killParticipation, 0.32, 0.72), c = 1 - dt(Et(n.deaths, n.minutes), 0.18, 0.72);
  return $n(i * 0.38 + u * 0.42 + c * 0.2);
}
function zE(n, i) {
  const u = n.json.gameMode, c = i.placement || i.subteamPlacement || 0;
  return (u === "CHERRY" || u === "STRAWBERRY") && c > 0 ? c <= 1 ? 100 : c <= 2 ? 86 : c <= 4 ? 64 : 18 : i.win ? 100 : 18;
}
function BE(n, i, u, c) {
  const m = dt(c, n === "UTILITY" ? 0.06 : 0.1, n === "UTILITY" ? 0.2 : n === "ARAM" ? 0.26 : 0.29), g = Qt(i, "damagePerMinute") || Et(i.totalDamageDealtToChampions, u), h = Ao(n, {
    TOP: 650,
    JUNGLE: 560,
    MIDDLE: 730,
    BOTTOM: 760,
    UTILITY: 360,
    ARAM: 950,
    SPECIAL: 720,
    UNKNOWN: 620
  }), v = dt(g, h * 0.42, h);
  return $n(m * 0.68 + v * 0.32);
}
function jE(n, i, u, c, r) {
  const m = Qt(i, "goldPerMinute") || Et(i.goldEarned, u), g = Ao(n, {
    TOP: 420,
    JUNGLE: 390,
    MIDDLE: 430,
    BOTTOM: 455,
    UTILITY: 285,
    ARAM: 470,
    SPECIAL: 430,
    UNKNOWN: 395
  }), h = dt(m, g * 0.58, g), v = r > 0 ? c / r : 0, y = dt(v, 0.55, n === "UTILITY" ? 1.05 : 1.28);
  return $n(y * 0.56 + h * 0.44);
}
function LE(n, i, u, c) {
  const r = Et(i.damageDealtToObjectives, c), m = Et(i.damageDealtToObjectives, u), g = Qt(i, "dragonTakedowns") + Qt(i, "baronTakedowns"), h = Qt(i, "turretTakedowns") || i.turretTakedowns, y = dt(m, 20, n === "JUNGLE" ? 360 : n === "BOTTOM" ? 290 : 230), b = dt(r, 0.08, n === "JUNGLE" ? 0.45 : 0.32), C = dt(g * 0.9 + h * 0.45, 0, 2.2);
  return $n(y * 0.38 + b * 0.32 + C * 0.3);
}
function GE(n, i, u, c) {
  const r = Ao(n, {
    TOP: 0.75,
    JUNGLE: 0.95,
    MIDDLE: 0.75,
    BOTTOM: 0.65,
    UTILITY: 1.65,
    ARAM: 0.28,
    SPECIAL: 0.25,
    UNKNOWN: 0.75
  }), m = dt(c, r * 0.28, r), g = Et(
    i.wardsPlaced + i.wardsKilled + i.detectorWardsPlaced * 1.5 + Qt(i, "wardTakedowns") * 0.6 + Qt(i, "wardsGuarded") * 0.4,
    u
  ), h = dt(g, 0.05, n === "UTILITY" ? 0.75 : 0.35);
  return $n(m * 0.72 + h * 0.28);
}
function qE(n, i, u, c) {
  const r = Et(i.deaths, u), m = 1 - dt(r, 0.16, 0.7), h = dt(c, 0.08, n === "TOP" || n === "UTILITY" ? 0.32 : 0.24), v = Et(
    i.damageSelfMitigated + i.totalHeal * 0.35 + i.totalHealsOnTeammates * 0.8 + i.totalDamageShieldedOnTeammates,
    u
  ), y = n === "UTILITY" || n === "TOP" ? 820 : 560, b = dt(v, y * 0.18, y);
  return $n(m * 0.46 + h * 0.32 + b * 0.22);
}
function KE(n, i) {
  const u = Ao(n, {
    TOP: 7.2,
    JUNGLE: 5.8,
    MIDDLE: 7.4,
    BOTTOM: 7.8,
    UTILITY: 1.3,
    ARAM: 4.2,
    SPECIAL: 4.5,
    UNKNOWN: 6.2
  });
  return $n(dt(i, u * 0.35, u));
}
function HE(n, i) {
  return rt(
    Object.entries(i).reduce((u, [c, r]) => u + n[c] * r, 0),
    0,
    100
  );
}
function VE(n, i) {
  return Object.keys(gm).reduce((c, r) => (c[r] = Yl(n.map((m) => m.breakdown[r]), i), c), {});
}
function XE(n) {
  const i = on(Object.values(n), (u) => u);
  return i <= 0 ? gm : Object.entries(n).reduce((u, [c, r]) => (u[c] = r / i, u), {});
}
function Ao(n, i) {
  return i[n] ?? i.UNKNOWN;
}
function QE(n, i) {
  const u = Math.max(i.fullConfidenceGames - i.minConfidenceGames, 1);
  return 0.35 + rt((n - i.minConfidenceGames) / u, 0, 1) * 0.65;
}
function ZE(n) {
  if (n.length <= 1) return Zc;
  const i = FE(n);
  return rt(100 - i * 14, vo, Gs);
}
function JE(n) {
  if (n.length < 8) return Zc;
  const i = Jc(n.slice(0, 5)), u = Jc(n.slice(5));
  return rt(Zc + (i - u) * 6.5, vo, Gs);
}
function YE(n) {
  if (n.length < 8) return n;
  const i = [...n].sort((r, m) => r - m), u = a1(i, 0.05), c = a1(i, 0.95);
  return n.map((r) => rt(r, u, c));
}
function PE(n, i) {
  return Math.pow(0.5, n / Math.max(i, 1));
}
function a1(n, i) {
  if (n.length === 0) return 0;
  const u = i * (n.length - 1), c = Math.floor(u), r = Math.ceil(u);
  if (c === r) return n[c];
  const m = u - c;
  return n[c] + (n[r] - n[c]) * m;
}
function FE(n) {
  if (n.length === 0) return 0;
  const i = Jc(n), u = Jc(n.map((c) => Math.pow(c - i, 2)));
  return Math.sqrt(u);
}
function Yl(n, i) {
  const u = on(i, (c) => c);
  return n.length === 0 || u <= 0 ? 0 : n.reduce((c, r, m) => c + r * (i[m] ?? 1), 0) / u;
}
function Jc(n) {
  return n.length === 0 ? 0 : on(n, (i) => i) / n.length;
}
function on(n, i) {
  return n.reduce((u, c) => u + Ic(i(c)), 0);
}
function Qt(n, i) {
  var c;
  const u = (c = n.challenges) == null ? void 0 : c[i];
  return typeof u == "number" && Number.isFinite(u) ? u : 0;
}
function n1(n, i) {
  var c;
  const u = (c = n.challenges) == null ? void 0 : c[i];
  return u === !0 || typeof u == "number" && u > 0;
}
function gy(n, i, u) {
  return u.skipEarlySurrender && (i.gameEndedInEarlySurrender || i.teamEarlySurrendered) ? !0 : u.skipAfkTeammate && WE(n, i);
}
function WE(n, i) {
  return n1(i, "hadAfkTeammate") ? !0 : n.json.participants.some((u) => u.teamId === i.teamId && u.puuid !== i.puuid && n1(u, "hadAfkTeammate"));
}
function dt(n, i, u) {
  return u === i ? n >= u ? 1 : 0 : rt((n - i) / (u - i), 0, 1);
}
function Et(n, i) {
  return i > 0 ? n / i : 0;
}
function Ic(n) {
  return Number.isFinite(n) ? n : 0;
}
function $n(n) {
  return rt(n * 100, vo, Gs);
}
function hy(n) {
  const i = rt(n, vo, Gs) / Gs, u = rt(0.5 + (i - 0.5) * kE, 0, 1);
  return bf + u * (ry - bf);
}
function rt(n, i, u) {
  return Math.min(u, Math.max(i, n));
}
const Ef = "data-sona-lobby-history", Tf = "data-sona-lobby-stats", l1 = "data-sona-lobby-stats-text", _E = [
  "button",
  "a",
  "input",
  "textarea",
  "select",
  '[role="button"]',
  "lol-uikit-flat-button",
  "lol-uikit-icon-button"
].join(","), $E = 120;
let Vn = !1, _d = !1, Sc = null, Yc = /* @__PURE__ */ new Map(), Rs = 0, ii = /* @__PURE__ */ new Map(), gs = null, Cf = /* @__PURE__ */ new Map(), Nf = [], rn = null, dn = null;
function e2(n, i, u) {
  dn || (dn = document.createElement("div"), dn.id = "sona-lobby-member-match-history-root", document.body.appendChild(dn), rn = bn.createRoot(dn));
  const c = () => {
    rn == null || rn.render(
      j.createElement(Wn, { open: !1, onClose: c, puuid: "", playerName: "" })
    );
  };
  rn.render(
    j.createElement(Wn, { open: !0, onClose: c, puuid: n, playerName: i, queueId: u })
  );
}
function t2() {
  rn && (rn.unmount(), rn = null), dn && (dn.remove(), dn = null);
}
async function a2(n, i) {
  const u = Cf.get(n);
  if (u) return u;
  try {
    const c = await _.getSummonerByPuuid(n), r = c.gameName && c.tagLine ? `${c.gameName}#${c.tagLine}` : i;
    return Cf.set(n, r), r;
  } catch {
    return i;
  }
}
function Pc(n) {
  var u;
  const i = /* @__PURE__ */ new Map();
  Rs = ((u = n == null ? void 0 : n.gameConfig) == null ? void 0 : u.queueId) ?? 0;
  for (const c of (n == null ? void 0 : n.members) ?? []) {
    const r = {
      puuid: c.puuid,
      summonerId: c.summonerId,
      name: c.summonerName || `召唤师 ${c.summonerId}`
    };
    c.puuid && i.set(`puuid:${c.puuid}`, r), c.summonerId && i.set(`summoner:${c.summonerId}`, r);
  }
  Yc = i;
}
async function n2() {
  return gs || (gs = l2().finally(() => {
    gs = null;
  }), gs);
}
async function l2() {
  const n = [...new Map(
    [...Yc.values()].filter((c) => c.puuid).map((c) => [c.puuid, c])
  ).values()], i = yo(Rs), u = /* @__PURE__ */ new Map();
  await Promise.all(n.map(async (c) => {
    try {
      const m = (await _.getSgpMatchHistory(c.puuid, {
        startIndex: 0,
        count: q.get("lobbyEnhancementFetchCount") || 50,
        tag: i || void 0
      })).games ?? [], g = pm(m, Rs);
      let h = 0, v = 0, y = 0, b = 0, C = 0;
      for (const w of g) {
        const L = w.json.participants.find((D) => D.puuid === c.puuid);
        L && (hm(w, c.puuid) || (h++, L.win && v++, y += L.kills, b += L.assists, C += L.deaths));
      }
      if (h === 0) return;
      const A = fy(g, c.puuid);
      u.set(c.puuid, {
        winRate: v / h,
        kda: C === 0 ? y + b : (y + b) / C,
        score: (A == null ? void 0 : A.score) ?? null,
        total: h
      }), R.debug(
        "[LobbyHistory] %s 当前模式有效 %d 场 / 返回 %d 场 (queueId=%d)",
        c.name,
        h,
        m.length,
        Rs
      );
    } catch (r) {
      R.debug("[LobbyHistory] 拉取成员战绩失败: %s", c.name, r);
    }
  })), Vn && (ii = u, Fc());
}
async function i1() {
  try {
    const n = await _.getLobby();
    if (!Vn) return;
    Pc(n), Fc(), n2();
  } catch {
    Pc(null), ii.clear();
  }
}
function i2(n) {
  const i = n.getAttribute("puuid") || "", u = Number(n.getAttribute("summoner-id") || 0);
  return Yc.get(`puuid:${i}`) ?? Yc.get(`summoner:${u}`) ?? null;
}
function s1(n, i) {
  const u = n.getBoundingClientRect();
  return i.clientY >= u.bottom - $E;
}
function u1(n) {
  return n instanceof Element && !!n.closest(_E);
}
function s2(n) {
  return n >= 0.6 ? "#5bbd72" : n >= 0.5 ? "#c8aa6e" : "#e74c3c";
}
function u2(n) {
  return n >= 4 ? "#5bbd72" : n >= 2.5 ? "#c8aa6e" : "#e74c3c";
}
function c2(n) {
  return n >= 14.5 ? "#5bbd72" : n >= 11.2 ? "#c8aa6e" : "#e74c3c";
}
function o2(n) {
  let i = n.querySelector(`[${Tf}]`);
  return i || (i = document.createElement("div"), i.setAttribute(Tf, "true"), i.style.cssText = [
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
  ].join(";"), n.appendChild(i), i);
}
function c1(n, i) {
  const u = o2(n), c = i ? [
    `胜率 ${Math.round(i.winRate * 100)}%`,
    `KDA ${i.kda >= 99 ? "完美" : i.kda.toFixed(2)}`,
    `评分 ${i.score != null ? i.score.toFixed(1) : "--"}`
  ].join("|") : "战绩加载中...";
  if (u.getAttribute(l1) !== c) {
    if (u.setAttribute(l1, c), !i) {
      u.innerHTML = '<span style="color:#a09b8c">战绩加载中...</span>';
      return;
    }
    u.innerHTML = [
      `<span style="color:${s2(i.winRate)}">胜率 ${Math.round(i.winRate * 100)}%</span>`,
      '<span style="color:#5c5b57">|</span>',
      `<span style="color:${u2(i.kda)}">KDA ${i.kda >= 99 ? "完美" : i.kda.toFixed(2)}</span>`,
      '<span style="color:#5c5b57">|</span>',
      `<span style="color:${i.score != null ? c2(i.score) : "#a09b8c"}">评分 ${i.score != null ? i.score.toFixed(1) : "--"}</span>`
    ].join("");
  }
}
function r2(n, i) {
  if (n.hasAttribute(Ef)) {
    c1(n, ii.get(i.puuid));
    return;
  }
  const u = n.style.position;
  n.setAttribute(Ef, "true"), n.style.position || (n.style.position = "relative"), c1(n, ii.get(i.puuid));
  const c = (g) => {
    u1(g.target) || s1(n, g) && i.puuid && (g.preventDefault(), g.stopPropagation(), a2(i.puuid, i.name).then((h) => {
      e2(i.puuid, h, Rs || void 0);
    }));
  }, r = (g) => {
    n.style.cursor = s1(n, g) && !u1(g.target) ? "pointer" : "";
  }, m = () => {
    n.style.cursor = "";
  };
  n.addEventListener("click", c), n.addEventListener("mousemove", r), n.addEventListener("mouseleave", m), Nf.push({ element: n, previousPosition: u, clickHandler: c, moveHandler: r, leaveHandler: m });
}
function Fc() {
  const n = document.querySelectorAll("lol-regalia-parties-v2-element[puuid], lol-regalia-parties-v2-element[summoner-id]");
  return n.length === 0 || n.forEach((i) => {
    const u = i, c = i2(u);
    if (!(c != null && c.puuid)) return;
    const r = u.querySelector(".player-identity-container");
    r && r2(r, c);
  }), !0;
}
function o1() {
  Nf.forEach(({ element: n, previousPosition: i, clickHandler: u, moveHandler: c, leaveHandler: r }) => {
    n.removeEventListener("click", u), n.removeEventListener("mousemove", c), n.removeEventListener("mouseleave", r), n.removeAttribute(Ef), n.style.cursor = "", n.style.position = i, n.querySelectorAll(`[${Tf}]`).forEach((m) => m.remove());
  }), Nf = [];
}
function r1(n) {
  n && !Vn ? (Vn = !0, tt.register(Fc), _d = !0, Sc = _.observe(oa.LOBBY, (i) => {
    if (i.eventType === "Delete") {
      Pc(null), ii.clear(), o1();
      return;
    }
    i1();
  }), i1().then(() => {
    Vn && R.info("Lobby member match history enabled ✓");
  })) : !n && Vn && (_d && (tt.unregister(Fc), _d = !1), Sc && (Sc(), Sc = null), Vn = !1, Pc(null), ii.clear(), Cf.clear(), o1(), t2(), R.info("Lobby member match history disabled"));
}
function Vl(n, i, u) {
  return new Promise((c, r) => {
    const m = setTimeout(() => {
      r(new Error(`[Timeout] ${u} 超过 ${i}ms 未返回`));
    }, i);
    n.then(
      (g) => {
        clearTimeout(m), c(g);
      },
      (g) => {
        clearTimeout(m), r(g);
      }
    );
  });
}
const d1 = {
  top: 1,
  jungle: 2,
  mid: 3,
  bot: 4,
  utility: 5
}, bc = (n) => [...n].sort((i, u) => {
  const c = d1[i.selectedPosition] ?? 99, r = d1[u.selectedPosition] ?? 99;
  return c - r;
}), Ec = {
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
}, Mf = ["#e8a424", "#4a9eff", "#5bbd72", "#e74c3c", "#c084fc"], d2 = [
  "rgba(232, 164, 36, 0.15)",
  "rgba(74, 158, 255, 0.15)",
  "rgba(91, 189, 114, 0.15)",
  "rgba(231, 76, 60, 0.15)",
  "rgba(192, 132, 252, 0.15)"
], f1 = 1e4, $d = 15e3, f2 = 45e3;
function m1({ open: n, onClose: i, mockData: u }) {
  const [c, r] = j.useState([]), [m, g] = j.useState([]), [h, v] = j.useState(null), [y, b] = j.useState(!1), [C, A] = j.useState(""), [w, L] = j.useState(/* @__PURE__ */ new Map()), D = j.useRef(0), H = j.useCallback(async () => {
    const Q = ++D.current;
    if (b(!0), A(""), r([]), g([]), v(null), L(/* @__PURE__ */ new Map()), u) {
      if (Q !== D.current) return;
      r(bc(u.blueTeam)), g(bc(u.redTeam)), v(u.gameInfo), b(!1);
      return;
    }
    try {
      const Z = await Vl(_.getGameflowSession(), f1, "getGameflowSession");
      if (Q !== D.current) return;
      const W = Z.gameData.teamOne ?? [], z = Z.gameData.teamTwo ?? [], Y = Z.gameData.playerChampionSelections ?? [], pe = Math.ceil(Y.length / 2) || 5, oe = Y.slice(0, pe), se = Y.slice(pe), fe = /* @__PURE__ */ new Map();
      for (const le of [...W, ...z])
        fe.set(le.puuid, le);
      const Ne = (await Vl(_.getSummonerInfo(), f1, "getSummonerInfo")).puuid;
      if (Q !== D.current) return;
      const Re = W.some((le) => le.puuid === Ne) || oe.some((le) => le.puuid === Ne);
      v({
        queueName: Z.gameData.queue.name,
        gameMode: Z.gameData.queue.gameMode,
        mapName: Z.map.name,
        isBlueTeam: Re,
        queueId: Z.gameData.queue.id
      });
      const ue = /* @__PURE__ */ new Map(), O = /* @__PURE__ */ new Map();
      for (const le of [...W, ...z]) {
        const ae = le.teamParticipantId;
        ae && ae > 0 && (O.has(ae) || O.set(ae, []), O.get(ae).push(le.puuid));
      }
      let J = 0;
      O.forEach((le, ae) => {
        if (le.length >= 2) {
          const Ke = Mf[J % Mf.length];
          J++;
          const De = String.fromCharCode(65 + (J - 1) % 26);
          for (const $t of le)
            ue.set($t, De);
        }
      }), L(new Map(ue));
      const ie = Z.gameData.queue.id, Me = yo(ie), Ee = (le) => le.map((ae) => {
        var Ke;
        return {
          puuid: ae.puuid,
          championId: ae.championId,
          teamParticipantId: ((Ke = fe.get(ae.puuid)) == null ? void 0 : Ke.teamParticipantId) ?? 0,
          isBroadcaster: !fe.has(ae.puuid)
        };
      }), T = Ee(oe), M = Ee(se), P = async (le) => Promise.all(le.map(async (ae) => {
        var $t;
        const Ke = ae.isBroadcaster, De = {
          puuid: ae.puuid,
          summonerId: 0,
          summonerName: Ke ? "未知" : "",
          championId: ae.championId,
          teamParticipantId: ae.teamParticipantId,
          selectedPosition: "",
          winRate: null,
          wins: 0,
          total: 0,
          kdaNum: 0,
          avgK: 0,
          avgD: 0,
          avgA: 0,
          rankText: "未定级",
          rankColor: Ec.UNRANKED,
          rating: "",
          premadeGroup: ue.get(ae.puuid) ?? null,
          recentGames: [],
          isBroadcaster: Ke
        };
        try {
          const [ea, En, el] = await Promise.all([
            Vl(_.getSummonerByPuuid(ae.puuid), $d, `getSummonerByPuuid(${ae.puuid})`).catch(() => null),
            Vl(_.getRankedStats(ae.puuid), $d, `getRankedStats(${ae.puuid})`).catch(() => null),
            Vl(_.getSgpMatchHistory(ae.puuid, {
              startIndex: 0,
              count: q.get("gameAnalysisFetchCount") || 50,
              tag: Me || void 0
            }), $d, `getSgpMatchHistory(${ae.puuid})`).catch(() => null)
          ]), Jt = ea != null && ea.gameName ? `${ea.gameName} #${ea.tagLine}` : "未知";
          let Ua = "未定级", Da = Ec.UNRANKED;
          const tu = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "EMERALD", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLENGER"], gi = { IV: 1, III: 2, II: 3, I: 4 };
          if (En && typeof En == "object") {
            const mt = En.queueMap;
            if (mt) {
              const da = [];
              for (const [Yt, nl] of [["RANKED_SOLO_5x5", "单排/双排"], ["RANKED_FLEX_SR", "灵活组排"]]) {
                const Ut = mt[Yt];
                if (!Ut) continue;
                const Ze = Ut.tier ?? "", Tt = Ut.division ?? "";
                Ze && Ze !== "UNRANKED" && da.push({ key: Yt, label: nl, tier: Ze, division: Tt });
              }
              if (da.length > 0) {
                da.sort((nl, Ut) => {
                  const Ze = tu.indexOf(nl.tier), Tt = tu.indexOf(Ut.tier);
                  return Ze !== Tt ? Tt - Ze : (gi[nl.division] ?? 0) - (gi[Ut.division] ?? 0);
                });
                const Yt = da[0];
                Ua = tm(Yt.tier) + (Yt.division && Yt.division !== "NA" ? ` ${Yt.division}` : "") + ` ${Yt.label}`, Da = Ec[Yt.tier] ?? Ec.UNRANKED;
              }
            }
          }
          if (!el || !(($t = el.games) != null && $t.length))
            return { ...De, summonerName: Jt, rankText: Ua, rankColor: Da, rating: "" };
          const hi = pm(el.games, ie);
          let ft = 0, Tn = 0, tl = 0, al = 0, _e = 0;
          const pi = [];
          for (const Oa of hi) {
            const mt = Oa.json.participants.find((da) => da.puuid === ae.puuid);
            mt && (hm(Oa, ae.puuid) || (ft++, mt.win && Tn++, tl += mt.kills, al += mt.deaths, _e += mt.assists, pi.length < 5 && pi.push({
              championId: mt.championId,
              win: mt.win,
              kills: mt.kills,
              deaths: mt.deaths,
              assists: mt.assists
            })));
          }
          if (ft === 0)
            return { ...De, summonerName: Jt, rankText: Ua, rankColor: Da, rating: "" };
          const yi = ft > 0 ? Tn / ft * 100 : 0, vi = al === 0 ? tl + _e : (tl + _e) / al;
          return {
            ...De,
            summonerName: Jt,
            winRate: yi,
            wins: Tn,
            total: ft,
            kdaNum: vi,
            avgK: ft > 0 ? tl / ft : 0,
            avgD: ft > 0 ? al / ft : 0,
            avgA: ft > 0 ? _e / ft : 0,
            rankText: Ua,
            rankColor: Da,
            rating: k5(yi, vi),
            recentGames: pi
          };
        } catch {
          return { ...De, summonerName: "未知" };
        }
      })), [$, re] = await Vl(
        Promise.all([P(T), P(M)]),
        f2,
        "analyzeTeams"
      );
      if (Q !== D.current) return;
      r(bc(Re ? $ : re)), g(bc(Re ? re : $));
    } catch (Z) {
      if (Q !== D.current) return;
      const W = Z instanceof Error && Z.message.startsWith("[Timeout]");
      A(W ? "加载超时，客户端或网络可能正忙" : "暂无对局数据"), console.error("[GameAnalysis] 加载失败:", Z);
    } finally {
      Q === D.current && b(!1);
    }
  }, [u]);
  j.useEffect(() => (n && H(), () => {
    D.current += 1;
  }), [n, H]);
  const F = (Q) => {
    const Z = Q.filter((W) => W.winRate != null);
    return Z.length === 0 ? null : Math.round(Z.reduce((W, z) => W + z.winRate, 0) / Z.length);
  }, V = F(c), X = F(m);
  return /* @__PURE__ */ d.jsx(oi, { open: n, onClose: i, width: 1160, height: 645, closable: !0, children: /* @__PURE__ */ d.jsxs("div", { className: "sga-container", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "sga-header", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "sga-header-left", children: [
        /* @__PURE__ */ d.jsx("span", { className: "sga-header-icon", children: "❖" }),
        /* @__PURE__ */ d.jsxs("span", { className: "sga-header-title", children: [
          "对局分析",
          /* @__PURE__ */ d.jsxs("span", { className: "sga-header-subtitle", children: [
            "(",
            `本模式近${q.get("gameAnalysisFetchCount") || 50}局`,
            ")"
          ] })
        ] })
      ] }),
      h && /* @__PURE__ */ d.jsxs("span", { className: "sga-header-info", children: [
        h.mapName,
        " · ",
        h.queueName
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "sga-body", children: [
      y && /* @__PURE__ */ d.jsxs("div", { className: "sga-loading", children: [
        /* @__PURE__ */ d.jsx("div", { className: "sga-loading-spinner" }),
        /* @__PURE__ */ d.jsx("span", { children: "正在分析对局数据..." })
      ] }),
      C && /* @__PURE__ */ d.jsxs("div", { className: "sga-error", children: [
        /* @__PURE__ */ d.jsx("span", { children: C }),
        /* @__PURE__ */ d.jsx("button", { type: "button", className: "sga-retry", onClick: () => void H(), children: "重试" })
      ] }),
      !y && !C && (c.length > 0 || m.length > 0) && /* @__PURE__ */ d.jsxs("div", { className: "sga-teams", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "sga-team", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "sga-team-header sga-team-header--blue", children: [
            /* @__PURE__ */ d.jsx("span", { className: "sga-team-name", children: "蓝色方" }),
            V != null && /* @__PURE__ */ d.jsxs("span", { className: "sga-team-avg", children: [
              "平均胜率",
              " ",
              /* @__PURE__ */ d.jsxs("span", { className: `sga-team-avg-num ${V > 50 ? "sga-avg-green" : "sga-avg-red"}`, children: [
                V,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "sga-team-players", children: c.map((Q, Z) => /* @__PURE__ */ d.jsx(g1, { player: Q, isRed: !1, queueId: h == null ? void 0 : h.queueId }, Q.puuid || Z)) })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "sga-team", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "sga-team-header sga-team-header--red", children: [
            /* @__PURE__ */ d.jsx("span", { className: "sga-team-name", children: "红色方" }),
            X != null && /* @__PURE__ */ d.jsxs("span", { className: "sga-team-avg", children: [
              "平均胜率",
              " ",
              /* @__PURE__ */ d.jsxs("span", { className: `sga-team-avg-num ${X > 50 ? "sga-avg-green" : "sga-avg-red"}`, children: [
                X,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "sga-team-players", children: m.map((Q, Z) => /* @__PURE__ */ d.jsx(g1, { player: Q, isRed: !0, queueId: h == null ? void 0 : h.queueId }, Q.puuid || Z)) })
        ] })
      ] }),
      !y && !C && c.length === 0 && m.length === 0 && /* @__PURE__ */ d.jsx("div", { className: "sga-empty", children: "暂无对局数据" })
    ] })
  ] }) });
}
function ef(n, i) {
  const u = String(n);
  return i ? /* @__PURE__ */ d.jsx("span", { style: { color: "#ff4444" }, children: u }) : u;
}
function g1({ player: n, isRed: i, queueId: u }) {
  const c = n.winRate, r = c != null ? c >= 70 ? "#e8a424" : c >= 50 ? "#5bbd72" : c >= 30 ? "#e84057" : "#9b59b6" : "#5c5b57", m = c != null ? c >= 70 ? "#e8a424" : c >= 50 ? "#5bbd72" : c >= 30 ? "#e84057" : "#9b59b6" : "#3c2e16", g = n.kdaNum >= 99 ? "完美" : n.kdaNum.toFixed(1), h = n.kdaNum >= 3 ? "#5bbd72" : "#e74c3c", v = n.premadeGroup, y = v ? v.charCodeAt(0) - 65 : -1, b = y >= 0 ? Mf[y] ?? "#c8aa6e" : void 0, C = y >= 0 ? d2[y] ?? void 0 : void 0, A = () => {
    n.puuid && m2(n.puuid, n.summonerName || "???", u);
  };
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: `sga-player-wrapper ${i ? "sga-player-wrapper--red" : ""} ${n.isBroadcaster ? "sga-player-wrapper--broadcaster" : ""}`,
      style: {
        ...C ? { background: C } : {}
      },
      onClick: A,
      children: [
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: `sga-player ${i ? "sga-player--red" : "sga-player--blue"}`,
            children: [
              /* @__PURE__ */ d.jsx("div", { className: "sga-player-champ", children: n.championId > 0 ? /* @__PURE__ */ d.jsx("img", { className: "sga-player-champ-img", src: Hc(n.championId), alt: "" }) : /* @__PURE__ */ d.jsx("div", { className: "sga-player-champ-placeholder" }) }),
              /* @__PURE__ */ d.jsxs("div", { className: "sga-player-info", children: [
                /* @__PURE__ */ d.jsxs("div", { className: "sga-player-name-row", children: [
                  /* @__PURE__ */ d.jsx("span", { className: "sga-player-name", children: n.summonerName || "???" }),
                  n.isBroadcaster && /* @__PURE__ */ d.jsx("span", { className: "sga-broadcaster-badge", children: "主播模式" }),
                  v && /* @__PURE__ */ d.jsx("span", { className: "sga-premade-badge", style: { background: b }, children: `${v}队` })
                ] }),
                /* @__PURE__ */ d.jsxs("span", { className: "sga-player-rank", style: { color: n.rankColor || "#5c5b57" }, children: [
                  i && n.rating ? /* @__PURE__ */ d.jsxs("span", { className: "sga-player-rating", children: [
                    n.rating,
                    " · "
                  ] }) : null,
                  n.rankText || "未定级",
                  !i && n.rating ? /* @__PURE__ */ d.jsxs("span", { className: "sga-player-rating", children: [
                    " · ",
                    n.rating
                  ] }) : null
                ] })
              ] }),
              /* @__PURE__ */ d.jsx("div", { className: "sga-player-winrate", children: c != null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsxs("div", { className: "sga-winrate-text", children: [
                  /* @__PURE__ */ d.jsxs("span", { style: { color: r, fontWeight: "bold" }, children: [
                    c.toFixed(0),
                    "%"
                  ] }),
                  /* @__PURE__ */ d.jsx("span", { className: "sga-winrate-wl", children: /* @__PURE__ */ d.jsx("span", { className: "sga-wl-win", children: `${n.wins} 胜 / ${n.total - n.wins} 负` }) })
                ] }),
                /* @__PURE__ */ d.jsx("div", { className: "sga-winrate-bar", children: /* @__PURE__ */ d.jsx("div", { className: "sga-winrate-bar-fill", style: { width: `${c}%`, background: m } }) })
              ] }) : /* @__PURE__ */ d.jsx("span", { className: "sga-no-data", children: "无数据" }) }),
              /* @__PURE__ */ d.jsx("div", { className: "sga-player-kda", children: c != null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { style: { color: h, fontWeight: "bold" }, children: g }),
                /* @__PURE__ */ d.jsx("span", { className: "sga-kda-label", children: " KDA" })
              ] }) : /* @__PURE__ */ d.jsx("span", { className: "sga-no-data", children: "—" }) })
            ]
          }
        ),
        n.recentGames.length > 0 ? /* @__PURE__ */ d.jsx("div", { className: "sga-recent", children: n.recentGames.map((w, L) => /* @__PURE__ */ d.jsxs("div", { className: `sga-recent-game ${w.win ? "sga-recent-win" : "sga-recent-loss"}`, children: [
          /* @__PURE__ */ d.jsx("img", { className: "sga-recent-champ", src: Hc(w.championId), alt: "" }),
          /* @__PURE__ */ d.jsxs("span", { className: "sga-recent-kda", children: [
            ef(w.kills, w.kills >= w.deaths && w.kills >= w.assists),
            /* @__PURE__ */ d.jsx("span", { className: "sga-kda-slash", children: "/" }),
            ef(w.deaths, w.deaths >= w.kills && w.deaths >= w.assists),
            /* @__PURE__ */ d.jsx("span", { className: "sga-kda-slash", children: "/" }),
            ef(w.assists, w.assists >= w.kills && w.assists >= w.deaths)
          ] })
        ] }, L)) }) : null
      ]
    }
  );
}
let hs = null, ps = null;
function m2(n, i, u) {
  ps || (ps = document.createElement("div"), ps.id = "sona-game-analysis-match-modal-root", document.body.appendChild(ps), hs = bn.createRoot(ps));
  const c = () => {
    hs == null || hs.render(
      j.createElement(Wn, { open: !1, onClose: c, puuid: "", playerName: "" })
    );
  };
  hs.render(
    j.createElement(Wn, { open: !0, onClose: c, puuid: n, playerName: i, queueId: u })
  );
}
let Jn = null, fn = null, sa = null, ys = 0, Xl = !1;
const g2 = 240;
function xf() {
  sa != null && (window.clearTimeout(sa), sa = null), fn || (fn = document.createElement("div"), fn.id = "sona-game-analysis-root", document.body.appendChild(fn), Jn = bn.createRoot(fn));
  const n = () => {
    Rf = Cs;
    const i = Jn;
    i == null || i.render(
      j.createElement(m1, { open: !1, onClose: n })
    ), R.info("[GameAnalysis] 战力分析弹窗已关闭 → dismissedGameId=%d", Rf), sa != null && window.clearTimeout(sa), sa = window.setTimeout(() => {
      sa = null, Jn === i && If();
    }, g2);
  };
  Jn.render(
    j.createElement(m1, { open: !0, onClose: n })
  ), R.info("[GameAnalysis] 战力分析弹窗已显示");
}
function If() {
  sa != null && (window.clearTimeout(sa), sa = null), Jn && (Jn.unmount(), Jn = null), fn && (fn.remove(), fn = null);
}
const kf = "data-sona-game-analysis";
function tf() {
  const n = document.querySelector(".game-in-progress-container");
  if (!n) return !1;
  if (n.querySelector(`[${kf}]`)) return !0;
  const i = document.createElement("lol-uikit-flat-button");
  return i.setAttribute(kf, "true"), i.textContent = "对局分析", i.addEventListener("click", (u) => {
    u.stopPropagation(), u.preventDefault(), xf(), R.info("[GameAnalysis] 打开分析弹窗");
  }), n.appendChild(i), R.info("[GameAnalysis] 客户端内嵌按钮已注入 ✓"), !0;
}
function h1() {
  document.querySelectorAll(`[${kf}]`).forEach((n) => n.remove());
}
let Ql = !1, Cs = 0, Rf = 0, Hn = null;
function p1(n) {
  n && !Hn ? (Hn = _.observe(oa.GAMEFLOW_PHASE_CHANGE, (i) => {
    if (i.data === "InProgress") {
      const c = ++ys;
      Ql || (tt.register(tf), Ql = !0), _.getGameflowSession().then((r) => {
        var g;
        if (c !== ys || !Hn) return;
        const m = ((g = r.gameData) == null ? void 0 : g.gameId) ?? 0;
        if (m > 0 && m === Rf) {
          R.info("[GameAnalysis] 本局已被用户手动关闭，跳过自动弹窗 → gameId=%d", m);
          return;
        }
        !Xl && m > 0 && m !== Cs && (Xl = !0, Cs = m, xf());
      }).catch(() => {
        c !== ys || !Hn || Xl || (Xl = !0, xf());
      });
    } else
      ys += 1, Cs = 0, Xl = !1, Ql && (tt.unregister(tf), Ql = !1), h1(), If();
  }), R.info("Game analysis popup enabled ✓")) : !n && Hn && (ys += 1, Hn(), Hn = null, Cs = 0, Xl = !1, Ql && (tt.unregister(tf), Ql = !1), h1(), If(), R.info("Game analysis popup disabled"));
}
const py = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%230093FF'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M10.148%2015v-1.554h1.484V6.894h-1.484V5.34h3.416v8.106h1.456V15z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", yy = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%2300BBA3'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M9.165%2015v-4.298l1.064-1.064h2.478l.308-.308V7.188l-.322-.308h-1.246l-.322.308v1.05H9.193V6.572l1.218-1.232h3.304l1.246%201.246v3.64l-1.064%201.064h-2.478l-.308.308v1.778h3.836V15z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", vy = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%23FFB900'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='m10.124%2015-1.232-1.232v-1.722h1.946v1.064l.406.406h1.4l.406-.406v-1.792l-.462-.476h-2.52V9.288h2.52l.462-.462V7.258l-.406-.406h-1.4l-.406.406V8.28H8.892V6.572l1.232-1.232h3.64l1.232%201.218v2.478l-1.008%201.008%201.008%201.022v2.716L13.778%2015z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", Ay = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%239AA4AF'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M12.672%2015v-2.548H8.64v-1.26L9.998%205.34h1.722l-1.092%205.502h2.044V5.34h1.932v5.502h.714v1.61h-.714V15z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", Sy = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%23A88A67'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='m10.327%2015-1.232-1.232V12.06h1.946v1.022l.392.392h1.218l.406-.406v-2.646l-.308-.322h-1.232l-.616.616H9.095V5.34h5.782v1.61h-3.836v2.31l.686-.686h2.128l1.148%201.148v4.032L13.757%2015z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", ym = 5, h2 = "/fe/lol-static-assets/images/ranked-mini-crests", p2 = [
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
], y2 = p2.map((n) => ({
  ...n,
  icon: v2(n.value)
})), y1 = ["top", "jungle", "mid", "adc", "support"];
function v2(n) {
  return n === "all" || n === "ibsg" ? "" : `${h2}/${n.replace("_plus", "")}.svg`;
}
const A2 = 18, S2 = 12;
function b2(n, i, u) {
  j.useLayoutEffect(() => {
    const c = n.current, r = i.current;
    if (!c || !r) return;
    const m = () => {
      let h = A2;
      for (r.style.fontSize = `${h}px`; h > S2 && r.scrollWidth > r.clientWidth; )
        h -= 1, r.style.fontSize = `${h}px`;
    };
    m();
    const g = new ResizeObserver(m);
    return g.observe(c), () => g.disconnect();
  }, [n, i, u]);
}
function by({
  context: n,
  recommendation: i,
  loadError: u,
  isLoading: c,
  selectedTier: r,
  onTierChange: m,
  onPositionChange: g,
  onClose: h
}) {
  const v = um(n.championId), y = v ? `${v.title} ${v.name}` : "未识别英雄", b = (i == null ? void 0 : i.modeLabel) || (n.queueId > 0 ? di(n.queueId) : "未知队列"), C = (i == null ? void 0 : i.position) ?? n.position, A = [b, Ey(C)].filter(Boolean).join(" · "), w = v1(n) || (i == null ? void 0 : i.mode) === "arena", L = C2(n, i), D = j.useRef(null), H = j.useRef(null);
  return b2(D, H, y), /* @__PURE__ */ d.jsxs("div", { className: "sobp", children: [
    /* @__PURE__ */ d.jsx("div", { className: "sobp-ambient" }),
    /* @__PURE__ */ d.jsxs("header", { className: "sobp-titlebar", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "sobp-title-main", children: [
        /* @__PURE__ */ d.jsx("div", { className: "sobp-champion-ring", children: /* @__PURE__ */ d.jsx("img", { src: `/lol-game-data/assets/v1/champion-icons/${n.championId}.png`, alt: "" }) }),
        /* @__PURE__ */ d.jsxs("div", { className: "sobp-title-text", ref: D, children: [
          /* @__PURE__ */ d.jsxs("div", { className: "sobp-title", children: [
            /* @__PURE__ */ d.jsx("span", { className: "sobp-title-mark", children: "❖" }),
            /* @__PURE__ */ d.jsx("span", { className: "sobp-title-name", ref: H, title: y, children: y })
          ] }),
          A && /* @__PURE__ */ d.jsx("div", { className: "sobp-mode-tag", children: A })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "sobp-title-actions", children: [
        L && /* @__PURE__ */ d.jsx(E2, { value: n.position, onChange: g }),
        /* @__PURE__ */ d.jsx(T2, { value: r, onChange: m }),
        /* @__PURE__ */ d.jsx(M2, { meta: i == null ? void 0 : i.meta }),
        /* @__PURE__ */ d.jsx(N2, { values: (i == null ? void 0 : i.summary) ?? [] })
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", className: "sobp-close", onClick: h, "aria-label": "关闭配装推荐", children: "×" })
    ] }),
    /* @__PURE__ */ d.jsxs("main", { className: "sobp-body", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "sobp-grid", children: [
        /* @__PURE__ */ d.jsx(U2, { title: "核心装备", builds: i == null ? void 0 : i.coreItems, itemLimit: 3 }),
        /* @__PURE__ */ d.jsx(B2, { title: "符文搭配", runes: i == null ? void 0 : i.runePages, championName: y, modeLabel: (i == null ? void 0 : i.modeLabel) || b }),
        /* @__PURE__ */ d.jsx(O2, { title: "召唤师技能", builds: i == null ? void 0 : i.summonerSpells, limit: ym })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: "sobp-trend-wrap", children: /* @__PURE__ */ d.jsx(D2, { title: "出装趋势", builds: i == null ? void 0 : i.lastItems }) }),
      /* @__PURE__ */ d.jsx(z2, { title: "优势 / 劣势对局", matchups: i == null ? void 0 : i.matchups }),
      w && /* @__PURE__ */ d.jsx(j2, { title: "海克斯推荐", groups: i == null ? void 0 : i.augments, winRateFirst: v1(n) }),
      c && /* @__PURE__ */ d.jsx(Tc, { children: "正在后台加载 OP.GG 推荐数据，完成后会自动刷新。" }),
      u && /* @__PURE__ */ d.jsx(Tc, { warning: !0, children: `OP.GG 请求失败：${u}` }),
      (i == null ? void 0 : i.warning) && /* @__PURE__ */ d.jsx(Tc, { warning: !0, children: i.warning }),
      !c && !u && !i && /* @__PURE__ */ d.jsx(Tc, { children: "暂无可用 OP.GG 推荐数据。" })
    ] })
  ] });
}
function E2({ value: n, onChange: i }) {
  const u = y1.includes(n) ? n : "mid";
  return /* @__PURE__ */ d.jsx("div", { className: "sobp-position-filter", title: "选择推荐分路", children: /* @__PURE__ */ d.jsx(
    Zn,
    {
      value: u,
      onChange: (c) => i(c),
      options: y1.map((c) => ({
        value: c,
        label: Ey(c)
      }))
    }
  ) });
}
function T2({ value: n, onChange: i }) {
  return /* @__PURE__ */ d.jsx("div", { className: "sobp-tier-filter", children: /* @__PURE__ */ d.jsx(
    Zn,
    {
      value: n,
      onChange: (u) => i(u),
      options: y2
    }
  ) });
}
function v1(n) {
  return n.gameMode.toLowerCase() === "kiwi";
}
function C2(n, i) {
  if (i) return i.mode === "ranked";
  const u = n.gameMode.toLowerCase();
  return !["aram", "kiwi", "cherry", "arena", "nexusblitz", "nexus_blitz", "urf", "arurf"].includes(u);
}
function Ey(n) {
  switch (n) {
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
function N2({ values: n }) {
  return n.length === 0 ? null : /* @__PURE__ */ d.jsx("div", { className: "sobp-summary", children: n.map((i) => {
    const u = R2(i);
    return /* @__PURE__ */ d.jsx("div", { className: `sobp-summary-card sobp-summary-card--${u.kind}`, children: u.kind === "tier" ? /* @__PURE__ */ d.jsx(I2, { value: u.metric }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      u.label && /* @__PURE__ */ d.jsx("span", { className: "sobp-summary-label", children: u.label }),
      /* @__PURE__ */ d.jsx("span", { className: "sobp-summary-value", children: u.metric })
    ] }) }, i);
  }) });
}
function M2({ meta: n }) {
  if (!n) return null;
  const i = x2(n.rankDelta), u = n.rank && n.totalRank ? `${n.rank}/${n.totalRank}` : n.rank ? `#${n.rank}` : "";
  return i.kind === "unknown" && u ? /* @__PURE__ */ d.jsx("div", { className: "sobp-meta", children: /* @__PURE__ */ d.jsx("div", { className: "sobp-meta-trend sobp-meta-trend--flat", children: /* @__PURE__ */ d.jsx("span", { className: "sobp-meta-rank", children: u }) }) }) : /* @__PURE__ */ d.jsx("div", { className: "sobp-meta", children: /* @__PURE__ */ d.jsxs("div", { className: `sobp-meta-trend sobp-meta-trend--${i.kind}`, children: [
    /* @__PURE__ */ d.jsx("span", { className: "sobp-meta-label", children: "趋势：" }),
    /* @__PURE__ */ d.jsx("span", { className: "sobp-meta-value", children: i.text }),
    u && /* @__PURE__ */ d.jsx("span", { className: "sobp-meta-rank", children: u })
  ] }) });
}
function x2(n) {
  return n == null ? { kind: "unknown", text: "暂无" } : n > 0 ? { kind: "up", text: `↑ ${n}` } : n < 0 ? { kind: "down", text: `↓ ${Math.abs(n)}` } : { kind: "flat", text: "持平" };
}
function I2({ value: n }) {
  const i = Number.parseInt(n.replace(/\D/g, ""), 10), u = k2(i);
  return u ? /* @__PURE__ */ d.jsx("img", { className: "sobp-tier-icon", src: u, alt: n, title: n }) : /* @__PURE__ */ d.jsx("span", { className: "sobp-summary-value", children: n });
}
function k2(n) {
  switch (n) {
    case 1:
      return py;
    case 2:
      return yy;
    case 3:
      return vy;
    case 4:
      return Ay;
    case 5:
      return Sy;
    default:
      return "";
  }
}
function R2(n) {
  const i = n.trim().split(/\s+/);
  if (i.length < 2) return { label: "", metric: n, kind: A1(n) };
  const u = i.slice(0, -1).join(" "), c = i[i.length - 1];
  return u.toLowerCase() === "tier" ? { label: "", metric: w2(c), kind: "tier" } : {
    label: u,
    metric: c,
    kind: A1(n)
  };
}
function w2(n) {
  const i = n.trim().replace(/^tier\s*/i, "");
  return i ? `T${i}` : "T-";
}
function A1(n) {
  const i = n.toLowerCase();
  if (n.includes("胜率")) {
    const u = Number.parseFloat(n.replace(/[^\d.]/g, ""));
    return Number.isFinite(u) && u > 50 ? "win-high" : "win-low";
  }
  return n.includes("登场") ? "pick" : i.includes("tier") ? "tier" : n.includes("排名") ? "rank" : "default";
}
function fi({ title: n, children: i, empty: u = !1, emptyText: c }) {
  return /* @__PURE__ */ d.jsxs("section", { className: "sobp-section", children: [
    /* @__PURE__ */ d.jsxs("h3", { className: "sobp-section-title", children: [
      /* @__PURE__ */ d.jsx("span", {}),
      n
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: "sobp-section-card", children: u ? /* @__PURE__ */ d.jsx("div", { className: "sobp-empty", children: c ?? "暂无数据" }) : i })
  ] });
}
function U2({ title: n, builds: i, itemLimit: u }) {
  const c = (i == null ? void 0 : i.slice(0, ym)) ?? [], r = Ty(c, 0.15);
  return /* @__PURE__ */ d.jsx(fi, { title: n, empty: c.length === 0, children: c.map((m, g) => /* @__PURE__ */ d.jsxs("div", { className: "sobp-row", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "sobp-row-main", children: [
      /* @__PURE__ */ d.jsx(vm, { rank: g + 1 }),
      /* @__PURE__ */ d.jsx("div", { className: "sobp-icons sobp-icons--items", children: m.ids.slice(0, u).map((h, v, y) => {
        const b = _1(h);
        return /* @__PURE__ */ d.jsxs("span", { className: "sobp-icon-step", children: [
          /* @__PURE__ */ d.jsx(yn, { src: b.iconPath, title: b.name, description: b.description, price: b.price, size: 32 }),
          v < y.length - 1 && /* @__PURE__ */ d.jsx("span", { className: "sobp-arrow", children: "▶" })
        ] }, `${h}-${v}`);
      }) })
    ] }),
    /* @__PURE__ */ d.jsx(Am, { value: m.pick_rate, maxRate: r })
  ] }, `${g}-${m.ids.join("-")}`)) });
}
function D2({ title: n, builds: i }) {
  const u = (i ?? []).flatMap((c, r) => c.ids.map((m, g) => ({
    id: m,
    key: `${r}-${g}-${m}`,
    pickRate: c.pick_rate
  }))).slice(0, 18);
  return /* @__PURE__ */ d.jsx(fi, { title: n, empty: u.length === 0, children: /* @__PURE__ */ d.jsx("div", { className: "sobp-last-items", children: u.map((c) => {
    const r = _1(c.id);
    return /* @__PURE__ */ d.jsxs("div", { className: "sobp-last-item", children: [
      /* @__PURE__ */ d.jsx("div", { className: "sobp-last-item-rate", children: si(c.pickRate) }),
      /* @__PURE__ */ d.jsx(yn, { src: r.iconPath, title: r.name, description: r.description, price: r.price, size: 34 })
    ] }, c.key);
  }) }) });
}
function O2({ title: n, builds: i, limit: u }) {
  const c = (i == null ? void 0 : i.slice(0, u)) ?? [], r = Ty(c, 1);
  return /* @__PURE__ */ d.jsx(fi, { title: n, empty: c.length === 0, children: c.map((m, g) => /* @__PURE__ */ d.jsxs("div", { className: "sobp-row", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "sobp-row-main", children: [
      /* @__PURE__ */ d.jsx(vm, { rank: g + 1 }),
      /* @__PURE__ */ d.jsx("div", { className: "sobp-icons", children: [...m.ids].reverse().map((h) => {
        const v = rb(h);
        return /* @__PURE__ */ d.jsx(yn, { src: v.iconPath || js(h), title: v.name || ob(h), description: v.description, size: 32 }, h);
      }) })
    ] }),
    /* @__PURE__ */ d.jsx(Am, { value: m.pick_rate, maxRate: r })
  ] }, `${g}-${m.ids.join("-")}`)) });
}
function z2({ title: n, matchups: i }) {
  const u = i ?? [], c = [...u].sort((g, h) => h.winRate - g.winRate || h.play - g.play).slice(0, 9), r = [...u].sort((g, h) => g.winRate - h.winRate || h.play - g.play).slice(0, 9), m = c.length > 0 || r.length > 0;
  return /* @__PURE__ */ d.jsx("div", { className: "sobp-matchup-wrap", children: /* @__PURE__ */ d.jsx(fi, { title: n, empty: !m, emptyText: "暂无对局克制数据", children: /* @__PURE__ */ d.jsxs("div", { className: "sobp-matchup-columns", children: [
    /* @__PURE__ */ d.jsx(S1, { title: "优势对局", items: c, tone: "good" }),
    /* @__PURE__ */ d.jsx(S1, { title: "劣势对局", items: r, tone: "bad" })
  ] }) }) });
}
function S1({ title: n, items: i, tone: u }) {
  return /* @__PURE__ */ d.jsxs("div", { className: "sobp-matchup-group", children: [
    /* @__PURE__ */ d.jsx("div", { className: `sobp-matchup-heading sobp-matchup-heading--${u}`, children: n }),
    /* @__PURE__ */ d.jsx("div", { className: "sobp-matchup-list", children: i.map((c) => {
      const r = um(c.championId), m = r ? `${r.title} ${r.name}` : `英雄 ${c.championId}`;
      return /* @__PURE__ */ d.jsxs("div", { className: "sobp-matchup", children: [
        /* @__PURE__ */ d.jsx("img", { className: "sobp-matchup-icon", src: `/lol-game-data/assets/v1/champion-icons/${c.championId}.png`, alt: "" }),
        /* @__PURE__ */ d.jsxs("div", { className: "sobp-matchup-info", children: [
          /* @__PURE__ */ d.jsx("span", { className: "sobp-matchup-name", title: m, children: m }),
          /* @__PURE__ */ d.jsxs("span", { className: "sobp-matchup-detail", children: [
            /* @__PURE__ */ d.jsx("span", { className: `sobp-matchup-rate sobp-matchup-rate--${u}`, children: si(c.winRate) }),
            /* @__PURE__ */ d.jsxs("span", { className: "sobp-matchup-play", children: [
              c.play.toLocaleString("zh-CN"),
              "场"
            ] })
          ] })
        ] })
      ] }, `${u}-${c.championId}`);
    }) })
  ] });
}
function B2({ title: n, runes: i, championName: u, modeLabel: c }) {
  const r = (i == null ? void 0 : i.slice(0, ym)) ?? [], m = K2(r, 0.15), [g, h] = j.useState(""), [v, y] = j.useState(""), [b, C] = j.useState(""), A = async (w, L) => {
    const D = `${L}-${w.id}`;
    h(D), y(""), C("");
    try {
      const H = `${u} ${c} - Sona`;
      await _.applyRunePage({
        name: H,
        primaryStyleId: w.primary_page_id,
        subStyleId: w.secondary_page_id,
        selectedPerkIds: [
          ...w.primary_rune_ids,
          ...w.secondary_rune_ids,
          ...w.stat_mod_ids
        ]
      }), y(D), Toast.success(`${u} ${c} 符文已应用 - Sona`);
    } catch {
      C(D);
    } finally {
      h("");
    }
  };
  return /* @__PURE__ */ d.jsx(fi, { title: n, empty: r.length === 0, emptyText: "不支持自定义符文", children: r.map((w, L) => {
    const D = `${L}-${w.id}`, H = w.primary_rune_ids[0] ?? 0, F = Jd(H);
    return /* @__PURE__ */ d.jsxs("div", { className: "sobp-row", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "sobp-row-main", children: [
        /* @__PURE__ */ d.jsx(vm, { rank: L + 1 }),
        /* @__PURE__ */ d.jsxs("div", { className: "sobp-runes", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "sobp-rune-group", children: [
            /* @__PURE__ */ d.jsx(yn, { src: F.iconPath || $l(H), title: F.name || Zd(H), description: F.description, size: 32, border: "#c8aa6e", round: !0 }),
            /* @__PURE__ */ d.jsx("div", { className: "sobp-small-runes", children: w.primary_rune_ids.slice(1, 4).map((V) => {
              const X = Jd(V);
              return /* @__PURE__ */ d.jsx(yn, { src: X.iconPath || $l(V), title: X.name || Zd(V), description: X.description, size: 24, round: !0 }, V);
            }) })
          ] }),
          /* @__PURE__ */ d.jsx("span", { className: "sobp-rune-divider" }),
          /* @__PURE__ */ d.jsxs("div", { className: "sobp-rune-group", children: [
            /* @__PURE__ */ d.jsx(yn, { src: Vc(w.secondary_page_id), title: db(w.secondary_page_id), size: 24, round: !0 }),
            w.secondary_rune_ids.slice(0, 2).map((V) => {
              const X = Jd(V);
              return /* @__PURE__ */ d.jsx(yn, { src: X.iconPath || $l(V), title: X.name || Zd(V), description: X.description, size: 24, round: !0 }, V);
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "sobp-rune-actions", children: [
        /* @__PURE__ */ d.jsx(Am, { value: w.pick_rate, maxRate: m }),
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: `sobp-apply-rune${v === D ? " sobp-apply-rune--done" : ""}${b === D ? " sobp-apply-rune--error" : ""}`,
            disabled: g === D,
            onClick: (V) => {
              V.stopPropagation(), A(w, L);
            },
            children: g === D ? "应用中" : v === D ? "已应用" : b === D ? "失败" : "应用"
          }
        )
      ] })
    ] }, `${L}-${w.primary_rune_ids.join("-")}-${w.secondary_rune_ids.join("-")}`);
  }) });
}
function j2({ title: n, groups: i, winRateFirst: u = !1 }) {
  const c = i ?? [];
  return /* @__PURE__ */ d.jsx("div", { className: "sobp-augment-wrap", children: /* @__PURE__ */ d.jsx(fi, { title: n, empty: c.length === 0, children: c.map((r) => /* @__PURE__ */ d.jsxs("div", { className: "sobp-augment-group", children: [
    /* @__PURE__ */ d.jsx("div", { className: "sobp-augment-rarity", children: r.label ?? E1(r.rarity) }),
    /* @__PURE__ */ d.jsx("div", { className: "sobp-augment-grid", children: r.items.map((m) => {
      const g = $1(m.id), h = Number.isFinite(m.winRate) ? L2(m, u) : `登场 ${si(m.pickRate)} · 均排 ${H2(m.averagePlace)}`;
      return /* @__PURE__ */ d.jsxs("div", { className: "sobp-augment", children: [
        /* @__PURE__ */ d.jsx(
          yn,
          {
            src: (g == null ? void 0 : g.iconPath) ?? "",
            title: (g == null ? void 0 : g.name) ?? String(m.id),
            description: (g == null ? void 0 : g.description) ?? "",
            subtitle: r.label ?? E1(r.rarity),
            size: 40,
            border: V2(g == null ? void 0 : g.rarity)
          }
        ),
        /* @__PURE__ */ d.jsxs("div", { className: "sobp-augment-info", children: [
          /* @__PURE__ */ d.jsx("div", { className: "sobp-augment-name", children: (g == null ? void 0 : g.name) ?? String(m.id) }),
          /* @__PURE__ */ d.jsx("div", { className: "sobp-augment-meta", children: h })
        ] })
      ] }, m.id);
    }) })
  ] }, r.rarity)) }) });
}
function L2(n, i) {
  const u = `胜率 ${si(n.winRate)}`, c = `登场 ${si(n.pickRate)}`;
  return i ? `${u} · ${c}` : `${c} · ${u}`;
}
function vm({ rank: n }) {
  return /* @__PURE__ */ d.jsxs("div", { className: `sobp-rank${n === 1 ? " sobp-rank--first" : ""}`, children: [
    "#",
    n
  ] });
}
function Am({ value: n, maxRate: i }) {
  const u = Number.isFinite(n) ? n ?? 0 : 0, c = i > 0 ? i : 1, r = Math.max(0, Math.min(100, u / c * 100));
  return /* @__PURE__ */ d.jsxs("div", { className: "sobp-stat", children: [
    /* @__PURE__ */ d.jsx("span", { children: si(n) }),
    /* @__PURE__ */ d.jsx("div", { className: "sobp-stat-track", children: /* @__PURE__ */ d.jsx("div", { className: "sobp-stat-fill", style: { width: `${r.toFixed(1)}%` } }) })
  ] });
}
function yn({
  src: n,
  title: i,
  description: u = "",
  subtitle: c = "",
  price: r = 0,
  size: m,
  border: g = "#3c2e16",
  round: h = !1
}) {
  const v = {
    width: m,
    height: m,
    borderColor: g,
    borderRadius: h ? "50%" : 3
  };
  return n ? /* @__PURE__ */ d.jsx(b1, { title: i, description: u, subtitle: c, price: r, iconSrc: n, border: g, children: /* @__PURE__ */ d.jsx("img", { className: "sobp-icon", src: n, alt: "", style: v }) }) : /* @__PURE__ */ d.jsx(b1, { title: i, description: u, subtitle: c, price: r, iconSrc: n, border: g, children: /* @__PURE__ */ d.jsx("span", { className: "sobp-icon sobp-icon--missing", style: v, children: "?" }) });
}
function b1({
  title: n,
  description: i,
  subtitle: u,
  price: c = 0,
  iconSrc: r,
  border: m,
  children: g
}) {
  const h = j.useRef(null), v = j.useRef(null), y = j.useRef(null), [b, C] = j.useState(!1), [A, w] = j.useState(!1), [L, D] = j.useState({ left: 0, top: 0, arrowLeft: 0, placement: "top", ready: !1 }), H = G2(i);
  j.useLayoutEffect(() => {
    if (!b || !h.current || !v.current) return;
    const X = 8, Q = 10, Z = h.current.getBoundingClientRect(), W = v.current.getBoundingClientRect(), z = Z.left + Z.width / 2;
    let Y = z - W.width / 2;
    Y = Math.max(X, Math.min(Y, window.innerWidth - W.width - X));
    let pe = "top", oe = Z.top - W.height - Q;
    oe < X && (pe = "bottom", oe = Z.bottom + Q), oe + W.height > window.innerHeight - X && (oe = Math.max(X, window.innerHeight - W.height - X));
    const se = Math.max(14, Math.min(z - Y, W.width - 14));
    D({ left: Y, top: oe, arrowLeft: se, placement: pe, ready: !0 });
    const fe = requestAnimationFrame(() => w(!0));
    return () => cancelAnimationFrame(fe);
  }, [b, n, i, u, c]);
  const F = () => {
    y.current != null && (window.clearTimeout(y.current), y.current = null), C(!0);
  }, V = () => {
    w(!1), y.current = window.setTimeout(() => {
      C(!1), y.current = null;
    }, 140);
  };
  return /* @__PURE__ */ d.jsxs(
    "span",
    {
      ref: h,
      className: "sobp-icon-tooltip-wrap",
      onMouseEnter: F,
      onMouseLeave: V,
      children: [
        g,
        b && em.createPortal(
          /* @__PURE__ */ d.jsxs(
            "div",
            {
              ref: v,
              className: `sobp-official-tooltip sobp-official-tooltip--${L.placement}${L.ready && A ? " sobp-official-tooltip--ready" : ""}`,
              style: {
                left: L.left,
                top: L.top,
                "--sobp-tooltip-arrow-left": `${L.arrowLeft}px`
              },
              children: [
                /* @__PURE__ */ d.jsxs("div", { className: "sobp-official-tooltip-head", children: [
                  /* @__PURE__ */ d.jsx("span", { className: "sobp-official-tooltip-icon", style: { borderColor: m }, children: r ? /* @__PURE__ */ d.jsx("img", { src: r, alt: "" }) : "?" }),
                  /* @__PURE__ */ d.jsxs("div", { className: "sobp-official-tooltip-titlebox", children: [
                    /* @__PURE__ */ d.jsx("div", { className: "sobp-official-tooltip-title", children: n }),
                    c > 0 ? /* @__PURE__ */ d.jsxs("div", { className: "sobp-official-tooltip-price", children: [
                      /* @__PURE__ */ d.jsx("span", { className: "sobp-gold-icon", "aria-hidden": "true" }),
                      /* @__PURE__ */ d.jsx("span", { children: c })
                    ] }) : u && /* @__PURE__ */ d.jsx("div", { className: "sobp-official-tooltip-subtitle", children: u })
                  ] })
                ] }),
                (H.stats.length > 0 || H.effectTitle || H.effectBody) && /* @__PURE__ */ d.jsxs("div", { className: "sobp-official-tooltip-desc", children: [
                  H.stats.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "sobp-official-tooltip-stats", children: H.stats.map((X) => /* @__PURE__ */ d.jsx("div", { children: X }, X)) }),
                  H.stats.length > 0 && (H.effectTitle || H.effectBody) && /* @__PURE__ */ d.jsx("div", { className: "sobp-official-tooltip-separator" }),
                  H.effectTitle && /* @__PURE__ */ d.jsx("div", { className: "sobp-official-tooltip-effect-title", children: H.effectTitle }),
                  H.effectBody && /* @__PURE__ */ d.jsx("div", { className: "sobp-official-tooltip-effect-body", children: H.effectBody })
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
function G2(n = "") {
  const i = n.trim();
  if (!i) return { stats: [], effectTitle: "", effectBody: "" };
  const u = i.split(/\n\s*\n/).map((r) => r.trim()).filter(Boolean);
  if (u.length >= 2) {
    const r = u[0].split(`
`).map((g) => g.trim()).filter(Boolean), m = u.slice(1).join(`

`).split(`
`).map((g) => g.trim()).filter(Boolean);
    return {
      stats: r,
      effectTitle: m[0] ?? "",
      effectBody: m.slice(1).join(`
`)
    };
  }
  const c = i.split(`
`).map((r) => r.trim()).filter(Boolean);
  return c.length >= 2 && c.slice(0, -1).every(q2) ? { stats: c, effectTitle: "", effectBody: "" } : {
    stats: [],
    effectTitle: c.length > 1 ? c[0] : "",
    effectBody: c.length > 1 ? c.slice(1).join(`
`) : c[0] ?? ""
  };
}
function q2(n) {
  return /^[+\d]/.test(n);
}
function Tc({ children: n, warning: i = !1 }) {
  return /* @__PURE__ */ d.jsx("div", { className: `sobp-message${i ? " sobp-message--warning" : ""}`, children: n });
}
function Ty(n, i) {
  return Math.max(i, ...n.map((u) => Number.isFinite(u.pick_rate) ? u.pick_rate : 0));
}
function K2(n, i) {
  return Math.max(i, ...n.map((u) => Number.isFinite(u.pick_rate) ? u.pick_rate : 0));
}
function si(n) {
  return Number.isFinite(n) ? `${((n ?? 0) * 100).toFixed(1)}%` : "-";
}
function H2(n) {
  return Number.isFinite(n) ? `${(n ?? 0).toFixed(2)}名` : "-";
}
function E1(n) {
  return n === 1 ? "银色" : n === 4 ? "金色" : n === 8 ? "棱彩" : `稀有度 ${n}`;
}
function V2(n) {
  return n === "kPrismatic" ? "#b788ff" : n === "kGold" ? "#c8aa6e" : n === "kSilver" ? "#a09b8c" : "#3c2e16";
}
class af extends Error {
  constructor(u, c) {
    super(u);
    Ae(this, "url");
    Ae(this, "status");
    Ae(this, "statusText");
    Ae(this, "body");
    this.name = "OpggApiError", this.url = c.url, this.status = c.status, this.statusText = c.statusText, this.body = c.body;
  }
}
const Wl = class Wl {
  async getVersions(i) {
    const { mode: u, signal: c, timeoutMs: r } = i;
    return this.request(`/api/global/champions/${u}/versions`, { signal: c, timeoutMs: r });
  }
  async getChampionsTier(i) {
    const { mode: u, tier: c, version: r, signal: m, timeoutMs: g } = i;
    return this.request(`/api/global/champions/${u}`, {
      params: { tier: c, version: r },
      signal: m,
      timeoutMs: g
    });
  }
  async getChampion(i) {
    const { id: u, mode: c, tier: r, version: m, signal: g, timeoutMs: h } = i, v = c === "aram" ? "none" : i.position, y = c === "arena" ? `/api/global/champions/${c}/${u}` : `/api/global/champions/${c}/${u}/${v ?? "none"}`;
    return this.request(y, {
      params: { tier: r, version: m },
      signal: g,
      timeoutMs: h
    });
  }
  async getARAMBalance(i = {}) {
    return this.request("/api/contents/aram-balance", i);
  }
  async request(i, u = {}) {
    var h, v;
    const c = new URL(i, Wl.BASE_URL);
    Object.entries(u.params ?? {}).forEach(([y, b]) => {
      b != null && b !== "" && c.searchParams.set(y, String(b));
    });
    const r = new AbortController(), m = window.setTimeout(() => r.abort(), u.timeoutMs ?? Wl.DEFAULT_TIMEOUT_MS), g = () => r.abort();
    (h = u.signal) == null || h.addEventListener("abort", g, { once: !0 });
    try {
      const y = await fetch(c.toString(), {
        method: "GET",
        mode: "cors",
        headers: { Accept: "application/json" },
        signal: r.signal
      }), b = await y.text(), C = X2(b);
      if (!y.ok)
        throw new af(`OP.GG 请求失败： ${y.status} ${y.statusText}`, {
          url: c.toString(),
          status: y.status,
          statusText: y.statusText,
          body: C
        });
      return C;
    } catch (y) {
      if (y instanceof af) throw y;
      const b = y instanceof Error ? y.message : String(y);
      throw new af(`OP.GG 请求失败： ${b}`, { url: c.toString() });
    } finally {
      window.clearTimeout(m), (v = u.signal) == null || v.removeEventListener("abort", g);
    }
  }
};
Ae(Wl, "BASE_URL", "https://lol-api-champion.op.gg"), Ae(Wl, "DEFAULT_TIMEOUT_MS", 1e4);
let wf = Wl;
function X2(n) {
  if (!n) return null;
  try {
    return JSON.parse(n);
  } catch {
    return n;
  }
}
const Wc = new wf(), Sm = "mid";
function ra(n) {
  const i = n.gameMode.toLowerCase();
  return i === "aram" || i === "kiwi" ? "aram" : i === "cherry" || i === "arena" ? "arena" : i === "nexusblitz" || i === "nexus_blitz" ? "nexus_blitz" : i === "urf" || i === "arurf" ? "urf" : "ranked";
}
function So(n) {
  return n.gameMode.toLowerCase() === "kiwi";
}
function _s(n) {
  const i = um(n);
  return i ? [i.title, i.name].filter(Boolean).join(" ") : `英雄 ${n}`;
}
function Cy(n) {
  switch (n) {
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
function bo(n, i) {
  const u = i.queueId > 0 ? di(i.queueId) : "";
  if (So(i)) return u || "海克斯大乱斗";
  if (u) return u;
  switch (n) {
    case "aram":
      return "极地大乱斗";
    case "arena":
      return "斗魂竞技场";
    case "urf":
      return "无限火力";
    case "nexus_blitz":
      return "极限闪击";
    default:
      return "召唤师峡谷";
  }
}
class Cc extends Error {
  constructor(u, c) {
    super(u);
    Ae(this, "url");
    Ae(this, "status");
    Ae(this, "statusText");
    Ae(this, "body");
    this.name = "AramggApiError", this.url = c.url, this.status = c.status, this.statusText = c.statusText, this.body = c.body;
  }
}
function nf(n) {
  return n !== null && typeof n == "object" && !Array.isArray(n);
}
function Zl(n) {
  return n == null ? null : typeof n == "string" || typeof n == "number" ? String(n) : null;
}
function Q2(n) {
  const i = JSON.parse(n);
  if (!nf(i) || !nf(i.augments)) return {};
  const u = {};
  for (const [c, r] of Object.entries(i.augments)) {
    if (!/^\d+$/.test(c) || !nf(r)) continue;
    const m = Zl(r.tier), g = Zl(r.pick_rate);
    if (m == null || g == null) continue;
    const h = Zl(r.average_index);
    u[c] = {
      tier: m,
      num_win_games: Zl(r.num_win_games),
      win_rate: Zl(r.win_rate),
      num_games: Zl(r.num_games),
      pick_rate: g,
      ...h != null ? { average_index: h } : {}
    };
  }
  return u;
}
function Uf(n, i) {
  n.championStats = {
    ...n.championStats ?? {},
    ...i
  };
}
function Z2(n, i, u) {
  if (!i) {
    Uf(n, { championId: String(u) });
    return;
  }
  Uf(n, {
    championId: i.championId,
    tier: i.tier,
    num_win_games: i.numWinGames != null ? String(i.numWinGames) : void 0,
    win_rate: i.winRate != null ? String(i.winRate) : void 0,
    num_games: i.numGames != null ? String(i.numGames) : void 0,
    pick_rate: i.pickRate != null ? String(i.pickRate) : void 0,
    version: i.version,
    date: i.date
  });
}
function J2(n, i = null, u = Number(n.championId)) {
  const c = Number.isFinite(u) && u > 0 ? u : Number(n.championId), r = {
    championStats: { championId: String(c || n.championId) },
    augments: {},
    coreItemBuilds: [],
    items: {}
  };
  for (const m of n.championAugments ?? [])
    if (!(!Array.isArray(m) || typeof m[1] != "string"))
      try {
        Object.assign(r.augments, Q2(m[1])), Uf(r, {
          championId: m[0] || String(c),
          version: m[2],
          date: m[3]
        });
      } catch {
      }
  return Z2(r, i, c), r;
}
const Qn = class Qn {
  constructor() {
    Ae(this, "championsStatsCache", null);
    Ae(this, "championsStatsPromise", null);
  }
  /**
   * 全英雄海克斯大乱斗 T 级/胜率榜。默认请求会缓存到当前客户端进程内，
   * 供启动预加载、选人角标和单英雄面板共同复用。
   */
  getChampionsStats(i = {}) {
    const u = i.signal == null;
    if (u && this.championsStatsCache) return Promise.resolve(this.championsStatsCache);
    if (u && this.championsStatsPromise) return this.championsStatsPromise;
    const c = this.request("/data/champions-stats.json", i).then((r) => {
      if (!Array.isArray(r))
        throw new Cc("[ARAMGG] 全英雄统计格式异常", {
          url: new URL("/data/champions-stats.json", Qn.BASE_URL).toString(),
          body: r
        });
      return u && (this.championsStatsCache = r, this.championsStatsPromise = null), r;
    }).catch((r) => {
      throw u && (this.championsStatsPromise = null), r;
    });
    return u && (this.championsStatsPromise = c), c;
  }
  async getChampionRanking(i) {
    return (await this.getChampionsStats()).find((c) => Number(c.championId) === i) ?? null;
  }
  getMayhemAugmentsZhCn(i = {}) {
    return this.request("/data/aram-mayhem-augments.zh_cn.json", i);
  }
  getAugmentsStatsRaw(i = {}) {
    return this.request("/data/augments-stats-raw.json", i);
  }
  async getAugmentsStats(i = {}) {
    return (await this.getAugmentsStatsRaw(i)).map(([c, r, m, g, h]) => ({
      augmentId: Number(c),
      rawAugmentId: c,
      stats: JSON.parse(r),
      patchVersion: m,
      updatedDate: g,
      marker: h
    }));
  }
  async getChampionRecommendation(i, u = {}) {
    const c = this.getChampionRanking(i).catch((h) => (console.warn(`[ARAMGG] champion ${i} ranking unavailable:`, h), null)), [r, m] = await Promise.all([
      this.request(`/data/champion-details/${i}.json`, u),
      c
    ]), g = J2(r, m, i);
    return console.groupCollapsed(`[ARAMGG] champion ${i} parsed recommendation`), console.log("summary:", {
      championStats: g.championStats,
      augmentCount: Object.keys(g.augments).length,
      coreItemBuildCount: g.coreItemBuilds.length,
      itemCount: Object.keys(g.items).length
    }), console.groupEnd(), g;
  }
  async request(i, u = {}) {
    var v, y;
    const c = new URL(i, Qn.BASE_URL), r = new AbortController(), m = u.timeoutMs ?? Qn.DEFAULT_TIMEOUT_MS, g = window.setTimeout(() => r.abort(), m), h = () => r.abort();
    (v = u.signal) == null || v.addEventListener("abort", h, { once: !0 });
    try {
      const b = await fetch(c.toString(), {
        method: "GET",
        mode: "cors",
        headers: { Accept: "application/json" },
        signal: r.signal
      }), C = await b.text(), A = C ? JSON.parse(C) : null;
      if (!b.ok)
        throw new Cc(`[ARAMGG] 请求失败: ${b.status} ${b.statusText}`, {
          url: c.toString(),
          status: b.status,
          statusText: b.statusText,
          body: A
        });
      return A;
    } catch (b) {
      if (b instanceof Cc) throw b;
      const C = b instanceof Error ? b.message : String(b);
      throw new Cc(`[ARAMGG] 请求异常: ${C}`, { url: c.toString() });
    } finally {
      window.clearTimeout(g), (y = u.signal) == null || y.removeEventListener("abort", h);
    }
  }
};
Ae(Qn, "BASE_URL", "https://aramgg.com"), Ae(Qn, "DEFAULT_TIMEOUT_MS", 1e4);
let Df = Qn;
const Of = new Df();
function Ny(n) {
  return "synergies" in n.data;
}
function My(n) {
  return "rune_pages" in n.data;
}
function Y2(n) {
  return "augment_group" in n.data && Array.isArray(n.data.augment_group) ? n.data.augment_group : [];
}
async function P2(n, i) {
  if (n.championId <= 0) return null;
  const u = ra(n), c = u === "ranked" ? n.position === "none" ? Sm : n.position : "none";
  if (So(n))
    return F2(n, u, c, i);
  const r = await Iy({
    id: n.championId,
    mode: u,
    tier: i,
    position: c
  }), m = Y2(r), g = My(r) ? r : null, h = Ny(r) ? r : null, v = r.data;
  return {
    mode: u,
    modeLabel: bo(u, n),
    version: r.meta.version,
    position: c,
    summary: sT(r),
    summonerSpells: (g == null ? void 0 : g.data.summoner_spells) ?? [],
    starterItems: v.starter_items ?? [],
    boots: v.boots ?? [],
    coreItems: v.core_items ?? [],
    prismItems: (h == null ? void 0 : h.data.prism_items) ?? [],
    lastItems: v.last_items ?? [],
    runePages: (g == null ? void 0 : g.data.runes) ?? [],
    matchups: g ? nT(g.data.counters) : [],
    augments: tT(m),
    meta: iT(r)
  };
}
async function F2(n, i, u, c) {
  var C;
  const [r, m, g] = await Promise.all([
    Iy({
      id: n.championId,
      mode: i,
      tier: c,
      position: u
    }).catch((A) => (R.warn("[OPGG] KIWI 基础配装请求失败，将只使用 ARAM.GG 数据:", A), null)),
    Of.getChampionRecommendation(n.championId),
    Of.getMayhemAugmentsZhCn().catch((A) => (R.warn("[ARAMGG] 海克斯稀有度请求失败，将尝试使用客户端资源兜底:", A), {}))
  ]), h = r && My(r) ? r : null, v = r == null ? void 0 : r.data, y = _2(m.coreItemBuilds), b = $2(m.items);
  return (y.length === 0 || b.length === 0) && R.warn(
    "[BuildRecommendation] ARAM.GG 装备分段为空，回退 OP.GG：champion=%d core=%d last=%d",
    n.championId,
    y.length,
    b.length
  ), {
    mode: i,
    modeLabel: bo(i, n),
    version: ((C = m.championStats) == null ? void 0 : C.version) || (r == null ? void 0 : r.meta.version) || n.gameVersion || "",
    position: u,
    summary: W2(m),
    summonerSpells: (h == null ? void 0 : h.data.summoner_spells) ?? [],
    starterItems: (v == null ? void 0 : v.starter_items) ?? [],
    boots: (v == null ? void 0 : v.boots) ?? [],
    coreItems: y.length > 0 ? y : (v == null ? void 0 : v.core_items) ?? [],
    prismItems: [],
    lastItems: b.length > 0 ? b : (v == null ? void 0 : v.last_items) ?? [],
    runePages: [],
    matchups: [],
    augments: lT(m.augments, g),
    meta: void 0
  };
}
function W2(n) {
  const i = n.championStats;
  return [
    `总体胜率 ${T1(C1(i == null ? void 0 : i.win_rate))}`,
    `登场 ${T1(C1(i == null ? void 0 : i.pick_rate))}`,
    `Tier ${(i == null ? void 0 : i.tier) || "-"}`
  ];
}
function T1(n) {
  return n != null && Number.isFinite(n) ? `${(n * 100).toFixed(1)}%` : "-";
}
function C1(n) {
  if (n == null || n === "") return null;
  const i = typeof n == "number" ? n : Number(n);
  return Number.isFinite(i) ? i : null;
}
function An(n) {
  const i = typeof n == "number" ? n : Number(n);
  return Number.isFinite(i) ? i : 0;
}
function _2(n) {
  return n.map((i) => {
    const u = An(i.games), c = An(i.wins);
    return {
      ids: i.itemIds.split(",").map((r) => Number(r)).filter((r) => Number.isFinite(r) && r > 0),
      win: c,
      play: u,
      pick_rate: An(i.pick_rate)
    };
  }).filter((i) => i.ids.length > 0);
}
function $2(n) {
  return Object.entries(n).map(([i, u]) => ({
    ids: [Number(i)].filter((c) => Number.isFinite(c) && c > 0),
    win: An(u.num_win_games),
    play: An(u.num_games),
    pick_rate: An(u.pick_rate),
    tier: Number(u.tier)
  })).filter((i) => i.ids.length > 0).sort((i, u) => (Number.isFinite(i.tier) ? i.tier : 99) - (Number.isFinite(u.tier) ? u.tier : 99) || u.pick_rate - i.pick_rate).map(({ tier: i, ...u }) => u);
}
function _c(n) {
  return n === 8 ? 0 : n === 4 ? 1 : n === 1 ? 2 : 99;
}
function xy(n) {
  if (typeof n == "number" && Number.isFinite(n)) return n;
  if (typeof n != "string") return null;
  const i = n.toLowerCase();
  if (i.includes("prismatic")) return 8;
  if (i.includes("gold")) return 4;
  if (i.includes("silver")) return 1;
  const u = Number(n);
  return Number.isFinite(u) ? u : null;
}
function eT(n, i) {
  if (typeof n != "number" || !Number.isFinite(n)) return xy(n);
  const u = new Set(Object.values(i).map((c) => c.rarity));
  return u.has(4) || u.has(8) ? n : n === 2 ? 8 : n === 1 ? 4 : n === 0 ? 1 : n;
}
function tT(n) {
  return n.map((i) => ({
    rarity: i.rarity,
    items: i.augments.slice(0, 5).map((u) => ({
      id: u.id,
      pickRate: u.pick_rate,
      averagePlace: u.total_place / Math.max(u.play, 1),
      firstPlace: u.first_place / Math.max(u.play, 1)
    }))
  })).sort((i, u) => _c(i.rarity) - _c(u.rarity));
}
function aT(n, i) {
  var u, c;
  return xy((u = $1(n)) == null ? void 0 : u.rarity) ?? eT((c = i[String(n)]) == null ? void 0 : c.rarity, i);
}
function nT(n) {
  return n.map((i) => ({
    championId: i.champion_id,
    play: i.play,
    win: i.win,
    winRate: i.play > 0 ? i.win / i.play : 0
  })).filter((i) => i.championId > 0 && i.play > 0);
}
function lT(n, i) {
  const u = /* @__PURE__ */ new Map();
  return Object.entries(n).forEach(([c, r]) => {
    const m = Number(c), g = aT(m, i);
    if (!Number.isFinite(m) || g == null) return;
    const h = u.get(g) ?? [];
    h.push({
      id: m,
      pickRate: An(r.pick_rate),
      winRate: An(r.win_rate)
    }), u.set(g, h);
  }), Array.from(u.entries()).sort(([c], [r]) => _c(c) - _c(r)).map(([c, r]) => ({
    rarity: c,
    items: r.sort((m, g) => g.winRate - m.winRate || g.pickRate - m.pickRate).slice(0, 5).map((m) => ({
      id: m.id,
      pickRate: m.pickRate,
      winRate: m.winRate
    }))
  }));
}
function iT(n) {
  const i = n.data.summary.average_stats, u = "tier_data" in i ? i.tier_data : void 0, c = u != null && u.rank && u.rank > 0 ? u.rank : i.rank > 0 ? i.rank : null, r = u != null && u.rank_prev && u.rank_prev > 0 ? u.rank_prev : null, m = ty().length || null;
  return {
    rank: c,
    previousRank: r,
    // 排名数字越小越强：从 #80 到 #60 记为上升 20。
    rankDelta: c != null && r != null ? r - c : null,
    totalRank: m,
    matchCount: n.meta.match_count ?? null,
    version: n.meta.version,
    updatedAt: n.meta.analyzed_at ?? n.meta.cached_at ?? ""
  };
}
async function Iy(n) {
  try {
    return await Wc.getChampion(n);
  } catch (i) {
    if (!n.version) throw i;
    return R.warn("[OPGG] 版本 %s 请求失败，回退到 OP.GG 最新版本:", n.version, i), Wc.getChampion({ ...n, version: void 0 });
  }
}
function sT(n) {
  if (Ny(n)) {
    const u = n.data.summary.average_stats;
    return [
      `排名 #${u.rank || "-"}`,
      `Tier ${u.tier || "-"}`,
      `登场 ${(u.pick_rate * 100).toFixed(1)}%`
    ];
  }
  const i = n.data.summary.average_stats;
  return [
    `总体胜率 ${(i.win_rate * 100).toFixed(1)}%`,
    `登场 ${(i.pick_rate * 100).toFixed(1)}%`,
    `Tier ${i.tier || "-"}`
  ];
}
const uT = "[Sona]", cT = 2003, oT = [11, 12, 30];
function rT(n) {
  return {
    id: String(n),
    count: n === cT ? 2 : 1
  };
}
function ky(n) {
  const i = /* @__PURE__ */ new Set(), u = [];
  for (const c of n) {
    const r = Number(c);
    !Number.isFinite(r) || r <= 0 || i.has(r) || (i.add(r), u.push(r));
  }
  return u;
}
function lf(n) {
  return ky(n.flatMap((i) => i.ids));
}
function dT(n) {
  return n.map((i, u) => ({ id: i, index: u, price: cb(i) })).sort((i, u) => u.price - i.price || i.index - u.index).map((i) => i.id);
}
function N1(n) {
  return n.play > 0 ? n.win / n.play : 0;
}
function vs(n) {
  return [...n].sort((i, u) => N1(u) - N1(i) || u.pick_rate - i.pick_rate || u.play - i.play);
}
function fT(n, i) {
  const u = ky(i);
  return u.length === 0 ? null : {
    type: n,
    items: u.map(rT)
  };
}
function As(n, i, u) {
  const c = fT(i, u);
  c && n.push(c);
}
function mT(n) {
  const i = [], u = vs(n.starterItems), c = vs(n.boots), r = vs(n.prismItems), m = vs(n.coreItems), g = vs(n.lastItems);
  return u.slice(0, 3).forEach((h, v) => {
    As(i, `${v + 1}. 出门装`, h.ids);
  }), As(i, `${i.length + 1}. 鞋子`, lf(c)), r.length > 0 && As(i, `${i.length + 1}. 棱彩装备`, lf(r)), m.slice(0, 5).forEach((h, v) => {
    As(i, `${i.length + 1}. 核心装 ${v + 1}`, h.ids);
  }), As(i, `${i.length + 1}. 后续装备`, dT(lf(g))), i;
}
function Ry(n) {
  const i = So(n) ? "kiwi" : ra(n);
  return `sona-${n.championId}-${i}-${n.position}`;
}
function gT(n, i) {
  const u = _s(n.championId), c = Cy(n.position), r = c ? `${i.modeLabel}/${c}` : i.modeLabel;
  return `${uT} ${u} - ${r}`;
}
function hT(n, i) {
  const u = mT(i);
  return u.length === 0 ? null : {
    uid: Ry(n),
    title: gT(n, i),
    type: "custom",
    mode: "any",
    map: "any",
    associatedChampions: [n.championId],
    associatedMaps: oT,
    blocks: u,
    preferredItemSlots: [],
    sortrank: 0,
    startedFrom: "blank"
  };
}
function pT(n, i) {
  return n.uid === i.uid || n.title === i.title;
}
function M1(n, i) {
  if (n.length !== i.length) return !1;
  const u = [...n].sort((r, m) => r - m), c = [...i].sort((r, m) => r - m);
  return u.every((r, m) => r === c[m]);
}
function yT(n, i) {
  return n.length !== i.length ? !1 : n.every((u, c) => {
    const r = i[c];
    return !r || u.type !== r.type || u.items.length !== r.items.length ? !1 : u.items.every((m, g) => {
      const h = r.items[g];
      return !!h && String(m.id) === String(h.id) && Number(m.count) === Number(h.count);
    });
  });
}
function vT(n, i) {
  return n.uid === i.uid && n.title === i.title && n.type === i.type && n.mode === i.mode && M1(n.associatedChampions ?? [], i.associatedChampions) && M1(n.associatedMaps ?? [], i.associatedMaps) && yT(n.blocks ?? [], i.blocks);
}
function AT(n, i) {
  const u = [], c = /* @__PURE__ */ new Set();
  let r = !1, m = 0;
  for (const g of n) {
    const h = i.findIndex(
      (y) => pT(g, y)
    );
    if (h < 0) {
      u.push(g);
      continue;
    }
    if (c.has(h)) {
      r = !0, m += 1;
      continue;
    }
    c.add(h);
    const v = i[h];
    vT(g, v) ? u.push(g) : (u.push(v), r = !0);
  }
  return i.forEach((g, h) => {
    c.has(h) || (u.push(g), r = !0);
  }), {
    itemSets: u,
    changed: r,
    removedDuplicates: m
  };
}
const ST = ".toggle-ability-previews-button", zf = "data-sona-opgg-build-hijacked", $c = "sona-opgg-build-panel", Bf = "data-sona-opgg-ingame-build", bT = "master_plus", x1 = 1e3, ET = 1500, TT = 1500, CT = 500, NT = 2e3, MT = [
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
], xT = ["top", "mid", "jungle", "adc", "support"], I1 = 8;
let Xn = null, kc = null, ws = null, eo = "", Us = "", ca = null, jf = 0, ei = null, Lf = 0, to = !1, ao = !1, ge = {
  championId: 0,
  queueId: 0,
  gameVersion: "",
  gameMode: "",
  position: "none"
}, ct = !1;
const Gf = [], vn = /* @__PURE__ */ new Map(), sf = /* @__PURE__ */ new Map();
let ti = null, qf = "", Ds = null, Zt = null, _t = null, qs = 0, Pn = "", no = "", lo = "", bm = 0, Em = 0, io = "", Yn = null, Rc = null, so = "", ai = "", Pl = null, Kf = "", Hf = 0;
const Fn = /* @__PURE__ */ new Set(), wc = /* @__PURE__ */ new Set(), Uc = /* @__PURE__ */ new Set(), Dc = /* @__PURE__ */ new Set(), Ks = /* @__PURE__ */ new Set(), Hs = /* @__PURE__ */ new Set();
function IT(n) {
  const i = n.myTeam.find((u) => u.cellId === n.localPlayerCellId);
  return (i == null ? void 0 : i.championId) ?? 0;
}
function Tm(n) {
  return n.myTeam.find((i) => i.cellId === n.localPlayerCellId);
}
function Eo(n) {
  const i = Tm(n);
  if (!i || i.championId <= 0) return !1;
  const u = n.actions.flat(2).filter((c) => c.actorCellId === n.localPlayerCellId && c.type === "pick");
  return u.length === 0 ? !0 : u.some((c) => c.completed);
}
function $s(n) {
  switch (n == null ? void 0 : n.trim().toLowerCase()) {
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
function kT(n) {
  const i = sm(n);
  return typeof (i == null ? void 0 : i.isRanked) == "boolean" ? i.isRanked : n === 420 || n === 440;
}
function RT(n) {
  var c, r;
  const i = Number((c = n.stats) == null ? void 0 : c.role_rate);
  if (Number.isFinite(i)) return i;
  const u = Number((r = n.stats) == null ? void 0 : r.pick_rate);
  return Number.isFinite(u) ? u : 0;
}
function wT(n) {
  const i = sf.get(n);
  if (i) return i;
  const u = Wc.getChampionsTier({
    mode: "ranked",
    tier: n
  }).then((c) => {
    const r = /* @__PURE__ */ new Map();
    for (const m of c.data) {
      const g = m.positions;
      if (!Array.isArray(g)) continue;
      const h = g.map((v) => ({
        position: $s(v.name),
        popularity: RT(v)
      })).filter((v) => v.position !== "none").sort((v, y) => y.popularity - v.popularity)[0];
      h && r.set(m.id, h.position);
    }
    return R.info("[OPGG] 英雄常见分路表已缓存 → tier=%s, champions=%d", n, r.size), r;
  }).catch((c) => {
    throw sf.delete(n), c;
  });
  return sf.set(n, u), u;
}
async function UT(n, i = Vs()) {
  if (n <= 0) return null;
  try {
    return (await wT(i)).get(n) ?? null;
  } catch (u) {
    return R.warn("[OPGG] 获取英雄常见分路失败:", u), null;
  }
}
async function wy(n) {
  const i = {
    championId: n.championId,
    queueId: n.queueId,
    gameMode: n.gameMode,
    position: n.assignedPosition
  };
  if (ra(i) !== "ranked") return "none";
  if (kT(n.queueId) && n.assignedPosition !== "none")
    return R.info("[OPGG] 推荐分路使用排位分配位置 → %s", n.assignedPosition), n.assignedPosition;
  const u = await UT(n.championId);
  return u ? (R.info(
    "[OPGG] 推荐分路使用英雄最常见位置 → championId=%d, position=%s, queueId=%d",
    n.championId,
    u,
    n.queueId
  ), u) : n.assignedPosition !== "none" ? n.assignedPosition : (R.warn("[OPGG] 无法识别推荐分路，回退到中路 → championId=%d", n.championId), Sm);
}
async function DT(n) {
  var c, r, m, g;
  const i = (c = sm(n)) == null ? void 0 : c.gameMode;
  if (i) return i;
  const u = await _.getGameflowSession().catch(() => null);
  return ((m = (r = u == null ? void 0 : u.gameData) == null ? void 0 : r.queue) == null ? void 0 : m.gameMode) || ((g = u == null ? void 0 : u.map) == null ? void 0 : g.gameMode) || "";
}
function OT(n) {
  return ra(n) === "ranked" && n.position === "none";
}
function Cm(n) {
  const i = ra(n), u = i === "ranked" ? n.position === "none" ? Sm : n.position : "none", c = Uy(n);
  return [
    n.championId,
    n.queueId,
    n.gameMode || "unknown",
    i,
    u,
    c,
    "latest"
  ].join("|");
}
function Nm(n) {
  return MT.includes(n) ? n : bT;
}
function Vs() {
  return Nm(q.get("opggBuildRecommendationTier"));
}
function Uy(n) {
  return So(n) || ra(n) === "arena" ? "all" : Vs();
}
function zT(n) {
  const i = n.gameMode.toLowerCase(), u = ra(n);
  return i === "kiwi" || u === "arena" ? null : u;
}
function mi(n) {
  const i = zT(n);
  return !i || n.championId <= 0 ? null : `${n.championId}:${i}`;
}
function BT(n) {
  return n.gameMode.toLowerCase() === "kiwi" ? "kiwi" : ra(n);
}
function eu(n) {
  const i = BT(n);
  return !i || n.championId <= 0 ? null : `${n.championId}:${i}`;
}
function _n(n) {
  return n.primaryStyleId > 0 && n.subStyleId > 0 && Array.isArray(n.selectedPerkIds) && n.selectedPerkIds.length >= 6;
}
function ui(n) {
  return n.spell1Id > 0 && n.spell2Id > 0 && n.spell1Id !== n.spell2Id;
}
function uo(n) {
  return `${n.spell1Id}:${n.spell2Id}`;
}
function ci(n) {
  return `${n.primaryStyleId}:${n.subStyleId}:${n.selectedPerkIds.join(",")}`;
}
function Dy(n, i, u) {
  const c = `${i}|${u}`, r = Date.now();
  if (c === Kf && r - Hf < NT)
    return;
  Kf = c, Hf = r;
  const m = _s(n.championId), g = Ly(n);
  Toast.success(`${m} ${g} 符文更改已保存 - Sona`);
}
function Oy(n, i) {
  ca = {
    key: n,
    page: {
      primaryStyleId: i.primaryStyleId,
      subStyleId: i.subStyleId,
      selectedPerkIds: [...i.selectedPerkIds]
    }
  };
}
function zy(n, i) {
  Pl = {
    key: n,
    spells: { ...i }
  };
}
function By(n, i, u) {
  if (!q.get("smartBuildRecommendation") || !_n(i)) return !1;
  const c = mi(n);
  if (!c) return !1;
  const r = { ...q.get("smartRunePages") }, m = r[c], g = !!(m && _n(m));
  if (g && !Ks.has(c)) return !1;
  const h = g ? ci(m) : "", v = ci(i);
  return h === v ? !1 : (r[c] = {
    primaryStyleId: i.primaryStyleId,
    subStyleId: i.subStyleId,
    selectedPerkIds: [...i.selectedPerkIds],
    updatedAt: Date.now()
  }, q.set("smartRunePages", r), Ks.add(c), no = c, R.info("[OPGG] 已保存首次智能符文最终快照 → key=%s, reason=%s, signature=%s", c, u, v), Dy(n, c, v), !0);
}
function jy(n, i, u) {
  if (!q.get("smartBuildRecommendation") || !ui(i)) return !1;
  const c = eu(n);
  if (!c) return !1;
  const r = { ...q.get("smartSummonerSpells") }, m = r[c], g = !!(m && ui(m));
  if (g && !Hs.has(c)) return !1;
  const h = g ? uo(m) : "", v = uo(i);
  return h === v ? !1 : (r[c] = {
    ...i,
    updatedAt: Date.now()
  }, q.set("smartSummonerSpells", r), Hs.add(c), lo = c, R.info("[OPGG] 已保存首次召唤师技能最终快照 → key=%s, reason=%s, spells=%s", c, u, v), !0);
}
function jT(n, i) {
  const u = mi(n), c = eu(n);
  let r = !1, m = !1;
  u && (ca == null ? void 0 : ca.key) === u && (r = By(n, ca.page, i)), c && (Pl == null ? void 0 : Pl.key) === c && (m = jy(n, Pl.spells, i)), (r || m) && R.info("[OPGG] 智能配置最终快照已落盘 → reason=%s, rune=%s, spells=%s", i, r, m);
}
async function LT(n, i, u) {
  if (!q.get("smartBuildRecommendation") || i.championId <= 0 || !Eo(n)) return;
  const c = mi(i), r = eu(i), m = `${c ?? "-"}|${r ?? "-"}`;
  if (Dc.has(m)) return;
  const g = q.get("smartRunePages"), h = q.get("smartSummonerSpells"), v = !!(c && (Ks.has(c) || !g[c] || !_n(g[c]))), y = !!(r && (Hs.has(r) || !h[r] || !ui(h[r])));
  if (!(!v && !y)) {
    Dc.add(m);
    try {
      let b = !1, C = !1;
      const A = Tm(n);
      if (y && r && A) {
        const w = { spell1Id: A.spell1Id, spell2Id: A.spell2Id };
        ui(w) && (zy(r, w), C = jy(i, w, u));
      }
      if (v && c) {
        let w = (ca == null ? void 0 : ca.key) === c ? ca.page : null;
        if (!w) {
          const L = await _.getRunePages(), D = qy(L);
          D && _n(D) && (w = {
            primaryStyleId: D.primaryStyleId,
            subStyleId: D.subStyleId,
            selectedPerkIds: [...D.selectedPerkIds]
          }, Oy(c, w));
        }
        w && (b = By(i, w, u));
      }
      (b || C) && R.info("[OPGG] 智能配置首次最终快照已保存 → reason=%s, rune=%s, spells=%s", u, b, C);
    } catch (b) {
      R.warn("[OPGG] 智能配置最终快照保存失败 → reason=%s:", u, b);
    } finally {
      Dc.delete(m);
    }
  }
}
function Sn(n) {
  if (n.championId <= 0) return null;
  const i = { ...n }, u = Cm(i), c = vn.get(u);
  if (c) return c;
  const r = {
    key: u,
    context: i,
    updatedAt: Date.now(),
    promise: Promise.resolve(null)
  };
  return r.promise = P2(i, Uy(i)).then((m) => (r.data = m, r.updatedAt = Date.now(), R.info("[OPGG] 配装推荐缓存完成 → %s", u), m)).catch((m) => (r.error = m instanceof Error ? m.message : String(m), r.data = null, r.updatedAt = Date.now(), R.warn("[OPGG] 配装推荐预拉取失败:", m), null)), vn.set(u, r), GT(), R.info("[OPGG] 开始后台预拉取配装推荐 → %s", u), r;
}
function GT() {
  if (vn.size <= I1) return;
  const n = Array.from(vn.values()).sort((i, u) => i.updatedAt - u.updatedAt);
  for (const i of n.slice(0, vn.size - I1))
    vn.delete(i.key);
}
function Ly(n) {
  const i = bo(ra(n), n), u = Cy(n.position);
  return u ? `${i}/${u}` : i;
}
function Gy(n) {
  return `${_s(n.championId)} ${bo(ra(n), n)} - Sona`;
}
function To(n) {
  return ge.championId === n.championId && ge.queueId === n.queueId && ge.gameMode === n.gameMode && ge.position === n.position;
}
function qT(n) {
  var g;
  if (!q.get("smartBuildRecommendation")) {
    R.info("[OPGG] 跳过符文保存：符文/召唤师技能自动配置未开启");
    return;
  }
  if (ge.championId <= 0 || !ct) {
    R.info("[OPGG] 跳过符文保存：英雄未锁定 → championId=%d, locked=%s", ge.championId, ct);
    return;
  }
  if (n.current === !1 && n.isActive === !1) {
    R.info("[OPGG] 跳过符文保存：非当前生效符文页 → name=%s, current=%s, isActive=%s", n.name, n.current, n.isActive);
    return;
  }
  if (!_n(n)) {
    R.info("[OPGG] 跳过符文保存：符文页无效 → primaryStyleId=%d, subStyleId=%d, perks=%d", n.primaryStyleId, n.subStyleId, ((g = n.selectedPerkIds) == null ? void 0 : g.length) ?? 0);
    return;
  }
  const i = mi(ge);
  if (!i) {
    R.info("[OPGG] 跳过符文保存：无法生成 runeKey → championId=%d, gameMode=%s", ge.championId, ge.gameMode || "unknown");
    return;
  }
  const u = ci(n);
  if (u === io && Date.now() < bm) {
    R.info("[OPGG] 跳过符文保存：与 Sona 自动恢复的符文相同 → key=%s, signature=%s", i, u);
    return;
  }
  const c = { ...q.get("smartRunePages") }, r = c[i], m = r ? ci(r) : "";
  c[i] = {
    primaryStyleId: n.primaryStyleId,
    subStyleId: n.subStyleId,
    selectedPerkIds: [...n.selectedPerkIds],
    updatedAt: Date.now()
  }, q.set("smartRunePages", c), Ks.delete(i), R.info("[OPGG] 已保存智能符文 → key=%s, page=%s, signature=%s", i, Gy(ge), u), m !== u && Dy(ge, i, u);
}
function KT(n, i) {
  if (!q.get("smartBuildRecommendation") || Date.now() < Em || !ct || i.championId <= 0) return;
  const u = eu(i);
  if (!u) return;
  const c = {
    spell1Id: n.spell1Id,
    spell2Id: n.spell2Id
  };
  if (!ui(c)) return;
  const r = uo(c);
  if (zy(u, c), so !== u) {
    so = u, ai = r;
    return;
  }
  if (ai === r) return;
  ai = r;
  const m = { ...q.get("smartSummonerSpells") };
  m[u] = {
    ...c,
    updatedAt: Date.now()
  }, q.set("smartSummonerSpells", m), Hs.delete(u), R.info("[OPGG] 已保存智能召唤师技能 → key=%s, spells=%s", u, r);
}
function qy(n) {
  return n.find((i) => i.current) ?? n.find((i) => i.isActive) ?? null;
}
async function HT() {
  if (!q.get("smartBuildRecommendation") || ge.championId <= 0 || !ct) return;
  const n = mi(ge);
  if (n)
    try {
      const i = await _.getRunePages(), u = qy(i);
      if (!u || !_n(u)) return;
      const c = ci(u);
      if (Oy(n, u), n !== eo) {
        eo = n, Us = c;
        return;
      }
      if (c === Us) return;
      R.info(
        "[OPGG] 轮询检测到符文页变化 → name=%s, id=%s, current=%s, isActive=%s, signature=%s",
        u.name,
        u.id,
        u.current,
        u.isActive,
        c
      ), Us = c, qT(u);
    } catch (i) {
      R.debug("[OPGG] 轮询符文页失败:", i);
    }
}
function k1() {
  ws == null && (eo = "", Us = "", ws = window.setInterval(() => {
    HT();
  }, x1), R.info("[OPGG] 已启动符文页轮询（每 %dms 读取一次）", x1));
}
function VT() {
  ws != null && (window.clearInterval(ws), ws = null), eo = "", Us = "";
}
async function Ky(n) {
  const i = n.map(({ context: h, recommendation: v }) => hT(h, v)).filter((h) => h != null);
  if (i.length === 0) {
    R.warn("[OPGG] 装备集生成失败：没有可写入的装备 block");
    return;
  }
  const u = await _.getSummonerInfo(), c = await _.getItemSets(u.summonerId), r = Array.isArray(c == null ? void 0 : c.itemSets) ? c.itemSets : [], m = AT(r, i);
  if (!m.changed) {
    R.info("[OPGG] 自动装备集内容未变化，跳过写入：%s", i.map((h) => h.title).join(" | "));
    return;
  }
  await _.putItemSets(u.summonerId, {
    accountId: (c == null ? void 0 : c.accountId) ?? u.accountId ?? 0,
    itemSets: m.itemSets,
    timestamp: Date.now()
  }), R.info(
    "[OPGG] 自动装备集已同步：%d 个，清理重复项=%d → %s",
    i.length,
    m.removedDuplicates,
    i.map((h) => h.title).join(" | ")
  );
  const g = _s(n[0].context.championId);
  Toast.success(`${g} 出装已配备 - Sona`);
}
function XT(n) {
  const i = `sona-${n.championId}-ranked-all`;
  if (Pn === i || Fn.has(i)) return;
  Fn.add(i);
  const u = xT.map((c) => {
    const r = { ...n, position: c };
    return { context: r, entry: Sn(r) };
  });
  Promise.all(u.map(({ entry: c }) => (c == null ? void 0 : c.promise) ?? Promise.resolve(null))).then(async (c) => {
    if (!q.get("smartItemSetBuild") || !ct || !To(n) || Pn === i) return;
    const r = u.map(({ context: m }, g) => ({ context: m, recommendation: c[g] })).filter(
      (m) => !!m.recommendation
    );
    r.length !== 0 && (await Ky(r), Pn = i);
  }).catch((c) => {
    R.warn("[OPGG] 自动装备集同步失败:", c);
  }).finally(() => {
    Fn.delete(i);
  });
}
function co(n) {
  if (!q.get("smartItemSetBuild") || !ct) return;
  if (OT(n.context)) {
    XT(n.context);
    return;
  }
  const i = Ry(n.context);
  Pn === i || Fn.has(i) || (Fn.add(i), n.promise.then(async (u) => {
    !u || !q.get("smartItemSetBuild") || ct && To(n.context) && Pn !== i && (await Ky([{ context: n.context, recommendation: u }]), Pn = i);
  }).catch((u) => {
    R.warn("[OPGG] 自动装备集同步失败:", u);
  }).finally(() => {
    Fn.delete(i);
  }));
}
async function QT(n) {
  if (!q.get("smartBuildRecommendation") || !ct || !To(n)) return !1;
  const i = mi(n);
  if (!i || no === i || wc.has(i)) return !1;
  const u = q.get("smartRunePages")[i];
  if (!u || !_n(u)) return !1;
  wc.add(i);
  try {
    io = ci(u), bm = Date.now() + ET;
    const c = Gy(n);
    return await _.applyRunePage({
      name: c,
      primaryStyleId: u.primaryStyleId,
      subStyleId: u.subStyleId,
      selectedPerkIds: [...u.selectedPerkIds]
    }), no = i, R.info("[OPGG] 已自动应用智能符文 → key=%s, page=%s, signature=%s", i, c, io), !0;
  } finally {
    wc.delete(i);
  }
}
async function ZT(n) {
  if (!q.get("smartBuildRecommendation") || !ct || !To(n)) return !1;
  const i = eu(n);
  if (!i || lo === i || Uc.has(i)) return !1;
  const u = q.get("smartSummonerSpells")[i];
  if (!u || !ui(u)) return !1;
  Uc.add(i);
  try {
    return Em = Date.now() + TT, await _.updateMySelection({
      spell1Id: u.spell1Id,
      spell2Id: u.spell2Id
    }), lo = i, so = i, ai = uo(u), R.info("[OPGG] 已自动恢复召唤师技能 → key=%s, spells=%s", i, ai), !0;
  } finally {
    Uc.delete(i);
  }
}
async function JT(n) {
  const [i, u] = await Promise.all([
    QT(n).catch((g) => (R.warn("[OPGG] 智能符文自动恢复失败:", g), !1)),
    ZT(n).catch((g) => (R.warn("[OPGG] 智能召唤师技能自动恢复失败:", g), !1))
  ]);
  if (!i && !u) return;
  const c = _s(n.championId), r = Ly(n), m = i && u ? "符文 & 召唤师技能" : i ? "符文" : "召唤师技能";
  Toast.success(`${c} ${r} ${m}已恢复 - Sona`);
}
function YT(n) {
  q.get("smartBuildRecommendation") && ct && (Rc = { ...n }, Yn != null && window.clearTimeout(Yn), Yn = window.setTimeout(() => {
    const i = Rc;
    Rc = null, Yn = null, i && JT(i).catch((u) => {
      R.warn("[OPGG] 智能配置自动恢复失败:", u);
    });
  }, CT));
}
function Os() {
  ei != null && (window.clearTimeout(ei), ei = null), Lf = 0;
}
function zs(n = 250) {
  ei == null && (ei = window.setTimeout(async () => {
    ei = null, Lf++;
    try {
      if (await _.getGameflowPhase().catch(() => null) !== "ChampSelect") {
        Os();
        return;
      }
      const u = await _.getChampSelectSession();
      if (Eo(u)) {
        Os(), await oo(u);
        return;
      }
    } catch {
    }
    Lf < 600 ? zs(500) : (Os(), R.warn("[OPGG] 等待本地英雄锁定超时，未触发智能配置"));
  }, n));
}
async function oo(n) {
  var u;
  const i = ++jf;
  try {
    const c = n ?? await _.getChampSelectSession(), r = Tm(c), m = c.queueId ?? 0, g = (r == null ? void 0 : r.championId) ?? IT(c), h = await DT(m), v = $s(r == null ? void 0 : r.assignedPosition), y = await wy({
      championId: g,
      queueId: m,
      gameMode: h,
      assignedPosition: v
    });
    if (i !== jf) return;
    if (ct = Eo(c), ge = {
      championId: g,
      queueId: m,
      gameVersion: ge.gameVersion,
      gameMode: h,
      position: y
    }, r && KT(r, ge), ge.gameVersion || (ge.gameVersion = await _.getGameVersion().catch(() => "")), R.info(
      "[OPGG] ChampSelect context refreshed → championId=%d, queueId=%d, gameMode=%s, position=%s, version=%s",
      ge.championId,
      ge.queueId,
      ge.gameMode || "unknown",
      ge.position,
      ge.gameVersion || "unknown"
    ), ge.championId > 0) {
      q.get("opggBuildRecommendation") ? _T() : Qy();
      const b = Sn(ge);
      if (b && ct && co(b), ct) {
        YT(ge);
        const C = (u = c.timer) == null ? void 0 : u.phase;
        (C === "FINALIZATION" || C === "GAME_STARTING") && LT(c, { ...ge }, `champ-select:${C}`);
      }
    } else
      ro(!1);
  } catch (c) {
    R.warn("[OPGG] 刷新选人上下文失败:", c);
  }
}
function Xs() {
  var n;
  Ds && (Ds.unmount(), Ds = null), (n = document.getElementById($c)) == null || n.remove(), qf = "", ti && (document.removeEventListener("mousedown", ti, !0), ti = null);
}
function Hy() {
  if (!Zt) return;
  const n = () => Hy();
  Zt.render(
    j.createElement(oi, {
      open: !1,
      onClose: n,
      width: 1120,
      height: 700,
      closable: !1,
      children: j.createElement("div")
    })
  ), window.setTimeout(() => {
    Zt && (Zt.unmount(), Zt = null), _t && (_t.remove(), _t = null);
  }, 240);
}
function PT() {
  Zt && (Zt.unmount(), Zt = null), _t && (_t.remove(), _t = null);
}
function Qs(n, i, u) {
  _t || (_t = document.createElement("div"), _t.id = "sona-opgg-ingame-modal-root", document.body.appendChild(_t), Zt = bn.createRoot(_t));
  const c = (i == null ? void 0 : i.data) ?? null, r = (i == null ? void 0 : i.error) ?? "", m = !!(i && i.data === void 0 && !i.error), g = () => Hy(), h = (y) => {
    const b = Nm(y);
    q.set("opggBuildRecommendationTier", b), vn.delete(Cm(n));
    const C = Sn(n), A = ++qs;
    Qs(n, C, A), uf(n, C, A);
  }, v = (y) => {
    const b = $s(y);
    if (b === "none" || b === n.position) return;
    const C = { ...n, position: b };
    ge = { ...C };
    const A = Sn(C);
    A && ct && co(A);
    const w = ++qs;
    Qs(C, A, w), uf(C, A, w);
  };
  Zt.render(
    j.createElement(oi, {
      open: !0,
      onClose: g,
      width: 1120,
      height: 700,
      closable: !1,
      children: j.createElement(
        "div",
        { className: "sona-opgg-modal-content" },
        j.createElement(by, {
          context: n,
          recommendation: c,
          loadError: r,
          isLoading: m,
          selectedTier: Vs(),
          onTierChange: h,
          onPositionChange: v,
          onClose: g
        })
      )
    })
  ), uf(n, i, u);
}
function uf(n, i, u) {
  !i || i.data !== void 0 || i.error || i.promise.then(() => {
    u !== qs || !Zt || Qs(n, i, u);
  }).catch(() => {
    u !== qs || !Zt || Qs(n, i, u);
  });
}
async function FT() {
  var b, C, A, w, L, D, H, F, V;
  const [n, i] = await Promise.all([
    _.getGameflowSession(),
    _.getSummonerInfo()
  ]), u = (C = (b = n.gameData) == null ? void 0 : b.playerChampionSelections) == null ? void 0 : C.find((X) => X.puuid === i.puuid), r = [
    ...((A = n.gameData) == null ? void 0 : A.teamOne) ?? [],
    ...((w = n.gameData) == null ? void 0 : w.teamTwo) ?? []
  ].find((X) => X.puuid === i.puuid || X.obfuscatedPuuid === i.puuid), m = (u == null ? void 0 : u.championId) || (r == null ? void 0 : r.championId) || ge.championId;
  if (!m)
    throw new Error("无法识别当前英雄");
  const g = ((D = (L = n.gameData) == null ? void 0 : L.queue) == null ? void 0 : D.id) ?? ge.queueId, h = ((F = (H = n.gameData) == null ? void 0 : H.queue) == null ? void 0 : F.gameMode) || ((V = n.map) == null ? void 0 : V.gameMode) || ge.gameMode, v = $s((r == null ? void 0 : r.selectedPosition) || (r == null ? void 0 : r.selectedRole) || ge.position), y = await wy({
    championId: m,
    queueId: g,
    gameMode: h,
    assignedPosition: v
  });
  return {
    championId: m,
    queueId: g,
    gameVersion: ge.gameVersion || await _.getGameVersion().catch(() => ""),
    gameMode: h,
    position: y
  };
}
async function WT() {
  const n = await FT();
  ge = { ...n };
  const i = Sn(n), u = ++qs;
  Qs(n, i, u);
}
async function Vf(n, i) {
  i ? ge = { ...i } : ge.championId <= 0 ? await oo() : oo();
  const u = i ? { ...i } : { ...ge }, c = Sn(u), r = (c == null ? void 0 : c.data) ?? null, m = (c == null ? void 0 : c.error) ?? "", g = !!(c && c.data === void 0 && !c.error);
  Xs(), qf = (c == null ? void 0 : c.key) ?? "";
  const h = document.getElementById("lol-uikit-layer-manager-wrapper") ?? document.body, v = document.createElement("div");
  v.id = $c, v.style.cssText = [
    "position:fixed",
    "inset:0",
    "z-index:19002",
    "width:0",
    "height:0",
    "overflow:visible",
    "pointer-events:none"
  ].join(";");
  const y = document.createElement("div");
  y.style.cssText = [
    "position:absolute",
    "opacity:0",
    "visibility:hidden",
    "pointer-events:auto",
    "transition:opacity 0.16s ease-out"
  ].join(";"), v.appendChild(y);
  const b = document.createElement("lol-uikit-tooltip");
  b.setAttribute("data-tooltip-position", "top"), y.appendChild(b);
  const C = document.createElement("div");
  C.style.cssText = [
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
  ].join(";"), b.appendChild(C);
  const A = bn.createRoot(C);
  Ds = A;
  const w = (Z) => {
    const W = Nm(Z);
    q.set("opggBuildRecommendationTier", W), vn.delete(Cm(u));
    const z = Sn(u);
    z && co(z), Vf(n, u);
  }, L = (Z) => {
    const W = $s(Z);
    if (W === "none" || W === u.position) return;
    const z = { ...u, position: W };
    ge = { ...z };
    const Y = Sn(z);
    Y && ct && co(Y), Vf(n, z);
  };
  R1(
    A,
    u,
    r,
    m,
    g,
    Vs(),
    w,
    L
  ), h.appendChild(v);
  const D = n.getBoundingClientRect(), H = y.offsetWidth, F = y.offsetHeight, V = 8, X = Math.max(20, Math.min(D.left + D.width / 2 - H / 2, window.innerWidth - H - 20)), Q = Math.max(20, D.top - F - V);
  y.style.left = `${X}px`, y.style.top = `${Q}px`, y.style.visibility = "visible", y.style.opacity = "1", ti = (Z) => {
    const W = Z.target;
    !v.contains(W) && !n.contains(W) && Xs();
  }, requestAnimationFrame(() => {
    ti && document.addEventListener("mousedown", ti, !0);
  }), c && g && c.promise.then(() => {
    if (document.getElementById($c) !== v || qf !== c.key || Ds !== A) return;
    R1(
      A,
      c.context,
      c.data ?? null,
      c.error ?? "",
      !1,
      Vs(),
      w,
      L
    );
    const Z = n.getBoundingClientRect(), W = y.offsetWidth, z = y.offsetHeight, Y = Math.max(20, Math.min(Z.left + Z.width / 2 - W / 2, window.innerWidth - W - 20)), pe = Math.max(20, Z.top - z - V);
    y.style.left = `${Y}px`, y.style.top = `${pe}px`;
  });
}
function R1(n, i, u, c, r, m, g, h) {
  em.flushSync(() => {
    n.render(j.createElement(by, {
      context: i,
      recommendation: u,
      loadError: c,
      isLoading: r,
      selectedTier: m,
      onTierChange: g,
      onPositionChange: h,
      onClose: Xs
    }));
  });
}
function Vy() {
  const n = document.querySelectorAll(`${ST}:not([${zf}])`);
  return n.length === 0 ? (R.info("[OPGG] 未找到技能预览面板元素"), !1) : (n.forEach((i) => {
    if (!(i instanceof HTMLElement)) return;
    const u = i.innerText, c = (r) => {
      if (r.stopPropagation(), r.stopImmediatePropagation(), r.preventDefault(), document.getElementById($c)) {
        Xs();
        return;
      }
      Vf(i);
    };
    i.setAttribute(zf, "true"), i.innerText = "配装推荐", i.style.cursor = "pointer", i.addEventListener("click", c, !0), Gf.push({ el: i, handler: c, originalText: u });
  }), R.info("[OPGG] 已接管技能预览面板点击 → %d 个元素", n.length), !0);
}
function Xy() {
  const n = document.querySelector(".game-in-progress-container");
  if (!n) return !1;
  if (n.querySelector(`[${Bf}]`)) return !0;
  const i = document.createElement("lol-uikit-flat-button");
  i.setAttribute(Bf, "true"), i.textContent = "配装推荐", i.addEventListener("click", (c) => {
    c.stopPropagation(), c.preventDefault(), WT().catch((r) => {
      R.warn("[OPGG] 游戏内配装推荐弹窗打开失败:", r), typeof Toast < "u" && Toast.error("配装推荐打开失败，请稍后再试");
    });
  });
  const u = n.querySelector("[data-sona-game-analysis]");
  return (u == null ? void 0 : u.parentElement) === n ? u.insertAdjacentElement("afterend", i) : n.appendChild(i), R.info("[OPGG] 游戏内配装推荐按钮已注入 ✓"), !0;
}
function Xf() {
  ao || (tt.register(Xy), ao = !0);
}
function Qf() {
  ao && (tt.unregister(Xy), ao = !1), document.querySelectorAll(`[${Bf}]`).forEach((n) => n.remove()), PT();
}
function _T() {
  to || (tt.register(Vy), to = !0, R.info("[OPGG] 已检测到本地英雄，开始接管技能预览入口"));
}
function Qy() {
  to && (tt.unregister(Vy), to = !1);
  for (const { el: n, handler: i, originalText: u } of Gf)
    n.removeEventListener("click", i, !0), n.removeAttribute(zf), n.innerText = u, n.style.cursor = "";
  Gf.length = 0, Xs();
}
function ro(n = !0) {
  jf += 1, Os(), VT(), Qy(), n && (ge = {
    championId: 0,
    queueId: 0,
    gameVersion: ge.gameVersion,
    gameMode: "",
    position: "none"
  }), ct = !1, Pn = "", no = "", lo = "", io = "", bm = 0, Em = 0, Yn != null && (window.clearTimeout(Yn), Yn = null), Rc = null, so = "", ai = "", ca = null, Pl = null, Kf = "", Hf = 0, Fn.clear(), wc.clear(), Uc.clear(), Dc.clear(), Ks.clear(), Hs.clear();
}
function $T() {
  Xn || (Xn = _.observe(oa.GAMEFLOW_PHASE_CHANGE, (n) => {
    const i = n.data;
    (i === "GameStart" || i === "InProgress") && ct && ge.championId > 0 && jT({ ...ge }, `gameflow:${i}`), i === "ChampSelect" ? (Qf(), R.info("[OPGG] 进入 ChampSelect，等待本地英雄锁定"), k1(), zs()) : i === "InProgress" ? (ro(), Xf()) : (Qf(), ro());
  }), kc = _.observe(oa.CHAMP_SELECT, (n) => {
    if (n.eventType !== "Create" && n.eventType !== "Update") return;
    const i = n.data;
    Eo(i) ? (Os(), oo(i)) : zs(500);
  }), _.getGameflowPhase().then((n) => {
    n === "ChampSelect" ? (k1(), zs()) : n === "InProgress" && Xf();
  }).catch(() => {
  }), R.info("[OPGG] 配装推荐接管已启用 ✓"));
}
function e5(n) {
  if (n && !Xn)
    $T();
  else if (n && Xn)
    _.getGameflowPhase().then((i) => {
      i === "ChampSelect" ? zs() : i === "InProgress" && Xf();
    }).catch(() => {
    });
  else if (!n) {
    if (!Xn) return;
    Xn(), Xn = null, Qf(), kc && (kc(), kc = null), ro(), R.info("[OPGG] 配装推荐接管已禁用");
  }
}
const t5 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%3e%3cg%20fill='none'%20fill-rule='nonzero'%3e%3cpath%20fill='%23E84057'%20d='M2%200h20v18.056L12%2023%202%2018.056z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='m6.666%2015-1.274-1.274V6.614L6.666%205.34h3.598l1.274%201.274v7.112L10.264%2015zm1.12-1.54H9.13l.462-.462V7.342L9.13%206.88H7.786l-.462.462v5.656zM12.854%2015V5.34h4.802l1.26%201.274v3.654l-1.26%201.274H14.8V15zm1.946-4.914h1.75l.42-.434V7.23l-.42-.434H14.8z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", Zy = [
  { selector: ".champion-grid-champion-thumbnail", size: 22, left: -2, top: 0 },
  { selector: ".champion-card-component-click-target", size: 22, left: -2, top: 0 },
  { selector: ".bench-champion-icon", size: 18, left: -2, top: -2 }
], a5 = { size: 20, left: -2, top: "auto", bottom: -2 }, n5 = Zy.map((n) => n.selector).join(","), Mm = "data-sona-champ-tier-badge", Oc = "data-sona-original-position", l5 = "emerald_plus", i5 = [
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
], s5 = /* @__PURE__ */ new Map([
  [0, t5],
  [1, py],
  [2, yy],
  [3, vy],
  [4, Ay],
  [5, Sy]
]), xm = /* @__PURE__ */ new Map([
  [0, "OP"],
  [1, "T1"],
  [2, "T2"],
  [3, "T3"],
  [4, "T4"],
  [5, "T5"]
]), u5 = ["ranked", "aram", "arena", "kiwi", "urf", "nexus_blitz"];
let Ss = null, Nc = null, fo = !1, wa = /* @__PURE__ */ new Map(), ua = null, mo = "", zc = 0;
const cf = /* @__PURE__ */ new Map();
function Jy(n) {
  return i5.includes(n) ? n : l5;
}
function w1(n) {
  const i = n.toLowerCase();
  return i === "kiwi" ? "kiwi" : i === "aram" ? "aram" : i === "cherry" || i === "arena" ? "arena" : i === "nexusblitz" || i === "nexus_blitz" ? "nexus_blitz" : i === "urf" || i === "arurf" ? "urf" : "ranked";
}
function Yy(n) {
  return n === "arena" || n === "kiwi" ? "all" : Jy(q.get("opggBuildRecommendationTier"));
}
function Py(n, i) {
  return `${n}|${i}`;
}
function c5(n) {
  var u, c;
  const i = n.positions.filter((r) => {
    var m, g;
    return Number.isFinite((g = (m = r.stats) == null ? void 0 : m.tier_data) == null ? void 0 : g.tier);
  }).sort((r, m) => r.stats.tier_data.tier - m.stats.tier_data.tier)[0];
  return i ? {
    tier: i.stats.tier_data.tier,
    winRate: Zs(i.stats.win_rate)
  } : {
    tier: Fy((u = n.average_stats) == null ? void 0 : u.tier),
    winRate: Zs((c = n.average_stats) == null ? void 0 : c.win_rate)
  };
}
function o5(n, i) {
  if (i === "ranked")
    return c5(n);
  const u = n.average_stats;
  if (!u) return { tier: null, winRate: null };
  const c = "win_rate" in u ? Zs(u.win_rate) : Zs(u.play > 0 ? u.win / u.play : null);
  return {
    tier: Fy(u.tier),
    winRate: c
  };
}
function Fy(n) {
  return typeof n == "number" && Number.isFinite(n) && n >= 0 && n <= 5 ? n : null;
}
function Zs(n) {
  return typeof n == "number" && Number.isFinite(n) && n >= 0 ? n : null;
}
function r5(n, i) {
  const u = /* @__PURE__ */ new Map();
  for (const c of n.data) {
    const r = o5(c, i);
    (r.tier != null || r.winRate != null) && u.set(c.id, r);
  }
  return u;
}
function d5(n) {
  const i = /* @__PURE__ */ new Map();
  for (const u of n) {
    const c = Number(u.championId), r = Number(u.tier), m = u.winRate;
    if (!Number.isFinite(c) || c <= 0) continue;
    const g = {
      tier: Number.isFinite(r) && r >= 1 && r <= 5 ? r : null,
      winRate: Zs(m)
    };
    (g.tier != null || g.winRate != null) && i.set(c, g);
  }
  return i;
}
function Wy(n, i = Yy(n)) {
  const u = Py(n, i), c = cf.get(u);
  if (c != null && c.data) return Promise.resolve(c.data);
  if (c != null && c.promise) return c.promise;
  const r = {}, m = n === "kiwi" ? "ARAM.GG" : "OP.GG";
  return r.promise = (n === "kiwi" ? Of.getChampionsStats().then(d5) : Wc.getChampionsTier({ mode: n, tier: i }).then((g) => r5(g, n))).then((g) => (r.data = g, r.promise = void 0, R.info("[ChampTier] 已缓存 %s 英雄 T 级 → mode=%s, tier=%s, count=%d", m, n, i, g.size), g)).catch((g) => {
    throw r.promise = void 0, cf.delete(u), R.warn("[ChampTier] %s 英雄 T 级预加载失败 → mode=%s, tier=%s:", m, n, i, g), g;
  }), cf.set(u, r), r.promise;
}
function f5() {
  const n = Jy(q.get("opggBuildRecommendationTier"));
  R.info("[ChampTier] 开始预加载全模式英雄 T 级数据 → tier=%s", n), u5.forEach((i) => {
    Wy(i, i === "arena" || i === "kiwi" ? "all" : n).catch(() => {
    });
  });
}
async function m5(n) {
  var g, h, v, y, b, C;
  const i = n ?? await _.getChampSelectSession().catch(() => null), u = (i == null ? void 0 : i.queueId) ?? 0, c = u > 0 ? (g = sm(u)) == null ? void 0 : g.gameMode : "";
  if (c)
    return { mode: w1(c), gameMode: c, queueId: u };
  const r = await _.getGameflowSession().catch(() => null), m = ((v = (h = r == null ? void 0 : r.gameData) == null ? void 0 : h.queue) == null ? void 0 : v.gameMode) || ((y = r == null ? void 0 : r.map) == null ? void 0 : y.gameMode) || "";
  return { mode: w1(m), gameMode: m, queueId: u || ((C = (b = r == null ? void 0 : r.gameData) == null ? void 0 : b.queue) == null ? void 0 : C.id) || 0 };
}
async function _y(n) {
  const i = ++zc, u = n ?? await _.getChampSelectSession().catch(() => null);
  ua = u;
  const { mode: c, gameMode: r, queueId: m } = await m5(u ?? void 0), g = Yy(c), h = Py(c, g);
  if (h === mo && wa.size > 0) {
    Js();
    return;
  }
  mo = h, R.info("[ChampTier] 读取英雄 T 级缓存 → mode=%s, tier=%s, gameMode=%s, queueId=%d", c, g, r || "unknown", m);
  try {
    const v = await Wy(c, g);
    if (i !== zc) return;
    wa = v, Js();
  } catch {
    if (i !== zc) return;
    wa = /* @__PURE__ */ new Map();
  }
}
function g5(n) {
  var u, c, r;
  const i = [
    n,
    n.parentElement,
    n.closest(".champion-card-component"),
    n.closest(".bench-champion"),
    n.closest(".champion-grid-champion"),
    n.closest("[data-champion-id]"),
    n.closest("[data-champion-id-value]"),
    n.closest("[data-champion-id-string]")
  ].filter(Boolean);
  for (const m of i)
    for (const g of ["data-champion-id", "data-champion-id-value", "data-champion-id-string", "champion-id"]) {
      const h = m.getAttribute(g);
      if (h && /^\d+$/.test(h)) return Number(h);
    }
  for (const m of i) {
    const g = m.querySelector('img[src*="champion-icons"]'), h = (u = g == null ? void 0 : g.getAttribute("src")) == null ? void 0 : u.match(/champion-icons\/(\d+)\.png/);
    if (h) return Number(h[1]);
    const v = m.outerHTML.match(/champion-icons\/(\d+)\.png/);
    if (v) return Number(v[1]);
    const y = m.querySelector('[style*="champion-icons"]'), C = [
      ((c = m.style) == null ? void 0 : c.backgroundImage) ?? "",
      ((r = y == null ? void 0 : y.style) == null ? void 0 : r.backgroundImage) ?? ""
    ].join(" ").match(/champion-icons\/(\d+)\.png/);
    if (C) return Number(C[1]);
  }
  return null;
}
function $y(n, i) {
  const u = s5.get(n), c = xm.get(n);
  if (!u || !c) return null;
  const r = document.createElement("img");
  return r.setAttribute(Mm, "true"), r.src = u, r.alt = c, r.title = c, r.style.cssText = [
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
function ev(n) {
  window.getComputedStyle(n).position === "static" && (n.setAttribute(Oc, n.style.position), n.style.position = "relative");
}
function tv(n) {
  return Array.from(n.children).find((i) => i instanceof HTMLImageElement && i.hasAttribute(Mm)) ?? null;
}
function Js() {
  return wa.size === 0 || (document.querySelectorAll(n5).forEach((i) => {
    if (!(i instanceof HTMLElement)) return;
    const u = Zy.find((h) => i.matches(h.selector));
    if (!u) return;
    const c = g5(i), r = c != null ? wa.get(c) : void 0, m = r == null ? void 0 : r.tier, g = tv(i);
    if (!r) {
      g == null || g.remove();
      return;
    }
    if (m == null)
      g == null || g.remove();
    else {
      const h = xm.get(m);
      if (!(g instanceof HTMLImageElement && g.alt === h)) {
        g == null || g.remove();
        const v = $y(m, u);
        v && (ev(i), i.appendChild(v));
      }
    }
  }), h5()), !0;
}
function h5() {
  if (!(ua != null && ua.myTeam)) return;
  document.querySelectorAll(".party.visible .summoner-wrapper.visible.left").forEach((i, u) => {
    var b;
    const c = i.querySelector(".champion-icon-container");
    if (!c) return;
    const r = ua == null ? void 0 : ua.myTeam[u], m = r ? p5(r) : 0, g = tv(c);
    if (!m) {
      g == null || g.remove();
      return;
    }
    const h = (b = wa.get(m)) == null ? void 0 : b.tier;
    if (h == null) {
      g == null || g.remove();
      return;
    }
    const v = xm.get(h);
    if (g instanceof HTMLImageElement && g.alt === v) return;
    g == null || g.remove();
    const y = $y(h, a5);
    y && (ev(c), c.appendChild(y));
  });
}
function p5(n) {
  return n.championId > 0 ? n.championId : n.championPickIntent > 0 ? n.championPickIntent : 0;
}
function av() {
  document.querySelectorAll(`[${Mm}]`).forEach((n) => n.remove()), document.querySelectorAll(`[${Oc}]`).forEach((n) => {
    n instanceof HTMLElement && (n.style.position = n.getAttribute(Oc) ?? "", n.removeAttribute(Oc));
  });
}
function U1(n) {
  av(), wa = /* @__PURE__ */ new Map(), ua = null, mo = "", fo || (tt.register(Js), fo = !0), _y(n);
}
function D1() {
  zc++, mo = "", wa = /* @__PURE__ */ new Map(), ua = null, fo && (tt.unregister(Js), fo = !1), av();
}
function O1(n) {
  n && !Ss ? (Ss = _.observe(oa.GAMEFLOW_PHASE_CHANGE, (i) => {
    i.data === "ChampSelect" ? U1() : D1();
  }), Nc = _.observe(oa.CHAMP_SELECT, (i) => {
    i.eventType !== "Create" && i.eventType !== "Update" || (ua = i.data, wa.size === 0 ? _y(i.data) : Js());
  }), _.getGameflowPhase().then((i) => {
    i === "ChampSelect" && U1();
  }).catch(() => {
  }), R.info("[ChampTier] 英雄选择 T 级角标已启用 ✓")) : !n && Ss && (Ss(), Ss = null, Nc && (Nc(), Nc = null), D1(), R.info("[ChampTier] 英雄选择 T 级角标已禁用"));
}
function nv(n) {
  return n >= 70 ? {
    id: "blazing",
    borderColor: "#ff3300",
    particleColors: ["#ff3300", "#ffaa00", "#ff003c"],
    particleStyle: "fire",
    boxShadow: "0 0 15px rgba(255,51,0,0.5)"
  } : n >= 60 ? {
    id: "strong",
    borderColor: "#c8aa6e",
    particleColors: ["#4a9eff", "#7ec8ff", "#2060c0"],
    particleStyle: "magic",
    boxShadow: "0 0 8px rgba(74,158,255,0.35)"
  } : n >= 50 ? {
    id: "normal",
    borderColor: "#3c2e16",
    particleColors: ["#a09b8c", "#5c6b73", "#d1d8e0"],
    particleStyle: "ambient",
    boxShadow: "0 0 6px rgba(160,155,140,0.25)"
  } : n >= 40 ? {
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
function y5({ winRate: n, width: i = 160, height: u = 160 }) {
  const c = j.useRef(null), r = nv(n);
  return j.useEffect(() => {
    const m = c.current;
    if (!m) return;
    const g = m.getContext("2d");
    if (!g) return;
    const h = g, v = i / 2, y = u / 2, b = Math.min(i, u) / 4;
    let C = 0;
    const A = [];
    function w() {
      const D = Math.random() * Math.PI * 2, H = b + Math.random() * 5, F = r.particleColors, V = {
        x: v + Math.cos(D) * H,
        y: y + Math.sin(D) * H,
        vx: 0,
        vy: 0,
        size: Math.random() * 2.5 + 0.5,
        color: F[Math.floor(Math.random() * F.length)],
        life: 1,
        decay: Math.random() * 0.01 + 5e-3
      };
      switch (r.particleStyle) {
        case "fire":
          V.vx = Math.cos(D) * (Math.random() * 0.3 + 0.1), V.vy = Math.sin(D) * (Math.random() * 0.3 + 0.1) - 0.2, V.decay = Math.random() * 8e-3 + 3e-3;
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
          const X = b + 15;
          V.x = v + Math.cos(D) * X, V.y = y + Math.sin(D) * X, V.vx = -Math.cos(D) * (Math.random() * 0.4 + 0.1), V.vy = -Math.sin(D) * (Math.random() * 0.4 + 0.1), V.decay = Math.random() * 0.015 + 0.01;
          break;
        }
      }
      return V;
    }
    function L() {
      h.clearRect(0, 0, i, u);
      const D = r.particleStyle === "fire" ? 3 : 2, H = r.particleStyle === "ambient" ? 0.7 : 0.3;
      for (let F = 0; F < D; F++)
        Math.random() > H && A.push(w());
      for (let F = A.length - 1; F >= 0; F--) {
        const V = A[F];
        if (V.x += V.vx, V.y += V.vy, V.life -= V.decay, V.life <= 0) {
          A.splice(F, 1);
          continue;
        }
        h.beginPath(), h.arc(V.x, V.y, V.size, 0, Math.PI * 2);
        const X = V.x - v, Q = V.y - y, Z = Math.sqrt(X * X + Q * Q), W = Math.min(i, u) / 2, z = Math.max(0, 1 - Z / W);
        h.globalAlpha = V.life * z, h.fillStyle = V.color;
        const Y = r.particleStyle;
        Y === "fire" || Y === "magic" ? (h.shadowBlur = 8, h.shadowColor = V.color) : Y === "ambient" ? (h.shadowBlur = 3, h.shadowColor = V.color) : h.shadowBlur = 0, h.fill(), h.globalAlpha = 1;
      }
      C = requestAnimationFrame(L);
    }
    return L(), () => {
      cancelAnimationFrame(C), h.clearRect(0, 0, i, u);
    };
  }, [r, i, u]), /* @__PURE__ */ d.jsx(
    "canvas",
    {
      ref: c,
      width: i,
      height: u,
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
function v5(n) {
  return n.puuid ? `puuid:${n.puuid}` : n.summonerId ? `summoner:${n.summonerId}` : n.obfuscatedPuuid ? `obfuscated-puuid:${n.obfuscatedPuuid}` : n.obfuscatedSummonerId ? `obfuscated-summoner:${n.obfuscatedSummonerId}` : `cell:${n.cellId}`;
}
function Bc(n) {
  return n.obfuscatedPuuid ? `obfuscated-puuid:${n.obfuscatedPuuid}` : n.obfuscatedSummonerId ? `obfuscated-summoner:${n.obfuscatedSummonerId}` : n.puuid ? `puuid:${n.puuid}` : n.summonerId ? `summoner:${n.summonerId}` : `floor:${n.floor}`;
}
function jc(n) {
  return n.puuid ? n.puuid : n.nameVisibilityType !== "HIDDEN" || !n.obfuscatedPuuid ? "" : X1(n.obfuscatedPuuid);
}
async function A5() {
  const n = await _.getChampSelectSession(), i = n.queueId;
  R.info("[TeamStats] 当前队列 ID: %d", i);
  const u = yo(i), c = Math.max(
    q.get("champSelectAssist") ? q.get("champSelectAssistFetchCount") || 50 : 0,
    q.get("analyzeTeamPower") ? q.get("analyzeTeamPowerFetchCount") || 50 : 0,
    20
  ), r = (v, y, b = jc(v), C) => ({
    floor: y + 1,
    summonerId: (C == null ? void 0 : C.summonerId) || v.summonerId,
    puuid: b,
    obfuscatedSummonerId: v.obfuscatedSummonerId,
    obfuscatedPuuid: v.obfuscatedPuuid,
    gameName: (C == null ? void 0 : C.gameName) || v.gameName,
    tagLine: (C == null ? void 0 : C.tagLine) || v.tagLine,
    winRate: null,
    wins: 0,
    total: 0,
    avgK: 0,
    avgD: 0,
    avgA: 0,
    kdaNum: 0,
    strengthScore: null
  }), m = Rm(n), g = m.filter((v) => v.nameVisibilityType === "HIDDEN" && !v.puuid);
  if (g.length > 0) {
    const v = g.filter((y) => !!jc(y)).length;
    R.info("[TeamStats] 匿名模式身份还原: %d/%d", v, g.length);
  }
  const h = await Promise.all(m.map(async (v, y) => {
    const b = jc(v);
    if (!b)
      return R.warn("[TeamStats] %d楼缺少可查询的 PUUID（visibility=%s）", y + 1, v.nameVisibilityType || "unknown"), r(v, y, "");
    const C = !v.gameName || !v.tagLine || !v.summonerId, A = C ? _.getSummonerByPuuid(b).catch((w) => (R.warn("[TeamStats] %d楼 Riot ID 回填失败:", y + 1, w), null)) : Promise.resolve(null);
    try {
      const [w, L] = await Promise.all([
        _.getSgpMatchHistory(b, {
          startIndex: 0,
          count: c,
          tag: u || void 0
        }),
        A
      ]), D = v.gameName || (L == null ? void 0 : L.gameName) || (L == null ? void 0 : L.displayName) || "", H = v.tagLine || (L == null ? void 0 : L.tagLine) || "", F = v.summonerId || (L == null ? void 0 : L.summonerId) || 0, V = { summonerId: F, gameName: D, tagLine: H };
      C && D && R.info("[TeamStats] %d楼匿名 Riot ID 回填成功 → %s%s", y + 1, D, H ? `#${H}` : "");
      const X = w.games ?? [], Q = pm(X, i), Z = [];
      for (const fe of Q) {
        const Ne = fe.json.participants.find((Re) => Re.puuid === b);
        Ne && (hm(fe, b) || Z.push({
          kills: Ne.kills,
          deaths: Ne.deaths,
          assists: Ne.assists,
          win: Ne.win
        }));
      }
      if (Z.length === 0)
        return r(v, y, b, V);
      let W = 0, z = 0, Y = 0, pe = 0;
      for (const fe of Z)
        fe.win && W++, z += fe.kills, Y += fe.deaths, pe += fe.assists;
      const oe = Z.length, se = fy(Q, b);
      return R.info(
        "[TeamStats] %s → 当前模式有效 %d 场 / 返回 %d 场 (queueId=%d, tag=%s)",
        D,
        oe,
        X.length,
        i,
        u || "全部"
      ), {
        floor: y + 1,
        summonerId: F,
        puuid: b,
        obfuscatedSummonerId: v.obfuscatedSummonerId,
        obfuscatedPuuid: v.obfuscatedPuuid,
        gameName: D,
        tagLine: H,
        winRate: W / oe * 100,
        wins: W,
        total: oe,
        avgK: z / oe,
        avgD: Y / oe,
        avgA: pe / oe,
        kdaNum: Y === 0 ? z + pe : (z + pe) / Y,
        strengthScore: se
      };
    } catch (w) {
      R.warn("[TeamStats] %d楼战绩查询失败（visibility=%s）:", y + 1, v.nameVisibilityType || "unknown", w);
      const L = await A;
      return r(v, y, b, {
        summonerId: v.summonerId || (L == null ? void 0 : L.summonerId) || 0,
        gameName: v.gameName || (L == null ? void 0 : L.gameName) || (L == null ? void 0 : L.displayName) || "",
        tagLine: v.tagLine || (L == null ? void 0 : L.tagLine) || ""
      });
    }
  }));
  return { queueId: i, stats: h };
}
const lv = "data-sona-tier", Zf = "data-sona-stats", Jf = "data-sona-click", Yf = "data-sona-player-key", Bs = "data-sona-hidden-player-name", Im = "data-sona-hidden-player-key", km = "data-sona-hidden-real-name", Pf = "data-sona-hidden-name-suffix", Ff = "sona-hidden-player-name-style";
let mn = [], Ys = /* @__PURE__ */ new Map(), Ps = /* @__PURE__ */ new Map(), Fs = /* @__PURE__ */ new Map(), Ws = /* @__PURE__ */ new Map(), go = "", ho = 0, Wf = [], Fl = [], gn = null, hn = null;
function S5(n, i, u) {
  hn || (hn = document.createElement("div"), hn.id = "sona-match-history-modal-root", document.body.appendChild(hn), gn = bn.createRoot(hn));
  const c = () => {
    gn == null || gn.render(
      j.createElement(Wn, { open: !1, onClose: c, puuid: "", playerName: "" })
    );
  };
  gn.render(
    j.createElement(Wn, { open: !0, onClose: c, puuid: n, playerName: i, queueId: u })
  );
}
function b5() {
  gn && (gn.unmount(), gn = null), hn && (hn.remove(), hn = null);
}
function E5() {
  if (document.getElementById(Ff)) return;
  const n = document.createElement("style");
  n.id = Ff, n.textContent = `
    .player-name-wrapper[${Bs}]::before {
      content: attr(${km}) "(";
    }

    .player-name-wrapper[${Bs}] > [${Pf}] {
      display: inline-flex !important;
      align-items: center;
      gap: 3px;
      vertical-align: -1px;
      white-space: nowrap;
      pointer-events: none;
    }

    .player-name-wrapper[${Bs}] > [${Pf}] > svg {
      width: 11px;
      height: 11px;
      flex: 0 0 11px;
      color: #e6c76a !important;
      -webkit-text-fill-color: #e6c76a !important;
      filter: drop-shadow(0 0 3px rgba(200, 170, 110, 0.55));
    }
  `, document.head.appendChild(n);
}
function T5() {
  const n = document.createElement("span");
  n.setAttribute(Pf, "true"), n.setAttribute("aria-hidden", "true"), n.appendChild(document.createTextNode(")"));
  const i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.setAttribute("viewBox", "0 0 16 16"), i.setAttribute("fill", "none"), i.setAttribute("focusable", "false");
  const u = document.createElementNS("http://www.w3.org/2000/svg", "path");
  u.setAttribute("d", "M5 7V5a3 3 0 0 1 6 0v2"), u.setAttribute("stroke", "currentColor"), u.setAttribute("stroke-width", "1.6"), u.setAttribute("stroke-linecap", "round");
  const c = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  c.setAttribute("x", "3"), c.setAttribute("y", "7"), c.setAttribute("width", "10"), c.setAttribute("height", "7"), c.setAttribute("rx", "2"), c.setAttribute("fill", "rgba(230, 199, 106, 0.18)"), c.setAttribute("stroke", "currentColor"), c.setAttribute("stroke-width", "1.4");
  const r = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  return r.setAttribute("cx", "8"), r.setAttribute("cy", "10.5"), r.setAttribute("r", "0.9"), r.setAttribute("fill", "currentColor"), i.append(u, c, r), n.appendChild(i), n;
}
function z1(n, i) {
  return Array.from(n.childNodes).filter((u) => u !== i).map((u) => u.textContent ?? "").join("").trim();
}
function iv(n) {
  n.suffixElement.remove(), n.nameElement.removeAttribute(Bs), n.nameElement.removeAttribute(Im), n.nameElement.removeAttribute(km), n.previousTitle == null ? n.nameElement.removeAttribute("title") : n.nameElement.setAttribute("title", n.previousTitle), n.previousAriaLabel == null ? n.nameElement.removeAttribute("aria-label") : n.nameElement.setAttribute("aria-label", n.previousAriaLabel);
}
function C5(n, i, u) {
  if (!i.obfuscatedPuuid || !i.gameName) return;
  const c = n.querySelector(".player-name-wrapper");
  if (!c) return;
  let r = Fl.find((h) => h.nameElement === c), m = !1;
  if (r && r.playerKey !== u && (iv(r), Fl = Fl.filter((h) => h !== r), r = void 0), r) {
    const h = z1(c, r.suffixElement);
    h && (r.originalAlias = h);
  } else {
    const h = z1(c);
    if (!h) return;
    const v = T5();
    r = {
      nameElement: c,
      suffixElement: v,
      playerKey: u,
      originalAlias: h,
      previousTitle: c.getAttribute("title"),
      previousAriaLabel: c.getAttribute("aria-label")
    }, Fl.push(r), m = !0;
  }
  (r.suffixElement.parentElement !== c || c.lastChild !== r.suffixElement) && c.appendChild(r.suffixElement), E5();
  const g = `${i.gameName}(${r.originalAlias})`;
  c.setAttribute(Bs, "true"), c.setAttribute(Im, u), c.setAttribute(km, i.gameName), c.setAttribute("title", `${g} · 匿名模式`), c.setAttribute("aria-label", `${g}，匿名模式`), m && R.info("[ChampSelect] %d楼匿名名字增强 → %s", i.floor, g);
}
function Rm(n) {
  return n.myTeam.filter((i) => !!i.puuid || !!i.obfuscatedPuuid);
}
function sv(n) {
  return Rm(n).map((i) => `${v5(i)}:${i.cellId}`).join("|");
}
function N5(n, i) {
  const u = (n.puuid ? Ys.get(n.puuid) : void 0) ?? (n.summonerId ? Ps.get(n.summonerId) : void 0) ?? (n.obfuscatedPuuid ? Fs.get(n.obfuscatedPuuid) : void 0) ?? (n.obfuscatedSummonerId ? Ws.get(n.obfuscatedSummonerId) : void 0);
  return u ? {
    ...u,
    floor: i,
    gameName: n.gameName || u.gameName,
    tagLine: n.tagLine || u.tagLine,
    puuid: n.puuid || u.puuid,
    summonerId: n.summonerId || u.summonerId,
    obfuscatedPuuid: n.obfuscatedPuuid || u.obfuscatedPuuid,
    obfuscatedSummonerId: n.obfuscatedSummonerId || u.obfuscatedSummonerId
  } : {
    floor: i,
    summonerId: n.summonerId,
    puuid: jc(n),
    obfuscatedSummonerId: n.obfuscatedSummonerId,
    obfuscatedPuuid: n.obfuscatedPuuid,
    gameName: n.gameName,
    tagLine: n.tagLine,
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
function uv(n) {
  return Rm(n).map((i, u) => N5(i, u + 1));
}
const _f = [];
function wm() {
  const n = document.querySelectorAll(".party.visible .summoner-wrapper.visible.left");
  if (n.length === 0 || mn.length === 0) return !0;
  Array.from(n).some((c, r) => {
    const m = c.querySelector(".champion-icon-container"), g = c.querySelector(".player-name-wrapper"), h = mn[r];
    if (!h) return !1;
    const v = Bc(h), y = m == null ? void 0 : m.getAttribute(Yf), b = g == null ? void 0 : g.getAttribute(Im);
    return !!(y && y !== v || b && b !== v);
  }) && Um();
  const u = R5(mn);
  return n.forEach((c, r) => {
    var C;
    const m = mn[r];
    if (!m) return;
    const g = Bc(m);
    C5(c, m, g);
    const h = c.querySelector(".champion-icon-container");
    if (!h || m.winRate == null) return;
    const v = m.winRate;
    if (h.setAttribute(Yf, g), !h.querySelector("[data-sona-particle]")) {
      h.setAttribute(lv, "true"), h.style.position = "relative", h.style.overflow = "visible", h.style.borderRadius = "50%";
      const A = nv(v);
      A.boxShadow && (h.style.boxShadow = A.boxShadow);
      const w = document.createElement("div");
      w.setAttribute("data-sona-particle", "true"), h.prepend(w);
      const L = h.getBoundingClientRect(), D = Math.max(L.width, L.height) + 40, H = bn.createRoot(w);
      H.render(j.createElement(y5, { winRate: v, width: D, height: D })), _f.push({ root: H, container: w }), R.info("头像粒子特效 → %d楼 胜率%s%% → %s", r + 1, v.toFixed(1), A.id);
    }
    let y = null;
    if (!h.hasAttribute(Jf) && m.puuid) {
      h.setAttribute(Jf, "true"), h.style.cursor = "pointer";
      const A = g;
      y = (w) => {
        if (w.target.closest(".swap-button-component, .swap-button-btn")) return;
        w.stopPropagation(), w.preventDefault();
        const D = mn.find((H) => Bc(H) === A);
        if (D != null && D.puuid) {
          const H = D.gameName ? `${D.gameName}${D.tagLine ? `#${D.tagLine}` : ""}` : "";
          S5(D.puuid, H, ho || void 0);
        }
      }, h.addEventListener("click", y, !0);
    }
    const b = c.querySelector(".player-details");
    if (b && !b.querySelector(`[${Zf}]`)) {
      b.style.position = "relative", b.style.overflow = "visible";
      const A = b.closest(".summoner-container");
      A && (A.style.overflow = "visible");
      const w = m.kdaNum >= 99 ? "完美" : m.kdaNum.toFixed(1), L = v >= 55 ? "#5bbd72" : v >= 45 ? "#c8aa6e" : "#e74c3c", D = document.createElement("div");
      D.setAttribute(Zf, "true"), D.style.cssText = "position:absolute;left:0;top:100%;display:flex;flex-wrap:wrap;align-items:center;gap:3px 0;font-size:11px;line-height:1.2;white-space:nowrap;margin-top:2px;";
      const H = document.createElement("span");
      H.style.cssText = `color:${L};font-weight:bold;display:inline-block;min-width:90px;`, H.textContent = `${v.toFixed(0)}% (${m.wins}胜/${m.total - m.wins}负)`;
      const F = m.kdaNum >= 5 ? "#5bbd72" : m.kdaNum >= 3 ? "#c8aa6e" : "#e74c3c", V = document.createElement("span");
      if (V.style.cssText = `color:${F};margin-left:8px;font-weight:bold;text-shadow:0 0 4px rgba(200,170,110,0.6);`, V.textContent = `KDA ${w}`, D.appendChild(H), D.appendChild(V), q.get("analyzeTeamPower")) {
        const X = document.createElement("span");
        X.setAttribute("data-sona-team-power", "true"), X.style.cssText = "flex-basis:100%;color:#c8aa6e;font-weight:bold;";
        const Q = u.get(g) ?? "🆕 萌新上线", Z = ((C = m.strengthScore) == null ? void 0 : C.score.toFixed(1)) ?? "--";
        X.textContent = `${Q} · ${Z}`, X.title = `本模式有效样本：近${m.total}场`, D.appendChild(X);
      }
      b.appendChild(D), Wf.push({ statsDiv: D, iconContainer: h, summonerContainer: A, playerDetails: b, clickHandler: y }), R.info(
        "[ChampSelect] %d楼战绩更新成功 → %s#%s 胜率%s%% (%d胜/%d负) KDA %s",
        r + 1,
        m.gameName ?? "?",
        m.tagLine ?? "?",
        v.toFixed(0),
        m.wins,
        m.total - m.wins,
        w
      );
    }
  }), !0;
}
let po = !1, Lc = 0;
function M5() {
  po || (tt.register(wm), po = !0);
}
function Gc() {
  var n;
  Lc++, po && (tt.unregister(wm), po = !1), mn = [], Ys.clear(), Ps.clear(), Fs.clear(), Ws.clear(), go = "", ho = 0, Um(), (n = document.getElementById(Ff)) == null || n.remove(), b5();
}
async function cv() {
  if (!(!q.get("champSelectAssist") && !q.get("analyzeTeamPower")))
    try {
      Gc();
      const n = Lc, { stats: i, queueId: u } = await A5();
      if (n !== Lc) return;
      const c = await _.getChampSelectSession();
      if (n !== Lc || c.queueId !== u) return;
      ho = u, Ys.clear(), Ps.clear(), Fs.clear(), Ws.clear();
      for (const r of i)
        r.puuid && Ys.set(r.puuid, r), r.summonerId && Ps.set(r.summonerId, r), r.obfuscatedPuuid && Fs.set(r.obfuscatedPuuid, r), r.obfuscatedSummonerId && Ws.set(r.obfuscatedSummonerId, r);
      mn = uv(c), go = sv(c), M5(), R.info("头像特效数据就绪，%d 位队友，队列 ID: %d", i.length, ho);
    } catch (n) {
      R.error("头像特效查询失败:", n);
    }
}
let bs = null, Mc = null;
function x5(n) {
  if (n.eventType !== "Update" || Ys.size === 0 && Ps.size === 0 && Fs.size === 0 && Ws.size === 0) return;
  const i = n.data;
  if (!(i != null && i.myTeam)) return;
  const u = sv(i);
  u !== go && (R.info("[ChampSelect] 检测到队友展示顺序或分路变化，重建头像战绩绑定"), Um(), mn = uv(i), go = u, wm());
}
function Um() {
  _f.forEach(({ root: n, container: i }) => {
    n.unmount(), i.remove();
  }), _f.length = 0;
  for (const n of Fl)
    iv(n);
  Fl = [];
  for (const n of Wf)
    n.statsDiv.remove(), n.clickHandler && n.iconContainer.removeEventListener("click", n.clickHandler, !0), n.iconContainer.style.filter = "", n.iconContainer.style.boxShadow = "", n.iconContainer.removeAttribute(lv), n.iconContainer.removeAttribute(Jf), n.iconContainer.removeAttribute(Yf), n.iconContainer.style.cursor = "", n.playerDetails.removeAttribute(Zf), n.playerDetails.style.cursor = "", n.summonerContainer && (n.summonerContainer.style.overflow = "");
  Wf = [];
}
function I5(n) {
  n && !bs ? (bs = _.observe(oa.GAMEFLOW_PHASE_CHANGE, (i) => {
    i.data === "ChampSelect" ? (Gc(), cv()) : Gc();
  }), Mc = _.observe(oa.CHAMP_SELECT, x5), R.info("Champ select assist enabled ✓")) : !n && bs && (bs(), bs = null, Gc(), Mc && (Mc(), Mc = null), R.info("Champ select assist disabled"));
}
function k5(n, i) {
  return n >= 75 && i >= 4.5 ? "👑 峡谷通天代" : n >= 70 ? "🚀 降维来炸鱼" : n >= 65 ? "🔥 绝对真大腿" : n >= 60 ? "⚔️ 绝活哥出列" : n >= 56 ? "✨ 稳健老司机" : n >= 52 ? "🛡️ 上分好帮手" : n >= 48 ? "🎲 峡谷摇摆人" : n >= 45 ? "🫠 默默抗压中" : n >= 41 ? "🍂 随缘在补位" : n >= 37 ? "💀 连败渡劫中" : n >= 33 ? "🤡 敌方突破口" : n >= 28 ? "💸 峡谷提款机" : n >= 20 ? "🏳️ 投降发起人" : "☠️ 演员已就位";
}
const B1 = [
  "🦄 千里马",
  "🏇 上等马",
  "🐎 中等马",
  "🐴 下等马",
  "🐂 纯牛马"
];
function R5(n) {
  const i = [...n].filter((c) => !!c.strengthScore).sort((c, r) => r.strengthScore.score - c.strengthScore.score), u = /* @__PURE__ */ new Map();
  return i.forEach((c, r) => {
    u.set(Bc(c), B1[Math.min(r, B1.length - 1)]);
  }), u;
}
function Es() {
  const n = q.get("champSelectAssist") || q.get("analyzeTeamPower");
  I5(n), n && _.getGameflowPhase().then((i) => {
    i === "ChampSelect" && cv();
  }).catch((i) => R.warn("[ChampSelect] 无法刷新队友战绩:", i));
}
function w5() {
  f5(), Es(), q.onChange("champSelectAssist", Es), q.onChange("analyzeTeamPower", Es), q.onChange("champSelectAssistFetchCount", Es), q.onChange("analyzeTeamPowerFetchCount", Es), O1(q.get("champSelectTierBadge")), q.onChange("champSelectTierBadge", O1);
  const n = () => {
    e5(
      q.get("opggBuildRecommendation") || q.get("smartBuildRecommendation") || q.get("smartItemSetBuild")
    );
  };
  n(), q.onChange("opggBuildRecommendation", n), q.onChange("smartBuildRecommendation", n), q.onChange("smartItemSetBuild", n), r1(q.get("lobbyEnhancement")), q.onChange("lobbyEnhancement", r1), e1(q.get("balanceBuffTooltip")), q.onChange("balanceBuffTooltip", e1), p1(q.get("gameAnalysisPopup")), q.onChange("gameAnalysisPopup", p1), R.info("Ranked analysis features initialized ✓");
}
const ov = "sona";
let qc = `//plugins/${ov}/`, un = ov;
function of(n, i = {}) {
  console.info("[Sona][PluginResolver] %s", n, {
    ...i,
    pluginBaseUrl: qc,
    pluginFolderName: un
  });
}
function rv(n) {
  return n.replace(/\\/g, "/");
}
function U5(n) {
  return n.split(/[?#]/, 1)[0] ?? n;
}
function j1(n) {
  const i = U5(rv(n)), u = i.match(/(?:^|\/)plugins\/([^/]+)\//i);
  if (!u) return null;
  const c = u.index + u[0].length;
  return i.substring(0, c);
}
function L1(n) {
  const c = rv(n).replace(/\/+$/, "").split("/").at(-1);
  return c ? decodeURIComponent(c) : null;
}
function G1(n) {
  var u;
  const i = (u = n == null ? void 0 : n.meta) == null ? void 0 : u.name;
  return typeof i == "string" && i ? i : null;
}
function D5(n, i) {
  const u = typeof window.getScriptPath == "function" ? window.getScriptPath() : "", c = u ? j1(u) : null, r = c ? L1(c) : null;
  if (r) {
    un = r, qc = `//plugins/${encodeURIComponent(un)}/`, of("initialized from window.getScriptPath() plugin folder", {
      metaUrl: n,
      scriptPath: u,
      scriptBaseUrl: c
    });
    return;
  }
  const m = n ? j1(n) : null, g = m ? L1(m) : null;
  if (g) {
    un = g, qc = `//plugins/${encodeURIComponent(un)}/`, of("initialized from import.meta.url plugin folder", {
      metaUrl: n,
      scriptPath: u,
      baseUrl: m
    });
    return;
  }
  un = G1(i) ?? un, qc = `//plugins/${encodeURIComponent(un)}/`, of("initialized from context fallback", {
    metaUrl: n,
    contextPluginName: G1(i),
    scriptPath: u
  });
}
const O5 = "Sona", z5 = "1.11.0", q1 = "sona-root", R = $b({
  name: O5,
  version: z5
});
function dv() {
  return window.__SONA_RUNTIME__ || (window.__SONA_RUNTIME__ = {
    container: null,
    root: null,
    hasShownStartupToast: !1,
    hasShownSpecialDayToast: !1
  }), window.__SONA_RUNTIME__;
}
function fv(n) {
  (document.body ?? document.documentElement).appendChild(n);
}
function B5(n) {
  const i = document.getElementById(q1);
  return i instanceof HTMLDivElement && (n.container = i), n.container || (n.container = document.createElement("div"), n.container.id = q1, R.info("Created app container")), n.container.isConnected || (fv(n.container), R.warn("App container was missing from DOM and has been reattached")), n.container;
}
let mv = null;
function K5(n) {
  mv = n, D5(import.meta.url, n), _.bindContext(n), R.printBanner();
}
function H5() {
  R.info("Plugin loading..."), iE(), w5(), Yb(), sb(), G5(), om();
}
function V5() {
  return mv;
}
function j5() {
  var i, u;
  const n = dv();
  return (i = n.container) != null && i.isConnected ? !0 : (n.container && (fv(n.container), R.warn("Detected host DOM refresh; restored app container")), !!((u = n.container) != null && u.isConnected));
}
function L5(n = /* @__PURE__ */ new Date()) {
  return n.getMonth() === 7 && n.getDate() === 21;
}
function G5() {
  const n = dv(), i = B5(n);
  tt.register(j5), n.root ? R.info("Reusing existing React root") : (n.root = bn.createRoot(i), R.info("Created React root")), n.root.render(/* @__PURE__ */ d.jsx(Wb, {})), R.info("Mounted ✓ (container connected: %s)", String(i.isConnected)), n.hasShownStartupToast || (Toast.success("Sona 已启动 ♫"), n.hasShownStartupToast = !0), !n.hasShownSpecialDayToast && L5() && (Toast.success("今天是个特别的日子！🎉"), n.hasShownSpecialDayToast = !0);
}
export {
  V5 as getContext,
  K5 as init,
  H5 as load,
  R as logger
};
