import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  
  var isloggedin = localStorage.getItem("isLoggedIn");

  if(isloggedin == 'true') {
    return true;
  }
  else {
    console.log("state url - ", state.url);
    return router.navigate(['/login']);
  }
  return true;
};
