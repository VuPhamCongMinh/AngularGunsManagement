import { Gun, GunCreateModel } from './../models/gun';
import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { finalize, find, map } from 'rxjs/operators';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class GunService {
  guns: Gun[] = [];
  categories: Category[] = [];
  constructor(
    private angularFireStore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {
    angularFireStore
      .collection<Gun>('guns')
      .valueChanges({ idField: 'id' })
      .subscribe((x) => (this.guns = x));
    angularFireStore
      .collection<Category>('categories')
      .valueChanges()
      .subscribe((x) => (this.categories = x));
  }

  getGunById(gunId: string): Gun | undefined {
    return this.guns.find((x) => x.id === gunId);
  }

  postGun(gunCreateModel: GunCreateModel): void {
    const gunToBeAdd: Gun = {
      id: this.angularFireStore.createId(),
      name: gunCreateModel.name,
      price: gunCreateModel.price,
      description: gunCreateModel.description,
      category: gunCreateModel.category,
      imagePath: '',
    };

    console.log(gunCreateModel.image);
    // const fileRef = this.angularFireStorage.ref(gunCreateModel.image.name);
    // const uploadTask = this.angularFireStorage.upload(
    //   gunCreateModel.image.name,
    //   gunCreateModel.image
    // );
    // uploadTask.snapshotChanges().pipe(
    //   finalize(() =>
    //     fileRef.getDownloadURL().subscribe((imgUrl) => {
    //       gunToBeAdd.imagePath = imgUrl;
    //     })
    //   )
    // );

    // this.angularFireStore
    //   .collection<Gun>('guns')
    //   .doc(gunToBeAdd.id)
    //   .set(gunToBeAdd);
  }
}
