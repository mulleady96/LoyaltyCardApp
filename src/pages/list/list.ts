import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, reorderArray } from 'ionic-angular';
import { ShopPage } from '../shop/shop';
import { ShopApiProvider } from '../../providers/shop-api/shop-api';
//import { Shop } from '../../models/shop.interface';
//import { Observable } from 'rxjs/Observable';
import { AddLoyaltyCardPage } from '../add-loyalty-card/add-loyalty-card';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  animations: [ // Slide items up from the bottom of screen.
        trigger('itemState', [
            transition('void => *', [
                style({transform: 'translateY(100%)'}),
                animate('0.6s ease-in-out')
            ]),
            transition('* => void', [
                animate('0.6s ease-in-out', style({transform: 'translateY(100%)'}))
            ])
        ])
    ]
})

export class ListPage {

  //public shops: Observable<Shop[]>; Use Observable for firestore.
  public shops: Array<any>;
  public count: number;
  public searchText: string;
  public allShops: any;
  public hideDiv: boolean;
  public hideDiv2: boolean; // hide second list

  public favouriteShops: Array<any>;
  public isListOfShops = false; // boolean control - if there is no list of shops, show other content.

  stores: string = 'All'; // ion-segment control -> using ngSwitch to show 2 different lists

  constructor(public navCtrl: NavController, public navParams: NavParams,
   private shopApi: ShopApiProvider, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad(){ // when page is loaded, presents loading controller, if content ready to be displayed then the loadingCtrl is dismissed.
    console.log('hello');
    const loader = this.loadingCtrl.create({
      content: 'Loading Loyalty Cards',
      duration: 3000
    });
    loader.present();

    // Get Favourites
    
// OrderByChild() orders the shops by lowest to highest loyaltyPoints,
// this order is then reversed in the html - line 29. This orders the stores most popular with that user.
    this.shopApi.getShopList().orderByChild('loyaltyBalance').on("value", shopListSnapshot => {
      this.shops = [];
      shopListSnapshot.forEach(snap => {
        this.shops.push({
          id: snap.key,
          shopName: snap.val().shopName,
          loyaltyBalance: snap.val().loyaltyBalance,
          email: snap.val().email,
          about: snap.val().about
        });
        return false;
      });
      this.count = this.shops.length; // count the no. of cards.
      this.hideDiv = !this.hideDiv;
      loader.dismiss();
    });
    //this.shops = this.shopApi.getShopList().valueChanges(); // firestore
    }

    doRefresh(refresher){ // ion-refresher - slide down and refresh page in case items need updating.
      setTimeout(() => {
      this.ionViewDidLoad();
      refresher.complete();
    }, 2000);
  }


    getFilteredList(){ // Serchbar Filters list based on text input, when user hits the x(cancel) the shopList array is reloaded.
      let searchText =  this.searchText.toLowerCase();
      let filteredShops = [];

        if(searchText && searchText.trim() != ''){
        filteredShops = this.shops.filter((s) => {
          return (s.shopName.toLowerCase().indexOf(searchText.toLowerCase())) > -1});
          this.shops = filteredShops;

        }
        else {
          return this.shopApi.getShopList().orderByChild('loyaltyBalance').on("value", shopListSnapshot => {
              this.shops = [];
              shopListSnapshot.forEach(snap => {
                this.shops.push({
                  id: snap.key,
                  shopName: snap.val().shopName,
                  loyaltyBalance: snap.val().loyaltyBalance,
                  email: snap.val().email,
                  about: snap.val().about
                });
                return false;
              });
              this.count = this.shops.length;
            });
        }
        console.log(this.searchText);

      console.log(this.shops);
    }

    // reOrderItem(indexes){ // Allows the user to reorder the array of loyalty Cards to their liking.
    //   // i.e - Their favourite ones can be dragged to the top.
    //   this.shops = reorderArray(this.shops, indexes);
    //   this.shopApi.updateShopList(indexes);
    //   console.log(this.shops);
    // }

    getFavouriteList() {
      // order by favourites val, if true send it to the favourites array.
      // ** Only display the stores with val set to true. 

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
      this.count = this.favouriteShops.length; // count the no. of cards.
      this.hideDiv2 = !this.hideDiv2;
        console.log(this.count);
        
      });
      console.log(this.favouriteShops);
      
    }

    updateFavourite(shopId){
      this.shopApi.updateFavourites(shopId);
    }

    removeFavourite(shopId){
      this.shopApi.removeFavourites(shopId);
    }

    goToShopDetail(shopId: string): void {
      this.navCtrl.push(ShopPage, {shopId: shopId});
    }

    goToLoyaltyPage(){
      this.navCtrl.push(AddLoyaltyCardPage);
    }
  }
