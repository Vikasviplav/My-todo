import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todoList: [
        {
            id: 1,
            todo: "mytodo",
            isCompleted: false
        }
    ],
    addTodo: () => {},
    editTodo: () => {},
    deleteTodo: () => {},
    toggleComplete: () => {},
})

export const TodoContextProvider = TodoContext.Provider

export default function useTodo() {
    return useContext(TodoContext)
} 