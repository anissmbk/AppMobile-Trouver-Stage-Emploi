import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnoncePage } from './annonce';

@NgModule({
  declarations: [
    AnnoncePage,
  ],
  imports: [
    IonicPageModule.forChild(AnnoncePage),
  ],
})
export class AnnoncePageModule {}
