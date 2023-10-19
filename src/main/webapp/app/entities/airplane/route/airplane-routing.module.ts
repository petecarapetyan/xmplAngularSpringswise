import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AirplaneComponent } from '../list/airplane.component';
import { AirplaneDetailComponent } from '../detail/airplane-detail.component';
import { AirplaneUpdateComponent } from '../update/airplane-update.component';
import { AirplaneRoutingResolveService } from './airplane-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const airplaneRoute: Routes = [
  {
    path: '',
    component: AirplaneComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AirplaneDetailComponent,
    resolve: {
      airplane: AirplaneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AirplaneUpdateComponent,
    resolve: {
      airplane: AirplaneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AirplaneUpdateComponent,
    resolve: {
      airplane: AirplaneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(airplaneRoute)],
  exports: [RouterModule],
})
export class AirplaneRoutingModule {}
