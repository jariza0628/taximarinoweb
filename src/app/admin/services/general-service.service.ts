import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  constructor(private firestore: AngularFirestore) {
  }

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

  getById(entiti, id) {
    return this.firestore.collection(entiti).doc(id).ref.get();
  }

  /**
   *
   * @param entiti
   * @param col
   * @param data
   */
  getSaleBydate(entiti, col, data, col2?, data2?, col3?, data3?) {
    if (data2 !== '' && data2 && col2 !== '' && data3 !== '' && data3) {
      console.log('entro 0');
      return this.firestore.collection(entiti, ref => ref.where(col, '==', data).where(col2, '==', data2).where(col3, '==', data3)).snapshotChanges();

    }

    if (data2 !== '' && data2 && col2 !== '') {
      console.log('entro 1');
      return this.firestore.collection(entiti, ref => ref.where(col, '==', data).where(col2, '==', data2)).snapshotChanges();
    }
    if (col !== '' && data !== '') {
      console.log('entro 2');

      return this.firestore.collection(entiti, ref => ref.where(col, '==', data)).snapshotChanges();
    }


  }

  getSalesByDateAndSeller(entiti, data, data2) {
    return this.firestore.collection(entiti, ref => ref.where('seller', '==', data).where('date', '==', data2)).snapshotChanges();

  }

  getSalesBydate(entiti, data: string) {
    return this.firestore.collection(entiti, ref => ref.where('date', '==', data)).snapshotChanges();
  }

  getSaleByIdGenerated(entiti?, col?, data?) {
    return this.firestore.collection(entiti, ref => ref.where(col, '==', data)).snapshotChanges();
  }

}
