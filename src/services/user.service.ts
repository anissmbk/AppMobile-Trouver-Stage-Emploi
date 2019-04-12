import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "./auth.service";
import {EnsaisteModel} from "../UserClass/ensaisteModel";
import {EntrepriseModel} from "../UserClass/entrepriseModel";

@Injectable()
export class UserService {

  constructor(
    public authService:AuthService,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) { }


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
}
