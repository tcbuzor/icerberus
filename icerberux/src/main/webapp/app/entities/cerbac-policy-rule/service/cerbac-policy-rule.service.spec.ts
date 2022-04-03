import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICerbacPolicyRule, CerbacPolicyRule } from '../cerbac-policy-rule.model';

import { CerbacPolicyRuleService } from './cerbac-policy-rule.service';

describe('Service Tests', () => {
  describe('CerbacPolicyRule Service', () => {
    let service: CerbacPolicyRuleService;
    let httpMock: HttpTestingController;
    let elemDefault: ICerbacPolicyRule;
    let expectedResult: ICerbacPolicyRule | ICerbacPolicyRule[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CerbacPolicyRuleService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        sid: 'AAAAAAA',
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

      it('should create a CerbacPolicyRule', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CerbacPolicyRule()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CerbacPolicyRule', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            sid: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CerbacPolicyRule', () => {
        const patchObject = Object.assign({}, new CerbacPolicyRule());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CerbacPolicyRule', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            sid: 'BBBBBB',
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

      it('should delete a CerbacPolicyRule', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCerbacPolicyRuleToCollectionIfMissing', () => {
        it('should add a CerbacPolicyRule to an empty array', () => {
          const cerbacPolicyRule: ICerbacPolicyRule = { id: 123 };
          expectedResult = service.addCerbacPolicyRuleToCollectionIfMissing([], cerbacPolicyRule);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacPolicyRule);
        });

        it('should not add a CerbacPolicyRule to an array that contains it', () => {
          const cerbacPolicyRule: ICerbacPolicyRule = { id: 123 };
          const cerbacPolicyRuleCollection: ICerbacPolicyRule[] = [
            {
              ...cerbacPolicyRule,
            },
            { id: 456 },
          ];
          expectedResult = service.addCerbacPolicyRuleToCollectionIfMissing(cerbacPolicyRuleCollection, cerbacPolicyRule);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a CerbacPolicyRule to an array that doesn't contain it", () => {
          const cerbacPolicyRule: ICerbacPolicyRule = { id: 123 };
          const cerbacPolicyRuleCollection: ICerbacPolicyRule[] = [{ id: 456 }];
          expectedResult = service.addCerbacPolicyRuleToCollectionIfMissing(cerbacPolicyRuleCollection, cerbacPolicyRule);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacPolicyRule);
        });

        it('should add only unique CerbacPolicyRule to an array', () => {
          const cerbacPolicyRuleArray: ICerbacPolicyRule[] = [{ id: 123 }, { id: 456 }, { id: 90255 }];
          const cerbacPolicyRuleCollection: ICerbacPolicyRule[] = [{ id: 123 }];
          expectedResult = service.addCerbacPolicyRuleToCollectionIfMissing(cerbacPolicyRuleCollection, ...cerbacPolicyRuleArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cerbacPolicyRule: ICerbacPolicyRule = { id: 123 };
          const cerbacPolicyRule2: ICerbacPolicyRule = { id: 456 };
          expectedResult = service.addCerbacPolicyRuleToCollectionIfMissing([], cerbacPolicyRule, cerbacPolicyRule2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cerbacPolicyRule);
          expect(expectedResult).toContain(cerbacPolicyRule2);
        });

        it('should accept null and undefined values', () => {
          const cerbacPolicyRule: ICerbacPolicyRule = { id: 123 };
          expectedResult = service.addCerbacPolicyRuleToCollectionIfMissing([], null, cerbacPolicyRule, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cerbacPolicyRule);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
