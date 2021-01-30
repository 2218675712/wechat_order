import List from './List/index'
import HotList from './HotList/index'

const Project = (props) => {
    return (<div>{props.children}</div>)
}
const RenderRouter = () => {
    return <Project>
        <List/>
        <HotList/>
    </Project>
}
export default RenderRouter
