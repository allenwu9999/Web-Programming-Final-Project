import "antd/dist/antd.css";
import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { Card, Button, Empty } from "antd";
import { WarningOutlined } from '@ant-design/icons';

import { useQuery } from '@apollo/react-hooks';
import {
	GET_IDEA_BY_ID
} from '../graphql';

function IdeaCardByID(props) {
	let history = useHistory();
	const id = props.id;
	const show_creator = props.show_creator === undefined ? true : props.show_creator;

	const more_link = (
		<Button type="primary" size="small">
			<NavLink to={"/idea/" + id} rel="noreferrer">
				Show More...
			</NavLink>
		</Button>
	);

	const idea = useQuery(GET_IDEA_BY_ID, {
		variables: { ideaId: id }
	});

	if(idea.loading)
		return(
			<Card title="Loading..."
				bordered={true}
				headStyle={{
					backgroundColor: '#1890FF',
					color: '#FFFFFF'
				}}
				hoverable
				loading
			>
				<div style={{height: '200px'}}>
				</div>
			</Card>
		);
	if(idea.error)
		return(
			<Card title="Error..."
				bordered={true}
				headStyle={{
					backgroundColor: '#1890FF',
					color: '#FFFFFF'
				}}
				hoverable
			>
				<div style={{height: '200px', display: 'flex'}}>
					<WarningOutlined 
						style={{fontSize: 150, flexGrow: 1}}
					/>
				</div>
			</Card>
		);
	if(!idea.data)
		return(
			<Card title="No Data"
				bordered={true}
				headStyle={{
					backgroundColor: '#1890FF',
					color: '#FFFFFF'
				}}
				hoverable
			>
				<div style={{height: '200px', display: 'flex'}}>
					<Empty imageStyle={{height: 150, flexGrow: 1, margin: 'auto'}}/>
				</div>
			</Card>
		);

	return (
		<Card title={
				<Fragment>
					<span>
						{idea.data.get_idea_by_id[0].title}
					</span> {show_creator ? <span style={{fontSize: 12}}>
						From: {idea.data.get_idea_by_id[0].creator.split('@')[0]}
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
					idea.data.get_idea_by_id[0].content.length > 280 ? 
					(idea.data.get_idea_by_id[0].content.substr(0, 280) + '...') : 
					idea.data.get_idea_by_id[0].content
				}
			</div>
			<div style={{float: 'right'}}>
				{more_link}
			</div>
		</Card>
	);
}

export default IdeaCardByID;