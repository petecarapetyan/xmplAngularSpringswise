import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DogFormService, DogFormGroup } from './dog-form.service';
import { IDog } from '../dog.model';
import { DogService } from '../service/dog.service';

@Component({
  selector: 'jhi-dog-update',
  templateUrl: './dog-update.component.html',
})
export class DogUpdateComponent implements OnInit {
  isSaving = false;
  dog: IDog | null = null;

  editForm: DogFormGroup = this.dogFormService.createDogFormGroup();

  constructor(protected dogService: DogService, protected dogFormService: DogFormService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dog }) => {
      this.dog = dog;
      if (dog) {
        this.updateForm(dog);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dog = this.dogFormService.getDog(this.editForm);
    if (dog.id !== null) {
      this.subscribeToSaveResponse(this.dogService.update(dog));
    } else {
      this.subscribeToSaveResponse(this.dogService.create(dog));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDog>>): void {
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

  protected updateForm(dog: IDog): void {
    this.dog = dog;
    this.dogFormService.resetForm(this.editForm, dog);
  }
}
