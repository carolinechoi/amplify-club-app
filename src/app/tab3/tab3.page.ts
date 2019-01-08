import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Firebase imports
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

// Observables
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  name: string;
  grade: number;
  points: number;
  current: Array<{name: string, grade: number, points: number}> = [];
  currentUser: string;

  constructor (
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private route: Router,
    public alert: AlertController,
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
    await firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
      } else {
        loading.dismiss();
        this.route.navigateByUrl('/login');
       }
    });
    await this.afAuth.authState.subscribe(data => {
      this.currentUser = data.uid;
      const self = this;
      const userRef = firebase.database().ref('users/');
      const refUser = userRef.orderByChild('ID').equalTo(this.currentUser);
      refUser.once('value').then(function(snap2) {
        snap2.forEach(function (childSnap2) {
          const points = childSnap2.child('points').val();
          const grade = childSnap2.child('grade').val();
          const name = childSnap2.child('name').val();
          console.log(name + ': ' + points);
          self.current.push({
            name: name,
            grade: grade,
            points: points
          });
        });
      });
    });
    await loading.dismiss();
  }

  async signOut() {
    this.afAuth.auth.signOut();
    this.route.navigateByUrl('/tabs/tab1');
  }

  async remindCode() {
    const alertie = await this.alert.create({
      header: 'Join Our Remind',
      message: 'Text @ahsamplify to 81010',
      translucent: false,
      backdropDismiss: true,
      cssClass: 'remindCode'
    });
    await alertie.present();
  }


  ngOnInit() {
  }

}
