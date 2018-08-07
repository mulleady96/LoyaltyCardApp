import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import { AuthCredential } from 'firebase/auth';
import 'firebase/database';

@Injectable()
export class ProfileProvider {

  public userProfile: firebase.database.Reference; // ref obj to the current logged in user.
  public currentUser: User;

  constructor() {
    console.log('Hello ProfileProvider Provider');
    firebase.auth().onAuthStateChanged( user => {
    if(user){
      this.currentUser = user;
      // Should prob ref firestore using the public firestore: AngularFirestore instead.***
      this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
    }
  });
  }

  getUserProfile(): firebase.database.Reference {
  return this.userProfile;
  }

  updateName(firstName: string, lastName: string): Promise<any> { // updates users name in the profile view.
  return this.userProfile.update({ firstName, lastName });
  }

  updateDOB(birthDate:string): Promise<any> { // update DOB and persists this data to the db.
  return this.userProfile.update({ birthDate });
  }

  updateEmail(newEmail: string, password: string): Promise<any> { // updates email and reconfigures these settings changes for the next login.
  const credential: AuthCredential = firebase.auth.
    EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
  return this.currentUser
    .reauthenticateWithCredential(credential)
    .then(user => {
      this.currentUser.updateEmail(newEmail).then(user => {
        this.userProfile.update({ email: newEmail });
        });
      })
    .catch(error => {
      console.error(error);
      });
    }

    updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: AuthCredential = firebase.auth
      .EmailAuthProvider.credential(
        this.currentUser.email,
        oldPassword
      );

return this.currentUser
  .reauthenticateWithCredential(credential)
  .then(user => {
    this.currentUser.updatePassword(newPassword).then(user => {
      console.log('Password Changed');
      });
    })
  .catch(error => {
    console.error(error);
    });
}

}
