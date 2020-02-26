import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

export default function AddTodo() {
	const [ text, setText ] = useState('');
	const save = useStoreActions((actions) => actions.todos.save);
	const clear = useStoreActions((actions) => actions.todos.clear);
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
	const handleTextChange = (e) => setText(e.target.value);
	return (
		<form>
			<label className="block">
				<span className="text-gray-700">Add a to-do in "Weekly Classwork"</span>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					value={text}
					onChange={handleTextChange}
					placeholder="Your Next Task"
				/>
			</label>
			<input
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
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
		</form>
	);
}
