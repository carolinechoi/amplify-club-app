import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Firebase imports
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';

// Model import
import { Event } from '../../models/event.interface';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  event = {} as Event;
  newEventRef$: AngularFireList<Event>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private route: Router
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

  addEvent(event: Event) {
      this.newEventRef$ = this.db.list('/events');
      this.newEventRef$.push({
        title: this.event.title,
        description: this.event.description,
        date: this.event.date,
        location: this.event.location,
        points: this.event.points,
        link: this.event.link
      });
      console.log('pushed');
      this.route.navigateByUrl('/tabs/tab2');
}

}
