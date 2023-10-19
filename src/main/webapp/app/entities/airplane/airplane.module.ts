import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AirplaneComponent } from './list/airplane.component';
import { AirplaneDetailComponent } from './detail/airplane-detail.component';
import { AirplaneUpdateComponent } from './update/airplane-update.component';
import { AirplaneDeleteDialogComponent } from './delete/airplane-delete-dialog.component';
import { AirplaneRoutingModule } from './route/airplane-routing.module';

@NgModule({
  imports: [SharedModule, AirplaneRoutingModule],
  declarations: [AirplaneComponent, AirplaneDetailComponent, AirplaneUpdateComponent, AirplaneDeleteDialogComponent],
})
export class AirplaneModule {}
