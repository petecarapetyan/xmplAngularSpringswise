import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAirplane } from '../airplane.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../airplane.test-samples';

import { AirplaneService } from './airplane.service';

const requireRestSample: IAirplane = {
  ...sampleWithRequiredData,
};

describe('Airplane Service', () => {
  let service: AirplaneService;
  let httpMock: HttpTestingController;
  let expectedResult: IAirplane | IAirplane[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AirplaneService);
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

    it('should create a Airplane', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const airplane = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(airplane).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Airplane', () => {
      const airplane = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(airplane).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Airplane', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Airplane', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Airplane', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAirplaneToCollectionIfMissing', () => {
      it('should add a Airplane to an empty array', () => {
        const airplane: IAirplane = sampleWithRequiredData;
        expectedResult = service.addAirplaneToCollectionIfMissing([], airplane);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(airplane);
      });

      it('should not add a Airplane to an array that contains it', () => {
        const airplane: IAirplane = sampleWithRequiredData;
        const airplaneCollection: IAirplane[] = [
          {
            ...airplane,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAirplaneToCollectionIfMissing(airplaneCollection, airplane);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Airplane to an array that doesn't contain it", () => {
        const airplane: IAirplane = sampleWithRequiredData;
        const airplaneCollection: IAirplane[] = [sampleWithPartialData];
        expectedResult = service.addAirplaneToCollectionIfMissing(airplaneCollection, airplane);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(airplane);
      });

      it('should add only unique Airplane to an array', () => {
        const airplaneArray: IAirplane[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const airplaneCollection: IAirplane[] = [sampleWithRequiredData];
        expectedResult = service.addAirplaneToCollectionIfMissing(airplaneCollection, ...airplaneArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const airplane: IAirplane = sampleWithRequiredData;
        const airplane2: IAirplane = sampleWithPartialData;
        expectedResult = service.addAirplaneToCollectionIfMissing([], airplane, airplane2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(airplane);
        expect(expectedResult).toContain(airplane2);
      });

      it('should accept null and undefined values', () => {
        const airplane: IAirplane = sampleWithRequiredData;
        expectedResult = service.addAirplaneToCollectionIfMissing([], null, airplane, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(airplane);
      });

      it('should return initial array if no Airplane is added', () => {
        const airplaneCollection: IAirplane[] = [sampleWithRequiredData];
        expectedResult = service.addAirplaneToCollectionIfMissing(airplaneCollection, undefined, null);
        expect(expectedResult).toEqual(airplaneCollection);
      });
    });

    describe('compareAirplane', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAirplane(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAirplane(entity1, entity2);
        const compareResult2 = service.compareAirplane(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAirplane(entity1, entity2);
        const compareResult2 = service.compareAirplane(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAirplane(entity1, entity2);
        const compareResult2 = service.compareAirplane(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
