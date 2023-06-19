import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { DbTask, DbTaskStatus, db } from '../db/db';
import { Task } from './task.model';

export interface CreateTaskPayload {
  description: string;
}
export interface UpdateTaskPayload {
  id: number;
  description: string;
}
export interface UpdateTaskStatusPayload {
  id: number;
  status: DbTaskStatus;
}
export interface DeleteTaskPayload {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class MockServer {
  constructor() {}

  getAllTasks(): Observable<Task[]> {
    return from(db.tasks.toArray()).pipe(
      map((tasks: DbTask[]) =>
        tasks.map((task) => ({
          id: task.id! as number,
          description: task.description! as string,
          createDate: task.createDate! as Date,
          updateDate: task.updateDate! as Date,
          status: task.status! as DbTaskStatus,
        }))
      )
    );
  }

  postTask(payload: CreateTaskPayload): Observable<number> {
    const task: DbTask = {
      description: payload.description,
      createDate: new Date(),
      updateDate: new Date(),
      status: 'uncompleted',
    };
    return from(db.tasks.add(task));
  }

  putTask(payload: UpdateTaskPayload): Observable<number> {
    const task: DbTask = {
      description: payload.description,
      updateDate: new Date(),
    };
    return from(db.tasks.put(task));
  }

  putTaskStatus(payload: UpdateTaskStatusPayload): Observable<number> {
    const task: DbTask = {
      status: payload.status,
      updateDate: new Date(),
    };
    return from(db.tasks.put(task));
  }

  deletePost(payload: DeleteTaskPayload): Observable<void> {
    return from(db.tasks.delete(payload.id));
  }
}
