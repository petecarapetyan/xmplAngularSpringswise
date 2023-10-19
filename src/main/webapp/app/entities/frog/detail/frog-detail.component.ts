import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFrog } from '../frog.model';

@Component({
  selector: 'jhi-frog-detail',
  templateUrl: './frog-detail.component.html',
})
export class FrogDetailComponent implements OnInit {
  frog: IFrog | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ frog }) => {
      this.frog = frog;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
