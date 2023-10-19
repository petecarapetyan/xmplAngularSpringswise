import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAirplane, NewAirplane } from '../airplane.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAirplane for edit and NewAirplaneFormGroupInput for create.
 */
type AirplaneFormGroupInput = IAirplane | PartialWithRequiredKeyOf<NewAirplane>;

type AirplaneFormDefaults = Pick<NewAirplane, 'id'>;

type AirplaneFormGroupContent = {
  id: FormControl<IAirplane['id'] | NewAirplane['id']>;
  model: FormControl<IAirplane['model']>;
  make: FormControl<IAirplane['make']>;
  color: FormControl<IAirplane['color']>;
};

export type AirplaneFormGroup = FormGroup<AirplaneFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AirplaneFormService {
  createAirplaneFormGroup(airplane: AirplaneFormGroupInput = { id: null }): AirplaneFormGroup {
    const airplaneRawValue = {
      ...this.getFormDefaults(),
      ...airplane,
    };
    return new FormGroup<AirplaneFormGroupContent>({
      id: new FormControl(
        { value: airplaneRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      model: new FormControl(airplaneRawValue.model),
      make: new FormControl(airplaneRawValue.make),
      color: new FormControl(airplaneRawValue.color),
    });
  }

  getAirplane(form: AirplaneFormGroup): IAirplane | NewAirplane {
    return form.getRawValue() as IAirplane | NewAirplane;
  }

  resetForm(form: AirplaneFormGroup, airplane: AirplaneFormGroupInput): void {
    const airplaneRawValue = { ...this.getFormDefaults(), ...airplane };
    form.reset(
      {
        ...airplaneRawValue,
        id: { value: airplaneRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AirplaneFormDefaults {
    return {
      id: null,
    };
  }
}
