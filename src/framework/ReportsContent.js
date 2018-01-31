import React from 'react';
import {
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

class ReportsContent extends React.Component {
	componentDidMount() {
		if (this.props.reportsList.length === 0) {
			this.props.getReportsList(1);
		};
	}

	render() {
		return (
			<div>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>测试报告列表</Breadcrumb.Item>
				</Breadcrumb>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
					<div>
						<List
							size="large"
							footer={<div>
								<Pagination showQuickJumper defaultCurrent={1} total={this.props.reportsList.total} pageSize={10} onChange={(page) => this.props.getReportsList(page)} />
							</div>}
							bordered
							dataSource={this.props.reportsList.list}
							renderItem={item => (<List.Item
								actions={[<Button type="primary" size="small" onClick={() => { window.open("http://127.0.0.1:8000/getreport?reportName=" + `${item}`) }}>查看</Button>]
								}
							>
								<List.Item.Meta
									title={item}
								/>
							</List.Item>)}
						/>
					</div>

				</Content>
			</div>
		);
	}
}
export default ReportsContent