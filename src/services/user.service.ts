import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "./auth.service";
import {EnsaisteModel} from "../UserClass/ensaisteModel";
import {EntrepriseModel} from "../UserClass/entrepriseModel";
import {AnnonceStageModel} from "../AnnonceClass/annonceStageModel";
import {AnnonceEmploiModel} from "../AnnonceClass/AnnonceEmploiModel";

@Injectable()
export class UserService {

  constructor(public db: AngularFireDatabase) { }


  updateEntreprise(value:EntrepriseModel){
    return new Promise<any>((resolve, reject) => {
      const userId=this.getCurrentUser().uid;
      const itemRef = this.db.object('/entreprise/'+userId);
      itemRef.update(value).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  updateEnsaiste(value:EnsaisteModel){
    return new Promise<any>((resolve, reject) => {
      const userId=this.getCurrentUser().uid;
      const itemRef = this.db.object('/ensaiste/'+userId);
      itemRef.update(value).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }


  getCurrentUser() {
    return firebase.auth().currentUser;
  }


  updateCurrentBasicProfile(value:string) {
    return new Promise<any>((resolve, reject) => {
      const user = this.getCurrentUser();
      console.log("email"+user.email+"photo"+user.photoURL+"emailVerified"+user.emailVerified);
      user.updateProfile({
        displayName: value,
        photoURL: ""
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  getCurrentUserDisplayName(){
    const user = this.getCurrentUser();
    return user.displayName;
  }

  getEnsaiste():EnsaisteModel{
    let ensaiste:EnsaisteModel=new EnsaisteModel();
    const userId = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref('/ensaiste/'+userId);
    ref.once("value").then(function(snapshot){
      var result = snapshot.val();
      if(result!=null) {
        var keys = Object.keys(result);
        ensaiste.city = result[keys[0]];
        ensaiste.competence = result[keys[1]];
        ensaiste.date_naissance = result[keys[2]];
        ensaiste.email = result[keys[3]];
        ensaiste.evaluation = result[keys[4]];
        ensaiste.experience = result[keys[5]];
        ensaiste.firstName = result[keys[6]];
        ensaiste.formation = result[keys[7]];
        ensaiste.lastName = result[keys[8]];
        ensaiste.phone = result[keys[9]];
        ensaiste.photo = result[keys[10]];
        ensaiste.zdebut = result[keys[11]];
        ensaiste.zecole = result[keys[12]];
        ensaiste.zfin=result[keys[13]];
      }
    }, function (error) {
      return  error;
    });
    return ensaiste;
  }

  getEnsaisteById(id:string):EnsaisteModel{
    let ensaiste:EnsaisteModel=new EnsaisteModel();
    var ref = firebase.database().ref('/ensaiste/'+id);
    ref.once("value").then(function(snapshot){
      var result = snapshot.val();
      if(result!=null) {
        var keys = Object.keys(result);
        ensaiste.city = result[keys[0]];
        ensaiste.competence = result[keys[1]];
        ensaiste.date_naissance = result[keys[2]];
        ensaiste.email = result[keys[3]];
        ensaiste.evaluation = result[keys[4]];
        ensaiste.experience = result[keys[5]];
        ensaiste.firstName = result[keys[6]];
        ensaiste.formation = result[keys[7]];
        ensaiste.lastName = result[keys[8]];
        ensaiste.phone = result[keys[9]];
        ensaiste.photo = result[keys[10]];
        ensaiste.zdebut = result[keys[11]];
        ensaiste.zecole = result[keys[12]];
        ensaiste.zfin=result[keys[13]];
      }
    }, function (error) {
      return  error;
    });
    return ensaiste;
  }



  getEntreprise():EntrepriseModel{
    let entreprise:EntrepriseModel=new EntrepriseModel();
    const userId = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref('/entreprise/'+userId);
    ref.once("value").then(function(snapshot){
      var result = snapshot.val();
      if(result!=null) {
        var keys = Object.keys(result);
        entreprise.city = result[keys[0]];
        entreprise.description = result[keys[1]];
        entreprise.email = result[keys[2]];
        entreprise.entrepriseName = result[keys[3]];
        entreprise.phone = result[keys[4]];
        entreprise.photo = result[keys[5]];
        entreprise.secteurActivite = result[keys[6]];
      }
    }, function (error) {
      return  error;
    });
    return entreprise;
  }

  getEntrepriseById(id:string):EntrepriseModel{
    let entreprise:EntrepriseModel=new EntrepriseModel();
    if(id!=''){
    var ref = firebase.database().ref('/entreprise/'+id);
    ref.once("value").then(function(snapshot){
      var result = snapshot.val();
      if(result!=null){
      var keys=Object.keys(result);
      entreprise.city=result[keys[0]];
      entreprise.description=result[keys[1]];
      entreprise.email=result[keys[2]];
      entreprise.entrepriseName=result[keys[3]];
      entreprise.phone=result[keys[4]];
      entreprise.photo=result[keys[5]];
      entreprise.secteurActivite=result[keys[6]];
      }
    }, function (error) {
      return  error;
    });
    }
    return entreprise;
  }

  getAnnonceStageById(id:string):AnnonceStageModel{
    let annonceStage:AnnonceStageModel=new AnnonceStageModel();
    if(id!='') {
      var ref = firebase.database().ref('/annonceStage/' + id);
      ref.once("value").then(function (snapshot) {
        var result = snapshot.val();
        if (result != null) {
          var keys = Object.keys(result);
          annonceStage.a_partir_de = result[keys[0]];
          annonceStage.categorie = result[keys[1]];
          annonceStage.contexte_mission = result[keys[2]];
          annonceStage.duree_stage = result[keys[3]];
          annonceStage.id_entreprise = result[keys[4]];
          annonceStage.profil_recherche = result[keys[5]];
          annonceStage.publiee_le = result[keys[6]];
          annonceStage.remuneration = result[keys[7]];
          annonceStage.stagiaire_demande = result[keys[8]];
          annonceStage.titre = result[keys[9]];
          annonceStage.type_stage = result[keys[10]];
          annonceStage.ville = result[keys[11]];
          annonceStage.z_commentaires = result[keys[12]];
        }
      }, function (error) {

        return error;
      });
    }
    return annonceStage;

  }

  getAnnonceEmploiById(id:string):AnnonceEmploiModel{
    let annonceEmploi:AnnonceEmploiModel=new AnnonceEmploiModel();
    var ref = firebase.database().ref('/annonceEmploi/'+id);
    ref.once("value").then(function(snapshot){
      var result = snapshot.val();
      if(result!=null){
        var keys=Object.keys(result);
        annonceEmploi.a_partir_de=result[keys[0]];
        annonceEmploi.categorie=result[keys[1]];
        annonceEmploi.contexte_mission=result[keys[2]];
        annonceEmploi.id_entreprise=result[keys[3]];
        annonceEmploi.langues_exigees=result[keys[4]];
        annonceEmploi.nbr_poste_proposes=result[keys[5]];
        annonceEmploi.niveau_etude=result[keys[6]];
        annonceEmploi.niveau_experience=result[keys[7]];
        annonceEmploi.poste_propose=result[keys[8]];
        annonceEmploi.profil_recherche=result[keys[9]];
        annonceEmploi.publiee_le=result[keys[10]];
        annonceEmploi.titre=result[keys[11]];
        annonceEmploi.type_contrat=result[keys[12]];
        annonceEmploi.ville=result[keys[13]];
      }
    }, function (error) {

      return  error;
    });
    return annonceEmploi;

  }
}
