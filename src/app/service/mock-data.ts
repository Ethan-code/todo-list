import { Task } from './task.model';

export const MOCK_TASKS: Task[] = [
  {
    id: '1687050242659',
    description: '看 Netflix',
    createDate: new Date('2023/06/03'),
    updateDate: new Date('2023/06/10'),
    status: 'uncompleted',
  },
  {
    id: '1687050034985',
    description: '買水果',
    createDate: new Date('2023/06/01'),
    updateDate: new Date('2023/06/08'),
    status: 'uncompleted',
  },
  {
    id: '1681290242659',
    description: '運動',
    createDate: new Date('2023/06/02'),
    updateDate: new Date('2023/06/09'),
    status: 'completed',
  },
];
