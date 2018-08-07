import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  // Login user using firebase method signInWithEmailAndPassword().
loginUser(email: string, password: string): Promise<any> {
return firebase.auth().signInWithEmailAndPassword(email, password);
}

// Sign in new user with a session token and store user details, e-mail only inside the DB.
  signupUser(email: string, password: string): Promise<any> {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(newUserCredential => {
      firebase
        .database()
        .ref(`/userProfile/${newUserCredential.user.uid}/email`)
        .set(email);
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
  }

  resetPassword(email:string): Promise<void> { // Sends email to the email specified and user can reset passwrd by clicking on the link.
  return firebase.auth().sendPasswordResetEmail(email);
  }

  // Logout user turning off reference to the DB to avoid security errors.
  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
 firebase
   .database()
   .ref(`/userProfile/${userId}`)
   .off();
  return firebase.auth().signOut();
  }



}
