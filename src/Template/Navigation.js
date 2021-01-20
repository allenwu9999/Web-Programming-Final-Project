import "antd/dist/antd.css";
import React, { Fragment, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Menu, Input } from "antd";
import {
	HomeOutlined,
	BulbOutlined,
	UploadOutlined,
	BellOutlined,
	UserOutlined,
	SettingFilled,
	InfoCircleOutlined,
	ExportOutlined,
	BookOutlined,
	ProjectFilled,
	EyeOutlined,
} from "@ant-design/icons";

import {
	POP_TOPICS_QUERY
} from '../graphql';

const { Search } = Input;
const { SubMenu } = Menu;

function Navigation(props) {
	let history = useHistory();

	const onLogout = props.onLogout;

	const { loading, error, data, refetch, subscribeToMore } = useQuery(POP_TOPICS_QUERY);

	// popular topics should be called from db
	// let PopularTopics = [
	//   {
	//     group: "Physics",
	//     items: ["Astrophysics", "Acoustics", "Atmospheric Physics"],
	//   },
	//   {
	//     group: "Chemistry",
	//     items: ["Atmospheric Chemistry", "Chemical Engineering"],
	//   },
	// ];


	const UserOptions = [
		{
			option: "My Home Page",
			icon: <HomeOutlined />,
			link: "/my-home",
		},
		{
			option: "Settings",
			icon: <SettingFilled />,
			link: "/my-settings",
		},
		{
			option: "My Ideas",
			icon: <BulbOutlined />,
			link: "/my-ideas",
		},
		{
			option: "Interested Topics",
			icon: <BookOutlined />,
			link: "/my-interested-topics",
		},
		{
			option: "Ongoing Projects",
			icon: <ProjectFilled />,
			link: "/my-projects",
		},
	];
	if (props.reviewer)
		UserOptions.push({
			option: "My Reviews",
			icon: <EyeOutlined />,
			link: "/my-reviews"
		});

	const Notifications = props.notifications;

	const onSearch = value => {
		if(value)
			return history.push("/search?" + value);
	};

	return (
		<Menu mode="horizontal" theme="dark" style={{ height: 64 }}>
			<Menu.Item key="home" icon={<HomeOutlined />} style={{ float: "left" }}>
				<NavLink to="/" rel="noreferrer">
					Home
				</NavLink>
			</Menu.Item>

			<Menu.Item
				key="about"
				icon={<InfoCircleOutlined />}
				style={{ float: "left" }}
			>
				<NavLink to="/about" rel="noreferrer">
					About
				</NavLink>
			</Menu.Item>

			<SubMenu
				key="Topics"
				title="Topics"
				icon={<BulbOutlined />}
				style={{ float: "left" }}
				onTitleClick={(e) => history.push("/topics")}
			>
				{loading ? (<p style={{ color: '#ccc' }}>Loading...</p>)
				 : error ? (<p style={{ color: '#ccc' }}>Error...</p>)
				 : (data.get_popular_topics.map((subject) => (
					<Menu.ItemGroup title={subject.group}>
						{subject.items.map((subsubject) => (
							<Menu.Item key={subsubject}>
								<NavLink to={"/topics/"+subsubject} rel="noreferrer">
									{subsubject}
								</NavLink>
							</Menu.Item>
						))}
					</Menu.ItemGroup>
				)))}
			</SubMenu>

			<Menu.Item
				key="upload"
				icon={<UploadOutlined />}
				style={{ float: "left" }}
			>
				<NavLink to="/upload" rel="noreferrer">
					Upload Ideas
				</NavLink>
			</Menu.Item>

			<Menu.Item key="review" icon={<EyeOutlined />} style={{ float: "left" }}>
				<NavLink to="/review" rel="noreferrer">
					Review Ideas
				</NavLink>
			</Menu.Item>

			{props.loggined ? (
				<Fragment>
					<SubMenu
						key="user"
						icon={<UserOutlined />}
						style={{ float: "right" }}
						onTitleClick={(e) => console.log("user")}
					>
						{UserOptions.map((option) => (
							<Menu.Item key={option.option} icon={option.icon}>
								<NavLink to={option.link} rel="noreferrer">
									{option.option}
								</NavLink>
							</Menu.Item>
						))}
						<Menu.Divider />
						<Menu.Item key="logout" icon={<ExportOutlined />}
							onClick={onLogout}>
							Logout
						</Menu.Item>
					</SubMenu>

					<SubMenu
						key="notifications"
						icon={<BellOutlined />}
						style={{ float: "right" }}
						onTitleClick={(e) => console.log("notifications")}
					>
						{Notifications.length ? (
							Notifications.map((notification) => (
								<Menu.Item key={notification.text}
											icon={notification.icon}>
									<NavLink to={"/idea/" + notification.idea_id}
											rel="noreferrer">
										{notification.text}
									</NavLink>
								</Menu.Item>
							))
						) : (
							<Menu.ItemGroup title="No Notifications!" />
						)}
					</SubMenu>
				</Fragment>
			) : (
				<Fragment>
					<Menu.Item key="sign In" style={{ float: "right" }}>
						<NavLink to="/sign-in" rel="noreferrer">
							Sign In
						</NavLink>
					</Menu.Item>

					<Menu.Item key="sign up" style={{ float: "right" }}>
						<NavLink to="/sign-up" rel="noreferrer">
							Sign Up
						</NavLink>
					</Menu.Item>
				</Fragment>
			)}

			<Search
				placeholder="search ideas..."
				allowClear
				onSearch={onSearch}
				enterButton
				style={{
					margin: 16,
					width: 300,
					float: "right",
				}}
			/>
		</Menu>
	);
}

export default Navigation;
