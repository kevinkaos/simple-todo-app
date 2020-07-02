import React from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

export default function TodoHome() {
	return (
		<div>
			<TodoForm />
			<TodoList />
		</div>
	);
}
