import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {UserService} from "../../services/user.service";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import * as firebase from 'firebase/app';
import {AnnonceDetailPage} from "../annonce-detail/annonce-detail";
import {FormAnnonceStagePage} from "../form-annonce-stage/form-annonce-stage";
import {FormAnnonceEmploiPage} from "../form-annonce-emploi/form-annonce-emploi";
import {EntreprisePage} from "../entreprise/entreprise";
import {AnnonceEmploiModel} from "../../AnnonceClass/AnnonceEmploiModel";
import {AnnonceEmploiDetailsPage} from "../annonce-emploi-details/annonce-emploi-details";
import {AuthService} from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-poster-annoce',
  templateUrl: 'poster-annoce.html',
})
export class PosterAnnocePage {
  mesAnnoncesStageList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  mesAnnoncesEmploiList:AngularFireObject<any>;
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

  constructor( public authService: AuthService,public alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {
    //this.getUserLoggedIn();
    this.entrepriseUser=this.userService.getEntreprise();
    console.log(this.userService.getUserLoggedIn().uid);
    this.mesAnnoncesStageList=this.db.object('/entreprise/'+this.userService.getUserLoggedIn().uid+'/zz_mes_annonces_stage');
    this.mesAnnoncesStageList.snapshotChanges().subscribe(action => {
      this.itemArray.push(action.payload.val() as {id:string});
      if(this.itemArray[0]!=null){
        this.myObject = Object.entries(this.itemArray[0]);
      }
      for (let annonce of this.myObject) {
        var x = this.userService.getAnnonceStageById(annonce[1]['id']);
        console.log(annonce[1]['id']);
        annonce.push(x as AnnonceStageModel);
      }
      console.log(this.myObject);
    });

    this.mesAnnoncesEmploiList=this.db.object('/entreprise/'+this.userService.getUserLoggedIn().uid+'/zz_mes_annonces_emploi');
    this.mesAnnoncesEmploiList.snapshotChanges().subscribe(action => {
      this.itemArrayEmploi.push(action.payload.val() as {id:string});
      if(this.itemArrayEmploi[0]!=null){
        this.myObjectEmploi = Object.entries(this.itemArrayEmploi[0]);
      }
      for (let annonce1 of this.myObjectEmploi) {
        var x = this.userService.getAnnonceEmploiById(annonce1[1]['id']);
        console.log(annonce1[1]['id']);
        annonce1.push(x as AnnonceEmploiModel);
      }
      console.log(this.myObjectEmploi);
    });
  }
  /*getUserLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }*/

  removeAnnonce(id1:string){//Attention il faut supprimer dans deux places diferrents entreprise=>zz_mes_annonces_stage et dans annonceStage

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
            let userId=firebase.auth().currentUser.uid;// 9leb==> this.userService.getUserLoggedIn().uid
            let itemRef = this.db.object('/entreprise/'+userId+'/zz_mes_annonces_stage/'+id1);
            itemRef.remove();
            let annonce = this.db.object('/annonceStage/'+id1);
            annonce.remove();
            this.alert("bien supprimee");
            this.navCtrl.setRoot(EntreprisePage);
          }
        }
      ]
    });
    confirm.present();
  }
  removeAnnonceEmploi(id1:string){//Attention il faut supprimer dans deux places diferrents entreprise=>zz_mes_annonces_stage et dans annonceStage
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
            //Attentien firebase.auth().currentUser.uid makatkhdemch f local storage mli yalah lconstructor kiycharga khass 7ta yt loada kolchi

            let userId=firebase.auth().currentUser.uid;// 9leb==> this.userService.getUserLoggedIn().uid
            let itemRef = this.db.object('/entreprise/'+userId+'/zz_mes_annonces_emploi/'+id1);
            itemRef.remove();
            let annonce = this.db.object('/annonceEmploi/'+id1);
            annonce.remove();
            this.alert("bien supprimee");
            this.navCtrl.setRoot(EntreprisePage);
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

  annonceStageDetails(id:string){
    console.log(id);
    this.navCtrl.push(AnnonceDetailPage,id);
  }

  annonceEmploiDetails(id:string){
    this.navCtrl.push(AnnonceEmploiDetailsPage,id);
  }

  posterAnnonceStage(){
    this.navCtrl.push(FormAnnonceStagePage);
  }
  posterAnnonceEmploi(){
    this.navCtrl.push(FormAnnonceEmploiPage);
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
    /*var x=(<HTMLInputElement>document.getElementById("mySelect")).value;
    console.log(x)*/
  }
  closefilter(){
    this.isSearch=false;
    document.getElementById("searchformStage").style.display="none";
    document.getElementById("searchformEmploi").style.display="none";
    document.getElementById("mySelect1").getElementsByTagName('option')[0].selected=true;
  }
  afficherDateFormat(date:string):string{
    var date1=new Date(date);
    var annee1 = date1.getFullYear();
    var mois1 = ("0" + (date1.getMonth() + 1)).slice(-2);
    var jour1 = ("0" + (date1.getDate())).slice(-2);
    return  jour1 + '/' + mois1 + '/' + annee1;
  }
}
