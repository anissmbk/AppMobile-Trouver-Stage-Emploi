import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
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
  userDisplayName:string;
  userUid:string;
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
    this.userDisplayName=this.userService.getCurrentUserDisplayName();
    this.userUid=this.userService.getCurrentUser().uid;

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
  deleteComment(id:string){
    const confirm = this.alertCtrl.create({
      title: 'Voulez-vous vraiment supprimer votre commentaire ?',
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
            const itemRef = this.db.object('/annonceEmploi/'+this.id+'/z_commentaires/'+id);
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
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  afficherDateFormat(date:string):string{
    var date1=new Date(date);
    var annee1 = date1.getFullYear();
    var mois1 = ("0" + (date1.getMonth() + 1)).slice(-2);
    var jour1 = ("0" + (date1.getDate())).slice(-2);
    return  jour1 + '/' + mois1 + '/' + annee1;
  }
}
