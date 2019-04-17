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


@IonicPage()
@Component({
  selector: 'page-poster-annoce',
  templateUrl: 'poster-annoce.html',
})
export class PosterAnnocePage {
  mesAnnoncesList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  entrepriseUser:EntrepriseModel;
  constructor(public alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {
    this.mesAnnoncesList=this.db.object('/entreprise/'+firebase.auth().currentUser.uid+'/zz_mes_annonces_stage');
    this.mesAnnoncesList.snapshotChanges().subscribe(action => {

      this.itemArray.push(action.payload.val() as {id:string});
      // pour savoir la methode entries il faut ajouter au tsconfig.json dans lib"es2017.object","es2016.array.include"
      //had if mohima dans le cas ila makan ta commentaire
      if(this.itemArray[0]!=null){
        this.myObject = Object.entries(this.itemArray[0]);
      }

      for (let annonce of this.myObject) {
        var x = this.userService.getAnnonceStageById(annonce[1]['id']);
        annonce.push(x as AnnonceStageModel);
        this.entrepriseUser=this.userService.getEntrepriseById(annonce[2]['id_entreprise']);
        annonce.push(this.entrepriseUser as EntrepriseModel);
      }
      console.log(this.myObject);
    });
  }

  removeAnnonce(id1:string){//Attention il faut supprimer dans deux places diferrents entreprise=>zz_mes_annonces_stage et dans annonceStage
    const userId=firebase.auth().currentUser.uid;
    const itemRef = this.db.object('/entreprise/'+userId+'/zz_mes_annonces_stage/'+id1);
    itemRef.remove();
    const annonce = this.db.object('/annonceStage/'+id1);
    annonce.remove();
    this.alert("bien supprimee");
    this.navCtrl.setRoot(EntreprisePage);
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  annonceDetails(id:string){
    this.navCtrl.push(AnnonceDetailPage,id);
  }

  posterAnnonceStage(){
    this.navCtrl.push(FormAnnonceStagePage);
  }
  posterAnnonceEmploi(){
    this.navCtrl.push(FormAnnonceEmploiPage);
  }
}
