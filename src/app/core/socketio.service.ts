import { Injectable, NgZone } from "@angular/core";
import { io, Socket } from "socket.io-client";

import { environment } from "../../environments/environment";
import { Observable, Subject } from "rxjs";
import { ProductService } from "../dashboard/product.service";

@Injectable({
  providedIn: "root",
})
export class SocketioService {
  private socket: Socket;
  private productCreatedSource = new Subject<any>();
  productCreated$ = this.productCreatedSource.asObservable();

  constructor(private productService: ProductService) {
    this.socket = io(`${environment.socket_endpoint}`);

    this.socket.on("product:created", (product) => {
      this.productCreatedSource.next(product);
    });
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
