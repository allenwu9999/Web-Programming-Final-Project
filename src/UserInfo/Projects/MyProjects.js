import "antd/dist/antd.css";
import React, { useState, Fragment } from "react";
import Template from "../../Template/Template";
import IdeaCard from "../../Template/IdeaCard";
import { BulbOutlined } from "@ant-design/icons";
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
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
function MyProjects() {
	const Groups = [
		{ name: "All", key: "1" },
		{ name: "Academic", key: "2" },
		{ name: "Sports", key: "3" },
		{ name: "Music", key: "4" },
	];
	const [Ideas, setIdeas] = useState([
		{
			id: "000",
			creator: "Allen@001",
			group: "Academic",
			title: "fuck",
			content: "fuck2021",
			reviewerNum: 20,
			votedReviewerNum: 10,
			agreedReviewerNum: 5,
			acceptors: 1,
			deadline: "2021/01/19 18:04:03",
		},
		{
			id: "000",
			creator: "Allen@001",
			group: "Sports",
			title: "fuck",
			content: "fuck2021",
			reviewerNum: 10,
			votedReviewerNum: 4,
			agreedReviewerNum: 1,
			acceptors: 2,
			deadline: "2021/01/19 18:04:03",
		},
		{
			id: "000",
			creator: "Allen@001",
			group: "Academic",
			title: "fuck",
			content: "fuck you",
			reviewerNum: 20,
			votedReviewerNum: 15,
			agreedReviewerNum: 9,
			acceptors: 3,
			deadline: "2021/10/19 18:04:03",
		},
		{
			id: "000",
			creator: "Allen@001",
			group: "Academic",
			title: "fuck",
			content: "fuck you",
			reviewerNum: 20,
			votedReviewerNum: 18,
			agreedReviewerNum: 3,
			acceptors: 4,
			deadline: "2021/10/19 18:04:03",
		},
	]);
	function handleChangeValue(value) {
		console.log(value);
	}
	function handleChange(value) {
		if (value === "time") {
			const newIdeas = Ideas.sort(function (a, b) {
				if (a.deadline < b.deadline) {
					return -1;
				} else if (a.deadline > b.deadline) {
					return 1;
				}
				return 0;
			});
			setIdeas([...newIdeas]);
		} else if (value === "acceptors") {
			const newIdeas = Ideas.sort(function (a, b) {
				if (a.acceptors < b.acceptors) {
					return -1;
				} else if (a.acceptors > b.acceptors) {
					return 1;
				}
				return 0;
			});
			setIdeas([...newIdeas]);
		}
	}
	function changeTabs() {
		console.log("tabs have been changed");
	}
	const Render = (
		<Fragment>
			<Title>My Projects</Title>
			<Divider />
			{Ideas.length ? (
				<Tabs>
					{Groups.map((group) =>
						group.key === "1" ? (
							<TabPane
								tab={
									<span>
										<BulbOutlined />
										{group.name}
									</span>
								}
								key={group.key}
								onChange={changeTabs}
							>
								<Text>Sorted by : </Text>
								<Select style={{ width: 200 }} onChange={handleChange}>
									<Option value="time">Time</Option>
									<Option value="acceptors">Idea Acceptors</Option>
								</Select>
								<div style={{ height: 40 }}></div>
								<Fragment>
									{Ideas.map((idea) => (
										<Fragment>
											<Row>
												<Col span={8}>
													<IdeaCard idea={idea} />
												</Col>
											</Row>
											<Divider />
										</Fragment>
									))}
								</Fragment>
							</TabPane>
						) : (
							<TabPane tab={group.name} key={group.key}>
								<Text>Sorted by : </Text>
								<Select style={{ width: 200 }} onChange={handleChange}>
									<Option value="time">Time</Option>
									<Option value="acceptors">Idea Acceptors</Option>
								</Select>
								<div style={{ height: 40 }}></div>
								{Ideas.map((idea) =>
									group.name === idea.group ? (
										<Fragment>
											<Row>
												<Col span={8}>
													<IdeaCard idea={idea} />
												</Col>
											</Row>
											<Divider />
										</Fragment>
									) : (
										<Fragment></Fragment>
									)
								)}
							</TabPane>
						)
					)}
				</Tabs>
			) : (
				<Fragment>
					<Empty
						description={<span style={{ fontSize: 30 }}>No Projects yet</span>}
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

export default MyProjects;