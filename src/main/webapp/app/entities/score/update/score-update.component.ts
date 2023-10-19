import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ScoreFormService, ScoreFormGroup } from './score-form.service';
import { IScore } from '../score.model';
import { ScoreService } from '../service/score.service';

@Component({
  selector: 'jhi-score-update',
  templateUrl: './score-update.component.html',
})
export class ScoreUpdateComponent implements OnInit {
  isSaving = false;
  score: IScore | null = null;

  editForm: ScoreFormGroup = this.scoreFormService.createScoreFormGroup();

  constructor(
    protected scoreService: ScoreService,
    protected scoreFormService: ScoreFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ score }) => {
      this.score = score;
      if (score) {
        this.updateForm(score);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const score = this.scoreFormService.getScore(this.editForm);
    if (score.id !== null) {
      this.subscribeToSaveResponse(this.scoreService.update(score));
    } else {
      this.subscribeToSaveResponse(this.scoreService.create(score));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IScore>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(score: IScore): void {
    this.score = score;
    this.scoreFormService.resetForm(this.editForm, score);
  }
}
