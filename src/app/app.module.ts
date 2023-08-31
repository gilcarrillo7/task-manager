import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register.component";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { NgxIndexedDBModule, DBConfig } from "ngx-indexed-db";
import { AlertComponent } from "./alert/alert.component";
import { AuthGuardService } from "./auth-guard.service";

const dbConfig: DBConfig = {
  name: "TasksDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "user",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "username", keypath: "username", options: { unique: false } },
        { name: "password", keypath: "password", options: { unique: false } },
        { name: "admin", keypath: "admin", options: { unique: false } },
      ],
    },
    {
      store: "task",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "userId", keypath: "userId", options: { unique: false } },
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "completed", keypath: "completed", options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TasksComponent,
    TaskComponent,
    NewTaskComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
