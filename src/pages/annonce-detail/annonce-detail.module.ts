import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnonceDetailPage } from './annonce-detail';

@NgModule({
  declarations: [
    AnnonceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnonceDetailPage),
  ],
})
export class AnnonceDetailPageModule {}
