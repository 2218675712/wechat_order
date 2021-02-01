const express = require("express")
const fileHandle = require("../utils/fileHandle")
const Unique = require('../utils/Unique')
const createTime = require("../utils/createTime");
const router = express.Router()
// 添加购物车
router.post("/sendShopCar", async (req, res, next) => {
    const {shopId, userId, tableNum, menuId, count} = req.body
    let data = {
        id: Unique(),
        shopId,
        userId,
        tableNum,
        menuId,
        count
    }
    let arrData = await fileHandle.read('../files/shopCar')
    // 看看购物车有没有当前菜单
    let result = arrData.find((item) => {
        return item.shopId == shopId && item.menuId == menuId && item.tableNum == tableNum
    })
    // 如果有当前菜单,先删除
    if (result) {
        await fileHandle.remove('../files/shopCar', "id",result.id)
    }
    await fileHandle.add('../files/shopCar', data)
    res.send({
        code: 200,
        msg: 'ok'
    })
})
module.exports = router
