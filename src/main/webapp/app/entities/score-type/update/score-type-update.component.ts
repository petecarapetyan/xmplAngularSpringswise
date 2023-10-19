import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ScoreTypeFormService, ScoreTypeFormGroup } from './score-type-form.service';
import { IScoreType } from '../score-type.model';
import { ScoreTypeService } from '../service/score-type.service';

@Component({
  selector: 'jhi-score-type-update',
  templateUrl: './score-type-update.component.html',
})
export class ScoreTypeUpdateComponent implements OnInit {
  isSaving = false;
  scoreType: IScoreType | null = null;

  editForm: ScoreTypeFormGroup = this.scoreTypeFormService.createScoreTypeFormGroup();

  constructor(
    protected scoreTypeService: ScoreTypeService,
    protected scoreTypeFormService: ScoreTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ scoreType }) => {
      this.scoreType = scoreType;
      if (scoreType) {
        this.updateForm(scoreType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const scoreType = this.scoreTypeFormService.getScoreType(this.editForm);
    if (scoreType.id !== null) {
      this.subscribeToSaveResponse(this.scoreTypeService.update(scoreType));
    } else {
      this.subscribeToSaveResponse(this.scoreTypeService.create(scoreType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IScoreType>>): void {
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

  protected updateForm(scoreType: IScoreType): void {
    this.scoreType = scoreType;
    this.scoreTypeFormService.resetForm(this.editForm, scoreType);
  }
}
