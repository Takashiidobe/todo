import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Todo from './todo';

function Todos() {
	const todos = useStoreState((state) => state.todos.todos);
	const toggle = useStoreActions((actions) => actions.todos.toggle);
	const todosToComplete = todos.filter((todo) => !todo.done);
	const todosToDo = todos.filter((todo) => todo.done);
	return (
		<div>
			<h1>Todo List</h1>
			<h3>
				{todosToComplete.length} Item{todosToComplete.length !== 1 ? 's' : ''} to complete
			</h3>
			<ul>{todosToComplete.map((todo) => <Todo key={todo.id} todo={todo} toggle={toggle} />)}</ul>
			<h1>Completed</h1>
			<h3>
				{todosToDo.length} Item{todosToDo.length !== 1 ? 's' : ''} completed
			</h3>
			<ul>{todosToDo.map((todo) => <Todo key={todo.id} todo={todo} toggle={toggle} />)}</ul>
		</div>
	);
}

export default Todos;
