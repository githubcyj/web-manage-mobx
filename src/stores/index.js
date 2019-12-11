// 导入mobx路由store
import {RouterStore} from 'mobx-react-router';
import { useStrict } from 'mobx';

//导入模块store
import LoginStore from './loginStore'
import MainStore from './mainStore'

//导入管理模块
import HomeStore from './homeStore'

// useStrict(false);

class AppStore {
    /**
     * 构造函数
     */
    constructor() {
        // mobx路由store
        this.routerStore = new RouterStore();
        //导入模块store
        this.LoginStore = new LoginStore(this);
        this.MainStore = new MainStore(this);
        
        //导入管理模块
        // this.HomeStore = new HomeStore(this)

    }
}

export default AppStore;