import React, {useEffect, useState} from 'react'
import {Route} from 'react-router-dom'
import Styles from './index.module.less'
import {project} from "../../../services";
import {getParams} from "../../../utils/tool";
import BScroll from 'better-scroll'

const List = (props) => {
    const [list, setlist] = useState([])
    // 初始化
    useEffect(() => {


        project.getMenuList(
            {id: getParams("shopId")}
        ).then((data) => {
            console.log(data)
            setlist(data.data.kindMenus)
        })


    }, [])
    // 初始化better-scroll
    useEffect(() => {
        const scroll = new BScroll("#scroll", {
            click: true
        })
        return () => {
            scroll.destroy()
        }
    }, [])
    return <div id='scroll' className={Styles.List}>
        <main></main>
    </div>
}
const RenderRouter = () => {
    return <Route path='/project/list' exact component={List}/>
}
export default RenderRouter
