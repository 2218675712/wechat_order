import Index from './Index/index'
import Msg from './Msg/index'
import OrderList from './OrderList/index'

const Project = (props) => {
    return (<div>{props.children}</div>)
}
const RenderRouter = () => {
    return <Project>
        <Index/>
        <Msg/>
        <OrderList/>
    </Project>
}
export default RenderRouter
