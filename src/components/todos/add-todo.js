import React, { useState } from 'react';
import { useGlobalState } from '../../state';

export default function AddTodo() {
	const [ text, setText ] = useGlobalState('text');
	const [ todos, setTodos ] = useGlobalState('currentTodos');
	const handleTextChange = (e) => setText(e.target.value);
	const save = () => {
		todos.push({
			id: todos.length + 1,
			text,
			date: Date.now(),
			done: false
		});
		setTodos([ ...todos ]);
		localStorage.setItem('__todo_list_todos', JSON.stringify(todos));
	};
	const handleSaveClick = async (e) => {
		e.preventDefault();
		if (text.length > 0) {
			save(text);
			setText('');
		}
	};
	const handleClearClick = async (e) => {
		e.preventDefault();
		setTodos([]);
		localStorage.setItem('__todo_list_todos', JSON.stringify([]));
	};
	const handleClearTodosClick = async (e) => {
		e.preventDefault();
		const newTodos = [];
		for (const todo of todos) {
			if (todo.done !== false) newTodos.push(todo);
		}
		setTodos([ ...newTodos ]);
		localStorage.setItem('__todo_list_todos', JSON.stringify(newTodos));
	};
	const handleClearCompletedClick = async (e) => {
		e.preventDefault();
		const newTodos = [];
		for (const todo of todos) {
			if (todo.done !== true) newTodos.push(todo);
		}
		setTodos([ ...newTodos ]);
		localStorage.setItem('__todo_list_todos', JSON.stringify(newTodos));
	};
	return (
		<form>
			<input
				className="appearance-none rounded w-full py-2 px-3 mb-3 leading-tight add-todo"
				value={text}
				onChange={handleTextChange}
				placeholder={'Add a to-do in "Weekly Classwork"...'}
			/>
			<input
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mr-4 mt-2"
				type="submit"
				onClick={handleSaveClick}
				value="Add"
			/>
			<input
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mr-4 mt-2"
				type="submit"
				onClick={handleClearClick}
				value="Clear All"
			/>
			<input
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mr-4 mt-2"
				type="submit"
				onClick={handleClearTodosClick}
				value="Clear Todos"
			/>
			<input
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mr-4 mt-2"
				type="submit"
				onClick={handleClearCompletedClick}
				value="Clear Completed"
			/>
		</form>
	);
}
