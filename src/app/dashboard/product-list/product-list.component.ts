import { Component, inject, OnInit } from "@angular/core";
import { ProductItemComponent } from "../product-item/product-item.component";

import { Product } from "../product";
import { ProductService } from "../product.service";
import { NgFor } from "@angular/common";
import { SocketioService } from "../../core/socketio.service";
import { Subscription } from "rxjs";

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
  productSubscription: Subscription | undefined;

  constructor(private socketService: SocketioService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
    this.subscribeToProductCreation();
  }

  subscribeToProductCreation(): void {
    this.socketService.productCreated$.subscribe((newProduct) => {
      // Update product list
      this.products.push(newProduct);
    });
  }

  onDeleteProduct(id: string) {
    // Remove the deleted product from the products array
    this.products = this.products.filter((product) => product.id !== id);
  }
}
