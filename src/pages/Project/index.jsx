import List from './List/index'
import HotList from './HotList/index'
import Search from './Search/index'
import Detail from './Detail/index'

const Project = (props) => {
    return (<div>{props.children}</div>)
}
const RenderRouter = () => {
    return <Project>
        <List/>
        <HotList/>
        <Search/>
        <Detail/>
    </Project>
}
export default RenderRouter
