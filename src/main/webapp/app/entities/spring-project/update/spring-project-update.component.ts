import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SpringProjectFormService, SpringProjectFormGroup } from './spring-project-form.service';
import { ISpringProject } from '../spring-project.model';
import { SpringProjectService } from '../service/spring-project.service';

@Component({
  selector: 'jhi-spring-project-update',
  templateUrl: './spring-project-update.component.html',
})
export class SpringProjectUpdateComponent implements OnInit {
  isSaving = false;
  springProject: ISpringProject | null = null;

  editForm: SpringProjectFormGroup = this.springProjectFormService.createSpringProjectFormGroup();

  constructor(
    protected springProjectService: SpringProjectService,
    protected springProjectFormService: SpringProjectFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ springProject }) => {
      this.springProject = springProject;
      if (springProject) {
        this.updateForm(springProject);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const springProject = this.springProjectFormService.getSpringProject(this.editForm);
    if (springProject.id !== null) {
      this.subscribeToSaveResponse(this.springProjectService.update(springProject));
    } else {
      this.subscribeToSaveResponse(this.springProjectService.create(springProject));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpringProject>>): void {
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

  protected updateForm(springProject: ISpringProject): void {
    this.springProject = springProject;
    this.springProjectFormService.resetForm(this.editForm, springProject);
  }
}
