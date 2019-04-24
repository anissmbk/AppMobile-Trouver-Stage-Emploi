import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {AngularFireStorage} from "@angular/fire/storage";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {EnsaistePage} from "../ensaiste/ensaiste";

@IonicPage()
@Component({
  selector: 'page-modify-profile-ensaiste',
  templateUrl: 'modify-profile-ensaiste.html',
})

export class ModifyProfileEnsaistePage  {

  ensaisteProfile:EnsaisteModel=new EnsaisteModel();
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afStorage:AngularFireStorage,
              public userService:UserService,
              public db:AngularFireDatabase
  ) {
    var x=db.object('/ensaiste/'+firebase.auth().currentUser.uid);
    x.snapshotChanges().subscribe(item=>{
      var e = item.payload.toJSON();
      this.ensaisteProfile=e as EnsaisteModel;
    });
  }

  upload(event){
    const id = Math.random().toString(36).substring(2);
    var storageRef = firebase.storage().ref();
    var task = storageRef.child(id).put(event.target.files[0]);
    task.on('state_changed', function(snapshot){
    }, function(error) {}, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        var img = document.getElementById('myimg')as HTMLImageElement;
        img.src = downloadURL;
        this.ensaisteProfile.photo=downloadURL;
        this.refrecherPage(this.ensaisteProfile.photo)
      }.bind(this));
    }.bind(this));
  }
  refrecherPage(image:string){
    this.ensaisteProfile.photo=image;
    this.userService.updateEnsaiste(this.ensaisteProfile);
  }

  modifier(value){
    if(value.prenom) this.ensaisteProfile.firstName=value.prenom;
    if(value.nom) this.ensaisteProfile.lastName=value.nom;
    if(value.debut) this.ensaisteProfile.zdebut=value.debut;
    if(value.formation) this.ensaisteProfile.formation=value.formation;
    if(value.fin) this.ensaisteProfile.zfin=value.fin;
    if(value.ville) this.ensaisteProfile.city=value.ville;
    if(value.ecole) this.ensaisteProfile.zecole=value.ecole;
    if(value.email) this.ensaisteProfile.email=value.email;
    if(value.datedenaissance) this.ensaisteProfile.date_naissance=value.datedenaissance;
    if(value.tel) this.ensaisteProfile.phone=value.tel;
    this.userService.updateEnsaiste(this.ensaisteProfile);
    const user=this.userService.getCurrentUser();
    if(user.displayName==="ensaiste1"){
    this.userService.updateCurrentBasicProfile('ensaiste');
      this.navCtrl.setRoot(EnsaistePage);
    }
    }

}

