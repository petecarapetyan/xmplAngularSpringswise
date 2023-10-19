import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISpringProject } from '../spring-project.model';
import { SpringProjectService } from '../service/spring-project.service';

@Injectable({ providedIn: 'root' })
export class SpringProjectRoutingResolveService implements Resolve<ISpringProject | null> {
  constructor(protected service: SpringProjectService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpringProject | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((springProject: HttpResponse<ISpringProject>) => {
          if (springProject.body) {
            return of(springProject.body);
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
