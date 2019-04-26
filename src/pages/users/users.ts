import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase,AngularFireObject} from "@angular/fire/database";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {UserService} from "../../services/user.service";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import * as firebase from 'firebase/app';
import {MyProfilePage} from "../my-profile/my-profile";
import {EntrepriseProfilePage} from "../entreprise-profile/entreprise-profile";

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  searchName:string;
  userDisplayName:string;
  entrepriseList:AngularFireObject<any>;
  ensaisteList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  itemArrayEnsaiste=[];
  myObjectEnsaiste= [];
  entrepriseObject:EntrepriseModel=new EntrepriseModel();//pas utilisable maintenant apres inchallah hhhhh
  isSearch:boolean=false;
  searchTab=[];
  isEnsaisteSearch:boolean=false;
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase,
              public userService:UserService) {
    /*var ref = this.userService.getEnsaisteById("efdnkjb");
    console.log(ref);
    if(ref.email==''){
      console.log("khawya");
    }

    var ref1 = this.userService.getEnsaisteById("-Muh_aSRah7kJewq8C29");
    console.log(ref1);*/
    this.userDisplayName=this.userService.getCurrentUserDisplayName();
    this.entrepriseList=db.object('/entreprise');
    this.entrepriseList.snapshotChanges().subscribe(action=>{
      /*if(ref1.email==''){
        console.log("3amra");
      }else{
        console.log("to");
      }*/
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
  enregistrerEntreprise(id1:string){
    const userId=firebase.auth().currentUser.uid;
    const itemRef = this.db.object('/ensaiste/'+userId+'/zz_entreprise_enregistree/'+id1);
    var a={
      id:id1
    };
    itemRef.set(a);
    this.alert("bien enregistrer");
  }

  consulterEnsaiste(id:string){
    this.navCtrl.push(MyProfilePage,id);
  }

  consulterEntreprise(id:string){
    console.log("id entreprise : "+id);
    this.navCtrl.push(EntrepriseProfilePage,id);
  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  chooseSearch(event){
    var x=event.target.value;
    console.log(x);
    if(x=='Ensaiste'){
      document.getElementById("searchEnsaiste").style.display="block";
      document.getElementById("searchEntreprise").style.display="none";
    }
    else if(x=='Entreprise'){
      document.getElementById("searchEnsaiste").style.display="none";
      document.getElementById("searchEntreprise").style.display="block";
    }
    else{
      document.getElementById("searchEnsaiste").style.display="none";
      document.getElementById("searchEntreprise").style.display="none";
      this.isSearch=false;
    }
    /*var x=(<HTMLInputElement>document.getElementById("mySelect")).value;
    console.log(x)*/
  }
  closefilter(){
    this.isSearch=false;
    document.getElementById("searchEnsaiste").style.display="none";
    document.getElementById("searchEntreprise").style.display="none";
    document.getElementById("mySelect2").getElementsByTagName('option')[0].selected=true;
  }
  chercherEnsaiste(ev: any){
    this.searchTab=[];
    var val = ev.target.value;
    this.searchName=val;
    if ( typeof val === "undefined" || val.trim() == '') {
      this.searchTab = this.myObjectEnsaiste;
    }
    else if (val.trim() !== '') {
      this.searchTab = this.myObjectEnsaiste.filter(function(item) {
        var str=item[1]['firstName']+" "+item[1]['lastName'];
        var str1=item[1]['lastName']+" "+item[1]['firstName'];
        return (str.toLowerCase().includes(val.toLowerCase()))
          ||(str1.toLowerCase().includes(val.toLowerCase()));
      });
    }
    this.isEnsaisteSearch=true;
    this.isSearch=true;
  }
  chercherEntreprise(ev: any){
    this.searchTab=[];
    var val = ev.target.value;
    this.searchName=val;
    if ( typeof val === "undefined" || val.trim() == ''){
      this.searchTab = this.myObject;
    }
     else if (val && val.trim() !== '') {
      this.searchTab = this.myObject.filter(function(item) {
        let motInverse=item[1]['entrepriseName'].split(' ').reverse().join(' ');
        return item[1]['entrepriseName'].toLowerCase().includes(val.toLowerCase())
          || motInverse.toLowerCase().includes(val.toLowerCase());
      });
    }
    this.isEnsaisteSearch=false;
    this.isSearch=true;
  }

}

