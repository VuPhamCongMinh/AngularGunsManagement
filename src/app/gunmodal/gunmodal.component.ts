import { Gun } from './../models/gun';
import { GunService } from './../services/gun-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GunFormComponent } from './../gunform/gunform.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gunmodal',
  template: '',
  styles: [],
})
export class GunModalComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    gunService: GunService
  ) {
    this.route.params.subscribe((param) => {
      this.openDialog(gunService.getGunById(param.id));
    });
  }
  openDialog(selectedGun: Gun | undefined): void {
    if (selectedGun === undefined) return;
    const dialogRef = this.dialog.open(GunFormComponent, {
      width: '45vw',
      data: selectedGun,
    });

    dialogRef.afterClosed().subscribe((_) => {
      this.router.navigate(['../']);
    });
  }
  ngOnInit(): void {}
}
