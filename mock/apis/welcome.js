const express = require("express")
const fileHandle = require("../utils/fileHandle")
const router = express.Router()
router.get("/test", async (req, res, next) => {
    await fileHandle.add('../files/test.json', {
        id: 1,
        name: "张三"
    })
    res.send("ok")
})
module.exports = router
