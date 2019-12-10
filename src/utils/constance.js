import React from 'react';
//通讯录人员列表表格头
export const hrm = {
  columns1:[
    { title: '姓名', dataIndex: 'name', width: '10%' },
    { title: '账号', dataIndex: 'userid', width: '10%' },
    { title: '职位', dataIndex: 'position', width: '16%'  },
    { title: '部门', dataIndex: 'dept', width: '19%'  },
    { title: '手机', dataIndex: 'mobile', width: '16%'  },
    { title: '邮箱', dataIndex: 'mail', width: '19%'  },
    { title: '状态', dataIndex: 'status', width: '10%'  }
  ],
  columns2:[
    { title: '名称', dataIndex: 'tagname', width: '30%'  },
    { title: '类型', dataIndex: 'type', width: '30%'  },
    { title: '所属部门', dataIndex: 'dept', width: '40%'  }
  ],
};

//人员信息详情页状态类型
export const status = [
  '',
  '已激活',
  '已禁用',
  '已删除',
  '未激活',
  '已离职',
  '已退出'
];

//用户和标签key值前缀
export const userex = 'user-+zwei';
export const tagex = 'tag-+*/ein';
export const emptyData = { 'userlist': [], 'deptlist': [], 'partylist': [], 'taglist': [], 'mydept': '0' };

//reactCSS配置参数——选择颜色
export const colorConfig = {
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    verticalAlign:'middle',
    cursor: 'pointer',
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
    top: '-10px',
    // right: '10%',
    // bottom: '100px',
    // left: '40%',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
};

/**
 * 三个字段名经过处理： navshoworder,navicon_default,navisshow
 * @type {[*]}
 */
export const navSetting = [
  /*{ title: '', dataIndex: 'operation', width: '4%' },*/
  { title: '名称', dataIndex: 'nav_name', width: '10%' },
  { title: '功能', dataIndex: 'nav_func', width: '18%' },
  { title: '是否默认', dataIndex: 'isdefault', width: '7%' },
  { title: '默认图标', dataIndex: 'navicon_default', width: '10%' },
  { title: '选中图标', dataIndex: 'icon_selected', width: '10%' },
  { title: '顶部标题', dataIndex: 'top_title', width: '10%' },
  { title: '顶部背景颜色', dataIndex: 'top_bgcolor', width: '8%' },
  { title: '标题颜色', dataIndex: 'top_txtcolor', width: '8%' },
  { title: '顶部按钮', dataIndex: 'edit', width: '8%' },
  { title: '更多按钮', dataIndex: 'icon_more', width: '8%' },
  { title: '导航按钮颜色', dataIndex: 'nav_btn_color', width: '8%' },
  { title: '启用', dataIndex: 'navisshow', width: '8%' },
];

export const navSettingNew = [
  /*{ title: '', dataIndex: 'operation', width: '4%' },*/
  { title: '名称', dataIndex: 'nav_name', width: '10%' },
  { title: '功能', dataIndex: 'nav_func', width: '18%' },
  { title: '是否默认', dataIndex: 'isdefault', width: '7%' },
  { title: '默认图标', dataIndex: 'icon_default', width: '10%' },
  { title: '选中图标', dataIndex: 'icon_selected', width: '10%' },
  { title: '顶部标题', dataIndex: 'top_title', width: '10%' },
  { title: '顶部背景颜色', dataIndex: 'top_bgcolor', width: '8%' },
  { title: '标题颜色', dataIndex: 'top_txtcolor', width: '8%' },
  { title: '顶部按钮', dataIndex: 'edit', width: '8%' },
  { title: '更多按钮', dataIndex: 'icon_more', width: '8%' },
  // { title: '导航按钮颜色', dataIndex: 'nav_btn_color', width: '8%' },
  { title: '启用', dataIndex: 'isshow', width: '8%' },
];

export const navSettingNewPc = [
  /*{ title: '', dataIndex: 'operation', width: '4%' },*/
  { title: '名称', dataIndex: 'nav_name', width: '15%' },
  { title: '功能', dataIndex: 'nav_func', width: '20%' },
  { title: '是否默认', dataIndex: 'isdefault', width: '10%' },
  { title: '默认图标', dataIndex: 'icon_default', width: '10%' },
  { title: '选中图标', dataIndex: 'icon_selected', width: '10%' },
  { title: '顶部按钮', dataIndex: 'edit', width: '10%' },
  { title: '更多按钮', dataIndex: 'icon_more', width: '10%' },
  { title: '启用', dataIndex: 'isshow', width: '10%' },
];

export const navBtnNew = [
  { title: '名称', dataIndex: 'btn_name', width: '24%' },
  { title: '功能', dataIndex: 'btn_func', width: '24%' },
  { title: '是否显示', dataIndex: 'btn_isshow', width: '24%' },
  { title: '图标', dataIndex: 'btn_icon_default', width: '24%' }
];

