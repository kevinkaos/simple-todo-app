import React, { useContext } from 'react';
import Store from '../context';
import { TodoHeader } from './TodoHeader';

export default function TodoList() {
	const { state, dispatch } = useContext(Store);

	const pluralize = count => (count > 1 ? `There are ${count} todos.` : `There is ${count} todo.`);

	const onDelete = todo => {
		setTimeout(() => {
			dispatch({ type: 'COMPLETE', payload: todo });
		}, 3000);
	};

	let header = (
		<TodoHeader>
			<span className="float-right">{pluralize(state.todos.length)}</span>
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
				{state.todos.length > 0 && (
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
									{state.todos.map(todo => (
										<tr key={todo.uniqueId}>
											<th scope="row">{todo.uniqueId}</th>
											<td>{todo.title}</td>
											<td>{todo.content}</td>
											<td>
												<button
													className="float-right btn btn-danger btn-sm"
													onClick={() => onDelete(todo)}
												>
													Delete
												</button>
												<button
													style={{ marginRight: '1rem' }}
													className="float-right btn btn-primary btn-sm"
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
