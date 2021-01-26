import React, {useEffect, useState} from 'react'
import {Link, Route} from 'react-router-dom'
import Styles from './index.module.less'
import {project} from "../../../services";
import {getParams} from "../../../utils/tool";
import BScroll from 'better-scroll'
import SearchBtn from "../../../components/SearchBtn";
import BtnLink from "../../../components/BtnLink";
import MenuItems from "../../../components/MenuItems";

const List = (props) => {
    const [list, setlist] = useState([])
    const [scroll, setscroll] = useState(null);
    const history = props.history
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
        setscroll(scroll)
        return () => {
            scroll.destroy()
        }
    }, [])

    const findToClass = (index) => {
        let top = document.getElementById(index).offsetTop
        console.log(top)
        scroll.scrollTo(0, -top, 1000)
    }
    return <div>
        <SearchBtn icon='icon-search' cb={() => history.push('/project/search')}/>
        <BtnLink icon='icon-publishgoods_fill' style={{bottom: '0.4rem', right: '0.2rem'}}>购物车</BtnLink>
        <MenuItems list={list} findToClass={findToClass}>购物车</MenuItems>
        <div id='scroll'  className={Styles.List}>
            <main>
                <nav>
                    <Link to='/project/list'>
                        <i className='iconfont icon-examineandapprove'></i>
                        <span>随便点</span>
                    </Link>
                    <Link to='/project/list'>
                        <i className='iconfont icon-flag_fill'></i>
                        <span>热销榜</span>
                    </Link>
                    <Link to='/project/list'>
                        <i className='iconfont icon-document_fill'></i>
                        <span>点过的菜</span>
                    </Link>
                    <a onClick={() => {
                    }}>
                        <i className='iconfont icon-remind_fill'></i>
                        <span>服务铃</span>
                    </a>
                </nav>
                {
                    list.map((item, i) => {
                        let {items = [], index, name} = item
                        return <section key={index} id={index}>
                            <h3>{name}</h3>
                            <ul>
                                {
                                    items.map((jtem, j) => {
                                        let {name, price, memberPrice, imagePath} = jtem
                                        return <li key={j}>
                                            <img src={imagePath}/>
                                            <h4>{name}</h4>
                                            <b>会员:¥{memberPrice}</b>
                                            <span>原价:¥{price}</span>
                                        </li>
                                    })
                                }
                            </ul>
                        </section>
                    })
                }
            </main>
        </div>
    </div>
}
const RenderRouter = () => {
    return <Route path='/project/list' exact component={List}/>
}
export default RenderRouter
