import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CodingCategoryComponent } from './list/coding-category.component';
import { CodingCategoryDetailComponent } from './detail/coding-category-detail.component';
import { CodingCategoryUpdateComponent } from './update/coding-category-update.component';
import { CodingCategoryDeleteDialogComponent } from './delete/coding-category-delete-dialog.component';
import { CodingCategoryRoutingModule } from './route/coding-category-routing.module';

@NgModule({
  imports: [SharedModule, CodingCategoryRoutingModule],
  declarations: [
    CodingCategoryComponent,
    CodingCategoryDetailComponent,
    CodingCategoryUpdateComponent,
    CodingCategoryDeleteDialogComponent,
  ],
})
export class CodingCategoryModule {}
