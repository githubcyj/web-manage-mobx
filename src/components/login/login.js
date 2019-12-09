import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';

import '../../style/login.less'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { Redirect } from 'react-router-dom'

const Item = Form.Item;

class Login extends React.Component {

    validatePwd = (rule, value, callback) => {
        console.log('validatePwd', rule, value);
        if(!value){
            callback('密码必须输入');
        }else if(value.length < 4){
            callback('密码长度不能小于4');
        }else if(value.length > 12){
            callback('密码长度不能大于12');
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文，数字，下划线');
        }else{
            callback();
        }
    }

    render() {
        //判断用户是否登录
        const user = memoryUtils.user
        if(user && user._id){
            return <Redirect to='/'/>
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {/* username
                                    1,required:true
                                    2,min:4
                                    3,max:12
                                    4,English，number，underline */}
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, whitespace: true, message: '用户名必填' },
                                    { min: 4, message: '用户名至少4位数' },
                                    { max: 12, message: '用户名最多12位数' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字，下划线' }]
                            })(<Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [{ validator: this.validatePwd }]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />
                            )}
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }

    handleSubmit = (event) => {
        //阻止事件的默认行为
        event.preventDefault();

        // const form = this.props.form;
        // const values = form.getFieldsValue();

        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('handleSubmit = ()', values);
                const { username, password } = values
                const result = await reqLogin(username, password)
                if (result.status === 0 ){
                    message.success('登录成功')
                    
                    //保存user
                    const user = result.data
                    memoryUtils.user = user//保存到内存
                    storageUtils.saveUser(user)//保存到local中

                    //跳转到管理界面(不需要再回退回到登陆)
                    this.props.history.replace('/')
                }else{
                    message.error(result.msg)
                }
            }else{
                console.log('校验失败');
            }
        })
    }
}

/* 高阶函数：
        1，一类特别的函数
            a.接收的参数是函数
            b.返回的也是函数
        2，常见
            a.定时器setTimeout/setIterval
            b.promise: promise(() => {}) then (value => {},reason => {})
            c.数组遍历相关方法：foreach()/filter()/map()/reduce()/find()/findIndex()
            d.fn.bind()  函数对象的bind()
            e.Form.create()()
        3，高阶函数更新动态，更加具有扩展性

    高阶组件
        1，本质上是一个函数
        2，接收一个组件（被包装的组件），返回一个新的组件（包装组件），包装组件会向被包装的组件传入特定的属性
        3，作用：扩展组件的功能
        4，高阶组件也是一个高阶函数，传入一个组件函数，返回一个新的组件函数
*/

/* 包装Form组件生成一个新组件：Form(login)
新组建会向Form组件传递一个强大的对象属性：form*/
export default Login = Form.create()(Login);

/*
前台表单验证
收集表单输入数据
*/