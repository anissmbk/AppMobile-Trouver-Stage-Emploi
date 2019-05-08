import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SujetDetailsPage } from './sujet-details';

@NgModule({
  declarations: [
    SujetDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SujetDetailsPage),
  ],
})
export class SujetDetailsPageModule {}
