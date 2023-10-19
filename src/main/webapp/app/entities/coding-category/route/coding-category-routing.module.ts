import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CodingCategoryComponent } from '../list/coding-category.component';
import { CodingCategoryDetailComponent } from '../detail/coding-category-detail.component';
import { CodingCategoryUpdateComponent } from '../update/coding-category-update.component';
import { CodingCategoryRoutingResolveService } from './coding-category-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const codingCategoryRoute: Routes = [
  {
    path: '',
    component: CodingCategoryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CodingCategoryDetailComponent,
    resolve: {
      codingCategory: CodingCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CodingCategoryUpdateComponent,
    resolve: {
      codingCategory: CodingCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CodingCategoryUpdateComponent,
    resolve: {
      codingCategory: CodingCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(codingCategoryRoute)],
  exports: [RouterModule],
})
export class CodingCategoryRoutingModule {}
