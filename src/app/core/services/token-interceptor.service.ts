import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { JwtService } from "./jwt.service";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const headersConfig: {
      "Content-Type": string;
      "Accept": string;
      "Authorization"?: string;
    } = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    const token = this.jwtService.getToken();
    if (token) {
      headersConfig["Authorization"] = `bearer ${token}`;
    }
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req);
  }
}
