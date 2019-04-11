import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AnnoncePage} from "../annonce/annonce";
import {UsersPage} from "../users/users";
import {DiscussionPage} from "../discussion/discussion";
import {MyProfilePage} from "../my-profile/my-profile";
import {PosterAnnocePage} from "../poster-annoce/poster-annoce";
import {EntrepriseProfilePage} from "../entreprise-profile/entreprise-profile";

/**
 * Generated class for the TabsEntreprisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-entreprise',
  templateUrl: 'tabs-entreprise.html',
})
export class TabsEntreprisePage {
  tab1Root = PosterAnnocePage;
  tab2Root = UsersPage;//Commun entre entreprise et ensaiste
  tab3Root = EntrepriseProfilePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
