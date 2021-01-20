import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Cookies from 'js-cookie';

import { Layout, BackTop, message } from "antd";

import Navigation from "./Navigation";

import {
	DownloadOutlined,
	StopOutlined,
	CheckCircleOutlined } from "@ant-design/icons";

import { useQuery, useMutation } from '@apollo/react-hooks';
import {
	GET_USER_LOGGIN_BY_EMAIL,
	USER_LOGOUT_MUTATION
} from '../graphql';

const { Header, Content, Footer } = Layout;

function Template(props) {
	let history = useHistory();
	const [ loggined, setLoggined ] = useState(false);
	const [ reviewer, setReviewer ] = useState(false);

	const email = Cookies.get('IdeaRep_user_email');
	const login = useQuery(GET_USER_LOGGIN_BY_EMAIL, {
		variables: { email: email }
	});
	const [ user_logout, { data } ] = useMutation(USER_LOGOUT_MUTATION);

	useEffect(() => {
		// console.log(login.loading, login.error, login.data);
		// console.log(Cookies.get('IdeaRep_uuid'));
		setLoggined(login.loading ? false : (
				login.error ? false : (
					login.data.get_user_by_email[0] ? (
						(login.data.get_user_by_email[0].login_state) ? true : false
					) : false
				)
			)
		);
		setReviewer(login.loading ? false : (
				login.error ? false : (
					(login.data.get_user_by_email[0] &&
						(login.data.get_user_by_email[0].account_type <= 1)) ?
					true : false
				)
			)
		);
	}, [login, history])

	const onLogout = () => {
		const logout = user_logout({
			variables: {
				email: Cookies.get('IdeaRep_user_email')
			}
		});
		if(logout){
			setLoggined(false);
			setReviewer(false);
			Cookies.set('IdeaRep_user_email', undefined);
		}
		else
			message.error('Logout failed');
	};

	// should get from user db
	const Notifications = [
		{
			idea_id: "000",
			text: "someone accepted your idea",
			icon: <DownloadOutlined />
		},
		{
			idea_id: "001",
			text: "your idea got rejected",
			icon: <StopOutlined />
		},
		{
			idea_id: "002",
			text: "your idea passed",
			icon: <CheckCircleOutlined />
		}
	];

	return (
		<Layout>
			<Header
				style={{
					position: "fixed",
					width: "100%",
					backgroundColor: "#001529",
					height: 64,
					zIndex: 1,
				}}
			>
				{
					<Navigation
						onLogout={onLogout}
						loggined={loggined}
						reviewer={reviewer}
						notifications={Notifications}
					/>
				}
			</Header>

			<Content
				style={{
					padding: "0 50px",
					marginTop: 64,
					background: "#FFFFFF",
				}}
			>
				<div style={{ padding: "24px 0px", minHeight: window.innerHeight - 128 }}>
					{props.content}
				</div>
			</Content>

			<Footer
				style={{
					textAlign: "center",
					backgroundColor: "#000000",
					color: "#FFFFFF",
					height: 64,
				}}
			>
				Ideas Republica{" "}
				<span
					style={{
						display: "inline-block",
						transform: "rotateY(180deg)",
					}}
				>
					&copy;
				</span>{" "}
				2020-2021
			</Footer>

			<BackTop duration={450} visibilityHeight={200} />
		</Layout>
	);
}

export default Template;
