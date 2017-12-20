import { Injectable } from '@angular/core';
import { Session, ISession } from '../model/index';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { DbRoles, firstLevelItem }  from '../model/index';
import { AppService } from './app.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminService{
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    
    private user_profile: Session = new Session();
    public things : firstLevelItem [] = [];

    private urlPrefix = environment.urlPrefix;
    private firstLevelitemUrl: string = this.urlPrefix+'/sp_firstlevel';
    private roleTemplatesUrl: string = this.urlPrefix+'/sp_roletemplates';
    private dbRolesUrl: string = this.urlPrefix+'/sp_dbroles';
    private elementAccessUrl: string = this.urlPrefix+'/sp_elementaccess';
    private listTemplatesUrl: string = this.urlPrefix+'/sp_roottmls';
    private templatesAccessUrl: string = this.urlPrefix+'/sp_tmlsaccess';

    constructor(private http: Http, private appService: AppService) {}

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

    getAccessParams(uid: number) {
        let params = new URLSearchParams();
        params.set('roleid', String(uid));
        let a = this.http
        .get(this.firstLevelitemUrl, { search: params })
        .toPromise()
        .then(response => { let b = response.json();
            let folders = b[0].folders;
            let accounts = b[0].accounts;
            let agents = b[0].agents;
            let entities = b[0].entities;
            let miscs = b[0].miscs;
            let binders = b[0].binders;
            let templates = b[0].templates;
            let reports = b[0].reports;
            this.things.push(folders);
            this.things.push(accounts);
            this.things.push(agents);
            this.things.push(entities);
            this.things.push(miscs);
            this.things.push(binders);
            this.things.push(templates);
            this.things.push(reports);
            //console.log(this.things);
            })
            .catch(this.handleError)
        return this.things;
    }

    getRoleTemplates(uid: number): Promise<firstLevelItem[]> {
        let params = new URLSearchParams();
        params.set('roleid', String(uid));
        return this.http
            .get(this.roleTemplatesUrl, { search: params })
            //.do(data => {console.log(data)})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError)
    }

    refreshListTemplates(ar: any, role: any): Promise<firstLevelItem[]> {
        let params = new URLSearchParams();
        params.set('rootitems', JSON.stringify(ar));
        params.set('roleid', String(role.uid));
        return this.http
            .get(this.listTemplatesUrl, { search: params })
            //.do(data => {console.log(data)})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError)
    }

    saveCheckedTmls(ar: any, role: any): Promise<any> {
        //return Promise.resolve(null).then(() => (true));
        let params = new URLSearchParams();
        console.log(JSON.stringify(ar));
        //params.set('tmls', JSON.stringify(ar));
        //params.set('roleid', String(role.uid));
        return this.http.post(this.templatesAccessUrl, JSON.stringify(ar), this.options)
            .do(data => {console.log(data)})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError)
    }

    saveRootFoldersAccessConfig(tabId: number, arElementAccess: any, role: any) {
        this.appService.setSpinnerStatus(true);
        let a: firstLevelItem[]=[];
        a = arElementAccess.filter(ar => ar.checked === true);
        //add to end array identifier of tabId and roleid
        let b = {'id':role.uid, 'name': 'tabId:'+String(tabId)};
        a.push(b);
        //console.log(JSON.stringify(a));
        return this.http.post(this.elementAccessUrl, JSON.stringify(a), this.options)
            //.do(response => console.log(response.json()) )
            .toPromise()
            .then(response => {console.log(response.json());
                this.appService.setSpinnerStatus(false);
            })
            .catch(this.handleError)            
    }

    public getTest(): Observable<any[]> {
        return this.http
            .get('http://localhost:8080/sp_testjson')
            .map(response => <any[]> response.json())
            .catch(this.handleError)
    }

    private handleError(error: any){
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}