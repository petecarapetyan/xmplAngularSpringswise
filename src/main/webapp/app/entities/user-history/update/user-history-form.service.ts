import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUserHistory, NewUserHistory } from '../user-history.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUserHistory for edit and NewUserHistoryFormGroupInput for create.
 */
type UserHistoryFormGroupInput = IUserHistory | PartialWithRequiredKeyOf<NewUserHistory>;

type UserHistoryFormDefaults = Pick<NewUserHistory, 'id'>;

type UserHistoryFormGroupContent = {
  id: FormControl<IUserHistory['id'] | NewUserHistory['id']>;
  name: FormControl<IUserHistory['name']>;
  issue: FormControl<IUserHistory['issue']>;
  issueDate: FormControl<IUserHistory['issueDate']>;
};

export type UserHistoryFormGroup = FormGroup<UserHistoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UserHistoryFormService {
  createUserHistoryFormGroup(userHistory: UserHistoryFormGroupInput = { id: null }): UserHistoryFormGroup {
    const userHistoryRawValue = {
      ...this.getFormDefaults(),
      ...userHistory,
    };
    return new FormGroup<UserHistoryFormGroupContent>({
      id: new FormControl(
        { value: userHistoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(userHistoryRawValue.name),
      issue: new FormControl(userHistoryRawValue.issue),
      issueDate: new FormControl(userHistoryRawValue.issueDate),
    });
  }

  getUserHistory(form: UserHistoryFormGroup): IUserHistory | NewUserHistory {
    return form.getRawValue() as IUserHistory | NewUserHistory;
  }

  resetForm(form: UserHistoryFormGroup, userHistory: UserHistoryFormGroupInput): void {
    const userHistoryRawValue = { ...this.getFormDefaults(), ...userHistory };
    form.reset(
      {
        ...userHistoryRawValue,
        id: { value: userHistoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UserHistoryFormDefaults {
    return {
      id: null,
    };
  }
}
