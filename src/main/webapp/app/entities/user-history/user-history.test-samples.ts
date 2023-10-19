import dayjs from 'dayjs/esm';

import { IUserHistory, NewUserHistory } from './user-history.model';

export const sampleWithRequiredData: IUserHistory = {
  id: 99867,
};

export const sampleWithPartialData: IUserHistory = {
  id: 34395,
  issueDate: dayjs('2023-10-08'),
};

export const sampleWithFullData: IUserHistory = {
  id: 62596,
  name: 'Health RAM Ports',
  issue: 'synergy demand-driven architect',
  issueDate: dayjs('2023-10-08'),
};

export const sampleWithNewData: NewUserHistory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
