import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
	text: '',
	todosToComplete: JSON.parse(localStorage.getItem('__todo_list_todosToComplete')) || [],
	completedTodos: JSON.parse(localStorage.getItem('__todo_list_completedTodos')) || []
});

export { setGlobalState, useGlobalState };
