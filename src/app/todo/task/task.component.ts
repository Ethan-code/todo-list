import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/service/task.model';

export interface EditTaskEvent {
  id: string,
  description: string,
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() taskEdit = new EventEmitter<EditTaskEvent>();

  @ViewChild('input', { static: false }) inputElement: ElementRef | undefined;

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
      this.inputElement?.nativeElement.focus()
    });
  }

  protected switchMode() {
    if (this.isViewMode) {
      this.switchToEditMode();
    } else {
      this.switchToViewMode();
    }
  }

  protected onEnter(): void {
    const editTaskEvent: EditTaskEvent = {
      id: this.task.id,
      description: this.description
    }
    this.taskEdit.emit(editTaskEvent);
    this.switchMode();
  }
}
