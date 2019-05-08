import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {UserService} from "../../services/user.service";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import * as firebase from 'firebase/app';
import {SujetDetailsPage} from "../sujet-details/sujet-details";
import {DiscussionModel} from "../../DiscussionClass/DiscussionModel";
@IonicPage()
@Component({
  selector: 'page-discussion',
  templateUrl: 'discussion.html',
})
export class DiscussionPage {
  sujetList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  ensaisteUser:EnsaisteModel;
  idUser:string;
  isSearch:boolean=false;
  searchTab=[];
  constructor(private alertCtrl: AlertController, public db: AngularFireDatabase, public navCtrl: NavController,
              public navParams: NavParams, public userService: UserService) {

    this.idUser=firebase.auth().currentUser.uid;
    this.sujetList=db.object('/discussion');
    this.sujetList.snapshotChanges().subscribe(action=>{
      this.itemArray.push(action.payload.val() as DiscussionModel);
      // pour savoir la methode entries il faut ajouter au tsconfig.json dans lib"es2017.object","es2016.array.include"
      this.myObject=Object.entries(this.itemArray[0]);

      for(let sujet of this.myObject){
        this.ensaisteUser=this.userService.getEnsaisteById(sujet[1]['id_ensaiste']);
        sujet.push(this.ensaisteUser as EnsaisteModel);
      }

    });
  }
  afficherDateFormat(date:string):string{
    var date1=new Date(date);
    var annee1 = date1.getFullYear();
    var mois1 = ("0" + (date1.getMonth() + 1)).slice(-2);
    var jour1 = ("0" + (date1.getDate())).slice(-2);
    return  jour1 + '/' + mois1 + '/' + annee1;
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
              this.userService.addSujet(this.idUser,data.sujet_text);
            }
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  chercherSujet(ev:any){
    this.searchTab=[];
    var val = ev.target.value;
    if ( typeof val === "undefined" || val.trim() == '') {
      this.isSearch=false;
      //this.searchTab = this.myObject;
    }
    else if (val.trim() !== '') {
      this.searchTab = this.myObject.filter(function(item) {
        var str=item[2]['firstName']+" "+item[2]['lastName'];
        var str1=item[2]['lastName']+" "+item[2]['firstName'];
        var str2=item[1]['sujet_text'];
        return (str.toLowerCase().includes(val.toLowerCase()))
          ||(str1.toLowerCase().includes(val.toLowerCase())||(str2.toLowerCase().includes(val.toLowerCase())));
      });
      this.isSearch=true;
    }
  }

  consulterDetails(idSujet:string){
    console.log(idSujet);
      this.navCtrl.push(SujetDetailsPage,idSujet);
  }
}

