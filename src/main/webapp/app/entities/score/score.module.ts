import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ScoreComponent } from './list/score.component';
import { ScoreDetailComponent } from './detail/score-detail.component';
import { ScoreUpdateComponent } from './update/score-update.component';
import { ScoreDeleteDialogComponent } from './delete/score-delete-dialog.component';
import { ScoreRoutingModule } from './route/score-routing.module';

@NgModule({
  imports: [SharedModule, ScoreRoutingModule],
  declarations: [ScoreComponent, ScoreDetailComponent, ScoreUpdateComponent, ScoreDeleteDialogComponent],
})
export class ScoreModule {}
