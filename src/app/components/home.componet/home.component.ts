import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Auth } from '../../services/auth0.service';
import { AppService } from '../../services/app.service';
import { environment } from '../../../environments/environment';
import { Session, ISession } from '../../model/index';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentChecked {

    private user_profile: Session = new Session();
    private a: any;

    private environmentName = environment.envName+' - '+environment.urlPrefix;

    constructor(private auth: Auth, private appService: AppService) {  }

    ngOnInit() {
/*     if (this.auth.userProfile) {
            this.user_profile = this.auth.userProfile;
            } else {
            this.auth.getProfile((err, profile) => {
            this.profile = profile;
             });
        } */
/*         this.appService.getProfile2().subscribe(
            (v) => {this.user_profile = v;}
        ); */
        //console.log(this.appService.getProfile2());
        //console.log(JSON.parse(localStorage.getItem('user_profile')));
    }

    ngAfterContentChecked(){
        //this.user_profile = this.appService.getProfile();
/*         this.appService.getProfile().subscribe(
            (v) => {this.user_profile = v;}
        ); */
        //console.log(JSON.stringify(this.appService.getProfile2()));
        //если  утентификация пройдена то возьмем данные профиля из localStorage
        let a: string;
        if (this.auth.isAuthenticated()) { a = localStorage.getItem('user_profile'); }
        //a = JSON.stringify(this.appService.getProfile2());//localStorage.getItem('user_profile');
        if (a) {
            let b = a.substr(1, a.length-2);//remove [ ] brackets from JSON string
            let jsonObj: any = JSON.parse(b); // string to generic object first
            this.user_profile = <Session> jsonObj;
            //Object.assign(b, a);
        }
        //console.log(JSON.stringify(this.user_profile));
    }
}
