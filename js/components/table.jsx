import React from 'react';

var Table = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    },
	render: function () {
        let table = this.props.board.map(function(x, i){
            return <ul className="row">{x.map(function(y, j) {return <li className={"tile t" + y} key={i+","+j}>{y}</li>})}</ul>});
		return (
			<div>
                {table}
            </div>
		);
	}
});

export default Table;