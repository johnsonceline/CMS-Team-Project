import { Component, OnInit } from '@angular/core';
import { InformationService } from '../information.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
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
  uid;

  features: any = ['Wifi','24 Hour Room Service','Breakfast','Mini Bar','Tea/Coffee','Satellite TV','In-Room Safe']
  roomType: any = ['Double','Single','Family']
  beds: any = ['1 bed','2 beds','3 beds']
  baths: any = ['1 bath','2 baths','3 baths']

  constructor(private router: Router, public loadingCtrl: LoadingController, private infoProvider: InformationService) { }

  ngOnInit() {

    this.uid = firebase.auth().onAuthStateChanged(res => {
      this.uid = res.uid;
    
    })

  }

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
