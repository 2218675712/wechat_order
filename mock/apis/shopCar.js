const express = require("express")
const fileHandle = require("../utils/fileHandle")
const Unique = require('../utils/Unique')
const createTime = require("../utils/createTime");
const {getUsers} = require('./common/getInfo')

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
        await fileHandle.remove('../files/shopCar', "id", result.id)
    }
    await fileHandle.add('../files/shopCar', data)
    res.send({
        code: 200,
        msg: 'ok'
    })
})
// 获取购物车数据
router.get("/getShopCar", async (req, res, next) => {
    let {shopId, tableNum} = req.query
    let data = await fileHandle.read('../files/shopCar')
    let result = data.filter((item) => {
        return item.shopId == shopId && item.tableNum == tableNum
    })
    // 获取当前店铺的所有菜单
    let allMenus = await fileHandle.read('../files/menuList')
    allMenus = allMenus.find((item) => {
        return item.shopId == shopId
    })
    allMenus = allMenus ? allMenus.kindMenus : []
    // 获取所有的用户信息
    let users = await getUsers()
    // 数据的联合
    let menus = allMenus.reduce((pre, item) => {
        let arr = item.items.reduce((pre, jtem) => {
            let obj = result.find((ktem) => {
                return jtem.id == ktem.id
            })
            if (obj) {
                let user = users.find((item) => {
                    return item.id == obj.userId
                })
                let data = Object.assign({}, obj, jtem, {user})
                pre.push(data)
            }
            return pre
        }, [])
        if (arr.length > 0) {
            pre.push(Object.assign(item, {items: arr}))
        }
        return pre
    }, [])

    let table = await fileHandle.read('../files/table')
    table.find((item) => {
        return item.shopId == shopId && item.tableNum == tableNum
    })

    res.send({
        code: 200,
        data: {
            table,
            menus
        },
        msg: 'ok'
    })

})
module.exports = router