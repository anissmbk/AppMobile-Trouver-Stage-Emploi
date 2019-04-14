import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
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
  constructor(private alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {
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
  removeAnnonceEnregistre(id1:string){
    const userId=firebase.auth().currentUser.uid;
    const itemRef = this.db.object('/ensaiste/'+userId+'/zz_annonce_enregistre/'+id1);
    itemRef.remove();
    // fixer le prbleme il faut cliquer deux fois !!!
    var a=document.getElementById(id1) as HTMLDivElement;
    a.remove();
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.alert("bien supprimee");
   }

   dorefresh(refresher){
      //pour laffichage fixer le prblm!!!!!
       if(refresher != 0){
         refresher.complete();
       }
  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  annonceDetail(id:string){
    this.navCtrl.push(AnnonceDetailPage,id);
  }


}
