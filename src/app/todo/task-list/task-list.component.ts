import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/service/task.model';
import { DelateTaskEvent, EditTaskEvent } from '../task/task.component';

export interface EditTaskItemEvent {
  index: number,
  id: string,
  description: string,
}
export interface DeleteTaskItemEvent {
  id: string,
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() taskEdit: EventEmitter<EditTaskItemEvent> = new EventEmitter();
  @Output() taskDelete: EventEmitter<DeleteTaskItemEvent> = new EventEmitter();

  protected onTaskEdit(event: EditTaskEvent, index: number) {
    this.taskEdit.emit({
      index,
      id: event.id,
      description: event.description
    });
  }

  protected onTaskDelete(event: DelateTaskEvent) {
    this.taskDelete.emit({
      id: event.id,
    });
  }
}
