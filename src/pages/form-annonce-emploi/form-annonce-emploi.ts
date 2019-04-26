import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {EntreprisePage} from "../entreprise/entreprise";
import {AnnonceEmploiModel} from "../../AnnonceClass/AnnonceEmploiModel";
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-form-annonce-emploi',
  templateUrl: 'form-annonce-emploi.html',
})
export class FormAnnonceEmploiPage {

  registerFormAnnonce: FormGroup;
  annonceEmploi: AnnonceEmploiModel = new AnnonceEmploiModel();

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public userService: UserService,
              public db: AngularFireDatabase
  ) {
    this.createForm();
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  createForm() {
    this.registerFormAnnonce = this.fb.group({
      titre: ['', Validators.required],
      ville: ['', Validators.required],
      contexte_mission: ['', Validators.required],
      categorie: ['', Validators.required],
      a_partir_de: ['', Validators.required],
      profil_recherche: ['', Validators.required],
      nbr_poste_proposes: ['', [Validators.required, Validators.pattern("[0-9][0-9]*")]],
      type_contrat: ['', Validators.required],
      niveau_experience: ['', Validators.required],
      niveau_etude: ['', Validators.required],
      langues_exigees: ['', Validators.required]
      // poste_propose: ['', Validators.required],
    });

  }

  tryRegisterAnnonce(value) {
    if (value.a_partir_de != '' && value.titre != '' && value.ville != '' && value.contexte_mission != '' &&
      value.categorie != '' && value.profil_recherche != '' && value.nbr_poste_proposes != '' && value.type_contrat != '' &&
      value.niveau_experience != '' && value.niveau_etude != '' && value.langues_exigees != '') {
      const userId = firebase.auth().currentUser.uid;
      var now = new Date();
      var annee = now.getFullYear();
      var mois = ("0" + (now.getMonth() + 1)).slice(-2);
      var jour = ("0" + (now.getDate())).slice(-2);
      const dateNow = annee + '-' + mois + '-' +jour;
      console.log(dateNow);
      console.log(value.a_partir_de);
      var a_partir_de = new Date(value.a_partir_de);
      if (a_partir_de.getTime() < now.getTime()) {
        this.alert("Attention il faut saisir une date superieur de date d'Aujourd'hui !");
        document.getElementById("dateId").style.display = "block";
      } else {
        document.getElementById("dateId").style.display="none";
        this.annonceEmploi = {
          titre: value.titre,
          ville: value.ville,
          contexte_mission: value.contexte_mission,
          categorie: value.categorie,
          a_partir_de: value.a_partir_de,
          profil_recherche: value.profil_recherche,
          nbr_poste_proposes: value.nbr_poste_proposes,
          type_contrat: value.type_contrat,
          publiee_le: dateNow,
          niveau_experience: value.niveau_experience,
          id_entreprise: userId,
          niveau_etude: value.niveau_etude,
          langues_exigees: value.langues_exigees,
          z_commentaires: []
        };
        const idEmploi = Math.random().toString(36).substring(2);
        const itemRef = this.db.object('/annonceEmploi/' + idEmploi);
        itemRef.set(this.annonceEmploi);
        const itemRef1 = this.db.object('/entreprise/' + userId + '/zz_mes_annonces_emploi/' + idEmploi);
        itemRef1.set({id: idEmploi});
        this.alert("bien poster");
        this.navCtrl.setRoot(EntreprisePage);
      }
    } else {
      this.alert("il faut remplir touts les champs !");
    }
  }

}
