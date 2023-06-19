import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockServer } from './mock-server';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private mockserver: MockServer) {}

  fetchTasks(): Observable<Task[]> {
    return this.mockserver.getAllTasks();
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
