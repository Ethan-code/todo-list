import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Output() taskAdd = new EventEmitter<string>();

  protected description = '';

  protected onEnter(event: Event): void {
    this.taskAdd.emit(this.description);
    this.description = '';
  }
}
