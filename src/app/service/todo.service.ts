import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MockServer } from '../server/mock-server';

export type TaskStatus = 'completed' | 'uncompleted';

export interface Task {
  id: number;
  description: string;
  createDate: Date;
  updateDate: Date;
  status: TaskStatus;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private mockserver: MockServer) {}

  fetchTasks(): Observable<Task[]> {
    return this.mockserver
      .getAllTasks()
      .pipe(map((tasks) => tasks.sort((a, b) => b.createDate.getTime() - a.createDate.getTime())));
  }

  addTask(description: string): Observable<number> {
    return this.mockserver.postTask({ description });
  }

  editTask(id: number, description: string): Observable<number> {
    return this.mockserver.putTask({ id, description });
  }

  deleteTask(id: number): Observable<void> {
    return this.mockserver.deletePost({ id });
  }

  changeTaskStatus(id: number, status: TaskStatus): Observable<number> {
    return this.mockserver.putTaskStatus({ id, status });
  }
}
