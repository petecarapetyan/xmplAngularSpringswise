import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISpringProject } from '../spring-project.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../spring-project.test-samples';

import { SpringProjectService } from './spring-project.service';

const requireRestSample: ISpringProject = {
  ...sampleWithRequiredData,
};

describe('SpringProject Service', () => {
  let service: SpringProjectService;
  let httpMock: HttpTestingController;
  let expectedResult: ISpringProject | ISpringProject[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SpringProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a SpringProject', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const springProject = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(springProject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SpringProject', () => {
      const springProject = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(springProject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SpringProject', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SpringProject', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SpringProject', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSpringProjectToCollectionIfMissing', () => {
      it('should add a SpringProject to an empty array', () => {
        const springProject: ISpringProject = sampleWithRequiredData;
        expectedResult = service.addSpringProjectToCollectionIfMissing([], springProject);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(springProject);
      });

      it('should not add a SpringProject to an array that contains it', () => {
        const springProject: ISpringProject = sampleWithRequiredData;
        const springProjectCollection: ISpringProject[] = [
          {
            ...springProject,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSpringProjectToCollectionIfMissing(springProjectCollection, springProject);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SpringProject to an array that doesn't contain it", () => {
        const springProject: ISpringProject = sampleWithRequiredData;
        const springProjectCollection: ISpringProject[] = [sampleWithPartialData];
        expectedResult = service.addSpringProjectToCollectionIfMissing(springProjectCollection, springProject);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(springProject);
      });

      it('should add only unique SpringProject to an array', () => {
        const springProjectArray: ISpringProject[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const springProjectCollection: ISpringProject[] = [sampleWithRequiredData];
        expectedResult = service.addSpringProjectToCollectionIfMissing(springProjectCollection, ...springProjectArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const springProject: ISpringProject = sampleWithRequiredData;
        const springProject2: ISpringProject = sampleWithPartialData;
        expectedResult = service.addSpringProjectToCollectionIfMissing([], springProject, springProject2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(springProject);
        expect(expectedResult).toContain(springProject2);
      });

      it('should accept null and undefined values', () => {
        const springProject: ISpringProject = sampleWithRequiredData;
        expectedResult = service.addSpringProjectToCollectionIfMissing([], null, springProject, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(springProject);
      });

      it('should return initial array if no SpringProject is added', () => {
        const springProjectCollection: ISpringProject[] = [sampleWithRequiredData];
        expectedResult = service.addSpringProjectToCollectionIfMissing(springProjectCollection, undefined, null);
        expect(expectedResult).toEqual(springProjectCollection);
      });
    });

    describe('compareSpringProject', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSpringProject(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSpringProject(entity1, entity2);
        const compareResult2 = service.compareSpringProject(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSpringProject(entity1, entity2);
        const compareResult2 = service.compareSpringProject(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSpringProject(entity1, entity2);
        const compareResult2 = service.compareSpringProject(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
