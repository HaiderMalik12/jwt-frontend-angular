import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";

import { routes } from "./app.routes";
import { JwtTokenInterceptor } from "./core/services/jwt-token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([JwtTokenInterceptor])),
  ],
};
