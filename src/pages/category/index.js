import React from 'react'
import {Card, Table, Button, Icon, Modal, message, } from 'antd'
import AddForm from './add-form'
import LinkButton from '../../components/link-button'
import {reqCategorys, reqAddCategory, reqUpdateCategory} from "../../api";
import UpdateForm from './update-form'

/**
 * 商品分类路由
 */
export default class Category extends React.Component{

    state = {
        categorys: [], //一 级 分 类 列 表
        subCategorys: [], //二 级 分 类 列 表
        parentId: '0', //父 分 类 的 ID 
        parentName: '', // 父 分 类 的 名 称 
        loading: false, // 标 识 是 否 正 在 加 载 中 
        showStatus: 0
    }

    // componentWillMount() { 
    //   this.columns = [ 
    //     { title: '分类名称', dataIndex: 'name', }, 
    //     { title: '操作', width: 300, render: (category) => ( 
    //       <span> 
    //         <LinkButton onClick={() => this.showUpdate(category)}>
    //           修改分类 
    //         </LinkButton>&nbsp;&nbsp;&nbsp;
    //         {this.state.parentId === '0' ? 
    //           <LinkButton onClick={() => this.showSubCates(category)}>
    //             查看子分类
    //           </LinkButton> 
    //             : null
    //         } 
    //       </span>) 
    //     }];
    // }

    componentDidMount() {
      this.getCategorys()
      }
      
    render(){

        //从状态中取数据
        const {categorys, subCategorys, parentId, parentName, loading, showStatus} = this.state
        //从组件对象中数据
        const category = this.category || {}

        const columns = [
          { title: '分类名称', dataIndex: 'name'}, 
          { title: '操作', width: 300, render: (category) => (
            <span> 
                <LinkButton onClick={() => this.showUpdate(category)}>
                  修改分类 
                </LinkButton>&nbsp;&nbsp;&nbsp;
                {this.state.parentId === '3' ? 
                    <LinkButton onClick={() => this.showSubCates(category)}>
                      查看子分类
                    </LinkButton> 
                    : null
                } 
            </span> )}
        ]

        // Card的左侧标题
        const title = parentId === '0' ? 
            '一级分类列表' : 
            ( <span> 
                <LinkButton onClick={this.showCategorys}>
                  一级分类列表
                </LinkButton> &nbsp;&nbsp; 
                <Icon type='arrow-right'/>&nbsp;&nbsp; 
                <span>
                  {parentName}
                </span> 
              </span> 
              )


        // Card的右侧 button 
        const extra = ( 
            <Button type='primary' onClick={this.showAdd}> 
            <Icon type='plus'/> 
            添加 
            </Button> 
          )


        return(
            <Card title={title} extra={extra} /* style={{height: '90%'}} */>
                {/* <Table dataSource={dataSource} columns={columns} /> */}

                <Table 
                  bordered 
                  rowKey='_id' 
                  dataSource={parentId === '0' ? categorys : subCategorys}
                  columns={columns}
                  loading={loading}
                  pagination={{pageSize: 5, showQuickJumper: true, showSizeChanger: true}}
                />
                      {
                        this.state.showStatus == 1 ? 
                          <AddForm 
                            // categorys={categorys} 
                            parentId={parentId} 
                            visible={this.state.showStatus === 1}
                            onOk={this.addCategory}
                            onCancel={this.addCancel}
                          />
                          : null
                      }

                      {
                        this.state.showStatus === 2 ?
                          <UpdateForm
                              visible={this.state.showStatus === 2}
                              onOk={this.updateCategory}
                              onCancel={this.addCancel}
                              category={this.category}
                          /> 
                          : null
                      }
            </Card>
        )
    }

    /*
      根 据 parentId
      异 步 获 取 分 类 列 表 显 示
    */ 
    getCategorys = async (parentId) => {
        //更新loading状态: 加载中
        this.setState({ loading: true }) 
        // 优先使用指定的parentId,如果没有指定使用状态中的parentId 
        parentId = parentId || this.state.parentId 
        // 异步获取分类列表 
        const result = await reqCategorys(parentId) // {status: 0, data: []} 
        // 更新loading状态: 加载完成 
        this.setState({ loading: false }) 
        if (result.status === 0) {
            const categorys = result.data 
            if (parentId === '0') { 
              // 更新一级分类列表 
                this.setState({ 
                  categorys: categorys
                })
              } else { 
                // 更新二级分类列表 
                this.setState({ subCategorys: categorys }) 
                }
          } else {
              // 获取列表失败 
              message.error('获取列表失败') 
            }
      }

    /*
      显 示 指 定 分 类 的 子 分 类 列 表
      */ 
    showSubCates = (category) => { 
      // console.log('set 之 前 ', this.state.parentId) // 0 
      // 更 新 状 态 : state 中 的 数 据 是 异 步 更 新 ( 不 会 立 即 更 新 state 中 的 数 据 )
      this.setState({ 
        parentId: category._id, 
        parentName: category.name 
      }, () => { // 在 状 态 更 新 之 后 执 行 ,  在 回 调 函 数 中 能 得 到 最 新 的 状 态 数 据
        this.getCategorys() 
      }) 
        // console.log('set 之 后 ', this.state.parentId) // xxx
    }

    /*
    显 示 一 级 列 表
    */ 
   showCategorys = () => { 
     this.setState({ 
       parentId: '0', 
       parentName: '', 
       subCategorys: [], 
       showStatus: 0, 
      }) 
    }

    /*
      显示添加的对话框
      */ 
    showAdd = () => { 
      this.setState({ 
        showStatus: 1 
      }) 
    }

    /*
      显示修改的对话框
    */ 
   showUpdate = (category) => { 
     // 保 存 category 
     this.category = category 
     // 更 新 状 态 
     this.setState({ showStatus: 2 }) 
    }

    /*
      添 加 分 类
      */ 
    addCategory = async (value, closeLoading) => { 
      // console.log(this.formRef.getItemsValue());     //6、调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
      
      // // 得到数据 
      // const {parentId, categoryName} = this.props.getFormRef(this.formRef.getItemsValue())
      // console.log(parentId)
      // console.log(categoryName)
      // // 关闭对话框 
      // this.setState({ showStatus: 0 }) 
      // // 重置表单 
      // // this.form.resetFields()
      console.log('value===='+value)
      // 异步请求添加分类
      const result = await reqAddCategory(value.parentId, value.categoryName) 
      if (result.status === 0) {
        /*
          添 加 一 级 分 类
          在 当 前 分 类 列 表 下 添 加
          */ 
         if( parentId===this.state.parentId) { 
           this.getCategorys() 
          } else if (parentId === '0') {
            this.getCategorys(parentId)
          }
        }else{
          message.error('添加商品失败！') 
        }
        closeLoading()
        this.addCancel()
    }

    addCancel = () => {
      this.setState({
        showStatus: 0
      })
    }

    /*
      更新分类
      */ 
    updateCategory = async (value, closeLoading) => { 
      // 得到数据 
      // const {categoryName} = value.categoryName
      // 关闭对话框
      this.setState({ 
        showStatus: 0 
      })
      // 异步请求更新分类
      const result = await reqUpdateCategory(value.id, value.categoryName) 
      if (result.status === 0) { 
        // 重新获取列表 
        this.getCategorys() 
      }else{
        message.error('修改商品失败！')
      }
    }
}