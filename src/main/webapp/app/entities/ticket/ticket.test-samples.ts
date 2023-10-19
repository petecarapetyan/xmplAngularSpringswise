import dayjs from 'dayjs/esm';

import { ITicket, NewTicket } from './ticket.model';

export const sampleWithRequiredData: ITicket = {
  id: 65582,
  issue: 'Sleek Centralized Fish',
};

export const sampleWithPartialData: ITicket = {
  id: 13886,
  issue: 'Niue white',
};

export const sampleWithFullData: ITicket = {
  id: 81176,
  issue: 'national Electronics Chief',
  timeStamp: dayjs('2023-10-08T08:42'),
};

export const sampleWithNewData: NewTicket = {
  issue: 'Uzbekistan overriding Executive',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
