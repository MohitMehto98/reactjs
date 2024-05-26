import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../features/todo/todoSlice";

const Todo = () => {
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch();
	const handleDelete = (id) => {
		dispatch(deleteTodo(id));
	};
	console.log(todos);
	return (
		<>
			<div>My Todo</div>
			<div>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.text}
						<button onClick={() => handleDelete(todo.id)}>X</button>
					</li>
				))}
			</div>
		</>
	);
};

export default Todo;
