import React from 'react';
import { setGlobalState, useGlobalState } from '../../state';
import Todo from './todo';
import ding from '../../assets/WLCompletionSound.mp3';

const sound = new Audio(ding);

function Todos() {
	const [ todos, setTodos ] = useGlobalState('currentTodos');
	const todosToComplete = todos.filter((todo) => todo.done);
	const todosToDo = todos.filter((todo) => !todo.done);
	const toggle = (id) => {
		for (const todo of todos) {
			if (todo.id === id) {
				todo.done = !todo.done;
				if (todo.done) sound.play();
			}
		}
		setTodos([ ...todos ]);
		localStorage.setItem('__todo_list_todos', JSON.stringify(todos));
	};
	return (
		<div className="mt-4">
			<ul className="mh-64 overflow-auto">
				{todosToDo.map((todo) => <Todo key={todo.id} todo={todo} toggle={toggle} />)}
			</ul>
			{todosToComplete.length ? (
				<h3 className="">
					{todosToComplete.length} Completed TO-DO{todosToComplete.length === 1 ? '' : 'S'}
				</h3>
			) : (
				''
			)}
			<ul className="mh-64 overflow-auto">
				{todosToComplete.map((todo) => <Todo key={todo.id} todo={todo} toggle={toggle} />)}
			</ul>
		</div>
	);
}

export default Todos;
