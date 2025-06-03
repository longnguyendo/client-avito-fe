export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Backlog' | 'InProgress' | 'Done' ;

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  assignee?: User | null;
  boardId: string;
  boardName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  id: number;
  name: string;
  description?: string;
  tasks?: Task[];
  taskCount: number;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string;
  description?: string;
  teamId: number;
  teamName: string;
  tasksCount: number; 
}

export interface Teams {
  id: number;
  name: string;
  description?: string;
  usersCount: number;
  boardsCount: number; 
}