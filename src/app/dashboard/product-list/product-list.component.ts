import { Component, inject, OnInit } from "@angular/core";
import { ProductItemComponent } from "../product-item/product-item.component";

import { Product } from "../product";
import { ProductService } from "../product.service";
import { NgFor } from "@angular/common";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [NgFor, ProductItemComponent],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.css",
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onDeleteProduct(id: string) {
    // Remove the deleted product from the products array
    this.products = this.products.filter((product) => product.id !== id);
  }
}
