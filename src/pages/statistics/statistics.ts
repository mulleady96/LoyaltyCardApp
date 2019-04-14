import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopApiProvider } from '../../providers/shop-api/shop-api';



@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  public currentShop: any = {};
  public shops: Array<any>;
  public recentPurchases: Array<any>;
  public purchasesCount: number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public shopApi: ShopApiProvider) {

  }


// Using dependency injection by calling the ShopApiProvider.

  ionViewDidLoad(shopId: string) {
    console.log('ionViewDidLoad StatisticsPage');

  //  this.shopApi.getRecentPurchases(shopId);
    this.shopApi.getShopList();

    this.shopApi.getShopList().on("value", shopListSnapshot => {
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
    //  this.count = this.shops.length; // count the no. of cards.
      //loader.dismiss();
    }),

    this.shopApi.getRecentPurchases(this.navParams.get("shopId")).orderByChild('createdDate').on("value", purchasesSnapshot => {
      this.recentPurchases = [];
      purchasesSnapshot.forEach(snap => {
        this.recentPurchases.push({
          id: snap.key,
          product: snap.val().product,
          createdDate: snap.val().createdDate
        });
        return false;
      }),
      this.recentPurchases.reverse();
      this.purchasesCount = this.recentPurchases.length; // count the number of purchases.
    });

  }


}
