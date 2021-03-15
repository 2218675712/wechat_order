import Index from './Index/index'
import Msg from './Msg/index'

const Project = (props) => {
    return (<div>{props.children}</div>)
}
const RenderRouter = () => {
    return <Project>
        <Index/>
        <Msg/>
    </Project>
}
export default RenderRouter
