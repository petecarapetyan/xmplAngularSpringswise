import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFrog, NewFrog } from '../frog.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFrog for edit and NewFrogFormGroupInput for create.
 */
type FrogFormGroupInput = IFrog | PartialWithRequiredKeyOf<NewFrog>;

type FrogFormDefaults = Pick<NewFrog, 'id'>;

type FrogFormGroupContent = {
  id: FormControl<IFrog['id'] | NewFrog['id']>;
  name: FormControl<IFrog['name']>;
  age: FormControl<IFrog['age']>;
  species: FormControl<IFrog['species']>;
};

export type FrogFormGroup = FormGroup<FrogFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FrogFormService {
  createFrogFormGroup(frog: FrogFormGroupInput = { id: null }): FrogFormGroup {
    const frogRawValue = {
      ...this.getFormDefaults(),
      ...frog,
    };
    return new FormGroup<FrogFormGroupContent>({
      id: new FormControl(
        { value: frogRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(frogRawValue.name),
      age: new FormControl(frogRawValue.age),
      species: new FormControl(frogRawValue.species),
    });
  }

  getFrog(form: FrogFormGroup): IFrog | NewFrog {
    return form.getRawValue() as IFrog | NewFrog;
  }

  resetForm(form: FrogFormGroup, frog: FrogFormGroupInput): void {
    const frogRawValue = { ...this.getFormDefaults(), ...frog };
    form.reset(
      {
        ...frogRawValue,
        id: { value: frogRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FrogFormDefaults {
    return {
      id: null,
    };
  }
}
