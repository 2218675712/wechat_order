const welcome = require("./apis/welcome")
const project = require("./apis/project")
const shopCar = require("./apis/shopCar")
const order = require("./apis/order")
module.exports = (app) => {
    app.use('/api/welcome', welcome)
    app.use('/api/project', project)
    app.use('/api/shopCar', shopCar)
    //todo 注意细节,因为多写了个括号折腾了两小时
    app.use('/api/order', order)
}
