import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth0.service';

@Component({
    //moduleId: module.id,
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    public isRequesting: boolean;

    constructor(public auth: Auth) {
      // Comment out this method call if using
      // hash-based routing
      auth.handleAuthentication();
    }

    ngOnInit() { }

}
