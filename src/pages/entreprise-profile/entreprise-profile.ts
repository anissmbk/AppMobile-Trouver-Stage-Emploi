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
  id:string;
  entrepriseUser:EntrepriseModel;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userService: UserService,) {
    this.id=this.navParams.data;
    if(typeof this.id === "object"){
      this.entrepriseUser=this.userService.getEntreprise();
      this.id='true';
    }else {
      this.entrepriseUser=this.userService.getEntrepriseById(this.id);
    }

  }
  change(){
    this.navCtrl.push(ModifyProfileEntreprisePage);
  }

  /*update(){
    this.entrepriseUser=this.userService.getEntreprise();
  }*/


}
