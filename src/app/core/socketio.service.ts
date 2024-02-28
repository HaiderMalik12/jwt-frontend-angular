import { Injectable } from "@angular/core";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import * as io from "socket.io-client";

import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SocketioService {
  private socket: any;

  constructor() {
    this.socket = io.default("http://localhost:3001");
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
