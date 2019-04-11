import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "./auth.service";
import {EnsaisteModel} from "../UserClass/ensaisteModel";
import {EntrepriseModel} from "../UserClass/entrepriseModel";
// import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class UserService {

  constructor(
    public authService:AuthService,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) { }


  getCurrentUser() {
    //methode1
/*    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });*/
//methode 2
    return firebase.auth().currentUser;
  }

  ajoutEntrepriseUser(value:EntrepriseModel){
    return new Promise<any>((resolve, reject) => {
      const userId=this.getCurrentUser().uid;
      const itemRef = this.db.object('/entreprise/'+userId);
      itemRef.set(value).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  ajoutEnsaisteUser(value:EnsaisteModel){
    return new Promise<any>((resolve, reject) => {
      const userId=this.getCurrentUser().uid;
      const itemRef = this.db.object('/ensaiste/'+userId);
      itemRef.set(value).then(res => {
        resolve(res);
      }, err => reject(err));
    });
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
}
