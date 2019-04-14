import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EnsaistePage} from "../ensaiste/ensaiste";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import { UserService} from "../../services/user.service";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import * as firebase from 'firebase/app';
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {AnnonceDetailPage} from "../annonce-detail/annonce-detail";
@IonicPage()
@Component({
  selector: 'page-mes-annonces',
  templateUrl: 'mes-annonces.html',
})
export class MesAnnoncesPage {
   id:string;
  annonceEnregistreesList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  entrepriseUser:EntrepriseModel;
   constructor(public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {
    this.id=this.navParams.data;

     this.annonceEnregistreesList=this.db.object('/ensaiste/'+firebase.auth().currentUser.uid+'/zz_annonce_enregistre');
     this.annonceEnregistreesList.snapshotChanges().subscribe(action => {

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

  annonceDetail(id:string){
    this.navCtrl.push(AnnonceDetailPage,id);
  }


}
