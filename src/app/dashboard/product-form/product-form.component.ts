import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../product.service";
import { ProductInput } from "../product";

@Component({
  selector: "app-product-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./product-form.component.html",
  styleUrl: "./product-form.component.css",
})
export class ProductFormComponent {
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  private productService = inject(ProductService);

  productForm = this.formBuilder.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    price: [0, Validators.required],
    qty: [0, Validators.required],
  });

  onSubmit() {
    this.productService.createProduct((this.productForm.value) as ProductInput)
      .subscribe(
        () => {
          this.router.navigate(["/dashboard"]);
        },
      );
  }
}
