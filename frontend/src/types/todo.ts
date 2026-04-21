export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  category: string;
}

export type Priority = 'low' | 'medium' | 'high';
export type FilterType = 'all' | 'active' | 'completed';