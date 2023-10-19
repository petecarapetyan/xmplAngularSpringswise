import { IDog, NewDog } from './dog.model';

export const sampleWithRequiredData: IDog = {
  id: 90760,
};

export const sampleWithPartialData: IDog = {
  id: 36541,
  name: 'open',
};

export const sampleWithFullData: IDog = {
  id: 73035,
  name: 'infrastructure Loan',
  age: 84847,
  breed: 'Account',
};

export const sampleWithNewData: NewDog = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
