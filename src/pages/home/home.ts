import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ListPage } from '../list/list';
import { stringify } from '@angular/compiler/src/util';
import {
  GoogleMaps,
  GoogleMap,
  Geocoder,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  GeocoderResult,
  ILatLng
} from '@ionic-native/google-maps';
import { ShopApiProvider } from '../../providers/shop-api/shop-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //visible: Boolean;
  public favouriteShops: Array<any>;
  stores: string = 'All'; // ion-segment control -> using ngSwitch to show 2 different lists
  currentPosition: any = {};
  map1: GoogleMap;

  constructor(public navCtrl: NavController, public shopApi: ShopApiProvider) {
    this.currentLocation();

  }
  //TODO: Make the boilerplate html view replicate a social media platforms' news feed.
  // In this view specific stores and deals can be targeted at individual customers.

  ionViewDidLoad(){
    this.shopApi.getShopList().orderByChild('favourite').equalTo(true).on("value", favListSnapshot => {
      this.favouriteShops = [];
      favListSnapshot.forEach(snap => {
        this.favouriteShops.push({
          id: snap.key,
          shopName: snap.val().shopName,
          loyaltyBalance: snap.val().loyaltyBalance,
          email: snap.val().email,
          about: snap.val().about,
          favourite: snap.val().favourite
        });
        return false;
      });
    //this.count = this.favouriteShops.length; // count the no. of cards.
   // this.hideDiv2 = !this.hideDiv2;
    //  console.log(this.count);
    console.log(this.favouriteShops);
      
    });
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage);
  }

  goToListPage(){ // go to loyalty Cards.
    this.navCtrl.push(ListPage);
  }

  currentLocation2() {
    
    navigator.geolocation.getCurrentPosition((resp) => {
      this.currentPosition = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
      };
      console.log(this.currentPosition);
      
      Geocoder.geocode({
        "position": this.currentPosition.lat && this.currentPosition.lng
      }).then((results: GeocoderResult[]) => {
        if (results.length == 0) {
          // Not found
          return null;
        }
        let address: any = [
          results[0].subThoroughfare || "",
          results[0].thoroughfare || "",
          results[0].locality || "",
          results[0].adminArea || "",
          results[0].postalCode || "",
          results[0].country || ""].join(", ");
      });      
    });
  }

  currentLocation(){
    // this.map1 = GoogleMaps.create('map_canvas1', {
    //   camera: {
    //     target: { "lat": 37.422858, "lng": -122.085065 },
    //     zoom: 10
    //   }
    // });
  
    // this.map1.on(GoogleMapsEvent.MAP_CLICK).subscribe((params:any[]) => {
    //   let latLng: ILatLng = params[0];
    //   let marker: Marker = this.map1.addMarkerSync({
    //     "position": latLng
    //   });
    navigator.geolocation.getCurrentPosition((resp) => {
      this.currentPosition = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
      };
      console.log(this.currentPosition);
      
      // Latitude, longitude -> address
      Geocoder.geocode({
        "position": this.currentPosition
      }).then((results: GeocoderResult[]) => {
        if (results.length == 0) {
          // Not found
          console.log("Nothing");
          
          return null;
        }
        let address: any = [
          results[0].subThoroughfare || "",
          results[0].thoroughfare || "",
          results[0].locality || "",
          results[0].adminArea || "",
          results[0].postalCode || "",
          results[0].country || ""].join(", ");
          console.log(results[0]);
  
        // marker.setTitle(address);
        console.log(address);
        this.currentPosition = address;
        //marker.showInfoWindow();
      });
    });
  }


}

  // toggleIcon(){
  //   // [name]="visible ? 'menu' : 'close'" -> Used to change icon on click, but no really worky.
  //   this.visible = !this.visible;
  // }

