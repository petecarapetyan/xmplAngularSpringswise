import { ICodingCategory, NewCodingCategory } from './coding-category.model';

export const sampleWithRequiredData: ICodingCategory = {
  id: 57564,
};

export const sampleWithPartialData: ICodingCategory = {
  id: 52602,
};

export const sampleWithFullData: ICodingCategory = {
  id: 13462,
  name: 'overriding Forward expedite',
};

export const sampleWithNewData: NewCodingCategory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
