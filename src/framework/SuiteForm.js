import React from 'react';
import {
    Icon,
    Button,
    Form,
    Input,
    Row,
    Col,
} from 'antd';
import {
    fetchGetSuiteDetail,
} from '../action';
const FormItem = Form.Item;
let suiteVariableUid = 0;

class SuiteForm extends React.Component {

    componentDidMount() {
        if (this.props.isEdit) {
            const { form } = this.props;
            const { getFieldDecorator } = this.props.form;
            fetchGetSuiteDetail(this.props.suiteId).then((res) => {
                let keys = [];
                let suiteValue = {};
                if (res.variables && res.variables.length > 0) {
                    res.variables.map((k, index) => {
                        keys.push(index);
                        let varsKey = 'varsKey' + index;
                        let varsValue = 'varsValue' + index;
                        getFieldDecorator(varsKey, { initialValue: Object.keys(k)[0] });
                        getFieldDecorator(varsValue, { initialValue: k[Object.keys(k)[0]] });
                        //suiteValue[varsKey] = Object.keys(k)[0];
                        //suiteValue[varsValue] = k[Object.keys(k)[0]];
                    });
                };
                suiteValue['suiteName'] = res.name;
                suiteValue['keys'] = keys;
                //const suiteReq = 'suiteReq';
                //const suiteName = 'suiteName';
                //getFieldDecorator(suiteName, { initialValue: res.name });
                //getFieldDecorator(keys, { initialValue: keys });
                if (res.request) {
                    //getFieldDecorator(suiteReq, { initialValue: res.request.base_url });
                    suiteValue['suiteReq'] = res.request.base_url;
                }


                //console.log(suiteValue);
                form.setFieldsValue(suiteValue);
            })
        };
    }

    addVariablesItems = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        if (this.props.isEdit && keys.length > 0) {
            console.log(keys)
            const nextKeys = keys.concat(keys[keys.length - 1] + 1);
            console.log(nextKeys)
            form.setFieldsValue({
                keys: nextKeys,
            });
            console.log(keys)
        } else {
            const nextKeys = keys.concat(suiteVariableUid);
            suiteVariableUid++;
            // can use data-binding to set
            // important! notify form to detect changes
            form.setFieldsValue({
                keys: nextKeys,
            });
        };

    }

    removVariablesItems = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

        console.log(keys);
        const variableItems = keys.map((k) => {
            return (
                <Row key={'variableItems' + k}>
                    <Col span={10}>
                        <FormItem>
                            {getFieldDecorator('varsKey' + k, {
                                rules: [{
                                    required: true,
                                    message: 'Please input your variable name',
                                }],
                            })(
                                <Input
                                    placeholder="请输入模块参数名称"
                                />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                        <FormItem>
                            {getFieldDecorator('varsValue' + k, {
                                rules: [{
                                    required: true,
                                    message: 'Please input your variable value name',
                                }],
                            })(
                                <Input
                                    placeholder="请输入模块参数值"
                                />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={1}>
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.removVariablesItems(k)}
                        />
                    </Col>
                </Row>
            );
        });

        return (
            <Form layout="horizontal">
                <FormItem label="模块名称">
                    {getFieldDecorator('suiteName', {
                        rules: [{
                            required: true,
                            message: 'Please input your suite name',
                        }],
                    })(
                        <Input placeholder="请输入模块名称" />
                        )}
                </FormItem>
                <FormItem label="模块参数">
                    {variableItems}
                    <Button type="dashed" onClick={this.addVariablesItems} style={{ width: '60%' }}>
                        <Icon type="plus" /> 增加模块参数选项
          </Button>
                </FormItem>
                <FormItem label="基础URL">
                    {getFieldDecorator('suiteReq')(
                        <Input placeholder="请输入基础URL，例：https://kfsapp.b2btst.com" />
                    )}
                </FormItem>
            </Form>
        )
    }
}

export default SuiteForm