import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ScoreComponent } from '../list/score.component';
import { ScoreDetailComponent } from '../detail/score-detail.component';
import { ScoreUpdateComponent } from '../update/score-update.component';
import { ScoreRoutingResolveService } from './score-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const scoreRoute: Routes = [
  {
    path: '',
    component: ScoreComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ScoreDetailComponent,
    resolve: {
      score: ScoreRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ScoreUpdateComponent,
    resolve: {
      score: ScoreRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ScoreUpdateComponent,
    resolve: {
      score: ScoreRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(scoreRoute)],
  exports: [RouterModule],
})
export class ScoreRoutingModule {}
