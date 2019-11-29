import React from 'react'

import Exam from './example'
import './index.less'

/**
 * 首页路由
 */
export default class Home extends React.Component{

    render(){
        return(
            <div className='home'>
                {/* <Exam/> */}
                欢迎使用 后台系统
            </div>
        )
    }
}