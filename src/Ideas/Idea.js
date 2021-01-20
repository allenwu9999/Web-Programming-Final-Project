import "antd/dist/antd.css";
import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';

import Template from '../Template/Template';

import Cookies from 'js-cookie';

import { Menu, Divider, Button, Popover, Tag, Image } from "antd";

import {
	GET_IDEA_BY_ID,
	GET_USER_BY_EMAIL,
	TOPICS_QUERY,
	ADD_IDEA_ACCEPTOR_MUTATION,
	REMOVE_IDEA_ACCEPTOR_MUTATION
} from '../graphql';

const { SubMenu } = Menu;

function Idea(props){
	const { id } = props.match.params;
	const email = Cookies.get('IdeaRep_user_email');
	const [ accepted, setAccepted ] = useState(false);

	const target = useQuery(GET_IDEA_BY_ID, {
		variables: { ideaId: id }
	});
	const userdata = useQuery(GET_USER_BY_EMAIL, {
		variables: { email: email }
	});
	const topics = useQuery(TOPICS_QUERY);
	const [ accept_idea ] = useMutation(ADD_IDEA_ACCEPTOR_MUTATION);
	const [ quit_accept ] = useMutation(REMOVE_IDEA_ACCEPTOR_MUTATION);

	useEffect(() => {
		if(!userdata.loading && !userdata.error
			&& userdata.data.get_user_by_email[0]
			&& userdata.data.get_user_by_email[0].ongoing_projects.includes(id))
			setAccepted(true);
	}, [userdata])

	useEffect(() => {
		target.refetch();
	}, [accepted])

	if(target.loading || userdata.loading || topics.loading)
		return(<Template content="Loading" />);
	if(target.error || userdata.error || topics.error)
		return(<Template content="Error" />);
	if(!target.data || !userdata.data || !topics.data)
		return(<Template content="No data" />);

	const target_idea = target.data.get_idea_by_id[0];

	const creator = target_idea.creator.split('@')[0];
	const link_to_creator = '/user/' + target_idea.creator.split('@')[1];

	const sidebar_topics = topics.data.get_topics;

	const user = userdata.data.get_user_by_email[0];
	const userId = (user === undefined ? "" : (user.info.nickname + "@" + user._id));

	const Accept_button = (
		user !== undefined ? (
			<Button type="primary"
					shape="round"
					size='large'
					onClick={async () => {
						// going to accept
						if(!accepted){
							setAccepted(true);
							await accept_idea({
								variables: {
									ideaId: id,
									acceptor: userId
								}
							});
						}
						else{
							setAccepted(false);
							await quit_accept({
								variables: {
									ideaId: id,
									acceptor: userId
								}
							})
						}
					}}
					danger={ accepted ? true : false }>
				{ accepted ? "Cancel" : "Accept" }
			</Button>
		) : <Fragment></Fragment>
	);

	return (
		<Template content={
			<Fragment>
				<div style={{display: 'flex'}}>
					<div style={{float: 'left'}}>
						<Menu mode="inline"
								theme="light"
								style={{ width: 256 }}>
							{
								sidebar_topics.map(Topic => (
									<SubMenu key={Topic.name}
											title={Topic.name}>
										{
											Topic.subtopics.map(subtopic => (
												<Menu.Item key={subtopic}>
													<NavLink to={"/topics/"+subtopic}
															rel="noreferrer">
														{subtopic}
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
								{ target_idea.reference.length ? 
									target_idea.reference.map(href => (
										<a href={href}>{href}</a>
									)) : <Fragment></Fragment>
								}
								{
									target_idea.reference_picture ? (
										<Fragment>
											<Divider>
												Reference Picture
											</Divider>
											<div style={{textAlign: 'center'}}>
												<Image src={target_idea.reference_picture}
													width={200} />
												<p>
													Link: <a href={target_idea.reference_picture}>
														{target_idea.reference_picture}
													</a>
												</p>
											</div>
										</Fragment>
									) : <Fragment></Fragment>
								}
								<Divider />
								{
									target_idea.topics.map(topic => (
										<Tag>
											<NavLink to={'/topics/'+topic}
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
