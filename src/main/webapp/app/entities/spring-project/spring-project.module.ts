import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SpringProjectComponent } from './list/spring-project.component';
import { SpringProjectDetailComponent } from './detail/spring-project-detail.component';
import { SpringProjectUpdateComponent } from './update/spring-project-update.component';
import { SpringProjectDeleteDialogComponent } from './delete/spring-project-delete-dialog.component';
import { SpringProjectRoutingModule } from './route/spring-project-routing.module';

@NgModule({
  imports: [SharedModule, SpringProjectRoutingModule],
  declarations: [SpringProjectComponent, SpringProjectDetailComponent, SpringProjectUpdateComponent, SpringProjectDeleteDialogComponent],
})
export class SpringProjectModule {}
