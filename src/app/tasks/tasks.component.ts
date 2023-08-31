import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { ITask } from "../interfaces/ITask";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
})
export class TasksComponent implements OnInit {
  newTask = false;
  showAlert = false;
  alertText = "";
  isDanger = true;
  tasks: ITask[] = [];

  constructor(private dbService: NgxIndexedDBService, private router: Router) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    if (localStorage.getItem("userId")) {
      this.dbService
        .getAllByIndex<ITask>(
          "task",
          "userId",
          IDBKeyRange.only(Number(localStorage.getItem("userId")))
        )
        .subscribe((result) => {
          this.tasks = result;
        });
    }
  }

  createNewTask($event: string) {
    if ($event !== "") {
      console.log($event);
      if (localStorage.getItem("userId")) {
        this.dbService
          .add("task", {
            name: $event,
            completed: false,
            userId: Number(localStorage.getItem("userId")),
          })
          .subscribe((_key) => {
            this.getTasks();
            this.alertText = "Tarea agregada";
            this.isDanger = false;
            this.showAlert = true;
          });
      }
    }
    this.newTask = false;
  }

  changeStatus($event: ITask) {
    this.dbService.update<ITask>("task", { ...$event }).subscribe((_tasks) => {
      this.alertText = "Status actualizado";
      this.isDanger = false;
      this.showAlert = true;
      this.getTasks();
    });
  }

  deleteTask($event: number) {
    if (localStorage.getItem("isAdmin") !== "true") {
      this.alertText = "No tienes permisos para borrar una tarea... :(";
      this.isDanger = true;
      this.showAlert = true;
    } else {
      this.dbService.delete<ITask>("task", $event).subscribe((_tasks) => {
        this.getTasks();
        this.alertText = "Tarea eliminada";
        this.isDanger = false;
        this.showAlert = true;
      });
    }
  }

  logout() {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");
    this.router.navigate(["/"]);
  }
}
