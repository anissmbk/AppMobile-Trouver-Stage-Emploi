import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from "@angular/fire/database";
import {EnsaisteModel} from "../UserClass/ensaisteModel";
import {EntrepriseModel} from "../UserClass/entrepriseModel";
import {AnnonceStageModel} from "../AnnonceClass/annonceStageModel";
import {AnnonceEmploiModel} from "../AnnonceClass/AnnonceEmploiModel";
import {DiscussionModel} from "../DiscussionClass/DiscussionModel";

@Injectable()
export class UserService {
  //user: User;

  constructor(public db: AngularFireDatabase) {
  }

  updateEntreprise(value: EntrepriseModel) {
    return new Promise<any>((resolve, reject) => {
      const userId = this.getCurrentUser().uid;
      const itemRef = this.db.object('/entreprise/' + userId);
      itemRef.update(value).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  updateEnsaiste(value: EnsaisteModel) {
    return new Promise<any>((resolve, reject) => {
      const userId = this.getCurrentUser().uid;
      const itemRef = this.db.object('/ensaiste/' + userId);
      itemRef.update(value).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }


  getCurrentUser() {
    return firebase.auth().currentUser;
  }


  updateCurrentBasicProfile(value: string) {
    return new Promise<any>((resolve, reject) => {
      const user = this.getCurrentUser();
      console.log("email" + user.email + "photo" + user.photoURL + "emailVerified" + user.emailVerified);
      user.updateProfile({
        displayName: value,
        photoURL: ""
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  getCurrentUserDisplayName() {
    const user = this.getCurrentUser();
    return user.displayName;
  }

  getEnsaiste(): EnsaisteModel {
    let ensaiste: EnsaisteModel = new EnsaisteModel();
    const userId = this.getUserLoggedIn().uid;
    var ref = firebase.database().ref('/ensaiste/' + userId);
    ref.once("value").then(function (snapshot) {
      var result = snapshot.val();
      if (result != null) {
        var keys = Object.keys(result);
        ensaiste.city = result[keys[0]];
        ensaiste.competence = result[keys[1]];
        ensaiste.date_naissance = result[keys[2]];
        ensaiste.email = result[keys[3]];
        ensaiste.experience = result[keys[4]];
        ensaiste.firstName = result[keys[5]];
        ensaiste.formation = result[keys[6]];
        ensaiste.lastName = result[keys[7]];
        ensaiste.phone = result[keys[8]];
        ensaiste.photo = result[keys[9]];
      }
    }, function (error) {
      return error;
    });
    return ensaiste;
  }

  getEnsaisteById(id: string): EnsaisteModel {
    let ensaiste: EnsaisteModel = new EnsaisteModel();
    var ref = firebase.database().ref('/ensaiste/' + id);
    ref.once("value").then(function (snapshot) {
      var result = snapshot.val();
      if (result != null) {
        var keys = Object.keys(result);
        ensaiste.city = result[keys[0]];
        ensaiste.competence = result[keys[1]];
        ensaiste.date_naissance = result[keys[2]];
        ensaiste.email = result[keys[3]];
        ensaiste.experience = result[keys[4]];
        ensaiste.firstName = result[keys[5]];
        ensaiste.formation = result[keys[6]];
        ensaiste.lastName = result[keys[7]];
        ensaiste.phone = result[keys[8]];
        ensaiste.photo = result[keys[9]];
      }
    }, function (error) {
      return error;
    });
    return ensaiste;
  }


  getEntreprise(): EntrepriseModel {
    let entreprise: EntrepriseModel = new EntrepriseModel();
    const userId = this.getUserLoggedIn().uid;
    var ref = firebase.database().ref('/entreprise/' + userId);
    ref.once("value").then(function (snapshot) {
      var result = snapshot.val();
      if (result != null) {
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
      return error;
    });
    return entreprise;
  }

  getEntrepriseById(id: string): EntrepriseModel {
    let entreprise: EntrepriseModel = new EntrepriseModel();
    if (id != '') {
      var ref = firebase.database().ref('/entreprise/' + id);
      ref.once("value").then(function (snapshot) {
        var result = snapshot.val();
        if (result != null) {
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
        return error;
      });
    }
    return entreprise;
  }

  getAnnonceStageById(id: string): AnnonceStageModel {
    let annonceStage: AnnonceStageModel = new AnnonceStageModel();
    if (id != '') {
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

  getSujetById(id:string):DiscussionModel{
    let sujet: DiscussionModel = new DiscussionModel();
    var ref = firebase.database().ref('/discussion/'+id);
    ref.once("value").then(function (snapshot) {
      var result = snapshot.val();
      if (result != null) {
        var keys = Object.keys(result);
        sujet.id_ensaiste = result[keys[0]];
        sujet.nbr_comment = result[keys[1]];
        sujet.nbr_like = result[keys[2]];
        sujet.publiee_le = result[keys[3]];
        sujet.sujet_text = result[keys[4]];
      }
    }, function (error) {

      return error;
    });
    return sujet;
  }


  addCommentSujet(id: string, userId: string, commentaire_text: string,nbrComment:number) {
    const idAleatoir = Math.random().toString(36).substring(2);
    nbrComment++;
    this.db.object('/discussion/' + id + '/z_commentaires/' + idAleatoir).set({
      commentaire_text: commentaire_text,
      id_ensaiste: userId
    });
    this.db.object('/discussion/' + id + '/nbr_comment').set(nbrComment);
  }

  addLike(id:string,nbr:number,idUser:string){
    this.db.object('/discussion/' + id + '/nbr_like').set(nbr);
    this.db.object('/discussion/' + id + '/z_like_ensaiste/'+idUser).set({id_ensaiste:idUser});
  }

  removeLike(id:string,nbr:number,idUser:string){
    this.db.object('/discussion/' + id + '/nbr_like').set(nbr);
    this.db.object('/discussion/' + id + '/z_like_ensaiste/'+idUser).remove();
  }

  getAnnonceEmploiById(id: string): AnnonceEmploiModel {
    let annonceEmploi: AnnonceEmploiModel = new AnnonceEmploiModel();
    var ref = firebase.database().ref('/annonceEmploi/' + id);
    ref.once("value").then(function (snapshot) {
      var result = snapshot.val();
      if (result != null) {
        var keys = Object.keys(result);
        annonceEmploi.a_partir_de = result[keys[0]];
        annonceEmploi.categorie = result[keys[1]];
        annonceEmploi.contexte_mission = result[keys[2]];
        annonceEmploi.id_entreprise = result[keys[3]];
        annonceEmploi.langues_exigees = result[keys[4]];
        annonceEmploi.nbr_poste_proposes = result[keys[5]];
        annonceEmploi.niveau_etude = result[keys[6]];
        annonceEmploi.niveau_experience = result[keys[7]];
        annonceEmploi.profil_recherche = result[keys[8]];
        annonceEmploi.publiee_le = result[keys[9]];
        annonceEmploi.titre = result[keys[10]];
        annonceEmploi.type_contrat = result[keys[11]];
        annonceEmploi.ville = result[keys[12]];
      }
    }, function (error) {

      return error;
    });
    return annonceEmploi;

  }

  addCommentaireStage(id: string, commentaire_text: string, disponibilite: string) {
    const userId = firebase.auth().currentUser.uid;//9leb ==> this.getUserLoggedIn().uid;
    const idAleatoir = Math.random().toString(36).substring(2);
    this.db.object('/annonceStage/' + id + '/z_commentaires/' + idAleatoir).set({
      commentaire_text: commentaire_text,
      disponibilite: disponibilite,
      id_ensaiste: userId
    });
  }

  addCommentaireEmploi(id: string, commentaire_text: string, disponibilite: string) {
    const userId = firebase.auth().currentUser.uid;//9leb ==> this.getUserLoggedIn().uid;
    const idAleatoir = Math.random().toString(36).substring(2);
    this.db.object('/annonceEmploi/' + id + '/z_commentaires/' + idAleatoir).set({
      commentaire_text: commentaire_text,
      disponibilite: disponibilite,
      id_ensaiste: userId
    });
  }

  sendRecommandation(id: string, recommandation_text: string) {
    const entrepriseId = firebase.auth().currentUser.uid;//9leb ==> this.getUserLoggedIn().uid;
    const idAleatoir = Math.random().toString(36).substring(2);
    this.db.object('/ensaiste/' + id + '/zz_notifications_recommandations/' + idAleatoir).set({
      recommandation_text: recommandation_text,
      id_entreprise: entrepriseId
    });
  }

  // Set data on localStorage
  setUserLoggedIn(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('saved on localStorage');
  }

  // get data on localStorage
  getUserLoggedIn() {
    //console.log(firebase.auth().currentUser.displayName);
    /*if (localStorage.getItem('user')) {
     this.user=JSON.parse(localStorage.getItem('user'));
    } else {
      console.log('localStorage empty');
      this.user=firebase.auth().currentUser;
    }*/
    return JSON.parse(localStorage.getItem('user'));
  }

  // Optional: clear localStorage
  clearLocalStorage() {
    localStorage.clear();
  }


  addSujet(idUser: string, sujet_text: string) {
    var now = new Date();
    var annee = now.getFullYear();
    var mois = ("0" + (now.getMonth() + 1)).slice(-2);
    var jour = ("0" + (now.getDate())).slice(-2);
    const dateNow = annee + '-' + mois + '-' + jour;
    const idAleatoir = Math.random().toString(36).substring(2);
    this.db.object('/discussion/' + idAleatoir).set({
      id_ensaiste: idUser,
      nbr_comment: 0,
      nbr_like: 0,
      publiee_le: dateNow,
      sujet_text: sujet_text,
    });
  }

}

export interface UserModel {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}
