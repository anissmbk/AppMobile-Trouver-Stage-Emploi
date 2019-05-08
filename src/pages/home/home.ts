import {Component, ViewChild} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {EntreprisePage} from "../entreprise/entreprise";
import {UserService} from "../../services/user.service";
import {EnsaistePage} from "../ensaiste/ensaiste";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('username') uname;
  @ViewChild('password') password;
  loading: any;
  videPage:boolean=false;

  constructor(public loadingCtrl: LoadingController,public userService:UserService,public navCtrl: NavController) {
    /*this.storage.get('user').then(val =>{
      if(val === null){
        this.videPage=true;
        console.log("token is null : ",val);
      }else{
        this.showLoader();
        this.authService.doLogin(val.email, val.password).then(
          data => {
            this.navCtrl.setRoot(EntreprisePage);
            this.loading.dismiss();
          });
      }
    }).catch(error=>{
      console.log(error)
    });*/
    if (localStorage.getItem('user')){
      this.showLoader();
      if(this.userService.getUserLoggedIn().displayName=='ensaiste'){
        this.navCtrl.setRoot(EnsaistePage);
        this.loading.dismiss();
      }else if(this.userService.getUserLoggedIn().displayName=='entreprise'){
        this.navCtrl.setRoot(EntreprisePage);
        this.loading.dismiss();
      }
    }else{
      this.videPage=true;
      console.log('local storage is empty!!')
    }
  }

  signIn() {
    this.navCtrl.push(LoginPage);
    console.log("aniss-090@gmail.fr");
  }

  signup() {
    this.navCtrl.push(RegisterPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({content: 'Authenticating...'});
    this.loading.present();
  }
}
