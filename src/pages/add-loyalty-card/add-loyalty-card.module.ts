import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLoyaltyCardPage } from './add-loyalty-card';

@NgModule({
  declarations: [
    AddLoyaltyCardPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLoyaltyCardPage),
  ],
})
export class AddLoyaltyCardPageModule {}
