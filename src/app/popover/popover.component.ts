import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  storage = firebase.storage().ref();
  db = firebase.firestore();

  suite = {
    Price: '',
    Type: '',
    Description: '',
    Name: '',
    docname: '',
    features: [],
    Bed: '',
    Bathroom: '',
    Image: '',
  }

  profileImage: string;
  constructor( public loadingCtrl: LoadingController) { }

  ngOnInit() {}

 //adding a pic and saving new room to database
 async changeListener(pic) {
  console.log('Image data: ', pic);
  const add = pic.target.files[0]
  const images = this.storage.child(add.name)
  let upload = images.put(add);

  upload.on('state_changed', snapshot => {
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('suite Picture', progress);

  }, err => {

  }, () => {
    upload.snapshot.ref.getDownloadURL().then(async downURL => {
      console.log('File available at: ', downURL);
      this.suite.Image = downURL

      let load = await this.loadingCtrl.create({

      });
      load.present();

      this.db.collection("hotel").doc('aDJnBKRlpH482p3HwMlM').collection("rooms").doc(this.suite.Name).set(this.suite).then(() => {

      });
      load.dismiss();
    })
  })
}

}
