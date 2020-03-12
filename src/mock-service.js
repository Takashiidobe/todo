const CURR_STATE = '__todo_list_todos';
const PREV_STATES = '__todo_list_prev_states';

const toJSON = (item) => JSON.stringify(item);
const fromJSON = (item) => JSON.parse(item);

export default (() => {
	let todos = fromJSON(localStorage.getItem(CURR_STATE)) || [];
	let prevTodos = fromJSON(localStorage.getItem(PREV_STATES)) || [];
	if (!todos) localStorage.setItem(CURR_STATE, toJSON([]));
	if (!prevTodos) localStorage.setItem(PREV_STATES, toJSON([]));

	// any of CLEAR, ADD, UPDATE, UNDO
	let PREV_ACTION;

	return {
		fetchTodos: () => Promise.resolve(todos.map((x) => ({ ...x }))),
		clearTodos: () => {
			if (PREV_ACTION !== 'CLEAR') {
				prevTodos.push([]);
				localStorage.setItem(PREV_STATES, toJSON(prevTodos));
				localStorage.setItem(CURR_STATE, toJSON([]));

				PREV_ACTION = 'CLEAR';
			}
		},
		saveTodo: (text) => {
			console.log(prevTodos);
			prevTodos.push(todos);
			localStorage.setItem(PREV_STATES, toJSON(prevTodos));
			const todo = {
				id: todos.length + 1,
				text,
				date: Date.now(),
				done: false
			};
			todos.push({ ...todo });
			localStorage.setItem(CURR_STATE, toJSON(todos));

			PREV_ACTION = 'ADD';
			return Promise.resolve(todo);
		},
		updateTodo: (id, data) => {
			const todo = todos.find((x) => x.id === id);
			Object.keys(data).forEach((key) => {
				todo[key] = data[key];
			});
			localStorage.setItem(CURR_STATE, toJSON(todos));

			PREV_ACTION = 'UPDATE';
			return Promise.resolve({ ...todo });
		},
		undoTodo: () => {
			const prevState = prevTodos.pop();
			localStorage.setItem(CURR_STATE, toJSON(prevState));

			PREV_ACTION = 'UNDO';
		}
	};
})();
