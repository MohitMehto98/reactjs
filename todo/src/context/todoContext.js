import { useContext, createContext } from "react";

export const todoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Test",
    },
  ],
  addTodo: (todo) => {},
  deleteTodo: (id) => {},
  updateTodo: (id, todo) => {},
  completeTodo: (id) => {},
});

export const usetoDo = () => {
  return useContext(todoContext);
};

export const TodoProvider = todoContext.Provider;
