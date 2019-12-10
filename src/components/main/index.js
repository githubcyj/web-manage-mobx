import React from 'react'
import {inject, observer} from 'mobx-react';
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../left-nav'
import Header from '../header/header'

const {  Footer, Sider, Content } = Layout;

@inject('mainStore')
@observer
class Main extends React.Component{

    componentDidMount(){
        const { keepAlive } = this.props.mainStore;
    
        setInterval(keepAlive, 1200000);
      }

    render(){
        // const  user = memoryUtils.user
        // //如果内存没有user，当前没有登录
        // if(!user || !user._id){
        //     return <Redirect to='/login'/>
        // }

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