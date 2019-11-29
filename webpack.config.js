let path = require("path");
let HtmlWebpackplugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let {CleanWebpackPlugin} = require('clean-webpack-plugin')
let copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {

  optimization: {
        minimizer : [
            new UglifyJsPlugin({//优化js文件，主要是压缩js文件
                cache : true,   //使用缓存
                sourceMap : true    //增加源码，便于调试
            }),
            new OptimizeCssAssetWebpackPlugin()//压缩css文件
        ]
    },

  mode : 'development',//模式 production  development
  entry: {
    app: "./src/index.js"//入口文件
  },
  output: {
    path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    // publicPath: __dirname + "/build/", // js引用路径或者CDN地址
    // path: path.resolve(__dirname, "build"), // 打包文件的输出目录
    // filename: "bundle.js"
  },


//解析第三方包
  resolve : {
      modules : [path.resolve('node_modules')],   //会在该目录下找第三方包
      extensions : ['.js','.css','.json'],    //文件引入后隐式加入扩展名，一次解析
  },

//实时监控代码变化并实时打包
  watch : true,
  watchOptions : {//监控选项
      poll : 1000,//每秒访问1000次
      aggregateTimeout : 500,//防抖 一直输入代码，停止500毫秒打包一次
      ignored : /node_modules/,//不需要监控的内容
  },

//如果手动引入，如import $ from 'jquery' 则不打包该模块
  externals : {
    jquery : 'jQuery'
  },

//模块
  module: { 
      rules: [ 
  //注入$的方式和plugins中的配置只能二选一
        // {//将jQuery暴露给全局文件使用，用$
        //     test : require.resolve('jquery'),
        //     use : 'expose-loader?$'
        // },

  //解析图片
        // {
        //     test : /\.(png|jpg|gif)$/,
        //     use : 'file-loader'
        // },
        
  //解析html文件，并编译图片
        {
          test : /\.html$/,
          use : 'html-withimg-loader'
        },
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
        
//规则：css-loader 负责解析@import 这种语法
          //style-loader 他把css插入到head标签中
          //loader的特点：希望单一
          //loader的用法：字符串只用一个loader
          //多个loader需要[]
          //loader的顺序，默认是从右向左执行 从下到上执行
          //loader还可以写成对象方式
          //可以处理less文件
          {
            test: /\.css$/,
            use: [
              // {
              //       loader: 'style-loader',
              //       options:{
              //           insertAt:'top'//将页面中的style标签插入到页面顶部
              //       }
              //   },
              MiniCssExtractPlugin.loader,
                'css-loader',
            ]
          },
          {
            test: /\.less$/,
            use: [
              // {
              //       loader: 'style-loader',
              //       options:{
              //           insertAt:'top'//将页面中的style标签插入到页面顶部
              //       }
              //   },
              MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader' //less => css
            ]
          },
          {
            test: /\.(js|jsx?)$/,
            use: 'babel-loader',
          }
          // {
          //   test : /\.(js|jsx)$/,
          //   // exclude : /node_modules/,	//排除该目录下的相关文件
	        // // include : path.resolve('src'),	//解析该目录下的相关文件
          //   use : {
          //       loader : 'babel-loader',
          //       options : {//用babel-loader 需要把es6转为es5
          //           presets : [//插件库，大插件的集合
          //               '@babel/preset-env'//包含把es6转换成es5的模块，会调用该模块处理js文件
          //           ]
          //           // plugins : [//这里配置小插件
          //           //     // '@babel/plugin-proposal-class-properties'
          //           //     ["@babel/plugin-proposal-decorators",{"legacy":true}],
          //           //     ["@babel/plugin-proposal-class-properties",{"loose":true}],
          //           //     '@babel/plugin-transform-runtime'
          //           // ]
          //       }
          //   }
        // }
      ]
    },

//插件
  plugins:[
      new HtmlWebpackplugin({
          template: './public/index.html',
          filename: 'index.html',
          // template:'index.html',//以该文件为模板生成打包后的html文件
          // filename:'index.html',//打包后生成的文件名
          minify:{//压缩打包后的html文件
              removeAttributeQuotes:true, //删除html文件中的双引号
              collapseWhitespace:true //html文件压缩成一行
          },
          hash:true // html文件中引入的js文件加上hash戳
      }),
      new MiniCssExtractPlugin({
        filename : 'main.css'//抽离出来的文件名
      }),
      // new webpack.ProvidePlugin({//在每个模块中注入$
      //   $ : 'jquery'
      // })
      new CleanWebpackPlugin(),    //先删除该目录再打包

      new copyWebpackPlugin([
          // {from : './compileFile', to : './build'}
      ]),
  ],

  //服务器
  devServer:{
    port: 6666,  //端口
    proxyTable: {
      //综合收件
      '/api': {
          target: "http://127.0.0.1:5000", //开发环境
          changeOrigin: true,
          pathRewrite: {
              '^/api': 'api'
          }
      },
    },
    progress: true,  //打包过程中显示进度条
    contentBase: './src/compileFile',   //该文件夹作为静态目录，即直接找到该文件夹，以当前目录作为指定目录
    open: true   //自动打开浏览器
  }
};