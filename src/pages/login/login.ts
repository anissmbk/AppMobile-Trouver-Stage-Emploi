import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {EnsaistePage} from "../ensaiste/ensaiste";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              public authService: AuthService,
              public navParams: NavParams) {
  }


  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  signInUser() {

    //if user is entreprise and if user is ensaiste!!

   this.authService.doLogin(this.email.value,this.password.value)
      .then( data => {
        this.alert('Success! You\'re logged in');

        //on test sur ensaiste!!!!!
        this.navCtrl.setRoot( EnsaistePage );
      })
      .catch( error => {
        console.log('got an error', error);
        this.alert(error.message);
      })
  }

}
