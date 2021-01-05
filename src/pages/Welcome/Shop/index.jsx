import {Route} from 'react-router-dom'

const Shop = () => {
    return <div>
        <p>shop</p>
    </div>
}
const RenderRouter = () => {
    return <Route path='/welcome/shop' exact component={Shop}/>
}
export default RenderRouter
