const express = require("express")
const fileHandle = require("../utils/fileHandle")
const Unique = require('../utils/Unique')
const {readMenuList} = require('./common/getInfo')

const router = express.Router()
// 下单
router.post("/sendOrder", async (req, res, next) => {
    const {shopId, tableNum} = req.body
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
        menus: arr,
        allPrice,
        isPay: false
    }
    await fileHandle.add('../files/order', result)
    // 清空购物车
    for (const item of arr) {
        await fileHandle.remove("../files/shopCar", "id", item.id)
    }
    res.send({
        code: 200,
        msg: "Ok"
    })
})
module.exports = router
