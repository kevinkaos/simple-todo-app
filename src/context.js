import React from 'react';
import { MODE_NONE } from './services/mode';
import { columns } from './services/columns';
import { todos } from './services/todos';

// Store Context is the global context that is managed by reducers.

const Store = React.createContext({
	todos,
	columns,
	mode: MODE_NONE,
	filtered: [],
	currentTodo: {
		content: '',
		title: '',
		uniqueId: 0
	},
	processing: false,
	previousUniqueIds: [],
	index: undefined
});

export default Store;
