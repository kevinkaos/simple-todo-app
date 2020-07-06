import React, { useContext, useState, useEffect } from 'react';
import Store from '../context';
import { TodoHeader } from './TodoHeader';
import { MODE_EDIT } from '../services/mode';
import Queue from '../services/queue';
import { quickSort } from '../services/sort';

export default function TodoList() {
	const { state, dispatch } = useContext(Store);
	const [ flag, setFlag ] = useState(false);
	const [ previousUniqueIds, setPreviousUniqueIds ] = useState([]);
	const [ ascending, setAscending ] = useState(true);

	const pluralize = count => (count > 1 ? `There are ${count} todos.` : `There is ${count} todo.`);

	useEffect(
		() => {
			dispatch({ type: 'PROCESSING_FLAG', payload: flag });
			dispatch({ type: 'PREVIOUS_UNIQUE_ID', payload: previousUniqueIds });
		},
		[ flag, previousUniqueIds, dispatch ]
	);

	const delay = async (action, ms) => {
		setFlag(true);
		const res = await new Promise(r =>
			setTimeout(() => {
				r(action);
			}, ms)
		);
		setFlag(false);
		res();
	};

	const onDelete = uniqueId => {
		const addDeletedToState = previousUniqueIds.concat(uniqueId);
		const index = state.previousUniqueIds.findIndex(t => t === uniqueId);
		if (index === -1) {
			setPreviousUniqueIds([ ...addDeletedToState ]);
		}
		if (index === -1) {
			Queue.enqueue(() =>
				delay(() => {
					dispatch({
						type: 'COMPLETE',
						payload: uniqueId
					});
				}, 3000)
			);
		}
	};

	const onEdit = (todo, index) => {
		dispatch({ type: 'CHANGE_MODE', payload: { mode: MODE_EDIT, currentTodo: todo, index } });
	};

	const sortBy = column => {
		if (column === 'ID') {
			setAscending(!ascending);
			const num = state.filtered.map(e => ({
				uniqueId: parseFloat(e.uniqueId),
				title: e.title,
				content: e.content
			}));
			const sorted = quickSort(num, 0, num.length - 1, 'uniqueId', ascending);
			dispatch({ type: 'SORT', payload: sorted });
		} else if (column === 'Title') {
			setAscending(!ascending);
			const filtered = [ ...state.filtered ];
			const sorted = quickSort(filtered, 0, filtered.length - 1, 'title', ascending);
			dispatch({ type: 'SORT', payload: sorted });
		}
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
												style={
													col === 'Actions' ? (
														{ textAlign: 'right' }
													) : col !== 'Actions' && col !== 'Content' ? (
														{ cursor: 'pointer' }
													) : null
												}
												scope="col"
												onClick={
													col === 'ID' ? (
														() => sortBy(col)
													) : col === 'Title' ? (
														() => sortBy(col)
													) : null
												}
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
													disabled={state.processing}
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
