export interface Task {
  description: string,
  createDate: Date,
  updateDate: Date,
  status: 'completed' | 'uncompleted'
}
