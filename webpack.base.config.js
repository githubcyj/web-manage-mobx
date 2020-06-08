let path = require("path");
let HtmlWebpackplugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let {CleanWebpackPlugin} = require('clean-webpack-plugin')

//引入data的json文件
let loginData = require('./mockdata/loginData.json')

module.exports = {

//模式 production  development
    mode : 'development',

//入口文件
    entry: {
        app: "./src/index.js"
    },

//输出目录
    output: {
        filename:'bundle.js',//打包后的文件名
        path:path.resolve(__dirname,'dist')//这里是绝对路径
    },

//模块
    module: {
        rules: [
        //解析css
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                ]
            },
        //解析less
            {
                test: /\.less$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            },
        //解析js,jsx
            {
                test: /\.js[x]?$/,
                use: {
                loader: 'babel-loader',
                }
            },

            //解析图片
            // {
            //     test : /\.(png|jpg|gif|ico)$/,
            //     use : 'file-loader'
            // },
            //解析html文件，并编译图片
            // {
            //   test : /\.html$/,
            //   use : 'html-withimg-loader'
            // },
            //解析图片，做一个限制，当图片小于多少K的时候，用base64来转化，当图片大于200K用file-loader来处理
            {
                test : /\.(png|jpg|gif)$/,
                use : {
                loader : 'url-loader',
                options : {
                    limit : 200 * 1024 
                }
                }
            },
        ]
    },

    //插件
    plugins:[
        //解析html
        new HtmlWebpackplugin({
            template:'./public/index.html',//以该文件为模板生成打包后的html文件
            filename:'index.html',//打包后生成的文件名
            // minify:{//压缩打包后的html文件
            //     removeAttributeQuotes:true, //删除html文件中的双引号
            //     collapseWhitespace:true //html文件压缩成一行
            // },
            // hash:true // html文件中引入的js文件加上hash戳
        }),
        //抽离css样式
        new MiniCssExtractPlugin({
            filename : 'css/[name].css'//抽离出来的文件名
          }),

        //清除之前的打包文件
        new CleanWebpackPlugin(),    //先删除该目录再打包
    ],

//源码映射
    devtool: 'source-map',

//实时监控代码变化并实时打包
    watch : true,
    watchOptions : {//监控选项
        poll : 1000,//每秒访问1000次
        aggregateTimeout : 500,//防抖 一直输入代码，停止500毫秒打包一次
        ignored : /node_modules/,//不需要监控的内容
    },

//服务器
    devServer:{
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 3000,  //端口
        progress: true,  //打包过程中显示进度条
        contentBase: './dist',   //该文件夹作为静态目录，即直接找到该文件夹，以当前目录作为指定目录
        open: true,   //自动打开浏览器
        proxy: {
            // "/api": "http://localhost:5000"
            //综合收件
            '/api': {
                target: "http://localhost:5000", //开发环境
                changeOrigin: true,
                // secure: false,
                pathRewrite: {
                    '^/api': 'api'
                }
            },
        },
        // before(app){
        //     app.get('/login',function(req, res){
        //         res.json({
        //             error:0,
        //             data:loginData
        //         })
        //     })
        // }
    }
}