import { Todo, Priority, Status } from "../types";

export const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Complete project",
    description: "Finish the React Todo app",
    priority: "high",
    status: "in-progress",
    createdAt: new Date(),
    userId: "1",
  },
  {
    id: "2",
    title: "Learn Material UI",
    description: "Get familiar with Material UI components",
    priority: "medium",
    status: "todo",
    createdAt: new Date(),
    userId: "1",
  },
];

export const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "low":
      return "success";
    case "medium":
      return "info";
    case "high":
      return "error";
    default:
      return "default";
  }
};

export const getStatusColor = (status: Status) => {
  switch (status) {
    case "todo":
      return "default";
    case "in-progress":
      return "warning";
    case "done":
      return "success";
    default:
      return "default";
  }
};
