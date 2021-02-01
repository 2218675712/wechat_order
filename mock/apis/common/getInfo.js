const fileHandle = require('../../utils/fileHandle')
module.exports = {
    // 传入的是店铺id
    readMenuList: async (id) => {
        let allMenus = await fileHandle.read('../files/menuList')
        allMenus = allMenus.find((item) => {
            return item.shopId === id
        })
        allMenus = allMenus ? allMenus.kindMenus : []
        return allMenus.reduce((pre, jtem) => {
            pre.push(...jtem.items)
            return pre
        }, [])
    }
}
