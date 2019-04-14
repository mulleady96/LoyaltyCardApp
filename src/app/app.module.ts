import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { config } from './credentials';
import { AgmCoreModule } from '@agm/core';
import { Camera } from '@ionic-native/camera';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShopPage } from '../pages/shop/shop';
import { ShopApiProvider } from '../providers/shop-api/shop-api';
import { AddLoyaltyCardPage } from '../pages/add-loyalty-card/add-loyalty-card';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileProvider } from '../providers/profile/profile';
import { ProductPage } from '../pages/product/product';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { FlashCardComponent } from '../components/flash-card/flash-card';
import { StatisticsPage } from '../pages/statistics/statistics';
import { CatalogsPage } from '../pages/catalogs/catalogs';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CatalogsPage,
    ShopPage,
    LoginPage,
    MapPage,
    SignUpPage,
    StatisticsPage,
    ProfilePage,
    ProductPage,
    ResetPasswordPage,
    AddLoyaltyCardPage,
    FlashCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCAxyc6F36F1NvhY2TPRIH0EjgC_kKlIGc'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CatalogsPage,
    ListPage,
    ShopPage,
    LoginPage,
    MapPage,
    ProductPage,
    ProfilePage,
    SignUpPage,
    StatisticsPage,
    ResetPasswordPage,
    AddLoyaltyCardPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShopApiProvider,
    AngularFireAuth,
    BarcodeScanner,
    AngularFireDatabase,
    Geolocation,
    File,
    FileTransfer,
    DocumentViewer,
    Camera,
    AuthProvider,
    ProfileProvider
  ]
})
export class AppModule {}
