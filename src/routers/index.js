import React, {Component} from 'react'

// mobx和react整合
import {inject} from 'mobx-react'

// 导入路由
// import {createHashHistory} from 'history';
// import {IndexRedirect, IndexRoute, Route, Router, HashRoute, Switch} from 'react-router-dom'
import {Route, Switch, BrowserRouter} from 'react-router-dom'

// mobx和react-router整合
// import {syncHistoryWithStore} from 'mobx-react-router'
import {asyncComponent} from './AsyncComponent'

const Login = asyncComponent(()=> import('../components/login/login'))
const Manage = asyncComponent(()=> import('../components/admin/admin'))
const Main = asyncComponent(()=> import('../components/main/index'))

@inject('routerStore')
class AppRoute extends Component {

    render(){
        // mobx的history和store连接
        // const browserHistory = useRouterHistory(createHashHistory)({
        //     queryKey: '_key',
        //     basename: '/'
        // });
        // const history = syncHistoryWithStore(browserHistory, this.props.routerStore);

        return(
            <BrowserRouter>
                <Switch>
                    <Route name="/" path="/" component={Login}/>
                        {/* <IndexRoute component={Login}/> */}
                        <Route name="/login" path="/login" component={Login}/>
                        {/* <Route name="/tenant" path="/tenant" component={Tenant}/> */}
                        <Route name="/manage" path="/manage" breadcrumbName="主页" component={Main}>
                            {/* <IndexRedirect to="/home"/> */}
                            <Route name="/home" breadcrumbName="主页" path="/home" component={Main}/>
                            {/* <Route name="agent" breadcrumbName="应用中心" path="agent"></Route> */}
                        </Route>
                    {/* </Route> */}
                </Switch>
           </BrowserRouter>
        )
    }
}

export default AppRoute;