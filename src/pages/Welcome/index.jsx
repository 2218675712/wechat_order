import Shop from './Shop/index'

const Welcome = (props) => {
    return (<div>{props.children}</div>)
}
const RenderRouter = () => {
    return <Welcome>
        <Shop/>
    </Welcome>
}
export default RenderRouter
