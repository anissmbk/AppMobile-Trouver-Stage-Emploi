import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {UserService} from "../../services/user.service";
import {ModifyProfileEnsaistePage} from "../modify-profile-ensaiste/modify-profile-ensaiste";

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  id:string;
  ensaisteUser:EnsaisteModel;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userser:UserService) {
    this.id=this.navParams.data;
    if(typeof this.id === "object"){
      this.ensaisteUser=this.userser.getEnsaiste();
      this.id='true';
    }else {
      this.ensaisteUser=this.userser.getEnsaisteById(this.id);
    }
  }
  change(){
    this.navCtrl.push(ModifyProfileEnsaistePage);
  }

}
