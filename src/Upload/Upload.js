import 'antd/dist/antd.css';
import React, { Fragment }from 'react';
import { useHistory } from "react-router-dom";

import Template from '../Template/Template';

import {
	Form, Row, Col,
	Input, TreeSelect, Button,
	Typography, Divider } from 'antd';
import {
	MinusCircleOutlined,
	PlusOutlined
} from "@ant-design/icons";

const { Title } = Typography;
const { TreeNode } = TreeSelect;
const { TextArea } = Input;

function Upload() {
	let history = useHistory();

	const onFinish = (values) => {
		console.log("Received values of form: ", values);
	};

	const all_topics = [
		{
			title: 'Academic',
			value: 'academic',
			children: [
				{
					title: 'Physics',
					value: 'physics'
				},
				{
					title: 'Chemistry',
					value: 'chemistry'
				},
				{
					title: 'Informatics',
					value: 'informatics'
				}
			]
		},
		{
			title: 'Sports',
			value: 'sports',
			children: [
				{
					title: 'Baseball',
					value: 'baseball'
				},
				{
					title: 'Table tennis',
					value: 'table tennis'
				}
			]
		}
	];

	const label_span = 3;

	const formItemLayout = {
		labelCol: {
			span: label_span
		},
		wrapperCol: {
			span: 18
		}
	};
	const topicformItemLayout = {
		labelCol: {
			span: label_span
		},
		wrapperCol: {
			span: 6
		}
	};
	const topicformItemLayout_woLb = {
		wrapperCol: {
			offset: label_span,
			span: 6
		}
	};
	const formItemLayout_woLb = {
		wrapperCol: {
			offset: label_span,
			span: 18
		}
	};

	return(
		<Template content={
			<Fragment>
				<Title>
					Upload Idea
				</Title>
				<Divider />
				<Form onFinish={onFinish}>
					<Form.Item {...formItemLayout}
						name="title"
						label="Title"
						rules={[
							{
								required: true,
								message: "This column can not be empty.",
							},
						]}
					>
						<Input size="large" placeholder="input title here..." />
					</Form.Item>

					<Form.List name="topics"
						rules={[
							{
								validator: async (_, topics) => {
									if(!topics || topics.length < 1)
										return Promise.reject(new Error('At least 1 topics.'));
								}
							}
						]}
					>
						{
							(fields, { add, remove }, { errors }) => (
								<Fragment>
									{
										fields.map((field, index) => (
											<Form.Item
												{...(index === 0 ? topicformItemLayout : topicformItemLayout_woLb)}
												label={ index === 0 ? "Topics" : '' }
												required={true}
												key={field.key}
											>
												<Row>
													<Col span={20}>
														<Form.Item {...field}
															rules={[
																{
																	required: true,
																	message: "This choice can not be empty."
																},
																({ getFieldValue }) => ({
																	validator(_, value) {
																		if (!value ||
																			getFieldValue("topics").filter(e => e === value).length <= 1) {
																			return Promise.resolve();
																		}
																		return Promise.reject(
																			"Repeated topics detected."
																		);
																	},
																}),
															]}
															noStyle>
															<TreeSelect
																placeholder="Please select topic"
																treeDefaultExpandAll
																dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
																showSearch
															>
																{
																	all_topics.map(category => (
																		<TreeNode value={category.value}
																					title={category.title}
																					key={category.value}
																					disabled>
																			{
																				category.children.map(topic => (
																					<TreeNode value={topic.value}
																								title={topic.title}
																								key={topic.value} />
																				))
																			}
																		</TreeNode>
																	))
																}
															</TreeSelect>
														</Form.Item>
													</Col>
													<Col span={4}>
														<MinusCircleOutlined
															className="dynamic-delete-button"
															onClick={() => remove(field.name)}
														/>
													</Col>
												</Row>
											</Form.Item>
										))
									}
									<Form.Item {...formItemLayout_woLb}>
										<Button type="dashed" onClick={() => add()}
												icon={<PlusOutlined />}>
											Add Topics
										</Button>
									</Form.Item>
									<Row>
										<Col offset={label_span}>
											<Form.ErrorList errors={errors} />
										</Col>
									</Row>
								</Fragment>
							)
						}
					</Form.List>

					<Form.Item {...formItemLayout}
						name="content"
						label="Content"
						rules={[
							{
								required: true,
								message: "This column can not be empty.",
							},
						]}
					>
						<TextArea placeholder="Write your ideas here..." />
					</Form.Item>

					<Form.List name="references">
						{
							(fields, { add, remove }, { errors }) => (
								<Fragment>
									{
										fields.map((field, index) => (
											<Form.Item
												{...(index === 0 ? formItemLayout : formItemLayout_woLb)}
												label={ index === 0 ? "References" : '' }
												key={field.key}
											>
												<Row>
													<Col span={20}>
														<Form.Item {...field}
															noStyle>
															<Input placeholder="input reference website..." />
														</Form.Item>
													</Col>
													<Col span={4}>
														<MinusCircleOutlined
															className="dynamic-delete-button"
															onClick={() => remove(field.name)}
														/>
													</Col>
												</Row>
											</Form.Item>
										))
									}
									<Form.Item {...formItemLayout_woLb}>
										<Button type="dashed" onClick={() => add()}
												icon={<PlusOutlined />}>
											Add References
										</Button>
									</Form.Item>
									<Row>
										<Col offset={label_span}>
											<Form.ErrorList errors={errors} />
										</Col>
									</Row>
								</Fragment>
							)
						}
					</Form.List>

					<Form.Item {...formItemLayout}
						name="ref_picture"
						label="Reference Picture"
					>
						<Input size="large" placeholder="input reference picture's website here..." />
					</Form.Item>

					<Row>
						<Col span={3} offset={9} style={{ textAlign: "center" }}>
							<Button type="primary" htmlType="submit" size="large">
								Submit
							</Button>
						</Col>
						<Col span={3} style={{ textAlign: "center" }}>
							<Button size="large"
								onClick={ () => history.push('/home') }>
								Cancel
							</Button>
						</Col>
					</Row>

				</Form>
			</Fragment>
		} />
	);
}

export default Upload;