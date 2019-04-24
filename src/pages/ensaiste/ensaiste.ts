import {Component} from '@angular/core';
import {AlertController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {NavController} from 'ionic-angular';
import {MesAnnoncesPage} from "../mes-annonces/mes-annonces";
import {TabsPage} from "../tabs/tabs";
import {AuthService} from "../../services/auth.service";
import {HomePage} from "../home/home";
import {ModifyProfileEnsaistePage} from "../modify-profile-ensaiste/modify-profile-ensaiste";
import {EntrepriseEnregistreePage} from "../entreprise-enregistree/entreprise-enregistree";
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
  selector: 'page-ensaiste',
  templateUrl: 'ensaiste.html',
})
export class EnsaistePage {
  rootPage: any = TabsPage;
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public authService: AuthService,
              private alertCtrl: AlertController,
              public navCtrl: NavController,
              public db: AngularFireDatabase) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      {title: 'Annonces Enregistrees', component: MesAnnoncesPage},
      {title: 'Entreprise Enregistree', component: EntrepriseEnregistreePage},
      {title: 'Modifier Profile', component: ModifyProfileEnsaistePage}
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

    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }

  logOut() {
    this.authService.doLogout()
      .then(data => {
        this.alert('Success! You\'re Deconnect');

        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        console.log('got an error');
      })
  }
  DeleteUserAcount(){
    const confirm = this.alertCtrl.create({
      title: 'Voulez-vous vraiment supprimer votre compt ?',
      buttons: [
        {
          text: 'Non',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Oui',
          handler: () => {

            //il faut supprimer les commentaires aussi dans les annoncesStage &&Emploi
            // pas oublier de supp  les sujets creer el aussi dans les commentaires des sujets
            const userId=firebase.auth().currentUser.uid;
            const itemRef = this.db.object('/ensaiste/'+userId);
            itemRef.remove();
            const user = firebase.auth().currentUser;
            user.delete().then(function() {
              this.alert("bien supprimee");
              this.navCtrl.setRoot(HomePage);
            }.bind(this)).catch(function(error) {
              // An error happened.
            });

          }
        }
      ]
    });
    confirm.present();

  }

}
