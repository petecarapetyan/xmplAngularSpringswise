import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IScoreType } from '../score-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../score-type.test-samples';

import { ScoreTypeService } from './score-type.service';

const requireRestSample: IScoreType = {
  ...sampleWithRequiredData,
};

describe('ScoreType Service', () => {
  let service: ScoreTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IScoreType | IScoreType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ScoreTypeService);
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

    it('should create a ScoreType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const scoreType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(scoreType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ScoreType', () => {
      const scoreType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(scoreType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ScoreType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ScoreType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ScoreType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addScoreTypeToCollectionIfMissing', () => {
      it('should add a ScoreType to an empty array', () => {
        const scoreType: IScoreType = sampleWithRequiredData;
        expectedResult = service.addScoreTypeToCollectionIfMissing([], scoreType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(scoreType);
      });

      it('should not add a ScoreType to an array that contains it', () => {
        const scoreType: IScoreType = sampleWithRequiredData;
        const scoreTypeCollection: IScoreType[] = [
          {
            ...scoreType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addScoreTypeToCollectionIfMissing(scoreTypeCollection, scoreType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ScoreType to an array that doesn't contain it", () => {
        const scoreType: IScoreType = sampleWithRequiredData;
        const scoreTypeCollection: IScoreType[] = [sampleWithPartialData];
        expectedResult = service.addScoreTypeToCollectionIfMissing(scoreTypeCollection, scoreType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(scoreType);
      });

      it('should add only unique ScoreType to an array', () => {
        const scoreTypeArray: IScoreType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const scoreTypeCollection: IScoreType[] = [sampleWithRequiredData];
        expectedResult = service.addScoreTypeToCollectionIfMissing(scoreTypeCollection, ...scoreTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const scoreType: IScoreType = sampleWithRequiredData;
        const scoreType2: IScoreType = sampleWithPartialData;
        expectedResult = service.addScoreTypeToCollectionIfMissing([], scoreType, scoreType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(scoreType);
        expect(expectedResult).toContain(scoreType2);
      });

      it('should accept null and undefined values', () => {
        const scoreType: IScoreType = sampleWithRequiredData;
        expectedResult = service.addScoreTypeToCollectionIfMissing([], null, scoreType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(scoreType);
      });

      it('should return initial array if no ScoreType is added', () => {
        const scoreTypeCollection: IScoreType[] = [sampleWithRequiredData];
        expectedResult = service.addScoreTypeToCollectionIfMissing(scoreTypeCollection, undefined, null);
        expect(expectedResult).toEqual(scoreTypeCollection);
      });
    });

    describe('compareScoreType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareScoreType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareScoreType(entity1, entity2);
        const compareResult2 = service.compareScoreType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareScoreType(entity1, entity2);
        const compareResult2 = service.compareScoreType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareScoreType(entity1, entity2);
        const compareResult2 = service.compareScoreType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
