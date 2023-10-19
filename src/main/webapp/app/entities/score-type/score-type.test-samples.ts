import { IScoreType, NewScoreType } from './score-type.model';

export const sampleWithRequiredData: IScoreType = {
  id: 54570,
  name: 'Investor',
};

export const sampleWithPartialData: IScoreType = {
  id: 21641,
  name: 'Functionality administration JBOD',
};

export const sampleWithFullData: IScoreType = {
  id: 45135,
  name: 'Iowa',
};

export const sampleWithNewData: NewScoreType = {
  name: 'Awesome',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
