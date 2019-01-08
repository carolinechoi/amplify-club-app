import { Component, OnInit } from '@angular/core';

// firebase imports
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';

// rxjs

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  name: string;
  grade: number;
  points: number;
  empList: Array<{ID: string, name: string, grade: number, points: number}> = [];
  current: Array<{name: string, grade: number, points: number}> = [];
  currentUser: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
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
    const ref = firebase.database().ref('users/');
    const ref2 = ref.orderByChild('pointsN');
    await ref2.once('value').then(function(snap2) {
      snap2.forEach(function (childSnap2) {
        const key = childSnap2.key;
        const points = childSnap2.child('points').val();
        const grade = childSnap2.child('grade').val();
        const name = childSnap2.child('name').val();
        const id = childSnap2.child('ID').val();
        console.log(key + ': ' + points);
        self.empList.push({
          ID: id,
          name: name,
          grade: grade,
          points: points
        });
      });
    });
    await this.afAuth.authState.subscribe(data => {
      this.currentUser = data.uid;
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

  ngOnInit() {
  }

}
