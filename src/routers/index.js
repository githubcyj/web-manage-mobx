import React, {Component} from 'react'

// mobx和react整合
import {inject} from 'mobx-react';

// 导入路由
import {createHashHistory} from 'history';
import {IndexRedirect, IndexRoute, Route, Router, useRouterHistory} from 'react-router';

// mobx和react-router整合
import {syncHistoryWithStore} from 'mobx-react-router';

class AppRoute extends Component {

    render(){
        return(
            <div></div>
        )
    }
}

export default AppRoute;