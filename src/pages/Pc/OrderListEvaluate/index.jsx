import {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import {pc} from "../../../services";
import {getParams} from "../../../utils/tool";
import GoBack from "../../../components/GoBack";
import Styles from './index.module.less'
import Evaluate from "../../../components/Evaluate";


const OrderListEvaluate = (props) => {
    const [order, setorder] = useState({})
    const {history, match} = props
    useEffect(() => {
        pc.getOrder(
            {
                userId: getParams("userId")
            }
        ).then((data) => {
            let result = data.data.find(item => {
                return item.id === match.params.id
            })
            setorder(result || {})
        })

    }, [])
    let evaluates = order.evaluate || {}
    let {evaluate = 0, taste = 0, speed = 0, enviroment = 0} = evaluates
    const sumit = () => {
        pc.evaluate(
            {
                id: match.params.id,
                evaluate: order.evaluate
            }
        ).then(() => {
            alert("评价完成", "success")
            setTimeout(() => {
                history.go(-1)
            }, 1000)
        })

    }
    const getScore = (type, score) => {
        setorder({
            ...order,
            ...{
                evaluate: {
                    ...order.evaluate,
                    [type]: score
                }
            }
        })
    }
    return <div className={Styles.OrderListEvaluate}>
        <GoBack {...props} styles={{top: '0.1rem', left: '0.1rem'}}>我的订单</GoBack>
        <main>
            <div className={Styles.scrollCon}>
                <div className={Styles.item}>
                    <h3>店铺评价</h3>
                    <ul>
                        <li>
                            评价<Evaluate defaultV={evaluate} getScore={(scroll) => getScore("evaluate", scroll)}/>
                        </li>
                        <li>
                            菜肴口味<Evaluate defaultV={taste} getScore={(scroll) => getScore("taste", scroll)}/>
                        </li>
                        <li>
                            上菜速度<Evaluate defaultV={speed} getScore={(scroll) => getScore("speed", scroll)}/>
                        </li>
                        <li>
                            就餐环境<Evaluate defaultV={enviroment} getScore={(scroll) => getScore("enviroment", scroll)}/>
                        </li>
                    </ul>
                    <p className={Styles.btn}>
                        <button onClick={sumit}>提交</button>
                    </p>
                </div>
            </div>

        </main>
    </div>
}
const RenderRouter = () => {
    return <Route path='/pc/OrderListEvaluate/:id' component={OrderListEvaluate}/>
}
export default RenderRouter

