import { ISpringProject, NewSpringProject } from './spring-project.model';

export const sampleWithRequiredData: ISpringProject = {
  id: 38715,
};

export const sampleWithPartialData: ISpringProject = {
  id: 7182,
  title: 'Cotton',
  description: 'Berkshire generating e-markets',
  url: 'http://deshawn.org',
};

export const sampleWithFullData: ISpringProject = {
  id: 71290,
  title: 'Tools Principal Wooden',
  description: 'killer',
  imagePath: 'Card',
  url: 'http://rhea.net',
};

export const sampleWithNewData: NewSpringProject = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
