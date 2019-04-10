import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EnsaistePage} from "../ensaiste/ensaiste";

/**
 * Generated class for the MesAnnoncesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mes-annonces',
  templateUrl: 'mes-annonces.html',
})
export class MesAnnoncesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  /*back(){
    this.navCtrl.push( EnsaistePage );
  }*/

}
