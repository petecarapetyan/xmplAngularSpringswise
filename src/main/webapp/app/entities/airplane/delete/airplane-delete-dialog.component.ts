import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAirplane } from '../airplane.model';
import { AirplaneService } from '../service/airplane.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './airplane-delete-dialog.component.html',
})
export class AirplaneDeleteDialogComponent {
  airplane?: IAirplane;

  constructor(protected airplaneService: AirplaneService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.airplaneService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
