import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {UserService} from "../../services/user.service";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import * as firebase from 'firebase/app';
import {AnnonceDetailPage} from "../annonce-detail/annonce-detail";
import {FormAnnonceStagePage} from "../form-annonce-stage/form-annonce-stage";
import {FormAnnonceEmploiPage} from "../form-annonce-emploi/form-annonce-emploi";
import {EntreprisePage} from "../entreprise/entreprise";
import {AnnonceEmploiModel} from "../../AnnonceClass/AnnonceEmploiModel";
import {AnnonceEmploiDetailsPage} from "../annonce-emploi-details/annonce-emploi-details";

@IonicPage()
@Component({
  selector: 'page-poster-annoce',
  templateUrl: 'poster-annoce.html',
})
export class PosterAnnocePage {
  mesAnnoncesStageList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  mesAnnoncesEmploiList:AngularFireObject<any>;
  itemArrayEmploi=[];
  myObjectEmploi= [];
  entrepriseUser:EntrepriseModel;
  constructor(public alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {

    this.entrepriseUser=this.userService.getEntreprise();
    this.mesAnnoncesStageList=this.db.object('/entreprise/'+firebase.auth().currentUser.uid+'/zz_mes_annonces_stage');
    this.mesAnnoncesStageList.snapshotChanges().subscribe(action => {
      this.itemArray.push(action.payload.val() as {id:string});
      // pour savoir la methode entries il faut ajouter au tsconfig.json dans lib"es2017.object","es2016.array.include"
      //had if mohima dans le cas ila makan ta commentaire
      if(this.itemArray[0]!=null){
        this.myObject = Object.entries(this.itemArray[0]);
      }
      for (let annonce of this.myObject) {
        var x = this.userService.getAnnonceStageById(annonce[1]['id']);
        annonce.push(x as AnnonceStageModel);
      }
      console.log(this.myObject);
    });

    this.mesAnnoncesEmploiList=this.db.object('/entreprise/'+firebase.auth().currentUser.uid+'/zz_mes_annonces_emploi');
    this.mesAnnoncesEmploiList.snapshotChanges().subscribe(action => {
      this.itemArrayEmploi.push(action.payload.val() as {id:string});
      if(this.itemArrayEmploi[0]!=null){
        this.myObjectEmploi = Object.entries(this.itemArrayEmploi[0]);
      }
      for (let annonce1 of this.myObjectEmploi) {
        var x = this.userService.getAnnonceEmploiById(annonce1[1]['id']);
        annonce1.push(x as AnnonceEmploiModel);
      }
      console.log(this.myObjectEmploi);
    });
  }

  removeAnnonce(id1:string){//Attention il faut supprimer dans deux places diferrents entreprise=>zz_mes_annonces_stage et dans annonceStage

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
            const itemRef = this.db.object('/entreprise/'+userId+'/zz_mes_annonces_stage/'+id1);
            itemRef.remove();
            const annonce = this.db.object('/annonceStage/'+id1);
            annonce.remove();
            this.alert("bien supprimee");
            this.navCtrl.setRoot(EntreprisePage);
          }
        }
      ]
    });
    confirm.present();
  }
  removeAnnonceEmploi(id1:string){//Attention il faut supprimer dans deux places diferrents entreprise=>zz_mes_annonces_stage et dans annonceStage
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
            const itemRef = this.db.object('/entreprise/'+userId+'/zz_mes_annonces_emploi/'+id1);
            itemRef.remove();
            const annonce = this.db.object('/annonceEmploi/'+id1);
            annonce.remove();
            this.alert("bien supprimee");
            this.navCtrl.setRoot(EntreprisePage);
          }
        }
      ]
    });
    confirm.present();
  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  annonceStageDetails(id:string){//il faut specifie est que c'est annonceStageDetails annonceEmploiDetails a descute
    this.navCtrl.push(AnnonceDetailPage,id);
  }
  *
  annonceEmploiDetails(id:string){//il faut specifie est que c'est annonceStageDetails annonceEmploiDetails a descute
    this.navCtrl.push(AnnonceEmploiDetailsPage,id);
  }

  posterAnnonceStage(){
    this.navCtrl.push(FormAnnonceStagePage);
  }
  posterAnnonceEmploi(){
    this.navCtrl.push(FormAnnonceEmploiPage);
  }
}
