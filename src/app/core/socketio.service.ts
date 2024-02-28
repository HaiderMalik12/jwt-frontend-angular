import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";

import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SocketioService {
  private socket: Socket;

  constructor() {
    this.socket = io(`${environment.socket_endpoint}`);

    this.socket.on("product:created", (product) => {
      console.log("new product created");
      console.log(product);
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
