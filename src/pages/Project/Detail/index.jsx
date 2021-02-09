import Styles from './index.module.less'
import {Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {project} from "../../../services";
import {getParams} from "../../../utils/tool";
import GoBack from "../../../components/GoBack";

const Detail = (props) => {
    const {match} = props
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
    return <div className={Styles.Detail}>
        <GoBack {...props}>返回</GoBack>
        <img src={data.imagePath} />
        <section>
            <h3>{data.name}</h3>
            <p>¥{data.price}/{data.account}</p>
        </section>
        <footer>
            <aside>
                <label htmlFor="">数量</label>
                <p>
                    <b>-</b>
                    <span>{count}{data.account}</span>
                    <b>+</b>
                </p>
            </aside>
            <button className={Styles.shop}>加入购物车</button>
        </footer>
    </div>
}
const RenderRouter = () => {
    return <Route path='/project/detail/:id' component={Detail}/>
}
export default RenderRouter
