import { Component, OnInit } from '@angular/core';
import { Task } from '../service/task.model';
import { TodoService } from '../service/todo.service';

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
}
