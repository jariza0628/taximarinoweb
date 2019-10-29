import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  constructor(private firestore: AngularFirestore) { }

  getFirebase(entiti) {
    return this.firestore.collection(entiti).snapshotChanges();
  }

  createFirebase(entiti, data: any) {
    delete data.id;
    return this.firestore.collection(entiti).add(data);
  }
  deleteFirebase(entiti, id: string) {
    this.firestore.doc(entiti + '/' + id).delete();
  }
  /**
   * @param entiti entidad
   * @param data id
   */
  updateFirebase(entiti, data: any) {
    this.firestore.doc(entiti + '/' + data.id).update(data);
  }
}
