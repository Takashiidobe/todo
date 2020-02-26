import { thunk } from 'easy-peasy';
import audit from './audit';
import todos from './todos';

export default {
	audit,
	todos,
	initialise: thunk(async (actions, payload, { dispatch }) => {
		await dispatch.todos.fetchTodos();
	})
};
