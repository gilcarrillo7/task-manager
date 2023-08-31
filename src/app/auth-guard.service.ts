import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem("userId")) return true;
    this.router.navigate(["/login"]);
    return false;
  }
}
