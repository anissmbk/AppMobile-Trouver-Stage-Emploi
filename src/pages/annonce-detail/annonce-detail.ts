import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";

/**
 * Generated class for the AnnonceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annonce-detail',
  templateUrl: 'annonce-detail.html',
})
export class AnnonceDetailPage {
  id:string='no data';
  annonceStage:AnnonceStageModel;
  commentairesList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService:UserService, public db: AngularFireDatabase) {
    this.id=this.navParams.data;
    this.annonceStage=this.userService.getAnnonceStageById(this.id);
    this.commentairesList=this.db.object('/annonceStage/'+this.id+'/z_commentaires');
      this.commentairesList.snapshotChanges().subscribe(action => {

        this.itemArray.push(action.payload.val() as CommentaireModel);
        // pour savoir la methode entries il faut ajouter au tsconfig.json dans lib"es2017.object","es2016.array.include"

          //had if mohima dans le cas ila makan ta commentaire
        if(this.itemArray[0]!=null){
        this.myObject = Object.entries(this.itemArray[0]);
        }

        for (let annonce of this.myObject) {
          var x = this.userService.getEnsaisteById(annonce[1]['id_ensaiste']);
          annonce.push(x as EnsaisteModel);
        }
      });

  }

}
export class CommentaireModel{
  id_commentaire: string;
  id_ensaiste: string;
  commentaire_text: string;
  disponibilite: string;
  constructor(){}
}
