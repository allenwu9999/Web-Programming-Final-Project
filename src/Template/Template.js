import 'antd/dist/antd.css';
import React, { useState, useRef, useEffect } from 'react';

import { Affix, Menu, Input } from 'antd';
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

const { SubMenu } = Menu;
const { Search } = Input;
// or use import HeaderSearch from 'ant-design-pro/lib/HeaderSearch'; (?)

function Template() {

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
		},
		{
			option: 'My Reviews',
			icon: <EyeOutlined />
		}
	];

	const Notification = [
	];

	return (
		<Affix offsetTop={0}>
			<Menu mode="horizontal">

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

				<SubMenu
					key="user"
					icon={<UserOutlined />}
					style={{ float: 'right' }}
					onTitleClick={e => console.log("user")}
				>
				{
					UserOptions.map(option => (
							<Menu.Item key={option.option} icon={option.icon}>
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
					Notification.length ?
					(
						Notification.map(notification => (
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

				<Search
					placeholder="search topics..."
					allowClear
					onSearch={() => console.log("Search")}
					enterButton
					style={{ width: 300, margin: 8, float: 'right'}}
				/>

				<Menu.Item
					key="review"
					icon={<EyeOutlined />}
					style={{ float: 'right' }}
				>
					Review Ideas
				</Menu.Item>

				<Menu.Item
					key="upload"
					icon={<UploadOutlined />}
					style={{ float: 'right' }}
				>
					Upload Ideas
				</Menu.Item>

				<SubMenu
					key="Topics"
					title="Topics"
					icon={<BulbOutlined />}
					style={{ float: 'right' }}
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
					key="about"
					icon={<InfoCircleOutlined />}
					style={{ float: 'right' }}
				>
					About Us
				</Menu.Item>

			</Menu>
		</Affix>
	);
}

export default Template;
