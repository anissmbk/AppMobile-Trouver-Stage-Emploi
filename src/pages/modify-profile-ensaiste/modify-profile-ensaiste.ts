import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {AngularFireStorage} from "@angular/fire/storage";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
/**
 * Generated class for the ModifyProfileEnsaistePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
        console.log("lien 1"+this.ensaisteProfile.photo);
        this.refrecherPage(this.ensaisteProfile.photo)
      }.bind(this));
      console.log("lien 2");
    }.bind(this));
    console.log("lien3");
  }
  refrecherPage(image:string){
    this.ensaisteProfile.photo=image;
    this.userService.updateEnsaiste(this.ensaisteProfile);
  }

}

