import Styles from './index.module.less'
import {useState} from "react";

const MenuItems = (props) => {
    let {list} = props
    const [active, setactive] = useState(false)
    return <div className={active ? (Styles.active + " " + Styles.MenuItems) : Styles.MenuItems}>
        <aside className={Styles.asideLeft}>
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
                            return <li key={index}>
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
