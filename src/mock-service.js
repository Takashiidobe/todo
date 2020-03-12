const CURR_STATE = '__todo_list_todos';
const PREV_STATES = '__todo_list_prev_states';

// localStorage.removeItem('__todo_list_todos');
// localStorage.removeItem('__todo_list_prev_states');

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

const log = () => {
	console.log(`Previous States: ${toJSON(prevTodos)}`);
	console.log(`Current State: ${toJSON(todos)}`);
};

log();

export default (() => ({
	fetchTodos: () => Promise.resolve(todos.map((x) => ({ ...x }))),
	clearTodos: () => {
		if (PREV_ACTION !== 'CLEAR') {
			prevTodos.push([]);
			localStorage.setItem(PREV_STATES, toJSON(prevTodos));
			localStorage.setItem(CURR_STATE, toJSON([]));

			PREV_ACTION = 'CLEAR';
		}
		log();
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
		log();
		return Promise.resolve(todo);
	},
	updateTodo: (id, data) => {
		prevTodos.push([ ...todos ]);
		localStorage.setItem(PREV_STATES, toJSON(prevTodos));
		const todo = todos.find((x) => x.id === id);
		Object.keys(data).forEach((key) => {
			todo[key] = data[key];
		});

		localStorage.setItem(CURR_STATE, toJSON(todos));

		PREV_ACTION = 'UPDATE';
		log();
		return Promise.resolve({ ...todo });
	},
	undoTodo: () => {
		let prevState;
		if (prevTodos.length) prevState = [ prevTodos.pop() ];

		localStorage.setItem(CURR_STATE, toJSON(...prevState));
		localStorage.setItem(PREV_STATES, toJSON(prevTodos));
		todos = prevState;

		PREV_ACTION = 'UNDO';
		log();
		return Promise.resolve(todos.map((x) => ({ ...x })));
	}
}))();
