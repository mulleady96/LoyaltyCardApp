import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Shop } from '../../models/shop.interface';
import { ShopApiProvider } from '../../providers/shop-api/shop-api';
import { ProductPage } from '../product/product';
import { MapPage } from '../map/map';



@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})

export class ShopPage {

  //public shop: Shop;
  public currentShop: any = {};
  public product: string = '';
  public points: number;
  public recentPurchases: Array<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public shopApi: ShopApiProvider) {
    //this.shop = this.navParams.get('shop');
    this.shopApi.getShopDetail(this.navParams.get("shopId")) // clicking on a shop, pass the correct id into the shop view. showing the correct index of the shopList array.
    .on("value", shopSnapshot => {
      this.currentShop = shopSnapshot.val();
      this.currentShop.id = shopSnapshot.key;
    });
  }

  ionViewDidLoad() {

  }

  addPurchase(product: string): void {
      this.shopApi.addPurchase(
        product,
        this.currentShop.id,
      )
      .then(newPurchase => {
        this.product = "";
        //this.points = null;
      })
  }

  getRecentPurchases(shopId: string){ // Shows the list of recentPurchases in the html view.
    this.shopApi.getRecentPurchases(this.navParams.get("shopId")).on("value", purchasesSnapshot => {
      this.recentPurchases = [];
      purchasesSnapshot.forEach(snap => {
        this.recentPurchases.push({
          id: snap.key,
          product: snap.val().product
        });
        return false;
      });
    });
  }

  goToProductPage(){
    this.navCtrl.push(ProductPage);
  }

  goToMap(){
    this.navCtrl.push(MapPage);
  }

}
