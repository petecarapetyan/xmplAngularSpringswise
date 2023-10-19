import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFrog } from '../frog.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../frog.test-samples';

import { FrogService } from './frog.service';

const requireRestSample: IFrog = {
  ...sampleWithRequiredData,
};

describe('Frog Service', () => {
  let service: FrogService;
  let httpMock: HttpTestingController;
  let expectedResult: IFrog | IFrog[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FrogService);
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

    it('should create a Frog', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const frog = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(frog).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Frog', () => {
      const frog = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(frog).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Frog', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Frog', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Frog', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFrogToCollectionIfMissing', () => {
      it('should add a Frog to an empty array', () => {
        const frog: IFrog = sampleWithRequiredData;
        expectedResult = service.addFrogToCollectionIfMissing([], frog);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(frog);
      });

      it('should not add a Frog to an array that contains it', () => {
        const frog: IFrog = sampleWithRequiredData;
        const frogCollection: IFrog[] = [
          {
            ...frog,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFrogToCollectionIfMissing(frogCollection, frog);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Frog to an array that doesn't contain it", () => {
        const frog: IFrog = sampleWithRequiredData;
        const frogCollection: IFrog[] = [sampleWithPartialData];
        expectedResult = service.addFrogToCollectionIfMissing(frogCollection, frog);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(frog);
      });

      it('should add only unique Frog to an array', () => {
        const frogArray: IFrog[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const frogCollection: IFrog[] = [sampleWithRequiredData];
        expectedResult = service.addFrogToCollectionIfMissing(frogCollection, ...frogArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const frog: IFrog = sampleWithRequiredData;
        const frog2: IFrog = sampleWithPartialData;
        expectedResult = service.addFrogToCollectionIfMissing([], frog, frog2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(frog);
        expect(expectedResult).toContain(frog2);
      });

      it('should accept null and undefined values', () => {
        const frog: IFrog = sampleWithRequiredData;
        expectedResult = service.addFrogToCollectionIfMissing([], null, frog, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(frog);
      });

      it('should return initial array if no Frog is added', () => {
        const frogCollection: IFrog[] = [sampleWithRequiredData];
        expectedResult = service.addFrogToCollectionIfMissing(frogCollection, undefined, null);
        expect(expectedResult).toEqual(frogCollection);
      });
    });

    describe('compareFrog', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFrog(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFrog(entity1, entity2);
        const compareResult2 = service.compareFrog(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFrog(entity1, entity2);
        const compareResult2 = service.compareFrog(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFrog(entity1, entity2);
        const compareResult2 = service.compareFrog(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
