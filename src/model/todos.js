import { action, thunk, computed } from 'easy-peasy';
import service from '../service';

export default {
	items: {},

	// computed properties
	todos: computed((state) => Object.values(state.items)),

	// actions
	fetched: action((state, payload) => {
		state.items = payload.reduce((acc, todo) => {
			acc[todo.id] = todo;
			return acc;
		}, {});
	}),
	saved: action((state, payload) => {
		state.items[payload.id] = payload;
	}),

	// thunks
	fetchTodos: thunk(async (actions) => {
		const todos = await service.fetchTodos();
		actions.fetched(todos);
	}),
	toggle: thunk(async (actions, payload, { getState }) => {
		const todo = getState().items[payload];
		if (!todo) return;
		const updated = await service.updateTodo(payload, {
			done: !todo.done
		});
		const todos = await service.clearTodos();
		actions.fetched(todos);
	}),
	save: thunk(async (actions, payload) => {
		const todo = await service.saveTodo(payload);
		actions.saved(todo);
	}),
	clear: thunk(async (actions) => {
		const empty = await service.clearTodos();
		actions.fetched(empty);
	}),
	undo: thunk(async (actions) => {
		const todos = await service.undoTodo();
		actions.fetched(todos);
	})
};
