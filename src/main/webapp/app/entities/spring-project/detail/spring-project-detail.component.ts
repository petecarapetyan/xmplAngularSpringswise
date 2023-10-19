import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpringProject } from '../spring-project.model';

@Component({
  selector: 'jhi-spring-project-detail',
  templateUrl: './spring-project-detail.component.html',
})
export class SpringProjectDetailComponent implements OnInit {
  springProject: ISpringProject | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ springProject }) => {
      this.springProject = springProject;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
