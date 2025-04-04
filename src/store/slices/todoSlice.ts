import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, Priority, Status } from "../../types";
import { initialTodos } from "../../utils/todo-utils";

interface TodoState {
  todos: Todo[];
}

const loadInitialTodos = (userId: string | undefined): Todo[] => {
  if (!userId) return [];

  const savedTodos = localStorage.getItem(`todos_${userId}`);
  if (savedTodos) {
    return JSON.parse(savedTodos);
  } else {
    return initialTodos.filter((todo) => todo.userId === userId);
  }
};

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    loadTodos: (state, action: PayloadAction<string | undefined>) => {
      const userId = action.payload;
      if (userId) {
        state.todos = loadInitialTodos(userId);
      } else {
        state.todos = [];
      }
    },
    addTodo: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        priority: Priority;
        userId: string;
      }>,
    ) => {
      const { title, description, priority, userId } = action.payload;

      const newTodo: Todo = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        priority,
        status: "todo",
        createdAt: new Date(),
        userId,
      };

      state.todos.push(newTodo);

      // Save to localStorage
      localStorage.setItem(`todos_${userId}`, JSON.stringify(state.todos));
    },
    removeTodo: (
      state,
      action: PayloadAction<{ id: string; userId: string }>,
    ) => {
      const { id, userId } = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);

      // Save to localStorage
      if (userId) {
        localStorage.setItem(`todos_${userId}`, JSON.stringify(state.todos));
      }
    },
    updateTodoStatus: (
      state,
      action: PayloadAction<{ id: string; status: Status; userId: string }>,
    ) => {
      const { id, status, userId } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.status = status;
      }

      // Save to localStorage
      if (userId) {
        localStorage.setItem(`todos_${userId}`, JSON.stringify(state.todos));
      }
    },
    updateTodoPriority: (
      state,
      action: PayloadAction<{ id: string; priority: Priority; userId: string }>,
    ) => {
      const { id, priority, userId } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.priority = priority;
      }

      // Save to localStorage
      if (userId) {
        localStorage.setItem(`todos_${userId}`, JSON.stringify(state.todos));
      }
    },
  },
});

export const {
  loadTodos,
  addTodo,
  removeTodo,
  updateTodoStatus,
  updateTodoPriority,
} = todoSlice.actions;
export default todoSlice.reducer;
