import React, { useEffect } from 'react';

import AddTodo from './todos/add-todo';
import Todos from './todos/todos';

import '../App.css';

export default function App() {
	return (
		<div className="App">
			<div className="container mx-auto">
				<div className="p-10 h-64">
					<AddTodo />
					<Todos />
				</div>
			</div>
		</div>
	);
}
