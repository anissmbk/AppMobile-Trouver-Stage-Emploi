import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {UserService} from "../../services/user.service";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {MyProfilePage} from "../my-profile/my-profile";
import {CommentaireModel} from "../annonce-detail/annonce-detail";
import {AnnonceEmploiModel} from "../../AnnonceClass/AnnonceEmploiModel";

/**
 * Generated class for the AnnonceEmploiDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annonce-emploi-details',
  templateUrl: 'annonce-emploi-details.html',
})
export class AnnonceEmploiDetailsPage {

  id:string='no data';
  annonceEmploi:AnnonceEmploiModel;
  commentairesList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  deletList:AngularFireObject<any>;
  entrepriseUser:EntrepriseModel=new EntrepriseModel();
  deleteArray=[];
  deletemyObject= [];
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public userService:UserService, public db: AngularFireDatabase) {
    this.id=this.navParams.data;
    this.annonceEmploi= this.userService.getAnnonceEmploiById(this.id);

    this.commentairesList=this.db.object('/annonceEmploi/'+this.id+'/z_commentaires');
    this.commentairesList.snapshotChanges().subscribe(action => {
      this.entrepriseUser=this.userService.getEntrepriseById(this.annonceEmploi.id_entreprise);

      this.itemArray.push(action.payload.val() as CommentaireModel);
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
              this.userService.addCommentaireEmploi(this.id,data.commentaire_text,data.disponibilite);
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
