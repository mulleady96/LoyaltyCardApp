import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  images: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    //TODO: Shwcase individual stores catalogues in the app.
    this.images = [
      'http://placehold.it/175x175',
      'http://placehold.it/175x200',
      'http://placehold.it/150x300',
      'http://placehold.it/200x200',
      'http://placehold.it/175x175',
      'http://placehold.it/175x175',
      'http://placehold.it/175x200',
      'http://placehold.it/150x300',
      'http://placehold.it/200x200',
      'http://placehold.it/175x175'

    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }



}
