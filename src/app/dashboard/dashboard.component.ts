import { Component } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
}
