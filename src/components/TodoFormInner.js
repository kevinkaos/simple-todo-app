import React from 'react';

export default function TodoFormInner(props) {
	const { values, onKeyUp, onChange, btnText, processing, onSubmit } = props;

	return (
		<div className="input-group">
			<input
				className="form-control"
				style={{ width: '100%' }}
				value={values.title}
				autoFocus={true}
				placeholder="Enter todo title(required)"
				onKeyUp={e => onKeyUp(e, 'add')}
				onChange={e => onChange(e, 'title')}
			/>
			<textarea
				className="form-control"
				style={{ width: '100%' }}
				value={values.content}
				autoFocus={false}
				onKeyUp={e => onKeyUp(e, 'add')}
				placeholder="Enter description"
				onChange={e => onChange(e, 'content')}
			/>
			<div className="input-group-append" style={{ width: '100%' }}>
				<button disabled={processing} className="btn btn-primary" style={{ width: '100%' }} onClick={onSubmit}>
					{btnText}
				</button>
			</div>
		</div>
	);
}
