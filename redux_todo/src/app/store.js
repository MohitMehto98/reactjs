import { configStore } from "@reduxjs/toolkit";
import todoReducers from "../features/todo/todoSlice";

export const store = configStore({
	reducer: { todoReducers },
});
