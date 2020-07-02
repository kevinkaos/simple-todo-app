import React, { useContext } from 'react';
import Store from '../context';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

export default function TodoHome() {
	const { state } = useContext(Store);

	return (
		<div>
			<TodoForm />
			<TodoList />
		</div>
	);
}
