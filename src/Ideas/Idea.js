import "antd/dist/antd.css";
import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";

import Template from '../Template/Template';

function Idea(props){
	const { id } = props.match.params;
	const target_idea = {
		title: 'A pistol with thermite',
		topics: ['Physics', 'Chemistry'],
		content: "I'm planning to make a pistol with the bullet contains thermite.",
		creator: 'MartianSheep@878787',
		acceptors: ['Aqua@445', 'Admin@000'],
		review_acceptors: ['Botan@446', 'Aqua@445'],
		review_rejectors: ['wtf@001', 'hellyouspeaking@110'],
		reviewed: true,
		published: true
	};

	return (
		<Template content={
			<div>
				{id}
			</div>
		} />
	);
}

export default Idea;
