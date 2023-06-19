import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, TaskStatus } from 'src/app/service/task.model';
import { ChangeTaskStatusEvent, DelateTaskEvent, EditTaskEvent } from '../task/task.component';

export interface EditTaskItemEvent {
  id: number;
  description: string;
}
export interface DeleteTaskItemEvent {
  id: number;
}
export interface ChangeTaskItemStatusEvent {
  id: number;
  status: TaskStatus;
}

interface FilteredCondition {
  value: ConditionValue;
  description: string;
}

enum ConditionValue {
  ALL = 'ALL',
  TODO = 'TODO',
  DONE = 'DONE',
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnChanges {
  @Input() tasks: Task[] = [];
  @Output() taskEdit: EventEmitter<EditTaskItemEvent> = new EventEmitter();
  @Output() taskDelete: EventEmitter<DeleteTaskItemEvent> = new EventEmitter();
  @Output() taskStatusChange: EventEmitter<ChangeTaskItemStatusEvent> = new EventEmitter();

  private _tasks: Task[] = [];
  private displayTasksSubject = new BehaviorSubject<Task[]>([]);
  protected get displayTasks$() {
    return this.displayTasksSubject.asObservable();
  }
  protected get displayTasks(): Task[] {
    return this.displayTasksSubject.value;
  }

  protected conditions: FilteredCondition[] = [
    { value: ConditionValue.TODO, description: '待辦' },
    { value: ConditionValue.DONE, description: '完成' },
    { value: ConditionValue.ALL, description: '全部' },
  ];
  protected selectedCondition = ConditionValue.TODO;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      const tasks = changes['tasks'].currentValue as Task[];
      this._tasks = tasks.sort((a, b) => b.createDate.getTime() - a.createDate.getTime());
      const newTasks = this.getFilterTasksByCondition(this._tasks, this.selectedCondition);
      this.displayTasksSubject.next(newTasks);
    }
  }

  protected onTaskEdit(event: EditTaskEvent) {
    this.taskEdit.emit({
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

  protected onFilterConditionChange(condition: FilteredCondition) {
    this.selectedCondition = condition.value;
    const filteredTasks = this.getFilterTasksByCondition(this._tasks, condition.value);
    this.displayTasksSubject.next(filteredTasks);
  }

  private getFilterTasksByCondition(tasks: Task[], value: ConditionValue): Task[] {
    if (ConditionValue.TODO === value) {
      return tasks.filter((task) => task.status === 'uncompleted');
    } else if (ConditionValue.DONE === value) {
      return tasks.filter((task) => task.status === 'completed');
    } else if (ConditionValue.ALL === value) {
      return tasks;
    }
    return [];
  }
}
