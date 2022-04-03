import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacWho, CerbacWho } from '../cerbac-who.model';

import { CerbacWhoService } from './cerbac-who.service';

describe('Service Tests', () => {
  describe('CerbacWho Service', () => {
    let service: CerbacWhoService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacWho;
    let expectedResult: ICerbacWho | ICerbacWho[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacWhoService);
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

      it('should create a CerbacWho', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacWho()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacWho', () => {
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

      it('should partial update a CerbacWho', () => {
        const patchObject = Object.assign({}, new CerbacWho());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacWho', () => {
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

      it('should delete a CerbacWho', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacWhoToCollectionIfMissing', () => {
        it('should add a CerbacWho to an empty array', () => {
          const cerbacWho: ICerbacWho = { id: 123 };
          expectedResult = service.addCerbacWhoToCollectionIfMissing([], cerbacWho);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWho);
        });

        it('should not add a CerbacWho to an array that contains it', () => {
          const cerbacWho: ICerbacWho = { id: 123 };
          const cerbacWhoCollection: ICerbacWho[] = [
            {
              ...cerbacWho,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacWhoToCollectionIfMissing(cerbacWhoCollection, cerbacWho);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacWho to an array that doesn't contain it", () => {
          const cerbacWho: ICerbacWho = { id: 123 };
          const cerbacWhoCollection: ICerbacWho[] = [{ id: 456 }];
          expectedResult = service.addCerbacWhoToCollectionIfMissing(cerbacWhoCollection, cerbacWho);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWho);
        });

        it('should add only unique CerbacWho to an array', () => {
          const cerbacWhoArray: ICerbacWho[] = [{ id: 123 }, { id: 456 }, { id: 45029 }];
          const cerbacWhoCollection: ICerbacWho[] = [{ id: 123 }];
          expectedResult = service.addCerbacWhoToCollectionIfMissing(cerbacWhoCollection, ...cerbacWhoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacWho: ICerbacWho = { id: 123 };
          const cerbacWho2: ICerbacWho = { id: 456 };
          expectedResult = service.addCerbacWhoToCollectionIfMissing([], cerbacWho, cerbacWho2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacWho);
          expect(expectedResult).toContain(cerbacWho2);
        });

        it('should accept null and undefined values', () => {
          const cerbacWho: ICerbacWho = { id: 123 };
          expectedResult = service.addCerbacWhoToCollectionIfMissing([], null, cerbacWho, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacWho);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
