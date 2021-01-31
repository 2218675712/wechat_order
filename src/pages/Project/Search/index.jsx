import {Route} from "react-router-dom";
import Styles from './index.module.less'
import GoBack from "../../../components/GoBack";
import ProjectList from "../../../components/ProjectList";
import {useState,useEffect} from "react";
import {project} from "../../../services";
import {getParams} from "../../../utils/tool";
import BScroll from "better-scroll";

const Search = (props) => {
    const [val, setval] = useState('')
    const [list, setlist] = useState('')
    const searchList = () => {
        project.getMenuList({
            id: getParams("shopId"),
            search: val
        }).then((data) => {
            setlist(data.data)
        })
    }
    useEffect(() => {
        const scroll = new BScroll("#scroll", {
            click: true
        })
        return () => {
            scroll.destroy()
        }
    }, [])
    return <div>
        <GoBack {...props}>返回</GoBack>
        <div className={Styles.Search} id='scroll'>
            <main>
                <nav>
                    <i className='iconfont icon-search' onClick={searchList}></i>
                    <input type="text" value={val} onChange={(e) => setval(e.target.value)}/>
                    <i className='iconfont icon-delete_fill' onClick={() => setval("")}></i>
                </nav>
                {
                        list.length === 0 ?
                        <p className={Styles.none}>客官，请在输入框中输入菜单名称</p> :
                        <section><ProjectList {...props} list={list}/></section>
                }

            </main>
        </div>
    </div>
}
const RenderRouter = () => {
    return <Route path='/project/search' exact component={Search}/>
}
export default RenderRouter
