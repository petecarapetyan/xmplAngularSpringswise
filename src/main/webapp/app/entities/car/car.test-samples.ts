import { ICar, NewCar } from './car.model';

export const sampleWithRequiredData: ICar = {
  id: 96848,
};

export const sampleWithPartialData: ICar = {
  id: 61549,
  motorSize: 'Program Investor',
  wheelSize: 'action-items',
  color: 'olive',
};

export const sampleWithFullData: ICar = {
  id: 20509,
  motorSize: 'Republic Assistant Dakota',
  modelName: 'grey',
  wheelSize: 'XSS programming',
  transmission: 'schemas indexing',
  color: 'purple',
  yearOf: 32179,
  price: 49009,
};

export const sampleWithNewData: NewCar = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
