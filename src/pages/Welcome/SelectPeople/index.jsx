import React from 'react'
import {Route} from 'react-router-dom'
import Styles from './index.module.less'

const selectPeople = (props) => {
    return <div className={Styles.selectPeople}>
        <h3>58号</h3>
        <div>用餐人数</div>
        <span>请选择正确的用餐人数</span>
        <ul>
            {
                [...new Array(8)].map((item, index) => {
                    return <li key={index}>{index + 1}</li>
                })
            }
        </ul>
        <p className={Styles.btn}>开始点菜</p>
    </div>
}
const RenderRouter = () => {
    return <Route path='/welcome/selectPeople' exact component={selectPeople}/>
}
export default RenderRouter
