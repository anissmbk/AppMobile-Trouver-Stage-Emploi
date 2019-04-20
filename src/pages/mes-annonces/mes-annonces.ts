import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import { UserService} from "../../services/user.service";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import * as firebase from 'firebase/app';
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {AnnonceDetailPage} from "../annonce-detail/annonce-detail";
import {AnnonceEmploiModel} from "../../AnnonceClass/AnnonceEmploiModel";
import {AnnonceEmploiDetailsPage} from "../annonce-emploi-details/annonce-emploi-details";
@IonicPage()
@Component({
  selector: 'page-mes-annonces',
  templateUrl: 'mes-annonces.html',
})
export class MesAnnoncesPage {
  annonceEnregistreesList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  annonceEmploiEnregistreesList:AngularFireObject<any>;
  itemArrayEmploi=[];
  myObjectEmploi= [];
  entrepriseUser:EntrepriseModel;
  constructor(private alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {

    this.annonceEnregistreesList=this.db.object('/ensaiste/'+firebase.auth().currentUser.uid+'/zz_annonce_stage_enregistre');
    this.annonceEnregistreesList.snapshotChanges().subscribe(action => {
      this.itemArray.push(action.payload.val() as {id:string});
      if(this.itemArray[0]!=null){
        this.myObject = Object.entries(this.itemArray[0]);
      }

      for (let annonce of this.myObject) {
        var x= this.userService.getAnnonceStageById(annonce[1]['id']);
        annonce.push(x as AnnonceStageModel);
      }
    });
   /* this.annonceEnregistreesList.snapshotChanges().subscribe(action => {
      for (let annonce of this.myObject) {
        this.entrepriseUser=this.userService.getEntrepriseById(annonce[2]['id_entreprise']);
        annonce.push(this.entrepriseUser as EntrepriseModel);
      }
      console.log(this.myObject);
    });*/

    this.annonceEmploiEnregistreesList=this.db.object('/ensaiste/'+firebase.auth().currentUser.uid+'/zz_annonce_emploi_enregistre');
    this.annonceEmploiEnregistreesList.snapshotChanges().subscribe(action => {
      this.itemArrayEmploi.push(action.payload.val() as {id:string});
      if(this.itemArrayEmploi[0]!=null){
        this.myObjectEmploi = Object.entries(this.itemArrayEmploi[0]);
      }
      for (let annonce of this.myObjectEmploi) {
        var x= this.userService.getAnnonceEmploiById(annonce[1]['id']);
        annonce.push(x as AnnonceEmploiModel);
      }
    });
    /*this.annonceEmploiEnregistreesList.snapshotChanges().subscribe(action => {
        for (let annonce of this.myObjectEmploi) {
          this.entrepriseUser=this.userService.getEntrepriseById(annonce[2]['id_entreprise']);
          annonce.push(this.entrepriseUser as EntrepriseModel);
        }
      });*/
  }

  removeAnnonceEnregistre(id1:string){
    const confirm = this.alertCtrl.create({
      title: 'Voulez-vous vraiment supprimer cette annonce ?',
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
            const userId=firebase.auth().currentUser.uid;
            const itemRef = this.db.object('/ensaiste/'+userId+'/zz_annonce_stage_enregistre/'+id1);
            itemRef.remove();
            // fixer le prbleme il faut cliquer deux fois !!!
            /*var a=document.getElementById(id1) as HTMLDivElement;
            a.remove();*/
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            this.alert("bien supprimee");
          }
        }
      ]
    });
    confirm.present();
   }

   dorefresh(refresher){
      //pour laffichage fixer le prblm!!!!!
       if(refresher != 0){
         refresher.complete();
       }
  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  annonceStageDetail(id:string){
    this.navCtrl.push(AnnonceDetailPage,id);
  }
  annonceEmploiDetail(id:string){
    this.navCtrl.push(AnnonceEmploiDetailsPage,id);
  }

  removeAnnonceEmploiEnregistre(id1:string){
    const confirm = this.alertCtrl.create({
      title: 'Voulez-vous vraiment supprimer cette annonce ?',
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
            const userId=firebase.auth().currentUser.uid;
            const itemRef = this.db.object('/ensaiste/'+userId+'/zz_annonce_emploi_enregistre/'+id1);
            itemRef.remove();
            // fixer le prbleme il faut cliquer deux fois !!!
            /*var a=document.getElementById(id1) as HTMLDivElement;
            a.remove();*/
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            this.alert("bien supprimee");
          }
        }
      ]
    });
    confirm.present();
  }

}
