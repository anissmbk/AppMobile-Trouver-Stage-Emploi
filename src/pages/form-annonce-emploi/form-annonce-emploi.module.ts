import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormAnnonceEmploiPage } from './form-annonce-emploi';

@NgModule({
  declarations: [
    FormAnnonceEmploiPage,
  ],
  imports: [
    IonicPageModule.forChild(FormAnnonceEmploiPage),
  ],
})
export class FormAnnonceEmploiPageModule {}
