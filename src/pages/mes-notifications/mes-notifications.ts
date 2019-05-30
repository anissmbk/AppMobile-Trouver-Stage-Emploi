import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {UserService} from "../../services/user.service";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {EntrepriseProfilePage} from "../entreprise-profile/entreprise-profile";
import {EnsaistePage} from "../ensaiste/ensaiste";

@IonicPage()
@Component({
  selector: 'page-mes-notifications',
  templateUrl: 'mes-notifications.html',
})
export class MesNotificationsPage {
  recommandationsList: AngularFireObject<any>;
  itemArray = [];
  myObject = [];
  ensaisteId:string;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,
              public userser: UserService, public db: AngularFireDatabase) {

    this.ensaisteId=this.userser.getCurrentUser().uid;
    this.recommandationsList = this.db.object('/ensaiste/' + this.ensaisteId+ '/zz_notifications_recommandations');
    this.recommandationsList.snapshotChanges().subscribe(action => {

      this.itemArray.push(action.payload.val() as { id_entreprise: string, recommandation_text: string });

      if (this.itemArray[0] != null) {
        this.myObject = Object.entries(this.itemArray[0]);
      }
      for (let recommandation of this.myObject) {
        var x = this.userser.getEntrepriseById(recommandation[1]['id_entreprise']);
        recommandation.push(x as EntrepriseModel);
      }

    });
  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  consulterEntreprise(id:string){
    this.navCtrl.push(EntrepriseProfilePage,id);
  }

  rejectRecommandation(id:string){
    const confirm = this.alertCtrl.create({
      title: 'Voulez-vous vraiment supprimer cette recommandation?',
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
            const itemRef = this.db.object('/ensaiste/'+this.ensaisteId+'/zz_notifications_recommandations/'+id);
            itemRef.remove();
            this.alert("bien supprimee");
            this.navCtrl.setRoot(EnsaistePage);
          }
        }
      ]
    });
    confirm.present();
  }

  acceptRecommandation(id:string,entrepriseId:string,recommandation_text: string){
    this.db.object('/ensaiste/' + this.ensaisteId + '/zz_recommandations/' + id).set({
      recommandation_text: recommandation_text,
      id_entreprise: entrepriseId
    });

    const itemRef = this.db.object('/ensaiste/'+this.ensaisteId+'/zz_notifications_recommandations/'+id);
    itemRef.remove();

    this.navCtrl.setRoot(EnsaistePage);
  }

}
