import { Component, inject, Input } from "@angular/core";
import { Product } from "../product";
import { Router, RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-product-item",
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: "./product-item.component.html",
  styleUrl: "./product-item.component.css",
})
export class ProductItemComponent {
  @Input()
  product: Product | undefined;
  private router = inject(Router);

  editProductHanlder(id: string) {
    console.log(id);
    this.router.navigate(["edit", id]);
  }
}
