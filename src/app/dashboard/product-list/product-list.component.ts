import { Component, inject, OnInit } from "@angular/core";
import { ProductItemComponent } from "../product-item/product-item.component";

import { Product } from "../product";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.css",
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
    });
  }
}
