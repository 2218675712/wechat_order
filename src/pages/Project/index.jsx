import List from './List/index'

const Project = (props) => {
    return (<div>{props.children}</div>)
}
const RenderRouter = () => {
    return <Project>
        <List/>
    </Project>
}
export default RenderRouter
