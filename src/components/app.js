import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

import AddTodo from './todos/add-todo';
import Todos from './todos/todos';

import '../App.css';

export default function App() {
	const initialise = useStoreActions((actions) => actions.initialise);
	useEffect(
		() => {
			initialise();
		},
		[ initialise ]
	);
	return (
		<div className="App">
			<div className="container mx-auto">
				<div className="p-10">
					<AddTodo />
					<Todos />
				</div>
			</div>
		</div>
	);
}
