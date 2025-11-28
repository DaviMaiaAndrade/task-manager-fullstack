export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'to-do' | 'doing' | 'done';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  status: 'to-do' | 'doing' | 'done';
}