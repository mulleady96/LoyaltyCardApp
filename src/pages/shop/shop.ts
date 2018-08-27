import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Shop } from '../../models/shop.interface';
import { ShopApiProvider } from '../../providers/shop-api/shop-api';
import { ProductPage } from '../product/product';
import { MapPage } from '../map/map';
//import * as moment from 'moment';
import { trigger, state, style, animate, transition } from '@angular/animations';

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
  animations: [
        trigger('itemState', [
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate('500ms ease-out')
            ]),
            transition('* => void', [
                animate('500ms ease-in', style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})

export class ShopPage {

  //public shop: Shop;
  public currentShop: any = {};
  public product: string = '';
  public points: number;
  public recentPurchases: Array<any>;
  public lastPurchases: Array<any>;
  public RecentPurchases = false; // boolean control - controls Recent Purchases & hide button.



  constructor(public navCtrl: NavController, public navParams: NavParams, public shopApi: ShopApiProvider) {
    //this.shop = this.navParams.get('shop');
    this.shopApi.getShopDetail(this.navParams.get("shopId")) // clicking on a shop, pass the correct id into the shop view. showing the correct index of the shopList array.
    .on("value", shopSnapshot => {
      this.currentShop = shopSnapshot.val();
      this.currentShop.id = shopSnapshot.key;
    });
  }

  ionViewDidLoad(shopId: string) {
    this.getLastPurchase(shopId);
    this.getRecentPurchases(shopId);
  }

  addPurchase(product: string) {
      this.shopApi.addPurchase(
        product,
        this.currentShop.id,
      )
      .then(newPurchase => {
        this.product = "";
        //this.points = null;
      });
  }


  getRecentPurchases(shopId: string){ // Shows the list of recentPurchases in the html view.
    this.shopApi.getRecentPurchases(this.navParams.get("shopId")).on("value", purchasesSnapshot => {
      this.recentPurchases = [];
      purchasesSnapshot.forEach(snap => {
        this.recentPurchases.push({
          id: snap.key,
          product: snap.val().product,
          createdDate: snap.val().createdDate
        });
        return false;
      });
    });
  }

   getLastPurchase(shopId: string){
     this.shopApi.getRecentPurchases(this.navParams.get("shopId")).orderByKey().limitToLast(1).on('value', lastSnapshot => {
       this.lastPurchases = [];
       lastSnapshot.forEach(snap => {
         this.lastPurchases.push({
           id: snap.key,
           product: snap.val().product,
           createdDate: snap.val().createdDate
         });
         console.log(this.lastPurchases);
         return false;
       });
     });

   }

  goToProductPage(shopId: string): void{ // Pass in current shop id to the products page for transaction on the correct shop data.
    this.navCtrl.push(ProductPage, { shopId: this.currentShop.id});
  }

  goToMap(){
    this.navCtrl.push(MapPage);
  }

}
