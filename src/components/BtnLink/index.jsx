import Styles from './index.module.less'

const BtnLink = (props) => {
    let {icon, style = {}, cb} = props
    return <p className={Styles.BtnLink} onClick={cb} style={style}>
        <i className={"iconfont " + icon} style={style}></i>
        <span>{props.children}</span>
    </p>
}
export default BtnLink
