import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacHow, CerbacHow } from '../cerbac-how.model';

import { CerbacHowService } from './cerbac-how.service';

describe('Service Tests', () => {
  describe('CerbacHow Service', () => {
    let service: CerbacHowService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacHow;
    let expectedResult: ICerbacHow | ICerbacHow[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacHowService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        how: 'AAAAAAA',
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

      it('should create a CerbacHow', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacHow()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacHow', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            how: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CerbacHow', () => {
        const patchObject = Object.assign(
          {
            how: 'BBBBBB',
          },
          new CerbacHow()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacHow', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            how: 'BBBBBB',
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

      it('should delete a CerbacHow', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacHowToCollectionIfMissing', () => {
        it('should add a CerbacHow to an empty array', () => {
          const cerbacHow: ICerbacHow = { id: 123 };
          expectedResult = service.addCerbacHowToCollectionIfMissing([], cerbacHow);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacHow);
        });

        it('should not add a CerbacHow to an array that contains it', () => {
          const cerbacHow: ICerbacHow = { id: 123 };
          const cerbacHowCollection: ICerbacHow[] = [
            {
              ...cerbacHow,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacHowToCollectionIfMissing(cerbacHowCollection, cerbacHow);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacHow to an array that doesn't contain it", () => {
          const cerbacHow: ICerbacHow = { id: 123 };
          const cerbacHowCollection: ICerbacHow[] = [{ id: 456 }];
          expectedResult = service.addCerbacHowToCollectionIfMissing(cerbacHowCollection, cerbacHow);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacHow);
        });

        it('should add only unique CerbacHow to an array', () => {
          const cerbacHowArray: ICerbacHow[] = [{ id: 123 }, { id: 456 }, { id: 14061 }];
          const cerbacHowCollection: ICerbacHow[] = [{ id: 123 }];
          expectedResult = service.addCerbacHowToCollectionIfMissing(cerbacHowCollection, ...cerbacHowArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacHow: ICerbacHow = { id: 123 };
          const cerbacHow2: ICerbacHow = { id: 456 };
          expectedResult = service.addCerbacHowToCollectionIfMissing([], cerbacHow, cerbacHow2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacHow);
          expect(expectedResult).toContain(cerbacHow2);
        });

        it('should accept null and undefined values', () => {
          const cerbacHow: ICerbacHow = { id: 123 };
          expectedResult = service.addCerbacHowToCollectionIfMissing([], null, cerbacHow, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacHow);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
