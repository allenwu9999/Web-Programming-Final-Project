import "antd/dist/antd.css";
import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

import Template from '../Template/Template';

import { Menu, Divider, Button, Popover, Tag, Image } from "antd";

const { SubMenu } = Menu;

function Idea(props){
	const { id } = props.match.params;
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

	const [ accepted, setAccepted ] = useState(false);

	const sidebar_topics = [
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

	const Accept_button = (
		<Button type="primary"
				shape="round"
				size='large'
				onClick={() => setAccepted(!accepted)}
				danger={ accepted ? true : false }>
			{ accepted ? "Cancel" : "Accept" }
		</Button>
	);

	return (
		<Template content={
			<Fragment>
				<div style={{display: 'flex'}}>
					<div style={{float: 'left'}}>
						<Menu mode="inline"
								theme="light"
								style={{ width: 256 }}
								defaultOpenKeys={sidebar_topics.map(category => category.value)}>
							{
								sidebar_topics.map(category => (
									<SubMenu key={category.value}
											title={category.title}>
										{
											category.children.map(topic => (
												<Menu.Item key={topic.value}>
													<NavLink to="/topic"
															rel="noreferrer">
														{topic.title}
													</NavLink>
												</Menu.Item>
											))
										}
									</SubMenu>
								))
							}
						</Menu>
					</div>
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
								{Accept_button}
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
								<div style={{padding: '24px 0'}}>
									{Accept_button}
								</div>
							</div>
							<div style={{
								float: 'right',
								width: 256
							}}>
								<Divider>
									Idea Acceptors
								</Divider>
								<Menu mode="inline"
									theme="light"
									style={{width: 256}}>
									{
										target_idea.acceptors.map(acceptor => (
											<Fragment>
												<Menu.Item key={acceptor}>
													<NavLink to={
														'/user/'+acceptor.split('@')[1]
														} 
															rel="noreferrer">
														{acceptor.split('@')[0]}
													</NavLink>
												</Menu.Item>
												<Menu.Divider />
											</Fragment>
										))
									}
								</Menu>
								<Divider>
									<Popover content={
										<div>
										{
											target_idea.review_acceptors.map(review => (
												<p>
													<NavLink to={
														'/user/' + review.split('@')[1]
													}
															rel="noreferrer">
														{review.split('@')[0]}
													</NavLink>
												</p>
											))
										}
										</div>
									} title="Accepted Reviewers">
										<Button type="primary" size="default">
											Accepted Reviewers
										</Button>
									</Popover>
								</Divider>
								<Divider>
									<Popover content={
										<div>
										{
											target_idea.review_rejectors.map(review => (
												<p>
													<NavLink to={
														'/user/' + review.split('@')[1]
													}
															rel="noreferrer">
														{review.split('@')[0]}
													</NavLink>
												</p>
											))
										}
										</div>
									} title="Rejected Reviewers">
										<Button type="primary" size="default">
											Rejected Reviewers
										</Button>
									</Popover>
								</Divider>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		} />
	);
}

export default Idea;
