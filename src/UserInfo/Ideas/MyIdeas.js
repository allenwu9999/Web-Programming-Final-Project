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
function MyIdeas() {
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
		} else if (value === "votedPer") {
			const newIdeas = Ideas.sort(function (a, b) {
				return (
					b.votedReviewerNum / b.reviewerNum -
					a.votedReviewerNum / a.reviewerNum
				);
			});
			setIdeas([...newIdeas]);
		} else if (value === "agreedPer") {
			const newIdeas = Ideas.sort(function (a, b) {
				return (
					b.agreedReviewerNum / b.votedReviewerNum -
					a.agreedReviewerNum / a.votedReviewerNum
				);
			});
			setIdeas([...newIdeas]);
		}
	}
	function changeTabs() {
		console.log("tabs have been changed");
	}
	const Render = (
		<Fragment>
			<Title>My Ideas</Title>
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
									<Option value="votedPer">Voted Percentage</Option>
									<Option value="agreedPer">Agreed Percentage</Option>
								</Select>
								<div style={{ height: 40 }}></div>
								<Fragment>
									{Ideas.map((idea) => (
										<Fragment>
											<Row>
												<Col span={5} offset={1}>
													<Row>
														<Col span={18} offset={0}>
															<Statistic
																title="End Time"
																value={idea.deadline}
															/>
														</Col>
														<Col offset={0} span={4}>
															<Statistic
																title="Passed"
																value={
																	idea.votedReviewerNum / idea.reviewerNum >=
																		0.5 &&
																	idea.agreedReviewerNum /
																		idea.votedReviewerNum >=
																		0.5
																		? "Yes"
																		: "No"
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
																percent={Math.floor(
																	(100 * idea.votedReviewerNum) /
																		idea.reviewerNum
																)}
																width={100}
															/>
														</Col>
														<Col offset={6} span={8}>
															<Title level={5} align="center">
																Agreed
															</Title>
															<Progress
																type="circle"
																percent={Math.floor(
																	(100 * idea.agreedReviewerNum) /
																		idea.votedReviewerNum
																)}
																width={100}
															/>
														</Col>
													</Row>
												</Col>
												<Col span={8} offset={2}>
													<IdeaCard idea={idea}
														show_creator={false} />
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
									<Option value="votedPer">Voted Percentage</Option>
									<Option value="agreedPer">Agreed Percentage</Option>
								</Select>
								<div style={{ height: 40 }}></div>
								{Ideas.map((idea) =>
									group.name === idea.group ? (
										<Fragment>
											<Row>
												<Col span={5} offset={1}>
													<Row>
														<Col span={18} offset={0}>
															<Statistic
																title="End Time"
																value={idea.deadline}
															/>
														</Col>
														<Col offset={0} span={4}>
															<Statistic
																title="Passed"
																value={
																	idea.votedReviewerNum / idea.reviewerNum >=
																		0.5 &&
																	idea.agreedReviewerNum /
																		idea.votedReviewerNum >=
																		0.5
																		? "Yes"
																		: "No"
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
																percent={Math.floor(
																	(100 * idea.votedReviewerNum) /
																		idea.reviewerNum
																)}
																width={100}
															/>
														</Col>
														<Col offset={6} span={8}>
															<Title level={5} align="center">
																Agreed
															</Title>
															<Progress
																type="circle"
																percent={Math.floor(
																	(100 * idea.agreedReviewerNum) /
																		idea.votedReviewerNum
																)}
																width={100}
															/>
														</Col>
													</Row>
												</Col>
												<Col span={8} offset={2}>
													<IdeaCard idea={idea}
														show_creator={false} />
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
						description={<span style={{ fontSize: 30 }}>No ideas yet</span>}
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

export default MyIdeas;