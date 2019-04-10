import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnsaistePage } from './ensaiste';
import {AnnoncePage} from "../annonce/annonce";
import {UsersPage} from "../users/users";
import {DiscussionPage} from "../discussion/discussion";
import {MyProfilePage} from "../my-profile/my-profile";

@NgModule({
  declarations: [
    EnsaistePage,
  ],
  imports: [
    IonicPageModule.forChild(EnsaistePage),
  ],

})
export class EnsaistePageModule {}
