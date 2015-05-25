import React from 'react';
import Table from './components/table.jsx';
import Board from './board.js';

let board = new Board();
 var App = React.createClass({
	getInitialState: function() {
        return {
            tiles: board.tiles
        }
	},
    componentDidMount: function () {
         window.addEventListener('keydown', this.handleKeyDown);
    },
    handleKeyDown: function (event) {
        let w = false;
        switch(event.keyCode) {
            case 37:
            case 65:
                w = board.slide(0);
                break;
            case 38:
            case 87:
                w = board.slide(1);
                break;
            case 39:
            case 68:
                w = board.slide(2);
                break;
            case 40:
            case 83:
                w = board.slide(3);
                break;
            default:
                event.preventDefault();
        }

       if(w) {
           alert("výhra");
           board = new Board();
       }
       else if(board.hasLost()) {
           alert("prohra");
           board = new Board();
       }
        this.setState({tiles: board.tiles});
        board.print();
    },
	render: function () {
		return (
			<Table onKeyDown={this.handleKeyDown} board={this.state.tiles}></Table>
		);
	}
});

React.render(<App></App>, document.getElementById('app'));
