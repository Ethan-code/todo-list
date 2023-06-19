import Dexie, { Table } from 'dexie';

export type DbTaskStatus = 'completed' | 'uncompleted';

export interface DbTask {
  id?: number;
  description?: string;
  createDate?: Date;
  updateDate?: Date;
  status?: DbTaskStatus;
}

export class AppDB extends Dexie {
  tasks!: Table<DbTask, number>;

  constructor() {
    super('TodoList');
    this.version(1).stores({
      tasks: '++id',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.tasks.bulkAdd([
      {
        description: '看 Netflix',
        createDate: new Date('2023/06/03'),
        updateDate: new Date('2023/06/10'),
        status: 'uncompleted',
      },
      {
        description: '買水果',
        createDate: new Date('2023/06/01'),
        updateDate: new Date('2023/06/08'),
        status: 'uncompleted',
      },
      {
        description: '運動',
        createDate: new Date('2023/06/02'),
        updateDate: new Date('2023/06/09'),
        status: 'completed',
      },
    ]);
  }
}

export const db = new AppDB();