export const navBtn = [
  { title: '名称', dataIndex: 'btn_name', width: '24%' },
  { title: '功能', dataIndex: 'btn_func', width: '24%' },
  { title: '是否显示', dataIndex: 'isshow', width: '24%' },
  { title: '图标', dataIndex: 'icon_default', width: '24%' }
];

export const navFuncName = ['应用商店','消息','专注模式','发起群聊','扫一扫','电话','密聊',,,,,,,'我','工作台','通讯录','消息'];

export const btnFuncName = ['应用商店','消息','专注模式','发起群聊','扫一扫','电话','密聊',,,,,,,'我','工作台','通讯录','消息'];

export const fakeData = [
  { id: 1, email: 'sara@example.com', src: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png"},
  { id: 2, email: 'sara@example.com', src: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png'},
  { id: 3, email: 'sara@example.com', src: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'},
  { id: 4, email: 'sara@example.com', src: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png'}
];

/**
 * log-acccess 日志查询模块
 */
export const logAccesstable = [
  { title: '时间', dataIndex: 'create_time', width: '15%' },
  { title: '姓名', dataIndex: 'base_user_name', width: '10%' },
  { title: '部门', dataIndex: 'deptlist', width: '10%' },
  { title: '登录方式', dataIndex: 'login_mode', widipth: '11%' },
  { title: '客户端类型', dataIndex: 'client_type', width: '8%' },
  { title: '客户端版本', dataIndex: 'client_version', width: '9%' },
  { title: 'IP地址', dataIndex: 'ip', width: '12%' },
  { title: '其它', dataIndex: 'other', width: '25%' },
];

// export const logOperationtable = [
//   { title: '操作时间', dataIndex: 'create_time', width: '15%' },
//   { title: '操作者', dataIndex: 'hrm_user_name', width: '10%',render:(text,record)=>{
//     if(!!text){
//       return text;
//     } else {
//       return record.base_user_name;
//     }
//   } },
//   { title: '操作类型', dataIndex: 'operationType', width: '30%' },
//   { title: '相关数据', dataIndex: 'datainfo', width: '35%',render:(text)=>{
//     return <p className="ellipsis-table-cell">{text}</p>
//   } },
//   { title: 'IP', dataIndex: 'ip', width: '10%'}
// ];

export const logSearchTable = [
  { title: '最后访问时间', dataIndex: 'access_time', width: '15%' },
  { title: '姓名', dataIndex: 'base_user_name', width: '10%' },
  { title: '部门', dataIndex: 'deptlist', width: '12%' },
  { title: '登录时间', dataIndex: 'create_time', width: '15%' },
  { title: '登陆IP', dataIndex: 'ip', width: '10%' },
  // { title: '登录方式', dataIndex: 'login_mode', widipth: '11%' },
  { title: '客户端类型', dataIndex: 'client_type', width: '10%' },
  { title: '客户端版本', dataIndex: 'client_version', width: '9%' },
  { title: '其它', dataIndex: 'other', width: '18%' },
];

export const logSearchCpTable = [
  { title: '最后访问时间', dataIndex: 'access_time', width: '20%' },
  { title: '姓名', dataIndex: 'base_user_name', width: '20%' },
  { title: '部门', dataIndex: 'deptlist', width: '20%' },
  { title: '登录时间', dataIndex: 'create_time', width: '20%' },
  { title: '登陆IP', dataIndex: 'ip', width: '20%' },
  // { title: '登录方式', dataIndex: 'login_mode', widipth: '11%' },
  // { title: '客户端类型', dataIndex: 'client_type', width: '10%' },
  // { title: '客户端版本', dataIndex: 'client_version', width: '9%' },
  // { title: '其它', dataIndex: 'other', width: '23%' },
];

export const loginType = [null,'账号密码登录','手机验证码登录','扫码登录','ECOLOGY登录','SSO登录'];
export const clientType = [null,'PC客户端','IOS客户端','安卓客户端','web版'];


/**
 * 表单统一样式
 */
export const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 5}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
    md: {span: 14}//10
  }
};
// 提交表单布局
export const submitFormLayout = {
  wrapperCol: {
    xs: {span: 24, offset: 0},
    sm: {span: 10, offset: 5}
  }
};

/**
 * 系统继承
 */

export const sysIntegrationDefaultConfig = {
  baseid_type: 1,
  companylist: [],
  departmentlist: null,
  dept_sync_type: 1,
  isalluser: 0,
  isopen_sync_task: 1,
  match_outsys_field: 1,
  match_user_field: 1,
  outsys_id: "1",//
  root_dept_id: "1",//
  task_cycle: 3600,
  task_end_time: `${new Date().toLocaleDateString().replace(/\//g,'-')} 23:59:59`,
  task_start_time: `${new Date().toLocaleDateString().replace(/\//g,'-')} 00:00:00`,
  user_del_type: 1,
  userid_field: 1,
  userlist: null
};

//未设置时显示内容
export const unset = (<span style={{color:'#787878'}}>未设置</span>);

//侧边栏menu
// export const subMenuArray = [
//   {key:'MENULEFT-SUBMENU1',icon:'appstore-o',name:'应用中心',children:[
//       {key:'MENULEFT-SUBMENU1-ITEM1',path:'/agent/homelist',name:'主页型应用'},
//       {key:'MENULEFT-SUBMENU1-ITEM2',path:'/agent/msglist',name:'消息型应用'},
//       {key:'MENULEFT-SUBMENU1-ITEM3',path:'/agent/sharelist',name:'分享型应用'},
//     ]},
//   {key:'MENULEFT-SUBMENU2',icon:'desktop',name:'门户管理',children:[
//       {key:'MENULEFT-SUBMENU2-ITEM1',path:'/portal/list',name:'门户列表'},
//     ]},
//   {key:'MENULEFT-SUBMENU3',icon:'mail',name:'消息中心',children:[
//       {key:'MENULEFT-SUBMENU3-ITEM1',path:'/msg/msghistory',name:'消息日志'},
//       {key:'MENULEFT-SUBMENU3-ITEM2',path:'/msg/sendmsg',name:'发送消息'},
//     ]},
//   {key:'MENULEFT-SUBMENU4',icon:'tablet',name:'EMobile管理',children:[
//       {key:'MENULEFT-SUBMENU4-ITEM1',path:'/clientset/hrm',name:'用户管理'},
//       {key:'MENULEFT-SUBMENU4-ITEM2',path:'/clientset/theme',name:'主题设置'},
//       {key:'MENULEFT-SUBMENU4-ITEM3',path:'/clientset/workbench',name:'工作台设置'},
//       {key:'MENULEFT-SUBMENU4-ITEM4',path:'/clientset/scan',name:'扫码规则'},
//     ]},
//   {key:'MENULEFT-SUBMENU5',icon:'api',name:'集成管理',children:[
//       {key:'MENULEFT-SUBMENU5-ITEM1',path:'/integrate/ec',name:'ECOLOGY集成'},
//       {key:'MENULEFT-SUBMENU5-ITEM2',path:{pathname:'/integrate/list',state:{type:'wechat'}},name:'企业微信集成'},
//       {key:'MENULEFT-SUBMENU5-ITEM3',path:{pathname:'/integrate/dinglist',state:{type:'ding'}},name:'钉钉集成'},
//     ]},
//   {key:'MENULEFT-SUBMENU6',icon:'area-chart',name:'统计分析',children:[
//       {key:'MENULEFT-SUBMENU6-ITEM1',path:'/log/analysis',name:'成员使用统计'},
//       {key:'MENULEFT-SUBMENU6-ITEM2',path:'/log/access',name:'成员访问日志'},
//       {key:'MENULEFT-SUBMENU6-ITEM3',path:'/log/operation',name:'系统管理日志'},
//       // {key:'MENULEFT-SUBMENU6-ITEM4',path:'/log/agent',name:'应用使用分析'},
//       {key:'MENULEFT-SUBMENU6-ITEM5',path:'/log/search',name:'在线人员查询'},
//     ]},
//   {key:'MENULEFT-SUBMENU7',icon:'user',name:'企业管理',children:[
//       {key:'MENULEFT-SUBMENU7-ITEM1',path:'/sys/enterprise',name:'企业信息'},
//       {key:'MENULEFT-SUBMENU7-ITEM2',path:'/sys/right',name:'权限设置'},
//       // {key:'MENULEFT-SUBMENU6-ITEM3',path:'/sys/msg',name:'聊天设置'},
//     ]},
//   {key:'MENULEFT-SUBMENU8',icon:'setting',name:'系统管理',children:[
//       {key:'MENULEFT-SUBMENU8-ITEM1',path:'/admin/sysinfo',name:'系统信息'},
//       {key:'MENULEFT-SUBMENU8-ITEM2',path:'/admin/license',name:'授权信息'},
//       {key:'MENULEFT-SUBMENU8-ITEM3',path:'/admin/tenantlist',name:'企业列表'},
//       {key:'MENULEFT-SUBMENU8-ITEM4',path:'/admin/userlist',name:'用户列表'},
//       {key:'MENULEFT-SUBMENU8-ITEM5',path:'/admin/basesetting',name:'基础设置'},
//       {key:'MENULEFT-SUBMENU8-ITEM6',path:'/admin/securitysetting',name:'安全设置'},
//       {key:'MENULEFT-SUBMENU8-ITEM7',path:'/admin/msgsetting',name:'消息设置'},
//       {key:'MENULEFT-SUBMENU8-ITEM8',path:'/admin/third',name:'第三方设置'},
//       {key:'MENULEFT-SUBMENU8-ITEM9',path:'/admin/config',name:'属性设置'},
//       {key:'MENULEFT-SUBMENU8-ITEM13',path:'/admin/notice',name:'系统通知'},
//       {key:'MENULEFT-SUBMENU8-ITEM14',path:'/admin/version',name:'版本信息'},
//     ]}
// ];