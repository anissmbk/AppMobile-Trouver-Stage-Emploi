import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {UserService} from "../../services/user.service";
import * as firebase from 'firebase/app';
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {AnnonceDetailPage} from "../annonce-detail/annonce-detail";
import {MyProfilePage} from "../my-profile/my-profile";


@IonicPage()
@Component({
  selector: 'page-candidats-enregistres',
  templateUrl: 'candidats-enregistres.html',
})
export class CandidatsEnregistresPage {
  id:string;
  candidatsEnregistreesList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  constructor(private alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {
    this.id=this.navParams.data;

    this.candidatsEnregistreesList=this.db.object('/entreprise/'+firebase.auth().currentUser.uid+'/zz_candidats_enregistree');
    this.candidatsEnregistreesList.snapshotChanges().subscribe(action => {

      this.itemArray.push(action.payload.val() as {id:string});
      // pour savoir la methode entries il faut ajouter au tsconfig.json dans lib"es2017.object","es2016.array.include"

      //had if mohima dans le cas ila makan ta commentaire
      if(this.itemArray[0]!=null){
        this.myObject = Object.entries(this.itemArray[0]);
      }

      for (let ensaiste of this.myObject) {
        var x = this.userService.getEnsaisteById(ensaiste[1]['id']);
        ensaiste.push(x as EnsaisteModel);
      }
      console.log(this.myObject);
    });

  }

  removeCandidatEnregistre(id1:string){
    const userId=firebase.auth().currentUser.uid;
    const itemRef = this.db.object('/entreprise/'+userId+'/zz_candidats_enregistree/'+id1);
    itemRef.remove();
    // fixer le prbleme il faut cliquer deux fois !!!
/*    var a=document.getElementById(id1) as HTMLDivElement;
    a.remove();*/
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.alert("bien supprimee");
  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  candidatsDetails(id:string){
    //il  faut faire des choses dans le constructeur de MyProfile.ts
    this.navCtrl.push(MyProfilePage,id);
  }

}
