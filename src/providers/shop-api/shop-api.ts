import { Injectable } from '@angular/core';
//import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
//import { Shop } from '../../models/shop.interface';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireDatabase} from 'angularfire2/database';


@Injectable()
export class ShopApiProvider {


  public shopListRef: firebase.database.Reference;
  //public shopList: FirebaseListObservable<any[]>;
  public searchText: string;
  public allShops: any;
  public productRef: firebase.database.Reference;
  public shops = [];

  constructor(public db: AngularFireDatabase) {
    //console.log('Hello ShopApiProvider Provider');
    firebase.auth().onAuthStateChanged(user => {
  if (user) {
    this.shopListRef = firebase
      .database()
      .ref(`/userProfile/${user.uid}/shopList`);
      }
  });
}

// ** RealTime DataBase to CRUD.

  getShopList(): firebase.database.Reference { // Return ShopList for a specific user.
    return this.shopListRef;
  }

  updateShopList(indexes): Promise<any> { // Persists the reordering of shopList array
    return this.shopListRef.update({ indexes });
  }

  getShopDetail(shopId: string): firebase.database.Reference { // Retrive details about the shop
    return this.shopListRef.child(`${shopId}`);
  }

  getRecentPurchases(shopId: string): firebase.database.Reference { // Retieve the inner array within the shopDetail.
    return this.shopListRef.child(`${shopId}/recentPurchases`);
  }

  // //TODO:
  // getFavouriteShops(shopId: string): firebase.database.Reference {
  // return this.shopListRef.child(`/favourites`);
  // }

  addPurchase(product: string, shopId: string): PromiseLike<any>{ /** Add an item that was purchased, => increases loyaltybalance by 25 Points.*/
    return this.shopListRef.child(`${shopId}/recentPurchases`)
    .push({ product,
    createdDate: Date()})
    .then( newPurchase => {
      this.shopListRef.child(shopId).transaction(event => { /** updates loyaltyBalance amount in shopDetail view.*/
        event.loyaltyBalance += 25;
        return event;
      });
    });
  }

  redeemProduct(shopId: string){ /** Click Redeem button in product html will enact this transaction.*/
    return this.shopListRef.child(`${shopId}`).transaction(event => {
    // Simple check to see if user has enough points to perform transaction.
    if(event.loyaltyBalance <= 0){
      console.log('You do not have enough points');
    }
    else {
      // If user has enough points, perform the transaction.
      event.loyaltyBalance -= 100;
      return event;
      }
    });
  }



  createLoyaltyCard(shopName: string, loyaltyBalance: number,
            email: string, about: string): firebase.database.ThenableReference {//Add new card to the top most array. i.e. the shopList array.

    return this.shopListRef.push({
      shopName:  shopName,
      loyaltyBalance: loyaltyBalance * 1,
      email:  email,
      about: about
    });
  }



//////////////////////////////////////////////////////



  // //**
  // FIRESTORE DB METHOD TO CRUD
  // **//


  // getShopList(): AngularFirestoreCollection<Shop> {
  //   return this.firestore.collection('shops');
  // }
  //
  // createLoyaltyCard(shopName: string, loyaltyBalance: string,
  //           email: string, about: string): Promise<void> {
  //   const id = this.firestore.createId(); // let Firebase create a UID for each entry.
  //
  //   return this.firestore.doc(`shops/${id}`).set({
  //     id,
  //     shopName,
  //     loyaltyBalance,
  //     email,
  //     about
  //   });
  // }

}
