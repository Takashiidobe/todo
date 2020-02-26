const LOCAL_STORAGE_TODOS = '__todo_list_todos';

export default (() => {
	let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS)) || [];
	let todoIdx = todos.length;

	return {
		fetchTodos: () => Promise.resolve(todos.map((x) => ({ ...x }))),
		clearTodos: () => localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify([])),
		saveTodo: (text) => {
			todoIdx++;
			const todo = {
				id: todoIdx,
				text,
				date: Date.now(),
				done: false
			};
			todos.push({ ...todo });
			localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos));
			return Promise.resolve(todo);
		},
		updateTodo: (id, data) => {
			const todo = todos.find((x) => x.id === id);
			Object.keys(data).forEach((key) => {
				todo[key] = data[key];
			});
			localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos));
			return Promise.resolve({ ...todo });
		}
	};
})();
