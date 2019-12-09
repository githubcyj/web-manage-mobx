import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../left-nav'
import Header from '../header/header'

const {  Footer, Sider, Content } = Layout;

class Main extends React.Component{
    render(){
        const  user = memoryUtils.user
        //如果内存没有user，当前没有登录
        if(!user || !user._id){
            return <Redirect to='/login'/>
        }

        return(
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor: 'white'}, {margin: '15px'}}>
                        {this.props.children}
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>当前版本：</Footer>
                </Layout>
            </Layout>
        )
        
    }
}

export default Main;