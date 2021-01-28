import Styles from './index.module.less'

const CallOut = (props) => {
    let {cancel,sure} = props
    return <div className={Styles.CallOut}>
        <main>
            <h2>需要小二帮您叫服务生吗?</h2>
            <section>
                <button onClick={cancel}>取消</button>
                <button onClick={sure}>叫服务生</button>
            </section>
        </main>
    </div>
}
export default CallOut
