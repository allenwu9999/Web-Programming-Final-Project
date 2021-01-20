import "antd/dist/antd.css";
import React, { useState, Fragment } from "react";
import Template from "../../Template/Template";
import IdeaCard from "../../Template/IdeaCard";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
	Typography,
	Divider,
	Row,
	Col,
	Empty,
	Button,
	Card,
	Cascader,
	message,
} from "antd";

const { Title } = Typography;
function MyTopics() {
	const [topicsShown, setTopicsShown] = useState([
		"Baseball",
		"Math",
		"Piano",
		"Violin",
	]);
	const addOptions = [
		{
			value: "Academic",
			label: "Academic",
			children: [
				{ value: "Math", label: "Math" },
				{ value: "Physics", label: "Physics" },
				{ value: "Chemistry", label: "Chemistry" },
			],
		},
		{
			value: "Sports",
			label: "Sports",
			children: [
				{ value: "Baseball", label: "Baseball" },
				{ value: "Volleyball", label: "Volleyball" },
				{ value: "Badminton", label: "Badminton" },
			],
		},
		{
			value: "Music",
			label: "Music",
			children: [
				{ value: "Piano", label: "Piano" },
				{ value: "Violin", label: "Violin" },
				{ value: "Drum", label: "Drum" },
			],
		},
	];
	const Ideas = [
		{
			id: '006',
			creator: "Dao@001",
			group: "Sports",
			topic: "Baseball",
			title: "fuck",
			content: "fuck2021",
			reviewerNum: 20,
			votedReviewerNum: 10,
			agreedReviewerNum: 5,
			deadline: "2021/01/19 18:04:03",
		},
		{
			id: '006',
			creator: "Dao@001",
			group: "Sports",
			topic: "Baseball",
			title: "fuck",
			content: "fuck2021",
			reviewerNum: 10,
			votedReviewerNum: 4,
			agreedReviewerNum: 1,
			deadline: "2021/01/19 18:04:03",
		},
		{
			id: '006',
			creator: "Dao@001",
			group: "Sports",
			topic: "Baseball",
			title: "fuck",
			content: "fuck you",
			reviewerNum: 20,
			votedReviewerNum: 15,
			agreedReviewerNum: 9,
			deadline: "2021/10/19 18:04:03",
		},
		{
			id: '006',
			creator: "Dao@001",
			group: "Academic",
			topic: "Math",
			title: "Violin",
			content: "fuck you",
			reviewerNum: 20,
			votedReviewerNum: 15,
			agreedReviewerNum: 9,
			deadline: "2021/10/19 18:04:03",
		},
	];
	function onChange(value) {
		if (value[1] !== undefined) {
			if (topicsShown.find((ele) => ele === value[1]) !== undefined) {
				console.log("this is added");
				message.error("This topic has been added.");
				return;
			}
			const newEle = [value[1]];
			setTopicsShown([...newEle, ...topicsShown]);
			console.log(topicsShown);
		}
	}
	function displayRender(label) {
		return label[label.length - 1];
	}
	function deleteTopic(topic) {
		var newArray = topicsShown;
		var index = topicsShown.indexOf(topic);
		newArray[index] = "Undefined";
		setTopicsShown([...newArray]);
		console.log(newArray);
		console.log("delete");
		console.log(topic);
	}
	const Render = (
		<Fragment>
			<Title>My Interested Topics</Title>
			<Divider />
			<Row justify="center" gutter={24}>
				<Col>
					<Title level={3}>Add Topics</Title>
				</Col>
				<Col>
					<Cascader
						options={addOptions}
						onChange={onChange}
						placeholder="Add a topic..."
						displayRender={displayRender}
						size="large"
					></Cascader>
				</Col>
			</Row>
			<div style={{ height: 20 }}></div>
			{topicsShown.length ? (
				<Fragment>
					{topicsShown.map((topic) =>
						topic === "Undefined" ? (
							<Fragment></Fragment>
						) : (
							<Fragment>
								<Card
									title={
										<Row>
											<Col span={12}>{topic}</Col>
											<Col offset={11} span={1}>
												<Button
													icon={<DeleteOutlined />}
													size="large"
													onClick={() => deleteTopic(topic)}
													danger
												/>
											</Col>
										</Row>
									}
									style={{ width: "90%" }}
									bordered={true}
									headStyle={{
										backgroundColor: "#bfd4db",
										fontSize: 25,
									}}
									bodyStyle={{
										backgroundColor: "#ededed",
									}}
								>
									<Row gutter={24}>
										{Ideas.filter((ideas) => ideas.topic === topic).map(
											(idea) => (
												<Col span={8}>
													<IdeaCard idea={idea} />
												</Col>
											)
										)}
									</Row>
								</Card>
								<Divider />
							</Fragment>
						)
					)}
				</Fragment>
			) : (
				<Empty
					description={<span style={{ fontSize: 30 }}>No topics yet</span>}
					imageStyle={{ height: 250 }}
				>
					<Button size="large" icon={<PlusOutlined />}>
						Add One
					</Button>
				</Empty>
			)}
		</Fragment>
	);
	return <Template content={Render} />;
}

export default MyTopics;