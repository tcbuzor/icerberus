import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConditionEnum } from 'app/entities/enumerations/condition-enum.model';
import { ICerbacWhatProp, CerbacWhatProp } from '../cerbac-what-prop.model';

import { CerbacWhatPropService } from './cerbac-what-prop.service';

describe('Service Tests', () => {
  describe('CerbacWhatProp Service', () => {
    let service: CerbacWhatPropService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacWhatProp;
    let expectedResult: ICerbacWhatProp | ICerbacWhatProp[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacWhatPropService);
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

      it('should create a CerbacWhatProp', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacWhatProp()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacWhatProp', () => {
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

      it('should partial update a CerbacWhatProp', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            value: 'BBBBBB',
            condition: 'BBBBBB',
          },
          new CerbacWhatProp()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacWhatProp', () => {
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

      it('should delete a CerbacWhatProp', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacWhatPropToCollectionIfMissing', () => {
        it('should add a CerbacWhatProp to an empty array', () => {
          const cerbacWhatProp: ICerbacWhatProp = { id: 123 };
          expectedResult = service.addCerbacWhatPropToCollectionIfMissing([], cerbacWhatProp);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhatProp);
        });

        it('should not add a CerbacWhatProp to an array that contains it', () => {
          const cerbacWhatProp: ICerbacWhatProp = { id: 123 };
          const cerbacWhatPropCollection: ICerbacWhatProp[] = [
            {
              ...cerbacWhatProp,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacWhatPropToCollectionIfMissing(cerbacWhatPropCollection, cerbacWhatProp);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacWhatProp to an array that doesn't contain it", () => {
          const cerbacWhatProp: ICerbacWhatProp = { id: 123 };
          const cerbacWhatPropCollection: ICerbacWhatProp[] = [{ id: 456 }];
          expectedResult = service.addCerbacWhatPropToCollectionIfMissing(cerbacWhatPropCollection, cerbacWhatProp);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhatProp);
        });

        it('should add only unique CerbacWhatProp to an array', () => {
          const cerbacWhatPropArray: ICerbacWhatProp[] = [{ id: 123 }, { id: 456 }, { id: 18376 }];
          const cerbacWhatPropCollection: ICerbacWhatProp[] = [{ id: 123 }];
          expectedResult = service.addCerbacWhatPropToCollectionIfMissing(cerbacWhatPropCollection, ...cerbacWhatPropArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacWhatProp: ICerbacWhatProp = { id: 123 };
          const cerbacWhatProp2: ICerbacWhatProp = { id: 456 };
          expectedResult = service.addCerbacWhatPropToCollectionIfMissing([], cerbacWhatProp, cerbacWhatProp2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhatProp);
          expect(expectedResult).toContain(cerbacWhatProp2);
        });

        it('should accept null and undefined values', () => {
          const cerbacWhatProp: ICerbacWhatProp = { id: 123 };
          expectedResult = service.addCerbacWhatPropToCollectionIfMissing([], null, cerbacWhatProp, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhatProp);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
