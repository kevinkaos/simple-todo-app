import React from 'react';
import { MODE_NONE } from './services/mode';
import { columns } from './services/columns';
import { todos } from './services/todos';

// Store Context is the global context that is managed by reducers.

const Store = React.createContext({
	//todos && filtered are the same, except one is anchor the other is for showing searched results, they must be diff
	todos,
	columns,
	mode: MODE_NONE,
	filtered: [],
	isEditing: false,
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
