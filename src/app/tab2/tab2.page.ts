import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

// Observable
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  admin$: boolean;
  eventRef: Observable<any[]>;

  constructor(
    private route: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    public loadingController: LoadingController
  ) {
    this.enter();
  }

  async enter() {
    const loading = await this.loadingController.create({
      keyboardClose: true,
      spinner: 'dots'
    });
    await loading.present();
    const self = this;
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
      } else {
        loading.dismiss();
        this.route.navigateByUrl('/login');
       }
    });
    this.eventRef = this.db.list('/events/').valueChanges();
    this.afAuth.authState.subscribe(data => {
      const userRef = firebase.database().ref('users/');
      const refUser = userRef.orderByChild('ID').equalTo(data.uid);
      refUser.once('value').then(function(snap2) {
        snap2.forEach(function (childSnap2) {
          self.admin$ = childSnap2.child('admin').val();
        });
      });
      loading.dismiss();
    });
  }

  presentModal() {
    this.route.navigateByUrl('landing');
  }

  itemTapped(event, $title, $date) {
    const title = $title;
    const date = $date;
    // That's right, we're pushing to ourselves!
    console.log(title + date);
    this.route.navigate(['/event', title, date]);
  }

}

