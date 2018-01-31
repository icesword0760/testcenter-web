import React from 'react';
import ProjectContent from './framework/ProjectContent';
import SuiteContent from './framework/SuiteContent';
import CaseContent from './framework/CaseContent';
import ReportsContent from './framework/ReportsContent';
import {
	Route,
	Switch,
	Link,
	Redirect
} from 'react-router-dom';
import {
	Layout,
	Menu,
	message,
	Spin
} from 'antd';
import {
	fetchGetReporstList,
	fetchProjectlist,
	fetchAddProject,
	fetchSuitelist,
	fetchAddSuite,
	fetchCaselist,
	fetchAddCase,
	fetchUpdateSuite,
	fetchUpdateCase,
	fetchDelSuite,
	fetchDelCase,
	fetchRunSuite
} from './action';
const {
    Header,
	Sider } = Layout;

class HomePage extends React.Component {
	state = {
		loadReport: false,
		loading: false,
		visible: false,
		projectList: [],
		suiteList: [],
		caseList: [],
		isEdit: false,
		suiteId: '',
		caseId: '',
		suiteIdList: [],
		reportsList: [],
		casePageIndex: 1,
	}

	runTask = (suiteData) => {
		this.setState({
			loadReport: true
		});

		fetchRunSuite(suiteData).then(() => {
			this.getReportsList(1);
			// success
			// hide();
			// message.success('success', [duration], onClose)
			this.setState({
				loadReport: false
			}, () => {
				message.success('生成报告成功，请到报告管理页查看！', 1.5);
			});
		})
	}

	runSuite = (suiteData) => {
		// loading
		// const hide = message.loading('Action in progress..', 0);
		if (suiteData.hasOwnProperty('projectId')) {
			this.runTask(suiteData);
		} else if (suiteData.suiteIdList.length > 0) {
			this.runTask(suiteData);
		} else {
			message.error('请先勾选至少一个模块！', 1.5);
		}

	}

	handleSuiteIdList = (suiteId, isChecked) => {
		const arr = [].concat(this.state.suiteIdList);
		if (isChecked) {
			arr.push(suiteId);
			this.setState(
				{
					suiteIdList: arr
				}
			)
		} else {
			let suiteIdIndex;
			for (let i = 0; i < arr.length; i++) {
				if (suiteId == arr[i]) {
					suiteIdIndex = i;
				}
			};
			arr.pop(suiteIdIndex);
			this.setState(
				{
					suiteIdList: arr
				}
			)
		};
		console.log(arr)
	}

	cleanSuiteIdList = () => {
		this.setState(
			{
				suiteIdList: []
			}
		)
	}

	addSuite = (suiteData) => {
		const _pid = suiteData.project_id;
		fetchAddSuite(suiteData).then(
			fetchSuitelist(_pid)
				.then((res) => {
					res['projectId'] = _pid;
					setTimeout(() => {
						this.setState({ loading: false, visible: false, suiteList: res });
					}, 500);
				})
		);
	}

	addCase = (caseData, index) => {
		fetchAddCase(caseData).then(() => {
			const sid = caseData.suite_id;
			fetchCaselist(caseData.suite_id, index)
				.then((res) => {
					res['suiteId'] = sid;
					setTimeout(() => {
						this.setState({
							loading: false,
							visible: false,
							caseList: res,
							casePageIndex: index,
						});
					}, 500);
					;
				});
		});

	}

	getProjectlist = () => {
		fetchProjectlist().then((res) => {
			this.setState({
				projectList: res
			});
		});
	}

	showModal = () => {
		this.setState({
			isEdit: false,
			visible: true,
		});
	}

	editSuiteModal = (suiteId) => {
		this.setState({
			isEdit: true,
			visible: true,
			suiteId: suiteId,
		});
	}

	editCaseModal = (caseId) => {
		this.setState({
			isEdit: true,
			visible: true,
			caseId: caseId,
		});
	}

	getSuitelist = (projectId) => {
		fetchSuitelist(projectId).then((res) => {
			res['projectId'] = projectId;
			this.setState({
				suiteList: res
			});
		});
	}

	getCaselist = (suiteId, index) => {
		console.log('getCaselist', index);
		const _index = index
		fetchCaselist(suiteId, _index).then((res) => {
			res['suiteId'] = suiteId;
			this.setState({
				caseList: res,
				casePageIndex: _index
			});
			console.log('this.state.caseList');
			console.log(this.state.caseList);
		});
	}

	addProject = (projectdata) => {
		fetchAddProject(projectdata).then(fetchProjectlist)
			.then((res) => {
				setTimeout(() => {
					this.setState({ loading: false, visible: false, projectList: res });
				}, 500);
			});
	}

	delSuite = (suiteId) => {
		const _pid = this.state.suiteList.projectId;
		fetchDelSuite(suiteId).then(
			fetchSuitelist(_pid)
				.then((res) => {
					res['projectId'] = _pid;
					setTimeout(() => {
						this.setState({ suiteList: res });
					}, 500);
				})
		);

	}

