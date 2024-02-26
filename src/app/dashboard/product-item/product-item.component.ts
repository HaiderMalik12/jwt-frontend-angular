import { Component, inject, Input } from "@angular/core";
import { Product } from "../product";
import { Router, RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";
import { ProductService } from "../product.service";

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
  private productService = inject(ProductService);

  editProductHanlder(id: string) {
    this.router.navigate(["edit", id]);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe((data) => {
        // this.products = this.products.filter((p) => p.id !== id);
        console.log("product deleted");
        console.log(data);
      });
  }
}
