import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacWhereTarget, CerbacWhereTarget } from '../cerbac-where-target.model';

import { CerbacWhereTargetService } from './cerbac-where-target.service';

describe('Service Tests', () => {
  describe('CerbacWhereTarget Service', () => {
    let service: CerbacWhereTargetService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacWhereTarget;
    let expectedResult: ICerbacWhereTarget | ICerbacWhereTarget[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacWhereTargetService);
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

      it('should create a CerbacWhereTarget', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacWhereTarget()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacWhereTarget', () => {
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

      it('should partial update a CerbacWhereTarget', () => {
        const patchObject = Object.assign(
          {
            value: 'BBBBBB',
          },
          new CerbacWhereTarget()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacWhereTarget', () => {
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

      it('should delete a CerbacWhereTarget', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacWhereTargetToCollectionIfMissing', () => {
        it('should add a CerbacWhereTarget to an empty array', () => {
          const cerbacWhereTarget: ICerbacWhereTarget = { id: 123 };
          expectedResult = service.addCerbacWhereTargetToCollectionIfMissing([], cerbacWhereTarget);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhereTarget);
        });

        it('should not add a CerbacWhereTarget to an array that contains it', () => {
          const cerbacWhereTarget: ICerbacWhereTarget = { id: 123 };
          const cerbacWhereTargetCollection: ICerbacWhereTarget[] = [
            {
              ...cerbacWhereTarget,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacWhereTargetToCollectionIfMissing(cerbacWhereTargetCollection, cerbacWhereTarget);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacWhereTarget to an array that doesn't contain it", () => {
          const cerbacWhereTarget: ICerbacWhereTarget = { id: 123 };
          const cerbacWhereTargetCollection: ICerbacWhereTarget[] = [{ id: 456 }];
          expectedResult = service.addCerbacWhereTargetToCollectionIfMissing(cerbacWhereTargetCollection, cerbacWhereTarget);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhereTarget);
        });

        it('should add only unique CerbacWhereTarget to an array', () => {
          const cerbacWhereTargetArray: ICerbacWhereTarget[] = [{ id: 123 }, { id: 456 }, { id: 79110 }];
          const cerbacWhereTargetCollection: ICerbacWhereTarget[] = [{ id: 123 }];
          expectedResult = service.addCerbacWhereTargetToCollectionIfMissing(cerbacWhereTargetCollection, ...cerbacWhereTargetArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacWhereTarget: ICerbacWhereTarget = { id: 123 };
          const cerbacWhereTarget2: ICerbacWhereTarget = { id: 456 };
          expectedResult = service.addCerbacWhereTargetToCollectionIfMissing([], cerbacWhereTarget, cerbacWhereTarget2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhereTarget);
          expect(expectedResult).toContain(cerbacWhereTarget2);
        });

        it('should accept null and undefined values', () => {
          const cerbacWhereTarget: ICerbacWhereTarget = { id: 123 };
          expectedResult = service.addCerbacWhereTargetToCollectionIfMissing([], null, cerbacWhereTarget, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhereTarget);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
