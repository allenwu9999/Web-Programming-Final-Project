import 'antd/dist/antd.css';
import React, { Fragment } from 'react';
import { NavLink } from "react-router-dom";

import Template from '../Template/Template';

import {
	Menu, Divider, Button, Tag, Image, Typography, Empty } from "antd";

const { Title } = Typography;

function Review(props) {
	const { id } = props.match.params;

	const sidebar_ideas = [
		{
			id: '000',
			topic: 'zero zero zero'
		},
		{
			id: '001',
			topic: 'one'
		}
	];

	if(!id){
		return(
			<Template content={
				<Fragment>
					<div style={{display: 'flex'}}>
						<div style={{float: 'left'}}>
							<Divider>
								<Title level={4} style={{textAlign: 'center'}}>
									Pending Ideas
								</Title>
							</Divider>
							<Menu mode="inline"
									theme="light"
									style={{ width: 256 }}>
								{
									sidebar_ideas.map(idea => (
										<Menu.Item key={idea.id}>
											<NavLink to={"/review/" + idea.id}
													rel="noreferrer">
												{idea.topic}
											</NavLink>
										</Menu.Item>
									))
								}
							</Menu>
						</div>
						<div style={{
							padding: "0 24px",
							float: "left",
							color: 'black',
							flexGrow: 1,
							textAlign: 'center'
						}}>
							<Empty imageStyle={{height: 150}}/>
							<Divider>
								Choose a idea from the left to review!
							</Divider>
						</div>
					</div>
				</Fragment>
			} />
		);
	}

	const target_idea = {
		title: 'A pistol with thermite bullets',
		topics: ['Physics', 'Chemistry'],
		content: "I'm planning to make a pistol with the bullet contains thermite. I'm planning to make a pistol with the bullet contains thermite. I'm planning to make a pistol with the bullet contains thermite. I'm planning to make a pistol with the bullet contains thermite. I'm planning to make a pistol with the bullet contains thermite. ",
		creator: 'MartianSheep@878787',
		acceptors: ['Aqua@445', 'Admin@000'],
		review_acceptors: ['Botan@446', 'Aqua@445'],
		review_rejectors: ['wtf@001', 'hellyouspeaking@110'],
		reviewed: true,
		published: true,
		pic: "https://img.moegirl.org.cn/common/0/0e/1498b4dda144ad348fbc4259d0a20cf430ad852d.gif",
		href: ['https://img.moegirl.org.cn/common/0/0e/1498b4dda144ad348fbc4259d0a20cf430ad852d.gif']
	};

	const creator = target_idea.creator.split('@')[0];
	const link_to_creator = '/user/' + target_idea.creator.split('@')[1];

	const Review_button = (
		<Fragment>
			<Button type="primary"
					shape="round"
					size='large'>
				Accept
			</Button>
			<Divider type="vertical" />
			<Button type="primary"
					shape="round"
					size='large'
					danger>
				Reject
			</Button>
		</Fragment>
	);

	const idea_object = (
		<div style={{
			padding: "0 24px",
			float: "left",
			color: 'black',
			flexGrow: 1,
		}}>
			<div style={{display: 'flex'}}>
				<div style={{float: 'left', flexGrow: 1}}>
					<div style={{fontSize: '32px'}}>
						{target_idea.title}
					</div>
					<div style={{fontSize: '16px'}}>
						Idea #{ <span>{id}</span> } From: {
							<NavLink
								to={link_to_creator}
								rel="noreferrer">
								{creator}
							</NavLink>
						}
					</div>
				</div>
				<div style={{
					float: 'right',
					padding: '12 24px',
				}}>
					{Review_button}
				</div>
			</div>
			<Divider />
			<div style={{display: 'flex'}}>
				<div style={{
					float: 'left',
					flexGrow: 1,
					fontSize: '14px'
				}}>
					<div>
						{target_idea.content}
					</div>
					<Divider>
						Reference Websites
					</Divider>
					{
						target_idea.href.map(href => (
							<a href={href}>{href}</a>
						))
					}
					<Divider>
						Reference Picture
					</Divider>
					<div style={{textAlign: 'center'}}>
						<Image src={target_idea.pic} width={200} />
						<p>
							Link: <a href={target_idea.pic}>
								{target_idea.pic}
							</a>
						</p>
					</div>
					<Divider />
					{
						target_idea.topics.map(topic => (
							<Tag>
								<NavLink to='/home'
										rel="noreferrer"
										style={{color: 'black'}}
										activeStyle={{color: 'black'}}
										>
									{topic}
								</NavLink>
							</Tag>
						))
					}
					<div style={{
						padding: '24px 0',
						textAlign: 'center'
					}}>
						{Review_button}
					</div>
				</div>
			</div>
		</div>
	);

	return(
		<Template content={
			<Fragment>
				<div style={{display: 'flex'}}>
					<div style={{float: 'left'}}>
						<Divider>
							<Title level={4} style={{textAlign: 'center'}}>
								Pending Ideas
							</Title>
						</Divider>
						<Menu mode="inline"
								theme="light"
								style={{ width: 256 }}>
							{
								sidebar_ideas.map(idea => (
									<Menu.Item key={idea.id}>
										<NavLink to={"/review/" + idea.id}
												rel="noreferrer">
											{idea.topic}
										</NavLink>
									</Menu.Item>
								))
							}
						</Menu>
					</div>
					{idea_object}
				</div>
			</Fragment>
		} />
	);
}

export default Review;