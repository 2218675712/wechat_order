export const getParams = (key) => {
    let paramsStr = window.location.search.substr(1);
    const result = paramsStr.split('&').reduce((pre, cur) => {
        const [key, val] = cur.split("=");
        pre[key] = val
        return pre
    }, {});
    return result[key]
}
