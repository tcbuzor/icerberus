import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConditionEnum } from 'app/entities/enumerations/condition-enum.model';
import { ICerbacWhen, CerbacWhen } from '../cerbac-when.model';

import { CerbacWhenService } from './cerbac-when.service';

describe('Service Tests', () => {
  describe('CerbacWhen Service', () => {
    let service: CerbacWhenService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacWhen;
    let expectedResult: ICerbacWhen | ICerbacWhen[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacWhenService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        whenCondition: ConditionEnum.EQ,
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

      it('should create a CerbacWhen', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacWhen()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacWhen', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            whenCondition: 'BBBBBB',
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

      it('should partial update a CerbacWhen', () => {
        const patchObject = Object.assign({}, new CerbacWhen());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacWhen', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            whenCondition: 'BBBBBB',
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

      it('should delete a CerbacWhen', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacWhenToCollectionIfMissing', () => {
        it('should add a CerbacWhen to an empty array', () => {
          const cerbacWhen: ICerbacWhen = { id: 123 };
          expectedResult = service.addCerbacWhenToCollectionIfMissing([], cerbacWhen);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhen);
        });

        it('should not add a CerbacWhen to an array that contains it', () => {
          const cerbacWhen: ICerbacWhen = { id: 123 };
          const cerbacWhenCollection: ICerbacWhen[] = [
            {
              ...cerbacWhen,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacWhenToCollectionIfMissing(cerbacWhenCollection, cerbacWhen);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacWhen to an array that doesn't contain it", () => {
          const cerbacWhen: ICerbacWhen = { id: 123 };
          const cerbacWhenCollection: ICerbacWhen[] = [{ id: 456 }];
          expectedResult = service.addCerbacWhenToCollectionIfMissing(cerbacWhenCollection, cerbacWhen);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhen);
        });

        it('should add only unique CerbacWhen to an array', () => {
          const cerbacWhenArray: ICerbacWhen[] = [{ id: 123 }, { id: 456 }, { id: 67963 }];
          const cerbacWhenCollection: ICerbacWhen[] = [{ id: 123 }];
          expectedResult = service.addCerbacWhenToCollectionIfMissing(cerbacWhenCollection, ...cerbacWhenArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacWhen: ICerbacWhen = { id: 123 };
          const cerbacWhen2: ICerbacWhen = { id: 456 };
          expectedResult = service.addCerbacWhenToCollectionIfMissing([], cerbacWhen, cerbacWhen2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhen);
          expect(expectedResult).toContain(cerbacWhen2);
        });

        it('should accept null and undefined values', () => {
          const cerbacWhen: ICerbacWhen = { id: 123 };
          expectedResult = service.addCerbacWhenToCollectionIfMissing([], null, cerbacWhen, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhen);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
