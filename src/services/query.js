function compareObjects(o1, o2) {
	let k = '';
	for (k in o1) if (o1[k] !== o2[k]) return false;
	for (k in o2) if (o1[k] !== o2[k]) return false;
	return true;
}

function itemExists(haystack, needle) {
	for (let i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
	return false;
}

export function search(todos, query) {
	let q = query.trim().toLowerCase();
	const newTodos = todos.map(e => {
		return {
			uniqueId: e.uniqueId.toString(),
			title: e.title,
			content: e.content
		};
	});
	let results = [];
	for (let i = 0; i < newTodos.length; i++) {
		for (let key in newTodos[i]) {
			if (newTodos[i][key].indexOf(q) !== -1) {
				if (!itemExists(results, newTodos[i])) results.push(newTodos[i]);
			}
		}
	}

	return results;
}
// function stringIncludes(str, substr) {
// 	return str.indexOf(substr) !== -1;
// }

// export function search(list, query) {
// 	let q = query.trim().toLowerCase();

// 	return list.filter(({ title }) => stringIncludes(title.toLowerCase(), q));
// }
