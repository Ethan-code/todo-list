import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskStatus } from 'src/app/service/task.model';
import { ChangeTaskStatusEvent, DelateTaskEvent, EditTaskEvent } from '../task/task.component';

export interface EditTaskItemEvent {
  index: number;
  id: string;
  description: string;
}
export interface DeleteTaskItemEvent {
  id: string;
}
export interface ChangeTaskItemStatusEvent {
  id: string;
  status: TaskStatus;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() taskEdit: EventEmitter<EditTaskItemEvent> = new EventEmitter();
  @Output() taskDelete: EventEmitter<DeleteTaskItemEvent> = new EventEmitter();
  @Output() taskStatusChange: EventEmitter<ChangeTaskItemStatusEvent> = new EventEmitter();

  get sortedTasks() {
    return this.tasks.sort((a, b) => b.createDate.getTime() - a.createDate.getTime());
  }

  protected onTaskEdit(event: EditTaskEvent, index: number) {
    this.taskEdit.emit({
      index,
      id: event.id,
      description: event.description,
    });
  }

  protected onTaskDelete(event: DelateTaskEvent) {
    this.taskDelete.emit({
      id: event.id,
    });
  }

  protected onTaskStatusChange(event: ChangeTaskStatusEvent) {
    this.taskStatusChange.emit({
      id: event.id,
      status: event.status,
    });
  }
}
