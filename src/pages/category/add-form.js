import React from 'react'
import {Form, Select, Input} from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item
const Option = Select.Option
/**
 * 添加分类的Form组件
 */
class AddForm extends React.Component{

    state = {
        addStatus: false,
        addLoading: false
    }
    static propTypes = { 
        categorys: PropTypes.array.isRequired, 
        parentId: PropTypes.string.isRequired, 
        setForm: PropTypes.func.isRequired, 
    }

    // componentWillMount() { 
    //     this.props.setForm(this.props.form) 
    // }

    componentDidMount() {
        const {visible} = this.props
        this.setState({
            addStatus: visible == 1
        })
    }

    render(){
        const {getFieldDecorator} = this.props.form

        const {visible, onOk, onCancel} = this.props
        return(
            <div>
                <Modal
                    title="添加分类"
                    visible={visible}
                    onOk = {this.handleSubmit}
                    onCancel = {onCancel}
                    >
                        <Form >
                            <FormItem {...formItemLayout} label='所属分类'>
                                {
                                    getFieldDecorator('parentId', {
                                        initialValue: parentId
                                    })(
                                        <Select>
                                            <Option value='0'>一级分类</Option>
                                            {
                                                categorys.map(c => <Option key={c._id} 
                                                    value={c._id}>{c.name}</Option>) 
                                            }
                                            {/* <Option value='1'>二级分类</Option>
                                            <Option value='2'>三级分类</Option>
                                            <Option value='3'>四级分类</Option> */}
                                        </Select>
                                    )
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label='分类名称'>
                                {
                                    getFieldDecorator('categoryName', { 
                                        initialValue: '' 
                                    })( 
                                        <Input placeholder='请输入分类名称'/> 
                                    )
                                } 
                                {/* <Input placeholder='请输入分类名称'/> */}
                            </FormItem>
                        </Form>
                </Modal>
            </div>
        )
    }

    handleSubmit = () => {
        this.setState({
            addLoading: true
        })
        const {validateFields} = this.props.form
        const {onOk} = this.props
        validateFields((err, value) => {
            if(err){
                return
            }
            onOk(value, ()=>{
                
            })
        })
    }
}

export default AddForm = Form.create()(AddForm)