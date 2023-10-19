import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IScoreType, NewScoreType } from '../score-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IScoreType for edit and NewScoreTypeFormGroupInput for create.
 */
type ScoreTypeFormGroupInput = IScoreType | PartialWithRequiredKeyOf<NewScoreType>;

type ScoreTypeFormDefaults = Pick<NewScoreType, 'id'>;

type ScoreTypeFormGroupContent = {
  id: FormControl<IScoreType['id'] | NewScoreType['id']>;
  name: FormControl<IScoreType['name']>;
};

export type ScoreTypeFormGroup = FormGroup<ScoreTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ScoreTypeFormService {
  createScoreTypeFormGroup(scoreType: ScoreTypeFormGroupInput = { id: null }): ScoreTypeFormGroup {
    const scoreTypeRawValue = {
      ...this.getFormDefaults(),
      ...scoreType,
    };
    return new FormGroup<ScoreTypeFormGroupContent>({
      id: new FormControl(
        { value: scoreTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(scoreTypeRawValue.name, {
        validators: [Validators.required],
      }),
    });
  }

  getScoreType(form: ScoreTypeFormGroup): IScoreType | NewScoreType {
    return form.getRawValue() as IScoreType | NewScoreType;
  }

  resetForm(form: ScoreTypeFormGroup, scoreType: ScoreTypeFormGroupInput): void {
    const scoreTypeRawValue = { ...this.getFormDefaults(), ...scoreType };
    form.reset(
      {
        ...scoreTypeRawValue,
        id: { value: scoreTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ScoreTypeFormDefaults {
    return {
      id: null,
    };
  }
}
