import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogsPage } from './catalogs';

@NgModule({
  declarations: [
    CatalogsPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogsPage),
  ],
})
export class CatalogsPageModule {}
