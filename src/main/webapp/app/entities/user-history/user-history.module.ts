import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UserHistoryComponent } from './list/user-history.component';
import { UserHistoryDetailComponent } from './detail/user-history-detail.component';
import { UserHistoryUpdateComponent } from './update/user-history-update.component';
import { UserHistoryDeleteDialogComponent } from './delete/user-history-delete-dialog.component';
import { UserHistoryRoutingModule } from './route/user-history-routing.module';

@NgModule({
  imports: [SharedModule, UserHistoryRoutingModule],
  declarations: [UserHistoryComponent, UserHistoryDetailComponent, UserHistoryUpdateComponent, UserHistoryDeleteDialogComponent],
})
export class UserHistoryModule {}
