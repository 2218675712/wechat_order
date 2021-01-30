import Styles from './index.module.less'

const ProjectList = (props) => {
    const {list} = props
    return <ul className={Styles.ProjectList}>
        {
            list.map((item, index) => {
                return <li key={index}>
                    <aside>
                        <img src={item.imagePath} alt=""/>
                        <h4>{item.name}</h4>
                    </aside>
                    <aside>
                        <div>
                            第
                            <p>
                                <b>{index + 1}</b>
                                <i className='iconfont icon-like_fill'></i>
                            </p>
                            名
                        </div>
                        <span>已售{item.soldCount}份</span>
                    </aside>
                </li>
            })
        }
    </ul>
}
export default ProjectList
