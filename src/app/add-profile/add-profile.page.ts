import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

// firebase imports
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { User } from '../../models/user.interface';

// Observable
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.page.html',
  styleUrls: ['./add-profile.page.scss'],
})
export class AddProfilePage implements OnInit {
  ID: string;
  user = {} as User;
  userRef: AngularFireList<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: Router,
    public toast: ToastController,
    private db: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe((data => {
      this.ID = data.uid;
      this.userRef = this.db.list('/users/');
    }));
  }

  ngOnInit() {
  }

  async makeProfile(user: User) {
    try {
      const result = await this.userRef.push({
        ID: this.ID,
        name: this.user.name,
        points: 0,
        pointsN: 0,
        grade: this.user.grade,
        admin: false
      }
      );
      if (result) {
          this.route.navigateByUrl('/tabs/tab3');
      }
    } catch (e) {
      const toastie = await this.toast.create({
        message: 'Fill in all areas with valid responses.',
        duration: 3000
      });
      return await toastie.present();
    }
  }

}
