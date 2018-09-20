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
  public result: number;


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

  // ionViewDidLoad(shopId: string) {
  //   console.log('ionViewDidLoad ProductPage');
  //
  //   }

  redeemProduct(){ // Use your LP Bal to redeem a free product.
    // -100 points from the users lP for that store.

      if(this.currentShop.loyaltyBalance <= 0 || this.currentShop.loyaltyBalance < 100){
      //  this.shopApi.redeemProduct(this.currentShop.id);
        this.result = 100 - this.currentShop.loyaltyBalance;
        //console.log(this.result);

        let toast1 = this.toastCtrl.create({ // Notify user with information message, that they do not have a min of 100 points
          message: 'You Need ' + this.result + ' More Points', //
          duration: 3000,
          showCloseButton: true,
          closeButtonText: 'OK!',
          dismissOnPageChange: true,
          position: 'bottom'
        });
        toast1.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast1.present();
      }

      else if(this.currentShop.loyaltyBalance >= 100){
        this.shopApi.redeemProduct(this.currentShop.id);
      let toast = this.toastCtrl.create({ // Notify user with success message
        message: 'Redeemed Free Product -100 Loyalty Points',
        duration: 3000,
        showCloseButton: true,
        closeButtonText: 'X',
        dismissOnPageChange: true,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
      }
    }


}
