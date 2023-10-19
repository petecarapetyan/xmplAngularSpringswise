import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAirplane } from '../airplane.model';
import { AirplaneService } from '../service/airplane.service';

@Injectable({ providedIn: 'root' })
export class AirplaneRoutingResolveService implements Resolve<IAirplane | null> {
  constructor(protected service: AirplaneService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAirplane | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((airplane: HttpResponse<IAirplane>) => {
          if (airplane.body) {
            return of(airplane.body);
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
