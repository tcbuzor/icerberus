import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacEntityProp, CerbacEntityProp } from '../cerbac-entity-prop.model';

import { CerbacEntityPropService } from './cerbac-entity-prop.service';

describe('Service Tests', () => {
  describe('CerbacEntityProp Service', () => {
    let service: CerbacEntityPropService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacEntityProp;
    let expectedResult: ICerbacEntityProp | ICerbacEntityProp[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacEntityPropService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        propName: 'AAAAAAA',
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

      it('should create a CerbacEntityProp', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacEntityProp()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacEntityProp', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            propName: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CerbacEntityProp', () => {
        const patchObject = Object.assign(
          {
            propName: 'BBBBBB',
          },
          new CerbacEntityProp()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacEntityProp', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            propName: 'BBBBBB',
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

      it('should delete a CerbacEntityProp', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacEntityPropToCollectionIfMissing', () => {
        it('should add a CerbacEntityProp to an empty array', () => {
          const cerbacEntityProp: ICerbacEntityProp = { id: 123 };
          expectedResult = service.addCerbacEntityPropToCollectionIfMissing([], cerbacEntityProp);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacEntityProp);
        });

        it('should not add a CerbacEntityProp to an array that contains it', () => {
          const cerbacEntityProp: ICerbacEntityProp = { id: 123 };
          const cerbacEntityPropCollection: ICerbacEntityProp[] = [
            {
              ...cerbacEntityProp,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacEntityPropToCollectionIfMissing(cerbacEntityPropCollection, cerbacEntityProp);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacEntityProp to an array that doesn't contain it", () => {
          const cerbacEntityProp: ICerbacEntityProp = { id: 123 };
          const cerbacEntityPropCollection: ICerbacEntityProp[] = [{ id: 456 }];
          expectedResult = service.addCerbacEntityPropToCollectionIfMissing(cerbacEntityPropCollection, cerbacEntityProp);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacEntityProp);
        });

        it('should add only unique CerbacEntityProp to an array', () => {
          const cerbacEntityPropArray: ICerbacEntityProp[] = [{ id: 123 }, { id: 456 }, { id: 32431 }];
          const cerbacEntityPropCollection: ICerbacEntityProp[] = [{ id: 123 }];
          expectedResult = service.addCerbacEntityPropToCollectionIfMissing(cerbacEntityPropCollection, ...cerbacEntityPropArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacEntityProp: ICerbacEntityProp = { id: 123 };
          const cerbacEntityProp2: ICerbacEntityProp = { id: 456 };
          expectedResult = service.addCerbacEntityPropToCollectionIfMissing([], cerbacEntityProp, cerbacEntityProp2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacEntityProp);
          expect(expectedResult).toContain(cerbacEntityProp2);
        });

        it('should accept null and undefined values', () => {
          const cerbacEntityProp: ICerbacEntityProp = { id: 123 };
          expectedResult = service.addCerbacEntityPropToCollectionIfMissing([], null, cerbacEntityProp, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacEntityProp);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
