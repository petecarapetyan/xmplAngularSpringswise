import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICodingCategory } from '../coding-category.model';
import { CodingCategoryService } from '../service/coding-category.service';

@Injectable({ providedIn: 'root' })
export class CodingCategoryRoutingResolveService implements Resolve<ICodingCategory | null> {
  constructor(protected service: CodingCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICodingCategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((codingCategory: HttpResponse<ICodingCategory>) => {
          if (codingCategory.body) {
            return of(codingCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
