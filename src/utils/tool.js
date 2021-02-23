/**
 * 获取请求携带参数
 * @param key 传入的参数
 * @returns {*} 返回的值
 */
export const getParams = (key) => {
    let paramsStr = window.location.search.substr(1);
    const result = paramsStr.split('&').reduce((pre, cur) => {
        const [key, val] = cur.split("=");
        pre[key] = val
        return pre
    }, {});
    return result[key]
}
/**
 * 格式化货币
 * @param data 传入的货币
 * @returns {string|string}
 */
export const serialize = (data) => {
    let price = String(data).replace(/(\d+)\.(\d+)/, ($0, $1, $2) => {
        $2 = $2.padEnd(2, 0)
        return $1 + '.' + $2
    })
    price = price.includes('.') ? price : price + '.00'
    return price

}
