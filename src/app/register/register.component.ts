import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { IUser } from "../interfaces/IUser";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  username = "";
  password = "";
  repassword = "";
  admin = false;
  error = "";

  constructor(private dbService: NgxIndexedDBService, private router: Router) {}

  register() {
    this.error = "";
    if (this.password.trim() === "" || this.username.trim() === "") {
      this.error = "Completa todos los campos";
    } else if (this.password !== this.repassword) {
      this.error = "El password no coincide";
    } else {
      this.dbService
        .getAllByIndex<IUser>(
          "user",
          "username",
          IDBKeyRange.only(this.username)
        )
        .subscribe((results) => {
          if (results.length === 0) this.registerUser();
          else this.error = "Ya existe el usuario";
        });
    }
  }

  registerUser() {
    this.dbService
      .add("user", {
        username: this.username,
        password: this.password,
        admin: this.admin,
      })
      .subscribe((key: IUser) => {
        console.log(key);
        localStorage.setItem("userId", `${key.id}`);
        localStorage.setItem("isAdmin", `${key.admin}`);
        this.router.navigate(["/tasks"]);
      });
  }
}
