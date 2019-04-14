import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {UserService} from "../../services/user.service";
import {AnnonceDetailPage} from "../annonce-detail/annonce-detail";
import {MesAnnoncesPage} from "../mes-annonces/mes-annonces";
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-annonce',
  templateUrl: 'annonce.html',
})
export class AnnoncePage {
  annonceList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  entrepriseUser:EntrepriseModel;
  constructor( public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {
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
  }

  annonceDetail(id:string){
    this.navCtrl.push(AnnonceDetailPage,id);
   }
  enregistrerAnnonce(id1:string){
    const userId=firebase.auth().currentUser.uid;
    const path = Math.random().toString(36).substring(2);
    const itemRef = this.db.object('/ensaiste/'+userId+'/zz_annonce_enregistre/'+path);
    var a={
      id:id1
    };
    itemRef.set(a);
  }
}
