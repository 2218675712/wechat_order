import Styles from './index.module.less'
import Nav from "../../components/Nav";
import BtnLink from "../../components/BtnLink";
import {useEffect, useState} from "react";
import {shopCar} from "../../services";
import {getParams} from "../../utils/tool";

const ShopCar = (props) => {
    const {history} = props
    const [changePState, setchangePState] = useState(false)
    const [data, setdata] = useState({})
    const [people, setpeople] = useState(0)

    useEffect(() => {
        shopCar.getShopCar({
            shopId: getParams('shopId'),
            tableNum: getParams('tableNum')
        }).then((data) => {
            console.log(data.data)
            setdata(data.data.table)
            setpeople(data.data.table.people)
        })
    }, [])
    const changePeopleH = () => {
        console.log(people)
        shopCar.changePeople({
            shopId: getParams('shopId'),
            tableNum: getParams('tableNum'),
            people
        }).then(() => {
            alert('修改人数成功', 'success')
            setchangePState(false)
        })
    }
    return <div className={Styles.ShopCar}>
        <Nav {...props}></Nav>
        <BtnLink
            icon='icon-createtask'
            style={{bottom: '0.4rem', left: '3.25rem'}}
            cb={() => {
                history.pushState('/project/list')
            }}>点菜</BtnLink>
        <BtnLink
            icon='icon-createtask'
            style={{bottom: '0.4rem', right: '0.2rem'}}
            cb={() => {
                history.pushState('/order')
            }}>下单</BtnLink>
        <main>
            <div className={Styles.top}>
                <h2>购物车</h2>
                <section>
                    <aside>
                        <p>用餐人数: {changePState ?
                            <input type="text" value={people} onChange={e => setpeople(e.target.value)}
                                   onBlur={changePeopleH}/> : <span>{people}</span>}人</p>
                        <span>备注:无</span>
                    </aside>
                    <aside className={Styles.topAsideRight}>
                        <i className='iconfont icon-setup'></i>
                        <p onClick={() => setchangePState(true)}>修改</p>
                    </aside>
                </section>
                <section>
                    <aside>
                        <span>购物车里有:茶水1个</span>
                        <b>合计:¥7000</b>
                    </aside>
                    <aside className={Styles.topAsideRight}>
                        <i className='iconfont icon-empty'></i>
                        <p>清空</p>
                    </aside>
                </section>
            </div>
            {
                data.menus && data.menus.map(item => {
                    let {items} = item
                    return <div className={Styles.item}>
                        <h2>{item.name}</h2>
                        {
                            items.map((jtem) => {
                                return <section>
                                    <aside className={Styles.itemLeft}>
                                        <p>
                                            <img src={jtem.user.url}/>
                                            {/*<img src={jtem.imagePath}/>*/}
                                            <span>{jtem.user.nickname}</span>
                                            {/*<span>{jtem.nickname}</span>*/}
                                        </p>

                                        <aside>
                                            <h4>{jtem.name}</h4>
                                            <p>¥{jtem.price}</p>
                                        </aside>
                                    </aside>
                                    <aside className={Styles.itemRight}>
                                        <p>
                                            <b>+</b>
                                            <span>{jtem.count}{jtem.account}</span>
                                            <b>-</b>
                                        </p>
                                    </aside>
                                </section>
                            })
                        }
                    </div>
                })
            }
        </main>
    </div>
}

export default ShopCar
