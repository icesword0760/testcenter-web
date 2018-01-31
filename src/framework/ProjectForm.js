import React from 'react';
import {
    Form,
    Input,
} from 'antd';
const FormItem = Form.Item;
class ProjectForm extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="项目名称">
                    {getFieldDecorator('projectName', {
                        rules: [{
                            required: true,
                            message: 'Please input your project name',
                        }],
                    })(
                        <Input
                            placeholder="请输入项目名称" />
                        )}
                </FormItem>
                <FormItem label="负责人">
                    {getFieldDecorator('testerName', {
                        rules: [{
                            required: true,
                            message: 'Please input your tester name',
                        }],
                    })(
                        <Input
                            placeholder="请输入负责人名称" />
                        )}
                </FormItem>
            </Form>
        )
    }
}


export default ProjectForm