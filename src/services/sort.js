function swap(items, leftIndex, rightIndex) {
	let temp = items[leftIndex];
	items[leftIndex] = items[rightIndex];
	items[rightIndex] = temp;
}
function partitionAscending(items, left, right, type) {
	let pivot = items[Math.floor((right + left) / 2)][type]; //middle element

	let i = left; //left pointer
	let j = right; //right pointer
	while (i <= j) {
		while (items[i][type] < pivot) {
			i++;
		}
		while (items[j][type] > pivot) {
			j--;
		}
		if (i <= j) {
			swap(items, i, j); //swapping two elements
			i++;
			j--;
		}
	}
	return i;
}

function partitionDescending(items, left, right, type) {
	let pivot = items[Math.floor((right + left) / 2)][type]; //middle element

	let i = left; //left pointer
	let j = right; //right pointer
	while (i <= j) {
		while (items[i][type] > pivot) {
			i++;
		}
		while (items[j][type] < pivot) {
			j--;
		}
		if (i <= j) {
			swap(items, i, j); //swapping two elements
			i++;
			j--;
		}
	}
	return i;
}

export function quickSort(items, left, right, type = 'uniqueId', ascending = true) {
	let index;
	if (items.length > 1) {
		if (ascending) {
			index = partitionAscending(items, left, right, type); //index returned from partition
		} else if (!ascending) {
			index = partitionDescending(items, left, right, type);
		}
		if (left < index - 1) {
			//more elements on the left side of the pivot
			quickSort(items, left, index - 1, type, ascending);
		}
		if (index < right) {
			//more elements on the right side of the pivot
			quickSort(items, index, right, type, ascending);
		}
	}
	return items;
}
