import Styles from './index.module.less'
import Nav from "../../components/Nav";
import BtnLink from "../../components/BtnLink";
import {useEffect, useMemo, useState} from "react";
import {order, shopCar} from "../../services";
import {getParams, serialize} from "../../utils/tool";
import {shopCar as shopCarStore} from '../../store'
import {observer} from "mobx-react";

const ShopCar = observer((props) => {
    const {history, shopCarStore} = props
    const {data, change} = shopCarStore
    const [changePState, setchangePState] = useState(false)
    // const [data, setdata] = useState({})
    const [people, setpeople] = useState(0)

    useEffect(() => {
        shopCar.getShopCar({
            shopId: getParams('shopId'),
            tableNum: getParams('tableNum')
        }).then((data) => {
            console.log(data.data)
            // 意味着有未支付的订单
            if (data.state == false) {
                history.push('/order' + '?shopId=' + getParams("shopId") + '&userId=' + getParams("userId") + '&tableNum=' + getParams("tableNum"))
                return
            }
            // setdata(data.data)
            change(data.data)
            setpeople(data.data.table.people)
        })
    }, [])
    const allPrice = useMemo(() => {
        let {menus = []} = data
        return menus.reduce((pre, item) => {
            let {items} = item
            let res = items.reduce((pre, jtem) => {
                pre = pre + jtem.price * jtem.count
                return pre
            }, 0)
            pre = pre + res
            return pre
        }, 0)
    })
    // 修改用餐人数
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
    // 修改购物车数量
    const changeNum = (type, jtem) => {
        if (type === "+") {
            jtem.count++
        } else if (type === "-" && jtem.count > 1) {
            jtem.count--
        }
        shopCar.changeShopCar({
            id: jtem.id,
            count: jtem.count
        }).then(() => {

        })
    }
    const clearShop = () => {
        shopCar.clearShopCar({
            shopId: getParams('shopId'),
            tableNum: getParams('tableNum')
        }).then(() => {
            history.push('/project/list' + '?shopId=' + getParams("shopId") + '&userId=' + getParams("userId") + '&tableNum=' + getParams("tableNum"))
        })
    }
    const sendOrder = () => {
        order.sendOrder({
            shopId: getParams('shopId'),
            tableNum: getParams('tableNum'),
            userId: getParams('userId')
        }).then(() => {
            history.push('/order')
        })
    }
    return <div className={Styles.ShopCar}>
        <Nav {...props}></Nav>
        <BtnLink
            icon='icon-createtask'
            style={{bottom: '0.4rem', left: '3.25rem'}}
            cb={() => {
                history.push('/project/list' + '?shopId=' + getParams("shopId") + '&userId=' + getParams("userId") + '&tableNum=' + getParams("tableNum"))
            }}>点菜</BtnLink>
        <BtnLink
            icon='icon-createtask'
            style={{bottom: '0.4rem', right: '0.2rem'}}
            cb={() => sendOrder()}>下单</BtnLink>
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
                        <span>购物车里有:
                            {
                                data.menus && data.menus.map((item) => {
                                    return item.name + item.items.length + '个 '
                                })
                            }
                        </span>
                        <b>合计:¥{serialize(allPrice)}</b>
                    </aside>
                    <aside className={Styles.topAsideRight}>
                        <i className='iconfont icon-empty'></i>
                        <p onClick={clearShop}>清空</p>
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
                                            <span>{jtem.user.nickname}</span>
                                        </p>

                                        <aside>
                                            <h4>{jtem.name}</h4>
                                            <p>¥{jtem.price}</p>
                                        </aside>
                                    </aside>
                                    <aside className={Styles.itemRight}>
                                        <p>
                                            <b onClick={() => changeNum('-', jtem)}>-</b>
                                            <span>{jtem.count}{jtem.account}</span>
                                            <b onClick={() => changeNum('+', jtem)}>+</b>
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
})

export default (props) => <ShopCar {...props} shopCarStore={shopCarStore}/>
