import React from 'react';
import {
	Form,
	Modal,
	Button
} from 'antd';
import ProjectForm from './ProjectForm';

class ProjectModal extends React.Component {
	handleProjectSubmit = () => {
        this.formRef.props.form.validateFields(
            (err) => {
                if (!err) {
					const projectName =  this.formRef.props.form.getFieldValue('projectName');
					const testerName =  this.formRef.props.form.getFieldValue('testerName');
					const projectData ={};
					projectData['projectName']=projectName;
					projectData['testerName']=testerName;
					this.props.addProject(projectData);
                }
            },
        );


    }

	render() {
		const WrappedProjectForm = Form.create()(ProjectForm);
		return (
			<Modal
				visible={this.props.visible}
				title="新增项目"
				onCancel={this.props.onCancel}
				footer={[
					<Button key="return" onClick={this.props.onCancel}>取消</Button>,
					<Button key="submit" type="primary" loading={this.props.loading} onClick={() => this.handleProjectSubmit()}>新增项目</Button>,
				]}				
			>
				<div>
				<WrappedProjectForm wrappedComponentRef={(component) => {
                        this.formRef = component
                    }} />
				</div>
			</Modal>
		)
	}
}


export default ProjectModal