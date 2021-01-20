import "antd/dist/antd.css";
import React, { Fragment, useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

import { Form, Input, Button, Avatar, Row, Col, Typography } from "antd";
import Template from "../Template/Template";
import { UserOutlined } from "@ant-design/icons";
import "./SignIn.css";
// import FormItem from "antd/lib/form/FormItem";
import { useMutation } from '@apollo/react-hooks';

import {
	USER_LOGIN_MUTATION
} from '../graphql';

const { Title } = Typography;
function SignIn() {
	let history = useHistory();
	const [ invalid, setInvalid ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ user_login, { data }] = useMutation(USER_LOGIN_MUTATION);
	const uuid = uuidv4();

	const onFinish = async (values) => {
		// console.log("Received values of form: ", values);
		setEmail(values.email);
		const login = await user_login({
			variables: {
				email: values.email,
				password_hashed: values.password,
				uuid: uuid
			}
		});
		// console.log(login);
		// if(login.data && login.data.user_login){
		// 	Cookies.set('IdeaRep_user_email', email);
		// 	Cookies.set('IdeaRep_uuid', uuid);
		// 	history.push('/home');
		// }
		// else{
		// 	setInvalid(true);
		// }
	};

	const [ preventDefault, setPreventDefault ] = useState(false);
	useEffect(() => {
		if(data && data.user_login){
			// write cookie
			Cookies.set('IdeaRep_user_email', email);
			Cookies.set('IdeaRep_uuid', uuid);
			history.push('/home');
		}
		else if (preventDefault){
			setInvalid(true);
		}
		else
			setPreventDefault(true);
	}, [data]);

	const Render = (
		<Fragment>
			<div style={{ paddingTop: 30 }}>
				<Title align="center">Ideas Republica</Title>
			</div>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					justifyContent: "center",
					paddingBottom: 50,
					paddingTop: 5,
				}}
			>
				<Avatar
					size={256}
					icon={<UserOutlined />}
					style={{ backgroundColor: "#8fb2eb" }}
				/>
			</div>
			<div className="formInput">
				<Form onFinish={onFinish}>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Please enter your email.",
							},
						]}
					>
						<Input size="large" placeholder="email" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please enter your password.",
							},
						]}
					>
						<Input.Password size="large" placeholder="password" />
					</Form.Item>
					{
						invalid ? (
							<p style={{color: 'red', textAlign: "center"}}>
								Invalid Account or Password.
							</p>
						) : (<Fragment></Fragment>)
					}
					<Row>
						<Col span={24} style={{ textAlign: "center" }}>
							<Button type="primary" htmlType="submit" size="large">
								Sign In
							</Button>
						</Col>
					</Row>
					<div className="signup">
						No accounts? <NavLink to="/sign-up" rel="noreferrer">
							Sign up here
						</NavLink>
					</div>
				</Form>
			</div>
		</Fragment>
	);
	return <Template loggined={data} content={Render} />;
}

export default SignIn;
