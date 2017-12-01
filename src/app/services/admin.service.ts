import { Injectable } from '@angular/core';
import { Session, ISession } from '../model/index';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { DbRoles, firstLevelItem }  from '../model/index';
import { retry } from 'rxjs/operator/retry';

@Injectable()
export class AdminService{
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    
    private user_profile: Session = new Session();
    public things : firstLevelItem [][] = [];

    private urlPrefix = environment.urlPrefix;
    private firstLevelitemUrl: string = this.urlPrefix+'/sp_firstlevel';
    private dbRolesUrl: string = this.urlPrefix+'/sp_dbroles';


    constructor(private http: Http) {}

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

    public getDBRoles(): Observable<DbRoles[]> {
        return this.http
            .get(this.dbRolesUrl)
            .map(response => <DbRoles[]> response.json())
            //.do( data => console.log(data))
            .catch(this.handleError)
    }

    getAccessParams(uid: number): Observable<firstLevelItem[]> {
        this.things.length = 0;
        let params = new URLSearchParams();
        //for(var i: number = 0; i < 7; i++) {
            this.things[0] = [];
            params.set('roleid', String(uid));
            params.set('tabid', String(1));
            return this.http
                .get(this.firstLevelitemUrl, { search: params })
                .map(response =>  response.json())
                //.do( data => {this.things[0] = data;
                //     console.log(data);})
                .catch(this.handleError)
            /*for(var j: number = 0; j< 10; j++) {
                this.things[i][j] = new firstLevelItem(j, 'item '+j, true);
            }*/
        //} 
        //return this.things;
    }

    private handleError(error: any){
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}