import React, { useState } from 'react';
import { useGlobalState } from '../../state';

export default function AddTodo() {
	const [ text, setText ] = useGlobalState('text');
	const [ todos, setTodos ] = useGlobalState('currentTodos');
	const handleTextChange = (e) => setText(e.target.value);
	const save = () => {
		let unique = true;

		for (const todo of todos) {
			if (todo.text === text) unique = false;
		}

		if (unique) {
			todos.push({
				id: todos.length + 1,
				text,
				date: Date.now(),
				done: false,
				starred: false
			});

			setTodos([ ...todos ]);
			localStorage.setItem('__todo_list_todos', JSON.stringify(todos));
		}
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
