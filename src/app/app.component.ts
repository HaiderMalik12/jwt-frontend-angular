import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { io } from "socket.io-client";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  constructor() {
    const socket = io(`${environment.socket_endpoint}`);
  }
  ngOnInit(): void {
    // listen to event from server
  }

  title = "E-commerce App";
}
