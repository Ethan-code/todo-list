type TaskStatus = 'completed' | 'uncompleted'

export interface Task {
  id: string,
  description: string,
  createDate: Date,
  updateDate: Date,
  status: TaskStatus
}

