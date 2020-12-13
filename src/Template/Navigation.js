import 'antd/dist/antd.css';
import React, { Fragment } from 'react';

import { Menu, Input } from 'antd';
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
		EyeOutlined
	} from '@ant-design/icons';

const { Search } = Input;
const { SubMenu } = Menu;

function Navigation(props) {
	// popular topics should be called from db
	const PopularTopics = [
		{
			group: 'Physics',
			items: [
				'Astrophysics',
				'Acoustics',
				'Atmospheric Physics'
			]
		},
		{
			group: 'Chemistry',
			items: [
				'Atmospheric Chemistry',
				'Chemical Engineering'
			]
		}
	];

	const UserOptions = [
		{
			option: 'My Home Page',
			icon: <HomeOutlined />
		},
		{
			option: 'Settings',
			icon: <SettingFilled />
		},
		{
			option: 'My Ideas',
			icon: <BulbOutlined />
		},
		{
			option: 'interested Topics',
			icon: <BookOutlined />
		},
		{
			option: 'Ongoing Projects',
			icon: <ProjectFilled />
		}
	];
	if(props.revierer)
		UserOptions.push({option: 'My Reviews', icon: <EyeOutlined />});

	const Notifications = props.notifications;

	const onSearch = () => console.log("Search");

	return (
		<Menu mode="horizontal" theme="light">

			<Menu.Item
				key="home"
				icon={<HomeOutlined />}
				style={{ float: 'left' }}
			>
				<a
					href="https://ant.design"
					target="_blank"
					rel="noreferrer"
				>
					Home (antd)
				</a>
			</Menu.Item>

			<Menu.Item
				key="about"
				icon={<InfoCircleOutlined />}
				style={{ float: 'left' }}
			>
				About Us
			</Menu.Item>

			<SubMenu
				key="Topics"
				title="Topics"
				icon={<BulbOutlined />}
				style={{ float: 'left' }}
				onTitleClick={e => console.log("Topics")}
			>
			{
				PopularTopics.map(subject => (
						<Menu.ItemGroup title={subject.group}>
						{
							subject.items.map(subsubject => (
									<Menu.Item key={subsubject}>
										{subsubject}
									</Menu.Item>
								)
							)
						}
						</Menu.ItemGroup>
					)
				)
			}
			</SubMenu>

			<Menu.Item
				key="upload"
				icon={<UploadOutlined />}
				style={{ float: 'left' }}
			>
				Upload Ideas
			</Menu.Item>

			<Menu.Item
				key="review"
				icon={<EyeOutlined />}
				style={{ float: 'left' }}
			>
				Review Ideas
			</Menu.Item>

			{
				props.loggined ? (
					<Fragment>
						<SubMenu
							key="user"
							icon={<UserOutlined />}
							style={{ float: 'right' }}
							onTitleClick={e => console.log("user")}
						>
						{
							UserOptions.map(option => (
									<Menu.Item
										key={option.option}
										icon={option.icon}
									>
										{option.option}
									</Menu.Item>
								)
							)
						}
							<Menu.Divider />
							<Menu.Item key="logout" icon={<ExportOutlined />}>
								Logout
							</Menu.Item>
						</SubMenu>

						<SubMenu
							key="notifications"
							icon={<BellOutlined />}
							style={{ float: 'right' }}
							onTitleClick={e => console.log("notifications")}
						>
						{
							Notifications.length ?
							(
								Notifications.map(notification => (
										<Menu.Item
											key={notification.text}
											icon={notification.icon}
										>
											{notification.text}
										</Menu.Item>
									)
								)
							) :
							(
								<Menu.ItemGroup
									title="No Notifications!"
								/>
							)
						}
						</SubMenu>
					</Fragment>
				) : (
					<Fragment>
						<Menu.Item
							key="sign In"
							style={{ float: 'right' }}
						>
							Sign In
						</Menu.Item>

						<Menu.Item
							key="sign up"
							style={{ float: 'right' }}
						>
							Sign Up
						</Menu.Item>
					</Fragment>
				)
			}

			<Search
				placeholder="search ideas..."
				allowClear
				onSearch={onSearch}
				enterButton
				style={
					{
						margin: 16,
						width: 300,
						float: 'right'
					}
				}
			/>

		</Menu>
	);
}

export default Navigation;