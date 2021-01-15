import Styles from './App.module.less'
import Msg from "../components/Msg";
function App(props) {
    return (
        <div className={Styles.App}>
            {props.children}
            <Msg/>
        </div>
    );
}

export default App;
