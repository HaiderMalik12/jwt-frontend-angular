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
    if (router.url === "/login") {
      this.title = "login";
      this.headerTitle = "Login to your Account";
    } else {
      this.title = "sign up";
      this.headerTitle = "Create new Account";
    }
  }

  title = "";
  headerTitle = "";

  authForm = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  onSubmit() {
    // Send API REQUEST TO BACKEND SERVER
    console.log(this.authForm.value);
    this.http.post("http://localhost:3001/api/signup", this.authForm.value, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    })
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(["login"]);
      });
  }
}
