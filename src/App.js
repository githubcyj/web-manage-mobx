/**
 * 应用根目录
 */

 import React from 'react'
 /* browserroute 和 hashroute 的区别是是否加上#*/
 import {BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom'
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

class App extends React.Component{

    render(){
        return ( 
            <BrowserRouter>
                <Switch>
                    {/* <Router history={Login}> */}
                        {/* <Route path='/'> */}
                            {/* <IndexRoute component={Login}/> */}
                            <Route path='/login' component={Login}/>
                            <Route path='/' component={Admin}/>
                        {/* </Route>
                    </Router> */}
                    
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;