import {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import {welcome} from "../../../services";
import {getParams} from "../../../utils/tool";
import GoBack from "../../../components/GoBack";
import Styles from './index.module.less'


const Index = (props) => {
    const [data, setdata] = useState({})
    const {history} = props
    useEffect(() => {
        welcome.getUserInfo(getParams("userId")).then((data) => {
            setdata(data.data)
            console.log(data.data)
        })
    }, [])
    return <div className={Styles.index}>
        <GoBack {...props}>返回</GoBack>
        <main>
            <div className={Styles.scrollCon}>
                <h2>
                    <img src={data.url}/>
                    <p>{data.nickname}</p>
                </h2>
                <div className={Styles.item}>
                    <section
                        onClick={() => history.push("/pc/msg" + '?shopId=' + getParams("shopId") + '&userId=' + getParams("userId") + '&tableNum=' + getParams("tableNum"))}>
                        <aside>
                            <i className={'iconfont icon-addressbook_fill'}></i>
                            <span>个人信息</span>
                        </aside>
                        <i className={'iconfont icon-enter'}></i>
                    </section>
                </div>
                <div className={Styles.item}>
                    <section
                        onClick={() => history.push("/pc/orderList" + '?shopId=' + getParams("shopId") + '&userId=' + getParams("userId") + '&tableNum=' + getParams("tableNum"))}>
                        <aside>
                            <i className={'iconfont icon-createtask'}></i>
                            <span>订单列表</span>
                        </aside>
                        <i className={'iconfont icon-enter'}></i>
                    </section>
                </div>
            </div>

        </main>
    </div>
}
const RenderRouter = () => {
    return <Route path='/pc/index' component={Index}/>
}
export default RenderRouter

