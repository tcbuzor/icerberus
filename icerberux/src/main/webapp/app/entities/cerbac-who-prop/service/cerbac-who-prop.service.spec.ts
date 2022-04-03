import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConditionEnum } from 'app/entities/enumerations/condition-enum.model';
import { ICerbacWhoProp, CerbacWhoProp } from '../cerbac-who-prop.model';

import { CerbacWhoPropService } from './cerbac-who-prop.service';

describe('Service Tests', () => {
  describe('CerbacWhoProp Service', () => {
    let service: CerbacWhoPropService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacWhoProp;
    let expectedResult: ICerbacWhoProp | ICerbacWhoProp[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacWhoPropService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
        value: 'AAAAAAA',
        condition: ConditionEnum.EQ,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CerbacWhoProp', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacWhoProp()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacWhoProp', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            value: 'BBBBBB',
            condition: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CerbacWhoProp', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            value: 'BBBBBB',
          },
          new CerbacWhoProp()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacWhoProp', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            value: 'BBBBBB',
            condition: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CerbacWhoProp', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacWhoPropToCollectionIfMissing', () => {
        it('should add a CerbacWhoProp to an empty array', () => {
          const cerbacWhoProp: ICerbacWhoProp = { id: 123 };
          expectedResult = service.addCerbacWhoPropToCollectionIfMissing([], cerbacWhoProp);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhoProp);
        });

        it('should not add a CerbacWhoProp to an array that contains it', () => {
          const cerbacWhoProp: ICerbacWhoProp = { id: 123 };
          const cerbacWhoPropCollection: ICerbacWhoProp[] = [
            {
              ...cerbacWhoProp,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacWhoPropToCollectionIfMissing(cerbacWhoPropCollection, cerbacWhoProp);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacWhoProp to an array that doesn't contain it", () => {
          const cerbacWhoProp: ICerbacWhoProp = { id: 123 };
          const cerbacWhoPropCollection: ICerbacWhoProp[] = [{ id: 456 }];
          expectedResult = service.addCerbacWhoPropToCollectionIfMissing(cerbacWhoPropCollection, cerbacWhoProp);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhoProp);
        });

        it('should add only unique CerbacWhoProp to an array', () => {
          const cerbacWhoPropArray: ICerbacWhoProp[] = [{ id: 123 }, { id: 456 }, { id: 92026 }];
          const cerbacWhoPropCollection: ICerbacWhoProp[] = [{ id: 123 }];
          expectedResult = service.addCerbacWhoPropToCollectionIfMissing(cerbacWhoPropCollection, ...cerbacWhoPropArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacWhoProp: ICerbacWhoProp = { id: 123 };
          const cerbacWhoProp2: ICerbacWhoProp = { id: 456 };
          expectedResult = service.addCerbacWhoPropToCollectionIfMissing([], cerbacWhoProp, cerbacWhoProp2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhoProp);
          expect(expectedResult).toContain(cerbacWhoProp2);
        });

        it('should accept null and undefined values', () => {
          const cerbacWhoProp: ICerbacWhoProp = { id: 123 };
          expectedResult = service.addCerbacWhoPropToCollectionIfMissing([], null, cerbacWhoProp, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhoProp);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
