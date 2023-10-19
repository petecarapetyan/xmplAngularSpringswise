import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICodingCategory } from '../coding-category.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../coding-category.test-samples';

import { CodingCategoryService } from './coding-category.service';

const requireRestSample: ICodingCategory = {
  ...sampleWithRequiredData,
};

describe('CodingCategory Service', () => {
  let service: CodingCategoryService;
  let httpMock: HttpTestingController;
  let expectedResult: ICodingCategory | ICodingCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CodingCategoryService);
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

    it('should create a CodingCategory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const codingCategory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(codingCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CodingCategory', () => {
      const codingCategory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(codingCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CodingCategory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CodingCategory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CodingCategory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCodingCategoryToCollectionIfMissing', () => {
      it('should add a CodingCategory to an empty array', () => {
        const codingCategory: ICodingCategory = sampleWithRequiredData;
        expectedResult = service.addCodingCategoryToCollectionIfMissing([], codingCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(codingCategory);
      });

      it('should not add a CodingCategory to an array that contains it', () => {
        const codingCategory: ICodingCategory = sampleWithRequiredData;
        const codingCategoryCollection: ICodingCategory[] = [
          {
            ...codingCategory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCodingCategoryToCollectionIfMissing(codingCategoryCollection, codingCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CodingCategory to an array that doesn't contain it", () => {
        const codingCategory: ICodingCategory = sampleWithRequiredData;
        const codingCategoryCollection: ICodingCategory[] = [sampleWithPartialData];
        expectedResult = service.addCodingCategoryToCollectionIfMissing(codingCategoryCollection, codingCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(codingCategory);
      });

      it('should add only unique CodingCategory to an array', () => {
        const codingCategoryArray: ICodingCategory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const codingCategoryCollection: ICodingCategory[] = [sampleWithRequiredData];
        expectedResult = service.addCodingCategoryToCollectionIfMissing(codingCategoryCollection, ...codingCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const codingCategory: ICodingCategory = sampleWithRequiredData;
        const codingCategory2: ICodingCategory = sampleWithPartialData;
        expectedResult = service.addCodingCategoryToCollectionIfMissing([], codingCategory, codingCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(codingCategory);
        expect(expectedResult).toContain(codingCategory2);
      });

      it('should accept null and undefined values', () => {
        const codingCategory: ICodingCategory = sampleWithRequiredData;
        expectedResult = service.addCodingCategoryToCollectionIfMissing([], null, codingCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(codingCategory);
      });

      it('should return initial array if no CodingCategory is added', () => {
        const codingCategoryCollection: ICodingCategory[] = [sampleWithRequiredData];
        expectedResult = service.addCodingCategoryToCollectionIfMissing(codingCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(codingCategoryCollection);
      });
    });

    describe('compareCodingCategory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCodingCategory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCodingCategory(entity1, entity2);
        const compareResult2 = service.compareCodingCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCodingCategory(entity1, entity2);
        const compareResult2 = service.compareCodingCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCodingCategory(entity1, entity2);
        const compareResult2 = service.compareCodingCategory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
