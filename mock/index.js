const welcome = require("./apis/welcome")
module.exports = (app) => {
    app.use('/api/welcome', welcome)
}
