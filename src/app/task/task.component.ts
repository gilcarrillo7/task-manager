import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ITask } from "../interfaces/ITask";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
})
export class TaskComponent {
  @Input() id = 0;
  @Input() nombre = "";
  @Input() completed = false;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onChange = new EventEmitter<ITask>();

  delete() {
    this.onDelete.emit(this.id);
  }

  changeStatus() {
    this.onChange.emit({
      id: this.id,
      name: this.nombre,
      userId: Number(localStorage.getItem("userId")),
      completed: this.completed,
    });
  }
}
