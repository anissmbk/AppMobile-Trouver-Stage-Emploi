import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('username') uname;
  @ViewChild('password') password;
  pet: any;

  constructor(public navCtrl: NavController) {

  }

  signIn() {
    this.navCtrl.push(LoginPage);
    console.log("filahcompany@hotmail.com");
  }

  signup() {
    this.navCtrl.push(RegisterPage);
  }


}
