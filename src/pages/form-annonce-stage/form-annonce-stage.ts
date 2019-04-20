import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {AnnonceStageModel} from "../../AnnonceClass/annonceStageModel";
import * as firebase from 'firebase/app';
import {EntreprisePage} from "../entreprise/entreprise";


@IonicPage()
@Component({
  selector: 'page-form-annonce-stage',
  templateUrl: 'form-annonce-stage.html',
})
export class FormAnnonceStagePage {
  registerFormAnnonce: FormGroup;
  annonceStage:AnnonceStageModel=new AnnonceStageModel();
  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public userService: UserService,
              public db: AngularFireDatabase
  ) {this.createForm();}

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  createForm() {
    this.registerFormAnnonce= this.fb.group({
      titre: ['', Validators.required],
      ville: ['', Validators.required],
      contexte_mission: ['', Validators.required],
      type_stage: ['', Validators.required],
      remuneration: ['', Validators.required],
      categorie: ['', Validators.required],
      duree_stage: ['',  [Validators.required,Validators.pattern("[1-6]")]],
      a_partir_de: ['', Validators.required],
      stagiaire_demande: ['', [Validators.required,Validators.pattern("[0-9][0-9]*")]],
      profil_recherche: ['', Validators.required]
    });

  }
  tryRegisterAnnonce(value) {
    if (value.a_partir_de != '' && value.titre != '' && value.ville != '' && value.contexte_mission != '' &&
      value.categorie != '' && value.profil_recherche != '' && value.type_stage!= '' && value.remuneration != '' &&
      value.duree_stage != '' && value.stagiaire_demande != '') {
      const userId = firebase.auth().currentUser.uid;
      var now = new Date();
      var annee = now.getFullYear();
      var mois = now.getMonth() + 1;
      var jour = now.getDate();
      const dateNow = jour + '/' + mois + '/' + annee;
      console.log(dateNow);
      this.annonceStage = {
        titre: value.titre,
        ville: value.ville,
        contexte_mission: value.contexte_mission,
        type_stage: value.type_stage,
        remuneration: value.remuneration,
        categorie: value.categorie,
        duree_stage: value.duree_stage,
        a_partir_de: value.a_partir_de,
        publiee_le: dateNow,
        stagiaire_demande: value.stagiaire_demande,
        id_entreprise: userId,
        profil_recherche: value.profil_recherche,
        z_commentaires: []
      };
      const idStage = Math.random().toString(36).substring(2);
      const itemRef = this.db.object('/annonceStage/' + idStage);
      itemRef.set(this.annonceStage);
      const itemRef1 = this.db.object('/entreprise/' + userId + '/zz_mes_annonces_stage/' + idStage);
      itemRef1.set({id: idStage});
      this.alert("bien poster");
      this.navCtrl.setRoot(EntreprisePage);
    }
    else{
      this.alert("il faut remplir touts les champs !")
    }
  }

}
