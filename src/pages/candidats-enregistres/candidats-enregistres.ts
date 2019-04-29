import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {UserService} from "../../services/user.service";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {MyProfilePage} from "../my-profile/my-profile";

@IonicPage()
@Component({
  selector: 'page-candidats-enregistres',
  templateUrl: 'candidats-enregistres.html',
})
export class CandidatsEnregistresPage {
  searchName:string;
  id:string;
  candidatsEnregistreesList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  isSearch:boolean=false;
  searchTab=[];
  constructor(private alertCtrl: AlertController,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public userService:UserService) {
    this.id=this.navParams.data;
    this.candidatsEnregistreesList=this.db.object('/entreprise/'+this.userService.getCurrentUser().uid+'/zz_candidats_enregistree');
    this.candidatsEnregistreesList.snapshotChanges().subscribe(action => {

      this.itemArray.push(action.payload.val() as {id:string});
      // pour savoir la methode entries il faut ajouter au tsconfig.json dans lib"es2017.object","es2016.array.include"
      //had if mohima dans le cas ila makan ta commentaire
      if(this.itemArray[0]!=null){
        this.myObject = Object.entries(this.itemArray[0]);
      }

      for (let ensaiste of this.myObject) {
        var x = this.userService.getEnsaisteById(ensaiste[1]['id']);
        ensaiste.push(x as EnsaisteModel);
      }
      console.log(this.myObject);
    });

  }

  removeCandidatEnregistre(id1:string){

    const confirm = this.alertCtrl.create({
      title: 'Voulez-vous vraiment supprimer ce User?',
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
            const userId=this.userService.getCurrentUser().uid;
            const itemRef = this.db.object('/entreprise/'+userId+'/zz_candidats_enregistree/'+id1);
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

  candidatsDetails(id:string){
    this.navCtrl.push(MyProfilePage,id);
  }

  chercherEnsaiste(ev: any){
    this.searchTab=[];
    var val = ev.target.value;
    this.searchName=val;
    if ( typeof val === "undefined" || val.trim() == '') {
      this.isSearch=false;
    }
    else if (val && val.trim() !== '') {
      this.searchTab = this.myObject.filter(function(item) {
        var str=item[2]['firstName']+" "+item[2]['lastName'];
        var str1=item[2]['lastName']+" "+item[2]['firstName'];
        return (str.toLowerCase().includes(val.toLowerCase()))
          ||(str1.toLowerCase().includes(val.toLowerCase()));
      });
      this.isSearch=true;
    }
  }
}
