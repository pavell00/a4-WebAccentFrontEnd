import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import { Session } from '../model/index';
import { AppService } from './app.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Headers, Http, Response, 
    URLSearchParams, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class Auth {

    userProfile: any;
    requestedScopes: string = 'openid profile read:messages write:messages';
    private urlPrefix = environment.urlPrefix;
    private sessionUrl = this.urlPrefix+'/sp_session';

    lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, { 
        oidcConformant: true,
        autoclose: true,
        auth: {
                redirectUrl: AUTH_CONFIG.callbackURL,
                responseType: 'token id_token',
                audience: `https://${AUTH_CONFIG.domain}/userinfo`,
                params: {
                    scope: this.requestedScopes
            }
        }
    });

    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        audience: `https://${AUTH_CONFIG.domain}/userinfo`,
        redirectUri: AUTH_CONFIG.callbackURL,      
        scope: this.requestedScopes
    });

    constructor(public router: Router, private appService: AppService, private http: Http) {}

    public login(): void{
        this.lock.show();
    }

    public handleAuthentication(): void {
        this.lock.on('authenticated', (authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.router.navigate(['/home']);
            }
        });
        this.lock.on('authorization_error', (err) => {
            this.router.navigate(['/welcome']);
            console.log(err);
            alert(`Error: ${err.error}. Check the console for further details.`);
        });
    }

    public getProfile(cb): void {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('Access token must exist to fetch profile');
        }

        const self = this;
        this.auth0.client.userInfo(accessToken, (err:any, profile:any) => {
            if (profile) {
                self.userProfile = profile;
                //localStorage.setItem('profile', JSON.stringify(profile));
            }
            cb(err, profile);
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        // If there is a value on the `scope` param from the authResult,
        // use it to set scopes in the session for the user. Otherwise
        // use the scopes as requested. If no scopes were requested,
        // set it to nothing
        const scopes = authResult.scope || this.requestedScopes || '';

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('scopes', JSON.stringify(scopes));
        // fill data to user_profile localStorage
        this.auth0.client.userInfo(authResult.accessToken, (err:any, profile:any) => {
            if (profile) {
                let ses = new Session();
                ses.nickName = profile.nickname;
                this.fill(ses.nickName).subscribe(v => true);
            }
        });
    }

    private fill(a: any): Observable<any> {
        let params = new URLSearchParams();
        params.set('nickname', '_' + a);
        return this.http
            .get(this.sessionUrl, { search: params })
            .map(response => <Session> response.json())
            //.do(response => console.log(JSON.stringify(response)))
            .do(response => localStorage.setItem('user_profile', JSON.stringify(response)))
            .do(response => this.appService.setProfile2(response))
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public logout() {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('scopes');
        localStorage.removeItem('user_profile');
        // Go back to the home route
        this.router.navigate(['/']);

        // refresh vindow for clear profile data
        window.location.reload();
    }
}