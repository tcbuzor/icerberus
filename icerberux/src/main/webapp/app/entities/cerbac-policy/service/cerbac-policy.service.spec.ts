import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacPolicy, CerbacPolicy } from '../cerbac-policy.model';

import { CerbacPolicyService } from './cerbac-policy.service';

describe('Service Tests', () => {
  describe('CerbacPolicy Service', () => {
    let service: CerbacPolicyService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacPolicy;
    let expectedResult: ICerbacPolicy | ICerbacPolicy[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacPolicyService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        pid: 'AAAAAAA',
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

      it('should create a CerbacPolicy', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacPolicy()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacPolicy', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            pid: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CerbacPolicy', () => {
        const patchObject = Object.assign(
          {
            pid: 'BBBBBB',
          },
          new CerbacPolicy()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacPolicy', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            pid: 'BBBBBB',
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

      it('should delete a CerbacPolicy', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacPolicyToCollectionIfMissing', () => {
        it('should add a CerbacPolicy to an empty array', () => {
          const cerbacPolicy: ICerbacPolicy = { id: 123 };
          expectedResult = service.addCerbacPolicyToCollectionIfMissing([], cerbacPolicy);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacPolicy);
        });

        it('should not add a CerbacPolicy to an array that contains it', () => {
          const cerbacPolicy: ICerbacPolicy = { id: 123 };
          const cerbacPolicyCollection: ICerbacPolicy[] = [
            {
              ...cerbacPolicy,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacPolicyToCollectionIfMissing(cerbacPolicyCollection, cerbacPolicy);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacPolicy to an array that doesn't contain it", () => {
          const cerbacPolicy: ICerbacPolicy = { id: 123 };
          const cerbacPolicyCollection: ICerbacPolicy[] = [{ id: 456 }];
          expectedResult = service.addCerbacPolicyToCollectionIfMissing(cerbacPolicyCollection, cerbacPolicy);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacPolicy);
        });

        it('should add only unique CerbacPolicy to an array', () => {
          const cerbacPolicyArray: ICerbacPolicy[] = [{ id: 123 }, { id: 456 }, { id: 98350 }];
          const cerbacPolicyCollection: ICerbacPolicy[] = [{ id: 123 }];
          expectedResult = service.addCerbacPolicyToCollectionIfMissing(cerbacPolicyCollection, ...cerbacPolicyArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacPolicy: ICerbacPolicy = { id: 123 };
          const cerbacPolicy2: ICerbacPolicy = { id: 456 };
          expectedResult = service.addCerbacPolicyToCollectionIfMissing([], cerbacPolicy, cerbacPolicy2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacPolicy);
          expect(expectedResult).toContain(cerbacPolicy2);
        });

        it('should accept null and undefined values', () => {
          const cerbacPolicy: ICerbacPolicy = { id: 123 };
          expectedResult = service.addCerbacPolicyToCollectionIfMissing([], null, cerbacPolicy, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacPolicy);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
