import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";

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
  deletList:AngularFireObject<any>;
  entrepriseUser:EntrepriseModel=new EntrepriseModel();
  deleteArray=[];
  deletemyObject= [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService:UserService, public db: AngularFireDatabase) {
    this.id=this.navParams.data;
    this.annonceStage= this.userService.getAnnonceStageById(this.id);

    this.commentairesList=this.db.object('/annonceStage/'+this.id+'/z_commentaires');
    this.commentairesList.snapshotChanges().subscribe(action => {
      this.entrepriseUser=this.userService.getEntrepriseById(this.annonceStage.id_entreprise);
      // console.log(this.entrepriseUser.entrepriseName);

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

  ionViewDidLoad(){
   /*var hello;
    this.deletList=this.db.object('/annonceStage/'+this.id+'/z_commentaires');
    this.deletList.snapshotChanges().subscribe(action => {

      this.deleteArray.push(action.payload.val() as CommentaireModel);

      if(this.deleteArray[0]!=null){
        this.deletemyObject = Object.entries(this.deleteArray[0]);
      }

      for (let annonce of this.deletemyObject) {
        var y=hello;
        var x = this.userService.getEnsaisteById(annonce[1]['id_ensaiste']);
        annonce.push(x as EnsaisteModel);
      }

    });*/
  }

}
export class CommentaireModel{
  id_commentaire: string;
  id_ensaiste: string;
  commentaire_text: string;
  disponibilite: string;
  constructor(){}
}
