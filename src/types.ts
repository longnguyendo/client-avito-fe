export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Backlog' | 'InProgress' | 'Done' ;

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  boardId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  id: number;
  name: string;
  tasks?: Task[];
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string;
}