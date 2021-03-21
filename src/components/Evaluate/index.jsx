import Styles from './index.module.less'

const Evaluate = (props) => {
    const change = (num) => {
        let result = props.defaultV + num
        props.getScore(result)
    }
    // console.log(props.defaultV)

    return <p className={Styles.Evaluate}>
        {
            Array.from(new Array(5)).map((i, index) => {
                if (index < props.defaultV) {
                    return <i className={'iconfont icon-collection_fill'} onClick={() => change(-1)}></i>
                } else {
                    return <i className={'iconfont icon-collection'} onClick={() => change(1)}></i>

                }
            })
        }
    </p>
}
export default Evaluate
