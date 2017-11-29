import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {Auth} from './services/auth0.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private auth: Auth, private router: Router){  }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.auth.isAuthenticated()){
            //this.router.navigate(['home']);
            console.log('AUTH_GUARD PASSED');
            return true;
        } else {
            console.log('BLOCKED BY AUTH_GUARD');
            this.router.navigate(['/']);
            return false;
        }
    }
}