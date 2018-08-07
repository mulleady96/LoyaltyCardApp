import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

//declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  public map: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public geolocation: Geolocation) {
    // Load in data from firebase
  }

  ionViewDidLoad() {
    //poulate this fields with db data.
    this.map = {
      lat: 53.270668,
      lng: -9.056791,
      zoom: 12,
      markerLabel: 'Store'
    };
  }

  findMe(){
    this.geolocation.getCurrentPosition().then((resp) => {
    //  let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude)
    this.map = {
      lat: resp.coords.latitude,
      lng: resp.coords.longitude,
      zoom: 12,
      markerLabel: 'You are here!'
    };
  }).catch((error) => {
    console.log(error.message);
  });
}


}
