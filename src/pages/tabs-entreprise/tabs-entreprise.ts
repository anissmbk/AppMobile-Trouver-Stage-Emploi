import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UsersPage} from "../users/users";
import {PosterAnnocePage} from "../poster-annoce/poster-annoce";
import {EntrepriseProfilePage} from "../entreprise-profile/entreprise-profile";

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
