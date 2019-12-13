import {message} from 'antd';
import {RouterStore} from 'mobx-react-router';
// import {useRouterHistory} from 'react-router';
// import {createHashHistory} from 'history';
import {action} from 'mobx';

/**
 * Http工具类
 *
 */
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
    // url
    const url = window.contextPath + window.apiPrifix + uri;
    // 定义请求头信息
    const headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    // headers.append('access_token', localStorage.getItem("access_token"));
    headers.append("emaccesstk", localStorage.getItem("access_token"));
    // 定义请求初始化信息
    const init = {
      credentials:'include',
      method: 'POST',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      // 请求信息需要以json格式提供
      body: JSON.stringify(body)
    };
    // 初始化请求实体
    const request = new Request(url, init);

    // 返回请求实体
    return request;
  };

  /**
   * 获取Get请求实体
   * @param uri uri信息
   */
  getGetRequest = (uri) => {
    // url
    const url = window.contextPath + window.apiPrifix + uri;
    // 定义请求头信息
    const headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append("access_token", localStorage.getItem("access_token"));
    headers.append("emaccesstk", localStorage.getItem("access_token"));

    // 定义请求初始化信息
    const init = {
      credentials:'include',
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    };

    // 初始化请求实体
    const request = new Request(url, init);

    // 返回请求实体
    return request;
  };

  /**
   * fetch发送请求
   */
  getFetch = (request, callback = ()=>{}) => {
    // const browserHistory = useRouterHistory(createHashHistory)({
    //   queryKey: '_key',
    //   basename: '/'
    // });
    // const history = syncHistoryWithStore(browserHistory, this.routerStore);

    // 调用请求
    return fetch(request).then(response => {
      return response.json();
    }).then(action((jsonResponse) => {
      // 请求成功
      if (jsonResponse.errcode === 0 || jsonResponse.errcode === 200) {
        callback(jsonResponse);
        return jsonResponse;
      }
      // 请求失败
      else if (jsonResponse.errcode === 40001 || jsonResponse.errcode === 42001) {
        const {push} = '/login';
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
        const {push} = '/login';
        push('/admin/license');
        return jsonResponse;
      } else if (jsonResponse.errcode === -9) {
        const {push} = '/login';
        push('/admin/basesetting');
        return jsonResponse;
      }
      else {
        try{
          message.destroy();
        }catch(e){
          console.log("can't find message")
        }
        message.error(jsonResponse.errmsg);
        return jsonResponse;
      }
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
   * Get请求
   */
  getRequest = (uri, callback) => {
    const request = this.getGetRequest(uri);
    return this.getFetch(request, callback);
  };
  /**
   * Post请求
   */
  postRequest = (uri, body, callback) => {
    const request = this.getPostRequest(uri, body);
    return this.getFetch(request, callback);
  };

  String2XML = (xmlString) => {
    // for IE
    if (window.ActiveXObject) {
      var xmlobject = new ActiveXObject("Microsoft.XMLDOM");
      xmlobject.async = "false";
      xmlobject.loadXML(xmlString);
      return xmlobject;
    }
    // for other browsers
    else {
      var parser = new DOMParser();
      var xmlobject = parser.parseFromString(xmlString, "text/xml");
      return xmlobject;
    }
  };

  judgeErrCode = (jsonResponse,callback) => {
    // const browserHistory = useRouterHistory(createHashHistory)({
    //   queryKey: '_key',
    //   basename: '/'
    // });
    // const history = syncHistoryWithStore(browserHistory, this.routerStore);
    // 请求成功
    if (jsonResponse.errcode === 0 || jsonResponse.errcode === 200) {
      callback(jsonResponse);
      return jsonResponse;
    }
    // 请求失败
    else if (jsonResponse.errcode === 40001 || jsonResponse.errcode === 42001) {

      const {push} = '/login';
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
      const {push} = '/login';
      console.log(push);
      push('/admin/license');
      return jsonResponse;
    } else if (jsonResponse.errcode === -9) {
      const {push} = '/login';
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

export default HttpUtil;