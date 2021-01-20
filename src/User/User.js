import "antd/dist/antd.css";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import Template from '../Template/Template';
import IdeaCard from '../Template/IdeaCard';

import { Row, Col, Avatar, Descriptions, Tag } from "antd";

function User(props) {
	const { id } = props.match.params;
	const Height = window.innerHeight - 114;

	const user = {
		_id: "000000",
		account_type: 1,
		info: {
			realname: "Allen",
			nickname: "Dao",
			pwd: "not supported",
			email: "b08901057@ntu.edu.tw",
			avatar_content: "wtf",
			avatar_color: "#00FF00",
			region: "Taiwan",
			expertise: ["chemistry", "informatics"],
		},
		login_state: true,
		ideas: ["000", "111", "222"],
		interested_topics: ["chemistry", "informatics"],
		ongoing_projects: ["001", "110"],
		ideas_to_be_reviewed: ["000", "111"],
		ideas_agreed: ["011", "100"],
		ideas_rejected: ["101", "010"],
	};

	const user_ideas = [
		{
			id: '000',
			creator: 'Dao@000',
			title: 'Title1',
			content: 'Content1'
		},
		{
			id: '001',
			creator: 'Dao@000',
			title: 'Title2',
			content: 'Content2'
		},
		{
			id: '002',
			creator: 'Dao@000',
			title: 'Title3',
			content: 'Content3'
		}
	];

	const user_projects = [
		{
			id: '003',
			creator: 'Dao@000',
			title: 'Prj1',
			content: 'Content1'
		},
		{
			id: '004',
			creator: 'Dao@000',
			title: 'Prj2',
			content: 'Content2'
		},
		{
			id: '005',
			creator: 'Dao@000',
			title: 'Prj3',
			content: 'Content3'
		}
	];

	const user_reviews = [
		{
			id: '006',
			creator: 'Dao@000',
			title: 'Rv1',
			content: 'Content1'
		},
		{
			id: '007',
			creator: 'Dao@000',
			title: 'Rv2',
			content: 'Content2'
		},
		{
			id: '008',
			creator: 'Dao@000',
			title: 'Rv3',
			content: 'Content3'
		}
	];

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
			<Row gutter={16}>
				{
					target.map(idea => (
						<Col span={8}>
							<IdeaCard idea={idea} />
						</Col>
					))
				}
			</Row>
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
						{user.info.nickname + "@" + id}
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
				{element("/user-ideas", "User Ideas", user_ideas)}
				{element("/user-projects", "User Projects", user_projects)}
				{element("/user-reviews", "User Reviews", user_reviews)}
			</div>
		</Fragment>
	} />;
}

export default User;