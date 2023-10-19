import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 23105,
  name: 'Franc Division Regional',
  initials: 'Refined Auto',
};

export const sampleWithPartialData: IStudent = {
  id: 33985,
  name: 'transmit',
  initials: 'hard Home',
};

export const sampleWithFullData: IStudent = {
  id: 75764,
  name: 'deploy of',
  initials: 'auxiliary Tools Savings',
};

export const sampleWithNewData: NewStudent = {
  name: 'Borders',
  initials: 'Pizza',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
