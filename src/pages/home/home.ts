import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ListPage } from '../list/list';
import { stringify } from '@angular/compiler/src/util';
import { ShopApiProvider } from '../../providers/shop-api/shop-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //visible: Boolean;
  public favouriteShops: Array<any>;
  stores: string = 'All'; // ion-segment control -> using ngSwitch to show 2 different lists

  

  constructor(public navCtrl: NavController, public shopApi: ShopApiProvider) {

  }
  //TODO: Make the boilerplate html view replicate a social media platforms' news feed.
  // In this view specific stores and deals can be targeted at individual customers.

  ionViewDidLoad(){
    this.shopApi.getShopList().orderByChild('favourite').equalTo(true).on("value", favListSnapshot => {
      this.favouriteShops = [];
      favListSnapshot.forEach(snap => {
        this.favouriteShops.push({
          id: snap.key,
          shopName: snap.val().shopName,
          loyaltyBalance: snap.val().loyaltyBalance,
          email: snap.val().email,
          about: snap.val().about,
          favourite: snap.val().favourite
        });
        return false;
      });
    //this.count = this.favouriteShops.length; // count the no. of cards.
   // this.hideDiv2 = !this.hideDiv2;
    //  console.log(this.count);
      
    });
    console.log(this.favouriteShops);
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage);
  }

  goToListPage(){ // go to loyalty Cards.
    this.navCtrl.push(ListPage);
  }

  // toggleIcon(){
  //   // [name]="visible ? 'menu' : 'close'" -> Used to change icon on click, but no really worky.
  //   this.visible = !this.visible;
  // }


}
