import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, 
    RouterStateSnapshot, Router } from '@angular/router';
import { AdminService } from './services/admin.service'

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private admin: AdminService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.admin.isAdmin()){
            console.log('ADMIN_GUARD PASSED');
            return true;
        } else {
            console.log('BLOCKED BY ADMIN_GUARD');
            this.router.navigate(['/']);
            return false;
        }
    }
}