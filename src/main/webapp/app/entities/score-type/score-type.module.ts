import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ScoreTypeComponent } from './list/score-type.component';
import { ScoreTypeDetailComponent } from './detail/score-type-detail.component';
import { ScoreTypeUpdateComponent } from './update/score-type-update.component';
import { ScoreTypeDeleteDialogComponent } from './delete/score-type-delete-dialog.component';
import { ScoreTypeRoutingModule } from './route/score-type-routing.module';

@NgModule({
  imports: [SharedModule, ScoreTypeRoutingModule],
  declarations: [ScoreTypeComponent, ScoreTypeDetailComponent, ScoreTypeUpdateComponent, ScoreTypeDeleteDialogComponent],
})
export class ScoreTypeModule {}
