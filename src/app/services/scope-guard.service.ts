import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Auth } from './auth0.service';

@Injectable()
export class ScopeGuardService implements CanActivate {

  constructor(public auth: Auth, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const scopes = (route.data as any).expectedScopes;

    if (!this.auth.isAuthenticated()) { //if (!this.auth.isAuthenticated() || !this.auth.userHasScopes(scopes)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
