import React from 'react';
import {
    Link,
} from 'react-router-dom';
import CaseModal from './CaseModal';
import {
    Select,
    Layout,
    Breadcrumb,
    List,
    Button,
    Pagination,
    Modal,
    Form,
    Input,
    Popconfirm,
} from 'antd';

const {
    Content, } = Layout;

class CaseContent extends React.Component {

    componentDidMount() {
        if (this.props.caseList.length === 0) {
            this.props.getCaselist(this.props.match.params.id, 1);
        };

    }
    render() {
        console.log("CaseContent.props")
        console.log(this.props.match)
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/apitest/projectlist">测试项目</Link></Breadcrumb.Item>
                    <Breadcrumb.Item onClick={this.props.history.goBack}><a>接口模块</a></Breadcrumb.Item>
                    <Breadcrumb.Item>接口列表</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                    <div>
                        <List
                            size="large"
                            header={<div>
                                <Button type="primary" size="small" onClick={this.props.showModal}>新增</Button>
                                <CaseModal
                                    visible={this.props.visible}
                                    loading={this.props.loading}
                                    onCancel={this.props.onCancel}
                                    suiteId={this.props.caseList.suiteId}
                                    addCase={this.props.addCase}
                                    isEdit={this.props.isEdit}
                                    caseId={this.props.caseId}
                                    updateCase={this.props.updateCase}
                                    casePageIndex={this.props.casePageIndex}
                                >
                                </CaseModal>
                                &nbsp;
                    </div>}
                            footer={<div>
                                <Pagination showQuickJumper defaultCurrent={1} total={this.props.caseList.total} pageSize={10} onChange={(page) => this.props.getCaselist(this.props.caseList.suiteId, page)} />
                            </div>}
                            bordered
                            dataSource={this.props.caseList.list}
                            renderItem={item => (<List.Item
                                actions={[<Button type="primary" size="small" onClick={() => this.props.editCaseModal(item.case_id)}>编辑</Button>,
                                <Popconfirm
                                    title="你真的要删了我吗"
                                    okText="是"
                                    cancelText="否"
                                    onConfirm={
                                        () => this.props.delCase({ caseId: item.case_id }, this.props.casePageIndex)
                                    }
                                >
                                    <Button type="danger" size="small" >删除</Button>
                                </Popconfirm>
                                ]}
                            >
                                <List.Item.Meta
                                    title={item.name}
                                />
                            </List.Item>)}
                        />
                    </div>
                </Content>
            </div>
        )
    }
}

export default CaseContent