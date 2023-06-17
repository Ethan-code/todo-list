import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  fetchTasks(): Task[] {
    return this.data;
  }

  addTask(task: Task): void {
    this.dataSubject.next([...this.data, task])
  }

}
