import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'firebase/app';
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {EnsaistePage} from "../ensaiste/ensaiste";

class FormationModel {
  date_debut:string;
  date_fin:string;
  filiere:string;
  ecole:string;
  constructor(){}

}
@IonicPage()
@Component({
  selector: 'page-modify-profile-ensaiste',
  templateUrl: 'modify-profile-ensaiste.html',

})

export class ModifyProfileEnsaistePage {

  @ViewChild(Content) content: Content;

  ensaisteProfile: EnsaisteModel = new EnsaisteModel();
  public formation: {
    filiere:string;
    date_debut: string;
    ecole: string;
    date_fin:string };

  public experience: {
    date_fin:string;
    date_debut: string;
    ecole: string;
    type:string,
    mission:string};

  private FormationList: AngularFireObject<any>;
  itemArray = [];
  myObject = [];

  private experienceList: AngularFireObject<any>;
  itemArray2 = [];
  myObject2 = [];

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserService,
              public db: AngularFireDatabase
  ) {
    this.FormationList = this.db.object('/ensaiste/' + firebase.auth().currentUser.uid + '/formation/');
    this.experienceList = this.db.object('/ensaiste/' + firebase.auth().currentUser.uid + '/experience/');

    this.FormationList.snapshotChanges().subscribe(action => {

      this.itemArray.push(action.payload.val() as FormationModel);
      if (this.itemArray[0] != null) {
        this.myObject = Object.entries(this.itemArray[0]);
      }

    });

    this.experienceList.snapshotChanges().subscribe(action => {

      this.itemArray2.push(action.payload.val());
      if (this.itemArray2[0] != null) {
        this.myObject2 = Object.entries(this.itemArray2[0]);
      }

    });
    var x = db.object('/ensaiste/' + firebase.auth().currentUser.uid);
    x.snapshotChanges().subscribe(item => {
      var e = item.payload.toJSON();
      this.ensaisteProfile = e as EnsaisteModel;
    });
  }


  upload(event) {
    const id = Math.random().toString(36).substring(2);
    var storageRef = firebase.storage().ref();
    var task = storageRef.child(id).put(event.target.files[0]);
    task.on('state_changed', function (snapshot) {
    }, function (error) {
    }, function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        var img = document.getElementById('myimg') as HTMLImageElement;
        img.src = downloadURL;
        this.ensaisteProfile.photo = downloadURL;
        this.refrecherPage(this.ensaisteProfile.photo)
      }.bind(this));
    }.bind(this));
  }

  refrecherPage(image: string) {
    this.ensaisteProfile.photo = image;
    this.userService.updateEnsaiste(this.ensaisteProfile);

    this.FormationList.snapshotChanges().subscribe(action => {

      this.itemArray.push(action.payload.val() as FormationModel);
      if (this.itemArray[0] != null) {
        this.myObject = Object.entries(this.itemArray[0]);
      }
    });
  }

  modifier(value) {
    if (value.prenom) this.ensaisteProfile.firstName = value.prenom;
    if (value.nom) this.ensaisteProfile.lastName = value.nom;
    if (value.formation) this.ensaisteProfile.formation = value.formation;
    if (value.ville) this.ensaisteProfile.city = value.ville;
    if (value.email) this.ensaisteProfile.email = value.email;
    if (value.datedenaissance) this.ensaisteProfile.date_naissance = value.datedenaissance;
    if (value.tel) this.ensaisteProfile.phone = value.tel;
    this.userService.updateEnsaiste(this.ensaisteProfile);
    const user = this.userService.getCurrentUser();
    if (user.displayName === "ensaiste1") {
      this.userService.updateCurrentBasicProfile('ensaiste');
      this.navCtrl.setRoot(EnsaistePage);
    }
  }


  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
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
  Ajouterformation(value) {
    if (value.date_debut != '' && value.date_fin != '' && value.ecole != '' && value.filiere != '') {
      const userId = firebase.auth().currentUser.uid;

      console.log(value.a_partir_de);
      var date_debut = new Date(value.date_debut);
      var date_fin = new Date(value.date_fin);
      if (date_debut.getTime() > date_fin.getTime()) {
        this.alert("la date de debut de formation doit etre inferieur a la date de fin");
      } else {
        this.formation = {
          date_debut: value.date_debut,
          date_fin: value.date_fin,
          ecole: value.ecole,
          filiere: value.filiere
        };
        const idformation = Math.random().toString(36).substring(2);
        const itemRef1 = this.db.object('/ensaiste/' + userId + '/formation/' + idformation);
        itemRef1.set(this.formation);
        console.log(this.formation.ecole)
        this.alert("bien poster");
      }
    } else {
      this.alert("il faut remplir touts les champs !");
    }
  }



  Ajouterexperience(value) {
    if (value.date_debut != '' && value.date_fin != '' && value.ecole != '' && value.filiere != '') {
      const userId = firebase.auth().currentUser.uid;

      console.log(value.a_partir_de);
      var date_debut = new Date(value.date_debut);
      var date_fin = new Date(value.date_fin);
      if (date_debut.getTime() > date_fin.getTime()) {
        this.alert("la date de debut de formation doit etre inferieur a la date de fin");
      } else {
        this.experience = {
          date_debut: value.date_debut,
          date_fin: value.date_fin,
          ecole: value.ecole,
          type: value.type,
          mission:value.mission
        };
        const idexperience = Math.random().toString(36).substring(2);
        const itemRef1 = this.db.object('/ensaiste/' + userId + '/experience/' + idexperience);
        itemRef1.set(this.experience);
        this.alert("experience ajouter");
      }
    } else {
      this.alert("il faut remplir touts les champs !");
    }
  }
  afficherDateFormat(date:string):string{
    var date1=new Date(date);
    var annee1 = date1.getFullYear();
    var mois1 = ("0" + (date1.getMonth() + 1)).slice(-2);
    var jour1 = ("0" + (date1.getDate())).slice(-2);
    return  jour1 + '/' + mois1 + '/' + annee1;
  }
}
