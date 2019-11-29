import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';

import './left-nav.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const SubMenu = Menu.SubMenu;

class LeftNav extends React.Component{

    //使用reduce和递归方法实现
    getMenuNodes1 = (menuList) => {

        const path = this.props.location.pathname

        return menuList.reduce((pre, item) => {
            //向pre中Menu.Item
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else{

                if(item.children.find(cItem => path.indexOf(cItem.key)===0)) {
                    this.openKey = item.key
                }

                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }

            return pre
        },[])
    }

    //使用map()和递归方法实现
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname

        return menuList.map(item => {
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
            // 如果当前请求路由与当前菜单的某个子菜单的key 匹配, 将菜单的key 保存为openKey
                if(item.children.find(cItem => path.indexOf(cItem.key)===0)) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    componentWillMount () {
        this.menuNodes = this.getMenuNodes1(menuList)
      }

    render(){

        //获取当前路径
        const path = this.props.location.pathname
        const openKey = this.openKey
        console.log('render()', path)

        return(
            <div className='left-nav'>
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt='logo' />
                    <h1>系统后台</h1>
                </Link>
                <Menu
                // defaultSelectedKeys={[path]}
                
                selectedKeys = {[path]}
                mode="inline"
                theme="dark"
                defaultOpenKeys={[openKey]}
                // inlineCollapsed={this.state.collapsed}
                >
                    {
                        this.menuNodes
                    }
                {/* <Menu.Item key="1">
                    <Link to='/home'>
                        <Icon type="pie-chart" />
                        <span>首页</span>
                    </Link>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                    <span>
                        <Icon type="mail" />
                        <span>商品</span>
                    </span>
                    }
                >
                    <Menu.Item key="2">
                        <Link to='/Category'>
                            <Icon type="mail" />
                            <span>品类管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">商品管理</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                    <span>
                        <Icon type="appstore" />
                        <span>用户管理</span>
                    </span>
                    }
                >
                    <Menu.Item key="4">Option 9</Menu.Item>
                    <Menu.Item key="5">Option 10</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    title={
                    <span>
                        <Icon type="appstore" />
                        <span>角色管理</span>
                    </span>
                    }
                >
                    <Menu.Item key="6">Option 9</Menu.Item>
                    <Menu.Item key="7">Option 10</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                    <span>
                        <Icon type="appstore" />
                        <span>图形图表</span>
                    </span>
                    }
                >
                    <Menu.Item key="8">Option 9</Menu.Item>
                    <Menu.Item key="9">Option 10</Menu.Item>
                </SubMenu> */}
                </Menu>
            </div>
            
        )
    }
}

/*
withRouter 高阶组件
包装一个非路由组件，返回一个新的组件
新的组件向非路由组件传递3个属性：history/location/match
*/
export default withRouter(LeftNav)