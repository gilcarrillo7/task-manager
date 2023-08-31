import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
})
export class NewTaskComponent {
  @Output() onClose = new EventEmitter<string>();
  name = "";

  close() {
    this.onClose.emit("");
  }

  save() {
    if (this.name.trim() !== "") this.onClose.emit(this.name.trim());
  }
}
