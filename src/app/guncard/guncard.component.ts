import { GunModalComponent } from './../gunmodal/gunmodal.component';
import { GunFormComponent } from './../gunform/gunform.component';
import { Gun } from './../models/gun';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guncard',
  templateUrl: './guncard.component.html',
  styles: [],
})
export class GunCardComponent implements OnInit {
  @Input() gun: Gun;
  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.gun = {
      id: '',
      name: '',
      category: '',
      price: 0,
      imagePath: '',
      description: '',
    };
  }

  ngOnInit(): void {}
}
