import Styles from './index.module.less'
import {Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {project, shopCar} from "../../../services";
import {getParams, serialize} from "../../../utils/tool";
import GoBack from "../../../components/GoBack";

const Detail = (props) => {
    const {match,history} = props
    const [data, setdata] = useState({})
    const [count, setcount] = useState(1)
    useEffect(() => {
        project.getMenuDetail({
            shopId: getParams('shopId'),
            id: match.params.id
        }).then((data) => {
            console.log(data)
            setdata(data.data)
        })
    }, [])

    const submit = () => {
        shopCar.sendShopCar({
            shopId: getParams("shopId"),
            userId: getParams("userId"),
            tableNum: getParams("tableNum"),
            menuId: match.params.id,
            count: count
        }).then(() => {
            alert('购物车添加成功', 'success')
            setTimeout(() => {
                history.push('/shopCar'+'?shopId='+getParams("shopId")+'&userId='+getParams("userId"))
            }, 1000)
        })
    }
    return <div className={Styles.Detail}>
        <GoBack {...props}>返回</GoBack>
        <img src={data.imagePath}/>
        <section>
            <h3>{data.name}</h3>
            <p>¥{serialize(data.price)}/{data.account}</p>
        </section>
        <footer>
            <aside>
                <label htmlFor="">数量</label>
                <p>
                    <b onClick={() => {
                        if (count > 1) {
                            setcount(count - 1)
                        }
                    }}>-</b>
                    <span>{count}{data.account}</span>
                    <b onClick={() => setcount(count + 1)}>+</b>
                </p>
            </aside>
            <button className={Styles.shop} onClick={submit}>加入购物车</button>
        </footer>
    </div>
}
const RenderRouter = () => {
    return <Route path='/project/detail/:id' component={Detail}/>
}
export default RenderRouter
