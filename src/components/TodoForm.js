import React, { useContext, useState, useEffect } from 'react';

import Store from '../context';

import TodoFormInner from './TodoFormInner';

import { search } from '../services/query';
import { MODE_CREATE, MODE_SEARCH, MODE_EDIT, MODE_NONE } from '../services/mode';

export default function TodoForm() {
	const { state, dispatch } = useContext(Store);
	const { mode, currentTodo, processing } = state;
	const [ todo, setTodo ] = useState({ uniqueId: getUniqueId(), title: '', content: '' });
	const [ query, setQuery ] = useState('');
	const [ editTodo, setEditTodo ] = useState({ ...currentTodo });

	useEffect(
		() => {
			dispatch({ type: 'SEARCH', payload: { filtered: search(state.todos, query) } });

			setEditTodo({ ...currentTodo });
		},
		[ query, dispatch, currentTodo, state.todos ]
	);

	function getUniqueId() {
		return parseFloat(Date.now().toString().slice(5));
	}

	function handleSearch(e) {
		setQuery(e.target.value);
	}

	function handleEditTodoChange(e, type) {
		if (type === 'title') {
			setEditTodo({ ...editTodo, title: e.target.value });
		} else if (type === 'content') {
			setEditTodo({ ...editTodo, content: e.target.value });
		}
	}

	function handleTodoChange(e, type) {
		if (type === 'title') {
			setTodo({ ...todo, title: e.target.value });
		} else if (type === 'content') {
			setTodo({ ...todo, content: e.target.value });
		}
	}
	function handleTodoEdit() {
		dispatch({ type: 'UPDATE_TODO', payload: { editTodo, index: state.index } });
		dispatch({ type: 'CHANGE_MODE', payload: MODE_NONE });
	}

	function handleTodoAdd() {
		// Set timeout to ensure Date.now is a unique ID
		if (todo.title) {
			setTimeout(() => {
				dispatch({ type: 'ADD_TODO', payload: todo });
				dispatch({ type: 'PREVIOUS_UNIQUE_ID', payload: [] });
				setTodo({ uniqueId: getUniqueId(), title: '', content: '' });
			}, 50);
		}
	}

	function handleSubmitForm(event, type) {
		if (type === 'add') {
			if (event.keyCode === 13) handleTodoAdd();
		} else if (type === 'edit') {
			if (event.keyCode === 13) handleTodoEdit();
		}
	}

	return (
		<div className="row">
			<div className="col-md-12">
				<br />
				{mode === MODE_CREATE ? (
					<TodoFormInner
						processing={processing}
						btnText={'Add'}
						values={todo}
						onKeyUp={handleSubmitForm}
						onChange={handleTodoChange}
						onSubmit={handleTodoAdd}
					/>
				) : mode === MODE_EDIT ? (
					<TodoFormInner
						processing={processing}
						btnText={'Edit'}
						values={editTodo}
						onKeyUp={handleSubmitForm}
						onChange={handleEditTodoChange}
						onSubmit={handleTodoEdit}
					/>
				) : mode === MODE_SEARCH ? (
					<div className="input-group">
						<input
							className="form-control"
							value={query}
							autoFocus={true}
							placeholder="Search..."
							onChange={handleSearch}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}
