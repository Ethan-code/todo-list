import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { MOCK_TASKS } from './mock-data';
import { Task, TaskStatus } from './task.model';

export interface EditTaskPayload {
  id: string;
  description: string;
}
export interface DeleteTaskPayload {
  id: string;
}
export interface ChangeTaskStatusPayload {
  id: string;
  status: TaskStatus
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  dataSubject: BehaviorSubject<Task[]> = new BehaviorSubject(MOCK_TASKS);
  get data() {
    return this.dataSubject.value;
  }

  constructor() { }

  fetchTasks(): Observable<Task[]> {
    return of(this.data);
  }

  addTask(description: string): Observable<void> {
    const task: Task = {
      id: Date.now().toString(),
      description,
      createDate: new Date(),
      updateDate: new Date(),
      status: 'uncompleted'
    }

    this.dataSubject.next([...this.data, task]);
    return of();
  }

  editTask(event: EditTaskPayload): Observable<void> {
    let index = this.data.findIndex((task => task.id === event.id));
    if (index !== -1) {
      let origTask = this.data[index];
      let editedTask = {
        ...origTask,
        description: event.description,
        updateDate: new Date(),
      }
      const newData = this.data.map((task) => task.id === event.id ? editedTask : task)
      this.dataSubject.next(newData);
      return of();
    } else {
      return throwError(() => new Error('Not Found'));
    }
  }

  deleteTask(event: DeleteTaskPayload): Observable<void> {
    let index = this.data.findIndex((task => task.id === event.id));
    if (index !== -1) {
      const newData = this.data.filter((task) => task.id !== event.id)
      this.dataSubject.next(newData);
      return of();
    } else {
      return throwError(() => new Error('Not Found'));
    }
  }

  changeTaskStatus(event: ChangeTaskStatusPayload): Observable<void> {
    let index = this.data.findIndex((task => task.id === event.id));
    if (index !== -1) {
      let origTask = this.data[index];
      let editedTask = {
        ...origTask,
        status: event.status,
        updateDate: new Date(),
      }
      const newData = this.data.map((task) => task.id === event.id ? editedTask : task)
      this.dataSubject.next(newData);
      return of();
    } else {
      return throwError(() => new Error('Not Found'));
    }
  }

}
