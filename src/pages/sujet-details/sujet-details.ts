import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {UserService} from "../../services/user.service";
import {DiscussionModel} from "../../DiscussionClass/DiscussionModel";

@IonicPage()
@Component({
  selector: 'page-sujet-details',
  templateUrl: 'sujet-details.html',
})
export class SujetDetailsPage {
  id: string;
  userUid: string;
  sujet:DiscussionModel;
  commentairesList:AngularFireObject<any>;
  ensaisteUser:EnsaisteModel=new EnsaisteModel();
  itemArray=[];
  myObject= [];
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,
              public userService:UserService, public db: AngularFireDatabase) {
    this.id = this.navParams.data;
    this.userUid=this.userService.getUserLoggedIn().uid;
    this.sujet = this.userService.getSujetById(this.id);
    //this.ensaisteUser = new EnsaisteModel();
    //this.ensaisteUser.photo ='user.jpg' ;

    this.commentairesList = this.db.object('/discussion/'+this.id+'/z_commentaires');
    this.commentairesList.snapshotChanges().subscribe(action => {
      this.ensaisteUser=this.userService.getEnsaisteById(this.sujet.id_ensaiste);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SujetDetailsPage');
    console.log(this.id)
  }

  consulterEnsaiste(commentaireElementElement: any) {

  }

  deleteComment(commentaireElement: any) {

  }

  showPrompt() {

  }
}
export class CommentaireSujetModel {
  id_ensaiste: string;
  commentaire_text: string;
  constructor(){}
}
