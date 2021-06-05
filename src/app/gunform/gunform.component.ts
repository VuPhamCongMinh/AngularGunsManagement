import { GunService } from './../services/gun-service.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Gun } from '../models/gun';

@Component({
  selector: 'app-gunform',
  templateUrl: './gunform.component.html',
  styles: [],
})
export class GunFormComponent implements OnInit {
  gunForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    imagePath: ['', Validators.required],
  });

  isDisplay: Boolean = false;
  imageUrl: string = '';

  constructor(
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
    this.gunService.postGun(form.value);
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
    if (fileList) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(fileList[0]);
      this.gunForm.patchValue({
        imagePath: fileList[0],
      });
    }
  }

  mapToForm(existGun: Gun): void {
    const { id, name, price, description, category, imagePath } = existGun;
    this.imageUrl = imagePath;
    this.gunForm.patchValue({
      id,
      name,
      price,
      description,
      category,
    });
  }
}