import "antd/dist/antd.css";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import "./SignUp.css";
import Template from "../Template/Template";

import { Form, Typography, Input, Button, Row, Col, TreeSelect } from "antd";
import {
	MinusCircleOutlined,
	PlusOutlined
} from "@ant-design/icons";

import { useQuery } from '@apollo/react-hooks';
import {
  TOPICS_QUERY
} from '../graphql';

const { Title } = Typography;
const { TreeNode } = TreeSelect;

function SignUp() {

	const onFinish = (values) => {
		console.log("Received values of form: ", values);
	};

	const formItemLayout = {
		labelCol: {
			span: 8
		}
	};
	const formItemLayout_woLb = {
		wrapperCol: {
			offset: 8,
		}
	};

	const {
		loading, error, data, refetch, subscribeToMore
	} = useQuery(TOPICS_QUERY);

	const Render = (
		<Fragment>
			<div
				style={{
					paddingBottom: 30,
					paddingTop: 30,
				}}
			>
				<Title align="center">Ideas Republica</Title>
				<Title align="center" level={4}>
					Sign up as a Citizen
				</Title>
			</div>
			<div className="content">
				<Form {...formItemLayout} onFinish={onFinish}>
					<Form.Item
						name="realname"
						label="Real Name"
						rules={[
							{
								required: true,
								message: "This column can not be empty.",
							},
						]}
					>
						<Input size="large" placeholder="Real Name" />
					</Form.Item>

					<Form.Item
						name="nickname"
						label="Nickname"
						rules={[
							{
								required: true,
								message: "This column can not be empty.",
							},
						]}
					>
						<Input size="large" placeholder="Nickname" />
					</Form.Item>

					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								type: "email",
								message: "Please input a valid email.",
							},
							{
								required: true,
								message: "This column can not be empty.",
							},
						]}
					>
						<Input size="large" placeholder="Email" />
					</Form.Item>

					<Form.Item
						name="region"
						label="Region"
						rules={[
							{
								required: true,
								message: "This column can not be empty.",
							}
						]}
					>
						<Input size="large" placeholder="Region" />
					</Form.Item>

					<Form.List name="expertise">
						{
							(fields, { add, remove }, { errors }) => (
								<Fragment>
									{
										fields.map((field, index) => (
											<Form.Item
												{...(index === 0 ? formItemLayout : formItemLayout_woLb)}
												label={ index === 0 ? "Expertise topics" : '' }
												required={false}
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
																			getFieldValue("expertise").filter(e => e === value).length <= 1) {
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
																	loading ? (
																		<TreeNode value="loading..."
																					title="loading..."
																					key="loading..." disabled />
																	) : error ? (
																		<TreeNode value="error..."
																					title="error..."
																					key="error..." disabled />
																	) : (
																		data.get_topics.map(category => (
																			<TreeNode value={category.name}
																						title={category.name}
																						key={category.name}
																						disabled>
																				{
																					category.subtopics.map(topic => (
																						<TreeNode value={topic}
																									title={topic}
																									key={topic} />
																					))
																				}
																			</TreeNode>
																		))
																	)
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
											Add Expertise Topics
										</Button>
									</Form.Item>
									<Row>
										<Col offset={8}>
											<Form.ErrorList errors={errors} />
										</Col>
									</Row>
								</Fragment>
							)
						}
					</Form.List>

					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "This column can not be empty.",
							},
							{
								validator: async(_, password) => {
									if(!password || password.length >= 8)
										return Promise.resolve();
									return Promise.reject(
										"Password must be at least 8 characters long."
									);
								}
							}
						]}
					>
						<Input.Password size="large" placeholder="Password" />
					</Form.Item>

					<Form.Item
						name="confirm"
						label="Confirm Password"
						dependencies={["password"]}
						hasFeedback
						rules={[
							{
								required: true,
								message: "This column can not be empty.",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										"Two password not matched, please chcek again."
									);
								},
							}),
						]}
					>
						<Input.Password size="large" placeholder="password" />
					</Form.Item>

					<Row>
						<Col span={24} style={{ textAlign: "center" }}>
							<Button type="primary" htmlType="submit" size="large">
								Create Account
							</Button>
						</Col>
					</Row>
				</Form>

				<div className="signin">
					Already have an account? <NavLink to="/sign-in" rel="noreferrer">
						Sign in here
					</NavLink>
				</div>
			</div>
		</Fragment>
	);
	return <Template content={Render} />;
}

export default SignUp;
