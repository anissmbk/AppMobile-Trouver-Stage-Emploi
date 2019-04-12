import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../home/home";
import {UserService} from "../../services/user.service";
import {EntrepriseModel} from "../../UserClass/entrepriseModel";
import {EnsaisteModel} from "../../UserClass/ensaisteModel";
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from "@angular/fire/database";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerFormEnsaiste: FormGroup;
  registerFormEntreprise: FormGroup;
  pet: any;
  entrepriseUser:EntrepriseModel=new EntrepriseModel();
  ensaisteUser:EnsaisteModel=new EnsaisteModel();

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService,
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
    this.registerFormEnsaiste = this.fb.group({
      email: ['',  [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });

    this.registerFormEntreprise=this.fb.group({
      nomEntreprise: ['', Validators.required ],
      email: ['', [Validators.required,Validators.email]],
      secteurActivite: ['', Validators.required ],
      description: [''],
      tel: ['', [Validators.required,Validators.pattern("[0-9][0-9]*"),Validators.minLength(10)]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }
  tryRegisterEnsaiste(value) {
    this.authService.doRegister(value)
      .then(res => {
        this.alert('Success! Your account has been created');
        this.ensaisteUser.email=value.email;
        this.ensaisteUser.photo='../../assets/imgs/user.jpg';

        //ajout l'objet this.entrepriseUser to firebase
        const userId=firebase.auth().currentUser.uid;
        const itemRef = this.db.object('/ensaiste/'+userId);
        itemRef.set(this.entrepriseUser);

        //set display name
        this.userService.updateCurrentBasicProfile('ensaiste');
        this.navCtrl.setRoot(HomePage);
      }, err => {
        this.alert(err.message);
      });
  }


  tryRegisterEntreprise(value){
    this.authService.doRegister(value)
      .then(res => {
        this.alert('Success! Your account has been created');
        this.entrepriseUser={
          entrepriseName: value.nomEntreprise,
          secteurActivite: value.secteurActivite,
          email: value.email,
          city:  '',
          phone: value.tel,
          photo: '../../assets/imgs/user.jpg',
          description: value.description
        };

        //ajout l'objet this.entrepriseUser to firebase
        const userId=firebase.auth().currentUser.uid;
        const itemRef = this.db.object('/entreprise/'+userId);
        itemRef.set(this.entrepriseUser);

        //set display name
        this.userService.updateCurrentBasicProfile('entreprise');
        this.navCtrl.push(HomePage);
      }, err => {
        this.alert(err.message);
      });
  }

}
