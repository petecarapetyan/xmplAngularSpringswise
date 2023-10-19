import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IScoreType } from '../score-type.model';
import { ScoreTypeService } from '../service/score-type.service';

@Injectable({ providedIn: 'root' })
export class ScoreTypeRoutingResolveService implements Resolve<IScoreType | null> {
  constructor(protected service: ScoreTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IScoreType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((scoreType: HttpResponse<IScoreType>) => {
          if (scoreType.body) {
            return of(scoreType.body);
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
