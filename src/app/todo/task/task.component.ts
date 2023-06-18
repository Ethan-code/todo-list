import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Task, TaskStatus } from 'src/app/service/task.model';

export interface EditTaskEvent {
  id: string;
  description: string;
}
export interface DelateTaskEvent {
  id: string;
}
export interface ChangeTaskStatusEvent {
  id: string;
  status: TaskStatus;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() taskEdit = new EventEmitter<EditTaskEvent>();
  @Output() taskDelete = new EventEmitter<DelateTaskEvent>();
  @Output() taskStatusChange = new EventEmitter<ChangeTaskStatusEvent>();

  @ViewChild('input', { static: false }) inputElement: ElementRef | undefined;

  protected faXmark = faXmark;

  protected mode: 'view' | 'edit' = 'view';
  protected description = '';

  get isViewMode() {
    return this.mode === 'view';
  }
  private switchToViewMode() {
    this.description = '';
    this.mode = 'view';
  }
  private switchToEditMode() {
    this.description = this.task.description;
    this.mode = 'edit';
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    });
  }

  protected switchMode() {
    if (this.isViewMode) {
      this.switchToEditMode();
    } else {
      this.switchToViewMode();
    }
  }

  protected onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();
    const deleteTaskEvent: DelateTaskEvent = {
      id: this.task.id,
    };
    this.taskDelete.emit(deleteTaskEvent);
  }

  protected onEnter(): void {
    if (!this.description) return;
    const editTaskEvent: EditTaskEvent = {
      id: this.task.id,
      description: this.description,
    };
    this.taskEdit.emit(editTaskEvent);
    this.switchMode();
  }

  protected onStatusChange(event: Event) {
    event.stopPropagation();
    const isChecked = (event.target as HTMLInputElement).checked;
    const changeTaskStatusEvent: ChangeTaskStatusEvent = {
      id: this.task.id,
      status: isChecked ? 'completed' : 'uncompleted',
    };
    this.taskStatusChange.emit(changeTaskStatusEvent);
  }
}
