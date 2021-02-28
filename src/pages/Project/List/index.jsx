import React, {useEffect, useState} from 'react'
import {Link, Route} from 'react-router-dom'
import Styles from './index.module.less'
import {project} from "../../../services";
import {getParams} from "../../../utils/tool";
import BScroll from 'better-scroll'
import SearchBtn from "../../../components/SearchBtn";
import BtnLink from "../../../components/BtnLink";
import MenuItems from "../../../components/MenuItems";
import Nav from "../../../components/Nav";
import CallOut from "../../../components/CallOut";

const List = (props) => {
    const [list, setlist] = useState([])
    const [scroll, setscroll] = useState(null);
    const history = props.history
    // 初始化
    useEffect(() => {
        project.getMenuList(
            {id: getParams("shopId")}
        ).then((data) => {
            // console.log(data)
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

    // 根据侧边栏滑动找到对应商品
    const findToClass = (index) => {
        let top = document.getElementById(index).offsetTop
        scroll.scrollTo(0, -top, 1000)
    }
    // 控制服务铃显示和隐藏
    const [callout, setcallout] = useState(false)
    // 呼叫
    const sure = () => {
        project.callOut({
            shopId: getParams("shopId"),
            tableNum: getParams("tableNum"),
            userId: getParams("userId")
        }).then(() => {
            setcallout(false)
        })
    }
    return <div>
        <SearchBtn icon='icon-search' cb={() => history.push('/project/search' + '?shopId=' + getParams("shopId"))}/>
        {/*<SearchBtn icon='icon-search' cb={() => history.push('/project/search')}/>*/}
        <BtnLink cb={() => history.push('/shopCar'+'?shopId='+getParams("shopId")+'&userId='+getParams("userId")+'&tableNum='+getParams("tableNum"))} icon='icon-publishgoods_fill' style={{bottom: '0.4rem', right: '0.2rem'}}>购物车</BtnLink>
        <MenuItems list={list} findToClass={findToClass}>购物车</MenuItems>
        <Nav/>
        {callout && <CallOut cancel={() => setcallout(false)} sure={sure}/>}
        <div id='scroll' className={Styles.List}>
            <main>
                <nav>
                    <Link to='/project/list'>
                        <i className='iconfont icon-examineandapprove'></i>
                        <span>随便点</span>
                    </Link>
                    <Link to={'/project/hotlist' + '?shopId=' + getParams("shopId")}>
                        {/*<Link to='/project/hotlist'>*/}
                        <i className='iconfont icon-flag_fill'></i>
                        <span>热销榜</span>
                    </Link>
                    <Link to='/project/list'>
                        <i className='iconfont icon-document_fill'></i>
                        <span>点过的菜</span>
                    </Link>
                    <a onClick={() => setcallout(true)}>
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
                                        let {name, price, memberPrice, imagePath, id} = jtem
                                        return <li key={j} onClick={() => {
                                            history.push('/project/detail/' + id + '?shopId=' + getParams("shopId") + '&userId=' + getParams("userId") + '&tableNum=' + getParams("tableNum"))
                                        }}>
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
