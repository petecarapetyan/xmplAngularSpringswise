import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IScore } from '../score.model';
import { ScoreService } from '../service/score.service';

@Injectable({ providedIn: 'root' })
export class ScoreRoutingResolveService implements Resolve<IScore | null> {
  constructor(protected service: ScoreService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IScore | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((score: HttpResponse<IScore>) => {
          if (score.body) {
            return of(score.body);
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
