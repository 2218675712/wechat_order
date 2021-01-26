import Styles from './index.module.less'
import {useState,useEffect} from "react";
import BScroll from "better-scroll";

const MenuItems = (props) => {
    let {list, findToClass} = props
    const [active, setactive] = useState(false)
    const findTo = (index) => {
        setactive(false)
        findToClass(index)
    }
    // 初始化better-scroll
    useEffect(() => {
        const scroll = new BScroll("#leftScroll", {
            click: true
        })
        return () => {
            scroll.destroy()
        }
    }, [])
    return <div className={active ? (Styles.active + " " + Styles.MenuItems) : Styles.MenuItems}>
        <aside className={Styles.asideLeft} id='leftScroll'>
            <main>
                <ul>
                    <li>分类</li>
                    <li>
                        <i className='iconfont icon-flag_fill'></i>
                        本周销量榜
                    </li>
                    <li>
                        <i className='iconfont icon-flag_fill'></i>
                        点过的菜
                    </li>
                </ul>
                <ul>
                    {
                        list.map((item, i) => {
                            let {items = [], index, name} = item
                            return <li key={index} onClick={()=>findTo(index)}>
                                {name}
                            </li>
                        })
                    }
                </ul>
            </main>
            <p onClick={() => {
                setactive(!active)
            }}>
                <i className='iconfont icon-other'></i>
                <span>分类</span>
            </p>
        </aside>
        <aside className={Styles.asideRight}>

        </aside>
    </div>
}
export default MenuItems
