import React from 'react';
import Hello from './components/table.jsx';
import Board from './board.js';

 var App = React.createClass({
	getInitialState: function() {

	},
	handleClick: function () {
		window.alert('clicked');
	},
	render: function () {
		return (
			<Hello onClick={this.handleClick}></Hello>
		);
	}
});

React.render(<App></App>, document.getElementById('app'));
