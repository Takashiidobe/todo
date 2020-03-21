import React from 'react';
import { setGlobalState, useGlobalState } from '../../state';
import Todo from './todo';
import ding from '../../assets/WLCompletionSound.mp3';

function Todos() {
	const [ todos, setTodos ] = useGlobalState('currentTodos');
	const todosToComplete = todos.filter((todo) => todo.done);
	const todosToDo = todos.filter((todo) => !todo.done);
	const toggle = (id) => {
		for (const todo of todos) {
			if (todo.id === id) {
				todo.done = !todo.done;
				if (todo.done) {
					const sound = new Audio(ding);
					sound.play();
				}
			}
		}
		setTodos([ ...todos ]);
		localStorage.setItem('__todo_list_todos', JSON.stringify(todos));
	};
	return (
		<div className="mt-4">
			<ul className="mh-48 overflow-auto">
				{todosToDo.map((todo) => <Todo key={todo.id} todo={todo} toggle={toggle} />)}
			</ul>
			{todosToComplete.length ? (
				<h5 className="rounded py-2 px-3 mb-3 mt-3 completed-todo-header">
					{todosToComplete.length} COMPLETED TO-DO{todosToComplete.length === 1 ? '' : 'S'}
				</h5>
			) : (
				''
			)}
			<ul className="mh-48 overflow-auto">
				{todosToComplete.map((todo) => <Todo key={todo.id} todo={todo} toggle={toggle} />)}
			</ul>
		</div>
	);
}

export default Todos;
