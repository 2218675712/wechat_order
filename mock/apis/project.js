const express = require("express")
const fileHandle = require("../utils/fileHandle")
const Unique = require('../utils/Unique')
const createTime = require("../utils/createTime");
const router = express.Router()
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
module.exports = router
