import {Component, ViewChild} from '@angular/core';
import {AlertController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Nav} from "ionic-angular";
import { NavController, NavParams } from 'ionic-angular';
import {MesAnnoncesPage} from "../mes-annonces/mes-annonces";
import {TabsPage} from "../tabs/tabs";
import {ModifyProfilePage} from "../modify-profile/modify-profile";
import {AuthService} from "../../services/auth.service";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-ensaiste',
  templateUrl: 'ensaiste.html',
})
export class EnsaistePage {

  //@ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;
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
        { title: 'MesAnnonces', component: MesAnnoncesPage },
        { title: 'Modifier Profile', component: ModifyProfilePage}
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
    // Reset the content nav to have just this page

    console.log('hello a saat');
    // we wouldn't want the back button to show in this scenario
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
