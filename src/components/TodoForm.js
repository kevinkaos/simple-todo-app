import React, { useContext, useState, useEffect } from 'react';
import Store from '../context';
import { MODE_CREATE, MODE_SEARCH } from '../services/mode';

export default function TodoForm() {
	const { state, dispatch } = useContext(Store);
	const { mode } = state;
	// Creating a local state to have currently writing
	// todo item that will be sent to the global store.
	const [ todo, setTodo ] = useState({ uniqueId: getUniqueId(), title: '', content: '' });
	const [ query, setQuery ] = useState('');

	useEffect(
		() => {
			dispatch({ type: 'SEARCH', payload: query });
		},
		[ query ]
	);

	function getUniqueId() {
		return Date.now();
	}

	function handleSearch(e) {
		setQuery(e.target.value);
	}

	function handleTodoChange(e, type) {
		if (type === 'title') {
			setTodo({ ...todo, title: e.target.value });
		} else if (type === 'content') {
			setTodo({ ...todo, content: e.target.value });
		}
	}

	function handleTodoAdd() {
		// Set timeout to ensure Date.now is a unique ID also to seem like an async task
		if (todo.title) {
			setTimeout(() => {
				dispatch({ type: 'ADD_TODO', payload: todo });
				setTodo({ uniqueId: getUniqueId(), title: '', content: '' });
			}, 50);
		}
	}

	function handleSubmitForm(event) {
		if (event.keyCode === 13) handleTodoAdd();
	}

	return (
		<div className="row">
			<div className="col-md-12">
				<br />
				{mode === MODE_CREATE && (
					<div className="input-group">
						<input
							className="form-control"
							style={{ width: '100%' }}
							value={todo.title}
							autoFocus={true}
							placeholder="Enter todo title(required)"
							onKeyUp={handleSubmitForm}
							onChange={e => handleTodoChange(e, 'title')}
						/>
						<textarea
							className="form-control"
							style={{ width: '100%' }}
							value={todo.content}
							autoFocus={false}
							onKeyUp={handleSubmitForm}
							placeholder="Enter description"
							onChange={e => handleTodoChange(e, 'content')}
						/>
						<div className="input-group-append" style={{ width: '100%' }}>
							<button className="btn btn-primary" style={{ width: '100%' }} onClick={handleTodoAdd}>
								Add
							</button>
						</div>
					</div>
				)}
				{mode === MODE_SEARCH && (
					<div className="input-group">
						<input
							className="form-control"
							value={query}
							autoFocus={true}
							placeholder="Search..."
							onChange={handleSearch}
						/>
						{/* <div className="input-group-append">
							<button className="btn btn-primary" onClick={handleSubmitSearch}>
								Search
							</button>
						</div> */}
					</div>
				)}
			</div>
		</div>
	);
}
