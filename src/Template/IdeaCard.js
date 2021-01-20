import "antd/dist/antd.css";
import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { Card, Button } from "antd";

function IdeaCard(props) {
	let history = useHistory();
	const idea = props.idea;
	const show_creator = props.show_creator === undefined ? true : props.show_creator;

	const id = (idea.id === undefined ? idea._id : idea.id);

	const more_link = (
		<Button type="primary" size="small">
			<NavLink to={"/idea/" + id} rel="noreferrer">
				Show More...
			</NavLink>
		</Button>
	);

	return (
		<Card title={
			<Fragment>
				<span>
					{idea.title}
				</span> {show_creator ? <span style={{fontSize: 12}}>
					From: {idea.creator.split('@')[0]}
				</span> : <Fragment></Fragment>}
			</Fragment>
		} bordered={true}
			headStyle={{
				backgroundColor: '#1890FF',
				color: '#FFFFFF'
			}}
			hoverable
			onClick={() => history.push('/idea/' + id)}
		>
			<div style={{height: '200px'}}>
				{
					idea.content.length > 280 ? 
					(idea.content.substr(0, 280) + '...') : 
					idea.content
				}
			</div>
			<div style={{float: 'right'}}>
				{more_link}
			</div>
		</Card>
	);
}

export default IdeaCard;