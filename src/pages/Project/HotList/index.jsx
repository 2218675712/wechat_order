import React, {useEffect, useState} from "react";
import Styles from './index.module.less';
import {Route} from "react-router-dom";
import GoBack from "../../../components/GoBack";
import {project} from "../../../services";
import {getParams} from "../../../utils/tool";
import ProjectList from "../../../components/ProjectList";
import BScroll from "better-scroll";

const HotList = (props) => {
    const [list, setlist] = useState([])
    useEffect(() => {
        project.getMenuList({
            id: getParams("shopId"),
            type: "hot"
        }).then((data) => {
            setlist(data.data.sort((a, b) => {
                return b.soldCount - a.soldCount
            }))
        })
    })
    useEffect(() => {
        const scroll = new BScroll("#scroll", {
            click: true
        })
        return () => {
            scroll.destroy()
        }
    },[])
    return <div className={Styles.out}>
        <GoBack {...props}/>
        <div className={Styles.HotList} id='scroll'>
            <main>
                <nav>本店销量榜</nav>
                <ProjectList {...props} list={list}/>
            </main>
        </div>
    </div>
}
const RenderRouter = () => {
    return <Route path='/project/hotlist' exact component={HotList}/>
}
export default RenderRouter
