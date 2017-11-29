import { Injectable } from '@angular/core';
import { Session, ISession } from '../model/index';

@Injectable()
export class AdminService{

    private user_profile: Session = new Session();
    constructor() { }

    public isAdmin(): boolean {
        let a: string;
        a = localStorage.getItem('user_profile');
        if (a != undefined) {
            let b = a.substr(1, a.length-2);//remove [ ] brackets from JSON string
            let jsonObj: any = JSON.parse(b); // string to generic object first
            this.user_profile = <Session> jsonObj;
            if (this.user_profile.dBroleName === 'db_owner') {
                return true;
            }
        }
        return false;
    }
}