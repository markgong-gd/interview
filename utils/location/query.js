/**
 * @description 获取查询参数值
 * @param {String} name
 * @return {String}
 */
function query(name) {
    if (typeof location === 'undefined' && !location.search) return '';

    // var value = location.search.match(new RegExp("(\\?|&)" + name + "=([^&]*)(&|$)")) ? decodeURIComponent(RegExp.$2) : "";
    let value = location.search.match(new RegExp(`(\\?|&)${name}=([^&]*)($|&)`)) ? RegExp.$2 : '';

    if (value.match(/<\/?script>/i)) {
        console.warn('参数中包含"<script>"为防止门神反射-XSS漏洞自动去除', name, value); // 自动去除

        value = value.replace(/<\/?script>/gi, '');
    }

    return value;
}
