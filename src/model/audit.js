import { action } from 'easy-peasy';
import todos from './todos';

export default {
	logs: [],
	onTodoSaved: action(
		(state, payload) => {
			state.logs.push(`Saved todo: ${payload.text}`);
		},
		{ listenTo: todos.save }
	)
};
