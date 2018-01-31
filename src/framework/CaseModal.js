import React from 'react';
import CaseForm from './CaseForm';
import {
    Button,
    Modal,
    Form,
} from 'antd';

class CaseModal extends React.Component {

    handleCaseSubmit = () => {
        this.formRef.props.form.validateFields(
            (err) => {
                if (!err) {
                    const caseName = this.formRef.props.form.getFieldValue('caseName');
                    const caseUrl = this.formRef.props.form.getFieldValue('caseUrl');
                    const caseMethod = this.formRef.props.form.getFieldValue('caseMethod');
                    const caseReqData = this.formRef.props.form.getFieldValue('caseBody');

                    let caseVarDatalist = [];
                    this.formRef.props.form.getFieldValue('caseVariableKeys').map((k) => {
                        const caseKey = this.formRef.props.form.getFieldValue('caseVarsKey' + k);
                        const caseValue = this.formRef.props.form.getFieldValue('caseVarsValue' + k);
                        let dictVar = {
                        };
                        dictVar[caseKey] = caseValue;
                        caseVarDatalist.push(dictVar);
                    })

                    let caseValidatelist = [];
                    this.formRef.props.form.getFieldValue('validatekeys').map((k) => {
                        const validateKey = this.formRef.props.form.getFieldValue('validateKey' + k);
                        const validateValue = this.formRef.props.form.getFieldValue('validateValue' + k);
                        const comparator = this.formRef.props.form.getFieldValue('comparator' + k);
                        let dictValidate = {
                        };
                        dictValidate['check'] = validateKey;
                        dictValidate['expect'] = validateValue;
                        dictValidate['comparator'] = comparator;
                        caseValidatelist.push(dictValidate);
                    })

                    let caseExtractlist = [];
                    this.formRef.props.form.getFieldValue('extractkeys').map((k) => {
                        const extractKey = this.formRef.props.form.getFieldValue('extractKey' + k);
                        const extractValue = this.formRef.props.form.getFieldValue('extractValue' + k);
                        let dictextract = {
                        };
                        dictextract[extractKey] = extractValue;
                        caseExtractlist.push(dictextract);
                    })

                    const caseData = {
                        'name': caseName,
                        'variables': caseVarDatalist,
                        'request': {
                            'url': caseUrl,
                            'method': caseMethod,
                            'data': caseReqData
                        },
                        'extract': caseExtractlist,
                        'validate': caseValidatelist,
                        'suite_id': this.props.suiteId,
                    }

                    if (this.props.isEdit) {
                        caseData['caseId'] = this.props.caseId;
                        this.props.updateCase(caseData, this.props.casePageIndex);
                    } else {
                        this.props.addCase(caseData, this.props.casePageIndex);
                    };

                }
            },
        );


    }

    render() {
        const WrappedCaseForm = Form.create()(CaseForm);
        return (
            <Modal
                visible={this.props.visible}
                title="新增测试用例"
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="return" onClick={this.props.onCancel}>取消</Button>,
                    <Button key="submit" type="primary" loading={this.props.loading} onClick={() => this.handleCaseSubmit()}>
                        提交
                    </Button>,
                ]}
            >
                <div>
                    <WrappedCaseForm isEdit={this.props.isEdit} caseId={this.props.caseId} wrappedComponentRef={(component) => {
                        this.formRef = component
                    }} />
                </div>
            </Modal>
        )
    }
}


export default CaseModal
