import { MODE_NONE, MODE_SEARCH, MODE_CREATE, MODE_EDIT } from './services/mode';

export default function reducer(state, action) {
	switch (action.type) {
		case 'SEARCH':
			return {
				...state,
				filtered: action.payload.filtered
			};
		case 'UPDATE_TODO':
			// return current state if empty
			if (!action.payload) {
				return state;
			}
			state.filtered.splice(action.payload.index, 1, action.payload.editTodo);
			state.todos.splice(action.payload.index, 1, action.payload.editTodo);
			return {
				...state,
				todos: [ ...state.todos ],
				filtered: [ ...state.filtered ]
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
				return {
					...state,
					mode: action.payload.mode,
					currentTodo: action.payload.currentTodo,
					index: action.payload.index
				};
			}
			return state;
		case 'ADD_TODO':
			// return current state if empty
			if (!action.payload) {
				return state;
			}
			// return current state if duplicate
			if (state.filtered.includes(action.payload)) {
				return state;
			}
			return {
				...state,
				todos: [ ...state.todos, action.payload ],
				filtered: [ ...state.filtered, action.payload ]
			};
		case 'COMPLETE':
			return {
				...state,
				todos: state.todos.filter(t => t.uniqueId.toString() !== action.payload.toString()),
				filtered: state.filtered.filter(t => t.uniqueId.toString() !== action.payload.toString())
			};
		default:
			return state;
	}
}
