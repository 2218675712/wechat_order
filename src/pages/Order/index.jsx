import Styles from './index.module.less'
import {useEffect, useState} from "react";
import {getParams} from "../../utils/tool";
import {order} from "../../services";
import GoBack from "../../components/GoBack";
import {Link} from "react-router-dom";


const Order = (props) => {
    const {history} = props
    const [data, setdata] = useState({});
    const [type, settype] = useState(false);
    const [control, setcontrol] = useState({display: 'none'});
    useEffect(() => {
        order.getOrder({
            shopId: getParams('shopId'),
            tableNum: getParams('tableNum')
        }).then((data) => {
            console.log(data.data)
            setdata(data.data)

        })
    }, [])
    let {menus = []} = data
    const detailChange = () => {
        if (type) {
            setcontrol({display: 'none'})
        } else {
            setcontrol({display: 'block'})
        }
        settype(!type)
    }
    const submit = () => {
        order.pay({
            shopId: getParams('shopId'),
            tableNum: getParams('tableNum')
        }).then((data) => {
            history.push('/pc/index' + '?shopId=' + getParams("shopId") + '&userId=' + getParams("userId") + '&tableNum=' + getParams("tableNum"))
        })
    }
    return <div className={Styles.Order}>
        <GoBack {...props}>已下单的菜</GoBack>
        <main>
            <div className={Styles.scrollCon}>
                <h2>{data.tableNum}桌</h2>
                <p className={Styles.allPrice}>¥{data.allPrice}</p>
                <div className={Styles.section1}>
                    <section>
                        <p>
                            <b> 合计:{menus.length}项</b>
                            <button onClick={detailChange}>
                                <span>订单详情</span>
                                <i className={type ? 'iconfont icon-unfold' : 'iconfont icon-packup'}></i>
                            </button>
                        </p>
                        <ul className={Styles.list} style={control}>
                            {menus.map((item, index) => {
                                return <li key={index}>
                                    <p>
                                        <span>{item.name}</span>
                                        <i>以下厨</i>
                                    </p>
                                    <p>
                                        <span>¥{item.price}</span>
                                        <span>¥{item.count}{item.account}</span>

                                    </p>
                                </li>
                            })}
                        </ul>
                    </section>
                    <h5>账单信息</h5>
                    <ul className={Styles.middle}>
                        <li>
                            <aside>消费金额</aside>
                            <aside>¥{data.allPrice}</aside>
                        </li>
                        <li>
                            <aside>服务费</aside>
                            <aside>¥35.00</aside>
                        </li>
                    </ul>
                    <p className={Styles.allPriceB}>
                        <span>应付金额</span>
                        <span>¥{parseFloat(data.allPrice) + 35}</span>
                    </p>
                </div>
                <div className={Styles.section3}>
                    <h3>支付方式</h3>
                    <p>
                        <input type="checkbox"/>
                        <i className={'iconfont icon-weixin'}></i>
                        <span>微信支付</span>
                    </p>
                </div>
            </div>
        </main>
        <footer>
            <Link
                to={'/project/list' + '?shopId=' + getParams("shopId") + '&userId=' + getParams("userId") + '&tableNum=' + getParams("tableNum")}>继续点餐</Link>
            <a href="#" onClick={submit}>¥{parseFloat(data.allPrice) + 35}立即支付</a>
        </footer>
    </div>
}

export default Order
