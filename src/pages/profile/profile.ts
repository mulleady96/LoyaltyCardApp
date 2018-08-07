import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
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
      public authProvider: AuthProvider,
      public profileProvider: ProfileProvider) {

  }

  ionViewDidLoad() {
    console.log('Load User Profile');
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
  this.userProfile = userProfileSnapshot.val();
  this.birthDate = userProfileSnapshot.val().birthDate;
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
        placeholder: "Your first name",
        value: this.userProfile.firstName
      },
      {
        name: "lastName",
        placeholder: "Your last name",
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

updateDOB(birthDate:string):void {
  this.profileProvider.updateDOB(birthDate);
}

updateEmail(): void {
  let alert: Alert = this.alertCtrl.create({
    title: 'Update Information',
    inputs: [{ name: 'newEmail', placeholder: 'Your new email' },
    { name: 'password', placeholder: 'Your password', type: 'password' }],
    buttons: [
      { text: 'Cancel' },
      { text: 'Save',
        handler: data => {
          this.profileProvider
            .updateEmail(data.newEmail, data.password)
            .then(() => { console.log('Email Changed Successfully'); })
            .catch(error => { console.log('ERROR: ' + error.message); });
      }}]
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
      { text: 'Save',
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

async takePhoto(){
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
  catch(error) {
  console.error(error);
  }
}

   getPhoto(){

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
