import Styles from './index.module.less'
import {Route} from "react-router-dom";
import {useEffect} from "react";
import {project} from "../../../services";
import {getParams} from "../../../utils/tool";

const Detail = (props) => {
    const {match} = props
    useEffect(() => {
        project.getMenuDetail({
            shopId: getParams('shopId'),
            id: match.params.id
        }).then((data) => {
            console.log(data)
        })
    }, [])
    return <div className={Styles.Detail}>

    </div>
}
const RenderRouter = () => {
    return <Route path='/project/detail/:id' component={Detail}/>
}
export default RenderRouter
