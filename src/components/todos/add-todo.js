import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

export default function AddTodo() {
	const [ text, setText ] = useState('');
	const save = useStoreActions((actions) => actions.todos.save);
	const clear = useStoreActions((actions) => actions.todos.clear);
	const undo = useStoreActions((actions) => actions.todos.undo);
	const handleSaveClick = async (e) => {
		e.preventDefault();
		if (text.length > 0) {
			await save(text);
			setText('');
		}
	};
	const handleClearClick = async (e) => {
		e.preventDefault();
		await clear();
	};
	const handleUndoClick = async (e) => {
		e.preventDefault();
		await undo();
	};
	const handleTextChange = (e) => setText(e.target.value);
	return (
		<form>
			<input
				className="appearance-none rounded w-full py-2 px-3 mb-3 leading-tight add-todo"
				value={text}
				onChange={handleTextChange}
				placeholder={'Add a to-do in "Weekly Classwork"...'}
			/>
			<input
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mr-4 mt-2 mb-6"
				type="submit"
				onClick={handleSaveClick}
				value="Add"
			/>
			<input
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer "
				type="submit"
				onClick={handleClearClick}
				value="Clear All"
			/>
			<input
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer "
				type="submit"
				onClick={handleUndoClick}
				value="Undo"
			/>
		</form>
	);
}
