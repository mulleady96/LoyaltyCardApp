import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Alert } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { SignUpPage } from '../sign-up/sign-up';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;
  public formShow: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth) {
      this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignup(){
    this.navCtrl.push(SignUpPage);
  }

  formExpand(){
    this.formShow = !this.formShow;
  }

  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  // Login User with loading controller and alert of error message if login fail.
  loginUser(): void {
  if (!this.loginForm.valid) {
    console.log(
      `Form is not valid yet, current value: ${this.loginForm.value}`
    );
  } else {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authProvider.loginUser(email, password).then(
      authData => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(HomePage);
        });
      },
      error => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          alert.present();
        });
      }
    );
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}

  googleLogin(){ // Login using Google account credentials.
  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then(() => {
    this.navCtrl.setRoot(HomePage);
  });
}

  gitHubLogin(){ // Login using Github account credentials.
  this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
  .then(() => {
    this.navCtrl.setRoot(HomePage);
  });
  }

  twitterLogin(){
    firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
    .then(() => {
      this.navCtrl.setRoot(HomePage);
    })
  }
}
