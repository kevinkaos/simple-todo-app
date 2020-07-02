import React from 'react';
import ButtonWrapper from './ButtonWrapper';

export const TodoHeader = props => (
	<div className="row">
		<div className="col-md-8 header-container">
			<h5>Todo List</h5>
			<ButtonWrapper />
		</div>
		<div className="col-md-4">{props.children}</div>
	</div>
);
