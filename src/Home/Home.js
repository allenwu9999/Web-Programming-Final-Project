import 'antd/dist/antd.css';
import React from 'react';
import { Fragment } from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

import Template from '../Template/Template';

import { Carousel, Button } from 'antd';
import { Card, Col, Row, List } from 'antd';
import { BulbTwoTone,
		GlobalOutlined,
		RocketTwoTone } from '@ant-design/icons';

function Home() {
	const Height = window.innerHeight - 114;
	const main_color = '#1890FF';

	const CarouselContentContainerStyle = {
		height: Height,
		color: '#000000',
		// lineHeight: '160px',
		// textAlign: 'center',
		background: '#E0E0E0',
		// float: 'right',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};

	const CarouselContentStyle = {
		display: 'block',
		marginTop: 'auto',
		marginBottom: 'auto',
		fontFamily: 'Courier New, monospace',
		fontSize: '40px',
		fontWeight: 'bold',
		textAlign: 'right'
	};

	const CarouselPicContainerStyle = {
		height: Height,
		float: 'left',
		width: window.innerWidth/2,
	};

	const CarouselPicStyle = {
		fontSize: Height-50,
		color: main_color,
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
	};

	const CarouselWrapper = styled(Carousel)`
		> .slick-dots li button {
			background: black;
			opacity: 0.4;
		}
		> .slick-dots li.slick-active button {
			background: black;
			opacity: 0.9;
		}
	`;

	const get_started_button = (
		<Button type="primary" size="large">
			<NavLink to="/sign-up" rel="noreferrer">
				Get Started
			</NavLink>
		</Button>
	);

	const more_link = (
		<Button type="primary" size="small">
			<NavLink to="/sign-up" rel="noreferrer">
				See More...
			</NavLink>
		</Button>
	);

	const popular_ideas = [
		{
			title: 'Title1',
			content: 'Content1'
		},
		{
			title: 'Title2',
			content: 'Content2'
		},
		{
			title: 'Title3',
			content: 'Content3'
		}
	]; // Top 3

	const explore_topics = [
		{
			topic: 'Academic',
			subtopic: [
				'Math',
				'Physics',
				'Chemistry',
				'Informatics',
				'English'
			]
		},
		{
			topic: 'Sports',
			subtopic: [
				'Basketball',
				'Baseball',
				'Volleyball',
				'Table tennis',
				'Badminton'
			]
		},
		{
			topic: 'Music',
			subtopic: [
				'Piano',
				'Violin',
				'Oboe',
				'Guitar',
				'Drum'
			]
		}
	]; // Top 3

	return(
		<Template content={
			<Fragment>
				<CarouselWrapper autoplay
						autoplaySpeed={5000}
						pauseOnHover={false}
						pauseOnDotsHover
						pauseOnFocus
						swipeToSlide
						dots={false}
						effect='fade'>
					<div>
						<div style={CarouselPicContainerStyle}>
							<BulbTwoTone
								style={CarouselPicStyle}
								twoToneColor={main_color}
							/>
						</div>
						<div style={CarouselContentContainerStyle}>
							<div style={CarouselContentStyle}>
								For the Dreamers,
								<br/>
								For the Makers.
								<br/>
								{get_started_button}
							</div>
						</div>
					</div>
					<div>
						<div style={CarouselPicContainerStyle}>
							<GlobalOutlined
								style={CarouselPicStyle}
							/>
						</div>
						<div style={CarouselContentContainerStyle}>
							<div style={CarouselContentStyle}>
								Share Your Ideas,
								<br/>
								With the World.
								<br/>
								{get_started_button}
							</div>
						</div>
					</div>
					<div>
						<div style={CarouselPicContainerStyle}>
							<RocketTwoTone
								style={CarouselPicStyle}
								twoToneColor={main_color}
							/>
						</div>
						<div style={CarouselContentContainerStyle}>
							<div style={CarouselContentStyle}>
								Grab Some Ideas,
								<br/>
								Implement Future.
								<br/>
								{get_started_button}
							</div>
						</div>
					</div>
				</CarouselWrapper>

				<div style={{padding: '50px', height: Height}}>
					<h1 style={{padding: '25px'}}>
						Popular Ideas
					</h1>
					<Row gutter={16}>
						{
							popular_ideas.map(idea => (
								<Col span={8}>
									<Card title={idea.title} bordered={true}>
										<div style={{height: '200px'}}>
											{idea.content}
										</div>
										<div style={{float: 'right'}}>
											{more_link}
										</div>
									</Card>
								</Col>
							))
						}
					</Row>
				</div>

				<div style={{padding: '50px', height: Height}}>
					<h1 style={{padding: '25px'}}>
						Explore Topics
					</h1>
					<Row gutter={16}>
						{
							explore_topics.map(topic => (
								<Col span={8}>
									<List
										size="large"
										header={
											<div style={{fontSize: '20px'}}>
												<NavLink to="/topic"
														rel="noreferrer"
														style={{color: 'black'}}
														activeStyle={{color: 'black'}}
												>
													{topic.topic}
												</NavLink>
											</div>
										}
										dataSource={topic.subtopic}
										renderItem={item => 
											<List.Item style={{fontSize: '15px'}}>
												<NavLink to="/subtopic"
														rel="noreferrer"
														style={{color: 'black'}}
														activeStyle={{color: 'black'}}
												>
													{item}
												</NavLink>
											</List.Item>
										}
									/>
								</Col>
							))
						}
					</Row>
				</div>
			</Fragment>
		} />
	);
}

export default Home;