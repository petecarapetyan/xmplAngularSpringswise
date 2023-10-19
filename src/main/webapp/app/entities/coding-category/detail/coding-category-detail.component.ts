import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICodingCategory } from '../coding-category.model';

@Component({
  selector: 'jhi-coding-category-detail',
  templateUrl: './coding-category-detail.component.html',
})
export class CodingCategoryDetailComponent implements OnInit {
  codingCategory: ICodingCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ codingCategory }) => {
      this.codingCategory = codingCategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
