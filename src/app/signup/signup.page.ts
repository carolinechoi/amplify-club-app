import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// firebase imports
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController } from '@ionic/angular';

import { User } from '../../models/login.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user = {} as User;

  constructor(
    private afAuth: AngularFireAuth,
    private route: Router,
    public toast: ToastController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async signup(user: User) {
    const loading = await this.loadingController.create({
      keyboardClose: true,
      spinner: 'dots'
    });
    await loading.present();
    console.log('starting auth');
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      if (result) {
          loading.dismiss();
          this.route.navigateByUrl('/add-profile');
      }
    } catch (e) {
      loading.dismiss();
      const toastie = await this.toast.create ({
        message: 'Sorry, try again.',
        duration: 3000
      });
      return await toastie.present();
    }
  }

}
