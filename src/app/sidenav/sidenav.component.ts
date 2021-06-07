import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GunFormComponent } from '../gunform/gunform.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  ngOnInit() {}

  openDialog(): void {
    this.dialog.open(GunFormComponent, {
      width: '45vw',
    });
  }
}
