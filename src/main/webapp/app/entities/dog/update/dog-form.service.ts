import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDog, NewDog } from '../dog.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDog for edit and NewDogFormGroupInput for create.
 */
type DogFormGroupInput = IDog | PartialWithRequiredKeyOf<NewDog>;

type DogFormDefaults = Pick<NewDog, 'id'>;

type DogFormGroupContent = {
  id: FormControl<IDog['id'] | NewDog['id']>;
  name: FormControl<IDog['name']>;
  age: FormControl<IDog['age']>;
  breed: FormControl<IDog['breed']>;
};

export type DogFormGroup = FormGroup<DogFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DogFormService {
  createDogFormGroup(dog: DogFormGroupInput = { id: null }): DogFormGroup {
    const dogRawValue = {
      ...this.getFormDefaults(),
      ...dog,
    };
    return new FormGroup<DogFormGroupContent>({
      id: new FormControl(
        { value: dogRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(dogRawValue.name),
      age: new FormControl(dogRawValue.age),
      breed: new FormControl(dogRawValue.breed),
    });
  }

  getDog(form: DogFormGroup): IDog | NewDog {
    return form.getRawValue() as IDog | NewDog;
  }

  resetForm(form: DogFormGroup, dog: DogFormGroupInput): void {
    const dogRawValue = { ...this.getFormDefaults(), ...dog };
    form.reset(
      {
        ...dogRawValue,
        id: { value: dogRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DogFormDefaults {
    return {
      id: null,
    };
  }
}
