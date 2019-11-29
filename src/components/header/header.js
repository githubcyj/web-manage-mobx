import React from 'react'
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd';

import './header.less'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'
import LinkButton from '../link-button';


class Header extends React.Component{

    state = {
        currentTime: formateDate(Date.now()),//当前时间字符串
        dayPictureUrl: '',//天气图片url
        weather: '',//天气的文本
    }

    getTime = () => {
        //每隔一秒获取当前时间，并更新currentTime
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }

    getWeather = async () => {
        const {dayPictureUrl, weather} = await reqWeather('上海')
        this.setState({dayPictureUrl, weather})
    }

    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if(item.key === path){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }

    logout = () => {
        Modal.confirm({
            content: '确认退出？',
            onOk: () => {
            //   console.log('OK');
                storageUtils.removeUser()
                memoryUtils.user = {}

                this.props.history.replace('/login')
            }
        })

    }

    /*第一次render之后执行一次
    一般在此执行异步请求，发ajax请求/启动定时器
     */
    componentDidMount () {

        //获取当前时间
        this.getTime()
        //获取天气
        this.getWeather()

        //获取标题
        this.getTitle()
    }
    /*当前组件卸载之前 */
    componentWillUnmount () {
        //清除定时器
        clearInterval(this.intervalId)
    }

    render(){

        const {currentTime, dayPictureUrl, weather} = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()

        return(
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt='weather'/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter (Header)