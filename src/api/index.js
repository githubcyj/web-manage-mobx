/*包含 n 个接口请求函数的模块
每个函数返回 promise
*/
import ajax from './ajax'
import jsonp from 'jsonp'

//代理默认路径
const baseUrl = '/api'
// 登陆
export const reqLogin = (username, password) => ajax(baseUrl + '/login', {username, password},'POST')

// 添加用户
export const reqAddUser = (user) => ajax(baseUrl + '/manager/user/add', user,'POST')

/*
jsonp请求的接口
 */
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */
export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // jsonp(url, {}, (err, data) => {
    //     console.log('jsonp()', err, data)
    // })
    return new Promise((resolve, reject) => {
        jsonp(url, {param: 'callback'}, (error, response) => {
            if (!error && response.status==='success') {
                const {dayPictureUrl, weather} = response.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            } else {
                alert('获取天气信息失败')
            }
        })
    })
}

// reqWeather('上海')

//获 取 一 级 或 某 个 二 级 分 类 列 表 
export const reqCategorys = (parentId) => ajax(baseUrl + '/manager/category/list', {parentId}, 'GET')
//添 加 分 类 
export const reqAddCategory = (parentId, categoryName) => ajax(baseUrl + '/manager/category/add', { parentId, categoryName }, 'POST')
//更 新 品 类 名 称 
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(baseUrl + '/manager/category/update', { categoryId, categoryName }, 'POST')