import Styles from './index.module.less'

const GoBack= (props) => {
    const {history,style} = props
    return <p className={Styles.GoBack} style={style} onClick={() => {
        history.go(-1)
    }}>
        <i className='iconfont icon-return'></i>
        <span>返回</span>
    </p>
}
export default GoBack
