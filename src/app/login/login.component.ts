import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { IUser } from "../interfaces/IUser";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  error = "";

  constructor(private dbService: NgxIndexedDBService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("userId")) {
      this.router.navigate(["/tasks"]);
    }
  }

  login() {
    this.error = "";
    if (this.password.trim() === "" || this.username.trim() === "") {
      this.error = "Completa todos los campos";
    } else {
      this.dbService
        .getAllByIndex<IUser>(
          "user",
          "username",
          IDBKeyRange.only(this.username)
        )
        .subscribe((results) => {
          if (results.length === 0) {
            this.error = "El usuario no existe";
          } else if (this.password !== results[0].password) {
            this.error = "Password incorrecto";
          } else {
            localStorage.setItem("userId", `${results[0].id}`);
            localStorage.setItem("isAdmin", `${results[0].admin}`);
            this.router.navigate(["/tasks"]);
          }
        });
    }
  }
}
