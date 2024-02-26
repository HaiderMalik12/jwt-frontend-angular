import { inject, Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Product, ProductInput } from "./product";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private http = inject(HttpClient);

  constructor() {}

  /** GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.api_url}/product`)
      .pipe(
        catchError(this.handleError<Product[]>("getproducts", [])),
      );
  }
  createProduct(product: ProductInput): Observable<Product> {
    return this.http.post<Product>(`${environment.api_url}/product`, product)
      .pipe(
        catchError(this.handleError<Product>("createProduct")),
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
