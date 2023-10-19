import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AirplaneFormService, AirplaneFormGroup } from './airplane-form.service';
import { IAirplane } from '../airplane.model';
import { AirplaneService } from '../service/airplane.service';

@Component({
  selector: 'jhi-airplane-update',
  templateUrl: './airplane-update.component.html',
})
export class AirplaneUpdateComponent implements OnInit {
  isSaving = false;
  airplane: IAirplane | null = null;

  editForm: AirplaneFormGroup = this.airplaneFormService.createAirplaneFormGroup();

  constructor(
    protected airplaneService: AirplaneService,
    protected airplaneFormService: AirplaneFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ airplane }) => {
      this.airplane = airplane;
      if (airplane) {
        this.updateForm(airplane);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const airplane = this.airplaneFormService.getAirplane(this.editForm);
    if (airplane.id !== null) {
      this.subscribeToSaveResponse(this.airplaneService.update(airplane));
    } else {
      this.subscribeToSaveResponse(this.airplaneService.create(airplane));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAirplane>>): void {
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

  protected updateForm(airplane: IAirplane): void {
    this.airplane = airplane;
    this.airplaneFormService.resetForm(this.editForm, airplane);
  }
}
