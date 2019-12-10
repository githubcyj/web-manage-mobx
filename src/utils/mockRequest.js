import {RouterStore} from "mobx-react-router";
import {action} from 'mobx';
import axios from 'axios';
import {message} from "antd";

class MockRequest{
    constructor() {
        this.routerStore = new RouterStore();
    }

    getPostRequest = () =>{
        return axios.create({
            baseURL: 'https://easy-mock.com/mock/5ce7afa57ab2cd33eab5d3f4/em',
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json, */*'
            }
        });
    };

    getGetRequest = (uri) =>{
        return axios.create({
            baseURL: 'https://easy-mock.com/mock/5ce7afa57ab2cd33eab5d3f4/em',
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json, */*'
            }
        });
    };

    getRequest = (uri, callback = ()=>{}) => {
        const request = this.getGetRequest(uri);
        return request.get(uri).then(res => res.data || {})
            .then(action(data=>{
                callback(data);
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

    postRequest = (uri, body, callback = ()=>{}) => {
        const data = JSON.stringify(body);
        const request = this.getPostRequest(uri, body);
        return request.post(uri,data).then(res => res.data || {})
            .then(action(data=>{
                callback(data);
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
}

let exportData1;

exportData1 = MockRequest;

export default exportData1