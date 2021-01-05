import {Route,Link} from 'react-router-dom'
import Styles from './index.module.less'
const Shop = (props) => {
    return <div className={Styles.shop}>
        <h2>
            <span>紫龙火锅</span>
        </h2>
        <section>欢迎光临,追梦人</section>
        <Link to='/' className={Styles.btn} >开始点餐结账</Link>
    </div>
}
const RenderRouter = () => {
    return <Route path='/welcome/shop' exact component={Shop}/>
}
export default RenderRouter
