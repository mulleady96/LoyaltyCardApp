import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ShopApiProvider } from '../../providers/shop-api/shop-api';



@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  public images: any = [];
  public currentShop: any = {};


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public shopApi: ShopApiProvider, public toastCtrl: ToastController) {

    this.shopApi.getShopDetail(this.navParams.get("shopId")) // clicking on a shop, pass the correct id into the shop view. showing the correct index of the shopList array.
    .on("value", shopSnapshot => {
      this.currentShop = shopSnapshot.val();
      this.currentShop.id = shopSnapshot.key;
    });

    //TODO: Shwcase individual stores catalogues in the app.
    // this.images = [
    //   'http://placehold.it/175x175',
    //   'http://placehold.it/175x200',
    //   'http://placehold.it/150x300',
    //   'http://placehold.it/200x200',
    //   'http://placehold.it/175x175',
    //   'http://placehold.it/175x175',
    //   'http://placehold.it/175x200',
    //   'http://placehold.it/150x300',
    //   'http://placehold.it/200x200',
    //   'http://placehold.it/175x175'

  //  ];
  }

  ionViewDidLoad(shopId: string) {
    console.log('ionViewDidLoad ProductPage');

    }

  redeemProduct(){ // Use your LP Bal to redeem a free product.
    this.shopApi.redeemProduct(this.currentShop.id)
    .then(() => {
      let toast = this.toastCtrl.create({ // Notify user with success message
        message: 'Redeemed Free Product -100 LoyaltyPoints',
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
    })
  }




}
