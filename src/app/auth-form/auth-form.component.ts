import { Component, inject } from "@angular/core";
import { Route, Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { JwtService } from "../core/services";

interface LoginResponse {
  token: string;
  // other properties if any
}

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
  private http = inject(HttpClient);
  private jwtService = inject(JwtService);

  title = "";
  headerTitle = "";
  apiURL = environment.api_url;

  authForm = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  onSubmit() {
    if (this.router.url === "/signup") {
      this.http.post(`${this.apiURL}/signup`, this.authForm.value)
        .subscribe((data) => {
          this.router.navigate(["signin"]);
        });
    } else {
      this.http.post<LoginResponse>(
        `${this.apiURL}/signin`,
        this.authForm.value,
      )
        .subscribe((data: LoginResponse) => {
          this.jwtService.seToken(data.token);
          this.router.navigate(["dashboard"]);
        });
    }
  }
}
