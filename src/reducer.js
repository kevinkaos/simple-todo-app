import { MODE_NONE, MODE_SEARCH, MODE_CREATE } from './services/mode';

export default function reducer(state, action) {
	switch (action.type) {
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
			return state;
		case 'ADD_TODO':
			// return current state if empty
			if (!action.payload) {
				return state;
			}
			// return current state if duplicate
			if (state.todos.includes(action.payload)) {
				return state;
			}
			return {
				...state,
				todos: [ ...state.todos, action.payload ]
			};
		case 'COMPLETE':
			return {
				...state,
				todos: state.todos.filter(t => t !== action.payload)
			};
		default:
			return state;
	}
}
