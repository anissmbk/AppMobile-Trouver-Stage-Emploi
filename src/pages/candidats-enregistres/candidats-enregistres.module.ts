import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidatsEnregistresPage } from './candidats-enregistres';

@NgModule({
  declarations: [
    CandidatsEnregistresPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidatsEnregistresPage),
  ],
})
export class CandidatsEnregistresPageModule {}
