import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesAnnoncesPage } from './mes-annonces';

@NgModule({
  declarations: [
    MesAnnoncesPage,
  ],
  imports: [
    IonicPageModule.forChild(MesAnnoncesPage),
  ],
})
export class MesAnnoncesPageModule {}
