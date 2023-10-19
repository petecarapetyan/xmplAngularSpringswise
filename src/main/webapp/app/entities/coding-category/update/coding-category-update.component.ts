import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CodingCategoryFormService, CodingCategoryFormGroup } from './coding-category-form.service';
import { ICodingCategory } from '../coding-category.model';
import { CodingCategoryService } from '../service/coding-category.service';

@Component({
  selector: 'jhi-coding-category-update',
  templateUrl: './coding-category-update.component.html',
})
export class CodingCategoryUpdateComponent implements OnInit {
  isSaving = false;
  codingCategory: ICodingCategory | null = null;

  editForm: CodingCategoryFormGroup = this.codingCategoryFormService.createCodingCategoryFormGroup();

  constructor(
    protected codingCategoryService: CodingCategoryService,
    protected codingCategoryFormService: CodingCategoryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ codingCategory }) => {
      this.codingCategory = codingCategory;
      if (codingCategory) {
        this.updateForm(codingCategory);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const codingCategory = this.codingCategoryFormService.getCodingCategory(this.editForm);
    if (codingCategory.id !== null) {
      this.subscribeToSaveResponse(this.codingCategoryService.update(codingCategory));
    } else {
      this.subscribeToSaveResponse(this.codingCategoryService.create(codingCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICodingCategory>>): void {
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

  protected updateForm(codingCategory: ICodingCategory): void {
    this.codingCategory = codingCategory;
    this.codingCategoryFormService.resetForm(this.editForm, codingCategory);
  }
}
