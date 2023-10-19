import { IAirplane, NewAirplane } from './airplane.model';

export const sampleWithRequiredData: IAirplane = {
  id: 97645,
};

export const sampleWithPartialData: IAirplane = {
  id: 22731,
  model: 'indexing Anguilla',
};

export const sampleWithFullData: IAirplane = {
  id: 47726,
  model: 'Shoes',
  make: 'Frozen',
  color: 'turquoise',
};

export const sampleWithNewData: NewAirplane = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
