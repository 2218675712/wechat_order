import Styles from './index.module.less'

const SearchBtn = (props) => {
    let {icon, style={},cb} = props
    return <p className={Styles.SearchBtn} onClick={cb}>
        <i className={"iconfont " + icon} style={style}></i>
    </p>
}
export default SearchBtn
