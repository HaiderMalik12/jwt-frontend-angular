import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ProductService } from "../product.service";
import { Product, ProductInput } from "../product";
import { catchError, Observable, of, switchMap } from "rxjs";
import { SocketioService } from "../../core/socketio.service";

@Component({
  selector: "app-product-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./product-form.component.html",
  styleUrl: "./product-form.component.css",
})
export class ProductFormComponent implements OnInit {
  private productService = inject(ProductService);
  product: Product | undefined;

  productForm = this.formBuilder.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    price: [0, Validators.required],
    qty: [0, Validators.required],
  });
  title = "Add Product";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private socketIOService: SocketioService,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        const id = params["id"];
        if (!id) {
          return of(null); // Return an observable that emits null
        }
        this.title = "Edit Product";
        return this.productService.getProduct(id).pipe(
          catchError((error) => {
            console.error("Error fetching product:", error);
            return of(null); // Return a safe value
          }),
        );
      }),
    ).subscribe((data: Product | null) => {
      if (data) {
        this.product = data;
        this.productForm.patchValue(data);
      }
    });
  }

  onSubmit() {
    //edit the product
    if (this.product) {
      this.productService.editProduct(
        (this.productForm.value) as ProductInput,
        this.product.id,
      )
        .subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(["/dashboard"]);
          },
        );
    } else {
      // create new product
      this.productService.createProduct(
        (this.productForm.value) as ProductInput,
      )
        .subscribe(
          (data) => {
            this.socketIOService.emit("product:add", data);
            this.router.navigate(["/dashboard"]);
          },
        );
    }
  }
}
