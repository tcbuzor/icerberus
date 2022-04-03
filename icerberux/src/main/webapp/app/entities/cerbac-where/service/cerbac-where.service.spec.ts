import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacWhere, CerbacWhere } from '../cerbac-where.model';

import { CerbacWhereService } from './cerbac-where.service';

describe('Service Tests', () => {
  describe('CerbacWhere Service', () => {
    let service: CerbacWhereService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacWhere;
    let expectedResult: ICerbacWhere | ICerbacWhere[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacWhereService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
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

      it('should create a CerbacWhere', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacWhere()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacWhere', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CerbacWhere', () => {
        const patchObject = Object.assign({}, new CerbacWhere());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacWhere', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
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

      it('should delete a CerbacWhere', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacWhereToCollectionIfMissing', () => {
        it('should add a CerbacWhere to an empty array', () => {
          const cerbacWhere: ICerbacWhere = { id: 123 };
          expectedResult = service.addCerbacWhereToCollectionIfMissing([], cerbacWhere);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhere);
        });

        it('should not add a CerbacWhere to an array that contains it', () => {
          const cerbacWhere: ICerbacWhere = { id: 123 };
          const cerbacWhereCollection: ICerbacWhere[] = [
            {
              ...cerbacWhere,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacWhereToCollectionIfMissing(cerbacWhereCollection, cerbacWhere);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacWhere to an array that doesn't contain it", () => {
          const cerbacWhere: ICerbacWhere = { id: 123 };
          const cerbacWhereCollection: ICerbacWhere[] = [{ id: 456 }];
          expectedResult = service.addCerbacWhereToCollectionIfMissing(cerbacWhereCollection, cerbacWhere);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhere);
        });

        it('should add only unique CerbacWhere to an array', () => {
          const cerbacWhereArray: ICerbacWhere[] = [{ id: 123 }, { id: 456 }, { id: 6730 }];
          const cerbacWhereCollection: ICerbacWhere[] = [{ id: 123 }];
          expectedResult = service.addCerbacWhereToCollectionIfMissing(cerbacWhereCollection, ...cerbacWhereArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacWhere: ICerbacWhere = { id: 123 };
          const cerbacWhere2: ICerbacWhere = { id: 456 };
          expectedResult = service.addCerbacWhereToCollectionIfMissing([], cerbacWhere, cerbacWhere2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhere);
          expect(expectedResult).toContain(cerbacWhere2);
        });

        it('should accept null and undefined values', () => {
          const cerbacWhere: ICerbacWhere = { id: 123 };
          expectedResult = service.addCerbacWhereToCollectionIfMissing([], null, cerbacWhere, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhere);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
