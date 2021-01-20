import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import Template from "../../Template/Template";
import IdeaCardByID from "../../Template/IdeaCardByID";

import Cookies from 'js-cookie';

import { Avatar, Row, Col, Descriptions, Tag, Empty } from 'antd';

import {
	GET_USER_BY_EMAIL,
} from '../../graphql';

function Homepage() {
	const history = useHistory();
	const Height = window.innerHeight - 114;
	const email = Cookies.get('IdeaRep_user_email');

	const userdata = useQuery(GET_USER_BY_EMAIL, {
		variables: { email: email }
	});

	if(userdata.loading)
		return(<Template content="Loading" />);
	if(userdata.error)
		return(<Template content="Error" />);
	if(!userdata.data)
		return(<Template content="No data" />);

	if(userdata.data.get_user_by_email[0] == undefined){
		history.push('/sign-in');
		return(<Template content="" />);
	}

	const user = userdata.data.get_user_by_email[0];

	const element = (path, title, target) => (
		<div style={{
			flexGrow: 1,
			padding: '25px',
			minHeight: Height
		}}>
			<h1 style={{padding: '25px'}}>
				<NavLink to={path} rel="noreferrer">
					{title}
				</NavLink>
			</h1>
			{
				target.length ? (
					<Row gutter={[16, 16]}>
						{
							target.map(id => (
								<Col span={8}>
									<IdeaCardByID id={id} show_creator={false} />
								</Col>
							))
						}
					</Row>
				) : (
					<Row>
						<Col span={8} offset={8}>
							<Empty />
						</Col>
					</Row>
				)
			}
		</div>
	);

	return <Template content={
		<Fragment>
			<div>
				<div style={{
					flexGrow: 1,
					textAlign: 'center',
					fontSize: 24,
					padding: '25px',
					minHeight: Height
				}}>
					<Avatar size={128} style={{
						backgroundColor: user.info.avatar_color,
						fontSize: 24
					}}>
						{user.info.avatar_content}
					</Avatar>
					<div style={{ paddingBottom: 20 }}></div>
					<div style={{ textAlign: "center" }}>
						{user.info.nickname}
					</div>
					<div style={{
						padding: '25px',
						textAlign: 'center',
					}}>
						<Descriptions size="default" bordered
							column={1} style={{ width: 500, margin: 'auto' }}>
							<Descriptions.Item label="Expertise">
								<div>
									{
										user.info.expertise.map((subject) => (
											<Tag>
												<NavLink to={`/topics/${subject}`}
														rel="noreferrer">
													{subject}
												</NavLink>
											</Tag>
										))
									}
								</div>
							</Descriptions.Item>
							<Descriptions.Item label="Interested Topics">
								<div>
									{
										user.interested_topics.map((subject) => (
											<Tag>
												<NavLink to={`/topics/${subject}`}
														rel="noreferrer">
													{subject}
												</NavLink>
											</Tag>
										))
									}
								</div>
							</Descriptions.Item>
						</Descriptions>
					</div>
				</div>
				{element("/my-ideas", "My Ideas", user.ideas)}
				{element("/my-projects", "My Projects", user.ongoing_projects)}
				{element("/my-reviews", "My Reviews", [...user.ideas_agreed, ...user.ideas_rejected])}
			</div>
		</Fragment>
	} />;
}

export default Homepage;
