import Styles from './index.module.less'
import {observer} from 'mobx-react'
import {dialog} from '../../store'

const Msg = observer((props) => {
    let {msg, type, show} = props.dialog
    return show ? <div className={Styles.msg}>
        <main>
            <i className={type=="success"?"iconfont icon-prompt_fill "+Styles.success:"iconfont icon-prompt_fill "+Styles.error}></i>
            <h2>{msg}</h2>
        </main>
    </div> : null
})
window.alert = (msg, type, time = 1000) => {
    dialog.change({msg, type, show: true})
    setTimeout(() => {
        dialog.change({msg: '', type: '', show: false})
    }, time)
}
export default () => <Msg dialog={dialog}/>
