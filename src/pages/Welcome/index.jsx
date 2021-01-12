import Shop from './Shop'
import SelectPeople from './SelectPeople'

const Welcome = (props) => {
    return (<div>{props.children}</div>)
}
const RenderRouter = () => {
    return <Welcome>
        <Shop/>
       <SelectPeople/>
    </Welcome>
}
export default RenderRouter
