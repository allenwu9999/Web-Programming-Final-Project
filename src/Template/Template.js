import 'antd/dist/antd.css';
import React from 'react';

import { Layout, Breadcrumb } from 'antd';

import Navigation from './Navigation';

const { Header, Content, Footer } = Layout;

function Template(props) {

	// should get from user db
	const Notifications = [
	];

	return (
		<Layout>
			<Header style={{
				position: 'fixed',
				width: '100%',
				backgroundColor: '#FFFFFF'
			}}
			>
				{
					<Navigation
						loggined={false}
						reviewer={true}
						notifications={Notifications}
					/>
				}
			</Header>
			
			<Content style={{
				padding: '0 50px',
				marginTop: 64
			}}>
				<Breadcrumb style={{ marginTop: '16px' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: 24, minHeight: 500 }}>
					{props.content}
				</div>
			</Content>

			<Footer style={{
				textAlign: 'center',
				backgroundColor: '#000000',
				color: '#FFFFFF'
			}}>
				Ideas Republica <span style={{
					display: 'inline-block',
					transform: 'rotateY(180deg)'
				}}>
					&copy;
				</span> 2020
			</Footer>
		</Layout>
	);
}

export default Template;