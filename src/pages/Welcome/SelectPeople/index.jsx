import React, {useEffect, useState} from 'react'
import {Route} from 'react-router-dom'
import Styles from './index.module.less'
import {getParams} from "../../../utils/tool";
import {welcome} from "../../../services";

const SelectPeople = (props) => {
    const [activeNum, setactiveNum] = useState(0)
    const [tableNum, settableNum] = useState(0)
    useEffect(() => {
        settableNum(getParams("tableNum"))
    }, [])
    /*    const submit = message => {
            let data = {
                shopId: getParams("shopId"),
                userId: getParams("userId"),
                tableNum: getParams("tableNum"),
                people: activeNum
            }
            welcome.addPeople(data).then((data) => {
                console.log(data)
                alert('提交成功', 'success', 1000)
            })
        }*/
    const submit = () => {
        let data = {
            shopId: getParams("shopId"),
            userId: getParams("userId"),
            tableNum: getParams("tableNum"),
            people: activeNum
        }
        welcome.addPeople(data).then((data) => {
            alert('提交成功', 'success', 1000)
            props.history.push("/project/shop")
        })
    }
    return <div className={Styles.selectPeople}>
        <h3>{tableNum}号</h3>
        <div>用餐人数</div>
        <span>请选择正确的用餐人数</span>
        <ul>
            {
                [...new Array(8)].map((item, index) => {
                    return <li
                        key={index}
                        className={activeNum == index + 1 ? Styles.active : ""}
                        onClick={() => setactiveNum(index + 1)}>{index + 1}</li>
                })
            }
        </ul>
        <p className={Styles.btn} onClick={submit}>开始点菜</p>
    </div>
}
const RenderRouter = () => {
    return <Route path='/welcome/selectPeople' exact component={SelectPeople}/>
}
export default RenderRouter
