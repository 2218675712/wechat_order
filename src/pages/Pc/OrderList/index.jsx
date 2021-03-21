import {useEffect, useState} from "react";
import {Link, Route} from "react-router-dom";
import {pc, welcome} from "../../../services";
import {getParams} from "../../../utils/tool";
import GoBack from "../../../components/GoBack";
import Styles from './index.module.less'


const OrderList = (props) => {
    const [list, setlist] = useState([])
    const [shop, setshop] = useState([])
    const {history} = props
    useEffect(() => {
        pc.getOrder(
            {
                userId: getParams("userId")
            }
        ).then((data) => {
            setlist(data.data)
        })
        welcome.getShopData(getParams("shopId")).then((data) => {
            setshop(data.data)
        })
    }, [])
    return <div className={Styles.OrderList}>
        <GoBack {...props} styles={{top:'0.1rem',left:'0.1rem'}}>返回</GoBack>
        <main>
            <div className={Styles.scrollCon}>
                <h2>我的订单</h2>
                {
                    list.map((item, index) => {
                        return <div className={Styles.item} key={index}>
                            <section>
                                <aside>
                                    <b>{shop.shop_name}</b>
                                    <span>{item.time}</span>
                                </aside>
                                <a href={"tel:" + shop.shopPhone}>
                                    <i className={'iconfont icon-customerservice_fill'}></i>
                                </a>
                            </section>
                            <ul>
                                <li>
                                    订单金额:<span>¥{item.allPrice}</span>
                                </li>
                                <li>
                                    订单状态:<span>{item.isPlay ? '已支付' : '未支付'}</span>
                                </li>
                                <li>
                                    订单编号:<span>{item.id.substr(0, 10) + "..."}</span>
                                </li>
                            </ul>
                            <p>
                                <Link
                                    to={"/pc/orderListEvaluate/" + item.id+ '?shopId=' + getParams("shopId") + '&userId=' + getParams("userId") + '&tableNum=' + getParams("tableNum")}>我要评价</Link>
                            </p>
                        </div>
                    })
                }
            </div>

        </main>
    </div>
}
const RenderRouter = () => {
    return <Route path='/pc/orderList' component={OrderList}/>
}
export default RenderRouter

