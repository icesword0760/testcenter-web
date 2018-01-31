import React from 'react';
import SuiteForm from './SuiteForm';
import {
    Button,
    Modal,
    Form,
} from 'antd';
class SuiteModal extends React.Component {
    handleSuiteSubmit = () => {
        console.log(this.formRef.props.form.getFieldsValue());
        this.formRef.props.form.validateFields(
            (err) => {
                if (!err) {
                    const suiteName = this.formRef.props.form.getFieldValue('suiteName');
                    const suiteReq = { 'base_url': this.formRef.props.form.getFieldValue('suiteReq') };
                    let varDatalist = [];
                    this.formRef.props.form.getFieldValue('keys').map((k) => {
                        const suiteKey = this.formRef.props.form.getFieldValue('varsKey' + k);
                        const suiteValue = this.formRef.props.form.getFieldValue('varsValue' + k);
                        let dictVar = {
                        };
                        dictVar[suiteKey] = suiteValue;
                        varDatalist.push(dictVar);
                    });

                    const suiteData = {
                        'name': suiteName,
                        'variables': varDatalist,
                        'request': suiteReq,
                        'project_id': this.props.projectId,
                    };

                    if (this.props.isEdit) {
                        suiteData['suiteId'] = this.props.suiteId;
                        this.props.updateSuite(suiteData);
                    } else {
                        this.props.addSuite(suiteData);
                    };
                }
            },
        );


    }

    render() {
        const WrappedSuiteForm = Form.create()(SuiteForm);
        return (
            <Modal
                visible={this.props.visible}
                title="新增测试模块"
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="return" onClick={this.props.onCancel}>取消</Button>,
                    <Button key="submit" type="primary" loading={this.props.loading} onClick={() => this.handleSuiteSubmit()}>
                        提交
                    </Button>,
                ]}
            >
                <div>
                    <WrappedSuiteForm isEdit={this.props.isEdit} suiteId={this.props.suiteId} wrappedComponentRef={(component) => {
                        this.formRef = component
                    }} />
                </div>
            </Modal>
        )
    }
}

export default SuiteModal