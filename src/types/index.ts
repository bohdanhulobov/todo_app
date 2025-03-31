export type User = {
  id: string;
  username: string;
  password: string;
};

export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "done";

export type Todo = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
  userId: string;
};

export type Theme = "light" | "dark";
export type Language = "en" | "uk";
