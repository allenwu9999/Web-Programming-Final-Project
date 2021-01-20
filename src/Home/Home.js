import 'antd/dist/antd.css';
import React, { Fragment, useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

import Template from '../Template/Template';
import IdeaCard from '../Template/IdeaCard';

import Cookies from 'js-cookie';

import { Carousel, Button } from 'antd';
import { Col, Row, List } from 'antd';
import { BulbTwoTone,
		GlobalOutlined,
		RocketTwoTone } from '@ant-design/icons';

import { useQuery } from '@apollo/react-hooks';
import {
  EXPLORE_TOPICS_QUERY,
  POP_IDEAS_QUERY
} from '../graphql';

function Home() {
	const Height = window.innerHeight - 114;
	const main_color = '#1890FF';

	const { loading, error, data, refetch, subscribeToMore } = useQuery(EXPLORE_TOPICS_QUERY)
	const pop_ideas = useQuery(POP_IDEAS_QUERY)

	const CarouselContentContainerStyle = {
		height: Height,
		color: '#000000',
		// textAlign: 'center',
		background: '#FFFFFF',
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

	// const popular_ideas = [
	// 	{
	// 		id: '000',
	// 		title: 'Title1',
	// 		content: 'Content1'
	// 	},
	// 	{
	// 		id: '001',
	// 		title: 'Title2',
	// 		content: 'Content2'
	// 	},
	// 	{
	// 		id: '002',
	// 		title: 'Title3',
	// 		content: 'Content3'
	// 	}
	// ]; // Top 3

	// const explore_topics = [
	// 	{
	// 		topic: 'Academic',
	// 		subtopic: [
	// 			'Math',
	// 			'Physics',
	// 			'Chemistry',
	// 			'Informatics',
	// 			'English'
	// 		]
	// 	},
	// 	{
	// 		topic: 'Sports',
	// 		subtopic: [
	// 			'Basketball',
	// 			'Baseball',
	// 			'Volleyball',
	// 			'Table tennis',
	// 			'Badminton'
	// 		]
	// 	},
	// 	{
	// 		topic: 'Music',
	// 		subtopic: [
	// 			'Piano',
	// 			'Violin',
	// 			'Oboe',
	// 			'Guitar',
	// 			'Drum'
	// 		]
	// 	}
	// ]; // Top 3

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
							pop_ideas.loading ? (<p style={{ color: '#ccc' }}>Loading...</p>)
         			: pop_ideas.error ? (<p style={{ color: '#ccc' }}>Error...</p>)
         			: pop_ideas.data.get_popular_ideas.map(idea => (
								<Col span={8}>
									<IdeaCard idea={idea} />
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
							loading ? (<p style={{ color: '#ccc' }}>Loading...</p>)
         			: error ? (<p style={{ color: '#ccc' }}>Error...</p>)
         			: data.get_explore_topics.map(topic => (
								<Col span={8}>
									<List
										size="large"
										header={
											<div style={{fontSize: '18px'}}>
												{topic.group}
											</div>
										}
										dataSource={topic.items}
										renderItem={item => 
											<List.Item style={{fontSize: '15px'}}>
												<NavLink to={"/topics/" + item}
														rel="noreferrer"
												>
													{item}
												</NavLink>
											</List.Item>
										}
										// loading
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