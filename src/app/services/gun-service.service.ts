import { Gun, GunCreateEditModel } from './../models/gun';
import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GunService {
  downloadURL: Observable<string> = of('');
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

  async postGun(gunCreateModel: GunCreateEditModel): Promise<void> {
    const gunToBeAdd: Gun = {
      id: gunCreateModel.id ?? this.angularFireStore.createId(),
      name: gunCreateModel.name,
      price: gunCreateModel.price,
      description: gunCreateModel.description,
      category: gunCreateModel.category,
    };

    if (gunCreateModel.image instanceof File) {
      const fileRef = this.angularFireStorage.ref(gunCreateModel.image.name);
      const uploadTask = this.angularFireStorage.upload(
        gunCreateModel.image.name,
        gunCreateModel.image
      );

      await uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
          })
        )
        .toPromise();
    }
    const imgUrl = await this.downloadURL.toPromise();
    if (imgUrl) {
      gunToBeAdd.imagePath = imgUrl;
    }
    this.saveChange(gunToBeAdd);
  }

  saveChange(gunToBeAdd: Gun) {
    this.angularFireStore
      .collection<Gun>('guns')
      .doc(gunToBeAdd.id)
      .set(gunToBeAdd, { merge: true });
  }
}
