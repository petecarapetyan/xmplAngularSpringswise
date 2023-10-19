import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FrogComponent } from './list/frog.component';
import { FrogDetailComponent } from './detail/frog-detail.component';
import { FrogUpdateComponent } from './update/frog-update.component';
import { FrogDeleteDialogComponent } from './delete/frog-delete-dialog.component';
import { FrogRoutingModule } from './route/frog-routing.module';

@NgModule({
  imports: [SharedModule, FrogRoutingModule],
  declarations: [FrogComponent, FrogDetailComponent, FrogUpdateComponent, FrogDeleteDialogComponent],
})
export class FrogModule {}
