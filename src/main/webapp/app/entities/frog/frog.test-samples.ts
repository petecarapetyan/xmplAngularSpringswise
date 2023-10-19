import { IFrog, NewFrog } from './frog.model';

export const sampleWithRequiredData: IFrog = {
  id: 37032,
};

export const sampleWithPartialData: IFrog = {
  id: 65777,
  name: 'Kids multi-byte protocol',
  species: 'bottom-line Garden e-business',
};

export const sampleWithFullData: IFrog = {
  id: 23387,
  name: 'Kuwait',
  age: 32239,
  species: 'parse Keyboard Guinea',
};

export const sampleWithNewData: NewFrog = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
