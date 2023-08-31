import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
})
export class AlertComponent implements OnInit {
  @Input() text = "";
  @Input() isDanger = true;
  @Output() onClose = new EventEmitter();
  close() {
    this.onClose.emit();
  }

  ngOnInit(): void {
    setTimeout(() => this.onClose.emit(), 3500);
  }
}
