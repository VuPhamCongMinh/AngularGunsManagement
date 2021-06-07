import { GunService } from './../services/gun-service.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Gun } from '../models/gun';

@Component({
  selector: 'app-gunform',
  templateUrl: './gunform.component.html',
  styles: [],
})
export class GunFormComponent implements OnInit {
  isDisplay: Boolean = false;
  imageUrl: string = '';

  gunForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<GunFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Gun,
    public gunService: GunService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.mapToForm(this.data);
    }
  }

  onSubmit(form: FormGroup): void {
    if (this.imageUrl) {
      this.gunService.postGun(form.value);
      form.reset();
      this.dialogRef.close();
    } else {
      alert('Súng gì mà ko có hình vậy ba');
    }
  }

  onCategoryChange(event: Event) {
    const element = event.currentTarget as HTMLSelectElement;
    if (element) {
      this.gunForm.patchValue({
        category: element.value,
      });
    }
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList !== null && fileList?.length != 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(fileList[0]);
      this.gunForm.patchValue({
        image: fileList[0],
      });
    }
  }

  mapToForm(existGun: Gun): void {
    const { id, name, price, description, category, imagePath } = existGun;
    this.imageUrl = imagePath!;
    this.gunForm.patchValue({
      id,
      name,
      price,
      description,
      category,
      image: this.imageUrl,
    });
  }
}
