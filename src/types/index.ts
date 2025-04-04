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

// Redux Action Types
export interface TodoAddPayload {
  title: string;
  description: string;
  priority: Priority;
  userId: string;
}

export interface TodoUpdateStatusPayload {
  id: string;
  status: Status;
  userId: string;
}

export interface TodoUpdatePriorityPayload {
  id: string;
  priority: Priority;
  userId: string;
}

export interface TodoRemovePayload {
  id: string;
  userId: string;
}

export interface AuthLoginPayload {
  username: string;
  password: string;
}
