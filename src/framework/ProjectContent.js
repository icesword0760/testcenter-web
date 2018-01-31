import React from 'react';
import ProjectModal from './ProjectModal';
import {
    Link,
} from 'react-router-dom';

import {
    Layout,
    Breadcrumb,
    List,
    Button,
} from 'antd';

const {
  Content,
   } = Layout;


class ProjectContent extends React.Component {
    componentDidMount() {
        this.props.getProjectlist();
    }
    render() {
        console.log("projectcontent+this.props")
        console.log(this.props)
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/apitest/projectlist">测试项目</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                    <div>
                        <List
                            itemLayout="horizontal"
                            size="large"
                            header={<div>
                                <Button type="primary" size="small" onClick={this.props.showModal}>新增</Button>
                                <ProjectModal
                                    value={this.props.value}
                                    visible={this.props.visible}
                                    loading={this.props.loading}
                                    onOk={this.props.onOk}
                                    onCancel={this.props.onCancel}
                                    changePjName={this.props.changePjName}
                                    changeTesterName={this.props.changeTesterName}
                                    cleanForm={this.props.cleanForm}
                                    addProject={this.props.addProject}
                                >
                                </ProjectModal>
                                &nbsp;
                                    </div>}

                            bordered
                            dataSource={this.props.projectList}
                            renderItem={
                                item => (<List.Item
                                    key={item.project_id}
                                //actions={[<Button type="danger" size="small">删除</Button>]}
                                >
                                    <List.Item.Meta
                                        title={<Link to={'/apitest/suitelist/' + `${item.project_id}`} onClick={() => this.props.getSuitelist(item.project_id)}>{item.name}</Link>}
                                    />
                                    <div>"负责人:"&nbsp;{item.tester}</div>
                                </List.Item>)
                            }
                        />
                    </div>
                </Content>
            </div>
        )
    }
}


export default ProjectContent

