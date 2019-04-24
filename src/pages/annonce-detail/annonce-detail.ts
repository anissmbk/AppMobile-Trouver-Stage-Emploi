import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {MyProfilePage} from "../my-profile/my-profile";

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
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public userService:UserService, public db: AngularFireDatabase) {
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
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Commentaire',
      //message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'commentaire_text',
          type:'textarea',
          placeholder: 'comment text..'
        },
        {
          name: 'disponibilite',
          placeholder: 'disponibilite'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            if(data.commentaire_text!='' && data.disponibilite){
             console.log(this.id);
              this.userService.addCommentaireStage(this.id,data.commentaire_text,data.disponibilite);
            }
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  consulterEnsaiste(id:string){
    this.navCtrl.push(MyProfilePage,id);
  }

}
export class CommentaireModel{
  id_ensaiste: string;
  commentaire_text: string;
  disponibilite: string;
  constructor(){}
}
