import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UserHistoryComponent } from '../list/user-history.component';
import { UserHistoryDetailComponent } from '../detail/user-history-detail.component';
import { UserHistoryUpdateComponent } from '../update/user-history-update.component';
import { UserHistoryRoutingResolveService } from './user-history-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const userHistoryRoute: Routes = [
  {
    path: '',
    component: UserHistoryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserHistoryDetailComponent,
    resolve: {
      userHistory: UserHistoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserHistoryUpdateComponent,
    resolve: {
      userHistory: UserHistoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserHistoryUpdateComponent,
    resolve: {
      userHistory: UserHistoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userHistoryRoute)],
  exports: [RouterModule],
})
export class UserHistoryRoutingModule {}
