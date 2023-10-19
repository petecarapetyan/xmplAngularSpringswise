import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ScoreTypeComponent } from '../list/score-type.component';
import { ScoreTypeDetailComponent } from '../detail/score-type-detail.component';
import { ScoreTypeUpdateComponent } from '../update/score-type-update.component';
import { ScoreTypeRoutingResolveService } from './score-type-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const scoreTypeRoute: Routes = [
  {
    path: '',
    component: ScoreTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ScoreTypeDetailComponent,
    resolve: {
      scoreType: ScoreTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ScoreTypeUpdateComponent,
    resolve: {
      scoreType: ScoreTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ScoreTypeUpdateComponent,
    resolve: {
      scoreType: ScoreTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(scoreTypeRoute)],
  exports: [RouterModule],
})
export class ScoreTypeRoutingModule {}
