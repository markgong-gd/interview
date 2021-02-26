"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

/**
 * @description 读取COOKIE
 * @param {string} name
 * @returns {(string | null)}
 */
function get(name) {
    if (typeof document === "undefined" || typeof document.cookie === "undefined") {
        return "";
    }

    var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)");
    var val = document.cookie.match(reg);
    return val ? val[2] ? unescape(val[2]) : "" : null;
}
/**
 * @description 设置 cookie
 * @param {string} name
 * @param {string} value
 * @param {string} [expires=null]
 * @param {string} [path="/"]
 * @param {string} [domain=null]
 * @param {boolean} [secure=false]
 * @returns
 */


function set(name, value) {
    var expires = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "/";
    var domain = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var secure = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    // 写入COOKIES
    if (typeof document === "undefined" || typeof document.cookie === "undefined") {
        return "";
    }

    var exp = new Date(); // tslint:disable-next-line:no-unused-expression

    expires ? exp.setMinutes(exp.getMinutes() + parseInt(String(expires), 10)) : "";
    document.cookie = name + "=" + escape(value) + (expires ? ";expires=" + exp.toUTCString() : "") + ";path=" + path + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
}
/**
 * @description 删除 cookie
 * @param {string} name
 * @param {string} [path]
 * @param {string} [domain]
 * @param {boolean} [secure]
 * @returns {(void | "")}
 */


function del(name) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
    var domain = arguments.length > 2 ? arguments[2] : undefined;
    var secure = arguments.length > 3 ? arguments[3] : undefined;

    if (typeof document === "undefined" || typeof document.cookie === "undefined") {
        return;
    }

    var value = this.get(name);

    if (value != null) {
        var exp = new Date();
        exp.setMinutes(exp.getMinutes() - 1000);
        document.cookie = name + "=;expires=" + exp.toUTCString() + ";path=" + path + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
    }
}

var cookie = {
    get: get,
    set: set,
    del: del
};
var _default = cookie;
exports["default"] = _default;
