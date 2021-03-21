import Index from './Index/index'
import Msg from './Msg/index'
import OrderList from './OrderList/index'
import OrderListEvaluate from './OrderListEvaluate/index'

const Project = (props) => {
    return (<div>{props.children}</div>)
}
const RenderRouter = () => {
    return <Project>
        <Index/>
        <Msg/>
        <OrderList/>
        <OrderListEvaluate/>
    </Project>
}
export default RenderRouter
