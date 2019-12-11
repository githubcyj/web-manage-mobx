import React,{Component} from 'react';
import {Link} from 'react-router';
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';
// 导入antd组件
import {Menu, Icon, Tooltip} from 'antd';

const SubMenu = Menu.SubMenu;

@inject('mainStore')
@observer
class LeftSider extends Component {
    componentDidMount(){
        const mainStore = this.props.mainStore;
        mainStore.setTenantLogo();
    }

    render(){
        const mainStore = this.props.mainStore

        return(
            <div>

                <div>

                </div>

                <Menu
                mode="inline"
                openKeys={toJS(mainStore.openKeys)}
                onOpenChange={mainStore.onOpenChange}
                onSelect={mainStore.onSelect}
                theme="dark"
                selectedKeys={toJS(mainStore.selectedKeys)}
                >
                <Menu.Item key="MENULEFT-ITEM1">
                    <Link to="/home">
                    <Icon type="home"/>
                    <span>首页</span>
                    </Link>
                </Menu.Item>
                {this.renderSubMenu()}
                </Menu>
            </div>
        )
    }

    renderSubMenu = ()=>{
        const { getMenuArray } = this.props.mainStore;
        return getMenuArray.map(value=>{
            return (
              <SubMenu
                key={value.key}
                title={<span><Icon type={value.icon}/><span>{value.name}</span></span>}
              >
                {this.renderMenuItem(value.children)}
              </SubMenu>
            )
        })
      };
    
      renderMenuItem = (menuArray) =>{
        if(menuArray){
          return menuArray.map(value=>{
            return (
              <Menu.Item
                key={value.key}
              >
                <Link to={value.path}>{value.name}</Link>
              </Menu.Item>
            )
          })
        }
      }
}

export default LeftSider;