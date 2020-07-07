import { MODE_NONE, MODE_SEARCH, MODE_CREATE, MODE_EDIT } from './services/mode';

export default function reducer(state, action) {
	switch (action.type) {
		case 'PREVIOUS_UNIQUE_ID':
			return {
				...state,
				previousUniqueIds: [ ...action.payload ]
			};
		case 'PROCESSING_FLAG':
			return {
				...state,
				processing: action.payload
			};
		case 'SORT':
			return {
				...state,
				todos: action.payload,
				filtered: action.payload
			};
		case 'SEARCH':
			return {
				...state,
				filtered: action.payload.filtered
			};
		case 'UPDATE_TODO':
			// state should be immutable so created a new variable for manipulating with splice
			// mapping to ensure uniqueId is float for uploading to server **API integratable**
			const filtered = [ ...state.filtered ];
			const todos = [ ...state.todos ];
			filtered.splice(action.payload.index, 1, action.payload.editTodo);
			todos.splice(action.payload.index, 1, action.payload.editTodo);
			const formatTodos = todos.map(t => ({
				uniqueId: parseFloat(t.uniqueId),
				title: t.title,
				content: t.content
			}));
			return {
				...state,
				todos: [ ...formatTodos ],
				filtered: [ ...filtered ]
			};
		case 'CHANGE_MODE':
			if (action.payload === MODE_NONE) {
				return { ...state, mode: action.payload };
			}
			if (action.payload === MODE_SEARCH) {
				return { ...state, mode: action.payload };
			}
			if (action.payload === MODE_CREATE) {
				return { ...state, mode: action.payload };
			}
			if (action.payload.mode === MODE_EDIT) {
				// when mode === edit, set current editing todo to state, and also the index of the todo for updating
				return {
					...state,
					mode: action.payload.mode,
					currentTodo: action.payload.currentTodo,
					index: action.payload.index
				};
			}
			return state;
		case 'ADD_TODO':
			return {
				...state,
				todos: [ ...state.todos, action.payload ],
				filtered: [ ...state.filtered, action.payload ]
			};
		case 'COMPLETE':
			// filter returns a new function without mutating state, so I directly applied it.
			return {
				...state,
				todos: state.todos.filter(t => t.uniqueId.toString() !== action.payload.toString()),
				filtered: state.filtered.filter(t => t.uniqueId.toString() !== action.payload.toString())
			};
		default:
			return state;
	}
}
