import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpringProject } from '../spring-project.model';
import { SpringProjectService } from '../service/spring-project.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './spring-project-delete-dialog.component.html',
})
export class SpringProjectDeleteDialogComponent {
  springProject?: ISpringProject;

  constructor(protected springProjectService: SpringProjectService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.springProjectService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
