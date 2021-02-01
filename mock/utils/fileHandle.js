const fs = require('fs')
const path = require('path')
module.exports = {
    /**
     * 读取服务器本地文件
     * @param url 文件链接
     * @returns {Promise<unknown>}
     */
    read(url) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, url), "utf-8", (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(JSON.parse(data))
            })
        })
    },
    /**
     * 写入文件
     * @param url 文件链接
     * @param data  写入的数据
     * @returns {Promise<unknown>}
     */
    write(url, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(__dirname, url), JSON.stringify(data), "utf-8", (err) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve()
            })
        })
    },
    /**
     * 添加一条数据
     * @param url   本地文件链接
     * @param data  数据
     * @returns {Promise<void>}
     */
    async add(url, data) {
        let result = await this.read(url)
        result.push(data)
        await this.write(url, result)
    },
    /**
     * 修改本地文件指定的某条数据
     * @param url   本地文件
     * @param data  要修改的数据
     * @returns {Promise<void>}
     */
    async amend(url, data) {
        let result = await this.read(url)
        result = result.map((item) => {
            if (item.id == data.id) {
                return data
            } else {
                return item
            }
        })
        await this.write(url, result)
    },
/*    /!**
     * 删除一条数据
     * @param url   本地文件连接
     * @param id    要删除的数据
     * @returns {Promise<void>}
     *!/
    async remove(url, id) {
        let result = await this.read(url)
        result = result.filter((item) => {
            return item.id != id
        })
        await this.write(url, result)
    },*/
    /**
     * 删除一条数据
     * @param url   本地文件连接
     * @param type  要删除的数据对象
     * @param id    数据的id
     * @returns {Promise<void>}
     */
    async remove(url, type, id) {
        let result = await this.read(url)
        result = result.filter((item) => {
            return item[type] != id
        })
        await this.write(url, result)
    }
}
