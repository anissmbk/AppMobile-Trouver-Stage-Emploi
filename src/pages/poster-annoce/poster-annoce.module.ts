import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PosterAnnocePage } from './poster-annoce';

@NgModule({
  declarations: [
    PosterAnnocePage,
  ],
  imports: [
    IonicPageModule.forChild(PosterAnnocePage),
  ],
})
export class PosterAnnocePageModule {}
