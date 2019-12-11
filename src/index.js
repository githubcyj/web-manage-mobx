/**
 * 入口
 */
//引入react
import React from 'react'
import ReactDOM from 'react-dom'

// 导入mobx组件
import {Provider} from 'mobx-react'

// 导入应用路由
import AppRoute from './routers/index'

// 导入应用store
import AppStore from './stores/index'

//引入全局样式
import '../public/css/reset.css'

//引入应用的样式


import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

//读取local保存user，保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

class App extends React.Component {
    render() {
      // 初始化应用store
      const appStore = new AppStore();
      return (
        <Provider {...appStore}>
          <AppRoute/>
        </Provider>
      )
    }
  }

 //将APP组件标签渲染到index页面的div上
 ReactDOM.render(<App />, document.getElementById('root'))
