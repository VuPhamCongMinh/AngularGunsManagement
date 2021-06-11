import { GunService } from './../services/gun-service.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-gunlist',
  templateUrl: './gunlist.component.html',
  styles: [],
})
export class GunListComponent implements OnInit {
  constructor(public gunService: GunService) {}

  ngOnInit(): void {}

  onNextBtnClick() {
    this.gunService.next();
  }

  onPrevBtnClick() {
    this.gunService.prev();
  }
}
