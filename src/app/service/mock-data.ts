import { Task } from "./task.model";

export const MOCK_TODOS: Task[] = [
  {
    description: '看 Netflix',
    createDate: new Date('2023/06/01'),
    updateDate: new Date('2023/06/01'),
    status: 'uncompleted',
  },
  {
    description: '買水果',
    createDate: new Date('2023/06/01'),
    updateDate: new Date('2023/06/01'),
    status: 'uncompleted',
  },
  {
    description: '運動',
    createDate: new Date('2023/06/01'),
    updateDate: new Date('2023/06/01'),
    status: 'completed',
  }
];
