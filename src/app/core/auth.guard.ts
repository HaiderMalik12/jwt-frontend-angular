import { CanActivateFn, Router } from "@angular/router";
import { JwtService } from "./services";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  if (jwtService.getToken()) {
    return true;
  } else {
    router.navigate(["/signin"]);
    return false;
  }
};
