import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { UserHistoryFormService, UserHistoryFormGroup } from './user-history-form.service';
import { IUserHistory } from '../user-history.model';
import { UserHistoryService } from '../service/user-history.service';

@Component({
  selector: 'jhi-user-history-update',
  templateUrl: './user-history-update.component.html',
})
export class UserHistoryUpdateComponent implements OnInit {
  isSaving = false;
  userHistory: IUserHistory | null = null;

  editForm: UserHistoryFormGroup = this.userHistoryFormService.createUserHistoryFormGroup();

  constructor(
    protected userHistoryService: UserHistoryService,
    protected userHistoryFormService: UserHistoryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userHistory }) => {
      this.userHistory = userHistory;
      if (userHistory) {
        this.updateForm(userHistory);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userHistory = this.userHistoryFormService.getUserHistory(this.editForm);
    if (userHistory.id !== null) {
      this.subscribeToSaveResponse(this.userHistoryService.update(userHistory));
    } else {
      this.subscribeToSaveResponse(this.userHistoryService.create(userHistory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserHistory>>): void {
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

  protected updateForm(userHistory: IUserHistory): void {
    this.userHistory = userHistory;
    this.userHistoryFormService.resetForm(this.editForm, userHistory);
  }
}
