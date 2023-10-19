import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAirplane } from '../airplane.model';

@Component({
  selector: 'jhi-airplane-detail',
  templateUrl: './airplane-detail.component.html',
})
export class AirplaneDetailComponent implements OnInit {
  airplane: IAirplane | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ airplane }) => {
      this.airplane = airplane;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
