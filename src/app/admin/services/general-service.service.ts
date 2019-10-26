import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  constructor(private firestore: AngularFirestore) { }

  getFirebase(entiti) {
    return this.firestore.collection(entiti).snapshotChanges();
  }

  createFirebase(entiti, data: any) {
    return this.firestore.collection(entiti).add(data);
  }
}
