import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent, TaskComponent, TodoComponent],
  imports: [CommonModule, FormsModule, FontAwesomeModule, TodoRoutingModule],
  exports: [TodoComponent],
})
export class TodoModule {}
