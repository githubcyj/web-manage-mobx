const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	// 入口文件
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(__dirname, '/dist')
    },
    module: {
    	// 配置相应的规则
        rules: [
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
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.js[x]?$/,
                use: 'babel-loader'
            }, {
                test: /\.less$/,
                use: ['style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'],
            }
        ]
    },
    // 配置相应的插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    devServer:{
        port: 3000,  //端口
        // proxyTable: {
        //     //综合收件
        //     '/api': {
        //         target: "http://127.0.0.1:5000", //开发环境
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': 'api'
        //         }
        //     },
        // },
        progress: true,  //打包过程中显示进度条
        contentBase: './dist',   //该文件夹作为静态目录，即直接找到该文件夹，以当前目录作为指定目录
        open: true   //自动打开浏览器
    }
};