import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IScore, NewScore } from '../score.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IScore for edit and NewScoreFormGroupInput for create.
 */
type ScoreFormGroupInput = IScore | PartialWithRequiredKeyOf<NewScore>;

type ScoreFormDefaults = Pick<NewScore, 'id'>;

type ScoreFormGroupContent = {
  id: FormControl<IScore['id'] | NewScore['id']>;
  points: FormControl<IScore['points']>;
};

export type ScoreFormGroup = FormGroup<ScoreFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ScoreFormService {
  createScoreFormGroup(score: ScoreFormGroupInput = { id: null }): ScoreFormGroup {
    const scoreRawValue = {
      ...this.getFormDefaults(),
      ...score,
    };
    return new FormGroup<ScoreFormGroupContent>({
      id: new FormControl(
        { value: scoreRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      points: new FormControl(scoreRawValue.points, {
        validators: [Validators.required],
      }),
    });
  }

  getScore(form: ScoreFormGroup): IScore | NewScore {
    return form.getRawValue() as IScore | NewScore;
  }

  resetForm(form: ScoreFormGroup, score: ScoreFormGroupInput): void {
    const scoreRawValue = { ...this.getFormDefaults(), ...score };
    form.reset(
      {
        ...scoreRawValue,
        id: { value: scoreRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ScoreFormDefaults {
    return {
      id: null,
    };
  }
}
