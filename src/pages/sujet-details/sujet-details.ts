import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {UserService} from "../../services/user.service";
import {DiscussionModel} from "../../DiscussionClass/DiscussionModel";
import {MyProfilePage} from "../my-profile/my-profile";
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-sujet-details',
  templateUrl: 'sujet-details.html',
})
export class SujetDetailsPage {
  id: string;
  userUid: string;
  sujet:DiscussionModel;
  ensaisteUser:EnsaisteModel=new EnsaisteModel();
  commentairesList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  like:string='null';
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,
              public userService:UserService, public db: AngularFireDatabase) {
    this.id = this.navParams.data;
    this.userUid=this.userService.getUserLoggedIn().uid;
    this.sujet = this.userService.getSujetById(this.id);

    this.commentairesList = this.db.object('/discussion/'+this.id+'/z_commentaires');
    this.commentairesList.snapshotChanges().subscribe(action => {
      this.ensaisteUser=this.userService.getEnsaisteById(this.sujet.id_ensaiste);


      var ref = firebase.database().ref('/discussion/'+this.id+'/z_like_ensaiste/'+this.userUid);
      ref.once("value").then(function (snapshot) {
        var result = snapshot.val();
        if (result != null) {
          var keys = Object.keys(result);
          this.like= result[keys[0]];
          if ( typeof this.like === "undefined") {
            this.like='null';
          }
        }
      }.bind(this), function (error) {
      }.bind(this));

      //this.like=this.userService.getLikeById(this.id,this.userUid);
      this.itemArray.push(action.payload.val() as CommentaireSujetModel);

      if(this.itemArray[0]!=null){
        this.myObject = Object.entries(this.itemArray[0]);
      }

      for (let annonce of this.myObject) {
        var x = this.userService.getEnsaisteById(annonce[1]['id_ensaiste']);
        annonce.push(x as EnsaisteModel);
      }

    });
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
            const itemRef = this.db.object('/discussion/'+this.id+'/z_commentaires/'+id);
            itemRef.remove();
            // fixer le prbleme il faut cliquer deux fois !!!
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

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Sujet',
      //message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'sujet_text',
          type:'textarea',
          placeholder: 'sujettext..'
        }
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
            if(data.sujet_text!=''){
              this.userService.addCommentSujet(this.id,this.userUid,data.sujet_text,this.sujet.nbr_comment);
            }
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  afficherDateFormat(date:string):string{
    var date1=new Date(date);
    var annee1 = date1.getFullYear();
    var mois1 = ("0" + (date1.getMonth() + 1)).slice(-2);
    var jour1 = ("0" + (date1.getDate())).slice(-2);
    return  jour1 + '/' + mois1 + '/' + annee1;
  }
  addLike(id:string,nbr:number){
    if(this.like=='null'){
    nbr++;
    this.userService.addLike(id,nbr,this.userUid);
    this.like=this.userUid;
    }else{
      nbr--;
      this.userService.removeLike(id,nbr,this.userUid);
      this.like='null';
    }
  }
}

export class CommentaireSujetModel {
  id_ensaiste: string;
  commentaire_text: string;
  constructor(){}
}
