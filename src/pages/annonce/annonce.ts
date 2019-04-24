import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {UserService} from "../../services/user.service";
import {AnnonceDetailPage} from "../annonce-detail/annonce-detail";
import * as firebase from 'firebase/app';
import {AnnonceEmploiModel} from "../../AnnonceClass/AnnonceEmploiModel";

@IonicPage()
@Component({
  selector: 'page-annonce',
  templateUrl: 'annonce.html',
})
export class AnnoncePage {
  annonceList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  annonceEmloiList:AngularFireObject<any>;
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
  constructor( private alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {
    this.annonceList=db.object('/annonceStage');
    this.annonceList.snapshotChanges().subscribe(action=>{
      let y=action.payload.toJSON();
      y['key']=action.key;
      this.itemArray.push(action.payload.val() as AnnonceStageModel);
      // pour savoir la methode entries il faut ajouter au tsconfig.json dans lib"es2017.object","es2016.array.include"
      this.myObject=Object.entries(this.itemArray[0]);

      for(let annonce of this.myObject){
        this.entrepriseUser=this.userService.getEntrepriseById(annonce[1]['id_entreprise']);
        annonce.push(this.entrepriseUser as EntrepriseModel);
      }

    });

    this.annonceEmloiList=db.object('/annonceEmploi');
    this.annonceEmloiList.snapshotChanges().subscribe(action=>{
      this.itemArrayEmploi.push(action.payload.val() as AnnonceEmploiModel);
      this.myObjectEmploi=Object.entries(this.itemArrayEmploi[0]);

      for(let annonce1 of this.myObjectEmploi){
        this.entrepriseUser=this.userService.getEntrepriseById(annonce1[1]['id_entreprise']);
        annonce1.push(this.entrepriseUser as EntrepriseModel);
      }

    });
  }

  annonceDetail(id:string){
    //problemme pas de back()
    this.navCtrl.push(AnnonceDetailPage,id);
   }
  enregistrerAnnonce(id1:string){
    const userId=firebase.auth().currentUser.uid;
    const itemRef = this.db.object('/ensaiste/'+userId+'/zz_annonce_stage_enregistre/'+id1);
    var a={
      id:id1
    };
    itemRef.set(a);
    this.alert("bien enregistrer");

  }
  enregistrerAnnonceEmploi(id1:string){
    const userId=firebase.auth().currentUser.uid;
    const itemRef = this.db.object('/ensaiste/'+userId+'/zz_annonce_emploi_enregistre/'+id1);
    var a={
      id:id1
    };
    itemRef.set(a);
    this.alert("bien enregistrer");

  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  chercherStage(value){
    this.searchTab=[];
    if(value.type_stage==0 && value.categorie==0 && value.ville==0){
      this.searchTab=this.myObject;
    }
    else{
      for (let annonce of this.myObject){
        if( (annonce[1]['ville']==value.ville || value.ville==0) && (annonce[1]['categorie']==value.categorie||value.categorie==0)  &&
          (annonce[1]['type_stage']==value.type_stage || value.type_stage==0)){
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
        if( (annonce[1]['ville']==value.ville || value.ville==0) && (annonce[1]['categorie']==value.categorie||value.categorie==0)  &&
          (annonce[1]['type_contrat']==value.type_contrat || value.type_contrat==0)){
          this.searchTab.push(annonce);
        }
      }
    }
    this.isEmploiSearch=true;
    this.isSearch=true;
  }

  chooseSearch(event){
    var x=event.target.value;
    if(x=='Stage'){
      document.getElementById("searchformEmploi").style.display="none";
      document.getElementById("searchformStage").style.display="block";
    }
    else if(x=='Emploi'){
      document.getElementById("searchformStage").style.display="none";
      document.getElementById("searchformEmploi").style.display="block";
    }
    else{
      document.getElementById("searchformStage").style.display="none";
      document.getElementById("searchformEmploi").style.display="none";
      this.isSearch=false;
    }
  }
  closefilter(){
    this.isSearch=false;
    document.getElementById("searchformStage").style.display="none";
    document.getElementById("searchformEmploi").style.display="none";
    document.getElementById("mySelect1").getElementsByTagName('option')[0].selected=true;
  }
}
