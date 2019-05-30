import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import * as firebase from 'firebase/app';
import {EntreprisePage} from "../entreprise/entreprise";

@IonicPage()
@Component({
  selector: 'page-modify-profile-entreprise',
  templateUrl: 'modify-profile-entreprise.html',
})
export class ModifyProfileEntreprisePage {
  entrepriseProfile:EntrepriseModel=new EntrepriseModel();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService:UserService,
              public db:AngularFireDatabase
  ) {
    var x=db.object('/entreprise/'+this.userService.getCurrentUser().uid);
    x.snapshotChanges().subscribe(item=>{
      var e = item.payload.toJSON();
      this.entrepriseProfile=e as EntrepriseModel;
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
        this.entrepriseProfile.photo=downloadURL;
        console.log("lien 1"+this.entrepriseProfile.photo);
        this.refrecherPage(this.entrepriseProfile.photo)
      }.bind(this));
      console.log("lien 2");
    }.bind(this));
    console.log("lien3");
  }
  refrecherPage(image:string){
    this.entrepriseProfile.photo=image;
    this.userService.updateEntreprise(this.entrepriseProfile);
  }

  modifier(value){
    if(value.nomentreprise) this.entrepriseProfile.entrepriseName=value.nomentreprise;
    if(value.email) this.entrepriseProfile.email=value.email;
    if(value.ville) this.entrepriseProfile.city=value.ville;
    if(value.tel) this.entrepriseProfile.phone=value.tel;
    if(value.description) this.entrepriseProfile.description=value.description;
    this.userService.updateEntreprise(this.entrepriseProfile);
    this.navCtrl.setRoot(EntreprisePage);
  }

}
