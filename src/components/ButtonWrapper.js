import React, { useContext } from 'react';
import Store from '../context';
import { MODE_NONE, MODE_CREATE, MODE_SEARCH } from '../services/mode';

export default function ButtonWrapper() {
	const { state, dispatch } = useContext(Store);
	const isCreateMode = () => state.mode === MODE_CREATE;
	const isSearchMode = () => state.mode === MODE_SEARCH;

	return (
		<div className="buttons">
			<button
				title="buttondd New"
				className={'button add ' + (isCreateMode() ? 'selected' : '')}
				onClick={() => dispatch({ type: 'CHANGE_MODE', payload: isCreateMode() ? MODE_NONE : MODE_CREATE })}
			/>
			<button
				title="Search"
				className={'button search ' + (isSearchMode() ? 'selected' : '')}
				onClick={() => dispatch({ type: 'CHANGE_MODE', payload: isSearchMode() ? MODE_NONE : MODE_SEARCH })}
			/>
		</div>
	);
}
