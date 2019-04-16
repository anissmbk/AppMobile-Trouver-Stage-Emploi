import { Component } from '@angular/core';
import {AnnoncePage} from "../annonce/annonce";
import {UsersPage} from "../users/users";
import {DiscussionPage} from "../discussion/discussion";
import {MyProfilePage} from "../my-profile/my-profile";
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AnnoncePage;
  tab2Root = UsersPage;
  tab3Root = DiscussionPage;
  tab4Root = MyProfilePage;

  constructor() {

  }
}
