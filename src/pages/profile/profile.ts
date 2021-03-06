import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';
import { LoginPage } from '../login/login';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  public userProfile: any;
  public birthDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public camera: Camera,
    public authProvider: AuthProvider, public loadingCtrl: LoadingController,
    public profileProvider: ProfileProvider) {

  }

  ionViewWillLoad() { // fixes issue of null value if data does not load in time, when user clicks on field.
    // solution - loadingCtrl - restrict user interaction until data is sought.
    console.log('Load User Profile');
    const loader = this.loadingCtrl.create({
      content: 'Loading Profile',
      duration: 3000
    });
    loader.present().then(() => {
      // this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      //   this.userProfile = userProfileSnapshot.val();
      //   this.birthDate = userProfileSnapshot.val().birthDate == null ? "DOB not set" : userProfileSnapshot.val().birthDate;

      //   // console.log(this.birthDate);
      // });

    });
    loader.dismiss();
  }

  ionViewDidLoad(){
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      //this.birthDate = "Date not set";
      this.birthDate = userProfileSnapshot.val() == null ? "DOB not set" : userProfileSnapshot.val().birthDate;

      console.log(this.birthDate);
    });
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage); // reset the root of app to Login, so we don't get <= at top left of page.
    });
  }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      title: "Update Name",
      inputs: [
        {
          name: "firstName",
          placeholder: "First name",
          value: this.userProfile.firstName
        },
        {
          name: "lastName",
          placeholder: "Last name",
          value: this.userProfile.lastName
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate: string): void {
    this.profileProvider.updateDOB(birthDate);
  }

  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      title: 'Update Information',
      inputs: [{ name: 'newEmail', placeholder: 'Your new email' },
      { name: 'password', placeholder: 'Your password', type: 'password' }],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => { console.log('Email Changed Successfully'); })
              .catch(error => { console.log('ERROR: ' + error.message); });
          }
        }]
    });
    alert.present();
  }

  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      title: 'Update Password',
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' }],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }

  async takePhoto() {
    // defining camera options.
    try {
      const options: CameraOptions = {
        quality: 60,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true

      }
      const result = await this.camera.getPicture(options);

      const image = `data:image/jpeg;base64,${result}`;

      const pictures = storage().ref('pictures/profile');
      pictures.putString(image, 'data_url');

    }
    catch (error) {
      console.error(error);
    }
  }

  getPhoto() {

    var storageRef = storage().ref('pictures/profile');
    storageRef.getDownloadURL().then(url => {
      console.log(url);
      //picture = url;
      return url;
    });
    //console.log(picture);
    //   return url;

  }



}
