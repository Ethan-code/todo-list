export type TaskStatus = 'completed' | 'uncompleted';

export interface Task {
  id: number;
  description: string;
  createDate: Date;
  updateDate: Date;
  status: TaskStatus;
}
