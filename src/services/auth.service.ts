import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {UserModel, UserService} from "./user.service";

@Injectable()
export class AuthService {
  user: UserModel;

  constructor(
    public afAuth: AngularFireAuth,
    public userservice: UserService
  ) {
   // this.checkLocalStorage();
  }

  /*
   * If localStoge is empty, we call getDataFromFirebase
   * method set user data from firebase on localStorage
   */
  /*checkLocalStorage() {
    if (!localStorage.getItem('user')) {
      this.getDataFromFirebase();
    } else {
      console.log('localStorage ready!');
    }
  }*/

  /*
   * Call data from firebase and set data on local storage
   */
  getDataFromFirebase() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.user = auth; // save data firebase on user
        console.log('Authenticated');
        this.userservice.setUserLoggedIn(this.user); // set user data from firebase on local storage
      } else {
        console.log('Not authenticated');
      }
    });
  }


  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogin(email,password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        console.log(firebase.auth().currentUser.uid);
        console.log(this.userservice.getUserLoggedIn());
        console.log(firebase.auth().currentUser);
        this.userservice.clearLocalStorage(); // Optional to clear localStorage
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }


}
