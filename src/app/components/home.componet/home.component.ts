import { Component, OnInit } from '@angular/core';
import {Auth} from '../../services/auth0.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private auth: Auth) { }

  ngOnInit() {
  }

}
