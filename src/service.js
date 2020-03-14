const CURR_STATE = '__todo_list_todos';
const PREV_STATES = '__todo_list_prev_states';

const toJSON = (item) => JSON.stringify(item);
const fromJSON = (item) => JSON.parse(item);

let todos;
let parsedTodos = localStorage.getItem(CURR_STATE);

if (parsedTodos !== 'undefined' && parsedTodos) {
	todos = fromJSON(parsedTodos);
} else {
	todos = [];
}

let prevTodos;
let parsedPrevStates = localStorage.getItem(PREV_STATES);

if (parsedPrevStates !== 'undefined' && parsedPrevStates) {
	prevTodos = fromJSON(parsedPrevStates);
} else {
	prevTodos = [];
}

// any of CLEAR, ADD, UPDATE, UNDO
let PREV_ACTION;

const logCurr = () => console.log(localStorage.getItem('__todo_list_todos'));

export default (() => {
	return {
		fetchTodos: () => Promise.resolve(todos.map((x) => ({ ...x }))),
		clearTodos: () => {
			if (PREV_ACTION !== 'CLEAR') {
				logCurr();
				prevTodos.push(todos);
				localStorage.setItem(PREV_STATES, toJSON([ prevTodos ]));
				todos = [];
				localStorage.setItem(CURR_STATE, toJSON([ [] ]));

				PREV_ACTION = 'CLEAR';
			}
			return Promise.resolve([ [] ]);
		},
		saveTodo: (text) => {
			prevTodos.push([ ...todos ]);
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
			return Promise.resolve({ ...todo });
		},
		updateTodo: (id, data) => {
			prevTodos.push(todos);
			localStorage.setItem(PREV_STATES, toJSON(prevTodos));
			const todo = todos.find((x) => x.id === id);
			Object.keys(data).forEach((key) => {
				todo[key] = data[key];
			});

			localStorage.setItem(CURR_STATE, toJSON(todos));

			PREV_ACTION = 'UPDATE';
			return Promise.resolve({ ...todo });
		},
		undoTodo: () => {
			if (prevTodos.length) todos = [ prevTodos.pop() ];
			else todos = [];

			localStorage.setItem(CURR_STATE, toJSON(todos));
			localStorage.setItem(PREV_STATES, toJSON(prevTodos));

			PREV_ACTION = 'UNDO';
			if (todos.length) return Promise.resolve(todos);
			else return Promise.resolve([]);
		}
	};
})();
