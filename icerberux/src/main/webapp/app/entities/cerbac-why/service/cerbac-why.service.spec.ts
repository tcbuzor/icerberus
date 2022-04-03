import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacWhy, CerbacWhy } from '../cerbac-why.model';

import { CerbacWhyService } from './cerbac-why.service';

describe('Service Tests', () => {
  describe('CerbacWhy Service', () => {
    let service: CerbacWhyService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacWhy;
    let expectedResult: ICerbacWhy | ICerbacWhy[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacWhyService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        reason: 'AAAAAAA',
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

      it('should create a CerbacWhy', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacWhy()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacWhy', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            reason: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CerbacWhy', () => {
        const patchObject = Object.assign(
          {
            reason: 'BBBBBB',
          },
          new CerbacWhy()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacWhy', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            reason: 'BBBBBB',
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

      it('should delete a CerbacWhy', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacWhyToCollectionIfMissing', () => {
        it('should add a CerbacWhy to an empty array', () => {
          const cerbacWhy: ICerbacWhy = { id: 123 };
          expectedResult = service.addCerbacWhyToCollectionIfMissing([], cerbacWhy);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhy);
        });

        it('should not add a CerbacWhy to an array that contains it', () => {
          const cerbacWhy: ICerbacWhy = { id: 123 };
          const cerbacWhyCollection: ICerbacWhy[] = [
            {
              ...cerbacWhy,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacWhyToCollectionIfMissing(cerbacWhyCollection, cerbacWhy);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacWhy to an array that doesn't contain it", () => {
          const cerbacWhy: ICerbacWhy = { id: 123 };
          const cerbacWhyCollection: ICerbacWhy[] = [{ id: 456 }];
          expectedResult = service.addCerbacWhyToCollectionIfMissing(cerbacWhyCollection, cerbacWhy);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhy);
        });

        it('should add only unique CerbacWhy to an array', () => {
          const cerbacWhyArray: ICerbacWhy[] = [{ id: 123 }, { id: 456 }, { id: 39007 }];
          const cerbacWhyCollection: ICerbacWhy[] = [{ id: 123 }];
          expectedResult = service.addCerbacWhyToCollectionIfMissing(cerbacWhyCollection, ...cerbacWhyArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacWhy: ICerbacWhy = { id: 123 };
          const cerbacWhy2: ICerbacWhy = { id: 456 };
          expectedResult = service.addCerbacWhyToCollectionIfMissing([], cerbacWhy, cerbacWhy2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhy);
          expect(expectedResult).toContain(cerbacWhy2);
        });

        it('should accept null and undefined values', () => {
          const cerbacWhy: ICerbacWhy = { id: 123 };
          expectedResult = service.addCerbacWhyToCollectionIfMissing([], null, cerbacWhy, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhy);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
