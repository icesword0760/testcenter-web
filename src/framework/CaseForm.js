import React from 'react';
import {
    Select,
    Icon,
    Button,
    Form,
    Input,
    Row,
    Col,
} from 'antd';
import {
    fetchGetCaseDetail,
} from '../action';
const FormItem = Form.Item;
const Option = Select.Option;
let caseVariableUid = 0;
let extractUid = 0;
let validateUid = 0;
const { TextArea } = Input;
class CaseForm extends React.Component {
    componentDidMount() {
        if (this.props.isEdit) {
            //TODO
            const { form } = this.props;
            const { getFieldDecorator } = this.props.form;
            fetchGetCaseDetail(this.props.caseId).then((res) => {
                console.log('case res')
                console.log(res)
                let caseVariableKeys = [];
                let validatekeys = [];
                let extractkeys = [];
                let caseValue = {};
                if (res.variables && res.variables.length > 0) {
                    res.variables.map((k, index) => {
                        caseVariableKeys.push(index);
                        let caseVarsKey = 'caseVarsKey' + index;
                        let caseVarsValue = 'caseVarsValue' + index;
                        getFieldDecorator(caseVarsKey, { initialValue: Object.keys(k)[0] });
                        getFieldDecorator(caseVarsValue, { initialValue: k[Object.keys(k)[0]] });
                    });
                };
                if (res.extract && res.extract.length > 0) {
                    res.extract.map((k, index) => {
                        extractkeys.push(index);
                        let extractKey = 'extractKey' + index;
                        let extractValue = 'extractValue' + index;
                        getFieldDecorator(extractKey, { initialValue: Object.keys(k)[0] });
                        getFieldDecorator(extractValue, { initialValue: k[Object.keys(k)[0]] });
                    });
                };
                if (res.validate && res.validate.length > 0) {
                    res.validate.map((k, index) => {
                        validatekeys.push(index);
                        let validateKey = 'validateKey' + index;
                        let validateValue = 'validateValue' + index;
                        let comparator = 'comparator' + index;
                        console.log("' k['comparator']'")
                        console.log(k['comparator'])
                        getFieldDecorator(validateKey, { initialValue: k['check'] });
                        getFieldDecorator(validateValue, { initialValue: k['expect'] });
                        getFieldDecorator(comparator, { initialValue: k['comparator'] });
                    });
                };
                caseValue['caseName'] = res.name;
                caseValue['caseVariableKeys'] = caseVariableKeys;
                caseValue['extractkeys'] = extractkeys;
                caseValue['validatekeys'] = validatekeys;
                caseValue['caseUrl'] = res.request.url;
                caseValue['caseMethod'] = res.request.method;
                //if(JSON.stringify(res.request.data)!="{}"){
                caseValue['caseBody'] = res.request.data;

                //};
                form.setFieldsValue(caseValue);
            })
        };
    }

    addCaseVariablesItems = () => {
        const { form } = this.props;
        const caseVariableKeys = form.getFieldValue('caseVariableKeys');
        if (this.props.isEdit && caseVariableKeys.length > 0) {
            const nextKeys = caseVariableKeys.concat(caseVariableKeys[caseVariableKeys.length - 1] + 1);
            console.log(nextKeys)
            form.setFieldsValue({
                caseVariableKeys: nextKeys,
            });
        } else {
            const nextKeys = caseVariableKeys.concat(caseVariableUid);
            caseVariableUid++;
            form.setFieldsValue({
                caseVariableKeys: nextKeys,
            });
        }
    }

    removCaseVariablesItems = (k) => {
        const { form } = this.props;
        const caseVariableKeys = form.getFieldValue('caseVariableKeys');
        form.setFieldsValue({
            caseVariableKeys: caseVariableKeys.filter(key => key !== k),
        });
    }

    addExtractItems = () => {
        const { form } = this.props;
        const extractkeys = form.getFieldValue('extractkeys');
        if (this.props.isEdit && extractkeys.length > 0) {
            const nextKeys = extractkeys.concat(extractkeys[extractkeys.length - 1] + 1);
            console.log(nextKeys)
            form.setFieldsValue({
                extractkeys: nextKeys,
            });
        } else {
            const nextKeys = extractkeys.concat(extractUid);
            extractUid++;
            form.setFieldsValue({
                extractkeys: nextKeys,
            });
        }

    }

    removExtractItems = (k) => {
        const { form } = this.props;
        const extractkeys = form.getFieldValue('extractkeys');
        form.setFieldsValue({
            extractkeys: extractkeys.filter(key => key !== k),
        });
    }

    addValidateItems = () => {
        const { form } = this.props;
        const validatekeys = form.getFieldValue('validatekeys');
        if (this.props.isEdit && validatekeys.length > 0) {
            const nextKeys = validatekeys.concat(validatekeys[validatekeys.length - 1] + 1);
            console.log(nextKeys)
            form.setFieldsValue({
                validatekeys: nextKeys,
            });
        } else {
            const nextKeys = validatekeys.concat(validateUid);
            validateUid++;
            form.setFieldsValue({
                validatekeys: nextKeys,
            });
        }
    }

