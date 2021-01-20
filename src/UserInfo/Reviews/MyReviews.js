import "antd/dist/antd.css";
import React, { useState, Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import Template from "../../Template/Template";
import IdeaCardByID from "../../Template/IdeaCardByID";

import Cookies from 'js-cookie';

import {
	Typography,
	Divider,
	Tabs,
	Select,
	Button,
	Row,
	Col,
	Empty,
	Statistic,
	Progress,
} from "antd";
import { BulbOutlined } from "@ant-design/icons";

import {
	GET_USER_BY_EMAIL,
	TOPICS_QUERY,
} from '../../graphql';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

function MyReviews(props) {
	let history = useHistory();
	const email = Cookies.get('IdeaRep_user_email');
	const topics = useQuery(TOPICS_QUERY);
	const userdata = useQuery(GET_USER_BY_EMAIL, {
		variables: { email: email }
	});

	const [Ideas, setIdeas] = useState([]);

	if(topics.loading || userdata.loading)
		return <Template content="Loading..." />;
	if(topics.error || userdata.error)
		return <Template content="Error..." />;
	if(!topics.data || !userdata.data)
		return <Template content="No data..." />;

	if(userdata.data.get_user_by_email[0] === undefined){
		history.push('/sign-in');
		return <Template content="" />;
	}
	const user = userdata.data.get_user_by_email[0];

	let Groups = topics.data.get_topics.map((Topic, index) => ({
		name: Topic.name,
		key: (index+2).toString(),
	}));
	Groups = [{ name: "All", key: "1" }, ...Groups];
	let Group_dict = {};
	topics.data.get_topics.forEach((Topic) => {
		Group_dict[Topic.name] = [...Topic.subtopics]
	});
	console.log(Group_dict);

	const handleChange = (value) => {
		if (value === "time") {
			const newIdeas = Ideas.sort(function (a, b) {
				if (a.expire_time < b.expire_time) {
					return -1;
				} else if (a.expire_time > b.expire_time) {
					return 1;
				}
				return 0;
			});
			setIdeas([...newIdeas]);
		} else if (value === "votedPer") {
			const newIdeas = Ideas.sort(function (a, b) {
				return (
					(b.review_acceptors.length + b.review_rejectors.length) / b.num_reviewers -
					(a.review_acceptors.length + a.review_rejectors.length) / a.num_reviewers
				);
			});
			setIdeas([...newIdeas]);
		} else if (value === "agreedPer") {
			const newIdeas = Ideas.sort(function (a, b) {
				return (
					b.review_acceptors.length / b.num_reviewers -
					a.review_acceptors.length / a.num_reviewers
				);
			});
			setIdeas([...newIdeas]);
		}
	}
	function changeTabs() {
		console.log("tabs have been changed");
	}

	const group_tabpane_1 = (group) => (
		<TabPane
			tab={
				<span>
					<BulbOutlined />
					{group.name}
				</span>
			}
			key={group.key}
			onChange={changeTabs}>
			<Text>Sorted by : </Text>
			<Select style={{ width: 200 }} onChange={handleChange}>
				<Option value="time">Time</Option>
				<Option value="votedPer">Voted Percentage</Option>
				<Option value="agreedPer">Agreed Percentage</Option>
			</Select>
			<div style={{ height: 40 }}></div>
			<Fragment>
			{
				Ideas.map((idea) => (
					<Fragment>
						<Row>
							<Col span={5} offset={1}>
								<Row>
									<Col span={18} offset={0}>
										<Statistic
											title="End Time"
											value={idea.expire_time}
										/>
									</Col>
									<Col offset={0} span={4}>
										<Statistic
											title="Passed"
											value={
												(idea.review_acceptors.length +
												idea.review_rejectors.length) /
												idea.num_reviewers >= 0.5 &&
												idea.review_acceptors.length /
												idea.num_reviewers >=
												0.5
												? "Yes" : "No"
											}
										/>
									</Col>
								</Row>
								<div style={{ height: 20 }}></div>
								<Row>
									<Col span={8} offset={2}>
										<Title level={5} align="center">
											Voted
										</Title>
										<Progress
											type="circle"
											percent={Math.floor((100 * (idea.review_acceptors.length + idea.review_rejectors.length)/idea.num_reviewers))}
											width={100}
										/>
									</Col>
									<Col offset={6} span={8}>
										<Title level={5} align="center">
											Agreed
										</Title>
										<Progress
											type="circle"
											percent={Math.floor((100 * idea.review_acceptors.length)/idea.idea.num_reviewers)}
											width={100}
										/>
									</Col>
								</Row>
							</Col>
							<Col span={8} offset={2}>
								<IdeaCardByID id={idea._id} />
							</Col>
						</Row>
						<Divider />
					</Fragment>
				))
			}
			</Fragment>
		</TabPane>
	);

	const group_tabpane_n = (group) => (
		<TabPane tab={group.name} key={group.key}>
			<Text>Sorted by : </Text>
			<Select style={{ width: 200 }} onChange={handleChange}>
				<Option value="time">Time</Option>
				<Option value="votedPer">Voted Percentage</Option>
				<Option value="agreedPer">Agreed Percentage</Option>
			</Select>
			<div style={{ height: 40 }}></div>
			{Ideas.map((idea) =>
				Group_dict[group.name].includes(idea.topics) ? (
					<Fragment>
						<Row>
							<Col span={5} offset={1}>
								<Row>
									<Col span={18} offset={0}>
										<Statistic
											title="End Time"
											value={idea.expire_time}
										/>
									</Col>
									<Col offset={0} span={4}>
										<Statistic
											title="Passed"
											value={
												(idea.review_acceptors.length + idea.review_rejectors.length) / idea.num_reviewers >= 0.5 &&
												idea.review_acceptors.length / idea.num_reviewers >= 0.5
												? "Yes" : "No"
											}
										/>
									</Col>
								</Row>
								<div style={{ height: 20 }}></div>
								<Row>
									<Col span={8} offset={2}>
										<Title level={5} align="center">
											Voted
										</Title>
										<Progress
											type="circle"
											percent={Math.floor((100 * (idea.review_acceptors.length + idea.review_rejectors.length)) / idea.num_reviewers)}
											width={100}
										/>
									</Col>
									<Col offset={6} span={8}>
										<Title level={5} align="center">
											Agreed
										</Title>
										<Progress
											type="circle"
											percent={Math.floor((100 * idea.review_acceptors.length) / idea.num_reviewers)}
											width={100}
										/>
									</Col>
								</Row>
							</Col>
							<Col span={8} offset={2}>
							<IdeaCardByID id={idea._id} />
							</Col>
						</Row>
						<Divider />
					</Fragment>
				) : <Fragment></Fragment>
			)}
		</TabPane>
	);

	const Render = (
		<Fragment>
			<Title>My Reviews</Title>
			<Divider />
			{Ideas.length ? (
				<Tabs>
					{Groups.map((group) =>
						group.key === "1" ?
						group_tabpane_1(group) : group_tabpane_n(group)
					)}
				</Tabs>
			) : (
				<Fragment>
					<Empty
						description={
							<span style={{ fontSize: 30 }}>
								No reviews yet
							</span>
						}
						imageStyle={{ height: 250 }}
					>
						<Button type="primary" size="large">
							Create Now
						</Button>
					</Empty>
				</Fragment>
			)}
		</Fragment>
	);
	return <Template content={Render} />;
}

export default MyReviews;