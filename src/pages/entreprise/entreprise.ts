import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, Platform} from 'ionic-angular';
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {AuthService} from "../../services/auth.service";
import {HomePage} from "../home/home";
import {CandidatsEnregistresPage} from "../candidats-enregistres/candidats-enregistres";
import {ModifyProfileEntreprisePage} from "../modify-profile-entreprise/modify-profile-entreprise";
import {TabsEntreprisePage} from "../tabs-entreprise/tabs-entreprise";
import * as firebase from 'firebase/app';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {UserService} from "../../services/user.service";

@IonicPage()
@Component({
  selector: 'page-entreprise',
  templateUrl: 'entreprise.html',
})
export class EntreprisePage {
  rootPage: any = TabsEntreprisePage;
  pages: Array<{ title: string, component: any }>;
  deleteList: AngularFireObject<any>;
  itemArray = [];
  myObject = [];
  deleteList1: AngularFireObject<any>;
  itemArray1 = [];
  myObject1 = [];

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public authService: AuthService,
              private alertCtrl: AlertController,
              public navCtrl: NavController,
              public db: AngularFireDatabase,
              public userService: UserService) {
    var userId = this.userService.getUserLoggedIn().uid;
    this.deleteList = this.db.object('/entreprise/' + userId + '/zz_mes_annonces_emploi');
    this.deleteList.snapshotChanges().subscribe(action => {
      this.itemArray.push(action.payload.val() as { id: string });
      if (this.itemArray[0] != null) {
        this.myObject = Object.entries(this.itemArray[0]);
      }
    });
    this.deleteList1 = this.db.object('/entreprise/' + userId + '/zz_mes_annonces_stage');
    this.deleteList1.snapshotChanges().subscribe(action => {
      this.itemArray1.push(action.payload.val() as { id: string });
      if (this.itemArray1[0] != null) {
        this.myObject1 = Object.entries(this.itemArray1[0]);
      }
    });

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      {title: 'Condidats Enregistres', component: CandidatsEnregistresPage},
      {title: 'Modifier Profile', component: ModifyProfileEntreprisePage}
    ];
  }

  /*getUserLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.uid);
    console.log(JSON.parse(localStorage.getItem('user')).uid);
    //console.log(firebase.auth().currentUser.uid);
  }*/

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

  logOut() {
        this.authService.doLogout()
          .then( data => {
            this.alert('Success! You\'re Deconnect');
            this.userService.clearLocalStorage();
            this.navCtrl.setRoot( HomePage );
          })
          .catch( error => {
            console.log('got an error');
          })
  }

  DeleteUserAcount() {
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
            //il faut geter zz_mes_annonces_emploi && zz_mes_annonces_emploi
            //et les supprimer dans annonceEmploi && annoncestage table firebase
            //evaluation de lensaiste aussi !!!!
            for (let annonce of this.myObject) {
              var itemRef1 = this.db.object('/annonceEmploi/' + annonce[0]);
              itemRef1.remove();
            }
            for (let annonce of this.myObject1) {
              var itemRef2 = this.db.object('/annonceStage/' + annonce[0]);
              itemRef2.remove();
            }

            const userId = firebase.auth().currentUser.uid;
            const itemRef = this.db.object('/entreprise/' + userId);
            itemRef.remove();
            const user = firebase.auth().currentUser;
            user.delete().then(function () {
              this.alert("bien supprimee");
              this.userService.clearLocalStorage();
              this.navCtrl.setRoot(HomePage);
            }.bind(this)).catch(function (error) {
              // An error happened.
            });

          }
        }
      ]
    });
    confirm.present();

  }

}
