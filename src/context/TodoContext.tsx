import { useState, ReactNode, useEffect } from "react";
import { Todo, Priority, Status } from "../types";
import { useAuth } from "../hooks/useAuth";
import { initialTodos } from "../utils/todo-utils";
import { TodoContext } from "../hooks/useTodo";

export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, description: string, priority: Priority) => void;
  removeTodo: (id: string) => void;
  updateTodoStatus: (id: string, status: Status) => void;
  updateTodoPriority: (id: string, priority: Priority) => void;
}

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { currentUser } = useAuth();

  // Load todos when user changes
  useEffect(() => {
    if (currentUser) {
      // Try to load from localStorage first
      const savedTodos = localStorage.getItem(`todos_${currentUser.id}`);
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      } else {
        // Fall back to initial todos on first login
        setTodos(initialTodos.filter((todo) => todo.userId === currentUser.id));
      }
    } else {
      setTodos([]);
    }
  }, [currentUser]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (currentUser && todos.length > 0) {
      localStorage.setItem(`todos_${currentUser.id}`, JSON.stringify(todos));
    }
  }, [todos, currentUser]);

  const addTodo = (title: string, description: string, priority: Priority) => {
    if (!currentUser) return;

    const newTodo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      priority,
      status: "todo",
      createdAt: new Date(),
      userId: currentUser.id,
    };

    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodoStatus = (id: string, status: Status) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

  const updateTodoPriority = (id: string, priority: Priority) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, priority } : todo))
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        updateTodoStatus,
        updateTodoPriority,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
