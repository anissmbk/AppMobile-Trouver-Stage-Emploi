import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnonceEmploiDetailsPage } from './annonce-emploi-details';

@NgModule({
  declarations: [
    AnnonceEmploiDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnonceEmploiDetailsPage),
  ],
})
export class AnnonceEmploiDetailsPageModule {}
