import Index from './Index/index'

const Project = (props) => {
    return (<div>{props.children}</div>)
}
const RenderRouter = () => {
    return <Project>
        <Index/>
    </Project>
}
export default RenderRouter
