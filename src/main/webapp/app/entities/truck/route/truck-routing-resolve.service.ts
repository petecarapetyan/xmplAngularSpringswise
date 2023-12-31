import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITruck } from '../truck.model';
import { TruckService } from '../service/truck.service';

@Injectable({ providedIn: 'root' })
export class TruckRoutingResolveService implements Resolve<ITruck | null> {
  constructor(protected service: TruckService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITruck | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((truck: HttpResponse<ITruck>) => {
          if (truck.body) {
            return of(truck.body);
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
