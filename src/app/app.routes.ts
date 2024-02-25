import { Routes } from "@angular/router";
import { AuthFormComponent } from "./auth-form/auth-form.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { authGuard } from "./core/auth.guard";

export const routes: Routes = [
  { path: "signup", component: AuthFormComponent },
  { path: "signin", component: AuthFormComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: "", redirectTo: "/signup", pathMatch: "full" },
];
