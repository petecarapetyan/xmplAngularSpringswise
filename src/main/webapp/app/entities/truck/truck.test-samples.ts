import { ITruck, NewTruck } from './truck.model';

export const sampleWithRequiredData: ITruck = {
  id: 80298,
};

export const sampleWithPartialData: ITruck = {
  id: 93990,
  make: 'Quality-focused',
  motorSize: 36855,
};

export const sampleWithFullData: ITruck = {
  id: 49274,
  modelName: 'Pants',
  make: 'Incredible cyan',
  motorSize: 35344,
  color: 'indigo',
};

export const sampleWithNewData: NewTruck = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
