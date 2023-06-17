import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { MOCK_TODOS } from './mock-data';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  dataSubject: BehaviorSubject<Task[]> = new BehaviorSubject(MOCK_TODOS);
  get data() {
    return this.dataSubject.value;
  }

  constructor() { }

  fetchTasks(): Observable<Task[]> {
    return of(this.data);
  }

  addTask(description: string): Observable<void> {
    const task: Task = {
      description,
      createDate: new Date(),
      updateDate: new Date(),
      status: 'uncompleted'
    }
    this.dataSubject.next([...this.data, task]);
    return of();
  }

}
