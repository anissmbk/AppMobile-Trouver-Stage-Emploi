import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {UserService} from "../../services/user.service";
import * as firebase from 'firebase/app';
import {EntrepriseProfilePage} from "../entreprise-profile/entreprise-profile";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";

@IonicPage()
@Component({
  selector: 'page-entreprise-enregistree',
  templateUrl: 'entreprise-enregistree.html',
})
export class EntrepriseEnregistreePage {
  searchName:string;
  id:string;
  entrepriseEnregistreesList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  isSearch:boolean=false;
  searchTab=[];
  constructor(private alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {
    this.id=this.navParams.data;
    this.entrepriseEnregistreesList=this.db.object('/ensaiste/'+firebase.auth().currentUser.uid+'/zz_entreprise_enregistree');
    this.entrepriseEnregistreesList.snapshotChanges().subscribe(action => {

      this.itemArray.push(action.payload.val() as {id:string});
      // pour savoir la methode entries il faut ajouter au tsconfig.json dans lib"es2017.object","es2016.array.include"
      //had if mohima dans le cas ila makan ta commentaire
      if(this.itemArray[0]!=null){
        this.myObject = Object.entries(this.itemArray[0]);
      }

      for (let entreprise of this.myObject) {
        var x = this.userService.getEntrepriseById(entreprise[1]['id']);
        entreprise.push(x as EntrepriseModel);
      }
      console.log(this.myObject);
    });
  }

  removeEntrepriseEnregistre(id1:string){
    const confirm = this.alertCtrl.create({
      title: 'Voulez-vous vraiment supprimer cette entreprise ?',
      buttons: [
        {
          text: 'Non',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            const userId=firebase.auth().currentUser.uid;
            const itemRef = this.db.object('/ensaiste/'+userId+'/zz_entreprise_enregistree/'+id1);
            itemRef.remove();
            // fixer le prbleme il faut cliquer deux fois !!!
            /*    var a=document.getElementById(id1) as HTMLDivElement;
                a.remove();*/
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            this.alert("bien supprimee");
          }
        }
      ]
    });
    confirm.present();
  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  entrepriseDetails(id:string){
    this.navCtrl.push(EntrepriseProfilePage,id);
  }

  chercherEntrepriseEnregistree(ev: any){
    this.searchTab=[];
    var val = ev.target.value;
    this.searchName=val;
    if ( typeof val === "undefined" || val.trim() == '') {
      this.isSearch=false;
    }
    else if (val && val.trim() !== '') {
      this.searchTab = this.myObject.filter(function(item) {
        let motInverse=item[2]['entrepriseName'].split(' ').reverse().join(' ');
        return item[2]['entrepriseName'].toLowerCase().includes(val.toLowerCase())
          || motInverse.toLowerCase().includes(val.toLowerCase()) ;
      });
      this.isSearch=true;
    }
  }

}
