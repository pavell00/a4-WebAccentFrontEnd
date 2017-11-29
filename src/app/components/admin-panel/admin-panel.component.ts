import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth0.service';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'admin',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

    public isRequesting: boolean;

    constructor(public auth: Auth, public admin: AdminService) {
      // Comment out this method call if using
      // hash-based routing
      auth.handleAuthentication();
    }

    ngOnInit() { }

}