	delCase = (caseId, index) => {
		const _index = index;
		const _sid = this.state.caseList.suiteId;
		fetchDelCase(caseId).then(
			fetchCaselist(_sid, _index).then(
				(res) => {
					res['suiteId'] = _sid;
					setTimeout(() => {
						this.setState({
							caseList: res,
							casePageIndex: _index
						});
					}, 500);
				})
		);
	}

	updateSuite = (suiteData) => {
		const _pid = suiteData.project_id;
		fetchUpdateSuite(suiteData).then(
			fetchSuitelist(suiteData.project_id)
				.then((res) => {
					res['projectId'] = _pid;
					setTimeout(() => {
						this.setState({ loading: false, visible: false, suiteList: res });
					}, 500);
				})
		);
	}

	updateCase = (caseData, index) => {
		const _index = index;
		const _sid = caseData.suite_id;
		fetchUpdateCase(caseData).then(
			fetchCaselist(_sid, _index)
				.then((res) => {
					res['suiteId'] = _sid;
					setTimeout(() => {
						this.setState({
							loading: false,
							visible: false,
							caseList: res,
							casePageIndex: _index,
						});
					}, 500);
				})
		);

	}

	handleCancel = () => {
		this.setState({ visible: false });
	}

	getReportsList = (index) => {
		fetchGetReporstList(index)
			.then((res) => {
				this.setState({
					reportsList: res
				})
			}
			)
	};

	render() {
		console.log("homepage+this.props");
		console.log(this.props);
		console.log(this.props.match);
		const { visible, loading, projectList, suiteList, caseList, isEdit, suiteId, caseId, suiteIdList, reportsList, testerName } = this.state;
		return (
			<Spin spinning={this.state.loadReport}>
				<Layout>
					<Header className="header">
						<div className="logo" />
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={['1']}
							style={{ lineHeight: '64px' }}
						>
							<Menu.Item key="1">接口测试</Menu.Item>
							<Menu.Item key="2">待用</Menu.Item>
							<Menu.Item key="3">待用</Menu.Item>
						</Menu>
					</Header>
					<Layout>
						<Sider width={200} style={{ background: '#fff' }}>
							<Menu
								mode="inline"
								style={{ height: '100%', borderRight: 0 }}
							>
								<Menu.Item key="1"><Link to="/apitest/projectlist">项目管理</Link></Menu.Item>
								<Menu.Item key="2"><Link to="/apitest/reportslist">报告管理</Link></Menu.Item>
							</Menu>
						</Sider>
						<Layout style={{ padding: '0 24px 24px' }}>
							<Switch>
								{<Redirect exact from='/apitest' to={this.props.match.path + '/projectlist'} />}
								<Route exact path={this.props.match.path + '/reportslist'} render={(props) => <ReportsContent
									reportsList={reportsList}
									getReportsList={this.getReportsList}
									{...props}
								/>} />
								<Route exact path={this.props.match.path + '/projectlist'} render={(props) => <ProjectContent
									visible={visible}
									loading={loading}
									addProject={this.addProject}
									onCancel={this.handleCancel}
									changePjName={this.changePjName}
									changeTesterName={this.changeTesterName}
									cleanForm={this.cleanForm}
									projectList={projectList}
									showModal={this.showModal}
									getSuitelist={this.getSuitelist}
									getProjectlist={this.getProjectlist}
									testerName={testerName}
									{...props}
								/>} />
								<Route exact path={this.props.match.path + '/suitelist/:id'} render={(props) => <SuiteContent
									visible={visible}
									loading={loading}
									suiteIdList={suiteIdList}
									onCancel={this.handleCancel}
									addSuite={this.addSuite}
									suiteList={suiteList}
									showModal={this.showModal}
									editSuiteModal={this.editSuiteModal}
									getSuitelist={this.getSuitelist}
									getCaselist={this.getCaselist}
									isEdit={isEdit}
									suiteId={suiteId}
									updateSuite={this.updateSuite}
									delSuite={this.delSuite}
									handleSuiteIdList={this.handleSuiteIdList}
									runSuite={this.runSuite}
									cleanSuiteIdList={this.cleanSuiteIdList}
									casePageIndex={this.state.casePageIndex}
									{...props}
								/>} />
								<Route exact path={this.props.match.path + '/caselist/:id'} render={(props) => <CaseContent
									visible={visible}
									loading={loading}
									onCancel={this.handleCancel}
									showModal={this.showModal}
									addCase={this.addCase}
									caseList={caseList}
									getCaselist={this.getCaselist}
									editCaseModal={this.editCaseModal}
									isEdit={isEdit}
									caseId={caseId}
									updateCase={this.updateCase}
									delCase={this.delCase}
									casePageIndex={this.state.casePageIndex}
									{...props}
								/>} />
							</Switch>
						</Layout>
					</Layout>
				</Layout>
			</Spin>
		)
	}
}

export default HomePage