import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacType, CerbacType } from '../cerbac-type.model';

import { CerbacTypeService } from './cerbac-type.service';

describe('Service Tests', () => {
  describe('CerbacType Service', () => {
    let service: CerbacTypeService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacType;
    let expectedResult: ICerbacType | ICerbacType[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacTypeService);
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

      it('should create a CerbacType', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacType()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacType', () => {
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

      it('should partial update a CerbacType', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
          },
          new CerbacType()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacType', () => {
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

      it('should delete a CerbacType', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacTypeToCollectionIfMissing', () => {
        it('should add a CerbacType to an empty array', () => {
          const cerbacType: ICerbacType = { id: 123 };
          expectedResult = service.addCerbacTypeToCollectionIfMissing([], cerbacType);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacType);
        });

        it('should not add a CerbacType to an array that contains it', () => {
          const cerbacType: ICerbacType = { id: 123 };
          const cerbacTypeCollection: ICerbacType[] = [
            {
              ...cerbacType,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacTypeToCollectionIfMissing(cerbacTypeCollection, cerbacType);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacType to an array that doesn't contain it", () => {
          const cerbacType: ICerbacType = { id: 123 };
          const cerbacTypeCollection: ICerbacType[] = [{ id: 456 }];
          expectedResult = service.addCerbacTypeToCollectionIfMissing(cerbacTypeCollection, cerbacType);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacType);
        });

        it('should add only unique CerbacType to an array', () => {
          const cerbacTypeArray: ICerbacType[] = [{ id: 123 }, { id: 456 }, { id: 69811 }];
          const cerbacTypeCollection: ICerbacType[] = [{ id: 123 }];
          expectedResult = service.addCerbacTypeToCollectionIfMissing(cerbacTypeCollection, ...cerbacTypeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacType: ICerbacType = { id: 123 };
          const cerbacType2: ICerbacType = { id: 456 };
          expectedResult = service.addCerbacTypeToCollectionIfMissing([], cerbacType, cerbacType2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacType);
          expect(expectedResult).toContain(cerbacType2);
        });

        it('should accept null and undefined values', () => {
          const cerbacType: ICerbacType = { id: 123 };
          expectedResult = service.addCerbacTypeToCollectionIfMissing([], null, cerbacType, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacType);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
