import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import { UserService} from "../../services/user.service";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import * as firebase from 'firebase/app';
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {AnnonceDetailPage} from "../annonce-detail/annonce-detail";
import {AnnonceEmploiModel} from "../../AnnonceClass/AnnonceEmploiModel";
import {AnnonceEmploiDetailsPage} from "../annonce-emploi-details/annonce-emploi-details";
@IonicPage()
@Component({
  selector: 'page-mes-annonces',
  templateUrl: 'mes-annonces.html',
})
export class MesAnnoncesPage {
  annonceEnregistreesList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  annonceEmploiEnregistreesList:AngularFireObject<any>;
  itemArrayEmploi=[];
  myObjectEmploi= [];
  entrepriseUser:EntrepriseModel;
  isSearch:boolean=false;
  isEmploiSearch:boolean=false;
  searchTab=[];
  searchStageDefaultValues={
    Ville:"0",
    Type:"0",
    Categorie:"0"
  };
  searchEmploiDefaultValues={
    Ville:"0",
    Type_contrat:"0",
    Categorie:"0"
  };
  constructor(private alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {

    this.annonceEnregistreesList=this.db.object('/ensaiste/'+firebase.auth().currentUser.uid+'/zz_annonce_stage_enregistre');
    this.annonceEnregistreesList.snapshotChanges().subscribe(action => {
      this.itemArray.push(action.payload.val() as {id:string});
      if(this.itemArray[0]!=null){
        this.myObject = Object.entries(this.itemArray[0]);
      }

      for (let annonce of this.myObject) {
        var x= this.userService.getAnnonceStageById(annonce[1]['id']);
        annonce.push(x as AnnonceStageModel);
      }
    });
   /* this.annonceEnregistreesList.snapshotChanges().subscribe(action => {
      for (let annonce of this.myObject) {
        this.entrepriseUser=this.userService.getEntrepriseById(annonce[2]['id_entreprise']);
        annonce.push(this.entrepriseUser as EntrepriseModel);
      }
      console.log(this.myObject);
    });*/

    this.annonceEmploiEnregistreesList=this.db.object('/ensaiste/'+firebase.auth().currentUser.uid+'/zz_annonce_emploi_enregistre');
    this.annonceEmploiEnregistreesList.snapshotChanges().subscribe(action => {
      this.itemArrayEmploi.push(action.payload.val() as {id:string});
      if(this.itemArrayEmploi[0]!=null){
        this.myObjectEmploi = Object.entries(this.itemArrayEmploi[0]);
      }
      for (let annonce of this.myObjectEmploi) {
        var x= this.userService.getAnnonceEmploiById(annonce[1]['id']);
        annonce.push(x as AnnonceEmploiModel);
      }
    });
    /*this.annonceEmploiEnregistreesList.snapshotChanges().subscribe(action => {
        for (let annonce of this.myObjectEmploi) {
          this.entrepriseUser=this.userService.getEntrepriseById(annonce[2]['id_entreprise']);
          annonce.push(this.entrepriseUser as EntrepriseModel);
        }
      });*/
  }

  removeAnnonceEnregistre(id1:string){
    const confirm = this.alertCtrl.create({
      title: 'Voulez-vous vraiment supprimer cette annonce ?',
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
            const userId=firebase.auth().currentUser.uid;
            const itemRef = this.db.object('/ensaiste/'+userId+'/zz_annonce_stage_enregistre/'+id1);
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

  annonceStageDetail(id:string){
    this.navCtrl.push(AnnonceDetailPage,id);
  }
  annonceEmploiDetail(id:string){
    this.navCtrl.push(AnnonceEmploiDetailsPage,id);
  }

  removeAnnonceEmploiEnregistre(id1:string){
    const confirm = this.alertCtrl.create({
      title: 'Voulez-vous vraiment supprimer cette annonce ?',
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
            const userId=firebase.auth().currentUser.uid;
            const itemRef = this.db.object('/ensaiste/'+userId+'/zz_annonce_emploi_enregistre/'+id1);
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
  chercherStage(value){
    this.searchTab=[];
    if(value.type_stage==0 && value.categorie==0 && value.ville==0){
      this.searchTab=this.myObject;
    }
    else{
      for (let annonce of this.myObject){
        if( (annonce[2]['ville']==value.ville || value.ville==0) && (annonce[2]['categorie']==value.categorie||value.categorie==0)  &&
          (annonce[2]['type_stage']==value.type_stage || value.type_stage==0)){
          this.searchTab.push(annonce);
        }
      }
    }
    this.isEmploiSearch=false;
    this.isSearch=true;
  }

  chercherEmploi(value){
    this.searchTab=[];
    if(value.type_contrat==0 && value.categorie==0 && value.ville==0){
      this.searchTab=this.myObjectEmploi;
    }
    else{
      for (let annonce of this.myObjectEmploi){
        if( (annonce[2]['ville']==value.ville || value.ville==0) && (annonce[2]['categorie']==value.categorie||value.categorie==0)  &&
          (annonce[2]['type_contrat']==value.type_contrat || value.type_contrat==0)){
          this.searchTab.push(annonce);
        }
      }
    }
    this.isEmploiSearch=true;
    this.isSearch=true;
  }

  chooseSearch(event:any){
    var x=event.target.value;
    console.log(x);
    if(x=='Stage'){
      document.getElementById("searchformEmploii").style.display="none";
      document.getElementById("searchformStagee").style.display="block";
    }
    else if(x=='Emploi'){
      document.getElementById("searchformStagee").style.display="none";
      document.getElementById("searchformEmploii").style.display="block";
    }
    else{
      document.getElementById("searchformStagee").style.display="none";
      document.getElementById("searchformEmploii").style.display="none";
      this.isSearch=false;
    }
  }
  closefilter(){
    this.isSearch=false;
    document.getElementById("searchformStagee").style.display="none";
    document.getElementById("searchformEmploii").style.display="none";
    document.getElementById("mySelect11").getElementsByTagName('option')[0].selected=true;
  }

}
