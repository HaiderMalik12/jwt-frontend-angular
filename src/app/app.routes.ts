import { Routes } from "@angular/router";
import { AuthFormComponent } from "./auth-form/auth-form.component";

export const routes: Routes = [
  { path: "signup", component: AuthFormComponent },
  { path: "", redirectTo: "/signup", pathMatch: "full" },
];
