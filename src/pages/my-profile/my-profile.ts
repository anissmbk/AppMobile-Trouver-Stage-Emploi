import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {UserService} from "../../services/user.service";
import {ModifyProfileEnsaistePage} from "../modify-profile-ensaiste/modify-profile-ensaiste";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {EntrepriseProfilePage} from "../entreprise-profile/entreprise-profile";
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  id:string;
  ensaisteUser:EnsaisteModel;
  ensaisteId:string;
  entrepriseDisplayName:string;
  recommandationsList:AngularFireObject<any>;
  itemArray=[];
  myObject= [];
  private FormationList: AngularFireObject<any>;
  itemArray1 = [];
  myObject1 = [];

  private experienceList: AngularFireObject<any>;
  itemArray2 = [];
  myObject2 = [];
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,
              public userser:UserService, public db: AngularFireDatabase) {
    this.FormationList = this.db.object('/ensaiste/' + firebase.auth().currentUser.uid + '/formation/');
    this.experienceList = this.db.object('/ensaiste/' + firebase.auth().currentUser.uid + '/experience/');

    this.FormationList.snapshotChanges().subscribe(action => {

      this.itemArray1.push(action.payload.val());
      if (this.itemArray1[0] != null) {
        this.myObject1 = Object.entries(this.itemArray1[0]);
      }

    });

    this.experienceList.snapshotChanges().subscribe(action => {

      this.itemArray2.push(action.payload.val());
      if (this.itemArray2[0] != null) {
        this.myObject2 = Object.entries(this.itemArray2[0]);
      }


    });
    this.entrepriseDisplayName=this.userser.getCurrentUser().displayName;
    this.id=this.navParams.data;
    this.ensaisteId=this.userser.getCurrentUser().uid;
    if(typeof this.id === "object"){
      this.ensaisteUser=this.userser.getEnsaiste();
      this.id='true';
      this.recommandationsList=this.db.object('/ensaiste/'+this.ensaisteId+'/zz_recommandations');
    }else {
      this.ensaisteUser=this.userser.getEnsaisteById(this.id);
      this.recommandationsList=this.db.object('/ensaiste/'+this.id+'/zz_recommandations');
    }

    this.recommandationsList.snapshotChanges().subscribe(action => {

      this.itemArray.push(action.payload.val() as {id_entreprise:string,recommandation_text:string});

      if(this.itemArray[0]!=null){
        this.myObject = Object.entries(this.itemArray[0]);
      }

      for (let recommandation of this.myObject) {
        var x = this.userser.getEntrepriseById(recommandation[1]['id_entreprise']);
        recommandation.push(x as EntrepriseModel);
      }

    });
  }
  change(){
    this.navCtrl.push(ModifyProfileEnsaistePage);
  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  recommanderEnsaiste(){
    const prompt = this.alertCtrl.create({
      title: 'Rédiger une recommandation à '+this.ensaisteUser.firstName,
      message: "Cette recommandation s’affichera sur le profil de"+this.ensaisteUser.firstName+" "+this.ensaisteUser.lastName+".",
      inputs: [
        {
          name: 'recommandation_text',
          type:'textarea',
          placeholder: 'Rédigez votre recommandation ici ...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            if(data.recommandation_text!=''){
              console.log(this.id);
              this.userser.sendRecommandation(this.id,data.recommandation_text);
              this.alert('recommandation bien envoyé!!')
            }
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  consulterEntreprise(id:string){
    this.navCtrl.push(EntrepriseProfilePage,id);
  }

  deleteRecommandation(id:string){
    const confirm = this.alertCtrl.create({
      title: 'Voulez-vous vraiment supprimer cette recommandation?',
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
            const itemRef = this.db.object('/ensaiste/'+this.ensaisteId+'/zz_recommandations/'+id);
            itemRef.remove();
            this.alert("bien supprimee");
          }
        }
      ]
    });
    confirm.present();
  }
  supprimer(idformation:string){
    const userId = firebase.auth().currentUser.uid;
    const itemRef1 = this.db.object('/ensaiste/' + userId + '/formation/' + idformation);
    itemRef1.remove();
  }

  supprimerexp(idexperience:string){
    const userId = firebase.auth().currentUser.uid;
    const itemRef1 = this.db.object('/ensaiste/' + userId + '/experience/' + idexperience);
    itemRef1.remove();
  }

  afficherDateFormat(date:string):string{
    var date1=new Date(date);
    var annee1 = date1.getFullYear();
    var mois1 = ("0" + (date1.getMonth() + 1)).slice(-2);
    var jour1 = ("0" + (date1.getDate())).slice(-2);
    return  jour1 + '/' + mois1 + '/' + annee1;
  }
}
