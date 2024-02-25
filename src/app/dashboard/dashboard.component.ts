import { Component, inject, OnInit } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { NgClass, NgIf } from "@angular/common";
import { JwtService } from "../core/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [ProductListComponent, NgClass, NgIf],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  isLoggedIn: boolean = false;
  private jwtService = inject(JwtService);
  private router = inject(Router);
  ngOnInit(): void {
    if (this.jwtService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onLogout() {
    this.jwtService.destroyToken();
    this.router.navigate(["/signin"]);
  }
}
