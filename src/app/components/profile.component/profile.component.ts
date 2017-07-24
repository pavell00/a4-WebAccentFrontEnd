import { Component, OnInit } from '@angular/core';
import {Auth} from '../../services/auth0.service'

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile:any;

  constructor(private auth: Auth) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
  }

}
