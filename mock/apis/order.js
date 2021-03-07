const express = require("express")
const fileHandle = require("../utils/fileHandle")
const Unique = require('../utils/Unique')
const createTime = require("../utils/createTime");
const {readMenuList} = require('./common/getInfo')

const router = express.Router()
// 下单
router.post("/sendOrder", async (req, res, next) => {
    const {shopId, tableNum, userId} = req.body
    // 获取购物车数据
    let data = await fileHandle.read('../files/shopCar')
    let arr = data.filter((item) => {
        return item.shopId == shopId && item.tableNum == tableNum
    })
    /*
    * .map((item) => {
        // 去除多余数据
        let obj = {
            menuId: item.menuId,
            count: item.count
        }
        return obj
    })*/
    // 所有菜单详情
    let allMenus = await readMenuList(shopId)
    // 计算总价
    const allPrice = allMenus.reduce((pre, item) => {
        let obj;
        arr.find((jtem) => {
            if (item.id == jtem.menuId) {
                obj = Object.assign({}, item, jtem)
            }
        })
        if (obj) {
            pre = pre + obj.count * obj.price
        }
        return pre
    }, 0)
    // 生成订单,写入到文件
    let result = {
        id: Unique(),
        shopId,
        tableNum,
        userId,
        menus: arr,
        allPrice,
        isPay: false
    }
    await fileHandle.add('../files/order', result)
    // 清空购物车
    for (const item of arr) {
        await fileHandle.remove("../files/shopCar", "id", item.id)
    }
    // 清除table
    let tablearr = await fileHandle.read('../files/table')
    tablearr = tablearr.filter((item) => {
        return item.shopId == shopId && item.tableNum == tableNum
    })
    for (const item of tablearr) {
        await fileHandle.remove("../files/table", "id", item.id)
    }
    res.send({
        code: 200,
        msg: "Ok"
    })
})
// 获取订单
router.get("/getOrder", async (req, res, next) => {
    const {shopId, tableNum} = req.query
    let allOrder = await fileHandle.read('../files/order')
    let result = allOrder.find((item) => {
        return item.shopId == shopId && item.tableNum == tableNum && item.isPay == false
    })
    res.send({
        code: 200,
        data: result || {},
        msg: "Ok"
    })
})
//支付
router.post("/pay", async (req, res, next) => {
    const {shopId, tableNum} = req.body
    let allOrder = await fileHandle.read('../files/order')
    let data = allOrder.map((item) => {
        if (item.shopId == shopId && item.tableNum == tableNum && item.isPay == false) {
            item.isPay = true;
            item.time = createTime()
        }
        return item
    })
    await fileHandle.write('../files/order',data)
    res.send({
        code: 200,
        msg: "Ok"
    })
})
module.exports = router
