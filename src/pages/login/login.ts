import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {EnsaistePage} from "../ensaiste/ensaiste";
import {UserService} from "../../services/user.service";
import {EntreprisePage} from "../entreprise/entreprise";
import {ModifyProfileEnsaistePage} from "../modify-profile-ensaiste/modify-profile-ensaiste";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              public authService: AuthService,
              public navParams: NavParams,
              public userService: UserService
  ) {
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  signInUser() {

    this.authService.doLogin(this.email.value, this.password.value)
      .then(data => {
        //this.alert('Success! You\'re logged in');
        const user=this.userService.getCurrentUser();
        if(user.displayName==="ensaiste"){
          this.navCtrl.setRoot(EnsaistePage);
        }else if (user.displayName==="entreprise"){
          this.navCtrl.setRoot(EntreprisePage);
        }else if(user.displayName==="ensaiste1"){
          this.navCtrl.setRoot(ModifyProfileEnsaistePage);
        }

      })
      .catch(error => {
        console.log('got an error', error);
        this.alert(error.message);
      });
  }

}
