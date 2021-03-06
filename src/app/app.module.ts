import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {EnsaistePage} from "../pages/ensaiste/ensaiste";
import {AnnoncePage} from "../pages/annonce/annonce";
import {UsersPage} from "../pages/users/users";
import {DiscussionPage} from "../pages/discussion/discussion";
import {MesAnnoncesPage} from "../pages/mes-annonces/mes-annonces";
import {TabsPage} from "../pages/tabs/tabs";
import {MyProfilePage} from "../pages/my-profile/my-profile";
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import {EntreprisePage} from "../pages/entreprise/entreprise";
import {ModifyProfileEnsaistePage} from "../pages/modify-profile-ensaiste/modify-profile-ensaiste";
import {CandidatsEnregistresPage} from "../pages/candidats-enregistres/candidats-enregistres";
import {ModifyProfileEntreprisePage} from "../pages/modify-profile-entreprise/modify-profile-entreprise";
import {EntrepriseProfilePage} from "../pages/entreprise-profile/entreprise-profile";
import {PosterAnnocePage} from "../pages/poster-annoce/poster-annoce";
import {TabsEntreprisePage} from "../pages/tabs-entreprise/tabs-entreprise";
import { AngularFireStorageModule } from '@angular/fire/storage';
import {AnnonceDetailPage} from "../pages/annonce-detail/annonce-detail";
import {EntrepriseEnregistreePage} from "../pages/entreprise-enregistree/entreprise-enregistree";
import {FormAnnonceStagePage} from "../pages/form-annonce-stage/form-annonce-stage";
import {FormAnnonceEmploiPage} from "../pages/form-annonce-emploi/form-annonce-emploi";
import {AnnonceEmploiDetailsPage} from "../pages/annonce-emploi-details/annonce-emploi-details";
import {MesNotificationsPage} from "../pages/mes-notifications/mes-notifications";

//local storage pour notre app
import { IonicStorageModule } from '@ionic/storage';
import {SujetDetailsPage} from "../pages/sujet-details/sujet-details";

const firebase= {
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    EnsaistePage,
    AnnoncePage,
    UsersPage,
    DiscussionPage,
    MesAnnoncesPage,
    TabsPage,
    MyProfilePage,
    ModifyProfileEnsaistePage,
    EntreprisePage,
    CandidatsEnregistresPage,
    ModifyProfileEntreprisePage,
    EntrepriseProfilePage,
    PosterAnnocePage,
    TabsEntreprisePage,
    AnnonceDetailPage,
    EntrepriseEnregistreePage,
    FormAnnonceStagePage,
    FormAnnonceEmploiPage,
    AnnonceEmploiDetailsPage,
    MesNotificationsPage,
    SujetDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,// imports firebase/auth, only needed for auth features
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    EnsaistePage,
    AnnoncePage,
    UsersPage,
    DiscussionPage,
    MesAnnoncesPage,
    TabsPage,
    MyProfilePage,
    ModifyProfileEnsaistePage,
    EntreprisePage,
    CandidatsEnregistresPage,
    ModifyProfileEntreprisePage,
    EntrepriseProfilePage,
    PosterAnnocePage,
    TabsEntreprisePage,
    AnnonceDetailPage,
    EntrepriseEnregistreePage,
    FormAnnonceStagePage,
    FormAnnonceEmploiPage,
    AnnonceEmploiDetailsPage,
    MesNotificationsPage,
    SujetDetailsPage
  ],
  providers: [
    AngularFireDatabase,//a voir
    StatusBar,
    SplashScreen,
    AuthService,//huum
    UserService,//huum
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
