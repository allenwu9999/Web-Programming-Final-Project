import "antd/dist/antd.css";
import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";

import Template from '../Template/Template';

import { Menu } from "antd";

const { SubMenu } = Menu;

function Ideas(props){
	return (
		<Template content={
			<div>
				Ideas
			</div>
		} />
	);
}

export default Ideas;
