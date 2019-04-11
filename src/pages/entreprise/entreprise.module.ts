import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntreprisePage } from './entreprise';

@NgModule({
  declarations: [
    EntreprisePage,
  ],
  imports: [
    IonicPageModule.forChild(EntreprisePage),
  ],
})
export class EntreprisePageModule {}
