import React from 'react';
import $ from 'jquery';
import dummyData from './dummyData';
import {Link} from 'react-router-dom';

const usersList = dummyData.users;

class profile extends React.Component {

	render() {
		return (
			<ol>
				{usersList.map(s => (<li>{s}</li>))}
			</ol>
		);
	}
}

export default profile;
