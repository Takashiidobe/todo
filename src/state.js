import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
	text: '',
	currentTodos: JSON.parse(localStorage.getItem('__todo_list_todos')) || []
});

export { setGlobalState, useGlobalState };
