import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Alert } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authProvider: AuthProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,  public formBuilder: FormBuilder) {

      this.signupForm = formBuilder.group({
    email: [
      "",
      Validators.compose([Validators.required, EmailValidator.isValid])
    ],
    password: [
      "",
      Validators.compose([Validators.minLength(6), Validators.required])
    ]
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signupUser(): void {
    if (!this.signupForm.valid) {
  console.log(
    `Need to complete the form, current value: ${this.signupForm.value}`
  );
} else {
  const email: string = this.signupForm.value.email;
  const password: string = this.signupForm.value.password;

  this.authProvider.signupUser(email, password).then(
    user => {
      this.loading.dismiss().then(() => {
        this.navCtrl.setRoot(HomePage);
      });
    },
    error => {
      this.loading.dismiss().then(() => {
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: "Ok", role: "cancel" }]
        });
        alert.present();
      });
    }
  );
  this.loading = this.loadingCtrl.create();
  this.loading.present();
    }
  }

}
