import React, { useContext, useState } from 'react';
import Store from '../context';

export default function TodoForm() {
	const { dispatch } = useContext(Store);

	// Creating a local state to have currently writing
	// todo item that will be sent to the global store.
	const [ todo, setTodo ] = useState({ uniqueId: getUniqueId(), title: '', content: '' });

	function getUniqueId() {
		return Date.now();
	}

	function handleTodoChange(e, type) {
		if (type === 'title') {
			setTodo({ ...todo, title: e.target.value });
		} else if (type === 'content') {
			setTodo({ ...todo, content: e.target.value });
		}
	}

	function handleTodoAdd() {
		// Set timeout to ensure Date.now is a unique ID also to seem like async task
		setTimeout(() => {
			dispatch({ type: 'ADD_TODO', payload: todo });
			setTodo({ uniqueId: getUniqueId(), title: '', content: '' });
		}, 50);
	}

	function handleSubmitForm(event) {
		if (event.keyCode === 13) handleTodoAdd();
	}

	return (
		<div className="row">
			<div className="col-md-12">
				<br />
				<div className="input-group">
					<input
						className="form-control"
						style={{ width: '100%' }}
						value={todo.title}
						autoFocus={true}
						placeholder="Enter todo title"
						onKeyUp={handleSubmitForm}
						onChange={e => handleTodoChange(e, 'title')}
					/>
					<textarea
						className="form-control"
						style={{ width: '100%' }}
						value={todo.content}
						autoFocus={false}
						placeholder="Enter description"
						onChange={e => handleTodoChange(e, 'content')}
					/>
					<div className="input-group-append" style={{ width: '100%' }}>
						<button className="btn btn-primary" style={{ width: '100%' }} onClick={handleTodoAdd}>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
