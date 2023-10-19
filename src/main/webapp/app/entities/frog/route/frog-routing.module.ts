import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FrogComponent } from '../list/frog.component';
import { FrogDetailComponent } from '../detail/frog-detail.component';
import { FrogUpdateComponent } from '../update/frog-update.component';
import { FrogRoutingResolveService } from './frog-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const frogRoute: Routes = [
  {
    path: '',
    component: FrogComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FrogDetailComponent,
    resolve: {
      frog: FrogRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FrogUpdateComponent,
    resolve: {
      frog: FrogRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FrogUpdateComponent,
    resolve: {
      frog: FrogRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(frogRoute)],
  exports: [RouterModule],
})
export class FrogRoutingModule {}
