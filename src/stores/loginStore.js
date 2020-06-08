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
    const userName = values.username
    const password = values.password
    const uri = '/api/login'
    // 定义请求body信息
    const body = {
        "username": userName,
        "password": password
      };
    const httpUtil = new HttpUtil();
    return new Promise((resolve, reject) => {
        httpUtil.postRequest(uri, body).then((res) => {
          console.log("res===="+JSON.stringify(res))
          if(res.errcode === 0){
            localStorage.setItem("result", res);
            // return res;
            resolve();
          }else{
            reject("后台服务异常");
          }
      })
    })
  }
}

export default LoginStore;