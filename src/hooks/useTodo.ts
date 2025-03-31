import { createContext, useContext } from "react";
import type { TodoContextType } from "../context/TodoContext";

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
