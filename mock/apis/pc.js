const express = require("express")
const fileHandle = require('../utils/fileHandle')
const router = express.Router()
// 修改个人信息
router.post("/changeUser", async (req, res, next) => {
    const {id, phone, email, sex} = req.body
    const data = await fileHandle.read('../files/users')
    const result = data.map((item) => {
        if (item.id === id) {
            Object.assign(item, req.body)
        }
        return item
    })
    await fileHandle.write('../files/users', result)
    res.send({
        code: 200,
        msg: "Ok"
    })
})
// 获取订单
router.get("/getOrder", async (req, res, next) => {
    const {userId} = req.query
    let allOrder = await fileHandle.read('../files/order')
    let result = allOrder.filter((item) => {
        return item.userId == userId
    })
    res.send({
        code: 200,
        data: result || {},
        msg: "Ok"
    })
})

// 评价
router.post("/evaluate", async (req, res, next) => {
    const {id, evaluate} = req.body
    let allOrder = await fileHandle.read('../files/order')
    let data = allOrder.map((item) => {
        if (item.id == id) {
            item.evaluate = evaluate
        }
        return item
    })
    await fileHandle.write('../files/order', data)
    res.send({
        code: 200,
        msg: "Ok"
    })
})
module.exports = router
