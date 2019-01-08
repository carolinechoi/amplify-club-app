import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private router: Router,
    private toast: ToastController,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(data => {
      const userRef = firebase.database().ref('users/');
      const refUser = userRef.orderByChild('ID').equalTo(data.uid);
      refUser.once('value').then(function(snap2) {
        snap2.forEach(function (childSnap2) {
          const admin = childSnap2.child('admin').val();
          const name = childSnap2.child('name').val();
          console.log(name + ': ' + admin);
          if (admin === false) {
            this.route.navigateByUrl('tabs/tab1');
            console.log('Not admin');
          }
        });
      });
    });
  }

  ngOnInit() {
  }

  async tryCode(code: string) {
      if (code === 'admin>restofAmplify') {
        this.router.navigateByUrl('/add-event');
        const toastie = await this.toast.create({
          message: `Welcome admin!`,
          duration: 3000
        });
        toastie.present();
      } else {
        const toastie = await this.toast.create({
          message: 'Nope. Please enter a valid code.',
          duration: 2000
        });
        toastie.present();
    }
  }

}
