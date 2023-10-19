import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SpringProjectComponent } from '../list/spring-project.component';
import { SpringProjectDetailComponent } from '../detail/spring-project-detail.component';
import { SpringProjectUpdateComponent } from '../update/spring-project-update.component';
import { SpringProjectRoutingResolveService } from './spring-project-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const springProjectRoute: Routes = [
  {
    path: '',
    component: SpringProjectComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SpringProjectDetailComponent,
    resolve: {
      springProject: SpringProjectRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SpringProjectUpdateComponent,
    resolve: {
      springProject: SpringProjectRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SpringProjectUpdateComponent,
    resolve: {
      springProject: SpringProjectRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(springProjectRoute)],
  exports: [RouterModule],
})
export class SpringProjectRoutingModule {}
