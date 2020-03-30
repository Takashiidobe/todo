import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { setGlobalState, useGlobalState } from '../../state';
import RenderConditionally from '../helpers/RenderConditionally';
import Todo from './todo';
import ding from '../../assets/WLCompletionSound.mp3';

const reorder = (result, startIndex, endIndex) => {
	const [ removed ] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

function Todos() {
	const [ todos, setTodos ] = useGlobalState('currentTodos');
	const todosToComplete = todos.filter((todo) => todo.done);
	const todosToDo = todos.filter((todo) => !todo.done);
	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		const items = reorder(todos, result.source.index, result.destination.index);
		setTodos([ ...items ]);
		localStorage.setItem('__todo_list_todos', JSON.stringify(items));
	};
	const toggleDone = (id) => {
		for (const todo of todos) {
			if (todo.id === id) {
				todo.done = !todo.done;
				if (todo.done) {
					new Audio(ding).play();
				}
			}
		}
		setTodos([ ...todos ]);
		localStorage.setItem('__todo_list_todos', JSON.stringify(todos));
	};
	const toggleStar = (id) => {
		for (const todo of todos) {
			if (todo.id === id) {
				todo.starred = !todo.starred;
			}
		}
		setTodos([ ...todos ]);
		localStorage.setItem('__todo_list_todos', JSON.stringify(todos));
	};
	const toTrash = (id) => {
		const filteredTodos = [ ...todos.filter((todo) => todo.id !== id) ];
		setTodos(filteredTodos);
		localStorage.setItem('__todo_list_todos', JSON.stringify(filteredTodos));
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<RenderConditionally condition={todosToDo.length || todosToComplete.length}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							<div className="mt-4">
								<RenderConditionally condition={todosToDo.length}>
									<ul className="mh-48 overflow-auto">
										{todosToDo.map((todo, index) => (
											<Draggable key={index} draggableId={index.toString()} index={index}>
												{(provided, snapshot) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<Todo
															key={todo.id}
															todo={todo}
															toggle={toggleDone}
															toggleStar={toggleStar}
															toTrash={toTrash}
														/>
													</div>
												)}
											</Draggable>
										))}
									</ul>
								</RenderConditionally>
								<RenderConditionally condition={todosToComplete.length}>
									<h5 className="rounded py-2 px-3 mb-3 mt-3 completed-todo-header">
										{todosToComplete.length} COMPLETED TO-DO{todosToComplete.length === 1 ? '' : 'S'}
									</h5>
								</RenderConditionally>
								<RenderConditionally condition={todosToComplete.length}>
									<ul className="mh-48 overflow-auto">
										{todosToComplete.map((todo) => (
											<Todo
												key={todo.id}
												todo={todo}
												toggle={toggleDone}
												toggleStar={toggleStar}
												toTrash={toTrash}
											/>
										))}
									</ul>
								</RenderConditionally>
								{provided.placeholder}
							</div>
						</div>
					)}
				</Droppable>
			</RenderConditionally>
		</DragDropContext>
	);
}

export default Todos;
