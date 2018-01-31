import React from 'react';
import SuiteModal from './SuiteModal';
import {
    Link,
} from 'react-router-dom';
import {
    Layout,
    Breadcrumb,
    List,
    Button,
    Checkbox,
    Popconfirm,
} from 'antd';
const {
    Content,
} = Layout;

class SuiteContent extends React.Component {

    componentDidMount() {
        if (this.props.suiteList.length === 0) {
            this.props.getSuitelist(this.props.match.params.id);
        };
    }

    componentWillUnmount() {
        this.props.cleanSuiteIdList()
    }

    render() {
        console.log("SuiteContent+this.props")
        console.log(this.props)
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/apitest/projectlist">测试项目</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>接口模块</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                    <div>
                        <List
                            size="large"
                            header={<div>
                                <Button type="primary" size="small" onClick={this.props.showModal}>新增</Button>
                                <SuiteModal
                                    visible={this.props.visible}
                                    loading={this.props.loading}
                                    onCancel={this.props.onCancel}
                                    projectId={this.props.suiteList.projectId}
                                    addSuite={this.props.addSuite}
                                    isEdit={this.props.isEdit}
                                    suiteId={this.props.suiteId}
                                    updateSuite={this.props.updateSuite}
                                >
                                </SuiteModal>
                                &nbsp;
              <Button type="primary" size="small" onClick={() => this.props.runSuite({ suiteIdList: this.props.suiteIdList })}>运行选中</Button>
                                &nbsp;
              <Button type="primary" size="small" onClick={() => this.props.runSuite({ projectId: this.props.suiteList.projectId })}>运行全部</Button>
                            </div>}

                            bordered
                            dataSource={this.props.suiteList}
                            renderItem={item => (<List.Item
                                actions={[<Button type="primary" size="small" onClick={() => this.props.editSuiteModal(item.suite_id)}>编辑</Button>,
                                <Popconfirm title="你真的要删了我？" onConfirm={() => this.props.delSuite({ suiteId: item.suite_id })} okText="是" cancelText="否"><Button type="danger" size="small" >删除</Button></Popconfirm>]}
                            >
                                <Checkbox onChange={(e) => this.props.handleSuiteIdList(item.suite_id, this.isChecked = e.target.checked)} />
                                <List.Item.Meta
                                    title={<Link to={'/apitest/caselist/' + `${item.suite_id}`} onClick={() => this.props.getCaselist(item.suite_id, 1)}>{item.name}</Link>}
                                />
                            </List.Item>)}
                        />
                    </div>
                </Content>
            </div>
        )
    }
}

export default SuiteContent