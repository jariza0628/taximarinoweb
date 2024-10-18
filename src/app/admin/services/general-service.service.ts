import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class GeneralServiceService {
  constructor(private firestore: AngularFirestore) {}

  getFirebase(entiti) {
    return this.firestore.collection(entiti).snapshotChanges();
  }

  createFirebase(entiti, data: any) {
    delete data.id;
    return this.firestore.collection(entiti).add(data);
  }

  deleteFirebase(entiti, id: string) {
    this.firestore.doc(entiti + "/" + id).delete();
  }

  /**
   * @param entiti entidad
   * @param data id
   */
  updateFirebase(entiti, data: any) {
    this.firestore.doc(entiti + "/" + data.id).update(data);
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
    if (data2 !== "" && data2 && col2 !== "" && data3 !== "" && data3) {
      console.log("entro 0");
      return this.firestore
        .collection(entiti, (ref) =>
          ref
            .where(col, "==", data)
            .where(col2, "==", data2)
            .where(col3, "==", data3)
        )
        .snapshotChanges();
    }

    if (data2 !== "" && data2 && col2 !== "") {
      console.log("entro 1");
      return this.firestore
        .collection(entiti, (ref) =>
          ref.where(col, "==", data).where(col2, "==", data2)
        )
        .snapshotChanges();
    }
    if (col !== "" && data !== "") {
      console.log("entro 2");

      return this.firestore
        .collection(entiti, (ref) => ref.where(col, "==", data))
        .snapshotChanges();
    }
  }

  getSalesByDateAndSeller(entiti, data, data2) {
    return this.firestore
      .collection(entiti, (ref) =>
        ref.where("seller", "==", data).where("date", "==", data2)
      )
      .snapshotChanges();
  }

  getSalesByDateAndComision(entiti, data, data2, data3) {
    return this.firestore
      .collection(entiti, (ref) =>
        ref.where("comisionista", "==", data).where("date", ">=", data2).where("date", "<=", data3)
      )
      .snapshotChanges();
  }
  getSalesByDateAndComisionGeneral(entiti, data, data2, data3) {
    //.where("date", ">=", data).where("date", "<=", data2)
    return this.firestore
      .collection(entiti, (ref) =>
        ref.where("date", ">=", data2).where("date", "<=", data3)
      )
      .snapshotChanges();
  }

  
  getSalesByDateRange(entiti, data, data2) {
    return this.firestore
      .collection(entiti, (ref) =>
        ref.where("date", ">=", data).where("date", "<=", data2)
      )
      .snapshotChanges();
  }

  getSalesByDateRangeAndUsaed(entiti, data, data2) {
    return this.firestore
      .collection(entiti, (ref) =>
        ref.where("date", ">=", data).where("date", "<=", data2)
      )
      .snapshotChanges();
  }

  getSalesBydate(entiti, data: string) {
    return this.firestore
      .collection(entiti, (ref) => ref.where("date", "==", data))
      .snapshotChanges();
  }
  getSalesBydateOficina(entiti, data: string) {
    return this.firestore
      .collection(entiti, (ref) => ref.where("date", ">=", data))
      .snapshotChanges();
  }
  getSalesBydaCodeBar(entiti, code: string) {
    console.log("service", code);

    return this.firestore
      .collection(entiti, (ref) => ref.where("codebar", "==", code))
      .snapshotChanges();
  }

  getSaleByIdGenerated(entiti?, col?, data?) {
    return this.firestore
      .collection(entiti, (ref) => ref.where(col, "==", data))
      .snapshotChanges();
  }

  //Vendeores
  getSeller() {
    return this.firestore
      .collection("users", (ref) => ref.where("type", "==", "Vendedor"))
      .snapshotChanges();
  }

  getSellerByCuenta(emailCunta: string) {
    return this.firestore
      .collection("users", (ref) => ref.where("cuentaFinaciera", "==", emailCunta))
      .snapshotChanges();
  }

  getLastFactura(entity: string): Observable<number | null> {
    return this.firestore.collection(entity, ref => 
      ref.orderBy('timeStamp', 'desc').limit(1)
    ).get().pipe(
      map(snapshot => {
        const docs = snapshot.docs;
        if (docs.length > 0) {
          const docData = docs[0].data();
          const consecutivo = docData.consecutivo;
          console.log('Último consecutivo:', consecutivo);
          return consecutivo as number;
        }
        console.log('No se encontró ningún consecutivo.');
        return null;
      })
    );
  }
  getDateNow() {
    const dates = new Date();
    let dateString, hour;
    dateString =
      dates.getFullYear() +
      "-" +
      this.appendLeadingZeroes(dates.getMonth() + 1) +
      "-" +
      this.appendLeadingZeroes(dates.getDate());
    hour =
      dates.getHours() + ":" + dates.getMinutes() + ":" + dates.getSeconds();
      return {
        date: dateString,
        hour: hour
      }
  }
  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }
}