    removValidateItems = (k) => {
        const { form } = this.props;
        const validatekeys = form.getFieldValue('validatekeys');
        form.setFieldsValue({
            validatekeys: validatekeys.filter(key => key !== k),
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('caseVariableKeys', { initialValue: [] });
        getFieldDecorator('extractkeys', { initialValue: [] });
        getFieldDecorator('validatekeys', { initialValue: [] });
        const caseVariableKeys = getFieldValue('caseVariableKeys');
        const extractkeys = getFieldValue('extractkeys');
        const validatekeys = getFieldValue('validatekeys');
        const caseVariableItems = caseVariableKeys.map((k) => {
            return (
                <Row key={'caseVariableItems' + k}>
                    <Col span={10}>
                        <FormItem>
                            {getFieldDecorator('caseVarsKey' + k, {
                                rules: [{ required: true, message: 'Please input your variable name!' }],
                            })(
                                <Input
                                    placeholder="请输入用例参数名称"
                                />
                                )}
                        </FormItem>
                    </Col>

                    <Col span={10} offset={1}>
                        <FormItem>
                            {getFieldDecorator('caseVarsValue' + k, {
                                rules: [{ required: true, message: 'Please input your value name!' }],
                            })(
                                <Input
                                    placeholder="请输入用例参数值"
                                />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={1}>

                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.removCaseVariablesItems(k)}
                        />

                    </Col>
                </Row>
            );
        });
        const extractItems = extractkeys.map((k) => {
            return (
                <Row key={'extractItems' + k}>
                    <Col span={10}>
                        <FormItem>
                            {getFieldDecorator('extractKey' + k, {
                                rules: [{ required: true, message: 'Please input your extract key name!' }],
                            })(
                                <Input
                                    placeholder="请输入想作为的变量名"
                                />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={10} offset={1}>
                        <FormItem>
                            {getFieldDecorator('extractValue' + k, {
                                rules: [{ required: true, message: 'Please input your extract value name!' }],
                            })(
                                <Input
                                    placeholder="请输入想提取的字段名"
                                />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={1}>

                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.removExtractItems(k)}
                        />

                    </Col>
                </Row>
            );
        });
        const validateItems = validatekeys.map((k) => {
            return (
                <Row key={'validateItems' + k}>
                    <Col span={7}>
                        <FormItem>
                            {getFieldDecorator('validateKey' + k, {
                                rules: [{ required: true, message: 'Please input your validate key name!' }],
                            })(
                                <Input
                                    placeholder="请输入校验字段"
                                />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={6} offset={1}>
                        <FormItem>
                            {getFieldDecorator('comparator' + k, {
                            })(
                                <Select>
                                    <Option value="eq">eq</Option>
                                    <Option value="str_eq">str_eq</Option>
                                    <Option value="len_eq">len_eq</Option>
                                    <Option value="lt">lt</Option>
                                    <Option value="le">le</Option>
                                    <Option value="gt">gt</Option>
                                    <Option value="ge">ge</Option>
                                    <Option value="ne">ne</Option>
                                    <Option value="len_gt">len_gt</Option>
                                    <Option value="len_ge">len_ge</Option>
                                    <Option value="len_lt">len_lt</Option>
                                    <Option value="len_le">len_le</Option>
                                    <Option value="contains">contains</Option>
                                    <Option value="contains_by">contains_by</Option>
                                    <Option value="type">type</Option>
                                    <Option value="regex">regex</Option>
                                    <Option value="startswith">startswith</Option>
                                    <Option value="endswitch">endswitch</Option>
                                </Select>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={7} offset={1}>
                        <FormItem>
                            {getFieldDecorator('validateValue' + k, {
                                rules: [{ required: true, message: 'Please input your validate value name!' }],
                            })(
                                <Input
                                    placeholder="请输入预期值"
                                />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={1}>
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.removValidateItems(k)}
                        />

                    </Col>
                </Row>
            );
        });

        return (
            <Form layout="horizontal">
                <FormItem label="用例名称">
                    {getFieldDecorator('caseName', {
                        rules: [{ required: true, message: 'Please input your case name!' }],
                    })(
                        <Input placeholder="请输入用例名称" />
                        )}
                </FormItem>
                <FormItem label="用例参数">
                    {caseVariableItems}
                    <Button type="dashed" onClick={this.addCaseVariablesItems} style={{ width: '60%' }}>
                        <Icon type="plus" /> 增加用例参数选项
          </Button>
                </FormItem>
                <FormItem label="请求路径">
                    {getFieldDecorator('caseUrl')(
                        <Input placeholder="请输入请求路径（如不输入域名则以模块的基础Url作为域名）" />
                    )}
                </FormItem>
                <FormItem label="请求方法">
                    {getFieldDecorator('caseMethod', {
                        initialValue: 'GET'

                    })(
                        <Select style={{ width: 80 }}>
                            <Option value="GET">GET</Option>
                            <Option value="POST">POST</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem label="请求数据">
                    {getFieldDecorator('caseBody')(
                        <TextArea rows={4} placeholder="请输入请求数据内容" />
                    )}
                </FormItem>
                <FormItem label="提取字段">
                    {extractItems}
                    <Button type="dashed" onClick={this.addExtractItems} style={{ width: '60%' }}>
                        <Icon type="plus" /> 增加提取参数选项
          </Button>
                </FormItem>
                <FormItem label="校验选项">
                    {validateItems}
                    <Button type="dashed" onClick={this.addValidateItems} style={{ width: '60%' }}>
                        <Icon type="plus" /> 增加校验结果选项
          </Button>
                </FormItem>
            </Form>
        )
    }
}
export default CaseForm