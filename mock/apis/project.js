const express = require("express")
const fileHandle = require("../utils/fileHandle")
const Unique = require('../utils/Unique')
const createTime = require("../utils/createTime");
const router = express.Router()
const {readMenuList} = require('./common/getInfo')
// 获取店铺信息
router.get("/getMenuList", async (req, res, next) => {
    const {id, type, search} = req.query
    let data = await fileHandle.read('../files/menuList')
    let result = data.find((item) => {
        return item.shopId === id
    })
    // 热搜
    if (type === 'hot') {
        result = result ? result.kindMenus.reduce((pre, jtem) => {
            jtem.items.forEach((j) => {
                if (j.hot) {
                    pre.push(j)
                }
            })
            return pre
        }, []) : []
    }
    // 搜索
    if (search !== undefined) {
        result = result ? result.kindMenus.reduce((pre, jtem) => {
            jtem.items.forEach((j) => {
                if (j.name.includes(search)) {
                    pre.push(j)
                }
            })
            return pre
        }, []) : []
    }
    res.send({
        code: 200,
        data: result || {},
        msg: 'ok'
    })
})
// 获取菜单详情
router.get('/getMenuDetail', async (req, res, next) => {
    const {shopId, id} = req.query
    let datas = await readMenuList(shopId)
    let result = datas.find((item) => {
        return item.id === id
    })
    res.send({
        code: 200,
        data: result || {},
        msg: 'OK'
    })
})
// 呼叫服务员
router.post("/callOut", async (req, res, next) => {
    const {shopId, tableNum, userId} = req.body
    const result = {
        id: Unique(),
        shopId: shopId,
        tableNum: tableNum,
        userId: userId,
        createTime: createTime()
    }
    await fileHandle.add('../files/callOut', result)
    res.send({
        code: 200,
        msg: 'ok'
    })
})
module.exports = router
