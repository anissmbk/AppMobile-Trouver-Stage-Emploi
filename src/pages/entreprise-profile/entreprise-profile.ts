import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {UserService} from "../../services/user.service";
import {ModifyProfileEntreprisePage} from "../modify-profile-entreprise/modify-profile-entreprise";

@IonicPage()
@Component({
  selector: 'page-entreprise-profile',
  templateUrl: 'entreprise-profile.html',
})
export class EntrepriseProfilePage {

  entrepriseUser:EntrepriseModel=this.userService.getEntreprise();


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userService: UserService,) {


  }
  change(){
    this.navCtrl.push(ModifyProfileEntreprisePage);
  }

  /*update(){
    this.entrepriseUser=this.userService.getEntreprise();
  }*/


}
