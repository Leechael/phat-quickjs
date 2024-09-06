var module = module || { exports: {} };
"use strict";
var module = module || {};
module.exports = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

  // ../phat-quickjs/npm_package/wapo-env/dist/guest.js
  var require_guest = __commonJS({
    "../phat-quickjs/npm_package/wapo-env/dist/guest.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.handle = void 0;
      function handle2(app2) {
        return async function handler() {
          try {
            const data = JSON.parse(globalThis.scriptArgs?.[0]);
            const req = new Request(data.url, {
              method: data.method,
              headers: data.headers,
              body: data.body
            });
            const resp = await app2.fetch(req);
            const headers = {};
            for (const [k, v] of resp.headers.entries()) {
              headers[k] = v;
            }
            const body = await resp.text();
            globalThis.scriptOutput = JSON.stringify({ body, headers, status: resp.status });
          } catch (err) {
            globalThis.scriptOutput = JSON.stringify({ body: err.message, headers: {}, status: 500 });
          }
        };
      }
      exports.handle = handle2;
    }
  });

  // src/test-guest-app.ts
  var test_guest_app_exports = {};
  __export(test_guest_app_exports, {
    default: () => test_guest_app_default
  });

  // node_modules/hono/dist/utils/body.js
  var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
    const { all = false, dot = false } = options;
    const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
    const contentType = headers.get("Content-Type");
    if (contentType !== null && contentType.startsWith("multipart/form-data") || contentType !== null && contentType.startsWith("application/x-www-form-urlencoded")) {
      return parseFormData(request, { all, dot });
    }
    return {};
  };
  async function parseFormData(request, options) {
    const formData = await request.formData();
    if (formData) {
      return convertFormDataToBodyData(formData, options);
    }
    return {};
  }
  function convertFormDataToBodyData(formData, options) {
    const form = /* @__PURE__ */ Object.create(null);
    formData.forEach((value, key) => {
      const shouldParseAllValues = options.all || key.endsWith("[]");
      if (!shouldParseAllValues) {
        form[key] = value;
      } else {
        handleParsingAllValues(form, key, value);
      }
    });
    if (options.dot) {
      Object.entries(form).forEach(([key, value]) => {
        const shouldParseDotValues = key.includes(".");
        if (shouldParseDotValues) {
          handleParsingNestedValues(form, key, value);
          delete form[key];
        }
      });
    }
    return form;
  }
  var handleParsingAllValues = (form, key, value) => {
    if (form[key] !== void 0) {
      if (Array.isArray(form[key])) {
        ;
        form[key].push(value);
      } else {
        form[key] = [form[key], value];
      }
    } else {
      form[key] = value;
    }
  };
  var handleParsingNestedValues = (form, key, value) => {
    let nestedForm = form;
    const keys = key.split(".");
    keys.forEach((key2, index) => {
      if (index === keys.length - 1) {
        nestedForm[key2] = value;
      } else {
        if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
          nestedForm[key2] = /* @__PURE__ */ Object.create(null);
        }
        nestedForm = nestedForm[key2];
      }
    });
  };

  // node_modules/hono/dist/utils/url.js
  var tryDecodeURI = (str) => {
    try {
      return decodeURI(str);
    } catch {
      return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
        try {
          return decodeURI(match);
        } catch {
          return match;
        }
      });
    }
  };
  var getPath = (request) => {
    const url = request.url;
    const start = url.indexOf("/", 8);
    let i = start;
    for (; i < url.length; i++) {
      const charCode = url.charCodeAt(i);
      if (charCode === 37) {
        const queryIndex = url.indexOf("?", i);
        const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
        return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
      } else if (charCode === 63) {
        break;
      }
    }
    return url.slice(start, i);
  };
  var getPathNoStrict = (request) => {
    const result = getPath(request);
    return result.length > 1 && result[result.length - 1] === "/" ? result.slice(0, -1) : result;
  };
  var mergePath = (...paths) => {
    let p = "";
    let endsWithSlash = false;
    for (let path of paths) {
      if (p[p.length - 1] === "/") {
        p = p.slice(0, -1);
        endsWithSlash = true;
      }
      if (path[0] !== "/") {
        path = `/${path}`;
      }
      if (path === "/" && endsWithSlash) {
        p = `${p}/`;
      } else if (path !== "/") {
        p = `${p}${path}`;
      }
      if (path === "/" && p === "") {
        p = "/";
      }
    }
    return p;
  };
  var _decodeURI = (value) => {
    if (!/[%+]/.test(value)) {
      return value;
    }
    if (value.indexOf("+") !== -1) {
      value = value.replace(/\+/g, " ");
    }
    return /%/.test(value) ? decodeURIComponent_(value) : value;
  };
  var _getQueryParam = (url, key, multiple) => {
    let encoded;
    if (!multiple && key && !/[%+]/.test(key)) {
      let keyIndex2 = url.indexOf(`?${key}`, 8);
      if (keyIndex2 === -1) {
        keyIndex2 = url.indexOf(`&${key}`, 8);
      }
      while (keyIndex2 !== -1) {
        const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
        if (trailingKeyCode === 61) {
          const valueIndex = keyIndex2 + key.length + 2;
          const endIndex = url.indexOf("&", valueIndex);
          return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
        } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
          return "";
        }
        keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
      }
      encoded = /[%+]/.test(url);
      if (!encoded) {
        return void 0;
      }
    }
    const results = {};
    encoded ?? (encoded = /[%+]/.test(url));
    let keyIndex = url.indexOf("?", 8);
    while (keyIndex !== -1) {
      const nextKeyIndex = url.indexOf("&", keyIndex + 1);
      let valueIndex = url.indexOf("=", keyIndex);
      if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
        valueIndex = -1;
      }
      let name = url.slice(
        keyIndex + 1,
        valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
      );
      if (encoded) {
        name = _decodeURI(name);
      }
      keyIndex = nextKeyIndex;
      if (name === "") {
        continue;
      }
      let value;
      if (valueIndex === -1) {
        value = "";
      } else {
        value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
        if (encoded) {
          value = _decodeURI(value);
        }
      }
      if (multiple) {
        if (!(results[name] && Array.isArray(results[name]))) {
          results[name] = [];
        }
        ;
        results[name].push(value);
      } else {
        results[name] ?? (results[name] = value);
      }
    }
    return key ? results[key] : results;
  };
  var getQueryParam = _getQueryParam;
  var getQueryParams = (url, key) => {
    return _getQueryParam(url, key, true);
  };
  var decodeURIComponent_ = decodeURIComponent;

  // node_modules/hono/dist/request.js
  var _validatedData, _matchResult, _a;
  var HonoRequest = (_a = class {
    constructor(request, path = "/", matchResult = [[]]) {
      __publicField(this, "raw");
      __privateAdd(this, _validatedData);
      __privateAdd(this, _matchResult);
      __publicField(this, "routeIndex", 0);
      __publicField(this, "path");
      __publicField(this, "bodyCache", {});
      __publicField(this, "cachedBody", (key) => {
        const { bodyCache, raw: raw2 } = this;
        const cachedBody = bodyCache[key];
        if (cachedBody) {
          return cachedBody;
        }
        const anyCachedKey = Object.keys(bodyCache)[0];
        if (anyCachedKey) {
          return bodyCache[anyCachedKey].then((body) => {
            if (anyCachedKey === "json") {
              body = JSON.stringify(body);
            }
            return new Response(body)[key]();
          });
        }
        return bodyCache[key] = raw2[key]();
      });
      this.raw = request;
      this.path = path;
      __privateSet(this, _matchResult, matchResult);
      __privateSet(this, _validatedData, {});
    }
    param(key) {
      return key ? this.getDecodedParam(key) : this.getAllDecodedParams();
    }
    getDecodedParam(key) {
      const paramKey = __privateGet(this, _matchResult)[0][this.routeIndex][1][key];
      const param = this.getParamValue(paramKey);
      return param ? /\%/.test(param) ? decodeURIComponent_(param) : param : void 0;
    }
    getAllDecodedParams() {
      const decoded = {};
      const keys = Object.keys(__privateGet(this, _matchResult)[0][this.routeIndex][1]);
      for (const key of keys) {
        const value = this.getParamValue(__privateGet(this, _matchResult)[0][this.routeIndex][1][key]);
        if (value && typeof value === "string") {
          decoded[key] = /\%/.test(value) ? decodeURIComponent_(value) : value;
        }
      }
      return decoded;
    }
    getParamValue(paramKey) {
      return __privateGet(this, _matchResult)[1] ? __privateGet(this, _matchResult)[1][paramKey] : paramKey;
    }
    query(key) {
      return getQueryParam(this.url, key);
    }
    queries(key) {
      return getQueryParams(this.url, key);
    }
    header(name) {
      if (name) {
        return this.raw.headers.get(name.toLowerCase()) ?? void 0;
      }
      const headerData = {};
      this.raw.headers.forEach((value, key) => {
        headerData[key] = value;
      });
      return headerData;
    }
    async parseBody(options) {
      var _a4;
      return (_a4 = this.bodyCache).parsedBody ?? (_a4.parsedBody = await parseBody(this, options));
    }
    json() {
      return this.cachedBody("json");
    }
    text() {
      return this.cachedBody("text");
    }
    arrayBuffer() {
      return this.cachedBody("arrayBuffer");
    }
    blob() {
      return this.cachedBody("blob");
    }
    formData() {
      return this.cachedBody("formData");
    }
    addValidatedData(target, data) {
      __privateGet(this, _validatedData)[target] = data;
    }
    valid(target) {
      return __privateGet(this, _validatedData)[target];
    }
    get url() {
      return this.raw.url;
    }
    get method() {
      return this.raw.method;
    }
    get matchedRoutes() {
      return __privateGet(this, _matchResult)[0].map(([[, route]]) => route);
    }
    get routePath() {
      return __privateGet(this, _matchResult)[0].map(([[, route]]) => route)[this.routeIndex].path;
    }
  }, _validatedData = new WeakMap(), _matchResult = new WeakMap(), _a);

  // node_modules/hono/dist/utils/html.js
  var HtmlEscapedCallbackPhase = {
    Stringify: 1,
    BeforeStream: 2,
    Stream: 3
  };
  var raw = (value, callbacks) => {
    const escapedString = new String(value);
    escapedString.isEscaped = true;
    escapedString.callbacks = callbacks;
    return escapedString;
  };
  var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
    const callbacks = str.callbacks;
    if (!callbacks?.length) {
      return Promise.resolve(str);
    }
    if (buffer) {
      buffer[0] += str;
    } else {
      buffer = [str];
    }
    const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
      (res) => Promise.all(
        res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
      ).then(() => buffer[0])
    );
    if (preserveCallbacks) {
      return raw(await resStr, callbacks);
    } else {
      return resStr;
    }
  };

  // node_modules/hono/dist/context.js
  var TEXT_PLAIN = "text/plain; charset=UTF-8";
  var setHeaders = (headers, map = {}) => {
    Object.entries(map).forEach(([key, value]) => headers.set(key, value));
    return headers;
  };
  var _rawRequest, _req, _var, _status, _executionCtx, _headers, _preparedHeaders, _res, _isFresh, _layout, _renderer, _notFoundHandler, _matchResult2, _path, _a2;
  var Context = (_a2 = class {
    constructor(req, options) {
      __privateAdd(this, _rawRequest);
      __privateAdd(this, _req);
      __publicField(this, "env", {});
      __privateAdd(this, _var);
      __publicField(this, "finalized", false);
      __publicField(this, "error");
      __privateAdd(this, _status, 200);
      __privateAdd(this, _executionCtx);
      __privateAdd(this, _headers);
      __privateAdd(this, _preparedHeaders);
      __privateAdd(this, _res);
      __privateAdd(this, _isFresh, true);
      __privateAdd(this, _layout);
      __privateAdd(this, _renderer);
      __privateAdd(this, _notFoundHandler);
      __privateAdd(this, _matchResult2);
      __privateAdd(this, _path);
      __publicField(this, "render", (...args) => {
        __privateGet(this, _renderer) ?? __privateSet(this, _renderer, (content) => this.html(content));
        return __privateGet(this, _renderer).call(this, ...args);
      });
      __publicField(this, "setLayout", (layout) => __privateSet(this, _layout, layout));
      __publicField(this, "getLayout", () => __privateGet(this, _layout));
      __publicField(this, "setRenderer", (renderer) => {
        __privateSet(this, _renderer, renderer);
      });
      __publicField(this, "header", (name, value, options) => {
        if (value === void 0) {
          if (__privateGet(this, _headers)) {
            __privateGet(this, _headers).delete(name);
          } else if (__privateGet(this, _preparedHeaders)) {
            delete __privateGet(this, _preparedHeaders)[name.toLocaleLowerCase()];
          }
          if (this.finalized) {
            this.res.headers.delete(name);
          }
          return;
        }
        if (options?.append) {
          if (!__privateGet(this, _headers)) {
            __privateSet(this, _isFresh, false);
            __privateSet(this, _headers, new Headers(__privateGet(this, _preparedHeaders)));
            __privateSet(this, _preparedHeaders, {});
          }
          __privateGet(this, _headers).append(name, value);
        } else {
          if (__privateGet(this, _headers)) {
            __privateGet(this, _headers).set(name, value);
          } else {
            __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
            __privateGet(this, _preparedHeaders)[name.toLowerCase()] = value;
          }
        }
        if (this.finalized) {
          if (options?.append) {
            this.res.headers.append(name, value);
          } else {
            this.res.headers.set(name, value);
          }
        }
      });
      __publicField(this, "status", (status) => {
        __privateSet(this, _isFresh, false);
        __privateSet(this, _status, status);
      });
      __publicField(this, "set", (key, value) => {
        __privateGet(this, _var) ?? __privateSet(this, _var, /* @__PURE__ */ new Map());
        __privateGet(this, _var).set(key, value);
      });
      __publicField(this, "get", (key) => {
        return __privateGet(this, _var) ? __privateGet(this, _var).get(key) : void 0;
      });
      __publicField(this, "newResponse", (data, arg, headers) => {
        if (__privateGet(this, _isFresh) && !headers && !arg && __privateGet(this, _status) === 200) {
          return new Response(data, {
            headers: __privateGet(this, _preparedHeaders)
          });
        }
        if (arg && typeof arg !== "number") {
          const header = new Headers(arg.headers);
          if (__privateGet(this, _headers)) {
            __privateGet(this, _headers).forEach((v, k) => {
              if (k === "set-cookie") {
                header.append(k, v);
              } else {
                header.set(k, v);
              }
            });
          }
          const headers2 = setHeaders(header, __privateGet(this, _preparedHeaders));
          return new Response(data, {
            headers: headers2,
            status: arg.status ?? __privateGet(this, _status)
          });
        }
        const status = typeof arg === "number" ? arg : __privateGet(this, _status);
        __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
        __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers());
        setHeaders(__privateGet(this, _headers), __privateGet(this, _preparedHeaders));
        if (__privateGet(this, _res)) {
          __privateGet(this, _res).headers.forEach((v, k) => {
            if (k === "set-cookie") {
              __privateGet(this, _headers)?.append(k, v);
            } else {
              __privateGet(this, _headers)?.set(k, v);
            }
          });
          setHeaders(__privateGet(this, _headers), __privateGet(this, _preparedHeaders));
        }
        headers ?? (headers = {});
        for (const [k, v] of Object.entries(headers)) {
          if (typeof v === "string") {
            __privateGet(this, _headers).set(k, v);
          } else {
            __privateGet(this, _headers).delete(k);
            for (const v2 of v) {
              __privateGet(this, _headers).append(k, v2);
            }
          }
        }
        return new Response(data, {
          status,
          headers: __privateGet(this, _headers)
        });
      });
      __publicField(this, "body", (data, arg, headers) => {
        return typeof arg === "number" ? this.newResponse(data, arg, headers) : this.newResponse(data, arg);
      });
      __publicField(this, "text", (text, arg, headers) => {
        if (!__privateGet(this, _preparedHeaders)) {
          if (__privateGet(this, _isFresh) && !headers && !arg) {
            return new Response(text);
          }
          __privateSet(this, _preparedHeaders, {});
        }
        __privateGet(this, _preparedHeaders)["content-type"] = TEXT_PLAIN;
        return typeof arg === "number" ? this.newResponse(text, arg, headers) : this.newResponse(text, arg);
      });
      __publicField(this, "json", (object, arg, headers) => {
        const body = JSON.stringify(object);
        __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
        __privateGet(this, _preparedHeaders)["content-type"] = "application/json; charset=UTF-8";
        return typeof arg === "number" ? this.newResponse(body, arg, headers) : this.newResponse(body, arg);
      });
      __publicField(this, "html", (html, arg, headers) => {
        __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
        __privateGet(this, _preparedHeaders)["content-type"] = "text/html; charset=UTF-8";
        if (typeof html === "object") {
          if (!(html instanceof Promise)) {
            html = html.toString();
          }
          if (html instanceof Promise) {
            return html.then((html2) => resolveCallback(html2, HtmlEscapedCallbackPhase.Stringify, false, {})).then((html2) => {
              return typeof arg === "number" ? this.newResponse(html2, arg, headers) : this.newResponse(html2, arg);
            });
          }
        }
        return typeof arg === "number" ? this.newResponse(html, arg, headers) : this.newResponse(html, arg);
      });
      __publicField(this, "redirect", (location, status) => {
        __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers());
        __privateGet(this, _headers).set("Location", location);
        return this.newResponse(null, status ?? 302);
      });
      __publicField(this, "notFound", () => {
        __privateGet(this, _notFoundHandler) ?? __privateSet(this, _notFoundHandler, () => new Response());
        return __privateGet(this, _notFoundHandler).call(this, this);
      });
      __privateSet(this, _rawRequest, req);
      if (options) {
        __privateSet(this, _executionCtx, options.executionCtx);
        this.env = options.env;
        __privateSet(this, _notFoundHandler, options.notFoundHandler);
        __privateSet(this, _path, options.path);
        __privateSet(this, _matchResult2, options.matchResult);
      }
    }
    get req() {
      __privateGet(this, _req) ?? __privateSet(this, _req, new HonoRequest(__privateGet(this, _rawRequest), __privateGet(this, _path), __privateGet(this, _matchResult2)));
      return __privateGet(this, _req);
    }
    get event() {
      if (__privateGet(this, _executionCtx) && "respondWith" in __privateGet(this, _executionCtx)) {
        return __privateGet(this, _executionCtx);
      } else {
        throw Error("This context has no FetchEvent");
      }
    }
    get executionCtx() {
      if (__privateGet(this, _executionCtx)) {
        return __privateGet(this, _executionCtx);
      } else {
        throw Error("This context has no ExecutionContext");
      }
    }
    get res() {
      __privateSet(this, _isFresh, false);
      return __privateGet(this, _res) || __privateSet(this, _res, new Response("404 Not Found", { status: 404 }));
    }
    set res(_res2) {
      __privateSet(this, _isFresh, false);
      if (__privateGet(this, _res) && _res2) {
        __privateGet(this, _res).headers.delete("content-type");
        for (const [k, v] of __privateGet(this, _res).headers.entries()) {
          if (k === "set-cookie") {
            const cookies = __privateGet(this, _res).headers.getSetCookie();
            _res2.headers.delete("set-cookie");
            for (const cookie of cookies) {
              _res2.headers.append("set-cookie", cookie);
            }
          } else {
            _res2.headers.set(k, v);
          }
        }
      }
      __privateSet(this, _res, _res2);
      this.finalized = true;
    }
    get var() {
      if (!__privateGet(this, _var)) {
        return {};
      }
      return Object.fromEntries(__privateGet(this, _var));
    }
  }, _rawRequest = new WeakMap(), _req = new WeakMap(), _var = new WeakMap(), _status = new WeakMap(), _executionCtx = new WeakMap(), _headers = new WeakMap(), _preparedHeaders = new WeakMap(), _res = new WeakMap(), _isFresh = new WeakMap(), _layout = new WeakMap(), _renderer = new WeakMap(), _notFoundHandler = new WeakMap(), _matchResult2 = new WeakMap(), _path = new WeakMap(), _a2);

  // node_modules/hono/dist/compose.js
  var compose = (middleware, onError, onNotFound) => {
    return (context, next) => {
      let index = -1;
      return dispatch(0);
      async function dispatch(i) {
        if (i <= index) {
          throw new Error("next() called multiple times");
        }
        index = i;
        let res;
        let isError = false;
        let handler;
        if (middleware[i]) {
          handler = middleware[i][0][0];
          if (context instanceof Context) {
            context.req.routeIndex = i;
          }
        } else {
          handler = i === middleware.length && next || void 0;
        }
        if (!handler) {
          if (context instanceof Context && context.finalized === false && onNotFound) {
            res = await onNotFound(context);
          }
        } else {
          try {
            res = await handler(context, () => {
              return dispatch(i + 1);
            });
          } catch (err) {
            if (err instanceof Error && context instanceof Context && onError) {
              context.error = err;
              res = await onError(err, context);
              isError = true;
            } else {
              throw err;
            }
          }
        }
        if (res && (context.finalized === false || isError)) {
          context.res = res;
        }
        return context;
      }
    };
  };

  // node_modules/hono/dist/router.js
  var METHOD_NAME_ALL = "ALL";
  var METHOD_NAME_ALL_LOWERCASE = "all";
  var METHODS = ["get", "post", "put", "delete", "options", "patch"];
  var UnsupportedPathError = class extends Error {
  };

  // node_modules/hono/dist/hono-base.js
  var COMPOSED_HANDLER = Symbol("composedHandler");
  var notFoundHandler = (c) => {
    return c.text("404 Not Found", 404);
  };
  var errorHandler = (err, c) => {
    if ("getResponse" in err) {
      return err.getResponse();
    }
    console.error(err);
    return c.text("Internal Server Error", 500);
  };
  var _path2, _a3;
  var Hono = (_a3 = class {
    constructor(options = {}) {
      __publicField(this, "get");
      __publicField(this, "post");
      __publicField(this, "put");
      __publicField(this, "delete");
      __publicField(this, "options");
      __publicField(this, "patch");
      __publicField(this, "all");
      __publicField(this, "on");
      __publicField(this, "use");
      __publicField(this, "router");
      __publicField(this, "getPath");
      __publicField(this, "_basePath", "/");
      __privateAdd(this, _path2, "/");
      __publicField(this, "routes", []);
      __publicField(this, "notFoundHandler", notFoundHandler);
      __publicField(this, "errorHandler", errorHandler);
      __publicField(this, "onError", (handler) => {
        this.errorHandler = handler;
        return this;
      });
      __publicField(this, "notFound", (handler) => {
        this.notFoundHandler = handler;
        return this;
      });
      __publicField(this, "fetch", (request, ...rest) => {
        return this.dispatch(request, rest[1], rest[0], request.method);
      });
      __publicField(this, "request", (input, requestInit, Env, executionCtx) => {
        if (input instanceof Request) {
          if (requestInit !== void 0) {
            input = new Request(input, requestInit);
          }
          return this.fetch(input, Env, executionCtx);
        }
        input = input.toString();
        const path = /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`;
        const req = new Request(path, requestInit);
        return this.fetch(req, Env, executionCtx);
      });
      __publicField(this, "fire", () => {
        addEventListener("fetch", (event) => {
          event.respondWith(this.dispatch(event.request, event, void 0, event.request.method));
        });
      });
      const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
      allMethods.forEach((method) => {
        this[method] = (args1, ...args) => {
          if (typeof args1 === "string") {
            __privateSet(this, _path2, args1);
          } else {
            this.addRoute(method, __privateGet(this, _path2), args1);
          }
          args.forEach((handler) => {
            if (typeof handler !== "string") {
              this.addRoute(method, __privateGet(this, _path2), handler);
            }
          });
          return this;
        };
      });
      this.on = (method, path, ...handlers) => {
        for (const p of [path].flat()) {
          __privateSet(this, _path2, p);
          for (const m of [method].flat()) {
            handlers.map((handler) => {
              this.addRoute(m.toUpperCase(), __privateGet(this, _path2), handler);
            });
          }
        }
        return this;
      };
      this.use = (arg1, ...handlers) => {
        if (typeof arg1 === "string") {
          __privateSet(this, _path2, arg1);
        } else {
          __privateSet(this, _path2, "*");
          handlers.unshift(arg1);
        }
        handlers.forEach((handler) => {
          this.addRoute(METHOD_NAME_ALL, __privateGet(this, _path2), handler);
        });
        return this;
      };
      const strict = options.strict ?? true;
      delete options.strict;
      Object.assign(this, options);
      this.getPath = strict ? options.getPath ?? getPath : getPathNoStrict;
    }
    clone() {
      const clone = new Hono({
        router: this.router,
        getPath: this.getPath
      });
      clone.routes = this.routes;
      return clone;
    }
    route(path, app2) {
      const subApp = this.basePath(path);
      app2.routes.map((r) => {
        let handler;
        if (app2.errorHandler === errorHandler) {
          handler = r.handler;
        } else {
          handler = async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res;
          handler[COMPOSED_HANDLER] = r.handler;
        }
        subApp.addRoute(r.method, r.path, handler);
      });
      return this;
    }
    basePath(path) {
      const subApp = this.clone();
      subApp._basePath = mergePath(this._basePath, path);
      return subApp;
    }
    mount(path, applicationHandler, options) {
      let replaceRequest;
      let optionHandler;
      if (options) {
        if (typeof options === "function") {
          optionHandler = options;
        } else {
          optionHandler = options.optionHandler;
          replaceRequest = options.replaceRequest;
        }
      }
      const getOptions = optionHandler ? (c) => {
        const options2 = optionHandler(c);
        return Array.isArray(options2) ? options2 : [options2];
      } : (c) => {
        let executionContext = void 0;
        try {
          executionContext = c.executionCtx;
        } catch {
        }
        return [c.env, executionContext];
      };
      replaceRequest || (replaceRequest = (() => {
        const mergedPath = mergePath(this._basePath, path);
        const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
        return (request) => {
          const url = new URL(request.url);
          url.pathname = url.pathname.slice(pathPrefixLength) || "/";
          return new Request(url, request);
        };
      })());
      const handler = async (c, next) => {
        const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
        if (res) {
          return res;
        }
        await next();
      };
      this.addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
      return this;
    }
    addRoute(method, path, handler) {
      method = method.toUpperCase();
      path = mergePath(this._basePath, path);
      const r = { path, method, handler };
      this.router.add(method, path, [handler, r]);
      this.routes.push(r);
    }
    matchRoute(method, path) {
      return this.router.match(method, path);
    }
    handleError(err, c) {
      if (err instanceof Error) {
        return this.errorHandler(err, c);
      }
      throw err;
    }
    dispatch(request, executionCtx, env, method) {
      if (method === "HEAD") {
        return (async () => new Response(null, await this.dispatch(request, executionCtx, env, "GET")))();
      }
      const path = this.getPath(request, { env });
      const matchResult = this.matchRoute(method, path);
      const c = new Context(request, {
        path,
        matchResult,
        env,
        executionCtx,
        notFoundHandler: this.notFoundHandler
      });
      if (matchResult[0].length === 1) {
        let res;
        try {
          res = matchResult[0][0][0][0](c, async () => {
            c.res = await this.notFoundHandler(c);
          });
        } catch (err) {
          return this.handleError(err, c);
        }
        return res instanceof Promise ? res.then(
          (resolved) => resolved || (c.finalized ? c.res : this.notFoundHandler(c))
        ).catch((err) => this.handleError(err, c)) : res ?? this.notFoundHandler(c);
      }
      const composed = compose(matchResult[0], this.errorHandler, this.notFoundHandler);
      return (async () => {
        try {
          const context = await composed(c);
          if (!context.finalized) {
            throw new Error(
              "Context is not finalized. Did you forget to return a Response object or `await next()`?"
            );
          }
          return context.res;
        } catch (err) {
          return this.handleError(err, c);
        }
      })();
    }
  }, _path2 = new WeakMap(), _a3);

  // node_modules/hono/dist/router/pattern-router/router.js
  var PatternRouter = class {
    constructor() {
      __publicField(this, "name", "PatternRouter");
      __publicField(this, "routes", []);
    }
    add(method, path, handler) {
      const endsWithWildcard = path[path.length - 1] === "*";
      if (endsWithWildcard) {
        path = path.slice(0, -2);
      }
      if (path.at(-1) === "?") {
        path = path.slice(0, -1);
        this.add(method, path.replace(/\/[^/]+$/, ""), handler);
      }
      const parts = (path.match(/\/?(:\w+(?:{(?:(?:{[\d,]+})|[^}])+})?)|\/?[^\/\?]+/g) || []).map(
        (part) => {
          const match = part.match(/^\/:([^{]+)(?:{(.*)})?/);
          return match ? `/(?<${match[1]}>${match[2] || "[^/]+"})` : part === "/*" ? "/[^/]+" : part.replace(/[.\\+*[^\]$()]/g, "\\$&");
        }
      );
      let re;
      try {
        re = new RegExp(`^${parts.join("")}${endsWithWildcard ? "" : "/?$"}`);
      } catch (e) {
        throw new UnsupportedPathError();
      }
      this.routes.push([re, method, handler]);
    }
    match(method, path) {
      const handlers = [];
      for (const [pattern, routeMethod, handler] of this.routes) {
        if (routeMethod === METHOD_NAME_ALL || routeMethod === method) {
          const match = pattern.exec(path);
          if (match) {
            handlers.push([handler, match.groups || /* @__PURE__ */ Object.create(null)]);
          }
        }
      }
      return [handlers];
    }
  };

  // node_modules/hono/dist/preset/tiny.js
  var Hono2 = class extends Hono {
    constructor(options = {}) {
      super(options);
      this.router = new PatternRouter();
    }
  };

  // src/test-guest-app.ts
  var import_guest = __toESM(require_guest());
  var app = new Hono2();
  app.get("/", async (c) => {
    c.header("X-Request-Id", "123");
    return c.json({ hello: "world" });
  });
  var test_guest_app_default = (0, import_guest.handle)(app);
  return __toCommonJS(test_guest_app_exports);
})();
module.exports = module.exports?.default;
//# sourceMappingURL=test-guest-app.js.map