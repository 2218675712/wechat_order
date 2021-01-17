const welcome = require("./apis/welcome")
const project = require("./apis/project")
module.exports = (app) => {
    app.use('/api/welcome', welcome)
    app.use('/api/project', project)
}
