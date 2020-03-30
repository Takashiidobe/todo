import React, { useState } from 'react';
import { useGlobalState } from '../../state';

export default function AddTodo() {
	const [ text, setText ] = useGlobalState('text');
	const [ todosToComplete, setTodosToComplete ] = useGlobalState('todosToComplete');
	const [ completedTodos, setCompletedTodos ] = useGlobalState('completedTodos');
	const handleTextChange = (e) => setText(e.target.value);
	const save = () => {
		todosToComplete.push({
			id: todosToComplete.length + completedTodos.length + 1,
			text,
			date: Date.now(),
			done: false,
			starred: false
		});
		setTodosToComplete([ ...todosToComplete ]);
		localStorage.setItem('__todo_list_todosToComplete', JSON.stringify(todosToComplete));
	};
	const handleSaveClick = async (e) => {
		e.preventDefault();
		if (text.length > 0) {
			save(text);
			setText('');
		}
	};
	return (
		<form onSubmit={handleSaveClick}>
			<input
				className="appearance-none rounded w-full py-2 px-3 mb-3 leading-tight add-todo"
				value={text}
				onChange={handleTextChange}
				placeholder={'Add a to-do in "Weekly Classwork"...'}
			/>
		</form>
	);
}
