import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  //TODO: Make the boilerplate html view replicate a social media platforms' news feed.
  // In this view specific stores and deals can be targeted at individual customers.

  goToProfile(){
    this.navCtrl.push(ProfilePage);
  }


}
