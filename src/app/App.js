import Styles from './App.module.less'
function App(props) {
    return (
        <div className={Styles.App}>
            {props.children}
        </div>
    );
}

export default App;
