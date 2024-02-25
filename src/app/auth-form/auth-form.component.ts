import { Component } from "@angular/core";
import { Route, Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-auth-form",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./auth-form.component.html",
  styleUrl: "./auth-form.component.css",
})
export class AuthFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    if (router.url === "/signin") {
      this.title = "Sign in";
      this.headerTitle = "Sign in to your Account";
    } else {
      this.title = "sign up";
      this.headerTitle = "Create new Account";
    }
  }

  title = "";
  headerTitle = "";
  authURL = "http://localhost:3001/api";

  authForm = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  onSubmit() {
    if (this.router.url === "/signup") {
      this.http.post(`${this.authURL}/signup`, this.authForm.value, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
        .subscribe((data) => {
          this.router.navigate(["signin"]);
        });
    } else {
      this.http.post(`${this.authURL}/signin`, this.authForm.value, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
        .subscribe((data) => {
          this.router.navigate(["dashboard"]);
        });
    }
  }
}
