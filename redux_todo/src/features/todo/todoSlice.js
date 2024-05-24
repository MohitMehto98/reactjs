import { createSlice, nanoid } from "@reduxjs/toolkit";

const intialState = {
	todos: [
		{
			id: 1,
			text: "hello",
		},
	],
};

export const todoSlice = createSlice({
	name: "todo",
	intialState,
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				id: nanoid(),
				text: action.payload,
			};
			state.todos.push(todo);
		},
		deleteTodo: (state, action) => {
			state.todos = state.todos.filter((todo) => todo.id != action.payload);
		},
		updateTodo: (state, action) => {
			state.todos = state.todos.map((todo) =>
				todo.id == action.payload.id ? (todo.text = action.payload.text) : ""
			);
		},
	},
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
