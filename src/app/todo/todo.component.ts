import { Component, OnInit } from '@angular/core';
import { Task } from '../service/task.model';
import { DeleteTaskPayload, EditTaskPayload, TodoService } from '../service/todo.service';
import { DeleteTaskItemEvent, EditTaskItemEvent } from './task-list/task-list.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  protected tasks: Task[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  private fetchTasks(): void {
    this.todoService.fetchTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  protected onTaskAdd(description: string): void {
    this.todoService.addTask(description);
    this.fetchTasks();
  }

  protected onTaskEdit(event: EditTaskItemEvent): void {
    const editTaskPayload: EditTaskPayload = {
      id: event.id,
      description: event.description
    }
    this.todoService.editTask(editTaskPayload);
    this.fetchTasks();
  }

  protected onTaskDelete(event: DeleteTaskItemEvent): void {
    const deleteTaskPayload: DeleteTaskPayload = {
      id: event.id,
    }
    this.todoService.deleteTask(deleteTaskPayload);
    this.fetchTasks();
  }
}
