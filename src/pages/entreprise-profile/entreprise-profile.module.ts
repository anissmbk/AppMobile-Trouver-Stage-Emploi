import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntrepriseProfilePage } from './entreprise-profile';

@NgModule({
  declarations: [
    EntrepriseProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EntrepriseProfilePage),
  ],
})
export class EntrepriseProfilePageModule {}
