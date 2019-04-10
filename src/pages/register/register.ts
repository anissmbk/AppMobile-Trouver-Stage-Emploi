import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerFormEnsaiste: FormGroup;
  registerFormEntreprise: FormGroup;
  pet: any;
  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService,
              private fb: FormBuilder
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
   /* this.authService.doRegister(value)
      .then(res => {
        this.alert('Success! Your account has been created');
      }, err => {
        this.alert(err.message);
      });*/
   console.log("swaa7 email :"+this.registerFormEnsaiste.value.email);
    console.log("heloo pass :"+this.registerFormEnsaiste.value.password);
  }


  tryRegisterEntreprise(value){
    console.log("swaa7 email :"+this.registerFormEntreprise.value.email);
    console.log("heloo pass :"+this.registerFormEntreprise.value.password);
  }
}
