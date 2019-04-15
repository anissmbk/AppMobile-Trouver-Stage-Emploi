import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {UserService} from "../../services/user.service";
import {ModifyProfileEnsaistePage} from "../modify-profile-ensaiste/modify-profile-ensaiste";

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  ensaisteUser:EnsaisteModel=this.userser.getEnsaiste();
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userser:UserService) {

  }
  change(){
    this.navCtrl.push(ModifyProfileEnsaistePage);
  }

}
