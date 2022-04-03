import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacWhat, CerbacWhat } from '../cerbac-what.model';

import { CerbacWhatService } from './cerbac-what.service';

describe('Service Tests', () => {
  describe('CerbacWhat Service', () => {
    let service: CerbacWhatService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacWhat;
    let expectedResult: ICerbacWhat | ICerbacWhat[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacWhatService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
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

      it('should create a CerbacWhat', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacWhat()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacWhat', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CerbacWhat', () => {
        const patchObject = Object.assign({}, new CerbacWhat());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacWhat', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
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

      it('should delete a CerbacWhat', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacWhatToCollectionIfMissing', () => {
        it('should add a CerbacWhat to an empty array', () => {
          const cerbacWhat: ICerbacWhat = { id: 123 };
          expectedResult = service.addCerbacWhatToCollectionIfMissing([], cerbacWhat);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhat);
        });

        it('should not add a CerbacWhat to an array that contains it', () => {
          const cerbacWhat: ICerbacWhat = { id: 123 };
          const cerbacWhatCollection: ICerbacWhat[] = [
            {
              ...cerbacWhat,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacWhatToCollectionIfMissing(cerbacWhatCollection, cerbacWhat);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacWhat to an array that doesn't contain it", () => {
          const cerbacWhat: ICerbacWhat = { id: 123 };
          const cerbacWhatCollection: ICerbacWhat[] = [{ id: 456 }];
          expectedResult = service.addCerbacWhatToCollectionIfMissing(cerbacWhatCollection, cerbacWhat);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhat);
        });

        it('should add only unique CerbacWhat to an array', () => {
          const cerbacWhatArray: ICerbacWhat[] = [{ id: 123 }, { id: 456 }, { id: 1461 }];
          const cerbacWhatCollection: ICerbacWhat[] = [{ id: 123 }];
          expectedResult = service.addCerbacWhatToCollectionIfMissing(cerbacWhatCollection, ...cerbacWhatArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacWhat: ICerbacWhat = { id: 123 };
          const cerbacWhat2: ICerbacWhat = { id: 456 };
          expectedResult = service.addCerbacWhatToCollectionIfMissing([], cerbacWhat, cerbacWhat2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWhat);
          expect(expectedResult).toContain(cerbacWhat2);
        });

        it('should accept null and undefined values', () => {
          const cerbacWhat: ICerbacWhat = { id: 123 };
          expectedResult = service.addCerbacWhatToCollectionIfMissing([], null, cerbacWhat, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWhat);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
