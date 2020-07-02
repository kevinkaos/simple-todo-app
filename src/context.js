import React from 'react';

// Store Context is the global context that is managed by reducers.

const Store = React.createContext({
	todos: [
		{ uniqueId: 123456, title: 'Homework for AndroVideo', content: 'Finish this program by 7/15' },
		{ uniqueId: 223456, title: 'Homework for AndroVideo2', content: 'Finish this program by 7/15' },
		{ uniqueId: 323456, title: 'Homework for AndroVideo3', content: 'Finish this program by 7/15' }
	],
	columns: [ 'ID', 'Title', 'Content', 'Actions' ]
});

export default Store;
