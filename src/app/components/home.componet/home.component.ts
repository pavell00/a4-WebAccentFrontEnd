import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Auth } from '../../services/auth0.service';
import { AppService } from '../../services/app.service';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentChecked {

    private user_profile: any;
    private environmentName = environment.envName+' - '+environment.urlPrefix;

    constructor(private auth: Auth, private appService: AppService) {  }

    ngOnInit() {
/*     if (this.auth.userProfile) {
            this.user_profile = this.auth.userProfile;
            } else {
            this.auth.getProfile((err, profile) => {
            this.user_profile = profile;
             });
        } */
        this.user_profile = this.appService.getProfile();
    }

    ngAfterContentChecked(){
        //this.user_profile = this.appService.getProfile();
    }
}
