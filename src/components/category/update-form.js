import React, {Component} from 'react' 
import {Form, Input, Modal} from 'antd' 
// import PropTypes from 'prop-types'

const FormItem = Form.Item

/* 
    更新分类的Form
    组件
*/ 
class UpdateForm extends Component {

    state = {
        updateLoading: false
    }

    render() {
        const {getFieldDecorator} = this.props.form 
        const {categoryName, onOk, onCancel, visible} = this.props
        return (
            <div>
                 <Modal 
                    title="修改分类" 
                    visible={visible}
                    onOk={this.handleSubmit}
                    okText="修改"
                    onCancel={onCancel} 
                > 
                    <Form>
                        <FormItem>
                            { getFieldDecorator('categoryName', {
                                initialValue: categoryName
                                })( 
                                <Input placeholder='请输入分类名称'/> 
                                ) } 
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }

    handleSubmit = () => {
        this.setState({
            updateLoading: true
        })
        const {validateFields} = this.props.form
        const {onOk, category} = this.props
        validateFields((err, value) => {
            value.id = category._id
            if(!err){
                onOk(value, ()=>{
                    this.setState({
                        updateLoading: false
                    })
                })
            }else{
                this.setState({
                    updateLoading: false
                })
            }
        })
    }
}
export default UpdateForm = Form.create()(UpdateForm)