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
		InfoCircleOutlined
	} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Search } = Input;
// or use import HeaderSearch from 'ant-design-pro/lib/HeaderSearch'; (?)

function Template() {
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
				>
					<Menu.ItemGroup title="Item 1">
						<Menu.Item key="setting:1">
							Option 1
						</Menu.Item>
						<Menu.Item key="setting:2">
							Option 2
						</Menu.Item>
					</Menu.ItemGroup>
					<Menu.ItemGroup title="Item 2">
						<Menu.Item key="setting:3">Option 3</Menu.Item>
						<Menu.Item key="setting:4">Option 4</Menu.Item>
					</Menu.ItemGroup>
				</SubMenu>

				<Menu.Item
					key="upload"
					icon={<UploadOutlined />}
					style={{ float: 'left' }}
				>
					Upload Ideas
				</Menu.Item>

				<SubMenu
					key="user"
					icon={<UserOutlined />}
					style={{ float: 'right' }}
				>
					<Menu.Item key="settings" icon={<SettingFilled />}>
						Settings
					</Menu.Item>
				</SubMenu>

				<Menu.Item
					key="notifications"
					icon={<BellOutlined />}
					style={{ float: 'right' }}
				/>

				<Search
					placeholder="search topics..."
					allowClear
					onSearch={() => console.log("Search")}
					enterButton
					style={{ width: 200, margin: 8, float: 'right'}}
				/>

			</Menu>
		</Affix>
	);
}

export default Template;
