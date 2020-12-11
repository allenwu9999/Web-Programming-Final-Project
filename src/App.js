// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import React, { useState, useRef, useEffect } from 'react';
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

function App() {
	// const [ current_menu, set_current_menu ] = useState(null);

	// const handleClick = (e) => set_current_menu(e.key);

	return (
		<Menu
			// onClick={handleClick}
			// selectedKeys={[current_menu]}
			mode="horizontal"
		>
			<Menu.Item key="mail" icon={<HomeOutlined />}>
				<a href="https://ant.design" target="_blank" rel="noopener noreferrer">
					Home (antd)
				</a>
			</Menu.Item>
			<Menu.Item key="app" disabled>
				Navigation: disabled
			</Menu.Item>
			<SubMenu
				key="SubMenu"
				title="Navigation Three - Submenu"
			>
				<Menu.ItemGroup title="Item 1">
					<Menu.Item key="setting:1" onClick={() => console.log("Setting 1")}>
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
		</Menu>
	);
}

export default App;
