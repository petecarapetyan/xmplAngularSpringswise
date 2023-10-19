import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFrog } from '../frog.model';
import { FrogService } from '../service/frog.service';

@Injectable({ providedIn: 'root' })
export class FrogRoutingResolveService implements Resolve<IFrog | null> {
  constructor(protected service: FrogService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFrog | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((frog: HttpResponse<IFrog>) => {
          if (frog.body) {
            return of(frog.body);
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
