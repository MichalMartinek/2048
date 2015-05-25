import React from 'react';

var Table = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        console.log("A");
        return true;
    },
	render: function () {
        let table = this.props.board.map(function(x, i){
            return <div className="row">{x.map(function(y, j) {return <span key={i+","+j}>{y}</span>})}</div>});
		return (
			<div>
                {table}
            </div>
		);
	}
});

export default Table;