import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
// import { io } from "socket.io-client";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // const socket = io(`${environment.socket_endpoint}`);
  }

  title = "E-commerce App";
}
