import 'antd/dist/antd.css';
import React, { Fragment } from 'react';

import Template from '../Template/Template';

import { WarningOutlined } from '@ant-design/icons';

function NoMatch404(props) {
	return (
		<Template content={
			<Fragment>
				<div style={{display: 'flex'}}>
					<WarningOutlined
						style={{fontSize: window.innerHeight-250, flexGrow: 1}}
					/>
				</div>
				<div style={{fontSize: 24, textAlign: "center"}}>
					Oops! We can't find this page.
				</div>
			</Fragment>
		} />
	);
}

export default NoMatch404;

			// <div style={{
			// 	display: 'flex',
			// }}>
			// 	<WarningOutlined style={{
			// 		flexGrow: 1
			// 	}} />
			// </div>