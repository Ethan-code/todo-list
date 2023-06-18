import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { Task } from '../service/task.model';
import { ChangeTaskStatusPayload, DeleteTaskPayload, EditTaskPayload, TodoService } from '../service/todo.service';
import { ChangeTaskItemStatusEvent, DeleteTaskItemEvent, EditTaskItemEvent } from './task-list/task-list.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  protected tasks: Task[] = [];
  protected checkSound: Howl;
  protected uncheckSound: Howl;
  protected deleteSound: Howl;

  constructor(private todoService: TodoService) {
    this.checkSound = new Howl({
      src: ['../../assets/audio/pencil_check_mark_2-105940_short.mp3'],
    });
    this.uncheckSound = new Howl({
      src: ['../../assets/audio/pencil_check_mark_1-88805_short.mp3'],
    });
    this.deleteSound = new Howl({
      src: ['../../assets/audio/crumple-03-40747_short.mp3'],
    });
  }

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
      description: event.description,
    };
    this.todoService.editTask(editTaskPayload);
    this.fetchTasks();
  }

  protected onTaskDelete(event: DeleteTaskItemEvent): void {
    const deleteTaskPayload: DeleteTaskPayload = {
      id: event.id,
    };
    this.todoService.deleteTask(deleteTaskPayload);
    this.deleteSound.play();
    this.fetchTasks();
  }

  protected onTaskStatusChange(event: ChangeTaskItemStatusEvent): void {
    const ChangeTaskStatusPayload: ChangeTaskStatusPayload = {
      id: event.id,
      status: event.status,
    };
    // 在 checkbox 勾選時播放音效
    if (event.status === 'completed') {
      this.checkSound.play();
    } else if (event.status === 'uncompleted') {
      this.uncheckSound.play();
    }
    this.todoService.changeTaskStatus(ChangeTaskStatusPayload);
    this.fetchTasks();
  }
}
