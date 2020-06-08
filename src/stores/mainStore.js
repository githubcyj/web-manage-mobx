import {observable, action, computed} from 'mobx';
import HttpUtil from '../utils/request';
// 导入antd组件
import {message} from 'antd';

// const httpUtil = new HttpUtil();

class MainStore {
    // 左侧sider是否展开
    @observable collapsed = false;

    // 保存的openKeys
    savedOpenKeys = [];
    // 打开的菜单keys
    @observable openKeys = [];
    // 根菜单Keys
    menuleftSubmenuKeys = ['MENULEFT-SUBMENU1', 'MENULEFT-SUBMENU2', 'MENULEFT-SUBMENU3', 'MENULEFT-SUBMENU4'];

    @observable subMenuArray = [
        {key:'MENULEFT-SUBMENU1',icon:'appstore',name:'商品',children:[
            {key:'MENULEFT-SUBMENU1-ITEM1',icon:'bars',path:'/category',name:'品类管理'},
            {key:'MENULEFT-SUBMENU1-ITEM2',icon:'tool',path:'/product',name:'商品管理'}
          ]},
        {key:'MENULEFT-SUBMENU2',icon:'user',name:'用户管理',children:[
            {key:'MENULEFT-SUBMENU2-ITEM1',icon:'user',path:'/user',name:'用户'}
             ]},
        {key:'MENULEFT-SUBMENU3',icon:'safety',name:'角色管理',children:[
            {key:'MENULEFT-SUBMENU3-ITEM1',icon:'safety',path:'/role',name:'角色'}
          ]},
        {key:'MENULEFT-SUBMENU4',icon:'area-chart',name:'图形图表',children:[
            {key:'MENULEFT-SUBMENU4-ITEM1',icon:'bar-chart',path:'/charts/bar',name:'柱形图'},
            {key:'MENULEFT-SUBMENU4-ITEM2',icon:'line-chart',path:'/charts/line',name:'折线图'},
            {key:'MENULEFT-SUBMENU4-ITEM2',icon:'pie-chart',path:'/charts/pie',name:'饼形图'}
          ]}
      ];

    @computed get getMenuArray() {
        return this.subMenuArray.filter(value=>{
            return true
        })
    }

    //初始化设置左上角logo及名称
    @action
    setTenantLogo = () => {
        // this.mainSiderTenant.logo = localStorage.getItem("tenant_logo");
        // this.mainSiderTenant.name = localStorage.getItem("tenant_name");
    }

     /**
     * 打开菜单发生变化事件
     * @param openKeys 打开的菜单keys
     */
    @action
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.menuleftSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.openKeys = [];
        } else {
            this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
    }

    /**
     * 菜单选中事件
     * @param selectedMenuItem 选中的菜单
     */
    @action
    onSelect = (selectedMenuItem) => {
        const selectedKeys = selectedMenuItem.selectedKeys;
        // 保存openKeys(兼容菜单未展开状态下，切换菜单的情况)
        const arraySelectedKeys = selectedKeys.toString().split("-");
        this.savedOpenKeys = [arraySelectedKeys[0] + "-" + arraySelectedKeys[1]];
        this.selectedKeys = selectedKeys;
        // localStorage.setItem('defaultOpenKeys', this.savedOpenKeys);
        // localStorage.setItem('defaultSelectedKeys', selectedKeys);
    }
}

export default MainStore;