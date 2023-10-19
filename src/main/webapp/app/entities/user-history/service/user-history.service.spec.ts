import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IUserHistory } from '../user-history.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../user-history.test-samples';

import { UserHistoryService, RestUserHistory } from './user-history.service';

const requireRestSample: RestUserHistory = {
  ...sampleWithRequiredData,
  issueDate: sampleWithRequiredData.issueDate?.format(DATE_FORMAT),
};

describe('UserHistory Service', () => {
  let service: UserHistoryService;
  let httpMock: HttpTestingController;
  let expectedResult: IUserHistory | IUserHistory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UserHistoryService);
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

    it('should create a UserHistory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userHistory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(userHistory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UserHistory', () => {
      const userHistory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(userHistory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UserHistory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UserHistory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UserHistory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUserHistoryToCollectionIfMissing', () => {
      it('should add a UserHistory to an empty array', () => {
        const userHistory: IUserHistory = sampleWithRequiredData;
        expectedResult = service.addUserHistoryToCollectionIfMissing([], userHistory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userHistory);
      });

      it('should not add a UserHistory to an array that contains it', () => {
        const userHistory: IUserHistory = sampleWithRequiredData;
        const userHistoryCollection: IUserHistory[] = [
          {
            ...userHistory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUserHistoryToCollectionIfMissing(userHistoryCollection, userHistory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UserHistory to an array that doesn't contain it", () => {
        const userHistory: IUserHistory = sampleWithRequiredData;
        const userHistoryCollection: IUserHistory[] = [sampleWithPartialData];
        expectedResult = service.addUserHistoryToCollectionIfMissing(userHistoryCollection, userHistory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userHistory);
      });

      it('should add only unique UserHistory to an array', () => {
        const userHistoryArray: IUserHistory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const userHistoryCollection: IUserHistory[] = [sampleWithRequiredData];
        expectedResult = service.addUserHistoryToCollectionIfMissing(userHistoryCollection, ...userHistoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const userHistory: IUserHistory = sampleWithRequiredData;
        const userHistory2: IUserHistory = sampleWithPartialData;
        expectedResult = service.addUserHistoryToCollectionIfMissing([], userHistory, userHistory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userHistory);
        expect(expectedResult).toContain(userHistory2);
      });

      it('should accept null and undefined values', () => {
        const userHistory: IUserHistory = sampleWithRequiredData;
        expectedResult = service.addUserHistoryToCollectionIfMissing([], null, userHistory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userHistory);
      });

      it('should return initial array if no UserHistory is added', () => {
        const userHistoryCollection: IUserHistory[] = [sampleWithRequiredData];
        expectedResult = service.addUserHistoryToCollectionIfMissing(userHistoryCollection, undefined, null);
        expect(expectedResult).toEqual(userHistoryCollection);
      });
    });

    describe('compareUserHistory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUserHistory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUserHistory(entity1, entity2);
        const compareResult2 = service.compareUserHistory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUserHistory(entity1, entity2);
        const compareResult2 = service.compareUserHistory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUserHistory(entity1, entity2);
        const compareResult2 = service.compareUserHistory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
