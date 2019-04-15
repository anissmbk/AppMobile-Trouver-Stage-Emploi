import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/database";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {UserService} from "../../services/user.service";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import * as firebase from 'firebase/app';
@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  entrepriseList:AngularFireObject<any>;
  ensaisteList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  itemArrayEnsaiste=[];
  myObjectEnsaiste= [];
  entrepriseObject:EntrepriseModel=new EntrepriseModel();//pas utilisable maintenant apres inchallah hhhhh

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase,
              public userService:UserService) {

    this.entrepriseList=db.object('/entreprise');
    this.entrepriseList.snapshotChanges().subscribe(action=>{
     // let y=action.payload.toJSON();
      //y['key']=action.key;
      this.itemArray.push(action.payload.val() as EntrepriseModel);
      // pour savoir la methode entries il faut ajouter au tsconfig.json dans lib"es2017.object","es2016.array.include"
      this.myObject=Object.entries(this.itemArray[0]);
    });



    this.ensaisteList=db.object('/ensaiste');
    this.ensaisteList.snapshotChanges().subscribe(action=>{
     // let y=action.payload.toJSON();
      //y['key']=action.key;
      this.itemArrayEnsaiste.push(action.payload.val() as EnsaisteModel);

      // pour savoir la methode entries il faut ajouter au tsconfig.json dans lib"es2017.object","es2016.array.include"
      this.myObjectEnsaiste=Object.entries(this.itemArrayEnsaiste[0]);
    });


    //get objet spesefic pas utilisable dans cette class maintenant apres inchallah

     /*var x=db.object('/entreprise/'+firebase.auth().currentUser.uid);
     x.snapshotChanges().subscribe(item=>{
      let e = item.payload.toJSON();
       e['key']=item.key;
       this.entrepriseObject=e as EntrepriseModel;
       console.log(this.entrepriseObject.photo);
       console.log(this.entrepriseObject.email);
    });
*/


  }
  enregistrerCandidat(id1:string){
    const userId=firebase.auth().currentUser.uid;
    const itemRef = this.db.object('/entreprise/'+userId+'/zz_candidats_enregistree/'+id1);
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
}

