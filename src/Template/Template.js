import 'antd/dist/antd.css';
import React, { useState, useRef, useEffect } from 'react';

import { Layout, Affix, Menu, Input, Breadcrumb } from 'antd';
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
const { Header, Content, Footer } = Layout;

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
		<Layout>
			<Header style={
				{ position: 'fixed', width: '100%', backgroundColor: '#FFFFFF' }
			}
			>
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
						style={
							{
								margin: 16,
								width: 300,
								float: 'right'
							}
						}
					/>

				</Menu>
			</Header>
			
			<Content style={{ padding: '0 50px', marginTop: 64 }}>
				<Breadcrumb style={{ marginTop: '16px' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: 24, minHeight: 500 }}>
					Content
				</div>
			</Content>

			<Footer style={{ textAlign: 'center' }}>
				Ant Design ©2018 Created by Ant UED
			</Footer>
		</Layout>
	);
}

export default Template;