import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesNotificationsPage } from './mes-notifications';

@NgModule({
  declarations: [
    MesNotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(MesNotificationsPage),
  ],
})
export class MesNotificationsPageModule {}
