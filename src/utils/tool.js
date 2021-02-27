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
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
export const serialize = (num) => {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    let sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    let cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}
