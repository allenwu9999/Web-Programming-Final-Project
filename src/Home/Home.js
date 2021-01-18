import 'antd/dist/antd.css';
import React from 'react';
import { Fragment } from 'react';
import styled from 'styled-components';

import Template from '../Template/Template';

import { Carousel } from 'antd';

function Home() {
	const CarouselContentStyle = {
		height: window.innerHeight - 114,
		color: '#000000',
		lineHeight: '160px',
		// textAlign: 'center',
		background: '#E0E0E0',
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
	return(
		<Template content={
			<Fragment>
				<CarouselWrapper autoplay
						pauseOnHover={false}
						pauseOnDotsHover
						pauseOnFocus
						swipeToSlide>
					<div>
						<h3 style={CarouselContentStyle, {textAlign: "center"}}>1</h3>
					</div>
					<div>
						<h3 style={CarouselContentStyle}>2</h3>
					</div>
					<div>
						<h3 style={CarouselContentStyle}>3</h3>
					</div>
					<div>
						<h3 style={CarouselContentStyle}>4</h3>
					</div>
				</CarouselWrapper>
			</Fragment>
		} />
	);
}

export default Home;