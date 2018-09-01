import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopApiProvider } from '../../providers/shop-api/shop-api';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-add-loyalty-card',
  templateUrl: 'add-loyalty-card.html',
})
export class AddLoyaltyCardPage {

  public createLoyaltyForm: FormGroup;
  public results: any;
  public MaxLength: number = 200;
  public remaining: number = 200;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public shopApi: ShopApiProvider, public formBuilder: FormBuilder,
public loadingCtrl: LoadingController, public alertCtrl: AlertController,
public barcodeScanner: BarcodeScanner, public toastCtrl: ToastController) {
    this.createLoyaltyForm = formBuilder.group({
      shopName: ['', Validators.required],
      loyaltyBalance: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      about: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLoyaltyCardPage');
  }

  onTextarea(text: Object){
    // Calculates characters remaining in textarea field.
    this.remaining = this.MaxLength - Object.keys(text).length;
  //  console.log(text);
  //  console.log(this.remaining);
  }

  createLoyaltyCard(){
    // 1. Loading Component
    const loading: Loading = this.loadingCtrl.create();
    loading.present();

    const shopName = this.createLoyaltyForm.value.shopName;
    const loyaltyBalance = this.createLoyaltyForm.value.loyaltyBalance;
    const email = this.createLoyaltyForm.value.email;
    const about = this.createLoyaltyForm.value.about;


    this.shopApi.createLoyaltyCard(shopName, loyaltyBalance, email, about)
    .then( // Passing this form data to the shopApi provider.
      () => {
        loading.dismiss().then(() => { // success = return to previous home page
          this.navCtrl.pop();
          let toast = this.toastCtrl.create({
            message: 'New Loyalty Card Added',
            duration: 3000,
            position: 'top'
          });
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
          toast.present();
        });
      },
      error => {
        loading.dismiss().then(() => { // Fail = Show user friendly error.
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          alert.present();
        });
    });
  }

  scan(){
    // TODO - scan details from card to DB.
    this.barcodeScanner.scan().then(barcodeData => {
      this.results = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  reset(){
    this.results = null;
  }

  lookup(){
    window.open(`http://www.upcindex.com/${this.results.text}`, '_system')
  }

}
