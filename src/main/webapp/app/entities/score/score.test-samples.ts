import { IScore, NewScore } from './score.model';

export const sampleWithRequiredData: IScore = {
  id: 41405,
  points: 'Electronics back',
};

export const sampleWithPartialData: IScore = {
  id: 20638,
  points: 'program Frozen Personal',
};

export const sampleWithFullData: IScore = {
  id: 6886,
  points: 'Shirt',
};

export const sampleWithNewData: NewScore = {
  points: 'Borders Rubber',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
