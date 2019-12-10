import {message} from 'antd';
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
import {useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import {action} from 'mobx';
import axios from 'axios';
import IEHttp from './http';

class HttpUtil {
  constructor() {
    this.routerStore = new RouterStore();
  }

  /**
   * 获取Post请求实体
   * @param uri uri信息
   * @param body 请求body参数信息
   */
  getPostRequest = (uri, body) => {
    return axios.create({
      baseURL: window.contextPath + window.apiPrifix,
      headers:{
        'Content-Type': 'application/json',
        // 'access_token': localStorage.getItem("access_token"),
        'emaccesstk': localStorage.getItem("access_token"),
      },
      withCredentials: true,
    })
  };

  /**
   * 获取Get请求实体
   * @param uri uri信息
   */
  getGetRequest = (uri) => {
    return axios.create({
      baseURL: window.contextPath + window.apiPrifix,
      headers:{
        // 'access_token': localStorage.getItem("access_token"),
        'emaccesstk': localStorage.getItem("access_token")
      },
      withCredentials: true,
    })
  };

  /**
   * Get请求
   */
  getRequest = (uri, callback = ()=>{}) => {
    const request = this.getGetRequest(uri);
    return request.get(uri).then(res => res.data || {})
      .then(action(data=>{
        this.judgeErrCode(data,callback)
        return data
      })).catch((error) => {
        try{
          message.destroy();
        }catch(e){
          console.log("can't find message")
        }
        message.error("无法连接服务器,请联系管理员");
        console.error("调用api发生异常：", error);
      });
  };
  /**
   * Post请求
   */
  postRequest = (uri, body, callback = ()=>{}) => {
    const data = JSON.stringify(body);
    const request = this.getPostRequest(uri, body);
    return request.post(uri,data).then(res => res.data || {})
      .then(action(data=>{
        this.judgeErrCode(data,callback)
        return data
      })).catch((error) => {
        try{
          message.destroy();
        }catch(e){
          console.log("can't find message")
        }
        message.error("无法连接服务器,请联系管理员");
        console.error("调用api发生异常：", error);
      });
  };
  judgeErrCode = (jsonResponse,callback) => {
    const browserHistory = useRouterHistory(createHashHistory)({
      queryKey: '_key',
      basename: '/'
    });
    const history = syncHistoryWithStore(browserHistory, this.routerStore);
    // 请求成功
    if (jsonResponse.errcode === 0 || jsonResponse.errcode === 200) {
      callback(jsonResponse);
      return jsonResponse;
    }
    // 请求失败
    else if (jsonResponse.errcode === 40001 || jsonResponse.errcode === 42001) {

      const {push} = history;
      if (window.location.hash !== '#/login') {
        sessionStorage.setItem('timeoutPage', window.location.hash.slice(1));
        try{
          message.destroy();
        }catch(e){
          console.log("can't find message")
        }
        message.error("登录超时，请重新登录");
        push("/login");
      }
      return jsonResponse;
    } else if (jsonResponse.errcode === -3) {
      const {push} = history;
      console.log(push);
      push('/admin/license');
      return jsonResponse;
    } else if (jsonResponse.errcode === -9) {
      const {push} = history;
      push('/admin/basesetting');
      return jsonResponse;
    } else {
      try{
        message.destroy();
      }catch(e){
        console.log("can't find message")
      }
      message.error(jsonResponse.errmsg);
      return jsonResponse;
    }
  }
}

function getIEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if(isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if(fIEVersion == 7) {
      return 7;
    } else if(fIEVersion == 8) {
      return 8;
    } else if(fIEVersion == 9) {
      return 9;
    } else if(fIEVersion == 10) {
      return 10;
    } else {
      return 6;//IE版本<=7
    }
  } else if(isEdge) {
    return 'edge';//edge
  } else if(isIE11) {
    return 11; //IE11
  }else{
    return -1;//不是ie浏览器
  }
};

const IEVersion = getIEVersion();
let exportData;

if (IEVersion === -1){
  exportData = HttpUtil;
} else {
  exportData = IEHttp;
}

export default exportData
