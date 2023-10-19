import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICodingCategory } from '../coding-category.model';
import { CodingCategoryService } from '../service/coding-category.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './coding-category-delete-dialog.component.html',
})
export class CodingCategoryDeleteDialogComponent {
  codingCategory?: ICodingCategory;

  constructor(protected codingCategoryService: CodingCategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.codingCategoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
