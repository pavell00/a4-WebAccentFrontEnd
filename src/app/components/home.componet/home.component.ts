import { Component, OnInit } from '@angular/core';
import {Auth} from '../../services/auth0.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    private environmentName = environment.envName+' - '+environment.urlPrefix;
    constructor(private auth: Auth) {  }

  ngOnInit() {
  }

}
