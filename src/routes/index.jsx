import React, {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch,} from 'react-router-dom'
import App from "../app/App";

const Welcome = lazy(() => import('../pages/Welcome'))

function BaseRouter() {
    return <Router basename='/'>
        <App>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path='/' exact component={() => {
                        return <Redirect to='/welcome/shop'/>
                    }}/>
                    <Route path='/welcome' component={Welcome}/>
                </Switch>
            </Suspense>

        </App>
    </Router>
}
export default BaseRouter
