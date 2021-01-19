import "antd/dist/antd.css";
import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";

import Template from '../Template/Template';

import { Menu, List, Divider, Button, Popover, Tag } from "antd";

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
		published: true
	};

	const creator = target_idea.creator.split('@')[0];
	const link_to_user = '/home';

	return (
		<Template content={
			<Fragment>
				<div style={{display: 'flex'}}>
					<div style={{float: 'left'}}>
						<Menu mode="inline"
								theme="dark"
								style={{ width: 256 }}>
							<Menu.Item key="home">
								Home
							</Menu.Item>
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
									From: {
										<NavLink
											to={link_to_user}
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
								<Button type="primary"
										shape="round"
										size='large'>
									Accept
								</Button>
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
									<Button type="primary"
											shape="round"
											size='large'>
										Accept
									</Button>
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
													<NavLink to='/home' rel="noreferrer">
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
													<NavLink to='/home'
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
													<NavLink to='/home'
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
