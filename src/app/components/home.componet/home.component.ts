import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Auth } from '../../services/auth0.service';
import { AppService } from '../../services/app.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit {

    private environmentName = environment.envName+' - '+environment.urlPrefix;
    constructor(private auth: Auth, private appService: AppService) {  }
    user_profile: any;

    ngOnInit() {
        //console.log('ngAfterViewInit HomeComponent');
/*         this.appService.getSessionInfo().subscribe(
          (v) => (this.user_profile = v)
        ) */
        //this.user_profile = this.appService.profile;
        /* this.auth.profileSource.subscribe(
          v => {this.user_profile = v;}
        ) */
        if (this.auth.userProfile) {
            this.user_profile = this.auth.userProfile;
            } else {
                this.auth.getProfile((err, profile) => {
                this.user_profile = profile;
                });
            }
    }

    ngAfterContentInit() {
        //this.user_profile = this.appService.getSessionInfo();
        //this.user_profile = JSON.parse(localStorage.getItem('user_profile'));
    }
}
