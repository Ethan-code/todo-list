import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  protected tasks: string[] = ["待辦 A", "待辦 B", "待辦 C"];
}
