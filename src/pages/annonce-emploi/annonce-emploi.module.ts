import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnonceEmploiPage } from './annonce-emploi';

@NgModule({
  declarations: [
    AnnonceEmploiPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnonceEmploiPage),
  ],
})
export class AnnonceEmploiPageModule {}
