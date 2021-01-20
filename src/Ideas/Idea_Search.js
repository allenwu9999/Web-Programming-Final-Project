import "antd/dist/antd.css";
import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import Template from "../Template/Template";

import {
	List,
	Input,
	Row, Col,
	Space, Divider,
	Tag,
	Button } from "antd";
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';

import {
  SEARCH_IDEAS_QUERY
} from '../graphql';

const { Search } = Input;

function Idea_Search(props) {
	let history = useHistory();
	const search = props.location.search.split('?')[1];

	const { loading, error, data, refetch, subscribeToMore } = useQuery(SEARCH_IDEAS_QUERY, {
    variables: { str: search }
  });

	const onSearch = value => {
		if(value)
			return history.push("/search?" + value);
	};

	const accept_idea = (idea) => { console.log(idea); };

	// const test_idea = {
	// 	title: 'A pistol with thermite bullets',
	// 	topics: ['Physics', 'Chemistry'],
	// 	content: "I'm planning to make a pistol with the bullet contains thermite. I'm planning to make a pistol with the bullet contains thermite. I'm planning to make a pistol with the bullet contains thermite. I'm planning to make a pistol with the bullet contains thermite. I'm planning to make a pistol with the bullet contains thermite. ",
	// 	creator: 'MartianSheep@878787',
	// 	acceptors: ['Aqua@445', 'Admin@000'],
	// 	review_acceptors: ['Botan@446', 'Aqua@445'],
	// 	review_rejectors: ['wtf@001', 'hellyouspeaking@110'],
	// 	reviewed: true,
	// 	published: true
	// };
	// const result = [];
	// for(let i = 0; i < 20; i++)
	// 	result.push({...test_idea, id: i});

	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);

	if(search.length <= 3){
		return(
			<Template content={
				<Fragment>
					<div style={{
						fontSize: 24,
						textAlign: "center",
						padding: "25px"
					}}>
					  Search should be more than 3 characters
					</div>
					<Row>
						<Col span={8} offset={8}>
							<Search
								placeholder="Search for some ideas..."
								allowClear
								onSearch={onSearch}
								enterButton
								style={{
									textAlign: 'center',
									horizontalAlign: 'middle'
								}}
							/>
						</Col>
					</Row>
				</Fragment>
			} />
		);
	}

	return (
		<Template content={
			<List
				itemLayout="vertical"
				size="large"
				pagination={{
					onChange: page => {
						console.log(page);
					},
					pageSize: 5,
				}}
				dataSource={loading ? [] : error ? [] : data.get_ideas_by_title}
				renderItem={ item => (
					<List.Item
						key={item.id}
						actions={[
							<IconText icon={DownloadOutlined}
								text={item.acceptors.length} key="list-acceptors" />,
							<IconText icon={EyeOutlined}
								text={item.review_acceptors.length}
								key="list-reviewers" />,
							<Button type="primary"
								shape="round"
								size='default'
								onClick={() => accept_idea(item)}>
								Accept
							</Button>
						]}
					>
						<List.Item.Meta
							title={
								<Fragment>
									<NavLink to={"/idea/" + item.id}
											rel="noreferrer">
										{item.title}
									</NavLink>
									<Divider type="vertical" />
									{
										item.topics.map(topic =>(
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
								</Fragment>
							}
							description={item.description} />
						{
							item.content.length > 280 ? 
							(item.content.substr(0, 280) + '...') : 
							item.content
						}
					</List.Item>
				)}
			/>
		} />
	);
}

export default Idea_Search;