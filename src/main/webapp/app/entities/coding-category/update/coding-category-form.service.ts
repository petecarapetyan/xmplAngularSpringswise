import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICodingCategory, NewCodingCategory } from '../coding-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICodingCategory for edit and NewCodingCategoryFormGroupInput for create.
 */
type CodingCategoryFormGroupInput = ICodingCategory | PartialWithRequiredKeyOf<NewCodingCategory>;

type CodingCategoryFormDefaults = Pick<NewCodingCategory, 'id'>;

type CodingCategoryFormGroupContent = {
  id: FormControl<ICodingCategory['id'] | NewCodingCategory['id']>;
  name: FormControl<ICodingCategory['name']>;
};

export type CodingCategoryFormGroup = FormGroup<CodingCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CodingCategoryFormService {
  createCodingCategoryFormGroup(codingCategory: CodingCategoryFormGroupInput = { id: null }): CodingCategoryFormGroup {
    const codingCategoryRawValue = {
      ...this.getFormDefaults(),
      ...codingCategory,
    };
    return new FormGroup<CodingCategoryFormGroupContent>({
      id: new FormControl(
        { value: codingCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(codingCategoryRawValue.name),
    });
  }

  getCodingCategory(form: CodingCategoryFormGroup): ICodingCategory | NewCodingCategory {
    return form.getRawValue() as ICodingCategory | NewCodingCategory;
  }

  resetForm(form: CodingCategoryFormGroup, codingCategory: CodingCategoryFormGroupInput): void {
    const codingCategoryRawValue = { ...this.getFormDefaults(), ...codingCategory };
    form.reset(
      {
        ...codingCategoryRawValue,
        id: { value: codingCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CodingCategoryFormDefaults {
    return {
      id: null,
    };
  }
}
