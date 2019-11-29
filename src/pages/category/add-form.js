import React from 'react'
import {Form, Select, Input} from 'antd'

const Item = Form.Item
const Option = Select.Option

class AddForm extends React.Component{
    render(){

        const {getFieldDecorator} = this.props.form
        return(
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: '0'
                        })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                <Option value='1'>二级分类</Option>
                                <Option value='2'>三级分类</Option>
                                <Option value='3'>四级分类</Option>
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        )
    }
}

export default AddForm = Form.create()(AddForm)