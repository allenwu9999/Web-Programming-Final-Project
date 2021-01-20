import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import Template from "../../Template/Template";
import IdeaCard from "../../Template/IdeaCard";

import { Avatar, Row, Col, Descriptions, Tag } from 'antd';

function Homepage() {
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
	const id = user._id;

	const my_ideas = [
		{
			id: '000',
			creator: "Dao@001",
			title: 'Title1',
			content: 'Content1'
		},
		{
			id: '001',
			creator: "Dao@001",
			title: 'Title2',
			content: 'Content2'
		},
		{
			id: '002',
			creator: "Dao@001",
			title: 'Title3',
			content: 'Content3'
		}
	];

	const my_projects = [
		{
			id: '003',
			creator: "Dao@001",
			title: 'Prj1',
			content: 'Content1'
		},
		{
			id: '004',
			creator: "Dao@001",
			title: 'Prj2',
			content: 'Content2'
		},
		{
			id: '005',
			creator: "Dao@001",
			title: 'Prj3',
			content: 'Content3'
		}
	];

	const my_reviews = [
		{
			id: '006',
			creator: "Dao@001",
			title: 'Rv1',
			content: 'Content1'
		},
		{
			id: '007',
			creator: "Dao@001",
			title: 'Rv2',
			content: 'Content2'
		},
		{
			id: '008',
			creator: "Dao@001",
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
							<IdeaCard idea={idea} show_creator={false} />
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
				{element("/my-ideas", "My Ideas", my_ideas)}
				{element("/my-projects", "My Projects", my_projects)}
				{element("/my-reviews", "My Reviews", my_reviews)}
			</div>
		</Fragment>
	} />;
}

export default Homepage;
