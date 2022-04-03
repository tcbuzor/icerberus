import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacWhereOrigin, CerbacWhereOrigin } from '../cerbac-where-origin.model';

import { CerbacWhereOriginService } from './cerbac-where-origin.service';

describe('Service Tests', () => {
  describe('CerbacWhereOrigin Service', () => {
    let service: CerbacWhereOriginService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacWhereOrigin;
    let expectedResult: ICerbacWhereOrigin | ICerbacWhereOrigin[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacWhereOriginService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        value: 'AAAAAAA',
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

      it('should create a CerbacWhereOrigin', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacWhereOrigin()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacWhereOrigin', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            value: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CerbacWhereOrigin', () => {
        const patchObject = Object.assign({}, new CerbacWhereOrigin());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacWhereOrigin', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            value: 'BBBBBB',
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

      it('should delete a CerbacWhereOrigin', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacWhereOriginToCollectionIfMissing', () => {
        it('should add a CerbacWhereOrigin to an empty array', () => {
          const cerbacWhereOrigin: ICerbacWhereOrigin = { id: 123 };
          expectedResult = service.addCerbacWhereOriginToCollectionIfMissing([], cerbacWhereOrigin);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhereOrigin);
        });

        it('should not add a CerbacWhereOrigin to an array that contains it', () => {
          const cerbacWhereOrigin: ICerbacWhereOrigin = { id: 123 };
          const cerbacWhereOriginCollection: ICerbacWhereOrigin[] = [
            {
              ...cerbacWhereOrigin,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacWhereOriginToCollectionIfMissing(cerbacWhereOriginCollection, cerbacWhereOrigin);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacWhereOrigin to an array that doesn't contain it", () => {
          const cerbacWhereOrigin: ICerbacWhereOrigin = { id: 123 };
          const cerbacWhereOriginCollection: ICerbacWhereOrigin[] = [{ id: 456 }];
          expectedResult = service.addCerbacWhereOriginToCollectionIfMissing(cerbacWhereOriginCollection, cerbacWhereOrigin);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhereOrigin);
        });

        it('should add only unique CerbacWhereOrigin to an array', () => {
          const cerbacWhereOriginArray: ICerbacWhereOrigin[] = [{ id: 123 }, { id: 456 }, { id: 95558 }];
          const cerbacWhereOriginCollection: ICerbacWhereOrigin[] = [{ id: 123 }];
          expectedResult = service.addCerbacWhereOriginToCollectionIfMissing(cerbacWhereOriginCollection, ...cerbacWhereOriginArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacWhereOrigin: ICerbacWhereOrigin = { id: 123 };
          const cerbacWhereOrigin2: ICerbacWhereOrigin = { id: 456 };
          expectedResult = service.addCerbacWhereOriginToCollectionIfMissing([], cerbacWhereOrigin, cerbacWhereOrigin2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhereOrigin);
          expect(expectedResult).toContain(cerbacWhereOrigin2);
        });

        it('should accept null and undefined values', () => {
          const cerbacWhereOrigin: ICerbacWhereOrigin = { id: 123 };
          expectedResult = service.addCerbacWhereOriginToCollectionIfMissing([], null, cerbacWhereOrigin, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhereOrigin);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
