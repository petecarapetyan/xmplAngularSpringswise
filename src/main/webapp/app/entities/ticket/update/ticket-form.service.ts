import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITicket, NewTicket } from '../ticket.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITicket for edit and NewTicketFormGroupInput for create.
 */
type TicketFormGroupInput = ITicket | PartialWithRequiredKeyOf<NewTicket>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITicket | NewTicket> = Omit<T, 'timeStamp'> & {
  timeStamp?: string | null;
};

type TicketFormRawValue = FormValueOf<ITicket>;

type NewTicketFormRawValue = FormValueOf<NewTicket>;

type TicketFormDefaults = Pick<NewTicket, 'id' | 'timeStamp'>;

type TicketFormGroupContent = {
  id: FormControl<TicketFormRawValue['id'] | NewTicket['id']>;
  issue: FormControl<TicketFormRawValue['issue']>;
  timeStamp: FormControl<TicketFormRawValue['timeStamp']>;
  student: FormControl<TicketFormRawValue['student']>;
};

export type TicketFormGroup = FormGroup<TicketFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TicketFormService {
  createTicketFormGroup(ticket: TicketFormGroupInput = { id: null }): TicketFormGroup {
    const ticketRawValue = this.convertTicketToTicketRawValue({
      ...this.getFormDefaults(),
      ...ticket,
    });
    return new FormGroup<TicketFormGroupContent>({
      id: new FormControl(
        { value: ticketRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      issue: new FormControl(ticketRawValue.issue, {
        validators: [Validators.required],
      }),
      timeStamp: new FormControl(ticketRawValue.timeStamp),
      student: new FormControl(ticketRawValue.student),
    });
  }

  getTicket(form: TicketFormGroup): ITicket | NewTicket {
    return this.convertTicketRawValueToTicket(form.getRawValue() as TicketFormRawValue | NewTicketFormRawValue);
  }

  resetForm(form: TicketFormGroup, ticket: TicketFormGroupInput): void {
    const ticketRawValue = this.convertTicketToTicketRawValue({ ...this.getFormDefaults(), ...ticket });
    form.reset(
      {
        ...ticketRawValue,
        id: { value: ticketRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TicketFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timeStamp: currentTime,
    };
  }

  private convertTicketRawValueToTicket(rawTicket: TicketFormRawValue | NewTicketFormRawValue): ITicket | NewTicket {
    return {
      ...rawTicket,
      timeStamp: dayjs(rawTicket.timeStamp, DATE_TIME_FORMAT),
    };
  }

  private convertTicketToTicketRawValue(
    ticket: ITicket | (Partial<NewTicket> & TicketFormDefaults)
  ): TicketFormRawValue | PartialWithRequiredKeyOf<NewTicketFormRawValue> {
    return {
      ...ticket,
      timeStamp: ticket.timeStamp ? ticket.timeStamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
