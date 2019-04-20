import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {UserService} from "../../services/user.service";
import {AnnonceDetailPage} from "../annonce-detail/annonce-detail";
import * as firebase from 'firebase/app';
import {AnnonceEmploiModel} from "../../AnnonceClass/AnnonceEmploiModel";

@IonicPage()
@Component({
  selector: 'page-annonce',
  templateUrl: 'annonce.html',
})
export class AnnoncePage {
  annonceList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  annonceEmloiList:AngularFireObject<any>;
  itemArrayEmploi=[];
  myObjectEmploi= [];
  entrepriseUser:EntrepriseModel;
  constructor( private alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {
    this.annonceList=db.object('/annonceStage');
    this.annonceList.snapshotChanges().subscribe(action=>{
      let y=action.payload.toJSON();
      y['key']=action.key;
      this.itemArray.push(action.payload.val() as AnnonceStageModel);
      // pour savoir la methode entries il faut ajouter au tsconfig.json dans lib"es2017.object","es2016.array.include"
      this.myObject=Object.entries(this.itemArray[0]);

      for(let annonce of this.myObject){
        this.entrepriseUser=this.userService.getEntrepriseById(annonce[1]['id_entreprise']);
        annonce.push(this.entrepriseUser as EntrepriseModel);
      }

    });

    this.annonceEmloiList=db.object('/annonceEmploi');
    this.annonceEmloiList.snapshotChanges().subscribe(action=>{
      this.itemArrayEmploi.push(action.payload.val() as AnnonceEmploiModel);
      this.myObjectEmploi=Object.entries(this.itemArrayEmploi[0]);

      for(let annonce1 of this.myObjectEmploi){
        this.entrepriseUser=this.userService.getEntrepriseById(annonce1[1]['id_entreprise']);
        annonce1.push(this.entrepriseUser as EntrepriseModel);
      }

    });
  }

  annonceDetail(id:string){
    //problemme pas de back()
    this.navCtrl.push(AnnonceDetailPage,id);
   }
  enregistrerAnnonce(id1:string){
    const userId=firebase.auth().currentUser.uid;
    const itemRef = this.db.object('/ensaiste/'+userId+'/zz_annonce_stage_enregistre/'+id1);
    var a={
      id:id1
    };
    itemRef.set(a);
    this.alert("bien enregistrer");

  }
  enregistrerAnnonceEmploi(id1:string){
    const userId=firebase.auth().currentUser.uid;
    const itemRef = this.db.object('/ensaiste/'+userId+'/zz_annonce_emploi_enregistre/'+id1);
    var a={
      id:id1
    };
    itemRef.set(a);
    this.alert("bien enregistrer");

  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
}
