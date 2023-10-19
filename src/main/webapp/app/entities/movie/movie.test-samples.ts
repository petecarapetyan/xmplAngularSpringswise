import { IMovie, NewMovie } from './movie.model';

export const sampleWithRequiredData: IMovie = {
  id: 71608,
};

export const sampleWithPartialData: IMovie = {
  id: 33466,
  genre: 'payment global Ergonomic',
  rating: 'Pound drive',
};

export const sampleWithFullData: IMovie = {
  id: 5853,
  name: 'Crest collaborative',
  yearOf: 48506,
  genre: 'Cross-platform Senior',
  rating: 'Michigan programming Configurable',
};

export const sampleWithNewData: NewMovie = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
