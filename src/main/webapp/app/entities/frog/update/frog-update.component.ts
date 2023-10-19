import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FrogFormService, FrogFormGroup } from './frog-form.service';
import { IFrog } from '../frog.model';
import { FrogService } from '../service/frog.service';

@Component({
  selector: 'jhi-frog-update',
  templateUrl: './frog-update.component.html',
})
export class FrogUpdateComponent implements OnInit {
  isSaving = false;
  frog: IFrog | null = null;

  editForm: FrogFormGroup = this.frogFormService.createFrogFormGroup();

  constructor(protected frogService: FrogService, protected frogFormService: FrogFormService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ frog }) => {
      this.frog = frog;
      if (frog) {
        this.updateForm(frog);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const frog = this.frogFormService.getFrog(this.editForm);
    if (frog.id !== null) {
      this.subscribeToSaveResponse(this.frogService.update(frog));
    } else {
      this.subscribeToSaveResponse(this.frogService.create(frog));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFrog>>): void {
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

  protected updateForm(frog: IFrog): void {
    this.frog = frog;
    this.frogFormService.resetForm(this.editForm, frog);
  }
}
