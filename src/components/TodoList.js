import React, { useContext } from 'react';
import Store from '../context';
import { TodoHeader } from './TodoHeader';
import { MODE_EDIT } from '../services/mode';

export default function TodoList() {
	const { state, dispatch } = useContext(Store);

	const pluralize = count => (count > 1 ? `There are ${count} todos.` : `There is ${count} todo.`);

	const onDelete = uniqueId => {
		setTimeout(() => {
			dispatch({
				type: 'COMPLETE',
				payload: uniqueId
			});
		}, 3000);
	};

	const onEdit = (todo, index) => {
		dispatch({ type: 'CHANGE_MODE', payload: { mode: MODE_EDIT, currentTodo: todo, index } });
	};

	let header = (
		<TodoHeader>
			<span className="float-right">{pluralize(state.filtered.length)}</span>
		</TodoHeader>
	);
	return (
		<div className="row">
			<div className="col-md-12">
				<div className="row">
					<div className="col-md-12">
						<br />
						{header}
					</div>
				</div>
				{state.filtered.length > 0 && (
					<div className="row">
						<div className="col-md-12">
							<table className="table">
								<thead className="thead-dark">
									<tr>
										{state.columns.map((col, index) => (
											<th
												key={index}
												style={col === 'Actions' ? { textAlign: 'right' } : {}}
												scope="col"
											>
												{col}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{state.filtered.map((todo, index) => (
										<tr key={todo.uniqueId}>
											<th scope="row">{todo.uniqueId}</th>
											<td>{todo.title}</td>
											<td>{todo.content}</td>
											<td>
												<button
													className="float-right btn btn-danger btn-sm"
													onClick={() => onDelete(todo.uniqueId)}
												>
													Delete
												</button>
												<button
													style={{ marginRight: '1rem' }}
													className="float-right btn btn-primary btn-sm"
													onClick={() => onEdit(todo, index)}
												>
													Edit
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
