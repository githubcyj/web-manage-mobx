import {action, observable} from 'mobx';
import HttpUtil from '../utils/request';

class LoginStore {
    /**
   * 构造函数
   * @param appStore 应用store
   */
  constructor(appStore) {
    this.appStore = appStore;
  }

  @action
  reqLogin = (values) => {
    const userName = values.userName
    const password = values.password
    const uri = '/api/login'
    // 定义请求body信息
    const body = {
        "username": userName,
        "password": password
      };
    const httpUtil = new HttpUtil(this.appStore.routerStore);
    return httpUtil.postRequest(uri, body, async (res) => {
        localStorage.setItem("result", res)
    })
  }
}

export default LoginStore;