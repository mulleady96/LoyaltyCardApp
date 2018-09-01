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
  animations: [
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
  public favouriteShops: Array<any>;

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
          return (s.shopName.toLowerCase().indexOf(searchText)) > -1});
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

    goToShopDetail(shopId: string): void {
      this.navCtrl.push(ShopPage, {shopId: shopId});
    }

    goToLoyaltyPage(){
      this.navCtrl.push(AddLoyaltyCardPage);
    }
  }
