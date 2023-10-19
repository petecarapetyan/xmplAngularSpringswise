import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IScoreType } from '../score-type.model';

@Component({
  selector: 'jhi-score-type-detail',
  templateUrl: './score-type-detail.component.html',
})
export class ScoreTypeDetailComponent implements OnInit {
  scoreType: IScoreType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ scoreType }) => {
      this.scoreType = scoreType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
