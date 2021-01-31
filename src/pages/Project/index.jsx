import List from './List/index'
import HotList from './HotList/index'
import Search from './Search/index'

const Project = (props) => {
    return (<div>{props.children}</div>)
}
const RenderRouter = () => {
    return <Project>
        <List/>
        <HotList/>
        <Search/>
    </Project>
}
export default RenderRouter
