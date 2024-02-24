import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-auth-form",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./auth-form.component.html",
  styleUrl: "./auth-form.component.css",
})
export class AuthFormComponent {
  constructor(private formBuilder: FormBuilder) {}

  authForm = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  onSubmit() {
    // Send API REQUEST TO BACKEND SERVER
    console.log(this.authForm.value);
  }
}
