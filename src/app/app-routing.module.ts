import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { TasksComponent } from "./tasks/tasks.component";
import { AuthGuardService } from "./auth-guard.service";

const routes: Routes = [
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  {
    path: "tasks",
    component: TasksComponent,
    pathMatch: "full",
    canActivate: [AuthGuardService],
  },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
