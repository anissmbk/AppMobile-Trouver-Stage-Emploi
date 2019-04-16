import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController,Platform} from 'ionic-angular';
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {AuthService} from "../../services/auth.service";
import {HomePage} from "../home/home";
import {CandidatsEnregistresPage} from "../candidats-enregistres/candidats-enregistres";
import {ModifyProfileEntreprisePage} from "../modify-profile-entreprise/modify-profile-entreprise";
import {TabsEntreprisePage} from "../tabs-entreprise/tabs-entreprise";

@IonicPage()
@Component({
  selector: 'page-entreprise',
  templateUrl: 'entreprise.html',
})
export class EntreprisePage {

  rootPage:any = TabsEntreprisePage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public authService: AuthService,
              private alertCtrl: AlertController,
              public navCtrl: NavController,) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      { title: 'Condidats Enregistres', component: CandidatsEnregistresPage },
      { title: 'Modifier Profile', component: ModifyProfileEntreprisePage}
    ];
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }


  openPage(page) {
    this.navCtrl.push(page.component);
  }

  logOut(){
    this.authService.doLogout()
      .then( data => {
        this.alert('Success! You\'re Deconnect');

        this.navCtrl.setRoot( HomePage );
      })
      .catch( error => {
        console.log('got an error');
      })
  }
}
