import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { JwtService } from ".";

export const JwtTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const headersConfig: {
    "Content-Type": string;
    "Accept": string;
    "Authorization"?: string;
  } = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };
  const token = jwtService.getToken();
  if (token) {
    headersConfig["Authorization"] = `bearer ${token}`;
  }
  const _req = req.clone({ setHeaders: headersConfig });
  return next(_req);
};
