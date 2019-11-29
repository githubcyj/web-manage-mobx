import React from 'react'
import {Card, Table, Button, Icon, Modal} from 'antd'
import AddForm from './add-form'

/**
 * 商品分类路由
 */
export default class Category extends React.Component{

    state = {
        showStatus: 0
    }

    handleCancel = () => {
        this.setState({
            showStatus : 0
        })
    }

    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }

    addCategory = () => {

    }

    render(){

        const {showStatus} = this.state

        const title = '一级分类列表'
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type='plus'/>
                添加
            </Button>
        )

        const dataSource = [
            {
              key: '1',
              name: '胡彦斌',
              age: 32,
              address: '西湖区湖底公园1号',
            },
            {
              key: '2',
              name: '胡彦祖',
              age: 42,
              address: '西湖区湖底公园1号',
            },
          ];
          
          const columns = [
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
            },
          ];
          
        return(
            <Card title={title} extra={extra} /* style={{height: '90%'}} */>
                <Table dataSource={dataSource} columns={columns} />

                <Modal
                    title="添加分类"
                    visible={showStatus===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    >
                    <AddForm/>
                </Modal>
            </Card>
        )
    }
}